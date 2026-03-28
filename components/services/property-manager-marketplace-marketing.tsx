/**
 * Static marketing blocks below the interactive marketplace on `/services/property-managers`.
 *
 * Owner benefits, manager acquisition copy, testimonials, FAQ (semantic details/summary),
 * and a dual-path closing CTA. Kept as a server component for straightforward SEO markup.
 */

import Link from "next/link";
import {
  ArrowPathIcon,
  BuildingLibraryIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

const OWNER_BENEFITS = [
  {
    title: "Compare trusted firms in one place",
    body: "See coverage, fee models, and response standards side by side instead of piecing together PDFs and cold emails.",
    icon: BuildingLibraryIcon,
  },
  {
    title: "Reviews tied to real portfolios",
    body: "Ratings and comments are framed around ongoing management — not one-off repair jobs.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: "Match by property type",
    body: "Filter for student housing, short-stay, commercial, or estate programmes so shortlists stay relevant.",
    icon: ChartBarIcon,
  },
  {
    title: "Less outreach, faster shortlists",
    body: "Request consultations from serious operators without repeating your portfolio story from scratch.",
    icon: ArrowPathIcon,
  },
];

const MANAGER_BENEFITS = [
  {
    title: "High-intent landlord traffic",
    body: "Reach owners actively comparing operators — not generic directory browsers.",
    icon: UserGroupIcon,
  },
  {
    title: "Trust-forward profiles",
    body: "Verified badges, certifications, and structured service lines help you stand out credibly.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Show portfolio depth",
    body: "Highlight units managed, geographies, and languages so enterprise owners see fit fast.",
    icon: GlobeAltIcon,
  },
  {
    title: "Grow management mandates",
    body: "Featured placement and consultation CTAs turn interest into qualified conversations.",
    icon: SparklesIcon,
  },
];

const TESTIMONIALS = [
  {
    quote: "We found a better property manager in under a day.",
    name: "N. Wambui",
    role: "Landlord, Nairobi",
  },
  {
    quote: "The comparison experience made it easy to choose — same questions, consistent answers.",
    name: "K. Thuo",
    role: "Family office, multi-city",
  },
  {
    quote: "Great visibility for our property management company without chasing every RFP.",
    name: "Operations lead",
    role: "Regional PM firm",
  },
];

/** FAQ entries shared with `page.tsx` JSON-LD. */
export const PROPERTY_MANAGER_MARKETPLACE_FAQ: { q: string; a: string }[] = [
  {
    q: "How do I choose the right property manager?",
    a: "Start with property type and geography filters, then compare pricing models, response standards, and review themes. Use consultations to validate cultural fit and reporting depth before you transfer mandates.",
  },
  {
    q: "How are property managers verified?",
    a: "Nyumba Zetu will apply identity, reference, and documentation checks before issuing verified badges. This preview uses mock badges to illustrate the experience.",
  },
  {
    q: "Can I contact multiple managers?",
    a: "Yes. You can shortlist several firms and request consultations or introductions in parallel — compare proposals on a like-for-like basis.",
  },
  {
    q: "Do property managers specialize by property type?",
    a: "Many do. Use property type filters for residential, commercial, student housing, short-stay, estates, and mixed-use so you only see relevant operators.",
  },
  {
    q: "How do pricing models work?",
    a: "Common models include a percentage of rent, fixed monthly retainers, per-unit fees, or fully custom enterprise agreements. Each profile summarises its approach; detailed fees are agreed after discovery.",
  },
  {
    q: "Can I list my company on the marketplace?",
    a: "Yes. Submit your firm through the contact flow; we will onboard verified property management providers as the network opens region by region.",
  },
];

/**
 * Renders all post-directory marketing sections for the property manager marketplace route.
 */
export function PropertyManagerMarketplaceMarketing() {
  return (
    <>
      <section
        className="border-t border-slate-200/80 bg-slate-50/50 py-16 dark:border-slate-800 dark:bg-slate-950/40 lg:py-24"
        aria-labelledby="why-marketplace-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="why-marketplace-heading"
            className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
          >
            Why use this marketplace
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Built for landlords and owners who want a serious, structured way to evaluate property
            management partners — not a noisy trades directory.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OWNER_BENEFITS.map(({ title, body, icon: Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/45"
              >
                <Icon className="h-8 w-8 text-primary" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold text-secondary dark:text-slate-100">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 lg:py-24"
        aria-labelledby="why-list-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="why-list-heading"
            className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
          >
            Why list your company
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Property managers join to win mandates from informed owners — with profiles that showcase
            depth, compliance, and performance signals.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {MANAGER_BENEFITS.map(({ title, body, icon: Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700/90 dark:bg-slate-900/45"
              >
                <Icon className="h-8 w-8 text-primary" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold text-secondary dark:text-slate-100">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">List your company</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Become a featured manager</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        className="border-y border-slate-200/80 bg-white py-16 dark:border-slate-800 dark:bg-slate-950/30 lg:py-24"
        aria-labelledby="testimonials-pm-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="testimonials-pm-heading"
            className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
          >
            What owners and firms say
          </h2>
          <p className="mt-2 text-muted-foreground">
            Sample social proof for the preview experience.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.quote}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-6 dark:border-slate-700/90 dark:bg-slate-900/40"
              >
                <p className="text-lg font-medium leading-relaxed text-secondary dark:text-slate-100">
                  “{t.quote}”
                </p>
                <footer className="mt-4 text-sm text-muted-foreground">
                  <cite className="not-italic font-semibold text-foreground">{t.name}</cite>
                  <span className="block text-xs">{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 lg:py-24"
        aria-labelledby="faq-pm-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2
            id="faq-pm-heading"
            className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-muted-foreground">
            Answers for owners and property managers exploring the marketplace.
          </p>
          <div className="mt-10 space-y-3">
            {PROPERTY_MANAGER_MARKETPLACE_FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-slate-200/90 bg-white open:shadow-sm dark:border-slate-700/90 dark:bg-slate-900/40"
              >
                <summary className="cursor-pointer list-none px-5 py-4 font-display font-semibold text-secondary outline-none marker:content-none dark:text-slate-100 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {item.q}
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </span>
                </summary>
                <div className="border-t border-slate-200/80 px-5 pb-4 pt-3 text-sm leading-relaxed text-muted-foreground dark:border-slate-700/80">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-slate-200/80 bg-gradient-to-b from-slate-50 to-white py-16 dark:border-slate-800 dark:from-slate-950 dark:to-slate-950 lg:py-24"
        aria-labelledby="final-cta-pm-heading"
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id="final-cta-pm-heading"
            className="font-display text-2xl font-bold text-secondary dark:text-slate-100 sm:text-3xl"
          >
            Ready to move forward?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Whether you are hiring a property manager or growing your management practice, start with
            a short conversation with our team.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="min-h-[48px] px-8">
              <Link href="#browse-managers">Find a property manager</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-[48px] px-8">
              <Link href="/contact">List your property management company</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
