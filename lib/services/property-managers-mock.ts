/**
 * Mock property manager marketplace data for the Nyumba Zetu marketing site.
 *
 * Provides strongly typed records for the dedicated property management provider
 * marketplace (`/services/property-managers`). This is separate from the maintenance
 * vendor directory. Replace with API-backed data when available; keep exported shapes
 * stable so UI layers require minimal churn.
 */

/** Short quote used in marketing carousels and profile highlights. */
export interface PropertyManagerTestimonial {
  /** Stable id for list keys. */
  id: string;
  /** Customer or partner quote. */
  quote: string;
  /** Display name (fictional for mock). */
  author: string;
  /** Role or portfolio label, e.g. "Landlord, Kilimani". */
  role: string;
}

/** Individual review row shown on the Reviews tab of a profile sheet. */
export interface PropertyManagerReview {
  /** Stable id for React keys. */
  id: string;
  /** Reviewer display name. */
  author: string;
  /** Star rating 1–5. */
  rating: number;
  /** Free-text body. */
  comment: string;
  /** ISO date YYYY-MM-DD. */
  date: string;
}

/** Canonical pricing model values used in filters and badges. */
export type PropertyManagerPricingModel =
  | "percentage_rent"
  | "fixed_monthly"
  | "per_unit"
  | "custom";

/**
 * One property management company as shown in cards, filters, and the profile sheet.
 * `slug` is reserved for future detail routes; profile preview is sheet-based for now.
 */
export interface PropertyManagerRecord {
  /** Opaque string id for keys and future APIs. */
  id: string;
  /** URL-safe identifier for future `/services/property-managers/[slug]`. */
  slug: string;
  /** Trading or legal name in headings. */
  companyName: string;
  /** Optional logo URL (remote, allowed in next/image config). */
  logoUrl?: string;
  /** Two–three letter avatar fallback when `logoUrl` is absent. */
  initials: string;
  /** Card and list summary (one–two sentences). */
  shortDescription: string;
  /** Longer “About” copy for profile Overview. */
  fullDescription: string;
  /** Single-line positioning statement for featured cards. */
  tagline: string;
  /** Aggregate star rating 0–5. */
  rating: number;
  /** Total reviews (may exceed length of `reviews`). */
  reviewCount: number;
  /** Years operating as a PM business (display + trust). */
  yearsInBusiness: number;
  /** Approximate headcount for trust signals. */
  staffCount: number;
  /** Residential/commercial units under management (primary portfolio metric). */
  unitsManaged: number;
  /** Distinct buildings or schemes (optional secondary metric). */
  propertiesManaged: number;
  /** Optional occupancy-style KPI for cards, e.g. 0.94 for 94%. */
  occupancyRate?: number;
  /** Cities or corridors served (filter by substring match on joined string). */
  serviceAreas: string[];
  /** Asset classes managed (must align with PROPERTY_TYPE_OPTIONS for filters). */
  propertyTypes: string[];
  /** Machine-readable pricing model. */
  pricingModel: PropertyManagerPricingModel;
  /** One-line fee explanation for cards. */
  pricingSummary: string;
  /** Example fee copy for Pricing tab. */
  samplePricing: string;
  /** When true, show verified badge and “verified only” filter match. */
  verified: boolean;
  /** When true, surface in featured strip and boost “Recommended” sort. */
  featured: boolean;
  /** Human-readable SLA, e.g. “Under 2 hours”. */
  responseTime: string;
  /** Numeric hours for “Fastest response” sort (lower is better). */
  responseHours: number;
  /** Short capability tags for scanning. */
  specialties: string[];
  /** Structured service lines for Services tab and service filter. */
  servicesOffered: string[];
  /** Languages for operations and tenant comms. */
  languages: string[];
  /** Trust badges (short labels). */
  badges: string[];
  /** Compliance / certification labels. */
  certifications: string[];
  /** Highlight quotes for profile/marketing. */
  testimonials: PropertyManagerTestimonial[];
  /** Inline reviews subset. */
  reviews: PropertyManagerReview[];
  /** Public-style contact email (mock). */
  contactEmail: string;
  /** E.164-style or local display phone (mock). */
  contactPhone: string;
  /** Whether “Request consultation” primary path is shown. */
  consultationAvailable: boolean;
  /**
   * Mock-only ordering for “Newest” sort: higher values represent more recently listed
   * profiles on the marketplace.
   */
  marketplaceJoinOrder: number;
}

