"use client";

/**
 * Admin layout: redirects all /admin and /admin/* requests to the unified portal at /listings/portal.
 * Admin features have been merged into the listings portal; this preserves old bookmarks and links.
 */

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

/** Maps legacy admin paths to portal paths so deep links land on the right section. */
const ADMIN_TO_PORTAL_PATH: Record<string, string> = {
  "/admin": "/listings/portal",
  "/admin/properties": "/listings/portal/my-listings",
  "/admin/inquiries": "/listings/portal/leads",
  "/admin/amenities": "/listings/portal/amenities",
  "/admin/comments": "/listings/portal/comments",
  "/admin/reviews": "/listings/portal/reviews",
  "/admin/analytics": "/listings/portal/performance",
  "/admin/settings": "/listings/portal/settings",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const normalized = pathname ?? "/admin";
    const target =
      ADMIN_TO_PORTAL_PATH[normalized] ?? "/listings/portal";
    router.replace(target);
  }, [router, pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Redirecting to portal…
      </p>
    </div>
  );
}
