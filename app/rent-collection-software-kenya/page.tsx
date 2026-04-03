/**
 * SEO pillar page: Rent Collection Software Kenya.
 * Targets "rent collection software Kenya" and related keywords; links to
 * M-Pesa, property management, and HOA content.
 */
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { PillarCta } from "@/components/seo/pillar-cta";

export const metadata = {
  title: "Rent Collection Software for Kenya | M-Pesa, Bank & Automated Reconciliation",
  description:
    "Automate rent and service charge collection in Kenya with M-Pesa and bank integration. Reconcile payments, send reminders, and get real-time reporting. Used by 500+ properties.",
};

export default function RentCollectionSoftwareKenyaPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 pb-3 md:pb-4 lg:pb-5">
        <SectionHeader
          title="Rent Collection Software for Kenya"
          description="Automate rent and service charge collection with M-Pesa and bank integration. Real-time reconciliation, reminders, and reporting—built for Kenyan landlords and property managers."
        />
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert prose-lg">
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            <strong>Rent collection software in Kenya</strong> should fit how tenants actually pay: M-Pesa, bank transfer, and sometimes cash. The right platform generates invoices, sends reminders, and matches incoming payments to the correct tenant and unit—without spreadsheets or manual chasing.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            The Problem with Manual Rent Collection
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            When rent is collected via WhatsApp, M-Pesa, and bank transfers with no single system, it is easy to lose track of who paid what and when. Late payments go unnoticed, reconciliation takes hours, and disputes multiply. <strong>Rent collection software</strong> solves this by centralising invoicing, payment channels, and matching so every payment is recorded and attributed correctly.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            What Good Rent Collection Software Does
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
            <li><strong>Automated invoicing</strong> — Rent and service charges generated on schedule, with clear due dates and amounts.</li>
            <li><strong>Multiple payment channels</strong> — M-Pesa (including <Link href="/mpesa-rent-collection" className="text-primary hover:underline">M-Pesa rent collection</Link> flows), bank transfer, and integration with your bank or paybill so payments land in one place.</li>
            <li><strong>Automatic reconciliation</strong> — Incoming payments matched to tenant and invoice, with minimal manual entry.</li>
            <li><strong>Reminders and communication</strong> — Tenants receive reminders and can view statements in a portal or app.</li>
            <li><strong>Reporting</strong> — Collection rates, arrears, and aging reports so you see performance at a glance.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            M-Pesa and Bank Integration in Kenya
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            In Kenya, M-Pesa is the default for many tenants. Your <strong>rent collection software</strong> should support M-Pesa (and often a paybill or till) so tenants can pay without visiting the bank. Nyumba Zetu integrates M-Pesa and bank channels; payments are reconciled against open invoices so your books stay accurate and you can chase only genuine arrears. For a deeper dive, read our guide on <Link href="/mpesa-rent-collection" className="text-primary hover:underline">how to collect rent with M-Pesa</Link>.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            Rent vs Service Charge Collection
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Landlords typically collect rent; estates and <Link href="/hoa-management-software-kenya">HOA management</Link> often collect service charges for common areas, security, and maintenance. The same principles apply: automated billing, clear payment options, and reconciliation. Nyumba Zetu handles both rent and service charge collection in one <Link href="/property-management-software-kenya" className="text-primary hover:underline">property management software</Link> platform, so you do not need separate tools.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            Getting Started with Nyumba Zetu
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Nyumba Zetu is used by hundreds of properties in Kenya for rent and service charge collection. Setup includes connecting your M-Pesa and bank details, defining rent and service charge schedules, and inviting tenants to the portal. Onboarding can be done in under 20 minutes. Book a <Link href="/request-demo" className="text-primary hover:underline">free demo</Link> to see the flow, or explore our <Link href="/features">features</Link> and <Link href="/pricing">pricing</Link>.
          </p>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <SectionHeader
          title="Related Pages"
          description="More resources on property and rent management in Kenya."
        />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                Full platform for collections, accounting, tenant management, and compliance.
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
                Step-by-step guide to collecting rent with M-Pesa and reconciling automatically.
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

      <PillarCta />
    </>
  );
}
