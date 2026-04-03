/**
 * Integrations index page. Details how Nyumba Zetu connects to QuickBooks, WhatsApp,
 * eTIMS, smart meters, payment channels, and developer APIs. Replaces /product#integrations.
 */
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BoltIcon, LinkIcon, BanknotesIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { IntegrationsSection } from "@/components/integrations/integrations-section";
import Link from "next/link";

export const metadata = {
  title: "Integrations | Nyumba Zetu",
  description:
    "Connect Nyumba Zetu to QuickBooks, M-Pesa, banks, KRA eTIMS, WhatsApp, smart meters, and more. One platform that plugs into the tools that already run your business.",
};

export default function IntegrationsPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 pb-3 md:pb-4 lg:pb-5">
        <SectionHeader
          title="Plug into the tools that already run your business."
          description="Nyumba Zetu becomes your operational and financial source of truth while staying connected to your bank, M-Pesa, accounting tools, smart meters, and more."
        />
      </Section>

      <IntegrationsSection />

      {/* Smart Meters & Utilities */}
      <Section className="bg-slate-50 dark:bg-slate-900" id="smart-meters">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-3 text-3xl font-bold text-slate-900 dark:text-slate-50">
            Smart Meters & Utilities
          </h2>
          <h3 className="text-center text-lg font-light mb-8 text-slate-600 dark:text-slate-400">
            IoT meter readings and automated utility billing
          </h3>
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
              Connect IoT-enabled water, electricity, and gas meters to Nyumba Zetu for automated consumption readings and tariff-based billing. No more manual meter entry or spreadsheets—readings flow into the platform and billing runs generate utility charges for each unit.
            </p>
            <ul className="text-slate-700 dark:text-slate-300 text-lg space-y-2 list-disc list-inside">
              <li>Smart meter integration and automated readings</li>
              <li>Consumption tracking and configurable tariffs</li>
              <li>Automated utility billing runs aligned to your billing cycle</li>
              <li>Tenant-level visibility and dispute-friendly history</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 text-base pt-2">
              <Link href="/features/smart-meters" className="text-primary hover:underline font-medium">
                Learn more about Smart Meters & Utilities →
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {/* Other Integrations: payments, government, API */}
      <Section className="bg-white dark:bg-slate-950" id="other">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-3 text-3xl font-bold text-slate-900 dark:text-slate-50">
            Payment, Government &amp; Developer Integrations
          </h2>
          <h3 className="text-center text-lg font-light mb-10 text-slate-600 dark:text-slate-400">
            M-Pesa, bank feeds, identity, and custom builds
          </h3>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BanknotesIcon className="h-10 w-10 text-primary flex-shrink-0" />
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-50">
                    M-Pesa &amp; Mobile Money
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Accept rent and service charge payments via M-Pesa and other mobile money channels. Payments are reconciled automatically against tenant accounts, with real-time balance updates and receipt generation.
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BuildingLibraryIcon className="h-10 w-10 text-primary flex-shrink-0" />
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-50">
                    Bank Feeds &amp; Transfers
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Connect your bank accounts for automated payment reconciliation. Bank transfers and standing orders are matched to tenant ledgers, reducing manual reconciliation and keeping your books accurate.
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BoltIcon className="h-10 w-10 text-primary flex-shrink-0" />
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-50">
                    Boma Yangu &amp; eCitizen
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Integrations with government and identity services where applicable—support for land registry (Boma Yangu) and eCitizen workflows so you can keep compliance and verification in one place.
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <LinkIcon className="h-10 w-10 text-primary flex-shrink-0" />
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-50">
                    Webhooks &amp; API
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Build custom integrations with our webhooks and API. Get real-time events for payments, lease changes, and more—and connect Nyumba Zetu to your existing property or accounting systems.
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
                  <Link href="/features/webhooks" className="text-primary hover:underline font-medium">
                    Webhooks &amp; API Events →
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
