"use server";

import { createClient } from "@/lib/supabase/server";
import { recordFeedEvent } from "@/lib/feed";
import { scoreRecommendations, type UserList } from "@/lib/recommendations";
import {
  computeListSimilarity,
  computeMovieListSimilarity,
  computeAnimeListSimilarity,
  computeGameListSimilarity,
  computeBoardgameListSimilarity,
  type ListEntry,
  type MovieListEntry,
  type AnimeListEntry,
  type GameListEntry,
  type BoardgameListEntry,
} from "@/lib/similarity";
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

  const [myShowList, myMovieList, myAnimeList, myGameList, myBoardgameList] =
    await Promise.all([
      supabase.from("lists").select("id").eq("user_id", user.id).single(),
      supabase.from("movie_lists").select("id").eq("user_id", user.id).single(),
      supabase.from("anime_lists").select("id").eq("user_id", user.id).single(),
      supabase.from("game_lists").select("id").eq("user_id", user.id).single(),
      supabase
        .from("boardgame_lists")
        .select("id")
        .eq("user_id", user.id)
        .single(),
    ]);

  const [
    myShowItems,
    myMovieItems,
    myAnimeItems,
    myGameItems,
    myBoardgameItems,
  ] = await Promise.all([
    myShowList.data
      ? fetchAllRows((from, to) =>
          supabase
            .from("list_items")
            .select("show_id, rating, position")
            .eq("list_id", myShowList.data.id)
            .order("position", { ascending: true })
            .range(from, to),
        )
      : Promise.resolve([]),
    myMovieList.data
      ? fetchAllRows((from, to) =>
          supabase
            .from("movie_list_items")
            .select("movie_id, rating, position")
            .eq("movie_list_id", myMovieList.data.id)
            .order("position", { ascending: true })
            .range(from, to),
        )
      : Promise.resolve([]),
    myAnimeList.data
      ? fetchAllRows((from, to) =>
          supabase
            .from("anime_list_items")
            .select("anime_id, rating, position")
            .eq("anime_list_id", myAnimeList.data.id)
            .order("position", { ascending: true })
            .range(from, to),
        )
      : Promise.resolve([]),
    myGameList.data
      ? fetchAllRows((from, to) =>
          supabase
            .from("game_list_items")
            .select("game_id, rating, position")
            .eq("game_list_id", myGameList.data.id)
            .order("position", { ascending: true })
            .range(from, to),
        )
      : Promise.resolve([]),
    myBoardgameList.data
      ? fetchAllRows((from, to) =>
          supabase
            .from("boardgame_list_items")
            .select("boardgame_id, rating, position")
            .eq("boardgame_list_id", myBoardgameList.data.id)
            .order("position", { ascending: true })
            .range(from, to),
        )
      : Promise.resolve([]),
  ]);

  const viewerShowList: ListEntry[] = myShowItems.map((i, idx) => ({
    showId: i.show_id,
    rating: i.rating,
    position: i.position ?? idx,
  }));
  const viewerMovieList: MovieListEntry[] = myMovieItems.map((i, idx) => ({
    movieId: i.movie_id,
    rating: i.rating,
    position: i.position ?? idx,
  }));
  const viewerAnimeList: AnimeListEntry[] = myAnimeItems.map((i, idx) => ({
    animeId: i.anime_id,
    rating: i.rating,
    position: i.position ?? idx,
  }));
  const viewerGameList: GameListEntry[] = myGameItems.map((i, idx) => ({
    gameId: i.game_id,
    rating: i.rating,
    position: i.position ?? idx,
  }));
  const viewerBoardgameList: BoardgameListEntry[] = myBoardgameItems.map(
    (i, idx) => ({
      boardgameId: i.boardgame_id,
      rating: i.rating,
      position: i.position ?? idx,
    }),
  );

  const [showLists, movieLists, animeLists, gameLists, boardgameLists] =
    await Promise.all([
      supabase
        .from("lists")
        .select("id, user_id")
        .eq("is_public", true)
        .neq("user_id", user.id),
      supabase
        .from("movie_lists")
        .select("id, user_id")
        .eq("is_public", true)
        .neq("user_id", user.id),
      supabase
        .from("anime_lists")
        .select("id, user_id")
        .eq("is_public", true)
        .neq("user_id", user.id),
      supabase
        .from("game_lists")
        .select("id, user_id")
        .eq("is_public", true)
        .neq("user_id", user.id),
      supabase
        .from("boardgame_lists")
        .select("id, user_id")
        .eq("is_public", true)
        .neq("user_id", user.id),
    ]);

  const allUserIds = new Set<string>();
  for (const row of showLists.data ?? []) allUserIds.add(row.user_id);
  for (const row of movieLists.data ?? []) allUserIds.add(row.user_id);
  for (const row of animeLists.data ?? []) allUserIds.add(row.user_id);
  for (const row of gameLists.data ?? []) allUserIds.add(row.user_id);
  for (const row of boardgameLists.data ?? []) allUserIds.add(row.user_id);
  if (allUserIds.size === 0) return [];

  const userIds = [...allUserIds];

  const [profilesData, followsData] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .in("id", userIds),
    supabase
      .from("follows")
      .select("following_id")
      .eq("follower_id", user.id)
      .in("following_id", userIds),
  ]);

  const profileMap = new Map((profilesData.data ?? []).map((p) => [p.id, p]));
  const followingIds = new Set(
    (followsData.data ?? []).map((f) => f.following_id),
  );

  const showListToUser = new Map(
    (showLists.data ?? []).map((l) => [l.id, l.user_id]),
  );
  const movieListToUser = new Map(
    (movieLists.data ?? []).map((l) => [l.id, l.user_id]),
  );
  const animeListToUser = new Map(
    (animeLists.data ?? []).map((l) => [l.id, l.user_id]),
  );
  const gameListToUser = new Map(
    (gameLists.data ?? []).map((l) => [l.id, l.user_id]),
  );
  const boardgameListToUser = new Map(
    (boardgameLists.data ?? []).map((l) => [l.id, l.user_id]),
  );

  const [
    allShowItems,
    allMovieItems,
    allAnimeItems,
    allGameItems,
    allBoardgameItems,
  ] = await Promise.all([
    showListToUser.size > 0
      ? fetchAllRows((from, to) =>
          supabase
            .from("list_items")
            .select("list_id, show_id, rating, position")
            .in("list_id", [...showListToUser.keys()])
            .range(from, to),
        )
      : Promise.resolve([]),
    movieListToUser.size > 0
      ? fetchAllRows((from, to) =>
          supabase
            .from("movie_list_items")
            .select("movie_list_id, movie_id, rating, position")
            .in("movie_list_id", [...movieListToUser.keys()])
            .range(from, to),
        )
      : Promise.resolve([]),
    animeListToUser.size > 0
      ? fetchAllRows((from, to) =>
          supabase
            .from("anime_list_items")
            .select("anime_list_id, anime_id, rating, position")
            .in("anime_list_id", [...animeListToUser.keys()])
            .range(from, to),
        )
      : Promise.resolve([]),
    gameListToUser.size > 0
      ? fetchAllRows((from, to) =>
          supabase
            .from("game_list_items")
            .select("game_list_id, game_id, rating, position")
            .in("game_list_id", [...gameListToUser.keys()])
            .range(from, to),
        )
      : Promise.resolve([]),
    boardgameListToUser.size > 0
      ? fetchAllRows((from, to) =>
          supabase
            .from("boardgame_list_items")
            .select("boardgame_list_id, boardgame_id, rating, position")
            .in("boardgame_list_id", [...boardgameListToUser.keys()])
            .range(from, to),
        )
      : Promise.resolve([]),
  ]);

  const showsByUser = new Map<string, ListEntry[]>();
  for (const item of allShowItems) {
    const uid = showListToUser.get(item.list_id);
    if (!uid) continue;
    if (!showsByUser.has(uid)) showsByUser.set(uid, []);
    showsByUser.get(uid)!.push({
      showId: item.show_id,
      rating: item.rating,
      position: item.position ?? 0,
    });
  }

  const moviesByUser = new Map<string, MovieListEntry[]>();
  for (const item of allMovieItems) {
    const uid = movieListToUser.get(item.movie_list_id);
    if (!uid) continue;
    if (!moviesByUser.has(uid)) moviesByUser.set(uid, []);
    moviesByUser.get(uid)!.push({
      movieId: item.movie_id,
      rating: item.rating,
      position: item.position ?? 0,
    });
  }

  const animeByUser = new Map<string, AnimeListEntry[]>();
  for (const item of allAnimeItems) {
    const uid = animeListToUser.get(item.anime_list_id);
    if (!uid) continue;
    if (!animeByUser.has(uid)) animeByUser.set(uid, []);
    animeByUser.get(uid)!.push({
      animeId: item.anime_id,
      rating: item.rating,
      position: item.position ?? 0,
    });
  }

  const gamesByUser = new Map<string, GameListEntry[]>();
  for (const item of allGameItems) {
    const uid = gameListToUser.get(item.game_list_id);
    if (!uid) continue;
    if (!gamesByUser.has(uid)) gamesByUser.set(uid, []);
    gamesByUser.get(uid)!.push({
      gameId: item.game_id,
      rating: item.rating,
      position: item.position ?? 0,
    });
  }

  const boardgamesByUser = new Map<string, BoardgameListEntry[]>();
  for (const item of allBoardgameItems) {
    const uid = boardgameListToUser.get(item.boardgame_list_id);
    if (!uid) continue;
    if (!boardgamesByUser.has(uid)) boardgamesByUser.set(uid, []);
    boardgamesByUser.get(uid)!.push({
      boardgameId: item.boardgame_id,
      rating: item.rating,
      position: item.position ?? 0,
    });
  }

  const results: SimilarUser[] = [];
  for (const uid of userIds) {
    const profile = profileMap.get(uid);
    if (!profile) continue;

    const scores: number[] = [];
    const otherShows = showsByUser.get(uid) ?? [];
    const otherMovies = moviesByUser.get(uid) ?? [];
    const otherAnime = animeByUser.get(uid) ?? [];
    const otherGames = gamesByUser.get(uid) ?? [];
    const otherBoardgames = boardgamesByUser.get(uid) ?? [];

    if (viewerShowList.length > 0 && otherShows.length > 0) {
      scores.push(computeListSimilarity(viewerShowList, otherShows));
    }
    if (viewerMovieList.length > 0 && otherMovies.length > 0) {
      scores.push(computeMovieListSimilarity(viewerMovieList, otherMovies));
    }
    if (viewerAnimeList.length > 0 && otherAnime.length > 0) {
      scores.push(computeAnimeListSimilarity(viewerAnimeList, otherAnime));
    }
    if (viewerGameList.length > 0 && otherGames.length > 0) {
      scores.push(computeGameListSimilarity(viewerGameList, otherGames));
    }
    if (viewerBoardgameList.length > 0 && otherBoardgames.length > 0) {
      scores.push(
        computeBoardgameListSimilarity(viewerBoardgameList, otherBoardgames),
      );
    }

    if (scores.length === 0) continue;
    const similarity = Math.round(
      scores.reduce((sum, value) => sum + value, 0) / scores.length,
    );
    if (similarity === 0) continue;

    const listsCompiled =
      (otherShows.length > 0 ? 1 : 0) +
      (otherMovies.length > 0 ? 1 : 0) +
      (otherAnime.length > 0 ? 1 : 0) +
      (otherGames.length > 0 ? 1 : 0) +
      (otherBoardgames.length > 0 ? 1 : 0);

    results.push({
      id: profile.id,
      username: profile.username,
      avatar_url: profile.avatar_url,
      lists_compiled: listsCompiled,
      similarity,
      is_following: followingIds.has(profile.id),
    });
  }

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

