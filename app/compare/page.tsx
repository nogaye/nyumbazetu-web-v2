import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckIcon, XMarkIcon, CalendarDaysIcon, EyeIcon } from "@heroicons/react/24/outline";
import React from "react";

export const metadata = {
  title: "Compare Property Management Software | Nyumba Zetu vs Odoo, Zoho, QuickBooks, DoorLoop",
  description: "Compare Nyumba Zetu with other property management software solutions. See why Nyumba Zetu is the best choice for Kenyan property management with M-Pesa, KRA eTIMS, and local market expertise.",
};

const competitors = [
  {
    name: "Nyumba Zetu",
    tagline: "Built for Kenya from day one",
    isNyumbaZetu: true,
  },
  {
    name: "Odoo",
    tagline: "Generic ERP adapted for property",
    isNyumbaZetu: false,
  },
  {
    name: "Zoho",
    tagline: "Generic CRM adapted for property",
    isNyumbaZetu: false,
  },
  {
    name: "QuickBooks",
    tagline: "Accounting software with property add-ons",
    isNyumbaZetu: false,
  },
  {
    name: "DoorLoop",
    tagline: "US-based property management software",
    isNyumbaZetu: false,
  },
  {
    name: "Other Local Solutions",
    tagline: "Basic property management tools",
    isNyumbaZetu: false,
  },
];

const comparisonFeatures = [
  {
    category: "Built for Kenya",
    features: [
      {
        name: "Native M-Pesa integration",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: "Partial",
      },
      {
        name: "KRA eTIMS compliance built-in",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: "Partial",
      },
      {
        name: "Service charge management",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: "Partial",
      },
      {
        name: "Committee/HOA workflows",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: "Partial",
      },
      {
        name: "Kenyan market expertise",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: true,
      },
    ],
  },
  {
    category: "Accounting & Financials",
    features: [
      {
        name: "Double-entry accounting system",
        nyumbaZetu: true,
        odoo: true,
        zoho: true,
        quickbooks: true,
        doorloop: true,
        otherLocal: false,
      },
      {
        name: "General ledger with automated journal entries",
        nyumbaZetu: true,
        odoo: true,
        zoho: true,
        quickbooks: true,
        doorloop: true,
        otherLocal: false,
      },
      {
        name: "Trial balance, P&L, balance sheet",
        nyumbaZetu: true,
        odoo: true,
        zoho: true,
        quickbooks: true,
        doorloop: true,
        otherLocal: false,
      },
      {
        name: "Property-specific chart of accounts",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: true,
        otherLocal: false,
      },
      {
        name: "Export to QuickBooks",
        nyumbaZetu: true,
        odoo: true,
        zoho: true,
        quickbooks: "N/A",
        doorloop: true,
        otherLocal: false,
      },
    ],
  },
  {
    category: "Tenant & Owner Experience",
    features: [
      {
        name: "Tenant self-service portal",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: true,
        otherLocal: false,
      },
      {
        name: "Owner portal with dashboards",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: true,
        otherLocal: false,
      },
      {
        name: "Native mobile apps (iOS & Android)",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: true,
        otherLocal: false,
      },
      {
        name: "WhatsApp chatbot integration",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: false,
      },
    ],
  },
  {
    category: "Collections & Payments",
    features: [
      {
        name: "Automated rent invoicing",
        nyumbaZetu: true,
        odoo: true,
        zoho: true,
        quickbooks: false,
        doorloop: true,
        otherLocal: "Partial",
      },
      {
        name: "M-Pesa payment tracking",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: "Partial",
      },
      {
        name: "Local Kenyan bank integrations (Equity, KCB, Co-op, etc.)",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: "Partial",
      },
      {
        name: "Bank API integrations for real-time reconciliation",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: false,
      },
      {
        name: "Bank statement import & parsing",
        nyumbaZetu: true,
        odoo: true,
        zoho: true,
        quickbooks: true,
        doorloop: true,
        otherLocal: false,
      },
      {
        name: "Bank transfer reconciliation",
        nyumbaZetu: true,
        odoo: true,
        zoho: true,
        quickbooks: true,
        doorloop: true,
        otherLocal: false,
      },
      {
        name: "Multi-bank account management",
        nyumbaZetu: true,
        odoo: true,
        zoho: true,
        quickbooks: true,
        doorloop: true,
        otherLocal: false,
      },
      {
        name: "Service charge collection",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: "Partial",
      },
    ],
  },
  {
    category: "Property Management Features",
    features: [
      {
        name: "Maintenance request management",
        nyumbaZetu: true,
        odoo: true,
        zoho: false,
        quickbooks: false,
        doorloop: true,
        otherLocal: "Partial",
      },
      {
        name: "Asset tracking & depreciation",
        nyumbaZetu: true,
        odoo: true,
        zoho: false,
        quickbooks: false,
        doorloop: true,
        otherLocal: false,
      },
      {
        name: "Project & task management",
        nyumbaZetu: true,
        odoo: true,
        zoho: true,
        quickbooks: false,
        doorloop: false,
        otherLocal: false,
      },
      {
        name: "TPS & Rent-to-Own tracking",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: false,
      },
    ],
  },
  {
    category: "Support & Implementation",
    features: [
      {
        name: "Local Kenyan support team",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: true,
      },
      {
        name: "Kenyan market expertise",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: true,
      },
      {
        name: "Data migration support",
        nyumbaZetu: true,
        odoo: true,
        zoho: true,
        quickbooks: true,
        doorloop: true,
        otherLocal: false,
      },
      {
        name: "Training in local context",
        nyumbaZetu: true,
        odoo: false,
        zoho: false,
        quickbooks: false,
        doorloop: false,
        otherLocal: "Partial",
      },
    ],
  },
];

function ComparisonCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <td className="px-4 py-3 text-center">
        <CheckIcon className="h-5 w-5 text-[#36b9a0] mx-auto" />
      </td>
    );
  }
  if (value === false) {
    return (
      <td className="px-4 py-3 text-center">
        <XMarkIcon className="h-5 w-5 text-slate-300 dark:text-slate-600 mx-auto" />
      </td>
    );
  }
  return (
    <td className="px-4 py-3 text-center">
      <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>
    </td>
  );
}

export default function ComparePage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Compare Nyumba Zetu with other property management software"
          description="See how Nyumba Zetu compares to Odoo, Zoho, QuickBooks, DoorLoop, and other solutions. Built specifically for the Kenyan market with deep local integrations."
        />
      </Section>

      {/* Key Differentiators */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 border-[#b98036] bg-[#b98036]/5 dark:bg-[#b98036]/10">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-50">
                Built for Kenya
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300">
                Native M-Pesa, local bank integrations, KRA eTIMS, service charge, and committee workflows—not adapted from generic software.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-50">
                Accounting-First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300">
                Full double-entry accounting with general ledger—every transaction posts correctly from day one.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-50">
                Modern Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300">
                Tenant and owner portals, mobile apps, and WhatsApp chatbot for seamless engagement.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Comparison Table */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-50 sticky left-0 bg-slate-100 dark:bg-slate-800 z-10">
                  Feature
                </th>
                {competitors.map((competitor) => (
                  <th
                    key={competitor.name}
                    className={`px-4 py-4 text-center text-sm font-semibold min-w-[140px] ${
                      competitor.isNyumbaZetu
                        ? "bg-[#b98036]/10 dark:bg-[#b98036]/20 text-[#b98036] dark:text-[#b98036]"
                        : "text-slate-900 dark:text-slate-50"
                    }`}
                  >
                    <div className="font-bold">{competitor.name}</div>
                    <div className="text-xs font-normal text-slate-600 dark:text-slate-400 mt-1">
                      {competitor.tagline}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((category, categoryIdx) => (
                <React.Fragment key={categoryIdx}>
                  <tr className="bg-slate-50 dark:bg-slate-950">
                    <td
                      colSpan={competitors.length + 1}
                      className="px-6 py-3 text-sm font-bold text-slate-900 dark:text-slate-50 uppercase tracking-wider"
                    >
                      {category.category}
                    </td>
                  </tr>
                  {category.features.map((feature, featureIdx) => (
                    <tr
                      key={featureIdx}
                      className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-3 text-sm text-slate-700 dark:text-slate-300 sticky left-0 bg-white dark:bg-slate-900 z-10">
                        {feature.name}
                      </td>
                      <ComparisonCell value={feature.nyumbaZetu} />
                      <ComparisonCell value={feature.odoo} />
                      <ComparisonCell value={feature.zoho} />
                      <ComparisonCell value={feature.quickbooks} />
                      <ComparisonCell value={feature.doorloop} />
                      <ComparisonCell value={feature.otherLocal} />
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Why Choose Nyumba Zetu */}
      <Section>
        <SectionHeader
          title="Why choose Nyumba Zetu over generic solutions?"
          description="Generic software requires extensive customization. Nyumba Zetu works out of the box for Kenyan property management."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-50">
                No Customization Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Generic solutions like Odoo and Zoho require extensive customization to handle M-Pesa, local bank integrations, service charges, and Kenyan workflows. Nyumba Zetu includes these features from day one.
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span>M-Pesa integration works immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span>Local bank integrations (Equity, KCB, Co-op, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span>KRA eTIMS compliance built-in</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span>Service charge workflows ready to use</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-50">
                Local Support & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                International solutions lack local market knowledge. Nyumba Zetu's team understands Kenyan property management, regulations, and workflows.
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span>Kenyan support team available locally</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span>Training in local context and workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span>Understanding of Kenyan regulations</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-50">
                Property-First Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                QuickBooks is accounting software with property add-ons. Odoo and Zoho are generic ERPs. Nyumba Zetu is built specifically for property management with accounting at its core.
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span>Property workflows are primary, not afterthoughts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span>Accounting integrated seamlessly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span>No need to connect multiple systems</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-50">
                Modern Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                While some local solutions are basic tools, Nyumba Zetu provides enterprise-grade technology with modern user experience, mobile apps, and WhatsApp integration.
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span>Native mobile apps for iOS and Android</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span>WhatsApp chatbot for instant support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                  <span>Modern, intuitive user interface</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Ready to see the difference?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Schedule a demo to see how Nyumba Zetu compares to your current solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact" className="flex items-center gap-2">
                Request a Demo
                <CalendarDaysIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/product" className="flex items-center gap-2">
                Explore the Platform
                <EyeIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

