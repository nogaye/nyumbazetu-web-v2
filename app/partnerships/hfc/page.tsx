import Image from "next/image";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "HFC Partnership - Nyumba Zetu",
  description: "Learn about Nyumba Zetu's collaboration with HFC (Housing Finance) on TPS and property finance solutions.",
};

export default function HFCPartnershipPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 flex-shrink-0 p-3">
              <Image
                src="/legacy/images/logos/small-logos/hfc-logo.png"
                alt="HFC (Housing Finance) logo"
                width={112}
                height={112}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                HFC (Housing Finance) Partnership
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Collaboration on TPS and property finance solutions
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              About the Partnership
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Nyumba Zetu is working with HFC (Housing Finance Company Limited), one of Kenya's leading mortgage finance institutions, to deliver comprehensive Tenant Purchase Scheme (TPS) solutions. This collaboration combines HFC's expertise in property finance with Nyumba Zetu's property management technology.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Together, we're developing integrated solutions that enable property developers, financial institutions, and property managers to efficiently manage TPS arrangements, track installment payments, and facilitate smooth ownership transfers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Collaboration Focus Areas
            </h2>
            <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Tenant Purchase Scheme (TPS) implementation and management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Integrated property finance and management solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Automated installment tracking and payment reconciliation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Ownership transfer workflows and documentation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Financial reporting and compliance for TPS arrangements</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              TPS Solutions
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Through our partnership with HFC, Nyumba Zetu's TPS platform provides property developers and financial institutions with robust tools to manage tenant purchase schemes. The system tracks each installment payment, calculates ownership percentages in real-time, and manages the complete ownership transfer process.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              This collaboration ensures that TPS arrangements are managed efficiently, transparently, and in compliance with regulatory requirements, making homeownership more accessible to Kenyans through structured purchase plans.
            </p>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                Learn More About HFC
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Visit HFC's website to learn more about their property finance solutions and mortgage products.
              </p>
              <Button asChild>
                <a href="https://www.hfgroup.co.ke/" target="_blank" rel="noopener noreferrer">
                  Visit HFC Website
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Interested in TPS Solutions?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Learn more about our Tenant Purchase Scheme features and how our partnership with HFC can benefit your property finance operations.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/features/tps">Learn About TPS</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/partnerships">View All Partnerships</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

