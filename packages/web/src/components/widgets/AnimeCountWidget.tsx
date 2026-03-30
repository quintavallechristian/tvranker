"use client";

import { FilmSlate } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function AnimeCountWidget({ count }: { count: number }) {
  const t = useTranslations("home");

  return (
    <Link
      href="/anime"
      className="group flex h-full flex-col justify-between rounded-xl border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-muted">
          <FilmSlate size={16} weight="duotone" className="text-accent" />
        </div>
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          {t("widgets.animeCount")}
        </p>
      </div>
      <p className="mt-3 text-3xl font-bold tabular-nums text-text-primary">
        {count}
      </p>
    </Link>
  );
}
