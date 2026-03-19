"use client";

/**
 * Interactive pricing content for the pricing page.
 *
 * This client module renders billing mode controls, plan cards, portfolio examples,
 * FAQs, and CTA sections while keeping annual-vs-monthly pricing behavior transparent.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFeaturesForPricing, PLAN_IDS } from "@/lib/features";
import {
  BillingMode,
  calculateAnnualUnitPrice,
  formatKes,
  getDisplayedMonthlyEquivalentUnitPrice,
  getPremierPortfolioExamples,
  PRICING_PLANS,
} from "@/lib/pricing";

/** Feature matrix rows loaded from the central features registry. */
const FEATURES_BY_PLAN = getFeaturesForPricing();

/**
 * FAQ record used by the pricing FAQ section.
 */
interface PricingFaq {
  /** Question headline shown in each FAQ card. */
  q: string;
  /** User-friendly answer text focused on pricing transparency. */
  a: string;
}

/** Frequently asked questions with explicit monthly vs annual billing details. */
const PRICING_FAQS: PricingFaq[] = [
  {
    q: "What’s included in the Free tier?",
    a: "The Free (Landlord Starter) plan lets you manage up to 3 units with basic tenant management, rent tracking, payment recording, tenant statements, basic reports, and email notifications. No credit card required. Upgrade anytime for advanced accounting, automation, integrations, and full support.",
  },
  {
    q: "How does per-unit pricing work?",
    a: "You pay per active unit you manage. Monthly rates are Standard KES 100, Premier KES 150, and Enterprise KES 250 per unit per month. Annual billing gives a 20% discount, so your effective monthly rates become KES 80, KES 120, and KES 200 per unit, billed once annually.",
  },
  {
    q: "What does billed annually mean?",
    a: "With annual billing, you commit for 12 months and pay upfront at the discounted annual rate. For example, Premier is billed at KES 1,440 per unit/year (equivalent to KES 120 per unit/month).",
  },
  {
    q: "What happens if my unit count changes during my subscription?",
    a: "Your bill tracks the units you actively manage. If units increase or decrease, your pricing is adjusted according to your plan and billing cycle, with updates reflected in your next billing adjustment window.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Start free and upgrade when you need more units or features. You can also downgrade a paid plan. Plan changes take effect at the start of your next billing cycle.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept M-Pesa, bank transfers, and credit cards. All payments are processed securely.",
  },
];

/**
 * Resolves the top-line and supporting pricing labels for a given plan card.
 *
 * @param billingMode Active billing mode selected in the toggle.
 * @param planId Stable plan identifier from the pricing model.
 * @returns Pre-formatted display values used by the card UI.
 */
function getPlanPricingDisplay(billingMode: BillingMode, planId: string) {
  const plan = PRICING_PLANS.find((candidate) => candidate.id === planId);

  if (!plan) {
    return null;
  }

  if (plan.isFree) {
    return {
      headlinePrice: "Free",
      showUnitSuffix: false,
      baseMonthlyText: null as string | null,
      billedAnnuallyText: null as string | null,
      showSaveBadge: false,
    };
  }

  const activeMonthlyEquivalent = getDisplayedMonthlyEquivalentUnitPrice(
    plan,
    billingMode,
  );

  const annualUnitPrice = calculateAnnualUnitPrice(
    plan.monthlyUnitPrice,
    plan.annualDiscountPercent,
  );

  return {
    headlinePrice: formatKes(activeMonthlyEquivalent),
    showUnitSuffix: true,
    baseMonthlyText:
      billingMode === "annual" ? `${formatKes(plan.monthlyUnitPrice)} /unit/month` : null,
    billedAnnuallyText:
      billingMode === "annual"
        ? `Billed annually at ${formatKes(annualUnitPrice)} /unit/year`
        : null,
    showSaveBadge: billingMode === "annual",
  };
}

/**
 * Renders the full pricing page content with annual billing defaulted.
 *
 * @returns Pricing content sections with billing-aware cards, examples, and FAQs.
 */
