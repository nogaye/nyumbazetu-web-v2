/**
 * Clickable category tile linking to `/services/categories/[slug]`.
 * Used on the services landing page categories grid.
 */

import type { ComponentType } from "react";
import Link from "next/link";
import {
  WrenchScrewdriverIcon,
  BoltIcon,
  SparklesIcon,
  SwatchIcon,
  ShieldCheckIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import type { ServiceCategorySlug } from "@/lib/services/vendors-mock";
import { categoryLabelFromSlug } from "@/lib/services/vendors-mock";
import { cn } from "@/lib/utils";

const ICONS: Record<ServiceCategorySlug, ComponentType<{ className?: string }>> = {
  plumbing: WrenchScrewdriverIcon,
  electrical: BoltIcon,
  cleaning: SparklesIcon,
  painting: SwatchIcon,
  security: ShieldCheckIcon,
  appliances: CpuChipIcon,
};

export interface CategoryCardProps {
  /** URL segment and key into `ICONS`. */
  slug: ServiceCategorySlug;
}

/**
 * Rounds icon, label, and chevron hint with hover lift per vendors.md styling.
 * @param props - Category slug only; label is derived.
 */
export function CategoryCard({ slug }: CategoryCardProps) {
  const Icon = ICONS[slug];
  const label = categoryLabelFromSlug(slug);

  return (
    <Link
      href={`/services/categories/${slug}`}
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200",
        "hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg",
        "dark:border-slate-700/90 dark:bg-slate-900/50 dark:hover:bg-slate-900/80",
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <div>
        <h3 className="font-display text-lg font-semibold text-secondary dark:text-slate-100">
          {label}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse verified {label.toLowerCase()} vendors
        </p>
      </div>
      <span className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        View category →
      </span>
    </Link>
  );
}
