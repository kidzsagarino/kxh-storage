import type { MetadataRoute } from "next";

// Salmova staging builds run on Netlify / Vercel; keep that copy out of search engines.
const IS_STAGING = (process.env.NETLIFY === "true" || process.env.KXH_STAGING === "true" || /netlify\.app|vercel\.app/.test(process.env.NEXT_PUBLIC_APP_URL ?? ""));

// Private app areas that should not be crawled (booking/payment steps, admin, API).
const PRIVATE = ["/admin", "/api/", "/checkout", "/payment", "/billing", "/order-summary", "/success", "/client-inventory", "/login"];

// Search and AI answer engines we explicitly welcome (Google, Bing/Copilot, ChatGPT search,
// Gemini, Perplexity, Claude, Apple). They may read all public pages.
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Applebot",
];

export default function robots(): MetadataRoute.Robots {
  const base = "https://kxhlogistics.co.uk";
  if (IS_STAGING) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: PRIVATE },
      { userAgent: "*", allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
