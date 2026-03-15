"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { UploadSimple, X, FileText, SpinnerGap } from "@phosphor-icons/react";

type ImportDialogProps = {
  open: boolean;
  onClose: () => void;
  onImport: (data: unknown) => Promise<void>;
};

export function ImportDialog({ open, onClose, onImport }: ImportDialogProps) {
  const t = useTranslations("import");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<{
    name: string;
    showCount: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    async (selectedFile: File) => {
      setError(null);
      try {
        const text = await selectedFile.text();
        const json = JSON.parse(text);

        // Accept Format A: { name, shows: [...] }  or  Format B: [ {...}, ... ]
        const isFormatA =
          json && !Array.isArray(json) && Array.isArray(json.shows);
        const isFormatB =
          Array.isArray(json) && json.length > 0 && json[0]?.title;

        if (!isFormatA && !isFormatB) {
          setError(t("invalidFormat"));
          return;
        }

        setFile(selectedFile);
        setPreview({
          name: isFormatA ? json.name || selectedFile.name : selectedFile.name,
          showCount: isFormatA ? json.shows.length : json.length,
        });
      } catch {
        setError(t("invalidFormat"));
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
      const json = JSON.parse(text);
      await onImport(json);
      onClose();
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full sm:mx-4 sm:max-w-md rounded-t-[16px] sm:rounded-[var(--radius-lg)] border border-border bg-bg-surface p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-text-muted hover:text-text-primary"
        >
          <X size={18} />
        </button>

        <h2 className="mb-1 text-lg font-semibold text-text-primary">
          {t("title")}
        </h2>
        <p className="mb-6 text-sm text-text-secondary">{t("description")}</p>

        {/* Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-[var(--radius-md)] border-2 border-dashed border-border p-8 transition-colors hover:border-border-hover hover:bg-bg-surface-hover"
        >
          <UploadSimple size={28} className="text-text-muted" />
          <span className="text-sm text-text-secondary">{t("selectFile")}</span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileSelect(f);
            }}
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="mt-4 flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-bg-elevated p-3">
            <FileText size={20} className="text-accent" />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">
                {preview.name}
              </p>
              <p className="text-xs text-text-secondary">
                {preview.showCount} shows
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
            onClick={onClose}
            className="rounded-[var(--radius-md)] px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
          >
            {t("cancel") || "Cancel"}
          </button>
          <button
            onClick={handleImport}
            disabled={!file || loading}
            className="flex items-center gap-2 rounded-[var(--radius-md)] bg-accent px-4 py-2 text-sm font-medium text-bg-primary transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {loading && <SpinnerGap size={14} className="animate-spin" />}
            {loading
              ? t("importing")
              : `Import ${preview?.showCount ?? 0} shows`}
          </button>
        </div>
      </div>
    </div>
  );
}
