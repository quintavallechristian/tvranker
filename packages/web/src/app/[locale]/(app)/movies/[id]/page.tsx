import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { fetchMovieTmdbData } from "../actions";
import { MovieDetailClient } from "./page-client";
import type { ShowAnalyticsData } from "@/components/ShowAnalytics";
import { computeListSimilarity, type ListEntry } from "@/lib/similarity";
import { fetchAllRows } from "@/lib/supabase/fetchAll";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: movie } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .single();

  if (!movie) notFound();

  const needsFetch =
    movie.tmdb_fetched === false ||
    movie.tmdb_id === null ||
    (!movie.poster_path && !movie.overview);

  let finalMovie = movie;
  if (needsFetch) {
    const enriched = await fetchMovieTmdbData(id);
    if (!enriched) notFound();
    finalMovie = enriched;
  }

  // Stats: how many lists contain this movie + average rating
  const { data: listItems } = await supabase
    .from("movie_list_items")
    .select("rating, movie_list_id, added_at")
    .eq("movie_id", id);

  const listCount = new Set(listItems?.map((i) => i.movie_list_id)).size;
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

  // Public movie lists that include this movie
  const { data: publicListItems } = await supabase
    .from("movie_list_items")
    .select(
      "rating, movie_list_id, movie_lists!inner(id, name, is_public, user_id, profiles!inner(username, avatar_url))",
    )
    .eq("movie_id", id)
    .eq("movie_lists.is_public", true);

  const publicLists = (publicListItems ?? []).map((item) => {
    const list = item.movie_lists as unknown as {
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
  let movieListId: string | null = null;
  let viewerListEntries: ListEntry[] = [];

  if (user) {
    const { data: myMovieList } = await supabase
      .from("movie_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (myMovieList) {
      movieListId = myMovieList.id;

      const { data: myItem } = await supabase
        .from("movie_list_items")
        .select("id, rating")
        .eq("movie_list_id", myMovieList.id)
        .eq("movie_id", id)
        .maybeSingle();

      if (myItem) {
        userItem = { id: myItem.id, rating: myItem.rating };
      }

      // Fetch full list for similarity computation
      const allMyItems = await fetchAllRows((from, to) =>
        supabase
          .from("movie_list_items")
          .select("movie_id, rating, position")
          .eq("movie_list_id", myMovieList.id)
          .order("position", { ascending: true })
          .range(from, to),
      );

      viewerListEntries = allMyItems.map((i) => ({
        showId: i.movie_id,
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
  let movieRecommendationScore: number | null = null;

  if (viewerListEntries.length > 0 && publicLists.length > 0) {
    const publicListIds = publicLists.map((l) => l.id);
    const allPublicItems = await fetchAllRows((from, to) =>
      supabase
        .from("movie_list_items")
        .select("movie_list_id, movie_id, rating, position")
        .in("movie_list_id", publicListIds)
        .range(from, to),
    );

    if (allPublicItems.length > 0) {
      const itemsByList = new Map<string, ListEntry[]>();
      for (const item of allPublicItems) {
        if (!itemsByList.has(item.movie_list_id))
          itemsByList.set(item.movie_list_id, []);
        itemsByList.get(item.movie_list_id)!.push({
          showId: item.movie_id,
          rating: item.rating,
          position: item.position ?? 0,
        });
      }

      publicListsWithSimilarity = publicLists.map((list) => {
        const otherEntries = itemsByList.get(list.id) ?? [];
        const score = computeListSimilarity(viewerListEntries, otherEntries);
        return { ...list, similarity: score > 0 ? score : null };
      });

      // Compute recommendation score for this movie
      let weightedSum = 0;
      let count = 0;
      for (const list of publicListsWithSimilarity) {
        if (!list.similarity) continue;
        const movieEntry = allPublicItems.find(
          (item) => item.movie_list_id === list.id && item.movie_id === id,
        );
        if (!movieEntry) continue;
        const listLen = allPublicItems.filter(
          (item) => item.movie_list_id === list.id,
        ).length;
        const normalizedRating =
          movieEntry.rating !== null
            ? movieEntry.rating / 10
            : 1 - (movieEntry.position ?? 0) / Math.max(listLen, 1);
        weightedSum += (list.similarity / 100) * normalizedRating;
        count++;
      }
      if (count > 0) {
        movieRecommendationScore = Math.round((weightedSum / count) * 100);
      }
    }
  }

  return (
    <MovieDetailClient
      movie={finalMovie}
      stats={{ listCount, avgRating, ratingCount: ratings.length }}
      publicLists={publicListsWithSimilarity}
      analyticsData={analyticsData}
      userItem={userItem}
      movieListId={movieListId}
      isLoggedIn={!!user}
      movieScore={movieRecommendationScore}
    />
  );
}
