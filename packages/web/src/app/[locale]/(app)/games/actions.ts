"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type GameItem = {
  id: string;
  game_list_id: string;
  game_id: string;
  rating: number | null;
  position: number;
  added_at: string;
  notes: string | null;
  games: {
    id: string;
    igdb_id: number | null;
    title: string;
    cover_url: string | null;
    first_release_date: string | null;
    overview: string | null;
    platforms: { id: number; name: string }[] | null;
    genres: { id: number; name: string }[] | null;
  };
};

export async function addGameToList(
  gameListId: string,
  game: {
    igdb_id: number;
    title: string;
    cover_url: string | null;
    first_release_date?: string | null;
    overview?: string | null;
    platforms?: string[];
    genres?: string[];
  },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Upsert game in games table
  let { data: existingGame } = await supabase
    .from("games")
    .select("id")
    .eq("igdb_id", game.igdb_id)
    .single();

  if (!existingGame) {
    const { data: newGame, error: gameError } = await supabase
      .from("games")
      .insert({
        igdb_id: game.igdb_id,
        title: game.title,
        cover_url: game.cover_url,
        first_release_date: game.first_release_date || null,
        overview: game.overview || null,
        platforms: game.platforms
          ? game.platforms.map((name, i) => ({ id: i, name }))
          : null,
        genres: game.genres
          ? game.genres.map((name, i) => ({ id: i, name }))
          : null,
      })
      .select()
      .single();

    if (gameError) throw new Error(gameError.message);
    existingGame = newGame;
  }

  // Check if already in list
  const { data: duplicate } = await supabase
    .from("game_list_items")
    .select("id")
    .eq("game_list_id", gameListId)
    .eq("game_id", existingGame!.id)
    .single();

  if (duplicate) return;

  // Get max position
  const { data: items } = await supabase
    .from("game_list_items")
    .select("position")
    .eq("game_list_id", gameListId)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (items?.[0]?.position ?? -1) + 1;

  const { error } = await supabase.from("game_list_items").insert({
    game_list_id: gameListId,
    game_id: existingGame!.id,
    position: nextPosition,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/games");
}

export async function removeGameFromList(itemId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("game_list_items")
    .delete()
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath("/games");
}

export async function updateGameRating(itemId: string, rating: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  if (rating < 1 || rating > 10) throw new Error("Rating must be 1-10");

  const { error } = await supabase
    .from("game_list_items")
    .update({ rating })
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath("/games");
}

export async function reorderGameListItems(itemIds: string[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const updates = itemIds.map((id, index) =>
    supabase.from("game_list_items").update({ position: index }).eq("id", id),
  );

  await Promise.all(updates);

  revalidatePath("/games");
}

export async function updateGameListDescription(
  gameListId: string,
  description: string,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("game_lists")
    .update({ description })
    .eq("id", gameListId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/games");
}

export async function updateGameListSettings(
  gameListId: string,
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
    .from("game_lists")
    .update(updates)
    .eq("id", gameListId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/games");
}

export async function addGameToMyList(gameId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  let { data: gameList } = await supabase
    .from("game_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!gameList) {
    const { data: created } = await supabase
      .from("game_lists")
      .insert({ user_id: user.id, name: "My Games" })
      .select("id")
      .single();
    gameList = created;
  }

  if (!gameList) throw new Error("Failed to get game list");

  const { data: existing } = await supabase
    .from("game_list_items")
    .select("id")
    .eq("game_list_id", gameList.id)
    .eq("game_id", gameId)
    .maybeSingle();

  if (existing) return { alreadyExists: true };

  const { data: items } = await supabase
    .from("game_list_items")
    .select("position")
    .eq("game_list_id", gameList.id)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (items?.[0]?.position ?? -1) + 1;

  await supabase.from("game_list_items").insert({
    game_list_id: gameList.id,
    game_id: gameId,
    position: nextPosition,
  });

  revalidatePath("/games");
  return { alreadyExists: false };
}

export async function getGameListItemsPage(
  gameListId: string,
  page: number,
  pageSize = 50,
): Promise<{ items: GameItem[]; hasMore: boolean }> {
  const supabase = await createClient();

  const from = page * pageSize;
  const to = from + pageSize - 1;

  const { data } = await supabase
    .from("game_list_items")
    .select("*, games(*)")
    .eq("game_list_id", gameListId)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(from, to);

  const items = (data ?? []) as unknown as GameItem[];
  return { items, hasMore: items.length === pageSize };
}

export async function getTopRatedGames() {
  const supabase = await createClient();

  const { data: items } = await supabase
    .from("game_list_items")
    .select(
      "rating, game_id, game_list_id, game_lists!inner(is_public), games!inner(id, title, cover_url, first_release_date)",
    )
    .eq("game_lists.is_public", true)
    .not("rating", "is", null);

  if (!items || items.length === 0) return [];

  // Group by game_id
  const gameMap = new Map<
    string,
    { sum: number; count: number; game: Record<string, unknown> }
  >();

  for (const item of items) {
    const gameId = item.game_id;
    const game = item.games as unknown as Record<string, unknown>;
    const existing = gameMap.get(gameId);
    if (existing) {
      existing.sum += item.rating!;
      existing.count += 1;
    } else {
      gameMap.set(gameId, { sum: item.rating!, count: 1, game });
    }
  }

  // Filter to games with >= 2 votes, sort by avg rating
  return Array.from(gameMap.entries())
    .filter(([, v]) => v.count >= 2)
    .map(([, v]) => ({
      id: v.game.id as string,
      title: v.game.title as string,
      cover_url: (v.game.cover_url as string | null) ?? null,
      first_release_date: (v.game.first_release_date as string | null) ?? null,
      avg_rating: v.sum / v.count,
      vote_count: v.count,
    }))
    .sort((a, b) => b.avg_rating - a.avg_rating)
    .slice(0, 50);
}

export async function getPopularGames() {
  const supabase = await createClient();

  const { data: items } = await supabase
    .from("game_list_items")
    .select(
      "game_id, game_list_id, game_lists!inner(is_public), games!inner(id, title, cover_url, first_release_date, igdb_id, overview)",
    )
    .eq("game_lists.is_public", true);

  if (!items || items.length === 0) return [];

  const gameMap = new Map<
    string,
    { count: number; game: Record<string, unknown> }
  >();

  for (const item of items) {
    const gameId = item.game_id;
    const game = item.games as unknown as Record<string, unknown>;
    const existing = gameMap.get(gameId);
    if (existing) {
      existing.count += 1;
    } else {
      gameMap.set(gameId, { count: 1, game });
    }
  }

  return Array.from(gameMap.entries())
    .map(([, v]) => ({
      id: v.game.id as string,
      igdb_id: (v.game.igdb_id as number | null) ?? null,
      title: v.game.title as string,
      cover_url: (v.game.cover_url as string | null) ?? null,
      first_release_date: (v.game.first_release_date as string | null) ?? null,
      overview: (v.game.overview as string | null) ?? null,
      added_count: v.count,
    }))
    .sort((a, b) => b.added_count - a.added_count)
    .slice(0, 20);
}

export type PopularGame = Awaited<ReturnType<typeof getPopularGames>>[number];

export async function addTmdbGameToMyList(game: {
  igdb_id: number;
  title: string;
  cover_url: string | null;
  first_release_date?: string | null;
  overview?: string | null;
  platforms?: string[];
  genres?: string[];
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Upsert game
  let { data: existingGame } = await supabase
    .from("games")
    .select("id")
    .eq("igdb_id", game.igdb_id)
    .single();

  if (!existingGame) {
    const { data: newGame, error } = await supabase
      .from("games")
      .insert({
        igdb_id: game.igdb_id,
        title: game.title,
        cover_url: game.cover_url,
        first_release_date: game.first_release_date || null,
        overview: game.overview || null,
        platforms: game.platforms
          ? game.platforms.map((name, i) => ({ id: i, name }))
          : null,
        genres: game.genres
          ? game.genres.map((name, i) => ({ id: i, name }))
          : null,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    existingGame = newGame;
  }

  // Get or create game list
  let { data: gameList } = await supabase
    .from("game_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!gameList) {
    const { data: created } = await supabase
      .from("game_lists")
      .insert({ user_id: user.id, name: "My Games" })
      .select("id")
      .single();
    gameList = created;
  }

  if (!gameList) throw new Error("Failed to get game list");

  // Check duplicate
  const { data: dup } = await supabase
    .from("game_list_items")
    .select("id")
    .eq("game_list_id", gameList.id)
    .eq("game_id", existingGame!.id)
    .maybeSingle();

  if (dup) return;

  // Get next position
  const { data: posItems } = await supabase
    .from("game_list_items")
    .select("position")
    .eq("game_list_id", gameList.id)
    .order("position", { ascending: false })
    .limit(1);

  const nextPos = (posItems?.[0]?.position ?? -1) + 1;

  await supabase.from("game_list_items").insert({
    game_list_id: gameList.id,
    game_id: existingGame!.id,
    position: nextPos,
  });

  revalidatePath("/games");
}
