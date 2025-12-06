import dynamic from "next/dynamic";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Section } from "@/components/section";

// Lazy load below-the-fold components for better performance
const AsSeenOn = dynamic(() => import("@/components/home/as-seen-on").then(mod => ({ default: mod.AsSeenOn })), { ssr: true });
const MetricsStrip = dynamic(() => import("@/components/home/metrics-strip").then(mod => ({ default: mod.MetricsStrip })), { ssr: true });
const ProblemContext = dynamic(() => import("@/components/home/problem-context").then(mod => ({ default: mod.ProblemContext })), { ssr: true });
const FeatureGrid = dynamic(() => import("@/components/home/feature-grid").then(mod => ({ default: mod.FeatureGrid })), { ssr: true });
const Differentiators = dynamic(() => import("@/components/home/differentiators").then(mod => ({ default: mod.Differentiators })), { ssr: true });
const Personas = dynamic(() => import("@/components/home/personas").then(mod => ({ default: mod.Personas })), { ssr: true });
const HowItWorks = dynamic(() => import("@/components/home/how-it-works").then(mod => ({ default: mod.HowItWorks })), { ssr: true });
const Testimonials = dynamic(() => import("@/components/home/testimonials").then(mod => ({ default: mod.Testimonials })), { ssr: true });
const Integrations = dynamic(() => import("@/components/home/integrations").then(mod => ({ default: mod.Integrations })), { ssr: true });
const ResourcesTeaser = dynamic(() => import("@/components/home/resources-teaser").then(mod => ({ default: mod.ResourcesTeaser })), { ssr: true });
const FinalCTA = dynamic(() => import("@/components/home/final-cta").then(mod => ({ default: mod.FinalCTA })), { ssr: true });

export const metadata = {
  title: "Nyumba Zetu | Property Management Infrastructure for Modern Kenyan Real Estate",
  description: "Nyumba Zetu is a full-stack property, accounting, and tenant experience platform built for landlords, property managers, committees, developers, and banks in Kenya.",
};

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <AsSeenOn />
      <MetricsStrip />
      <ProblemContext />
      <FeatureGrid />
      <Differentiators />
      <Personas />
      <HowItWorks />
      <Testimonials />
      <Integrations />
      <ResourcesTeaser />
      <FinalCTA />
      
      {/* Newsletter Signup */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Stay updated with property management insights
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Get the latest guides, case studies, and industry news delivered to your inbox.
          </p>
          <NewsletterSignup />
        </div>
      </Section>
    </>
  );
}
