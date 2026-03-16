"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

/**
 * Builds /auth/sign-in URL with optional redirect param so users return to the requested admin path after sign-in.
 * @param pathname - Current admin path (e.g. /admin/properties).
 * @returns URL string for the shared sign-in page.
 */
function signInUrl(pathname: string): string {
  const base = "/auth/sign-in";
  if (!pathname || pathname === "/admin") return base;
  return `${base}?redirect=${encodeURIComponent(pathname)}`;
}

/**
 * Wraps admin content and ensures the user is authenticated. If /api/auth/me fails,
 * redirects to /auth/sign-in with a redirect param so after sign-in they land back on the intended admin page.
 */
export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push(signInUrl(pathname ?? "/admin"));
      }
    } catch {
      setIsAuthenticated(false);
      router.push(signInUrl(pathname ?? "/admin"));
    }
  }, [router, pathname]);

  useEffect(() => {
    queueMicrotask(() => checkAuth());
  }, [checkAuth]);

  if (isAuthenticated === null) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-slate-600 dark:text-slate-400">
            Checking authentication...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isAuthenticated) {
    return null; // Router will redirect
  }

  return <>{children}</>;
}


