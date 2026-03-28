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
  getPopularMovies,
  getMovieRecommendations,
  addTmdbMovieToMyList,
  getOrCreateMovieByTmdbId,
  type PopularMovie,
  type RecommendedMovie,
} from "../actions";
import { useRouter } from "next/navigation";

type MovieResult = {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview: string | null;
};

export default function ExploreMoviesPage() {
  const t = useTranslations("explore");
  const router = useRouter();
  const [movieResults, setMovieResults] = useState<MovieResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedMovie[]>(
    [],
  );
  const [recsLoading, setRecsLoading] = useState(true);
  const [popularMovies, setPopularMovies] = useState<PopularMovie[]>([]);
  const [popularLoading, setPopularLoading] = useState(false);
  const [addedMovieIds, setAddedMovieIds] = useState<Set<string>>(new Set());
  const [addingMovieId, setAddingMovieId] = useState<string | null>(null);
  const [addingTmdbId, setAddingTmdbId] = useState<number | null>(null);
  const [addedTmdbIds, setAddedTmdbIds] = useState<Set<number>>(new Set());
  const [navigatingTmdbId, setNavigatingTmdbId] = useState<number | null>(null);
  const [activeMovieId, setActiveMovieId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!activeMovieId) return;
    const dismiss = () => setActiveMovieId(null);
    document.addEventListener("click", dismiss);
    return () => document.removeEventListener("click", dismiss);
  }, [activeMovieId]);

  useEffect(() => {
    let cancelled = false;
    getMovieRecommendations()
      .then((recs) => {
        if (!cancelled) {
          setRecommendations(recs);
          if (recs.length === 0) {
            setPopularLoading(true);
            getPopularMovies()
              .then((movies) => {
                if (!cancelled) setPopularMovies(movies);
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

  const handleAddSearchMovie = useCallback((movie: MovieResult) => {
    setAddingTmdbId(movie.tmdb_id);
    startTransition(async () => {
      try {
        await addTmdbMovieToMyList({
          tmdb_id: movie.tmdb_id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          overview: movie.overview,
        });
        setAddedTmdbIds((prev) => new Set(prev).add(movie.tmdb_id));
      } catch {
        /* silently fail */
      } finally {
        setAddingTmdbId(null);
      }
    });
  }, []);

  const handleAddRecommendedMovie = useCallback((movie: RecommendedMovie) => {
    setAddingMovieId(movie.id);
    startTransition(async () => {
      try {
        await addTmdbMovieToMyList({
          tmdb_id: movie.tmdb_id ?? 0,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          overview: movie.overview,
        });
        setAddedMovieIds((prev) => new Set(prev).add(movie.id));
      } catch {
        /* silently fail */
      } finally {
        setAddingMovieId(null);
      }
    });
  }, []);

  const handleAddPopularMovie = useCallback((movie: PopularMovie) => {
    setActiveMovieId(null);
    startTransition(async () => {
      try {
        await addTmdbMovieToMyList({
          tmdb_id: movie.tmdb_id ?? 0,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          overview: movie.overview,
        });
        setAddedMovieIds((prev) => new Set(prev).add(movie.id));
      } catch {
        /* silently fail */
      }
    });
  }, []);

  const handleMovieClick = useCallback(
    async (movie: MovieResult) => {
      setNavigatingTmdbId(movie.tmdb_id);
      try {
        const id = await getOrCreateMovieByTmdbId({
          tmdb_id: movie.tmdb_id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          overview: movie.overview,
        });
        router.push(`/movies/${id}`);
      } catch {
        setNavigatingTmdbId(null);
      }
    },
    [router],
  );

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setMovieResults([]);
      setSearched(false);
      return;
    }
    setSearched(true);
    const data = await fetch(
      `/api/tmdb/search-movies?q=${encodeURIComponent(query)}`,
    ).then((r) => r.json());
    setMovieResults(
      (data.results ?? []).slice(0, 8).map((m: MovieResult) => ({
        tmdb_id: m.tmdb_id,
        title: m.title,
        poster_path: m.poster_path,
        release_date: m.release_date,
        overview: m.overview,
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
          {t("moviesTitle")}
        </h1>
        <p className="text-sm text-text-secondary">{t("moviesSubtitle")}</p>
      </div>

      <SearchInput
        placeholder={t("searchMoviesPlaceholder")}
        onSearch={handleSearch}
      />

      {/* Search results */}
      {searched && movieResults.length === 0 && (
        <EmptyState title={t("noResults")} />
      )}

      {searched && movieResults.length > 0 && (
        <div className="space-y-2">
          {movieResults.map((movie) => (
            <div
              key={movie.tmdb_id}
              className="flex items-center gap-3 rounded-lg border border-border bg-bg-surface p-3 transition-colors hover:border-border-hover"
            >
              <button
                onClick={() => handleMovieClick(movie)}
                disabled={navigatingTmdbId === movie.tmdb_id}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                  {movie.poster_path ? (
                    <Image
                      src={getPosterUrl(movie.poster_path, "w92")!}
                      alt={movie.title}
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
                  <p
                    className={`truncate text-sm font-medium transition-colors ${navigatingTmdbId === movie.tmdb_id ? "text-text-muted" : "text-text-primary"}`}
                  >
                    {movie.title}
                  </p>
                  {movie.release_date && (
                    <p className="text-xs text-text-muted">
                      {movie.release_date.slice(0, 4)}
                    </p>
                  )}
                </div>
                {navigatingTmdbId === movie.tmdb_id && (
                  <SpinnerGap
                    size={14}
                    className="shrink-0 animate-spin text-text-muted"
                  />
                )}
              </button>
              <button
                onClick={() =>
                  !addedTmdbIds.has(movie.tmdb_id) &&
                  handleAddSearchMovie(movie)
                }
                disabled={
                  addingTmdbId === movie.tmdb_id ||
                  addedTmdbIds.has(movie.tmdb_id)
                }
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${addedTmdbIds.has(movie.tmdb_id) ? "border-accent/50 bg-accent/20 text-accent" : "border-border text-text-muted hover:border-border-hover hover:text-text-primary"}`}
              >
                {addingTmdbId === movie.tmdb_id ? (
                  <SpinnerGap size={14} className="animate-spin" />
                ) : addedTmdbIds.has(movie.tmdb_id) ? (
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
              : t("popularMoviesTitle")}
          </h2>

          {(recsLoading || popularLoading) && recommendations.length === 0 && (
            <div className="flex items-center justify-center gap-2 py-8">
              <SpinnerGap size={16} className="animate-spin text-text-muted" />
              <p className="text-xs text-text-muted">{t("suggestedLoading")}</p>
            </div>
          )}

          {!recsLoading &&
            recommendations.length === 0 &&
            popularMovies.length === 0 &&
            !popularLoading && <EmptyState title={t("popularMoviesEmpty")} />}

          {!recsLoading && recommendations.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {recommendations.map((movie) => {
                const posterUrl = getPosterUrl(movie.poster_path, "w342");
                const isAdded = addedMovieIds.has(movie.id);
                const isAdding = addingMovieId === movie.id;
                return (
                  <div
                    key={movie.id}
                    className="group relative overflow-hidden rounded-lg border border-border bg-bg-surface transition-colors hover:border-border-hover"
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setActiveMovieId(movie.id);
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === "mouse") setActiveMovieId(null);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMovieId(movie.id);
                    }}
                  >
                    <div className="absolute right-2 top-2 z-10 flex items-center justify-center rounded-sm bg-bg-primary/80 px-1.5 py-0.5 font-mono text-xs font-bold tabular-nums text-accent backdrop-blur-sm">
                      {movie.score}%
                    </div>
                    <div className="relative aspect-2/3 w-full bg-bg-elevated">
                      {posterUrl ? (
                        <Image
                          src={posterUrl}
                          alt={movie.title}
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
                        className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${activeMovieId === movie.id || isAdded ? "opacity-100" : "pointer-events-none opacity-0"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMovieId(null);
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
                                handleAddRecommendedMovie(movie);
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
                              href={`/movies/${movie.id}`}
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
                        href={`/movies/${movie.id}`}
                        className="block truncate text-sm font-medium text-text-primary transition-colors hover:text-accent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {movie.title}
                      </Link>
                      <p className="mt-0.5 text-xs text-text-muted">
                        {t("recommendedBy", { count: movie.recommendedBy })}
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
            popularMovies.length > 0 && (
              <>
                <p className="mb-3 text-xs text-text-muted">
                  {t("popularMoviesFallback")}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {popularMovies.map((movie) => {
                    const posterUrl = getPosterUrl(movie.poster_path, "w185");
                    const isAdded = addedMovieIds.has(movie.id);
                    return (
                      <div
                        key={movie.id}
                        className="group relative overflow-hidden rounded-lg border border-border bg-bg-surface transition-colors hover:border-border-hover"
                        onPointerEnter={(e) => {
                          if (e.pointerType === "mouse")
                            setActiveMovieId(movie.id);
                        }}
                        onPointerLeave={(e) => {
                          if (e.pointerType === "mouse") setActiveMovieId(null);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMovieId(movie.id);
                        }}
                      >
                        <div className="relative aspect-2/3 w-full bg-bg-elevated">
                          {posterUrl ? (
                            <Image
                              src={posterUrl}
                              alt={movie.title}
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
                            className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${activeMovieId === movie.id || isAdded ? "opacity-100" : "pointer-events-none opacity-0"}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMovieId(null);
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
                                    handleAddPopularMovie(movie);
                                  }}
                                  className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25"
                                >
                                  <Plus size={13} weight="bold" />
                                  {t("addToList")}
                                </button>
                                <Link
                                  href={`/movies/${movie.id}`}
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
                            href={`/movies/${movie.id}`}
                            className="block truncate text-xs font-medium text-text-primary transition-colors hover:text-accent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {movie.title}
                          </Link>
                          <p className="mt-0.5 text-[10px] text-text-faint">
                            {t("addedByCount", { count: movie.addedCount })}
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
