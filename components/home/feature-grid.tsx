/**
 * Feature grid for the marketing site. Renders a grid of product features (collections,
 * accounting, tenant experience, maintenance, TPS, eTIMS, communications, CRM, etc.) with
 * icons, descriptions, bullets, and links to /features/[slug]. Used on the home page,
 * /features page, and anywhere a consolidated feature list is needed. Data comes from
 * the central feature registry (@/lib/features); FeatureGrid renders the grid.
 */
"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  getFeaturesForGrid,
  getFeaturesForGridByGroup,
  getFeaturesForHomePage,
} from "@/lib/features";
import type { FeatureGridItem } from "@/lib/features/types";

/** Props for FeatureGrid: optional title/description override, limit for homepage, grouped view, and CTAs. */
export interface FeatureGridProps {
  /** Section title. Default: "One platform for every part of your property operations." */
  title?: string;
  /** Section description. Default: "From rent collection to accounting...". */
  description?: string;
  /** When set (e.g. 6), only the top N features by homePageOrder are shown. Omit to show all. */
  limit?: number;
  /** When true and no limit, features are displayed in grouped sections (by category). Used on /features page. */
  grouped?: boolean;
  /** When true and limit is set, shows a "View more" link to /features below the grid. */
  showViewMore?: boolean;
  /** When true, renders a "See all features in action" CTA section below the grid. */
  showCta?: boolean;
}

const DEFAULT_TITLE =
  "One platform for every part of your property operations.";
const DEFAULT_DESCRIPTION =
  "From rent collection to accounting, tenant experience to compliance—everything you need in one integrated system.";

/** Renders a single feature card; compact for homepage, full for /features page. */
function FeatureCard({
  feature,
  index,
  compact = false,
}: {
  feature: FeatureGridItem;
  index: number;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
      >
        <Link
          href={feature.href}
          className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/50 p-6 shadow-card transition-all duration-300 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-glow hover:-translate-y-1"
        >
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20 text-primary transition-colors group-hover:bg-primary/20 dark:group-hover:bg-primary/30">
            <feature.icon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-slate-50 group-hover:text-primary transition-colors">
              {feature.title}
            </h3>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {feature.description}
            </p>
            <span className="mt-3 inline-flex items-center text-sm font-medium text-primary group-hover:underline">
              Learn more
              <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link
        href={feature.href}
        className="group flex h-full flex-col rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/50 p-6 shadow-card transition-all duration-300 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-glow hover:-translate-y-1"
      >
        <div className="mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20 text-primary transition-colors group-hover:bg-primary/20 dark:group-hover:bg-primary/30">
          <feature.icon className="h-6 w-6" />
        </div>
        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-primary transition-colors">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {feature.description}
        </p>
        <ul className="mt-4 space-y-2 flex-1">
          {feature.bullets.map((bullet, bulletIdx) => (
            <li
              key={bulletIdx}
              className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed"
            >
              <span className="text-primary mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <span className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:underline">
          Learn more
          <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}

/**
 * Renders the consolidated feature grid. Used on the home page (with limit + showViewMore),
 * and /features page (all features, optionally grouped). Optionally shows a CTA when showCta is true.
 */
export function FeatureGrid({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  limit,
  grouped = false,
  showViewMore = false,
  showCta = false,
}: FeatureGridProps = {}) {
  const useGrouped = grouped && limit == null;
  const groups = useGrouped ? getFeaturesForGridByGroup() : null;
  const features: FeatureGridItem[] =
    limit != null ? getFeaturesForHomePage(limit) : useGrouped ? [] : getFeaturesForGrid();

  return (
    <>
      <Section className="bg-slate-50/50 dark:bg-slate-900/30">
        <SectionHeader
          title={title}
          description={description}
          titleClassName="font-display tracking-tight"
        />
        {useGrouped && groups ? (
          <div className="space-y-14">
            {groups.map((grp) => (
              <section
                key={grp.groupId}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/40 p-6 sm:p-8 shadow-card"
                aria-labelledby={`feature-group-${grp.groupId}`}
              >
                <h2
                  id={`feature-group-${grp.groupId}`}
                  className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6"
                >
                  {grp.groupLabel}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {grp.items.map((feature, idx) => (
                    <FeatureCard key={feature.href} feature={feature} index={idx} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div
            className={
              limit != null
                ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                : "grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            }
          >
            {features.map((feature, idx) => (
              <FeatureCard
                key={feature.href}
                feature={feature}
                index={idx}
                compact={limit != null}
              />
            ))}
          </div>
        )}
        {showViewMore && limit != null && (
          <div className="mt-8 flex justify-center">
            <Link
              href="/features"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            >
              View all features
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        )}
      </Section>

      {showCta && (
        <Section className="bg-secondary">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              See all features in action
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Schedule a demo to explore how these features work together to
              transform your property operations.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600 text-primary-foreground font-semibold shadow-lg hover:shadow-glow transition-shadow rounded-xl"
              asChild
            >
              <Link href="/request-demo" className="flex items-center gap-2">
                Request a Demo
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Section>
      )}
    </>
  );
}
