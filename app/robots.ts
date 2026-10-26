import type { MetadataRoute } from "next";

// Salmova staging builds run on Netlify; keep that copy out of search engines.
const IS_STAGING = (process.env.NETLIFY === "true" || process.env.KXH_STAGING === "true" || /netlify\.app|vercel\.app/.test(process.env.NEXT_PUBLIC_APP_URL ?? ""));

export default function robots(): MetadataRoute.Robots {
  const base = "https://kxhlogistics.co.uk";
  if (IS_STAGING) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
