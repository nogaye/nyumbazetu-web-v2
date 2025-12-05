import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ErrorBoundary } from "@/components/error-boundary";
import { StructuredData } from "@/components/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nyumbazetu.com"),
  title: {
    default: "Nyumba Zetu | Property Management Infrastructure for Modern Kenyan Real Estate",
    template: "%s | Nyumba Zetu",
  },
  description: "Nyumba Zetu is a full-stack property, accounting, and tenant experience platform built for landlords, property managers, committees, developers, and banks in Kenya.",
  keywords: ["property management", "Kenya", "real estate", "rent collection", "accounting", "KRA eTIMS", "property management software", "M-Pesa", "property management Kenya", "landlord software"],
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
    url: "https://nyumbazetu.com",
    siteName: "Nyumba Zetu",
    title: "Nyumba Zetu | Property Management Infrastructure for Modern Kenyan Real Estate",
    description: "Nyumba Zetu is a full-stack property, accounting, and tenant experience platform built for landlords, property managers, committees, developers, and banks in Kenya.",
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
    title: "Nyumba Zetu | Property Management Infrastructure for Modern Kenyan Real Estate",
    description: "Nyumba Zetu is a full-stack property, accounting, and tenant experience platform built for landlords, property managers, committees, developers, and banks in Kenya.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <StructuredData />
        <ThemeProvider>
          <ErrorBoundary>
            <MainNav />
            <main className="min-h-screen" id="main-content" role="main">
              {children}
            </main>
            <SiteFooter />
            <ScrollToTop />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
