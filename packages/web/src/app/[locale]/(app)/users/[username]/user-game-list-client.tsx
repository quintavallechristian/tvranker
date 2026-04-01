"use client";

import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useTransition,
} from "react";
import Image from "next/image";
import {
  GameController,
  PlusCircle,
  Check,
  Funnel,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import {
  getGameListItemsPage,
  addGameToMyList,
  type GameItem,
} from "@/app/[locale]/(app)/games/actions";
import { getRatingLabel } from "@/lib/rating-labels";

type Props = {
  gameListId: string;
  initialItems: GameItem[];
  initialHasMore: boolean;
  ratingLabels?: string[] | null;
  isLoggedIn: boolean;
  viewerGameIds: Set<string>;
};

export function UserGameListClient({
  gameListId,
  initialItems,
  initialHasMore,
  ratingLabels,
  isLoggedIn,
  viewerGameIds: initialViewerGameIds,
}: Props) {
  const [items, setItems] = useState<GameItem[]>(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showCommonOnly, setShowCommonOnly] = useState(false);
  const nextPageRef = useRef(1);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("users");
  const tGames = useTranslations("games");
  const tLists = useTranslations("lists");

  const [addedGameIds, setAddedGameIds] = useState<Set<string>>(new Set());
  const [quickAddFeedback, setQuickAddFeedback] = useState<
    Record<string, "adding" | "added" | "exists">
  >({});
  const [, startTransition] = useTransition();

  const inMyList = useCallback(
    (gameId: string) =>
      initialViewerGameIds.has(gameId) || addedGameIds.has(gameId),
    [initialViewerGameIds, addedGameIds],
  );

  const ratingGroups = useMemo(() => {
    const filtered = showCommonOnly
      ? items.filter((item) => inMyList(item.game_id))
      : items;
    const sorted = [...filtered].sort((a, b) => {
      if (a.rating === b.rating) return a.position - b.position;
      if (a.rating === null) return 1;
      if (b.rating === null) return -1;
      return b.rating - a.rating;
    });
    const groups: { rating: number | null; items: typeof sorted }[] = [];
    for (const item of sorted) {
      const last = groups[groups.length - 1];
      if (!last || last.rating !== item.rating) {
        groups.push({ rating: item.rating, items: [item] });
      } else {
        last.items.push(item);
      }
    }
    return groups;
  }, [items, showCommonOnly, inMyList]);

  const sortedIds = useMemo(
    () => ratingGroups.flatMap((g) => g.items.map((i) => i.id)),
    [ratingGroups],
  );

  const commonCount = useMemo(
    () => items.filter((item) => inMyList(item.game_id)).length,
    [items, inMyList],
  );

  const loadNextPage = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const result = await getGameListItemsPage(
        gameListId,
        nextPageRef.current,
      );
      nextPageRef.current++;
      setItems((prev) => [...prev, ...result.items]);
      setHasMore(result.hasMore);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, gameListId]);

  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadNextPage();
      },
      { rootMargin: "300px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadNextPage]);

  const handleQuickAdd = useCallback(
    (gameId: string) => {
      if (inMyList(gameId) || quickAddFeedback[gameId] === "adding") return;
      setQuickAddFeedback((prev) => ({ ...prev, [gameId]: "adding" }));
      startTransition(async () => {
        try {
          const result = await addGameToMyList(gameId);
          if (result?.alreadyExists) {
            setAddedGameIds((prev) => new Set([...prev, gameId]));
            setQuickAddFeedback((prev) => ({ ...prev, [gameId]: "exists" }));
          } else {
            setAddedGameIds((prev) => new Set([...prev, gameId]));
            setQuickAddFeedback((prev) => ({ ...prev, [gameId]: "added" }));
          }
        } catch {
          setQuickAddFeedback((prev) => {
            const next = { ...prev };
            delete next[gameId];
            return next;
          });
        }
      });
    },
    [inMyList, quickAddFeedback, startTransition],
  );

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      {isLoggedIn && commonCount > 0 && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCommonOnly((v) => !v)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              showCommonOnly
                ? "border-accent bg-accent-muted text-accent"
                : "border-border text-text-muted hover:border-border-hover hover:text-text-secondary"
            }`}
          >
            <Funnel size={12} weight={showCommonOnly ? "fill" : "regular"} />
            {t("gamesInCommon", { count: commonCount })}
          </button>
        </div>
      )}

      {ratingGroups.map((group) => {
        const tierLabel =
          group.rating !== null
            ? `${group.rating} · ${getRatingLabel(group.rating, ratingLabels)}`
            : tLists("unrated");
        return (
          <div key={group.rating ?? "unrated"}>
            {/* Tier header */}
            <div className="mb-2 flex items-center gap-3">
              <span className="whitespace-nowrap font-mono text-xs font-semibold tracking-widest text-text-faint uppercase">
                {tierLabel}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Tier items */}
            <div className="space-y-2">
              {group.items.map((item) => {
                const globalIndex = sortedIds.indexOf(item.id);
                const coverUrl = item.games.cover_url;
                const alreadyAdded = inMyList(item.game_id);
                const feedback = quickAddFeedback[item.game_id];

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 rounded-md border border-border bg-bg-surface p-2.5 md:gap-3 md:p-3"
                  >
                    {/* Position */}
                    <span className="w-5 shrink-0 text-center font-mono text-xs font-bold text-text-muted tabular-nums md:w-6">
                      {globalIndex + 1}
                    </span>

                    {/* Cover */}
                    <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                      {coverUrl ? (
                        <Image
                          src={coverUrl}
                          alt={item.games.title}
                          fill
                          className="object-cover"
                          sizes="32px"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <GameController
                            size={14}
                            className="text-text-faint"
                          />
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <div className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary">
                      {item.games.title}
                      {item.games.first_release_date && (
                        <span className="ml-1.5 text-xs text-text-faint">
                          {new Date(
                            item.games.first_release_date,
                          ).getFullYear()}
                        </span>
                      )}
                    </div>

                    {/* Their rating */}
                    {item.rating != null && (
                      <span className="shrink-0 font-mono text-xs tabular-nums text-accent">
                        {item.rating}/10
                      </span>
                    )}

                    {/* Quick-add */}
                    {isLoggedIn &&
                      (alreadyAdded ? (
                        <Check
                          size={18}
                          className="ml-1 shrink-0 text-accent"
                        />
                      ) : (
                        <button
                          onClick={() => handleQuickAdd(item.game_id)}
                          disabled={feedback === "adding"}
                          className="ml-1 shrink-0 text-text-faint transition-colors hover:text-accent disabled:cursor-default"
                          title={t("yourRating")}
                        >
                          <PlusCircle size={18} />
                        </button>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Common filter empty state */}
      {showCommonOnly && ratingGroups.length === 0 && (
        <p className="text-sm text-text-muted">{t("noGamesInCommon")}</p>
      )}

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="flex justify-center py-2">
        {loadingMore && (
          <span className="text-xs text-text-faint">{tGames("loading")}</span>
        )}
      </div>
    </div>
  );
}
