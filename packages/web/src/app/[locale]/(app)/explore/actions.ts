"use server";

import { createClient } from "@/lib/supabase/server";
import { scoreRecommendations, type UserList } from "@/lib/recommendations";
import { computeListSimilarity, type ListEntry } from "@/lib/similarity";

export type SimilarUser = {
  id: string;
  username: string;
  avatar_url: string | null;
  show_count: number;
  similarity: number;
  is_following: boolean;
};

export async function getSimilarUsers(): Promise<SimilarUser[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  // Get current user's list items
  const { data: myList } = await supabase
    .from("lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!myList) return [];

  const { data: myItems } = await supabase
    .from("list_items")
    .select("show_id, rating, position")
    .eq("list_id", myList.id)
    .order("position", { ascending: true });

  if (!myItems || myItems.length === 0) return [];

  const viewerList: ListEntry[] = myItems.map((i, idx) => ({
    showId: i.show_id,
    rating: i.rating,
    position: i.position ?? idx,
  }));

  // Fetch all public lists (excluding self) with profile info
  const { data: publicLists } = await supabase
    .from("lists")
    .select("id, user_id, profiles(id, username, avatar_url)")
    .eq("is_public", true)
    .neq("user_id", user.id);

  if (!publicLists || publicLists.length === 0) return [];

  const listIds = publicLists.map((l) => l.id);

  // Fetch all items for those lists in one batch
  const { data: allItems } = await supabase
    .from("list_items")
    .select("list_id, show_id, rating, position")
    .in("list_id", listIds);

  if (!allItems) return [];

  // Group items by list_id
  const itemsByList = new Map<string, ListEntry[]>();
  for (const item of allItems) {
    if (!itemsByList.has(item.list_id)) itemsByList.set(item.list_id, []);
    itemsByList.get(item.list_id)!.push({
      showId: item.show_id,
      rating: item.rating,
      position: item.position,
    });
  }

  // Check who the current user is already following
  const { data: followsData } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", user.id);

  const followingIds = new Set((followsData ?? []).map((f) => f.following_id));

  // Compute similarity for each user
  const results: SimilarUser[] = [];

  for (const list of publicLists) {
    const profile = Array.isArray(list.profiles)
      ? list.profiles[0]
      : list.profiles;
    if (!profile) continue;

    const otherItems = itemsByList.get(list.id) ?? [];
    if (otherItems.length === 0) continue;

    const similarity = computeListSimilarity(viewerList, otherItems);
    if (similarity === 0) continue;

    results.push({
      id: profile.id,
      username: profile.username,
      avatar_url: profile.avatar_url,
      show_count: otherItems.length,
      similarity,
      is_following: followingIds.has(profile.id),
    });
  }

  // Sort by similarity descending, return top 3
  return results.sort((a, b) => b.similarity - a.similarity).slice(0, 3);
}

export type RecommendedShow = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
  score: number;
  recommendedBy: number;
};

export async function getRecommendations(): Promise<RecommendedShow[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  // 1. Get current user's list + items
  const { data: myList } = await supabase
    .from("lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!myList) return [];

  const { data: myItems } = await supabase
    .from("list_items")
    .select("show_id, rating, position")
    .eq("list_id", myList.id)
    .order("position", { ascending: true });

  if (!myItems || myItems.length === 0) return [];

  const viewerList: ListEntry[] = myItems.map((i, idx) => ({
    showId: i.show_id,
    rating: i.rating,
    position: i.position ?? idx,
  }));

  // 2. Fetch all other public lists with their items in one query
  const { data: publicLists } = await supabase
    .from("lists")
    .select("id, user_id")
    .eq("is_public", true)
    .neq("user_id", user.id);

  if (!publicLists || publicLists.length === 0) return [];

  const listIds = publicLists.map((l) => l.id);

  // Fetch all list items for those lists in one batch
  const { data: allItems } = await supabase
    .from("list_items")
    .select("list_id, show_id, rating, position")
    .in("list_id", listIds)
    .order("position", { ascending: true });

  if (!allItems || allItems.length === 0) return [];

  // 3. Group items by user
  const listToUser = new Map<string, string>();
  for (const l of publicLists) {
    listToUser.set(l.id, l.user_id);
  }

  const userItemsMap = new Map<string, ListEntry[]>();
  for (const item of allItems) {
    const userId = listToUser.get(item.list_id);
    if (!userId) continue;
    if (!userItemsMap.has(userId)) userItemsMap.set(userId, []);
    userItemsMap.get(userId)!.push({
      showId: item.show_id,
      rating: item.rating,
      position: item.position,
    });
  }

  const otherLists: UserList[] = [];
  for (const [userId, items] of userItemsMap) {
    otherLists.push({ userId, items });
  }

  // 4. Run scoring algorithm
  const scored = scoreRecommendations(viewerList, otherLists);

  if (scored.length === 0) return [];

  // 5. Fetch show metadata for recommended shows
  const showIds = scored.map((s) => s.showId);
  const { data: shows } = await supabase
    .from("shows")
    .select("id, tmdb_id, title, poster_path, first_air_date, overview")
    .in("id", showIds);

  if (!shows) return [];

  const showMap = new Map(shows.map((s) => [s.id, s]));

  return scored
    .map((s) => {
      const show = showMap.get(s.showId);
      if (!show) return null;
      return {
        id: show.id,
        tmdb_id: show.tmdb_id,
        title: show.title,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date,
        overview: show.overview,
        score: Math.round(s.score * 100) / 100,
        recommendedBy: s.recommendedBy,
      };
    })
    .filter((r): r is RecommendedShow => r !== null);
}

export type PopularShow = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
  addedCount: number;
};

