"use client";

import { getPosterUrl } from "@/lib/tmdb/client";
import Image from "next/image";
import {
  Television,
  FilmSlate,
  ArrowRight,
  GameController,
  PuzzlePiece,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export type SuggestionsTopic =
  | "show"
  | "movie"
  | "anime"
  | "game"
  | "boardgame";

type SuggestionItem = {
  id: string;
  title: string;
  poster_path: string | null;
  imageUrl?: string | null;
};

export function SuggestionsWidget({
  items,
  topic,
}: {
  items: SuggestionItem[];
  topic: SuggestionsTopic;
}) {
  const t = useTranslations("home");

  const label =
    topic === "show"
      ? t("widgets.showSuggestions")
      : topic === "movie"
        ? t("widgets.movieSuggestions")
        : topic === "anime"
          ? t("widgets.animeSuggestions")
          : topic === "game"
            ? t("widgets.gameSuggestions")
            : t("widgets.boardgameSuggestions");

  const href =
    topic === "show"
      ? "/explore/shows"
      : topic === "movie"
        ? "/explore/movies"
        : topic === "anime"
          ? "/explore/anime"
          : topic === "game"
            ? "/explore/games"
            : "/explore/boardgames";

  const Icon =
    topic === "show"
      ? Television
      : topic === "game"
        ? GameController
        : topic === "boardgame"
          ? PuzzlePiece
          : FilmSlate;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
    >
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          {label}
        </p>
        <span className="flex items-center gap-1 text-xs text-text-muted transition-colors group-hover:text-accent">
          {t("widgets.explore")}
          <ArrowRight
            size={12}
            weight="bold"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>

      {items.length > 0 ? (
        <div className="flex flex-1 gap-2">
          {items.slice(0, 3).map((item) => {
            const posterUrl =
              item.imageUrl ?? getPosterUrl(item.poster_path, "w185");
            return (
              <div
                key={item.id}
                className="flex-1 overflow-hidden rounded-md border border-border bg-bg-elevated"
              >
                <div className="relative aspect-2/3 w-full">
                  {posterUrl ? (
                    <Image
                      src={posterUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="20vw"
                      unoptimized={!!item.imageUrl}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Icon size={16} className="text-text-faint" />
                    </div>
                  )}
                </div>
                <p className="truncate px-1.5 py-1 text-[9px] leading-tight text-text-secondary">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-6">
          <Icon size={22} className="text-text-faint" />
          <p className="text-xs text-text-muted">
            {t("widgets.noSuggestions")}
          </p>
        </div>
      )}
    </Link>
  );
}
