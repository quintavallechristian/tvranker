"use client";

import { useState, useCallback, useEffect, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { SearchInput } from "@/components/SearchInput";
import { EmptyState } from "@/components/EmptyState";
import {
  GameController,
  Plus,
  Check,
  SpinnerGap,
  ArrowRight,
  ArrowLeft,
} from "@phosphor-icons/react";
import { getGameRecommendations, type RecommendedGame } from "../actions";
import {
  getPopularGames,
  addTmdbGameToMyList,
  type PopularGame,
} from "@/app/[locale]/(app)/games/actions";

type GameResult = {
  igdb_id: number;
  title: string;
  cover_url: string | null;
  first_release_date: string | null;
  platforms: string[];
  genres: string[];
};

export default function ExploreGamesPage() {
  const t = useTranslations("explore");
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedGame[]>([]);
  const [recsLoading, setRecsLoading] = useState(true);
  const [popularGames, setPopularGames] = useState<PopularGame[]>([]);
  const [popularLoading, setPopularLoading] = useState(false);
  const [addedGameIds, setAddedGameIds] = useState<Set<string>>(new Set());
  const [addingIgdbId, setAddingIgdbId] = useState<number | null>(null);
  const [addedIgdbIds, setAddedIgdbIds] = useState<Set<number>>(new Set());
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!activeGameId) return;
    const dismiss = () => setActiveGameId(null);
    document.addEventListener("click", dismiss);
    return () => document.removeEventListener("click", dismiss);
  }, [activeGameId]);

  useEffect(() => {
    let cancelled = false;
    getGameRecommendations()
      .then((recs) => {
        if (!cancelled) {
          setRecommendations(recs);
          if (recs.length === 0) {
            setPopularLoading(true);
            getPopularGames()
              .then((games) => {
                if (!cancelled) setPopularGames(games);
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

  const handleAddSearchGame = useCallback((game: GameResult) => {
    setAddingIgdbId(game.igdb_id);
    startTransition(async () => {
      try {
        await addTmdbGameToMyList({
          igdb_id: game.igdb_id,
          title: game.title,
          cover_url: game.cover_url,
          first_release_date: game.first_release_date,
          platforms: game.platforms,
          genres: game.genres,
        });
        setAddedIgdbIds((prev) => new Set(prev).add(game.igdb_id));
      } catch {
        /* silently fail */
      } finally {
        setAddingIgdbId(null);
      }
    });
  }, []);

  const handleAddPopularGame = useCallback((game: PopularGame) => {
    setActiveGameId(null);
    startTransition(async () => {
      try {
        await addTmdbGameToMyList({
          igdb_id: game.igdb_id ?? 0,
          title: game.title,
          cover_url: game.cover_url,
          first_release_date: game.first_release_date,
          overview: game.overview,
        });
        setAddedGameIds((prev) => new Set(prev).add(game.id));
      } catch {
        /* silently fail */
      }
    });
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setGameResults([]);
      setSearched(false);
      return;
    }
    setSearched(true);
    const data = await fetch(
      `/api/igdb/search?q=${encodeURIComponent(query)}`,
    ).then((r) => r.json());
    setGameResults(
      (data.results ?? []).slice(0, 8).map((g: GameResult) => ({
        igdb_id: g.igdb_id,
        title: g.title,
        cover_url: g.cover_url,
        first_release_date: g.first_release_date,
        platforms: g.platforms ?? [],
        genres: g.genres ?? [],
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
          {t("gamesTitle")}
        </h1>
        <p className="text-sm text-text-secondary">{t("gamesSubtitle")}</p>
      </div>

      <SearchInput
        placeholder={t("searchGamesPlaceholder")}
        onSearch={handleSearch}
      />

      {/* Search results */}
      {searched && gameResults.length === 0 && (
        <EmptyState title={t("noResults")} />
      )}

      {searched && gameResults.length > 0 && (
        <div className="space-y-2">
          {gameResults.map((game) => (
            <div
              key={game.igdb_id}
              className="flex items-center gap-3 rounded-lg border border-border bg-bg-surface p-3 transition-colors hover:border-border-hover"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                  {game.cover_url ? (
                    <Image
                      src={game.cover_url}
                      alt={game.title}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <GameController size={14} className="text-text-faint" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text-primary">
                    {game.title}
                  </p>
                  <p className="text-xs text-text-muted">
                    {game.first_release_date?.slice(0, 4) || "Unknown"}
                    {game.platforms.length > 0 && (
                      <span className="ml-1.5 text-text-faint">
                        · {game.platforms.slice(0, 3).join(", ")}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  !addedIgdbIds.has(game.igdb_id) && handleAddSearchGame(game)
                }
                disabled={
                  addingIgdbId === game.igdb_id ||
                  addedIgdbIds.has(game.igdb_id)
                }
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${addedIgdbIds.has(game.igdb_id) ? "border-accent/50 bg-accent/20 text-accent" : "border-border text-text-muted hover:border-border-hover hover:text-text-primary"}`}
              >
                {addingIgdbId === game.igdb_id ? (
                  <SpinnerGap size={14} className="animate-spin" />
                ) : addedIgdbIds.has(game.igdb_id) ? (
                  <Check size={14} weight="bold" />
                ) : (
                  <Plus size={14} weight="bold" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Popular games — visible when not searching */}
      {!searched && (
        <div>
          <h2 className="mb-4 text-sm font-semibold text-text-secondary">
            {recsLoading || (!recsLoading && recommendations.length > 0)
              ? t("suggestedTitle")
              : t("popularGamesTitle")}
          </h2>

          {(recsLoading || popularLoading) && recommendations.length === 0 && (
            <div className="flex items-center justify-center gap-2 py-8">
              <SpinnerGap size={16} className="animate-spin text-text-muted" />
              <p className="text-xs text-text-muted">{t("suggestedLoading")}</p>
            </div>
          )}

          {!recsLoading &&
            recommendations.length === 0 &&
            !popularLoading &&
            popularGames.length === 0 && (
              <EmptyState title={t("popularGamesEmpty")} />
            )}

          {!recsLoading && recommendations.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {recommendations.map((game) => {
                const isAdded = addedGameIds.has(game.id);
                return (
                  <div
                    key={game.id}
                    className="group relative overflow-hidden rounded-lg border border-border bg-bg-surface transition-colors hover:border-border-hover"
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setActiveGameId(game.id);
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === "mouse") setActiveGameId(null);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveGameId(game.id);
                    }}
                  >
                    <div className="absolute right-2 top-2 z-10 flex items-center justify-center rounded-sm bg-bg-primary/80 px-1.5 py-0.5 font-mono text-xs font-bold tabular-nums text-accent backdrop-blur-sm">
                      {game.score}%
                    </div>
                    <div className="relative aspect-2/3 w-full bg-bg-elevated">
                      {game.cover_url ? (
                        <Image
                          src={game.cover_url}
                          alt={game.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, 17vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <GameController
                            size={28}
                            className="text-text-faint"
                          />
                        </div>
                      )}
                      <div
                        className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${activeGameId === game.id || isAdded ? "opacity-100" : "pointer-events-none opacity-0"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveGameId(null);
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
                                handleAddPopularGame({
                                  id: game.id,
                                  igdb_id: game.igdb_id,
                                  title: game.title,
                                  cover_url: game.cover_url,
                                  first_release_date: game.first_release_date,
                                  overview: game.overview,
                                  added_count: game.recommendedBy,
                                });
                              }}
                              className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25"
                            >
                              <Plus size={13} weight="bold" />
                              {t("addToList")}
                            </button>
                            <Link
                              href={`/games/${game.id}`}
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
                        href={`/games/${game.id}`}
                        className="block truncate text-xs font-medium text-text-primary transition-colors hover:text-accent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {game.title}
                      </Link>
                      <p className="mt-0.5 text-[10px] text-text-faint">
                        {t("recommendedBy", { count: game.recommendedBy })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!popularLoading &&
            recommendations.length === 0 &&
            popularGames.length > 0 && (
              <>
                <p className="mb-3 text-xs text-text-muted">
                  {t("popularGamesFallback")}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {popularGames.map((game) => {
                    const isAdded = addedGameIds.has(game.id);
                    return (
                      <div
                        key={game.id}
                        className="group relative overflow-hidden rounded-lg border border-border bg-bg-surface transition-colors hover:border-border-hover"
                        onPointerEnter={(e) => {
                          if (e.pointerType === "mouse")
                            setActiveGameId(game.id);
                        }}
                        onPointerLeave={(e) => {
                          if (e.pointerType === "mouse") setActiveGameId(null);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveGameId(game.id);
                        }}
                      >
                        <div className="relative aspect-2/3 w-full bg-bg-elevated">
                          {game.cover_url ? (
                            <Image
                              src={game.cover_url}
                              alt={game.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 50vw, 17vw"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <GameController
                                size={28}
                                className="text-text-faint"
                              />
                            </div>
                          )}
                          <div
                            className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${activeGameId === game.id || isAdded ? "opacity-100" : "pointer-events-none opacity-0"}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveGameId(null);
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
                                    handleAddPopularGame(game);
                                  }}
                                  className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25"
                                >
                                  <Plus size={13} weight="bold" />
                                  {t("addToList")}
                                </button>
                                <Link
                                  href={`/games/${game.id}`}
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
                            href={`/games/${game.id}`}
                            className="block truncate text-xs font-medium text-text-primary transition-colors hover:text-accent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {game.title}
                          </Link>
                          <p className="mt-0.5 text-[10px] text-text-faint">
                            {t("addedByCount", { count: game.added_count })}
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
