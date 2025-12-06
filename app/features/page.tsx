import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Property Management Features | Nyumba Zetu",
  description: "Comprehensive property management features including rent collection, accounting, tenant experience, maintenance, and more.",
};

const features = [
  {
    slug: "collections",
    title: "Rent & Service Charge Collections",
    description: "Automated invoicing and payment tracking with M-Pesa, bank, and wallet integrations.",
    highlights: [
      "Automated rent and service charge invoicing",
      "M-Pesa, bank, and mobile wallet integration",
      "Real-time payment reconciliation",
      "Collection rate dashboards and reporting",
    ],
  },
  {
    slug: "accounting",
    title: "Accounting & General Ledger",
    description: "Full double-entry accounting system with automated journal entries, ledgers, and financial reports.",
    highlights: [
      "Double-entry accounting system",
      "Automated journal entries",
      "Trial balance, P&L, and balance sheet",
      "QuickBooks export integration",
    ],
  },
  {
    slug: "tenant-experience",
    title: "Tenant & Owner Experience",
    description: "Self-service portals, mobile apps, and WhatsApp chatbot for seamless tenant and owner engagement.",
    highlights: [
      "Tenant and owner portals",
      "Native iOS and Android mobile apps",
      "WhatsApp chatbot integration",
      "Real-time dashboards and notifications",
    ],
  },
  {
    slug: "maintenance",
    title: "Maintenance & Assets",
    description: "Track maintenance requests, work orders, and property assets with full history.",
    highlights: [
      "Maintenance request management",
      "Work order tracking and assignment",
      "Asset tracking with depreciation",
      "Vendor management and payment",
    ],
  },
  {
    slug: "tasks",
    title: "Tasks & Projects",
    description: "Project management for property development, renovations, and capital improvements.",
    highlights: [
      "Project tracking with timelines",
      "Task assignment and dependencies",
      "Budget management and cost tracking",
      "Stakeholder reporting",
    ],
  },
  {
    slug: "etims",
    title: "KRA eTIMS & Compliance",
    description: "KRA eTIMS-ready invoicing and tax-compliant workflows for property operations.",
    highlights: [
      "eTIMS-compliant invoice generation",
      "Automatic eTIMS submission",
      "Tax-compliant workflows",
      "Full audit trails",
    ],
  },
  {
    slug: "tps",
    title: "TPS & Rent-to-Own",
    description: "Tenant Purchase Scheme and rent-to-own tracking with installment management.",
    highlights: [
      "TPS and rent-to-own tracking",
      "Installment payment management",
      "Ownership percentage calculation",
      "Transfer process workflows",
    ],
  },
  {
    slug: "communications",
    title: "Communication Hub",
    description: "Centralized communication with tenants, owners, and team members through email, SMS, and in-app messaging.",
    highlights: [
      "Email and SMS notifications",
      "In-app messaging system",
      "Bulk announcements",
      "Communication history tracking",
    ],
  },
  {
    slug: "crm",
    title: "CRM",
    description: "Customer relationship management for tenants, owners, vendors, and prospects.",
    highlights: [
      "Contact management",
      "Interaction history tracking",
      "Lead and prospect management",
      "Vendor relationship tracking",
    ],
  },
  {
    slug: "white-labeling",
    title: "White Labeling",
    description: "Fully customizable white-label solution for property management companies and enterprises.",
    highlights: [
      "Custom branding and logo",
      "Custom domain and SSL",
      "Branded tenant portals and apps",
      "Customized email templates",
    ],
  },
  {
    slug: "calendar-scheduling",
    title: "Calendar & Event Scheduling",
    description: "Automated scheduling system for invoice generation, payment reminders, penalty calculations, and recurring tasks.",
    highlights: [
      "Schedule invoice generation dates",
      "Automated payment reminder sequences",
      "Penalty calculation automation",
      "Recurring task scheduling",
    ],
  },
  {
    slug: "webhooks",
    title: "Webhooks & API Events",
    description: "Real-time event notifications and webhook integrations to connect Nyumba Zetu with your existing systems.",
    highlights: [
      "Real-time event notifications",
      "Webhook endpoint configuration",
      "API integration triggers",
      "Custom workflow automation",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16">
        <SectionHeader
          title="Complete Property Management Platform"
          description="Everything you need to manage properties, accounting, and tenant relationships in one integrated platform."
        />
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <Card key={feature.slug} className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  {feature.title}
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                      <span className="text-tertiary mr-2 flex-shrink-0 mt-0.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/features/${feature.slug}`} className="flex items-center justify-center gap-2">
                    Learn More
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See all features in action
          </h2>
          <p className="text-lg text-white mb-8 leading-relaxed">
            Schedule a demo to explore how these features work together to transform your property operations.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary-600 text-primary-foreground" asChild>
            <Link href="/contact" className="flex items-center gap-2">
              Request a Demo
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

