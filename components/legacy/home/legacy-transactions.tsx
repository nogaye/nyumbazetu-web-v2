/**
 * Homepage credibility stats. Renders static transaction and portfolio numbers so the
 * first screen does not pay for animated counters on the critical path.
 */
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export function LegacyTransactions() {
  const stats = [
    {
      icon: CurrencyDollarIcon,
      value: "KES 1B+",
      label: "In monthly transactions",
      description: "Secure, traceable payments—M-Pesa, bank, and wallet in one flow.",
    },
    {
      icon: UserGroupIcon,
      value: "50k+",
      label: "Active tenants",
      description: "Tenant and owner portals that reduce support and boost satisfaction.",
    },
    {
      icon: BuildingOfficeIcon,
      value: "500+",
      label: "Properties managed",
      description: "From single units to large estates—one platform scales with you.",
    },
    {
      icon: DocumentTextIcon,
      value: "1M+",
      label: "Invoices delivered",
      description: "Automated invoicing, eTIMS-ready, and full audit trails.",
    },
  ];

  return (
    <Section className="bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Numbers that matter"
          description="Property teams across Kenya run on Nyumba Zetu—faster collections, fewer headaches, and one source of truth for every stakeholder."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
              >
                <Card className="h-full border border-slate-200/80 dark:border-slate-700/80 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-600">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </h3>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
                      {stat.label}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

