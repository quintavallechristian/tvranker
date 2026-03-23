import { getTranslations } from "next-intl/server";
import { getTopRatedShows } from "./actions";
import { EmptyState } from "@/components/EmptyState";
import { getPosterUrl } from "@/lib/tmdb/client";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Television, Trophy } from "@phosphor-icons/react/dist/ssr";

export default async function RankingsPage() {
  const t = await getTranslations("rankings");
  const shows = await getTopRatedShows();

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

      {shows.length === 0 ? (
        <EmptyState
          title={t("emptyTitle")}
          description={t("emptyDescription")}
        />
      ) : (
        <div className="space-y-1">
          {shows.map((show, index) => {
            const posterUrl = getPosterUrl(show.poster_path, "w92");
            const rank = index + 1;

            return (
              /* Mirror ShowRow container classes exactly */
              <div
                key={show.id}
                className="group rounded-md border border-border bg-bg-surface p-2.5 md:p-3 transition-colors hover:border-border-hover"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  {/* Rank — same slot as the drag handle + position in ShowRow */}
                  <span
                    className={`w-5 md:w-6 shrink-0 text-center font-mono text-xs font-bold tabular-nums ${
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
                        alt={show.title}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Television size={14} className="text-text-faint" />
                      </div>
                    )}
                  </div>

                  {/* Title + year */}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/shows/${show.id}`}
                      className="block truncate text-sm font-medium text-text-primary hover:text-accent transition-colors"
                    >
                      {show.title}
                    </Link>
                    {show.first_air_date && (
                      <p className="text-xs text-text-faint">
                        {new Date(show.first_air_date).getFullYear()}
                      </p>
                    )}
                  </div>

                  {/* Rating — desktop, mirrors ShowRow read-only rating pill */}
                  <div className="hidden md:flex shrink-0 items-center gap-2">
                    <span className="whitespace-nowrap font-mono text-xs tabular-nums text-accent">
                      {show.avg_rating.toFixed(1)}{" "}
                      <span className="text-text-faint">
                        · {t("votes", { count: show.vote_count })}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Mobile rating row — mirrors ShowRow bottom row */}
                <div className="md:hidden mt-2 pl-7">
                  <span className="font-mono text-xs tabular-nums text-accent">
                    {show.avg_rating.toFixed(1)}/10{" "}
                    <span className="text-text-faint">
                      · {t("votes", { count: show.vote_count })}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {shows.length > 0 && (
        <p className="text-xs text-text-faint">{t("minVotesHint")}</p>
      )}
    </div>
  );
}
