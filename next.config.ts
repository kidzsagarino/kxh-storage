import type { NextConfig } from "next";

import {
  serviceRedirectMap,
  legacyBoroughRedirectMap,
  londonBoroughs,
} from "./app/lib/redirectMap";

type Redirect = Awaited<
  ReturnType<NonNullable<NextConfig["redirects"]>>
>[number];

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.kxhlogistics.co.uk",
        pathname: "/inventory/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },

  async redirects() {
    const redirects: Redirect[] = [];

    // Legacy service URL structures
    for (const service of serviceRedirectMap) {
      const patterns = [
        `/${service.from}`,
        `/${service.from}/:slug`,
        `/services/${service.from}`,
        `/services/${service.from}/:slug`,
        `/service/${service.from}`,
        `/service/${service.from}/:slug`,
      ];

      for (const source of patterns) {
        redirects.push({
          source,
          destination: source.includes(":slug")
            ? `/${service.to}/:slug`
            : `/${service.to}`,
          permanent: true,
        });
      }
    }

    // Legacy hyphenated borough URLs
    for (const service of legacyBoroughRedirectMap) {
      for (const borough of londonBoroughs) {
        redirects.push({
          source: `/${service.from}-${borough}`,
          destination: `/${service.to}/${borough}`,
          permanent: true,
        });
      }
    }

    // One-off legacy URLs
    redirects.push(
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home-removals-london",
        destination: "/house-removals-london",
        permanent: true,
      },
      {
        source: "/office-relocation-london",
        destination: "/office-removals-london",
        permanent: true,
      },
      {
        source: "/moving-storage-london",
        destination: "/moving-house-storage-london",
        permanent: true,
      }
    );

    // Legacy homepage query-string URLs
    redirects.push(
      {
        source: "/",
        has: [
          {
            type: "query",
            key: "service",
            value: "services",
          },
        ],
        destination: "/services",
        permanent: true,
      },
      {
        source: "/",
        has: [
          {
            type: "query",
            key: "service",
            value: "moving",
          },
        ],
        destination: "/logistics-moving-london",
        permanent: true,
      },
      {
        source: "/",
        has: [
          {
            type: "query",
            key: "service",
            value: "storage",
          },
        ],
        destination: "/warehouse-storage-london",
        permanent: true,
      },
      {
        source: "/",
        has: [
          {
            type: "query",
            key: "service",
            value: "shredding",
          },
        ],
        destination: "/shredding-solutions-london",
        permanent: true,
      },
      {
        source: "/",
        has: [
          {
            type: "query",
            key: "service",
            value: "warehouse-storage-london",
          },
        ],
        destination: "/warehouse-storage-london",
        permanent: true,
      },
      {
        source: "/",
        has: [
          {
            type: "query",
            key: "service",
            value: "logistics-moving-london",
          },
        ],
        destination: "/logistics-moving-london",
        permanent: true,
      },
      {
        source: "/",
        has: [
          {
            type: "query",
            key: "service",
            value: "shredding-solutions-london",
          },
        ],
        destination: "/shredding-solutions-london",
        permanent: true,
      }
    );

    return redirects;
  },
};

export default nextConfig;