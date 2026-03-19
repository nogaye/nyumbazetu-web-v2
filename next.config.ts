import type { NextConfig } from "next";
import { APARTMENTS_RENT_HUB_SLUGS } from "./lib/listings/apartment-rent-hub-paths";

/**
 * SEO hub slugs expanded at build time: hyphen public URLs rewrite to /apartments-for-rent/[hub].
 */
const apartmentRentRewrites = APARTMENTS_RENT_HUB_SLUGS.map((hub) => ({
  source: `/apartments-for-rent-${hub}`,
  destination: `/apartments-for-rent/${hub}`,
}));

const apartmentRentRedirects = APARTMENTS_RENT_HUB_SLUGS.map((hub) => ({
  source: `/apartments-for-rent/${hub}`,
  destination: `/apartments-for-rent-${hub}`,
  permanent: true as const,
}));

const nextConfig: NextConfig = {
  async redirects() {
    return apartmentRentRedirects;
  },
  async rewrites() {
    return { beforeFiles: apartmentRentRewrites };
  },
  poweredByHeader: false,
  /** Security and cache hints for Lighthouse Best Practices / performance. */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/manifest.webmanifest",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
  /** Tree-shake heavy icon/motion packages so client chunks stay smaller (better INP). */
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@heroicons/react/24/outline",
      "@heroicons/react/24/solid",
    ],
  },
  images: {
    /** Prefer AVIF/WebP for smaller payloads and faster LCP. */
    formats: ["image/avif", "image/webp"],
    /** Restrict image qualities to the values used across the site. */
    qualities: [70, 75, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.nyumbazetu.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.app.nyumbazetu.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nyumba-zetu-bucket.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
