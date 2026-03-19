import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { fetchTmdbData } from "../actions";
import { ShowDetailClient } from "./page-client";
import type { ShowAnalyticsData } from "@/components/ShowAnalytics";

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

  return (
    <ShowDetailClient
      show={finalShow}
      stats={{ listCount, avgRating, ratingCount: ratings.length }}
      publicLists={publicLists}
      analyticsData={analyticsData}
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
