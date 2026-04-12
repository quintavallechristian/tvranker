"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { UploadSimple, X, FileText } from "@phosphor-icons/react";

type ImportMode = "merge" | "replace";
type DuplicateMode = "skip" | "update";
export type ImportOptions = { mode: ImportMode; duplicateMode: DuplicateMode };

type ImportAnimeDialogProps = {
  open: boolean;
  onClose: () => void;
  onImport: (data: unknown, options: ImportOptions) => Promise<void>;
};

export function ImportAnimeDialog({
  open,
  onClose,
  onImport,
}: ImportAnimeDialogProps) {
  const t = useTranslations("importAnime");
  const [file, setFile] = useState<File | null>(null);
  const [importMode, setImportMode] = useState<ImportMode>("merge");
  const [duplicateMode, setDuplicateMode] = useState<DuplicateMode>("skip");
  const [preview, setPreview] = useState<{
    animeCount: number;
    moviesSkipped: number;
    seasonsSkipped: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p;
        return p + Math.max(0.3, (90 - p) * 0.05);
      });
    }, 80);
    return () => clearInterval(interval);
  }, [loading]);

  const resetState = () => {
    setFile(null);
    setImportMode("merge");
    setDuplicateMode("skip");
    setPreview(null);
    setError(null);
    setLoading(false);
    setProgress(0);
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
        const { parseMalXml } = await import("@/lib/import/mal-parser");
        const parsed = parseMalXml(text);

        setFile(selectedFile);
        setPreview({
          animeCount: parsed.shows.length,
          moviesSkipped: parsed.moviesSkipped,
          seasonsSkipped: parsed.seasonsSkipped,
        });
      } catch {
        setError(t("invalidFormatXml"));
      }
    },
    [t],
  );

  const handleImport = async () => {
    if (!file) return;
    setLoading(true);
    setProgress(0);
    setError(null);

    try {
      const text = await file.text();
      const { parseMalXml } = await import("@/lib/import/mal-parser");
      const parsed = parseMalXml(text);
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
      await onImport(asJson, { mode: importMode, duplicateMode });
      setProgress(100);
      await new Promise((r) => setTimeout(r, 350));
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
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#2E51A2]/10 text-[#2E51A2]">
            <span className="text-base font-bold">MAL</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              {t("malTitle")}
            </h2>
            <p className="text-sm text-text-secondary">{t("malDescription")}</p>
          </div>
        </div>

        {/* Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-md border-2 border-dashed border-border p-8 transition-colors hover:border-border-hover hover:bg-bg-surface-hover"
        >
          <UploadSimple size={28} className="text-text-muted" />
          <span className="text-sm text-text-secondary">
            {t("selectFileXml")}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xml"
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
                {t("previewAnime", { count: preview.animeCount })}
              </p>
              {preview.moviesSkipped > 0 && (
                <p className="text-xs text-text-muted">
                  {t("moviesSkipped", { count: preview.moviesSkipped })}
                </p>
              )}
              {preview.seasonsSkipped > 0 && (
                <p className="text-xs text-text-muted">
                  {t("seasonsSkipped", { count: preview.seasonsSkipped })}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Import mode selector */}
        {preview && (
          <div className="mt-4 space-y-3">
            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-faint">
                {t("importMode")}
              </p>
              <div className="flex flex-col gap-1.5">
                {(["merge", "replace"] as ImportMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setImportMode(m)}
                    className={`flex items-start gap-3 rounded-md border px-3 py-2.5 text-left transition-colors ${
                      importMode === m
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-border-hover"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                        importMode === m
                          ? "border-accent bg-accent"
                          : "border-border"
                      }`}
                    >
                      {importMode === m && (
                        <span className="h-1.5 w-1.5 rounded-full bg-bg-primary" />
                      )}
                    </span>
                    <div>
                      <p className="text-xs font-medium text-text-primary">
                        {m === "merge" ? t("mergeLists") : t("replaceLists")}
                      </p>
                      <p className="text-[11px] text-text-muted">
                        {m === "merge" ? t("mergeListsDesc") : t("replaceListsDesc")}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {importMode === "merge" && (
              <div>
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-faint">
                  {t("duplicateHandling")}
                </p>
                <div className="flex flex-col gap-1.5">
                  {(["skip", "update"] as DuplicateMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setDuplicateMode(m)}
                      className={`flex items-start gap-3 rounded-md border px-3 py-2.5 text-left transition-colors ${
                        duplicateMode === m
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-border-hover"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                          duplicateMode === m
                            ? "border-accent bg-accent"
                            : "border-border"
                        }`}
                      >
                        {duplicateMode === m && (
                          <span className="h-1.5 w-1.5 rounded-full bg-bg-primary" />
                        )}
                      </span>
                      <div>
                        <p className="text-xs font-medium text-text-primary">
                          {m === "skip" ? t("skipDuplicates") : t("updateDuplicates")}
                        </p>
                        <p className="text-[11px] text-text-muted">
                          {m === "skip" ? t("skipDuplicatesDesc") : t("updateDuplicatesDesc")}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Progress bar */}
        {loading && (
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-text-faint">
              <span>{t("importing")}</span>
              <span className="font-mono">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
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
            {loading
              ? t("importing")
              : t("importButton", { count: preview?.animeCount ?? 0 })}
          </button>
        </div>
      </div>
    </div>
  );
}
