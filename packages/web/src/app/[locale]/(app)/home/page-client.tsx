"use client";

import { useOptimistic, useTransition } from "react";
import { useTranslations } from "next-intl";
import {
  X,
  ArrowsOutLineHorizontal,
  ArrowsInLineHorizontal,
  ArrowsOutLineVertical,
  ArrowsInLineVertical,
} from "@phosphor-icons/react";
import type { HomeData } from "@/app/[locale]/(app)/home/actions";
import { saveWidgets } from "@/app/[locale]/(app)/home/actions";
import type { WidgetConfig, WidgetType } from "@/lib/widgets";
import {
  DEFAULT_WIDGETS,
  DEFAULT_COL_SPAN,
  DEFAULT_ROW_SPAN,
} from "@/lib/widgets";

import { PodiumWidget } from "@/components/widgets/PodiumWidget";
import { CountWidget } from "@/components/widgets/CountWidget";
import { LastSeenWidget } from "@/components/widgets/LastSeenWidget";
import { SuggestionsWidget } from "@/components/widgets/SuggestionsWidget";
import { NotificationsWidget } from "@/components/widgets/NotificationsWidget";
import { RecentFollowsWidget } from "@/components/widgets/RecentFollowsWidget";
import { WidgetPicker } from "@/components/widgets/WidgetPicker";
import { HomeWelcome } from "@/components/HomeWelcome";

