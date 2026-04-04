"use server";

import { createClient } from "@/lib/supabase/server";
import { recordFeedEvent } from "@/lib/feed";
import { scoreRecommendations, type UserList } from "@/lib/recommendations";
import { computeListSimilarity, type ListEntry } from "@/lib/similarity";
import { fetchAllRows } from "@/lib/supabase/fetchAll";

export type SimilarUser = {
  id: string;
  username: string;
  avatar_url: string | null;
  lists_compiled: number;
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

  const myItems = await fetchAllRows((from, to) =>
    supabase
      .from("list_items")
      .select("show_id, rating, position")
      .eq("list_id", myList.id)
      .order("position", { ascending: true })
      .range(from, to),
  );

  if (myItems.length === 0) return [];

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
  const allItems = await fetchAllRows((from, to) =>
    supabase
      .from("list_items")
      .select("list_id, show_id, rating, position")
      .in("list_id", listIds)
      .range(from, to),
  );

  if (allItems.length === 0) return [];

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
  type PreliminaryResult = Omit<SimilarUser, "lists_compiled"> & {
    profileId: string;
    showsCompiled: number;
  };
  const preliminary: PreliminaryResult[] = [];

  for (const list of publicLists) {
    const profile = Array.isArray(list.profiles)
      ? list.profiles[0]
      : list.profiles;
    if (!profile) continue;

    const otherItems = itemsByList.get(list.id) ?? [];
    if (otherItems.length === 0) continue;

    const similarity = computeListSimilarity(viewerList, otherItems);
    if (similarity === 0) continue;

    preliminary.push({
      id: profile.id,
      profileId: profile.id,
      username: profile.username,
      avatar_url: profile.avatar_url,
      showsCompiled: 1,
      similarity,
      is_following: followingIds.has(profile.id),
    });
  }

  // Sort by similarity descending, get top 3
  const top3 = preliminary
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);

  if (top3.length === 0) return [];

  // Fetch movie/anime/game lists for top 3 only to compute lists_compiled
  const topUserIds = top3.map((r) => r.profileId);
  const [
    { data: movieListsData },
    { data: animeListsData },
    { data: gameListsData },
  ] = await Promise.all([
    supabase
      .from("movie_lists")
      .select("id, user_id")
      .in("user_id", topUserIds),
    supabase
      .from("anime_lists")
      .select("id, user_id")
      .in("user_id", topUserIds),
    supabase.from("game_lists").select("id, user_id").in("user_id", topUserIds),
  ]);

  const movieListIdByUser = new Map(
    (movieListsData ?? []).map((ml) => [ml.user_id, ml.id]),
  );
  const animeListIdByUser = new Map(
    (animeListsData ?? []).map((al) => [al.user_id, al.id]),
  );
  const gameListIdByUser = new Map(
    (gameListsData ?? []).map((gl) => [gl.user_id, gl.id]),
  );

  const allMovieListIds = [...movieListIdByUser.values()];
  const allAnimeListIds = [...animeListIdByUser.values()];
  const allGameListIds = [...gameListIdByUser.values()];

  const [
    { data: movieItemsExist },
    { data: animeItemsExist },
    { data: gameItemsExist },
  ] = await Promise.all([
    allMovieListIds.length > 0
      ? supabase
          .from("movie_list_items")
          .select("movie_list_id")
          .in("movie_list_id", allMovieListIds)
      : Promise.resolve({ data: [] as Array<{ movie_list_id: string }> }),
    allAnimeListIds.length > 0
      ? supabase
          .from("anime_list_items")
          .select("anime_list_id")
          .in("anime_list_id", allAnimeListIds)
      : Promise.resolve({ data: [] as Array<{ anime_list_id: string }> }),
    allGameListIds.length > 0
      ? supabase
          .from("game_list_items")
          .select("game_list_id")
          .in("game_list_id", allGameListIds)
      : Promise.resolve({ data: [] as Array<{ game_list_id: string }> }),
  ]);

  const movieListIdsWithItems = new Set(
    (movieItemsExist ?? []).map((i) => i.movie_list_id),
  );
  const animeListIdsWithItems = new Set(
    (animeItemsExist ?? []).map((i) => i.anime_list_id),
  );
  const gameListIdsWithItems = new Set(
    (gameItemsExist ?? []).map((i) => i.game_list_id),
  );

  return top3.map((r) => {
    const movieListId = movieListIdByUser.get(r.profileId);
    const moviesCompiled =
      movieListId && movieListIdsWithItems.has(movieListId) ? 1 : 0;
    const animeListId = animeListIdByUser.get(r.profileId);
    const animeCompiled =
      animeListId && animeListIdsWithItems.has(animeListId) ? 1 : 0;
    const gameListId = gameListIdByUser.get(r.profileId);
    const gamesCompiled =
      gameListId && gameListIdsWithItems.has(gameListId) ? 1 : 0;
    const { profileId, showsCompiled, ...rest } = r;
    return {
      ...rest,
      lists_compiled:
        showsCompiled + moviesCompiled + animeCompiled + gamesCompiled,
    };
  });
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

  const myItems = await fetchAllRows((from, to) =>
    supabase
      .from("list_items")
      .select("show_id, rating, position")
      .eq("list_id", myList.id)
      .order("position", { ascending: true })
      .range(from, to),
  );

  if (myItems.length === 0) return [];

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
  const allItems = await fetchAllRows((from, to) =>
    supabase
      .from("list_items")
      .select("list_id, show_id, rating, position")
      .in("list_id", listIds)
      .order("position", { ascending: true })
      .range(from, to),
  );

  if (allItems.length === 0) return [];

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

