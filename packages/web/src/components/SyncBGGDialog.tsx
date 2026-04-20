"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  X,
  ArrowsClockwise,
  SpinnerGap,
  PuzzlePiece,
  Check,
} from "@phosphor-icons/react";

type BGGCollectionItem = {
  bggId: number;
  name: string;
  yearPublished?: number;
  thumbnail?: string;
  image?: string;
  userRating?: number;
  bggRating?: number;
  numPlays?: number;
  owned: boolean;
};

type SyncBGGDialogProps = {
  open: boolean;
  onClose: () => void;
  onSync: (
    bggUsername: string,
    mode: "merge" | "replace",
  ) => Promise<{ added: number; updated: number; skipped: number }>;
  savedBggUsername?: string | null;
};

export function SyncBGGDialog({
  open,
  onClose,
  onSync,
  savedBggUsername,
}: SyncBGGDialogProps) {
  const t = useTranslations("boardgames");
  const [username, setUsername] = useState(savedBggUsername ?? "");
  const [collection, setCollection] = useState<BGGCollectionItem[] | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"merge" | "replace">("merge");
  const [result, setResult] = useState<{
    added: number;
    updated: number;
    skipped: number;
  } | null>(null);

  const fetchCollection = useCallback(async () => {
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    setCollection(null);
    setResult(null);

    try {
      const res = await fetch(
        `/api/bgg/collection?username=${encodeURIComponent(username.trim())}`,
      );
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to fetch collection");
        return;
      }
      const data = await res.json();
      setCollection(data.items || []);
    } catch {
      setError("Failed to fetch collection");
    } finally {
      setLoading(false);
    }
  }, [username]);

  const handleSync = useCallback(async () => {
    setSyncing(true);
    setError(null);
    try {
      const syncResult = await onSync(username.trim(), mode);
      setResult(syncResult);
      setCollection(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sync failed");
    } finally {
      setSyncing(false);
    }
  }, [username, mode, onSync]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-start justify-center bg-black/60 sm:pt-[10vh] backdrop-blur-sm">
      <div className="relative w-full sm:mx-4 sm:max-w-lg rounded-t-2xl sm:rounded-lg border border-border bg-bg-surface max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-sm font-semibold text-text-primary">
            {t("syncBGG")}
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Success result */}
          {result && (
            <div className="rounded-md border border-accent/30 bg-accent/5 p-4 text-sm">
              <div className="flex items-center gap-2 mb-2">
                <Check size={16} className="text-accent" weight="bold" />
                <span className="font-medium text-text-primary">
                  {t("syncComplete")}
                </span>
              </div>
              <p className="text-text-secondary">
                {t("syncSummary", {
                  added: result.added,
                  updated: result.updated,
                  skipped: result.skipped,
                })}
              </p>
            </div>
          )}

          {/* Username input */}
          {!result && (
            <>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                  {t("bggUsername")}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="flex-1 rounded-md border border-border bg-transparent px-3 py-2 text-sm text-text-primary placeholder:text-text-faint focus:border-border-hover focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") fetchCollection();
                    }}
                  />
                  <button
                    onClick={fetchCollection}
                    disabled={loading || !username.trim()}
                    className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-accent-hover disabled:opacity-50"
                  >
                    {loading ? (
                      <SpinnerGap size={14} className="animate-spin" />
                    ) : (
                      <ArrowsClockwise size={14} />
                    )}
                    {t("fetchCollection")}
                  </button>
                </div>
                <p className="mt-1 text-[11px] text-text-faint">
                  {t("syncBGGDescription")}
                </p>
              </div>

              {error && (
                <div className="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Collection preview */}
              {collection && (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm text-text-secondary">
                      {t("collectionFound", { count: collection.length })}
                    </p>
                    <div className="flex items-center gap-2">
                      <select
                        value={mode}
                        onChange={(e) =>
                          setMode(e.target.value as "merge" | "replace")
                        }
                        className="rounded-md border border-border bg-transparent px-2 py-1 text-xs text-text-secondary"
                      >
                        <option value="merge">{t("modeMerge")}</option>
                        <option value="replace">{t("modeReplace")}</option>
                      </select>
                    </div>
                  </div>

                  {/* Preview list */}
                  <div className="max-h-75 overflow-y-auto rounded-md border border-border">
                    {collection.slice(0, 50).map((item) => (
                      <div
                        key={item.bggId}
                        className="flex items-center gap-2 border-b border-border px-3 py-2 last:border-0"
                      >
                        <div className="relative h-10 w-8 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                          {item.thumbnail ? (
                            <Image
                              src={item.thumbnail}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="32px"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <PuzzlePiece
                                size={12}
                                className="text-text-faint"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-xs font-medium text-text-primary">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-text-muted">
                            {item.yearPublished ?? ""}
                          </p>
                        </div>
                        {item.userRating != null && (
                          <span className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-[10px] font-semibold text-text-secondary">
                            {item.userRating}
                          </span>
                        )}
                      </div>
                    ))}
                    {collection.length > 50 && (
                      <div className="px-3 py-2 text-center text-[11px] text-text-faint">
                        +{collection.length - 50} more
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSync}
                    disabled={syncing}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md bg-accent px-3 py-2.5 text-sm font-medium text-black transition-colors hover:bg-accent-hover disabled:opacity-50"
                  >
                    {syncing ? (
                      <>
                        <SpinnerGap size={14} className="animate-spin" />
                        {t("syncing")}
                      </>
                    ) : (
                      <>
                        <ArrowsClockwise size={14} />
                        {t("syncNow")}
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
