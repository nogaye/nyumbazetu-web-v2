"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const heroSlides = [
  {
    id: 1,
    title: "Property management infrastructure for modern Kenyan real estate.",
    description: "Full-stack platform for property operations, accounting, and tenant experience—built specifically for Kenya.",
    highlights: [
      "End-to-end rent and service charge collections with M-Pesa, bank, and wallet flows",
      "Accounting-grade general ledger with journals, ledgers, trial balance, P&L, balance sheet",
      "Tenant and owner portals, mobile apps, and WhatsApp chatbot",
      "KRA eTIMS-ready invoicing and tax-compliant workflows",
    ],
    ctaPrimary: "Request a demo",
    ctaPrimaryHref: "/contact",
    ctaSecondary: "Explore the platform",
    ctaSecondaryHref: "/product",
  },
  {
    id: 2,
    title: "Built for Kenya from day one.",
    description: "M-Pesa, service charge, committees, KRA eTIMS—everything designed for the local market.",
    highlights: [
      "Native M-Pesa integration with real-time reconciliation",
      "Service charge management for estates and apartments",
      "Committee workflows for HOAs and housing estates",
      "KRA eTIMS compliance built-in from day one",
    ],
    ctaPrimary: "See how it works",
    ctaPrimaryHref: "/product",
    ctaSecondary: "View solutions",
    ctaSecondaryHref: "/solutions",
  },
  {
    id: 3,
    title: "Accounting-first architecture for serious property teams.",
    description: "Every transaction posts correctly to a general ledger. Audit-ready financial records from day one.",
    highlights: [
      "Double-entry accounting system with automated journal entries",
      "Real-time trial balance, P&L, and balance sheet reports",
      "Export to QuickBooks and other accounting tools",
      "Full audit trail for every transaction",
    ],
    ctaPrimary: "Learn about accounting",
    ctaPrimaryHref: "/features/accounting",
    ctaSecondary: "Request a demo",
    ctaSecondaryHref: "/contact",
  },
  {
    id: 4,
    title: "Transform tenant and owner experience with modern portals.",
    description: "Self-service portals, mobile apps, and WhatsApp chatbot for seamless engagement.",
    highlights: [
      "Tenant and owner self-service portals with real-time dashboards",
      "Native mobile apps for iOS and Android platforms",
      "WhatsApp chatbot for instant support and payment confirmations",
      "Automated notifications and communication workflows",
    ],
    ctaPrimary: "Explore tenant experience",
    ctaPrimaryHref: "/features/tenant-experience",
    ctaSecondary: "Request a demo",
    ctaSecondaryHref: "/contact",
  },
  {
    id: 5,
    title: "Trusted by serious property teams, estates, and banks.",
    description: "500+ properties under management. 100,000+ transactions annually. 20–30% increase in collections.",
    highlights: [
      "500+ properties under management across Kenya",
      "100,000+ rent transactions processed annually",
      "20–30% increase in on-time collections for our customers",
      "Trusted by banks, SACCOS, and major property management companies",
    ],
    ctaPrimary: "View case studies",
    ctaPrimaryHref: "/resources",
    ctaSecondary: "Request a demo",
    ctaSecondaryHref: "/contact",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative bg-white dark:bg-slate-950 overflow-hidden min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"></div>
      
      {/* Carousel Container */}
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-20 md:py-28 lg:py-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-slate-900 dark:text-slate-50">
              {currentSlideData.title}
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              {currentSlideData.description}
            </p>

            {/* Key Features - Always Visible */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 md:p-8 mb-8 border border-slate-200 dark:border-slate-800 max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4 text-left">
                Key Features
              </h3>
              <ul className="space-y-3 text-left">
                {currentSlideData.highlights.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircleIcon className="h-5 w-5 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg" 
                className="bg-[#b98036] hover:bg-[#a06f2d] text-white focus-visible:ring-[#b98036] min-w-[180px]" 
                asChild
                aria-label={`${currentSlideData.ctaPrimary} - ${currentSlideData.title}`}
              >
                <Link href={currentSlideData.ctaPrimaryHref}>{currentSlideData.ctaPrimary}</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-slate-400 min-w-[180px]" 
                asChild
                aria-label={`${currentSlideData.ctaSecondary} - ${currentSlideData.title}`}
              >
                <Link href={currentSlideData.ctaSecondaryHref}>{currentSlideData.ctaSecondary}</Link>
              </Button>
            </div>

            {/* Trust indicator */}
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-8">
              Built in Kenya. Trusted by property teams, estates, and banks.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-md hover:shadow-lg transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-md hover:shadow-lg transition-all"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2" role="tablist" aria-label="Carousel slides">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-[#b98036]"
                : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === currentSlide}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
}
