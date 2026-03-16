"use client";

/**
 * Layout shell switcher: renders the main marketing shell (MainNav + SiteFooter) or
 * the listings marketplace shell (ListingsHeader + ListingsFooter) based on pathname.
 * Used in the root layout so /listings/** gets a dedicated header/footer and the
 * rest of the site keeps the standard marketing nav and footer.
 */

import { usePathname } from "next/navigation";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { ListingsHeader } from "@/components/listings/listings-header";
import { ListingsFooter } from "@/components/listings/listings-footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CookieConsent } from "@/components/cookie-consent";

/** Path prefix for routes that use the listings marketplace shell. */
const LISTINGS_PREFIX = "/listings";

/** Path prefix for auth pages; these use a full-viewport layout without main nav/footer. */
const AUTH_PREFIX = "/auth";

/**
 * Returns true when the current path should use the listings shell (header + footer).
 */
function useListingsShell(): boolean {
  const pathname = usePathname();
  return pathname?.startsWith(LISTINGS_PREFIX) ?? false;
}

/**
 * Returns true when the current path is an auth route (sign-in, sign-up, etc.).
 * Auth routes render only main content for a focused, full-viewport experience.
 */
function useAuthShell(): boolean {
  const pathname = usePathname();
  return pathname?.startsWith(AUTH_PREFIX) ?? false;
}

/**
 * Renders the appropriate shell (marketing or listings) and main content.
 * Auth routes get no nav/footer for a premium, focused auth experience.
 */
export function LayoutShell({ children }: { children: React.ReactNode }) {
  const isAuth = useAuthShell();
  const isListings = useListingsShell();

  if (isAuth) {
    return (
      <>
        <main className="min-h-screen" id="main-content" role="main">
          {children}
        </main>
      </>
    );
  }

  if (isListings) {
    return (
      <>
        <ListingsHeader />
        <main className="min-h-screen" id="main-content" role="main">
          {children}
        </main>
        <ListingsFooter />
        <ScrollToTop />
        <CookieConsent />
      </>
    );
  }

  return (
    <>
      <MainNav />
      <main className="min-h-screen" id="main-content" role="main">
        {children}
      </main>
      <SiteFooter />
      <ScrollToTop />
      <CookieConsent />
    </>
  );
}
