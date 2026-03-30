"use client";

import { getPosterUrl } from "@/lib/tmdb/client";
import Image from "next/image";
import { FilmSlate, ArrowRight } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export type AnimeSuggestionItem = {
  id: string;
  title: string;
  poster_path: string | null;
};

export function AnimeSuggestionsWidget({
  items,
}: {
  items: AnimeSuggestionItem[];
}) {
  const t = useTranslations("home");

  return (
    <Link
      href="/explore/anime"
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
    >
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          {t("widgets.animeSuggestions")}
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
            const posterUrl = getPosterUrl(item.poster_path, "w185");
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
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <FilmSlate size={16} className="text-text-faint" />
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
          <FilmSlate size={22} className="text-text-faint" />
          <p className="text-xs text-text-muted">
            {t("widgets.noSuggestions")}
          </p>
        </div>
      )}
    </Link>
  );
}
