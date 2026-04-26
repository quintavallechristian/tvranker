"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { recordFeedEvent } from "@/lib/feed";
import {
  getMovieDetails,
  findByImdbId,
  searchMovies,
  extractTrailerUrl,
} from "@/lib/tmdb/client";
import type { TMDBMovieExtended } from "@/lib/tmdb/client";

export async function fetchMovieTmdbData(movieId: string) {
  const supabase = await createClient();

  const { data: movie } = await supabase
    .from("movies")
    .select("*")
    .eq("id", movieId)
    .single();

  if (!movie) return null;

  const needsFetch =
    movie.tmdb_fetched === false ||
    movie.tmdb_id === null ||
    (!movie.poster_path && !movie.overview);

  if (!needsFetch) return movie;

  let found: TMDBMovieExtended | null = null;

  // Strategy 1: lookup by existing positive tmdb_id
  if (movie.tmdb_id !== null && movie.tmdb_id > 0) {
    try {
      found = await getMovieDetails(movie.tmdb_id);
    } catch {
      /* fall through */
    }
  }

  // Strategy 2: lookup by IMDb ID
  if (!found && movie.imdb_id) {
    try {
      const { movie: movieMatch } = await findByImdbId(movie.imdb_id);
      if (movieMatch) {
        found = await getMovieDetails(movieMatch.id);
      }
    } catch {
      /* fall through */
    }
  }

  // Strategy 3: search by title
  if (!found) {
    try {
      const data = await searchMovies(movie.title);
      const first = data.results?.[0];
      if (first) {
        found = await getMovieDetails(first.id);
      }
    } catch {
      /* fall through */
    }
  }

  if (!found) {
    await supabase
      .from("movies")
      .update({ tmdb_fetched: true })
      .eq("id", movieId);
    return movie;
  }

  // Dedup: if another movie row already has this tmdb_id, merge and delete current
  const { data: existing } = await supabase
    .from("movies")
    .select("id")
    .eq("tmdb_id", found.id)
    .neq("id", movieId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("movie_list_items")
      .update({ movie_id: existing.id } as unknown as Record<string, unknown>)
      .eq("movie_id", movieId);
    await supabase.from("movies").delete().eq("id", movieId);
    return await supabase
      .from("movies")
      .select("*")
      .eq("id", existing.id)
      .single()
      .then((r) => r.data);
  }

  const trailerUrl = extractTrailerUrl(found.videos);
  const watchProviders = found["watch/providers"]?.results ?? null;
  const runtime = (found as unknown as { runtime?: number }).runtime ?? null;

  const { data: updated } = await supabase
    .from("movies")
    .update({
      tmdb_id: found.id,
      title: found.title,
      poster_path: found.poster_path,
      release_date: found.release_date || null,
      overview: found.overview || null,
      runtime,
      imdb_id:
        (found as unknown as { imdb_id?: string }).imdb_id ||
        movie.imdb_id ||
        null,
      trailer_url: trailerUrl,
      watch_providers: watchProviders,
      tmdb_fetched: true,
    })
    .eq("id", movieId)
    .select("*")
    .single();

  return updated ?? movie;
}

export type MovieItem = {
  id: string;
  movie_list_id: string;
  movie_id: string;
  rating: number | null;
  position: number;
  added_at: string;
  notes: string | null;
  movies: {
    id: string;
    tmdb_id: number | null;
    title: string;
    poster_path: string | null;
    release_date: string | null;
    overview: string | null;
  };
};

