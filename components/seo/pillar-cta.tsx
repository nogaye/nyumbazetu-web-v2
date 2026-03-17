/**
 * Shared CTA block for SEO pillar pages. Promotes request-demo and features
 * with consistent messaging and internal links for authority flow.
 */
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDaysIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface PillarCtaProps {
  /** Optional short headline override. */
  title?: string;
  /** Optional description override. */
  description?: string;
}

/**
 * Renders the standard pillar-page CTA: request demo and explore features.
 * Used at the bottom of SEO pillar pages to convert and link to key site sections.
 */
export function PillarCta({
  title = "Ready to streamline your property operations?",
  description = "See how Nyumba Zetu helps landlords, managers, and estates across Kenya with rent collection, accounting, and tenant management. Book a free demo.",
}: PillarCtaProps) {
  return (
    <Section className="bg-secondary">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-white leading-tight tracking-tight">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-white/95 mb-8 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary-600 text-primary-foreground" asChild>
            <Link href="/request-demo" className="flex items-center gap-2">
              Request a demo
              <CalendarDaysIcon className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50" asChild>
            <Link href="/features" className="flex items-center gap-2">
              Explore features
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
