"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  UploadSimple,
  X,
  FileText,
  SpinnerGap,
  FilmStrip,
} from "@phosphor-icons/react";

type ImportMoviesDialogProps = {
  open: boolean;
  onClose: () => void;
  onImport: (data: unknown) => Promise<void>;
};

export function ImportMoviesDialog({
  open,
  onClose,
  onImport,
}: ImportMoviesDialogProps) {
  const t = useTranslations("importMovies");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<{
    movieCount: number;
    showsSkipped: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    setLoading(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleFileSelect = useCallback(
    async (selectedFile: File) => {
      setError(null);
      try {
        const text = await selectedFile.text();
        const { parseImdbMoviesCsv } =
          await import("@/lib/import/imdb-movies-parser");
        const parsed = parseImdbMoviesCsv(text);

        setFile(selectedFile);
        setPreview({
          movieCount: parsed.shows.length,
          showsSkipped: parsed.showsSkipped,
        });
      } catch {
        setError(t("invalidFormatCsv"));
      }
    },
    [t],
  );

  const handleImport = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const { parseImdbMoviesCsv } =
        await import("@/lib/import/imdb-movies-parser");
      const parsed = parseImdbMoviesCsv(text);
      const asJson = {
        name: parsed.name,
        description: parsed.description,
        is_public: parsed.is_public,
        shows: parsed.shows.map((s) => ({
          title: s.title,
          id: s.imdb_id ? { imdb: s.imdb_id } : undefined,
          score: s.score ?? undefined,
          added_at: s.added_at ?? undefined,
        })),
      };
      await onImport(asJson);
      handleClose();
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full sm:mx-4 sm:max-w-md rounded-t-2xl sm:rounded-lg border border-border bg-bg-surface p-6">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-text-muted hover:text-text-primary"
        >
          <X size={18} />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F5C518]/10 text-[#F5C518]">
            <FilmStrip size={22} weight="duotone" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              {t("imdbTitle")}
            </h2>
            <p className="text-sm text-text-secondary">
              {t("imdbDescription")}
            </p>
          </div>
        </div>

        {/* Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-md border-2 border-dashed border-border p-8 transition-colors hover:border-border-hover hover:bg-bg-surface-hover"
        >
          <UploadSimple size={28} className="text-text-muted" />
          <span className="text-sm text-text-secondary">
            {t("selectFileCsv")}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileSelect(f);
            }}
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="mt-4 flex items-center gap-3 rounded-md border border-border bg-bg-elevated p-3">
            <FileText size={20} className="text-accent" />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">
                {t("previewMovies", { count: preview.movieCount })}
              </p>
              {preview.showsSkipped > 0 && (
                <p className="text-xs text-text-muted">
                  {t("showsSkipped", { count: preview.showsSkipped })}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-3 text-xs text-error" role="alert">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="rounded-md px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleImport}
            disabled={!file || loading}
            className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg-primary transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {loading && <SpinnerGap size={14} className="animate-spin" />}
            {loading
              ? t("importing")
              : t("importButton", { count: preview?.movieCount ?? 0 })}
          </button>
        </div>
      </div>
    </div>
  );
}
