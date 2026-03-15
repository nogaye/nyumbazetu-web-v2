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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

/** Renders a single feature card; shared by flat and grouped layouts. */
function FeatureCard({
  feature,
  index,
}: {
  feature: FeatureGridItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="h-full hover:shadow-md transition-all duration-200 hover:-translate-y-1">
        <CardHeader className="pb-4">
          <div className="mb-4 aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
            <div className="text-center">
              <feature.icon className="h-8 w-8 text-primary mx-auto mb-2" />
            </div>
          </div>
          <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
            {feature.title}
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {feature.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2.5 mb-6">
            {feature.bullets.map((bullet, bulletIdx) => (
              <li
                key={bulletIdx}
                className="text-sm text-slate-700 dark:text-slate-300 flex items-start leading-relaxed"
              >
                <span className="text-tertiary mr-2.5 flex-shrink-0 mt-0.5">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Link
            href={feature.href}
            className="text-sm font-medium text-primary hover:text-primary-600 dark:text-primary dark:hover:text-primary-400 hover:underline inline-flex items-center transition-colors"
          >
            Learn more →
          </Link>
        </CardContent>
      </Card>
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
      <Section>
        <SectionHeader title={title} description={description} />
        {useGrouped && groups ? (
          <div className="space-y-12">
            {groups.map((grp) => (
              <div key={grp.groupId}>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                  {grp.groupLabel}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {grp.items.map((feature, idx) => (
                    <FeatureCard key={feature.href} feature={feature} index={idx} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <FeatureCard key={feature.href} feature={feature} index={idx} />
            ))}
          </div>
        )}
        {showViewMore && limit != null && (
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/features" className="inline-flex items-center gap-2">
                View all features
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </Section>

      {showCta && (
        <Section className="bg-secondary">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See all features in action
            </h2>
            <p className="text-lg text-white mb-8 leading-relaxed">
              Schedule a demo to explore how these features work together to
              transform your property operations.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600 text-primary-foreground"
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
