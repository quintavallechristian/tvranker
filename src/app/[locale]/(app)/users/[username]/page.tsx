import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { UserAvatar } from "@/components/UserAvatar";
import { Link } from "@/i18n/navigation";
import { Globe, Television } from "@phosphor-icons/react/dist/ssr";
import { computeListSimilarity } from "@/lib/similarity";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  // Fetch the user's single list
  const { data: list } = await supabase
    .from("lists")
    .select("id, name, description, is_public")
    .eq("user_id", profile.id)
    .single();

  // Get item count
  let itemCount = 0;
  if (list) {
    const { count } = await supabase
      .from("list_items")
      .select("*", { count: "exact", head: true })
      .eq("list_id", list.id);
    itemCount = count ?? 0;
  }

  // Compute similarity with current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let similarityScore: number | null = null;
  if (user && user.id !== profile.id && list?.is_public) {
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
          .select("show_id, rating")
          .eq("list_id", viewerList.id),
        supabase
          .from("list_items")
          .select("show_id, rating")
          .eq("list_id", list.id),
      ]);

      const listA = (viewerItems.data ?? []).map((i) => ({
        showId: i.show_id,
        rating: i.rating,
      }));
      const listB = (profileItems.data ?? []).map((i) => ({
        showId: i.show_id,
        rating: i.rating,
      }));

      similarityScore = computeListSimilarity(listA, listB);
    }
  }

  return (
    <div>
      {/* User header */}
      <div className="mb-8 flex items-center gap-4">
        <UserAvatar
          url={profile.avatar_url}
          username={profile.username}
          size={56}
        />
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-text-primary">
            @{profile.username}
          </h1>
          <p className="text-sm text-text-muted">{itemCount} shows</p>
        </div>
        {similarityScore !== null && (
          <div className="ml-auto flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-muted px-3 py-1.5">
            <span className="text-sm font-semibold text-accent">
              {similarityScore}%
            </span>
            <span className="text-xs text-text-muted">compatible</span>
          </div>
        )}
      </div>

      {/* Single list link */}
      {list?.is_public ? (
        <Link
          href={`/lists/${list.id}`}
          className="flex items-center justify-between rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
        >
          <div className="flex items-center gap-3">
            <Television size={20} className="text-accent" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-text-primary">
                  {list.name}
                </h3>
                <Globe size={12} className="text-accent" />
              </div>
              {list.description && (
                <p className="mt-0.5 text-xs text-text-muted">
                  {list.description}
                </p>
              )}
            </div>
          </div>
          <span className="text-xs text-text-faint">{itemCount} shows</span>
        </Link>
      ) : (
        <p className="text-sm text-text-muted">
          This user&apos;s list is private.
        </p>
      )}
    </div>
  );
}
