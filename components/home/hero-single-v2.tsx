"use client";

/**
 * Single hero section for the marketing homepage.
 * Implements a high-impact SaaS hero: credibility badge, vision headline, product explanation,
 * two CTAs, social proof, and a stats bar. Uses display typography, gradient mesh background,
 * and scroll cue. Designed for clarity and conversion.
 */

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CalendarDaysIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

/** Credibility badge text; short trust statement above the headline. */
const BADGE = "Kenya's #1 property management platform";

/** Category-defining vision headline; signals platform/infrastructure positioning. */
const HEADLINE = "The operating system for African real estate";

/** Clear product explanation: what the platform does (vision → explanation). */
const SUBHEADLINE =
  "One platform for collections, accounting, tenant experience, and compliance. M-Pesa, bank, eTIMS—all integrated. Real-time visibility for every stakeholder.";

/** Social proof line; increases trust below the CTAs. */
const SOCIAL_PROOF = "Trusted by property managers, estates, developers, and banks across Kenya";

/** Stats shown in the hero for credibility and quick scanning. */
const HERO_STATS = [
  { value: "500+", label: "Properties managed" },
  { value: "95.3%", label: "Collection rate" },
  { value: "50k+", label: "Active tenants" },
];

/** Footnote clarifying that the collection rate is an average across the platform. */
const COLLECTION_RATE_FOOTNOTE =
  "95.3% is the average rent collection rate across all properties on Nyumba Zetu.";

/** Scroll indicator target (first section after hero). */
const SCROLL_TARGET_ID = "how-it-works";

export function HeroSingleV2() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950 dark:bg-slate-950">
      {/* Gradient mesh background — animated orbs for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="hero-mesh-orb absolute -top-[40%] -right-[20%] w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] rounded-full bg-primary/20 blur-[120px]" />
        <div
          className="hero-mesh-orb absolute -bottom-[30%] -left-[15%] w-[60vw] max-w-[600px] h-[60vw] max-h-[600px] rounded-full bg-secondary/15 blur-[100px]"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="hero-mesh-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-[400px] h-[40vw] max-h-[400px] rounded-full bg-tertiary/10 blur-[80px]"
          style={{ animationDelay: "-3s" }}
        />
        <div className="absolute inset-0 grain" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full pt-20 md:pt-28 pb-16 md:pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Credibility badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-8 px-4 py-2.5 rounded-full bg-primary/15 border border-primary/25 text-primary-foreground/90"
          >
            <SparklesIcon className="h-4 w-4" aria-hidden />
            <span>{BADGE}</span>
          </motion.div>

          {/* Headline — display font for impact */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.08] tracking-[-0.03em] text-white"
          >
            {HEADLINE}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            {SUBHEADLINE}
          </motion.p>

          {/* CTAs — primary with glow on hover; secondary for exploration */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              className="relative overflow-hidden cta-shine-hover bg-primary hover:bg-primary-600 text-primary-foreground font-semibold shadow-lg hover:shadow-glow transition-all duration-300 rounded-xl px-8 text-base group/btn"
              asChild
            >
              <Link href="/request-demo" className="flex items-center gap-2 relative z-10">
                Book a free demo
                <CalendarDaysIcon className="h-5 w-5 group-hover/btn:translate-x-0.5 transition-transform" aria-hidden />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-medium rounded-xl px-8 text-base backdrop-blur-sm"
              asChild
            >
              <Link href="/features" className="flex items-center gap-2">
                See all features
                <ArrowRightIcon className="h-5 w-5" aria-hidden />
              </Link>
            </Button>
          </motion.div>

          {/* Stats bar — social proof and quick value; three columns for impact */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-16 mb-10"
            role="list"
            aria-label="Key metrics"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} role="listitem" className="text-center">
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Footnote: clarifies that collection rate is platform average */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-xs text-slate-500 mb-6 max-w-xl mx-auto"
          >
            {COLLECTION_RATE_FOOTNOTE}
          </motion.p>

          {/* Social proof line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="text-sm text-slate-500"
          >
            {SOCIAL_PROOF}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator — invites user to explore */}
      <motion.a
        href={`#${SCROLL_TARGET_ID}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-slate-400 transition-colors"
        aria-label="Scroll to content"
      >
        <span className="text-xs font-medium uppercase tracking-wider">
          See how it works
        </span>
        <ChevronDownIcon className="h-6 w-6 animate-scroll-bounce" />
      </motion.a>
    </section>
  );
}
