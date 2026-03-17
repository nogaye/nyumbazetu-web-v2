"use client";

/**
 * Site-wide footer: brand, product, solutions, company, resources, learn, legal.
 * Resources and Learn are separate columns so neither is too long. No Awards/status links (per audit).
 */

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SignalIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import {
  TwitterIcon,
  LinkedInIcon,
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@/components/social-icons";
import { AppStoreBadge, GooglePlayBadge } from "@/components/app-store-badges";
import { EXTERNAL_RESOURCES } from "@/lib/external-resources";
import { staggerContainer, staggerChild } from "@/lib/motion";

const footerLinks = {
  product: [
    { label: "Overview", href: "/product" },
    { label: "Features", href: "/features" },
    { label: "Integrations", href: "/integrations" },
    { label: "Compare Solutions", href: "/compare" },
  ],
  // features: [
  //   { label: "Automated Invoicing & Payment Reconciliation", href: "/features/collections" },
  //   { label: "Accounting & General Ledger", href: "/features/accounting" },
  //   { label: "Tenant & Owner Experience", href: "/features/tenant-experience" },
  //   { label: "Maintenance and Service Requests", href: "/features/maintenance" },
  //   { label: "Assets Management", href: "/features/assets-management" },
  //   { label: "Expense & Vendor Management", href: "/features/expense-vendor-management" },
  //   { label: "Tasks & Projects", href: "/features/tasks" },
  //   { label: "KRA eTIMS & Compliance", href: "/features/etims" },
  //   { label: "TPS & Rent-to-Own", href: "/features/tps" },
  //   { label: "Communication Hub", href: "/features/communications" },
  //   { label: "CRM", href: "/features/crm" },
  //   { label: "White Labeling", href: "/features/white-labeling" },
  //   { label: "Calendar & Event Scheduling", href: "/features/calendar-scheduling" },
  //   { label: "Webhooks & API Events", href: "/features/webhooks" },
  // ],
  solutions: [
    { label: "Landlords & Agents", href: "/solutions/landlords" },
    { label: "Property Managers", href: "/solutions/managers" },
    { label: "Committees & HOAs", href: "/solutions/committees" },
    { label: "Developers", href: "/solutions/developers" },
    { label: "Banks & SACCOS", href: "/solutions/banks" },
    { label: "Diaspora", href: "/solutions/diaspora" },
  ],
  /** Core resources: hub, blog, support, external status/docs. Kept short so footer column height matches others. */
  resources: [
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blogs" },
    { label: "FAQs", href: "/faqs" },
    { label: "Newsletters", href: "/newsletters" },
    {
      label: EXTERNAL_RESOURCES.status.label,
      href: EXTERNAL_RESOURCES.status.href,
      external: true,
    },
    {
      label: EXTERNAL_RESOURCES.docs.label,
      href: EXTERNAL_RESOURCES.docs.href,
      external: true,
    },
  ],
  /** Solution/guide landing pages; separate column so Resources column is not too long. */
  learn: [
    { label: "Property Management Kenya", href: "/property-management-software-kenya" },
    { label: "Rent Collection Software", href: "/rent-collection-software-kenya" },
    { label: "M-Pesa Rent Collection", href: "/mpesa-rent-collection" },
    { label: "HOA & Estate Management", href: "/hoa-management-software-kenya" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Request a demo", href: "/request-demo" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "Careers", href: "/careers" },
    { label: "Clients", href: "/clients" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Data Protection (ODPC)", href: "/compliance/odpc" },
  ],
};


/**
 * Footer link columns grid with scroll-triggered stagger animation.
 */
function FooterColumnsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-10 mb-12"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Brand Column — minimal: brand, one tagline, app badges, social links */}
      <motion.div
        className="sm:col-span-2 lg:col-span-1"
        variants={staggerChild}
      >
        <Link href="/" className="block mb-3">
          <div className="text-2xl font-bold text-white">Nyumba Zetu</div>
        </Link>

        <div className="mb-4 flex flex-col gap-2">
          <Link
            href="https://apps.apple.com/us/app/nyumba-zetu/id6456750559"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-all duration-200 hover:scale-105 hover:opacity-90"
          >
            <AppStoreBadge className="h-10 w-auto" />
          </Link>
          <div className="pointer-events-none">
            <GooglePlayBadge className="h-10 w-auto" disabled={true} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/nyumbazetu.ke/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-primary transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
            aria-label="Follow us on Facebook"
          >
            <FacebookIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.twitter.com/nyumbazetu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-primary transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
            aria-label="Follow us on Twitter"
          >
            <TwitterIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/nyumbazetu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-primary transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
            aria-label="Follow us on Instagram"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/company/nyumba-zetu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-primary transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
            aria-label="Follow us on LinkedIn"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.youtube.com/@nyumbazetu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-primary transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
            aria-label="Subscribe on YouTube"
          >
            <YouTubeIcon className="h-5 w-5" />
          </a>
        </div>
      </motion.div>
      {/* Product Column */}
      <motion.div variants={staggerChild}>
        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
          Product
        </h3>
        <ul className="space-y-3">
          {footerLinks.product.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-slate-200 hover:text-primary transition-all duration-200 relative group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
      {/* Solutions Column */}
      <motion.div variants={staggerChild}>
        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
          Solutions
        </h3>
        <ul className="space-y-3">
          {footerLinks.solutions.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-slate-200 hover:text-primary transition-all duration-200 relative group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
      {/* Company Column */}
      <motion.div variants={staggerChild}>
        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
          Company
        </h3>
        <ul className="space-y-3">
          {footerLinks.company.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-slate-200 hover:text-primary transition-all duration-200 relative group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
      {/* Resources Column */}
      <motion.div variants={staggerChild}>
        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
          Resources
        </h3>
        <ul className="space-y-3">
          {footerLinks.resources.map((link) => (
            <li key={link.label}>
              {"external" in link && link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-200 hover:text-primary transition-all duration-200 relative group inline-block"
                  aria-label={
                    link.label === EXTERNAL_RESOURCES.status.label
                      ? `${link.label} – ${EXTERNAL_RESOURCES.status.description}`
                      : link.label === EXTERNAL_RESOURCES.docs.label
                        ? `${link.label} – ${EXTERNAL_RESOURCES.docs.description}`
                        : undefined
                  }
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-sm text-slate-200 hover:text-primary transition-all duration-200 relative group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
      {/* Learn Column — solution/guide pages; split out so Resources column height matches others */}
      <motion.div variants={staggerChild}>
        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
          Learn
        </h3>
        <ul className="space-y-3">
          {footerLinks.learn.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-slate-200 hover:text-primary transition-all duration-200 relative group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
      {/* Legal Column */}
      <motion.div variants={staggerChild}>
        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
          Legal
        </h3>
        <ul className="space-y-3">
          {footerLinks.legal.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-slate-200 hover:text-primary transition-all duration-200 relative group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-slate-800 bg-slate-950 overflow-hidden">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.03] animate-gradient-shift pointer-events-none" />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
        {/* Footer columns: Brand, Product, Solutions, Company, Resources, Learn, Legal */}
        <FooterColumnsGrid />

        {/* Bottom Bar */}
        <div className="relative border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400 text-center md:text-left">
            © {new Date().getFullYear()} Nyumba Zetu. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 hover:text-primary transition-all duration-200 relative group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ))}

            {/* System Status – links to status.nyumbazetu.com; status icon with throbbing green like operational indicator */}
            <a
              href={EXTERNAL_RESOURCES.status.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded"
              aria-label="System Status – check platform uptime and incidents"
            >
              <div className="relative flex-shrink-0 flex items-center justify-center">
                <span className="absolute inline-flex h-4 w-4 rounded-full bg-green-500/40 animate-ping" aria-hidden />
                <SignalIcon className="h-4 w-4 text-green-500 animate-pulse stroke-[2.5]" aria-hidden />
              </div>
              <span className="text-xs">All Systems Operational</span>
            </a>
            {/* Documentation – links to docs.nyumbazetu.com */}
            <a
              href={EXTERNAL_RESOURCES.docs.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded"
              aria-label={`${EXTERNAL_RESOURCES.docs.label} – ${EXTERNAL_RESOURCES.docs.description}`}
            >
              <BookOpenIcon className="h-4 w-4 flex-shrink-0" aria-hidden />
              <span className="text-xs">Docs</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
