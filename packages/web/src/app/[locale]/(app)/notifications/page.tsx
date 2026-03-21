import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UserAvatar } from "@/components/UserAvatar";
import { Link } from "@/i18n/navigation";
import { EmptyState } from "@/components/EmptyState";

type NotificationRow = {
  id: string;
  type: string;
  read: boolean;
  created_at: string;
  actor: {
    id: string;
    username: string;
    avatar_url: string | null;
  } | null;
};

function formatTime(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return locale === "it" ? "Adesso" : "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60)
    return locale === "it" ? `${minutes} min fa` : `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24)
    return locale === "it" ? `${hours}h fa` : `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7)
    return locale === "it" ? `${days}g fa` : `${days}d ago`;

  return date.toLocaleDateString(locale === "it" ? "it-IT" : "en-US", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export default async function NotificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const t = await getTranslations("notifications");

  // Fetch notifications with actor profile data
  const { data: rawNotifications } = await supabase
    .from("notifications")
    .select(
      "id, type, read, created_at, actor:profiles!notifications_actor_id_fkey(id, username, avatar_url)"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const notifications = (rawNotifications ?? []) as NotificationRow[];

  // Mark all as read (after fetching so unread styling is still accurate on this render)
  const hasUnread = notifications.some((n) => !n.read);
  if (hasUnread) {
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false);
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-text-primary">
          {t("title")}
        </h1>
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          title={t("emptyTitle")}
          description={t("emptyDescription")}
        />
      ) : (
        <div className="flex flex-col gap-1">
          {notifications.map((notification) => {
            const actor = notification.actor;
            if (!actor) return null;

            return (
              <Link
                key={notification.id}
                href={`/users/${actor.username}`}
                className={`flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-bg-surface ${
                  !notification.read ? "bg-bg-surface" : ""
                }`}
              >
                {/* Unread dot */}
                <div className="flex w-2 shrink-0 items-center justify-center">
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  )}
                </div>

                <UserAvatar
                  url={actor.avatar_url}
                  username={actor.username}
                  size={40}
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">{actor.username}</span>{" "}
                    <span className="text-text-secondary">
                      {t("newFollower")}
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-text-muted">
                    {formatTime(notification.created_at, locale)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
