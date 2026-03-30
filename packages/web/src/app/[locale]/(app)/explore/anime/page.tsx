"use client";

import { useState, useCallback, useEffect, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { SearchInput } from "@/components/SearchInput";
import { EmptyState } from "@/components/EmptyState";
import { getPosterUrl } from "@/lib/tmdb/client";
import {
  FilmSlate,
  Plus,
  Check,
  SpinnerGap,
  ArrowRight,
  ArrowLeft,
} from "@phosphor-icons/react";
import {
  getPopularAnime,
  getAnimeRecommendations,
  addTmdbAnimeToMyList,
  type PopularAnime,
  type RecommendedAnime,
} from "../actions";

type AnimeResult = {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
};

export default function ExploreAnimePage() {
  const t = useTranslations("explore");
  const [animeResults, setAnimeResults] = useState<AnimeResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedAnime[]>(
    [],
  );
  const [recsLoading, setRecsLoading] = useState(true);
  const [popularAnime, setPopularAnime] = useState<PopularAnime[]>([]);
  const [popularLoading, setPopularLoading] = useState(false);
  const [addedAnimeIds, setAddedAnimeIds] = useState<Set<string>>(new Set());
  const [addingAnimeId, setAddingAnimeId] = useState<string | null>(null);
  const [addingTmdbId, setAddingTmdbId] = useState<number | null>(null);
  const [addedTmdbIds, setAddedTmdbIds] = useState<Set<number>>(new Set());
  const [activeAnimeId, setActiveAnimeId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!activeAnimeId) return;
    const dismiss = () => setActiveAnimeId(null);
    document.addEventListener("click", dismiss);
    return () => document.removeEventListener("click", dismiss);
  }, [activeAnimeId]);

  useEffect(() => {
    let cancelled = false;
    getAnimeRecommendations()
      .then((recs) => {
        if (!cancelled) {
          setRecommendations(recs);
          if (recs.length === 0) {
            setPopularLoading(true);
            getPopularAnime()
              .then((anime) => {
                if (!cancelled) setPopularAnime(anime);
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

  const handleAddSearchAnime = useCallback((anime: AnimeResult) => {
    setAddingTmdbId(anime.tmdb_id);
    startTransition(async () => {
      try {
        await addTmdbAnimeToMyList({
          tmdb_id: anime.tmdb_id,
          title: anime.title,
          poster_path: anime.poster_path,
          first_air_date: anime.first_air_date,
          overview: anime.overview,
        });
        setAddedTmdbIds((prev) => new Set(prev).add(anime.tmdb_id));
      } catch {
        /* silently fail */
      } finally {
        setAddingTmdbId(null);
      }
    });
  }, []);

  const handleAddRecommendedAnime = useCallback((anime: RecommendedAnime) => {
    setAddingAnimeId(anime.id);
    startTransition(async () => {
      try {
        await addTmdbAnimeToMyList({
          tmdb_id: anime.tmdb_id ?? 0,
          title: anime.title,
          poster_path: anime.poster_path,
          first_air_date: anime.first_air_date,
          overview: anime.overview,
        });
        setAddedAnimeIds((prev) => new Set(prev).add(anime.id));
      } catch {
        /* silently fail */
      } finally {
        setAddingAnimeId(null);
      }
    });
  }, []);

  const handleAddPopularAnime = useCallback((anime: PopularAnime) => {
    setActiveAnimeId(null);
    startTransition(async () => {
      try {
        await addTmdbAnimeToMyList({
          tmdb_id: anime.tmdb_id ?? 0,
          title: anime.title,
          poster_path: anime.poster_path,
          first_air_date: anime.first_air_date,
          overview: anime.overview,
        });
        setAddedAnimeIds((prev) => new Set(prev).add(anime.id));
      } catch {
        /* silently fail */
      }
    });
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setAnimeResults([]);
      setSearched(false);
      return;
    }
    setSearched(true);
    const data = await fetch(
      `/api/tmdb/search-anime?q=${encodeURIComponent(query)}`,
    ).then((r) => r.json());
    setAnimeResults(
      (data.results ?? []).slice(0, 8).map((a: AnimeResult) => ({
        tmdb_id: a.tmdb_id,
        title: a.title,
        poster_path: a.poster_path,
        first_air_date: a.first_air_date,
        overview: a.overview,
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
          {t("animeTitle")}
        </h1>
        <p className="text-sm text-text-secondary">{t("animeSubtitle")}</p>
      </div>

      <SearchInput
        placeholder={t("searchAnimePlaceholder")}
        onSearch={handleSearch}
      />

      {/* Search results */}
      {searched && animeResults.length === 0 && (
        <EmptyState title={t("noResults")} />
      )}

      {searched && animeResults.length > 0 && (
        <div className="space-y-2">
          {animeResults.map((anime) => (
            <div
              key={anime.tmdb_id}
              className="flex items-center gap-3 rounded-lg border border-border bg-bg-surface p-3 transition-colors hover:border-border-hover"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                  {anime.poster_path ? (
                    <Image
                      src={getPosterUrl(anime.poster_path, "w92")!}
                      alt={anime.title}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <FilmSlate size={14} className="text-text-faint" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text-primary">
                    {anime.title}
                  </p>
                  {anime.first_air_date && (
                    <p className="text-xs text-text-muted">
                      {anime.first_air_date.slice(0, 4)}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() =>
                  !addedTmdbIds.has(anime.tmdb_id) &&
                  handleAddSearchAnime(anime)
                }
                disabled={
                  addingTmdbId === anime.tmdb_id ||
                  addedTmdbIds.has(anime.tmdb_id)
                }
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${addedTmdbIds.has(anime.tmdb_id) ? "border-accent/50 bg-accent/20 text-accent" : "border-border text-text-muted hover:border-border-hover hover:text-text-primary"}`}
              >
                {addingTmdbId === anime.tmdb_id ? (
                  <SpinnerGap size={14} className="animate-spin" />
                ) : addedTmdbIds.has(anime.tmdb_id) ? (
                  <Check size={14} weight="bold" />
                ) : (
                  <Plus size={14} weight="bold" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Recommendations / popular — visible when not searching */}
      {!searched && (
        <div>
          <h2 className="mb-4 text-sm font-semibold text-text-secondary">
            {recsLoading || (!recsLoading && recommendations.length > 0)
              ? t("suggestedTitle")
              : t("popularAnimeTitle")}
          </h2>

          {(recsLoading || popularLoading) && recommendations.length === 0 && (
            <div className="flex items-center justify-center gap-2 py-8">
              <SpinnerGap size={16} className="animate-spin text-text-muted" />
              <p className="text-xs text-text-muted">{t("suggestedLoading")}</p>
            </div>
          )}

          {!recsLoading &&
            recommendations.length === 0 &&
            popularAnime.length === 0 &&
            !popularLoading && <EmptyState title={t("popularAnimeEmpty")} />}

          {!recsLoading && recommendations.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {recommendations.map((anime) => {
                const posterUrl = getPosterUrl(anime.poster_path, "w342");
                const isAdded = addedAnimeIds.has(anime.id);
                const isAdding = addingAnimeId === anime.id;
                return (
                  <div
                    key={anime.id}
                    className="group relative overflow-hidden rounded-lg border border-border bg-bg-surface transition-colors hover:border-border-hover"
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setActiveAnimeId(anime.id);
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === "mouse") setActiveAnimeId(null);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveAnimeId(anime.id);
                    }}
                  >
                    <div className="absolute right-2 top-2 z-10 flex items-center justify-center rounded-sm bg-bg-primary/80 px-1.5 py-0.5 font-mono text-xs font-bold tabular-nums text-accent backdrop-blur-sm">
                      {anime.score}%
                    </div>
                    <div className="relative aspect-2/3 w-full bg-bg-elevated">
                      {posterUrl ? (
                        <Image
                          src={posterUrl}
                          alt={anime.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <FilmSlate size={32} className="text-text-faint" />
                        </div>
                      )}
                      <div
                        className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${activeAnimeId === anime.id || isAdded ? "opacity-100" : "pointer-events-none opacity-0"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveAnimeId(null);
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
                                handleAddRecommendedAnime(anime);
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
                              href={`/anime/${anime.id}`}
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
                        href={`/anime/${anime.id}`}
                        className="block truncate text-sm font-medium text-text-primary transition-colors hover:text-accent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {anime.title}
                      </Link>
                      <p className="mt-0.5 text-xs text-text-muted">
                        {t("recommendedBy", { count: anime.recommendedBy })}
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
            popularAnime.length > 0 && (
              <>
                <p className="mb-3 text-xs text-text-muted">
                  {t("popularAnimeFallback")}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {popularAnime.map((anime) => {
                    const posterUrl = getPosterUrl(anime.poster_path, "w185");
                    const isAdded = addedAnimeIds.has(anime.id);
                    return (
                      <div
                        key={anime.id}
                        className="group relative overflow-hidden rounded-lg border border-border bg-bg-surface transition-colors hover:border-border-hover"
                        onPointerEnter={(e) => {
                          if (e.pointerType === "mouse")
                            setActiveAnimeId(anime.id);
                        }}
                        onPointerLeave={(e) => {
                          if (e.pointerType === "mouse") setActiveAnimeId(null);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveAnimeId(anime.id);
                        }}
                      >
                        <div className="relative aspect-2/3 w-full bg-bg-elevated">
                          {posterUrl ? (
                            <Image
                              src={posterUrl}
                              alt={anime.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 50vw, 17vw"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <FilmSlate
                                size={28}
                                className="text-text-faint"
                              />
                            </div>
                          )}
                          <div
                            className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${activeAnimeId === anime.id || isAdded ? "opacity-100" : "pointer-events-none opacity-0"}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveAnimeId(null);
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
                                    handleAddPopularAnime(anime);
                                  }}
                                  className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25"
                                >
                                  <Plus size={13} weight="bold" />
                                  {t("addToList")}
                                </button>
                                <Link
                                  href={`/anime/${anime.id}`}
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
                            href={`/anime/${anime.id}`}
                            className="block truncate text-xs font-medium text-text-primary transition-colors hover:text-accent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {anime.title}
                          </Link>
                          <p className="mt-0.5 text-[10px] text-text-faint">
                            {t("addedByCount", { count: anime.addedCount })}
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
