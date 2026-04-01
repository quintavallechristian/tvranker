"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { SearchInput } from "@/components/SearchInput";
import { UserAvatar } from "@/components/UserAvatar";
import { EmptyState } from "@/components/EmptyState";
import { FollowButton } from "@/components/FollowButton";
import { createClient } from "@/lib/supabase/client";
import { computeListSimilarity } from "@/lib/similarity";
import { getPosterUrl } from "@/lib/tmdb/client";
import {
  Television,
  FilmSlate,
  GameController,
  SpinnerGap,
  ArrowRight,
} from "@phosphor-icons/react";
import {
  getSimilarUsers,
  getRecommendations,
  getPopularShows,
  getPopularMovies,
  getPopularAnime,
  type RecommendedShow,
  type SimilarUser,
  type PopularShow,
  type PopularMovie,
  type PopularAnime,
} from "./actions";
import {
  getPopularGames,
  type PopularGame,
} from "@/app/[locale]/(app)/games/actions";

type UserResult = {
  id: string;
  username: string;
  avatar_url: string | null;
  lists_compiled: number;
  similarity: number | null;
  is_following: boolean;
};

export default function ExplorePage() {
  const t = useTranslations("explore");
  const [userResults, setUserResults] = useState<UserResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [suggestedShows, setSuggestedShows] = useState<
    (RecommendedShow | PopularShow)[]
  >([]);
  const [suggestedMovies, setSuggestedMovies] = useState<PopularMovie[]>([]);
  const [suggestedAnime, setSuggestedAnime] = useState<PopularAnime[]>([]);
  const [suggestedGames, setSuggestedGames] = useState<PopularGame[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(true);
  const [similarUsers, setSimilarUsers] = useState<SimilarUser[]>([]);
  const [similarUsersLoading, setSimilarUsersLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Load similar users
    getSimilarUsers()
      .then((users) => {
        if (!cancelled) setSimilarUsers(users);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setSimilarUsersLoading(false);
      });

    // Load suggestions: top 3 shows (recs or popular) + top 3 movies + top 3 anime + top 3 games
    Promise.all([
      getRecommendations().then((recs) =>
        recs.length > 0
          ? (recs.slice(0, 3) as (RecommendedShow | PopularShow)[])
          : getPopularShows().then((p) => p.slice(0, 3)),
      ),
      getPopularMovies().then((m) => m.slice(0, 3)),
      getPopularAnime().then((a) => a.slice(0, 3)),
      getPopularGames().then((g) => g.slice(0, 3)),
    ])
      .then(([shows, movies, anime, games]) => {
        if (!cancelled) {
          setSuggestedShows(shows);
          setSuggestedMovies(movies);
          setSuggestedAnime(anime);
          setSuggestedGames(games);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setSuggestionsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setUserResults([]);
      setSearched(false);
      return;
    }

    setSearched(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: rawProfiles } = await supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .ilike("username", `%${query}%`)
      .limit(10);

    const profiles = (rawProfiles ?? []).filter(
      (p) => !user || p.id !== user.id,
    );
    if (!profiles.length) {
      setUserResults([]);
      return;
    }

    // Get viewer's show items for similarity computation
    let viewerListData: {
      showId: string;
      rating: number | null;
      position: number;
    }[] = [];
    if (user) {
      const { data: viewerList } = await supabase
        .from("lists")
        .select("id")
        .eq("user_id", user.id)
        .single();
      if (viewerList) {
        const { data } = await supabase
          .from("list_items")
          .select("show_id, rating, position")
          .eq("list_id", viewerList.id)
          .order("position", { ascending: true });
        viewerListData = (data ?? []).map((i, idx) => ({
          showId: i.show_id,
          rating: i.rating,
          position: i.position ?? idx,
        }));
      }
    }

    const profileIds = profiles.map((p) => p.id);

    // Batch fetch all list types + follow relationships in parallel
    const [
      showListsResult,
      movieListsResult,
      animeListsResult,
      gameListsResult,
      followsResult,
    ] = await Promise.all([
      supabase
        .from("lists")
        .select("id, user_id, is_public")
        .in("user_id", profileIds),
      supabase
        .from("movie_lists")
        .select("id, user_id")
        .in("user_id", profileIds),
      supabase
        .from("anime_lists")
        .select("id, user_id")
        .in("user_id", profileIds),
      supabase
        .from("game_lists")
        .select("id, user_id")
        .in("user_id", profileIds),
      user
        ? supabase
            .from("follows")
            .select("following_id")
            .eq("follower_id", user.id)
            .in("following_id", profileIds)
        : Promise.resolve({
            data: [] as Array<{ following_id: string }>,
          }),
    ]);

    const showListByUser = new Map(
      (showListsResult.data ?? []).map((l) => [l.user_id, l]),
    );
    const movieListIdByUser = new Map(
      (movieListsResult.data ?? []).map((l) => [l.user_id, l.id]),
    );
    const animeListIdByUser = new Map(
      (animeListsResult.data ?? []).map((l) => [l.user_id, l.id]),
    );
    const gameListIdByUser = new Map(
      (gameListsResult.data ?? []).map((l) => [l.user_id, l.id]),
    );
    const followingSet = new Set(
      (followsResult.data ?? []).map((f) => f.following_id),
    );

    const publicShowListIds = (showListsResult.data ?? [])
      .filter((l) => l.is_public)
      .map((l) => l.id);
    const movieListIds = (movieListsResult.data ?? []).map((l) => l.id);
    const animeListIds = (animeListsResult.data ?? []).map((l) => l.id);
    const gameListIds = (gameListsResult.data ?? []).map((l) => l.id);

    // Batch fetch items for public show lists + existence check for movie/anime/games
    const [showItemsResult, movieItemsResult, animeItemsResult, gameItemsResult] =
      await Promise.all([
        publicShowListIds.length > 0
          ? supabase
              .from("list_items")
              .select("list_id, show_id, rating, position")
              .in("list_id", publicShowListIds)
          : Promise.resolve({
              data: [] as Array<{
                list_id: string;
                show_id: string;
                rating: number | null;
                position: number;
              }>,
            }),
        movieListIds.length > 0
          ? supabase
              .from("movie_list_items")
              .select("movie_list_id")
              .in("movie_list_id", movieListIds)
          : Promise.resolve({
              data: [] as Array<{ movie_list_id: string }>,
            }),
        animeListIds.length > 0
          ? supabase
              .from("anime_list_items")
              .select("anime_list_id")
              .in("anime_list_id", animeListIds)
          : Promise.resolve({
              data: [] as Array<{ anime_list_id: string }>,
            }),
        gameListIds.length > 0
          ? supabase
              .from("game_list_items")
              .select("game_list_id")
              .in("game_list_id", gameListIds)
          : Promise.resolve({
              data: [] as Array<{ game_list_id: string }>,
            }),
      ]);

    // Group show items by list_id
    const showItemsByList = new Map<
      string,
      { showId: string; rating: number | null; position: number }[]
    >();
    for (const item of showItemsResult.data ?? []) {
      if (!showItemsByList.has(item.list_id))
        showItemsByList.set(item.list_id, []);
      showItemsByList.get(item.list_id)!.push({
        showId: item.show_id,
        rating: item.rating,
        position: item.position ?? 0,
      });
    }

    const movieListsWithItems = new Set(
      (movieItemsResult.data ?? []).map((i) => i.movie_list_id),
    );
    const animeListsWithItems = new Set(
      (animeItemsResult.data ?? []).map((i) => i.anime_list_id),
    );
    const gameListsWithItems = new Set(
      (gameItemsResult.data ?? []).map((i) => i.game_list_id),
    );

    const userResultsList: UserResult[] = [];
    for (const p of profiles) {
      const showList = showListByUser.get(p.id);
      if (!showList?.is_public) {
        userResultsList.push({
          ...p,
          lists_compiled: 0,
          similarity: null,
          is_following: followingSet.has(p.id),
        });
        continue;
      }

      const showItems = showItemsByList.get(showList.id) ?? [];
      let similarity: number | null = null;
      if (user && viewerListData.length > 0 && showItems.length > 0) {
        similarity = computeListSimilarity(viewerListData, showItems);
      }

      const showsCompiled = showItems.length > 0 ? 1 : 0;
      const movieListId = movieListIdByUser.get(p.id);
      const moviesCompiled =
        movieListId && movieListsWithItems.has(movieListId) ? 1 : 0;
      const animeListId = animeListIdByUser.get(p.id);
      const animeCompiled =
        animeListId && animeListsWithItems.has(animeListId) ? 1 : 0;
      const gameListId = gameListIdByUser.get(p.id);
      const gamesCompiled =
        gameListId && gameListsWithItems.has(gameListId) ? 1 : 0;

      userResultsList.push({
        ...p,
        lists_compiled:
          showsCompiled + moviesCompiled + animeCompiled + gamesCompiled,
        similarity,
        is_following: followingSet.has(p.id),
      });
    }
    setUserResults(userResultsList);
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold tracking-tight text-text-primary">
        {t("title")}
      </h1>

      <SearchInput
        placeholder={t("searchUsersPlaceholder")}
        onSearch={handleSearch}
      />

      {/* ── Search results ── */}
      {searched && userResults.length === 0 && (
        <EmptyState title={t("noResults")} />
      )}

      {searched && userResults.length > 0 && (
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
            {t("usersSection")}
          </h2>
          <div className="grid gap-2">
            {userResults.map((u) => (
              <div
                key={u.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
              >
                <Link
                  href={`/users/${u.username}`}
                  className="flex min-w-0 flex-1 items-center gap-3"
                >
                  <UserAvatar
                    url={u.avatar_url}
                    username={u.username}
                    size={40}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-text-primary">
                      @{u.username}
                    </p>
                    <p className="text-xs text-text-muted">
                      {t("listsCompiled", { count: u.lists_compiled })}
                    </p>
                  </div>
                </Link>
                <div className="flex shrink-0 items-center gap-2">
                  {u.similarity !== null && u.similarity > 0 && (
                    <span className="rounded-full border border-accent/30 bg-accent-muted px-2.5 py-1 text-xs font-semibold text-accent">
                      {u.similarity}%
                    </span>
                  )}
                  <FollowButton
                    profileId={u.id}
                    initialFollowing={u.is_following}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Non-search view ── */}
      {!searched && (
        <>
          {/* Similar users */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-text-secondary">
              {t("similarUsersTitle")}
            </h2>

            {similarUsersLoading && (
              <div className="flex items-center justify-center gap-2 py-4">
                <SpinnerGap
                  size={16}
                  className="animate-spin text-text-muted"
                />
                <p className="text-xs text-text-muted">
                  {t("similarUsersLoading")}
                </p>
              </div>
            )}

            {!similarUsersLoading && similarUsers.length === 0 && (
              <EmptyState title={t("similarUsersEmpty")} />
            )}

            {!similarUsersLoading && similarUsers.length > 0 && (
              <div className="grid gap-2">
                {similarUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center gap-3 rounded-lg border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
                  >
                    <Link
                      href={`/users/${u.username}`}
                      className="flex min-w-0 flex-1 items-center gap-3"
                    >
                      <UserAvatar
                        url={u.avatar_url}
                        username={u.username}
                        size={40}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-text-primary">
                          @{u.username}
                        </p>
                        <p className="text-xs text-text-muted">
                          {t("listsCompiled", { count: u.lists_compiled })}
                        </p>
                      </div>
                    </Link>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="rounded-full border border-accent/30 bg-accent-muted px-2.5 py-1 text-xs font-semibold text-accent">
                        {u.similarity}%
                      </span>
                      <FollowButton
                        profileId={u.id}
                        initialFollowing={u.is_following}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-text-secondary">
              {t("suggestedTitle")}
            </h2>

            {suggestionsLoading && (
              <div className="flex items-center justify-center gap-2 py-4">
                <SpinnerGap
                  size={16}
                  className="animate-spin text-text-muted"
                />
                <p className="text-xs text-text-muted">
                  {t("suggestedLoading")}
                </p>
              </div>
            )}

            {!suggestionsLoading && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
                {/* Shows widget */}
                <SuggestionCard
                  title={t("showsTitle")}
                  href="/explore/shows"
                  viewAllLabel={t("exploreAll")}
                  emptyLabel={t("suggestedEmpty")}
                  items={suggestedShows.map((s) => ({
                    id: s.id,
                    title: s.title,
                    poster_path: s.poster_path,
                  }))}
                  icon="tv"
                />
                {/* Movies widget */}
                <SuggestionCard
                  title={t("moviesTitle")}
                  href="/explore/movies"
                  viewAllLabel={t("exploreAll")}
                  emptyLabel={t("popularMoviesEmpty")}
                  items={suggestedMovies.map((m) => ({
                    id: m.id,
                    title: m.title,
                    poster_path: m.poster_path,
                  }))}
                  icon="film"
                />
                {/* Anime widget */}
                <SuggestionCard
                  title={t("animeTitle")}
                  href="/explore/anime"
                  viewAllLabel={t("exploreAll")}
                  emptyLabel={t("popularAnimeEmpty")}
                  items={suggestedAnime.map((a) => ({
                    id: a.id,
                    title: a.title,
                    poster_path: a.poster_path,
                  }))}
                  icon="film"
                />
                {/* Games widget */}
                <SuggestionCard
                  title={t("gamesTitle")}
                  href="/explore/games"
                  viewAllLabel={t("exploreAll")}
                  emptyLabel={t("popularGamesEmpty")}
                  items={suggestedGames.map((g) => ({
                    id: g.id,
                    title: g.title,
                    poster_path: null,
                    imageUrl: g.cover_url,
                  }))}
                  icon="game"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function SuggestionCard({
  title,
  href,
  viewAllLabel,
  emptyLabel,
  items,
  icon,
}: {
  title: string;
  href: string;
  viewAllLabel: string;
  emptyLabel: string;
  items: {
    id: string;
    title: string;
    poster_path: string | null;
    imageUrl?: string | null;
  }[];
  icon: "tv" | "film" | "game";
}) {
  const Icon =
    icon === "tv" ? Television : icon === "game" ? GameController : FilmSlate;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          {title}
        </p>
        <span className="flex items-center gap-1 text-xs text-text-muted transition-colors group-hover:text-accent">
          {viewAllLabel}
          <ArrowRight
            size={12}
            weight="bold"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>

      {items.length > 0 ? (
        <div className="flex gap-2">
          {items.slice(0, 3).map((item) => {
            const posterUrl =
              item.imageUrl ?? getPosterUrl(item.poster_path, "w185");
            return (
              <div
                key={item.id}
                className="flex-1 overflow-hidden rounded-md border border-border bg-bg-elevated"
              >
                <div className="relative aspect-2/3 w-full">
                  {posterUrl ? (
                    <Image
                      src={posterUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Icon size={18} className="text-text-faint" />
                    </div>
                  )}
                </div>
                <p className="truncate px-1.5 py-1 text-[9px] leading-tight text-text-secondary">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-6">
          <Icon size={22} className="text-text-faint" />
          <p className="text-xs text-text-muted">{emptyLabel}</p>
        </div>
      )}
    </Link>
  );
}
