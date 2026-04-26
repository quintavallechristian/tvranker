"use server";

import { createClient } from "@/lib/supabase/server";
import { computeGenreCounts } from "@/lib/genre-utils";
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

export async function getGameListAnalytics(
  gameListId?: string,
): Promise<AnalyticsData> {
  const supabase = await createClient();

  let listId: string;

  if (gameListId) {
    const { data: gameList } = await supabase
      .from("game_lists")
      .select("id, is_public")
      .eq("id", gameListId)
      .single();
    if (!gameList || !gameList.is_public) return EMPTY_ANALYTICS;
    listId = gameList.id;
  } else {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: gameList } = await supabase
      .from("game_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (!gameList) return EMPTY_ANALYTICS;
    listId = gameList.id;
  }

  type RawItem = {
    rating: number | null;
    game_id: string;
    added_at: string | null;
    games: {
      id: string;
      title: string;
      cover_url: string | null;
      first_release_date: string | null;
      genres: { id: number; name: string }[] | null;
    } | null;
  };

  const { data: rawItems } = await supabase
    .from("game_list_items")
    .select(
      "rating, game_id, added_at, games(id, title, cover_url, first_release_date, genres)",
    )
    .eq("game_list_id", listId);

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

  const monthlyMap: Record<string, number> = {};
  for (const item of items) {
    if (!item.added_at) continue;
    const month = item.added_at.slice(0, 7);
    monthlyMap[month] = (monthlyMap[month] ?? 0) + 1;
  }
  const monthlyAdded = Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({ month, count }));

  const decadeMap: Record<string, number> = {};
  const yearCountMap: Record<string, number> = {};
  const decadeRatingAcc: Record<string, { sum: number; count: number }> = {};
  const yearRatingAcc: Record<string, { sum: number; count: number }> = {};

  for (const item of items) {
    const releaseDate = item.games?.first_release_date;
    if (!releaseDate) continue;
    const year = parseInt(releaseDate.slice(0, 4), 10);
    if (isNaN(year) || year < 1900) continue;
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

  const showsByRating: Record<number, AnalyticsData["showsByRating"][number]> =
    {};
  const showsByYear: Record<string, AnalyticsData["showsByYear"][string]> = {};
  const showsByGenre: Record<number, AnalyticsData["showsByGenre"][number]> =
    {};

  for (const item of items) {
    const game = item.games;
    if (!game) continue;

    const summary = {
      id: game.id,
      title: game.title,
      poster_path: game.cover_url,
      rating: item.rating,
      first_air_date: game.first_release_date,
    };

    if (item.rating !== null) {
      showsByRating[item.rating] ??= [];
      showsByRating[item.rating].push(summary);
    }

    if (game.first_release_date) {
      const y = parseInt(game.first_release_date.slice(0, 4), 10);
      if (!isNaN(y) && y >= 1900) {
        const yr = String(y);
        showsByYear[yr] ??= [];
        showsByYear[yr].push(summary);
      }
    }

    for (const genre of game.genres ?? []) {
      showsByGenre[genre.id] ??= [];
      showsByGenre[genre.id].push(summary);
    }
  }

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
    genreCounts: computeGenreCounts(items.map((i) => i.games?.genres ?? null)),
    mostSeasonsShow: null,
    mostSeasonsByYear: [],
    longestShowByYear: [],
    longestShow: null,
  };
}
