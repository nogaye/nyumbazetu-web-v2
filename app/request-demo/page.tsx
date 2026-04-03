"use client";

/**
 * Request a Demo page. Dedicated page for booking a product demo via Calendly
 * inline embed (`CalendlyComBookingEmbed`); Cal.com remains available as
 * `CalComBookingEmbed`. Kept separate from the general contact page so demo
 * intent is clear and scheduling is the primary action.
 */

import Link from "next/link";
import { CalendlyComBookingEmbed } from "@/components/request-demo/calendly-com-booking-embed";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function RequestDemoPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-10">
        <SectionHeader
          title="Request a demo"
          description="Book a 45-minute call with our team. We will walk you through the platform and answer your questions — pick a time below."
        />
      </Section>

      <Section className="bg-slate-50/50 dark:bg-slate-900/30 pt-0 pb-10 md:pb-14 lg:pb-16">
        <CalendlyComBookingEmbed />
      </Section>

      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 mb-4">
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            <span>Have a question instead of booking a demo?</span>
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
