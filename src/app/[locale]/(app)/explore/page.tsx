"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SearchInput } from "@/components/SearchInput";
import { UserAvatar } from "@/components/UserAvatar";
import { EmptyState } from "@/components/EmptyState";
import { createClient } from "@/lib/supabase/client";

type UserResult = {
  id: string;
  username: string;
  avatar_url: string | null;
  public_list_count: number;
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

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .ilike("username", `%${query}%`)
      .limit(20);

    if (!profiles?.length) {
      setResults([]);
      return;
    }

    // Get public list counts for each user
    const userResults: UserResult[] = [];
    for (const p of profiles) {
      const { count } = await supabase
        .from("lists")
        .select("*", { count: "exact", head: true })
        .eq("user_id", p.id)
        .eq("is_public", true);

      userResults.push({
        ...p,
        public_list_count: count ?? 0,
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

      {searched && results.length === 0 && (
        <EmptyState title={t("noPublicLists") || "No users found"} />
      )}

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
            <div>
              <p className="text-sm font-medium text-text-primary">
                @{user.username}
              </p>
              <p className="text-xs text-text-muted">
                {user.public_list_count} {t("publicLists").toLowerCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
