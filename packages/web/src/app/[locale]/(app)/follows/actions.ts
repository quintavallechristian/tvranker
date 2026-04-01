"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function followUser(followingId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("follows").insert({
    follower_id: user.id,
    following_id: followingId,
  });
  if (error) throw error;

  // Notify the followed user (best-effort, don't block on failure)
  await supabase.from("notifications").insert({
    user_id: followingId,
    actor_id: user.id,
    type: "new_follower",
  });

  revalidatePath("/seguiti");
}

export async function unfollowUser(followingId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", user.id)
    .eq("following_id", followingId);
  if (error) throw error;

  revalidatePath("/seguiti");
}

export type FollowedUser = {
  id: string;
  username: string;
  avatar_url: string | null;
  lists_count: number;
  similarity: number | null;
};

export async function getFollowing(): Promise<FollowedUser[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: follows } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", user.id);

  if (!follows || follows.length === 0) return [];

  const followingIds = follows.map((f) => f.following_id);

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username, avatar_url")
    .in("id", followingIds);

  if (!profiles || profiles.length === 0) return [];

  // Get viewer's list for similarity computation
  const { data: viewerList } = await supabase
    .from("lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  let viewerItems: {
    showId: string;
    rating: number | null;
    position: number;
  }[] = [];
  if (viewerList) {
    const { data } = await supabase
      .from("list_items")
      .select("show_id, rating, position")
      .eq("list_id", viewerList.id)
      .order("position", { ascending: true });
    viewerItems = (data ?? []).map((i, idx) => ({
      showId: i.show_id,
      rating: i.rating,
      position: i.position ?? idx,
    }));
  }

  const { computeListSimilarity } = await import("@/lib/similarity");

  const profileIds = profiles.map((p) => p.id);

  // Batch fetch show lists, movie lists, anime lists, game lists for all followed users
  const [
    { data: showLists },
    { data: movieLists },
    { data: animeLists },
    { data: gameLists },
  ] = await Promise.all([
    supabase
      .from("lists")
      .select("id, user_id, is_public")
      .in("user_id", profileIds),
    supabase
      .from("movie_lists")
      .select("id, user_id")
      .in("user_id", profileIds),
    supabase
      .from("anime_lists")
      .select("id, user_id")
      .in("user_id", profileIds),
    supabase
      .from("game_lists")
      .select("id, user_id")
      .in("user_id", profileIds),
  ]);

  const showListByUser = new Map(
    (showLists ?? []).map((l) => [l.user_id, l]),
  );
  const movieListIdByUser = new Map(
    (movieLists ?? []).map((l) => [l.user_id, l.id]),
  );
  const animeListIdByUser = new Map(
    (animeLists ?? []).map((l) => [l.user_id, l.id]),
  );
  const gameListIdByUser = new Map(
    (gameLists ?? []).map((l) => [l.user_id, l.id]),
  );

  const allMovieListIds = [...movieListIdByUser.values()];
  const allAnimeListIds = [...animeListIdByUser.values()];
  const allGameListIds = [...gameListIdByUser.values()];

  // Check which movie/anime/game lists have at least one item
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

  const results: FollowedUser[] = [];
  for (const profile of profiles) {
    const pList = showListByUser.get(profile.id);

    let similarity: number | null = null;
    let showsCompiled = 0;

    if (pList?.is_public) {
      const { data: listItems } = await supabase
        .from("list_items")
        .select("show_id, rating, position")
        .eq("list_id", pList.id)
        .order("position", { ascending: true });

      if (listItems && listItems.length > 0) {
        showsCompiled = 1;
        if (viewerItems.length > 0) {
          const otherItems = listItems.map((i, idx) => ({
            showId: i.show_id,
            rating: i.rating,
            position: i.position ?? idx,
          }));
          similarity = computeListSimilarity(viewerItems, otherItems);
        }
      }
    }

    const movieListId = movieListIdByUser.get(profile.id);
    const moviesCompiled =
      movieListId && movieListIdsWithItems.has(movieListId) ? 1 : 0;
    const animeListId = animeListIdByUser.get(profile.id);
    const animeCompiled =
      animeListId && animeListIdsWithItems.has(animeListId) ? 1 : 0;
    const gameListId = gameListIdByUser.get(profile.id);
    const gamesCompiled =
      gameListId && gameListIdsWithItems.has(gameListId) ? 1 : 0;

    results.push({
      ...profile,
      lists_count: showsCompiled + moviesCompiled + animeCompiled + gamesCompiled,
      similarity,
    });
  }

  return results;
}
