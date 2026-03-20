"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getPosterUrl } from "@/lib/tmdb/client";
import { SearchInput } from "./SearchInput";
import { X, Plus, Television, SpinnerGap } from "@phosphor-icons/react";

type TMDBResult = {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  first_air_date: string;
  overview: string;
};

type AddShowDialogProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (show: TMDBResult) => void;
  existingTmdbIds?: number[];
  scoreMap?: Map<number, number>;
};

export function AddShowDialog({
  open,
  onClose,
  onAdd,
  existingTmdbIds = [],
  scoreMap,
}: AddShowDialogProps) {
  const t = useTranslations("shows");
  const [results, setResults] = useState<TMDBResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/tmdb/search?q=${encodeURIComponent(query)}`,
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
      <div className="relative w-full sm:mx-4 sm:max-w-lg rounded-t-[16px] sm:rounded-[var(--radius-lg)] border border-border bg-bg-surface max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-sm font-semibold text-text-primary">
            {t("addShow")}
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
            placeholder={t("searchShows")}
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
              {t("searchShows")}
            </div>
          )}

          {!loading &&
            results.map((show) => {
              const isAdded = existingTmdbIds.includes(show.tmdb_id);
              const posterUrl = getPosterUrl(show.poster_path, "w92");

              return (
                <button
                  key={show.tmdb_id}
                  onClick={() => !isAdded && onAdd(show)}
                  disabled={isAdded}
                  className="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-0 hover:bg-bg-surface-hover disabled:opacity-40"
                >
                  <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-bg-elevated">
                    {posterUrl ? (
                      <Image
                        src={posterUrl}
                        alt={show.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Television size={14} className="text-text-faint" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {show.title}
                    </p>
                    <p className="text-xs text-text-muted">
                      {show.first_air_date?.slice(0, 4) || "Unknown"}
                    </p>
                  </div>

                  {scoreMap?.has(show.tmdb_id) && (
                    <span className="shrink-0 rounded-[var(--radius-sm)] bg-accent-muted border border-accent/30 px-1.5 py-0.5 text-xs font-mono font-semibold text-accent tabular-nums">
                      {scoreMap.get(show.tmdb_id)}%
                    </span>
                  )}

                  {isAdded ? (
                    <span className="text-xs text-text-muted">Added</span>
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
