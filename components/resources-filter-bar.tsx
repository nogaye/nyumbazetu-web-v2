/**
 * Filter bar for the Resources hub. Renders a row of links (as buttons) for
 * All, Blog, Guides, Case Studies, Webinars. The active filter is highlighted.
 * Used by app/resources/page.tsx.
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ResourceFilter } from "@/lib/resources/content";

export interface FilterOption {
  /** Value used in URL search param and to match current filter. */
  value: ResourceFilter;
  /** Label shown on the button (e.g. "Guides", "Case Studies"). */
  label: string;
}

export interface ResourcesFilterBarProps {
  /** Filter options to show (value + label). */
  options: FilterOption[];
  /** Currently active filter; used to highlight the matching button. */
  currentFilter: ResourceFilter;
  /** Base path for links (e.g. "/resources"). */
  basePath: string;
}

/** Builds href for a filter: basePath for "All", basePath?type=value otherwise. */
function hrefFor(basePath: string, value: ResourceFilter): string {
  if (value === "All") return basePath;
  return `${basePath}?type=${encodeURIComponent(value)}`;
}

/** Renders a horizontal bar of filter links with the active one styled as primary. */
export function ResourcesFilterBar({
  options,
  currentFilter,
  basePath,
}: ResourcesFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center" role="group" aria-label="Filter resources by type">
      {options.map(({ value, label }) => {
        const isActive = currentFilter === value;
        return (
          <Button
            key={value}
            asChild
            variant={isActive ? "default" : "outline"}
            size="sm"
            className={cn(!isActive && "aria-current-none")}
          >
            <Link
              href={hrefFor(basePath, value)}
              aria-current={isActive ? "true" : undefined}
            >
              {label}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
