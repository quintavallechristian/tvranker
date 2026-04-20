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
import {
  Plus,
  X,
  FunnelSimple,
  ChartPie,
  GearSix,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ListHeader } from "@/components/ListHeader";
import { ShowRow } from "@/components/ShowRow";
import { AddBoardgameDialog } from "@/components/AddBoardgameDialog";
import { SyncBGGDialog } from "@/components/SyncBGGDialog";
import { EmptyState } from "@/components/EmptyState";
import { OnboardingBoardgamesEmptyState } from "@/components/OnboardingBoardgamesEmptyState";
import {
  ListSettingsModal,
  type ListSettingsData,
  type ProfileVisibilityData,
} from "@/components/ListSettingsModal";
import { getRatingLabel } from "@/lib/rating-labels";
import {
  addBoardgameToList,
  removeBoardgameFromList,
  updateBoardgameRating,
  reorderBoardgameListItems,
  updateBoardgameListDescription,
  getBoardgameListItemsPage,
  updateBoardgameListSettings,
  syncFromBGG,
  type BoardgameItem,
} from "./actions";
import { addRecentList } from "@/lib/recent-lists";

type BoardgamesListClientProps = {
  boardgameListId: string;
  description: string | null;
  isPublic: boolean;
  initialItems: BoardgameItem[];
  existingBggIds: number[];
  ratingLabels?: string[] | null;
  hasMore: boolean;
  listSettings?: ListSettingsData;
  profileRatingLabels?: string[] | null;
  profileVisibility?: ProfileVisibilityData;
  bggUsername: string | null;
  lastSyncedAt: string | null;
};

