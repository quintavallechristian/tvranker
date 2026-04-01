import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UserAvatar } from "@/components/UserAvatar";
import { computeListSimilarity } from "@/lib/similarity";
import { fetchAllRows } from "@/lib/supabase/fetchAll";
import { UserListClient } from "../user-list-client";
import { ListItemWithShow } from "../../../shows/lists/actions";
import { Link } from "@/i18n/navigation";
import { Television } from "@phosphor-icons/react/dist/ssr";

export default async function UserShowsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();
  const tUsers = await getTranslations("users");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  const { data: list } = await supabase
    .from("lists")
    .select("id, name, description, is_public, rating_labels")
    .eq("user_id", profile.id)
    .single();

  // Fetch list items (first 50, sorted by rating desc then position)
  let listItems: ListItemWithShow[] = [];
  let itemCount = 0;
  let hasMore = false;
  if (list) {
    const { data: itemsData, count } = await supabase
      .from("list_items")
      .select("*, shows(*)", { count: "exact" })
      .eq("list_id", list.id)
      .order("rating", { ascending: false, nullsFirst: false })
      .order("position", { ascending: true })
      .range(0, 49);
    listItems = (itemsData ?? []) as unknown as ListItemWithShow[];
    itemCount = count ?? listItems.length;
    hasMore = listItems.length === 50 && itemCount > 50;
  }

  // Current user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isOwnProfile = user?.id === profile.id;

  // Compute show similarity
  let similarityScore: number | null = null;
  if (user && !isOwnProfile && list) {
    const { data: viewerList } = await supabase
      .from("lists")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (viewerList) {
      const [listAData, listBData] = await Promise.all([
        fetchAllRows((from, to) =>
          supabase
            .from("list_items")
            .select("show_id, rating, position")
            .eq("list_id", viewerList.id)
            .order("position", { ascending: true })
            .range(from, to),
        ),
        fetchAllRows((from, to) =>
          supabase
            .from("list_items")
            .select("show_id, rating, position")
            .eq("list_id", list.id)
            .order("position", { ascending: true })
            .range(from, to),
        ),
      ]);
      const listA = listAData.map((i, idx) => ({
        showId: i.show_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const listB = listBData.map((i, idx) => ({
        showId: i.show_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      similarityScore = computeListSimilarity(listA, listB);
    }
  }

  // Fetch viewer's items for "in my list" markers
  let viewerItems: { show_id: string; rating: number | null }[] = [];
  if (user && !isOwnProfile && list) {
    const { data: viewerList } = await supabase
      .from("lists")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (viewerList) {
      const { data: fetchedViewerItems } = await supabase
        .from("list_items")
        .select("show_id, rating")
        .eq("list_id", viewerList.id);
      viewerItems = (fetchedViewerItems ?? []) as {
        show_id: string;
        rating: number | null;
      }[];
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Link
          href={`/users/${profile.username}`}
          className="flex items-center gap-3"
        >
          <UserAvatar
            url={profile.avatar_url}
            username={profile.username}
            size={40}
          />
          <span className="text-base font-semibold tracking-tight text-text-primary">
            @{profile.username}
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-3">
          {similarityScore !== null && (
            <div className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-muted px-3 py-1.5">
              <span className="text-sm font-semibold text-accent">
                {similarityScore}%
              </span>
              <span className="text-xs text-text-muted">
                {tUsers("compatible")}
              </span>
            </div>
          )}
          <Link
            href={`/users/${profile.username}/analytics`}
            className="rounded-md border border-border px-2.5 py-1 text-xs text-text-muted transition-colors hover:border-border-hover hover:text-text-secondary"
          >
            {tUsers("analytics")}
          </Link>
        </div>
      </div>

      {/* Show count */}
      {list && (
        <div className="mb-4 flex items-center gap-2">
          <Television size={16} className="text-text-muted" />
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
            {tUsers("showCount", { count: itemCount })}
          </p>
        </div>
      )}

      {/* List */}
      {list ? (
        listItems.length === 0 ? (
          <p className="text-sm text-text-muted">{tUsers("noShows")}</p>
        ) : (
          <UserListClient
            listId={list.id}
            initialItems={listItems}
            initialHasMore={hasMore}
            isLoggedIn={!!user && !isOwnProfile}
            viewerItems={viewerItems}
            ratingLabels={list.rating_labels ?? profile.rating_labels}
          />
        )
      ) : (
        <p className="text-sm text-text-muted">{tUsers("privateList")}</p>
      )}
    </div>
  );
}
