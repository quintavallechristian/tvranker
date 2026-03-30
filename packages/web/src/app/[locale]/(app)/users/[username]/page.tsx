import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UserAvatar } from "@/components/UserAvatar";
import { FollowButton } from "@/components/FollowButton";
import {
  computeListSimilarity,
  computeMovieListSimilarity,
  computeAnimeListSimilarity,
} from "@/lib/similarity";
import { Link } from "@/i18n/navigation";
import { ShowPodiumWidget } from "@/components/widgets/ShowPodiumWidget";
import { MoviePodiumWidget } from "@/components/widgets/MoviePodiumWidget";
import { AnimePodiumWidget } from "@/components/widgets/AnimePodiumWidget";
import type {
  ShowPodiumItem,
  MoviePodiumItem,
  AnimePodiumItem,
} from "@/app/[locale]/(app)/home/actions";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();
  const tUsers = await getTranslations("users");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  // Fetch both lists in parallel
  const [{ data: list }, { data: movieList }, { data: animeList }] =
    await Promise.all([
      supabase
        .from("lists")
        .select("id, is_public")
        .eq("user_id", profile.id)
        .single(),
      supabase
        .from("movie_lists")
        .select("id, is_public")
        .eq("user_id", profile.id)
        .single(),
      supabase
        .from("anime_lists")
        .select("id, is_public")
        .eq("user_id", profile.id)
        .single(),
    ]);

  // Fetch top 3 shows + count and top 3 movies + count in parallel
  const [
    showTopResult,
    showCountResult,
    movieTopResult,
    movieCountResult,
    animeTopResult,
    animeCountResult,
  ] = await Promise.all([
    list
      ? supabase
          .from("list_items")
          .select("rating, shows(id, title, poster_path)")
          .eq("list_id", list.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .range(0, 9)
      : Promise.resolve({ data: null }),
    list
      ? supabase
          .from("list_items")
          .select("id", { count: "exact", head: true })
          .eq("list_id", list.id)
      : Promise.resolve({ count: 0 }),
    movieList
      ? supabase
          .from("movie_list_items")
          .select("rating, movies(id, title, poster_path)")
          .eq("movie_list_id", movieList.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .range(0, 9)
      : Promise.resolve({ data: null }),
    movieList
      ? supabase
          .from("movie_list_items")
          .select("id", { count: "exact", head: true })
          .eq("movie_list_id", movieList.id)
      : Promise.resolve({ count: 0 }),
    animeList
      ? supabase
          .from("anime_list_items")
          .select("rating, animes(id, title, poster_path)")
          .eq("anime_list_id", animeList.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .range(0, 9)
      : Promise.resolve({ data: null }),
    animeList
      ? supabase
          .from("anime_list_items")
          .select("id", { count: "exact", head: true })
          .eq("anime_list_id", animeList.id)
      : Promise.resolve({ count: 0 }),
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

  // Current user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isOwnProfile = user?.id === profile.id;

  // Compute similarities for logged-in viewers
  let showSimilarityScore: number | null = null;
  let movieSimilarityScore: number | null = null;
  let animeSimilarityScore: number | null = null;

  if (user && !isOwnProfile) {
    const [
      { data: viewerList },
      { data: viewerMovieList },
      { data: viewerAnimeList },
    ] = await Promise.all([
      supabase.from("lists").select("id").eq("user_id", user.id).single(),
      supabase.from("movie_lists").select("id").eq("user_id", user.id).single(),
      supabase.from("anime_lists").select("id").eq("user_id", user.id).single(),
    ]);

    if (viewerList && list) {
      const [viewerItems, profileItems] = await Promise.all([
        supabase
          .from("list_items")
          .select("show_id, rating, position")
          .eq("list_id", viewerList.id)
          .order("position", { ascending: true }),
        supabase
          .from("list_items")
          .select("show_id, rating, position")
          .eq("list_id", list.id)
          .order("position", { ascending: true }),
      ]);
      const listA = (viewerItems.data ?? []).map((i, idx) => ({
        showId: i.show_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const listB = (profileItems.data ?? []).map((i, idx) => ({
        showId: i.show_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      // Only compute similarity if both lists are non-empty (compiled)
      if (listA.length > 0 && listB.length > 0) {
        showSimilarityScore = computeListSimilarity(listA, listB);
      }
    }

    if (viewerMovieList && movieList) {
      const [viewerMovieItems, profileMovieItems] = await Promise.all([
        supabase
          .from("movie_list_items")
          .select("movie_id, rating, position")
          .eq("movie_list_id", viewerMovieList.id)
          .order("position", { ascending: true }),
        supabase
          .from("movie_list_items")
          .select("movie_id, rating, position")
          .eq("movie_list_id", movieList.id)
          .order("position", { ascending: true }),
      ]);
      const movieListA = (viewerMovieItems.data ?? []).map((i, idx) => ({
        movieId: i.movie_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const movieListB = (profileMovieItems.data ?? []).map((i, idx) => ({
        movieId: i.movie_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      // Only compute similarity if both lists are non-empty (compiled)
      if (movieListA.length > 0 && movieListB.length > 0) {
        movieSimilarityScore = computeMovieListSimilarity(
          movieListA,
          movieListB,
        );
      }
    }

    if (viewerAnimeList && animeList) {
      const [viewerAnimeItems, profileAnimeItems] = await Promise.all([
        supabase
          .from("anime_list_items")
          .select("anime_id, rating, position")
          .eq("anime_list_id", viewerAnimeList.id)
          .order("position", { ascending: true }),
        supabase
          .from("anime_list_items")
          .select("anime_id, rating, position")
          .eq("anime_list_id", animeList.id)
          .order("position", { ascending: true }),
      ]);
      const animeListA = (viewerAnimeItems.data ?? []).map((i, idx) => ({
        animeId: i.anime_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const animeListB = (profileAnimeItems.data ?? []).map((i, idx) => ({
        animeId: i.anime_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      if (animeListA.length > 0 && animeListB.length > 0) {
        animeSimilarityScore = computeAnimeListSimilarity(
          animeListA,
          animeListB,
        );
      }
    }
  }

  // Compatibility = average similarity of all lists both profiles have compiled
  let compatibilityScore: number | null = null;
  const scores = [
    showSimilarityScore,
    movieSimilarityScore,
    animeSimilarityScore,
  ].filter((s): s is number => s !== null);
  if (scores.length > 0) {
    compatibilityScore = Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length,
    );
  }

  // Follow status
  let isFollowing = false;
  if (user && !isOwnProfile) {
    const { data: follow } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", user.id)
      .eq("following_id", profile.id)
      .maybeSingle();
    isFollowing = !!follow;
  }

  return (
    <div>
      {/* User header */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <UserAvatar
          url={profile.avatar_url}
          username={profile.username}
          size={56}
        />
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-text-primary">
            @{profile.username}
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {compatibilityScore !== null && (
            <div className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-muted px-3 py-1.5">
              <span className="text-sm font-semibold text-accent">
                {compatibilityScore}%
              </span>
              <span className="text-xs text-text-muted">
                {tUsers("compatible")}
              </span>
            </div>
          )}
          {user && !isOwnProfile && (
            <FollowButton
              profileId={profile.id}
              initialFollowing={isFollowing}
            />
          )}
        </div>
      </div>

      {/* Podium cards — extended top10 with rowSpan=2 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href={`/users/${profile.username}/shows`} className="block h-105">
          <ShowPodiumWidget
            items={showPodiumItems}
            rowSpan={2}
            viewAllHref={`/users/${profile.username}/shows`}
            badge={
              showSimilarityScore !== null ? (
                <span className="text-xs font-semibold text-accent">
                  {showSimilarityScore}%
                </span>
              ) : undefined
            }
          />
        </Link>

        <Link
          href={`/users/${profile.username}/movies`}
          className="block h-105"
        >
          <MoviePodiumWidget
            items={moviePodiumItems}
            rowSpan={2}
            viewAllHref={`/users/${profile.username}/movies`}
            badge={
              movieSimilarityScore !== null ? (
                <span className="text-xs font-semibold text-accent">
                  {movieSimilarityScore}%
                </span>
              ) : undefined
            }
          />
        </Link>

        <Link href={`/users/${profile.username}/anime`} className="block h-105">
          <AnimePodiumWidget
            items={animePodiumItems}
            rowSpan={2}
            viewAllHref={`/users/${profile.username}/anime`}
            badge={
              animeSimilarityScore !== null ? (
                <span className="text-xs font-semibold text-accent">
                  {animeSimilarityScore}%
                </span>
              ) : undefined
            }
          />
        </Link>
      </div>
    </div>
  );
}
