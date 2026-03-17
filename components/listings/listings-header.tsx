"use client";

/**
 * Listings marketplace header: single clean row — logo and actions.
 * Saved and Manage listings only when signed in; Sign in only when signed out.
 * Uses framer-motion for a subtle entrance animation.
 */

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, PlusCircle, User, Menu, ArrowLeft } from "lucide-react";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/components/auth/auth-provider";

export function ListingsHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useAuth();
  const signedIn = !!user;

  return (
    <motion.header
      initial={false}
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.25 }}
      className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/98 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/98"
      role="banner"
    >
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo and back-to-home */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#344767] focus-visible:ring-offset-2 transition-colors"
            aria-label="Back to Nyumba Zetu main site"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Back to main site</span>
          </Link>
          <Link
            href="/listings"
            className="flex shrink-0 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#344767] focus-visible:ring-offset-2 rounded-md"
            aria-label="Nyumba Zetu Listings Home"
          >
            <Image src="/logo.svg" alt="Nyumba Zetu" width={28} height={28} className="h-7 w-7" />
            <span className="hidden font-display text-base font-semibold text-slate-900 dark:text-slate-50 sm:inline">
              Nyumba Zetu
            </span>
            <span className="hidden text-slate-500 dark:text-slate-400 sm:inline">Listings</span>
          </Link>
        </div>

        {/* Right: actions — Saved (signed in only), Post Listing, Sign in (signed out only), theme, menu */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {signedIn && (
            <Link
              href="/listings/portal/favorites"
              className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
              aria-label="Saved listings"
            >
              <Heart className="h-5 w-5" />
            </Link>
          )}
          <Button asChild size="sm" className="bg-[#344767] hover:bg-[#2a3952] text-white border-0 shrink-0">
            <Link href="/listings/post" className="gap-1.5">
              <PlusCircle className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Post listing</span>
            </Link>
          </Button>
          {!loading && !signedIn && (
            <Link
              href="/auth/sign-in"
              className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors hidden sm:inline-flex"
              aria-label="Sign in"
            >
              <User className="h-5 w-5" />
            </Link>
          )}
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent className="w-full max-w-sm">
          <SheetHeader>
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetClose onClick={() => setMobileOpen(false)} />
          </SheetHeader>
          <div className="mt-8 flex flex-col gap-1">
            <Link
              href="/listings/search"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              All listings
            </Link>
            <p className="px-3 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-6 mb-2">
              Account
            </p>
            <Link
              href="/listings/post"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#344767] dark:text-[#5a6b8a]"
            >
              Post listing
            </Link>
            {signedIn && (
              <>
                <Link
                  href="/listings/portal/my-listings"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Manage listings
                </Link>
                <Link
                  href="/listings/portal/favorites"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Saved
                </Link>
              </>
            )}
            {!loading && !signedIn && (
              <Link
                href="/auth/sign-in"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Sign in
              </Link>
            )}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Back to Nyumba Zetu
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
}
