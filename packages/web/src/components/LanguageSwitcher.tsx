"use client";

import { usePathname, useRouter } from "next/navigation";
import { GlobeSimple } from "@phosphor-icons/react";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.startsWith("/it") ? "it" : "en";
  const otherLocale = currentLocale === "en" ? "it" : "en";

  function switchLocale() {
    const newPath = pathname.replace(/^\/(en|it)/, `/${otherLocale}`);
    router.push(newPath);
  }

  return (
    <button
      onClick={switchLocale}
      className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs text-text-muted transition-colors hover:bg-bg-surface hover:text-text-secondary"
    >
      <GlobeSimple size={14} />
      {currentLocale === "en" ? "Italiano" : "English"}
    </button>
  );
}
