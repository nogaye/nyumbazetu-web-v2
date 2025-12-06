"use client";

import { Section } from "@/components/section";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function LegacyAwards() {
  return (
    <Section>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-2/5 p-4 lg:p-8 md:ml-auto">
            <div className="p-3">
              <Image
                className="w-full rounded-lg"
                src="/legacy/images/awards/kpra-trophy.jpg"
                alt="KPRA Trophy"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="w-full md:w-3/5 lg:w-2/5 position-relative">
            <Button size="lg" className="mb-4">
              Be part of what&apos;s next...
            </Button>

            <h3 className="text-dark dark:text-slate-50 mt-4 text-2xl font-bold">
              Awarded Real Estate Technology Company of the Year 2022-2023 & 2024!
            </h3>
            <p className="my-4 text-slate-600 dark:text-slate-400 italic">
              &quot;In recognition of your dedication and contribution to the Real Estate Industry.&quot;
            </p>
            <div className="author flex items-center gap-3">
              <div className="rounded shadow bg-gradient-light p-2">
                <Image
                  src="/legacy/images/awards/kpra_logo.png"
                  alt="KPRA logo"
                  width={80}
                  height={80}
                />
              </div>
              <div className="name">
                <span className="text-slate-900 dark:text-slate-50 font-semibold">
                  Kenya Professional Realtors Association (KPRA)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

