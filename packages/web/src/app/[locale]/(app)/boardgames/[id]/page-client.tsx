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
  PuzzlePiece,
  Users,
  Clock,
  Scales,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { ShowAnalyticsSection } from "@/components/ShowAnalytics";
import type { ShowAnalyticsData } from "@/components/ShowAnalytics";
import { UserAvatar } from "@/components/UserAvatar";
import { addBggBoardgameToMyList, removeBoardgameFromList } from "../actions";

type BoardgameData = {
  id: string;
  bgg_id: number | null;
  title: string;
  thumbnail_url: string | null;
  image_url: string | null;
  year_published: number | null;
  description: string | null;
  min_players: number | null;
  max_players: number | null;
  playing_time: number | null;
  min_playtime: number | null;
  max_playtime: number | null;
  min_age: number | null;
  categories: { id: number; name: string }[] | null;
  mechanics: { id: number; name: string }[] | null;
  designers: { id: number; name: string }[] | null;
  bgg_rating: number | null;
  bgg_weight: number | null;
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

type BoardgameDetailClientProps = {
  boardgame: BoardgameData;
  stats: {
    listCount: number;
    avgRating: number | null;
    ratingCount: number;
  };
  publicLists: PublicList[];
  analyticsData: ShowAnalyticsData;
  userItem: { id: string; rating: number | null } | null;
  isLoggedIn: boolean;
  showScore?: number | null;
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

function decodeHtml(html: string): string {
  return html
    .replace(/&#10;/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "");
}

export function BoardgameDetailClient({
  boardgame,
  stats,
  publicLists,
  analyticsData,
  userItem: initialUserItem,
  isLoggedIn,
  showScore,
  analyticsLabels,
}: BoardgameDetailClientProps) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [inList, setInList] = useState(initialUserItem !== null);
  const [isPending, startTransition] = useTransition();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const imageUrl = boardgame.image_url || boardgame.thumbnail_url;

  const playersText =
    boardgame.min_players && boardgame.max_players
      ? boardgame.min_players === boardgame.max_players
        ? `${boardgame.min_players}`
        : `${boardgame.min_players}–${boardgame.max_players}`
      : boardgame.min_players
        ? `${boardgame.min_players}+`
        : null;

  const playtimeText =
    boardgame.min_playtime && boardgame.max_playtime
      ? boardgame.min_playtime === boardgame.max_playtime
        ? `${boardgame.min_playtime} min`
        : `${boardgame.min_playtime}–${boardgame.max_playtime} min`
      : boardgame.playing_time
        ? `${boardgame.playing_time} min`
        : null;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "info",
      label: t("boardgameDetail.tabInfo"),
      icon: <PuzzlePiece size={14} />,
    },
    {
      id: "stats",
      label: t("boardgameDetail.tabStats"),
      icon: <ChartBar size={14} />,
    },
  ];

  // Sort public lists: highest similarity first
  const sortedPublicLists = [...publicLists].sort((a, b) => {
    if (a.similarity !== null && b.similarity !== null)
      return b.similarity - a.similarity;
    if (a.similarity !== null) return -1;
    if (b.similarity !== null) return 1;
    return 0;
  });

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
        {/* Image */}
        <div className="relative aspect-[2/3] w-full shrink-0 self-start overflow-hidden rounded-lg border border-border bg-bg-elevated sm:w-44">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={boardgame.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 224px"
              priority
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <PuzzlePiece size={48} className="text-text-faint" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            {boardgame.title}
          </h1>

          {/* Meta row */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-muted">
            {boardgame.year_published && (
              <span>
                <span className="text-text-secondary">
                  {boardgame.year_published}
                </span>
              </span>
            )}
            {playersText && (
              <span className="flex items-center gap-1">
                <Users size={12} />
                {playersText} {t("boardgameDetail.players")}
              </span>
            )}
            {playtimeText && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {playtimeText}
              </span>
            )}
            {boardgame.bgg_weight && (
              <span className="flex items-center gap-1">
                <Scales size={12} />
                {boardgame.bgg_weight.toFixed(1)}/5
              </span>
            )}
          </div>

          {/* Categories */}
          {boardgame.categories && boardgame.categories.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {boardgame.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="inline-flex items-center rounded-md border border-border bg-bg-elevated px-2 py-0.5 text-xs text-text-muted"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* Stats badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            {stats.listCount > 0 && (
              <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-surface px-2.5 py-1.5 text-xs text-text-secondary">
                <ListBullets size={14} className="text-text-muted" />
                {t("boardgameDetail.inLists", { count: stats.listCount })}
              </div>
            )}
            {stats.avgRating !== null && (
              <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-surface px-2.5 py-1.5 text-xs text-text-secondary">
                <Star size={14} weight="fill" className="text-accent" />
                {stats.avgRating}/10
                <span className="text-text-faint">({stats.ratingCount})</span>
              </div>
            )}
            {boardgame.bgg_rating && (
              <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-surface px-2.5 py-1.5 text-xs text-text-secondary">
                <Star size={14} weight="fill" className="text-yellow-500" />
                BGG {boardgame.bgg_rating.toFixed(1)}
              </div>
            )}
            {initialUserItem?.rating != null && (
              <div className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-xs text-accent">
                <Star size={14} weight="fill" />
                {t("boardgameDetail.myRating")}: {initialUserItem.rating}/10
              </div>
            )}
            {showScore != null && (
              <div className="inline-flex items-center rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-xs font-mono font-bold text-accent tabular-nums">
                {showScore}%
              </div>
            )}
            {/* Add / Remove from list button */}
            {isLoggedIn && (
              <button
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    if (inList) {
                      if (initialUserItem) {
                        await removeBoardgameFromList(initialUserItem.id);
                      }
                      setInList(false);
                    } else {
                      if (boardgame.bgg_id) {
                        await addBggBoardgameToMyList({
                          bgg_id: boardgame.bgg_id,
                          title: boardgame.title,
                          thumbnail_url: boardgame.thumbnail_url,
                          year_published: boardgame.year_published,
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
                {inList
                  ? t("boardgameDetail.inMyList")
                  : t("boardgameDetail.addToList")}
              </button>
            )}
          </div>

          {/* Description */}
          {boardgame.description && (
            <div className="mt-6">
              <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
                {t("boardgameDetail.description")}
              </h2>
              <p
                className={`text-sm leading-relaxed text-text-secondary whitespace-pre-line ${
                  showFullDescription ? "" : "line-clamp-5"
                }`}
              >
                {decodeHtml(boardgame.description)}
              </p>
              <button
                onClick={() => setShowFullDescription((v) => !v)}
                className="mt-1.5 text-xs text-accent hover:underline"
              >
                {showFullDescription
                  ? t("boardgameDetail.readLess")
                  : t("boardgameDetail.readMore")}
              </button>
            </div>
          )}

          {/* Mechanics */}
          {boardgame.mechanics && boardgame.mechanics.length > 0 && (
            <div className="mt-4">
              <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
                {t("boardgameDetail.mechanics")}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {boardgame.mechanics.map((mech) => (
                  <span
                    key={mech.id}
                    className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[11px] text-text-muted"
                  >
                    {mech.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Designers */}
          {boardgame.designers && boardgame.designers.length > 0 && (
            <div className="mt-4">
              <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
                {t("boardgameDetail.designers")}
              </h2>
              <p className="text-sm text-text-secondary">
                {boardgame.designers.map((d) => d.name).join(", ")}
              </p>
            </div>
          )}

          {/* BGG link */}
          {boardgame.bgg_id && (
            <div className="mt-4">
              <a
                href={`https://boardgamegeek.com/boardgame/${boardgame.bgg_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-muted transition-colors hover:text-accent"
              >
                {t("boardgameDetail.viewOnBGG")} &rarr;
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
          {activeTab === "info" && (
            <div>
              {/* Public lists section */}
              {sortedPublicLists.length > 0 ? (
                <div>
                  <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-text-muted">
                    {t("boardgameDetail.usersWithThisBoardgame")}
                  </h3>
                  <div className="grid gap-2">
                    {sortedPublicLists.map((list) => (
                      <div
                        key={list.id}
                        className="flex items-center gap-3 rounded-md border border-border bg-bg-surface p-3"
                      >
                        <Link
                          href={`/users/${list.owner.username}`}
                          className="flex min-w-0 flex-1 items-center gap-2"
                        >
                          <UserAvatar
                            url={list.owner.avatarUrl}
                            username={list.owner.username}
                            size={28}
                          />
                          <span className="truncate text-sm text-text-primary">
                            @{list.owner.username}
                          </span>
                        </Link>
                        <div className="flex shrink-0 items-center gap-2">
                          {list.rating != null && (
                            <span className="font-mono text-xs tabular-nums text-accent">
                              {list.rating}/10
                            </span>
                          )}
                          {list.similarity != null && (
                            <span className="rounded-full border border-accent/30 bg-accent-muted px-2 py-0.5 text-[10px] font-semibold text-accent">
                              {list.similarity}%
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-text-muted">
                  {t("boardgameDetail.noPublicLists")}
                </p>
              )}
            </div>
          )}

          {activeTab === "stats" && (
            <ShowAnalyticsSection
              data={analyticsData}
              stats={stats}
              labels={analyticsLabels}
            />
          )}
        </div>
      </div>
    </div>
  );
}
