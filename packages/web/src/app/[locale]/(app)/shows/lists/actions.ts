"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { recordFeedEvent } from "@/lib/feed";

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
  updates: {
    name?: string;
    description?: string;
    is_public?: boolean;
    visible_to_followers?: boolean;
    visible_to_following?: boolean;
    rating_labels?: string[] | null;
    custom_visibility?: boolean;
  },
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

  revalidatePath("/shows");
}

export async function updateProfileVisibilityDefaults(updates: {
  default_is_public?: boolean;
  default_visible_to_followers?: boolean;
  default_visible_to_following?: boolean;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  await supabase.from("profiles").update(updates).eq("id", user.id);

  // Sync visibility to all lists that are using profile defaults (custom_visibility = false)
  const visibilityUpdates: Record<string, boolean> = {};
  if (updates.default_is_public !== undefined)
    visibilityUpdates.is_public = updates.default_is_public;
  if (updates.default_visible_to_followers !== undefined)
    visibilityUpdates.visible_to_followers =
      updates.default_visible_to_followers;
  if (updates.default_visible_to_following !== undefined)
    visibilityUpdates.visible_to_following =
      updates.default_visible_to_following;

  if (Object.keys(visibilityUpdates).length > 0) {
    await Promise.all([
      supabase
        .from("lists")
        .update(visibilityUpdates)
        .eq("user_id", user.id)
        .eq("custom_visibility", false),
      supabase
        .from("movie_lists")
        .update(visibilityUpdates)
        .eq("user_id", user.id)
        .eq("custom_visibility", false),
      supabase
        .from("anime_lists")
        .update(visibilityUpdates)
        .eq("user_id", user.id)
        .eq("custom_visibility", false),
      supabase
        .from("game_lists")
        .update(visibilityUpdates)
        .eq("user_id", user.id)
        .eq("custom_visibility", false),
    ]);
  }

  revalidatePath("/profile");
  revalidatePath("/shows");
  revalidatePath("/movies");
  revalidatePath("/anime");
  revalidatePath("/games");
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

  await recordFeedEvent(supabase, {
    userId: user.id,
    eventType: "add_item",
    contentType: "show",
    itemId: existingShow!.id,
    listId,
    itemTitle: show.title,
    posterPath: show.poster_path,
  });

  revalidatePath(`/shows/lists/${listId}`);
}

export async function removeShowFromList(listId: string, itemId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("list_items").delete().eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath(`/shows/lists/${listId}`);
}

export async function clearShowList(listId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("list_items")
    .delete()
    .eq("list_id", listId);

  if (error) throw new Error(error.message);

  revalidatePath(`/shows/lists/${listId}`);
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

  const { data: itemData } = await supabase
    .from("list_items")
    .select("show_id, shows(title, poster_path)")
    .eq("id", itemId)
    .single();

  if (itemData) {
    const show = itemData.shows as unknown as {
      title: string;
      poster_path: string | null;
    };
    await recordFeedEvent(supabase, {
      userId: user.id,
      eventType: "rate_item",
      contentType: "show",
      itemId: itemData.show_id,
      listId,
      itemTitle: show?.title ?? "",
      posterPath: show?.poster_path,
      rating,
    });
  }

  revalidatePath(`/shows/lists/${listId}`);
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

  revalidatePath(`/shows/lists/${listId}`);
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

  revalidatePath(`/shows/lists/${listId}`);
}

export type ImportMode = "merge" | "replace";
export type DuplicateMode = "skip" | "update";
export type ImportOptions = { mode: ImportMode; duplicateMode: DuplicateMode };

export async function importToMyList(
  jsonData: unknown,
  options: ImportOptions = { mode: "merge", duplicateMode: "skip" },
) {
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

  // If replace mode: delete all existing items first
  if (options.mode === "replace") {
    await supabase.from("list_items").delete().eq("list_id", myList.id);
  }

  const shows = parsed.shows;
  const CHUNK = 200;

  // ── Phase 1: Batch lookup shows by imdb_id ─────────────────────────────────
  const imdbIds = [...new Set(shows.map((s) => s.imdb_id).filter(Boolean) as string[])];
  const imdbToDbId = new Map<string, string>();

  for (let i = 0; i < imdbIds.length; i += CHUNK) {
    const { data } = await supabase
      .from("shows")
      .select("id, imdb_id")
      .in("imdb_id", imdbIds.slice(i, i + CHUNK));
    for (const row of data ?? []) {
      if (row.imdb_id) imdbToDbId.set(row.imdb_id, row.id);
    }
  }

  // ── Phase 2: Batch lookup remaining shows by title ─────────────────────────
  const titlesNeeded = [
    ...new Set(
      shows
        .filter((s) => !s.imdb_id || !imdbToDbId.has(s.imdb_id))
        .map((s) => s.title),
    ),
  ];
  const titleToDbId = new Map<string, string>();

  for (let i = 0; i < titlesNeeded.length; i += CHUNK) {
    const { data } = await supabase
      .from("shows")
      .select("id, title")
      .in("title", titlesNeeded.slice(i, i + CHUNK));
    for (const row of data ?? []) {
      titleToDbId.set(row.title.toLowerCase(), row.id);
    }
  }

  // ── Phase 3: Insert shows not found in DB ──────────────────────────────────
  const seenTitles = new Set<string>();
  const showsToInsert = shows
    .filter((s) => {
      if (s.imdb_id && imdbToDbId.has(s.imdb_id)) return false;
      if (titleToDbId.has(s.title.toLowerCase())) return false;
      if (seenTitles.has(s.title.toLowerCase())) return false;
      seenTitles.add(s.title.toLowerCase());
      return true;
    })
    .map((s) => ({
      title: s.title,
      imdb_id: s.imdb_id ?? null,
      // null tmdb_id for placeholder shows (enrichment script handles null correctly)
      tmdb_id: null as null,
      poster_path: null,
      first_air_date: null,
      overview: null,
    }));

  for (let i = 0; i < showsToInsert.length; i += CHUNK) {
    const { data: inserted } = await supabase
      .from("shows")
      .insert(showsToInsert.slice(i, i + CHUNK))
      .select("id, title, imdb_id");
    for (const row of inserted ?? []) {
      if (row.imdb_id) imdbToDbId.set(row.imdb_id, row.id);
      titleToDbId.set(row.title.toLowerCase(), row.id);
    }
  }

  // ── Phase 4: Get current max position + existing list items ───────────────
  const { data: currentItems } = await supabase
    .from("list_items")
    .select("id, show_id, position")
    .eq("list_id", myList.id)
    .order("position", { ascending: false });

  const existingByShowId = new Map<string, string>(); // show_id → item id
  let position = 0;
  for (const item of currentItems ?? []) {
    existingByShowId.set(item.show_id, item.id);
    if (item.position >= position) position = item.position + 1;
  }

  // ── Phase 5: Classify shows into inserts vs updates ────────────────────────
  const toInsert: {
    list_id: string;
    show_id: string;
    position: number;
    rating: number | null;
    added_at?: string;
  }[] = [];
  const toUpdate: { id: string; rating: number | null; added_at?: string }[] =
    [];
  const seenShowIds = new Set(existingByShowId.keys());

  for (const show of shows) {
    const dbShowId =
      (show.imdb_id && imdbToDbId.get(show.imdb_id)) ||
      titleToDbId.get(show.title.toLowerCase()) ||
      null;
    if (!dbShowId) continue;

    const rating =
      typeof show.score === "number" && show.score >= 1 && show.score <= 10
        ? show.score
        : null;

    if (existingByShowId.has(dbShowId)) {
      if (options.mode === "merge" && options.duplicateMode === "update") {
        toUpdate.push({
          id: existingByShowId.get(dbShowId)!,
          rating,
          ...(show.added_at ? { added_at: show.added_at } : {}),
        });
      }
    } else if (!seenShowIds.has(dbShowId)) {
      seenShowIds.add(dbShowId); // deduplicate within the import batch
      toInsert.push({
        list_id: myList.id,
        show_id: dbShowId,
        position: position++,
        rating,
        ...(show.added_at ? { added_at: show.added_at } : {}),
      });
    }
  }

  // ── Phase 6: Bulk insert list_items ───────────────────────────────────────
  for (let i = 0; i < toInsert.length; i += CHUNK) {
    await supabase.from("list_items").insert(toInsert.slice(i, i + CHUNK));
  }

  // ── Phase 7: Bulk update existing items (if duplicateMode === "update") ────
  if (toUpdate.length > 0) {
    await Promise.all(
      toUpdate.map(({ id, rating, added_at }) =>
        supabase
          .from("list_items")
          .update({ rating, ...(added_at ? { added_at } : {}) })
          .eq("id", id),
      ),
    );
  }

  // ── Phase 8: Bulk assign anime tags ───────────────────────────────────────
  if (animeTagId && toInsert.length > 0) {
    const tagRows = toInsert.map((item) => ({
      user_id: user.id,
      show_id: item.show_id,
      tag_id: animeTagId!,
    }));
    for (let i = 0; i < tagRows.length; i += CHUNK) {
      // Best-effort: ignore conflicts if tag already assigned
      await supabase
        .from("show_tags")
        .upsert(tagRows.slice(i, i + CHUNK), {
          onConflict: "user_id,show_id,tag_id",
          ignoreDuplicates: true,
        });
    }
  }

  revalidatePath("/shows");
  return { importedCount: toInsert.length + toUpdate.length };
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
      seasons_data:
        | {
            season_number: number;
            episode_count: number;
            episodes?: { runtime: number | null }[];
          }[]
        | null;
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
    {
      id: string;
      title: string;
      poster_path: string | null;
      seasonCount: number;
    }
  > = {};
  // longestShowByYear: for each premiere year, the show with the most total runtime
  const longestShowByYearMap: Record<
    string,
    {
      id: string;
      title: string;
      poster_path: string | null;
      totalMinutes: number;
      seasonCount: number;
    }
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
        if (
          !mostSeasonsByYearMap[yr] ||
          seasonCount > mostSeasonsByYearMap[yr].seasonCount
        ) {
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
        if (
          !longestShowByYearMap[yr] ||
          totalMinutes > longestShowByYearMap[yr].totalMinutes
        ) {
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

  revalidatePath("/shows");
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

  revalidatePath("/shows");
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

  revalidatePath("/shows");
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

  revalidatePath("/shows");
}

export async function moveAnimesFromShowsToAnimeList(
  listId: string,
): Promise<{ added: number; animeItemIds: string[] }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Verify ownership
  const { data: list } = await supabase
    .from("lists")
    .select("id")
    .eq("id", listId)
    .eq("user_id", user.id)
    .single();
  if (!list) throw new Error("Unauthorized");

  // Resolve default anime/cartoon tag IDs
  const { data: animeTags } = await supabase
    .from("tags")
    .select("id")
    .in("name", ["anime", "cartoni animati"])
    .eq("is_default", true);

  const animeTagIds = (animeTags ?? []).map((t) => t.id);
  if (animeTagIds.length === 0) return { added: 0, animeItemIds: [] };

  // Fetch ALL show_ids in this list that have at least one anime tag
  const { data: taggedShows } = await supabase
    .from("show_tags")
    .select("show_id")
    .eq("user_id", user.id)
    .in("tag_id", animeTagIds);

  const animeShowIds = [...new Set((taggedShows ?? []).map((r) => r.show_id))];
  if (animeShowIds.length === 0) return { added: 0, animeItemIds: [] };

  // Fetch the corresponding list_items (all pages) for those shows
  const { data: animeListItems } = await supabase
    .from("list_items")
    .select(
      "id, show_id, rating, shows(id, tmdb_id, title, poster_path, first_air_date, overview)",
    )
    .eq("list_id", listId)
    .in("show_id", animeShowIds);

  const shows = (animeListItems ?? []) as unknown as {
    id: string;
    show_id: string;
    rating: number | null;
    shows: {
      id: string;
      tmdb_id: number | null;
      title: string;
      poster_path: string | null;
      first_air_date: string | null;
      overview: string | null;
    };
  }[];

  if (shows.length === 0) return { added: 0, animeItemIds: [] };

  // Get or create the user's anime list
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

  if (!animeList) throw new Error("Could not create anime list");

  // Fetch existing tmdb_ids already in the anime list to skip duplicates
  const { data: existingAnimes } = await supabase
    .from("anime_list_items")
    .select("animes(tmdb_id)")
    .eq("anime_list_id", animeList.id);

  const existingTmdbIds = new Set(
    (existingAnimes ?? [])
      .map((row) => (row.animes as { tmdb_id: number | null } | null)?.tmdb_id)
      .filter((v): v is number => v != null),
  );

  // Get current max position
  const { data: posRows } = await supabase
    .from("anime_list_items")
    .select("position")
    .eq("anime_list_id", animeList.id)
    .order("position", { ascending: false })
    .limit(1);

  let nextPosition = (posRows?.[0]?.position ?? -1) + 1;
  let added = 0;
  const processedItemIds: string[] = [];

  for (const item of shows) {
    const show = item.shows;
    if (!show.tmdb_id || existingTmdbIds.has(show.tmdb_id)) {
      // Already in anime list — still track the item id for optional removal
      processedItemIds.push(item.id);
      continue;
    }

    // Upsert the anime record
    let { data: existingAnime } = await supabase
      .from("animes")
      .select("id")
      .eq("tmdb_id", show.tmdb_id)
      .single();

    if (!existingAnime) {
      const { data: newAnime, error: animeError } = await supabase
        .from("animes")
        .insert({
          tmdb_id: show.tmdb_id,
          title: show.title,
          poster_path: show.poster_path,
          first_air_date: show.first_air_date || null,
          overview: show.overview || null,
        })
        .select("id")
        .single();

      if (animeError) continue;
      existingAnime = newAnime;
    }

    if (!existingAnime) continue;

    const { error: insertError } = await supabase
      .from("anime_list_items")
      .insert({
        anime_list_id: animeList.id,
        anime_id: existingAnime.id,
        position: nextPosition,
        rating: item.rating ?? null,
      });

    if (!insertError) {
      nextPosition++;
      added++;
      existingTmdbIds.add(show.tmdb_id);
      processedItemIds.push(item.id);
    }
  }

  revalidatePath("/anime");

  return { added, animeItemIds: processedItemIds };
}
