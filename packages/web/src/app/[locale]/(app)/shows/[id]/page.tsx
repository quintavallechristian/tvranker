import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { fetchTmdbData } from "../actions";
import { ShowDetailClient } from "./page-client";
import type { ShowAnalyticsData } from "@/components/ShowAnalytics";
import { computeListSimilarity, type ListEntry } from "@/lib/similarity";

export default async function ShowDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch show
  const { data: show } = await supabase
    .from("shows")
    .select("*")
    .eq("id", id)
    .single();

  if (!show) notFound();

  // Lazily fetch TMDB data if not yet done.
  // Condition covers: tmdb_fetched=false (post-migration) OR negative tmdb_id (pre-migration placeholder)
  // OR previously fetched but nothing was found (e.g. anime movie missed by TV-only search).
  const needsFetch =
    (show as unknown as { tmdb_fetched?: boolean }).tmdb_fetched === false ||
    (show.tmdb_id !== null && show.tmdb_id < 0) ||
    show.tmdb_id === null ||
    (!show.poster_path && !show.overview);

  let finalShow = show;
  if (needsFetch) {
    const enrichedShow = await fetchTmdbData(id);
    // null means the show was removed (e.g. it turned out to be a movie)
    if (!enrichedShow) notFound();
    finalShow = enrichedShow;
  }

  // Aggregate stats: how many lists contain this show + average rating
  const { data: listItems } = await supabase
    .from("list_items")
    .select("rating, list_id, added_at")
    .eq("show_id", id);

  const listCount = new Set(listItems?.map((i) => i.list_id)).size;
  const ratings = (listItems ?? [])
    .map((i) => i.rating)
    .filter((r): r is number => r !== null);
  const avgRating =
    ratings.length > 0
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) /
        10
      : null;

  // Build analytics data
  const ratingCounts = Array.from({ length: 10 }, (_, i) => ({
    rating: i + 1,
    count: ratings.filter((r) => r === i + 1).length,
  }));

  const monthlyMap = new Map<string, number>();
  for (const item of listItems ?? []) {
    if (!item.added_at) continue;
    const d = new Date(item.added_at);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthlyMap.set(key, (monthlyMap.get(key) ?? 0) + 1);
  }
  const monthlyAdded = Array.from(monthlyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({ month, count }));

  const analyticsData: ShowAnalyticsData = { ratingCounts, monthlyAdded };

  const [t] = await Promise.all([getTranslations("showDetail")]);

  // Fetch public lists that include this show, with owner info
  const { data: publicListItems } = await supabase
    .from("list_items")
    .select(
      "rating, list_id, lists!inner(id, name, is_public, user_id, profiles!inner(username, avatar_url))",
    )
    .eq("show_id", id)
    .eq("lists.is_public", true);

  const publicLists = (publicListItems ?? []).map((item) => {
    const list = item.lists as unknown as {
      id: string;
      name: string;
      is_public: boolean;
      user_id: string;
      profiles: { username: string; avatar_url: string | null };
    };
    return {
      id: list.id,
      name: list.name,
      rating: item.rating,
      owner: {
        username: list.profiles.username,
        avatarUrl: list.profiles.avatar_url,
      },
    };
  });

  // Fetch current user's session and their list item for this show
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userItem: { id: string; rating: number | null } | null = null;
  let viewerListEntries: ListEntry[] = [];

  if (user) {
    const { data: myList } = await supabase
      .from("lists")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (myList) {
      // Check if the user has this show in their list
      const { data: myItem } = await supabase
        .from("list_items")
        .select("id, rating")
        .eq("list_id", myList.id)
        .eq("show_id", id)
        .maybeSingle();

      if (myItem) {
        userItem = { id: myItem.id, rating: myItem.rating };
      }

      // Fetch user's full list for similarity computation
      const { data: allMyItems } = await supabase
        .from("list_items")
        .select("show_id, rating, position")
        .eq("list_id", myList.id)
        .order("position", { ascending: true });

      viewerListEntries = (allMyItems ?? []).map((i) => ({
        showId: i.show_id,
        rating: i.rating,
        position: i.position ?? 0,
      }));
    }
  }

  // Compute similarity for each public list (batch fetch their items)
  let publicListsWithSimilarity = publicLists.map((l) => ({
    ...l,
    similarity: null as number | null,
  }));
  let showRecommendationScore: number | null = null;

  if (viewerListEntries.length > 0 && publicLists.length > 0) {
    const publicListIds = publicLists.map((l) => l.id);
    const { data: allPublicItems } = await supabase
      .from("list_items")
      .select("list_id, show_id, rating, position")
      .in("list_id", publicListIds);

    if (allPublicItems) {
      const itemsByList = new Map<string, ListEntry[]>();
      for (const item of allPublicItems) {
        if (!itemsByList.has(item.list_id)) itemsByList.set(item.list_id, []);
        itemsByList.get(item.list_id)!.push({
          showId: item.show_id,
          rating: item.rating,
          position: item.position ?? 0,
        });
      }

      publicListsWithSimilarity = publicLists.map((list) => {
        const otherEntries = itemsByList.get(list.id) ?? [];
        const score = computeListSimilarity(viewerListEntries, otherEntries);
        return { ...list, similarity: score > 0 ? score : null };
      });

      // Compute recommendation score for this show:
      // avg(sim_i/100 * normalizedRating_i) * 100, same formula as scoreRecommendations
      let weightedSum = 0;
      let count = 0;
      for (const list of publicListsWithSimilarity) {
        if (!list.similarity) continue;
        const showEntry = allPublicItems.find(
          (item) => item.list_id === list.id && item.show_id === id,
        );
        if (!showEntry) continue;
        const listLen = allPublicItems.filter(
          (item) => item.list_id === list.id,
        ).length;
        const normalizedRating =
          showEntry.rating !== null
            ? showEntry.rating / 10
            : 1 - (showEntry.position ?? 0) / Math.max(listLen, 1);
        weightedSum += (list.similarity / 100) * normalizedRating;
        count++;
      }
      if (count > 0) {
        showRecommendationScore = Math.round((weightedSum / count) * 100);
      }
    }
  }

  return (
    <ShowDetailClient
      show={finalShow}
      stats={{ listCount, avgRating, ratingCount: ratings.length }}
      publicLists={publicListsWithSimilarity}
      analyticsData={analyticsData}
      userItem={userItem}
      isLoggedIn={!!user}
      showScore={showRecommendationScore}
      analyticsLabels={{
        title: t("analyticsTitle"),
        inLists: t("inLists", { count: listCount }),
        ratedBy: t("ratedBy"),
        avgRating: t("avgRating"),
        ratingDistribution: t("ratingDistribution"),
        noRatings: t("noRatings"),
        addedOverTime: t("addedOverTime"),
        shows: t("shows"),
        users: t("users"),
      }}
    />
  );
}
