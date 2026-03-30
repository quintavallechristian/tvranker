"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  Star,
  ListBullets,
  FilmStrip,
  YoutubeLogo,
  ChartBar,
  Clock,
  Plus,
  Check,
  SpinnerGap,
} from "@phosphor-icons/react";
import { getPosterUrl } from "@/lib/tmdb/client";
import { ShowAnalyticsSection } from "@/components/ShowAnalytics";
import type { ShowAnalyticsData } from "@/components/ShowAnalytics";
import type { WatchProvider, WatchProviderRegion } from "@/lib/supabase/types";
import { addAnimeToList, removeAnimeFromList } from "../actions";
import { Link } from "@/i18n/navigation";

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

type Tab = "trailer" | "stats";

type AnimeData = {
  id: string;
  tmdb_id: number | null;
  mal_id: number | null;
  imdb_id: string | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
  episode_count: number | null;
  status: string | null;
  tmdb_fetched: boolean;
  trailer_url: string | null;
  watch_providers: WatchProviderRegion | null;
};

type PublicList = {
  id: string;
  name: string;
  rating: number | null;
  similarity: number | null;
  owner: {
    username: string;
    avatarUrl: string | null;
  };
};

type AnimeDetailClientProps = {
  anime: AnimeData;
  stats: {
    listCount: number;
    avgRating: number | null;
    ratingCount: number;
  };
  publicLists: PublicList[];
  analyticsData: ShowAnalyticsData;
  userItem: { id: string; rating: number | null } | null;
  animeListId: string | null;
  isLoggedIn: boolean;
  animeScore?: number | null;
};

