/**
 * Mock vendor marketplace data for the Nyumba Zetu marketing site.
 *
 * Supplies typed records for `/services` landing, vendor listing, category pages,
 * and vendor profiles. Replace with API calls when the backend is available; keep
 * the exported types stable so UI components need minimal changes.
 */

/** Single published review on a vendor profile (mock authors and copy). */
export interface VendorReview {
  /** Stable id for React keys. */
  id: string;
  /** Display name only (no PII). */
  author: string;
  /** Star rating 1–5, typically half-step increments in UI. */
  rating: number;
  /** Free-text review body. */
  comment: string;
  /** ISO date string (YYYY-MM-DD) for sorting and display. */
  date: string;
}

/**
 * One vendor business as shown in cards and on the profile page.
 * `slug` is the canonical URL segment under `/services/vendors/`.
 */
export interface VendorRecord {
  /** Numeric id for future API parity. */
  id: number;
  /** URL-safe unique segment. */
  slug: string;
  /** Legal or trading name shown in headings and cards. */
  businessName: string;
  /** Short initials or mark inside the avatar when no image is used. */
  logoMark: string;
  /** Optional hero/avatar image (remote URL allowed by next/image config). */
  logoImageUrl?: string;
  /** Service categories (must overlap SERVICE_CATEGORY_SLUGS labels for filters). */
  categories: string[];
  /** Aggregate star rating (mock). */
  rating: number;
  /** Total review count (may exceed length of `reviews` for mock realism). */
  reviewCount: number;
  /** When true, show verified badge and allow “verified only” filter match. */
  verified: boolean;
  /** Neighbourhood or area label (Nairobi-centric mock). */
  location: string;
  /** Typical first-response window copy, e.g. “15 mins”. */
  responseTime: string;
  /** Longer about text for profile page. */
  description: string;
  /** Bullet list of services on the profile. */
  servicesOffered: string[];
  /** Seeds for deterministic placeholder images in the portfolio grid. */
  portfolioSeeds: string[];
  /** Inline reviews for profile page (subset of reviewCount). */
  reviews: VendorReview[];
  /** When true, show a “Featured” badge on cards and the vendor profile (curated picks). */
  featured?: boolean;
}

/**
 * Category slug → display label for routes `/services/categories/[category]`
 * and for filter options.
 */
export const SERVICE_CATEGORY_SLUGS = [
  "plumbing",
  "electrical",
  "cleaning",
  "painting",
  "security",
  "appliances",
] as const;

/** Union type of allowed category path segments. */
export type ServiceCategorySlug = (typeof SERVICE_CATEGORY_SLUGS)[number];

/**
 * Human-readable title for each category slug.
 * @param slug - Lowercase category segment from the URL.
 * @returns Title case label for headings and cards.
 */
export function categoryLabelFromSlug(slug: string): string {
  const map: Record<ServiceCategorySlug, string> = {
    plumbing: "Plumbing",
    electrical: "Electrical",
    cleaning: "Cleaning",
    painting: "Painting",
    security: "Security",
    appliances: "Appliances",
  };
  return (map as Record<string, string>)[slug] ?? slug;
}

/**
 * Returns true when `slug` is a known service category (for static generation and 404).
 * @param slug - Path segment under `/services/categories/`.
 */
export function isServiceCategorySlug(slug: string): slug is ServiceCategorySlug {
  return (SERVICE_CATEGORY_SLUGS as readonly string[]).includes(slug);
}

