/**
 * Central feature registry: single source of truth for all product features.
 * Resolves icon keys to components and exports FEATURES plus getters for grid,
 * detail page, pricing matrix, nav, and sitemap. Used by feature-grid, features/[slug],
 * pricing page, main-nav, and sitemap.
 */

import { FEATURES_RAW, FEATURE_GROUPS } from "./data";
import { FEATURE_ICONS } from "./icons";
import type {
  FeatureDefinition,
  FeatureGridItem,
  FeatureNavGroup,
  FeatureNavItem,
  FeaturePlanRow,
  PlanId,
} from "./types";

/** Feature groups (id, label, order) for nav and features page. */
export { FEATURE_GROUPS };

/** Plan column order for the pricing matrix. Re-exported for pricing page. */
export const PLAN_IDS: readonly PlanId[] = [
  "Free",
  "Standard",
  "Premier",
  "Enterprise",
] as const;

export type {
  FeatureDefinition,
  FeatureGridItem,
  FeatureNavGroup,
  FeatureNavItem,
  FeaturePlanRow,
  PlanId,
} from "./types";

const FEATURES_BASE_URL = "/features";

/**
 * Resolves iconKey to icon component and returns full feature definitions.
 * Used internally; exported FEATURES use this.
 */
function resolveFeatures(): FeatureDefinition[] {
  return FEATURES_RAW.map((raw) => {
    const { iconKey, ...rest } = raw;
    const icon = iconKey ? FEATURE_ICONS[iconKey] : undefined;
    return { ...rest, icon } as FeatureDefinition;
  });
}

/** All features with resolved icon. Use getters below for view-specific subsets. */
export const FEATURES: FeatureDefinition[] = resolveFeatures();

/**
 * Returns a single feature by slug, or undefined if not found.
 * Used by the feature detail page and metadata.
 */
export function getFeatureBySlug(slug: string): FeatureDefinition | undefined {
  return FEATURES.find((f) => f.slug === slug);
}

/**
 * Returns features to show in the feature grid (home page, /features page).
 * Includes only items with showInGrid !== false and with bullets and icon.
 */
export function getFeaturesForGrid(): FeatureGridItem[] {
  return FEATURES.filter(
    (f) => f.showInGrid !== false && f.bullets?.length && f.icon
  ).map((f) => ({
    title: f.title,
    description: f.description,
    bullets: f.bullets!,
    icon: f.icon!,
    href: `${FEATURES_BASE_URL}/${f.slug}`,
  }));
}

/**
 * Returns the top N features for the homepage, ordered by homePageOrder (1 = first).
 * Only features with homePageOrder set are included. Used for the homepage feature strip.
 * @param limit Max number of features to return (default 6).
 */
export function getFeaturesForHomePage(limit = 6): FeatureGridItem[] {
  const gridEligible = FEATURES.filter(
    (f) =>
      f.homePageOrder != null &&
      f.showInGrid !== false &&
      f.bullets?.length &&
      f.icon
  );
  return gridEligible
    .sort((a, b) => (a.homePageOrder ?? 999) - (b.homePageOrder ?? 999))
    .slice(0, limit)
    .map((f) => ({
      title: f.title,
      description: f.description,
      bullets: f.bullets!,
      icon: f.icon!,
      href: `${FEATURES_BASE_URL}/${f.slug}`,
    }));
}

/**
 * Returns features that have plans defined, for the pricing page matrix.
 * Each row includes slug, title, description, plans, and optional freeTierLevel.
 */
export function getFeaturesForPricing(): FeaturePlanRow[] {
  return FEATURES.filter((f) => f.plans && f.plans.length > 0).map((f) => ({
    slug: f.slug,
    title: f.title,
    description: f.description,
    plans: f.plans!,
    ...(f.freeTierLevel && { freeTierLevel: f.freeTierLevel }),
  }));
}

/**
 * Returns features to show in the main nav Features dropdown (flat list).
 * Includes only items with showInNav !== false and with an icon (for nav display).
 */
export function getFeaturesForNav(): FeatureNavItem[] {
  return FEATURES.filter(
    (f) => f.showInNav !== false && f.icon
  ).map((f) => ({
    label: f.title,
    href: `${FEATURES_BASE_URL}/${f.slug}`,
    description: f.description,
    icon: f.icon,
  }));
}

/**
 * Returns features for the nav dropdown grouped by featureGroupId, in group order.
 * Each group has groupId, groupLabel (from FEATURE_GROUPS), and items (FeatureNavItem[]).
 * Used for the multi-column Features dropdown.
 */
export function getFeaturesForNavGrouped(): FeatureNavGroup[] {
  const navFeatures = FEATURES.filter(
    (f) => f.showInNav !== false && f.icon && f.featureGroupId
  );
  const byGroup = new Map<string, FeatureNavItem[]>();
  for (const f of navFeatures) {
    const gid = f.featureGroupId!;
    if (!byGroup.has(gid)) byGroup.set(gid, []);
    byGroup.get(gid)!.push({
      label: f.title,
      href: `${FEATURES_BASE_URL}/${f.slug}`,
      description: f.description,
      icon: f.icon,
    });
  }
  return [...FEATURE_GROUPS]
    .sort((a, b) => a.order - b.order)
    .filter((g) => byGroup.has(g.id))
    .map((g) => ({
      groupId: g.id,
      groupLabel: g.label,
      items: byGroup.get(g.id)!,
    }));
}

/**
 * Returns features for the grid grouped by featureGroupId, in group order.
 * Each group has groupId, groupLabel, and items (FeatureGridItem[]).
 * Used for the /features page grouped sections.
 */
export function getFeaturesForGridByGroup(): {
  groupId: string;
  groupLabel: string;
  items: FeatureGridItem[];
}[] {
  const gridFeatures = FEATURES.filter(
    (f) => f.showInGrid !== false && f.bullets?.length && f.icon
  );
  const byGroup = new Map<string, FeatureGridItem[]>();
  for (const f of gridFeatures) {
    const gid = f.featureGroupId ?? "other";
    if (!byGroup.has(gid)) byGroup.set(gid, []);
    byGroup.get(gid)!.push({
      title: f.title,
      description: f.description,
      bullets: f.bullets!,
      icon: f.icon!,
      href: `${FEATURES_BASE_URL}/${f.slug}`,
    });
  }
  const other = byGroup.get("other") ?? [];
  return [...FEATURE_GROUPS]
    .sort((a, b) => a.order - b.order)
    .filter((g) => byGroup.has(g.id) && byGroup.get(g.id)!.length > 0)
    .map((g) => ({
      groupId: g.id,
      groupLabel: g.label,
      items: byGroup.get(g.id)!,
    }))
    .concat(
      other.length > 0
        ? [{ groupId: "other", groupLabel: "Other", items: other }]
        : []
    );
}

/**
 * Returns all slugs that have a detail page (what/how/why content).
 * Used for sitemap and validation.
 */
export function getAllFeatureSlugs(): string[] {
  return FEATURES.filter((f) => f.what != null).map((f) => f.slug);
}

/**
 * Returns the hero image path for a feature detail page.
 * Falls back to a default image when the feature has no detailImage or slug is unknown.
 */
export function getFeatureDetailImage(slug: string): string {
  const feature = getFeatureBySlug(slug);
  return feature?.detailImage ?? "/images/features/feature-dashboard.jpg";
}
