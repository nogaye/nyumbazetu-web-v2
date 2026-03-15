"use client";

/**
 * Hero/header strip for the listings marketplace: headline, value line, search, and sort.
 * Uses design-system Select for sort. Renders result count when provided for visibility of system status.
 */

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "@/lib/listings/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest first" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "oldest", label: "Oldest first" },
];

interface ListingsHeaderStripProps {
  /** Current sort from URL. */
  currentSort?: SortOption;
  /** Current search query from URL. */
  currentSearch?: string;
  /** Total number of results (0 when none). */
  total: number;
}

export function ListingsHeaderStrip({
  currentSort = "recommended",
  currentSearch = "",
  total,
}: ListingsHeaderStripProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(currentSearch);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const updateSort = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === "recommended") params.delete("sort");
    else params.set("sort", sort);
    params.delete("page");
    router.push(`/listings?${params.toString()}`);
  };

  const updateSearch = (search: string) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search.trim()) params.set("search", search.trim());
      else params.delete("search");
      params.delete("page");
      router.push(`/listings?${params.toString()}`);
    }, 400);
    setDebounceTimer(timer);
  };

  useEffect(
    () => () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    },
    [debounceTimer]
  );

  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {/* Headline and value proposition */}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
              Find your next home
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Verified properties to rent or buy across Kenya
            </p>
          </div>

          {/* Search + sort row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-md">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <Input
                type="search"
                placeholder="Search by location or keyword…"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  updateSearch(e.target.value);
                }}
                className="h-11 rounded-lg border-slate-200 bg-slate-50/80 pl-10 text-sm dark:border-slate-700 dark:bg-slate-900/80"
                aria-label="Search properties"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {total >= 0 && (
                <p className="text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
                  {total === 0 ? (
                    "No properties found"
                  ) : (
                    <>
                      <span className="font-medium text-slate-900 dark:text-slate-50">
                        {total}
                      </span>{" "}
                      {total === 1 ? "property" : "properties"}
                    </>
                  )}
                </p>
              )}
              <Select
                value={currentSort}
                onValueChange={updateSort}
              >
                <SelectTrigger
                  className="h-11 w-[180px] rounded-lg border-slate-200 bg-slate-50/80 text-sm dark:border-slate-700 dark:bg-slate-900/80"
                  aria-label="Sort listings"
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
