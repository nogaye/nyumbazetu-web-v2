"use client";

/**
 * Single hero section for the marketing homepage.
 * Implements a 5-layer SaaS hero: credibility badge, vision headline, product explanation,
 * two CTAs, and social proof. Used on the modern homepage for clear above-the-fold messaging.
 */

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDaysIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

/** Credibility badge text; short trust statement above the headline. */
const BADGE = "Built for Kenyan Property Managers";

/** Category-defining vision headline; signals platform/infrastructure positioning. */
const HEADLINE = "The operating system for Kenyan real estate";

/** Clear product explanation: what the platform does (vision → explanation). */
const SUBHEADLINE =
  "Rent collection, accounting, tenant experience, and reporting — all on one platform.";

/** Social proof line; increases trust below the CTAs. */
const SOCIAL_PROOF = "Trusted by property managers, estates, and banks";

export function HeroSingleV2() {
  return (
    <section className="relative bg-white dark:bg-slate-950 overflow-hidden min-h-[500px] md:min-h-[560px] lg:min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-24 lg:py-28 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* 1. Credibility badge */}
          <p className="inline-block text-sm font-semibold text-primary mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            {BADGE}
          </p>

          {/* 2. Big vision headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-slate-900 dark:text-slate-50">
            {HEADLINE}
          </h1>

          {/* 3. Clear product explanation */}
          <p className="text-lg md:text-xl lg:text-2xl text-slate-700 dark:text-slate-200 mb-10 leading-relaxed max-w-3xl mx-auto">
            {SUBHEADLINE}
          </p>

          {/* 4. Call to action — exactly two CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600 text-primary-foreground font-medium shadow-sm hover:shadow-md transition-all duration-200 rounded-lg"
              asChild
            >
              <Link href="/request-demo" className="flex items-center gap-2">
                Request a demo
                <CalendarDaysIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-slate-300 dark:border-slate-600 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium rounded-lg"
              asChild
            >
              <Link href="/product" className="flex items-center gap-2">
                Explore the platform
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* 5. Social proof */}
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {SOCIAL_PROOF}
          </p>
        </div>
      </div>
    </section>
  );
}
