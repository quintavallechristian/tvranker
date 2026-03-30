import { getTranslations } from "next-intl/server";
import { getTopRatedAnime } from "./actions";
import { EmptyState } from "@/components/EmptyState";
import { getPosterUrl } from "@/lib/tmdb/client";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { FilmSlate, Trophy, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default async function AnimeRankingsPage() {
  const t = await getTranslations("rankings");
  const animes = await getTopRatedAnime();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <Link
          href="/rankings"
          className="mb-3 inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={13} weight="bold" />
          {t("backToRankings")}
        </Link>
        <div className="flex items-center gap-2">
          <Trophy size={22} weight="duotone" className="text-accent" />
          <h1 className="text-xl font-bold text-text-primary">
            {t("anime.title")}
          </h1>
        </div>
        <p className="text-sm text-text-secondary">{t("anime.subtitle")}</p>
      </div>

      {animes.length === 0 ? (
        <EmptyState
          title={t("anime.emptyTitle")}
          description={t("anime.emptyDescription")}
        />
      ) : (
        <div className="space-y-1">
          {animes.map((anime, index) => {
            const posterUrl = getPosterUrl(anime.poster_path, "w92");
            const rank = index + 1;

            return (
              <div
                key={anime.id}
                className="group rounded-md border border-border bg-bg-surface p-2.5 transition-colors hover:border-border-hover md:p-3"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  {/* Rank */}
                  <span
                    className={`w-5 shrink-0 text-center font-mono text-xs font-bold tabular-nums md:w-6 ${
                      rank === 1
                        ? "text-yellow-500"
                        : rank === 2
                          ? "text-slate-400"
                          : rank === 3
                            ? "text-amber-600"
                            : "text-text-muted"
                    }`}
                  >
                    {rank}
                  </span>

                  {/* Poster */}
                  <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                    {posterUrl ? (
                      <Image
                        src={posterUrl}
                        alt={anime.title}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FilmSlate size={14} className="text-text-faint" />
                      </div>
                    )}
                  </div>

                  {/* Title + year */}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/anime/${anime.id}`}
                      className="block truncate text-sm font-medium text-text-primary transition-colors hover:text-accent"
                    >
                      {anime.title}
                    </Link>
                    {anime.first_air_date && (
                      <p className="text-xs text-text-faint">
                        {new Date(anime.first_air_date).getFullYear()}
                      </p>
                    )}
                  </div>

                  {/* Rating — desktop */}
                  <div className="hidden shrink-0 items-center gap-2 md:flex">
                    <span className="whitespace-nowrap font-mono text-xs tabular-nums text-accent">
                      {anime.avg_rating.toFixed(1)}{" "}
                      <span className="text-text-faint">
                        · {t("votes", { count: anime.vote_count })}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Mobile rating row */}
                <div className="mt-2 pl-7 md:hidden">
                  <span className="font-mono text-xs tabular-nums text-accent">
                    {anime.avg_rating.toFixed(1)}/10{" "}
                    <span className="text-text-faint">
                      · {t("votes", { count: anime.vote_count })}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {animes.length > 0 && (
        <p className="text-xs text-text-faint">{t("anime.minVotesHint")}</p>
      )}
    </div>
  );
}
