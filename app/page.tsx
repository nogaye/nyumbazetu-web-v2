import dynamic from "next/dynamic";
import { LegacyHomeHeader } from "@/components/legacy/home/legacy-home-header";
import { LegacyTransactions } from "@/components/legacy/home/legacy-transactions";
import { LegacyHeadline } from "@/components/legacy/home/legacy-headline";
import { LegacyAwards } from "@/components/legacy/home/legacy-awards";
import { LegacyPortfolio } from "@/components/legacy/home/legacy-portfolio";
import { FeatureGrid } from "@/components/home/feature-grid";
import { LegacyRequestDemo } from "@/components/legacy/home/legacy-request-demo";
import { FinalCTA } from "@/components/home/final-cta";
import { SecurityReliabilitySection } from "@/components/home/security-reliability-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { HeroSingleV2 } from "@/components/home/hero-single-v2";
import { SectionTransition } from "@/components/home/section-transition";

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
  title: "Home",
  description:
    "The operating system for African real estate. One platform for collections, accounting, tenant experience, and compliance—trusted by property managers, estates, and banks across Kenya.",
};

export default function Home() {
  return (
    <>
      <HeroSingleV2 />
      <SectionTransition id="how-it-works" />
      {/* <LegacyHomeHeader /> */}
      <LegacyTransactions />
      <LegacyHeadline />
      <LegacyAwards />
      <AsSeenOn />
      <LegacyPortfolio />
      <FeatureGrid limit={6} showViewMore showCta />
      <LegacyScreenshotsLazy />
      <Integrations />
      <LegacyTestimonialsLazy />
      <LegacyPartnersLazy />
      <LegacyRequestDemo />
      <LegacyClientsLazy />
      <Partnerships />

      {/* Security & Reliability */}
      <SecurityReliabilitySection />

      <LegacyReferralLazy />

      {/* Final conversion CTA before newsletter */}
      <FinalCTA />

      {/* Stay updated — newsletter signup */}
      <NewsletterSection />
    </>
  );
}
