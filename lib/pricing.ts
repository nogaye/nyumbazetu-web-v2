/**
 * Central pricing model and billing helpers for the pricing page.
 *
 * This module is the single source of truth for plan prices, annual discount
 * logic, portfolio examples, and user-facing billing copy that depends on
 * monthly vs annual selection.
 */

/** Billing cycle values supported by the pricing UI. */
export type BillingMode = "monthly" | "annual";

/** Portfolio sizes used in Premier example pricing. */
export const PREMIER_EXAMPLE_UNITS = [10, 50, 200] as const;

/**
 * Base plan definition used to render plan cards and calculate pricing.
 */
export interface PricingPlan {
  /** Stable identifier used for keys, calculations, and conditional UI. */
  id: "free" | "standard" | "premier" | "enterprise";
  /** Human-readable plan name displayed on pricing cards and section labels. */
  name: string;
  /** Optional subtitle for additional positioning context (for Free tier). */
  subtitle?: string;
  /** Short audience descriptor displayed near the plan title. */
  whoIsItFor?: string;
  /** Plan description describing value proposition and target use case. */
  description: string;
  /** Admin/user scope label shown under pricing information. */
  unitsLabel: string;
  /** Feature list rendered as included capability bullets. */
  features: string[];
  /** Optional exclusion list for lower tiers to improve buyer clarity. */
  restrictions?: string[];
  /** Primary CTA label shown at the bottom of each card. */
  cta: string;
  /** Whether this plan is highlighted as "Most Popular". */
  popular: boolean;
  /** Whether this plan is the free tier and excluded from billing toggle logic. */
  isFree?: boolean;
  /** Monthly per-unit price in KES before discounts. */
  monthlyUnitPrice: number;
  /** Annual discount percentage applied to monthly-equivalent price. */
  annualDiscountPercent: number;
  /** Optional additional badge labels for premium messaging. */
  labels?: string[];
}

/** Annual discount applied to paid plans in the pricing UI. */
export const DEFAULT_ANNUAL_DISCOUNT_PERCENT = 20;

/** Full pricing catalog for Free, Standard, Premier, and Enterprise plans. */
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    subtitle: "Landlord Starter",
    whoIsItFor: "Individual landlords",
    description:
      "Perfect for landlords and managers starting out: manage up to 3 units with essential tools.",
    unitsLabel: "One admin and up to 3 units",
    features: [
      "Basic tenant management",
      "Rent tracking",
      "Payment recording",
      "Tenant statements",
      "Basic reports",
      "Email notifications",
    ],
    restrictions: [
      "No advanced accounting",
      "No automation",
      "No integrations",
      "No bulk messaging",
      "Limited support",
    ],
    cta: "Book a Demo",
    popular: false,
    isFree: true,
    monthlyUnitPrice: 0,
    annualDiscountPercent: 0,
    labels: ["Start free"],
  },
  {
    id: "standard",
    name: "Standard",
    whoIsItFor: "Small property managers",
    description:
      "Core property management: tenant portal, basic accounting, and payment tracking.",
    unitsLabel: "Up to 3 admins",
    features: [
      "Automated invoicing & payment reconciliation",
      "Bank integrations*",
      "Tenant Portal",
      "Communication hub (email, SMS, WhatsApp, AI-powered chatbot, in-app messaging)",
      "Calendar & event scheduling (invoicing, reminders, penalties)",
      "Reports & analytics (basic)",
      "Accounting & general ledger (basic)",
    ],
    cta: "Book a Demo",
    popular: false,
    monthlyUnitPrice: 100,
    annualDiscountPercent: DEFAULT_ANNUAL_DISCOUNT_PERCENT,
  },
  {
    id: "premier",
    name: "Premier",
    whoIsItFor: "Growing portfolios",
    description:
      "Full toolkit: bank integrations, communication hub, automation, and advanced reporting.",
    unitsLabel: "Up to 10 admins",
    features: [
      "Everything in Standard",
      "KRA eTIMS integration*",
      "Advanced accounting & GL",
      "Owner portals (full tenant & owner experience)",
      "Maintenance and Service Requests",
      "Assets Management",
      "Expense & vendor management",
      "Visitor management",
      "Lease applications & onboarding",
      "Tasks & projects",
      "CRM",
      "Property listings",
      "Smart meters integration*",
      "Priority support",
    ],
    cta: "Book a Demo",
    popular: true,
    monthlyUnitPrice: 150,
    annualDiscountPercent: DEFAULT_ANNUAL_DISCOUNT_PERCENT,
    labels: ["Most Popular"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    whoIsItFor: "Large estates & institutions",
    description:
      "For large portfolios, estates, and institutions with dedicated support.",
    unitsLabel: "Unlimited admins",
    features: [
      "Everything in Premier",
      "TPS & rent-to-own",
      "White labeling",
      "Dedicated account manager",
      "Custom integrations",
      "Webhooks & API events",
      "On-site training & SLA",
    ],
    cta: "Book a Demo",
    popular: false,
    monthlyUnitPrice: 250,
    annualDiscountPercent: DEFAULT_ANNUAL_DISCOUNT_PERCENT,
  },
];

