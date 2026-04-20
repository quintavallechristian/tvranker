"use client";

import { useState, useCallback, useEffect, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { SearchInput } from "@/components/SearchInput";
import { EmptyState } from "@/components/EmptyState";
import {
  PuzzlePiece,
  Plus,
  Check,
  SpinnerGap,
  ArrowRight,
  ArrowLeft,
} from "@phosphor-icons/react";
import {
  getPopularBoardgames,
  addBggBoardgameToMyList,
  type PopularBoardgame,
} from "@/app/[locale]/(app)/boardgames/actions";

type BoardgameResult = {
  bgg_id: number;
  title: string;
  year_published: number | null;
};

export default function ExploreBoardgamesPage() {
  const t = useTranslations("explore");
  const [results, setResults] = useState<BoardgameResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [popularBoardgames, setPopularBoardgames] = useState<
    PopularBoardgame[]
  >([]);
  const [popularLoading, setPopularLoading] = useState(true);
  const [addedBoardgameIds, setAddedBoardgameIds] = useState<Set<string>>(
    new Set(),
  );
  const [addingBggId, setAddingBggId] = useState<number | null>(null);
  const [addedBggIds, setAddedBggIds] = useState<Set<number>>(new Set());
  const [activeBoardgameId, setActiveBoardgameId] = useState<string | null>(
    null,
  );
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!activeBoardgameId) return;
    const dismiss = () => setActiveBoardgameId(null);
    document.addEventListener("click", dismiss);
    return () => document.removeEventListener("click", dismiss);
  }, [activeBoardgameId]);

  useEffect(() => {
    let cancelled = false;
    getPopularBoardgames()
      .then((bgs) => {
        if (!cancelled) setPopularBoardgames(bgs);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setPopularLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAddSearchResult = useCallback((bg: BoardgameResult) => {
    setAddingBggId(bg.bgg_id);
    startTransition(async () => {
      try {
        await addBggBoardgameToMyList({
          bgg_id: bg.bgg_id,
          title: bg.title,
          thumbnail_url: null,
          year_published: bg.year_published,
        });
        setAddedBggIds((prev) => new Set(prev).add(bg.bgg_id));
      } catch {
        /* silently fail */
      } finally {
        setAddingBggId(null);
      }
    });
  }, []);

  const handleAddPopularBoardgame = useCallback((bg: PopularBoardgame) => {
    setActiveBoardgameId(null);
    startTransition(async () => {
      try {
        await addBggBoardgameToMyList({
          bgg_id: bg.bgg_id ?? 0,
          title: bg.title,
          thumbnail_url: bg.thumbnail_url,
          year_published: bg.year_published,
        });
        setAddedBoardgameIds((prev) => new Set(prev).add(bg.id));
      } catch {
        /* silently fail */
      }
    });
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setSearched(true);
    const data = await fetch(
      `/api/bgg/search?q=${encodeURIComponent(query)}`,
    ).then((r) => r.json());
    setResults(
      (data.results ?? []).slice(0, 8).map((g: BoardgameResult) => ({
        bgg_id: g.bgg_id,
        title: g.title,
        year_published: g.year_published,
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
          {t("boardgamesTitle")}
        </h1>
        <p className="text-sm text-text-secondary">{t("boardgamesSubtitle")}</p>
      </div>

      <SearchInput
        placeholder={t("searchBoardgamesPlaceholder")}
        onSearch={handleSearch}
      />

      {/* Search results */}
      {searched && results.length === 0 && (
        <EmptyState title={t("noResults")} />
      )}

      {searched && results.length > 0 && (
        <div className="space-y-2">
          {results.map((bg) => (
            <div
              key={bg.bgg_id}
              className="flex items-center gap-3 rounded-lg border border-border bg-bg-surface p-3 transition-colors hover:border-border-hover"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-bg-elevated">
                  <PuzzlePiece size={18} className="text-text-faint" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text-primary">
                    {bg.title}
                  </p>
                  <p className="text-xs text-text-muted">
                    {bg.year_published || "Unknown"}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  !addedBggIds.has(bg.bgg_id) && handleAddSearchResult(bg)
                }
                disabled={
                  addingBggId === bg.bgg_id || addedBggIds.has(bg.bgg_id)
                }
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${addedBggIds.has(bg.bgg_id) ? "border-accent/50 bg-accent/20 text-accent" : "border-border text-text-muted hover:border-border-hover hover:text-text-primary"}`}
              >
                {addingBggId === bg.bgg_id ? (
                  <SpinnerGap size={14} className="animate-spin" />
                ) : addedBggIds.has(bg.bgg_id) ? (
                  <Check size={14} weight="bold" />
                ) : (
                  <Plus size={14} weight="bold" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Popular boardgames */}
      {!searched && (
        <div>
          <h2 className="mb-4 text-sm font-semibold text-text-secondary">
            {t("popularBoardgamesTitle")}
          </h2>

          {popularLoading && (
            <div className="flex items-center justify-center gap-2 py-8">
              <SpinnerGap size={16} className="animate-spin text-text-muted" />
              <p className="text-xs text-text-muted">{t("suggestedLoading")}</p>
            </div>
          )}

          {!popularLoading && popularBoardgames.length === 0 && (
            <EmptyState title={t("popularBoardgamesEmpty")} />
          )}

          {!popularLoading && popularBoardgames.length > 0 && (
            <>
              <p className="mb-3 text-xs text-text-muted">
                {t("popularBoardgamesFallback")}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {popularBoardgames.map((bg) => {
                  const isAdded = addedBoardgameIds.has(bg.id);
                  return (
                    <div
                      key={bg.id}
                      className="group relative overflow-hidden rounded-lg border border-border bg-bg-surface transition-colors hover:border-border-hover"
                      onPointerEnter={(e) => {
                        if (e.pointerType === "mouse")
                          setActiveBoardgameId(bg.id);
                      }}
                      onPointerLeave={(e) => {
                        if (e.pointerType === "mouse")
                          setActiveBoardgameId(null);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveBoardgameId(bg.id);
                      }}
                    >
                      <div className="relative aspect-square w-full bg-bg-elevated">
                        {bg.thumbnail_url ? (
                          <Image
                            src={bg.thumbnail_url}
                            alt={bg.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, 17vw"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <PuzzlePiece
                              size={28}
                              className="text-text-faint"
                            />
                          </div>
                        )}
                        <div
                          className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/70 transition-opacity ${activeBoardgameId === bg.id || isAdded ? "opacity-100" : "pointer-events-none opacity-0"}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveBoardgameId(null);
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
                                  handleAddPopularBoardgame(bg);
                                }}
                                className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25"
                              >
                                <Plus size={13} weight="bold" />
                                {t("addToList")}
                              </button>
                              <Link
                                href={`/boardgames/${bg.id}`}
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
                          href={`/boardgames/${bg.id}`}
                          className="block truncate text-xs font-medium text-text-primary transition-colors hover:text-accent"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {bg.title}
                        </Link>
                        <p className="mt-0.5 text-[10px] text-text-faint">
                          {t("addedByCount", { count: bg.added_count })}
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
