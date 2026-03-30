"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getPosterUrl } from "@/lib/tmdb/client";
import { SearchInput } from "./SearchInput";
import { X, Plus, FilmSlate, SpinnerGap } from "@phosphor-icons/react";

type TMDBAnimeResult = {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  first_air_date: string;
  overview: string;
};

type AddAnimeDialogProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (anime: TMDBAnimeResult) => void;
  existingTmdbIds?: number[];
};

export function AddAnimeDialog({
  open,
  onClose,
  onAdd,
  existingTmdbIds = [],
}: AddAnimeDialogProps) {
  const t = useTranslations("anime");
  const [results, setResults] = useState<TMDBAnimeResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/tmdb/search-anime?q=${encodeURIComponent(query)}`,
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
            {t("addAnime")}
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
            placeholder={t("searchAnime")}
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
              {t("searchAnime")}
            </div>
          )}

          {!loading &&
            results.map((anime) => {
              const isAdded = existingTmdbIds.includes(anime.tmdb_id);
              const posterUrl = getPosterUrl(anime.poster_path, "w92");

              return (
                <button
                  key={anime.tmdb_id}
                  onClick={() => !isAdded && onAdd(anime)}
                  disabled={isAdded}
                  className="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-0 hover:bg-bg-surface-hover disabled:opacity-40"
                >
                  <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                    {posterUrl ? (
                      <Image
                        src={posterUrl}
                        alt={anime.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FilmSlate size={14} className="text-text-faint" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {anime.title}
                    </p>
                    <p className="text-xs text-text-muted">
                      {anime.first_air_date?.slice(0, 4) || "Unknown"}
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
