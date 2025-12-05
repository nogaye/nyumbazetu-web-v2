import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nyumba Zetu | Property Management Infrastructure for Modern Kenyan Real Estate",
  description: "Nyumba Zetu is a full-stack property, accounting, and tenant experience platform built for landlords, property managers, committees, developers, and banks in Kenya.",
  keywords: ["property management", "Kenya", "real estate", "rent collection", "accounting", "KRA eTIMS", "property management software"],
  openGraph: {
    title: "Nyumba Zetu | Property Management Infrastructure for Modern Kenyan Real Estate",
    description: "Nyumba Zetu is a full-stack property, accounting, and tenant experience platform built for landlords, property managers, committees, developers, and banks in Kenya.",
    type: "website",
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
        <ThemeProvider>
          <MainNav />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
