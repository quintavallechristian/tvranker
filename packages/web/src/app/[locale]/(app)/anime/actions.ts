"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getShowDetails, extractTrailerUrl } from "@/lib/tmdb/client";
import type { WatchProviderRegion } from "@/lib/supabase/types";

export type AnimeItem = {
  id: string;
  anime_list_id: string;
  anime_id: string;
  rating: number | null;
  position: number;
  added_at: string;
  notes: string | null;
  animes: {
    id: string;
    tmdb_id: number | null;
    title: string;
    poster_path: string | null;
    first_air_date: string | null;
    overview: string | null;
    episode_count: number | null;
  };
};

export async function fetchAnimeTmdbData(animeId: string) {
  const supabase = await createClient();

  const { data: anime } = await supabase
    .from("animes")
    .select("*")
    .eq("id", animeId)
    .single();

  if (!anime) return null;

  const needsFetch =
    anime.tmdb_fetched === false ||
    anime.tmdb_id === null ||
    (!anime.poster_path && !anime.overview);

  if (!needsFetch) return anime;

  if (!anime.tmdb_id || anime.tmdb_id <= 0) {
    await supabase
      .from("animes")
      .update({ tmdb_fetched: true })
      .eq("id", animeId);
    return anime;
  }

  try {
    const found = await getShowDetails(anime.tmdb_id);
    if (!found) {
      await supabase
        .from("animes")
        .update({ tmdb_fetched: true })
        .eq("id", animeId);
      return anime;
    }

    const trailerUrl = extractTrailerUrl(found.videos);
    const watchProviders =
      (
        found as unknown as {
          "watch/providers"?: {
            results?: WatchProviderRegion | null;
          };
        }
      )["watch/providers"]?.results ?? null;

    const { data: updated } = await supabase
      .from("animes")
      .update({
        tmdb_id: found.id,
        title: found.name,
        poster_path: found.poster_path,
        first_air_date: found.first_air_date || null,
        overview: found.overview || null,
        episode_count:
          (found as unknown as { number_of_episodes?: number })
            .number_of_episodes ?? null,
        status: (found as unknown as { status?: string }).status ?? null,
        trailer_url: trailerUrl,
        watch_providers: watchProviders,
        tmdb_fetched: true,
      })
      .eq("id", animeId)
      .select("*")
      .single();

    return updated ?? anime;
  } catch {
    await supabase
      .from("animes")
      .update({ tmdb_fetched: true })
      .eq("id", animeId);
    return anime;
  }
}

