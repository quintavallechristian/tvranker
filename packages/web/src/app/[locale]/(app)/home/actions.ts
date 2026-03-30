"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { WidgetConfig } from "@/lib/widgets";
import { WIDGET_TYPES } from "@/lib/widgets";

export type ShowPodiumItem = {
  id: string;
  title: string;
  poster_path: string | null;
  rating: number | null;
};

export type MoviePodiumItem = {
  id: string;
  title: string;
  poster_path: string | null;
  rating: number | null;
};

export type AnimePodiumItem = {
  id: string;
  title: string;
  poster_path: string | null;
  rating: number | null;
};

export type LastAddedShow = {
  id: string;
  title: string;
  poster_path: string | null;
  rating: number | null;
  added_at: string;
};

export type LastAddedMovie = {
  id: string;
  title: string;
  poster_path: string | null;
  rating: number | null;
  added_at: string;
};

export type LastAddedAnime = {
  id: string;
  title: string;
  poster_path: string | null;
  rating: number | null;
  added_at: string;
};

export type NotificationItem = {
  id: string;
  type: string;
  read: boolean;
  created_at: string;
  actor_username: string;
  actor_avatar_url: string | null;
};

export type RecentFollowItem = {
  id: string;
  username: string;
  avatar_url: string | null;
};

export type SuggestionItem = {
  id: string;
  title: string;
  poster_path: string | null;
};

export type HomeData = {
  username: string;
  showCount: number;
  movieCount: number;
  animeCount: number;
  top10Shows: ShowPodiumItem[];
  top10Movies: MoviePodiumItem[];
  top10Anime: AnimePodiumItem[];
  lastShow: LastAddedShow | null;
  lastMovie: LastAddedMovie | null;
  lastAnime: LastAddedAnime | null;
  notifications: NotificationItem[];
  recentFollows: RecentFollowItem[];
  suggestedShows: SuggestionItem[];
  suggestedMovies: SuggestionItem[];
  suggestedAnime: SuggestionItem[];
  widgets: WidgetConfig[];
};

