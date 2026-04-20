"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { SearchInput } from "./SearchInput";
import { X, Plus, PuzzlePiece, SpinnerGap } from "@phosphor-icons/react";

type BGGBoardgameResult = {
  bgg_id: number;
  title: string;
  year_published: number | null;
  type: string;
};

type AddBoardgameDialogProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (boardgame: BGGBoardgameResult) => void;
  existingBggIds?: number[];
};

export function AddBoardgameDialog({
  open,
  onClose,
  onAdd,
  existingBggIds = [],
}: AddBoardgameDialogProps) {
  const t = useTranslations("boardgames");
  const [results, setResults] = useState<BGGBoardgameResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/bgg/search?q=${encodeURIComponent(query)}`);
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
            {t("addBoardgame")}
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
            placeholder={t("searchBoardgames")}
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
              {t("searchBoardgames")}
            </div>
          )}

          {!loading &&
            results.map((bg) => {
              const isAdded = existingBggIds.includes(bg.bgg_id);

              return (
                <button
                  key={bg.bgg_id}
                  onClick={() => !isAdded && onAdd(bg)}
                  disabled={isAdded}
                  className="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-0 hover:bg-bg-surface-hover disabled:opacity-40"
                >
                  <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-sm bg-bg-elevated flex items-center justify-center">
                    <PuzzlePiece size={14} className="text-text-faint" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {bg.title}
                    </p>
                    <p className="text-xs text-text-muted">
                      {bg.year_published ?? "Unknown"}
                    </p>
                  </div>

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
