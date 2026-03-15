import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Auth-protected routes
const protectedPatterns = ["/lists", "/profile", "/import"];
// Auth routes (redirect to /lists if already logged in)
const authPatterns = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  // First, handle i18n
  const response = intlMiddleware(request);

  // Then handle auth session refresh
  const { user, supabaseResponse } = await updateSession(request);

  // Copy Supabase cookies to the intl response
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value);
  });

  const pathname = request.nextUrl.pathname;

  // Protect routes: redirect to /login if not authenticated
  if (protectedPatterns.some((p) => pathname.startsWith(p)) && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return Response.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (authPatterns.some((p) => pathname.startsWith(p)) && user) {
    return Response.redirect(new URL("/lists", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except static files
    "/((?!_next|api|.*\\..*).*)",
  ],
};
