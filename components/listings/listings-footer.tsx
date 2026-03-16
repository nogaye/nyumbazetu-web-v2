"use client";

/**
 * Listings marketplace footer: dedicated footer for /listings/** with browse,
 * list-your-property, tools, and Nyumba Zetu links. Separate from main site footer.
 */

import Link from "next/link";

const BROWSE = [
  { label: "Apartments for Rent", href: "/listings/search?listingPurpose=rent&propertyType=apartment" },
  { label: "Houses for Sale", href: "/listings/search?listingPurpose=buy&propertyType=house" },
  { label: "Commercial Listings", href: "/listings/search?propertyType=commercial" },
  { label: "Short-Term Rentals", href: "/listings/search?listingPurpose=short_stay" },
  { label: "New Developments", href: "/listings/search?sort=newest" },
];

const LIST_PROPERTY = [
  { label: "Post a Listing", href: "/listings/post" },
  { label: "Pricing / Packages", href: "/listings/portal" },
  { label: "Listing Guidelines", href: "/listings/portal" },
  { label: "Manage Listings", href: "/listings/portal/my-listings" },
  { label: "Verified Listings", href: "/listings/search?verified=1" },
];

const TOOLS = [
  { label: "Saved Listings", href: "/listings/portal/favorites" },
  { label: "Property Alerts", href: "/listings/portal" },
  { label: "Viewing Requests", href: "/listings/portal/leads" },
  { label: "Help Center", href: "/contact" },
  { label: "Safety Tips", href: "/listings/portal" },
];

const NYUMBA_ZETU = [
  { label: "Main Website", href: "/" },
  { label: "Property Management Software", href: "/" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-3">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ListingsFooter() {
  return (
    <footer
      className="border-t border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/80"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          <FooterColumn title="Browse" links={BROWSE} />
          <FooterColumn title="List Your Property" links={LIST_PROPERTY} />
          <FooterColumn title="Tools" links={TOOLS} />
          <FooterColumn title="Nyumba Zetu" links={NYUMBA_ZETU} />
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Nyumba Zetu Listings · Find and list properties across Kenya
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Nyumba Zetu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
