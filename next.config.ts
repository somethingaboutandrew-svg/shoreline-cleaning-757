import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/gallery", destination: "/", permanent: true },
      {
        source: "/services/commercial-cleaning-virginia-beach",
        destination: "/services/small-business-cleaning-virginia-beach",
        permanent: true,
      },
      {
        source: "/services/deep-cleaning-move-in-move-out",
        destination: "/services/post-move-out-cleaning",
        permanent: true,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
