"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { recordFeedEvent } from "@/lib/feed";
import { getBoardgameDetailsMulti, getUserCollection } from "@/lib/bgg/client";

export type BoardgameItem = {
  id: string;
  boardgame_list_id: string;
  boardgame_id: string;
  rating: number | null;
  position: number;
  added_at: string;
  notes: string | null;
  boardgames: {
    id: string;
    bgg_id: number | null;
    title: string;
    thumbnail_url: string | null;
    image_url: string | null;
    year_published: number | null;
    description: string | null;
    min_players: number | null;
    max_players: number | null;
    playing_time: number | null;
    categories: { id: number; name: string }[] | null;
    mechanics: { id: number; name: string }[] | null;
    designers: { id: number; name: string }[] | null;
    bgg_rating: number | null;
    bgg_weight: number | null;
  };
};

export async function addBoardgameToList(
  boardgameListId: string,
  boardgame: {
    bgg_id: number;
    title: string;
    thumbnail_url: string | null;
    image_url?: string | null;
    year_published?: number | null;
    description?: string | null;
    min_players?: number | null;
    max_players?: number | null;
    playing_time?: number | null;
  },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Upsert boardgame in boardgames table
  let { data: existingBoardgame } = await supabase
    .from("boardgames")
    .select("id")
    .eq("bgg_id", boardgame.bgg_id)
    .single();

  if (!existingBoardgame) {
    const { data: newBoardgame, error: bgError } = await supabase
      .from("boardgames")
      .insert({
        bgg_id: boardgame.bgg_id,
        title: boardgame.title,
        thumbnail_url: boardgame.thumbnail_url,
        image_url: boardgame.image_url || null,
        year_published: boardgame.year_published || null,
        description: boardgame.description || null,
        min_players: boardgame.min_players || null,
        max_players: boardgame.max_players || null,
        playing_time: boardgame.playing_time || null,
      })
      .select()
      .single();

    if (bgError) throw new Error(bgError.message);
    existingBoardgame = newBoardgame;
  }

  // Check if already in list
  const { data: duplicate } = await supabase
    .from("boardgame_list_items")
    .select("id")
    .eq("boardgame_list_id", boardgameListId)
    .eq("boardgame_id", existingBoardgame!.id)
    .single();

  if (duplicate) return;

  // Get max position
  const { data: items } = await supabase
    .from("boardgame_list_items")
    .select("position")
    .eq("boardgame_list_id", boardgameListId)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (items?.[0]?.position ?? -1) + 1;

  const { error } = await supabase.from("boardgame_list_items").insert({
    boardgame_list_id: boardgameListId,
    boardgame_id: existingBoardgame!.id,
    position: nextPosition,
  });

  if (error) throw new Error(error.message);

  await recordFeedEvent(supabase, {
    userId: user.id,
    eventType: "add_item",
    contentType: "boardgame",
    itemId: existingBoardgame!.id,
    listId: boardgameListId,
    itemTitle: boardgame.title,
    posterPath: boardgame.thumbnail_url,
  });

  revalidatePath("/boardgames");
}

export async function removeBoardgameFromList(itemId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("boardgame_list_items")
    .delete()
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath("/boardgames");
}

export async function clearBoardgameList() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: boardgameList } = await supabase
    .from("boardgame_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();
  if (!boardgameList) throw new Error("Boardgame list not found");

  const { error } = await supabase
    .from("boardgame_list_items")
    .delete()
    .eq("boardgame_list_id", boardgameList.id);

  if (error) throw new Error(error.message);

  revalidatePath("/boardgames");
}

export async function updateBoardgameRating(itemId: string, rating: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  if (rating < 1 || rating > 10) throw new Error("Rating must be 1-10");

  const { error } = await supabase
    .from("boardgame_list_items")
    .update({ rating })
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  const { data: itemData } = await supabase
    .from("boardgame_list_items")
    .select("boardgame_id, boardgame_list_id, boardgames(title, thumbnail_url)")
    .eq("id", itemId)
    .single();

  if (itemData) {
    const bg = itemData.boardgames as unknown as {
      title: string;
      thumbnail_url: string | null;
    };
    await recordFeedEvent(supabase, {
      userId: user.id,
      eventType: "rate_item",
      contentType: "boardgame",
      itemId: itemData.boardgame_id,
      listId: itemData.boardgame_list_id,
      itemTitle: bg?.title ?? "",
      posterPath: bg?.thumbnail_url,
      rating,
    });
  }

  revalidatePath("/boardgames");
}

export async function updateBoardgameNotes(itemId: string, notes: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("boardgame_list_items")
    .update({ notes })
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath("/boardgames");
}

