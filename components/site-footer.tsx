"use client";

/**
 * Site-wide footer: brand, product, solutions, company, resources, legal.
 * No Awards/status links (per audit); single canonical contact and taglines.
 */

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  TwitterIcon,
  LinkedInIcon,
  FacebookIcon,
  InstagramIcon,
} from "@/components/social-icons";
import { AppStoreBadge, GooglePlayBadge } from "@/components/app-store-badges";
import { EXTERNAL_RESOURCES } from "@/lib/external-resources";
import { useEffect, useState } from "react";
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

// Generate random stars
function generateStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2,
  }));
}

/**
 * Footer link columns grid with scroll-triggered stagger animation.
 */
function FooterColumnsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 mb-12"
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
            href="https://twitter.com/nyumbazetu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-primary transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
            aria-label="Follow us on Twitter"
          >
            <TwitterIcon className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/company/nyumbazetu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-primary transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
            aria-label="Follow us on LinkedIn"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com/nyumbazetu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-primary transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
            aria-label="Follow us on Facebook"
          >
            <FacebookIcon className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com/nyumbazetu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-primary transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
            aria-label="Follow us on Instagram"
          >
            <InstagramIcon className="h-5 w-5" />
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
  const [stars, setStars] = useState<
    Array<{
      id: number;
      top: number;
      left: number;
      delay: number;
      duration: number;
    }>
  >([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStars(generateStars(50));
  }, []);

  return (
    <footer className="relative border-t border-slate-800 bg-slate-950 overflow-hidden">
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50 animate-gradient-shift pointer-events-none" />

      {/* Twinkling Stars Background */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                animation: `twinkle ${star.duration}s ease-in-out infinite`,
                animationDelay: `${star.delay}s`,
                opacity: 0.2,
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-primary/20 rounded-full blur-sm"
              style={{
                left: `${10 + i * 12}%`,
                bottom: "-10px",
                animation: `float-up ${15 + i * 2}s linear infinite`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
        {/* Footer columns: Brand, Product, Solutions, Company, Resources, Legal */}
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

            {/* System Status – links to status.nyumbazetu.com */}
            <a
              href={EXTERNAL_RESOURCES.status.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded"
              aria-label="System Status – check platform uptime and incidents"
            >
              <div className="relative flex-shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-xs">All Systems Operational</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
