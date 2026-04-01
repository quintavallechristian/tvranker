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
    .select("id, user_id, name, description, is_public, visible_to_followers, visible_to_following, rating_labels, custom_visibility")
    .eq("user_id", user.id)
    .single();

  if (!animeList) {
    const { data: created } = await supabase
      .from("anime_lists")
      .insert({ user_id: user.id, name: "My Anime" })
      .select("id, user_id, name, description, is_public, visible_to_followers, visible_to_following, rating_labels, custom_visibility")
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

  // Fetch owner's rating labels and visibility defaults
  const { data: ownerProfile } = await supabase
    .from("profiles")
    .select("rating_labels, default_is_public, default_visible_to_followers, default_visible_to_following")
    .eq("id", user.id)
    .single();

  const profileRatingLabels = ownerProfile?.rating_labels as string[] | null;
  const listRatingLabels = animeList.rating_labels as string[] | null;
  const effectiveRatingLabels = listRatingLabels ?? profileRatingLabels;

  return (
    <AnimeListClient
      animeListId={animeList.id}
      description={animeList.description ?? null}
      isPublic={animeList.is_public ?? false}
      initialItems={firstPageItems}
      existingTmdbIds={existingTmdbIds}
      ratingLabels={effectiveRatingLabels}
      hasMore={hasMore}
      listSettings={{
        is_public: animeList.is_public ?? true,
        visible_to_followers: animeList.visible_to_followers ?? false,
        visible_to_following: animeList.visible_to_following ?? false,
        rating_labels: listRatingLabels,
        custom_visibility: animeList.custom_visibility ?? false,
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
