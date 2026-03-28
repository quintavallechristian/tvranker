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

export async function getMovieListAnalytics(
  movieListId?: string,
): Promise<AnalyticsData> {
  const supabase = await createClient();

  let listId: string;

  if (movieListId) {
    // Fetching a specific list — must be public
    const { data: movieList } = await supabase
      .from("movie_lists")
      .select("id, is_public")
      .eq("id", movieListId)
      .single();
    if (!movieList || !movieList.is_public) return EMPTY_ANALYTICS;
    listId = movieList.id;
  } else {
    // Fetching current user's own list
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: movieList } = await supabase
      .from("movie_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (!movieList) return EMPTY_ANALYTICS;
    listId = movieList.id;
  }

  type RawItem = {
    rating: number | null;
    movie_id: string;
    added_at: string | null;
    movies: {
      id: string;
      title: string;
      poster_path: string | null;
      release_date: string | null;
      runtime: number | null;
    } | null;
  };

  const { data: rawItems } = await supabase
    .from("movie_list_items")
    .select(
      "rating, movie_id, added_at, movies(id, title, poster_path, release_date, runtime)",
    )
    .eq("movie_list_id", listId);

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

  // Timeline: group by added_at month (YYYY-MM)
  const monthlyMap: Record<string, number> = {};
  for (const item of items) {
    if (!item.added_at) continue;
    const month = item.added_at.slice(0, 7);
    monthlyMap[month] = (monthlyMap[month] ?? 0) + 1;
  }
  const monthlyAdded = Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({ month, count }));

  // Decade / year distribution from release_date
  const decadeMap: Record<string, number> = {};
  const yearCountMap: Record<string, number> = {};
  const decadeRatingAcc: Record<string, { sum: number; count: number }> = {};
  const yearRatingAcc: Record<string, { sum: number; count: number }> = {};

  for (const item of items) {
    const releaseDate = item.movies?.release_date;
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

  // showsByRating + showsByYear + longestShowByYear — for clickable charts
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

  for (const item of items) {
    const movie = item.movies;
    if (!movie) continue;

    const summary = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      rating: item.rating,
      first_air_date: movie.release_date,
    };

    if (item.rating !== null) {
      showsByRating[item.rating] ??= [];
      showsByRating[item.rating].push(summary);
    }

    const releaseDate = movie.release_date;
    if (releaseDate) {
      const y = parseInt(releaseDate.slice(0, 4), 10);
      if (!isNaN(y) && y >= 1900) {
        const yr = String(y);
        showsByYear[yr] ??= [];
        showsByYear[yr].push(summary);

        if (
          movie.runtime &&
          movie.runtime > (longestShowByYearMap[yr]?.totalMinutes ?? 0)
        ) {
          longestShowByYearMap[yr] = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            totalMinutes: movie.runtime,
          };
        }
      }
    }
  }

  const longestShowByYear = Object.entries(longestShowByYearMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, entry]) => ({ year, ...entry, seasonCount: 0 }));

  // Longest movie by runtime (overall)
  let longestShow: AnalyticsData["longestShow"] = null;
  for (const item of items) {
    const movie = item.movies;
    if (!movie?.runtime) continue;
    if (movie.runtime > (longestShow?.totalMinutes ?? 0)) {
      longestShow = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        totalMinutes: movie.runtime,
        rating: item.rating,
      };
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
    mostSeasonsShow: null,
    mostSeasonsByYear: [],
    longestShowByYear,
    longestShow,
  };
}
