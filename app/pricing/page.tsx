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

/**
 * Plan definition for the pricing grid. price and priceSubline drive the main display;
 * units and features describe scope and inclusions.
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
      "Core property management",
      "Rent collection & invoicing",
      "Tenant portal",
      "Basic reporting",
      "Weekly settlements to your Nyumba Zetu account",
      "Email support",
      "Mobile app access",
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
      "Perfect for individual landlords and small portfolios with optional bank integration.",
    units: "5+ units",
    features: [
      "Everything in Free",
      "Bank & M-Pesa integrations",
      "Daily settlements (not weekly only)",
      "Basic accounting",
      "KRA eTIMS integration",
      "Email support",
      "Mobile app access",
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
      "Owner portals",
      "Maintenance management",
      "Custom reporting",
      "Priority support",
      "API access",
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
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security & compliance",
      "White-label options",
      "On-site training",
      "SLA & guaranteed uptime",
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
