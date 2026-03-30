import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { fetchAnimeTmdbData } from "../actions";
import { AnimeDetailClient } from "./page-client";
import type { ShowAnalyticsData } from "@/components/ShowAnalytics";
import { computeListSimilarity, type ListEntry } from "@/lib/similarity";

export default async function AnimeDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: anime } = await supabase
    .from("animes")
    .select("*")
    .eq("id", id)
    .single();

  if (!anime) notFound();

  const needsFetch =
    anime.tmdb_fetched === false ||
    anime.tmdb_id === null ||
    (!anime.poster_path && !anime.overview);

  let finalAnime = anime;
  if (needsFetch) {
    const enriched = await fetchAnimeTmdbData(id);
    if (!enriched) notFound();
    finalAnime = enriched;
  }

  // Stats: how many lists contain this anime + average rating
  const { data: listItems } = await supabase
    .from("anime_list_items")
    .select("rating, anime_list_id, added_at")
    .eq("anime_id", id);

  const listCount = new Set(listItems?.map((i) => i.anime_list_id)).size;
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

  // Public anime lists that include this anime
  const { data: publicListItems } = await supabase
    .from("anime_list_items")
    .select(
      "rating, anime_list_id, anime_lists!inner(id, name, is_public, user_id, profiles!inner(username, avatar_url))",
    )
    .eq("anime_id", id)
    .eq("anime_lists.is_public", true);

  const publicLists = (publicListItems ?? []).map((item) => {
    const list = item.anime_lists as unknown as {
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
  let animeListId: string | null = null;
  let viewerListEntries: ListEntry[] = [];

  if (user) {
    const { data: myAnimeList } = await supabase
      .from("anime_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (myAnimeList) {
      animeListId = myAnimeList.id;

      const { data: myItem } = await supabase
        .from("anime_list_items")
        .select("id, rating")
        .eq("anime_list_id", myAnimeList.id)
        .eq("anime_id", id)
        .maybeSingle();

      if (myItem) {
        userItem = { id: myItem.id, rating: myItem.rating };
      }

      // Fetch full list for similarity computation
      const { data: allMyItems } = await supabase
        .from("anime_list_items")
        .select("anime_id, rating, position")
        .eq("anime_list_id", myAnimeList.id)
        .order("position", { ascending: true });

      viewerListEntries = (allMyItems ?? []).map((i) => ({
        showId: i.anime_id,
        rating: i.rating,
        position: i.position ?? 0,
      }));
    }
  }

  // Compute similarity for each public list
  let publicListsWithSimilarity = publicLists.map((l) => ({
    ...l,
    similarity: null as number | null,
  }));
  let animeRecommendationScore: number | null = null;

  if (viewerListEntries.length > 0 && publicLists.length > 0) {
    const publicListIds = publicLists.map((l) => l.id);
    const { data: allPublicItems } = await supabase
      .from("anime_list_items")
      .select("anime_list_id, anime_id, rating, position")
      .in("anime_list_id", publicListIds);

    if (allPublicItems) {
      const itemsByList = new Map<string, ListEntry[]>();
      for (const item of allPublicItems) {
        if (!itemsByList.has(item.anime_list_id))
          itemsByList.set(item.anime_list_id, []);
        itemsByList.get(item.anime_list_id)!.push({
          showId: item.anime_id,
          rating: item.rating,
          position: item.position ?? 0,
        });
      }

      publicListsWithSimilarity = publicLists.map((list) => {
        const otherEntries = itemsByList.get(list.id) ?? [];
        const score = computeListSimilarity(viewerListEntries, otherEntries);
        return { ...list, similarity: score > 0 ? score : null };
      });

      // Compute recommendation score for this anime
      let weightedSum = 0;
      let count = 0;
      for (const list of publicListsWithSimilarity) {
        if (!list.similarity) continue;
        const animeEntry = allPublicItems.find(
          (item) => item.anime_list_id === list.id && item.anime_id === id,
        );
        if (!animeEntry) continue;
        const listLen = allPublicItems.filter(
          (item) => item.anime_list_id === list.id,
        ).length;
        const normalizedRating =
          animeEntry.rating !== null
            ? animeEntry.rating / 10
            : 1 - (animeEntry.position ?? 0) / Math.max(listLen, 1);
        weightedSum += (list.similarity / 100) * normalizedRating;
        count++;
      }
      if (count > 0) {
        animeRecommendationScore = Math.round((weightedSum / count) * 100);
      }
    }
  }

  return (
    <AnimeDetailClient
      anime={finalAnime}
      stats={{ listCount, avgRating, ratingCount: ratings.length }}
      publicLists={publicListsWithSimilarity}
      analyticsData={analyticsData}
      userItem={userItem}
      animeListId={animeListId}
      isLoggedIn={!!user}
      animeScore={animeRecommendationScore}
    />
  );
}
