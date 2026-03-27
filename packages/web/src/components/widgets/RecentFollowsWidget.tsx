"use client";

import { Users, ArrowRight } from "@phosphor-icons/react";
import { UserAvatar } from "@/components/UserAvatar";
import type { RecentFollowItem } from "@/app/[locale]/(app)/home/actions";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function RecentFollowsWidget({ items }: { items: RecentFollowItem[] }) {
  const t = useTranslations("home");
  const tf = useTranslations("follows");

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={14} weight="duotone" className="text-accent" />
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
            {t("widgets.recentFollows")}
          </p>
        </div>
        <Link
          href="/seguiti"
          className="flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-accent"
        >
          {t("widgets.viewAll")}
          <ArrowRight size={10} />
        </Link>
      </div>

      {items.length > 0 ? (
        <div className="flex flex-col gap-2">
          {items.map((f) => (
            <Link
              key={f.id}
              href={`/users/${f.username}`}
              className="flex items-center gap-2.5 rounded-md p-1.5 transition-colors hover:bg-bg-surface-hover"
            >
              <UserAvatar url={f.avatar_url} username={f.username} size={24} />
              <p className="min-w-0 flex-1 truncate text-xs font-medium text-text-primary">
                @{f.username}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-4">
          <Users size={20} className="text-text-faint" />
          <p className="text-xs text-text-muted">{tf("emptyTitle")}</p>
        </div>
      )}
    </div>
  );
}