/** Property type labels used in mock records and filter UI. */
export const PROPERTY_TYPE_OPTIONS = [
  "Residential",
  "Commercial",
  "Mixed use",
  "Student housing",
  "Airbnb / short stay",
  "Estates / communities",
] as const;

/** Union type for property type filter values. */
export type PropertyTypeOption = (typeof PROPERTY_TYPE_OPTIONS)[number];

/** Portfolio size buckets for the filter control. */
export type PortfolioSizeBucket = "any" | "small" | "medium" | "large";

/**
 * Maps a record’s `unitsManaged` into a portfolio bucket for filtering.
 * @param units - Count of units under management.
 * @returns Bucket id: small &lt; 300, medium 300–999, large ≥ 1000.
 */
export function portfolioBucketForUnits(units: number): Exclude<
  PortfolioSizeBucket,
  "any"
> {
  if (units < 300) return "small";
  if (units < 1000) return "medium";
  return "large";
}

/**
 * Human label for a pricing model enum value (badges and filters).
 * @param model - Enum from `PropertyManagerRecord.pricingModel`.
 */
export function labelForPricingModel(model: PropertyManagerPricingModel): string {
  const map: Record<PropertyManagerPricingModel, string> = {
    percentage_rent: "Percentage of rent",
    fixed_monthly: "Fixed monthly fee",
    per_unit: "Per unit pricing",
    custom: "Custom quote",
  };
  return map[model];
}

