"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DevicePhoneMobileIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export function LegacyMobileApp() {
  const features = [
    "Check balances and payment history",
    "Pay rent and service charges",
    "Chat with property managers",
    "Receive notifications and updates",
  ];

  return (
    <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Download Our Mobile App"
          description="Experience the convenience of effortlessly managing your bills and conducting payments right from the palm of your hand."
        />

        <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
          {/* Left: Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <DevicePhoneMobileIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                    Available on iOS
                  </h3>
                </div>

                <ul className="space-y-3 mb-6">
                  {features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircleIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link
                    href="https://apps.apple.com/us/app/nyumba-zetu/id6456750559"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                    Download on App Store
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 shadow-2xl">
                <div className="w-48 h-96 mx-auto bg-white dark:bg-slate-700 rounded-[2.5rem] p-2 shadow-xl">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-[2rem] flex items-center justify-center">
                    <DevicePhoneMobileIcon className="h-24 w-24 text-primary/50" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

