"use client";

import { getPosterUrl } from "@/lib/tmdb/client";
import Image from "next/image";
import { Television, ArrowRight } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type RankingItem = {
  id: string;
  title: string;
  poster_path: string | null;
  rating: number | null;
  avg_rating?: number | null;
};

export function ShowRankingsWidget({ items }: { items: RankingItem[] }) {
  const t = useTranslations("home");

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          {t("widgets.showRankings")}
        </p>
        <Link
          href="/rankings"
          className="flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-accent"
        >
          {t("widgets.viewAll")}
          <ArrowRight size={10} />
        </Link>
      </div>

      {items.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          {items.map((item, i) => {
            const posterUrl = getPosterUrl(item.poster_path, "w92");
            return (
              <div
                key={item.id}
                className="flex items-center gap-2.5 rounded-md p-1.5 transition-colors hover:bg-bg-surface-hover"
              >
                <span
                  className={`w-4 shrink-0 text-center text-[10px] font-bold tabular-nums ${
                    i === 0
                      ? "text-yellow-500"
                      : i === 1
                        ? "text-slate-400"
                        : i === 2
                          ? "text-amber-600"
                          : "text-text-muted"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="relative h-9 w-6 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                  {posterUrl ? (
                    <Image
                      src={posterUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="24px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Television size={10} className="text-text-faint" />
                    </div>
                  )}
                </div>
                <p className="min-w-0 flex-1 truncate text-xs text-text-primary">
                  {item.title}
                </p>
                <span className="shrink-0 text-[10px] font-medium tabular-nums text-text-muted">
                  {item.avg_rating}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-4">
          <Television size={20} className="text-text-faint" />
          <p className="text-xs text-text-muted">{t("widgets.noRankings")}</p>
        </div>
      )}
    </div>
  );
}
