/**
 * Next.js Middleware
 * 
 * Protects admin routes with authentication
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "admin_session";

export function middleware(request: NextRequest) {
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

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};


