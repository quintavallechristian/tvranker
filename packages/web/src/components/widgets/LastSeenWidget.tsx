"use client";

import { getPosterUrl } from "@/lib/tmdb/client";
import Image from "next/image";
import {
  Television,
  FilmSlate,
  Star,
  GameController,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export type LastSeenTopic = "show" | "movie" | "anime" | "game";

type LastItem = {
  id: string;
  title: string;
  poster_path: string | null;
  imageUrl?: string | null;
  rating: number | null;
  added_at: string;
};

function getItemHref(topic: LastSeenTopic, item: LastItem): string {
  if (topic === "show") return `/shows/${item.id}`;
  if (topic === "movie") return `/movies/${item.id}`;
  if (topic === "anime") return `/anime/${item.id}`;
  return `/games`;
}

function ItemRow({
  item,
  topic,
  compact,
}: {
  item: LastItem;
  topic: LastSeenTopic;
  compact: boolean;
}) {
  const Icon =
    topic === "show"
      ? Television
      : topic === "game"
        ? GameController
        : FilmSlate;
  const href = getItemHref(topic, item);
  const imageUrl = item.imageUrl ?? getPosterUrl(item.poster_path, "w185");

  if (compact) {
    return (
      <Link
        href={href}
        className="flex flex-1 items-center gap-3 transition-colors hover:opacity-80"
      >
        <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md border border-border bg-bg-elevated">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="44px"
              unoptimized={!!item.imageUrl}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Icon size={14} className="text-text-faint" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-text-primary">
            {item.title}
          </p>
          {item.rating && (
            <div className="mt-1 flex items-center gap-1">
              <Star size={12} weight="fill" className="text-yellow-400" />
              <span className="text-xs font-medium tabular-nums text-text-secondary">
                {item.rating}/10
              </span>
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-bg-surface-hover"
    >
      <div className="relative h-10 w-7 shrink-0 overflow-hidden rounded border border-border bg-bg-elevated">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="28px"
            unoptimized={!!item.imageUrl}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Icon size={10} className="text-text-faint" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-text-primary">
          {item.title}
        </p>
      </div>
      {item.rating && (
        <div className="flex shrink-0 items-center gap-1">
          <Star size={10} weight="fill" className="text-yellow-400" />
          <span className="text-[10px] font-medium tabular-nums text-text-secondary">
            {item.rating}
          </span>
        </div>
      )}
    </Link>
  );
}

export function LastSeenWidget({
  items,
  topic,
  rowSpan = 1,
}: {
  items: LastItem[];
  topic: LastSeenTopic;
  rowSpan?: 1 | 2;
}) {
  const t = useTranslations("home");

  const label =
    topic === "show"
      ? t("widgets.lastShowAdded")
      : topic === "movie"
        ? t("widgets.lastMovieAdded")
        : topic === "anime"
          ? t("widgets.lastAnimeAdded")
          : t("widgets.lastGameAdded");

  const Icon =
    topic === "show"
      ? Television
      : topic === "game"
        ? GameController
        : FilmSlate;

  const emptyText =
    topic === "show"
      ? t("emptyList")
      : topic === "movie"
        ? t("emptyMovieList")
        : topic === "anime"
          ? t("emptyAnimeList")
          : t("emptyGameList");

  const isExpanded = rowSpan === 2;

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-bg-surface p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-muted">
        {label}
      </p>

      {items.length > 0 ? (
        isExpanded ? (
          <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto">
            {items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                topic={topic}
                compact={false}
              />
            ))}
          </div>
        ) : (
          <ItemRow item={items[0]} topic={topic} compact />
        )
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-4">
          <Icon size={20} className="text-text-faint" />
          <p className="text-xs text-text-muted">{emptyText}</p>
        </div>
      )}
    </div>
  );
}
