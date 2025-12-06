"use client";

import { useState, useEffect } from "react";
import { Section } from "@/components/section";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
        <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
          Comprehensive Management Dashboard
        </h2>
        <h3 className="text-center mt-2 text-lg text-slate-600 dark:text-slate-400 mb-8">
          A centralized hub for real-time insights and performance tracking
        </h3>
        <div className="relative">
          <Image
            className="w-full opacity-90 shadow-2xl rounded-2xl p-4 bg-white dark:bg-slate-800"
            src={screenshots[current].src}
            alt={screenshots[current].alt}
            width={1200}
            height={600}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            priority
          />
          <div className="flex justify-center gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={prev}>
              Previous
            </Button>
            {screenshots.map((_, index) => (
              <Button
                key={index}
                variant={current === index ? "default" : "outline"}
                size="sm"
                onClick={() => goTo(index)}
              >
                {index + 1}
              </Button>
            ))}
            <Button variant="outline" size="sm" onClick={next}>
              Next
            </Button>
          </div>
        </div>

        <h2 className="text-center mt-8 text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
          Powerful Grids
        </h2>
        <h3 className="text-center mt-2 text-lg text-slate-600 dark:text-slate-400 mb-8">
          Everything you like in excel but supercharged with automation and real-time updates
        </h3>
        <div>
          <Image
            className="w-full opacity-90 shadow-2xl rounded-2xl p-4 bg-white dark:bg-slate-800"
            src="/legacy/images/screenshots/grid.png"
            alt="Grid view"
            width={1200}
            height={600}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </div>
      </div>
    </Section>
  );
}

