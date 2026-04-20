"use server";

import { createAdminClient } from "@/lib/supabase/server";

export type TopRatedBoardgame = {
  id: string;
  bgg_id: number | null;
  title: string;
  thumbnail_url: string | null;
  year_published: number | null;
  avg_rating: number;
  vote_count: number;
};

export async function getTopRatedBoardgamesRanking(): Promise<
  TopRatedBoardgame[]
> {
  const supabase = createAdminClient();

  const { data: publicLists, error: listsError } = await supabase
    .from("boardgame_lists")
    .select("id")
    .eq("is_public", true);

  if (listsError || !publicLists || publicLists.length === 0) return [];

  const publicListIds = publicLists.map((l) => l.id);

  const PAGE_SIZE = 1000;
  const allItems: Array<{ boardgame_id: string; rating: number }> = [];
  let page = 0;
  while (true) {
    const { data: batch, error: batchError } = await supabase
      .from("boardgame_list_items")
      .select("boardgame_id, rating")
      .in("boardgame_list_id", publicListIds)
      .not("rating", "is", null)
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (batchError) return [];
    if (!batch || batch.length === 0) break;
    allItems.push(
      ...(batch as Array<{ boardgame_id: string; rating: number }>),
    );
    if (batch.length < PAGE_SIZE) break;
    page++;
  }

  if (allItems.length === 0) return [];

  const aggregates = new Map<string, { sum: number; count: number }>();
  for (const item of allItems) {
    if (item.rating == null) continue;
    const existing = aggregates.get(item.boardgame_id) ?? { sum: 0, count: 0 };
    aggregates.set(item.boardgame_id, {
      sum: existing.sum + item.rating,
      count: existing.count + 1,
    });
  }

  const MIN_VOTES = 2;
  const ranked = Array.from(aggregates.entries())
    .filter(([, agg]) => agg.count >= MIN_VOTES)
    .map(([boardgameId, agg]) => ({
      boardgameId,
      avg: agg.sum / agg.count,
      count: agg.count,
    }))
    .sort((a, b) => b.avg - a.avg || b.count - a.count)
    .slice(0, 50);

  if (ranked.length === 0) return [];

  const boardgameIds = ranked.map((r) => r.boardgameId);
  const { data: boardgames } = await supabase
    .from("boardgames")
    .select("id, bgg_id, title, thumbnail_url, year_published")
    .in("id", boardgameIds);

  if (!boardgames) return [];

  const bgMap = new Map(boardgames.map((bg) => [bg.id, bg]));

  return ranked
    .map((r) => {
      const bg = bgMap.get(r.boardgameId);
      if (!bg) return null;
      return {
        id: bg.id,
        bgg_id: bg.bgg_id,
        title: bg.title,
        thumbnail_url: bg.thumbnail_url,
        year_published: bg.year_published,
        avg_rating: Math.round(r.avg * 10) / 10,
        vote_count: r.count,
      };
    })
    .filter((r): r is TopRatedBoardgame => r !== null);
}