export async function addMovieToList(
  movieListId: string,
  movie: {
    tmdb_id: number;
    title: string;
    poster_path: string | null;
    release_date?: string;
    overview?: string;
  },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Upsert movie in movies table
  let { data: existingMovie } = await supabase
    .from("movies")
    .select("id")
    .eq("tmdb_id", movie.tmdb_id)
    .single();

  if (!existingMovie) {
    const { data: newMovie, error: movieError } = await supabase
      .from("movies")
      .insert({
        tmdb_id: movie.tmdb_id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date || null,
        overview: movie.overview || null,
      })
      .select()
      .single();

    if (movieError) throw new Error(movieError.message);
    existingMovie = newMovie;
  }

  // Check if already in list
  const { data: duplicate } = await supabase
    .from("movie_list_items")
    .select("id")
    .eq("movie_list_id", movieListId)
    .eq("movie_id", existingMovie!.id)
    .single();

  if (duplicate) return;

  // Get max position
  const { data: items } = await supabase
    .from("movie_list_items")
    .select("position")
    .eq("movie_list_id", movieListId)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (items?.[0]?.position ?? -1) + 1;

  const { error } = await supabase.from("movie_list_items").insert({
    movie_list_id: movieListId,
    movie_id: existingMovie!.id,
    position: nextPosition,
  });

  if (error) throw new Error(error.message);

  await recordFeedEvent(supabase, {
    userId: user.id,
    eventType: "add_item",
    contentType: "movie",
    itemId: existingMovie!.id,
    listId: movieListId,
    itemTitle: movie.title,
    posterPath: movie.poster_path,
  });

  revalidatePath("/movies");
}

export async function removeMovieFromList(itemId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("movie_list_items")
    .delete()
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath("/movies");
}

export async function clearMovieList() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: movieList } = await supabase
    .from("movie_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();
  if (!movieList) throw new Error("Movie list not found");

  const { error } = await supabase
    .from("movie_list_items")
    .delete()
    .eq("movie_list_id", movieList.id);

  if (error) throw new Error(error.message);

  revalidatePath("/movies");
}

export async function updateMovieRating(itemId: string, rating: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  if (rating < 1 || rating > 10) throw new Error("Rating must be 1-10");

  const { error } = await supabase
    .from("movie_list_items")
    .update({ rating })
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  const { data: itemData } = await supabase
    .from("movie_list_items")
    .select("movie_id, movie_list_id, movies(title, poster_path)")
    .eq("id", itemId)
    .single();

  if (itemData) {
    const movie = itemData.movies as unknown as {
      title: string;
      poster_path: string | null;
    };
    await recordFeedEvent(supabase, {
      userId: user.id,
      eventType: "rate_item",
      contentType: "movie",
      itemId: itemData.movie_id,
      listId: itemData.movie_list_id,
      itemTitle: movie?.title ?? "",
      posterPath: movie?.poster_path,
      rating,
    });
  }

  revalidatePath("/movies");
}

export async function updateMovieNotes(itemId: string, notes: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("movie_list_items")
    .update({ notes })
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath("/movies");
}

