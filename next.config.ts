import type { NextConfig } from "next";
import { serviceRedirectMap } from "./app/lib/redirectMap";


const nextConfig: NextConfig = {
  reactCompiler: true,

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
    const redirects: any[] = [];

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

    return redirects;
  }
};

export default nextConfig;