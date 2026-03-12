/**
 * Pricing page: displays plan tiers (Free, Starter, Growth, Enterprise) with per-unit
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
  SparklesIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Pricing | Nyumba Zetu",
  description:
    "Simple, transparent pricing that scales with your portfolio. Free for up to 5 units; paid plans from KES 100/unit. Choose the plan that fits your property management needs.",
};

/** Per-unit price in KES; used for display and example calculations. */
const PRICE_PER_UNIT = {
  starter: 100,
  growth: 150,
  enterprise: 250,
} as const;

/** Plan IDs used in the feature matrix; must match plan names in plans[]. */
const PLAN_IDS = ["Free", "Starter", "Growth", "Enterprise"] as const;

/**
 * Feature definition aligned with /features page. plans lists which tiers include this feature
 * (inclusive: e.g. ["Starter","Growth","Enterprise"] means all paid plans).
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
      "Automated invoicing and payment tracking; M-Pesa, bank, and wallet on paid plans.",
    plans: ["Free", "Starter", "Growth", "Enterprise"],
  },
  {
    slug: "accounting",
    title: "Accounting & General Ledger",
    description:
      "Double-entry accounting, journal entries, trial balance, P&L, balance sheet.",
    plans: ["Starter", "Growth", "Enterprise"],
  },
  {
    slug: "tenant-experience",
    title: "Tenant & Owner Experience",
    description: "Self-service portals, mobile apps, WhatsApp chatbot; owner portals on Growth+.",
    plans: ["Free", "Starter", "Growth", "Enterprise"],
  },
  {
    slug: "maintenance",
    title: "Maintenance & Assets",
    description: "Maintenance requests, work orders, asset tracking, vendor management.",
    plans: ["Free", "Starter", "Growth", "Enterprise"],
  },
  {
    slug: "tasks",
    title: "Tasks & Projects",
    description: "Project tracking, task assignment, budget and cost tracking for developments.",
    plans: ["Growth", "Enterprise"],
  },
  {
    slug: "etims",
    title: "KRA eTIMS & Compliance",
    description: "eTIMS-compliant invoicing, automatic submission, tax workflows, audit trails.",
    plans: ["Starter", "Growth", "Enterprise"],
  },
  {
    slug: "tps",
    title: "TPS & Rent-to-Own",
    description: "Tenant Purchase Scheme, installment tracking, ownership %, transfer workflows.",
    plans: ["Enterprise"],
  },
  {
    slug: "communications",
    title: "Communication Hub",
    description: "Email, SMS, in-app messaging, bulk announcements, communication history.",
    plans: ["Free", "Starter", "Growth", "Enterprise"],
  },
  {
    slug: "crm",
    title: "CRM",
    description: "Contact management, interaction history, leads, vendor relationships.",
    plans: ["Growth", "Enterprise"],
  },
  {
    slug: "white-labeling",
    title: "White Labeling",
    description: "Custom branding, domain, SSL, branded portals and apps, email templates.",
    plans: ["Enterprise"],
  },
  {
    slug: "calendar-scheduling",
    title: "Calendar & Event Scheduling",
    description: "Scheduled invoicing, payment reminders, penalty automation, recurring tasks.",
    plans: ["Free", "Starter", "Growth", "Enterprise"],
  },
  {
    slug: "webhooks",
    title: "Webhooks & API Events",
    description: "Real-time event notifications, webhook endpoints, API triggers, automation.",
    plans: ["Growth", "Enterprise"],
  },
  {
    slug: "listings",
    title: "Property Listings",
    description: "Verified listings, search and filters, property details, contact options.",
    plans: ["Growth", "Enterprise"],
  },
  {
    slug: "visitors",
    title: "Visitor Management",
    description: "Visitor registration, check-in/out, host linking, visit history and reporting.",
    plans: ["Free", "Starter", "Growth", "Enterprise"],
  },
  {
    slug: "reports",
    title: "Reports & Analytics",
    description: "Landlord statements, tenant ledgers, trial balance, P&L, Ask Nyumba Zetu (RAG).",
    plans: ["Free", "Starter", "Growth", "Enterprise"],
  },
  {
    slug: "lease-applications",
    title: "Lease Applications",
    description: "Application tracking, approval workflows, KYC, onboarding to lease and units.",
    plans: ["Free", "Starter", "Growth", "Enterprise"],
  },
  {
    slug: "smart-meters",
    title: "Smart Meters & Utilities",
    description: "Meter integration, consumption tracking, tariffs, automated utility billing.",
    plans: ["Growth", "Enterprise"],
  },
  {
    slug: "security-deposits",
    title: "Security Deposits",
    description: "Deposit tracking per unit, invoice linking, refunds and adjustments, audit trail.",
    plans: ["Free", "Starter", "Growth", "Enterprise"],
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
  /** If set, card gets a subtle "free" styling (e.g. badge). */
  isFree?: boolean;
}

