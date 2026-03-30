import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AnimeListClient } from "./page-client";
import type { AnimeItem } from "./actions";

const PAGE_SIZE = 50;

export default async function AnimePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch (or auto-create) the user's anime_list
  let { data: animeList } = await supabase
    .from("anime_lists")
    .select("id, user_id, name, description, is_public")
    .eq("user_id", user.id)
    .single();

  if (!animeList) {
    const { data: created } = await supabase
      .from("anime_lists")
      .insert({ user_id: user.id, name: "My Anime" })
      .select("id, user_id, name, description, is_public")
      .single();
    animeList = created;
  }

  if (!animeList) redirect("/home");

  // Fetch first page of anime items
  const { data: firstPageData } = await supabase
    .from("anime_list_items")
    .select("*, animes(*)")
    .eq("anime_list_id", animeList.id)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(0, PAGE_SIZE - 1);

  const firstPageItems = (firstPageData ?? []) as unknown as AnimeItem[];
  const hasMore = firstPageItems.length === PAGE_SIZE;

  // Fetch all TMDB ids for "already added" check
  const { data: allTmdbRows } = await supabase
    .from("anime_list_items")
    .select("animes(tmdb_id)")
    .eq("anime_list_id", animeList.id);

  const existingTmdbIds = (allTmdbRows ?? [])
    .map((row) => (row.animes as { tmdb_id: number | null } | null)?.tmdb_id)
    .filter((v): v is number => v != null && v > 0);

  // Fetch owner's rating labels
  const { data: ownerProfile } = await supabase
    .from("profiles")
    .select("rating_labels")
    .eq("id", user.id)
    .single();

  return (
    <AnimeListClient
      animeListId={animeList.id}
      description={animeList.description ?? null}
      isPublic={animeList.is_public ?? false}
      initialItems={firstPageItems}
      existingTmdbIds={existingTmdbIds}
      ratingLabels={ownerProfile?.rating_labels as string[] | null}
      hasMore={hasMore}
    />
  );
}
