"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTopRatedGames } from "@/app/[locale]/(app)/games/actions";
import {
  getPopularGames,
  addTmdbGameToMyList,
} from "@/app/[locale]/(app)/games/actions";
import {
  Plus,
  Check,
  GameController,
  SpinnerGap,
  ArrowRight,
} from "@phosphor-icons/react";

type OnboardingGame = {
  id: string;
  igdb_id?: number | null;
  title: string;
  cover_url: string | null;
  first_release_date: string | null;
  overview?: string | null;
  avg_rating?: number;
};

type Props = {
  onAddGame: () => void;
};

export function OnboardingGamesEmptyState({ onAddGame }: Props) {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const [gameList, setGameList] = useState<OnboardingGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [addingId, setAddingId] = useState<string | null>(null);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!activeGameId) return;
    const dismiss = () => setActiveGameId(null);
    document.addEventListener("click", dismiss);
    return () => document.removeEventListener("click", dismiss);
  }, [activeGameId]);

  useEffect(() => {
    getTopRatedGames()
      .then((topRated) => {
        if (topRated.length >= 6) {
          setGameList(
            topRated.slice(0, 12).map((g) => ({
              id: g.id,
              title: g.title,
              cover_url: g.cover_url,
              first_release_date: g.first_release_date,
              avg_rating: g.avg_rating,
            })),
          );
        } else {
          return getPopularGames().then((popular) => {
            setGameList(
              popular.slice(0, 12).map((g) => ({
                id: g.id,
                igdb_id: g.igdb_id,
                title: g.title,
                cover_url: g.cover_url,
                first_release_date: g.first_release_date,
                overview: g.overview,
              })),
            );
          });
        }
      })
      .catch(() => {
        getPopularGames()
          .then((popular) =>
            setGameList(
              popular.slice(0, 12).map((g) => ({
                id: g.id,
                igdb_id: g.igdb_id,
                title: g.title,
                cover_url: g.cover_url,
                first_release_date: g.first_release_date,
                overview: g.overview,
              })),
            ),
          )
          .catch(() => {});
      })
      .finally(() => setLoading(false));
  }, []);

  const handleQuickAdd = (game: OnboardingGame) => {
    if (!game.igdb_id || addedIds.has(game.id) || addingId === game.id) return;
    setAddingId(game.id);
    startTransition(async () => {
      try {
        await addTmdbGameToMyList({
          igdb_id: game.igdb_id!,
          title: game.title,
          cover_url: game.cover_url,
          first_release_date: game.first_release_date,
          overview: game.overview,
        });
        setAddedIds((prev) => new Set(prev).add(game.id));
        router.refresh();
      } catch {
        // silently fail
      } finally {
        setAddingId(null);
      }
    });
  };

  return (
    <div className="flex flex-col items-center py-12">
      {/* Welcome header */}
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent-muted mb-4">
        <GameController size={28} className="text-accent" />
      </div>
      <h3 className="text-base font-semibold text-text-primary">
        {t("gamesTitle")}
      </h3>
      <p className="mt-1.5 max-w-sm text-center text-sm text-text-secondary">
        {t("gamesSubtitle")}
      </p>

      {/* Primary actions */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={onAddGame}
          className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-bg-primary transition-colors hover:bg-accent-hover"
        >
          <Plus size={16} weight="bold" />
          {t("gamesAddFirst")}
        </button>
      </div>

      {/* Community favorites */}
      <div className="mt-10 w-full">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-text-faint">
            {t("communityFavorites")}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {loading ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-2/3 animate-pulse rounded-md bg-bg-surface"
              />
            ))}
          </div>
        ) : gameList.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {gameList.map((game) => {
              const isAdded = addedIds.has(game.id);
              const isAdding = addingId === game.id;

              return (
                <div
                  key={game.id}
                  className="group relative overflow-hidden rounded-md border border-border bg-bg-surface"
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
                  <div className="relative aspect-2/3 bg-bg-elevated">
                    {game.cover_url ? (
                      <Image
                        src={game.cover_url}
                        alt={game.title}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <GameController size={24} className="text-text-faint" />
                      </div>
                    )}

                    {/* Avg rating badge */}
                    {game.avg_rating !== undefined && (
                      <div className="absolute top-1.5 right-1.5 rounded px-1 py-0.5 bg-black/70 font-mono text-[10px] font-bold tabular-nums text-accent leading-none">
                        {game.avg_rating.toFixed(1)}
                      </div>
                    )}

                    {/* Add overlay */}
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${
                        activeGameId === game.id || isAdded
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
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
                              handleQuickAdd(game);
                            }}
                            disabled={isAdding}
                            className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25 transition-colors disabled:opacity-50"
                          >
                            {isAdding ? (
                              <SpinnerGap size={13} className="animate-spin" />
                            ) : (
                              <Plus size={13} weight="bold" />
                            )}
                            {t("addToList")}
                          </button>
                          <Link
                            href={`/games/${game.id}`}
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
                  <p className="truncate px-2 py-1.5 text-xs text-text-secondary">
                    {game.title}
                  </p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
