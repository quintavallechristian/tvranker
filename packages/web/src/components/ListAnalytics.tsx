"use client";

import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import {
  ArrowLeft,
  X,
  FilmStrip,
  Clock,
  Television,
} from "@phosphor-icons/react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { TAG_COLOR_HEX, type TagColor } from "@/lib/tag-colors";
import { getRatingLabel } from "@/lib/rating-labels";
import { ShowRow } from "@/components/ShowRow";
import type {
  AnalyticsData,
  ShowSummary,
} from "@/app/[locale]/(app)/lists/actions";

type Props = {
  data: AnalyticsData;
  ratingLabels?: string[] | null;
  backHref: string;
  itemType?: "show" | "movie";
  labels: {
    title: string;
    backToList: string;
    totalShows: string;
    ratedShows: string;
    avgRating: string;
    tagDistribution: string;
    ratingDistribution: string;
    noTags: string;
    noRatings: string;
    shows: string;
    emptyHint: string;
    avgRatingPerTag: string;
    addedOverTime: string;
    releaseDecades: string;
    avgRatingByDecade: string;
    backToDecades: string;
    noData: string;
    mostSeasonsShow: string;
    mostSeasonsByYear: string;
    longestShow: string;
    longestShowByYear: string;
    seasonsByYearTitle: string;
    noSeasonData: string;
  };
};

const RATING_BAR_COLOR = "#00d4aa";

