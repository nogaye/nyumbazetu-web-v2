import Link from "next/link";
import { TwitterIcon, LinkedInIcon, FacebookIcon, InstagramIcon } from "@/components/social-icons";

const footerLinks = {
  product: [
    { label: "Overview", href: "/product" },
    { label: "Features", href: "/features" },
    { label: "Integrations", href: "/product#integrations" },
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
    { label: "Pricing", href: "/pricing" },
    { label: "Compare", href: "/compare" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Partner", href: "/partner" },
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

export function SiteFooter() {
  return (
    <footer className="border-t border-secondary/20 bg-secondary">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
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
                className="text-slate-300 hover:text-primary transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/nyumbazetu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-primary transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/nyumbazetu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-primary transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/nyumbazetu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-primary transition-colors duration-200"
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
                    className="text-sm text-slate-200 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
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
                    className="text-sm text-slate-200 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
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
                    className="text-sm text-slate-200 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
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
                    className="text-sm text-slate-200 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
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
                    className="text-sm text-slate-200 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
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
                    className="text-sm text-slate-200 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-300 text-center md:text-left">
            © {new Date().getFullYear()} Nyumba Zetu. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-300 hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

