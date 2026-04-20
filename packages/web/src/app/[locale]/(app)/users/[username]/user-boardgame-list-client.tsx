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
import { PuzzlePiece, PlusCircle, Check, Funnel } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import {
  getBoardgameListItemsPage,
  addBoardgameToMyList,
  type BoardgameItem,
} from "@/app/[locale]/(app)/boardgames/actions";
import { getRatingLabel } from "@/lib/rating-labels";

type Props = {
  boardgameListId: string;
  initialItems: BoardgameItem[];
  initialHasMore: boolean;
  ratingLabels?: string[] | null;
  isLoggedIn: boolean;
  viewerBoardgameIds: Set<string>;
};

export function UserBoardgameListClient({
  boardgameListId,
  initialItems,
  initialHasMore,
  ratingLabels,
  isLoggedIn,
  viewerBoardgameIds: initialViewerBoardgameIds,
}: Props) {
  const [items, setItems] = useState<BoardgameItem[]>(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showCommonOnly, setShowCommonOnly] = useState(false);
  const nextPageRef = useRef(1);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("users");
  const tBoardgames = useTranslations("boardgames");
  const tLists = useTranslations("lists");

  const [addedBoardgameIds, setAddedBoardgameIds] = useState<Set<string>>(
    new Set(),
  );
  const [quickAddFeedback, setQuickAddFeedback] = useState<
    Record<string, "adding" | "added" | "exists">
  >({});
  const [, startTransition] = useTransition();

  const inMyList = useCallback(
    (boardgameId: string) =>
      initialViewerBoardgameIds.has(boardgameId) ||
      addedBoardgameIds.has(boardgameId),
    [initialViewerBoardgameIds, addedBoardgameIds],
  );

  const ratingGroups = useMemo(() => {
    const filtered = showCommonOnly
      ? items.filter((item) => inMyList(item.boardgame_id))
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
    () => items.filter((item) => inMyList(item.boardgame_id)).length,
    [items, inMyList],
  );

  const loadNextPage = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const result = await getBoardgameListItemsPage(
        boardgameListId,
        nextPageRef.current,
      );
      nextPageRef.current++;
      setItems((prev) => [...prev, ...result.items]);
      setHasMore(result.hasMore);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, boardgameListId]);

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
    (boardgameId: string) => {
      if (inMyList(boardgameId) || quickAddFeedback[boardgameId] === "adding")
        return;
      setQuickAddFeedback((prev) => ({ ...prev, [boardgameId]: "adding" }));
      startTransition(async () => {
        try {
          const result = await addBoardgameToMyList(boardgameId);
          if (result?.alreadyExists) {
            setAddedBoardgameIds((prev) => new Set([...prev, boardgameId]));
            setQuickAddFeedback((prev) => ({
              ...prev,
              [boardgameId]: "exists",
            }));
          } else {
            setAddedBoardgameIds((prev) => new Set([...prev, boardgameId]));
            setQuickAddFeedback((prev) => ({
              ...prev,
              [boardgameId]: "added",
            }));
          }
        } catch {
          setQuickAddFeedback((prev) => {
            const next = { ...prev };
            delete next[boardgameId];
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
            {t("boardgamesInCommon", { count: commonCount })}
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
            <div className="mb-2 flex items-center gap-3">
              <span className="whitespace-nowrap font-mono text-xs font-semibold tracking-widest text-text-faint uppercase">
                {tierLabel}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-2">
              {group.items.map((item) => {
                const globalIndex = sortedIds.indexOf(item.id);
                const thumbnailUrl = item.boardgames.thumbnail_url;
                const alreadyAdded = inMyList(item.boardgame_id);
                const feedback = quickAddFeedback[item.boardgame_id];

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 rounded-md border border-border bg-bg-surface p-2.5 md:gap-3 md:p-3"
                  >
                    <span className="w-5 shrink-0 text-center font-mono text-xs font-bold text-text-muted tabular-nums md:w-6">
                      {globalIndex + 1}
                    </span>

                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                      {thumbnailUrl ? (
                        <Image
                          src={thumbnailUrl}
                          alt={item.boardgames.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <PuzzlePiece size={14} className="text-text-faint" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary">
                      {item.boardgames.title}
                      {item.boardgames.year_published && (
                        <span className="ml-1.5 text-xs text-text-faint">
                          {item.boardgames.year_published}
                        </span>
                      )}
                    </div>

                    {item.rating != null && (
                      <span className="shrink-0 font-mono text-xs tabular-nums text-accent">
                        {item.rating}/10
                      </span>
                    )}

                    {isLoggedIn &&
                      (alreadyAdded ? (
                        <Check
                          size={18}
                          className="ml-1 shrink-0 text-accent"
                        />
                      ) : (
                        <button
                          onClick={() => handleQuickAdd(item.boardgame_id)}
                          disabled={feedback === "adding"}
                          className="ml-1 shrink-0 text-text-faint transition-colors hover:text-accent disabled:cursor-default"
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

      {showCommonOnly && ratingGroups.length === 0 && (
        <p className="text-sm text-text-muted">{t("noBoardgamesInCommon")}</p>
      )}

      <div ref={sentinelRef} className="flex justify-center py-2">
        {loadingMore && (
          <span className="text-xs text-text-faint">
            {tBoardgames("loading")}
          </span>
        )}
      </div>
    </div>
  );
}
