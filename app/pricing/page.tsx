import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckIcon, PhoneIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Pricing | Nyumba Zetu",
  description: "Simple, transparent pricing that scales with your portfolio. Choose the plan that fits your property management needs.",
};

const plans = [
  {
    name: "Starter",
    price: "KES 5,000",
    period: "per month",
    description: "Perfect for individual landlords and small portfolios",
    units: "Up to 10 units",
    features: [
      "Rent collection & invoicing",
      "Basic accounting",
      "Tenant portal",
      "Email support",
      "Mobile app access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "KES 15,000",
    period: "per month",
    description: "For property managers and growing portfolios",
    units: "Up to 50 units",
    features: [
      "Everything in Starter",
      "Advanced accounting & GL",
      "Owner portals",
      "Maintenance management",
      "Priority support",
      "KRA eTIMS integration",
      "Custom reporting",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large portfolios, estates, and institutions",
    units: "Unlimited units",
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security & compliance",
      "White-label options",
      "API access",
      "On-site training",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Simple, transparent pricing that scales with your portfolio."
          description="Choose the plan that fits your needs. All plans include core property management features."
        />
      </Section>

      <Section>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`${plan.popular ? "border-2 border-primary relative" : ""} hover:shadow-md transition-all duration-200`}
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
                  <div className="text-4xl font-bold text-slate-900 dark:text-slate-50">
                    {plan.price}
                  </div>
                  {plan.period && (
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {plan.period}
                    </div>
                  )}
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    {plan.units}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start space-x-2.5">
                      <CheckIcon className="h-5 w-5 text-tertiary flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
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
              q: "Can I change plans later?",
              a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
            },
            {
              q: "Are there setup fees?",
              a: "No setup fees for Starter and Growth plans. Enterprise plans may include implementation services based on your needs.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept M-Pesa, bank transfers, and credit cards. All payments are processed securely.",
            },
            {
              q: "Is there a free trial?",
              a: "Yes, we offer a 14-day free trial for all plans. No credit card required.",
            },
          ].map((faq, idx) => (
            <Card key={idx} className="hover:shadow-md transition-all duration-200 bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">
                  {faq.q}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white leading-relaxed">
                  {faq.a}
                </p>
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


