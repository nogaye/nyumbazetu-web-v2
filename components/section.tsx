/**
 * Reusable section wrapper with consistent max-width, padding, and semantics.
 * Used across marketing pages to contain content in a 7xl container with responsive padding.
 */
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-12 md:py-16 lg:py-20", className)}
      aria-label={id ? undefined : "Content section"}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

