"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SearchInput } from "./SearchInput";
import { X, Plus, GameController, SpinnerGap } from "@phosphor-icons/react";

type IGDBGameResult = {
  igdb_id: number;
  title: string;
  cover_url: string | null;
  first_release_date: string | null;
  platforms: string[];
  genres: string[];
};

type AddGameDialogProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (game: IGDBGameResult) => void;
  existingIgdbIds?: number[];
  scoreMap?: Map<number, number>;
};

export function AddGameDialog({
  open,
  onClose,
  onAdd,
  existingIgdbIds = [],
  scoreMap,
}: AddGameDialogProps) {
  const t = useTranslations("games");
  const [results, setResults] = useState<IGDBGameResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/igdb/search?q=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-start justify-center bg-black/60 sm:pt-[10vh] backdrop-blur-sm">
      <div className="relative w-full sm:mx-4 sm:max-w-lg rounded-t-2xl sm:rounded-lg border border-border bg-bg-surface max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-sm font-semibold text-text-primary">
            {t("addGame")}
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          <SearchInput
            placeholder={t("searchGames")}
            onSearch={handleSearch}
            debounceMs={400}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="flex justify-center py-8">
              <SpinnerGap size={24} className="animate-spin text-text-muted" />
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="py-8 text-center text-sm text-text-muted">
              {t("searchGames")}
            </div>
          )}

          {!loading &&
            results.map((game) => {
              const isAdded = existingIgdbIds.includes(game.igdb_id);

              return (
                <button
                  key={game.igdb_id}
                  onClick={() => !isAdded && onAdd(game)}
                  disabled={isAdded}
                  className="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-0 hover:bg-bg-surface-hover disabled:opacity-40"
                >
                  <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                    {game.cover_url ? (
                      <Image
                        src={game.cover_url}
                        alt={game.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <GameController size={14} className="text-text-faint" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
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

                  {scoreMap?.has(game.igdb_id) && (
                    <span className="shrink-0 rounded-sm bg-accent-muted border border-accent/30 px-1.5 py-0.5 text-xs font-mono font-semibold text-accent tabular-nums">
                      {scoreMap.get(game.igdb_id)}%
                    </span>
                  )}

                  {isAdded ? (
                    <span className="text-xs text-text-muted">
                      {t("added")}
                    </span>
                  ) : (
                    <Plus size={16} className="shrink-0 text-accent" />
                  )}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