export async function getPopularShows(): Promise<PopularShow[]> {
  const supabase = await createClient();

  // Get all public list IDs
  const { data: publicLists } = await supabase
    .from("lists")
    .select("id")
    .eq("is_public", true);

  if (!publicLists || publicLists.length === 0) return [];

  const publicListIds = publicLists.map((l) => l.id);

  // Get all items from public lists
  const { data: items } = await supabase
    .from("list_items")
    .select("show_id")
    .in("list_id", publicListIds);

  if (!items || items.length === 0) return [];

  // Count occurrences per show
  const countMap = new Map<string, number>();
  for (const item of items) {
    countMap.set(item.show_id, (countMap.get(item.show_id) ?? 0) + 1);
  }

  // Sort by count, take top 12
  const topEntries = Array.from(countMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  const showIds = topEntries.map(([id]) => id);

  const { data: shows } = await supabase
    .from("shows")
    .select("id, tmdb_id, title, poster_path, first_air_date, overview")
    .in("id", showIds);

  if (!shows) return [];

  const showMap = new Map(shows.map((s) => [s.id, s]));

  return topEntries
    .map(([id, count]) => {
      const show = showMap.get(id);
      if (!show) return null;
      return {
        id: show.id,
        tmdb_id: show.tmdb_id,
        title: show.title,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date,
        overview: show.overview,
        addedCount: count,
      };
    })
    .filter((r): r is PopularShow => r !== null);
}

export async function getOrCreateShowByTmdbId(show: {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
}): Promise<string> {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("shows")
    .select("id")
    .eq("tmdb_id", show.tmdb_id)
    .single();

  if (existing) return existing.id;

  const { data: newShow, error } = await supabase
    .from("shows")
    .insert({
      tmdb_id: show.tmdb_id,
      title: show.title,
      poster_path: show.poster_path,
      first_air_date: show.first_air_date,
      overview: show.overview,
    })
    .select("id")
    .single();

  if (error || !newShow)
    throw new Error(error?.message ?? "Failed to create show");
  return newShow.id;
}

// ── Movies ────────────────────────────────────────────────────────────────────

export type PopularMovie = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview: string | null;
  addedCount: number;
};

export async function getPopularMovies(): Promise<PopularMovie[]> {
  const supabase = await createClient();

  const { data: publicLists } = await supabase
    .from("movie_lists")
    .select("id")
    .eq("is_public", true);

  if (!publicLists || publicLists.length === 0) return [];

  const publicListIds = publicLists.map((l) => l.id);

  const { data: items } = await supabase
    .from("movie_list_items")
    .select("movie_id")
    .in("movie_list_id", publicListIds);

  if (!items || items.length === 0) return [];

  const countMap = new Map<string, number>();
  for (const item of items) {
    countMap.set(item.movie_id, (countMap.get(item.movie_id) ?? 0) + 1);
  }

  const topEntries = Array.from(countMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  const movieIds = topEntries.map(([id]) => id);

  const { data: movies } = await supabase
    .from("movies")
    .select("id, tmdb_id, title, poster_path, release_date, overview")
    .in("id", movieIds);

  if (!movies) return [];

  const movieMap = new Map(movies.map((m) => [m.id, m]));

  return topEntries
    .map(([id, count]) => {
      const movie = movieMap.get(id);
      if (!movie) return null;
      return {
        id: movie.id,
        tmdb_id: movie.tmdb_id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date ?? null,
        overview: movie.overview,
        addedCount: count,
      };
    })
    .filter((r): r is PopularMovie => r !== null);
}

export async function addTmdbMovieToMyList(movie: {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview: string | null;
}): Promise<{ alreadyExists: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Get or create user's movie list
  let { data: movieList } = await supabase
    .from("movie_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!movieList) {
    const { data: newList, error } = await supabase
      .from("movie_lists")
      .insert({ user_id: user.id })
      .select("id")
      .single();
    if (error || !newList)
      throw new Error(error?.message ?? "Failed to create movie list");
    movieList = newList;
  }

  // Upsert movie in movies table
  let { data: existingMovie } = await supabase
    .from("movies")
    .select("id")
    .eq("tmdb_id", movie.tmdb_id)
    .single();

  if (!existingMovie) {
    const { data: newMovie, error } = await supabase
      .from("movies")
      .insert({
        tmdb_id: movie.tmdb_id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        overview: movie.overview,
      })
      .select("id")
      .single();
    if (error || !newMovie)
      throw new Error(error?.message ?? "Failed to create movie");
    existingMovie = newMovie;
  }

  // Check for duplicate
  const { data: duplicate } = await supabase
    .from("movie_list_items")
    .select("id")
    .eq("movie_list_id", movieList.id)
    .eq("movie_id", existingMovie.id)
    .single();

  if (duplicate) return { alreadyExists: true };

  const { data: posItems } = await supabase
    .from("movie_list_items")
    .select("position")
    .eq("movie_list_id", movieList.id)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (posItems?.[0]?.position ?? -1) + 1;

  await supabase.from("movie_list_items").insert({
    movie_list_id: movieList.id,
    movie_id: existingMovie.id,
    position: nextPosition,
  });

  return { alreadyExists: false };
}

export async function getOrCreateMovieByTmdbId(movie: {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview: string | null;
}): Promise<string> {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("movies")
    .select("id")
    .eq("tmdb_id", movie.tmdb_id)
    .single();

  if (existing) return existing.id;

  const { data: newMovie, error } = await supabase
    .from("movies")
    .insert({
      tmdb_id: movie.tmdb_id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      overview: movie.overview,
    })
    .select("id")
    .single();

  if (error || !newMovie)
    throw new Error(error?.message ?? "Failed to create movie");
  return newMovie.id;
}
