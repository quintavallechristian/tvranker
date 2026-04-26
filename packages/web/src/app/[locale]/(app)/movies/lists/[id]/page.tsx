import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, FilmSlate } from "@phosphor-icons/react/dist/ssr";
import { UserAvatar } from "@/components/UserAvatar";
import { UserMovieListClient } from "@/app/[locale]/(app)/users/[username]/user-movie-list-client";
import type { MovieItem } from "../../actions";

const PAGE_SIZE = 50;

export default async function PublicMovieListPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const tUsers = await getTranslations("users");
  const tCommon = await getTranslations("common");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: movieList } = await supabase
    .from("movie_lists")
    .select("id, user_id, name, is_public, rating_labels")
    .eq("id", id)
    .single();

  if (!movieList) notFound();
  if (!movieList.is_public && user?.id !== movieList.user_id) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, avatar_url, rating_labels")
    .eq("id", movieList.user_id)
    .single();

  if (!profile) notFound();

  const { data: itemsData, count } = await supabase
    .from("movie_list_items")
    .select("*, movies(*)", { count: "exact" })
    .eq("movie_list_id", movieList.id)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(0, PAGE_SIZE - 1);

  const movieItems = (itemsData ?? []) as unknown as MovieItem[];
  const itemCount = count ?? movieItems.length;
  const hasMore = movieItems.length === PAGE_SIZE && itemCount > PAGE_SIZE;
  const isOwnList = user?.id === movieList.user_id;

  let viewerMovieIds = new Set<string>();
  if (user && !isOwnList) {
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

  const ratingLabels = (movieList.rating_labels ?? profile.rating_labels) as
    | string[]
    | null;

  return (
    <div>
      <Link
        href={`/users/${profile.username}/movies`}
        className="mb-6 inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-secondary"
      >
        <ArrowLeft size={13} />
        {tCommon("back")}
      </Link>

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
      </div>

      <div className="mb-4 flex items-center gap-2">
        <FilmSlate size={16} className="text-text-muted" />
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          {tUsers("movieCount", { count: itemCount })}
        </p>
      </div>

      {movieItems.length === 0 ? (
        <p className="text-sm text-text-muted">{tUsers("noMovies")}</p>
      ) : (
        <UserMovieListClient
          movieListId={movieList.id}
          initialItems={movieItems}
          initialHasMore={hasMore}
          isLoggedIn={!!user && !isOwnList}
          viewerMovieIds={viewerMovieIds}
          ratingLabels={ratingLabels}
        />
      )}
    </div>
  );
}
