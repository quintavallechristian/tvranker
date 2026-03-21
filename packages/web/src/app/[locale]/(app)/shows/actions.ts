"use server";

import { createClient } from "@/lib/supabase/server";
import {
  findByImdbId,
  searchShows,
  searchMovies,
  getShowDetails,
  getMovieDetails,
  normalizeMovieAsShow,
  extractTrailerUrl,
} from "@/lib/tmdb/client";
import type { TMDBShowExtended } from "@/lib/tmdb/client";

/**
 * Lazily fetches TMDB data for a show and persists it to the database.
 * Called once when a user first visits a show detail page that hasn't been enriched yet.
 *
 * A show needs enrichment if:
 *  - tmdb_fetched === false  (after migration)
 *  - OR tmdb_id is negative  (placeholder set during import before migration)
 */
export async function fetchTmdbData(showId: string) {
  const supabase = await createClient();

  const { data: show } = await supabase
    .from("shows")
    .select("*")
    .eq("id", showId)
    .single();

  if (!show) return null;

  // Already enriched
  const needsFetch =
    (show as unknown as { tmdb_fetched?: boolean }).tmdb_fetched === false ||
    (show.tmdb_id !== null && show.tmdb_id < 0) ||
    show.tmdb_id === null ||
    // Retry if previously fetched but nothing was found (e.g. was a movie, only TV was searched)
    (!show.poster_path && !show.overview);

  if (!needsFetch) return show;

  let found: TMDBShowExtended | null = null;
  let isMovieMatch = false;

  // Strategy 1: lookup by existing positive tmdb_id as a TV show
  if (show.tmdb_id !== null && show.tmdb_id > 0) {
    try {
      found = await getShowDetails(show.tmdb_id);
    } catch {
      // The tmdb_id might belong to a movie — check and flag for removal
      try {
        const movie = await getMovieDetails(show.tmdb_id);
        found = normalizeMovieAsShow(movie);
        isMovieMatch = true;
      } catch {
        /* fall through */
      }
    }
  }

  // Strategy 2: lookup by IMDb ID
  if (!found && show.imdb_id) {
    try {
      const { show: tvMatch, movie: movieMatch } = await findByImdbId(
        show.imdb_id,
      );
      if (tvMatch) {
        found = await getShowDetails(tvMatch.id);
      } else if (movieMatch) {
        // IMDb ID resolves to a movie — flag for removal
        const movieDetails = await getMovieDetails(movieMatch.id);
        found = normalizeMovieAsShow(movieDetails);
        isMovieMatch = true;
      }
    } catch {
      /* fall through */
    }
  }

  // Strategy 3: search by title as TV show
  if (!found) {
    try {
      const data = await searchShows(show.title);
      const first = data.results?.[0];
      if (first) {
        found = await getShowDetails(first.id);
      }
    } catch {
      /* ignore */
    }
  }

  // Strategy 4: search by title as movie — this is a TV ranker, so flag for removal
  if (!found) {
    try {
      const data = await searchMovies(show.title);
      const first = data.results?.[0];
      if (first) {
        found = normalizeMovieAsShow(await getMovieDetails(first.id));
        isMovieMatch = true;
      }
    } catch {
      /* ignore */
    }
  }

  if (!found) {
    // Mark as fetched even if TMDB has no match, to avoid repeated lookups.
    await supabase
      .from("shows")
      .update({ tmdb_fetched: true } as Record<string, unknown>)
      .eq("id", showId)
      .then(
        () => null,
        () => null,
      );
    return show;
  }

  // This is a TV ranker — if TMDB only recognises the entry as a movie, remove it.
  if (isMovieMatch) {
    await supabase.from("shows").delete().eq("id", showId);
    return null;
  }

  // Check if another show row already holds this real tmdb_id
  const { data: conflict } = await supabase
    .from("shows")
    .select("id")
    .eq("tmdb_id", found.id)
    .neq("id", showId)
    .limit(1)
    .single();

  if (conflict) {
    // Merge: point all list_items from this placeholder to the existing canonical show
    await supabase
      .from("list_items")
      .update({ show_id: conflict.id } as unknown as Record<string, unknown>)
      .eq("show_id", showId);
    // Delete the placeholder show
    await supabase.from("shows").delete().eq("id", showId);
    // Return the canonical show
    const { data: canonical } = await supabase
      .from("shows")
      .select("*")
      .eq("id", conflict.id)
      .single();
    return canonical;
  }

  // Build extra fields from extended TMDB response
  const seasonsData = found.seasons
    ? found.seasons
        .filter((s) => s.season_number > 0) // exclude "Specials" (season 0)
        .map((s) => ({
          season_number: s.season_number,
          name: s.name,
          episode_count: s.episode_count,
          air_date: s.air_date || null,
        }))
    : null;

  const trailerUrl = extractTrailerUrl(found.videos);

  const watchProviders = found["watch/providers"]?.results ?? null;

  // Update the show with real TMDB data.
  // tmdb_fetched is only in updates after migration — PostgREST ignores unknown columns gracefully.
  const updates: Record<string, unknown> = {
    tmdb_id: found.id,
    title: found.name,
    poster_path: found.poster_path,
    first_air_date: found.first_air_date || null,
    overview: found.overview || null,
    tmdb_fetched: true,
    seasons_data: seasonsData,
    trailer_url: trailerUrl,
    watch_providers: watchProviders,
  };

  const { data: updated, error: updateError } = await supabase
    .from("shows")
    .update(updates)
    .eq("id", showId)
    .select("*")
    .single();

  if (updateError) {
    // Retry without tmdb_fetched if column doesn't exist yet (pre-migration)
    const { data: updated2 } = await supabase
      .from("shows")
      .update({
        tmdb_id: found.id,
        title: found.name,
        poster_path: found.poster_path,
        first_air_date: found.first_air_date || null,
        overview: found.overview || null,
      })
      .eq("id", showId)
      .select("*")
      .single();
    return updated2;
  }

  return updated;
}
