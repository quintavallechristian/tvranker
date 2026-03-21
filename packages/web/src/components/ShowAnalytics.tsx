"use client";

import {
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
import { getRatingLabel } from "@/lib/rating-labels";

export type ShowAnalyticsData = {
  ratingCounts: { rating: number; count: number }[];
  monthlyAdded: { month: string; count: number }[];
};

type Props = {
  data: ShowAnalyticsData;
  stats: {
    listCount: number;
    ratingCount: number;
    avgRating: number | null;
  };
  ratingLabels?: string[] | null;
  labels: {
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

export function ShowAnalyticsSection({
  data,
  stats,
  ratingLabels,
  labels,
}: Props) {
  const hasRatingData = data.ratingCounts.some((d) => d.count > 0);

  const ratingChartData = data.ratingCounts.map((d) => ({
    ...d,
    label: getRatingLabel(d.rating, ratingLabels),
  }));

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-faint">
        {labels.title}
      </h2>

      {/* Stats row */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <StatCard label={labels.inLists} value={String(stats.listCount)} />
        <StatCard label={labels.ratedBy} value={String(stats.ratingCount)} />
        <StatCard
          label={labels.avgRating}
          value={stats.avgRating !== null ? String(stats.avgRating) : "—"}
          sub={stats.avgRating !== null ? "/10" : undefined}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Rating distribution */}
        <div className="rounded-lg border border-border bg-bg-surface p-4">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-faint">
            {labels.ratingDistribution}
          </h3>
          {hasRatingData ? (
            <ResponsiveContainer width="100%" height={220}>
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
                    `${value} ${labels.users}`,
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

        {/* Added over time */}
        <div className="rounded-lg border border-border bg-bg-surface p-4">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-faint">
            {labels.addedOverTime}
          </h3>
          {data.monthlyAdded.length > 1 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={data.monthlyAdded}
                margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
              >
                <defs>
                  <linearGradient
                    id="showTimelineGrad"
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
                  fill="url(#showTimelineGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="py-14 text-center text-xs text-text-muted">
              {labels.noRatings}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
