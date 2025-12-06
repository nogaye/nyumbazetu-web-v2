import dynamic from "next/dynamic";
import { HeroCarousel } from "@/components/home/hero-carousel";

// Lazy load below-the-fold components for better performance
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
    </>
  );
}
