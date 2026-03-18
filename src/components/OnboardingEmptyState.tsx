"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getPosterUrl } from "@/lib/tmdb/client";
import {
  getPopularShows,
  type PopularShow,
} from "@/app/[locale]/(app)/explore/actions";
import { addShowToMyList } from "@/app/[locale]/(app)/lists/actions";
import {
  Plus,
  Check,
  FileArrowUp,
  Television,
  SpinnerGap,
} from "@phosphor-icons/react";

type Props = {
  onAddShow: () => void;
  onImport: () => void;
};

export function OnboardingEmptyState({ onAddShow, onImport }: Props) {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const [shows, setShows] = useState<PopularShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [addingId, setAddingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    getPopularShows()
      .then(setShows)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleQuickAdd = (show: PopularShow) => {
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
                  className="group overflow-hidden rounded-md border border-border bg-bg-surface"
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

                    {/* Add overlay */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity ${
                        isAdded
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <button
                        onClick={() => handleQuickAdd(show)}
                        disabled={isAdding || isAdded}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                          isAdded
                            ? "border-accent/50 bg-accent/20 text-accent"
                            : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {isAdding ? (
                          <SpinnerGap size={16} className="animate-spin" />
                        ) : isAdded ? (
                          <Check size={16} weight="bold" />
                        ) : (
                          <Plus size={16} weight="bold" />
                        )}
                      </button>
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
