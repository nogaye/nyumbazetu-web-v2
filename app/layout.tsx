import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { LayoutShell } from "@/components/layout-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { StructuredData } from "@/components/structured-data";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { IntercomProvider } from "@/components/intercom-provider";
import { AuthProvider } from "@/components/auth/auth-provider";

/** Body font; display: swap avoids invisible text (FOIT) and improves FCP/LCP. */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Display font for marketing headlines; distinctive and confident. Swap prevents FOIT. */
const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nyumbazetu.com"),
  title: {
    default: "Property Management Software for Kenya | Rent Collection, Accounting & Tenant Management | Nyumba Zetu",
    template: "%s | Nyumba Zetu",
  },
  description: "Nyumba Zetu is Kenya's leading property management software. Collect rent via M-Pesa, manage tenants, track maintenance, and run full accounting for estates, landlords, and developers.",
  keywords: ["property management software Kenya", "rent collection software Kenya", "property management system Kenya", "HOA management Kenya", "M-Pesa rent collection", "estate management Kenya", "landlord software Kenya", "tenant management", "KRA eTIMS", "property accounting"],
  authors: [{ name: "Nyumba Zetu" }],
  creator: "Nyumba Zetu",
  publisher: "Nyumba Zetu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.nyumbazetu.com",
    siteName: "Nyumba Zetu",
    title: "Property Management Software for Kenya | Nyumba Zetu",
    description: "Nyumba Zetu is Kenya's leading property management software. Collect rent via M-Pesa, manage tenants, track maintenance, and run full accounting for estates, landlords, and developers.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nyumba Zetu - Property Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Management Software for Kenya | Nyumba Zetu",
    description: "Nyumba Zetu is Kenya's leading property management software. Collect rent via M-Pesa, manage tenants, track maintenance, and run full accounting for estates, landlords, and developers.",
    images: ["/og-image.jpg"],
    creator: "@nyumbazetu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} font-sans antialiased`}
      >
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <StructuredData />
        <ThemeProvider>
          <AuthProvider>
          <AnalyticsProvider>
            <IntercomProvider />
            <ErrorBoundary>
              <LayoutShell>{children}</LayoutShell>
            </ErrorBoundary>
          </AnalyticsProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
