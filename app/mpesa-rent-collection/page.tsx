/**
 * SEO pillar page: M-Pesa Rent Collection.
 * Targets "how to collect rent with mpesa", "mpesa rent collection" keywords;
 * links to rent collection software and property management.
 */
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { PillarCta } from "@/components/seo/pillar-cta";

export const metadata = {
  title: "How to Collect Rent with M-Pesa | Automated Reconciliation & Reporting",
  description:
    "Collect rent via M-Pesa in Kenya with automatic reconciliation and reporting. Integrate paybill or till, send reminders, and track payments in one property management platform.",
};

export default function MpesaRentCollectionPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 pb-3 md:pb-4 lg:pb-5">
        <SectionHeader
          title="How to Collect Rent with M-Pesa"
          description="Automate M-Pesa rent collection in Kenya: integrate your paybill or till, reconcile payments automatically, and get real-time reporting—no spreadsheets required."
        />
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert prose-lg">
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            In Kenya, most tenants prefer to pay rent via <strong>M-Pesa</strong>. Collecting rent with M-Pesa can be simple for one property, but once you have multiple units and tenants, matching payments to the right tenant and invoice becomes time-consuming without the right tools. This guide explains how to collect rent with M-Pesa efficiently and how <strong>rent collection software</strong> automates reconciliation and reporting.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            Why M-Pesa for Rent Collection?
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            M-Pesa is the dominant mobile money platform in Kenya. Tenants are used to paying bills and sending money via M-Pesa, so offering it as a rent payment option reduces friction and improves collection rates. Landlords and property managers can receive payments through a paybill number or till, but without a system that links payments to tenants and invoices, you end up with a long M-Pesa statement and manual matching—which does not scale.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            How M-Pesa Rent Collection Works with Nyumba Zetu
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            With Nyumba Zetu, you connect your M-Pesa paybill or till to the platform. Tenants pay using your paybill and a reference (e.g. unit number or tenant ID). When payments hit your M-Pesa account, they are pulled into Nyumba Zetu and <strong>automatically matched</strong> to the correct tenant and open invoice. You see real-time collection status, and your books stay up to date without manual entry. Reminders can be sent automatically so tenants know what to pay and when.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            Best Practices for M-Pesa Rent Collection
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
            <li><strong>Use a consistent reference</strong> — Tenant ID, unit number, or invoice number so payments can be matched automatically.</li>
            <li><strong>Send clear payment instructions</strong> — Include paybill, account/reference, and amount in reminders and tenant communications.</li>
            <li><strong>Reconcile regularly</strong> — With integrated <Link href="/rent-collection-software-kenya" className="text-primary hover:underline">rent collection software</Link>, reconciliation happens as payments arrive; you only need to handle exceptions.</li>
            <li><strong>Keep records for compliance</strong> — A proper <Link href="/property-management-software-kenya" className="text-primary hover:underline">property management software</Link> records every transaction for accounting and KRA eTIMS, so you stay audit-ready.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            Beyond M-Pesa: Bank and Other Channels
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Many properties also accept bank transfers or other channels. A good <strong>rent collection</strong> setup supports multiple payment methods and reconciles them in one place. Nyumba Zetu integrates M-Pesa and bank channels so you get a single view of collections regardless of how tenants pay. That simplifies reporting and reduces the risk of missing or misallocated payments.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            Getting Started
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            If you want to streamline <strong>M-Pesa rent collection</strong> and move away from spreadsheets and manual matching, Nyumba Zetu can help. Setup includes connecting your M-Pesa details and configuring your properties and tenants; our team can guide you through onboarding. Book a <Link href="/request-demo" className="text-primary hover:underline">free demo</Link> to see the flow, or explore <Link href="/features">features</Link> and <Link href="/pricing">pricing</Link>.
          </p>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <SectionHeader
          title="Related Pages"
          description="More on rent collection and property management."
        />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                Full rent and service charge collection with M-Pesa and bank integration.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">
                <Link href="/property-management-software-kenya" className="hover:text-primary transition-colors">
                  Property Management Software Kenya
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Collections, accounting, tenant management, and compliance in one platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/request-demo" className="flex items-center gap-2 mx-auto">
              Request a demo
              <CalendarDaysIcon className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Section>

      <PillarCta
        title="Ready to simplify M-Pesa rent collection?"
        description="See how Nyumba Zetu automates rent collection, reconciliation, and reporting for landlords and property managers in Kenya."
      />
    </>
  );
}