export async function reorderMovieListItems(itemIds: string[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const updates = itemIds.map((id, index) =>
    supabase.from("movie_list_items").update({ position: index }).eq("id", id),
  );

  await Promise.all(updates);

  revalidatePath("/movies");
}

export async function updateMovieListDescription(
  movieListId: string,
  description: string,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("movie_lists")
    .update({ description })
    .eq("id", movieListId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/movies");
}

export async function updateMovieListSettings(
  movieListId: string,
  updates: {
    is_public?: boolean;
    visible_to_followers?: boolean;
    visible_to_following?: boolean;
    rating_labels?: string[] | null;
    custom_visibility?: boolean;
  },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("movie_lists")
    .update(updates)
    .eq("id", movieListId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/movies");
}

export type ImportMode = "merge" | "replace";
export type DuplicateMode = "skip" | "update";
export type ImportOptions = { mode: ImportMode; duplicateMode: DuplicateMode };

export async function importToMyMovieList(
  jsonData: unknown,
  options: ImportOptions = { mode: "merge", duplicateMode: "skip" },
): Promise<{ importedCount: number }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: movieList } = await supabase
    .from("movie_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();
  if (!movieList) throw new Error("Movie list not found");

  const { parseTraktJson } = await import("@/lib/import/trakt-parser");
  const parsed = parseTraktJson(jsonData);

  // If replace mode: delete all existing items first
  if (options.mode === "replace") {
    await supabase
      .from("movie_list_items")
      .delete()
      .eq("movie_list_id", movieList.id);
  }

  const { data: existingItems } = await supabase
    .from("movie_list_items")
    .select("position")
    .eq("movie_list_id", movieList.id)
    .order("position", { ascending: false })
    .limit(1);

  let position = (existingItems?.[0]?.position ?? -1) + 1;
  let importedCount = 0;

  for (const show of parsed.shows) {
    // 1. Lookup by imdb_id
    let movieId: string | null = null;

    if (show.imdb_id) {
      const { data: found } = await supabase
        .from("movies")
        .select("id")
        .eq("imdb_id", show.imdb_id)
        .maybeSingle();
      if (found) movieId = found.id;
    }

    // 2. Fallback: title match
    if (!movieId) {
      const { data: found } = await supabase
        .from("movies")
        .select("id")
        .ilike("title", show.title)
        .maybeSingle();
      if (found) movieId = found.id;
    }

    // 3. Insert placeholder if not found
    if (!movieId) {
      const { data: inserted, error } = await supabase
        .from("movies")
        .insert({
          title: show.title,
          imdb_id: show.imdb_id ?? null,
          tmdb_id: null,
        })
        .select("id")
        .single();
      if (error) continue;
      movieId = inserted.id;
    }

    const rating =
      show.score != null && show.score >= 1 && show.score <= 10
        ? Math.round(show.score)
        : null;

    // Check for duplicate
    const { data: duplicate } = await supabase
      .from("movie_list_items")
      .select("id")
      .eq("movie_list_id", movieList.id)
      .eq("movie_id", movieId)
      .maybeSingle();

    if (duplicate) {
      if (options.mode === "merge" && options.duplicateMode === "update") {
        await supabase
          .from("movie_list_items")
          .update({
            rating,
            ...(show.added_at ? { added_at: show.added_at } : {}),
          })
          .eq("id", duplicate.id);
        importedCount++;
      }
      // else skip
    } else {
      const { error: insertError } = await supabase
        .from("movie_list_items")
        .insert({
          movie_list_id: movieList.id,
          movie_id: movieId,
          position: position++,
          rating,
          added_at: show.added_at ?? undefined,
        });

      if (!insertError) importedCount++;
    }
  }

  revalidatePath("/movies");
  return { importedCount };
}

export async function addMovieToMyList(movieId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Get or create current user's movie list
  let { data: movieList } = await supabase
    .from("movie_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!movieList) {
    const { data: created } = await supabase
      .from("movie_lists")
      .insert({ user_id: user.id, name: "My Movies" })
      .select("id")
      .single();
    movieList = created;
  }

  if (!movieList) throw new Error("Failed to get movie list");

  // Check if already in list
  const { data: existing } = await supabase
    .from("movie_list_items")
    .select("id")
    .eq("movie_list_id", movieList.id)
    .eq("movie_id", movieId)
    .maybeSingle();

  if (existing) return { alreadyExists: true };

  // Get max position
  const { data: items } = await supabase
    .from("movie_list_items")
    .select("position")
    .eq("movie_list_id", movieList.id)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (items?.[0]?.position ?? -1) + 1;

  await supabase.from("movie_list_items").insert({
    movie_list_id: movieList.id,
    movie_id: movieId,
    position: nextPosition,
  });

  const { data: movieData } = await supabase
    .from("movies")
    .select("title, poster_path")
    .eq("id", movieId)
    .single();

  if (movieData) {
    await recordFeedEvent(supabase, {
      userId: user.id,
      eventType: "add_item",
      contentType: "movie",
      itemId: movieId,
      listId: movieList.id,
      itemTitle: movieData.title,
      posterPath: movieData.poster_path,
    });
  }

  revalidatePath("/movies");
  return { alreadyExists: false };
}

export async function getMovieListItemsPage(
  movieListId: string,
  page: number,
  pageSize = 50,
): Promise<{ items: MovieItem[]; hasMore: boolean }> {
  const supabase = await createClient();

  const from = page * pageSize;
  const to = from + pageSize - 1;

  const { data } = await supabase
    .from("movie_list_items")
    .select("*, movies(*)")
    .eq("movie_list_id", movieListId)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(from, to);

  const items = (data ?? []) as unknown as MovieItem[];
  return { items, hasMore: items.length === pageSize };
}
