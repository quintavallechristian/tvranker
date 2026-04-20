import { getTranslations } from "next-intl/server";
import { getTopRatedBoardgamesRanking } from "./actions";
import { EmptyState } from "@/components/EmptyState";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { PuzzlePiece, Trophy, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default async function BoardgamesRankingsPage() {
  const t = await getTranslations("rankings");
  const boardgames = await getTopRatedBoardgamesRanking();

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
            {t("boardgames.title")}
          </h1>
        </div>
        <p className="text-sm text-text-secondary">
          {t("boardgames.subtitle")}
        </p>
      </div>

      {boardgames.length === 0 ? (
        <EmptyState
          title={t("boardgames.emptyTitle")}
          description={t("boardgames.emptyDescription")}
        />
      ) : (
        <div className="space-y-1">
          {boardgames.map((bg, index) => {
            const rank = index + 1;

            return (
              <div
                key={bg.id}
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

                  {/* Thumbnail */}
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                    {bg.thumbnail_url ? (
                      <Image
                        src={bg.thumbnail_url}
                        alt={bg.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <PuzzlePiece size={16} className="text-text-faint" />
                      </div>
                    )}
                  </div>

                  {/* Title + year */}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/boardgames/${bg.id}`}
                      className="block truncate text-sm font-medium text-text-primary transition-colors hover:text-accent"
                    >
                      {bg.title}
                    </Link>
                    {bg.year_published && (
                      <p className="text-xs text-text-faint">
                        {bg.year_published}
                      </p>
                    )}
                  </div>

                  {/* Rating — desktop */}
                  <div className="hidden shrink-0 items-center gap-2 md:flex">
                    <span className="whitespace-nowrap font-mono text-xs tabular-nums text-accent">
                      {bg.avg_rating.toFixed(1)}{" "}
                      <span className="text-text-faint">
                        · {t("votes", { count: bg.vote_count })}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Mobile rating row */}
                <div className="mt-2 pl-7 md:hidden">
                  <span className="font-mono text-xs tabular-nums text-accent">
                    {bg.avg_rating.toFixed(1)}/10{" "}
                    <span className="text-text-faint">
                      · {t("votes", { count: bg.vote_count })}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {boardgames.length > 0 && (
        <p className="text-xs text-text-faint">
          {t("boardgames.minVotesHint")}
        </p>
      )}
    </div>
  );
}
