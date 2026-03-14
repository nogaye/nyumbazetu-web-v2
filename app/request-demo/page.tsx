"use client";

/**
 * Request a Demo page. Dedicated page for booking a product demo via Cal.com.
 * Kept separate from the general contact page so demo intent is clear and
 * scheduling is the primary action.
 */

import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const CAL_COM_URL = "https://cal.com/nyumba-zetu";

export default function RequestDemoPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Request a demo"
          description="Book a 15 or 30-minute call with our team. We'll walk you through the platform and answer your questions."
        />
      </Section>

      <Section className="bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
              <CalendarDaysIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                Pick a time
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Choose a slot that works for you — we'll send a calendar invite and join the call.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <iframe
              title="Book a demo with Nyumba Zetu"
              src={CAL_COM_URL}
              width="100%"
              height="630"
              className="min-h-[630px] w-full border-0"
              allowFullScreen
            />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 text-center">
            Prefer to open in a new tab?{" "}
            <a
              href={CAL_COM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Open Cal.com
            </a>
          </p>
        </div>
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
