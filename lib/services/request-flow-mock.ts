/**
 * Mock data and ranking helpers for the `/services/request` marketing flow.
 *
 * Simulates portfolio context (property, block, unit) as if loaded from Nyumba Zetu,
 * plus per-vendor signals for “used before”, block affinity, indicative price tier, and
 * response speed. `sortSuggestionRows` implements the Recommended tab ordering and the
 * cheapest-versus-fastest toggle. Swap this module for API-driven suggestions when the
 * backend exposes matching and ranking.
 */

import {
  MOCK_VENDORS,
  categoryLabelFromSlug,
  type ServiceCategorySlug,
  type VendorRecord,
} from "@/lib/services/vendors-mock";

/** One lettable unit under a block (stable id for mock “same block” matching). */
export interface DemoUnit {
  /** Unique key within the demo property; shown in selects and passed to ranking helpers. */
  id: string;
  /** Human-readable label, e.g. “Unit A-12”. */
  label: string;
}

/** A block (wing/tower) containing units. */
export interface DemoBlock {
  /** Stable id aligned with `VendorRequestSignals.blocksWithHistory` entries. */
  id: string;
  /** Display name in the block dropdown. */
  label: string;
  /** Units available under this block. */
  units: DemoUnit[];
}

/**
 * Estate context pre-filled on the request form (“from your system”).
 * In production this would come from the signed-in user’s default property/unit.
 */
export interface DemoPropertyContext {
  /** Opaque portfolio id for future API parity. */
  propertyId: string;
  /** Shown as the property field readout / select. */
  propertyName: string;
  /** Blocks and units the user can narrow to. */
  blocks: DemoBlock[];
}

/** Fixed demo estate used across the request UI. */
export const DEMO_PROPERTY_CONTEXT: DemoPropertyContext = {
  propertyId: "ridgeview-estates-demo",
  propertyName: "Ridgeview Estates",
  blocks: [
    {
      id: "block-a",
      label: "Block A — North wing",
      units: [
        { id: "block-a-u12", label: "Unit A-12" },
        { id: "block-a-u05", label: "Unit A-5" },
        { id: "block-a-ph2", label: "Penthouse A-2" },
      ],
    },
    {
      id: "block-b",
      label: "Block B — South wing",
      units: [
        { id: "block-b-u08", label: "Unit B-8" },
        { id: "block-b-u21", label: "Unit B-21" },
      ],
    },
    {
      id: "common",
      label: "Common areas / estate office",
      units: [{ id: "common-grounds", label: "Grounds & amenities" }],
    },
  ],
};

/** Default selections matching “pre-filled from your system” on first paint. */
export const DEMO_DEFAULT_BLOCK_ID = "block-a";
/** Default unit under `DEMO_DEFAULT_BLOCK_ID`. */
export const DEMO_DEFAULT_UNIT_ID = "block-a-u12";

/** Secondary sort after recommended affinity: favour lower indicative quotes or faster response. */
export type VendorSortBias = "cheapest" | "fastest";

/**
 * Per-vendor mock signals for ranking and badges on the request page only.
 * Keyed by `VendorRecord.id`; missing ids fall back to neutral defaults in `toSuggestionRows`.
 */
export interface VendorRequestSignals {
  /** Must match the vendor’s `id` field. */
  vendorId: number;
  /** True when this portfolio has booked the vendor before (mock). */
  usedOnThisPropertyBefore: boolean;
  /** Block ids where the vendor is considered a strong repeat match (mock). */
  blocksWithHistory: string[];
  /** 1 = budget-oriented, 5 = premium pricing band (mock). */
  priceTier: number;
  /** Mock average minutes to first substantive response. */
  responseMinutes: number;
}

/**
 * Mock request-flow signals for each marketplace vendor id.
 * Tuned so plumbing/electrical/etc. lists show varied badges and sort orders.
 */
export const VENDOR_REQUEST_SIGNALS: Record<number, VendorRequestSignals> = {
  1: {
    vendorId: 1,
    usedOnThisPropertyBefore: true,
    blocksWithHistory: ["block-a", "common"],
    priceTier: 3,
    responseMinutes: 12,
  },
  2: {
    vendorId: 2,
    usedOnThisPropertyBefore: true,
    blocksWithHistory: ["block-b"],
    priceTier: 4,
    responseMinutes: 22,
  },
  3: {
    vendorId: 3,
    usedOnThisPropertyBefore: false,
    blocksWithHistory: ["block-a", "block-b"],
    priceTier: 2,
    responseMinutes: 180,
  },
  4: {
    vendorId: 4,
    usedOnThisPropertyBefore: false,
    blocksWithHistory: ["block-a"],
    priceTier: 3,
    responseMinutes: 95,
  },
  5: {
    vendorId: 5,
    usedOnThisPropertyBefore: false,
    blocksWithHistory: ["common"],
    priceTier: 5,
    responseMinutes: 8,
  },
  6: {
    vendorId: 6,
    usedOnThisPropertyBefore: false,
    blocksWithHistory: [],
    priceTier: 1,
    responseMinutes: 200,
  },
  7: {
    vendorId: 7,
    usedOnThisPropertyBefore: false,
    blocksWithHistory: ["block-b"],
    priceTier: 1,
    responseMinutes: 45,
  },
  8: {
    vendorId: 8,
    usedOnThisPropertyBefore: true,
    blocksWithHistory: ["block-a"],
    priceTier: 1,
    responseMinutes: 150,
  },
};

