import { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Svg, { Circle, G, Rect, Line, Text as SvgText, Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";
import { getPosterUrl, getRatingLabel, TAG_COLOR_HEX, type TagColor } from "@tvranker/shared";

const ACCENT = "#00d4aa";
const BG = "#0a0a0b";
const SURFACE = "#141416";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT_PRIMARY = "#f0f0f0";
const TEXT_MUTED = "#6b6b74";
const TEXT_FAINT = "#505058";
const RATING_BAR = "#00d4aa";
const DECADE_BAR = "#818cf8";
const SCREEN_WIDTH = Dimensions.get("window").width;

// ─── Types ────────────────────────────────────────────────────────────────────

type ShowSummary = {
  id: string;
  title: string;
  poster_path: string | null;
  rating: number | null;
  first_air_date: string | null;
};

type AnalyticsData = {
  totalCount: number;
  ratedCount: number;
  avgRating: number | null;
  ratingCounts: { rating: number; count: number }[];
  tagCounts: { id: string; name: string; color: string; count: number }[];
  tagAvgRatings: {
    id: string;
    name: string;
    color: string;
    avgRating: number;
    count: number;
  }[];
  monthlyAdded: { month: string; count: number }[];
  decadeCounts: { decade: string; count: number }[];
  yearCounts: { year: string; count: number }[];
  decadeAvgRatings: { decade: string; avgRating: number }[];
  yearAvgRatings: { year: string; avgRating: number }[];
  showsByRating: Record<number, ShowSummary[]>;
  showsByYear: Record<string, ShowSummary[]>;
};

const EMPTY_ANALYTICS: AnalyticsData = {
  totalCount: 0,
  ratedCount: 0,
  avgRating: null,
  ratingCounts: Array.from({ length: 10 }, (_, i) => ({ rating: i + 1, count: 0 })),
  tagCounts: [],
  tagAvgRatings: [],
  monthlyAdded: [],
  decadeCounts: [],
  yearCounts: [],
  decadeAvgRatings: [],
  yearAvgRatings: [],
  showsByRating: {},
  showsByYear: {},
};

// ─── Chart Components ─────────────────────────────────────────────────────────

function PieChartView({
  data,
}: {
  data: { id: string; name: string; color: string; count: number }[];
}) {
  const total = data.reduce((s, d) => s + d.count, 0);
  if (total === 0) return null;

  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 80;
  const innerR = 46;

  let startAngle = -90;
  const slices = data.map((d) => {
    const angle = (d.count / total) * 360;
    const padding = 1.5;
    const s = startAngle + padding / 2;
    const e = startAngle + angle - padding / 2;
    startAngle += angle;

    const startRad = (s * Math.PI) / 180;
    const endRad = (e * Math.PI) / 180;
    const largeArc = angle - padding > 180 ? 1 : 0;

    const x1o = cx + outerR * Math.cos(startRad);
    const y1o = cy + outerR * Math.sin(startRad);
    const x2o = cx + outerR * Math.cos(endRad);
    const y2o = cy + outerR * Math.sin(endRad);
    const x1i = cx + innerR * Math.cos(endRad);
    const y1i = cy + innerR * Math.sin(endRad);
    const x2i = cx + innerR * Math.cos(startRad);
    const y2i = cy + innerR * Math.sin(startRad);

    const path = [
      `M ${x1o} ${y1o}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2o} ${y2o}`,
      `L ${x1i} ${y1i}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2i} ${y2i}`,
      "Z",
    ].join(" ");

    return { ...d, path };
  });

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={size} height={size}>
        <G>
          {slices.map((s) => (
            <Path
              key={s.id}
              d={s.path}
              fill={TAG_COLOR_HEX[s.color as TagColor] ?? TAG_COLOR_HEX.slate}
            />
          ))}
        </G>
      </Svg>
      <View style={chartStyles.legendContainer}>
        {data.map((entry) => (
          <View key={entry.id} style={chartStyles.legendItem}>
            <View
              style={[
                chartStyles.legendDot,
                {
                  backgroundColor:
                    TAG_COLOR_HEX[entry.color as TagColor] ?? TAG_COLOR_HEX.slate,
                },
              ]}
            />
            <Text style={chartStyles.legendText}>{entry.name}</Text>
            <Text style={chartStyles.legendCount}>{entry.count}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function BarChartView({
  data,
  dataKey,
  labelKey,
  color,
  maxValue,
  formatLabel,
  onBarPress,
}: {
  data: Record<string, unknown>[];
  dataKey: string;
  labelKey: string;
  color: string;
  maxValue?: number;
  formatLabel?: (v: number) => string;
  onBarPress?: (item: Record<string, unknown>) => void;
}) {
  if (data.length === 0) return null;

  const chartWidth = SCREEN_WIDTH - 72;
  const chartHeight = 180;
  const barGap = 3;
  const maxBarWidth = 32;
  const barWidth = Math.min(
    maxBarWidth,
    (chartWidth - barGap * data.length) / data.length,
  );
  const values = data.map((d) => (d[dataKey] as number) || 0);
  const max = maxValue ?? Math.max(...values, 1);

  const leftPad = 30;
  const totalW = leftPad + data.length * (barWidth + barGap);
  const svgWidth = Math.max(chartWidth, totalW);

  // Y-axis ticks
  const tickCount = 4;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) =>
    Math.round((max / tickCount) * i),
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}>
      <Svg width={svgWidth} height={chartHeight + 28}>
        {/* Y-axis labels */}
        {ticks.map((tick) => {
          const y = chartHeight - (tick / max) * chartHeight + 4;
          return (
            <SvgText
              key={tick}
              x={leftPad - 6}
              y={y}
              fontSize={9}
              fill={TEXT_MUTED}
              textAnchor="end"
            >
              {formatLabel ? formatLabel(tick) : String(tick)}
            </SvgText>
          );
        })}
        {/* Grid lines */}
        {ticks.map((tick) => {
          const y = chartHeight - (tick / max) * chartHeight + 1;
          return (
            <Line
              key={`grid-${tick}`}
              x1={leftPad}
              y1={y}
              x2={svgWidth}
              y2={y}
              stroke={BORDER}
              strokeWidth={0.5}
            />
          );
        })}
        {/* Bars */}
        {data.map((d, i) => {
          const v = (d[dataKey] as number) || 0;
          const h = max > 0 ? (v / max) * chartHeight : 0;
          const x = leftPad + i * (barWidth + barGap);
          const y = chartHeight - h + 1;
          return (
            <G
              key={i}
              onPress={onBarPress ? () => onBarPress(d) : undefined}
            >
              <Rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(h, 0)}
                rx={3}
                fill={color}
              />
              <SvgText
                x={x + barWidth / 2}
                y={chartHeight + 16}
                fontSize={9}
                fill={TEXT_MUTED}
                textAnchor="middle"
              >
                {String(d[labelKey] ?? "")}
              </SvgText>
            </G>
          );
        })}
      </Svg>
    </ScrollView>
  );
}

function AreaChartView({
  data,
  dataKey,
  labelKey,
}: {
  data: Record<string, unknown>[];
  dataKey: string;
  labelKey: string;
}) {
  if (data.length < 2) return null;

  const chartWidth = SCREEN_WIDTH - 72;
  const chartHeight = 160;
  const values = data.map((d) => (d[dataKey] as number) || 0);
  const max = Math.max(...values, 1);

  const leftPad = 30;
  const usableWidth = chartWidth - leftPad - 8;
  const step = usableWidth / (data.length - 1);

  // Build path
  const points = data.map((d, i) => {
    const x = leftPad + i * step;
    const v = (d[dataKey] as number) || 0;
    const y = chartHeight - (v / max) * (chartHeight - 10);
    return { x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  // Y-axis ticks
  const tickCount = 4;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) =>
    Math.round((max / tickCount) * i),
  );

  // Show label for first, middle, and last
  const labelIndices = new Set([0, Math.floor(data.length / 2), data.length - 1]);

  return (
    <Svg width={chartWidth} height={chartHeight + 28}>
      <Defs>
        <LinearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={ACCENT} stopOpacity={0.3} />
          <Stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      {/* Y-axis labels */}
      {ticks.map((tick) => {
        const y = chartHeight - (tick / max) * (chartHeight - 10);
        return (
          <SvgText key={tick} x={leftPad - 6} y={y + 3} fontSize={9} fill={TEXT_MUTED} textAnchor="end">
            {String(tick)}
          </SvgText>
        );
      })}
      {/* Grid lines */}
      {ticks.map((tick) => {
        const y = chartHeight - (tick / max) * (chartHeight - 10);
        return (
          <Line key={`g-${tick}`} x1={leftPad} y1={y} x2={chartWidth} y2={y} stroke={BORDER} strokeWidth={0.5} strokeDasharray="4,3" />
        );
      })}
      {/* Area fill */}
      <Path d={areaPath} fill="url(#areaGrad)" />
      {/* Line */}
      <Path d={linePath} stroke={ACCENT} strokeWidth={2} fill="none" />
      {/* X labels */}
      {data.map((d, i) =>
        labelIndices.has(i) ? (
          <SvgText key={i} x={points[i].x} y={chartHeight + 16} fontSize={8} fill={TEXT_MUTED} textAnchor="middle">
            {String(d[labelKey] ?? "")}
          </SvgText>
        ) : null,
      )}
    </Svg>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statValueRow}>
        <Text style={styles.statValue}>{value}</Text>
        {sub ? <Text style={styles.statSub}>{sub}</Text> : null}
      </View>
    </View>
  );
}

// ─── Show Modal Row ───────────────────────────────────────────────────────────

function ShowModalRow({ show, index }: { show: ShowSummary; index: number }) {
  const router = useRouter();
  const posterUrl = getPosterUrl(show.poster_path, "w92");
  return (
    <TouchableOpacity
      style={styles.showRow}
      activeOpacity={0.7}
      onPress={() => router.push(`/show/${show.id}`)}
    >
      <Text style={styles.showRowRank}>{index + 1}</Text>
      {posterUrl ? (
        <Image source={{ uri: posterUrl }} style={styles.showRowPoster} />
      ) : (
        <View style={[styles.showRowPoster, { backgroundColor: "#1e1e22" }]} />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.showRowTitle} numberOfLines={1}>
          {show.title}
        </Text>
      </View>
      <Text style={styles.showRowRating}>
        {show.rating != null ? `${show.rating}/10` : "—"}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Analytics Screen ─────────────────────────────────────────────────────────

export default function AnalyticsScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData>(EMPTY_ANALYTICS);
  const [ratingLabels, setRatingLabels] = useState<string[] | null>(null);

  // Drill-down state
  const [drillDecadeCount, setDrillDecadeCount] = useState<string | null>(null);
  const [drillDecadeRating, setDrillDecadeRating] = useState<string | null>(null);
  const [modalData, setModalData] = useState<{ title: string; shows: ShowSummary[] } | null>(null);

  const openModal = (title: string, shows: ShowSummary[]) => {
    if (shows.length > 0) setModalData({ title, shows });
  };

  // ── Fetch analytics ────────────────────────────────────────────────────────

  const fetchAnalytics = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    // Get rating labels
    const { data: profile } = await supabase
      .from("profiles")
      .select("rating_labels")
      .eq("id", user.id)
      .single();
    setRatingLabels(profile?.rating_labels ?? null);

    // Get user's list
    const { data: lists } = await supabase
      .from("lists")
      .select("id")
      .eq("user_id", user.id)
      .limit(1);
    const listId = lists?.[0]?.id;
    if (!listId) {
      setLoading(false);
      return;
    }

    // Fetch all list items with show data
    const { data: rawItems } = await supabase
      .from("list_items")
      .select("rating, show_id, added_at, shows(id, title, poster_path, first_air_date)")
      .eq("list_id", listId);

    type RawItem = {
      rating: number | null;
      show_id: string;
      added_at: string | null;
      shows: { id: string; title: string; poster_path: string | null; first_air_date: string | null } | null;
    };

    const items = (rawItems ?? []) as RawItem[];
    const totalCount = items.length;
    const ratedRows = items.filter((r) => r.rating !== null);
    const ratedCount = ratedRows.length;
    const avgRating =
      ratedCount > 0
        ? Math.round((ratedRows.reduce((s, r) => s + r.rating!, 0) / ratedCount) * 10) / 10
        : null;

    // Rating distribution
    const ratingMap: Record<number, number> = {};
    for (let r = 1; r <= 10; r++) ratingMap[r] = 0;
    for (const row of items) {
      if (row.rating !== null) ratingMap[row.rating] = (ratingMap[row.rating] ?? 0) + 1;
    }
    const ratingCounts = Array.from({ length: 10 }, (_, i) => ({
      rating: i + 1,
      count: ratingMap[i + 1],
    }));

    // Tags
    const showIds = items.map((i) => i.show_id);
    const tagCounts: AnalyticsData["tagCounts"] = [];
    const tagAvgRatings: AnalyticsData["tagAvgRatings"] = [];

    if (showIds.length > 0) {
      const [{ data: showTagRows }, { data: tagDefs }] = await Promise.all([
        supabase
          .from("show_tags")
          .select("tag_id, show_id")
          .eq("user_id", user.id)
          .in("show_id", showIds),
        supabase
          .from("tags")
          .select("id, name, color")
          .or(`is_default.eq.true,user_id.eq.${user.id}`),
      ]);

      const tagMap = new Map((tagDefs ?? []).map((t) => [t.id, t]));
      const showRatingMap = new Map(items.map((i) => [i.show_id, i.rating]));

      const tagCountMap: Record<string, { id: string; name: string; color: string; count: number }> = {};
      const tagRatingAcc: Record<string, { id: string; name: string; color: string; sum: number; count: number }> = {};

      for (const row of showTagRows ?? []) {
        const tag = tagMap.get(row.tag_id);
        if (!tag) continue;
        tagCountMap[row.tag_id] ??= { id: tag.id, name: tag.name, color: tag.color, count: 0 };
        tagCountMap[row.tag_id].count++;
        const rating = showRatingMap.get(row.show_id);
        if (rating != null) {
          tagRatingAcc[row.tag_id] ??= { id: tag.id, name: tag.name, color: tag.color, sum: 0, count: 0 };
          tagRatingAcc[row.tag_id].sum += rating;
          tagRatingAcc[row.tag_id].count++;
        }
      }

      tagCounts.push(...Object.values(tagCountMap).sort((a, b) => b.count - a.count));
      tagAvgRatings.push(
        ...Object.values(tagRatingAcc)
          .map((t) => ({
            id: t.id,
            name: t.name,
            color: t.color,
            avgRating: Math.round((t.sum / t.count) * 10) / 10,
            count: t.count,
          }))
          .sort((a, b) => b.avgRating - a.avgRating),
      );
    }

    // Timeline
    const monthlyMap: Record<string, number> = {};
    for (const item of items) {
      if (!item.added_at) continue;
      const month = item.added_at.slice(0, 7);
      monthlyMap[month] = (monthlyMap[month] ?? 0) + 1;
    }
    const monthlyAdded = Object.entries(monthlyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({ month, count }));

    // Decades
    const decadeMap: Record<string, number> = {};
    const yearCountMap: Record<string, number> = {};
    const decadeRatingAcc: Record<string, { sum: number; count: number }> = {};
    const yearRatingAcc: Record<string, { sum: number; count: number }> = {};

    for (const item of items) {
      const firstAirDate = item.shows?.first_air_date;
      if (!firstAirDate) continue;
      const year = parseInt(firstAirDate.slice(0, 4), 10);
      if (isNaN(year) || year < 1900) continue;
      const decade = `${Math.floor(year / 10) * 10}s`;
      const yearStr = String(year);

      decadeMap[decade] = (decadeMap[decade] ?? 0) + 1;
      yearCountMap[yearStr] = (yearCountMap[yearStr] ?? 0) + 1;

      if (item.rating !== null) {
        decadeRatingAcc[decade] ??= { sum: 0, count: 0 };
        decadeRatingAcc[decade].sum += item.rating;
        decadeRatingAcc[decade].count++;
        yearRatingAcc[yearStr] ??= { sum: 0, count: 0 };
        yearRatingAcc[yearStr].sum += item.rating;
        yearRatingAcc[yearStr].count++;
      }
    }

    const decadeCounts = Object.entries(decadeMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([decade, count]) => ({ decade, count }));
    const yearCounts = Object.entries(yearCountMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([year, count]) => ({ year, count }));
    const decadeAvgRatings = Object.entries(decadeRatingAcc)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([decade, { sum, count }]) => ({
        decade,
        avgRating: Math.round((sum / count) * 10) / 10,
      }));
    const yearAvgRatings = Object.entries(yearRatingAcc)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([year, { sum, count }]) => ({
        year,
        avgRating: Math.round((sum / count) * 10) / 10,
      }));

    // Show lookup maps
    const showsByRating: Record<number, ShowSummary[]> = {};
    const showsByYear: Record<string, ShowSummary[]> = {};
    for (const item of items) {
      const summary: ShowSummary = {
        id: item.shows?.id ?? item.show_id,
        title: item.shows?.title ?? "",
        poster_path: item.shows?.poster_path ?? null,
        rating: item.rating,
        first_air_date: item.shows?.first_air_date ?? null,
      };
      if (item.rating !== null) {
        showsByRating[item.rating] ??= [];
        showsByRating[item.rating].push(summary);
      }
      const fad = item.shows?.first_air_date;
      if (fad) {
        const y = parseInt(fad.slice(0, 4), 10);
        if (!isNaN(y) && y >= 1900) {
          const yr = String(y);
          showsByYear[yr] ??= [];
          showsByYear[yr].push(summary);
        }
      }
    }

    setData({
      totalCount,
      ratedCount,
      avgRating,
      ratingCounts,
      tagCounts,
      tagAvgRatings,
      monthlyAdded,
      decadeCounts,
      yearCounts,
      decadeAvgRatings,
      yearAvgRatings,
      showsByRating,
      showsByYear,
    });
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // ── Derived ────────────────────────────────────────────────────────────────

  const hasTagData = data.tagCounts.length > 0;
  const hasRatingData = data.ratingCounts.some((d) => d.count > 0);
  const ratedPct =
    data.totalCount > 0
      ? Math.round((data.ratedCount / data.totalCount) * 100)
      : 0;

  const ratingChartData = useMemo(
    () =>
      data.ratingCounts.map((d) => ({
        ...d,
        label: getRatingLabel(d.rating, ratingLabels),
      })),
    [data.ratingCounts, ratingLabels],
  );

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

  // ── Loading ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={ACCENT} size="large" />
      </View>
    );
  }

  // ── Empty ──────────────────────────────────────────────────────────────────

  if (data.totalCount === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>{t("analytics.emptyHint")}</Text>
      </View>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <StatCard
            label={t("analytics.totalShows")}
            value={String(data.totalCount)}
          />
          <StatCard
            label={t("analytics.ratedShows")}
            value={String(data.ratedCount)}
            sub={`${ratedPct}%`}
          />
          <StatCard
            label={t("analytics.avgRating")}
            value={data.avgRating !== null ? String(data.avgRating) : "—"}
            sub={data.avgRating !== null ? "/10" : undefined}
          />
        </View>

        {/* Tag Distribution (Pie) */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>{t("analytics.tagDistribution")}</Text>
          {hasTagData ? (
            <PieChartView data={data.tagCounts} />
          ) : (
            <Text style={styles.noDataText}>{t("analytics.noTags")}</Text>
          )}
        </View>

        {/* Rating Distribution (Bar) */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>{t("analytics.ratingDistribution")}</Text>
          {hasRatingData ? (
            <BarChartView
              data={ratingChartData as unknown as Record<string, unknown>[]}
              dataKey="count"
              labelKey="rating"
              color={RATING_BAR}
              onBarPress={(d) => {
                const rating = d.rating as number;
                openModal(`${rating}/10`, data.showsByRating[rating] ?? []);
              }}
            />
          ) : (
            <Text style={styles.noDataText}>{t("analytics.noRatings")}</Text>
          )}
        </View>

        {/* Avg Rating Per Tag */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>{t("analytics.avgRatingPerTag")}</Text>
          {data.tagAvgRatings.length > 0 ? (
            <View style={{ gap: 12 }}>
              {data.tagAvgRatings.map((entry) => (
                <View key={entry.id} style={styles.tagRatingRow}>
                  <View
                    style={[
                      styles.tagRatingDot,
                      {
                        backgroundColor:
                          TAG_COLOR_HEX[entry.color as TagColor] ?? TAG_COLOR_HEX.slate,
                      },
                    ]}
                  />
                  <Text style={styles.tagRatingName} numberOfLines={1}>
                    {entry.name}
                  </Text>
                  <View style={styles.tagRatingBarBg}>
                    <View
                      style={[
                        styles.tagRatingBarFill,
                        {
                          width: `${(entry.avgRating / 10) * 100}%`,
                          backgroundColor:
                            TAG_COLOR_HEX[entry.color as TagColor] ?? TAG_COLOR_HEX.slate,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.tagRatingValue}>{entry.avgRating}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noDataText}>{t("analytics.noData")}</Text>
          )}
        </View>

        {/* Decade Distribution */}
        <View style={styles.chartCard}>
          <View style={styles.chartTitleRow}>
            {drillDecadeCount && (
              <TouchableOpacity
                onPress={() => setDrillDecadeCount(null)}
                style={styles.backBtn}
              >
                <Ionicons name="arrow-back" size={12} color={TEXT_MUTED} />
                <Text style={styles.backBtnText}>{t("analytics.backToDecades")}</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.chartTitle}>
              {drillDecadeCount ? drillDecadeCount : t("analytics.releaseDecades")}
            </Text>
          </View>
          {decadeCountDisplayData.length > 0 ? (
            <BarChartView
              data={decadeCountDisplayData as unknown as Record<string, unknown>[]}
              dataKey="count"
              labelKey={drillDecadeCount ? "year" : "decade"}
              color={DECADE_BAR}
              onBarPress={(d) => {
                if (!drillDecadeCount && d.decade) {
                  setDrillDecadeCount(d.decade as string);
                } else if (drillDecadeCount && d.year) {
                  openModal(d.year as string, data.showsByYear[d.year as string] ?? []);
                }
              }}
            />
          ) : (
            <Text style={styles.noDataText}>{t("analytics.noData")}</Text>
          )}
        </View>

        {/* Avg Rating by Decade */}
        <View style={styles.chartCard}>
          <View style={styles.chartTitleRow}>
            {drillDecadeRating && (
              <TouchableOpacity
                onPress={() => setDrillDecadeRating(null)}
                style={styles.backBtn}
              >
                <Ionicons name="arrow-back" size={12} color={TEXT_MUTED} />
                <Text style={styles.backBtnText}>{t("analytics.backToDecades")}</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.chartTitle}>
              {drillDecadeRating ? drillDecadeRating : t("analytics.avgRatingByDecade")}
            </Text>
          </View>
          {decadeRatingDisplayData.length > 0 ? (
            <BarChartView
              data={decadeRatingDisplayData as unknown as Record<string, unknown>[]}
              dataKey="avgRating"
              labelKey={drillDecadeRating ? "year" : "decade"}
              color={RATING_BAR}
              maxValue={10}
              onBarPress={(d) => {
                if (!drillDecadeRating && d.decade) {
                  setDrillDecadeRating(d.decade as string);
                } else if (drillDecadeRating && d.year) {
                  openModal(d.year as string, data.showsByYear[d.year as string] ?? []);
                }
              }}
            />
          ) : (
            <Text style={styles.noDataText}>{t("analytics.noData")}</Text>
          )}
        </View>

        {/* Added Over Time (Area) */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>{t("analytics.addedOverTime")}</Text>
          {data.monthlyAdded.length > 1 ? (
            <AreaChartView
              data={data.monthlyAdded as unknown as Record<string, unknown>[]}
              dataKey="count"
              labelKey="month"
            />
          ) : (
            <Text style={styles.noDataText}>{t("analytics.noData")}</Text>
          )}
        </View>
      </ScrollView>

      {/* Show Modal */}
      <Modal
        visible={!!modalData}
        transparent
        animationType="fade"
        onRequestClose={() => setModalData(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalData(null)}>
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text style={styles.modalHeaderTitle}>{modalData?.title}</Text>
                <Text style={styles.modalHeaderCount}>
                  {modalData?.shows.length}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalData(null)}>
                <Ionicons name="close" size={18} color={TEXT_MUTED} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalList} bounces={false}>
              {modalData?.shows
                .slice()
                .sort((a, b) => {
                  if (a.rating === null && b.rating === null) return 0;
                  if (a.rating === null) return 1;
                  if (b.rating === null) return -1;
                  return b.rating - a.rating;
                })
                .map((show, i) => (
                  <ShowModalRow key={show.id} show={show} index={i} />
                ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const chartStyles = StyleSheet.create({
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    marginTop: 16,
    paddingHorizontal: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: "#a0a0a8",
  },
  legendCount: {
    fontSize: 11,
    fontVariant: ["tabular-nums"],
    color: TEXT_MUTED,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BG,
    padding: 32,
  },
  emptyText: {
    color: TEXT_MUTED,
    fontSize: 15,
    textAlign: "center",
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: SURFACE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: TEXT_FAINT,
    marginBottom: 10,
  },
  statValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 3,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
    color: TEXT_PRIMARY,
  },
  statSub: {
    fontSize: 11,
    fontVariant: ["tabular-nums"],
    color: TEXT_MUTED,
  },

  // Chart Card
  chartCard: {
    backgroundColor: SURFACE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 16,
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: TEXT_FAINT,
    marginBottom: 14,
  },
  chartTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 0,
  },
  noDataText: {
    textAlign: "center",
    color: TEXT_MUTED,
    fontSize: 12,
    paddingVertical: 40,
  },

  // Back button (decade drill)
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backBtnText: {
    fontSize: 10,
    color: TEXT_MUTED,
  },

  // Tag avg rating rows
  tagRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tagRatingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tagRatingName: {
    width: 80,
    fontSize: 11,
    color: "#a0a0a8",
  },
  tagRatingBarBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#1e1e22",
    overflow: "hidden",
  },
  tagRatingBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  tagRatingValue: {
    width: 30,
    textAlign: "right",
    fontVariant: ["tabular-nums"],
    fontSize: 11,
    color: TEXT_MUTED,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: SURFACE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    width: "100%",
    maxWidth: 360,
    maxHeight: "75%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },
  modalHeaderTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT_PRIMARY,
  },
  modalHeaderCount: {
    fontSize: 12,
    fontVariant: ["tabular-nums"],
    color: TEXT_MUTED,
  },
  modalList: {
    padding: 12,
  },

  // Show row in modal
  showRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    gap: 8,
  },
  showRowRank: {
    width: 22,
    fontSize: 12,
    fontWeight: "600",
    color: TEXT_MUTED,
    textAlign: "center",
  },
  showRowPoster: {
    width: 34,
    height: 50,
    borderRadius: 4,
  },
  showRowTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: TEXT_PRIMARY,
  },
  showRowRating: {
    fontSize: 12,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
    color: ACCENT,
    minWidth: 36,
    textAlign: "right",
  },
});
