"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  Star,
  ListBullets,
  ChartBar,
  Plus,
  Check,
  SpinnerGap,
  GameController,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { ShowAnalyticsSection } from "@/components/ShowAnalytics";
import type { ShowAnalyticsData } from "@/components/ShowAnalytics";
import { UserAvatar } from "@/components/UserAvatar";
import { addTmdbGameToMyList, removeGameFromList } from "../actions";

type GameData = {
  id: string;
  igdb_id: number | null;
  title: string;
  cover_url: string | null;
  first_release_date: string | null;
  overview: string | null;
  platforms: { id: number; name: string }[] | null;
  genres: { id: number; name: string }[] | null;
  url: string | null;
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

type Tab = "info" | "stats";

type GameDetailClientProps = {
  game: GameData;
  stats: {
    listCount: number;
    avgRating: number | null;
    ratingCount: number;
  };
  publicLists: PublicList[];
  analyticsData: ShowAnalyticsData;
  userItem: { id: string; rating: number | null } | null;
  isLoggedIn: boolean;
  gameScore?: number | null;
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

export function GameDetailClient({
  game,
  stats,
  publicLists,
  analyticsData,
  userItem: initialUserItem,
  isLoggedIn,
  gameScore,
  analyticsLabels,
}: GameDetailClientProps) {
  const t = useTranslations("gameDetail");
  const tCommon = useTranslations("common");
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [inList, setInList] = useState(initialUserItem !== null);
  const [isPending, startTransition] = useTransition();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "info",
      label: t("tabInfo"),
      icon: <GameController size={14} />,
    },
    {
      id: "stats",
      label: t("tabStats"),
      icon: <ChartBar size={14} />,
    },
  ];

  const sortedPublicLists = [...publicLists].sort((a, b) => {
    if (a.similarity !== null && b.similarity !== null)
      return b.similarity - a.similarity;
    if (a.similarity !== null) return -1;
    if (b.similarity !== null) return 1;
    return 0;
  });

  return (
    <div>
      <button
        onClick={() => window.history.back()}
        className="mb-6 inline-flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-text-secondary"
      >
        <ArrowLeft size={12} />
        {tCommon("back")}
      </button>

      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <div className="relative aspect-2/3 w-full shrink-0 self-start overflow-hidden rounded-lg border border-border bg-bg-elevated sm:w-44">
          {game.cover_url ? (
            <Image
              src={game.cover_url}
              alt={game.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 224px"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <GameController size={48} className="text-text-faint" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            {game.title}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-muted">
            {game.first_release_date && (
              <span>
                {t("releaseYear")}:{" "}
                {new Date(game.first_release_date).getFullYear()}
              </span>
            )}
            {game.igdb_id && (
              <span className="font-mono text-text-faint">
                IGDB #{game.igdb_id}
              </span>
            )}
          </div>

          {game.platforms && game.platforms.length > 0 && (
            <div className="mt-3">
              <h2 className="mb-1 text-xs font-medium uppercase tracking-wider text-text-muted">
                {t("platforms")}
              </h2>
              <p className="text-sm text-text-secondary">
                {game.platforms.map((p) => p.name).join(", ")}
              </p>
            </div>
          )}

          {game.genres && game.genres.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {game.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="inline-flex items-center rounded-md border border-border bg-bg-elevated px-2 py-0.5 text-xs text-text-muted"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

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
            {initialUserItem?.rating != null && (
              <div className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-xs text-accent">
                <Star size={14} weight="fill" />
                {t("myRating")}: {initialUserItem.rating}/10
              </div>
            )}
            {gameScore != null && (
              <div className="inline-flex items-center rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-xs font-mono font-bold text-accent tabular-nums">
                {gameScore}%
              </div>
            )}
            {isLoggedIn && (
              <button
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    if (inList) {
                      if (initialUserItem) {
                        await removeGameFromList(initialUserItem.id);
                      }
                      setInList(false);
                    } else {
                      if (game.igdb_id) {
                        await addTmdbGameToMyList({
                          igdb_id: game.igdb_id,
                          title: game.title,
                          cover_url: game.cover_url,
                          first_release_date: game.first_release_date,
                          overview: game.overview,
                          platforms: game.platforms?.map((p) => p.name),
                          genres: game.genres?.map((g) => g.name),
                        });
                      }
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

          <div className="mt-6">
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("overview")}
            </h2>
            <p
              className={`text-sm leading-relaxed text-text-secondary ${
                showFullDescription ? "" : "line-clamp-5"
              }`}
            >
              {game.overview || t("noOverview")}
            </p>
            {game.overview && (
              <button
                onClick={() => setShowFullDescription((v) => !v)}
                className="mt-1.5 text-xs text-accent hover:underline"
              >
                {showFullDescription ? t("readLess") : t("readMore")}
              </button>
            )}
          </div>

          {game.url && (
            <div className="mt-4">
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-muted transition-colors hover:text-accent"
              >
                {t("viewOnIgdb")} &rarr;
              </a>
            </div>
          )}
        </div>
      </div>

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
          {activeTab === "info" && <div />}

          {activeTab === "stats" && (
            <div>
              {sortedPublicLists.length > 0 ? (
                <div className="mb-10">
                  <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-text-muted">
                    {t("publicListsTitle")}
                  </h3>
                  <div className="grid gap-2">
                    {sortedPublicLists.map((list) => (
                      <div
                        key={list.id}
                        className="flex items-center gap-3 rounded-md border border-border bg-bg-surface p-3"
                      >
                        <Link
                          href={`/games/lists/${list.id}`}
                          className="flex min-w-0 flex-1 items-center gap-2"
                        >
                          <UserAvatar
                            url={list.owner.avatarUrl}
                            username={list.owner.username}
                            size={28}
                          />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-text-primary">
                              @{list.owner.username}
                            </p>
                            <p className="truncate text-xs text-text-muted">
                              {list.name}
                            </p>
                          </div>
                        </Link>

                        <div className="flex items-center gap-2">
                          {list.rating !== null && (
                            <span className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs text-text-secondary">
                              <Star
                                size={12}
                                className="mr-1 text-accent"
                                weight="fill"
                              />
                              {list.rating}/10
                            </span>
                          )}
                          {list.similarity !== null && (
                            <span className="inline-flex items-center rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-mono font-semibold text-accent">
                              {list.similarity}%
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-text-muted">{t("noPublicLists")}</p>
              )}
              <ShowAnalyticsSection
                data={analyticsData}
                stats={stats}
                labels={analyticsLabels}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
