"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { UserAvatar } from "./UserAvatar";
import {
  ListBullets,
  Compass,
  SignOut,
  Television,
  Question,
  List as HamburgerIcon,
  X,
} from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type SidebarNavProps = {
  username: string;
  avatarUrl: string | null;
};

export function SidebarNav({ username, avatarUrl }: SidebarNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close overlay on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const links = [
    { href: "/lists", label: t("myList"), icon: ListBullets },
    { href: "/explore", label: t("explore"), icon: Compass },
    { href: "/faq", label: t("faq"), icon: Question },
  ];

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <>
      {/* ── Mobile top bar ── */}
      <header className="fixed inset-x-0 top-0 z-40 flex md:hidden items-center justify-between border-b border-border bg-bg-primary/95 backdrop-blur-md px-4 h-12">
        <div className="flex items-center gap-2">
          <Television size={20} weight="duotone" className="text-accent" />
          <span className="text-sm font-bold tracking-tight text-text-primary">
            TV Ranker
          </span>
        </div>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="p-1 text-text-secondary"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X size={22} weight="bold" />
          ) : (
            <HamburgerIcon size={22} weight="bold" />
          )}
        </button>
      </header>

      {/* ── Mobile overlay menu ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Scrim */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <nav className="absolute inset-y-0 left-0 w-64 flex flex-col border-r border-border bg-bg-primary shadow-xl">
            {/* Logo row */}
            <div className="flex items-center justify-between px-4 h-12 border-b border-border">
              <div className="flex items-center gap-2">
                <Television
                  size={20}
                  weight="duotone"
                  className="text-accent"
                />
                <span className="text-sm font-bold tracking-tight text-text-primary">
                  TV Ranker
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-text-muted"
                aria-label="Close menu"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 px-2 pt-2">
              {links.map(({ href, label, icon: Icon }) => {
                const isActive = pathname.includes(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-bg-surface text-text-primary font-medium"
                        : "text-text-secondary active:bg-bg-surface"
                    }`}
                  >
                    <Icon size={20} weight={isActive ? "fill" : "regular"} />
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Bottom: user + logout */}
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-md)] py-1.5 pr-1 transition-colors active:opacity-70"
                >
                  <UserAvatar url={avatarUrl} username={username} size={28} />
                  <span className="flex-1 truncate text-xs font-medium text-text-secondary">
                    {username}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-[var(--radius-sm)] p-1.5 text-text-faint transition-colors hover:text-error"
                  aria-label="Sign out"
                >
                  <SignOut size={16} />
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex h-screen w-56 shrink-0 flex-col border-r border-border bg-bg-primary">
        <div className="flex items-center gap-2 px-4 py-5">
          <Television size={22} weight="duotone" className="text-accent" />
          <span className="text-sm font-bold tracking-tight text-text-primary">
            TV Ranker
          </span>
        </div>

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

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className="flex min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-md)] py-1 pr-1 transition-colors hover:opacity-80"
            >
              <UserAvatar url={avatarUrl} username={username} size={28} />
              <span className="flex-1 truncate text-xs font-medium text-text-secondary">
                {username}
              </span>
            </Link>
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
    </>
  );
}
