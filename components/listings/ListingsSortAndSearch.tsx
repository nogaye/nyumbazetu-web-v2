"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { SortOption } from "@/lib/listings/types";
import { useState, useEffect } from "react";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

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
    router.push(`/listings/search?${params.toString()}`);
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
      router.push(`/listings/search?${params.toString()}`);
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

      {/* Sort Dropdown — shadcn Select */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600 dark:text-slate-400">Sort:</span>
        <Select value={currentSort} onValueChange={updateSort}>
          <SelectTrigger className="w-[180px]" aria-label="Sort listings">
            <SelectValue />
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
  );
}

