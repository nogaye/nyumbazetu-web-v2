/**
 * Central feature registry types. Used by menu, home page, pricing page, feature
 * detail pages, and sitemap. All feature attributes live in one place; consumers
 * use different views (grid, nav, pricing matrix, detail page) from the same source.
 */

import type { ComponentType } from "react";

/** Plan IDs used in the pricing matrix; must match plan names in pricing page. */
export type PlanId = "Free" | "Standard" | "Premier" | "Enterprise";

/**
 * Feature group for nav dropdown and features page sections. id is used in data; label for display.
 */
export interface FeatureGroupDef {
  id: string;
  label: string;
  /** Display order (lower first). */
  order: number;
}

/**
 * Single source-of-truth feature definition. Optional fields control where the
 * feature appears: grid (home/features page), nav dropdown, pricing matrix, detail page.
 */
export interface FeatureDefinition {
  /** URL segment; href is always /features/[slug]. */
  slug: string;
  /** Display name used in nav, grid, pricing, and detail page. */
  title: string;
  /** Short description for cards, grid, nav, and pricing matrix. */
  description: string;
  /** Bullet points for grid card. Omit to hide from feature grid. */
  bullets?: string[];
  /** Heroicon component for grid and nav. Omit if not shown in grid/nav. */
  icon?: ComponentType<{ className?: string }>;
  /** Long-form "What it is" for detail page. Omit if no detail page. */
  what?: string;
  /** Long-form "How it works" for detail page. */
  how?: string;
  /** Long-form "Why it matters" for detail page. */
  why?: string;
  /** FAQs for detail page. */
  faqs?: { q: string; a: string }[];
  /** Hero image path for detail page (e.g. /images/features/feature-*.jpg). */
  detailImage?: string;
  /** Which plans include this feature. If set, feature appears in pricing matrix. */
  plans?: readonly PlanId[];
  /** When Free is in plans: "basic" shows "Basic" in Free column. */
  freeTierLevel?: "basic";
  /** Show in main nav Features dropdown. Default true when detail page exists. */
  showInNav?: boolean;
  /** Show in feature grid (home, /features page). Default true when bullets and icon exist. */
  showInGrid?: boolean;
  /**
   * Priority for homepage feature strip (1 = first). Only features with homePageOrder
   * are shown on the home page; top 6 by this order. Omit for features not on homepage.
   */
  homePageOrder?: number;
  /** Group id for nav dropdown columns and features page sections. Must match a FEATURE_GROUPS id. */
  featureGroupId?: string;
}

/** Row shape for pricing page feature matrix; derived from FeatureDefinition. */
export interface FeaturePlanRow {
  slug: string;
  title: string;
  description: string;
  plans: readonly PlanId[];
  freeTierLevel?: "basic";
}

/** Item shape for feature grid card; derived from FeatureDefinition. */
export interface FeatureGridItem {
  title: string;
  description: string;
  bullets: string[];
  icon: ComponentType<{ className?: string }>;
  href: string;
}

/** Nav child item: label, href, optional description and icon. */
export interface FeatureNavItem {
  label: string;
  href: string;
  description?: string;
  icon?: ComponentType<{ className?: string }>;
}

/** Group of nav items for the Features dropdown (one column per group). */
export interface FeatureNavGroup {
  groupId: string;
  groupLabel: string;
  items: FeatureNavItem[];
}

/**
 * Raw feature definition before resolving icon from iconKey. Used in data layer
 * so the data file has no React/heroicons dependency.
 */
export type FeatureDefinitionRaw = Omit<FeatureDefinition, "icon"> & {
  /** Key into FEATURE_ICONS map; resolved to icon component in index. */
  iconKey?: string;
};
