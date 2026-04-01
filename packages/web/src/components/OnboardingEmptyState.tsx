"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getPosterUrl } from "@/lib/tmdb/client";
import { getTopRatedShows } from "@/app/[locale]/(app)/rankings/actions";
import { getPopularShows } from "@/app/[locale]/(app)/explore/actions";
import { addShowToMyList } from "@/app/[locale]/(app)/shows/lists/actions";
import {
  Plus,
  Check,
  FileArrowUp,
  Television,
  SpinnerGap,
  ArrowRight,
} from "@phosphor-icons/react";

// Unified show shape for displaying in the onboarding grid
type OnboardingShow = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
  avg_rating?: number;
};

type Props = {
  onAddShow: () => void;
  onImport: () => void;
};

export function OnboardingEmptyState({ onAddShow, onImport }: Props) {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const [shows, setShows] = useState<OnboardingShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [addingId, setAddingId] = useState<string | null>(null);
  const [activeShowId, setActiveShowId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!activeShowId) return;
    const dismiss = () => setActiveShowId(null);
    document.addEventListener("click", dismiss);
    return () => document.removeEventListener("click", dismiss);
  }, [activeShowId]);

  useEffect(() => {
    getTopRatedShows()
      .then((topRated) => {
        if (topRated.length >= 6) {
          // Map TopRatedShow → OnboardingShow
          setShows(
            topRated.slice(0, 12).map((s) => ({
              id: s.id,
              tmdb_id: s.tmdb_id,
              title: s.title,
              poster_path: s.poster_path,
              first_air_date: s.first_air_date,
              overview: s.overview,
              avg_rating: s.avg_rating,
            })),
          );
        } else {
          // Fall back to most-added shows when ratings data is sparse
          return getPopularShows().then((popular) => {
            setShows(popular.slice(0, 12));
          });
        }
      })
      .catch(() => {
        getPopularShows()
          .then((popular) => setShows(popular.slice(0, 12)))
          .catch(() => {});
      })
      .finally(() => setLoading(false));
  }, []);

  const handleQuickAdd = (show: OnboardingShow) => {
    if (addedIds.has(show.id) || addingId === show.id) return;
    setAddingId(show.id);
    startTransition(async () => {
      try {
        await addShowToMyList({
          id: show.id,
          tmdb_id: show.tmdb_id,
          imdb_id: null,
          title: show.title,
          poster_path: show.poster_path,
          first_air_date: show.first_air_date,
          overview: show.overview,
        });
        setAddedIds((prev) => new Set(prev).add(show.id));
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
        <Television size={28} className="text-accent" />
      </div>
      <h3 className="text-base font-semibold text-text-primary">
        {t("title")}
      </h3>
      <p className="mt-1.5 max-w-sm text-center text-sm text-text-secondary">
        {t("subtitle")}
      </p>

      {/* Primary actions */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={onAddShow}
          className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-bg-primary transition-colors hover:bg-accent-hover"
        >
          <Plus size={16} weight="bold" />
          {t("addFirst")}
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
        ) : shows.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {shows.map((show) => {
              const isAdded = addedIds.has(show.id);
              const isAdding = addingId === show.id;
              const posterUrl = getPosterUrl(show.poster_path, "w185");

              return (
                <div
                  key={show.id}
                  className="group relative overflow-hidden rounded-md border border-border bg-bg-surface"
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
                  <div className="relative aspect-2/3 bg-bg-elevated">
                    {posterUrl ? (
                      <Image
                        src={posterUrl}
                        alt={show.title}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Television size={24} className="text-text-faint" />
                      </div>
                    )}

                    {/* Avg rating badge (top-right) */}
                    {show.avg_rating !== undefined && (
                      <div className="absolute top-1.5 right-1.5 rounded px-1 py-0.5 bg-black/70 font-mono text-[10px] font-bold tabular-nums text-accent leading-none">
                        {show.avg_rating.toFixed(1)}
                      </div>
                    )}

                    {/* Add overlay */}
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
                              handleQuickAdd(show);
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
                  <p className="truncate px-2 py-1.5 text-xs text-text-secondary">
                    {show.title}
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
