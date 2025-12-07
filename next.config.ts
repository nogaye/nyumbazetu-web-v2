import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    ],
  },
};

export default nextConfig;
