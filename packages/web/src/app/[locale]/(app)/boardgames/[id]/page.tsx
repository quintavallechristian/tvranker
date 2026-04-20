import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { BoardgameDetailClient } from "./page-client";
import type { ShowAnalyticsData } from "@/components/ShowAnalytics";
import { computeBoardgameListSimilarity } from "@/lib/similarity";
import { fetchAllRows } from "@/lib/supabase/fetchAll";
import { getBoardgameDetails } from "@/lib/bgg/client";

export default async function BoardgameDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: boardgame } = await supabase
    .from("boardgames")
    .select("*")
    .eq("id", id)
    .single();

  if (!boardgame) notFound();

  // Lazily enrich from BGG if missing data
  let finalBoardgame = boardgame;
  if (boardgame.bgg_id && !boardgame.description) {
    try {
      const details = await getBoardgameDetails(boardgame.bgg_id);
      if (details) {
        const updates = {
          description: details.description || null,
          image_url: details.image || null,
          thumbnail_url: details.thumbnail || null,
          min_players: details.minPlayers ?? null,
          max_players: details.maxPlayers ?? null,
          playing_time: details.playingTime ?? null,
          min_playtime: details.minPlaytime ?? null,
          max_playtime: details.maxPlaytime ?? null,
          min_age: details.minAge ?? null,
          year_published: details.yearPublished ?? null,
          categories: details.categories ?? [],
          mechanics: details.mechanics ?? [],
          designers: details.designers ?? [],
          bgg_rating: details.averageRating ?? null,
          bgg_weight: details.averageWeight ?? null,
        };
        await supabase.from("boardgames").update(updates).eq("id", id);
        finalBoardgame = { ...boardgame, ...updates };
      }
    } catch {
      // Keep existing data on fetch failure
    }
  }

  // Aggregate stats
  const { data: listItems } = await supabase
    .from("boardgame_list_items")
    .select("rating, boardgame_list_id, added_at")
    .eq("boardgame_id", id);

  const listCount = new Set(listItems?.map((i) => i.boardgame_list_id)).size;
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

  const [t] = await Promise.all([getTranslations("boardgameDetail")]);

  // Fetch public lists that include this boardgame
  const { data: publicListItems } = await supabase
    .from("boardgame_list_items")
    .select(
      "rating, boardgame_list_id, boardgame_lists!inner(id, name, is_public, user_id, profiles!inner(username, avatar_url))",
    )
    .eq("boardgame_id", id)
    .eq("boardgame_lists.is_public", true);

  const publicLists = (publicListItems ?? []).map((item) => {
    const list = item.boardgame_lists as unknown as {
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

  // Current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userItem: { id: string; rating: number | null } | null = null;
  let viewerListEntries: {
    boardgameId: string;
    rating: number | null;
    position: number;
  }[] = [];

  if (user) {
    const { data: myList } = await supabase
      .from("boardgame_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (myList) {
      const { data: myItem } = await supabase
        .from("boardgame_list_items")
        .select("id, rating")
        .eq("boardgame_list_id", myList.id)
        .eq("boardgame_id", id)
        .maybeSingle();

      if (myItem) {
        userItem = { id: myItem.id, rating: myItem.rating };
      }

      const allMyItems = await fetchAllRows((from, to) =>
        supabase
          .from("boardgame_list_items")
          .select("boardgame_id, rating, position")
          .eq("boardgame_list_id", myList.id)
          .order("position", { ascending: true })
          .range(from, to),
      );

      viewerListEntries = allMyItems.map((i) => ({
        boardgameId: i.boardgame_id,
        rating: i.rating,
        position: i.position ?? 0,
      }));
    }
  }

  // Compute similarity
  let publicListsWithSimilarity = publicLists.map((l) => ({
    ...l,
    similarity: null as number | null,
  }));
  let showRecommendationScore: number | null = null;

  if (viewerListEntries.length > 0 && publicLists.length > 0) {
    const publicListIds = publicLists.map((l) => l.id);
    const allPublicItems = await fetchAllRows((from, to) =>
      supabase
        .from("boardgame_list_items")
        .select("boardgame_list_id, boardgame_id, rating, position")
        .in("boardgame_list_id", publicListIds)
        .range(from, to),
    );

    if (allPublicItems.length > 0) {
      const itemsByList = new Map<
        string,
        { boardgameId: string; rating: number | null; position: number }[]
      >();
      for (const item of allPublicItems) {
        if (!itemsByList.has(item.boardgame_list_id))
          itemsByList.set(item.boardgame_list_id, []);
        itemsByList.get(item.boardgame_list_id)!.push({
          boardgameId: item.boardgame_id,
          rating: item.rating,
          position: item.position ?? 0,
        });
      }

      publicListsWithSimilarity = publicLists.map((list) => {
        const otherEntries = itemsByList.get(list.id) ?? [];
        const score = computeBoardgameListSimilarity(
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
          (item) =>
            item.boardgame_list_id === list.id && item.boardgame_id === id,
        );
        if (!entry) continue;
        const listLen = allPublicItems.filter(
          (item) => item.boardgame_list_id === list.id,
        ).length;
        const normalizedRating =
          entry.rating !== null
            ? entry.rating / 10
            : 1 - (entry.position ?? 0) / Math.max(listLen, 1);
        weightedSum += (list.similarity / 100) * normalizedRating;
        count++;
      }
      if (count > 0) {
        showRecommendationScore = Math.round((weightedSum / count) * 100);
      }
    }
  }

  const boardgameData = {
    ...finalBoardgame,
    categories: finalBoardgame.categories as { id: number; name: string }[] | null,
    mechanics: finalBoardgame.mechanics as { id: number; name: string }[] | null,
    designers: finalBoardgame.designers as { id: number; name: string }[] | null,
  };

  return (
    <BoardgameDetailClient
      boardgame={boardgameData}
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
        shows: t("boardgames"),
        users: t("users"),
      }}
    />
  );
}
