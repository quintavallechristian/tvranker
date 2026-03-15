"use client";

import { useState, useCallback, useEffect, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { SearchInput } from "@/components/SearchInput";
import { UserAvatar } from "@/components/UserAvatar";
import { EmptyState } from "@/components/EmptyState";
import { createClient } from "@/lib/supabase/client";
import { computeListSimilarity } from "@/lib/similarity";
import { getPosterUrl } from "@/lib/tmdb/client";
import {
  Television,
  PlusCircle,
  Check,
  SpinnerGap,
} from "@phosphor-icons/react";
import { getRecommendations, type RecommendedShow } from "./actions";
import { addShowToMyList } from "../lists/actions";

type UserResult = {
  id: string;
  username: string;
  avatar_url: string | null;
  show_count: number;
  similarity: number | null;
};

type ShowResult = {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
};

export default function ExplorePage() {
  const t = useTranslations("explore");
  const [userResults, setUserResults] = useState<UserResult[]>([]);
  const [showResults, setShowResults] = useState<ShowResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedShow[]>([]);
  const [recsLoading, setRecsLoading] = useState(true);
  const [addedShowIds, setAddedShowIds] = useState<Set<string>>(new Set());
  const [addingShowId, setAddingShowId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Load recommendations on mount
  useEffect(() => {
    let cancelled = false;
    getRecommendations()
      .then((recs) => {
        if (!cancelled) setRecommendations(recs);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setRecsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAddToList = useCallback((show: RecommendedShow) => {
    setAddingShowId(show.id);
    startTransition(async () => {
      try {
        const result = await addShowToMyList({
          id: show.id,
          tmdb_id: show.tmdb_id,
          imdb_id: null,
          title: show.title,
          poster_path: show.poster_path,
          first_air_date: show.first_air_date,
          overview: show.overview,
        });
        if (!result.alreadyExists) {
          setAddedShowIds((prev) => new Set(prev).add(show.id));
        }
      } catch {
        // silently fail
      } finally {
        setAddingShowId(null);
      }
    });
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setUserResults([]);
      setShowResults([]);
      setSearched(false);
      return;
    }

    setSearched(true);
    const supabase = createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Search users and shows in parallel
    const profilesPromise = supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .ilike("username", `%${query}%`)
      .limit(10);

    const showsPromise = fetch(
      `/api/tmdb/search?q=${encodeURIComponent(query)}`,
    ).then((res) => res.json());

    const [profilesResult, showsData] = await Promise.all([
      profilesPromise,
      showsPromise,
    ]);

    const profiles = profilesResult.data ?? [];

    // Show results from TMDB
    setShowResults(
      (showsData.results ?? []).slice(0, 6).map((s: ShowResult) => ({
        tmdb_id: s.tmdb_id,
        title: s.title,
        poster_path: s.poster_path,
        first_air_date: s.first_air_date,
        overview: s.overview,
      })),
    );

    if (!profiles.length) {
      setUserResults([]);
      return;
    }

    // Get viewer's list items for similarity computation
    let viewerItems: {
      show_id: string;
      rating: number | null;
      position: number;
    }[] = [];
    if (user) {
      const { data: viewerList } = await supabase
        .from("lists")
        .select("id")
        .eq("user_id", user.id)
        .single();
      if (viewerList) {
        const { data } = await supabase
          .from("list_items")
          .select("show_id, rating, position")
          .eq("list_id", viewerList.id)
          .order("position", { ascending: true });
        viewerItems = data ?? [];
      }
    }

    const viewerListData = viewerItems.map((i, idx) => ({
      showId: i.show_id,
      rating: i.rating,
      position: i.position ?? idx,
    }));

    // Get each user's list info + similarity
    const userResultsList: UserResult[] = [];
    for (const p of profiles) {
      if (user && p.id === user.id) continue;

      const { data: userList } = await supabase
        .from("lists")
        .select("id, is_public")
        .eq("user_id", p.id)
        .single();

      if (!userList?.is_public) {
        userResultsList.push({
          ...p,
          show_count: 0,
          similarity: null,
        });
        continue;
      }

      const { data: listItems, count } = await supabase
        .from("list_items")
        .select("show_id, rating, position", { count: "exact" })
        .eq("list_id", userList.id)
        .order("position", { ascending: true });

      let similarity: number | null = null;
      if (
        user &&
        viewerListData.length > 0 &&
        listItems &&
        listItems.length > 0
      ) {
        const otherListData = listItems.map((i, idx) => ({
          showId: i.show_id,
          rating: i.rating,
          position: i.position ?? idx,
        }));
        similarity = computeListSimilarity(viewerListData, otherListData);
      }

      userResultsList.push({
        ...p,
        show_count: count ?? 0,
        similarity,
      });
    }

    setUserResults(userResultsList);
  }, []);

  const hasSearchResults = userResults.length > 0 || showResults.length > 0;

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold tracking-tight text-text-primary">
        {t("title")}
      </h1>

      <SearchInput
        placeholder={t("searchPlaceholder")}
        onSearch={handleSearch}
        className="mb-6"
      />

      {/* Search results */}
      {searched && !hasSearchResults && <EmptyState title={t("noResults")} />}

      {searched && hasSearchResults && (
        <div className="mb-8 space-y-6">
          {/* User results */}
          {userResults.length > 0 && (
            <div>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t("usersSection")}
              </h2>
              <div className="grid gap-2">
                {userResults.map((user) => (
                  <Link
                    key={user.id}
                    href={`/users/${user.username}`}
                    className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
                  >
                    <UserAvatar
                      url={user.avatar_url}
                      username={user.username}
                      size={40}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">
                        @{user.username}
                      </p>
                      <p className="text-xs text-text-muted">
                        {t("showsInList", { count: user.show_count })}
                      </p>
                    </div>
                    {user.similarity !== null && user.similarity > 0 && (
                      <span className="rounded-full border border-accent/30 bg-accent-muted px-2.5 py-1 text-xs font-semibold text-accent">
                        {user.similarity}%
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Show results from TMDB */}
          {showResults.length > 0 && (
            <div>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t("showsSection")}
              </h2>
              <div className="grid gap-2">
                {showResults.map((show) => (
                  <div
                    key={show.tmdb_id}
                    className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-bg-surface p-3 transition-colors hover:border-border-hover"
                  >
                    <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-bg-elevated">
                      {show.poster_path ? (
                        <Image
                          src={getPosterUrl(show.poster_path, "w92")!}
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
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-text-primary">
                        {show.title}
                      </p>
                      {show.first_air_date && (
                        <p className="text-xs text-text-muted">
                          {show.first_air_date.slice(0, 4)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recommendations section — visible when not searching */}
      {!searched && (
        <div>
          <h2 className="mb-4 text-sm font-semibold text-text-secondary">
            {t("suggestedTitle")}
          </h2>

          {recsLoading && (
            <div className="flex items-center gap-2 py-8 justify-center">
              <SpinnerGap size={16} className="animate-spin text-text-muted" />
              <p className="text-xs text-text-muted">{t("suggestedLoading")}</p>
            </div>
          )}

          {!recsLoading && recommendations.length === 0 && (
            <EmptyState title={t("suggestedEmpty")} />
          )}

          {!recsLoading && recommendations.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {recommendations.map((show) => {
                const posterUrl = getPosterUrl(show.poster_path, "w342");
                const isAdded = addedShowIds.has(show.id);
                const isAdding = addingShowId === show.id;

                return (
                  <div
                    key={show.id}
                    className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg-surface transition-colors hover:border-border-hover"
                  >
                    {/* Poster */}
                    <div className="relative aspect-[2/3] w-full bg-bg-elevated">
                      {posterUrl ? (
                        <Image
                          src={posterUrl}
                          alt={show.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Television size={32} className="text-text-faint" />
                        </div>
                      )}

                      {/* Add to list overlay */}
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="w-full p-2">
                          {isAdded ? (
                            <span className="flex items-center justify-center gap-1 rounded-[var(--radius-sm)] bg-accent/20 px-2 py-1.5 text-xs font-medium text-accent">
                              <Check size={14} weight="bold" />
                              {t("addedToList")}
                            </span>
                          ) : (
                            <button
                              onClick={() => handleAddToList(show)}
                              disabled={isAdding}
                              className="flex w-full items-center justify-center gap-1 rounded-[var(--radius-sm)] bg-accent px-2 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
                            >
                              {isAdding ? (
                                <SpinnerGap
                                  size={14}
                                  className="animate-spin"
                                />
                              ) : (
                                <PlusCircle size={14} weight="bold" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <Link
                        href={`/shows/${show.id}`}
                        className="block truncate text-sm font-medium text-text-primary hover:text-accent transition-colors"
                      >
                        {show.title}
                      </Link>
                      <p className="mt-0.5 text-xs text-text-muted">
                        {t("recommendedBy", { count: show.recommendedBy })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