export async function addAnimeToList(
  animeListId: string,
  anime: {
    tmdb_id: number;
    title: string;
    poster_path: string | null;
    first_air_date?: string;
    overview?: string;
  },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Upsert anime in animes table
  let { data: existingAnime } = await supabase
    .from("animes")
    .select("id")
    .eq("tmdb_id", anime.tmdb_id)
    .single();

  if (!existingAnime) {
    const { data: newAnime, error: animeError } = await supabase
      .from("animes")
      .insert({
        tmdb_id: anime.tmdb_id,
        title: anime.title,
        poster_path: anime.poster_path,
        first_air_date: anime.first_air_date || null,
        overview: anime.overview || null,
      })
      .select()
      .single();

    if (animeError) throw new Error(animeError.message);
    existingAnime = newAnime;
  }

  // Check if already in list
  const { data: duplicate } = await supabase
    .from("anime_list_items")
    .select("id")
    .eq("anime_list_id", animeListId)
    .eq("anime_id", existingAnime!.id)
    .single();

  if (duplicate) return;

  // Get max position
  const { data: items } = await supabase
    .from("anime_list_items")
    .select("position")
    .eq("anime_list_id", animeListId)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (items?.[0]?.position ?? -1) + 1;

  const { error } = await supabase.from("anime_list_items").insert({
    anime_list_id: animeListId,
    anime_id: existingAnime!.id,
    position: nextPosition,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/anime");
}

export async function removeAnimeFromList(itemId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("anime_list_items")
    .delete()
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath("/anime");
}

export async function updateAnimeRating(itemId: string, rating: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  if (rating < 1 || rating > 10) throw new Error("Rating must be 1-10");

  const { error } = await supabase
    .from("anime_list_items")
    .update({ rating })
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath("/anime");
}

export async function reorderAnimeListItems(itemIds: string[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const updates = itemIds.map((id, index) =>
    supabase.from("anime_list_items").update({ position: index }).eq("id", id),
  );

  await Promise.all(updates);

  revalidatePath("/anime");
}

export async function updateAnimeListDescription(
  animeListId: string,
  description: string,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("anime_lists")
    .update({ description })
    .eq("id", animeListId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/anime");
}

export async function importToMyAnimeList(
  jsonData: unknown,
): Promise<{ importedCount: number }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: animeList } = await supabase
    .from("anime_lists")
    .select("id")
    .eq("user_id", user.id)
    .single();
  if (!animeList) throw new Error("Anime list not found");

  const { parseTraktJson } = await import("@/lib/import/trakt-parser");
  const parsed = parseTraktJson(jsonData);

  const { data: existingItems } = await supabase
    .from("anime_list_items")
    .select("position")
    .eq("anime_list_id", animeList.id)
    .order("position", { ascending: false })
    .limit(1);

  let position = (existingItems?.[0]?.position ?? -1) + 1;
  let importedCount = 0;

  for (const show of parsed.shows) {
    let animeId: string | null = null;

    // 1. Lookup by title match
    const { data: found } = await supabase
      .from("animes")
      .select("id")
      .ilike("title", show.title)
      .maybeSingle();
    if (found) animeId = found.id;

    // 2. Insert placeholder if not found
    if (!animeId) {
      const { data: inserted, error } = await supabase
        .from("animes")
        .insert({
          title: show.title,
          tmdb_id: null,
        })
        .select("id")
        .single();
      if (error) continue;
      animeId = inserted.id;
    }

    // Skip if already in list
    const { data: duplicate } = await supabase
      .from("anime_list_items")
      .select("id")
      .eq("anime_list_id", animeList.id)
      .eq("anime_id", animeId)
      .maybeSingle();
    if (duplicate) continue;

    const rating =
      show.score != null && show.score >= 1 && show.score <= 10
        ? Math.round(show.score)
        : null;

    const { error: insertError } = await supabase
      .from("anime_list_items")
      .insert({
        anime_list_id: animeList.id,
        anime_id: animeId,
        position: position++,
        rating,
        added_at: show.added_at ?? undefined,
      });

    if (!insertError) importedCount++;
  }

  revalidatePath("/anime");
  return { importedCount };
}

export async function addAnimeToMyList(animeId: string) {
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
    const { data: created } = await supabase
      .from("anime_lists")
      .insert({ user_id: user.id, name: "My Anime" })
      .select("id")
      .single();
    animeList = created;
  }

  if (!animeList) throw new Error("Failed to get anime list");

  const { data: existing } = await supabase
    .from("anime_list_items")
    .select("id")
    .eq("anime_list_id", animeList.id)
    .eq("anime_id", animeId)
    .maybeSingle();

  if (existing) return { alreadyExists: true };

  const { data: items } = await supabase
    .from("anime_list_items")
    .select("position")
    .eq("anime_list_id", animeList.id)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (items?.[0]?.position ?? -1) + 1;

  await supabase.from("anime_list_items").insert({
    anime_list_id: animeList.id,
    anime_id: animeId,
    position: nextPosition,
  });

  revalidatePath("/anime");
  return { alreadyExists: false };
}

export async function getAnimeListItemsPage(
  animeListId: string,
  page: number,
  pageSize = 50,
): Promise<{ items: AnimeItem[]; hasMore: boolean }> {
  const supabase = await createClient();

  const from = page * pageSize;
  const to = from + pageSize - 1;

  const { data } = await supabase
    .from("anime_list_items")
    .select("*, animes(*)")
    .eq("anime_list_id", animeListId)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(from, to);

  const items = (data ?? []) as unknown as AnimeItem[];
  return { items, hasMore: items.length === pageSize };
}
