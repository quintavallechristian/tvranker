import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ShowPodiumWidget } from "@/components/widgets/ShowPodiumWidget";
import { MoviePodiumWidget } from "@/components/widgets/MoviePodiumWidget";
import { AnimePodiumWidget } from "@/components/widgets/AnimePodiumWidget";
import type {
  ShowPodiumItem,
  MoviePodiumItem,
  AnimePodiumItem,
} from "@/app/[locale]/(app)/home/actions";

export default async function MyListsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const t = await getTranslations("nav");

  // Fetch both list IDs in parallel
  const [{ data: list }, { data: movieList }, { data: animeList }] =
    await Promise.all([
      supabase.from("lists").select("id").eq("user_id", user.id).single(),
      supabase.from("movie_lists").select("id").eq("user_id", user.id).single(),
      supabase.from("anime_lists").select("id").eq("user_id", user.id).single(),
    ]);

  // Fetch top 10 shows, movies and anime in parallel
  const [showTopResult, movieTopResult, animeTopResult] = await Promise.all([
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
  ]);

  const showPodiumItems: ShowPodiumItem[] = (showTopResult.data ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: item.shows.id,
      title: item.shows.title,
      poster_path: item.shows.poster_path,
      rating: item.rating,
    }),
  );

  const moviePodiumItems: MoviePodiumItem[] = (movieTopResult.data ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: item.movies.id,
      title: item.movies.title,
      poster_path: item.movies.poster_path,
      rating: item.rating,
    }),
  );

  const animePodiumItems: AnimePodiumItem[] = (animeTopResult.data ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: item.animes.id,
      title: item.animes.title,
      poster_path: item.animes.poster_path,
      rating: item.rating,
    }),
  );

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold tracking-tight text-text-primary">
        {t("myLists")}
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-105">
          <ShowPodiumWidget
            items={showPodiumItems}
            rowSpan={2}
            viewAllHref="/lists"
          />
        </div>
        <div className="h-105">
          <MoviePodiumWidget
            items={moviePodiumItems}
            rowSpan={2}
            viewAllHref="/movies"
          />
        </div>
        <div className="h-105">
          <AnimePodiumWidget
            items={animePodiumItems}
            rowSpan={2}
            viewAllHref="/anime"
          />
        </div>
      </div>
    </div>
  );
}
