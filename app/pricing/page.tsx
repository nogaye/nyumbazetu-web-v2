/**
 * Pricing page: displays plan tiers (Free, Standard, Premier, Enterprise) with per-unit
 * pricing, feature lists, and FAQs. Free tier targets small landlords; paid plans scale by portfolio.
 */

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Pricing | Nyumba Zetu",
  description:
    "Start free with up to 3 units. Simple, transparent pricing that scales with your portfolio. Paid plans from KES 100 per unit per month.",
};

/** Per-unit price in KES; free tier is 0. Used for display and example calculations. */
const PRICE_PER_UNIT = {
  free: 0,
  standard: 100,
  premier: 150,
  enterprise: 250,
} as const;

/** Plan IDs used in the feature matrix; must match plan names in plans[]. */
const PLAN_IDS = ["Free", "Standard", "Premier", "Enterprise"] as const;

/**
 * Feature definition aligned with /features page. plans lists which tiers include this feature.
 * freeTierLevel: when "Free" is in plans, "basic" shows "Basic" in the Free column; otherwise checkmark.
 */
interface FeaturePlanRow {
  slug: string;
  title: string;
  description: string;
  /** Plans that include this feature (at least one). */
  plans: readonly (typeof PLAN_IDS)[number][];
  /** When Free is in plans: "basic" = show "Basic" in Free column; omitted = full checkmark. */
  freeTierLevel?: "basic";
}

/**
 * All platform features and which pricing plan(s) include them. Kept in sync with app/features/page.tsx.
 */
const FEATURES_BY_PLAN: FeaturePlanRow[] = [
  {
    slug: "collections",
    title: "Automated Invoicing & Payment Reconciliation",
    description:
      "Automated invoicing and payment tracking for any charge type; M-Pesa, bank, and wallet integrations.",
    plans: ["Free", "Standard", "Premier", "Enterprise"],
    freeTierLevel: "basic",
  },
  {
    slug: "accounting",
    title: "Accounting & General Ledger",
    description:
      "Double-entry accounting, journal entries, trial balance, P&L, balance sheet.",
    plans: ["Standard", "Premier", "Enterprise"],
  },
  {
    slug: "tenant-experience",
    title: "Tenant & Owner Experience",
    description:
      "Self-service portals, mobile apps, WhatsApp chatbot; owner portals on Premier+.",
    plans: ["Free", "Standard", "Premier", "Enterprise"],
    freeTierLevel: "basic",
  },
  {
    slug: "maintenance",
    title: "Maintenance and Service Requests",
    description:
      "Maintenance and service requests, work orders, assignment, and completion tracking.",
    plans: ["Premier", "Enterprise"],
  },
  {
    slug: "assets-management",
    title: "Assets Management",
    description:
      "Property and facility asset register, tracking, and depreciation.",
    plans: ["Premier", "Enterprise"],
  },
  {
    slug: "expense-vendor-management",
    title: "Expense & Vendor Management",
    description:
      "Expense tracking, vendor records, contracts, and vendor payments.",
    plans: ["Premier", "Enterprise"],
  },
  {
    slug: "tasks",
    title: "Tasks & Projects",
    description:
      "Project tracking, task assignment, budget and cost tracking for developments.",
    plans: ["Premier", "Enterprise"],
  },
  {
    slug: "etims",
    title: "KRA eTIMS & Compliance",
    description:
      "eTIMS-compliant invoicing, automatic submission, tax workflows, audit trails.",
    plans: ["Premier", "Enterprise"],
  },
  {
    slug: "tps",
    title: "TPS & Rent-to-Own",
    description:
      "Tenant Purchase Scheme, installment tracking, ownership %, transfer workflows.",
    plans: ["Enterprise"],
  },
  {
    slug: "communications",
    title: "Communication Hub",
    description:
      "Email, SMS, in-app messaging, WhatsApp, and AI-powered chatbot; bulk announcements, communication history.",
    plans: ["Free", "Standard", "Premier", "Enterprise"],
    freeTierLevel: "basic",
  },
  {
    slug: "crm",
    title: "CRM",
    description:
      "Contact management, interaction history, leads, vendor relationships.",
    plans: ["Premier", "Enterprise"],
  },
  {
    slug: "white-labeling",
    title: "White Labeling",
    description:
      "Custom branding, domain, SSL, branded portals and apps, email templates.",
    plans: ["Enterprise"],
  },
  {
    slug: "calendar-scheduling",
    title: "Calendar & Event Scheduling",
    description:
      "Scheduled invoicing, payment reminders, penalty automation, recurring tasks.",
    plans: ["Standard", "Premier", "Enterprise"],
  },
  {
    slug: "webhooks",
    title: "Webhooks & API Events",
    description:
      "Real-time event notifications, webhook endpoints, API triggers, automation.",
    plans: ["Premier", "Enterprise"],
  },
  {
    slug: "listings",
    title: "Property Listings",
    description:
      "Verified listings, search and filters, property details, contact options.",
    plans: ["Premier", "Enterprise"],
  },
  {
    slug: "visitors",
    title: "Visitor Management",
    description:
      "Visitor registration, check-in/out, host linking, visit history and reporting.",
    plans: ["Premier", "Enterprise"],
  },
  {
    slug: "reports",
    title: "Reports & Analytics",
    description:
      "Landlord statements, tenant ledgers, trial balance, P&L, Ask Nyumba Zetu (RAG).",
    plans: ["Free", "Standard", "Premier", "Enterprise"],
    freeTierLevel: "basic",
  },
  {
    slug: "lease-applications",
    title: "Lease Applications",
    description:
      "Application tracking, approval workflows, KYC, onboarding to lease and units.",
    plans: ["Premier", "Enterprise"],
  },
  {
    slug: "smart-meters",
    title: "Smart Meters & Utilities",
    description:
      "Meter integration, consumption tracking, tariffs, automated utility billing.",
    plans: ["Premier", "Enterprise"],
  },
];