function ShowStatRow({
  id,
  title,
  posterPath,
  badge,
  compact = false,
  itemType = "show",
}: {
  id: string;
  title: string;
  posterPath: string | null;
  badge: string;
  compact?: boolean;
  itemType?: "show" | "movie";
}) {
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w92${posterPath}`
    : null;

  return (
    <Link
      href={itemType === "movie" ? `/movies/${id}` : `/shows/${id}`}
      className={`flex items-center gap-2 rounded-md transition-colors hover:bg-bg-surface ${compact ? "" : "border border-border bg-bg-elevated px-2 py-1.5"}`}
    >
      {/* Poster thumbnail */}
      <div className="relative h-10 w-7 shrink-0 overflow-hidden rounded bg-bg-elevated">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="28px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Television size={12} className="text-text-faint" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <span className="block truncate text-[11px] font-medium text-text-primary leading-tight">
          {title}
        </span>
        <span className="font-mono text-[10px] text-text-muted">{badge}</span>
      </div>
    </Link>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-bg-surface p-4">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-text-faint">
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-2xl font-semibold tabular-nums text-text-primary">
          {value}
        </span>
        {sub && (
          <span className="font-mono text-xs text-text-muted">{sub}</span>
        )}
      </div>
    </div>
  );
}

export function ListAnalyticsPage({
  data,
  ratingLabels,
  backHref,
  labels,
  itemType = "show",
}: Props) {
  const tLists = useTranslations("lists");

  function formatDuration(totalMinutes: number): string {
    if (totalMinutes <= 0) return "—";
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;
    const parts: string[] = [];
    if (days > 0) parts.push(tLists("durationDays", { days }));
    if (hours > 0) parts.push(tLists("durationHours", { hours }));
    if (minutes > 0) parts.push(tLists("durationMinutes", { minutes }));
    return parts.join(" ") || "—";
  }

  const hasTagData = data.tagCounts.length > 0;
  const hasRatingData = data.ratingCounts.some((d) => d.count > 0);
  const ratedPct =
    data.totalCount > 0
      ? Math.round((data.ratedCount / data.totalCount) * 100)
      : 0;

  const ratingChartData = data.ratingCounts.map((d) => ({
    ...d,
    label: getRatingLabel(d.rating, ratingLabels),
  }));

  const [drillDecadeCount, setDrillDecadeCount] = useState<string | null>(null);
  const [drillDecadeRating, setDrillDecadeRating] = useState<string | null>(
    null,
  );
  const [modalData, setModalData] = useState<{
    title: string;
    shows: ShowSummary[];
  } | null>(null);

  const openModal = (title: string, shows: ShowSummary[]) => {
    if (shows.length > 0) setModalData({ title, shows });
  };

  const decadeCountDisplayData = drillDecadeCount
    ? data.yearCounts.filter(({ year }) => {
        const y = parseInt(year, 10);
        return `${Math.floor(y / 10) * 10}s` === drillDecadeCount;
      })
    : data.decadeCounts;

  const decadeRatingDisplayData = drillDecadeRating
    ? data.yearAvgRatings.filter(({ year }) => {
        const y = parseInt(year, 10);
        return `${Math.floor(y / 10) * 10}s` === drillDecadeRating;
      })
    : data.decadeAvgRatings;

  return (
    <div>
      {/* Back link */}
      <Link
        href={backHref}
        className="mb-6 inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-secondary"
      >
        <ArrowLeft size={13} />
        {labels.backToList}
      </Link>

      {/* Page title */}
      <h1 className="mb-6 text-xl font-semibold tracking-tight text-text-primary">
        {labels.title}
      </h1>

      {data.totalCount === 0 ? (
        <p className="text-sm text-text-muted">{labels.emptyHint}</p>
      ) : (
        <>
          {/* Stats row */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            <StatCard
              label={labels.totalShows}
              value={String(data.totalCount)}
            />
            <StatCard
              label={labels.ratedShows}
              value={String(data.ratedCount)}
              sub={`${ratedPct}%`}
            />
            <StatCard
              label={labels.avgRating}
              value={data.avgRating !== null ? String(data.avgRating) : "—"}
              sub={data.avgRating !== null ? "/10" : undefined}
            />
          </div>

          {/* Charts row 1 */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {/* Tag distribution */}
            <div className="rounded-lg border border-border bg-bg-surface p-4">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-faint">
                {labels.tagDistribution}
              </h3>
              {hasTagData ? (
                <div className="flex flex-col items-center gap-4">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={data.tagCounts}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={52}
                        outerRadius={90}
                        paddingAngle={2}
                        stroke="none"
                      >
                        {data.tagCounts.map((entry, idx) => (
                          <Cell
                            key={idx}
                            fill={
                              TAG_COLOR_HEX[entry.color as TagColor] ??
                              TAG_COLOR_HEX.slate
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--bg-elevated)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-md)",
                          fontSize: "12px",
                          color: "var(--text-primary)",
                        }}
                        formatter={(value) => [`${value} ${labels.shows}`]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
                    {data.tagCounts.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center gap-1.5 text-[11px] text-text-secondary"
                      >
                        <span
                          className="inline-block h-2 w-2 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              TAG_COLOR_HEX[entry.color as TagColor] ??
                              TAG_COLOR_HEX.slate,
                          }}
                        />
                        {entry.name}
                        <span className="font-mono text-text-muted">
                          {entry.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="py-14 text-center text-xs text-text-muted">
                  {labels.noTags}
                </p>
              )}
            </div>

            {/* Rating distribution */}
            <div className="rounded-lg border border-border bg-bg-surface p-4">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-faint">
                {labels.ratingDistribution}
              </h3>
              {hasRatingData ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={ratingChartData}
                    margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
                  >
                    <XAxis
                      dataKey="rating"
                      tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                      tickLine={false}
                      axisLine={{ stroke: "var(--border)" }}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--bg-elevated)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "12px",
                        color: "var(--text-primary)",
                      }}
                      formatter={(value, _name, props) => [
                        `${value} ${labels.shows}`,
                        (props as { payload?: { label?: string } })?.payload
                          ?.label ?? "",
                      ]}
                      labelFormatter={(rating) => `${rating}/10`}
                    />
                    <Bar
                      dataKey="count"
                      fill={RATING_BAR_COLOR}
                      radius={[3, 3, 0, 0]}
                      maxBarSize={40}
                      cursor="pointer"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onClick={(barData: any) => {
                        openModal(
                          `${barData.rating}/10`,
                          data.showsByRating[barData.rating] ?? [],
                        );
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="py-14 text-center text-xs text-text-muted">
                  {labels.noRatings}
                </p>
              )}
            </div>
          </div>

          {/* Charts row 2 */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {/* Avg rating per tag */}
            <div className="rounded-lg border border-border bg-bg-surface p-4">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-faint">
                {labels.avgRatingPerTag}
              </h3>
              {data.tagAvgRatings.length > 0 ? (
                <div className="space-y-3">
                  {data.tagAvgRatings.map((entry) => (
                    <div key={entry.id} className="flex items-center gap-3">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            TAG_COLOR_HEX[entry.color as TagColor] ??
                            TAG_COLOR_HEX.slate,
                        }}
                      />
                      <span className="w-24 shrink-0 truncate text-[11px] text-text-secondary">
                        {entry.name}
                      </span>
                      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-bg-elevated">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full transition-all"
                          style={{
                            width: `${(entry.avgRating / 10) * 100}%`,
                            backgroundColor:
                              TAG_COLOR_HEX[entry.color as TagColor] ??
                              TAG_COLOR_HEX.slate,
                          }}
                        />
                      </div>
                      <span className="w-8 shrink-0 text-right font-mono text-xs tabular-nums text-text-muted">
                        {entry.avgRating}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-14 text-center text-xs text-text-muted">
                  {labels.noData}
                </p>
              )}
            </div>

            {/* Decade distribution */}
            <div className="rounded-lg border border-border bg-bg-surface p-4">
              <div className="mb-4 flex items-center gap-2">
                {drillDecadeCount && (
                  <button
                    onClick={() => setDrillDecadeCount(null)}
                    className="inline-flex items-center gap-1 text-[11px] text-text-muted transition-colors hover:text-text-secondary"
                  >
                    <ArrowLeft size={11} />
                    {labels.backToDecades}
                  </button>
                )}
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-faint">
                  {drillDecadeCount ? drillDecadeCount : labels.releaseDecades}
                </h3>
              </div>
              {decadeCountDisplayData.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data={decadeCountDisplayData as any[]}
                    margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
                  >
                    <XAxis
                      dataKey={drillDecadeCount ? "year" : "decade"}
                      tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                      tickLine={false}
                      axisLine={{ stroke: "var(--border)" }}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--bg-elevated)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "12px",
                        color: "var(--text-primary)",
                      }}
                      formatter={(value) => [`${value} ${labels.shows}`]}
                    />
                    <Bar
                      dataKey="count"
                      fill="#818cf8"
                      radius={[3, 3, 0, 0]}
                      maxBarSize={40}
                      cursor="pointer"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onClick={(barData: any) => {
                        if (!drillDecadeCount && barData.decade) {
                          setDrillDecadeCount(barData.decade);
                        } else if (drillDecadeCount && barData.year) {
                          openModal(
                            barData.year,
                            data.showsByYear[barData.year] ?? [],
                          );
                        }
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="py-14 text-center text-xs text-text-muted">
                  {labels.noData}
                </p>
              )}
            </div>
          </div>

          {/* Charts row 3: Avg rating by decade */}
          <div className="mt-6 rounded-lg border border-border bg-bg-surface p-4">
            <div className="mb-4 flex items-center gap-2">
              {drillDecadeRating && (
                <button
                  onClick={() => setDrillDecadeRating(null)}
                  className="inline-flex items-center gap-1 text-[11px] text-text-muted transition-colors hover:text-text-secondary"
                >
                  <ArrowLeft size={11} />
                  {labels.backToDecades}
                </button>
              )}
              <h3 className="text-xs font-semibold uppercase tracking-widest text-text-faint">
                {drillDecadeRating
                  ? drillDecadeRating
                  : labels.avgRatingByDecade}
              </h3>
            </div>
            {decadeRatingDisplayData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  data={decadeRatingDisplayData as any[]}
                  margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
                >
                  <XAxis
                    dataKey={drillDecadeRating ? "year" : "decade"}
                    tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                    tickLine={false}
                    axisLine={{ stroke: "var(--border)" }}
                  />
                  <YAxis
                    domain={[0, 10]}
                    tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "12px",
                      color: "var(--text-primary)",
                    }}
                    formatter={(value) => [`${value}/10`]}
                  />
                  <Bar
                    dataKey="avgRating"
                    fill={RATING_BAR_COLOR}
                    radius={[3, 3, 0, 0]}
                    maxBarSize={40}
                    cursor="pointer"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={(barData: any) => {
                      if (!drillDecadeRating && barData.decade) {
                        setDrillDecadeRating(barData.decade);
                      } else if (drillDecadeRating && barData.year) {
                        openModal(
                          barData.year,
                          data.showsByYear[barData.year] ?? [],
                        );
                      }
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="py-14 text-center text-xs text-text-muted">
                {labels.noData}
              </p>
            )}
          </div>

          {/* Timeline: series added over time */}
          <div className="mt-6 rounded-lg border border-border bg-bg-surface p-4">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-faint">
              {labels.addedOverTime}
            </h3>
            {data.monthlyAdded.length > 1 ? (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  data={data.monthlyAdded}
                  margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
                >
                  <defs>
                    <linearGradient
                      id="timelineGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={RATING_BAR_COLOR}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={RATING_BAR_COLOR}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                    tickLine={false}
                    axisLine={{ stroke: "var(--border)" }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "12px",
                      color: "var(--text-primary)",
                    }}
                    formatter={(value) => [`${value} ${labels.shows}`]}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke={RATING_BAR_COLOR}
                    strokeWidth={2}
                    fill="url(#timelineGrad)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="py-14 text-center text-xs text-text-muted">
                {labels.noData}
              </p>
            )}
          </div>

          {/* Season & Duration stats */}
          {(data.mostSeasonsShow || data.longestShow) && (
            <div className="mt-6 space-y-4">
              {/* Overall winners row */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Most seasons overall */}
                {data.mostSeasonsShow && (
                  <div className="rounded-lg border border-border bg-bg-surface p-4">
                    <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-text-faint">
                      <FilmStrip size={13} />
                      {labels.mostSeasonsShow}
                    </h3>
                    <ShowStatRow
                      id={data.mostSeasonsShow.id}
                      title={data.mostSeasonsShow.title}
                      posterPath={data.mostSeasonsShow.poster_path}
                      badge={tLists("seasonCount", {
                        count: data.mostSeasonsShow.seasonCount,
                      })}
                    />
                  </div>
                )}

                {/* Longest overall */}
                {data.longestShow && (
                  <div className="rounded-lg border border-border bg-bg-surface p-4">
                    <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-text-faint">
                      <Clock size={13} />
                      {labels.longestShow}
                    </h3>
                    <ShowStatRow
                      id={data.longestShow.id}
                      title={data.longestShow.title}
                      posterPath={data.longestShow.poster_path}
                      badge={formatDuration(data.longestShow.totalMinutes)}
                      itemType={itemType}
                    />
                  </div>
                )}
              </div>

              {/* Per-year breakdown */}
              {data.longestShowByYear.length > 0 && (
                <div className="rounded-lg border border-border bg-bg-surface p-4">
                  <h3 className="mb-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-text-faint">
                    <Clock size={13} />
                    {labels.seasonsByYearTitle}
                  </h3>
                  <div className="max-h-[28rem] overflow-y-auto space-y-1">
                    {data.longestShowByYear.map(
                      ({
                        year,
                        id,
                        title,
                        poster_path,
                        totalMinutes,
                        seasonCount,
                      }) => {
                        const posterUrl = poster_path
                          ? `https://image.tmdb.org/t/p/w92${poster_path}`
                          : null;
                        return (
                          <Link
                            key={year}
                            href={
                              itemType === "movie"
                                ? `/movies/${id}`
                                : `/shows/${id}`
                            }
                            className="grid grid-cols-[3rem_2.5rem_1fr] items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-bg-elevated"
                          >
                            <span className="font-mono text-xs text-text-faint">
                              {year}
                            </span>
                            {/* Poster */}
                            <div className="relative h-10 w-7 overflow-hidden rounded bg-bg-elevated shrink-0">
                              {posterUrl ? (
                                <Image
                                  src={posterUrl}
                                  alt={title}
                                  fill
                                  className="object-cover"
                                  sizes="28px"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center">
                                  <Television
                                    size={12}
                                    className="text-text-faint"
                                  />
                                </div>
                              )}
                            </div>
                            {/* Title + stats */}
                            <div className="min-w-0">
                              <span className="block truncate text-[11px] font-medium text-text-primary leading-tight">
                                {title}
                              </span>
                              <span className="font-mono text-[10px] text-text-muted">
                                {formatDuration(totalMinutes)}
                                {itemType !== "movie" && (
                                  <>
                                    <span className="mx-1 text-text-faint">
                                      ·
                                    </span>
                                    {tLists("seasonCount", {
                                      count: seasonCount,
                                    })}
                                  </>
                                )}
                              </span>
                            </div>
                          </Link>
                        );
                      },
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Bar drill-through modal */}
      {modalData && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60"
          onClick={() => setModalData(null)}
        >
          <div
            className="relative w-full max-w-sm max-h-[75vh] flex flex-col rounded-xl border border-border bg-bg-elevated shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold text-text-primary">
                {modalData.title}
                <span className="ml-2 font-mono text-xs font-normal text-text-muted">
                  {modalData.shows.length}
                </span>
              </h2>
              <button
                onClick={() => setModalData(null)}
                className="text-text-muted transition-colors hover:text-text-primary"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            {/* List */}
            <div className="overflow-y-auto p-3">
              <DndContext>
                <div className="space-y-1.5">
                  {[...modalData.shows]
                    .sort((a, b) => {
                      if (a.rating === null && b.rating === null) return 0;
                      if (a.rating === null) return 1;
                      if (b.rating === null) return -1;
                      return b.rating - a.rating;
                    })
                    .map((show, i) => (
                      <ShowRow
                        key={show.id}
                        id={show.id}
                        title={show.title}
                        posterPath={show.poster_path}
                        rating={show.rating}
                        position={i + 1}
                        readOnly
                        showId={show.id}
                        detailHref={
                          itemType === "movie"
                            ? `/movies/${show.id}`
                            : undefined
                        }
                        ratingLabels={ratingLabels}
                      />
                    ))}
                </div>
              </DndContext>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
