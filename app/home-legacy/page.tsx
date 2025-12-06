import dynamic from "next/dynamic";
import { LegacyHomeHeader } from "@/components/legacy/home/legacy-home-header";
import { LegacyTransactions } from "@/components/legacy/home/legacy-transactions";
import { LegacyHeadline } from "@/components/legacy/home/legacy-headline";
import { LegacyAwards } from "@/components/legacy/home/legacy-awards";
import { LegacyPortfolio } from "@/components/legacy/home/legacy-portfolio";
import { LegacyFeatures } from "@/components/legacy/home/legacy-features";
import { LegacyScreenshots } from "@/components/legacy/home/legacy-screenshots";
import { LegacyIntegrations } from "@/components/legacy/home/legacy-integrations";
import { LegacyStats } from "@/components/legacy/home/legacy-stats";
import { LegacyTestimonials } from "@/components/legacy/home/legacy-testimonials";
import { LegacyPartners } from "@/components/legacy/home/legacy-partners";
import { LegacyRequestDemo } from "@/components/legacy/home/legacy-request-demo";
import { LegacyClients } from "@/components/legacy/home/legacy-clients";
import { LegacyReferral } from "@/components/legacy/home/legacy-referral";
import { LegacyMobileApp } from "@/components/legacy/home/legacy-mobile-app";

// Lazy load below-the-fold components for better performance
const LegacyScreenshotsLazy = dynamic(
  () => import("@/components/legacy/home/legacy-screenshots").then((mod) => ({ default: mod.LegacyScreenshots })),
  { ssr: true }
);
const LegacyIntegrationsLazy = dynamic(
  () => import("@/components/legacy/home/legacy-integrations").then((mod) => ({ default: mod.LegacyIntegrations })),
  { ssr: true }
);
const LegacyStatsLazy = dynamic(
  () => import("@/components/legacy/home/legacy-stats").then((mod) => ({ default: mod.LegacyStats })),
  { ssr: true }
);
const LegacyTestimonialsLazy = dynamic(
  () => import("@/components/legacy/home/legacy-testimonials").then((mod) => ({ default: mod.LegacyTestimonials })),
  { ssr: true }
);
const LegacyPartnersLazy = dynamic(
  () => import("@/components/legacy/home/legacy-partners").then((mod) => ({ default: mod.LegacyPartners })),
  { ssr: true }
);
const LegacyClientsLazy = dynamic(
  () => import("@/components/legacy/home/legacy-clients").then((mod) => ({ default: mod.LegacyClients })),
  { ssr: true }
);
const LegacyReferralLazy = dynamic(
  () => import("@/components/legacy/home/legacy-referral").then((mod) => ({ default: mod.LegacyReferral })),
  { ssr: true }
);
const LegacyMobileAppLazy = dynamic(
  () => import("@/components/legacy/home/legacy-mobile-app").then((mod) => ({ default: mod.LegacyMobileApp })),
  { ssr: true }
);

export const metadata = {
  title: "Home | Nyumba Zetu - Property Management for Kenya",
  description: "Nyumba Zetu is Kenya's leading property management software for landlords, property managers, and real estate professionals. Streamline your property operations with our comprehensive platform.",
};

export default function HomeLegacyPage() {
  return (
    <>
      <LegacyHomeHeader />
      <LegacyTransactions />
      <LegacyHeadline />
      <LegacyAwards />
      <LegacyPortfolio />
      <LegacyFeatures />
      <LegacyScreenshotsLazy />
      <LegacyIntegrationsLazy />
      <LegacyStatsLazy />
      <LegacyTestimonialsLazy />
      <LegacyPartnersLazy />
      <LegacyRequestDemo />
      <LegacyClientsLazy />
      <LegacyReferralLazy />
      <LegacyMobileAppLazy />
    </>
  );
}


