import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BoardgamesListClient } from "./page-client";
import type { BoardgameItem } from "./actions";

const PAGE_SIZE = 50;

export default async function BoardgamesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch (or auto-create) the user's boardgame_list
  let { data: boardgameList } = await supabase
    .from("boardgame_lists")
    .select(
      "id, user_id, name, description, is_public, visible_to_followers, visible_to_following, rating_labels, custom_visibility, bgg_username, last_synced_at",
    )
    .eq("user_id", user.id)
    .single();

  if (!boardgameList) {
    const { data: created } = await supabase
      .from("boardgame_lists")
      .insert({ user_id: user.id, name: "My Board Games" })
      .select(
        "id, user_id, name, description, is_public, visible_to_followers, visible_to_following, rating_labels, custom_visibility, bgg_username, last_synced_at",
      )
      .single();
    boardgameList = created;
  }

  if (!boardgameList) redirect("/home");

  // Fetch first page of boardgame items
  const { data: firstPageData } = await supabase
    .from("boardgame_list_items")
    .select("*, boardgames(*)")
    .eq("boardgame_list_id", boardgameList.id)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(0, PAGE_SIZE - 1);

  const firstPageItems = (firstPageData ?? []) as unknown as BoardgameItem[];
  const hasMore = firstPageItems.length === PAGE_SIZE;

  // Fetch all BGG ids for "already added" check
  const { data: allBggRows } = await supabase
    .from("boardgame_list_items")
    .select("boardgames(bgg_id)")
    .eq("boardgame_list_id", boardgameList.id);

  const existingBggIds = (allBggRows ?? [])
    .map((row) => (row.boardgames as { bgg_id: number | null } | null)?.bgg_id)
    .filter((v): v is number => v != null && v > 0);

  // Fetch owner's rating labels and visibility defaults
  const { data: ownerProfile } = await supabase
    .from("profiles")
    .select(
      "rating_labels, default_is_public, default_visible_to_followers, default_visible_to_following",
    )
    .eq("id", user.id)
    .single();

  const profileRatingLabels = ownerProfile?.rating_labels as string[] | null;
  const listRatingLabels = boardgameList.rating_labels as string[] | null;
  const effectiveRatingLabels = listRatingLabels ?? profileRatingLabels;

  return (
    <BoardgamesListClient
      boardgameListId={boardgameList.id}
      description={boardgameList.description ?? null}
      isPublic={boardgameList.is_public ?? false}
      initialItems={firstPageItems}
      existingBggIds={existingBggIds}
      ratingLabels={effectiveRatingLabels}
      hasMore={hasMore}
      listSettings={{
        is_public: boardgameList.is_public ?? true,
        visible_to_followers: boardgameList.visible_to_followers ?? false,
        visible_to_following: boardgameList.visible_to_following ?? false,
        rating_labels: listRatingLabels,
        custom_visibility: boardgameList.custom_visibility ?? false,
      }}
      profileRatingLabels={profileRatingLabels}
      profileVisibility={{
        is_public: ownerProfile?.default_is_public ?? false,
        visible_to_followers:
          ownerProfile?.default_visible_to_followers ?? false,
        visible_to_following:
          ownerProfile?.default_visible_to_following ?? false,
      }}
      bggUsername={boardgameList.bgg_username ?? null}
      lastSyncedAt={boardgameList.last_synced_at ?? null}
    />
  );
}
