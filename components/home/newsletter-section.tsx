"use client";

/**
 * Home page "Stay updated" newsletter block with scroll-triggered fade-in via AnimatedSection.
 * Uses display typography and a clear value proposition to boost signups.
 */

import { AnimatedSection } from "@/components/animated-section";
import { NewsletterSignup } from "@/components/newsletter-signup";

export function NewsletterSection() {
  return (
    <AnimatedSection className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 py-16 md:py-20">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
          Newsletter
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
          Stay in the loop
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          Property management tips, product updates, and industry insights—delivered to your inbox. No spam, unsubscribe anytime.
        </p>
        <NewsletterSignup />
      </div>
    </AnimatedSection>
  );
}
