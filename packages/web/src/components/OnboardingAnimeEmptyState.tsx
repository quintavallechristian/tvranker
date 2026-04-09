"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getPosterUrl } from "@/lib/tmdb/client";
import { getTopRatedAnime } from "@/app/[locale]/(app)/rankings/anime/actions";
import {
  getPopularAnime,
  addTmdbAnimeToMyList,
} from "@/app/[locale]/(app)/explore/actions";
import {
  Plus,
  Check,
  FileArrowUp,
  FilmSlate,
  SpinnerGap,
  ArrowRight,
} from "@phosphor-icons/react";

type OnboardingAnime = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
  avg_rating?: number;
};

type Props = {
  onAddAnime: () => void;
  onImport: () => void;
};

const DISMISSED_KEY = "anime_suggestions_dismissed";

export function OnboardingAnimeEmptyState({ onAddAnime, onImport }: Props) {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const [animeList, setAnimeList] = useState<OnboardingAnime[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [addingId, setAddingId] = useState<string | null>(null);
  const [activeAnimeId, setActiveAnimeId] = useState<string | null>(null);
  const [suggestionsDismissed, setSuggestionsDismissed] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSuggestionsDismissed(
        localStorage.getItem(DISMISSED_KEY) === "true",
      );
    }
  }, []);

  function handleDismissSuggestions() {
    localStorage.setItem(DISMISSED_KEY, "true");
    setSuggestionsDismissed(true);
  }

  useEffect(() => {
    if (!activeAnimeId) return;
    const dismiss = () => setActiveAnimeId(null);
    document.addEventListener("click", dismiss);
    return () => document.removeEventListener("click", dismiss);
  }, [activeAnimeId]);

  useEffect(() => {
    getTopRatedAnime()
      .then((topRated) => {
        if (topRated.length >= 6) {
          setAnimeList(
            topRated.slice(0, 12).map((a) => ({
              id: a.id,
              tmdb_id: a.tmdb_id,
              title: a.title,
              poster_path: a.poster_path,
              first_air_date: a.first_air_date,
              overview: a.overview,
              avg_rating: a.avg_rating,
            })),
          );
        } else {
          return getPopularAnime().then((popular) => {
            setAnimeList(popular.slice(0, 12));
          });
        }
      })
      .catch(() => {
        getPopularAnime()
          .then((popular) => setAnimeList(popular.slice(0, 12)))
          .catch(() => {});
      })
      .finally(() => setLoading(false));
  }, []);

  const handleQuickAdd = (anime: OnboardingAnime) => {
    if (!anime.tmdb_id || addedIds.has(anime.id) || addingId === anime.id)
      return;
    setAddingId(anime.id);
    startTransition(async () => {
      try {
        await addTmdbAnimeToMyList({
          tmdb_id: anime.tmdb_id!,
          title: anime.title,
          poster_path: anime.poster_path,
          first_air_date: anime.first_air_date,
          overview: anime.overview,
        });
        setAddedIds((prev) => new Set(prev).add(anime.id));
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
        <FilmSlate size={28} className="text-accent" />
      </div>
      <h3 className="text-base font-semibold text-text-primary">
        {t("animeTitle")}
      </h3>
      <p className="mt-1.5 max-w-sm text-center text-sm text-text-secondary">
        {t("animeSubtitle")}
      </p>

      {/* Primary actions */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={onAddAnime}
          className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-bg-primary transition-colors hover:bg-accent-hover"
        >
          <Plus size={16} weight="bold" />
          {t("animeAddFirst")}
        </button>
        <button
          onClick={onImport}
          className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary"
        >
          <FileArrowUp size={16} />
          {t("importExternal")}
        </button>
      </div>

      {/* Community favorites */}
      {!suggestionsDismissed && (
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
        ) : animeList.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {animeList.map((anime) => {
              const isAdded = addedIds.has(anime.id);
              const isAdding = addingId === anime.id;
              const posterUrl = getPosterUrl(anime.poster_path, "w185");

              return (
                <div
                  key={anime.id}
                  className="group relative overflow-hidden rounded-md border border-border bg-bg-surface"
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
                  <div className="relative aspect-2/3 bg-bg-elevated">
                    {posterUrl ? (
                      <Image
                        src={posterUrl}
                        alt={anime.title}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FilmSlate size={24} className="text-text-faint" />
                      </div>
                    )}

                    {/* Avg rating badge */}
                    {anime.avg_rating !== undefined && (
                      <div className="absolute top-1.5 right-1.5 rounded px-1 py-0.5 bg-black/70 font-mono text-[10px] font-bold tabular-nums text-accent leading-none">
                        {anime.avg_rating.toFixed(1)}
                      </div>
                    )}

                    {/* Add overlay */}
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${
                        activeAnimeId === anime.id || isAdded
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
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
                              handleQuickAdd(anime);
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
                            href={`/anime/${anime.id}`}
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
                    {anime.title}
                  </p>
                </div>
              );
            })}
          </div>
        ) : null}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleDismissSuggestions}
            className="text-xs text-text-faint transition-colors hover:text-text-secondary"
          >
            {t("noThanks")}
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
