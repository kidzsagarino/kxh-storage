import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kxhlogistics.co.uk";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/terms`, lastModified: new Date() },
    { url: `${base}/refunds`, lastModified: new Date() },
    { url: `${base}/warehouse-storage-london`, lastModified: new Date() },
    { url: `${base}/logistics-moving-london`, lastModified: new Date() },
    { url: `${base}/shredding-solutions-london`, lastModified: new Date() },
  ];
}