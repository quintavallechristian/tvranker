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
    .select("id, user_id, name, description, is_public")
    .eq("user_id", user.id)
    .single();

  if (!gameList) {
    const { data: created } = await supabase
      .from("game_lists")
      .insert({ user_id: user.id, name: "My Games" })
      .select("id, user_id, name, description, is_public")
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

  // Fetch owner's rating labels
  const { data: ownerProfile } = await supabase
    .from("profiles")
    .select("rating_labels")
    .eq("id", user.id)
    .single();

  return (
    <GamesListClient
      gameListId={gameList.id}
      description={gameList.description ?? null}
      isPublic={gameList.is_public ?? false}
      initialItems={firstPageItems}
      existingIgdbIds={existingIgdbIds}
      ratingLabels={ownerProfile?.rating_labels as string[] | null}
      hasMore={hasMore}
    />
  );
}
