import Link from "next/link";

const footerLinks = {
  product: [
    { label: "Overview", href: "/product" },
    { label: "Features", href: "/features" },
    { label: "Integrations", href: "/product#integrations" },
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
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          <div className="col-span-2">
            <Link href="/" className="block mb-4">
              <div className="text-2xl font-bold text-[#344767]">
                Nyumba Zetu
              </div>
            </Link>
            <p className="text-sm text-slate-600 mb-4">
              Property management infrastructure for modern Kenyan real estate.
            </p>
            <p className="text-xs text-slate-500">
              Built in Kenya for African real estate.
            </p>
            <div className="mt-4 flex items-center space-x-1">
              <div className="h-3 w-12 bg-gradient-to-r from-[#006600] via-[#FF0000] to-[#000000] rounded-sm"></div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#b98036] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Solutions</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#b98036] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#b98036] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#b98036] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Nyumba Zetu. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
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

