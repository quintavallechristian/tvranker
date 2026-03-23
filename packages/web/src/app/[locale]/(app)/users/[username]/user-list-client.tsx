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
import { Link } from "@/i18n/navigation";
import { Television, PlusCircle, Check, Funnel } from "@phosphor-icons/react";
import { getPosterUrl } from "@/lib/tmdb/client";
import { useTranslations } from "next-intl";
import {
  getListItemsPage,
  addShowToMyList,
  type ListItemWithShow,
} from "@/app/[locale]/(app)/lists/actions";
import { getRatingLabel } from "@/lib/rating-labels";

type Props = {
  listId: string;
  initialItems: ListItemWithShow[];
  initialHasMore: boolean;
  ratingLabels?: string[] | null;
  isLoggedIn: boolean;
  viewerItems: { show_id: string; rating: number | null }[];
};

export function UserListClient({
  listId,
  initialItems,
  initialHasMore,
  ratingLabels,
  isLoggedIn,
  viewerItems: initialViewerItems,
}: Props) {
  const [items, setItems] = useState<ListItemWithShow[]>(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showCommonOnly, setShowCommonOnly] = useState(false);
  const nextPageRef = useRef(1);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("users");
  const tLists = useTranslations("lists");

  // Track which shows have been added during this session
  const [addedShowIds, setAddedShowIds] = useState<Set<string>>(new Set());
  const [quickAddFeedback, setQuickAddFeedback] = useState<
    Record<string, "adding" | "added" | "exists">
  >({});
  const [, startTransition] = useTransition();

  // Map of showId -> viewer's rating (null = in list but unrated)
  const viewerRatingMap = useMemo(() => {
    const map = new Map<string, number | null>();
    for (const item of initialViewerItems) {
      map.set(item.show_id, item.rating);
    }
    return map;
  }, [initialViewerItems]);

  const inMyList = useCallback(
    (showId: string) =>
      viewerRatingMap.has(showId) || addedShowIds.has(showId),
    [viewerRatingMap, addedShowIds],
  );

  const getViewerRating = useCallback(
    (showId: string): number | null | undefined => {
      if (addedShowIds.has(showId) && !viewerRatingMap.has(showId)) return undefined;
      return viewerRatingMap.get(showId);
    },
    [viewerRatingMap, addedShowIds],
  );

  // Rating groups, sorted desc with unrated last
  const ratingGroups = useMemo(() => {
    const filtered = showCommonOnly
      ? items.filter((item) => inMyList(item.shows.id))
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
    () => items.filter((item) => inMyList(item.shows.id)).length,
    [items, inMyList],
  );

  // Infinite scroll
  const loadNextPage = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const result = await getListItemsPage(listId, nextPageRef.current);
      nextPageRef.current++;
      setItems((prev) => [...prev, ...result.items]);
      setHasMore(result.hasMore);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, listId]);

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
    (show: ListItemWithShow["shows"]) => {
      const showId = show.id;
      if (inMyList(showId) || quickAddFeedback[showId] === "adding") return;
      setQuickAddFeedback((prev) => ({ ...prev, [showId]: "adding" }));
      startTransition(async () => {
        try {
          const result = await addShowToMyList({
            id: show.id,
            tmdb_id: show.tmdb_id,
            imdb_id: show.imdb_id,
            title: show.title,
            poster_path: show.poster_path,
            first_air_date: show.first_air_date,
            overview: show.overview,
          });
          if (result.alreadyExists) {
            setAddedShowIds((prev) => new Set([...prev, showId]));
            setQuickAddFeedback((prev) => ({ ...prev, [showId]: "exists" }));
          } else {
            setAddedShowIds((prev) => new Set([...prev, showId]));
            setQuickAddFeedback((prev) => ({ ...prev, [showId]: "added" }));
          }
        } catch {
          setQuickAddFeedback((prev) => {
            const next = { ...prev };
            delete next[showId];
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
            {t("inCommon", { count: commonCount })}
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
                const posterUrl = getPosterUrl(item.shows.poster_path, "w92");
                const alreadyAdded = inMyList(item.shows.id);
                const feedback = quickAddFeedback[item.shows.id];
                const viewerRating = getViewerRating(item.shows.id);

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 md:gap-3 rounded-md border border-border bg-bg-surface p-2.5 md:p-3"
                  >
                    {/* Position */}
                    <span className="w-5 md:w-6 text-center font-mono text-xs font-bold text-text-muted tabular-nums shrink-0">
                      {globalIndex + 1}
                    </span>

                    {/* Poster */}
                    <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                      {posterUrl ? (
                        <Image
                          src={posterUrl}
                          alt={item.shows.title}
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

                    {/* Title — links to show detail */}
                    <Link
                      href={`/shows/${item.shows.id}`}
                      className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary hover:text-accent transition-colors"
                    >
                      {item.shows.title}
                    </Link>

                    {/* Their rating */}
                    {item.rating != null && (
                      <span className="shrink-0 font-mono text-xs tabular-nums text-accent">
                        {item.rating}/10
                      </span>
                    )}

                    {/* Viewer's rating or quick-add */}
                    {isLoggedIn && (
                      alreadyAdded ? (
                        viewerRating != null ? (
                          <span
                            className="shrink-0 ml-1 font-mono text-xs tabular-nums text-text-muted"
                            title={t("yourRating")}
                          >
                            {viewerRating}/10
                          </span>
                        ) : (
                          <Check size={18} className="shrink-0 ml-1 text-accent" />
                        )
                      ) : (
                        <button
                          onClick={() => handleQuickAdd(item.shows)}
                          disabled={feedback === "adding"}
                          className="shrink-0 ml-1 text-text-faint transition-colors hover:text-accent disabled:cursor-default"
                          title={tLists("addToMyList")}
                        >
                          <PlusCircle size={18} />
                        </button>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Common filter empty state */}
      {showCommonOnly && ratingGroups.length === 0 && (
        <p className="text-sm text-text-muted">{t("noCommon")}</p>
      )}

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="flex justify-center py-2">
        {loadingMore && (
          <span className="text-xs text-text-faint">{tLists("loadingMore")}</span>
        )}
      </div>
    </div>
  );
}
