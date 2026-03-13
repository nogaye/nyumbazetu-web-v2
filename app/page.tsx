import dynamic from "next/dynamic";
import { LegacyHomeHeader } from "@/components/legacy/home/legacy-home-header";
import { LegacyTransactions } from "@/components/legacy/home/legacy-transactions";
import { LegacyHeadline } from "@/components/legacy/home/legacy-headline";
import { LegacyAwards } from "@/components/legacy/home/legacy-awards";
import { LegacyPortfolio } from "@/components/legacy/home/legacy-portfolio";
import { FeatureGrid } from "@/components/home/feature-grid";
import { LegacyRequestDemo } from "@/components/legacy/home/legacy-request-demo";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Lazy load below-the-fold components for better performance
const AsSeenOn = dynamic(
  () =>
    import("@/components/home/as-seen-on").then((mod) => ({
      default: mod.AsSeenOn,
    })),
  { ssr: true },
);
const Integrations = dynamic(
  () =>
    import("@/components/home/integrations").then((mod) => ({
      default: mod.Integrations,
    })),
  { ssr: true },
);
const Partnerships = dynamic(
  () =>
    import("@/components/home/partnerships").then((mod) => ({
      default: mod.Partnerships,
    })),
  { ssr: true },
);
const LegacyScreenshotsLazy = dynamic(
  () =>
    import("@/components/legacy/home/legacy-screenshots").then((mod) => ({
      default: mod.LegacyScreenshots,
    })),
  { ssr: true },
);
const LegacyTestimonialsLazy = dynamic(
  () =>
    import("@/components/legacy/home/legacy-testimonials").then((mod) => ({
      default: mod.LegacyTestimonials,
    })),
  { ssr: true },
);
const LegacyPartnersLazy = dynamic(
  () =>
    import("@/components/legacy/home/legacy-partners").then((mod) => ({
      default: mod.LegacyPartners,
    })),
  { ssr: true },
);
const LegacyClientsLazy = dynamic(
  () =>
    import("@/components/legacy/home/legacy-clients").then((mod) => ({
      default: mod.LegacyClients,
    })),
  { ssr: true },
);
const LegacyReferralLazy = dynamic(
  () =>
    import("@/components/legacy/home/legacy-referral").then((mod) => ({
      default: mod.LegacyReferral,
    })),
  { ssr: true },
);

export const metadata = {
  title: "Home | Nyumba Zetu - Property Management for Kenya",
  description:
    "Nyumba Zetu is Kenya's leading property management software for landlords, property managers, and real estate professionals. Streamline your property operations with our comprehensive platform.",
};

export default function Home() {
  return (
    <>
      <LegacyHomeHeader />
      <LegacyTransactions />
      <LegacyHeadline />
      <LegacyAwards />
      <AsSeenOn />
      <LegacyPortfolio />
      <FeatureGrid />
      <LegacyScreenshotsLazy />
      <Integrations />
      <LegacyTestimonialsLazy />
      <LegacyPartnersLazy />
      <LegacyRequestDemo />
      <LegacyClientsLazy />
      <Partnerships />

      {/* Security & Reliability */}
      <Section>
        <SectionHeader
          title="Security & Reliability"
          description="Built for institutions that require enterprise-grade security and uptime."
        />
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Role-Based Access Control",
              description: "Granular permissions for managers, accountants, owners, and tenants.",
            },
            {
              title: "Audit Logs",
              description: "Complete transaction history with full audit trails for compliance.",
            },
            {
              title: "Data Protection",
              description: "Encrypted data storage, regular backups, and GDPR-compliant practices.",
            },
          ].map((item, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <LegacyReferralLazy />

      {/* Stay updated — newsletter signup */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Stay updated
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Guides, case studies, and industry news—in your inbox.
          </p>
          <NewsletterSignup />
        </div>
      </Section>
    </>
  );
}
