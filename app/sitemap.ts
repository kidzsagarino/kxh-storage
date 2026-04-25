import type { MetadataRoute } from "next";

const base = "https://kxhlogistics.co.uk";

export const londonLocations = [
  { slug: "camden", name: "Camden" },
  { slug: "westminster", name: "Westminster" },
  { slug: "hackney", name: "Hackney" },
  { slug: "islington", name: "Islington" },
  { slug: "kensington-chelsea", name: "Kensington and Chelsea" },
  { slug: "tower-hamlets", name: "Tower Hamlets" },
  { slug: "southwark", name: "Southwark" },
  { slug: "lambeth", name: "Lambeth" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/terms`, lastModified: new Date() },
    { url: `${base}/refunds`, lastModified: new Date() },

    // Service root pages
    { url: `${base}/warehouse-storage-london`, lastModified: new Date() },
    { url: `${base}/logistics-moving-london`, lastModified: new Date() },
    { url: `${base}/shredding-solutions-london`, lastModified: new Date() },
  ];

  const services = ["warehouse-storage-london", "logistics-moving-london", "shredding-solutions-london"];

  const locationPages = londonLocations.flatMap((location) =>
    services.map((service) => ({
      url: `${base}/${service}/${location.slug}`,
      lastModified: new Date(),
    }))
  );

  return [...staticPages, ...locationPages];
}