import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** Prefer AVIF/WebP for smaller payloads and faster LCP. */
    formats: ["image/avif", "image/webp"],
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