/**
 * One row in the request UI: vendor profile plus derived suggestion flags for the session block.
 */
export interface VendorSuggestionRow {
  /** Full vendor record from the marketplace mock. */
  vendor: VendorRecord;
  /** True if mock history includes this property. */
  usedOnThisPropertyBefore: boolean;
  /** True if `selectedBlockId` is listed in the vendor’s block history. */
  usedInSameBlock: boolean;
  /** Copy of signal used for cheapest-first ordering. */
  priceTier: number;
  /** Copy of signal used for fastest-first ordering. */
  responseMinutes: number;
}

/**
 * Returns vendors whose service categories include the selected category label.
 * @param categorySlug - Path-style slug, e.g. `plumbing`.
 * @returns Matching `VendorRecord` rows from `MOCK_VENDORS`.
 */
export function listVendorsForCategory(categorySlug: ServiceCategorySlug): VendorRecord[] {
  const label = categoryLabelFromSlug(categorySlug);
  return MOCK_VENDORS.filter((v) =>
    v.categories.some((c) => c.toLowerCase() === label.toLowerCase()),
  );
}

/**
 * Attaches request-flow signals and same-block detection to each vendor.
 * @param vendors - Typically from `listVendorsForCategory`.
 * @param selectedBlockId - Current block select value, e.g. `block-a`.
 * @returns Rows safe for sorting and badge rendering.
 */
export function toSuggestionRows(
  vendors: VendorRecord[],
  selectedBlockId: string,
): VendorSuggestionRow[] {
  return vendors.map((vendor) => {
    const sig =
      VENDOR_REQUEST_SIGNALS[vendor.id] ??
      ({
        vendorId: vendor.id,
        usedOnThisPropertyBefore: false,
        blocksWithHistory: [],
        priceTier: 3,
        responseMinutes: 120,
      } satisfies VendorRequestSignals);
    return {
      vendor,
      usedOnThisPropertyBefore: sig.usedOnThisPropertyBefore,
      usedInSameBlock: sig.blocksWithHistory.includes(selectedBlockId),
      priceTier: sig.priceTier,
      responseMinutes: sig.responseMinutes,
    };
  });
}

/**
 * Higher scores surface first in the Recommended tab (affinity + quality + speed).
 * @param row - Vendor row with mock signals.
 * @returns Numeric score; not shown to end users.
 */
export function recommendedScore(row: VendorSuggestionRow): number {
  let score = 0;
  if (row.usedOnThisPropertyBefore) score += 1000;
  if (row.usedInSameBlock) score += 400;
  score += row.vendor.rating * 50;
  score -= row.responseMinutes * 0.15;
  return score;
}

/**
 * Sorts rows for the active tab and cheapest/fastest preference.
 * @param rows - Suggestion rows for the current category and block.
 * @param tab - `recommended` uses affinity score; `all` is alphabetical by business name.
 * @param bias - When scores tie on Recommended, prefer lower `priceTier` or lower `responseMinutes` first.
 * @returns New array (does not mutate `rows`).
 */
export function sortSuggestionRows(
  rows: VendorSuggestionRow[],
  tab: "recommended" | "all",
  bias: VendorSortBias,
): VendorSuggestionRow[] {
  const copy = [...rows];
  if (tab === "all") {
    copy.sort((a, b) => a.vendor.businessName.localeCompare(b.vendor.businessName));
    return copy;
  }
  copy.sort((a, b) => {
    const primary = recommendedScore(b) - recommendedScore(a);
    if (primary !== 0) return primary;
    if (bias === "cheapest") {
      const byPrice = a.priceTier - b.priceTier;
      if (byPrice !== 0) return byPrice;
      return a.responseMinutes - b.responseMinutes;
    }
    const bySpeed = a.responseMinutes - b.responseMinutes;
    if (bySpeed !== 0) return bySpeed;
    return a.priceTier - b.priceTier;
  });
  return copy;
}

/**
 * Resolves block id to its unit list, or empty array if unknown.
 * @param blockId - Selected block id.
 * @returns Units for dropdown population.
 */
export function unitsForBlock(blockId: string): DemoUnit[] {
  const block = DEMO_PROPERTY_CONTEXT.blocks.find((b) => b.id === blockId);
  return block?.units ?? [];
}
