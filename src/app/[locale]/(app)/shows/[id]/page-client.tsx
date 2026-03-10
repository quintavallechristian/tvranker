"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  Star,
  ListBullets,
  Television,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { getPosterUrl } from "@/lib/tmdb/client";

type ShowData = {
  id: string;
  tmdb_id: number | null;
  imdb_id: string | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
  tmdb_fetched: boolean;
};

type PublicList = {
  id: string;
  name: string;
  rating: number | null;
  owner: {
    username: string;
    avatarUrl: string | null;
  };
};

type ShowDetailClientProps = {
  show: ShowData;
  stats: {
    listCount: number;
    avgRating: number | null;
    ratingCount: number;
  };
  publicLists: PublicList[];
};

export function ShowDetailClient({
  show,
  stats,
  publicLists,
}: ShowDetailClientProps) {
  const t = useTranslations();
  const posterUrl = getPosterUrl(show.poster_path, "w500");

  return (
    <div>
      {/* Back link */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 inline-flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-text-secondary"
      >
        <ArrowLeft size={12} />
        {t("common.back")}
      </button>

      {/* Main layout */}
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        {/* Poster */}
        <div className="relative aspect-[2/3] w-full shrink-0 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg-elevated sm:w-56">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={show.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 224px"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Television size={48} className="text-text-faint" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            {show.title}
          </h1>

          {/* Meta row */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-muted">
            {show.first_air_date && (
              <span>
                {t("showDetail.firstAired")}:{" "}
                <span className="text-text-secondary">
                  {new Date(show.first_air_date).getFullYear()}
                </span>
              </span>
            )}
            {show.imdb_id && (
              <span className="font-mono text-text-faint">{show.imdb_id}</span>
            )}
          </div>

          {/* Stats badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            {stats.listCount > 0 && (
              <div className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-border bg-bg-surface px-2.5 py-1.5 text-xs text-text-secondary">
                <ListBullets size={14} className="text-text-muted" />
                {t("showDetail.inLists", { count: stats.listCount })}
              </div>
            )}
            {stats.avgRating !== null && (
              <div className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-border bg-bg-surface px-2.5 py-1.5 text-xs text-text-secondary">
                <Star size={14} weight="fill" className="text-accent" />
                {stats.avgRating}/10
                <span className="text-text-faint">({stats.ratingCount})</span>
              </div>
            )}
          </div>

          {/* Overview */}
          <div className="mt-6">
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("showDetail.overview")}
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              {show.overview || t("showDetail.noOverview")}
            </p>
          </div>

          {/* TMDB link */}
          {show.tmdb_id && (
            <div className="mt-6">
              <a
                href={`https://www.themoviedb.org/tv/${show.tmdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-muted transition-colors hover:text-accent"
              >
                View on TMDB &rarr;
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Public lists containing this show */}
      {publicLists.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-text-muted">
            {t("showDetail.publicListsTitle")}
          </h2>
          <div className="space-y-2">
            {publicLists.map((list) => (
              <Link
                key={list.id}
                href={`/lists/${list.id}`}
                className="flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-bg-surface px-3 py-2.5 transition-colors hover:border-border-hover hover:bg-bg-elevated"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <ListBullets size={14} className="shrink-0 text-text-muted" />
                  <div className="min-w-0">
                    <span className="block truncate text-sm text-text-primary">
                      {list.name}
                    </span>
                    <span className="text-xs text-text-faint">
                      @{list.owner.username}
                    </span>
                  </div>
                </div>
                {list.rating !== null && (
                  <div className="ml-3 flex shrink-0 items-center gap-1 text-xs text-text-secondary">
                    <Star size={12} weight="fill" className="text-accent" />
                    {list.rating}/10
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
