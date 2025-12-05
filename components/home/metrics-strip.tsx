"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const metrics = [
  { value: "500+", label: "Properties under management" },
  { value: "100,000+", label: "Rent transactions processed annually" },
  { value: "20–30%", label: "Increase in on-time collections" },
];

const logos = [
  "Bank Partner",
  "Estate Developer",
  "Management Co.",
  "HOA Committee",
];

export function MetricsStrip() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-12 border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="text-center p-6 border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-200">
                <div className="text-4xl font-bold text-[#344767] dark:text-[#b98036] mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {metric.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Trusted by leading property teams in Kenya</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {logos.map((logo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="h-12 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-medium"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

