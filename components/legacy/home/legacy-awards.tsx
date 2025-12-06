"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TrophyIcon } from "@heroicons/react/24/solid";

export function LegacyAwards() {
  return (
    <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-2/5"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl"></div>
              <Image
                className="relative w-full rounded-2xl shadow-2xl object-cover"
                src="/legacy/images/awards/kpra-trophy.jpg"
                alt="KPRA Trophy"
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-3/5"
          >
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-semibold mb-6">
                  <TrophyIcon className="h-4 w-4" />
                  <span>Award Winner</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                  Awarded Real Estate Technology Company of the Year 2022-2023 & 2024!
                </h3>
                
                <p className="text-lg text-slate-600 dark:text-slate-400 italic mb-6 leading-relaxed">
                  &quot;In recognition of your dedication and contribution to the Real Estate Industry.&quot;
                </p>

                <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="rounded-lg shadow-md bg-white dark:bg-slate-700 p-3">
                      <Image
                        src="/legacy/images/awards/kpra_logo.png"
                        alt="KPRA logo"
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-900 dark:text-slate-50 font-semibold text-lg">
                      Kenya Professional Realtors Association (KPRA)
                    </span>
                  </div>
                </div>

                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <a href="/contact">Be part of what&apos;s next...</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