/** Curated mock list: Kenyan-inspired metros, globally polished tone. */
export const MOCK_PROPERTY_MANAGERS: PropertyManagerRecord[] = [
  {
    id: "pm-1",
    slug: "karibu-estates-pm",
    companyName: "Karibu Estates Property Management",
    logoUrl: "https://picsum.photos/seed/karibupm/128/128",
    initials: "KE",
    tagline: "Full-service residential PM across Nairobi metro.",
    shortDescription:
      "Institutional-grade reporting and tenant experience for apartments and townhouses in Nairobi.",
    fullDescription:
      "Karibu Estates partners with owners and developers to operate residential portfolios with transparent financials, preventative maintenance programmes, and diaspora-friendly communication. We emphasise compliance, arrears workflows aligned with local practice, and clear escalation paths.",
    rating: 4.9,
    reviewCount: 186,
    yearsInBusiness: 12,
    staffCount: 48,
    unitsManaged: 2400,
    propertiesManaged: 62,
    occupancyRate: 0.96,
    serviceAreas: ["Nairobi", "Kiambu corridor", "Ruiru"],
    propertyTypes: ["Residential", "Mixed use", "Estates / communities"],
    pricingModel: "percentage_rent",
    pricingSummary: "8–10% of effective rent (portfolio-based)",
    samplePricing:
      "Typical residential block: 8.5% of collected rent plus agreed pass-throughs; onboarding fee waived for 200+ units.",
    verified: true,
    featured: true,
    responseTime: "Under 2 hours",
    responseHours: 2,
    specialties: ["Diaspora owners", "New developments", "Arrears control"],
    servicesOffered: [
      "Rent collection & billing",
      "Tenant screening & leases",
      "Maintenance coordination",
      "Financial reporting",
      "Compliance & documentation",
    ],
    languages: ["English", "Kiswahili"],
    badges: ["Verified", "Featured partner", "24/7 desk"],
    certifications: ["Rental housing code training", "Data protection alignment"],
    consultationAvailable: true,
    marketplaceJoinOrder: 3,
    contactEmail: "hello@karibu-estates.example",
    contactPhone: "+254 700 000 001",
    testimonials: [
      {
        id: "t1",
        quote: "We replaced our PM in a week — dashboards finally match reality.",
        author: "L. Njeri",
        role: "Landlord, Kilimani",
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "Ridge Court HOA",
        rating: 5,
        comment: "Clear monthly packs and fast maintenance triage.",
        date: "2026-01-12",
      },
      {
        id: "r2",
        author: "J. Patel",
        rating: 4.5,
        comment: "Strong on tenant comms; onboarding took two weeks as promised.",
        date: "2025-11-03",
      },
    ],
  },
  {
    id: "pm-2",
    slug: "coastline-partners",
    companyName: "Coastline Portfolio Partners",
    logoUrl: "https://picsum.photos/seed/coastpm/128/128",
    initials: "CP",
    tagline: "Coastal residential and short-stay operations.",
    shortDescription:
      "Mombasa-focused team for villas, apartments, and short-stay inventory with hospitality-grade turnovers.",
    fullDescription:
      "Coastline blends long-term leasing with short-stay operations for owners who want one operator. We coordinate cleaning, linen, and guest messaging, and we maintain owner dashboards for occupancy and ADR trends.",
    rating: 4.7,
    reviewCount: 94,
    yearsInBusiness: 7,
    staffCount: 22,
    unitsManaged: 410,
    propertiesManaged: 28,
    occupancyRate: 0.88,
    serviceAreas: ["Mombasa", "Diani", "Nyali"],
    propertyTypes: ["Residential", "Airbnb / short stay"],
    pricingModel: "custom",
    pricingSummary: "Custom — long-term vs short-stay mix",
    samplePricing:
      "Short-stay: management fee plus cleaning pass-through; long-term: fixed monthly per door with performance bonus.",
    verified: true,
    featured: true,
    responseTime: "Same business day",
    responseHours: 8,
    specialties: ["Short-stay", "Coastal maintenance", "Owner dashboards"],
    servicesOffered: [
      "Short-stay operations",
      "Long-term leasing",
      "Turnover & housekeeping",
      "Local vendor network",
    ],
    languages: ["English", "Kiswahili"],
    badges: ["Verified", "Hospitality-trained staff"],
    certifications: ["Fire safety walkthroughs", "Short-stay best practices"],
    consultationAvailable: true,
    marketplaceJoinOrder: 5,
    contactEmail: "ops@coastline-partners.example",
    contactPhone: "+254 700 000 002",
    testimonials: [
      {
        id: "t2",
        quote: "One team handles our apartments and our Airbnb — huge relief.",
        author: "M. Hassan",
        role: "Owner, Nyali",
      },
    ],
    reviews: [
      {
        id: "r3",
        author: "Diani Villas Collective",
        rating: 5,
        comment: "Guest issues resolved quickly; owner statements are punctual.",
        date: "2026-02-01",
      },
    ],
  },
  {
    id: "pm-3",
    slug: "highlands-commercial",
    companyName: "Highlands Commercial PM",
    initials: "HC",
    tagline: "Office and retail property management.",
    shortDescription:
      "Lease administration, CAM reconciliations, and facilities coordination for Nairobi commercial assets.",
    fullDescription:
      "Highlands focuses on office parks, neighbourhood retail, and mixed-use podiums. We align service charge budgets, manage tenant improvements with approved contractors, and produce audit-friendly reporting.",
    rating: 4.6,
    reviewCount: 71,
    yearsInBusiness: 15,
    staffCount: 36,
    unitsManaged: 120,
    propertiesManaged: 18,
    pricingModel: "fixed_monthly",
    pricingSummary: "Fixed monthly retainer + pass-throughs",
    samplePricing:
      "Retainer scales by GLA; CAM reconciliations quarterly with variance commentary.",
    verified: true,
    featured: true,
    responseTime: "Under 4 hours",
    responseHours: 4,
    specialties: ["CAM & service charge", "Retail rollouts", "Landlord reporting"],
    servicesOffered: [
      "Lease administration",
      "Facilities & engineering liaison",
      "Service charge budgeting",
      "Tenant coordination",
    ],
    languages: ["English"],
    badges: ["Verified", "Commercial focus"],
    certifications: ["IFMA-aligned processes"],
    consultationAvailable: true,
    marketplaceJoinOrder: 2,
    contactEmail: "briefs@highlands-cpm.example",
    contactPhone: "+254 700 000 003",
    serviceAreas: ["Nairobi CBD", "Westlands", "Upper Hill"],
    propertyTypes: ["Commercial", "Mixed use"],
    testimonials: [],
    reviews: [
      {
        id: "r4",
        author: "Anchor Retail Ltd",
        rating: 4.5,
        comment: "Solid CAM packs and proactive facilities updates.",
        date: "2025-12-08",
      },
    ],
  },
  {
    id: "pm-4",
    slug: "studentnest-kenya",
    companyName: "StudentNest Kenya",
    logoUrl: "https://picsum.photos/seed/studentnest/128/128",
    initials: "SN",
    tagline: "Purpose-built student housing operations.",
    shortDescription:
      "Turnkey operations for PBSAs and converted student blocks near major campuses.",
    fullDescription:
      "StudentNest runs front desk, safeguarding, maintenance, and academic-year leasing cycles. We coordinate with institutions where required and maintain parent/guardian communication channels.",
    rating: 4.5,
    reviewCount: 132,
    yearsInBusiness: 6,
    staffCount: 55,
    unitsManaged: 1800,
    propertiesManaged: 9,
    occupancyRate: 0.97,
    serviceAreas: ["Nairobi", "Nakuru", "Eldoret"],
    propertyTypes: ["Student housing", "Residential"],
    pricingModel: "per_unit",
    pricingSummary: "Per bed / per unit — academic year contracts",
    samplePricing:
      "Per-bed management fee with utilities programme; summer short lets optional.",
    verified: true,
    featured: false,
    responseTime: "Under 6 hours",
    responseHours: 6,
    specialties: ["Turn schedules", "Guardian comms", "Campus-adjacent assets"],
    servicesOffered: [
      "Student leasing cycles",
      "Warden & front desk",
      "Maintenance & inspections",
      "Incident reporting",
    ],
    languages: ["English", "Kiswahili"],
    badges: ["Verified", "Safeguarding training"],
    certifications: ["Student housing safety checklist"],
    consultationAvailable: true,
    marketplaceJoinOrder: 6,
    contactEmail: "growth@studentnest.example",
    contactPhone: "+254 700 000 004",
    testimonials: [
      {
        id: "t3",
        quote: "They understand academic calendars — not generic residential PM.",
        author: "Uni Heights Dev Co",
        role: "Developer",
      },
    ],
    reviews: [
      {
        id: "r5",
        author: "Parents’ association rep",
        rating: 4.5,
        comment: "Responsive when rooms needed quick fixes at intake.",
        date: "2026-01-20",
      },
    ],
  },
  {
    id: "pm-5",
    slug: "urbanaxis-mixed",
    companyName: "UrbanAxis Mixed-Use Group",
    initials: "UA",
    tagline: "Podiums, live-work, and estate retail.",
    shortDescription:
      "Integrates residential towers with retail and amenity operations under one operating model.",
    fullDescription:
      "UrbanAxis aligns residential PM with retail tenant coordination, shared utilities, and estate security. Ideal for master-planned communities with multiple income streams.",
    rating: 4.4,
    reviewCount: 58,
    yearsInBusiness: 9,
    staffCount: 40,
    unitsManaged: 950,
    propertiesManaged: 14,
    occupancyRate: 0.92,
    serviceAreas: ["Nairobi", "Thika Road corridor"],
    propertyTypes: ["Mixed use", "Estates / communities", "Commercial"],
    pricingModel: "percentage_rent",
    pricingSummary: "Blended % on residential + retail service fee",
    samplePricing:
      "Residential: % of rent; retail: fixed service charge management fee per GLA band.",
    verified: true,
    featured: false,
    responseTime: "Under 3 hours",
    responseHours: 3,
    specialties: ["Master plans", "Shared services", "Retail-residential"],
    servicesOffered: [
      "Integrated PM",
      "Retail liaison",
      "Security & access programmes",
      "Amenity operations",
    ],
    languages: ["English", "Kiswahili"],
    badges: ["Verified"],
    certifications: [],
    consultationAvailable: true,
    marketplaceJoinOrder: 4,
    contactEmail: "newbiz@urbanaxis.example",
    contactPhone: "+254 700 000 005",
    testimonials: [],
    reviews: [
      {
        id: "r6",
        author: "Lakeside Live-Work Ltd",
        rating: 4.5,
        comment: "Finally one OPEX view across shops and apartments.",
        date: "2025-10-14",
      },
    ],
  },
  {
    id: "pm-6",
    slug: "eldoret-community-managers",
    companyName: "Eldoret Community Managers",
    logoUrl: "https://picsum.photos/seed/eldoretpm/128/128",
    initials: "EC",
    tagline: "Gated estates and homeowner coordination.",
    shortDescription:
      "Committee-friendly reporting for gated communities and medium-density estates in the Rift.",
    fullDescription:
      "We support committees with levy collection, common-area maintenance, and AGM-ready documentation. We are used to hybrid owner-occupier and rental mixes.",
    rating: 4.3,
    reviewCount: 45,
    yearsInBusiness: 11,
    staffCount: 19,
    unitsManaged: 620,
    propertiesManaged: 24,
    occupancyRate: 0.91,
    serviceAreas: ["Eldoret", "Kitale", "Rift towns"],
    propertyTypes: ["Estates / communities", "Residential"],
    pricingModel: "fixed_monthly",
    pricingSummary: "Fixed monthly per estate + levy collection",
    samplePricing:
      "Scales by stand count and common infrastructure complexity; AGM pack included.",
    verified: false,
    featured: false,
    responseTime: "Next business day",
    responseHours: 24,
    specialties: ["HOA / committee", "Levy workflows", "Common areas"],
    servicesOffered: [
      "Levy & billing",
      "Gatehouse coordination",
      "Landscaping & roads vendors",
      "AGM documentation",
    ],
    languages: ["English", "Kiswahili"],
    badges: ["Community focus"],
    certifications: [],
    consultationAvailable: true,
    marketplaceJoinOrder: 1,
    contactEmail: "committee@eldoret-cm.example",
    contactPhone: "+254 700 000 006",
    testimonials: [],
    reviews: [
      {
        id: "r7",
        author: "Greenridge Estate",
        rating: 4,
        comment: "Took one quarter to align processes — now very steady.",
        date: "2025-09-02",
      },
    ],
  },
  {
    id: "pm-7",
    slug: "spark-lettings-pm",
    companyName: "Spark Lettings & PM",
    initials: "SL",
    tagline: "Boutique PM for urban rentals.",
    shortDescription:
      "Hands-on management for smaller portfolios and high-touch landlords in Nairobi.",
    fullDescription:
      "Spark is deliberately smaller: senior managers stay on your account, with fast WhatsApp comms and same-week viewings. Best for 5–80 unit portfolios that need attention, not bureaucracy.",
    rating: 4.8,
    reviewCount: 203,
    yearsInBusiness: 8,
    staffCount: 14,
    unitsManaged: 180,
    propertiesManaged: 45,
    occupancyRate: 0.95,
    serviceAreas: ["Kilimani", "Lavington", "Kileleshwa"],
    propertyTypes: ["Residential", "Airbnb / short stay"],
    pricingModel: "percentage_rent",
    pricingSummary: "9–12% depending on services depth",
    samplePricing:
      "Core PM at 9%; add-ons for short-stay playbooks and interior refresh projects.",
    verified: true,
    featured: true,
    responseTime: "Under 1 hour",
    responseHours: 1,
    specialties: ["Boutique service", "Short-stay hybrid", "Urban infill"],
    servicesOffered: [
      "Letting & renewals",
      "Inspections",
      "Maintenance desk",
      "Owner statements",
    ],
    languages: ["English"],
    badges: ["Verified", "Fast response"],
    certifications: [],
    consultationAvailable: true,
    marketplaceJoinOrder: 8,
    contactEmail: "team@spark-lettings.example",
    contactPhone: "+254 700 000 007",
    testimonials: [
      {
        id: "t4",
        quote: "They pick up the phone — rare for PM firms.",
        author: "A. Omondi",
        role: "Landlord, Lavington",
      },
    ],
    reviews: [
      {
        id: "r8",
        author: "S. Chen",
        rating: 5,
        comment: "Found tenants faster than our previous agent model.",
        date: "2026-02-10",
      },
    ],
  },
  {
    id: "pm-8",
    slug: "legacy-trust-pm",
    companyName: "Legacy Trust Property Group",
    logoUrl: "https://picsum.photos/seed/legacypm/128/128",
    initials: "LT",
    tagline: "Large-scale residential and mixed portfolios.",
    shortDescription:
      "Enterprise PM for institutional owners and family offices across multiple cities.",
    fullDescription:
      "Legacy Trust runs playbooks for onboarding large portfolios, standardising policies, and integrating with owner ERP exports. We assign portfolio directors and regional leads.",
    rating: 4.5,
    reviewCount: 112,
    yearsInBusiness: 22,
    staffCount: 120,
    unitsManaged: 8500,
    propertiesManaged: 140,
    occupancyRate: 0.94,
    serviceAreas: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
    propertyTypes: ["Residential", "Commercial", "Mixed use", "Estates / communities"],
    pricingModel: "custom",
    pricingSummary: "Enterprise agreements — RFP-based",
    samplePricing:
      "Structured SLAs, dedicated PMO, and migration support for 1,000+ unit transfers.",
    verified: true,
    featured: false,
    responseTime: "Under 4 hours",
    responseHours: 4,
    specialties: ["Institutional", "Multi-city", "Migration"],
    servicesOffered: [
      "Portfolio onboarding",
      "Policy standardisation",
      "Executive reporting",
      "Vendor frameworks",
    ],
    languages: ["English", "Kiswahili", "French"],
    badges: ["Verified", "Enterprise"],
    certifications: ["ISO-aligned documentation practices"],
    consultationAvailable: true,
    marketplaceJoinOrder: 7,
    contactEmail: "institutional@legacy-trust.example",
    contactPhone: "+254 700 000 008",
    testimonials: [],
    reviews: [
      {
        id: "r9",
        author: "Family Office RE desk",
        rating: 4.5,
        comment: "Heavy but fair onboarding — reporting is consistent quarter to quarter.",
        date: "2025-12-19",
      },
    ],
  },
];

