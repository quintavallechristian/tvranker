import { getTranslations } from "next-intl/server";
import { getTopRatedGamesRanking } from "./actions";
import { EmptyState } from "@/components/EmptyState";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  GameController,
  Trophy,
  ArrowLeft,
} from "@phosphor-icons/react/dist/ssr";

export default async function GamesRankingsPage() {
  const t = await getTranslations("rankings");
  const games = await getTopRatedGamesRanking();

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
            {t("games.title")}
          </h1>
        </div>
        <p className="text-sm text-text-secondary">{t("games.subtitle")}</p>
      </div>

      {games.length === 0 ? (
        <EmptyState
          title={t("games.emptyTitle")}
          description={t("games.emptyDescription")}
        />
      ) : (
        <div className="space-y-1">
          {games.map((game, index) => {
            const rank = index + 1;

            return (
              <div
                key={game.id}
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

                  {/* Cover */}
                  <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                    {game.cover_url ? (
                      <Image
                        src={game.cover_url}
                        alt={game.title}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <GameController size={14} className="text-text-faint" />
                      </div>
                    )}
                  </div>

                  {/* Title + year */}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/games/${game.id}`}
                      className="block truncate text-sm font-medium text-text-primary transition-colors hover:text-accent"
                    >
                      {game.title}
                    </Link>
                    {game.first_release_date && (
                      <p className="text-xs text-text-faint">
                        {new Date(game.first_release_date).getFullYear()}
                      </p>
                    )}
                  </div>

                  {/* Rating — desktop */}
                  <div className="hidden shrink-0 items-center gap-2 md:flex">
                    <span className="whitespace-nowrap font-mono text-xs tabular-nums text-accent">
                      {game.avg_rating.toFixed(1)}{" "}
                      <span className="text-text-faint">
                        · {t("votes", { count: game.vote_count })}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Mobile rating row */}
                <div className="mt-2 pl-7 md:hidden">
                  <span className="font-mono text-xs tabular-nums text-accent">
                    {game.avg_rating.toFixed(1)}/10{" "}
                    <span className="text-text-faint">
                      · {t("votes", { count: game.vote_count })}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {games.length > 0 && (
        <p className="text-xs text-text-faint">{t("games.minVotesHint")}</p>
      )}
    </div>
  );
}
