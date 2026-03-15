"use client";

/**
 * Single hero section for the marketing homepage.
 * Implements a 5-layer SaaS hero: credibility badge, vision headline, product explanation,
 * two CTAs, and social proof. Used on the modern homepage for clear above-the-fold messaging.
 * Uses staggered entrance animations and SparklesIcon from the legacy home header.
 */

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDaysIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

/** Credibility badge text; short trust statement above the headline. */
const BADGE = "Built for Modern Property Managers";

/** Category-defining vision headline; signals platform/infrastructure positioning. */
const HEADLINE = "The operating system for African real estate";

/** Clear product explanation: what the platform does (vision → explanation). */
const SUBHEADLINE =
  "Rent collection, property accounting, tenant communication, and reporting — all on one platform.";

/** Social proof line; increases trust below the CTAs. */
const SOCIAL_PROOF = "Trusted by property managers, estates, and banks";

export function HeroSingleV2() {
  return (
    <section className="relative bg-white dark:bg-slate-950 overflow-hidden min-h-[500px] md:min-h-[560px] lg:min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
      {/* Decorative background elements (from LegacyHomeHeader) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-16 md:pt-24 lg:pt-28 pb-12 md:pb-16 lg:pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* 1. Credibility badge — SparklesIcon and stagger from LegacyHomeHeader */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <SparklesIcon className="h-4 w-4" aria-hidden />
            <span>{BADGE}</span>
          </motion.div>

          {/* 2. Big vision headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-slate-900 dark:text-slate-50"
          >
            {HEADLINE}
          </motion.h1>

          {/* 3. Clear product explanation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl text-slate-700 dark:text-slate-200 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            {SUBHEADLINE}
          </motion.p>

          {/* 4. Call to action — exactly two CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600 text-primary-foreground font-medium shadow-sm hover:shadow-md transition-all duration-200 rounded-lg"
              asChild
            >
              <Link href="/request-demo" className="flex items-center gap-2">
                Request a demo
                <CalendarDaysIcon className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-slate-300 dark:border-slate-600 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium rounded-lg"
              asChild
            >
              <Link href="/features" className="flex items-center gap-2">
                Explore Features
                <ArrowRightIcon className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </motion.div>

          {/* 5. Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-sm text-slate-600 dark:text-slate-400"
          >
            {SOCIAL_PROOF}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