/**
 * Unique service area labels across the mock dataset (for filter dropdown).
 * @param managers - Full mock list.
 */
export function uniqueServiceAreas(managers: PropertyManagerRecord[]): string[] {
  const set = new Set<string>();
  for (const m of managers) {
    for (const a of m.serviceAreas) set.add(a);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * Distinct services from `servicesOffered` for filter options.
 * @param managers - Full mock list.
 */
export function uniqueServicesOffered(managers: PropertyManagerRecord[]): string[] {
  const set = new Set<string>();
  for (const m of managers) {
    for (const s of m.servicesOffered) set.add(s);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * Aggregate trust stats for the hero strip (derived from mock data).
 * @param managers - Full mock list.
 */
export function aggregateMarketplaceStats(managers: PropertyManagerRecord[]) {
  const count = managers.length;
  const properties = managers.reduce((s, m) => s + m.propertiesManaged, 0);
  const avgRating =
    count === 0 ? 0 : managers.reduce((s, m) => s + m.rating, 0) / count;
  const cities = new Set<string>();
  for (const m of managers) {
    for (const a of m.serviceAreas) cities.add(a.split(",")[0].trim());
  }
  return {
    managerCount: count,
    propertiesManaged: properties,
    avgRating: Math.round(avgRating * 10) / 10,
    citiesCovered: cities.size,
  };
}