/**
 * Plan definition for the pricing grid. price and priceSubline drive the main display;
 * units and features describe scope and inclusions. restrictions (e.g. Free tier limits) are optional.
 */
interface PlanDef {
  name: string;
  /** Optional subtitle shown under the plan name (e.g. "Landlord Starter"). */
  subtitle?: string;
  price: string;
  priceSubline?: string;
  period: string;
  description: string;
  units: string;
  features: string[];
  /** Optional list of "not included" items for the Free tier. */
  restrictions?: string[];
  cta: string;
  popular: boolean;
  /** When true, card uses free-tier styling and no "KES" prefix on price. */
  isFree?: boolean;
}

const plans: PlanDef[] = [
  {
    name: "Free",
    //subtitle: "Landlord Starter",
    price: "Free",
    //priceSubline: "forever",
    period: "",
    description:
      "Perfect for landlords and managers starting out: manage up to 3 units with essential tools.",
    units: "One admin and up to 3 units",
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
    cta: "Get Started Free",
    popular: false,
    isFree: true,
  },
  {
    name: "Standard",
    price: "100",
    priceSubline: "per unit per month",
    period: "",
    description:
      "Entry plan for landlords and small portfolios: core property management with bank integration.",
    units: "Up to 3 admins",
    features: [
      "Automated invoicing & payment reconciliation",
      "Bank integrations*",
      "Tenant Portal",
      "Communication hub (email, SMS, WhatsApp, AI-powered chatbot, in-app messaging)",
      "Calendar & event scheduling (invoicing, reminders, penalties)",
      "Reports & analytics (basic)",
      "Accounting & general ledger (basic)",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premier",
    price: "150",
    priceSubline: "per unit per month",
    period: "",
    description:
      "For property managers and growing portfolios with advanced tools.",
    units: "Up to 10 admins",
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
      "Webhooks & API events",
      "Property listings",
      "Smart meters integration*",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "250",
    priceSubline: "per unit per month",
    period: "",
    description:
      "For large portfolios, estates, and institutions with dedicated support.",
    units: "Unlimited admins",
    features: [
      "Everything in Premier",
      "TPS & rent-to-own",
      "White labeling",
      "Dedicated account manager",
      "Custom integrations",
      "Webhooks & API events",
      "On-site training & SLA",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

/**
 * Renders the main pricing page: hero, plan cards (Standard, Premier, Enterprise),
 * FAQs, and contact CTA.
 */
export default function PricingPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Start free. Scale when you’re ready."
          description="Free tier for up to 3 units. Paid plans from KES 100 per unit per month. No hidden fees—choose what fits your portfolio."
        />
      </Section>

      <Section>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`${plan.popular ? "border-2 border-primary relative" : ""} ${plan.isFree ? "border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-slate-900/50" : ""} hover:shadow-md transition-all duration-200 flex flex-col`}
            >
              {plan.isFree && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-600 text-white border-0 px-4 py-1.5 text-sm font-semibold shadow-sm"
                  >
                    Start free
                  </Badge>
                </div>
              )}
              {plan.popular && !plan.isFree && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  {plan.name}
                </CardTitle>
                {plan.subtitle && (
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 -mt-1">
                    {plan.subtitle}
                  </p>
                )}
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-4xl font-bold text-slate-900 dark:text-slate-50">
                      {plan.isFree ? plan.price : `KES ${plan.price}`}
                    </span>
                    {plan.priceSubline && !plan.isFree && (
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        /unit
                      </span>
                    )}
                  </div>
                  {plan.priceSubline && (
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                      {plan.priceSubline}
                    </div>
                  )}
                  {plan.period && (
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {plan.period}
                    </div>
                  )}
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-2">
                    {plan.units}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIdx) => (
                    <li
                      key={featureIdx}
                      className="flex items-start space-x-2.5"
                    >
                      <CheckIcon className="h-5 w-5 text-tertiary flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                {plan.restrictions && plan.restrictions.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Not included
                    </p>
                    <ul className="space-y-2">
                      {plan.restrictions.map((r, rIdx) => (
                        <li
                          key={rIdx}
                          className="flex items-start space-x-2.5 text-slate-500 dark:text-slate-400"
                        >
                          <XMarkIcon
                            className="h-4 w-4 flex-shrink-0 mt-0.5 opacity-70"
                            aria-hidden
                          />
                          <span className="text-sm leading-relaxed">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={
                    plan.popular
                      ? "default"
                      : plan.isFree
                        ? "default"
                        : "outline"
                  }
                  size="lg"
                  asChild
                >
                  <Link href="/contact">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8 max-w-2xl mx-auto">
          Paid plans: e.g. 10 units on Premier = KES{" "}
          {((10 * PRICE_PER_UNIT.premier) / 1).toLocaleString()}/month (
          {PRICE_PER_UNIT.premier} × 10). You only pay for the units you manage.
        </p>
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
          * Custom integrations (e.g. bank, eTIMS, smart meters, etc.) are
          charged separately based on complexity, starting at KES 5,000 per
          integration.
        </p>
      </Section>

      {/* Features by plan — detailed matrix of all features and which plans include them */}
      <Section className="bg-slate-50 dark:bg-slate-900/50">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 leading-tight tracking-tight">
            Features by plan
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Every feature from our platform, and which plan includes it. All
            features link to full details on our Features page.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-4 px-4 font-semibold text-slate-900 dark:text-slate-50 w-[min(220px,30%)]">
                  Feature
                </th>
                <th className="py-4 px-3 font-semibold text-slate-700 dark:text-slate-300 text-center w-[72px]">
                  Free
                </th>
                <th className="py-4 px-3 font-semibold text-slate-700 dark:text-slate-300 text-center w-[72px]">
                  Standard
                </th>
                <th className="py-4 px-3 font-semibold text-slate-700 dark:text-slate-300 text-center w-[72px]">
                  Premier
                </th>
                <th className="py-4 px-3 font-semibold text-slate-700 dark:text-slate-300 text-center w-[72px]">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {FEATURES_BY_PLAN.map((row) => (
                <tr
                  key={row.slug}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <Link
                      href={`/features/${row.slug}`}
                      className="group font-medium text-slate-900 dark:text-slate-50 hover:text-primary inline-flex items-center gap-1"
                    >
                      {row.title}
                      <ArrowRightIcon className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5 max-w-md">
                      {row.description}
                    </p>
                  </td>
                  {PLAN_IDS.map((planId) => (
                    <td key={planId} className="py-4 px-3 text-center">
                      {planId === "Free" ? (
                        row.plans.includes("Free") ? (
                          row.freeTierLevel === "basic" ? (
                            <span
                              className="text-xs font-medium text-slate-600 dark:text-slate-400"
                              title="Basic / limited"
                            >
                              Basic
                            </span>
                          ) : (
                            <CheckIcon
                              className="h-6 w-6 text-tertiary mx-auto"
                              aria-hidden
                            />
                          )
                        ) : (
                          <span
                            className="text-slate-300 dark:text-slate-600"
                            aria-label="Not included"
                          >
                            —
                          </span>
                        )
                      ) : row.plans.includes(planId) ? (
                        <CheckIcon
                          className="h-6 w-6 text-tertiary mx-auto"
                          aria-hidden
                        />
                      ) : (
                        <span
                          className="text-slate-300 dark:text-slate-600"
                          aria-label="Not included"
                        >
                          —
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/features" className="inline-flex items-center gap-2">
              View all features in detail
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </p>
      </Section>

      {/* FAQ */}
      <Section className="bg-secondary">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Common questions about pricing and plans.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: "What’s included in the Free tier?",
              a: "The Free (Landlord Starter) plan lets you manage up to 3 units with basic tenant management, rent tracking, payment recording, tenant statements, basic reports, and email notifications. No credit card required. Upgrade anytime for advanced accounting, automation, integrations, and full support.",
            },
            {
              q: "How does per-unit pricing work?",
              a: "Standard is KES 100 per unit per month, Premier is KES 150 per unit, and Enterprise is KES 250 per unit. You're billed only for the number of units you manage. For example, 20 units on Premier = KES 3,000/month.",
            },
            {
              q: "Can I change plans later?",
              a: "Yes. Start free and upgrade when you need more units or features. You can also downgrade a paid plan. When you add or remove units, your bill updates accordingly. Changes take effect at the start of your next billing cycle.",
            },
            {
              q: "Are there setup fees?",
              a: "No setup fees for the Free tier, Standard, or Premier. Enterprise may include implementation or training services depending on your needs.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept M-Pesa, bank transfers, and credit cards. All payments are processed securely.",
            },
          ].map((faq, idx) => (
            <Card
              key={idx}
              className="hover:shadow-md transition-all duration-200 bg-white/10 backdrop-blur-sm border-white/20"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">
                  {faq.q}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white leading-relaxed">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
            Need help choosing a plan?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Talk to our team to find the right solution for your portfolio.
          </p>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact" className="flex items-center gap-2">
              Contact Sales
              <PhoneIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
