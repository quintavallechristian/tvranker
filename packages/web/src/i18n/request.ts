import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Try requestLocale first (set by next-intl middleware via internal rewrite)
  let locale = await requestLocale;

  // Fall back to NEXT_LOCALE cookie if requestLocale is not set
  if (!locale || !routing.locales.includes(locale as "en" | "it")) {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
    if (cookieLocale && routing.locales.includes(cookieLocale as "en" | "it")) {
      locale = cookieLocale;
    } else {
      locale = routing.defaultLocale;
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
