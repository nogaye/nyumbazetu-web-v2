"use client";

/**
 * Reusable platform screenshots carousel. Displays the five Nyumba Zetu
 * dashboard screens (overview, analytics, amenities, tasks, smart meters)
 * with Embla carousel, autoplay, and optional section header. Used on
 * the homepage and product page.
 */

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChartBarIcon,
  TableCellsIcon,
  CalendarDaysIcon,
  BoltIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

/** Single carousel slide: image path, accessibility text, and caption. */
export interface ScreenshotSlide {
  src: string;
  alt: string;
  title: string;
  description: string;
  caption: string;
  icon?: "dashboard" | "analytics" | "amenities" | "tasks" | "meters";
}

export const PLATFORM_SCREENSHOTS: ScreenshotSlide[] = [
  {
    src: "/images/dashboard-screenshots/dashboard-overview.png",
    alt: "Nyumba Zetu dashboard showing outstanding balance, units, residents, occupancy, and scheduled tasks",
    title: "Comprehensive Management Dashboard",
    description:
      "A centralized hub for real-time insights—outstanding balance, units, residents, occupancy, leases, and scheduled tasks at a glance.",
    caption: "Your entire portfolio in one view.",
    icon: "dashboard",
  },
  {
    src: "/images/dashboard-screenshots/analytics-reports.png",
    alt: "Analytics dashboard with Invoiced vs Paid vs Due chart, lease expiration, debt aging, and debt per block",
    title: "Analytics & Financial Reports",
    description:
      "Invoiced vs. paid vs. due trends, lease expiration, debt aging, and debt per block—all in clear, actionable visualizations.",
    caption: "Make data-driven decisions with confidence.",
    icon: "analytics",
  },
  {
    src: "/images/dashboard-screenshots/amenities.png",
    alt: "Amenities management table with booking settings, max guests, and visit fees",
    title: "Amenities & Bookings",
    description:
      "Manage swimming pools, gyms, courts, and more—with booking rules, guest limits, and visit fees in one place.",
    caption: "Every amenity, fully configurable.",
    icon: "amenities",
  },
  {
    src: "/images/dashboard-screenshots/tasks-kanban.png",
    alt: "Task management Kanban board with Open, In Progress, Waiting, Blocked, and Completed columns",
    title: "Task Management That Works",
    description:
      "Kanban-style boards for Open, In Progress, Waiting, Blocked, and Completed—so nothing falls through the cracks.",
    caption: "Track work the way your team thinks.",
    icon: "tasks",
  },
  {
    src: "/images/dashboard-screenshots/smart-meter-readings.png",
    alt: "Smart meter readings table with meter number, reading at, quality, and ingested at",
    title: "Smart Meter Readings",
    description:
      "Monitor consumption with meter numbers, timestamps, quality flags, and ingestion times—ready for billing and analytics.",
    caption: "Utilities and usage under control.",
    icon: "meters",
  },
];

const ICON_MAP = {
  dashboard: ChartBarIcon,
  analytics: TableCellsIcon,
  amenities: BuildingOffice2Icon,
  tasks: CalendarDaysIcon,
  meters: BoltIcon,
};

const AUTOPLAY_INTERVAL_MS = 5500;

export interface PlatformScreenshotsCarouselProps {
  /** Section title above the carousel. */
  title?: string;
  /** Section description above the carousel. */
  description?: string;
  /** When true, use dark-friendly styling (e.g. on product page secondary background). */
  variant?: "light" | "dark";
  /** Optional className for the wrapper. */
  className?: string;
}

/**
 * Renders the platform screenshots carousel with optional header.
 * Supports light (default) and dark variants for different page backgrounds.
 */