const plans: PlanDef[] = [
  {
    name: "Free",
    price: "0",
    priceSubline: "Forever free",
    period: "",
    description:
      "Core features for small portfolios—no bank integrations, weekly payouts via Nyumba Zetu.",
    units: "1–4 units",
    features: [
      "Rent & service charge collections (invoicing; weekly settlements via Nyumba Zetu account)",
      "Tenant & owner experience (tenant portal, mobile app)",
      "Communication hub (email, SMS, in-app messaging)",
      "Calendar & event scheduling (invoicing, reminders, penalties)",
      "Visitor management",
      "Reports & analytics (basic)",
      "Lease applications & onboarding",
      "Security deposits",
      "Maintenance & assets (basic tracking)",
    ],
    cta: "Start Free",
    popular: false,
    isFree: true,
  },
  {
    name: "Starter",
    price: "100",
    priceSubline: "per unit per month",
    period: "",
    description:
      "Perfect for individual landlords and small portfolios with bank integration.",
    units: "5+ units",
    features: [
      "Everything in Free",
      "Bank & M-Pesa integrations; daily settlements",
      "Accounting & general ledger (basic)",
      "KRA eTIMS & compliance",
      "Full maintenance & assets",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "150",
    priceSubline: "per unit per month",
    period: "",
    description:
      "For property managers and growing portfolios with advanced tools.",
    units: "5+ units",
    features: [
      "Everything in Starter",
      "Advanced accounting & GL",
      "Owner portals (full tenant & owner experience)",
      "Tasks & projects",
      "CRM",
      "Webhooks & API events",
      "Property listings",
      "Smart meters & utilities",
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
    units: "Unlimited units",
    features: [
      "Everything in Growth",
      "TPS & rent-to-own",
      "White labeling",
      "Dedicated account manager",
      "Custom integrations & advanced security",
      "On-site training & SLA",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

/**
 * Renders the main pricing page: hero, plan cards (Free, Starter, Growth, Enterprise),
 * FAQs, and contact CTA.
 */
export default function PricingPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Simple, transparent pricing that scales with your portfolio."
          description="Free for 1–4 units. Paid plans from KES 100 per unit per month. No hidden fees—choose the plan that fits your needs."
        />
      </Section>

      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`${plan.popular ? "border-2 border-primary relative" : ""} ${plan.isFree ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20" : ""} hover:shadow-md transition-all duration-200 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              {plan.isFree && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <SparklesIcon className="h-4 w-4" />
                  Free
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
                      {plan.price === "0" ? "Free" : `KES ${plan.price}`}
                    </span>
                    {plan.price !== "0" && plan.priceSubline && (
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
          Example: 10 units on Growth = KES{" "}
          {((10 * PRICE_PER_UNIT.growth) / 1).toLocaleString()}/month (
          {PRICE_PER_UNIT.growth} × 10). You only pay for the units you manage.
        </p>
      </Section>

      {/* Features by plan — detailed matrix of all features and which plans include them */}
      <Section className="bg-slate-50 dark:bg-slate-900/50">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4 md:mb-6 leading-tight tracking-tight">
            Features by plan
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Every feature from our platform, and which plan includes it. All features link to full details on our Features page.
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
                  Starter
                </th>
                <th className="py-4 px-3 font-semibold text-slate-700 dark:text-slate-300 text-center w-[72px]">
                  Growth
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
                        <CheckIcon className="h-6 w-6 text-tertiary mx-auto" aria-hidden />
                      ) : (
                        <span className="text-slate-300 dark:text-slate-600" aria-label="Not included">
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
              q: "What is included in the Free plan?",
              a: "The Free plan is for portfolios with 1–4 units. It includes core property management (rent collection, invoicing, tenant portal, basic reporting). There are no bank integrations; settlements are paid weekly to your Nyumba Zetu account. Upgrade to Starter or above for bank/M-Pesa integration and daily settlements.",
            },
            {
              q: "How does per-unit pricing work?",
              a: "Starter is KES 100 per unit per month, Growth is KES 150 per unit, and Enterprise is KES 250 per unit. You're billed only for the number of units you manage. For example, 20 units on Growth = KES 3,000/month.",
            },
            {
              q: "Can I change plans later?",
              a: "Yes, you can upgrade or downgrade your plan at any time. When you add or remove units, your bill updates accordingly. Changes take effect at the start of your next billing cycle.",
            },
            {
              q: "Are there setup fees?",
              a: "No setup fees for Free, Starter, and Growth. Enterprise may include implementation or training services depending on your needs.",
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
