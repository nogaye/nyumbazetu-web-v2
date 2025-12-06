import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Boma Yangu Partnership - Nyumba Zetu",
  description: "Learn about Nyumba Zetu's integration with Boma Yangu for affordable housing and Tenant Purchase Scheme solutions.",
};

export default function BomaYanguPartnershipPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 flex-shrink-0">
              <div className="w-28 h-28 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Boma Yangu Logo
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                Boma Yangu Partnership
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Integration partner for affordable housing and TPS solutions
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
              Nyumba Zetu has partnered with Boma Yangu, a government initiative focused on affordable housing in Kenya. This partnership enables seamless integration between Boma Yangu's affordable housing programs and Nyumba Zetu's property management platform.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Boma Yangu is integrated with Nyumba Zetu as part of our Tenant Purchase Scheme (TPS) platform, providing comprehensive property management solutions for affordable housing projects across Kenya.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Integration Features
            </h2>
            <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Seamless integration with Boma Yangu's affordable housing programs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Tenant Purchase Scheme (TPS) tracking and management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Automated installment payment tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Ownership percentage calculation and transfer workflows</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Comprehensive reporting for affordable housing projects</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              TPS Integration
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              As part of Nyumba Zetu's TPS (Tenant Purchase Scheme) feature, Boma Yangu integration allows property managers and developers to track tenant purchase agreements, manage installment payments, calculate ownership percentages, and handle ownership transfers seamlessly.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              This integration is particularly valuable for affordable housing projects where tenants are purchasing their homes through installment plans, ensuring accurate tracking and compliance with government housing programs.
            </p>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                Learn More About Boma Yangu
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Visit Boma Yangu's website to learn more about their affordable housing initiatives and programs.
              </p>
              <Button asChild>
                <a href="https://www.bomayangu.go.ke/" target="_blank" rel="noopener noreferrer">
                  Visit Boma Yangu
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
            Learn more about our Tenant Purchase Scheme features and how Boma Yangu integration can benefit your affordable housing projects.
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

