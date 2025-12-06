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
    { label: "Blog", href: "/resources" },
    { label: "Guides", href: "/resources" },
    { label: "Case Studies", href: "/resources" },
    { label: "Webinars", href: "/resources" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Pricing", href: "/pricing" },
    { label: "Compare", href: "/compare" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
        {/* All Footer Items in One Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="block mb-4">
              <div className="text-2xl font-bold text-[#344767] dark:text-slate-50">
                Nyumba Zetu
              </div>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
              Property management infrastructure for modern Kenyan real estate.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">
              Built in Kenya for African real estate.
            </p>
            <div className="mb-4 flex items-center space-x-1">
              <div className="h-3 w-12 bg-gradient-to-r from-[#006600] via-[#FF0000] to-[#000000] rounded-sm"></div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/nyumbazetu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#b98036] dark:hover:text-[#b98036] transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/nyumbazetu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#b98036] dark:hover:text-[#b98036] transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/nyumbazetu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#b98036] dark:hover:text-[#b98036] transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/nyumbazetu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#b98036] dark:hover:text-[#b98036] transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4 uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#b98036] dark:hover:text-[#b98036] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features Column - All features in one column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4 uppercase tracking-wider">
              Features
            </h3>
            <ul className="space-y-3">
              {footerLinks.features.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#b98036] dark:hover:text-[#b98036] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4 uppercase tracking-wider">
              Solutions
            </h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#b98036] dark:hover:text-[#b98036] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#b98036] dark:hover:text-[#b98036] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} Nyumba Zetu. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-[#b98036] dark:hover:text-[#b98036] transition-colors duration-200"
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

