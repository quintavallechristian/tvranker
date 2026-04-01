import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { GamesListClient } from "./page-client";
import type { GameItem } from "./actions";

const PAGE_SIZE = 50;

export default async function GamesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch (or auto-create) the user's game_list
  let { data: gameList } = await supabase
    .from("game_lists")
    .select("id, user_id, name, description, is_public, visible_to_followers, visible_to_following, rating_labels, custom_visibility")
    .eq("user_id", user.id)
    .single();

  if (!gameList) {
    const { data: created } = await supabase
      .from("game_lists")
      .insert({ user_id: user.id, name: "My Games" })
      .select("id, user_id, name, description, is_public, visible_to_followers, visible_to_following, rating_labels, custom_visibility")
      .single();
    gameList = created;
  }

  if (!gameList) redirect("/home");

  // Fetch first page of game items
  const { data: firstPageData } = await supabase
    .from("game_list_items")
    .select("*, games(*)")
    .eq("game_list_id", gameList.id)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(0, PAGE_SIZE - 1);

  const firstPageItems = (firstPageData ?? []) as unknown as GameItem[];
  const hasMore = firstPageItems.length === PAGE_SIZE;

  // Fetch all IGDB ids for "already added" check
  const { data: allIgdbRows } = await supabase
    .from("game_list_items")
    .select("games(igdb_id)")
    .eq("game_list_id", gameList.id);

  const existingIgdbIds = (allIgdbRows ?? [])
    .map((row) => (row.games as { igdb_id: number | null } | null)?.igdb_id)
    .filter((v): v is number => v != null && v > 0);

  // Fetch owner's rating labels and visibility defaults
  const { data: ownerProfile } = await supabase
    .from("profiles")
    .select("rating_labels, default_is_public, default_visible_to_followers, default_visible_to_following")
    .eq("id", user.id)
    .single();

  const profileRatingLabels = ownerProfile?.rating_labels as string[] | null;
  const listRatingLabels = gameList.rating_labels as string[] | null;
  const effectiveRatingLabels = listRatingLabels ?? profileRatingLabels;

  return (
    <GamesListClient
      gameListId={gameList.id}
      description={gameList.description ?? null}
      isPublic={gameList.is_public ?? false}
      initialItems={firstPageItems}
      existingIgdbIds={existingIgdbIds}
      ratingLabels={effectiveRatingLabels}
      hasMore={hasMore}
      listSettings={{
        is_public: gameList.is_public ?? true,
        visible_to_followers: gameList.visible_to_followers ?? false,
        visible_to_following: gameList.visible_to_following ?? false,
        rating_labels: listRatingLabels,
        custom_visibility: gameList.custom_visibility ?? false,
      }}
      profileRatingLabels={profileRatingLabels}
      profileVisibility={{
        is_public: ownerProfile?.default_is_public ?? false,
        visible_to_followers: ownerProfile?.default_visible_to_followers ?? false,
        visible_to_following: ownerProfile?.default_visible_to_following ?? false,
      }}
    />
  );
}
