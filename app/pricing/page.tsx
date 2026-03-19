/**
 * Pricing page route module.
 *
 * This server component only defines route metadata and delegates interactive UI
 * concerns (billing toggle, dynamic price displays, and responsive pricing examples)
 * to the client-side pricing content component.
 */

import { PricingContent } from "@/app/pricing/pricing-content";

export const metadata = {
  title: "Pricing | Nyumba Zetu",
  description:
    "Paid plans start at KES 80 per unit/month (annual billing) or KES 100 per unit/month (monthly billing).",
};

/**
 * Renders the main pricing page: hero, plan cards (Standard, Premier, Enterprise),
 * FAQs, and contact CTA.
 */
export default function PricingPage() {
  return <PricingContent />;
}
