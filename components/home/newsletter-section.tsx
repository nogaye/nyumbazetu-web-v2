"use client";

/**
 * Home page "Stay updated" newsletter block with scroll-triggered fade-in via AnimatedSection.
 */

import { AnimatedSection } from "@/components/animated-section";
import { NewsletterSignup } from "@/components/newsletter-signup";

export function NewsletterSection() {
  return (
    <AnimatedSection className="bg-slate-50 dark:bg-slate-900">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
          Stay updated
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Guides, case studies, and industry news—in your inbox.
        </p>
        <NewsletterSignup />
      </div>
    </AnimatedSection>
  );
}
