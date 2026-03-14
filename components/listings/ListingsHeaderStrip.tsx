"use client";

/**
 * Compact header strip for the listings marketplace: headline and search/sort in one line.
 * Renders search input and sort dropdown; updates URL on change.
 */

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SortOption } from "@/lib/listings/types";

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
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

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
    <div className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
            Find a place
          </h1>
          <div className="flex flex-1 items-center gap-3 sm:max-w-md sm:flex-initial sm:justify-end">
            <div className="relative flex-1 sm:flex-initial sm:min-w-[220px]">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <Input
                type="search"
                placeholder="Search listings…"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  updateSearch(e.target.value);
                }}
                className="h-10 rounded-lg border-slate-200 bg-slate-50/80 pl-9 text-sm dark:border-slate-700 dark:bg-slate-900/80"
                aria-label="Search properties"
              />
            </div>
            <select
              value={currentSort}
              onChange={(e) => updateSort(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-slate-50/80 px-3 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300"
              aria-label="Sort listings"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