export function BoardgamesListClient({
  boardgameListId,
  description: initialDescription,
  isPublic,
  initialItems,
  existingBggIds: initialExistingBggIds,
  ratingLabels,
  hasMore: initialHasMore,
  listSettings,
  profileRatingLabels,
  profileVisibility,
  bggUsername,
  lastSyncedAt,
}: BoardgamesListClientProps) {
  const router = useRouter();
  const t = useTranslations("boardgames");
  const tLists = useTranslations("lists");
  const [isPending, startTransition] = useTransition();

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showSyncDialog, setShowSyncDialog] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [items, setItems] = useState<BoardgameItem[]>(initialItems);

  // Track visit in sidebar recenti
  useEffect(() => {
    addRecentList({
      id: boardgameListId,
      topic: "boardgame",
      href: "/boardgames",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardgameListId]);
  const [existingBggIds, setExistingBggIds] = useState<number[]>(
    initialExistingBggIds,
  );

  // Description debounce
  const [description, setDescription] = useState(initialDescription ?? "");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const descDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Search + filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterRatings, setFilterRatings] = useState<Set<number | null>>(
    new Set(),
  );

  // Pagination
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const nextPageRef = useRef(1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Mobile rating bar
  const [openRatingItemId, setOpenRatingItemId] = useState<string | null>(null);

  const allRatings: (number | null)[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, null];

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      if (q && !item.boardgames.title.toLowerCase().includes(q)) return false;
      if (filterRatings.size > 0 && !filterRatings.has(item.rating))
        return false;
      return true;
    });
  }, [items, filterRatings, searchQuery]);

  const activeFilterCount = filterRatings.size;

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

  // Infinite scroll
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
        await reorderBoardgameListItems(newSorted);
      });
    },
    [sortedIds, startTransition],
  );

  const handleDescriptionChange = useCallback(
    (value: string) => {
      setDescription(value);
      if (descDebounceRef.current) clearTimeout(descDebounceRef.current);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      setSaveStatus("saving");
      descDebounceRef.current = setTimeout(() => {
        startTransition(async () => {
          await updateBoardgameListDescription(boardgameListId, value);
          setSaveStatus("saved");
          savedTimerRef.current = setTimeout(() => setSaveStatus("idle"), 2000);
        });
      }, 800);
    },
    [boardgameListId, startTransition],
  );

  const handleAdd = useCallback(
    async (boardgame: {
      bgg_id: number;
      title: string;
      year_published: number | null;
    }) => {
      startTransition(async () => {
        await addBoardgameToList(boardgameListId, {
          bgg_id: boardgame.bgg_id,
          title: boardgame.title,
          thumbnail_url: null,
          year_published: boardgame.year_published,
        });
        router.refresh();
      });
      setExistingBggIds((prev) => [...prev, boardgame.bgg_id]);
    },
    [boardgameListId, router, startTransition],
  );

  const handleRemove = useCallback(
    (itemId: string) => {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
      startTransition(async () => {
        await removeBoardgameFromList(itemId);
      });
    },
    [startTransition],
  );

  const handleRatingChange = useCallback(
    (itemId: string, rating: number) => {
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, rating } : item)),
      );
      startTransition(async () => {
        await updateBoardgameRating(itemId, rating);
      });
    },
    [startTransition],
  );

  const handleSync = useCallback(
    async (bggUsername: string, mode: "merge" | "replace") => {
      const result = await syncFromBGG(boardgameListId, bggUsername, mode);
      setShowSyncDialog(false);
      router.refresh();
      return result;
    },
    [boardgameListId, router],
  );

  return (
    <div>
      {/* Header + action buttons */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <ListHeader
            title={t("title")}
            description={description}
            isPublic={isPublic}
            onDescriptionChange={handleDescriptionChange}
            saveStatus={saveStatus}
          />
          <div className="flex shrink-0 items-center gap-2 mt-0.5">
            {listSettings && (
              <button
                onClick={() => setShowSettingsModal(true)}
                className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary"
              >
                <GearSix size={14} />
              </button>
            )}
            {items.length > 0 && (
              <Link
                href="/boardgames/analytics"
                className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary"
              >
                <ChartPie size={14} />
                {t("analytics")}
              </Link>
            )}
            <button
              onClick={() => setShowSyncDialog(true)}
              className="hidden items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary sm:flex"
            >
              <ArrowsClockwise size={14} />
              {t("syncBGG")}
            </button>
            {items.length > 0 && (
              <button
                onClick={() => setShowAddDialog(true)}
                className="hidden items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-accent-hover sm:flex"
              >
                <Plus size={14} />
                {t("addBoardgame")}
              </button>
            )}
          </div>
        </div>

        {/* Mobile-only buttons below title */}
        {items.length > 0 && (
          <div className="mt-3 flex items-center gap-2 sm:hidden">
            <button
              onClick={() => setShowAddDialog(true)}
              className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-accent-hover"
            >
              <Plus size={14} />
              {t("addBoardgame")}
            </button>
            <button
              onClick={() => setShowSyncDialog(true)}
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary"
            >
              <ArrowsClockwise size={14} />
              {t("syncBGG")}
            </button>
          </div>
        )}

        {/* Last sync info */}
        {lastSyncedAt && (
          <p className="mt-2 text-[11px] text-text-faint">
            {t("lastSynced", {
              date: new Date(lastSyncedAt).toLocaleDateString(),
            })}
          </p>
        )}
      </div>

      {/* Search bar + filters toggle */}
      {items.length > 0 && (
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-text-primary placeholder:text-text-faint focus:border-border-hover focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-secondary transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-2 text-xs transition-colors ${
              showFilters || activeFilterCount > 0
                ? "border-border-hover text-text-primary"
                : "border-border text-text-muted hover:border-border-hover hover:text-text-secondary"
            }`}
          >
            <FunnelSimple size={14} />
            {tLists("filters")}
            {activeFilterCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-surface-hover font-mono text-[10px] font-semibold text-text-primary">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Filter panel */}
      {showFilters && (
        <div className="mb-4 rounded-md border border-border bg-surface-subtle p-3">
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-faint">
              {tLists("ratingFilter")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {allRatings.map((rating) => {
                const active = filterRatings.has(rating);
                const label =
                  rating !== null
                    ? `${rating} · ${getRatingLabel(rating, ratingLabels)}`
                    : tLists("unrated");
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
                  {tLists("clearFilters")}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Items list */}
      {items.length === 0 ? (
        <OnboardingBoardgamesEmptyState
          onAddBoardgame={() => setShowAddDialog(true)}
        />
      ) : filteredItems.length === 0 ? (
        <EmptyState
          title={searchQuery ? t("noSearchResults") : t("noFilterResults")}
          description={
            searchQuery ? t("noSearchResultsHint") : t("noFilterResultsHint")
          }
        />
      ) : (
        <DndContext
          id="boardgames-list-dnd-context"
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
                        return (
                          <ShowRow
                            key={item.id}
                            id={item.id}
                            title={item.boardgames.title}
                            posterPath={null}
                            imageUrl={item.boardgames.thumbnail_url}
                            rating={item.rating}
                            position={globalIndex + 1}
                            ratingLabels={ratingLabels}
                            genres={item.boardgames.categories}
                            detailHref={`/boardgames/${item.boardgame_id}`}
                            onRatingChange={(rating) =>
                              handleRatingChange(item.id, rating)
                            }
                            onRemove={() => handleRemove(item.id)}
                            openMobileRating={openRatingItemId === item.id}
                            onMobileRatingChange={(open) =>
                              setOpenRatingItemId(open ? item.id : null)
                            }
                          />
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
            <span className="text-xs text-text-faint">{t("loadingMore")}</span>
          )}
        </div>
      )}

      <AddBoardgameDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={handleAdd}
        existingBggIds={existingBggIds}
      />

      <SyncBGGDialog
        open={showSyncDialog}
        onClose={() => setShowSyncDialog(false)}
        onSync={handleSync}
        savedBggUsername={bggUsername}
      />

      {listSettings && profileVisibility && (
        <ListSettingsModal
          open={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          listId={boardgameListId}
          settings={listSettings}
          profileRatingLabels={profileRatingLabels ?? null}
          profileVisibility={profileVisibility}
          onSave={async (id, updates) => {
            await updateBoardgameListSettings(id, updates);
          }}
        />
      )}
    </div>
  );
}
