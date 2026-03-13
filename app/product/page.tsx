import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { PlatformInfrastructureDiagram } from "@/components/product/platform-infrastructure-diagram";
import { AutomatedWorkflow } from "@/components/product/automated-workflow";
import { ManagementDashboard } from "@/components/product/management-dashboard";

export const metadata = {
  title: "Platform Overview | Nyumba Zetu",
  description: "One platform for every layer of property operations in Kenya. Explore how Nyumba Zetu integrates property management, accounting, and tenant experience.",
};

export default function ProductPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="One platform for every layer of property operations in Kenya."
          description="Nyumba Zetu integrates property management, accounting, tenant experience, and compliance into a single, powerful platform."
        />
      </Section>

      {/* Platform Infrastructure Diagram */}
      <Section>
        <div className="max-w-6xl mx-auto mb-12">
          <PlatformInfrastructureDiagram />
        </div>
      </Section>

      {/* Automated Workflow */}
      <Section className="bg-secondary">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
            Fully Automated Invoice-to-Payment Workflow
          </h2>
          <p className="text-lg md:text-xl text-white leading-relaxed">
            From invoice generation to financial reporting—completely automated with zero manual intervention.
          </p>
        </div>
        <div className="max-w-7xl mx-auto">
          <AutomatedWorkflow />
        </div>
      </Section>

      {/* Management Dashboard */}
      <Section className="bg-secondary">
        <div className="max-w-7xl mx-auto">
          <ManagementDashboard />
        </div>
      </Section>

      {/* Implementation */}
      <Section className="bg-secondary">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
          Implementation & Onboarding
        </h2>
        <p className="text-lg md:text-xl text-white leading-relaxed">
          Get up and running quickly with our dedicated onboarding team.
        </p>
      </div>
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <ol className="space-y-4">
                {[
                  "Initial consultation to understand your portfolio and workflows",
                  "Data migration support for units, tenants, and historical transactions",
                  "Custom configuration for chart of accounts, payment methods, and integrations",
                  "Team training sessions for managers, accountants, and administrators",
                  "Go-live support and ongoing optimization",
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <span className="font-bold text-primary">{idx + 1}.</span>
                    <span className="text-white">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to see the platform in action?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Schedule a demo with our team to explore how Nyumba Zetu can transform your property operations.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact" className="flex items-center gap-2">
              Request a Demo
              <CalendarDaysIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}


