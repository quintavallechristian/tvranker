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
import { Television, PlusCircle, Check } from "@phosphor-icons/react";
import { getPosterUrl } from "@/lib/tmdb/client";
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
  // show IDs (DB ids) already in the viewer's list
  viewerShowIds: string[];
};

export function UserListClient({
  listId,
  initialItems,
  initialHasMore,
  ratingLabels,
  isLoggedIn,
  viewerShowIds: initialViewerShowIds,
}: Props) {
  const [items, setItems] = useState<ListItemWithShow[]>(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const nextPageRef = useRef(1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Track which shows have been added during this session
  const [addedShowIds, setAddedShowIds] = useState<Set<string>>(new Set());
  const [quickAddFeedback, setQuickAddFeedback] = useState<
    Record<string, "adding" | "added" | "exists">
  >({});
  const [, startTransition] = useTransition();

  // Merge initial viewer show ids with session-added ones
  const inMyList = useCallback(
    (showId: string) =>
      initialViewerShowIds.includes(showId) || addedShowIds.has(showId),
    [initialViewerShowIds, addedShowIds],
  );

  // Rating groups, sorted desc with unrated last
  const ratingGroups = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
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
  }, [items]);

  const sortedIds = useMemo(
    () => ratingGroups.flatMap((g) => g.items.map((i) => i.id)),
    [ratingGroups],
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
      {ratingGroups.map((group) => {
        const tierLabel =
          group.rating !== null
            ? `${group.rating} · ${getRatingLabel(group.rating, ratingLabels)}`
            : "Unrated";
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

                    {/* Rating */}
                    {item.rating != null && (
                      <span className="shrink-0 font-mono text-xs tabular-nums text-accent">
                        {item.rating}/10
                      </span>
                    )}

                    {/* Quick-add button */}
                    {isLoggedIn && (
                      <button
                        onClick={() => handleQuickAdd(item.shows)}
                        disabled={alreadyAdded || feedback === "adding"}
                        className="shrink-0 ml-1 text-text-faint transition-colors hover:text-accent disabled:cursor-default"
                        title={
                          alreadyAdded
                            ? "Already in your list"
                            : "Add to my list"
                        }
                      >
                        {alreadyAdded ||
                        feedback === "added" ||
                        feedback === "exists" ? (
                          <Check size={18} className="text-accent" />
                        ) : (
                          <PlusCircle size={18} />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="flex justify-center py-2">
        {loadingMore && (
          <span className="text-xs text-text-faint">Loading more…</span>
        )}
      </div>
    </div>
  );
}
