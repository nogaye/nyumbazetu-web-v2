import dynamic from "next/dynamic";
import { HeroSingle } from "@/components/home/hero-single";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Section } from "@/components/section";

// Lazy load below-the-fold components for better performance
const AsSeenOn = dynamic(
  () =>
    import("@/components/home/as-seen-on").then((mod) => ({
      default: mod.AsSeenOn,
    })),
  { ssr: true },
);
const MetricsStrip = dynamic(
  () =>
    import("@/components/home/metrics-strip").then((mod) => ({
      default: mod.MetricsStrip,
    })),
  { ssr: true },
);

const ProductVideo = dynamic(
  () =>
    import("@/components/home/product-video").then((mod) => ({
      default: mod.ProductVideo,
    })),
  { ssr: true },
);

const Differentiators = dynamic(
  () =>
    import("@/components/home/differentiators").then((mod) => ({
      default: mod.Differentiators,
    })),
  { ssr: true },
);
const HowItWorks = dynamic(
  () =>
    import("@/components/home/how-it-works").then((mod) => ({
      default: mod.HowItWorks,
    })),
  { ssr: true },
);
const Testimonials = dynamic(
  () =>
    import("@/components/home/testimonials").then((mod) => ({
      default: mod.Testimonials,
    })),
  { ssr: true },
);
const ResourcesTeaser = dynamic(
  () =>
    import("@/components/home/resources-teaser").then((mod) => ({
      default: mod.ResourcesTeaser,
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

export const metadata = {
  title:
    "Nyumba Zetu | Property Management Infrastructure for Modern Kenyan Real Estate",
  description:
    "Nyumba Zetu is a full-stack property, accounting, and tenant experience platform built for landlords, property managers, committees, developers, and banks in Kenya.",
};

export default function ModernHome() {
  return (
    <>
      <HeroSingle />
      <AsSeenOn />
      <MetricsStrip />
      <ProductVideo />

      <Differentiators />
      <HowItWorks />
      <Testimonials />
      <ResourcesTeaser />
      <FinalCTA />

      {/* Newsletter Signup */}
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
