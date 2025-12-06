"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface LegacyRequestDemoProps {
  dark?: boolean;
}

export function LegacyRequestDemo({ dark = true }: LegacyRequestDemoProps) {
  return (
    <Section
      className={`relative overflow-hidden ${
        dark
          ? "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
          : "bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950"
      }`}
    >
      {/* Decorative elements */}
      {dark && (
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6"
        >
          <div className="w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <SparklesIcon className="h-4 w-4" />
              <span>The Future of Property Management</span>
            </div>
            <h3
              className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight ${
                dark ? "text-white" : "text-slate-900 dark:text-slate-50"
              }`}
            >
              Technology is quietly reshaping property management. Very soon a software-driven approach will be the expectation of your tenants. The question is whether to adapt early or play catch-up with your competitors.
            </h3>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 group" asChild>
              <a href="/contact">
                Request a Demo
                <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

