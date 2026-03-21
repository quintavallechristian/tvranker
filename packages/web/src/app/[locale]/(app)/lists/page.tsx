import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ListDetailClient } from "./[id]/page-client";
import type { ListItemWithShow } from "./actions";

const PAGE_SIZE = 50;

export default async function MyListPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch the user's single list
  const { data: list } = await supabase
    .from("lists")
    .select("id, user_id, name, description, is_public")
    .eq("user_id", user.id)
    .single();

  // Safety: if no list exists yet (shouldn't happen with trigger), redirect
  if (!list) return redirect("/profile");

  // Fetch first page of items sorted by rating desc (nulls last), then position
  const { data: firstPageData } = await supabase
    .from("list_items")
    .select("*, shows(*)")
    .eq("list_id", list.id)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(0, PAGE_SIZE - 1);

  const firstPageItems = (firstPageData ?? []) as unknown as ListItemWithShow[];
  const hasMore = firstPageItems.length === PAGE_SIZE;

  // Fetch all TMDB ids for "already added" check in the add-show dialog
  const { data: allTmdbRows } = await supabase
    .from("list_items")
    .select("shows(tmdb_id)")
    .eq("list_id", list.id);

  const existingTmdbIds = (allTmdbRows ?? [])
    .map((row) => (row.shows as { tmdb_id: number | null } | null)?.tmdb_id)
    .filter((v): v is number => v != null && v > 0);

  // Fetch owner's rating labels
  const { data: ownerProfile } = await supabase
    .from("profiles")
    .select("rating_labels")
    .eq("id", user.id)
    .single();

  // Fetch tags for authenticated user
  let allTags: TagResult[] = [];
  let showTagsMap: Record<string, string[]> = {};

  if (firstPageItems.length > 0) {
    const [tagsResult, showTagsResult] = await Promise.all([
      supabase
        .from("tags")
        .select("*")
        .order("is_default", { ascending: false })
        .order("name"),
      supabase
        .from("show_tags")
        .select("show_id, tag_id")
        .eq("user_id", user.id)
        .in(
          "show_id",
          firstPageItems.map((i) => i.shows.id),
        ),
    ]);

    allTags = (tagsResult.data ?? []) as TagResult[];

    for (const st of showTagsResult.data ?? []) {
      if (!showTagsMap[st.show_id]) showTagsMap[st.show_id] = [];
      showTagsMap[st.show_id].push(st.tag_id);
    }
  } else {
    const { data: tagsResult } = await supabase
      .from("tags")
      .select("*")
      .order("is_default", { ascending: false })
      .order("name");
    allTags = (tagsResult ?? []) as TagResult[];
  }

  return (
    <ListDetailClient
      list={{
        id: list.id,
        name: list.name,
        description: list.description,
        is_public: list.is_public,
        list_items: firstPageItems,
      }}
      isOwner={true}
      isLoggedIn={true}
      existingTmdbIds={existingTmdbIds}
      ratingLabels={ownerProfile?.rating_labels as string[] | null}
      allTags={allTags}
      showTagsMap={showTagsMap}
      hasMore={hasMore}
      listId={list.id}
    />
  );
}

type TagResult = {
  id: string;
  user_id: string | null;
  name: string;
  color: string;
  is_default: boolean;
  created_at: string;
};
