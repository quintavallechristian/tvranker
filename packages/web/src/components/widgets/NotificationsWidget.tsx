"use client";

import { Bell, ArrowRight } from "@phosphor-icons/react";
import { UserAvatar } from "@/components/UserAvatar";
import type { NotificationItem } from "@/app/[locale]/(app)/home/actions";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function NotificationsWidget({ items }: { items: NotificationItem[] }) {
  const t = useTranslations("home");
  const tn = useTranslations("notifications");

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={14} weight="duotone" className="text-accent" />
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
            {t("widgets.notifications")}
          </p>
        </div>
        <Link
          href="/notifications"
          className="flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-accent"
        >
          {t("widgets.viewAll")}
          <ArrowRight size={10} />
        </Link>
      </div>

      {items.length > 0 ? (
        <div className="flex flex-col gap-2">
          {items.map((n) => (
            <Link
              key={n.id}
              href={`/users/${n.actor_username}`}
              className="flex items-center gap-2.5 rounded-md p-1.5 transition-colors hover:bg-bg-surface-hover"
            >
              {!n.read && (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              )}
              <UserAvatar
                url={n.actor_avatar_url}
                username={n.actor_username}
                size={24}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-text-primary">
                  <span className="font-medium">@{n.actor_username}</span>{" "}
                  <span className="text-text-secondary">
                    {tn("newFollower")}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-4">
          <Bell size={20} className="text-text-faint" />
          <p className="text-xs text-text-muted">{tn("emptyTitle")}</p>
        </div>
      )}
    </div>
  );
}
