"use client";

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
} from "recharts";
import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { TAG_COLOR_HEX, type TagColor } from "@/lib/tag-colors";
import { getRatingLabel } from "@/lib/rating-labels";
import type { AnalyticsData } from "@/app/[locale]/(app)/lists/actions";

type Props = {
  data: AnalyticsData;
  ratingLabels?: string[] | null;
  backHref: string;
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
  };
};

const RATING_BAR_COLOR = "#00d4aa";

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

export function ListAnalyticsPage({ data, ratingLabels, backHref, labels }: Props) {
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

          {/* Charts */}
          <div className="grid gap-6 sm:grid-cols-2">
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
        </>
      )}
    </div>
  );
}
