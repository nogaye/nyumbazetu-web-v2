/**
 * Next.js Proxy (formerly Middleware)
 *
 * Request gateway at the network boundary. Protects admin routes with
 * authentication: allows /admin/login, redirects logged-in users from login
 * to /admin/properties, and redirects unauthenticated users to login for
 * other /admin/* routes.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Cookie name used for admin session. */
const SESSION_COOKIE_NAME = "admin_session";

/**
 * Proxy handler: runs before requests reach the app. Enforces admin auth
 * and redirects as needed.
 *
 * @param request - Incoming request.
 * @returns NextResponse (redirect or next()).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to login page
  if (pathname === "/admin/login") {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
    // If already logged in, redirect to properties page
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/admin/properties", request.url));
    }
    return NextResponse.next();
  }

  // Protect all other admin routes
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

    // If no session, redirect to login
    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

/** Paths this proxy runs for. */
export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