export type RecommendedGame = {
  id: string;
  igdb_id: number | null;
  title: string;
  cover_url: string | null;
  first_release_date: string | null;
  overview: string | null;
  score: number;
  recommendedBy: number;
};

export async function getGameRecommendations(): Promise<RecommendedGame[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: myGameList } = await supabase
    .from("game_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!myGameList) return [];

  const { data: myItems } = await supabase
    .from("game_list_items")
    .select("game_id, rating, position")
    .eq("game_list_id", myGameList.id)
    .order("position", { ascending: true });

  if (!myItems || myItems.length === 0) return [];

  const viewerList: ListEntry[] = myItems.map((i, idx) => ({
    showId: i.game_id,
    rating: i.rating,
    position: i.position ?? idx,
  }));

  const { data: publicLists } = await supabase
    .from("game_lists")
    .select("id, user_id")
    .eq("is_public", true)
    .neq("user_id", user.id);

  if (!publicLists || publicLists.length === 0) return [];

  const listIds = publicLists.map((l) => l.id);

  const { data: allItems } = await supabase
    .from("game_list_items")
    .select("game_list_id, game_id, rating, position")
    .in("game_list_id", listIds)
    .order("position", { ascending: true });

  if (!allItems || allItems.length === 0) return [];

  const listToUser = new Map<string, string>();
  for (const l of publicLists) {
    listToUser.set(l.id, l.user_id);
  }

  const userItemsMap = new Map<string, ListEntry[]>();
  for (const item of allItems) {
    const userId = listToUser.get(item.game_list_id);
    if (!userId) continue;
    if (!userItemsMap.has(userId)) userItemsMap.set(userId, []);
    userItemsMap.get(userId)!.push({
      showId: item.game_id,
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

  const gameIds = scored.map((s) => s.showId);
  const { data: games } = await supabase
    .from("games")
    .select("id, igdb_id, title, cover_url, first_release_date, overview")
    .in("id", gameIds);

  if (!games) return [];

  const gameMap = new Map(games.map((g) => [g.id, g]));

  return scored
    .map((s) => {
      const game = gameMap.get(s.showId);
      if (!game) return null;
      return {
        id: game.id,
        igdb_id: game.igdb_id,
        title: game.title,
        cover_url: game.cover_url,
        first_release_date: game.first_release_date,
        overview: game.overview,
        score: Math.round(s.score * 100) / 100,
        recommendedBy: s.recommendedBy,
      };
    })
    .filter((r): r is RecommendedGame => r !== null);
}

export type RecommendedBoardgame = {
  id: string;
  bgg_id: number | null;
  title: string;
  thumbnail_url: string | null;
  year_published: number | null;
  description: string | null;
  score: number;
  recommendedBy: number;
};

export async function getBoardgameRecommendations(): Promise<
  RecommendedBoardgame[]
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: myBoardgameList } = await supabase
    .from("boardgame_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!myBoardgameList) return [];

  const { data: myItems } = await supabase
    .from("boardgame_list_items")
    .select("boardgame_id, rating, position")
    .eq("boardgame_list_id", myBoardgameList.id)
    .order("position", { ascending: true });

  if (!myItems || myItems.length === 0) return [];

  const viewerList: ListEntry[] = myItems.map((i, idx) => ({
    showId: i.boardgame_id,
    rating: i.rating,
    position: i.position ?? idx,
  }));

  const { data: publicLists } = await supabase
    .from("boardgame_lists")
    .select("id, user_id")
    .eq("is_public", true)
    .neq("user_id", user.id);

  if (!publicLists || publicLists.length === 0) return [];

  const listIds = publicLists.map((l) => l.id);

  const { data: allItems } = await supabase
    .from("boardgame_list_items")
    .select("boardgame_list_id, boardgame_id, rating, position")
    .in("boardgame_list_id", listIds)
    .order("position", { ascending: true });

  if (!allItems || allItems.length === 0) return [];

  const listToUser = new Map<string, string>();
  for (const l of publicLists) {
    listToUser.set(l.id, l.user_id);
  }

  const userItemsMap = new Map<string, ListEntry[]>();
  for (const item of allItems) {
    const userId = listToUser.get(item.boardgame_list_id);
    if (!userId) continue;
    if (!userItemsMap.has(userId)) userItemsMap.set(userId, []);
    userItemsMap.get(userId)!.push({
      showId: item.boardgame_id,
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

  const boardgameIds = scored.map((s) => s.showId);
  const { data: boardgames } = await supabase
    .from("boardgames")
    .select("id, bgg_id, title, thumbnail_url, year_published, description")
    .in("id", boardgameIds);

  if (!boardgames) return [];

  const boardgameMap = new Map(boardgames.map((bg) => [bg.id, bg]));

  return scored
    .map((s) => {
      const bg = boardgameMap.get(s.showId);
      if (!bg) return null;
      return {
        id: bg.id,
        bgg_id: bg.bgg_id,
        title: bg.title,
        thumbnail_url: bg.thumbnail_url,
        year_published: bg.year_published,
        description: bg.description,
        score: Math.round(s.score * 100) / 100,
        recommendedBy: s.recommendedBy,
      };
    })
    .filter((r): r is RecommendedBoardgame => r !== null);
}

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
