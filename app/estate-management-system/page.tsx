/**
 * SEO pillar page: Estate Management System.
 * Targets "estate management system", "estate management Kenya" keywords;
 * links to HOA, property management, and solutions.
 */
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { PillarCta } from "@/components/seo/pillar-cta";

export const metadata = {
  title: "Estate Management System for Kenya | Service Charges, Maintenance & Reporting",
  description:
    "Complete estate management system for Kenyan housing estates: service charge collection, maintenance tracking, resident portals, and financial reporting. One platform for estates and developers.",
};

export default function EstateManagementSystemPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Estate Management System for Kenya"
          description="One system for service charges, maintenance, resident communication, and financial reporting—built for housing estates and large developments in Kenya."
        />
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert prose-lg">
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            An <strong>estate management system</strong> brings together billing, collections, maintenance, and reporting so estate managers and committees can run housing estates efficiently. In Kenya, estates range from small apartment blocks to large gated communities; the right software scales with size and supports both service charge collection and day-to-day operations.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            What an Estate Management System Should Do
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A good <strong>estate management system</strong> covers: <strong>service charge and rent collection</strong> (with M-Pesa and bank integration), <strong>maintenance and service requests</strong> (so residents report issues and track progress), <strong>resident and owner portals</strong> (so they can pay, view statements, and see announcements), and <strong>financial reporting</strong> (income, expenditure, and audit trails for AGMs and compliance). Some estates also need asset management, vendor management, and committee workflows—all of which can sit in one platform.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            Service Charges and Transparency
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Residents and owners want to know how service charges are calculated and spent. An <strong>estate management system</strong> should support flexible billing (per unit, by size, or custom formulas), automated invoicing and reminders, and reconciliation so every payment is matched. It should also produce clear financial statements and, where appropriate, give residents read-only access to see how funds are used. That aligns with best practice for <Link href="/hoa-management-software-kenya" className="text-primary hover:underline">HOA and estate management in Kenya</Link>.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            From Development to Operations
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Developers and large estate owners often need to track both development phases and ongoing operations. Nyumba Zetu supports <Link href="/property-management-for-developers" className="text-primary hover:underline">property management for developers</Link> with project tracking and handover to an operational <strong>estate management system</strong>. Once units are handed over, the same platform can manage leases, service charges, and maintenance—so you do not switch systems mid-lifecycle.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-4">
            Why Nyumba Zetu for Estates
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Nyumba Zetu is a full <Link href="/property-management-software-kenya" className="text-primary hover:underline">property management software</Link> used by estates and committees in Kenya. It includes <Link href="/rent-collection-software-kenya" className="text-primary hover:underline">rent and service charge collection</Link>, accounting, tenant and resident portals, maintenance tracking, and KRA eTIMS integration. You get one system for billing, operations, and reporting. To see how it fits your estate, book a <Link href="/request-demo" className="text-primary hover:underline">free demo</Link> or explore <Link href="/solutions/committees">solutions for committees</Link> and <Link href="/features">features</Link>.
          </p>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <SectionHeader
          title="Related Pages"
          description="More on estate and property management."
        />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                Service charge management and transparency for HOAs and committees.
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
                Full platform for landlords, managers, and estates.
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
