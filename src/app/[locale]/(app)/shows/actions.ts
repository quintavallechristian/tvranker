"use server";

import { createClient } from "@/lib/supabase/server";
import { findByImdbId, searchShows, getShowDetails } from "@/lib/tmdb/client";

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
    show.tmdb_id === null;

  if (!needsFetch) return show;

  type TmdbResult = {
    id: number;
    name: string;
    poster_path: string | null;
    first_air_date: string;
    overview: string;
    vote_average: number;
  };

  let found: TmdbResult | null = null;

  // Strategy 1: lookup by existing positive tmdb_id
  if (show.tmdb_id !== null && show.tmdb_id > 0) {
    try {
      found = await getShowDetails(show.tmdb_id);
    } catch {
      /* fall through */
    }
  }

  // Strategy 2: lookup by IMDb ID
  if (!found && show.imdb_id) {
    try {
      found = await findByImdbId(show.imdb_id);
    } catch {
      /* fall through */
    }
  }

  // Strategy 3: search by title
  if (!found) {
    try {
      const data = await searchShows(show.title);
      found = data.results?.[0] ?? null;
    } catch {
      /* ignore */
    }
  }

  if (!found) {
    // Mark as fetched even if TMDB has no match, to avoid repeated lookups.
    // tmdb_fetched column is only present after migration — ignore errors if missing.
    await supabase
      .from("shows")
      .update({ tmdb_fetched: true } as Record<string, unknown>)
      .eq("id", showId)
      .then(
        () => null,
        () => null,
      ); // ignore errors
    return show;
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

  // Update the show with real TMDB data.
  // tmdb_fetched is only in updates after migration — PostgREST ignores unknown columns gracefully.
  const updates: Record<string, unknown> = {
    tmdb_id: found.id,
    title: found.name,
    poster_path: found.poster_path,
    first_air_date: found.first_air_date || null,
    overview: found.overview || null,
    tmdb_fetched: true,
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
