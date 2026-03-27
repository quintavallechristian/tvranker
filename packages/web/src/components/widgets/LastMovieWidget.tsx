"use client";

import { getPosterUrl } from "@/lib/tmdb/client";
import Image from "next/image";
import { FilmSlate, Star } from "@phosphor-icons/react";
import type { LastAddedMovie } from "@/app/[locale]/(app)/home/actions";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function LastMovieWidget({ item }: { item: LastAddedMovie | null }) {
  const t = useTranslations("home");

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-bg-surface p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-muted">
        {t("widgets.lastMovieAdded")}
      </p>

      {item ? (
        <Link
          href={`/movies/${item.id}`}
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
                <FilmSlate size={14} className="text-text-faint" />
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
          <FilmSlate size={20} className="text-text-faint" />
          <p className="text-xs text-text-muted">{t("emptyMovieList")}</p>
        </div>
      )}
    </div>
  );
}
