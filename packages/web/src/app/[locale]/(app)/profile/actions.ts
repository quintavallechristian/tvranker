"use server";

import { cookies } from "next/headers";

const SUPPORTED_LOCALES = ["en", "it"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export async function setLocale(locale: string): Promise<void> {
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return;

  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, {
    maxAge: 365 * 24 * 60 * 60,
    path: "/",
    sameSite: "lax",
  });
}
