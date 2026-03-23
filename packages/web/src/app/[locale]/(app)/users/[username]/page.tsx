import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UserAvatar } from "@/components/UserAvatar";
import { FollowButton } from "@/components/FollowButton";
import { computeListSimilarity } from "@/lib/similarity";
import { UserListClient } from "./user-list-client";
import { ListItemWithShow } from "../../lists/actions";
import { Link } from "@/i18n/navigation";

export default async function UserProfilePage({
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

  // Fetch the user's single list
  // RLS enforces visibility (is_public, visible_to_followers, visible_to_following):
  // if the list is returned, the viewer has access.
  const { data: list } = await supabase
    .from("lists")
    .select("id, name, description, is_public")
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

  // Compute similarity with current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let similarityScore: number | null = null;
  if (user && user.id !== profile.id && list) {
    // Fetch viewer's list items
    const { data: viewerList } = await supabase
      .from("lists")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (viewerList) {
      const [viewerItems, profileItems] = await Promise.all([
        supabase
          .from("list_items")
          .select("show_id, rating, position")
          .eq("list_id", viewerList.id)
          .order("position", { ascending: true }),
        supabase
          .from("list_items")
          .select("show_id, rating, position")
          .eq("list_id", list.id)
          .order("position", { ascending: true }),
      ]);

      const listA = (viewerItems.data ?? []).map((i, idx) => ({
        showId: i.show_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const listB = (profileItems.data ?? []).map((i, idx) => ({
        showId: i.show_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));

      similarityScore = computeListSimilarity(listA, listB);
    }
  }

  // Check if current user follows this profile
  let isFollowing = false;
  const isOwnProfile = user?.id === profile.id;
  if (user && !isOwnProfile) {
    const { data: follow } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", user.id)
      .eq("following_id", profile.id)
      .maybeSingle();
    isFollowing = !!follow;
  }

  // Fetch the viewer's own show IDs + ratings so we can mark already-added shows
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
      {/* User header */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <UserAvatar
          url={profile.avatar_url}
          username={profile.username}
          size={56}
        />
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-text-primary">
            @{profile.username}
          </h1>
          <p className="text-sm text-text-muted">{tUsers("showCount", { count: itemCount })}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {similarityScore !== null && (
            <div className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-muted px-3 py-1.5">
              <span className="text-sm font-semibold text-accent">
                {similarityScore}%
              </span>
              <span className="text-xs text-text-muted">{tUsers("compatible")}</span>
            </div>
          )}
          {user && !isOwnProfile && (
            <FollowButton
              profileId={profile.id}
              initialFollowing={isFollowing}
            />
          )}
        </div>
      </div>

      {/* List */}
      {list ? (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">
                {list.name}
              </h2>
              {list.description && (
                <p className="mt-0.5 text-xs text-text-muted">
                  {list.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-faint">{tUsers("showCount", { count: itemCount })}</span>
              <Link
                href={`/users/${profile.username}/analytics`}
                className="rounded-md border border-border px-2.5 py-1 text-xs text-text-muted transition-colors hover:border-border-hover hover:text-text-secondary"
              >
                {tUsers("analytics")}
              </Link>
            </div>
          </div>

          {listItems.length === 0 ? (
            <p className="text-sm text-text-muted">{tUsers("noShows")}</p>
          ) : (
            <UserListClient
              listId={list.id}
              initialItems={listItems}
              initialHasMore={hasMore}
              isLoggedIn={!!user && !isOwnProfile}
              viewerItems={viewerItems}
              ratingLabels={profile.rating_labels}
            />
          )}
        </div>
      ) : (
        <p className="text-sm text-text-muted">
          {tUsers("privateList")}
        </p>
      )}
    </div>
  );
}
