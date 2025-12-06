"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export function LegacyScreenshots() {
  const [current, setCurrent] = useState(0);
  const screenshots = [
    {
      src: "/legacy/images/screenshots/dashboard.png",
      alt: "Dashboard Overview",
      caption: "Powerful dashboard with real-time metrics.",
    },
    {
      src: "/legacy/images/screenshots/grid.png",
      alt: "Advanced Data Grid",
      caption: "Manage data efficiently with powerful grids.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % screenshots.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [screenshots.length]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % screenshots.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const goTo = (index: number) => {
    setCurrent(index);
  };

  return (
    <Section>
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Comprehensive Management Dashboard"
          description="A centralized hub for real-time insights and performance tracking"
        />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 md:p-6 border-2 border-slate-200 dark:border-slate-700">
              <Image
                className="w-full rounded-lg"
                src={screenshots[current].src}
                alt={screenshots[current].alt}
                width={1200}
                height={600}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority={current === 0}
                loading={current === 0 ? "eager" : "lazy"}
              />
              {screenshots[current].caption && (
                <p className="text-center text-slate-600 dark:text-slate-400 mt-4 text-sm">
                  {screenshots[current].caption}
                </p>
              )}
            </div>
          </motion.div>
          <div className="flex justify-center items-center gap-3 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full"
              aria-label="Previous screenshot"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                  }`}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full"
              aria-label="Next screenshot"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <SectionHeader
            title="Powerful Grids"
            description="Everything you like in excel but supercharged with automation and real-time updates"
          />
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 md:p-6 border-2 border-slate-200 dark:border-slate-700">
              <Image
                className="w-full rounded-lg"
                src="/legacy/images/screenshots/grid.png"
                alt="Grid view"
                width={1200}
                height={600}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