export type RecommendedMovie = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview: string | null;
  score: number;
  recommendedBy: number;
};

export async function getMovieRecommendations(): Promise<RecommendedMovie[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: myMovieList } = await supabase
    .from("movie_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!myMovieList) return [];

  const { data: myItems } = await supabase
    .from("movie_list_items")
    .select("movie_id, rating, position")
    .eq("movie_list_id", myMovieList.id)
    .order("position", { ascending: true });

  if (!myItems || myItems.length === 0) return [];

  // Map movie_id → showId for the generic similarity algorithm
  const viewerList: ListEntry[] = myItems.map((i, idx) => ({
    showId: i.movie_id,
    rating: i.rating,
    position: i.position ?? idx,
  }));

  const { data: publicLists } = await supabase
    .from("movie_lists")
    .select("id, user_id")
    .eq("is_public", true)
    .neq("user_id", user.id);

  if (!publicLists || publicLists.length === 0) return [];

  const listIds = publicLists.map((l) => l.id);

  const { data: allItems } = await supabase
    .from("movie_list_items")
    .select("movie_list_id, movie_id, rating, position")
    .in("movie_list_id", listIds)
    .order("position", { ascending: true });

  if (!allItems || allItems.length === 0) return [];

  const listToUser = new Map<string, string>();
  for (const l of publicLists) {
    listToUser.set(l.id, l.user_id);
  }

  const userItemsMap = new Map<string, ListEntry[]>();
  for (const item of allItems) {
    const userId = listToUser.get(item.movie_list_id);
    if (!userId) continue;
    if (!userItemsMap.has(userId)) userItemsMap.set(userId, []);
    userItemsMap.get(userId)!.push({
      showId: item.movie_id,
      rating: item.rating,
      position: item.position,
    });
  }

  const otherLists: UserList[] = [];
  for (const [userId, items] of userItemsMap) {
    otherLists.push({ userId, items });
  }

  const scored = scoreRecommendations(viewerList, otherLists);

  if (scored.length === 0) return [];

  const movieIds = scored.map((s) => s.showId);
  const { data: movies } = await supabase
    .from("movies")
    .select("id, tmdb_id, title, poster_path, release_date, overview")
    .in("id", movieIds);

  if (!movies) return [];

  const movieMap = new Map(movies.map((m) => [m.id, m]));

  return scored
    .map((s) => {
      const movie = movieMap.get(s.showId);
      if (!movie) return null;
      return {
        id: movie.id,
        tmdb_id: movie.tmdb_id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date ?? null,
        overview: movie.overview,
        score: Math.round(s.score * 100) / 100,
        recommendedBy: s.recommendedBy,
      };
    })
    .filter((r): r is RecommendedMovie => r !== null);
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

  await recordFeedEvent(supabase, {
    userId: user.id,
    eventType: "add_item",
    contentType: "movie",
    itemId: existingMovie.id,
    listId: movieList.id,
    itemTitle: movie.title,
    posterPath: movie.poster_path,
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

// ── Anime ─────────────────────────────────────────────────────────────────────

export type PopularAnime = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
  addedCount: number;
};

export async function getPopularAnime(): Promise<PopularAnime[]> {
  const supabase = await createClient();

  const { data: publicLists } = await supabase
    .from("anime_lists")
    .select("id")
    .eq("is_public", true);

  if (!publicLists || publicLists.length === 0) return [];

  const publicListIds = publicLists.map((l) => l.id);

  const { data: items } = await supabase
    .from("anime_list_items")
    .select("anime_id")
    .in("anime_list_id", publicListIds);

  if (!items || items.length === 0) return [];

  const countMap = new Map<string, number>();
  for (const item of items) {
    countMap.set(item.anime_id, (countMap.get(item.anime_id) ?? 0) + 1);
  }

  const topEntries = Array.from(countMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  const animeIds = topEntries.map(([id]) => id);

  const { data: animes } = await supabase
    .from("animes")
    .select("id, tmdb_id, title, poster_path, first_air_date, overview")
    .in("id", animeIds);

  if (!animes) return [];

  const animeMap = new Map(animes.map((a) => [a.id, a]));

  return topEntries
    .map(([id, count]) => {
      const anime = animeMap.get(id);
      if (!anime) return null;
      return {
        id: anime.id,
        tmdb_id: anime.tmdb_id,
        title: anime.title,
        poster_path: anime.poster_path,
        first_air_date: anime.first_air_date ?? null,
        overview: anime.overview,
        addedCount: count,
      };
    })
    .filter((r): r is PopularAnime => r !== null);
}

export type RecommendedAnime = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
  score: number;
  recommendedBy: number;
};

export async function getAnimeRecommendations(): Promise<RecommendedAnime[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: myAnimeList } = await supabase
    .from("anime_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!myAnimeList) return [];

  const { data: myItems } = await supabase
    .from("anime_list_items")
    .select("anime_id, rating, position")
    .eq("anime_list_id", myAnimeList.id)
    .order("position", { ascending: true });

  if (!myItems || myItems.length === 0) return [];

  const viewerList: ListEntry[] = myItems.map((i, idx) => ({
    showId: i.anime_id,
    rating: i.rating,
    position: i.position ?? idx,
  }));

  const { data: publicLists } = await supabase
    .from("anime_lists")
    .select("id, user_id")
    .eq("is_public", true)
    .neq("user_id", user.id);

  if (!publicLists || publicLists.length === 0) return [];

  const listIds = publicLists.map((l) => l.id);

  const { data: allItems } = await supabase
    .from("anime_list_items")
    .select("anime_list_id, anime_id, rating, position")
    .in("anime_list_id", listIds)
    .order("position", { ascending: true });

  if (!allItems || allItems.length === 0) return [];

  const listToUser = new Map<string, string>();
  for (const l of publicLists) {
    listToUser.set(l.id, l.user_id);
  }

  const userItemsMap = new Map<string, ListEntry[]>();
  for (const item of allItems) {
    const userId = listToUser.get(item.anime_list_id);
    if (!userId) continue;
    if (!userItemsMap.has(userId)) userItemsMap.set(userId, []);
    userItemsMap.get(userId)!.push({
      showId: item.anime_id,
      rating: item.rating,
      position: item.position,
    });
  }

  const otherLists: UserList[] = [];
  for (const [userId, items] of userItemsMap) {
    otherLists.push({ userId, items });
  }

  const scored = scoreRecommendations(viewerList, otherLists);

  if (scored.length === 0) return [];

  const animeIds = scored.map((s) => s.showId);
  const { data: animes } = await supabase
    .from("animes")
    .select("id, tmdb_id, title, poster_path, first_air_date, overview")
    .in("id", animeIds);

  if (!animes) return [];

  const animeMap = new Map(animes.map((a) => [a.id, a]));

  return scored
    .map((s) => {
      const anime = animeMap.get(s.showId);
      if (!anime) return null;
      return {
        id: anime.id,
        tmdb_id: anime.tmdb_id,
        title: anime.title,
        poster_path: anime.poster_path,
        first_air_date: anime.first_air_date ?? null,
        overview: anime.overview,
        score: Math.round(s.score * 100) / 100,
        recommendedBy: s.recommendedBy,
      };
    })
    .filter((r): r is RecommendedAnime => r !== null);
}

export async function addTmdbAnimeToMyList(anime: {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
}): Promise<{ alreadyExists: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  let { data: animeList } = await supabase
    .from("anime_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!animeList) {
    const { data: newList, error } = await supabase
      .from("anime_lists")
      .insert({ user_id: user.id })
      .select("id")
      .single();
    if (error || !newList)
      throw new Error(error?.message ?? "Failed to create anime list");
    animeList = newList;
  }

  let { data: existingAnime } = await supabase
    .from("animes")
    .select("id")
    .eq("tmdb_id", anime.tmdb_id)
    .single();

  if (!existingAnime) {
    const { data: newAnime, error } = await supabase
      .from("animes")
      .insert({
        tmdb_id: anime.tmdb_id,
        title: anime.title,
        poster_path: anime.poster_path,
        first_air_date: anime.first_air_date,
        overview: anime.overview,
      })
      .select("id")
      .single();
    if (error || !newAnime)
      throw new Error(error?.message ?? "Failed to create anime");
    existingAnime = newAnime;
  }

  const { data: duplicate } = await supabase
    .from("anime_list_items")
    .select("id")
    .eq("anime_list_id", animeList.id)
    .eq("anime_id", existingAnime.id)
    .single();

  if (duplicate) return { alreadyExists: true };

  const { data: posItems } = await supabase
    .from("anime_list_items")
    .select("position")
    .eq("anime_list_id", animeList.id)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (posItems?.[0]?.position ?? -1) + 1;

  await supabase.from("anime_list_items").insert({
    anime_list_id: animeList.id,
    anime_id: existingAnime.id,
    position: nextPosition,
  });

  await recordFeedEvent(supabase, {
    userId: user.id,
    eventType: "add_item",
    contentType: "anime",
    itemId: existingAnime.id,
    listId: animeList.id,
    itemTitle: anime.title,
    posterPath: anime.poster_path,
  });

  return { alreadyExists: false };
}
