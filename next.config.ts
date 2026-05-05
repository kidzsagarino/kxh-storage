import type { NextConfig } from "next";

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
  }
};

export default nextConfig;