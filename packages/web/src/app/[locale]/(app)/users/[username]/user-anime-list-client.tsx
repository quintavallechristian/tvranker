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
import { FilmSlate, PlusCircle, Check, Funnel } from "@phosphor-icons/react";
import { getPosterUrl } from "@/lib/tmdb/client";
import { useTranslations } from "next-intl";
import {
  getAnimeListItemsPage,
  addAnimeToMyList,
  type AnimeItem,
} from "@/app/[locale]/(app)/anime/actions";
import { getRatingLabel } from "@/lib/rating-labels";

type Props = {
  animeListId: string;
  initialItems: AnimeItem[];
  initialHasMore: boolean;
  ratingLabels?: string[] | null;
  isLoggedIn: boolean;
  viewerAnimeIds: Set<string>;
};

export function UserAnimeListClient({
  animeListId,
  initialItems,
  initialHasMore,
  ratingLabels,
  isLoggedIn,
  viewerAnimeIds: initialViewerAnimeIds,
}: Props) {
  const [items, setItems] = useState<AnimeItem[]>(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showCommonOnly, setShowCommonOnly] = useState(false);
  const nextPageRef = useRef(1);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("users");
  const tAnime = useTranslations("anime");
  const tLists = useTranslations("lists");

  const [addedAnimeIds, setAddedAnimeIds] = useState<Set<string>>(new Set());
  const [quickAddFeedback, setQuickAddFeedback] = useState<
    Record<string, "adding" | "added" | "exists">
  >({});
  const [, startTransition] = useTransition();

  const inMyList = useCallback(
    (animeId: string) =>
      initialViewerAnimeIds.has(animeId) || addedAnimeIds.has(animeId),
    [initialViewerAnimeIds, addedAnimeIds],
  );

  const ratingGroups = useMemo(() => {
    const filtered = showCommonOnly
      ? items.filter((item) => inMyList(item.anime_id))
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
    () => items.filter((item) => inMyList(item.anime_id)).length,
    [items, inMyList],
  );

  const loadNextPage = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const result = await getAnimeListItemsPage(
        animeListId,
        nextPageRef.current,
      );
      nextPageRef.current++;
      setItems((prev) => [...prev, ...result.items]);
      setHasMore(result.hasMore);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, animeListId]);

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
    (animeId: string) => {
      if (inMyList(animeId) || quickAddFeedback[animeId] === "adding") return;
      setQuickAddFeedback((prev) => ({ ...prev, [animeId]: "adding" }));
      startTransition(async () => {
        try {
          const result = await addAnimeToMyList(animeId);
          if (result?.alreadyExists) {
            setAddedAnimeIds((prev) => new Set([...prev, animeId]));
            setQuickAddFeedback((prev) => ({ ...prev, [animeId]: "exists" }));
          } else {
            setAddedAnimeIds((prev) => new Set([...prev, animeId]));
            setQuickAddFeedback((prev) => ({ ...prev, [animeId]: "added" }));
          }
        } catch {
          setQuickAddFeedback((prev) => {
            const next = { ...prev };
            delete next[animeId];
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
            {t("animeInCommon", { count: commonCount })}
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
                const posterUrl = getPosterUrl(item.animes.poster_path, "w92");
                const alreadyAdded = inMyList(item.anime_id);
                const feedback = quickAddFeedback[item.anime_id];

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 rounded-md border border-border bg-bg-surface p-2.5 md:gap-3 md:p-3"
                  >
                    {/* Position */}
                    <span className="w-5 shrink-0 text-center font-mono text-xs font-bold text-text-muted tabular-nums md:w-6">
                      {globalIndex + 1}
                    </span>

                    {/* Poster */}
                    <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
                      {posterUrl ? (
                        <Image
                          src={posterUrl}
                          alt={item.animes.title}
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

                    {/* Title — links to anime detail */}
                    <Link
                      href={`/anime/${item.anime_id}`}
                      className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary transition-colors hover:text-accent"
                    >
                      {item.animes.title}
                      {item.animes.first_air_date && (
                        <span className="ml-1.5 text-xs text-text-faint">
                          {new Date(item.animes.first_air_date).getFullYear()}
                        </span>
                      )}
                    </Link>

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
                          onClick={() => handleQuickAdd(item.anime_id)}
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
        <p className="text-sm text-text-muted">{t("noAnimeInCommon")}</p>
      )}

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="flex justify-center py-2">
        {loadingMore && (
          <span className="text-xs text-text-faint">{tAnime("loading")}</span>
        )}
      </div>
    </div>
  );
}
