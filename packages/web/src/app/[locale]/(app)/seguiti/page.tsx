import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getFollowing } from "@/app/[locale]/(app)/follows/actions";
import { UserAvatar } from "@/components/UserAvatar";
import { EmptyState } from "@/components/EmptyState";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function SegutiPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const t = await getTranslations("follows");

  const following = await getFollowing();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold tracking-tight text-text-primary">
        {t("title")}
      </h1>

      {following.length === 0 ? (
        <EmptyState
          title={t("emptyTitle")}
          description={t("emptyDescription")}
        />
      ) : (
        <div className="grid gap-2">
          {following.map((profile) => (
            <Link
              key={profile.id}
              href={`/users/${profile.username}`}
              className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
            >
              <UserAvatar
                url={profile.avatar_url}
                username={profile.username}
                size={40}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text-primary">
                  @{profile.username}
                </p>
                <p className="text-xs text-text-muted">
                  {t("listsCount", { count: profile.lists_count })}
                </p>
              </div>
              {profile.similarity !== null && profile.similarity > 0 && (
                <span className="shrink-0 rounded-full border border-accent/30 bg-accent-muted px-2.5 py-1 text-xs font-semibold text-accent">
                  {profile.similarity}%
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
