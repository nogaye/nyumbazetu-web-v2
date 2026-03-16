"use client";

/**
 * CTA band for the listings marketplace: Manage listings and Explore.
 * Post listing is only in the header. Used at the bottom of the listings home and search.
 */

import Link from "next/link";
import { LayoutDashboard, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ListingsCtaBandProps {
  /** Optional class for the container. */
  className?: string;
}

/**
 * Renders a horizontal band of CTAs for listers and browsers (no Post — that is in the header only).
 */
export function ListingsCtaBand({ className }: ListingsCtaBandProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white px-6 py-8 dark:border-slate-700/80 dark:bg-slate-900/50 sm:px-8 sm:py-10",
        className
      )}
      aria-label="Call to action"
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
        <Button asChild variant="outline" size="default" className="gap-2">
          <Link href="/listings/portal/my-listings">
            <LayoutDashboard className="h-5 w-5" aria-hidden />
            Manage your listings
          </Link>
        </Button>
        <Button asChild variant="outline" size="default" className="gap-2">
          <Link href="/listings/search">
            <Home className="h-5 w-5" aria-hidden />
            Explore available homes
          </Link>
        </Button>
      </div>
    </section>
  );
}
