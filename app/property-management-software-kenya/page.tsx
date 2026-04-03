/**
 * SEO pillar page: Property Management Software Kenya.
 * Long-form content targeting "property management software Kenya" and related
 * keywords; supports internal linking and conversion to demo/features.
 */
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { PillarCta } from "@/components/seo/pillar-cta";

export const metadata = {
  title: "Property Management Software for Kenya | Rent Collection, Accounting & Tenant Management",
  description:
    "The complete guide to property management software in Kenya. Compare features, M-Pesa rent collection, accounting, and tenant management. Trusted by 500+ properties.",
};

export default function PropertyManagementSoftwareKenyaPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 pb-3 md:pb-4 lg:pb-5">
        <SectionHeader
          title="Property Management Software for Kenya"
          description="One platform for collections, accounting, tenant experience, and compliance—built for Kenyan landlords, property managers, estates, and developers."
        />
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert prose-lg">
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            Choosing the right <strong>property management software in Kenya</strong> can transform how you collect rent, manage tenants, and run your accounting. This guide covers what to look for, how modern platforms like Nyumba Zetu fit the Kenyan market, and how to get started.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            Why Property Management Software Matters in Kenya
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Landlords and property managers in Kenya have long relied on spreadsheets, WhatsApp, and manual record-keeping. As portfolios grow, that approach leads to missed payments, reconciliation errors, and poor visibility. A dedicated <strong>property management system</strong> centralises leases, rent collection, maintenance requests, and financial reporting in one place.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            The best <strong>property management software for Kenya</strong> integrates with local payment methods—especially <Link href="/mpesa-rent-collection" className="text-primary hover:underline">M-Pesa rent collection</Link>—and supports KRA eTIMS and local accounting practices. It should scale from a single unit to hundreds of properties and suit landlords, <Link href="/solutions/managers">property management companies</Link>, and <Link href="/hoa-management-software-kenya">estate committees</Link> alike.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            Core Features to Look For
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            When evaluating <strong>property management software Kenya</strong> options, prioritise these areas:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
            <li><strong>Rent and service charge collection</strong> — Automated invoicing, reminders, and reconciliation with M-Pesa and bank payments. See our <Link href="/rent-collection-software-kenya" className="text-primary hover:underline">rent collection software</Link> page for details.</li>
            <li><strong>Accounting and reporting</strong> — General ledger, financial statements, and reports that support compliance and decision-making.</li>
            <li><strong>Tenant and owner experience</strong> — Portals and apps so tenants can pay, request maintenance, and view statements without back-and-forth calls.</li>
            <li><strong>Maintenance and operations</strong> — Tracking requests, assigning tasks, and keeping an audit trail of work done.</li>
            <li><strong>Compliance</strong> — Integration with KRA eTIMS and other local requirements so your records stay audit-ready.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            Who Uses Property Management Software in Kenya?
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Different segments need different capabilities. <strong>Landlords and agents</strong> often start with a few units and need simple rent collection and basic reporting. <Link href="/solutions/landlords">Nyumba Zetu supports landlords</Link> with M-Pesa integration, tenant portals, and clear dashboards. <strong>Property management firms</strong> need multi-property views, client reporting, and team collaboration—covered in our <Link href="/solutions/managers">solutions for managers</Link>. <strong>Housing estates and HOAs</strong> need service charge management and transparency for residents; our <Link href="/hoa-management-software-kenya">HOA management software</Link> page explains how. <strong>Developers and estate owners</strong> need to track projects and hand over to operations; <Link href="/property-management-for-developers" className="text-primary hover:underline">property management for developers</Link> addresses that. Banks and SACCOS use property data for mortgage and lending decisions—see <Link href="/solutions/banks">solutions for banks</Link>.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            Nyumba Zetu: Built for the Kenyan Market
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Nyumba Zetu is a <strong>property management software</strong> designed for Kenya. It combines rent and service charge collection (including M-Pesa), full accounting and general ledger, tenant and owner portals, maintenance tracking, and KRA eTIMS integration. Over 500 properties and 50,000 tenants use the platform, and it is recognised by industry awards such as the KPRA property management innovation award.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            You can start with a single property and scale up. The platform supports landlords, property managers, committees, developers, and banks. For a full feature list, visit our <Link href="/features" className="text-primary hover:underline">Features</Link> page; for pricing and plans, see <Link href="/pricing">Pricing</Link>.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            Getting Started
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Implementing <strong>property management software in Kenya</strong> does not have to be complex. With Nyumba Zetu, onboarding typically takes under 20 minutes when your records are ready. You can self-serve or use our assisted onboarding. We recommend booking a <Link href="/request-demo" className="text-primary hover:underline">free demo</Link> so our team can show you the platform and answer questions about your portfolio size and use case.
          </p>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <SectionHeader
          title="Related Resources"
          description="Explore more guides and solutions for property management in Kenya."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">
                <Link href="/rent-collection-software-kenya" className="hover:text-primary transition-colors">
                  Rent Collection Software Kenya
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Automate rent and service charge collection with M-Pesa and bank integration.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">
                <Link href="/mpesa-rent-collection" className="hover:text-primary transition-colors">
                  M-Pesa Rent Collection
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                How to collect rent with M-Pesa and reconcile payments automatically.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">
                <Link href="/hoa-management-software-kenya" className="hover:text-primary transition-colors">
                  HOA Management Software Kenya
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Service charge management and transparency for estates and committees.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <Button size="lg" asChild>
            <Link href="/request-demo" className="flex items-center gap-2 mx-auto">
              Book a free demo
              <CalendarDaysIcon className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Section>

      <PillarCta />
    </>
  );
}
