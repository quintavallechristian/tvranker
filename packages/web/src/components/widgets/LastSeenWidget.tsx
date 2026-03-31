"use client";

import { getPosterUrl } from "@/lib/tmdb/client";
import Image from "next/image";
import { Television, FilmSlate, Star } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export type LastSeenTopic = "show" | "movie" | "anime";

type LastItem = {
  id: string;
  title: string;
  poster_path: string | null;
  rating: number | null;
  added_at: string;
};

export function LastSeenWidget({
  item,
  topic,
}: {
  item: LastItem | null;
  topic: LastSeenTopic;
}) {
  const t = useTranslations("home");

  const label =
    topic === "show"
      ? t("widgets.lastShowAdded")
      : topic === "movie"
        ? t("widgets.lastMovieAdded")
        : t("widgets.lastAnimeAdded");

  const itemHref = item
    ? topic === "show"
      ? `/shows/${item.id}`
      : topic === "movie"
        ? `/movies/${item.id}`
        : `/anime/${item.id}`
    : "#";

  const Icon = topic === "show" ? Television : FilmSlate;

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-bg-surface p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-muted">
        {label}
      </p>

      {item ? (
        <Link
          href={itemHref}
          className="flex flex-1 items-center gap-3 transition-colors hover:opacity-80"
        >
          <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md border border-border bg-bg-elevated">
            {getPosterUrl(item.poster_path, "w185") ? (
              <Image
                src={getPosterUrl(item.poster_path, "w185")!}
                alt={item.title}
                fill
                className="object-cover"
                sizes="44px"
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
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-4">
          <Icon size={20} className="text-text-faint" />
          <p className="text-xs text-text-muted">
            {topic === "show"
              ? t("emptyList")
              : topic === "movie"
                ? t("emptyMovieList")
                : t("emptyAnimeList")}
          </p>
        </div>
      )}
    </div>
  );
}
