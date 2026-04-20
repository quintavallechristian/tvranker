"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  getTopRatedBoardgames,
  getPopularBoardgames,
  addBoardgameToMyList,
} from "@/app/[locale]/(app)/boardgames/actions";
import {
  Plus,
  Check,
  PuzzlePiece,
  SpinnerGap,
  ArrowRight,
} from "@phosphor-icons/react";

type OnboardingBoardgame = {
  id: string;
  bgg_id?: number | null;
  title: string;
  thumbnail_url: string | null;
  year_published: number | null;
  description?: string | null;
  avg_rating?: number;
};

type Props = {
  onAddBoardgame: () => void;
};

export function OnboardingBoardgamesEmptyState({ onAddBoardgame }: Props) {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const [bgList, setBgList] = useState<OnboardingBoardgame[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [addingId, setAddingId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!activeId) return;
    const dismiss = () => setActiveId(null);
    document.addEventListener("click", dismiss);
    return () => document.removeEventListener("click", dismiss);
  }, [activeId]);

  useEffect(() => {
    getTopRatedBoardgames()
      .then((topRated) => {
        if (topRated.length >= 6) {
          setBgList(
            topRated.slice(0, 12).map((g) => ({
              id: g.id,
              title: g.title,
              thumbnail_url: g.thumbnail_url,
              year_published: g.year_published,
              avg_rating: g.avg_rating,
            })),
          );
        } else {
          return getPopularBoardgames().then((popular) => {
            setBgList(
              popular.slice(0, 12).map((g) => ({
                id: g.id,
                bgg_id: g.bgg_id,
                title: g.title,
                thumbnail_url: g.thumbnail_url,
                year_published: g.year_published,
                description: g.description,
              })),
            );
          });
        }
      })
      .catch(() => {
        getPopularBoardgames()
          .then((popular) =>
            setBgList(
              popular.slice(0, 12).map((g) => ({
                id: g.id,
                bgg_id: g.bgg_id,
                title: g.title,
                thumbnail_url: g.thumbnail_url,
                year_published: g.year_published,
                description: g.description,
              })),
            ),
          )
          .catch(() => {});
      })
      .finally(() => setLoading(false));
  }, []);

  const handleQuickAdd = (bg: OnboardingBoardgame) => {
    if (addedIds.has(bg.id) || addingId === bg.id) return;
    setAddingId(bg.id);
    startTransition(async () => {
      try {
        await addBoardgameToMyList(bg.id);
        setAddedIds((prev) => new Set(prev).add(bg.id));
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
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent-muted mb-4">
        <PuzzlePiece size={28} className="text-accent" />
      </div>
      <h3 className="text-base font-semibold text-text-primary">
        {t("boardgamesTitle")}
      </h3>
      <p className="mt-1.5 max-w-sm text-center text-sm text-text-secondary">
        {t("boardgamesSubtitle")}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={onAddBoardgame}
          className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-bg-primary transition-colors hover:bg-accent-hover"
        >
          <Plus size={16} weight="bold" />
          {t("boardgamesAddFirst")}
        </button>
      </div>

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
                className="aspect-square animate-pulse rounded-md bg-bg-surface"
              />
            ))}
          </div>
        ) : bgList.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {bgList.map((bg) => {
              const isAdded = addedIds.has(bg.id);
              const isAdding = addingId === bg.id;

              return (
                <div
                  key={bg.id}
                  className="group relative overflow-hidden rounded-md border border-border bg-bg-surface"
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setActiveId(bg.id);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") setActiveId(null);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveId(bg.id);
                  }}
                >
                  <div className="relative aspect-square bg-bg-elevated">
                    {bg.thumbnail_url ? (
                      <Image
                        src={bg.thumbnail_url}
                        alt={bg.title}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <PuzzlePiece size={24} className="text-text-faint" />
                      </div>
                    )}

                    {bg.avg_rating !== undefined && (
                      <div className="absolute top-1.5 right-1.5 rounded px-1 py-0.5 bg-black/70 font-mono text-[10px] font-bold tabular-nums text-accent leading-none">
                        {bg.avg_rating.toFixed(1)}
                      </div>
                    )}

                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${
                        activeId === bg.id || isAdded
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveId(null);
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
                              handleQuickAdd(bg);
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
                            href={`/boardgames/${bg.id}`}
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
                    {bg.title}
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