export function HomeClient({ data }: { data: HomeData }) {
  const t = useTranslations("home");
  const [, startTransition] = useTransition();

  const savedWidgets = data.widgets.length > 0 ? data.widgets : DEFAULT_WIDGETS;

  const [widgets, setOptimisticWidgets] = useOptimistic(savedWidgets);

  function persistWidgets(next: WidgetConfig[]) {
    startTransition(async () => {
      setOptimisticWidgets(next);
      await saveWidgets(next);
    });
  }

  function addWidget(type: WidgetType) {
    const id = `w-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const next = [
      ...widgets,
      {
        id,
        type,
        colSpan: DEFAULT_COL_SPAN[type],
        rowSpan: DEFAULT_ROW_SPAN[type],
      },
    ];
    persistWidgets(next);
  }

  function removeWidget(id: string) {
    const next = widgets.filter((w) => w.id !== id);
    persistWidgets(next);
  }

  function toggleColSpan(id: string) {
    const next = widgets.map((w) =>
      w.id === id ? { ...w, colSpan: (w.colSpan === 1 ? 2 : 1) as 1 | 2 } : w,
    );
    persistWidgets(next);
  }

  function toggleRowSpan(id: string) {
    const next = widgets.map((w) =>
      w.id === id ? { ...w, rowSpan: (w.rowSpan === 1 ? 2 : 1) as 1 | 2 } : w,
    );
    persistWidgets(next);
  }

  function renderWidget(config: WidgetConfig) {
    switch (config.type) {
      case "show_podium":
        return (
          <PodiumWidget
            items={data.top10Shows}
            topic="show"
            rowSpan={config.rowSpan}
          />
        );
      case "movie_podium":
        return (
          <PodiumWidget
            items={data.top10Movies}
            topic="movie"
            rowSpan={config.rowSpan}
          />
        );
      case "anime_podium":
        return (
          <PodiumWidget
            items={data.top10Anime}
            topic="anime"
            rowSpan={config.rowSpan}
          />
        );
      case "game_podium":
        return (
          <PodiumWidget
            items={data.top10Games.map((g) => ({
              ...g,
              poster_path: null,
              imageUrl: g.cover_url,
            }))}
            topic="game"
            rowSpan={config.rowSpan}
          />
        );
      case "show_count":
        return <CountWidget count={data.showCount} topic="show" />;
      case "movie_count":
        return <CountWidget count={data.movieCount} topic="movie" />;
      case "anime_count":
        return <CountWidget count={data.animeCount} topic="anime" />;
      case "game_count":
        return (
          <CountWidget count={data.gameCount} topic="game" href="/games" />
        );
      case "last_show_added":
        return (
          <LastSeenWidget
            items={data.lastShows}
            topic="show"
            rowSpan={config.rowSpan}
          />
        );
      case "last_movie_added":
        return (
          <LastSeenWidget
            items={data.lastMovies}
            topic="movie"
            rowSpan={config.rowSpan}
          />
        );
      case "last_anime_added":
        return (
          <LastSeenWidget
            items={data.lastAnime}
            topic="anime"
            rowSpan={config.rowSpan}
          />
        );
      case "last_game_added":
        return (
          <LastSeenWidget
            items={data.lastGames.map((g) => ({
              ...g,
              poster_path: null,
              imageUrl: g.cover_url,
            }))}
            topic="game"
            rowSpan={config.rowSpan}
          />
        );
      case "notifications":
        return <NotificationsWidget items={data.notifications} />;
      case "recent_follows":
        return <RecentFollowsWidget items={data.recentFollows} />;
      case "show_suggestions":
        return <SuggestionsWidget items={data.suggestedShows} topic="show" />;
      case "movie_suggestions":
        return <SuggestionsWidget items={data.suggestedMovies} topic="movie" />;
      case "anime_suggestions":
        return <SuggestionsWidget items={data.suggestedAnime} topic="anime" />;
      case "game_suggestions":
        return <SuggestionsWidget items={data.suggestedGames} topic="game" />;
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome screen for new users with no content */}
      {data.showCount === 0 &&
      data.movieCount === 0 &&
      data.animeCount === 0 ? (
        <HomeWelcome username={data.username} />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mt-1 text-2xl font-bold text-text-primary">
                {t("welcome", { username: data.username })}
              </h1>
            </div>
            <WidgetPicker currentWidgets={widgets} onAdd={addWidget} />
          </div>
          {/* Widget grid — fixed row height so row-span-2 = exactly double */}
          {widgets.length > 0 ? (
            <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {widgets.map((config) => (
                <div
                  key={config.id}
                  className={`group relative ${
                    config.colSpan === 2 ? "col-span-2" : "col-span-1"
                  } ${config.rowSpan === 2 ? "row-span-2" : "row-span-1"}`}
                >
                  {/* Widget controls (always visible on mobile, hover on desktop) */}
                  <div className="absolute -top-2 right-1 z-10 flex gap-0.5 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                    <button
                      onClick={() => toggleColSpan(config.id)}
                      className="flex h-5 w-5 items-center justify-center rounded bg-bg-elevated text-text-muted shadow-sm transition-colors hover:bg-bg-surface-hover hover:text-text-primary"
                      title={
                        config.colSpan === 1
                          ? t("widgets.expand")
                          : t("widgets.shrink")
                      }
                    >
                      {config.colSpan === 1 ? (
                        <ArrowsOutLineHorizontal size={10} />
                      ) : (
                        <ArrowsInLineHorizontal size={10} />
                      )}
                    </button>
                    <button
                      onClick={() => toggleRowSpan(config.id)}
                      className="flex h-5 w-5 items-center justify-center rounded bg-bg-elevated text-text-muted shadow-sm transition-colors hover:bg-bg-surface-hover hover:text-text-primary"
                      title={
                        config.rowSpan === 1
                          ? t("widgets.expandHeight")
                          : t("widgets.shrinkHeight")
                      }
                    >
                      {config.rowSpan === 1 ? (
                        <ArrowsOutLineVertical size={10} />
                      ) : (
                        <ArrowsInLineVertical size={10} />
                      )}
                    </button>
                    <button
                      onClick={() => removeWidget(config.id)}
                      className="flex h-5 w-5 items-center justify-center rounded bg-bg-elevated text-text-muted shadow-sm transition-colors hover:bg-error/20 hover:text-error"
                      title={t("widgets.remove")}
                    >
                      <X size={10} weight="bold" />
                    </button>
                  </div>

                  {renderWidget(config)}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
              <p className="text-sm text-text-muted">
                {t("widgets.emptyDashboard")}
              </p>
              <WidgetPicker currentWidgets={widgets} onAdd={addWidget} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
