"use client";

import { Television, FilmSlate, PuzzlePiece } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { GameController } from "@phosphor-icons/react";

export type CountTopic = "show" | "movie" | "anime" | "game" | "boardgame";

export function CountWidget({
  count,
  topic,
  href: hrefOverride,
}: {
  count: number;
  topic: CountTopic;
  href?: string;
}) {
  const t = useTranslations("home");

  const label =
    topic === "show"
      ? t("widgets.showCount")
      : topic === "movie"
        ? t("widgets.movieCount")
        : topic === "anime"
          ? t("widgets.animeCount")
          : topic === "game"
            ? t("widgets.gameCount")
            : t("widgets.boardgameCount");

  const defaultHref =
    topic === "show"
      ? "/shows"
      : topic === "movie"
        ? "/movies"
        : topic === "anime"
          ? "/anime"
          : topic === "game"
            ? "/games"
            : "/boardgames";

  const href = hrefOverride ?? defaultHref;

  const Icon =
    topic === "show"
      ? Television
      : topic === "movie"
        ? FilmSlate
        : topic === "anime"
          ? FilmSlate
          : topic === "game"
            ? GameController
            : PuzzlePiece;
  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between rounded-xl border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-muted">
          <Icon size={16} weight="duotone" className="text-accent" />
        </div>
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          {label}
        </p>
      </div>
      <p className="mt-3 text-3xl font-bold tabular-nums text-text-primary">
        {count}
      </p>
    </Link>
  );
}
