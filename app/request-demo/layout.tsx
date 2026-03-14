import { Metadata } from "next";

/**
 * Layout for the Request a Demo page. Provides metadata only; no shared UI.
 */

export const metadata: Metadata = {
  title: "Request a Demo | Nyumba Zetu",
  description:
    "Book a 15 or 30-minute demo with our team. See how Nyumba Zetu can transform your property operations.",
};

export default function RequestDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
