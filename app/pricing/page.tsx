/**
 * Pricing page: displays plan tiers (Standard, Premier, Enterprise) with per-unit
 * pricing, feature lists, and FAQs. Used as the main marketing pricing view.
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
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Pricing | Nyumba Zetu",
  description:
    "Simple, transparent pricing that scales with your portfolio. Plans from KES 100 per unit per month. Choose the plan that fits your property management needs.",
};

/** Per-unit price in KES; used for display and example calculations. */
const PRICE_PER_UNIT = {
  standard: 100,
  premier: 150,
  enterprise: 250,
} as const;

/** Plan IDs used in the feature matrix; must match plan names in plans[]. */
const PLAN_IDS = ["Standard", "Premier", "Enterprise"] as const;

/**
 * Feature definition aligned with /features page. plans lists which tiers include this feature
 * (inclusive: e.g. ["Standard","Premier","Enterprise"] means all paid plans).
 */
interface FeaturePlanRow {
  slug: string;
  title: string;
  description: string;
  /** Plans that include this feature (at least one). */
  plans: readonly (typeof PLAN_IDS)[number][];
}

/**
 * All platform features and which pricing plan(s) include them. Kept in sync with app/features/page.tsx.
 */
const FEATURES_BY_PLAN: FeaturePlanRow[] = [
  {
    slug: "collections",
    title: "Rent & Service Charge Collections",
    description:
      "Automated invoicing and payment tracking; M-Pesa, bank, and wallet integrations.",
    plans: ["Standard", "Premier", "Enterprise"],
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
    plans: ["Standard", "Premier", "Enterprise"],
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
    plans: ["Standard", "Premier", "Enterprise"],
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
    plans: ["Standard", "Premier", "Enterprise"],
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
 * units and features describe scope and inclusions. Feature bullets align with FEATURES_BY_PLAN.
 */
interface PlanDef {
  name: string;
  price: string;
  priceSubline?: string;
  period: string;
  description: string;
  units: string;
  features: string[];
  cta: string;
  popular: boolean;
}

const plans: PlanDef[] = [
  {
    name: "Standard",
    price: "100",
    priceSubline: "per unit per month",
    period: "",
    description:
      "Entry plan for landlords and small portfolios: core property management with bank integration.",
    units: "Up to 3 admins",
    features: [
      "Rent & service charge collections (invoicing; M-Pesa, daily settlements)",
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
          title="Simple, transparent pricing that scales with your portfolio."
          description="Plans from KES 100 per unit per month. No hidden fees—choose the plan that fits your needs."
        />
      </Section>

      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`${plan.popular ? "border-2 border-primary relative" : ""} hover:shadow-md transition-all duration-200 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-4xl font-bold text-slate-900 dark:text-slate-50">
                      KES {plan.price}
                    </span>
                    {plan.priceSubline && (
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
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
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
          Example: 10 units on Premier = KES{" "}
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
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-4 px-4 font-semibold text-slate-900 dark:text-slate-50 w-[min(220px,30%)]">
                  Feature
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
                      {row.plans.includes(planId) ? (
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
              q: "How does per-unit pricing work?",
              a: "Standard is KES 100 per unit per month, Premier is KES 150 per unit, and Enterprise is KES 250 per unit. You're billed only for the number of units you manage. For example, 20 units on Premier = KES 3,000/month.",
            },
            {
              q: "Can I change plans later?",
              a: "Yes, you can upgrade or downgrade your plan at any time. When you add or remove units, your bill updates accordingly. Changes take effect at the start of your next billing cycle.",
            },
            {
              q: "Are there setup fees?",
              a: "No setup fees for Standard and Premier. Enterprise may include implementation or training services depending on your needs.",
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
