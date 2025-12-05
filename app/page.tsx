import { HeroCarousel } from "@/components/home/hero-carousel";
import { MetricsStrip } from "@/components/home/metrics-strip";
import { ProblemContext } from "@/components/home/problem-context";
import { FeatureGrid } from "@/components/home/feature-grid";
import { Differentiators } from "@/components/home/differentiators";
import { Personas } from "@/components/home/personas";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { Integrations } from "@/components/home/integrations";
import { ResourcesTeaser } from "@/components/home/resources-teaser";
import { FinalCTA } from "@/components/home/final-cta";

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
