/**
 * Shared layout wrapper for the vendor marketplace section under `/services`.
 * Sets a default title template so child pages only supply short titles.
 */

import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Vendor marketplace | Nyumba Zetu",
    default: "Vendor marketplace | Nyumba Zetu",
  },
  description:
    "Verified vendors for property maintenance in Kenya — plumbing, electrical, cleaning, and more. Compare quotes and track work (marketing preview).",
  openGraph: {
    title: "Nyumba Zetu vendor marketplace",
    description:
      "Find verified maintenance vendors for estates, landlords, and tenants. Request services or join as a vendor.",
  },
};

/**
 * Pass-through layout: chrome comes from root `LayoutShell` (MainNav + footer).
 * @param props.children - Page content for a `/services/**` route.
 */
export default function ServicesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
