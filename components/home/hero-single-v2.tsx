/**
 * Homepage hero: server-rendered for fast LCP/FCP (no Framer Motion or Heroicons on the critical path).
 * Same copy and layout as before; pattern is inline SVG so the hero tree stays a Server Component.
 */

import Link from "next/link";

/** Credibility badge text; short trust statement above the headline. */
const BADGE = "Kenya's #1 property management platform";

/** Category-defining vision headline; signals platform/infrastructure positioning. */
const HEADLINE = "The operating system for African real estate";

/** Clear product explanation: what the platform does (vision → explanation). */
const SUBHEADLINE =
  "One platform for collections, accounting, tenant experience, and compliance. M-Pesa, bank, eTIMS—all integrated. Real-time visibility for every stakeholder.";

/** Social proof line; increases trust below the CTAs. */
const SOCIAL_PROOF =
  "Trusted by property managers, estates, developers, and banks across Kenya";

/** Stats shown in the hero for credibility and quick scanning. */
const HERO_STATS = [
  { value: "500+", label: "Properties managed" },
  { value: "95.3%", label: "Collection rate" },
  { value: "50k+", label: "Active tenants" },
];

/** Footnote clarifying that the collection rate is an average across the platform. */
const COLLECTION_RATE_FOOTNOTE =
  "95.3% is the average rent collection rate across all properties on Nyumba Zetu.";

/** Scroll indicator target (first section after hero). */
const SCROLL_TARGET_ID = "how-it-works";

/** Unique pattern id so multiple heroes on a page would not clash (single hero today). */
const HERO_PATTERN_ID = "hero-african-grid";

/**
 * Renders the Kente-like grid pattern used behind hero content (same geometry as design-system variant).
 * @param className - Wrapper classes (e.g. absolute inset-0).
 * @param opacity - Pattern layer opacity.
 */
function HeroAfricanPattern({
  className,
  opacity = 0.14,
}: {
  className?: string;
  opacity?: number;
}) {
  const stroke = "rgba(255,255,255,0.28)";
  return (
    <div className={`pointer-events-none select-none ${className ?? ""}`} aria-hidden>
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <defs>
          <pattern
            id={HERO_PATTERN_ID}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 12h24M12 0v24"
              fill="none"
              stroke={stroke}
              strokeWidth="0.6"
            />
            <circle cx="12" cy="12" r="1" fill={stroke} fillOpacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${HERO_PATTERN_ID})`} />
      </svg>
    </div>
  );
}

/**
 * Marketing homepage hero: gradient mesh, headline, CTAs, stats. Fully server-rendered for performance.
 */
export function HeroSingleV2() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950 dark:bg-slate-950">
      {/* Decorative layer: paint containment so blur/grain don't affect rest of page (better LCP/CLS). */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none [contain:paint]">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="hero-mesh-orb absolute -top-[40%] -right-[20%] w-[72vw] max-w-[720px] h-[72vw] max-h-[720px] rounded-full bg-primary/18 blur-[96px]" />
        <div
          className="hero-mesh-orb absolute -bottom-[30%] -left-[15%] w-[56vw] max-w-[540px] h-[56vw] max-h-[540px] rounded-full bg-secondary/12 blur-[84px]"
          style={{ animationDelay: "-7s" }}
        />
        <div className="absolute inset-0 grain" aria-hidden />
        <HeroAfricanPattern className="absolute inset-0" opacity={0.14} />
      </div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full pt-20 md:pt-28 pb-16 md:pb-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-8 px-4 py-2.5 rounded-full bg-primary/15 border border-primary/25 text-primary-foreground/90">
            <svg
              className="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM3.105 8.969a.75.75 0 01.593-.882l3.736-.671a.75.75 0 01.684.684l.671 3.736a.75.75 0 01-.593.882l-3.736.671a.75.75 0 01-.684-.684l-.671-3.736z"
                clipRule="evenodd"
              />
            </svg>
            <span>{BADGE}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 leading-[1.08] tracking-[-0.03em] text-white">
            {HEADLINE}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            {SUBHEADLINE}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/request-demo"
              className="relative overflow-hidden cta-shine-hover inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary-600 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Book a free demo
              <svg
                className="h-5 w-5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5"
                />
              </svg>
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-transparent px-8 py-3 text-base font-medium text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              See all features
              <svg
                className="h-5 w-5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          <div
            className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-16 mb-10"
            role="list"
            aria-label="Key metrics"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} role="listitem" className="text-center">
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 mb-6 max-w-xl mx-auto">
            {COLLECTION_RATE_FOOTNOTE}
          </p>

          <p className="text-sm text-slate-500">{SOCIAL_PROOF}</p>
        </div>
      </div>

      <a
        href={`#${SCROLL_TARGET_ID}`}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
        aria-label="Scroll to content"
      >
        <span className="text-xs font-medium uppercase tracking-wider">
          See how it works
        </span>
        <svg
          className="h-6 w-6 animate-scroll-bounce"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </a>
    </section>
  );
}
