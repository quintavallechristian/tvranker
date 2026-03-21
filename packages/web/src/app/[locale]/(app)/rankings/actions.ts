"use server";

import { createClient } from "@/lib/supabase/server";

export type TopRatedShow = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
  avg_rating: number;
  vote_count: number;
};

export async function getTopRatedShows(): Promise<TopRatedShow[]> {
  const supabase = await createClient();

  // Get all public list IDs
  const { data: publicLists } = await supabase
    .from("lists")
    .select("id")
    .eq("is_public", true);

  if (!publicLists || publicLists.length === 0) return [];

  const publicListIds = publicLists.map((l) => l.id);

  // Get all rated items from public lists
  const { data: items } = await supabase
    .from("list_items")
    .select("show_id, rating")
    .in("list_id", publicListIds)
    .not("rating", "is", null);

  if (!items || items.length === 0) return [];

  // Aggregate: sum ratings and count per show
  const aggregates = new Map<string, { sum: number; count: number }>();
  for (const item of items) {
    if (item.rating == null) continue;
    const existing = aggregates.get(item.show_id) ?? { sum: 0, count: 0 };
    aggregates.set(item.show_id, {
      sum: existing.sum + item.rating,
      count: existing.count + 1,
    });
  }

  // Require at least 2 votes to be included in the ranking
  const MIN_VOTES = 2;
  const ranked = Array.from(aggregates.entries())
    .filter(([, agg]) => agg.count >= MIN_VOTES)
    .map(([showId, agg]) => ({
      showId,
      avg: agg.sum / agg.count,
      count: agg.count,
    }))
    .sort((a, b) => b.avg - a.avg || b.count - a.count)
    .slice(0, 50);

  if (ranked.length === 0) return [];

  const showIds = ranked.map((r) => r.showId);
  const { data: shows } = await supabase
    .from("shows")
    .select("id, tmdb_id, title, poster_path, first_air_date, overview")
    .in("id", showIds);

  if (!shows) return [];

  const showMap = new Map(shows.map((s) => [s.id, s]));

  return ranked
    .map((r) => {
      const show = showMap.get(r.showId);
      if (!show) return null;
      return {
        id: show.id,
        tmdb_id: show.tmdb_id,
        title: show.title,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date,
        overview: show.overview,
        avg_rating: Math.round(r.avg * 10) / 10,
        vote_count: r.count,
      };
    })
    .filter((r): r is TopRatedShow => r !== null);
}
