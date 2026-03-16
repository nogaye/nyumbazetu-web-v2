"use client";

/**
 * Listings header: single horizontal row — title, search, result count, sort.
 * All filters and quick links (Nairobi, Mombasa, etc.) live in the left sidebar.
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
  currentSort?: SortOption;
  currentSearch?: string;
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
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-[1600px] px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Single horizontal row: title + subtitle | search | count | sort */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="shrink-0">
            <h1 className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-xl">
              Find your next home
            </h1>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              Verified properties to rent or buy across Kenya
            </p>
          </div>

          <div className="relative min-w-0 flex-1 sm:max-w-xs lg:max-w-sm">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Search…"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                updateSearch(e.target.value);
              }}
              className="h-9 w-full rounded-lg border-slate-200 bg-slate-50 pl-9 pr-2 text-sm dark:border-slate-700 dark:bg-slate-900/80"
              aria-label="Search properties"
            />
          </div>

          {total >= 0 && (
            <p className="shrink-0 text-sm text-slate-600 dark:text-slate-400 tabular-nums" aria-live="polite">
              {total === 0 ? (
                "No properties"
              ) : (
                <>
                  <span className="font-semibold text-slate-900 dark:text-slate-50">{total}</span>{" "}
                  {total === 1 ? "property" : "properties"}
                </>
              )}
            </p>
          )}

          <Select value={currentSort} onValueChange={updateSort}>
            <SelectTrigger
              className="h-9 w-[160px] shrink-0 rounded-lg border-slate-200 bg-slate-50 text-sm dark:border-slate-700 dark:bg-slate-900/80"
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
    </header>
  );
}
