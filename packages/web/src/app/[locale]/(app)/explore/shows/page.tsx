"use client";

import { useState, useCallback, useEffect, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { SearchInput } from "@/components/SearchInput";
import { EmptyState } from "@/components/EmptyState";
import { getPosterUrl } from "@/lib/tmdb/client";
import {
  Television,
  Plus,
  Check,
  SpinnerGap,
  ArrowRight,
  ArrowLeft,
} from "@phosphor-icons/react";
import {
  getRecommendations,
  getPopularShows,
  getOrCreateShowByTmdbId,
  type RecommendedShow,
  type PopularShow,
} from "../actions";
import {
  addShowToMyList,
  addTmdbShowToMyList,
} from "../../shows/lists/actions";
import { useRouter } from "next/navigation";

type ShowResult = {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
};

export default function ExploreShowsPage() {
  const t = useTranslations("explore");
  const router = useRouter();
  const [showResults, setShowResults] = useState<ShowResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedShow[]>([]);
  const [recsLoading, setRecsLoading] = useState(true);
  const [popularShows, setPopularShows] = useState<PopularShow[]>([]);
  const [popularLoading, setPopularLoading] = useState(false);
  const [addedShowIds, setAddedShowIds] = useState<Set<string>>(new Set());
  const [addingShowId, setAddingShowId] = useState<string | null>(null);
  const [addedTmdbIds, setAddedTmdbIds] = useState<Set<number>>(new Set());
  const [addingTmdbId, setAddingTmdbId] = useState<number | null>(null);
  const [navigatingTmdbId, setNavigatingTmdbId] = useState<number | null>(null);
  const [activeShowId, setActiveShowId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!activeShowId) return;
    const dismiss = () => setActiveShowId(null);
    document.addEventListener("click", dismiss);
    return () => document.removeEventListener("click", dismiss);
  }, [activeShowId]);

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
        /* silently fail */
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
        /* silently fail */
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
      setShowResults([]);
      setSearched(false);
      return;
    }
    setSearched(true);
    const data = await fetch(
      `/api/tmdb/search?q=${encodeURIComponent(query)}`,
    ).then((r) => r.json());
    setShowResults(
      (data.results ?? []).slice(0, 8).map((s: ShowResult) => ({
        tmdb_id: s.tmdb_id,
        title: s.title,
        poster_path: s.poster_path,
        first_air_date: s.first_air_date,
        overview: s.overview,
      })),
    );
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={13} weight="bold" />
          {t("backToExplore")}
        </Link>
        <h1 className="text-xl font-bold text-text-primary">
          {t("showsTitle")}
        </h1>
        <p className="text-sm text-text-secondary">{t("showsSubtitle")}</p>
      </div>

      <SearchInput
        placeholder={t("searchShowsPlaceholder")}
        onSearch={handleSearch}
      />

      {/* Search results */}
      {searched && showResults.length === 0 && (
        <EmptyState title={t("noResults")} />
      )}

      {searched && showResults.length > 0 && (
        <div className="space-y-2">
          {showResults.map((show) => (
            <div
              key={show.tmdb_id}
              className="flex items-center gap-3 rounded-lg border border-border bg-bg-surface p-3 transition-colors hover:border-border-hover"
            >
              <button
                onClick={() => handleShowClick(show)}
                disabled={navigatingTmdbId === show.tmdb_id}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
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
                    className="shrink-0 animate-spin text-text-muted"
                  />
                )}
              </button>
              <button
                onClick={() =>
                  !addedTmdbIds.has(show.tmdb_id) && handleAddSearchShow(show)
                }
                disabled={
                  addingTmdbId === show.tmdb_id ||
                  addedTmdbIds.has(show.tmdb_id)
                }
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${addedTmdbIds.has(show.tmdb_id) ? "border-accent/50 bg-accent/20 text-accent" : "border-border text-text-muted hover:border-border-hover hover:text-text-primary"}`}
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
      )}

      {/* Recommendations — visible when not searching */}
      {!searched && (
        <div>
          <h2 className="mb-4 text-sm font-semibold text-text-secondary">
            {t("suggestedTitle")}
          </h2>

          {(recsLoading || popularLoading) && recommendations.length === 0 && (
            <div className="flex items-center justify-center gap-2 py-8">
              <SpinnerGap size={16} className="animate-spin text-text-muted" />
              <p className="text-xs text-text-muted">{t("suggestedLoading")}</p>
            </div>
          )}

          {!recsLoading &&
            recommendations.length === 0 &&
            popularShows.length === 0 &&
            !popularLoading && <EmptyState title={t("suggestedEmpty")} />}

          {!recsLoading && recommendations.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {recommendations.map((show) => {
                const posterUrl = getPosterUrl(show.poster_path, "w342");
                const isAdded = addedShowIds.has(show.id);
                const isAdding = addingShowId === show.id;
                return (
                  <div
                    key={show.id}
                    className="group relative overflow-hidden rounded-lg border border-border bg-bg-surface transition-colors hover:border-border-hover"
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
                    <div className="absolute right-2 top-2 z-10 flex items-center justify-center rounded-sm bg-bg-primary/80 px-1.5 py-0.5 font-mono text-xs font-bold tabular-nums text-accent backdrop-blur-sm">
                      {show.score}%
                    </div>
                    <div className="relative aspect-2/3 w-full bg-bg-elevated">
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
                      <div
                        className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${activeShowId === show.id || isAdded ? "opacity-100" : "pointer-events-none opacity-0"}`}
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
                              className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25 disabled:opacity-50"
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
                              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-black/60"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ArrowRight size={13} weight="bold" />
                              {t("details")}
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="p-3">
                      <Link
                        href={`/shows/${show.id}`}
                        className="block truncate text-sm font-medium text-text-primary transition-colors hover:text-accent"
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
                              sizes="(max-width: 640px) 50vw, 17vw"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Television
                                size={28}
                                className="text-text-faint"
                              />
                            </div>
                          )}
                          <div
                            className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${activeShowId === show.id || isAdded ? "opacity-100" : "pointer-events-none opacity-0"}`}
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
                                  className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25 disabled:opacity-50"
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
                                  className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-black/60"
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
                            className="block truncate text-xs font-medium text-text-primary transition-colors hover:text-accent"
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
