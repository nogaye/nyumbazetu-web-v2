import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Property Management Solutions | Nyumba Zetu",
  description: "Tailored property management solutions for landlords, property managers, committees, developers, banks, and diaspora investors in Kenya.",
};

const solutions = [
  {
    slug: "landlords",
    title: "Landlords & Agents",
    description: "Individual property owners and real estate agents managing residential and commercial portfolios.",
    features: [
      "Automated rent collection with M-Pesa and bank integration",
      "Tenant portal for self-service payments and communication",
      "Real-time portfolio dashboards and performance metrics",
      "Simplified accounting with automated journal entries",
    ],
  },
  {
    slug: "managers",
    title: "Property Managers & Management Companies",
    description: "Professional property management firms handling multiple properties and portfolios.",
    features: [
      "Multi-property portfolio management in one platform",
      "Team collaboration tools and automated workflows",
      "Client reporting and owner portals with real-time data",
      "Advanced accounting with consolidated financial reports",
    ],
  },
  {
    slug: "committees",
    title: "Committees & HOAs",
    description: "Housing estate committees and homeowners associations managing shared spaces and service charges.",
    features: [
      "Automated service charge collection with full transparency",
      "Committee decision tracking and voting workflows",
      "Resident communication hub with announcements",
      "Audit-ready financial records and reporting",
    ],
  },
  {
    slug: "developers",
    title: "Developers & Estate Owners",
    description: "Real estate developers and large estate owners managing mixed-use developments.",
    features: [
      "Development project tracking with timelines and budgets",
      "Lease management across multiple phases and units",
      "Comprehensive financial reporting for stakeholders",
      "Integrated workflows for sales, leasing, and operations",
    ],
  },
  {
    slug: "banks",
    title: "Banks & SACCOS / Mortgage Teams",
    description: "Financial institutions managing mortgage portfolios and property-backed lending.",
    features: [
      "Mortgage portfolio monitoring with real-time metrics",
      "Property valuation and risk assessment tools",
      "Regulatory compliance and reporting automation",
      "Integrated property and tenant data for lending decisions",
    ],
  },
  {
    slug: "diaspora",
    title: "Diaspora",
    description: "Kenyans living abroad managing property investments and rentals back home in Kenya.",
    features: [
      "Real-time property dashboards accessible from anywhere",
      "Automated rent collection with M-Pesa and bank integration",
      "Tenant portal and mobile app for direct communication",
      "Multi-currency support and international payment options",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16">
        <SectionHeader
          title="Property Management Solutions for Every Segment"
          description="Tailored solutions designed for the unique needs of different property professionals in Kenya."
        />
      </Section>

      <Section className="py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {solutions.map((solution) => (
            <Card key={solution.slug} className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  {solution.title}
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {solution.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {solution.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                      <span className="text-tertiary mr-2 flex-shrink-0 mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/solutions/${solution.slug}`} className="flex items-center justify-center gap-2">
                    Learn More
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Not sure which solution fits your needs?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Our team can help you find the right solution for your property management requirements.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary-600 text-primary-foreground" asChild>
            <Link href="/contact" className="flex items-center gap-2">
              Contact Our Team
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

