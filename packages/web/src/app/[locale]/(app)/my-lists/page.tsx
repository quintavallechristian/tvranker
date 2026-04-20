import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PodiumWidget } from "@/components/widgets/PodiumWidget";
import type { PodiumItem } from "@/components/widgets/PodiumWidget";

export default async function MyListsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const t = await getTranslations("nav");

  // Fetch both list IDs in parallel
  const [
    { data: list },
    { data: movieList },
    { data: animeList },
    { data: gameList },
    { data: boardgameList },
  ] = await Promise.all([
    supabase.from("lists").select("id").eq("user_id", user.id).single(),
    supabase.from("movie_lists").select("id").eq("user_id", user.id).single(),
    supabase.from("anime_lists").select("id").eq("user_id", user.id).single(),
    supabase.from("game_lists").select("id").eq("user_id", user.id).single(),
    supabase
      .from("boardgame_lists")
      .select("id")
      .eq("user_id", user.id)
      .single(),
  ]);

  // Fetch top 10 shows, movies, anime and games in parallel
  const [
    showTopResult,
    movieTopResult,
    animeTopResult,
    gameTopResult,
    boardgameTopResult,
  ] = await Promise.all([
    list
      ? supabase
          .from("list_items")
          .select("rating, shows(id, title, poster_path)")
          .eq("list_id", list.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .limit(10)
      : Promise.resolve({ data: null }),
    movieList
      ? supabase
          .from("movie_list_items")
          .select("rating, movies(id, title, poster_path)")
          .eq("movie_list_id", movieList.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .limit(10)
      : Promise.resolve({ data: null }),
    animeList
      ? supabase
          .from("anime_list_items")
          .select("rating, animes(id, title, poster_path)")
          .eq("anime_list_id", animeList.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .limit(10)
      : Promise.resolve({ data: null }),
    gameList
      ? supabase
          .from("game_list_items")
          .select("rating, games(id, title, cover_url)")
          .eq("game_list_id", gameList.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .limit(10)
      : Promise.resolve({ data: null }),
    boardgameList
      ? supabase
          .from("boardgame_list_items")
          .select("rating, boardgames(id, title, thumbnail_url)")
          .eq("boardgame_list_id", boardgameList.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .limit(10)
      : Promise.resolve({ data: null }),
  ]);

  const showPodiumItems: PodiumItem[] = (showTopResult.data ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: item.shows.id,
      title: item.shows.title,
      poster_path: item.shows.poster_path,
      rating: item.rating,
    }),
  );

  const moviePodiumItems: PodiumItem[] = (movieTopResult.data ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: item.movies.id,
      title: item.movies.title,
      poster_path: item.movies.poster_path,
      rating: item.rating,
    }),
  );

  const animePodiumItems: PodiumItem[] = (animeTopResult.data ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: item.animes.id,
      title: item.animes.title,
      poster_path: item.animes.poster_path,
      rating: item.rating,
    }),
  );

  const gamePodiumItems: PodiumItem[] = (gameTopResult.data ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: item.games.id,
      title: item.games.title,
      poster_path: null,
      imageUrl: item.games.cover_url,
      rating: item.rating,
    }),
  );

  const boardgamePodiumItems: PodiumItem[] = (
    boardgameTopResult.data ?? []
  ).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: item.boardgames.id,
      title: item.boardgames.title,
      poster_path: null,
      imageUrl: item.boardgames.thumbnail_url,
      rating: item.rating,
    }),
  );

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold tracking-tight text-text-primary">
        {t("myLists")}
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <div className="h-105">
          <PodiumWidget
            items={showPodiumItems}
            topic="show"
            rowSpan={2}
            viewAllHref="/shows"
          />
        </div>
        <div className="h-105">
          <PodiumWidget
            items={moviePodiumItems}
            topic="movie"
            rowSpan={2}
            viewAllHref="/movies"
          />
        </div>
        <div className="h-105">
          <PodiumWidget
            items={animePodiumItems}
            topic="anime"
            rowSpan={2}
            viewAllHref="/anime"
          />
        </div>
        <div className="h-105">
          <PodiumWidget
            items={gamePodiumItems}
            topic="game"
            rowSpan={2}
            viewAllHref="/games"
          />
        </div>
        <div className="h-105">
          <PodiumWidget
            items={boardgamePodiumItems}
            topic="boardgame"
            rowSpan={2}
            viewAllHref="/boardgames"
          />
        </div>
      </div>
    </div>
  );
}
