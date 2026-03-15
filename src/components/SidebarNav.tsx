"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { UserAvatar } from "./UserAvatar";
import {
  ListBullets,
  Compass,
  UserCircle,
  SignOut,
  Television,
} from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

type SidebarNavProps = {
  username: string;
  avatarUrl: string | null;
  locale: string;
};

export function SidebarNav({ username, avatarUrl, locale }: SidebarNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/lists", label: t("myList"), icon: ListBullets },
    { href: "/explore", label: t("explore"), icon: Compass },
    { href: "/profile", label: t("profile"), icon: UserCircle },
  ];

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`/${locale}/login`);
  }

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-border bg-bg-primary">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5">
        <Television size={22} weight="duotone" className="text-accent" />
        <span className="text-sm font-bold tracking-tight text-text-primary">
          TV Ranker
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.includes(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-bg-surface text-text-primary font-medium"
                  : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
              }`}
            >
              <Icon size={18} weight={isActive ? "fill" : "regular"} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border p-3 space-y-2">
        <LanguageSwitcher />
        <div className="flex items-center gap-2">
          <UserAvatar url={avatarUrl} username={username} size={28} />
          <span className="flex-1 truncate text-xs font-medium text-text-secondary">
            {username}
          </span>
          <button
            onClick={handleLogout}
            className="rounded-[var(--radius-sm)] p-1 text-text-faint transition-colors hover:text-error"
            aria-label="Sign out"
          >
            <SignOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
