"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Helper: get the user's single list
async function getUserList(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
) {
  const { data } = await supabase
    .from("lists")
    .select("id")
    .eq("user_id", userId)
    .single();
  return data;
}

export async function updateList(
  listId: string,
  updates: { name?: string; description?: string; is_public?: boolean },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("lists")
    .update(updates)
    .eq("id", listId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/lists");
}

export async function addShowToList(
  listId: string,
  show: {
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

  // Upsert show in shows table
  let { data: existingShow } = await supabase
    .from("shows")
    .select("id")
    .eq("tmdb_id", show.tmdb_id)
    .single();

  if (!existingShow) {
    const { data: newShow, error: showError } = await supabase
      .from("shows")
      .insert({
        tmdb_id: show.tmdb_id,
        title: show.title,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date || null,
        overview: show.overview || null,
      })
      .select()
      .single();

    if (showError) throw new Error(showError.message);
    existingShow = newShow;
  }

  // Check if already in list
  const { data: duplicate } = await supabase
    .from("list_items")
    .select("id")
    .eq("list_id", listId)
    .eq("show_id", existingShow!.id)
    .single();

  if (duplicate) return;

  // Get max position in list
  const { data: items } = await supabase
    .from("list_items")
    .select("position")
    .eq("list_id", listId)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (items?.[0]?.position ?? -1) + 1;

  const { error } = await supabase.from("list_items").insert({
    list_id: listId,
    show_id: existingShow!.id,
    position: nextPosition,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/lists/${listId}`);
}

export async function removeShowFromList(listId: string, itemId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("list_items").delete().eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath(`/lists/${listId}`);
}

export async function updateShowRating(
  listId: string,
  itemId: string,
  rating: number,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  if (rating < 1 || rating > 10) throw new Error("Rating must be 1-10");

  const { error } = await supabase
    .from("list_items")
    .update({ rating })
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath(`/lists/${listId}`);
}

export async function updateShowNotes(
  listId: string,
  itemId: string,
  notes: string,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("list_items")
    .update({ notes: notes.trim() || null })
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath(`/lists/${listId}`);
}

export async function reorderListItems(listId: string, itemIds: string[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Update positions
  const updates = itemIds.map((id, index) =>
    supabase.from("list_items").update({ position: index }).eq("id", id),
  );

  await Promise.all(updates);

  revalidatePath(`/lists/${listId}`);
}

export async function importToMyList(jsonData: unknown) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const myList = await getUserList(supabase, user.id);
  if (!myList) throw new Error("List not found");

  const { parseTraktJson } = await import("@/lib/import/trakt-parser");
  const parsed = parseTraktJson(jsonData);
  const isMalImport = parsed.name === "MyAnimeList Import";

  let animeTagId: string | null = null;
  if (isMalImport) {
    const { data: animeTag } = await supabase
      .from("tags")
      .select("id")
      .eq("is_default", true)
      .ilike("name", "anime")
      .maybeSingle();

    animeTagId = animeTag?.id ?? null;
  }

  // Get current max position in the user's list
  const { data: existingItems } = await supabase
    .from("list_items")
    .select("position")
    .eq("list_id", myList.id)
    .order("position", { ascending: false })
    .limit(1);

  let position = (existingItems?.[0]?.position ?? -1) + 1;
  let importedCount = 0;

  for (const show of parsed.shows) {
    try {
      let dbShowId: string | null = null;

      // Try to find existing show by imdb_id first, then by exact title
      if (show.imdb_id) {
        const { data: existing } = await supabase
          .from("shows")
          .select("id")
          .eq("imdb_id", show.imdb_id)
          .limit(1)
          .single();
        dbShowId = existing?.id ?? null;
      }

      if (!dbShowId) {
        const { data: existing } = await supabase
          .from("shows")
          .select("id")
          .ilike("title", show.title)
          .limit(1)
          .single();
        dbShowId = existing?.id ?? null;
      }

      // Insert new show if not found
      if (!dbShowId) {
        const placeholderTmdbId = -(
          Math.abs(
            show.title.split("").reduce((a, c) => a + c.charCodeAt(0) * 31, 0),
          ) % 2000000000
        );
        const { data: newShow } = await supabase
          .from("shows")
          .insert({
            title: show.title,
            imdb_id: show.imdb_id,
            tmdb_id: placeholderTmdbId,
            poster_path: null,
            first_air_date: null,
            overview: null,
          })
          .select("id")
          .single();
        dbShowId = newShow?.id ?? null;
      }

      if (dbShowId) {
        // Skip if show already in list (unique constraint)
        const rating =
          typeof show.score === "number" && show.score >= 1 && show.score <= 10
            ? show.score
            : null;
        const { error } = await supabase
          .from("list_items")
          .insert({ list_id: myList.id, show_id: dbShowId, position, rating });
        if (!error) {
          if (animeTagId) {
            // Best-effort: keep import resilient even if tag assignment fails.
            await supabase.from("show_tags").insert({
              user_id: user.id,
              show_id: dbShowId,
              tag_id: animeTagId,
            });
          }

          position++;
          importedCount++;
        }
      }
    } catch (e) {
      console.error(`Failed to save show: ${show.title}`, e);
    }
  }

  revalidatePath("/lists");
  return { importedCount };
}

export type ShowSummary = {
  id: string;
  title: string;
  poster_path: string | null;
  rating: number | null;
  first_air_date: string | null;
};

export type AnalyticsData = {
  totalCount: number;
  ratedCount: number;
  avgRating: number | null;
  ratingCounts: { rating: number; count: number }[];
  tagCounts: { id: string; name: string; color: string; count: number }[];
  tagAvgRatings: {
    id: string;
    name: string;
    color: string;
    avgRating: number;
    count: number;
  }[];
  monthlyAdded: { month: string; count: number }[];
  decadeCounts: { decade: string; count: number }[];
  yearCounts: { year: string; count: number }[];
  decadeAvgRatings: { decade: string; avgRating: number }[];
  yearAvgRatings: { year: string; avgRating: number }[];
  showsByRating: Record<number, ShowSummary[]>;
  showsByYear: Record<string, ShowSummary[]>;
  // Season / duration stats
  mostSeasonsShow: {
    id: string;
    title: string;
    poster_path: string | null;
    seasonCount: number;
    rating: number | null;
  } | null;
  mostSeasonsByYear: {
    year: string;
    id: string;
    title: string;
    poster_path: string | null;
    seasonCount: number;
  }[];
  longestShowByYear: {
    year: string;
    id: string;
    title: string;
    poster_path: string | null;
    totalMinutes: number;
    seasonCount: number;
  }[];
  longestShow: {
    id: string;
    title: string;
    poster_path: string | null;
    totalMinutes: number;
    rating: number | null;
  } | null;
};

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

/**
 * Returns analytics for a list.
 * - No listId → the authenticated user's own list.
 * - With listId → any public list (owner's tags are shown).
 */
export async function getListAnalytics(
  listId?: string,
): Promise<AnalyticsData> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let resolvedListId: string;
  let ownerId: string;

  if (listId) {
    // Viewing someone else's (or own) list by explicit id
    const { data: listRow } = await supabase
      .from("lists")
      .select("id, user_id, is_public")
      .eq("id", listId)
      .single();
    if (!listRow) return EMPTY_ANALYTICS;
    // Only allow access if public or owned by the logged-in user
    if (!listRow.is_public && listRow.user_id !== user?.id)
      return EMPTY_ANALYTICS;
    resolvedListId = listRow.id;
    ownerId = listRow.user_id;
  } else {
    if (!user) throw new Error("Unauthorized");
    const list = await getUserList(supabase, user.id);
    if (!list) return EMPTY_ANALYTICS;
    resolvedListId = list.id;
    ownerId = user.id;
  }

  // Fetch all items (no pagination) — rating, show_id, added_at, first_air_date via join
  type RawItem = {
    rating: number | null;
    show_id: string;
    added_at: string | null;
    shows: {
      id: string;
      title: string;
      poster_path: string | null;
      first_air_date: string | null;
      seasons_data: {
        season_number: number;
        episode_count: number;
        episodes?: { runtime: number | null }[];
      }[] | null;
    } | null;
  };
  const { data: rawItems } = await supabase
    .from("list_items")
    .select(
      "rating, show_id, added_at, shows(id, title, poster_path, first_air_date, seasons_data)",
    )
    .eq("list_id", resolvedListId);

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

  // Tag distribution — use the list owner's tags
  const showIds = items.map((i) => i.show_id);
  const tagCounts: AnalyticsData["tagCounts"] = [];
  const tagAvgRatings: AnalyticsData["tagAvgRatings"] = [];

  if (showIds.length > 0) {
    const [{ data: showTagRows }, { data: tagDefs }] = await Promise.all([
      supabase
        .from("show_tags")
        .select("tag_id, show_id")
        .eq("user_id", ownerId)
        .in("show_id", showIds),
      supabase
        .from("tags")
        .select("id, name, color")
        .or(`is_default.eq.true,user_id.eq.${ownerId}`),
    ]);

    const tagMap = new Map((tagDefs ?? []).map((t) => [t.id, t]));
    const showRatingMap = new Map(items.map((i) => [i.show_id, i.rating]));

    const tagCountMap: Record<
      string,
      { id: string; name: string; color: string; count: number }
    > = {};
    const tagRatingAcc: Record<
      string,
      { id: string; name: string; color: string; sum: number; count: number }
    > = {};

    for (const row of showTagRows ?? []) {
      const tag = tagMap.get(row.tag_id);
      if (!tag) continue;

      tagCountMap[row.tag_id] ??= {
        id: tag.id,
        name: tag.name,
        color: tag.color,
        count: 0,
      };
      tagCountMap[row.tag_id].count++;

      const rating = showRatingMap.get(row.show_id);
      if (rating != null) {
        tagRatingAcc[row.tag_id] ??= {
          id: tag.id,
          name: tag.name,
          color: tag.color,
          sum: 0,
          count: 0,
        };
        tagRatingAcc[row.tag_id].sum += rating;
        tagRatingAcc[row.tag_id].count++;
      }
    }

    tagCounts.push(
      ...Object.values(tagCountMap).sort((a, b) => b.count - a.count),
    );
    tagAvgRatings.push(
      ...Object.values(tagRatingAcc)
        .map((t) => ({
          id: t.id,
          name: t.name,
          color: t.color,
          avgRating: Math.round((t.sum / t.count) * 10) / 10,
          count: t.count,
        }))
        .sort((a, b) => b.avgRating - a.avgRating),
    );
  }

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

  // Decade distribution: group by decade of first_air_date
  const decadeMap: Record<string, number> = {};
  const yearCountMap: Record<string, number> = {};
  const decadeRatingAcc: Record<string, { sum: number; count: number }> = {};
  const yearRatingAcc: Record<string, { sum: number; count: number }> = {};

  for (const item of items) {
    const firstAirDate = item.shows?.first_air_date;
    if (!firstAirDate) continue;
    const year = parseInt(firstAirDate.slice(0, 4), 10);
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

  // Build show lookup maps for modal drill-through
  const showsByRating: Record<number, ShowSummary[]> = {};
  const showsByYear: Record<string, ShowSummary[]> = {};
  for (const item of items) {
    const summary: ShowSummary = {
      id: item.shows?.id ?? item.show_id,
      title: item.shows?.title ?? "",
      poster_path: item.shows?.poster_path ?? null,
      rating: item.rating,
      first_air_date: item.shows?.first_air_date ?? null,
    };
    if (item.rating !== null) {
      showsByRating[item.rating] ??= [];
      showsByRating[item.rating].push(summary);
    }
    const fad = item.shows?.first_air_date;
    if (fad) {
      const y = parseInt(fad.slice(0, 4), 10);
      if (!isNaN(y) && y >= 1900) {
        const yr = String(y);
        showsByYear[yr] ??= [];
        showsByYear[yr].push(summary);
      }
    }
  }

  // Season / duration stats
  let mostSeasonsShow: AnalyticsData["mostSeasonsShow"] = null;
  let longestShow: AnalyticsData["longestShow"] = null;
  // mostSeasonsByYear: for each premiere year, the show with the most seasons
  const mostSeasonsByYearMap: Record<
    string,
    { id: string; title: string; poster_path: string | null; seasonCount: number }
  > = {};
  // longestShowByYear: for each premiere year, the show with the most total runtime
  const longestShowByYearMap: Record<
    string,
    { id: string; title: string; poster_path: string | null; totalMinutes: number; seasonCount: number }
  > = {};

  for (const item of items) {
    const show = item.shows;
    if (!show?.seasons_data) continue;
    const seasons = show.seasons_data;
    // Count only real seasons (exclude season 0 = specials)
    const seasonCount = seasons.filter((s) => s.season_number > 0).length;

    // Most seasons overall
    if (seasonCount > (mostSeasonsShow?.seasonCount ?? 0)) {
      mostSeasonsShow = {
        id: show.id,
        title: show.title,
        poster_path: show.poster_path,
        seasonCount,
        rating: item.rating,
      };
    }

    // Most seasons by premiere year
    const fad = show.first_air_date;
    if (fad && seasonCount > 0) {
      const y = parseInt(fad.slice(0, 4), 10);
      if (!isNaN(y) && y >= 1900) {
        const yr = String(y);
        if (!mostSeasonsByYearMap[yr] || seasonCount > mostSeasonsByYearMap[yr].seasonCount) {
          mostSeasonsByYearMap[yr] = {
            id: show.id,
            title: show.title,
            poster_path: show.poster_path,
            seasonCount,
          };
        }
      }
    }

    // Longest show by total episode runtime
    const totalMinutes = seasons.reduce((sum, season) => {
      if (!season.episodes) return sum;
      return sum + season.episodes.reduce((s, ep) => s + (ep.runtime ?? 0), 0);
    }, 0);
    if (totalMinutes > (longestShow?.totalMinutes ?? 0)) {
      longestShow = {
        id: show.id,
        title: show.title,
        poster_path: show.poster_path,
        totalMinutes,
        rating: item.rating,
      };
    }

    // Longest show by premiere year
    const fadForDuration = show.first_air_date;
    if (fadForDuration && totalMinutes > 0) {
      const y = parseInt(fadForDuration.slice(0, 4), 10);
      if (!isNaN(y) && y >= 1900) {
        const yr = String(y);
        if (!longestShowByYearMap[yr] || totalMinutes > longestShowByYearMap[yr].totalMinutes) {
          longestShowByYearMap[yr] = {
            id: show.id,
            title: show.title,
            poster_path: show.poster_path,
            totalMinutes,
            seasonCount,
          };
        }
      }
    }
  }

  const mostSeasonsByYear = Object.entries(mostSeasonsByYearMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, entry]) => ({ year, ...entry }));

  const longestShowByYear = Object.entries(longestShowByYearMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, entry]) => ({ year, ...entry }));

  return {
    totalCount,
    ratedCount,
    avgRating,
    ratingCounts,
    tagCounts,
    tagAvgRatings,
    monthlyAdded,
    decadeCounts,
    yearCounts,
    decadeAvgRatings,
    yearAvgRatings,
    showsByRating,
    showsByYear,
    mostSeasonsShow,
    mostSeasonsByYear,
    longestShowByYear,
    longestShow,
  };
}

export type ListItemWithShow = {
  id: string;
  list_id: string;
  show_id: string;
  rating: number | null;
  position: number;
  added_at: string;
  notes: string | null;
  shows: {
    id: string;
    tmdb_id: number | null;
    imdb_id: string | null;
    title: string;
    poster_path: string | null;
    first_air_date: string | null;
    overview: string | null;
    tmdb_fetched: boolean;
  };
};

export async function getListItemsPage(
  listId: string,
  page: number,
  pageSize = 50,
): Promise<{
  items: ListItemWithShow[];
  hasMore: boolean;
  showTagsMap: Record<string, string[]>;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: list } = await supabase
    .from("lists")
    .select("user_id, is_public")
    .eq("id", listId)
    .single();

  if (!list) throw new Error("List not found");
  if (!list.is_public && list.user_id !== user?.id)
    throw new Error("Unauthorized");

  const from = page * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await supabase
    .from("list_items")
    .select("*, shows(*)")
    .eq("list_id", listId)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(from, to);

  if (error) throw new Error(error.message);

  const items = (data ?? []) as unknown as ListItemWithShow[];
  const hasMore = items.length === pageSize;

  const showTagsMap: Record<string, string[]> = {};
  if (user && items.length > 0) {
    const { data: showTags } = await supabase
      .from("show_tags")
      .select("show_id, tag_id")
      .eq("user_id", user.id)
      .in(
        "show_id",
        items.map((i) => i.shows.id),
      );

    for (const st of showTags ?? []) {
      if (!showTagsMap[st.show_id]) showTagsMap[st.show_id] = [];
      showTagsMap[st.show_id].push(st.tag_id);
    }
  }

  return { items, hasMore, showTagsMap };
}

export async function addShowToMyList(show: {
  id: string;
  tmdb_id: number | null;
  imdb_id: string | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const myList = await getUserList(supabase, user.id);
  if (!myList) throw new Error("List not found");

  // Ensure the show exists in our DB (reuse existing or create)
  let showId = show.id;
  const { data: existingShow } = await supabase
    .from("shows")
    .select("id")
    .eq("id", show.id)
    .single();

  if (!existingShow) {
    const { data: newShow, error: showError } = await supabase
      .from("shows")
      .insert({
        tmdb_id:
          show.tmdb_id ??
          -(
            Math.abs(
              show.title
                .split("")
                .reduce((a, c) => a + c.charCodeAt(0) * 31, 0),
            ) % 2000000000
          ),
        imdb_id: show.imdb_id,
        title: show.title,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date,
        overview: show.overview,
      })
      .select("id")
      .single();
    if (showError) throw new Error(showError.message);
    showId = newShow!.id;
  }

  // Check if already in list
  const { data: existing } = await supabase
    .from("list_items")
    .select("id")
    .eq("list_id", myList.id)
    .eq("show_id", showId)
    .single();

  if (existing) return { alreadyExists: true };

  // Get max position
  const { data: items } = await supabase
    .from("list_items")
    .select("position")
    .eq("list_id", myList.id)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (items?.[0]?.position ?? -1) + 1;

  const { error } = await supabase.from("list_items").insert({
    list_id: myList.id,
    show_id: showId,
    position: nextPosition,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/lists");
  return { alreadyExists: false };
}

export async function addTmdbShowToMyList(show: {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const myList = await getUserList(supabase, user.id);
  if (!myList) throw new Error("List not found");

  // Find or create the show by tmdb_id
  let { data: existingShow } = await supabase
    .from("shows")
    .select("id")
    .eq("tmdb_id", show.tmdb_id)
    .single();

  if (!existingShow) {
    const { data: newShow, error: showError } = await supabase
      .from("shows")
      .insert({
        tmdb_id: show.tmdb_id,
        title: show.title,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date,
        overview: show.overview,
      })
      .select("id")
      .single();
    if (showError) throw new Error(showError.message);
    existingShow = newShow;
  }

  // Check if already in list
  const { data: existing } = await supabase
    .from("list_items")
    .select("id")
    .eq("list_id", myList.id)
    .eq("show_id", existingShow!.id)
    .single();

  if (existing) return { alreadyExists: true };

  const { data: items } = await supabase
    .from("list_items")
    .select("position")
    .eq("list_id", myList.id)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (items?.[0]?.position ?? -1) + 1;

  const { error } = await supabase.from("list_items").insert({
    list_id: myList.id,
    show_id: existingShow!.id,
    position: nextPosition,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/lists");
  return { alreadyExists: false };
}

export async function removeShowFromMyList(showId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const myList = await getUserList(supabase, user.id);
  if (!myList) throw new Error("List not found");

  const { error } = await supabase
    .from("list_items")
    .delete()
    .eq("list_id", myList.id)
    .eq("show_id", showId);

  if (error) throw new Error(error.message);

  revalidatePath("/lists");
}

export async function copyListToMine(sourceListId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Verify source list is public (or owned by user)
  const { data: sourceList } = await supabase
    .from("lists")
    .select("id, is_public, user_id")
    .eq("id", sourceListId)
    .single();

  if (!sourceList) throw new Error("List not found");
  if (!sourceList.is_public && sourceList.user_id !== user.id)
    throw new Error("Unauthorized");

  const myList = await getUserList(supabase, user.id);
  if (!myList) throw new Error("Own list not found");

  // Verify own list is empty
  const { count } = await supabase
    .from("list_items")
    .select("*", { count: "exact", head: true })
    .eq("list_id", myList.id);

  if ((count ?? 0) > 0) throw new Error("Can only copy to an empty list");

  // Fetch all items from source list
  const { data: sourceItems } = await supabase
    .from("list_items")
    .select("show_id, rating, position, notes")
    .eq("list_id", sourceListId)
    .order("position", { ascending: true });

  if (sourceItems && sourceItems.length > 0) {
    const inserts = sourceItems.map((item) => ({
      list_id: myList.id,
      show_id: item.show_id,
      rating: item.rating,
      position: item.position,
      notes: item.notes,
    }));

    const { error: insertError } = await supabase
      .from("list_items")
      .insert(inserts);

    if (insertError) throw new Error(insertError.message);
  }

  revalidatePath("/lists");
}
