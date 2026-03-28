"use client";

import React from "react";
import { getPosterUrl } from "@/lib/tmdb/client";
import Image from "next/image";
import { Television } from "@phosphor-icons/react";
import type { ShowPodiumItem } from "@/app/[locale]/(app)/home/actions";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function ShowPodiumWidget({
  items,
  rowSpan = 1,
  viewAllHref,
  badge,
}: {
  items: ShowPodiumItem[];
  rowSpan?: 1 | 2;
  viewAllHref?: string;
  badge?: React.ReactNode;
}) {
  const t = useTranslations("home");

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg-surface p-4">
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          {rowSpan === 2 ? t("widgets.top10Show") : t("widgets.showPodium")}
        </p>
        {badge ?? (
          <Link
            href={viewAllHref ?? "/lists"}
            className="text-xs text-text-muted transition-colors hover:text-accent"
          >
            {t("widgets.viewAll")}
          </Link>
        )}
      </div>

      {items.length > 0 ? (
        <>
          {/* Compact podium — always visible at both heights */}
          <div className="flex shrink-0 items-end justify-center gap-4">
            {items[1] ? (
              <PodiumSlot
                item={items[1]}
                rank={2}
                posterHeight="h-14"
                rankColor="text-slate-400"
              />
            ) : (
              <div className="w-12" />
            )}
            <PodiumSlot
              item={items[0]}
              rank={1}
              posterHeight="h-20"
              rankColor="text-yellow-400"
              featured
            />
            {items[2] ? (
              <PodiumSlot
                item={items[2]}
                rank={3}
                posterHeight="h-10"
                rankColor="text-amber-600"
              />
            ) : (
              <div className="w-12" />
            )}
          </div>

          {/* Extended list — only visible at rowSpan=2 */}
          {rowSpan === 2 && items.length > 3 && (
            <div className="mt-3 flex-1 overflow-hidden border-t border-border pt-3">
              <div className="space-y-1 overflow-hidden">
                {items.slice(3, 10).map((item, i) => (
                  <RankRow key={item.id} item={item} rank={i + 4} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-6">
          <Television size={24} className="text-text-faint" />
          <p className="text-xs text-text-muted">{t("emptyList")}</p>
        </div>
      )}
    </div>
  );
}

function PodiumSlot({
  item,
  rank,
  posterHeight,
  rankColor,
  featured,
}: {
  item: ShowPodiumItem;
  rank: number;
  posterHeight: string;
  rankColor: string;
  featured?: boolean;
}) {
  const posterUrl = getPosterUrl(item.poster_path, "w92");

  return (
    <div className="flex w-12 flex-col items-center gap-1">
      <span className={`text-[10px] font-bold tabular-nums ${rankColor}`}>
        #{rank}
      </span>
      <div
        className={`relative w-full overflow-hidden rounded-md border bg-bg-elevated ${posterHeight} ${
          featured
            ? "border-accent/40 shadow-[0_0_12px_rgba(0,212,170,0.12)]"
            : "border-border"
        }`}
      >
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Television size={14} className="text-text-faint" />
          </div>
        )}
      </div>
      <p className="w-full truncate text-center text-[9px] leading-tight text-text-secondary">
        {item.title}
      </p>
    </div>
  );
}

function RankRow({ item, rank }: { item: ShowPodiumItem; rank: number }) {
  const posterUrl = getPosterUrl(item.poster_path, "w92");

  return (
    <div className="flex items-center gap-2 py-0.5">
      <span className="w-5 shrink-0 text-right text-[10px] tabular-nums text-text-faint">
        {rank}
      </span>
      <div className="relative h-7 w-5 shrink-0 overflow-hidden rounded border border-border bg-bg-elevated">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="20px"
          />
        ) : (
          <Television size={10} className="m-auto text-text-faint" />
        )}
      </div>
      <p className="min-w-0 flex-1 truncate text-[11px] text-text-primary">
        {item.title}
      </p>
      {item.rating != null && (
        <span className="shrink-0 font-mono text-[10px] font-medium tabular-nums text-accent">
          {item.rating}
        </span>
      )}
    </div>
  );
}
