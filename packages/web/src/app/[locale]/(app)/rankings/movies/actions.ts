"use server";

import { createAdminClient } from "@/lib/supabase/server";

export type TopRatedMovie = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview: string | null;
  avg_rating: number;
  vote_count: number;
};

export async function getTopRatedMovies(): Promise<TopRatedMovie[]> {
  const supabase = createAdminClient();

  // Get all public movie list IDs
  const { data: publicLists, error: listsError } = await supabase
    .from("movie_lists")
    .select("id")
    .eq("is_public", true);

  if (listsError) {
    console.error("[getTopRatedMovies] Error fetching public lists:", listsError);
    return [];
  }

  if (!publicLists || publicLists.length === 0) {
    console.log("[getTopRatedMovies] No public movie lists found.");
    return [];
  }

  console.log(`[getTopRatedMovies] Found ${publicLists.length} public movie lists.`);
  const publicListIds = publicLists.map((l) => l.id);

  // Fetch all rated items in pages (Supabase default cap is 1000 rows)
  const PAGE_SIZE = 1000;
  const allItems: Array<{ movie_id: string; rating: number }> = [];
  let page = 0;
  while (true) {
    const { data: batch, error: batchError } = await supabase
      .from("movie_list_items")
      .select("movie_id, rating")
      .in("movie_list_id", publicListIds)
      .not("rating", "is", null)
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (batchError) {
      console.error("[getTopRatedMovies] Error fetching movie list items:", batchError);
      return [];
    }
    if (!batch || batch.length === 0) break;
    allItems.push(...(batch as Array<{ movie_id: string; rating: number }>));
    if (batch.length < PAGE_SIZE) break;
    page++;
  }

  const items = allItems;
  console.log(`[getTopRatedMovies] Found ${items.length} rated movie items (across ${page + 1} page(s)).`);

  if (!items || items.length === 0) {
    console.log("[getTopRatedMovies] No rated items found.");
    return [];
  }

  // Aggregate: sum ratings and count per movie
  const aggregates = new Map<string, { sum: number; count: number }>();
  for (const item of items) {
    if (item.rating == null) continue;
    const existing = aggregates.get(item.movie_id) ?? { sum: 0, count: 0 };
    aggregates.set(item.movie_id, {
      sum: existing.sum + item.rating,
      count: existing.count + 1,
    });
  }

  // Require at least 2 votes to be included in the ranking
  const MIN_VOTES = 2;
  const ranked = Array.from(aggregates.entries())
    .filter(([, agg]) => agg.count >= MIN_VOTES)
    .map(([movieId, agg]) => ({
      movieId,
      avg: agg.sum / agg.count,
      count: agg.count,
    }))
    .sort((a, b) => b.avg - a.avg || b.count - a.count)
    .slice(0, 50);

  console.log(`[getTopRatedMovies] ${aggregates.size} unique movies aggregated; ${ranked.length} pass MIN_VOTES=${MIN_VOTES}.`);

  if (ranked.length === 0) return [];

  const movieIds = ranked.map((r) => r.movieId);
  const { data: movies } = await supabase
    .from("movies")
    .select("id, tmdb_id, title, poster_path, release_date, overview")
    .in("id", movieIds);

  if (!movies) return [];

  const movieMap = new Map(movies.map((m) => [m.id, m]));

  return ranked
    .map((r) => {
      const movie = movieMap.get(r.movieId);
      if (!movie) return null;
      return {
        id: movie.id,
        tmdb_id: movie.tmdb_id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date ?? null,
        overview: movie.overview,
        avg_rating: Math.round(r.avg * 10) / 10,
        vote_count: r.count,
      };
    })
    .filter((r): r is TopRatedMovie => r !== null);
}
