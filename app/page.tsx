/**
 * Marketing homepage entry point. Keeps the hero and first section on the critical path,
 * while deferring heavier client sections so first paint and LCP stay fast on mobile and desktop.
 */
import dynamic from "next/dynamic";
import { LegacyTransactions } from "@/components/legacy/home/legacy-transactions";
import { LegacyHeadline } from "@/components/legacy/home/legacy-headline";
import { LegacyAwards } from "@/components/legacy/home/legacy-awards";
import { LegacyRequestDemo } from "@/components/legacy/home/legacy-request-demo";
import { HeroSingleV2 } from "@/components/home/hero-single-v2";
import { SectionTransition } from "@/components/home/section-transition";

/**
 * Homepage below-the-fold sections are code-split so the hero can paint sooner.
 * These sections still render on the server, but their client bundles load later.
 */
const AsSeenOn = dynamic(
  () =>
    import("@/components/home/as-seen-on").then((mod) => ({
      default: mod.AsSeenOn,
    })),
  { ssr: true },
);
const LegacyPortfolio = dynamic(
  () =>
    import("@/components/legacy/home/legacy-portfolio").then((mod) => ({
      default: mod.LegacyPortfolio,
    })),
  { ssr: true },
);
const FeatureGrid = dynamic(
  () =>
    import("@/components/home/feature-grid").then((mod) => ({
      default: mod.FeatureGrid,
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
const SecurityReliabilitySection = dynamic(
  () =>
    import("@/components/home/security-reliability-section").then((mod) => ({
      default: mod.SecurityReliabilitySection,
    })),
  { ssr: true },
);
const FinalCTA = dynamic(
  () =>
    import("@/components/home/final-cta").then((mod) => ({
      default: mod.FinalCTA,
    })),
  { ssr: true },
);
const NewsletterSection = dynamic(
  () =>
    import("@/components/home/newsletter-section").then((mod) => ({
      default: mod.NewsletterSection,
    })),
  { ssr: true },
);

export const metadata = {
  title: "Property Management Software for Kenya | Rent Collection, Accounting & Tenant Management",
  description:
    "Nyumba Zetu is Kenya's leading property management software. Collect rent via M-Pesa, manage tenants, track maintenance, and run full accounting for estates, landlords, and developers. Trusted by 500+ properties.",
};

export default function Home() {
  return (
    <>
      <HeroSingleV2 />
      <SectionTransition id="how-it-works" />
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
