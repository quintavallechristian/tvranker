import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ListDetailClient } from "./page-client";
import type { ListItemWithShow } from "../actions";

const PAGE_SIZE = 50;

export default async function ListDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch list metadata (without items)
  const { data: list } = await supabase
    .from("lists")
    .select("id, user_id, name, description, is_public")
    .eq("id", id)
    .single();

  if (!list) notFound();

  const isOwner = user?.id === list.user_id;
  if (!list.is_public && !isOwner) notFound();

  // Fetch first page of items sorted by rating desc (nulls last), then position
  const { data: firstPageData } = await supabase
    .from("list_items")
    .select("*, shows(*)")
    .eq("list_id", id)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(0, PAGE_SIZE - 1);

  const firstPageItems = (firstPageData ?? []) as unknown as ListItemWithShow[];
  const hasMore = firstPageItems.length === PAGE_SIZE;

  // Fetch all TMDB ids for "already added" check in the add-show dialog
  const { data: allTmdbRows } = await supabase
    .from("list_items")
    .select("shows(tmdb_id)")
    .eq("list_id", id);

  const existingTmdbIds = (allTmdbRows ?? [])
    .map((row) => (row.shows as { tmdb_id: number | null } | null)?.tmdb_id)
    .filter((v): v is number => v != null && v > 0);

  // Fetch list owner's rating labels
  const { data: ownerProfile } = await supabase
    .from("profiles")
    .select("rating_labels")
    .eq("id", list.user_id)
    .single();

  // Fetch tags for authenticated user
  let allTags: TagResult[] = [];
  let showTagsMap: Record<string, string[]> = {};

  if (user && firstPageItems.length > 0) {
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
  } else if (user) {
    const { data: tagsResult } = await supabase
      .from("tags")
      .select("*")
      .order("is_default", { ascending: false })
      .order("name");
    allTags = (tagsResult ?? []) as TagResult[];
  }

  // Fetch user's own lists for quick-add (when viewing someone else's list)
  let userLists: { id: string; name: string }[] = [];
  if (user && !isOwner) {
    const { data: ownLists } = await supabase
      .from("lists")
      .select("id, name")
      .eq("user_id", user.id)
      .order("position", { ascending: true });
    userLists = (ownLists ?? []) as { id: string; name: string }[];
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
      isOwner={isOwner}
      isLoggedIn={!!user}
      existingTmdbIds={existingTmdbIds}
      ratingLabels={ownerProfile?.rating_labels as string[] | null}
      allTags={allTags}
      showTagsMap={showTagsMap}
      hasMore={hasMore}
      listId={id}
      userLists={userLists}
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
