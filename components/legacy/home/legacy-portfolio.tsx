"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";

const propertyTypes = [
  "Residential",
  "Commercial",
  "Student Housing",
  "Affordable Housing",
  "Community Associations",
];

export function LegacyPortfolio() {
  return (
    <Section className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
        >
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6"
            >
              <BuildingOffice2Icon className="h-4 w-4" />
              <span>Manage your portfolio on one platform</span>
            </motion.div>

            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Easily manage your properties from anywhere
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">
              {propertyTypes.map((type, idx) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.05, duration: 0.3 }}
                >
                  <Button
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 hover:border-white/30"
                  >
                    {type}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <p className="text-white text-lg md:text-xl leading-relaxed">
                Automate rent collection, effortlessly send invoices and announcements to tenants, pay your employees and vendors, manage maintenance requests, securely store files, and generate reports for unparalleled organization like never before.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

