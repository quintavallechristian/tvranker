"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SearchInput } from "@/components/SearchInput";
import { UserAvatar } from "@/components/UserAvatar";
import { EmptyState } from "@/components/EmptyState";
import { createClient } from "@/lib/supabase/client";
import { computeListSimilarity } from "@/lib/similarity";

type UserResult = {
  id: string;
  username: string;
  avatar_url: string | null;
  show_count: number;
  similarity: number | null;
};

export default function ExplorePage() {
  const t = useTranslations("explore");
  const [results, setResults] = useState<UserResult[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    setSearched(true);
    const supabase = createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .ilike("username", `%${query}%`)
      .limit(20);

    if (!profiles?.length) {
      setResults([]);
      return;
    }

    // Get viewer's list items for similarity computation
    let viewerItems: { show_id: string; rating: number | null }[] = [];
    if (user) {
      const { data: viewerList } = await supabase
        .from("lists")
        .select("id")
        .eq("user_id", user.id)
        .single();
      if (viewerList) {
        const { data } = await supabase
          .from("list_items")
          .select("show_id, rating")
          .eq("list_id", viewerList.id);
        viewerItems = data ?? [];
      }
    }

    const viewerListData = viewerItems.map((i) => ({
      showId: i.show_id,
      rating: i.rating,
    }));

    // Get each user's list info + similarity
    const userResults: UserResult[] = [];
    for (const p of profiles) {
      // Skip self
      if (user && p.id === user.id) continue;

      const { data: userList } = await supabase
        .from("lists")
        .select("id, is_public")
        .eq("user_id", p.id)
        .single();

      if (!userList?.is_public) {
        userResults.push({
          ...p,
          show_count: 0,
          similarity: null,
        });
        continue;
      }

      const { data: listItems, count } = await supabase
        .from("list_items")
        .select("show_id, rating", { count: "exact" })
        .eq("list_id", userList.id);

      let similarity: number | null = null;
      if (
        user &&
        viewerListData.length > 0 &&
        listItems &&
        listItems.length > 0
      ) {
        const otherListData = listItems.map((i) => ({
          showId: i.show_id,
          rating: i.rating,
        }));
        similarity = computeListSimilarity(viewerListData, otherListData);
      }

      userResults.push({
        ...p,
        show_count: count ?? 0,
        similarity,
      });
    }

    setResults(userResults);
  }, []);

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

      {searched && results.length === 0 && <EmptyState title={t("noUsers")} />}

      <div className="grid gap-2">
        {results.map((user) => (
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
  );
}
