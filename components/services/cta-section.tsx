/**
 * Closing call-to-action band reused on services landing and marketing pages.
 * Primary and secondary actions point to contact flow and vendor signup placeholder.
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ServicesCtaSectionProps {
  /** Main heading (H2). */
  title: string;
  /** Supporting line under the title. */
  description?: string;
  /** Optional extra classes on the outer section. */
  className?: string;
}

/**
 * Renders a contrast panel with two large CTAs for conversion (Fitts’s Law: large targets).
 * @param props - Title, optional description, className.
 */
export function ServicesCtaSection({
  title,
  description,
  className,
}: ServicesCtaSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-secondary via-secondary to-secondary-800 px-6 py-12 text-center shadow-md sm:px-10 sm:py-16 dark:border-slate-700/80",
        className,
      )}
      aria-labelledby="services-cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #b98036 0%, transparent 45%), radial-gradient(circle at 80% 60%, #ffffff 0%, transparent 40%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl">
        <h2
          id="services-cta-heading"
          className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary-600 min-h-[48px] px-8"
          >
            <Link href="/services/request">Request a service</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="min-h-[48px] border-white/40 bg-white/10 text-white hover:bg-white/15 hover:text-white"
          >
            <Link href="/services/for-vendors">Join as vendor</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
