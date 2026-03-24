"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  UploadSimple,
  X,
  FileText,
  SpinnerGap,
  ArrowLeft,
  TelevisionSimple,
  FilmStrip,
} from "@phosphor-icons/react";

type ImportService = "tvtime" | "mal" | "imdb";

type ImportDialogProps = {
  open: boolean;
  onClose: () => void;
  onImport: (data: unknown) => Promise<void>;
};

export function ImportDialog({ open, onClose, onImport }: ImportDialogProps) {
  const t = useTranslations("import");
  const [service, setService] = useState<ImportService | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<{
    name: string;
    showCount: number;
    moviesSkipped: number;
    seasonsSkipped: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setService(null);
    setFile(null);
    setPreview(null);
    setError(null);
    setLoading(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleBack = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    setService(null);
  };

  const handleFileSelectTvTime = useCallback(
    async (selectedFile: File) => {
      setError(null);
      try {
        const text = await selectedFile.text();
        const json = JSON.parse(text);

        const isFormatA =
          json && !Array.isArray(json) && Array.isArray(json.shows);
        const isFormatB =
          Array.isArray(json) && json.length > 0 && json[0]?.title;

        if (!isFormatA && !isFormatB) {
          setError(t("invalidFormatJson"));
          return;
        }

        setFile(selectedFile);
        const moviesSkipped = isFormatA ? (json.movies?.length ?? 0) : 0;
        setPreview({
          name: isFormatA ? json.name || selectedFile.name : selectedFile.name,
          showCount: isFormatA ? json.shows.length : json.length,
          moviesSkipped,
          seasonsSkipped: 0,
        });
      } catch {
        setError(t("invalidFormatJson"));
      }
    },
    [t],
  );

  const handleFileSelectMal = useCallback(
    async (selectedFile: File) => {
      setError(null);
      try {
        const text = await selectedFile.text();
        const { parseMalXml } = await import("@/lib/import/mal-parser");
        const parsed = parseMalXml(text);

        setFile(selectedFile);
        setPreview({
          name: selectedFile.name,
          showCount: parsed.shows.length,
          moviesSkipped: parsed.moviesSkipped,
          seasonsSkipped: parsed.seasonsSkipped,
        });
      } catch {
        setError(t("invalidFormatXml"));
      }
    },
    [t],
  );

  const handleFileSelectImdb = useCallback(
    async (selectedFile: File) => {
      setError(null);
      try {
        const text = await selectedFile.text();
        const { parseImdbCsv } = await import("@/lib/import/imdb-parser");
        const parsed = parseImdbCsv(text);

        setFile(selectedFile);
        setPreview({
          name: selectedFile.name,
          showCount: parsed.shows.length,
          moviesSkipped: parsed.moviesSkipped,
          seasonsSkipped: parsed.seasonsSkipped,
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
      if (service === "mal") {
        const text = await file.text();
        const { parseMalXml } = await import("@/lib/import/mal-parser");
        const parsed = parseMalXml(text);
        // Keep MAL imports identifiable on the server side.
        const asJson = {
          name: parsed.name,
          description: parsed.description,
          is_public: parsed.is_public,
          shows: parsed.shows.map((s) => ({
            title: s.title,
            id: s.imdb_id ? { imdb: s.imdb_id } : undefined,
            score: s.score ?? undefined,
          })),
        };
        await onImport(asJson);
      } else if (service === "imdb") {
        const text = await file.text();
        const { parseImdbCsv } = await import("@/lib/import/imdb-parser");
        const parsed = parseImdbCsv(text);
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
      } else {
        const text = await file.text();
        const json = JSON.parse(text);
        await onImport(json);
      }
      handleClose();
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  // ── Service picker step ──
  if (!service) {
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="relative w-full sm:mx-4 sm:max-w-md rounded-t-[16px] sm:rounded-[var(--radius-lg)] border border-border bg-bg-surface p-6">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>

          <h2 className="mb-1 text-lg font-semibold text-text-primary">
            {t("title")}
          </h2>
          <p className="mb-6 text-sm text-text-secondary">
            {t("chooseService")}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setService("tvtime")}
              className="flex items-center gap-4 rounded-md border border-border p-4 text-left transition-colors hover:border-border-hover hover:bg-bg-surface-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#FFD12A]/10 text-[#FFD12A]">
                <TelevisionSimple size={22} weight="duotone" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">TV Time</p>
                <p className="text-xs text-text-secondary">{t("tvtimeDesc")}</p>
              </div>
            </button>

            <button
              onClick={() => setService("mal")}
              className="flex items-center gap-4 rounded-md border border-border p-4 text-left transition-colors hover:border-border-hover hover:bg-bg-surface-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#2E51A2]/10 text-[#2E51A2]">
                <span className="text-base font-bold">MAL</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  MyAnimeList
                </p>
                <p className="text-xs text-text-secondary">{t("malDesc")}</p>
              </div>
            </button>

            <button
              onClick={() => setService("imdb")}
              className="flex items-center gap-4 rounded-md border border-border p-4 text-left transition-colors hover:border-border-hover hover:bg-bg-surface-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F5C518]/10 text-[#F5C518]">
                <FilmStrip size={22} weight="duotone" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">IMDb</p>
                <p className="text-xs text-text-secondary">{t("imdbDesc")}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── File upload step ──
  const isImdb = service === "imdb";
  const isMal = service === "mal";
  const fileAccept = isImdb ? ".csv" : isMal ? ".xml" : ".json";
  const handleFileSelect = isImdb
    ? handleFileSelectImdb
    : isMal
      ? handleFileSelectMal
      : handleFileSelectTvTime;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full sm:mx-4 sm:max-w-md rounded-t-[16px] sm:rounded-[var(--radius-lg)] border border-border bg-bg-surface p-6">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="absolute left-4 top-4 text-text-muted hover:text-text-primary"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-text-muted hover:text-text-primary"
        >
          <X size={18} />
        </button>

        <h2 className="mb-1 text-lg font-semibold text-text-primary">
          {isImdb ? t("imdbTitle") : isMal ? t("malTitle") : t("tvtimeTitle")}
        </h2>
        <p className="mb-6 text-sm text-text-secondary">
          {isImdb
            ? t("imdbDescription")
            : isMal
              ? t("malDescription")
              : t("tvtimeDescription")}
        </p>

        {/* Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-md border-2 border-dashed border-border p-8 transition-colors hover:border-border-hover hover:bg-bg-surface-hover"
        >
          <UploadSimple size={28} className="text-text-muted" />
          <span className="text-sm text-text-secondary">
            {isImdb
              ? t("selectFileCsv")
              : isMal
                ? t("selectFileXml")
                : t("selectFileJson")}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept={fileAccept}
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
                {preview.name}
              </p>
              <p className="text-xs text-text-secondary">
                {t("previewShows", { count: preview.showCount })}
                {preview.moviesSkipped > 0 && (
                  <span className="ml-2 text-text-muted">
                    · {t("moviesSkipped", { count: preview.moviesSkipped })}
                  </span>
                )}
                {preview.seasonsSkipped > 0 && (
                  <span className="ml-2 text-text-muted">
                    · {t("seasonsSkipped", { count: preview.seasonsSkipped })}
                  </span>
                )}
              </p>
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
              : t("importButton", { count: preview?.showCount ?? 0 })}
          </button>
        </div>
      </div>
    </div>
  );
}
