import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { UserAvatar } from "@/components/UserAvatar";
import { Link } from "@/i18n/navigation";
import { Globe } from "@phosphor-icons/react/dist/ssr";

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

  const { data: lists } = await supabase
    .from("lists")
    .select(
      `
      *,
      list_items(count)
    `,
    )
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .order("position", { ascending: true });

  const listsWithCount = (lists || []).map((list) => ({
    ...list,
    item_count:
      (list.list_items as unknown as { count: number }[])?.[0]?.count ?? 0,
  }));

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
          <p className="text-sm text-text-muted">
            {listsWithCount.length} public lists
          </p>
        </div>
      </div>

      {/* Public lists */}
      {listsWithCount.length === 0 ? (
        <p className="text-sm text-text-muted">No public lists yet.</p>
      ) : (
        <div className="grid gap-3">
          {listsWithCount.map((list) => (
            <Link
              key={list.id}
              href={`/lists/${list.id}`}
              className="flex items-center justify-between rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
            >
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
              <span className="text-xs text-text-faint">
                {list.item_count} shows
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
