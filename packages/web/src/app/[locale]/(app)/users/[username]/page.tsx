import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UserAvatar } from "@/components/UserAvatar";
import { FollowButton } from "@/components/FollowButton";
import {
  computeListSimilarity,
  computeMovieListSimilarity,
} from "@/lib/similarity";
import { Link } from "@/i18n/navigation";
import { ShowPodiumWidget } from "@/components/widgets/ShowPodiumWidget";
import { MoviePodiumWidget } from "@/components/widgets/MoviePodiumWidget";
import type {
  ShowPodiumItem,
  MoviePodiumItem,
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
  const [{ data: list }, { data: movieList }] = await Promise.all([
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
  ]);

  // Fetch top 3 shows + count and top 3 movies + count in parallel
  const [showTopResult, showCountResult, movieTopResult, movieCountResult] =
    await Promise.all([
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

  // Current user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isOwnProfile = user?.id === profile.id;

  // Compute similarities for logged-in viewers
  let showSimilarityScore: number | null = null;
  let movieSimilarityScore: number | null = null;

  if (user && !isOwnProfile) {
    const [{ data: viewerList }, { data: viewerMovieList }] = await Promise.all(
      [
        supabase.from("lists").select("id").eq("user_id", user.id).single(),
        supabase
          .from("movie_lists")
          .select("id")
          .eq("user_id", user.id)
          .single(),
      ],
    );

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
      showSimilarityScore = computeListSimilarity(listA, listB);
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
      movieSimilarityScore = computeMovieListSimilarity(movieListA, movieListB);
    }
  }

  // Compatibility = average of available similarity scores
  let compatibilityScore: number | null = null;
  if (showSimilarityScore !== null && movieSimilarityScore !== null) {
    compatibilityScore = Math.round(
      (showSimilarityScore + movieSimilarityScore) / 2,
    );
  } else if (showSimilarityScore !== null) {
    compatibilityScore = showSimilarityScore;
  } else if (movieSimilarityScore !== null) {
    compatibilityScore = movieSimilarityScore;
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

        <Link href={`/users/${profile.username}/movies`} className="block h-105">
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
      </div>
    </div>
  );
}
