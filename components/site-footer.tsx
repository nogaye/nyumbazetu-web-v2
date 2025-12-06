"use client";

import Link from "next/link";
import { TwitterIcon, LinkedInIcon, FacebookIcon, InstagramIcon } from "@/components/social-icons";
import { useEffect, useState } from "react";

const footerLinks = {
  product: [
    { label: "Overview", href: "/product" },
    { label: "Features", href: "/features" },
    { label: "Integrations", href: "/product#integrations" },
    { label: "Compare", href: "/compare" },
  ],
  features: [
    { label: "Rent & Service Charge Collections", href: "/features/collections" },
    { label: "Accounting & General Ledger", href: "/features/accounting" },
    { label: "Tenant & Owner Experience", href: "/features/tenant-experience" },
    { label: "Maintenance & Assets", href: "/features/maintenance" },
    { label: "Tasks & Projects", href: "/features/tasks" },
    { label: "KRA eTIMS & Compliance", href: "/features/etims" },
    { label: "TPS & Rent-to-Own", href: "/features/tps" },
    { label: "Communication Hub", href: "/features/communications" },
    { label: "CRM", href: "/features/crm" },
    { label: "White Labeling", href: "/features/white-labeling" },
    { label: "Calendar & Event Scheduling", href: "/features/calendar-scheduling" },
    { label: "Webhooks & API Events", href: "/features/webhooks" },
  ],
  solutions: [
    { label: "Landlords & Agents", href: "/solutions/landlords" },
    { label: "Property Managers", href: "/solutions/managers" },
    { label: "Committees & HOAs", href: "/solutions/committees" },
    { label: "Developers", href: "/solutions/developers" },
    { label: "Banks & SACCOS", href: "/solutions/banks" },
    { label: "Diaspora", href: "/solutions/diaspora" },
  ],
  resources: [
    { label: "Blog", href: "/blogs" },
    { label: "Guides", href: "/resources" },
    { label: "Case Studies", href: "/resources" },
    { label: "Webinars", href: "/resources" },
    { label: "Newsletters", href: "/newsletters" },
    { label: "FAQs", href: "/faqs" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Events", href: "/events" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  awards: [
    { label: "Best Property Tech Solution 2024", href: "/awards" },
    { label: "Innovation in Real Estate", href: "/awards" },
    { label: "Excellence in Fintech", href: "/awards" },
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

export function SiteFooter() {
  const [stars, setStars] = useState<Array<{
    id: number;
    top: number;
    left: number;
    delay: number;
    duration: number;
  }>>([]);
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
                bottom: '-10px',
                animation: `float-up ${15 + i * 2}s linear infinite`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
        {/* All Footer Items in One Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-10 mb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="block mb-4">
              <div className="text-2xl font-bold text-white">
                Nyumba Zetu
              </div>
            </Link>
            <p className="text-sm text-slate-200 mb-2 leading-relaxed">
              Property management infrastructure for modern Kenyan real estate.
            </p>
            <p className="text-xs text-slate-300 mb-4">
              🇰🇪 Proudly built in Kenya for African real estate.
            </p>
           
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
          </div>

          {/* Product Column */}
          <div>
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
          </div>

          {/* Features Column - All features in one column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Features
            </h3>
            <ul className="space-y-3">
              {footerLinks.features.map((link) => (
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
          </div>

          {/* Solutions Column */}
          <div>
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
          </div>

          {/* Company Column */}
          <div>
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
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
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
          </div>

          {/* Awards Column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Awards
            </h3>
            <ul className="space-y-3">
              {footerLinks.awards.map((link) => (
                <li key={link.label}>
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400 text-center md:text-left">
            © {new Date().getFullYear()} Nyumba Zetu. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
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
          </div>
        </div>
      </div>
    </footer>
  );
}