export function PlatformScreenshotsCarousel({
  title = "See the platform in action",
  description = "Real screens from Nyumba Zetu—dashboard, analytics, amenities, tasks, and smart meters.",
  variant = "light",
  className = "",
}: PlatformScreenshotsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    duration: 28,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    setIsAutoPlaying(false);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    setIsAutoPlaying(false);
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      setIsAutoPlaying(false);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!isAutoPlaying || !emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isAutoPlaying, emblaApi]);

  const currentSlide = PLATFORM_SCREENSHOTS[selectedIndex];
  const IconComponent = currentSlide?.icon ? ICON_MAP[currentSlide.icon] : null;

  const isDark = variant === "dark";
  const textTitle = isDark ? "text-white" : "text-slate-900 dark:text-slate-50";
  const textDesc = isDark ? "text-white/90" : "text-slate-600 dark:text-slate-400";
  const cardBg = isDark ? "bg-white/10 dark:bg-slate-800/80" : "bg-white dark:bg-slate-800/80";
  const ring = isDark ? "ring-white/20" : "ring-slate-200/80 dark:ring-slate-700/80";

  return (
    <div className={className}>
      {(title || description) && (
        <div className="mb-10 md:mb-12">
          <SectionHeader title={title} description={description} />
        </div>
      )}

      <div className="relative max-w-6xl mx-auto">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex touch-pan-y gap-4 md:gap-6">
            {PLATFORM_SCREENSHOTS.map((slide, index) => (
              <div
                key={slide.src}
                className="relative min-w-0 flex-[0_0_100%] md:flex-[0_0_100%]"
              >
                <motion.div
                  initial={false}
                  className={`relative rounded-xl md:rounded-2xl overflow-hidden ${cardBg} shadow-xl ring-1 ${ring}`}
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-60 blur-xl" />
                  <div className="relative rounded-xl md:rounded-2xl overflow-hidden p-2 md:p-3">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg md:rounded-xl bg-slate-100 dark:bg-slate-800 platform-screenshot-img-wrap">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="object-contain object-top platform-screenshot-img"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1440px"
                        quality={80}
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                    <div className={`mt-3 md:mt-4 flex items-center gap-2 ${textDesc}`}>
                      {slide.icon && (
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {(() => {
                            const Icon = ICON_MAP[slide.icon];
                            return Icon ? <Icon className="h-4 w-4" /> : null;
                          })()}
                        </span>
                      )}
                      <p className="text-sm font-medium">{slide.caption}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-6 md:mt-8 text-center"
          >
            {currentSlide && (
              <>
                <div className="flex justify-center gap-2 mb-2">
                  {IconComponent && (
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <IconComponent className="h-5 w-5" />
                    </span>
                  )}
                  <h3 className={`text-lg md:text-xl font-semibold ${textTitle}`}>
                    {currentSlide.title}
                  </h3>
                </div>
                <p className={`${textDesc} max-w-2xl mx-auto text-sm md:text-base leading-relaxed`}>
                  {currentSlide.description}
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className={`h-11 w-11 rounded-full border-2 ${
                isDark
                  ? "border-white/30 hover:border-white hover:bg-white/10"
                  : "border-slate-200 dark:border-slate-600 hover:border-primary hover:bg-primary/5 dark:hover:border-primary dark:hover:bg-primary/10"
              }`}
              aria-label="Previous screenshot"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>
            <div className="flex gap-2" role="tablist" aria-label="Carousel slides">
              {PLATFORM_SCREENSHOTS.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "w-8 bg-primary"
                      : isDark
                        ? "w-2 bg-white/40 hover:bg-white/60"
                        : "w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                  }`}
                  aria-label={`Go to screenshot ${index + 1}`}
                  aria-selected={index === selectedIndex}
                  role="tab"
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className={`h-11 w-11 rounded-full border-2 ${
                isDark
                  ? "border-white/30 hover:border-white hover:bg-white/10"
                  : "border-slate-200 dark:border-slate-600 hover:border-primary hover:bg-primary/5 dark:hover:border-primary dark:hover:bg-primary/10"
              }`}
              aria-label="Next screenshot"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
