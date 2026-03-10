import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Auth-protected routes (locale-prefixed)
const protectedPatterns = ["/lists", "/profile", "/import"];
// Auth routes (redirect to /lists if already logged in)
const authPatterns = ["/login", "/register"];

function getPathWithoutLocale(pathname: string): string {
  const localePattern = /^\/(en|it)/;
  return pathname.replace(localePattern, "") || "/";
}

export async function middleware(request: NextRequest) {
  // First, handle i18n
  const response = intlMiddleware(request);

  // Then handle auth session refresh
  const { user, supabaseResponse } = await updateSession(request);

  // Copy Supabase cookies to the intl response
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value);
  });

  const pathWithoutLocale = getPathWithoutLocale(request.nextUrl.pathname);

  // Protect routes: redirect to /login if not authenticated
  if (protectedPatterns.some((p) => pathWithoutLocale.startsWith(p)) && !user) {
    const locale =
      request.nextUrl.pathname.match(/^\/(en|it)/)?.[1] ||
      routing.defaultLocale;
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return Response.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (authPatterns.some((p) => pathWithoutLocale.startsWith(p)) && user) {
    const locale =
      request.nextUrl.pathname.match(/^\/(en|it)/)?.[1] ||
      routing.defaultLocale;
    return Response.redirect(new URL(`/${locale}/lists`, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except static files
    "/((?!_next|api|.*\\..*).*)",
  ],
};
