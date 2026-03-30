"use server";

import { createClient } from "@/lib/supabase/server";
import type { AnalyticsData } from "../../lists/actions";

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
  mostSeasonsShow: null,
  mostSeasonsByYear: [],
  longestShowByYear: [],
  longestShow: null,
};

export async function getAnimeListAnalytics(
  animeListId?: string,
): Promise<AnalyticsData> {
  const supabase = await createClient();

  let listId: string;

  if (animeListId) {
    const { data: animeList } = await supabase
      .from("anime_lists")
      .select("id, is_public")
      .eq("id", animeListId)
      .single();
    if (!animeList || !animeList.is_public) return EMPTY_ANALYTICS;
    listId = animeList.id;
  } else {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: animeList } = await supabase
      .from("anime_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (!animeList) return EMPTY_ANALYTICS;
    listId = animeList.id;
  }

  type RawItem = {
    rating: number | null;
    anime_id: string;
    added_at: string | null;
    animes: {
      id: string;
      title: string;
      poster_path: string | null;
      first_air_date: string | null;
      episode_count: number | null;
    } | null;
  };

  const { data: rawItems } = await supabase
    .from("anime_list_items")
    .select(
      "rating, anime_id, added_at, animes(id, title, poster_path, first_air_date, episode_count)",
    )
    .eq("anime_list_id", listId);

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

  // Decade / year distribution from first_air_date
  const decadeMap: Record<string, number> = {};
  const yearCountMap: Record<string, number> = {};
  const decadeRatingAcc: Record<string, { sum: number; count: number }> = {};
  const yearRatingAcc: Record<string, { sum: number; count: number }> = {};

  for (const item of items) {
    const airDate = item.animes?.first_air_date;
    if (!airDate) continue;
    const year = parseInt(airDate.slice(0, 4), 10);
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

  // showsByRating + showsByYear
  const showsByRating: Record<number, AnalyticsData["showsByRating"][number]> =
    {};
  const showsByYear: Record<string, AnalyticsData["showsByYear"][string]> = {};
  const longestShowByYearMap: Record<
    string,
    {
      id: string;
      title: string;
      poster_path: string | null;
      totalMinutes: number;
    }
  > = {};

  let mostEpisodesAnime: {
    id: string;
    title: string;
    poster_path: string | null;
    episodeCount: number;
    rating: number | null;
  } | null = null;

  for (const item of items) {
    const anime = item.animes;
    if (!anime) continue;

    const summary = {
      id: anime.id,
      title: anime.title,
      poster_path: anime.poster_path,
      rating: item.rating,
      first_air_date: anime.first_air_date,
    };

    if (item.rating !== null) {
      showsByRating[item.rating] ??= [];
      showsByRating[item.rating].push(summary);
    }

    const airDate = anime.first_air_date;
    if (airDate) {
      const y = parseInt(airDate.slice(0, 4), 10);
      if (!isNaN(y) && y >= 1900) {
        const yr = String(y);
        showsByYear[yr] ??= [];
        showsByYear[yr].push(summary);

        if (
          anime.episode_count &&
          anime.episode_count > (longestShowByYearMap[yr]?.totalMinutes ?? 0)
        ) {
          longestShowByYearMap[yr] = {
            id: anime.id,
            title: anime.title,
            poster_path: anime.poster_path,
            totalMinutes: anime.episode_count,
          };
        }
      }
    }

    if (
      anime.episode_count &&
      anime.episode_count > (mostEpisodesAnime?.episodeCount ?? 0)
    ) {
      mostEpisodesAnime = {
        id: anime.id,
        title: anime.title,
        poster_path: anime.poster_path,
        episodeCount: anime.episode_count,
        rating: item.rating,
      };
    }
  }

  const longestShowByYear = Object.entries(longestShowByYearMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, entry]) => ({ year, ...entry, seasonCount: 0 }));

  const longestShow = mostEpisodesAnime
    ? {
        id: mostEpisodesAnime.id,
        title: mostEpisodesAnime.title,
        poster_path: mostEpisodesAnime.poster_path,
        totalMinutes: mostEpisodesAnime.episodeCount,
        rating: mostEpisodesAnime.rating,
      }
    : null;

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
    mostSeasonsShow: null,
    mostSeasonsByYear: [],
    longestShowByYear,
    longestShow,
  };
}
