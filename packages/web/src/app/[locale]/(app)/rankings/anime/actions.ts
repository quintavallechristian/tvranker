"use server";

import { createAdminClient } from "@/lib/supabase/server";

export type TopRatedAnime = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
  avg_rating: number;
  vote_count: number;
};

export async function getTopRatedAnime(): Promise<TopRatedAnime[]> {
  const supabase = createAdminClient();

  const { data: publicLists, error: listsError } = await supabase
    .from("anime_lists")
    .select("id")
    .eq("is_public", true);

  if (listsError || !publicLists || publicLists.length === 0) return [];

  const publicListIds = publicLists.map((l) => l.id);

  const PAGE_SIZE = 1000;
  const allItems: Array<{ anime_id: string; rating: number }> = [];
  let page = 0;
  while (true) {
    const { data: batch, error: batchError } = await supabase
      .from("anime_list_items")
      .select("anime_id, rating")
      .in("anime_list_id", publicListIds)
      .not("rating", "is", null)
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (batchError) return [];
    if (!batch || batch.length === 0) break;
    allItems.push(...(batch as Array<{ anime_id: string; rating: number }>));
    if (batch.length < PAGE_SIZE) break;
    page++;
  }

  if (allItems.length === 0) return [];

  const aggregates = new Map<string, { sum: number; count: number }>();
  for (const item of allItems) {
    if (item.rating == null) continue;
    const existing = aggregates.get(item.anime_id) ?? { sum: 0, count: 0 };
    aggregates.set(item.anime_id, {
      sum: existing.sum + item.rating,
      count: existing.count + 1,
    });
  }

  const MIN_VOTES = 2;
  const ranked = Array.from(aggregates.entries())
    .filter(([, agg]) => agg.count >= MIN_VOTES)
    .map(([animeId, agg]) => ({
      animeId,
      avg: agg.sum / agg.count,
      count: agg.count,
    }))
    .sort((a, b) => b.avg - a.avg || b.count - a.count)
    .slice(0, 50);

  if (ranked.length === 0) return [];

  const animeIds = ranked.map((r) => r.animeId);
  const { data: animes } = await supabase
    .from("animes")
    .select("id, tmdb_id, title, poster_path, first_air_date, overview")
    .in("id", animeIds);

  if (!animes) return [];

  const animeMap = new Map(animes.map((a) => [a.id, a]));

  return ranked
    .map((r) => {
      const anime = animeMap.get(r.animeId);
      if (!anime) return null;
      return {
        id: anime.id,
        tmdb_id: anime.tmdb_id,
        title: anime.title,
        poster_path: anime.poster_path,
        first_air_date: anime.first_air_date ?? null,
        overview: anime.overview,
        avg_rating: Math.round(r.avg * 10) / 10,
        vote_count: r.count,
      };
    })
    .filter((r): r is TopRatedAnime => r !== null);
}