/**
 * Formats whole-number KES values consistently for all pricing surfaces.
 *
 * @param amount Numeric amount in Kenyan shillings.
 * @returns Locale-formatted KES string with thousand separators.
 */
export function formatKes(amount: number): string {
  return `KES ${new Intl.NumberFormat("en-KE", {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

/**
 * Calculates the discounted monthly-equivalent unit price for annual billing.
 *
 * @param monthlyUnitPrice Monthly unit price before discount.
 * @param annualDiscountPercent Discount percentage applied to monthly-equivalent amount.
 * @returns Discounted effective monthly unit price rounded to nearest shilling.
 */
export function calculateAnnualEffectiveMonthlyUnitPrice(
  monthlyUnitPrice: number,
  annualDiscountPercent: number,
): number {
  return Math.round(monthlyUnitPrice * (1 - annualDiscountPercent / 100));
}

/**
 * Calculates annual billed unit total based on monthly-equivalent annual discount.
 *
 * @param monthlyUnitPrice Monthly unit price before discount.
 * @param annualDiscountPercent Discount percentage applied to annual billing.
 * @returns Total KES charged per unit for a full annual commitment.
 */
export function calculateAnnualUnitPrice(
  monthlyUnitPrice: number,
  annualDiscountPercent: number,
): number {
  return (
    calculateAnnualEffectiveMonthlyUnitPrice(
      monthlyUnitPrice,
      annualDiscountPercent,
    ) * 12
  );
}

/**
 * Returns the active monthly-equivalent unit price for a plan based on billing mode.
 *
 * @param plan Plan configuration to evaluate.
 * @param billingMode Current selected billing mode.
 * @returns Unit price shown as "/unit/month" in the card header.
 */
export function getDisplayedMonthlyEquivalentUnitPrice(
  plan: PricingPlan,
  billingMode: BillingMode,
): number {
  if (plan.isFree) {
    return 0;
  }

  if (billingMode === "annual") {
    return calculateAnnualEffectiveMonthlyUnitPrice(
      plan.monthlyUnitPrice,
      plan.annualDiscountPercent,
    );
  }

  return plan.monthlyUnitPrice;
}

/**
 * Builds Premier portfolio example rows from the selected billing mode.
 *
 * @param billingMode Current selected billing mode.
 * @returns Example amounts including monthly-equivalent and annual billed totals.
 */
export function getPremierPortfolioExamples(billingMode: BillingMode): Array<{
  units: number;
  monthlyEquivalentTotal: number;
  annualBilledTotal: number | null;
}> {
  const premierPlan = PRICING_PLANS.find((plan) => plan.id === "premier");

  if (!premierPlan) {
    return [];
  }

  const monthlyEquivalentUnitPrice = getDisplayedMonthlyEquivalentUnitPrice(
    premierPlan,
    billingMode,
  );
  const annualUnitPrice = calculateAnnualUnitPrice(
    premierPlan.monthlyUnitPrice,
    premierPlan.annualDiscountPercent,
  );

  return PREMIER_EXAMPLE_UNITS.map((units) => ({
    units,
    monthlyEquivalentTotal: monthlyEquivalentUnitPrice * units,
    annualBilledTotal: billingMode === "annual" ? annualUnitPrice * units : null,
  }));
}
