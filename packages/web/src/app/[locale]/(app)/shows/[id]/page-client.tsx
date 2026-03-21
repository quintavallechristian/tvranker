"use client";

import { useState } from "react";
import type { JSX } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  Star,
  ListBullets,
  Television,
  YoutubeLogo,
  FilmStrip,
  ChartBar,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { getPosterUrl } from "@/lib/tmdb/client";
import { ShowAnalyticsSection } from "@/components/ShowAnalytics";
import type { ShowAnalyticsData } from "@/components/ShowAnalytics";
import type {
  SeasonInfo,
  WatchProvider,
  WatchProviderRegion,
} from "@/lib/supabase/types";

type Tab = "seasons" | "trailer" | "stats";

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    let videoId: string | null = null;
    if (parsed.hostname.includes("youtube.com")) {
      videoId = parsed.searchParams.get("v");
    } else if (parsed.hostname === "youtu.be") {
      videoId = parsed.pathname.slice(1);
    }
    if (!videoId) return null;
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  } catch {
    return null;
  }
}

type ShowData = {
  id: string;
  tmdb_id: number | null;
  imdb_id: string | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
  tmdb_fetched: boolean;
  seasons_data: SeasonInfo[] | null;
  trailer_url: string | null;
  watch_providers: WatchProviderRegion | null;
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
  analyticsData: ShowAnalyticsData;
  analyticsLabels: {
    title: string;
    inLists: string;
    ratedBy: string;
    avgRating: string;
    ratingDistribution: string;
    noRatings: string;
    addedOverTime: string;
    shows: string;
    users: string;
  };
};

export function ShowDetailClient({
  show,
  stats,
  publicLists,
  analyticsData,
  analyticsLabels,
}: ShowDetailClientProps) {
  const t = useTranslations();
  const posterUrl = getPosterUrl(show.poster_path, "w500");
  const [activeTab, setActiveTab] = useState<Tab>("seasons");

  const tabs: { id: Tab; label: string; icon: JSX.Element }[] = [
    {
      id: "seasons",
      label: t("showDetail.tabSeasons"),
      icon: <FilmStrip size={14} />,
    },
    {
      id: "trailer",
      label: t("showDetail.tabTrailer"),
      icon: <YoutubeLogo size={14} />,
    },
    {
      id: "stats",
      label: t("showDetail.tabStats"),
      icon: <ChartBar size={14} />,
    },
  ];

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
              <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-surface px-2.5 py-1.5 text-xs text-text-secondary">
                <ListBullets size={14} className="text-text-muted" />
                {t("showDetail.inLists", { count: stats.listCount })}
              </div>
            )}
            {stats.avgRating !== null && (
              <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-surface px-2.5 py-1.5 text-xs text-text-secondary">
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

          {/* Dove guardare (moved here) */}
          {show.watch_providers && (
            <StreamingProvidersInline providers={show.watch_providers} />
          )}

          {/* TMDB link */}
          {show.tmdb_id && (
            <div className="mt-4">
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

      {/* Tabs */}
      <div className="mt-10">
        {/* Tab bar */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-px inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-accent text-text-primary"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {/* Stagioni */}
          {activeTab === "seasons" && (
            <div>
              {show.seasons_data && show.seasons_data.length > 0 ? (
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {show.seasons_data.map((season) => (
                    <div
                      key={season.season_number}
                      className="flex items-center justify-between rounded-md border border-border bg-bg-surface px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <span className="block truncate text-sm text-text-primary">
                          {season.name}
                        </span>
                        {season.air_date && (
                          <span className="text-xs text-text-faint">
                            {new Date(season.air_date).getFullYear()}
                          </span>
                        )}
                      </div>
                      <span className="ml-3 shrink-0 text-xs text-text-muted">
                        {t("showDetail.episodeCount", {
                          count: season.episode_count,
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted">
                  {t("showDetail.noSeasonsData")}
                </p>
              )}
            </div>
          )}

          {/* Trailer */}
          {activeTab === "trailer" && (
            <div>
              {show.trailer_url ? (
                (() => {
                  const embedUrl = getYouTubeEmbedUrl(show.trailer_url!);
                  return embedUrl ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] border border-border">
                      <iframe
                        src={embedUrl}
                        title={`${show.title} — Trailer`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                  ) : (
                    <a
                      href={show.trailer_url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-surface px-3 py-2 text-xs text-text-secondary transition-colors hover:border-border-hover hover:bg-bg-elevated hover:text-text-primary"
                    >
                      <YoutubeLogo
                        size={16}
                        weight="fill"
                        className="text-red-500"
                      />
                      {t("showDetail.watchTrailer")}
                    </a>
                  );
                })()
              ) : (
                <p className="text-sm text-text-muted">
                  {t("showDetail.noTrailer")}
                </p>
              )}
            </div>
          )}

          {/* Statistiche */}
          {activeTab === "stats" && (
            <div>
              {publicLists.length > 0 && (
                <div className="mb-10">
                  <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-text-muted">
                    {t("showDetail.publicListsTitle")}
                  </h2>
                  <div className="space-y-2">
                    {publicLists.map((list) => (
                      <Link
                        key={list.id}
                        href={`/lists/${list.id}`}
                        className="flex items-center justify-between rounded-md border border-border bg-bg-surface px-3 py-2.5 transition-colors hover:border-border-hover hover:bg-bg-elevated"
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <ListBullets
                            size={14}
                            className="shrink-0 text-text-muted"
                          />
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
                            <Star
                              size={12}
                              weight="fill"
                              className="text-accent"
                            />
                            {list.rating}/10
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <ShowAnalyticsSection
                data={analyticsData}
                stats={{
                  listCount: stats.listCount,
                  ratingCount: stats.ratingCount,
                  avgRating: stats.avgRating,
                }}
                labels={analyticsLabels}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const TMDB_LOGO_BASE = "https://image.tmdb.org/t/p/w92";

const PRIORITY_REGIONS = ["IT", "US", "GB", "DE", "FR", "ES", "JP"];

function getProviders(providers: WatchProviderRegion) {
  const regionKey =
    PRIORITY_REGIONS.find((r) => providers[r]) ?? Object.keys(providers)[0];
  if (!regionKey) return null;
  const region = providers[regionKey];
  const flatrate = region?.flatrate;
  if (!flatrate || flatrate.length === 0) return null;
  const seen = new Set<number>();
  const unique = flatrate.filter((p) => {
    if (seen.has(p.provider_id)) return false;
    seen.add(p.provider_id);
    return true;
  });
  return { unique, regionKey };
}

function StreamingProvidersInline({
  providers,
}: {
  providers: WatchProviderRegion;
}) {
  const t = useTranslations("showDetail");
  const result = getProviders(providers);
  if (!result) return null;
  const { unique, regionKey } = result;

  return (
    <div className="mt-6">
      <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
        {t("streamingTitle")}
      </h2>
      <div className="flex flex-wrap gap-2">
        {unique.map((p) => (
          <div
            key={p.provider_id}
            title={p.provider_name}
            className="flex items-center gap-1.5 rounded-md border border-border bg-bg-surface px-2.5 py-1.5"
          >
            {p.logo_path && (
              <Image
                src={`${TMDB_LOGO_BASE}${p.logo_path}`}
                alt={p.provider_name}
                width={18}
                height={18}
                className="rounded"
              />
            )}
            <span className="text-xs text-text-secondary">{p.provider_name}</span>
          </div>
        ))}
      </div>
      <p className="mt-1.5 text-[10px] text-text-faint">
        {t("streamingRegion", { region: regionKey })}
      </p>
    </div>
  );
}
