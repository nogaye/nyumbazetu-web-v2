"use client";

/**
 * Listings marketplace homepage hero: headline, location search, purpose tabs (Rent/Buy/etc.),
 * quick filters and "Post Listing" CTA. Search-first, conversion-focused.
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const PURPOSE_TABS = [
  { value: "rent", label: "Rent" },
  { value: "buy", label: "Buy" },
  { value: "short_stay", label: "Short stay" },
  { value: "commercial", label: "Commercial" },
] as const;

const QUICK_LOCATIONS = [
  { label: "Nairobi", city: "nairobi" },
  { label: "Mombasa", city: "mombasa" },
  { label: "Kisumu", city: "kisumu" },
];

export function ListingsHomeHero() {
  const router = useRouter();
  const [purpose, setPurpose] = useState<(typeof PURPOSE_TABS)[number]["value"]>("rent");
  const [location, setLocation] = useState("");
  /** Defer Radix Tabs until after mount to avoid SSR/client ID mismatch (aria-controls/id). */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (purpose) params.set("listingPurpose", purpose);
    if (location.trim()) params.set("city", location.trim());
    router.push(`/listings/search?${params.toString()}`);
  };

  return (
    <section
      className="relative overflow-hidden border-b border-slate-200/80 bg-slate-100/80 dark:border-slate-800 dark:bg-slate-900/80"
      aria-label="Search properties"
    >
      <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Headline and subtitle */}
        <header className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Find your next home
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg sm:mt-5">
            Browse verified properties to rent, buy or short stay across Kenya
          </p>
        </header>

        {/* Search card */}
        <form onSubmit={handleSearch} className="mx-auto mt-10 max-w-2xl sm:mt-12">
          <Card className="shadow-md sm:shadow-lg">
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
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
                  className="h-12 pl-11 pr-4 text-base placeholder:text-slate-400 sm:h-14"
                  aria-label="Search by city or area"
                />
              </div>
              <Button
                type="submit"
                size="default"
                className="h-12 shrink-0 gap-2 sm:h-14 sm:px-8 bg-[#344767] hover:bg-[#2a3952] text-white font-medium"
              >
                <Search className="h-4 w-4" aria-hidden />
                Search
              </Button>
            </CardContent>
          </Card>
        </form>

        {/* Purpose tabs: rendered only after mount to avoid Radix ID hydration mismatch */}
        {mounted ? (
          <Tabs value={purpose} onValueChange={(v) => setPurpose(v as typeof purpose)} className="mt-8 sm:mt-10">
            <TabsList className="inline-flex h-auto flex-wrap justify-center gap-2 rounded-xl bg-transparent p-0">
              {PURPOSE_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "rounded-lg px-5 py-2.5 text-sm font-medium transition-colors",
                    "data-[state=active]:bg-[#344767] data-[state=active]:text-white data-[state=active]:shadow-sm",
                    "data-[state=inactive]:bg-white data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:bg-slate-50",
                    "dark:data-[state=inactive]:bg-slate-800/90 dark:data-[state=inactive]:text-slate-300 dark:data-[state=inactive]:hover:bg-slate-700/80",
                    "border border-slate-200/80 dark:border-slate-700/80"
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        ) : (
          <div className="mt-8 sm:mt-10" aria-hidden>
            <div className="inline-flex h-auto flex-wrap justify-center gap-2 rounded-xl bg-transparent p-0">
              {PURPOSE_TABS.map((tab) => (
                <span
                  key={tab.value}
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors",
                    "border-slate-200/80 dark:border-slate-700/80",
                    tab.value === "rent"
                      ? "bg-[#344767] text-white shadow-sm"
                      : "bg-white text-slate-600 dark:bg-slate-800/90 dark:text-slate-300"
                  )}
                >
                  {tab.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Popular locations */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-1 gap-y-1 sm:mt-10">
          <span className="text-sm text-slate-500 dark:text-slate-400">Popular:</span>
          {QUICK_LOCATIONS.map((loc, i) => (
            <span key={loc.city} className="inline-flex items-center gap-1">
              {i > 0 && <span className="text-slate-300 dark:text-slate-600" aria-hidden>·</span>}
              <Button
                type="button"
                variant="link"
                className="h-auto p-0 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 underline-offset-4"
                onClick={() => {
                  setLocation(loc.label);
                  router.push(`/listings/search?city=${encodeURIComponent(loc.city)}`);
                }}
              >
                {loc.label}
              </Button>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
