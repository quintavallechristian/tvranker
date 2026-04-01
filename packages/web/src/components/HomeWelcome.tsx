"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Television,
  FilmSlate,
  Users,
  Trophy,
  MagnifyingGlass,
} from "@phosphor-icons/react";

type HomeWelcomeProps = {
  username: string;
};

export function HomeWelcome({ username }: HomeWelcomeProps) {
  const t = useTranslations("home");

  const features = [
    {
      icon: <Trophy size={18} weight="duotone" />,
      title: t("welcomeFeature1Title"),
      body: t("welcomeFeature1Body"),
    },
    {
      icon: <Users size={18} weight="duotone" />,
      title: t("welcomeFeature2Title"),
      body: t("welcomeFeature2Body"),
    },
    {
      icon: <MagnifyingGlass size={18} weight="duotone" />,
      title: t("welcomeFeature3Title"),
      body: t("welcomeFeature3Body"),
    },
  ];

  return (
    <div className="flex flex-col gap-10 py-4">
      {/* Hero */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          {t("welcomeNew", { username })}
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          {t("welcomeNewSubtitle")}
        </p>
        <p className="mt-1 text-sm text-text-muted">{t("welcomeGetStarted")}</p>
      </div>

      {/* CTAs */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href="/shows"
          className="group flex items-center gap-4 rounded-xl border border-border bg-bg-surface p-5 transition-colors hover:border-brand/50 hover:bg-bg-surface-hover"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand/20">
            <Television size={20} weight="duotone" />
          </div>
          <div>
            <p className="font-medium text-text-primary">
              {t("welcomeAddShow")}
            </p>
            <p className="mt-0.5 text-xs text-text-muted">
              {t("welcomeAddShowSubtitle")}
            </p>
          </div>
        </Link>

        <Link
          href="/movies"
          className="group flex items-center gap-4 rounded-xl border border-border bg-bg-surface p-5 transition-colors hover:border-brand/50 hover:bg-bg-surface-hover"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand/20">
            <FilmSlate size={20} weight="duotone" />
          </div>
          <div>
            <p className="font-medium text-text-primary">
              {t("welcomeAddMovie")}
            </p>
            <p className="mt-0.5 text-xs text-text-muted">
              {t("welcomeAddMovieSubtitle")}
            </p>
          </div>
        </Link>
      </div>

      {/* Features */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
          {t("welcomeFeaturesTitle")}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-xl border border-border bg-bg-surface p-4"
            >
              <span className="text-brand">{f.icon}</span>
              <p className="text-sm font-medium text-text-primary">{f.title}</p>
              <p className="text-xs text-text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
