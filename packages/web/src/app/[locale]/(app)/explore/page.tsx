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

type UserResult = {
  id: string;
  username: string;
  avatar_url: string | null;
  show_count: number;
  similarity: number | null;
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

    // Load suggestions: top 3 shows (recs or popular) + top 3 movies + top 3 anime
    Promise.all([
      getRecommendations().then((recs) =>
        recs.length > 0
          ? (recs.slice(0, 3) as (RecommendedShow | PopularShow)[])
          : getPopularShows().then((p) => p.slice(0, 3)),
      ),
      getPopularMovies().then((m) => m.slice(0, 3)),
      getPopularAnime().then((a) => a.slice(0, 3)),
    ])
      .then(([shows, movies, anime]) => {
        if (!cancelled) {
          setSuggestedShows(shows);
          setSuggestedMovies(movies);
          setSuggestedAnime(anime);
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

    const profilesResult = await supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .ilike("username", `%${query}%`)
      .limit(10);

    const profiles = profilesResult.data ?? [];
    if (!profiles.length) {
      setUserResults([]);
      return;
    }

    let viewerItems: {
      show_id: string;
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
        viewerItems = data ?? [];
      }
    }

    const viewerListData = viewerItems.map((i, idx) => ({
      showId: i.show_id,
      rating: i.rating,
      position: i.position ?? idx,
    }));

    const userResultsList: UserResult[] = [];
    for (const p of profiles) {
      if (user && p.id === user.id) continue;
      const { data: userList } = await supabase
        .from("lists")
        .select("id, is_public")
        .eq("user_id", p.id)
        .single();
      if (!userList?.is_public) {
        userResultsList.push({ ...p, show_count: 0, similarity: null });
        continue;
      }
      const { data: listItems, count } = await supabase
        .from("list_items")
        .select("show_id, rating, position", { count: "exact" })
        .eq("list_id", userList.id)
        .order("position", { ascending: true });
      let similarity: number | null = null;
      if (
        user &&
        viewerListData.length > 0 &&
        listItems &&
        listItems.length > 0
      ) {
        const otherListData = listItems.map((i, idx) => ({
          showId: i.show_id,
          rating: i.rating,
          position: i.position ?? idx,
        }));
        similarity = computeListSimilarity(viewerListData, otherListData);
      }
      userResultsList.push({ ...p, show_count: count ?? 0, similarity });
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
            {userResults.map((user) => (
              <Link
                key={user.id}
                href={`/users/${user.username}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
              >
                <UserAvatar
                  url={user.avatar_url}
                  username={user.username}
                  size={40}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary">
                    @{user.username}
                  </p>
                  <p className="text-xs text-text-muted">
                    {t("showsInList", { count: user.show_count })}
                  </p>
                </div>
                {user.similarity !== null && user.similarity > 0 && (
                  <span className="rounded-full border border-accent/30 bg-accent-muted px-2.5 py-1 text-xs font-semibold text-accent">
                    {user.similarity}%
                  </span>
                )}
              </Link>
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
                          {t("showsInList", { count: u.show_count })}
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
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
  items: { id: string; title: string; poster_path: string | null }[];
  icon: "tv" | "film";
}) {
  const Icon = icon === "tv" ? Television : FilmSlate;

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
            const posterUrl = getPosterUrl(item.poster_path, "w185");
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
