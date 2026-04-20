import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ["@tvranker/shared"],
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "images.igdb.com",
        pathname: "/igdb/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "cf.geekdo-images.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
