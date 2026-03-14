"use client";

/**
 * Homepage platform showcase carousel. Wraps the shared platform screenshots
 * carousel in a Section with gradient background. Used in the main homepage
 * "See the platform" section.
 */

import { Section } from "@/components/section";
import { PlatformScreenshotsCarousel } from "@/components/home/platform-screenshots-carousel";

export function LegacyScreenshots() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="relative">
        <PlatformScreenshotsCarousel
          title="See the platform in action"
          description="Real screens from Nyumba Zetu—dashboard, analytics, amenities, tasks, and smart meters."
          variant="light"
        />
      </div>
    </Section>
  );
}
