"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDaysIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export function FinalCTA() {
  return (
    <Section className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-slate-50 leading-tight tracking-tight">
          Ready to upgrade your property operations to Fortune-500 level?
        </h2>
        <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
          Talk to our team and see how Nyumba Zetu can transform your collections, accounting, and tenant experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-[#b98036] hover:bg-[#a06f2d]" asChild>
            <Link href="/contact" className="flex items-center gap-2">
              Request a demo
              <CalendarDaysIcon className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
            <Link href="/contact" className="flex items-center gap-2">
              Talk to our team
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}

