import { Section } from "@/components/section";
import Image from "next/image";

export function LegacyIntegrations() {
  return (
    <>
      {/* QuickBooks Integration */}
      <Section className="bg-slate-50 dark:bg-slate-900" id="quickbooks">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-3 text-3xl font-bold text-slate-900 dark:text-slate-50">
            QuickBooks Integration
          </h2>
          <h3 className="text-center text-lg font-light mb-5 text-slate-600 dark:text-slate-400">
            Seamless Sync for Accurate Accounting
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 mb-4 md:mb-0 flex justify-center">
              <Image
                src="/legacy/images/integrations/quickbooks.png"
                alt="QuickBooks Integration"
                width={350}
                height={350}
                className="rounded-lg shadow-lg object-contain"
                style={{ maxWidth: "350px" }}
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-slate-700 dark:text-slate-300 mb-3 text-lg">
                While QuickBooks is excellent for general accounting, it lacks domain-specific features tailored to property management. Our system bridges that gap—built with both accounting rigor and real-estate workflows in mind.
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-lg">
                Enjoy the best of both: continue using QuickBooks for your financials while syncing seamlessly with our platform to handle leases, payments, invoices, and reconciliations with precision.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* WhatsApp ChatBot Integration */}
      <Section className="bg-slate-900 dark:bg-slate-950 text-white" id="whatsapp">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-white mb-3 text-3xl font-bold">
            WhatsApp ChatBot
          </h2>
          <h3 className="text-center text-white text-lg font-light mb-5">
            Streamline Communications with Our AI-Powered Chatbot
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 mb-4 md:mb-0 flex justify-center">
              <Image
                src="/legacy/images/integrations/whatsapp-chatbot.webp"
                alt="WhatsApp ChatBot"
                width={350}
                height={350}
                className="rounded-lg shadow-lg object-contain"
                style={{ maxWidth: "350px" }}
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </div>
            <div className="w-full md:w-2/3">
              <p className="mb-3 text-white text-lg">
                Let your tenants handle billing inquiries, maintenance requests, and updates directly via WhatsApp — no manual intervention required. Our AI Chatbot is always on, always polite, and always efficient.
              </p>
              <p className="text-white text-lg">
                Keep your tenant WhatsApp groups fun and informal. Jokes, memes, and weekend plans belong there. Leave the serious stuff to our chatbot.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ETIMS Integration */}
      <Section className="bg-white dark:bg-slate-900" id="etims">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-3 text-3xl font-bold text-slate-900 dark:text-slate-50">
            ETIMS Integration
          </h2>
          <h3 className="text-center text-lg font-light mb-5 text-slate-600 dark:text-slate-400">
            Effortless Tax Compliance with KRA ETIMS
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 mb-4 md:mb-0 flex justify-center">
              <Image
                src="/legacy/images/integrations/etims.png"
                alt="ETIMS Integration"
                width={350}
                height={350}
                className="rounded-lg shadow-lg object-contain"
                style={{ maxWidth: "350px" }}
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </div>
            <div className="w-full md:w-2/3">
              <p className="mb-3 text-slate-700 dark:text-slate-300 text-lg">
                Stay compliant with KRA&apos;s Electronic Tax Invoice Management System (ETIMS) without changing your workflow. Our platform automates invoice generation and e-invoice transmission to the KRA in real time.
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-lg">
                From rent invoices to service charges, every taxable transaction can be automatically synced with ETIMS, ensuring your tax obligations are met with minimal manual effort — and zero risk of non-compliance.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