export function PricingContent() {
  /** Annual is pre-selected to emphasize best value while keeping monthly visible. */
  const [billingMode, setBillingMode] = useState<BillingMode>("annual");

  /** Example calculations for Premier portfolio sizes based on current billing mode. */
  const premierExamples = useMemo(
    () => getPremierPortfolioExamples(billingMode),
    [billingMode],
  );

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Start free. Scale when you’re ready."
          description="Free for up to 3 units. Paid plans start at KES 80 per unit/month (annual billing) or KES 100 per unit/month (monthly billing)."
        />
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="rounded-xl border border-slate-200 bg-white/80 dark:bg-slate-900/70 dark:border-slate-700 p-3 md:p-4 shadow-sm">
            <Tabs
              value={billingMode}
              onValueChange={(value) => setBillingMode(value as BillingMode)}
            >
              <TabsList className="relative grid w-full grid-cols-2 h-12 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                <span
                  aria-hidden
                  className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] rounded-md bg-white dark:bg-slate-900 shadow-sm transition-transform duration-300 ease-out ${billingMode === "annual" ? "translate-x-[calc(100%+0.25rem)]" : "translate-x-0"}`}
                />
                <TabsTrigger
                  value="monthly"
                  className="relative z-10 data-[state=active]:shadow-none data-[state=active]:bg-transparent text-slate-700 dark:text-slate-300"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="annual"
                  className="relative z-10 gap-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent font-semibold text-primary"
                >
                  Annual
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Save 20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-3">
              Save 20% with annual billing. Annual billing helps you save more as
              your portfolio grows.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {PRICING_PLANS.map((plan) => {
            const pricing = getPlanPricingDisplay(billingMode, plan.id);

            return (
              <Card
                key={plan.id}
                className={`${plan.popular ? "border-2 border-primary relative" : ""} ${plan.isFree ? "border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-slate-900/50" : ""} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col`}
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
                  {plan.whoIsItFor && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 -mt-0.5">
                      {plan.whoIsItFor}
                    </p>
                  )}
                  {plan.subtitle && (
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 -mt-1">
                      {plan.subtitle}
                    </p>
                  )}
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    {plan.description}
                  </CardDescription>
                  {pricing && (
                    <div className="mt-4 transition-all duration-300">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-4xl font-bold text-slate-900 dark:text-slate-50">
                          {pricing.headlinePrice}
                        </span>
                        {pricing.showUnitSuffix && (
                          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            /unit
                          </span>
                        )}
                        {pricing.showSaveBadge && (
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            Save 20%
                          </Badge>
                        )}
                      </div>
                      {!plan.isFree && (
                        <div className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                          per unit per month
                        </div>
                      )}
                      {pricing.baseMonthlyText && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-through">
                          {pricing.baseMonthlyText}
                        </div>
                      )}
                      {pricing.billedAnnuallyText && (
                        <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-1.5">
                          {pricing.billedAnnuallyText}
                        </div>
                      )}
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-2">
                        {plan.unitsLabel}
                      </div>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-2.5">
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
                        {plan.restrictions.map((restriction) => (
                          <li
                            key={restriction}
                            className="flex items-start space-x-2.5 text-slate-500 dark:text-slate-400"
                          >
                            <XMarkIcon
                              className="h-4 w-4 flex-shrink-0 mt-0.5 opacity-70"
                              aria-hidden
                            />
                            <span className="text-sm leading-relaxed">
                              {restriction}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular || plan.isFree ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link href="/contact?book=demo">{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Example portfolio pricing (Premier)
            </p>
            <Badge
              className={`${billingMode === "annual" ? "bg-primary text-primary-foreground" : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"} transition-colors duration-300`}
            >
              {billingMode === "annual" ? "Annual billing active" : "Monthly billing active"}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {premierExamples.map((example) => (
              <div
                key={example.units}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 p-4"
              >
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  {example.units} units
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-2">
                  {formatKes(example.monthlyEquivalentTotal)}
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                    {" "}
                    /month
                  </span>
                </p>
                {example.annualBilledTotal && (
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-2">
                    Billed annually at {formatKes(example.annualBilledTotal)} /year
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
            {billingMode === "annual"
              ? "Based on Premier annual billing: KES 120 per unit/month effective, billed at KES 1,440 per unit/year."
              : "Based on Premier monthly billing: KES 150 per unit/month. You only pay for the units you manage."}
          </p>
        </div>
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
          * Custom integrations (e.g. bank, eTIMS, smart meters, etc.) are
          charged separately based on complexity, starting at KES 5,000 per
          integration.
        </p>
      </Section>

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
                            -
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
                          -
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

      <Section className="bg-secondary">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Common questions about pricing and billing.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {PRICING_FAQS.map((faq) => (
            <Card
              key={faq.q}
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

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Start free, book a demo, or talk to sales - we are here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link
                href="/contact?start=free"
                className="inline-flex items-center gap-2"
              >
                Start Free
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link
                href="/contact?book=demo"
                className="inline-flex items-center gap-2"
              >
                Book a Demo
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact" className="inline-flex items-center gap-2">
                Talk to Sales
                <PhoneIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
