"use server";

import { createAdminClient } from "@/lib/supabase/server";

export type TopRatedGame = {
  id: string;
  igdb_id: number | null;
  title: string;
  cover_url: string | null;
  first_release_date: string | null;
  overview: string | null;
  avg_rating: number;
  vote_count: number;
};

export async function getTopRatedGamesRanking(): Promise<TopRatedGame[]> {
  const supabase = createAdminClient();

  const { data: publicLists, error: listsError } = await supabase
    .from("game_lists")
    .select("id")
    .eq("is_public", true);

  if (listsError || !publicLists || publicLists.length === 0) return [];

  const publicListIds = publicLists.map((l) => l.id);

  const PAGE_SIZE = 1000;
  const allItems: Array<{ game_id: string; rating: number }> = [];
  let page = 0;
  while (true) {
    const { data: batch, error: batchError } = await supabase
      .from("game_list_items")
      .select("game_id, rating")
      .in("game_list_id", publicListIds)
      .not("rating", "is", null)
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (batchError) return [];
    if (!batch || batch.length === 0) break;
    allItems.push(...(batch as Array<{ game_id: string; rating: number }>));
    if (batch.length < PAGE_SIZE) break;
    page++;
  }

  if (allItems.length === 0) return [];

  const aggregates = new Map<string, { sum: number; count: number }>();
  for (const item of allItems) {
    if (item.rating == null) continue;
    const existing = aggregates.get(item.game_id) ?? { sum: 0, count: 0 };
    aggregates.set(item.game_id, {
      sum: existing.sum + item.rating,
      count: existing.count + 1,
    });
  }

  const MIN_VOTES = 2;
  const ranked = Array.from(aggregates.entries())
    .filter(([, agg]) => agg.count >= MIN_VOTES)
    .map(([gameId, agg]) => ({
      gameId,
      avg: agg.sum / agg.count,
      count: agg.count,
    }))
    .sort((a, b) => b.avg - a.avg || b.count - a.count)
    .slice(0, 50);

  if (ranked.length === 0) return [];

  const gameIds = ranked.map((r) => r.gameId);
  const { data: games } = await supabase
    .from("games")
    .select("id, igdb_id, title, cover_url, first_release_date, overview")
    .in("id", gameIds);

  if (!games) return [];

  const gameMap = new Map(games.map((g) => [g.id, g]));

  return ranked
    .map((r) => {
      const game = gameMap.get(r.gameId);
      if (!game) return null;
      return {
        id: game.id,
        igdb_id: game.igdb_id,
        title: game.title,
        cover_url: game.cover_url,
        first_release_date: game.first_release_date ?? null,
        overview: game.overview,
        avg_rating: Math.round(r.avg * 10) / 10,
        vote_count: r.count,
      };
    })
    .filter((r): r is TopRatedGame => r !== null);
}
