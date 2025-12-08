"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const metrics = [
  { value: "500+", label: "Properties under management" },
  { value: "100,000+", label: "Rent transactions processed annually" },
  { value: "20–30%", label: "Increase in on-time collections" },
];

export function MetricsStrip() {
  return (
    <section className="bg-secondary py-12 border-b border-secondary/20">
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
              <Card className="text-center p-6 border-white/20 bg-white/10 backdrop-blur-sm hover:shadow-md transition-all duration-200">
                <div className="text-4xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-white leading-relaxed">
                  {metric.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