export async function reorderBoardgameListItems(itemIds: string[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const updates = itemIds.map((id, index) =>
    supabase
      .from("boardgame_list_items")
      .update({ position: index })
      .eq("id", id),
  );

  await Promise.all(updates);

  revalidatePath("/boardgames");
}

export async function updateBoardgameListDescription(
  boardgameListId: string,
  description: string,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("boardgame_lists")
    .update({ description })
    .eq("id", boardgameListId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/boardgames");
}

export async function updateBoardgameListSettings(
  boardgameListId: string,
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
    .from("boardgame_lists")
    .update(updates)
    .eq("id", boardgameListId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/boardgames");
}

export async function addBoardgameToMyList(boardgameId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  let { data: boardgameList } = await supabase
    .from("boardgame_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!boardgameList) {
    const { data: created } = await supabase
      .from("boardgame_lists")
      .insert({ user_id: user.id, name: "My Board Games" })
      .select("id")
      .single();
    boardgameList = created;
  }

  if (!boardgameList) throw new Error("Failed to get boardgame list");

  const { data: existing } = await supabase
    .from("boardgame_list_items")
    .select("id")
    .eq("boardgame_list_id", boardgameList.id)
    .eq("boardgame_id", boardgameId)
    .maybeSingle();

  if (existing) return { alreadyExists: true };

  const { data: items } = await supabase
    .from("boardgame_list_items")
    .select("position")
    .eq("boardgame_list_id", boardgameList.id)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (items?.[0]?.position ?? -1) + 1;

  await supabase.from("boardgame_list_items").insert({
    boardgame_list_id: boardgameList.id,
    boardgame_id: boardgameId,
    position: nextPosition,
  });

  const { data: bgData } = await supabase
    .from("boardgames")
    .select("title, thumbnail_url")
    .eq("id", boardgameId)
    .single();

  if (bgData) {
    await recordFeedEvent(supabase, {
      userId: user.id,
      eventType: "add_item",
      contentType: "boardgame",
      itemId: boardgameId,
      listId: boardgameList.id,
      itemTitle: bgData.title,
      posterPath: bgData.thumbnail_url,
    });
  }

  revalidatePath("/boardgames");
  return { alreadyExists: false };
}

export async function getBoardgameListItemsPage(
  boardgameListId: string,
  page: number,
  pageSize = 50,
): Promise<{ items: BoardgameItem[]; hasMore: boolean }> {
  const supabase = await createClient();

  const from = page * pageSize;
  const to = from + pageSize - 1;

  const { data } = await supabase
    .from("boardgame_list_items")
    .select("*, boardgames(*)")
    .eq("boardgame_list_id", boardgameListId)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(from, to);

  const items = (data ?? []) as unknown as BoardgameItem[];
  return { items, hasMore: items.length === pageSize };
}

export async function getTopRatedBoardgames() {
  const supabase = await createClient();

  const { data: items } = await supabase
    .from("boardgame_list_items")
    .select(
      "rating, boardgame_id, boardgame_list_id, boardgame_lists!inner(is_public), boardgames!inner(id, title, thumbnail_url, year_published)",
    )
    .eq("boardgame_lists.is_public", true)
    .not("rating", "is", null);

  if (!items || items.length === 0) return [];

  const bgMap = new Map<
    string,
    { sum: number; count: number; bg: Record<string, unknown> }
  >();

  for (const item of items) {
    const bgId = item.boardgame_id;
    const bg = item.boardgames as unknown as Record<string, unknown>;
    const existing = bgMap.get(bgId);
    if (existing) {
      existing.sum += item.rating!;
      existing.count += 1;
    } else {
      bgMap.set(bgId, { sum: item.rating!, count: 1, bg });
    }
  }

  return Array.from(bgMap.entries())
    .filter(([, v]) => v.count >= 2)
    .map(([, v]) => ({
      id: v.bg.id as string,
      title: v.bg.title as string,
      thumbnail_url: (v.bg.thumbnail_url as string | null) ?? null,
      year_published: (v.bg.year_published as number | null) ?? null,
      avg_rating: v.sum / v.count,
      vote_count: v.count,
    }))
    .sort((a, b) => b.avg_rating - a.avg_rating)
    .slice(0, 50);
}

export async function getPopularBoardgames() {
  const supabase = await createClient();

  const { data: items } = await supabase
    .from("boardgame_list_items")
    .select(
      "boardgame_id, boardgame_list_id, boardgame_lists!inner(is_public), boardgames!inner(id, title, thumbnail_url, year_published, bgg_id, description)",
    )
    .eq("boardgame_lists.is_public", true);

  if (!items || items.length === 0) return [];

  const bgMap = new Map<
    string,
    { count: number; bg: Record<string, unknown> }
  >();

  for (const item of items) {
    const bgId = item.boardgame_id;
    const bg = item.boardgames as unknown as Record<string, unknown>;
    const existing = bgMap.get(bgId);
    if (existing) {
      existing.count += 1;
    } else {
      bgMap.set(bgId, { count: 1, bg });
    }
  }

  return Array.from(bgMap.entries())
    .map(([, v]) => ({
      id: v.bg.id as string,
      bgg_id: (v.bg.bgg_id as number | null) ?? null,
      title: v.bg.title as string,
      thumbnail_url: (v.bg.thumbnail_url as string | null) ?? null,
      year_published: (v.bg.year_published as number | null) ?? null,
      description: (v.bg.description as string | null) ?? null,
      added_count: v.count,
    }))
    .sort((a, b) => b.added_count - a.added_count)
    .slice(0, 20);
}

export type PopularBoardgame = Awaited<
  ReturnType<typeof getPopularBoardgames>
>[number];

export async function addBggBoardgameToMyList(boardgame: {
  bgg_id: number;
  title: string;
  thumbnail_url: string | null;
  image_url?: string | null;
  year_published?: number | null;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Upsert boardgame
  let { data: existingBg } = await supabase
    .from("boardgames")
    .select("id")
    .eq("bgg_id", boardgame.bgg_id)
    .single();

  if (!existingBg) {
    const { data: newBg, error } = await supabase
      .from("boardgames")
      .insert({
        bgg_id: boardgame.bgg_id,
        title: boardgame.title,
        thumbnail_url: boardgame.thumbnail_url,
        image_url: boardgame.image_url || null,
        year_published: boardgame.year_published || null,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    existingBg = newBg;
  }

  // Get or create boardgame list
  let { data: bgList } = await supabase
    .from("boardgame_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!bgList) {
    const { data: created } = await supabase
      .from("boardgame_lists")
      .insert({ user_id: user.id, name: "My Board Games" })
      .select("id")
      .single();
    bgList = created;
  }

  if (!bgList) throw new Error("Failed to get boardgame list");

  // Check duplicate
  const { data: dup } = await supabase
    .from("boardgame_list_items")
    .select("id")
    .eq("boardgame_list_id", bgList.id)
    .eq("boardgame_id", existingBg!.id)
    .maybeSingle();

  if (dup) return;

  // Get next position
  const { data: posItems } = await supabase
    .from("boardgame_list_items")
    .select("position")
    .eq("boardgame_list_id", bgList.id)
    .order("position", { ascending: false })
    .limit(1);

  const nextPos = (posItems?.[0]?.position ?? -1) + 1;

  await supabase.from("boardgame_list_items").insert({
    boardgame_list_id: bgList.id,
    boardgame_id: existingBg!.id,
    position: nextPos,
  });

  await recordFeedEvent(supabase, {
    userId: user.id,
    eventType: "add_item",
    contentType: "boardgame",
    itemId: existingBg!.id,
    listId: bgList.id,
    itemTitle: boardgame.title,
    posterPath: boardgame.thumbnail_url,
  });

  revalidatePath("/boardgames");
}

export async function syncFromBGG(
  boardgameListId: string,
  bggUsername: string,
  mode: "merge" | "replace" = "merge",
): Promise<{ added: number; updated: number; skipped: number }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Fetch collection directly from BGG (no HTTP round-trip)
  const collection = await getUserCollection(bggUsername);

  if (!collection || collection.length === 0) {
    return { added: 0, updated: 0, skipped: 0 };
  }

  // If replace mode, delete all existing items
  if (mode === "replace") {
    await supabase
      .from("boardgame_list_items")
      .delete()
      .eq("boardgame_list_id", boardgameListId);
  }

  // Get existing boardgames by bgg_id
  const bggIds = collection.map((item) => item.bggId);
  const { data: existingBgs } = await supabase
    .from("boardgames")
    .select("id, bgg_id, bgg_fetched")
    .in("bgg_id", bggIds);

  const bggIdToDbId = new Map<number, string>();
  const unfetchedDbIds = new Map<number, string>(); // bgg_id -> db id, for games in DB but without full details
  for (const bg of existingBgs ?? []) {
    if (bg.bgg_id != null) {
      bggIdToDbId.set(bg.bgg_id, bg.id);
      if (!bg.bgg_fetched) unfetchedDbIds.set(bg.bgg_id, bg.id);
    }
  }

  // Identify new boardgames not in DB, plus existing ones without full details
  const newBggIds = bggIds.filter((id) => !bggIdToDbId.has(id));
  const idsNeedingDetails = [...newBggIds, ...unfetchedDbIds.keys()];

  // Fetch details for new boardgames and those with incomplete data
  if (idsNeedingDetails.length > 0) {
    const details = await getBoardgameDetailsMulti(idsNeedingDetails);
    const detailsMap = new Map(details.map((d) => [d.id, d]));

    // Update existing boardgames that had incomplete data
    for (const [bggId, dbId] of unfetchedDbIds) {
      const detail = detailsMap.get(bggId);
      if (!detail) continue;
      await supabase
        .from("boardgames")
        .update({
          title: detail.name,
          thumbnail_url: detail.thumbnail ?? null,
          image_url: detail.image ?? null,
          year_published: detail.yearPublished ?? null,
          description: detail.description ?? null,
          min_players: detail.minPlayers ?? null,
          max_players: detail.maxPlayers ?? null,
          playing_time: detail.playingTime ?? null,
          min_playtime: detail.minPlaytime ?? null,
          max_playtime: detail.maxPlaytime ?? null,
          min_age: detail.minAge ?? null,
          categories: detail.categories ?? null,
          mechanics: detail.mechanics ?? null,
          designers: detail.designers ?? null,
          bgg_rating: detail.averageRating ?? null,
          bgg_weight: detail.averageWeight ?? null,
          bgg_fetched: true,
        })
        .eq("id", dbId);
    }

    // Insert new boardgames
    for (const item of collection) {
      if (bggIdToDbId.has(item.bggId)) continue;
      const detail = detailsMap.get(item.bggId);

      const { data: newBg } = await supabase
        .from("boardgames")
        .insert({
          bgg_id: item.bggId,
          title: detail?.name ?? item.name,
          thumbnail_url: detail?.thumbnail ?? item.thumbnail ?? null,
          image_url: detail?.image ?? item.image ?? null,
          year_published: detail?.yearPublished ?? item.yearPublished ?? null,
          description: detail?.description ?? null,
          min_players: detail?.minPlayers ?? null,
          max_players: detail?.maxPlayers ?? null,
          playing_time: detail?.playingTime ?? null,
          min_playtime: detail?.minPlaytime ?? null,
          max_playtime: detail?.maxPlaytime ?? null,
          min_age: detail?.minAge ?? null,
          categories: detail?.categories ?? null,
          mechanics: detail?.mechanics ?? null,
          designers: detail?.designers ?? null,
          bgg_rating: detail?.averageRating ?? null,
          bgg_weight: detail?.averageWeight ?? null,
          bgg_fetched: !!detail,
          url: `https://boardgamegeek.com/boardgame/${item.bggId}`,
        })
        .select("id")
        .single();

      if (newBg) bggIdToDbId.set(item.bggId, newBg.id);
    }
  }

  // Get existing list items
  const { data: existingItems } = await supabase
    .from("boardgame_list_items")
    .select("id, boardgame_id, rating")
    .eq("boardgame_list_id", boardgameListId);

  const existingBgIds = new Set(
    (existingItems ?? []).map((i) => i.boardgame_id),
  );
  const existingItemMap = new Map(
    (existingItems ?? []).map((i) => [i.boardgame_id, i]),
  );

  // Get max position
  const { data: posItems } = await supabase
    .from("boardgame_list_items")
    .select("position")
    .eq("boardgame_list_id", boardgameListId)
    .order("position", { ascending: false })
    .limit(1);

  let nextPosition = (posItems?.[0]?.position ?? -1) + 1;

  let added = 0;
  let updated = 0;
  let skipped = 0;

  for (const item of collection) {
    const dbId = bggIdToDbId.get(item.bggId);
    if (!dbId) {
      skipped++;
      continue;
    }

    const bggRating =
      item.userRating != null && item.userRating >= 1 && item.userRating <= 10
        ? Math.round(item.userRating)
        : null;

    if (existingBgIds.has(dbId)) {
      // Update rating if BGG has one and it's different
      const existing = existingItemMap.get(dbId);
      if (bggRating != null && existing && existing.rating !== bggRating) {
        await supabase
          .from("boardgame_list_items")
          .update({ rating: bggRating })
          .eq("id", existing.id);
        updated++;
      } else {
        skipped++;
      }
    } else {
      // Add new item
      await supabase.from("boardgame_list_items").insert({
        boardgame_list_id: boardgameListId,
        boardgame_id: dbId,
        rating: bggRating,
        position: nextPosition++,
      });
      added++;
    }
  }

  // Store BGG username and sync timestamp
  await supabase
    .from("boardgame_lists")
    .update({
      bgg_username: bggUsername,
      last_synced_at: new Date().toISOString(),
    })
    .eq("id", boardgameListId)
    .eq("user_id", user.id);

  revalidatePath("/boardgames");
  return { added, updated, skipped };
}