export function AnimeDetailClient({
  anime,
  stats,
  publicLists,
  analyticsData,
  userItem: initialUserItem,
  animeListId,
  isLoggedIn,
  animeScore,
}: AnimeDetailClientProps) {
  const t = useTranslations("animeDetail");
  const tCommon = useTranslations("common");
  const posterUrl = getPosterUrl(anime.poster_path, "w500");
  const [activeTab, setActiveTab] = useState<Tab>("trailer");
  const [inList, setInList] = useState(initialUserItem !== null);
  const [listItemId, setListItemId] = useState(initialUserItem?.id ?? null);
  const [isPending, startTransition] = useTransition();

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "trailer",
      label: t("tabTrailer"),
      icon: <YoutubeLogo size={14} />,
    },
    {
      id: "stats",
      label: t("tabStats"),
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
        {tCommon("back")}
      </button>

      {/* Main layout */}
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        {/* Poster */}
        <div className="relative aspect-2/3 w-full shrink-0 overflow-hidden rounded-lg border border-border bg-bg-elevated sm:w-56">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={anime.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 224px"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FilmStrip size={48} className="text-text-faint" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            {anime.title}
          </h1>

          {/* Meta row */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-muted">
            {anime.first_air_date && (
              <span>
                {t("releaseYear")}:{" "}
                <span className="text-text-secondary">
                  {new Date(anime.first_air_date).getFullYear()}
                </span>
              </span>
            )}
            {anime.episode_count && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                <span className="text-text-secondary">
                  {t("episodeCount", { count: anime.episode_count })}
                </span>
              </span>
            )}
            {anime.status && (
              <span className="text-text-faint">{anime.status}</span>
            )}
          </div>

          {/* Stats badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            {stats.listCount > 0 && (
              <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-surface px-2.5 py-1.5 text-xs text-text-secondary">
                <ListBullets size={14} className="text-text-muted" />
                {t("inLists", { count: stats.listCount })}
              </div>
            )}
            {stats.avgRating !== null && (
              <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-surface px-2.5 py-1.5 text-xs text-text-secondary">
                <Star size={14} weight="fill" className="text-accent" />
                {stats.avgRating}/10
                <span className="text-text-faint">({stats.ratingCount})</span>
              </div>
            )}
            {initialUserItem?.rating !== null &&
              initialUserItem?.rating !== undefined && (
                <div className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-xs text-accent">
                  <Star size={14} weight="fill" />
                  {t("myRating")}: {initialUserItem.rating}/10
                </div>
              )}
            {/* Recommendation score badge */}
            {animeScore !== null && animeScore !== undefined && (
              <div className="inline-flex items-center rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-xs font-mono font-bold text-accent tabular-nums">
                {animeScore}%
              </div>
            )}
            {/* Add / Remove from list button */}
            {isLoggedIn && animeListId && (
              <button
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    if (inList && listItemId) {
                      await removeAnimeFromList(listItemId);
                      setInList(false);
                      setListItemId(null);
                    } else {
                      await addAnimeToList(animeListId, {
                        tmdb_id: anime.tmdb_id ?? 0,
                        title: anime.title,
                        poster_path: anime.poster_path,
                        first_air_date: anime.first_air_date ?? undefined,
                        overview: anime.overview ?? undefined,
                      });
                      setInList(true);
                    }
                  });
                }}
                className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-60 ${
                  inList
                    ? "border-border bg-bg-surface text-text-secondary hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                    : "border-accent/40 bg-accent/10 text-accent hover:bg-accent/20"
                }`}
              >
                {isPending ? (
                  <SpinnerGap size={14} className="animate-spin" />
                ) : inList ? (
                  <Check size={14} weight="bold" />
                ) : (
                  <Plus size={14} weight="bold" />
                )}
                {inList ? t("inMyList") : t("addToList")}
              </button>
            )}
          </div>

          {/* Overview */}
          <div className="mt-6">
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("overview")}
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              {anime.overview || t("noOverview")}
            </p>
          </div>

          {/* Streaming providers */}
          {anime.watch_providers && (
            <StreamingProvidersInline providers={anime.watch_providers} />
          )}

          {/* TMDB link */}
          {anime.tmdb_id && (
            <div className="mt-4">
              <a
                href={`https://www.themoviedb.org/tv/${anime.tmdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-muted transition-colors hover:text-accent"
              >
                {t("viewOnTmdb")} &rarr;
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
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

        <div className="mt-6">
          {/* Trailer */}
          {activeTab === "trailer" && (
            <div>
              {anime.trailer_url ? (
                (() => {
                  const embedUrl = getYouTubeEmbedUrl(anime.trailer_url!);
                  return embedUrl ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
                      <iframe
                        src={embedUrl}
                        title={`${anime.title} — Trailer`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                  ) : (
                    <a
                      href={anime.trailer_url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-surface px-3 py-2 text-xs text-text-secondary transition-colors hover:border-border-hover hover:bg-bg-elevated hover:text-text-primary"
                    >
                      <YoutubeLogo
                        size={16}
                        weight="fill"
                        className="text-red-500"
                      />
                      {t("watchTrailer")}
                    </a>
                  );
                })()
              ) : (
                <p className="text-sm text-text-muted">{t("noTrailer")}</p>
              )}
            </div>
          )}

          {/* Stats */}
          {activeTab === "stats" && (
            <div>
              {publicLists.length > 0 && (
                <div className="mb-10">
                  <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-text-muted">
                    {t("publicListsTitle")}
                  </h2>
                  <div className="space-y-2">
                    {publicLists.map((list) => (
                      <Link
                        key={list.id}
                        href={`/users/${list.owner.username}`}
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
                        <div className="ml-3 flex shrink-0 items-center gap-2">
                          {list.similarity !== null && (
                            <span className="text-xs font-medium text-accent">
                              {list.similarity}%
                            </span>
                          )}
                          {list.rating !== null && (
                            <div className="flex items-center gap-1 text-xs text-text-secondary">
                              <Star
                                size={12}
                                weight="fill"
                                className="text-accent"
                              />
                              {list.rating}/10
                            </div>
                          )}
                        </div>
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
                labels={{
                  title: t("analyticsTitle"),
                  inLists: t("inLists", { count: stats.listCount }),
                  ratedBy: t("ratedBy"),
                  avgRating: t("avgRating"),
                  ratingDistribution: t("ratingDistribution"),
                  noRatings: t("noRatings"),
                  addedOverTime: t("addedOverTime"),
                  shows: t("adds"),
                  users: t("users"),
                }}
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
  const unique = flatrate.filter((p: WatchProvider) => {
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
  const t = useTranslations("animeDetail");
  const result = getProviders(providers);
  if (!result) return null;
  const { unique, regionKey } = result;

  return (
    <div className="mt-6">
      <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
        {t("streamingTitle")}
      </h2>
      <div className="flex flex-wrap gap-2">
        {unique.map((p: WatchProvider) => (
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
            <span className="text-xs text-text-secondary">
              {p.provider_name}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-1.5 text-[10px] text-text-faint">
        {t("streamingRegion", { region: regionKey })}
      </p>
    </div>
  );
}