/** Full mock vendor list used across marketplace pages. */
export const MOCK_VENDORS: VendorRecord[] = [
  {
    id: 1,
    slug: "profix-plumbing",
    businessName: "ProFix Plumbing",
    logoMark: "PP",
    logoImageUrl: "https://picsum.photos/seed/profix/128/128",
    categories: ["Plumbing"],
    rating: 4.8,
    reviewCount: 124,
    verified: true,
    location: "Westlands, Nairobi",
    responseTime: "Usually within 15 mins",
    description:
      "Licensed plumbers for repairs, installations, and emergencies across Nairobi. We prioritise leak detection, water tank work, and estate-wide maintenance contracts.",
    servicesOffered: [
      "Leak detection & pipe repair",
      "Water tank installation",
      "Bathroom & kitchen fixtures",
      "Emergency call-outs",
    ],
    portfolioSeeds: ["profix-a", "profix-b", "profix-c", "profix-d"],
    featured: true,
    reviews: [
      {
        id: "r1",
        author: "A. Mwangi",
        rating: 5,
        comment: "Fixed a burst pipe same day. Clear pricing and professional crew.",
        date: "2025-11-02",
      },
      {
        id: "r2",
        author: "Ridgeview Estates FM",
        rating: 4.5,
        comment: "Reliable for block-wide maintenance; reports are detailed.",
        date: "2025-10-18",
      },
    ],
  },
  {
    id: 2,
    slug: "volt-edge-electrical",
    businessName: "VoltEdge Electrical",
    logoMark: "VE",
    logoImageUrl: "https://picsum.photos/seed/voltedge/128/128",
    categories: ["Electrical"],
    rating: 4.6,
    reviewCount: 89,
    verified: true,
    location: "Kilimani, Nairobi",
    responseTime: "Usually within 30 mins",
    description:
      "Certified electricians for residential blocks, retail, and common-area lighting. We handle DB upgrades, surge protection, and compliance documentation.",
    servicesOffered: [
      "DB upgrades & rewiring",
      "Lighting & fixtures",
      "Generator changeover",
      "Safety inspections",
    ],
    portfolioSeeds: ["volt-a", "volt-b", "volt-c"],
    featured: true,
    reviews: [
      {
        id: "r3",
        author: "J. Otieno",
        rating: 5,
        comment: "Neat cabling and proper certification paperwork for our audit.",
        date: "2025-09-30",
      },
    ],
  },
  {
    id: 3,
    slug: "sparkle-clean-co",
    businessName: "Sparkle Clean Co.",
    logoMark: "SC",
    categories: ["Cleaning"],
    rating: 4.5,
    reviewCount: 210,
    verified: true,
    location: "Lavington, Nairobi",
    responseTime: "Same-day booking",
    description:
      "Commercial and residential deep cleaning, move-out turnovers, and scheduled estate common-area programmes.",
    servicesOffered: [
      "Deep cleaning & sanitisation",
      "Move-in / move-out",
      "Common-area programmes",
      "Post-construction clean-up",
    ],
    portfolioSeeds: ["sparkle-a", "sparkle-b"],
    featured: true,
    reviews: [
      {
        id: "r4",
        author: "P. Wanjiku",
        rating: 4.5,
        comment: "Consistent quality on our weekly building cleans.",
        date: "2025-11-10",
      },
    ],
  },
  {
    id: 4,
    slug: "colorwave-painting",
    businessName: "Colorwave Painting",
    logoMark: "CW",
    logoImageUrl: "https://picsum.photos/seed/colorwave/128/128",
    categories: ["Painting"],
    rating: 4.4,
    reviewCount: 67,
    verified: true,
    location: "Karen, Nairobi",
    responseTime: "Within 2 hours",
    description:
      "Interior and exterior painting for homes, offices, and estate repainting projects with colour consultation.",
    servicesOffered: [
      "Interior & exterior painting",
      "Waterproof coatings",
      "Metal & wood finishing",
      "Colour consultation",
    ],
    portfolioSeeds: ["cw-a", "cw-b", "cw-c"],
    reviews: [
      {
        id: "r5",
        author: "H. Kimani",
        rating: 4,
        comment: "Great finish; team protected floors and furniture carefully.",
        date: "2025-08-22",
      },
    ],
  },
  {
    id: 5,
    slug: "sentinel-security",
    businessName: "Sentinel Security Services",
    logoMark: "SS",
    categories: ["Security"],
    rating: 4.7,
    reviewCount: 156,
    verified: true,
    location: "Runda, Nairobi",
    responseTime: "24/7 dispatch",
    description:
      "CCTV, access control, and manned guarding coordination for residential estates and commercial blocks.",
    servicesOffered: [
      "CCTV installation & maintenance",
      "Access control systems",
      "Alarm monitoring",
      "Guard roster coordination",
    ],
    portfolioSeeds: ["sent-a", "sent-b"],
    featured: true,
    reviews: [
      {
        id: "r6",
        author: "GreenPark HOA",
        rating: 5,
        comment: "Responsive escalation path and clear SLAs in the contract.",
        date: "2025-10-01",
      },
    ],
  },
  {
    id: 6,
    slug: "fixit-appliances",
    businessName: "FixIt Appliances",
    logoMark: "FA",
    categories: ["Appliances"],
    rating: 4.3,
    reviewCount: 72,
    verified: false,
    location: "South B, Nairobi",
    responseTime: "Within 4 hours",
    description:
      "Repair and servicing for kitchen and laundry appliances; warranty-friendly diagnostics where applicable.",
    servicesOffered: [
      "Fridge & freezer repair",
      "Washing machine service",
      "Oven & cooker fixes",
      "Small appliance repair",
    ],
    portfolioSeeds: ["fixit-a", "fixit-b"],
    reviews: [
      {
        id: "r7",
        author: "L. Njeri",
        rating: 4,
        comment: "Honest assessment when replacement was cheaper than repair.",
        date: "2025-07-14",
      },
    ],
  },
  {
    id: 7,
    slug: "pipe-masters",
    businessName: "Pipe Masters Ltd",
    logoMark: "PM",
    categories: ["Plumbing"],
    rating: 4.2,
    reviewCount: 41,
    verified: true,
    location: "Embakasi, Nairobi",
    responseTime: "Within 1 hour",
    description:
      "High-volume plumbing for new builds and retrofits; drainage and sewer line specialists.",
    servicesOffered: [
      "Drainage & sewer lines",
      "New installation",
      "Pump systems",
      "Scheduled maintenance",
    ],
    portfolioSeeds: ["pm-a"],
    reviews: [],
  },
  {
    id: 8,
    slug: "bright-homes-electrical",
    businessName: "Bright Homes Electrical",
    logoMark: "BH",
    categories: ["Electrical", "Appliances"],
    rating: 4.0,
    reviewCount: 28,
    verified: true,
    location: "Thika Road corridor",
    responseTime: "Same day",
    description:
      "Affordable electrical and small-appliance fixes for landlords and tenants; ideal for quick turnovers.",
    servicesOffered: [
      "Socket & switch replacement",
      "Appliance hook-ups",
      "Basic fault finding",
    ],
    portfolioSeeds: ["bh-a", "bh-b"],
    reviews: [
      {
        id: "r8",
        author: "UrbanLettings",
        rating: 4,
        comment: "Good for volume unit prep between tenancies.",
        date: "2025-06-05",
      },
    ],
  },
];

/**
 * Finds a vendor by slug for the profile page.
 * @param slug - Vendor URL segment.
 * @returns The matching record or undefined if not found.
 */
export function getVendorBySlug(slug: string): VendorRecord | undefined {
  return MOCK_VENDORS.find((v) => v.slug === slug);
}

/**
 * Lists every vendor slug for `generateStaticParams`.
 */
export function getAllVendorSlugs(): string[] {
  return MOCK_VENDORS.map((v) => v.slug);
}

/**
 * Vendors whose category list includes the given label (case-insensitive match on slug-derived label).
 * @param categorySlug - e.g. `plumbing` → matches vendors with category “Plumbing”.
 */
export function getVendorsByCategorySlug(categorySlug: ServiceCategorySlug): VendorRecord[] {
  const label = categoryLabelFromSlug(categorySlug);
  return MOCK_VENDORS.filter((v) =>
    v.categories.some((c) => c.toLowerCase() === label.toLowerCase()),
  );
}

