import { getTranslations } from "next-intl/server";
import { getTopRatedShows } from "./actions";
import { getTopRatedMovies } from "./movies/actions";
import { getPosterUrl } from "@/lib/tmdb/client";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  Television,
  FilmSlate,
  Trophy,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

export default async function RankingsPage() {
  const t = await getTranslations("rankings");
  const [shows, movies] = await Promise.all([
    getTopRatedShows(),
    getTopRatedMovies(),
  ]);

  const top3Shows = shows.slice(0, 3);
  const top3Movies = movies.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Trophy size={22} weight="duotone" className="text-accent" />
          <h1 className="text-xl font-bold text-text-primary">{t("title")}</h1>
        </div>
        <p className="text-sm text-text-secondary">{t("subtitle")}</p>
      </div>

      {/* Two podium cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <RankingPodiumCard
          title={t("shows.title")}
          href="/rankings/shows"
          viewAllLabel={t("viewAll")}
          emptyLabel={t("shows.emptyTitle")}
          items={top3Shows.map((s) => ({
            id: s.id,
            title: s.title,
            poster_path: s.poster_path,
            avg_rating: s.avg_rating,
          }))}
          icon="tv"
        />
        <RankingPodiumCard
          title={t("movies.title")}
          href="/rankings/movies"
          viewAllLabel={t("viewAll")}
          emptyLabel={t("movies.emptyTitle")}
          items={top3Movies.map((m) => ({
            id: m.id,
            title: m.title,
            poster_path: m.poster_path,
            avg_rating: m.avg_rating,
          }))}
          icon="film"
        />
      </div>
    </div>
  );
}

type PodiumItem = {
  id: string;
  title: string;
  poster_path: string | null;
  avg_rating: number;
};

function RankingPodiumCard({
  title,
  href,
  viewAllLabel,
  emptyLabel,
  items,
  icon,
}: {
  title: string;
  href: string;
  viewAllLabel: string;
  emptyLabel: string;
  items: PodiumItem[];
  icon: "tv" | "film";
}) {
  const Icon = icon === "tv" ? Television : FilmSlate;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
    >
      {/* Card header */}
      <div className="mb-4 flex shrink-0 items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          {title}
        </p>
        <span className="flex items-center gap-1 text-xs text-text-muted transition-colors group-hover:text-accent">
          {viewAllLabel}
          <ArrowRight
            size={12}
            weight="bold"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>

      {items.length > 0 ? (
        <div className="flex flex-1 items-end justify-center gap-4">
          {/* 2nd place */}
          {items[1] ? (
            <PodiumSlot
              item={items[1]}
              rank={2}
              posterHeight="h-20"
              rankColor="text-slate-400"
              icon={icon}
            />
          ) : (
            <div className="w-14" />
          )}

          {/* 1st place — center, tallest */}
          <PodiumSlot
            item={items[0]}
            rank={1}
            posterHeight="h-28"
            rankColor="text-yellow-400"
            featured
            icon={icon}
          />

          {/* 3rd place */}
          {items[2] ? (
            <PodiumSlot
              item={items[2]}
              rank={3}
              posterHeight="h-14"
              rankColor="text-amber-600"
              icon={icon}
            />
          ) : (
            <div className="w-14" />
          )}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-8">
          <Icon size={24} className="text-text-faint" />
          <p className="text-xs text-text-muted">{emptyLabel}</p>
        </div>
      )}
    </Link>
  );
}

function PodiumSlot({
  item,
  rank,
  posterHeight,
  rankColor,
  featured,
  icon,
}: {
  item: PodiumItem;
  rank: number;
  posterHeight: string;
  rankColor: string;
  featured?: boolean;
  icon: "tv" | "film";
}) {
  const posterUrl = getPosterUrl(item.poster_path, "w92");
  const Icon = icon === "tv" ? Television : FilmSlate;

  return (
    <div className="flex w-14 flex-col items-center gap-1">
      <span className={`text-[10px] font-bold tabular-nums ${rankColor}`}>
        #{rank}
      </span>
      <div
        className={`relative w-full overflow-hidden rounded-md border bg-bg-elevated ${posterHeight} ${
          featured
            ? "border-accent/40 shadow-[0_0_14px_rgba(0,212,170,0.15)]"
            : "border-border"
        }`}
      >
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="56px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Icon size={16} className="text-text-faint" />
          </div>
        )}
      </div>
      <p className="w-full truncate text-center text-[9px] leading-tight text-text-secondary">
        {item.title}
      </p>
      <span className="font-mono text-[9px] tabular-nums text-accent">
        {item.avg_rating.toFixed(1)}
      </span>
    </div>
  );
}
