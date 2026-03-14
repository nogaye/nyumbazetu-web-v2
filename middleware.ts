/**
 * Next.js Middleware
 *
 * Admin routes are currently open (no authentication). /admin/login redirects to /admin.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect login page to admin dashboard (auth disabled for now)
  if (pathname === "/admin/login") {
    const redirectTo = request.nextUrl.searchParams.get("redirect") || "/admin";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};


