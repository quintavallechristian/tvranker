"use server";

import { createClient } from "@/lib/supabase/server";
import type { AnalyticsData } from "../../shows/lists/actions";

const EMPTY_ANALYTICS: AnalyticsData = {
  totalCount: 0,
  ratedCount: 0,
  avgRating: null,
  ratingCounts: Array.from({ length: 10 }, (_, i) => ({
    rating: i + 1,
    count: 0,
  })),
  tagCounts: [],
  tagAvgRatings: [],
  monthlyAdded: [],
  decadeCounts: [],
  yearCounts: [],
  decadeAvgRatings: [],
  yearAvgRatings: [],
  showsByRating: {},
  showsByYear: {},
  showsByGenre: {},
  genreCounts: [],
  mostSeasonsShow: null,
  mostSeasonsByYear: [],
  longestShowByYear: [],
  longestShow: null,
};

export async function getBoardgameListAnalytics(
  boardgameListId?: string,
): Promise<AnalyticsData> {
  const supabase = await createClient();

  let listId: string;

  if (boardgameListId) {
    const { data: boardgameList } = await supabase
      .from("boardgame_lists")
      .select("id, is_public")
      .eq("id", boardgameListId)
      .single();
    if (!boardgameList || !boardgameList.is_public) return EMPTY_ANALYTICS;
    listId = boardgameList.id;
  } else {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: boardgameList } = await supabase
      .from("boardgame_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (!boardgameList) return EMPTY_ANALYTICS;
    listId = boardgameList.id;
  }

  type RawItem = {
    rating: number | null;
    boardgame_id: string;
    added_at: string | null;
    boardgames: {
      id: string;
      title: string;
      thumbnail_url: string | null;
      year_published: number | null;
      playing_time: number | null;
      categories: string[] | null;
    } | null;
  };

  const { data: rawItems } = await supabase
    .from("boardgame_list_items")
    .select(
      "rating, boardgame_id, added_at, boardgames(id, title, thumbnail_url, year_published, playing_time, categories)",
    )
    .eq("boardgame_list_id", listId);

  const items = (rawItems ?? []) as RawItem[];
  const totalCount = items.length;
  const ratedRows = items.filter((r) => r.rating !== null);
  const ratedCount = ratedRows.length;
  const avgRating =
    ratedCount > 0
      ? Math.round(
          (ratedRows.reduce((s, r) => s + r.rating!, 0) / ratedCount) * 10,
        ) / 10
      : null;

  // Rating distribution
  const ratingMap: Record<number, number> = {};
  for (let r = 1; r <= 10; r++) ratingMap[r] = 0;
  for (const row of items) {
    if (row.rating !== null)
      ratingMap[row.rating] = (ratingMap[row.rating] ?? 0) + 1;
  }
  const ratingCounts = Array.from({ length: 10 }, (_, i) => ({
    rating: i + 1,
    count: ratingMap[i + 1],
  }));

  // Timeline
  const monthlyMap: Record<string, number> = {};
  for (const item of items) {
    if (!item.added_at) continue;
    const month = item.added_at.slice(0, 7);
    monthlyMap[month] = (monthlyMap[month] ?? 0) + 1;
  }
  const monthlyAdded = Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({ month, count }));

  // Decade / year distribution from year_published
  const decadeMap: Record<string, number> = {};
  const yearCountMap: Record<string, number> = {};
  const decadeRatingAcc: Record<string, { sum: number; count: number }> = {};
  const yearRatingAcc: Record<string, { sum: number; count: number }> = {};

  for (const item of items) {
    const year = item.boardgames?.year_published;
    if (!year || year < 1900) continue;
    const decade = `${Math.floor(year / 10) * 10}s`;
    const yearStr = String(year);

    decadeMap[decade] = (decadeMap[decade] ?? 0) + 1;
    yearCountMap[yearStr] = (yearCountMap[yearStr] ?? 0) + 1;

    if (item.rating !== null) {
      decadeRatingAcc[decade] ??= { sum: 0, count: 0 };
      decadeRatingAcc[decade].sum += item.rating;
      decadeRatingAcc[decade].count++;

      yearRatingAcc[yearStr] ??= { sum: 0, count: 0 };
      yearRatingAcc[yearStr].sum += item.rating;
      yearRatingAcc[yearStr].count++;
    }
  }

  const decadeCounts = Object.entries(decadeMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([decade, count]) => ({ decade, count }));

  const yearCounts = Object.entries(yearCountMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, count]) => ({ year, count }));

  const decadeAvgRatings = Object.entries(decadeRatingAcc)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([decade, { sum, count }]) => ({
      decade,
      avgRating: Math.round((sum / count) * 10) / 10,
    }));

  const yearAvgRatings = Object.entries(yearRatingAcc)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, { sum, count }]) => ({
      year,
      avgRating: Math.round((sum / count) * 10) / 10,
    }));

  // showsByRating + showsByYear + genre counts
  const showsByRating: Record<number, AnalyticsData["showsByRating"][number]> =
    {};
  const showsByYear: Record<string, AnalyticsData["showsByYear"][string]> = {};
  const showsByGenre: Record<number, AnalyticsData["showsByGenre"][number]> =
    {};
  const genreCountMap: Record<number, { name: string; count: number }> = {};

  for (const item of items) {
    const bg = item.boardgames;
    if (!bg) continue;

    const summary = {
      id: bg.id,
      title: bg.title,
      poster_path: bg.thumbnail_url ?? null,
      rating: item.rating,
      first_air_date: bg.year_published ? `${bg.year_published}-01-01` : null,
    };

    if (item.rating !== null) {
      showsByRating[item.rating] ??= [];
      showsByRating[item.rating].push(summary);
    }

    if (bg.year_published && bg.year_published >= 1900) {
      const yr = String(bg.year_published);
      showsByYear[yr] ??= [];
      showsByYear[yr].push(summary);
    }

    for (const cat of bg.categories ?? []) {
      if (typeof cat !== "object" || cat === null) continue;
      const { id: catId, name: catName } = cat as { id: number; name: string };
      if (!genreCountMap[catId]) {
        genreCountMap[catId] = { name: catName, count: 0 };
      }
      genreCountMap[catId].count++;
      showsByGenre[catId] ??= [];
      showsByGenre[catId].push(summary);
    }
  }

  const genreCounts = Object.entries(genreCountMap)
    .map(([id, { name, count }]) => ({ id: Number(id), name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalCount,
    ratedCount,
    avgRating,
    ratingCounts,
    tagCounts: [],
    tagAvgRatings: [],
    monthlyAdded,
    decadeCounts,
    yearCounts,
    decadeAvgRatings,
    yearAvgRatings,
    showsByRating,
    showsByYear,
    showsByGenre,
    genreCounts,
    mostSeasonsShow: null,
    mostSeasonsByYear: [],
    longestShowByYear: [],
    longestShow: null,
  };
}
