"use client";

import { useState, useCallback, useEffect, useTransition } from "react";
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
  Plus,
  Check,
  SpinnerGap,
  ArrowRight,
} from "@phosphor-icons/react";
import {
  getRecommendations,
  getSimilarUsers,
  getPopularShows,
  getOrCreateShowByTmdbId,
  type RecommendedShow,
  type SimilarUser,
  type PopularShow,
} from "./actions";
import { addShowToMyList, addTmdbShowToMyList } from "../lists/actions";
import { useRouter } from "next/navigation";

type UserResult = {
  id: string;
  username: string;
  avatar_url: string | null;
  show_count: number;
  similarity: number | null;
};

type ShowResult = {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
};

export default function ExplorePage() {
  const t = useTranslations("explore");
  const router = useRouter();
  const [userResults, setUserResults] = useState<UserResult[]>([]);
  const [showResults, setShowResults] = useState<ShowResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedShow[]>([]);
  const [recsLoading, setRecsLoading] = useState(true);
  const [popularShows, setPopularShows] = useState<PopularShow[]>([]);
  const [popularLoading, setPopularLoading] = useState(false);
  const [similarUsers, setSimilarUsers] = useState<SimilarUser[]>([]);
  const [similarUsersLoading, setSimilarUsersLoading] = useState(true);
  const [addedShowIds, setAddedShowIds] = useState<Set<string>>(new Set());
  const [addingShowId, setAddingShowId] = useState<string | null>(null);
  const [addedTmdbIds, setAddedTmdbIds] = useState<Set<number>>(new Set());
  const [addingTmdbId, setAddingTmdbId] = useState<number | null>(null);
  const [navigatingTmdbId, setNavigatingTmdbId] = useState<number | null>(null);
  const [activeShowId, setActiveShowId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Dismiss tapped card overlay when clicking outside
  useEffect(() => {
    if (!activeShowId) return;
    const dismiss = () => setActiveShowId(null);
    document.addEventListener("click", dismiss);
    return () => document.removeEventListener("click", dismiss);
  }, [activeShowId]);

  // Load recommendations and similar users on mount
  useEffect(() => {
    let cancelled = false;
    getRecommendations()
      .then((recs) => {
        if (!cancelled) {
          setRecommendations(recs);
          if (recs.length === 0) {
            setPopularLoading(true);
            getPopularShows()
              .then((shows) => {
                if (!cancelled) setPopularShows(shows);
              })
              .catch(() => {})
              .finally(() => {
                if (!cancelled) setPopularLoading(false);
              });
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setRecsLoading(false);
      });
    getSimilarUsers()
      .then((users) => {
        if (!cancelled) setSimilarUsers(users);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setSimilarUsersLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAddToList = useCallback((show: RecommendedShow | PopularShow) => {
    setAddingShowId(show.id);
    startTransition(async () => {
      try {
        const result = await addShowToMyList({
          id: show.id,
          tmdb_id: show.tmdb_id,
          imdb_id: null,
          title: show.title,
          poster_path: show.poster_path,
          first_air_date: show.first_air_date,
          overview: show.overview,
        });
        if (!result.alreadyExists) {
          setAddedShowIds((prev) => new Set(prev).add(show.id));
        }
      } catch {
        // silently fail
      } finally {
        setAddingShowId(null);
      }
    });
  }, []);

  const handleAddSearchShow = useCallback((show: ShowResult) => {
    setAddingTmdbId(show.tmdb_id);
    startTransition(async () => {
      try {
        await addTmdbShowToMyList({
          tmdb_id: show.tmdb_id,
          title: show.title,
          poster_path: show.poster_path,
          first_air_date: show.first_air_date,
          overview: show.overview,
        });
        setAddedTmdbIds((prev) => new Set(prev).add(show.tmdb_id));
      } catch {
        // silently fail
      } finally {
        setAddingTmdbId(null);
      }
    });
  }, []);

  const handleShowClick = useCallback(
    async (show: ShowResult) => {
      setNavigatingTmdbId(show.tmdb_id);
      try {
        const id = await getOrCreateShowByTmdbId({
          tmdb_id: show.tmdb_id,
          title: show.title,
          poster_path: show.poster_path,
          first_air_date: show.first_air_date,
          overview: show.overview,
        });
        router.push(`/shows/${id}`);
      } catch {
        setNavigatingTmdbId(null);
      }
    },
    [router],
  );

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setUserResults([]);
      setShowResults([]);
      setSearched(false);
      return;
    }

    setSearched(true);
    const supabase = createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Search users and shows in parallel
    const profilesPromise = supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .ilike("username", `%${query}%`)
      .limit(10);

    const showsPromise = fetch(
      `/api/tmdb/search?q=${encodeURIComponent(query)}`,
    ).then((res) => res.json());

    const [profilesResult, showsData] = await Promise.all([
      profilesPromise,
      showsPromise,
    ]);

    const profiles = profilesResult.data ?? [];

    // Show results from TMDB
    setShowResults(
      (showsData.results ?? []).slice(0, 6).map((s: ShowResult) => ({
        tmdb_id: s.tmdb_id,
        title: s.title,
        poster_path: s.poster_path,
        first_air_date: s.first_air_date,
        overview: s.overview,
      })),
    );

    if (!profiles.length) {
      setUserResults([]);
      return;
    }

    // Get viewer's list items for similarity computation
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

    // Get each user's list info + similarity
    const userResultsList: UserResult[] = [];
    for (const p of profiles) {
      if (user && p.id === user.id) continue;

      const { data: userList } = await supabase
        .from("lists")
        .select("id, is_public")
        .eq("user_id", p.id)
        .single();

      if (!userList?.is_public) {
        userResultsList.push({
          ...p,
          show_count: 0,
          similarity: null,
        });
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

      userResultsList.push({
        ...p,
        show_count: count ?? 0,
        similarity,
      });
    }

    setUserResults(userResultsList);
  }, []);

  const hasSearchResults = userResults.length > 0 || showResults.length > 0;

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold tracking-tight text-text-primary">
        {t("title")}
      </h1>

      <SearchInput
        placeholder={t("searchPlaceholder")}
        onSearch={handleSearch}
        className="mb-6"
      />

      {/* Search results */}
      {searched && !hasSearchResults && <EmptyState title={t("noResults")} />}

      {searched && hasSearchResults && (
        <div className="mb-8 space-y-6">
          {/* User results */}
          {userResults.length > 0 && (
            <div>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t("usersSection")}
              </h2>
              <div className="grid gap-2">
                {userResults.map((user) => (
                  <Link
                    key={user.id}
                    href={`/users/${user.username}`}
                    className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
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

          {/* Show results from TMDB */}
          {showResults.length > 0 && (
            <div>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t("showsSection")}
              </h2>
              <div className="grid gap-2">
                {showResults.map((show) => (
                  <div
                    key={show.tmdb_id}
                    className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-bg-surface p-3 transition-colors hover:border-border-hover"
                  >
                    <button
                      onClick={() => handleShowClick(show)}
                      disabled={navigatingTmdbId === show.tmdb_id}
                      className="flex items-center gap-3 min-w-0 flex-1 text-left"
                    >
                      <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                        {show.poster_path ? (
                          <Image
                            src={getPosterUrl(show.poster_path, "w92")!}
                            alt={show.title}
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Television size={14} className="text-text-faint" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-sm font-medium transition-colors ${navigatingTmdbId === show.tmdb_id ? "text-text-muted" : "text-text-primary"}`}
                        >
                          {show.title}
                        </p>
                        {show.first_air_date && (
                          <p className="text-xs text-text-muted">
                            {show.first_air_date.slice(0, 4)}
                          </p>
                        )}
                      </div>
                      {navigatingTmdbId === show.tmdb_id && (
                        <SpinnerGap
                          size={14}
                          className="animate-spin text-text-muted shrink-0"
                        />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        !addedTmdbIds.has(show.tmdb_id) &&
                        handleAddSearchShow(show)
                      }
                      disabled={
                        addingTmdbId === show.tmdb_id ||
                        addedTmdbIds.has(show.tmdb_id)
                      }
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        addedTmdbIds.has(show.tmdb_id)
                          ? "border-accent/50 bg-accent/20 text-accent"
                          : "border-border text-text-muted hover:border-border-hover hover:text-text-primary"
                      }`}
                    >
                      {addingTmdbId === show.tmdb_id ? (
                        <SpinnerGap size={14} className="animate-spin" />
                      ) : addedTmdbIds.has(show.tmdb_id) ? (
                        <Check size={14} weight="bold" />
                      ) : (
                        <Plus size={14} weight="bold" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Similar users section — visible when not searching */}
      {!searched && (
        <div className="mb-8">
          <h2 className="mb-4 text-sm font-semibold text-text-secondary">
            {t("similarUsersTitle")}
          </h2>

          {similarUsersLoading && (
            <div className="flex items-center gap-2 py-4 justify-center">
              <SpinnerGap size={16} className="animate-spin text-text-muted" />
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
                  className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
                >
                  <Link
                    href={`/users/${u.username}`}
                    className="flex items-center gap-3 min-w-0 flex-1"
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
                  <div className="flex items-center gap-2 shrink-0">
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
      )}

      {/* Recommendations section — visible when not searching */}
      {!searched && (
        <div>
          <h2 className="mb-4 text-sm font-semibold text-text-secondary">
            {t("suggestedTitle")}
          </h2>

          {!recsLoading &&
            recommendations.length === 0 &&
            popularShows.length === 0 &&
            !popularLoading && <EmptyState title={t("suggestedEmpty")} />}

          {(recsLoading || popularLoading) && recommendations.length === 0 && (
            <div className="flex items-center gap-2 py-8 justify-center">
              <SpinnerGap size={16} className="animate-spin text-text-muted" />
              <p className="text-xs text-text-muted">{t("suggestedLoading")}</p>
            </div>
          )}

          {!recsLoading && recommendations.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {recommendations.map((show) => {
                const posterUrl = getPosterUrl(show.poster_path, "w342");
                const isAdded = addedShowIds.has(show.id);
                const isAdding = addingShowId === show.id;

                return (
                  <div
                    key={show.id}
                    className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg-surface transition-colors hover:border-border-hover"
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setActiveShowId(show.id);
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === "mouse") setActiveShowId(null);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveShowId(show.id);
                    }}
                  >
                    {/* Score badge */}
                    <div className="absolute top-2 right-2 z-10 flex items-center justify-center rounded-sm bg-bg-primary/80 px-1.5 py-0.5 text-xs font-mono font-bold text-accent tabular-nums backdrop-blur-sm">
                      {show.score}%
                    </div>

                    {/* Poster */}
                    <div className="relative aspect-[2/3] w-full bg-bg-elevated">
                      {posterUrl ? (
                        <Image
                          src={posterUrl}
                          alt={show.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Television size={32} className="text-text-faint" />
                        </div>
                      )}

                      {/* Add to list overlay */}
                      <div
                        className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${
                          activeShowId === show.id || isAdded
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveShowId(null);
                        }}
                      >
                        {isAdded ? (
                          <Check
                            size={24}
                            weight="bold"
                            className="text-accent"
                          />
                        ) : (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToList(show);
                              }}
                              disabled={isAdding}
                              className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25 transition-colors disabled:opacity-50"
                            >
                              {isAdding ? (
                                <SpinnerGap
                                  size={13}
                                  className="animate-spin"
                                />
                              ) : (
                                <Plus size={13} weight="bold" />
                              )}
                              {t("addToList")}
                            </button>
                            <Link
                              href={`/shows/${show.id}`}
                              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-black/60 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ArrowRight size={13} weight="bold" />
                              {t("details")}
                            </Link>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <Link
                        href={`/shows/${show.id}`}
                        className="block truncate text-sm font-medium text-text-primary hover:text-accent transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {show.title}
                      </Link>
                      <p className="mt-0.5 text-xs text-text-muted">
                        {t("recommendedBy", { count: show.recommendedBy })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* Popular shows fallback when no recs */}
          {!recsLoading &&
            !popularLoading &&
            recommendations.length === 0 &&
            popularShows.length > 0 && (
              <>
                <p className="mb-3 text-xs text-text-muted">
                  {t("popularFallback")}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {popularShows.map((show) => {
                    const posterUrl = getPosterUrl(show.poster_path, "w185");
                    const isAdded = addedShowIds.has(show.id);
                    const isAdding = addingShowId === show.id;

                    return (
                      <div
                        key={show.id}
                        className="group relative overflow-hidden rounded-lg border border-border bg-bg-surface transition-colors hover:border-border-hover"
                        onPointerEnter={(e) => {
                          if (e.pointerType === "mouse")
                            setActiveShowId(show.id);
                        }}
                        onPointerLeave={(e) => {
                          if (e.pointerType === "mouse") setActiveShowId(null);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveShowId(show.id);
                        }}
                      >
                        <div className="relative aspect-2/3 w-full bg-bg-elevated">
                          {posterUrl ? (
                            <Image
                              src={posterUrl}
                              alt={show.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 17vw"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Television
                                size={28}
                                className="text-text-faint"
                              />
                            </div>
                          )}

                          {/* Add to list overlay */}
                          <div
                            className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${
                              activeShowId === show.id || isAdded
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveShowId(null);
                            }}
                          >
                            {isAdded ? (
                              <Check
                                size={24}
                                weight="bold"
                                className="text-accent"
                              />
                            ) : (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToList(show);
                                  }}
                                  disabled={isAdding}
                                  className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25 transition-colors disabled:opacity-50"
                                >
                                  {isAdding ? (
                                    <SpinnerGap
                                      size={13}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Plus size={13} weight="bold" />
                                  )}
                                  {t("addToList")}
                                </button>
                                <Link
                                  href={`/shows/${show.id}`}
                                  className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-black/60 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ArrowRight size={13} weight="bold" />
                                  {t("details")}
                                </Link>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="p-2">
                          <Link
                            href={`/shows/${show.id}`}
                            className="block truncate text-xs font-medium text-text-primary hover:text-accent transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {show.title}
                          </Link>
                          <p className="mt-0.5 text-[10px] text-text-faint">
                            {t("addedByCount", { count: show.addedCount })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
        </div>
      )}
    </div>
  );
}
