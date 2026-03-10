"use client";

import {
  useState,
  useTransition,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, ArrowLeft, X, FunnelSimple, CopySimple } from "@phosphor-icons/react";
import { Link, useRouter as useI18nRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { tagBadgeStyle } from "@/lib/tag-colors";
import type { TagColor } from "@/lib/tag-colors";
import { ListHeader } from "@/components/ListHeader";
import { ShowRow } from "@/components/ShowRow";
import { AddShowDialog } from "@/components/AddShowDialog";
import { EmptyState } from "@/components/EmptyState";
import { getRatingLabel } from "@/lib/rating-labels";
import {
  updateList,
  addShowToList,
  removeShowFromList,
  updateShowRating,
  reorderListItems,
  getListItemsPage,
  addShowToMyList,
  duplicateList,
  type ListItemWithShow,
} from "../actions";
import {
  addTagToShow,
  removeTagFromShow,
  createTag,
  type TagRow,
} from "../../tags/actions";
import { fetchTmdbData } from "../../shows/actions";

type ListItem = ListItemWithShow;

type ListDetailClientProps = {
  list: {
    id: string;
    name: string;
    description: string | null;
    is_public: boolean;
    list_items: ListItem[];
  };
  isOwner: boolean;
  isLoggedIn: boolean;
  existingTmdbIds: number[];
  ratingLabels?: string[] | null;
  allTags?: TagRow[];
  showTagsMap?: Record<string, string[]>;
  hasMore: boolean;
  listId: string;
  userLists?: { id: string; name: string }[];
};

// Thin wrapper that fires a callback once when the element enters the viewport.
// Only attaches the observer when the show has not yet been enriched from TMDB.
function ShowRowObserver({
  tmdbFetched,
  onVisible,
  children,
}: {
  tmdbFetched: boolean;
  onVisible: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);
  const onVisibleRef = useRef(onVisible);
  onVisibleRef.current = onVisible;

  useEffect(() => {
    if (tmdbFetched || triggered.current) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          onVisibleRef.current();
          observer.disconnect();
        }
      },
      { rootMargin: "150px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref}>{children}</div>;
}

export function ListDetailClient({
  list,
  isOwner,
  isLoggedIn,
  existingTmdbIds,
  ratingLabels,
  allTags = [],
  showTagsMap: initialShowTagsMap = {},
  hasMore: initialHasMore,
  listId,
  userLists = [],
}: ListDetailClientProps) {
  const router = useRouter();
  const i18nRouter = useI18nRouter();
  const t = useTranslations("lists");
  const tCommon = useTranslations("common");
  const [isPending, startTransition] = useTransition();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [items, setItems] = useState<ListItem[]>(list.list_items);
  const [showTagsMap, setShowTagsMap] =
    useState<Record<string, string[]>>(initialShowTagsMap);
  const [filterTagIds, setFilterTagIds] = useState<string[]>([]);
  const [filterRatings, setFilterRatings] = useState<Set<number | null>>(
    new Set(),
  );
  const [showFilters, setShowFilters] = useState(false);

  // Quick-add: which show is being picked for
  const [quickAddShowId, setQuickAddShowId] = useState<string | null>(null);
  const [quickAddFeedback, setQuickAddFeedback] = useState<Record<string, string>>({});
  // Duplicate list
  const [isDuplicating, setIsDuplicating] = useState(false);

  // Pagination state
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const nextPageRef = useRef(1); // page 0 was server-rendered
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Track in-flight TMDB fetches to avoid duplicates
  const fetchingTmdb = useRef<Set<string>>(new Set());

  // All possible rating tiers (1-10 + null for Unrated)
  const allRatings: (number | null)[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, null];

  // Items filtered by selected tag + rating filters
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filterTagIds.length > 0) {
        const itemTagIds = showTagsMap[item.shows.id] ?? [];
        if (!filterTagIds.every((id) => itemTagIds.includes(id))) return false;
      }
      if (filterRatings.size > 0 && !filterRatings.has(item.rating))
        return false;
      return true;
    });
  }, [items, showTagsMap, filterTagIds, filterRatings]);

  const activeFilterCount = filterTagIds.length + filterRatings.size;

  // Group items by rating tier (desc), unrated last
  const ratingGroups = useMemo(() => {
    const sorted = [...filteredItems].sort((a, b) => {
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
  }, [filteredItems]);

  const sortedIds = useMemo(
    () => ratingGroups.flatMap((g) => g.items.map((i) => i.id)),
    [ratingGroups],
  );

  // Infinite scroll: load next page when sentinel enters view
  const loadNextPage = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const result = await getListItemsPage(listId, nextPageRef.current);
      nextPageRef.current++;
      setItems((prev) => [...prev, ...result.items]);
      setShowTagsMap((prev) => ({ ...prev, ...result.showTagsMap }));
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

  // Lazy TMDB fetch: called when an un-enriched row enters view
  const handleShowInView = useCallback(async (showId: string) => {
    if (fetchingTmdb.current.has(showId)) return;
    fetchingTmdb.current.add(showId);
    try {
      const result = await fetchTmdbData(showId);
      if (result) {
        setItems((prev) =>
          prev.map((item) =>
            item.shows.id === showId
              ? {
                  ...item,
                  shows: {
                    ...item.shows,
                    title: result.title ?? item.shows.title,
                    poster_path: result.poster_path ?? item.shows.poster_path,
                    first_air_date:
                      result.first_air_date ?? item.shows.first_air_date,
                    overview: result.overview ?? item.shows.overview,
                    tmdb_id: result.tmdb_id ?? item.shows.tmdb_id,
                    tmdb_fetched: true,
                  },
                }
              : item,
          ),
        );
      }
    } catch {
      // Silently ignore fetch errors — data will stay stale
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = sortedIds.indexOf(active.id as string);
      const newIndex = sortedIds.indexOf(over.id as string);

      const newSorted = [...sortedIds];
      newSorted.splice(oldIndex, 1);
      newSorted.splice(newIndex, 0, active.id as string);

      setItems((prev) => {
        const reordered = newSorted.map(
          (id) => prev.find((item) => item.id === id)!,
        );
        return reordered.map((item, index) => ({ ...item, position: index }));
      });

      startTransition(async () => {
        await reorderListItems(list.id, newSorted);
      });
    },
    [sortedIds, list.id, startTransition],
  );

  const handleNameChange = useCallback(
    (name: string) => {
      startTransition(async () => {
        await updateList(list.id, { name });
      });
    },
    [list.id, startTransition],
  );

  const handleDescriptionChange = useCallback(
    (description: string) => {
      startTransition(async () => {
        await updateList(list.id, { description });
      });
    },
    [list.id, startTransition],
  );

  const handleTogglePublic = useCallback(() => {
    startTransition(async () => {
      await updateList(list.id, { is_public: !list.is_public });
      router.refresh();
    });
  }, [list.id, list.is_public, router, startTransition]);

  const handleAddShow = useCallback(
    async (show: {
      tmdb_id: number;
      title: string;
      poster_path: string | null;
      first_air_date: string;
      overview: string;
    }) => {
      startTransition(async () => {
        await addShowToList(list.id, show);
        router.refresh();
      });
    },
    [list.id, router, startTransition],
  );

  const handleRemove = useCallback(
    (itemId: string) => {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
      startTransition(async () => {
        await removeShowFromList(list.id, itemId);
      });
    },
    [list.id, startTransition],
  );

  const handleRatingChange = useCallback(
    (itemId: string, rating: number) => {
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, rating } : item)),
      );
      startTransition(async () => {
        await updateShowRating(list.id, itemId, rating);
      });
    },
    [list.id, startTransition],
  );

  const handleTagAdd = useCallback(
    (showId: string, tagId: string) => {
      setShowTagsMap((prev) => ({
        ...prev,
        [showId]: [...(prev[showId] ?? []), tagId],
      }));
      startTransition(async () => {
        await addTagToShow(showId, tagId);
      });
    },
    [startTransition],
  );

  const handleTagRemove = useCallback(
    (showId: string, tagId: string) => {
      setShowTagsMap((prev) => ({
        ...prev,
        [showId]: (prev[showId] ?? []).filter((id) => id !== tagId),
      }));
      startTransition(async () => {
        await removeTagFromShow(showId, tagId);
      });
    },
    [startTransition],
  );

  const handleTagCreate = useCallback(
    async (name: string, color: string): Promise<TagRow> => {
      return createTag(name, color);
    },
    [],
  );

  // Quick-add a show to one of the user's own lists
  const handleQuickAddToList = useCallback(
    async (targetListId: string, show: ListItem["shows"]) => {
      const showKey = show.id;
      try {
        const result = await addShowToMyList(targetListId, {
          id: show.id,
          tmdb_id: show.tmdb_id,
          imdb_id: show.imdb_id,
          title: show.title,
          poster_path: show.poster_path,
          first_air_date: show.first_air_date,
          overview: show.overview,
        });
        const targetName = userLists.find((l) => l.id === targetListId)?.name ?? "";
        if (result.alreadyExists) {
          setQuickAddFeedback((prev) => ({ ...prev, [showKey]: t("alreadyInList") }));
        } else {
          setQuickAddFeedback((prev) => ({ ...prev, [showKey]: t("addedToList", { list: targetName }) }));
        }
      } catch {
        setQuickAddFeedback((prev) => ({ ...prev, [showKey]: "Error" }));
      }
      setQuickAddShowId(null);
      setTimeout(() => {
        setQuickAddFeedback((prev) => {
          const next = { ...prev };
          delete next[showKey];
          return next;
        });
      }, 2000);
    },
    [userLists, t],
  );

  // Duplicate entire list
  const handleDuplicateList = useCallback(async () => {
    setIsDuplicating(true);
    try {
      const newName = t("copyOf", { name: list.name });
      const result = await duplicateList(list.id, newName);
      i18nRouter.push(`/lists/${result.listId}`);
    } catch {
      setIsDuplicating(false);
    }
  }, [list.id, list.name, t, i18nRouter]);

  return (
    <div>
      {/* Back link */}
      <Link
        href="/lists"
        className="mb-4 inline-flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-text-secondary"
      >
        <ArrowLeft size={12} />
        Back to lists
      </Link>

      {/* List header */}
      <div className="mb-6">
        <ListHeader
          name={list.name}
          description={list.description}
          isPublic={list.is_public}
          onNameChange={isOwner ? handleNameChange : undefined}
          onDescriptionChange={isOwner ? handleDescriptionChange : undefined}
          onTogglePublic={isOwner ? handleTogglePublic : undefined}
          readOnly={!isOwner}
        />
      </div>

      {/* Toolbar: add show + filters toggle + duplicate */}
      <div className="mb-4 flex items-center gap-2">
        {isOwner && (
          <button
            onClick={() => setShowAddDialog(true)}
            className="flex items-center gap-1.5 rounded-[var(--radius-md)] border border-dashed border-border px-3 py-2 text-xs text-text-muted transition-colors hover:border-border-hover hover:text-text-secondary"
          >
            <Plus size={14} />
            Add show
          </button>
        )}
        {!isOwner && isLoggedIn && (
          <button
            onClick={handleDuplicateList}
            disabled={isDuplicating}
            className="flex items-center gap-1.5 rounded-[var(--radius-md)] border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary disabled:opacity-50"
          >
            <CopySimple size={14} />
            {isDuplicating ? t("duplicating") : t("duplicateList")}
          </button>
        )}
        {(allTags.length > 0 || items.length > 0) && (
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 rounded-[var(--radius-md)] border px-3 py-2 text-xs transition-colors ${
              showFilters || activeFilterCount > 0
                ? "border-border-hover text-text-primary"
                : "border-border text-text-muted hover:border-border-hover hover:text-text-secondary"
            }`}
          >
            <FunnelSimple size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-surface-hover font-mono text-[10px] font-semibold text-text-primary">
                {activeFilterCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mb-4 rounded-[var(--radius-md)] border border-border bg-surface-subtle p-3 space-y-3">
          {/* Rating filter */}
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-faint">
              Rating
            </p>
            <div className="flex flex-wrap gap-1.5">
              {allRatings.map((rating) => {
                const active = filterRatings.has(rating);
                const label =
                  rating !== null
                    ? `${rating} · ${getRatingLabel(rating, ratingLabels)}`
                    : "Unrated";
                return (
                  <button
                    key={rating ?? "unrated"}
                    onClick={() =>
                      setFilterRatings((prev) => {
                        const next = new Set(prev);
                        if (active) next.delete(rating);
                        else next.add(rating);
                        return next;
                      })
                    }
                    className={`flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-xs font-medium transition-colors ${
                      active
                        ? "border-border-hover bg-surface-hover text-text-primary"
                        : "border-border text-text-muted hover:border-border-hover hover:text-text-secondary"
                    }`}
                  >
                    {label}
                    {active && <X size={10} weight="bold" />}
                  </button>
                );
              })}
              {filterRatings.size > 0 && (
                <button
                  onClick={() => setFilterRatings(new Set())}
                  className="text-xs text-text-muted transition-colors hover:text-text-secondary"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Tag filter */}
          {allTags.length > 0 && (
            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-faint">
                Tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => {
                  const active = filterTagIds.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      onClick={() =>
                        setFilterTagIds((prev) =>
                          active
                            ? prev.filter((id) => id !== tag.id)
                            : [...prev, tag.id],
                        )
                      }
                      className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium transition-opacity"
                      style={tagBadgeStyle(tag.color as TagColor)}
                    >
                      {tag.name}
                      {active && <X size={10} weight="bold" />}
                    </button>
                  );
                })}
                {filterTagIds.length > 0 && (
                  <button
                    onClick={() => setFilterTagIds([])}
                    className="text-xs text-text-muted transition-colors hover:text-text-secondary"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Items list */}
      {items.length === 0 ? (
        <EmptyState
          title="No shows in this list yet"
          description={isOwner ? "Add a show to get started" : undefined}
        />
      ) : filteredItems.length === 0 ? (
        <EmptyState
          title="No shows match the selected filters"
          description="Try removing some filters"
        />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedIds}
            strategy={verticalListSortingStrategy}
          >
            <div className={`space-y-6 ${isPending ? "opacity-70" : ""}`}>
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
                        return (
                          <ShowRowObserver
                            key={item.id}
                            tmdbFetched={item.shows.tmdb_fetched}
                            onVisible={() => handleShowInView(item.shows.id)}
                          >
                            <ShowRow
                              id={item.id}
                              title={item.shows.title}
                              posterPath={item.shows.poster_path}
                              rating={item.rating}
                              position={globalIndex + 1}
                              showId={item.shows.id}
                              ratingLabels={ratingLabels}
                              onRatingChange={
                                isOwner
                                  ? (rating) =>
                                      handleRatingChange(item.id, rating)
                                  : undefined
                              }
                              onRemove={
                                isOwner
                                  ? () => handleRemove(item.id)
                                  : undefined
                              }
                              readOnly={!isOwner}
                              allTags={allTags.length > 0 ? allTags : undefined}
                              selectedTagIds={showTagsMap[item.shows.id] ?? []}
                              onTagAdd={
                                isOwner
                                  ? (tagId) =>
                                      handleTagAdd(item.shows.id, tagId)
                                  : undefined
                              }
                              onTagRemove={
                                isOwner
                                  ? (tagId) =>
                                      handleTagRemove(item.shows.id, tagId)
                                  : undefined
                              }
                              onTagCreate={
                                isOwner ? handleTagCreate : undefined
                              }
                              onQuickAdd={
                                !isOwner && isLoggedIn && userLists.length > 0
                                  ? () => setQuickAddShowId(item.shows.id)
                                  : undefined
                              }
                              quickAddLabel={t("addToMyList")}
                            />
                            {/* Quick-add feedback */}
                            {quickAddFeedback[item.shows.id] && (
                              <div className="mt-1 text-xs text-accent animate-in fade-in">
                                {quickAddFeedback[item.shows.id]}
                              </div>
                            )}
                            {/* List picker dropdown */}
                            {quickAddShowId === item.shows.id && (
                              <div className="mt-1 rounded-[var(--radius-md)] border border-border bg-bg-surface p-2 shadow-lg animate-in fade-in slide-in-from-top-1">
                                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-faint">
                                  {t("selectList")}
                                </p>
                                <div className="space-y-1">
                                  {userLists.map((ul) => (
                                    <button
                                      key={ul.id}
                                      onClick={() =>
                                        handleQuickAddToList(ul.id, item.shows)
                                      }
                                      className="w-full rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-xs text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
                                    >
                                      {ul.name}
                                    </button>
                                  ))}
                                </div>
                                <button
                                  onClick={() => setQuickAddShowId(null)}
                                  className="mt-1.5 w-full text-center text-[10px] text-text-faint hover:text-text-muted"
                                >
                                  {tCommon("cancel")}
                                </button>
                              </div>
                            )}
                          </ShowRowObserver>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Infinite scroll sentinel */}
      {items.length > 0 && (
        <div ref={sentinelRef} className="mt-4 flex justify-center py-4">
          {loadingMore && (
            <span className="text-xs text-text-faint">Loading more…</span>
          )}
        </div>
      )}

      {/* Add show dialog */}
      <AddShowDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={handleAddShow}
        existingTmdbIds={existingTmdbIds}
      />
    </div>
  );
}
