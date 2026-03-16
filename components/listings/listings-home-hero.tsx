"use client";

/**
 * Listings marketplace homepage hero: headline and location search only.
 * Search-first, conversion-focused. Uses framer-motion for staggered entrance animations.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { staggerContainer, staggerChild } from "@/lib/motion";
import { AfricanPatternBackground } from "@/components/design-system";

export function ListingsHomeHero() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("city", location.trim());
    router.push(`/listings/search?${params.toString()}`);
  };

  return (
    <section
      className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800"
      aria-label="Search properties"
    >
      {/* Base gradient: warm savannah tint on listings for stronger African identity */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#f5efe6] via-[#faf6f0] to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
        aria-hidden
      />
      {/* Soft color orbs — blue/indigo and warm accent for visual interest */}
      <div
        className="absolute -left-[20%] top-0 h-[70%] w-[60%] rounded-full bg-gradient-to-br from-blue-200/40 to-indigo-300/30 blur-3xl dark:from-blue-950/50 dark:to-indigo-900/40"
        aria-hidden
      />
      <div
        className="absolute -right-[15%] top-1/4 h-[50%] w-[50%] rounded-full bg-gradient-to-tl from-amber-100/50 to-orange-100/30 blur-3xl dark:from-amber-950/30 dark:to-orange-900/20"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-1/2 h-[40%] w-[80%] -translate-x-1/2 rounded-full bg-gradient-to-t from-slate-200/60 to-transparent blur-2xl dark:from-slate-800/50"
        aria-hidden
      />
      {/* Subtle radial vignette to keep focus on center content */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_0%,rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_0%,rgba(15,23,42,0.5)_100%)]"
        aria-hidden
      />
      {/* Fine grain overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <AfricanPatternBackground
        className="absolute inset-0"
        variant="diamond"
        opacity={0.28}
        dark={false}
      />

      <motion.div
        className="relative mx-auto flex max-w-[1000px] flex-col items-center px-4 pt-8 pb-6 sm:px-6 sm:pt-10 sm:pb-6 lg:px-8 lg:pt-12 lg:pb-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
      >
        {/* Headline and subtitle — centered */}
        <motion.header className="text-center" variants={staggerChild}>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl lg:text-4xl lg:leading-tight">
            Find your next home
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            Browse verified properties to rent, buy or short stay across Kenya
          </p>
        </motion.header>

        {/* Search card — centered */}
        <motion.form onSubmit={handleSearch} className="mt-5 w-full max-w-xl sm:mt-6" variants={staggerChild}>
          <Card className="shadow-md sm:shadow-lg">
            <CardContent className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:gap-3 sm:p-4">
              <div className="relative flex-1 min-w-0">
                <Search
                  className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none"
                  aria-hidden
                />
                <Input
                  type="text"
                  placeholder="City or area (e.g. Nairobi, Kilimani)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-11 pl-10 pr-3 text-sm placeholder:text-slate-400 sm:h-12"
                  aria-label="Search by city or area"
                />
              </div>
              <Button
                type="submit"
                size="default"
                className="h-11 shrink-0 gap-2 sm:h-12 sm:px-6 bg-[#344767] hover:bg-[#2a3952] text-white font-medium text-sm"
              >
                <Search className="h-4 w-4" aria-hidden />
                Search
              </Button>
            </CardContent>
          </Card>
        </motion.form>
      </motion.div>
    </section>
  );
}