export async function getHomeData(): Promise<HomeData | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [
    { data: profile },
    { data: list },
    { data: movieList },
    { data: animeList },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("username, homepage_widgets")
      .eq("id", user.id)
      .single(),
    supabase.from("lists").select("id").eq("user_id", user.id).single(),
    supabase.from("movie_lists").select("id").eq("user_id", user.id).single(),
    supabase.from("anime_lists").select("id").eq("user_id", user.id).single(),
  ]);

  const username = profile?.username ?? user.email?.split("@")[0] ?? "there";

  // Parse saved widgets
  const widgets = parseWidgets(profile?.homepage_widgets);

  // Parallel data fetching
  const [
    showCountResult,
    movieCountResult,
    animeCountResult,
    top10ShowsResult,
    top10MoviesResult,
    top10AnimeResult,
    lastShowResult,
    lastMovieResult,
    lastAnimeResult,
    notificationsResult,
    recentFollowsResult,
    suggestedShows,
    suggestedMovies,
    suggestedAnime,
  ] = await Promise.all([
    list
      ? supabase
          .from("list_items")
          .select("id", { count: "exact", head: true })
          .eq("list_id", list.id)
      : Promise.resolve({ count: 0 }),
    movieList
      ? supabase
          .from("movie_list_items")
          .select("id", { count: "exact", head: true })
          .eq("movie_list_id", movieList.id)
      : Promise.resolve({ count: 0 }),
    animeList
      ? supabase
          .from("anime_list_items")
          .select("id", { count: "exact", head: true })
          .eq("anime_list_id", animeList.id)
      : Promise.resolve({ count: 0 }),
    list
      ? supabase
          .from("list_items")
          .select("rating, shows(id, title, poster_path)")
          .eq("list_id", list.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .limit(10)
      : Promise.resolve({ data: [] }),
    movieList
      ? supabase
          .from("movie_list_items")
          .select("rating, movies(id, title, poster_path)")
          .eq("movie_list_id", movieList.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .limit(10)
      : Promise.resolve({ data: [] }),
    animeList
      ? supabase
          .from("anime_list_items")
          .select("rating, animes(id, title, poster_path)")
          .eq("anime_list_id", animeList.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .limit(10)
      : Promise.resolve({ data: [] }),
    list
      ? supabase
          .from("list_items")
          .select("rating, added_at, shows(id, title, poster_path)")
          .eq("list_id", list.id)
          .order("added_at", { ascending: false })
          .limit(1)
      : Promise.resolve({ data: [] }),
    movieList
      ? supabase
          .from("movie_list_items")
          .select("rating, added_at, movies(id, title, poster_path)")
          .eq("movie_list_id", movieList.id)
          .order("added_at", { ascending: false })
          .limit(1)
      : Promise.resolve({ data: [] }),
    animeList
      ? supabase
          .from("anime_list_items")
          .select("rating, added_at, animes(id, title, poster_path)")
          .eq("anime_list_id", animeList.id)
          .order("added_at", { ascending: false })
          .limit(1)
      : Promise.resolve({ data: [] }),
    supabase
      .from("notifications")
      .select(
        "id, type, read, created_at, actor:profiles!notifications_actor_id_fkey(id, username, avatar_url)",
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(3),
    getRecentFollows(supabase, user.id),
    getTop3PopularShows(supabase),
    getTop3PopularMovies(supabase),
    getTop3PopularAnime(supabase),
  ]);

  // Process top10 shows
  const top10Shows = (
    (
      top10ShowsResult as {
        data: Array<{
          rating: number | null;
          shows: {
            id: string;
            title: string;
            poster_path: string | null;
          } | null;
        }> | null;
      }
    ).data ?? []
  )
    .map((item) => (item.shows ? { ...item.shows, rating: item.rating } : null))
    .filter((s): s is ShowPodiumItem => s !== null);

  // Process top10 movies
  const top10Movies = (
    (
      top10MoviesResult as {
        data: Array<{
          rating: number | null;
          movies: {
            id: string;
            title: string;
            poster_path: string | null;
          } | null;
        }> | null;
      }
    ).data ?? []
  )
    .map((item) =>
      item.movies ? { ...item.movies, rating: item.rating } : null,
    )
    .filter((s): s is MoviePodiumItem => s !== null);

  // Process top10 anime
  const top10Anime = (
    (
      top10AnimeResult as {
        data: Array<{
          rating: number | null;
          animes: {
            id: string;
            title: string;
            poster_path: string | null;
          } | null;
        }> | null;
      }
    ).data ?? []
  )
    .map((item) =>
      item.animes ? { ...item.animes, rating: item.rating } : null,
    )
    .filter((s): s is AnimePodiumItem => s !== null);

  // Process last show
  let lastShow: LastAddedShow | null = null;
  const lastShowItems = (
    lastShowResult as {
      data: Array<{
        rating: number | null;
        added_at: string;
        shows: { id: string; title: string; poster_path: string | null } | null;
      }> | null;
    }
  ).data;
  if (lastShowItems && lastShowItems.length > 0 && lastShowItems[0].shows) {
    const item = lastShowItems[0];
    lastShow = {
      id: item.shows!.id,
      title: item.shows!.title,
      poster_path: item.shows!.poster_path,
      rating: item.rating,
      added_at: item.added_at,
    };
  }

  // Process last movie
  let lastMovie: LastAddedMovie | null = null;
  const lastMovieItems = (
    lastMovieResult as {
      data: Array<{
        rating: number | null;
        added_at: string;
        movies: {
          id: string;
          title: string;
          poster_path: string | null;
        } | null;
      }> | null;
    }
  ).data;
  if (lastMovieItems && lastMovieItems.length > 0 && lastMovieItems[0].movies) {
    const item = lastMovieItems[0];
    lastMovie = {
      id: item.movies!.id,
      title: item.movies!.title,
      poster_path: item.movies!.poster_path,
      rating: item.rating,
      added_at: item.added_at,
    };
  }

  // Process last anime
  let lastAnime: LastAddedAnime | null = null;
  const lastAnimeItems = (
    lastAnimeResult as {
      data: Array<{
        rating: number | null;
        added_at: string;
        animes: {
          id: string;
          title: string;
          poster_path: string | null;
        } | null;
      }> | null;
    }
  ).data;
  if (lastAnimeItems && lastAnimeItems.length > 0 && lastAnimeItems[0].animes) {
    const item = lastAnimeItems[0];
    lastAnime = {
      id: item.animes!.id,
      title: item.animes!.title,
      poster_path: item.animes!.poster_path,
      rating: item.rating,
      added_at: item.added_at,
    };
  }

  // Process notifications
  const rawNotifications =
    (
      notificationsResult as {
        data: Array<{
          id: string;
          type: string;
          read: boolean;
          created_at: string;
          actor: {
            id: string;
            username: string;
            avatar_url: string | null;
          } | null;
        }> | null;
      }
    ).data ?? [];

  const notifications: NotificationItem[] = rawNotifications
    .filter((n) => n.actor !== null)
    .map((n) => ({
      id: n.id,
      type: n.type,
      read: n.read,
      created_at: n.created_at,
      actor_username: n.actor!.username,
      actor_avatar_url: n.actor!.avatar_url,
    }));

  return {
    username,
    showCount: (showCountResult as { count: number | null }).count ?? 0,
    movieCount: (movieCountResult as { count: number | null }).count ?? 0,
    animeCount: (animeCountResult as { count: number | null }).count ?? 0,
    top10Shows,
    top10Movies,
    top10Anime,
    lastShow,
    lastMovie,
    lastAnime,
    notifications,
    recentFollows: recentFollowsResult,
    suggestedShows,
    suggestedMovies,
    suggestedAnime,
    widgets,
  };
}

async function getTop3PopularShows(
  supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<SuggestionItem[]> {
  const { data: publicLists } = await supabase
    .from("lists")
    .select("id")
    .eq("is_public", true);
  if (!publicLists?.length) return [];

  const listIds = publicLists.map((l) => l.id);
  const { data: items } = await supabase
    .from("list_items")
    .select("show_id")
    .in("list_id", listIds);
  if (!items?.length) return [];

  const countMap = new Map<string, number>();
  for (const item of items)
    countMap.set(item.show_id, (countMap.get(item.show_id) ?? 0) + 1);

  const top3Ids = Array.from(countMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => id);

  const { data: shows } = await supabase
    .from("shows")
    .select("id, title, poster_path")
    .in("id", top3Ids);
  if (!shows) return [];

  return top3Ids
    .map((id) => shows.find((s) => s.id === id))
    .filter((s): s is SuggestionItem => s != null);
}

async function getTop3PopularMovies(
  supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<SuggestionItem[]> {
  const { data: publicLists } = await supabase
    .from("movie_lists")
    .select("id")
    .eq("is_public", true);
  if (!publicLists?.length) return [];

  const listIds = publicLists.map((l) => l.id);
  const { data: items } = await supabase
    .from("movie_list_items")
    .select("movie_id")
    .in("movie_list_id", listIds);
  if (!items?.length) return [];

  const countMap = new Map<string, number>();
  for (const item of items)
    countMap.set(item.movie_id, (countMap.get(item.movie_id) ?? 0) + 1);

  const top3Ids = Array.from(countMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => id);

  const { data: movies } = await supabase
    .from("movies")
    .select("id, title, poster_path")
    .in("id", top3Ids);
  if (!movies) return [];

  return top3Ids
    .map((id) => movies.find((m) => m.id === id))
    .filter((m): m is SuggestionItem => m != null);
}

async function getTop3PopularAnime(
  supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<SuggestionItem[]> {
  const { data: publicLists } = await supabase
    .from("anime_lists")
    .select("id")
    .eq("is_public", true);
  if (!publicLists?.length) return [];

  const listIds = publicLists.map((l) => l.id);
  const { data: items } = await supabase
    .from("anime_list_items")
    .select("anime_id")
    .in("anime_list_id", listIds);
  if (!items?.length) return [];

  const countMap = new Map<string, number>();
  for (const item of items)
    countMap.set(item.anime_id, (countMap.get(item.anime_id) ?? 0) + 1);

  const top3Ids = Array.from(countMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => id);

  const { data: animes } = await supabase
    .from("animes")
    .select("id, title, poster_path")
    .in("id", top3Ids);
  if (!animes) return [];

  return top3Ids
    .map((id) => animes.find((a) => a.id === id))
    .filter((a): a is SuggestionItem => a != null);
}

function parseWidgets(raw: unknown): WidgetConfig[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (w): w is WidgetConfig =>
        typeof w === "object" &&
        w !== null &&
        "id" in w &&
        "type" in w &&
        "colSpan" in w &&
        WIDGET_TYPES.includes(w.type) &&
        (w.colSpan === 1 || w.colSpan === 2),
    )
    .map((w) => ({
      ...w,
      // Default rowSpan to 1 for configs saved before this field existed
      rowSpan: w.rowSpan === 2 ? 2 : 1,
    }));
}

export async function saveWidgets(widgets: WidgetConfig[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Validate
  const valid = widgets.every(
    (w) =>
      typeof w.id === "string" &&
      WIDGET_TYPES.includes(w.type) &&
      (w.colSpan === 1 || w.colSpan === 2) &&
      (w.rowSpan === 1 || w.rowSpan === 2),
  );
  if (!valid) throw new Error("Invalid widget config");

  const { error } = await supabase
    .from("profiles")
    .update({
      homepage_widgets: widgets as unknown as Record<string, unknown>[],
    })
    .eq("id", user.id);

  if (error) throw error;
  revalidatePath("/home");
}

// ---- helpers ----

async function getRecentFollows(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
): Promise<RecentFollowItem[]> {
  const { data: follows } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", userId)
    .order("created_at" as never, { ascending: false })
    .limit(3);

  if (!follows || follows.length === 0) return [];

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username, avatar_url")
    .in(
      "id",
      follows.map((f) => f.following_id),
    );

  if (!profiles) return [];

  // Preserve follow order
  const map = new Map(profiles.map((p) => [p.id, p]));
  return follows
    .map((f) => map.get(f.following_id))
    .filter((p): p is RecentFollowItem => p !== null);
}
