"use client";

/**
 * Single hero section for the marketing homepage.
 * One headline, one subhead, and primary/secondary CTAs for clear above-the-fold messaging.
 * Replaces the carousel to achieve "understand in under 10 seconds" (audit recommendation).
 */

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDaysIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export function HeroSingle() {
  return (
    <section className="relative bg-white dark:bg-slate-950 overflow-hidden min-h-[500px] md:min-h-[560px] lg:min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-24 lg:py-28 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-slate-900 dark:text-slate-50">
            Property management infrastructure for Kenyan real estate.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-slate-700 dark:text-slate-200 mb-10 leading-relaxed max-w-3xl mx-auto">
            One platform for collections, accounting, and tenant experience—built for Kenya. Trusted by property teams, estates, and banks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600 text-primary-foreground font-medium shadow-sm hover:shadow-md transition-all duration-200 rounded-lg"
              asChild
            >
              <Link href="/contact" className="flex items-center gap-2">
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
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Proudly built in Kenya. Trusted by property teams, estates, and banks.
          </p>
        </div>
      </div>
    </section>
  );
}
