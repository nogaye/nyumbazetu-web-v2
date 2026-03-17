/**
 * Marketing homepage entry point. Keeps the hero and first section on the critical path,
 * while deferring heavier client sections so first paint and LCP stay fast on mobile and desktop.
 */
import nextDynamic from "next/dynamic";
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
const AsSeenOn = nextDynamic(
  () =>
    import("@/components/home/as-seen-on").then((mod) => ({
      default: mod.AsSeenOn,
    })),
  { ssr: true },
);
const LegacyPortfolio = nextDynamic(
  () =>
    import("@/components/legacy/home/legacy-portfolio").then((mod) => ({
      default: mod.LegacyPortfolio,
    })),
  { ssr: true },
);
const FeatureGrid = nextDynamic(
  () =>
    import("@/components/home/feature-grid").then((mod) => ({
      default: mod.FeatureGrid,
    })),
  { ssr: true },
);
const Integrations = nextDynamic(
  () =>
    import("@/components/home/integrations").then((mod) => ({
      default: mod.Integrations,
    })),
  { ssr: true },
);
const Partnerships = nextDynamic(
  () =>
    import("@/components/home/partnerships").then((mod) => ({
      default: mod.Partnerships,
    })),
  { ssr: true },
);
const LegacyScreenshotsLazy = nextDynamic(
  () =>
    import("@/components/legacy/home/legacy-screenshots").then((mod) => ({
      default: mod.LegacyScreenshots,
    })),
  { ssr: true },
);
const LegacyTestimonialsLazy = nextDynamic(
  () =>
    import("@/components/legacy/home/legacy-testimonials").then((mod) => ({
      default: mod.LegacyTestimonials,
    })),
  { ssr: true },
);
const LegacyPartnersLazy = nextDynamic(
  () =>
    import("@/components/legacy/home/legacy-partners").then((mod) => ({
      default: mod.LegacyPartners,
    })),
  { ssr: true },
);
const LegacyClientsLazy = nextDynamic(
  () =>
    import("@/components/legacy/home/legacy-clients").then((mod) => ({
      default: mod.LegacyClients,
    })),
  { ssr: true },
);
const LegacyReferralLazy = nextDynamic(
  () =>
    import("@/components/legacy/home/legacy-referral").then((mod) => ({
      default: mod.LegacyReferral,
    })),
  { ssr: true },
);
const SecurityReliabilitySection = nextDynamic(
  () =>
    import("@/components/home/security-reliability-section").then((mod) => ({
      default: mod.SecurityReliabilitySection,
    })),
  { ssr: true },
);
const FinalCTA = nextDynamic(
  () =>
    import("@/components/home/final-cta").then((mod) => ({
      default: mod.FinalCTA,
    })),
  { ssr: true },
);
const NewsletterSection = nextDynamic(
  () =>
    import("@/components/home/newsletter-section").then((mod) => ({
      default: mod.NewsletterSection,
    })),
  { ssr: true },
);

/** Force static generation so the homepage is served from cache (better TTFB and LCP). */
export const dynamic = "force-static";

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
