"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const heroSlides = [
  {
    id: 1,
    title: "Property management infrastructure for modern Kenyan real estate.",
    subtitle: "Forget everything you know about property management systems.",
    description: "Nyumba Zetu is a full-stack platform for property operations, accounting, and tenant experience, built for landlords, property managers, committees, developers, and banks in Kenya.",
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
    visual: "dashboard",
  },
  {
    id: 2,
    title: "Built for Kenya from day one.",
    subtitle: "M-Pesa, service charge, committees, Kenyan regulations—everything designed for the local market.",
    description: "Unlike generic property management software, Nyumba Zetu was built specifically for Kenyan real estate operations, with deep integrations and workflows that match how property is managed in Kenya.",
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
    visual: "kenya",
  },
  {
    id: 3,
    title: "Accounting-first architecture for serious property teams.",
    subtitle: "Every transaction posts correctly to a general ledger. No shortcuts.",
    description: "Property management requires serious accounting. Nyumba Zetu ensures every invoice, payment, and adjustment posts correctly to a general ledger, giving you audit-ready financial records.",
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
    visual: "accounting",
  },
  {
    id: 4,
    title: "Transform tenant and owner experience with modern portals.",
    subtitle: "Self-service portals, mobile apps, and WhatsApp chatbot for seamless engagement.",
    description: "Modern tenants and owners expect self-service access to their property information. Nyumba Zetu provides dedicated portals and mobile apps that reduce support burden, improve satisfaction, and build trust through transparency.",
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
    visual: "experience",
  },
  {
    id: 5,
    title: "Trusted by serious property teams, estates, and banks.",
    subtitle: "From individual landlords to financial institutions—scaling with your portfolio.",
    description: "Nyumba Zetu serves property teams across Kenya, processing thousands of transactions monthly. Our platform helps teams increase collections, reduce administrative overhead, and provide better experiences for tenants and owners.",
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
    visual: "trust",
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
    <section className="relative bg-white dark:bg-slate-950 overflow-hidden min-h-[600px] md:min-h-[700px]">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"></div>
      
      {/* Carousel Container */}
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-24 md:py-32 lg:py-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Column - Copy */}
            <div className="text-slate-900 dark:text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {currentSlideData.title}
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#b98036]">
                {currentSlideData.subtitle}
              </h2>
              
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                {currentSlideData.description}
              </p>

              <ul className="space-y-4 mb-8">
                {currentSlideData.highlights.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircleIcon className="h-6 w-6 text-[#36b9a0] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button size="lg" className="bg-[#b98036] hover:bg-[#a06f2d]" asChild>
                  <Link href={currentSlideData.ctaPrimaryHref}>{currentSlideData.ctaPrimary}</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href={currentSlideData.ctaSecondaryHref}>{currentSlideData.ctaSecondary}</Link>
                </Button>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                Built in Kenya. Trusted by serious property teams, estates, and banks.
              </p>
            </div>

            {/* Right Column - Dashboard Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/90 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-slate-200 dark:border-white/20 shadow-2xl">
                {/* KPI Tiles */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Occupancy", value: "94%", icon: ChartBarIcon },
                    { label: "Collections", value: "98%", icon: CurrencyDollarIcon },
                    { label: "Tenants", value: "247", icon: UserGroupIcon },
                  ].map((kpi, idx) => {
                    const IconComponent = kpi.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className="bg-slate-50 dark:bg-white/10 rounded-lg p-4 border border-slate-200 dark:border-white/20"
                      >
                        <IconComponent className="h-5 w-5 text-[#b98036] mb-2" />
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">{kpi.label}</div>
                      </motion.div>
                    );
                  })}
                </div>

              {/* Collections Chart Area */}
              <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-4 mb-4 border border-slate-200 dark:border-white/10">
                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Collections Trend</div>
                  <div className="h-32 flex items-end justify-between gap-2">
                    {[65, 72, 68, 85, 78, 92, 88, 95].map((height, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.6 + idx * 0.05, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-[#b98036] to-[#e27d60] rounded-t"
                      />
                    ))}
                  </div>
                </div>

              {/* Tenant List Preview */}
              <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-4 border border-slate-200 dark:border-white/10">
                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Recent Transactions</div>
                <div className="space-y-2">
                  {["Unit 4A - Paid", "Unit 2B - Paid", "Unit 5C - Pending"].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + idx * 0.1 }}
                      className="flex justify-between text-sm text-slate-700 dark:text-slate-300"
                    >
                      <span>{item}</span>
                      <span className="text-[#36b9a0]">KES 25,000</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 backdrop-blur-sm border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white transition-all shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 backdrop-blur-sm border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white transition-all shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-[#b98036]"
                : "w-2 bg-slate-400 dark:bg-white/30 hover:bg-slate-500 dark:hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

