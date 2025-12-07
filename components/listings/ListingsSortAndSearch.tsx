"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SortOption } from "@/lib/listings/types";
import { useState, useEffect } from "react";

interface ListingsSortAndSearchProps {
  currentSort?: SortOption;
  currentSearch?: string;
  total: number;
}

export function ListingsSortAndSearch({
  currentSort = "recommended",
  currentSearch = "",
  total,
}: ListingsSortAndSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(currentSearch);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const updateSort = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === "recommended") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }
    params.delete("page"); // Reset to page 1 when sorting
    router.push(`/listings?${params.toString()}`);
  };

  const updateSearch = (search: string) => {
    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer for debounced search
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }
      params.delete("page"); // Reset to page 1 when searching
      router.push(`/listings?${params.toString()}`);
    }, 500); // 500ms debounce

    setDebounceTimer(timer);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  if (total === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="text"
          placeholder="Search properties..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            updateSearch(e.target.value);
          }}
          className="pl-10"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600 dark:text-slate-400">Sort:</span>
        <select
          value={currentSort}
          onChange={(e) => updateSort(e.target.value)}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
          aria-label="Sort listings"
        >
          <option value="recommended">Recommended</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}

