import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { GameDetailClient } from "./page-client";
import type { ShowAnalyticsData } from "@/components/ShowAnalytics";
import { computeGameListSimilarity } from "@/lib/similarity";
import { fetchAllRows } from "@/lib/supabase/fetchAll";

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: game } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single();

  if (!game) notFound();

  const { data: listItems } = await supabase
    .from("game_list_items")
    .select("rating, game_list_id, added_at")
    .eq("game_id", id);

  const listCount = new Set(listItems?.map((i) => i.game_list_id)).size;
  const ratings = (listItems ?? [])
    .map((i) => i.rating)
    .filter((r): r is number => r !== null);
  const avgRating =
    ratings.length > 0
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) /
        10
      : null;

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

  const [t] = await Promise.all([getTranslations("gameDetail")]);

  const { data: publicListItems } = await supabase
    .from("game_list_items")
    .select(
      "rating, game_list_id, game_lists!inner(id, name, is_public, user_id, profiles!inner(username, avatar_url))",
    )
    .eq("game_id", id)
    .eq("game_lists.is_public", true);

  const publicLists = (publicListItems ?? []).map((item) => {
    const list = item.game_lists as unknown as {
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userItem: { id: string; rating: number | null } | null = null;
  let viewerListEntries: {
    gameId: string;
    rating: number | null;
    position: number;
  }[] = [];

  if (user) {
    const { data: myList } = await supabase
      .from("game_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (myList) {
      const { data: myItem } = await supabase
        .from("game_list_items")
        .select("id, rating")
        .eq("game_list_id", myList.id)
        .eq("game_id", id)
        .maybeSingle();

      if (myItem) {
        userItem = { id: myItem.id, rating: myItem.rating };
      }

      const allMyItems = await fetchAllRows((from, to) =>
        supabase
          .from("game_list_items")
          .select("game_id, rating, position")
          .eq("game_list_id", myList.id)
          .order("position", { ascending: true })
          .range(from, to),
      );

      viewerListEntries = allMyItems.map((i) => ({
        gameId: i.game_id,
        rating: i.rating,
        position: i.position ?? 0,
      }));
    }
  }

  let publicListsWithSimilarity = publicLists.map((l) => ({
    ...l,
    similarity: null as number | null,
  }));
  let gameRecommendationScore: number | null = null;

  if (viewerListEntries.length > 0 && publicLists.length > 0) {
    const publicListIds = publicLists.map((l) => l.id);
    const allPublicItems = await fetchAllRows((from, to) =>
      supabase
        .from("game_list_items")
        .select("game_list_id, game_id, rating, position")
        .in("game_list_id", publicListIds)
        .range(from, to),
    );

    if (allPublicItems.length > 0) {
      const itemsByList = new Map<
        string,
        { gameId: string; rating: number | null; position: number }[]
      >();
      for (const item of allPublicItems) {
        if (!itemsByList.has(item.game_list_id))
          itemsByList.set(item.game_list_id, []);
        itemsByList.get(item.game_list_id)!.push({
          gameId: item.game_id,
          rating: item.rating,
          position: item.position ?? 0,
        });
      }

      publicListsWithSimilarity = publicLists.map((list) => {
        const otherEntries = itemsByList.get(list.id) ?? [];
        const score = computeGameListSimilarity(
          viewerListEntries,
          otherEntries,
        );
        return { ...list, similarity: score > 0 ? score : null };
      });

      let weightedSum = 0;
      let count = 0;
      for (const list of publicListsWithSimilarity) {
        if (!list.similarity) continue;
        const entry = allPublicItems.find(
          (item) => item.game_list_id === list.id && item.game_id === id,
        );
        if (!entry) continue;
        const listLen = allPublicItems.filter(
          (item) => item.game_list_id === list.id,
        ).length;
        const normalizedRating =
          entry.rating !== null
            ? entry.rating / 10
            : 1 - (entry.position ?? 0) / Math.max(listLen, 1);
        weightedSum += (list.similarity / 100) * normalizedRating;
        count++;
      }
      if (count > 0) {
        gameRecommendationScore = Math.round((weightedSum / count) * 100);
      }
    }
  }

  const gameData = {
    ...game,
    platforms: game.platforms as { id: number; name: string }[] | null,
    genres: game.genres as { id: number; name: string }[] | null,
  };

  return (
    <GameDetailClient
      game={gameData}
      stats={{ listCount, avgRating, ratingCount: ratings.length }}
      publicLists={publicListsWithSimilarity}
      analyticsData={analyticsData}
      userItem={userItem}
      isLoggedIn={!!user}
      gameScore={gameRecommendationScore}
      analyticsLabels={{
        title: t("analyticsTitle"),
        inLists: t("inLists", { count: listCount }),
        ratedBy: t("ratedBy"),
        avgRating: t("avgRating"),
        ratingDistribution: t("ratingDistribution"),
        noRatings: t("noRatings"),
        addedOverTime: t("addedOverTime"),
        shows: t("adds"),
        users: t("users"),
      }}
    />
  );
}
