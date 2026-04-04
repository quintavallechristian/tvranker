import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UserAvatar } from "@/components/UserAvatar";
import { computeMovieListSimilarity } from "@/lib/similarity";
import { fetchAllRows } from "@/lib/supabase/fetchAll";
import { UserMovieListClient } from "../user-movie-list-client";
import { type MovieItem } from "../../../movies/actions";
import { Link } from "@/i18n/navigation";
import { FilmSlate } from "@phosphor-icons/react/dist/ssr";

const PAGE_SIZE = 50;

export default async function UserMoviesPage({
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

  const { data: movieList } = await supabase
    .from("movie_lists")
    .select("id, is_public, rating_labels")
    .eq("user_id", profile.id)
    .single();

  // Fetch movie items (first page)
  let movieItems: MovieItem[] = [];
  let itemCount = 0;
  let hasMore = false;
  if (movieList) {
    const { data: itemsData, count } = await supabase
      .from("movie_list_items")
      .select("*, movies(*)", { count: "exact" })
      .eq("movie_list_id", movieList.id)
      .order("rating", { ascending: false, nullsFirst: false })
      .order("position", { ascending: true })
      .range(0, PAGE_SIZE - 1);
    movieItems = (itemsData ?? []) as unknown as MovieItem[];
    itemCount = count ?? movieItems.length;
    hasMore = movieItems.length === PAGE_SIZE && itemCount > PAGE_SIZE;
  }

  // Current user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isOwnProfile = user?.id === profile.id;

  // Compute movie similarity
  let movieSimilarityScore: number | null = null;
  if (user && !isOwnProfile && movieList) {
    const { data: viewerMovieList } = await supabase
      .from("movie_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (viewerMovieList) {
      const [viewerMovieItemsData, profileMovieItemsData] = await Promise.all([
        fetchAllRows((from, to) =>
          supabase
            .from("movie_list_items")
            .select("movie_id, rating, position")
            .eq("movie_list_id", viewerMovieList.id)
            .order("position", { ascending: true })
            .range(from, to),
        ),
        fetchAllRows((from, to) =>
          supabase
            .from("movie_list_items")
            .select("movie_id, rating, position")
            .eq("movie_list_id", movieList.id)
            .order("position", { ascending: true })
            .range(from, to),
        ),
      ]);
      const movieListA = viewerMovieItemsData.map((i, idx) => ({
        movieId: i.movie_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const movieListB = profileMovieItemsData.map((i, idx) => ({
        movieId: i.movie_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      movieSimilarityScore = computeMovieListSimilarity(movieListA, movieListB);
    }
  }

  // Fetch viewer's movie IDs for "already in my list" markers
  let viewerMovieIds = new Set<string>();
  if (user && !isOwnProfile && movieList) {
    const { data: viewerMovieList } = await supabase
      .from("movie_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (viewerMovieList) {
      const { data: viewerItems } = await supabase
        .from("movie_list_items")
        .select("movie_id")
        .eq("movie_list_id", viewerMovieList.id);
      viewerMovieIds = new Set((viewerItems ?? []).map((i) => i.movie_id));
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Link
          href={`/users/${profile.username}`}
          className="flex items-center gap-3"
        >
          <UserAvatar
            url={profile.avatar_url}
            username={profile.username}
            size={40}
          />
          <span className="text-base font-semibold tracking-tight text-text-primary">
            @{profile.username}
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-3">
          {movieSimilarityScore !== null && (
            <div className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-muted px-3 py-1.5">
              <span className="text-sm font-semibold text-accent">
                {movieSimilarityScore}%
              </span>
              <span className="text-xs text-text-muted">
                {tUsers("compatible")}
              </span>
            </div>
          )}
          <Link
            href={`/users/${profile.username}/movies/analytics`}
            className="rounded-md border border-border px-2.5 py-1 text-xs text-text-muted transition-colors hover:border-border-hover hover:text-text-secondary"
          >
            {tUsers("analytics")}
          </Link>
        </div>
      </div>
      {/* Movie count */}
      {movieList && (
        <div className="mb-4 flex items-center gap-2">
          <FilmSlate size={16} className="text-text-muted" />
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
            {tUsers("movieCount", { count: itemCount })}
          </p>
        </div>
      )}
      {/* List */}
      {movieList ? (
        movieItems.length === 0 ? (
          <p className="text-sm text-text-muted">{tUsers("noMovies")}</p>
        ) : (
          <UserMovieListClient
            movieListId={movieList.id}
            initialItems={movieItems}
            initialHasMore={hasMore}
            isLoggedIn={!!user && !isOwnProfile}
            viewerMovieIds={viewerMovieIds}
            ratingLabels={(movieList.rating_labels ?? profile.rating_labels) as string[] | null}
          />
        )
      ) : (
        <p className="text-sm text-text-muted">{tUsers("privateMovieList")}</p>
      )}
    </div>
  );
}
