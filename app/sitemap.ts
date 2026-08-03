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

const services = [
  "warehouse-storage-london",
  "logistics-moving-london",
  "shredding-solutions-london",

  // SEO cluster pages
  "business-storage-london",
  "inventory-management-london",
  "pallet-storage-london",
  "commercial-storage-london",
  "third-party-logistics-london",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    "/",
    "/privacy",
    "/terms",
    "/refunds",
    "/services",
    "/faqs",
    "/contact",
    "/get-a-quote",

    // Core services
    "/warehouse-storage-london",
    "/student-storage-london",
    "/logistics-moving-london",
    "/shredding-solutions-london",

    // SEO cluster pages
    "/business-storage-london",
    "/inventory-management-london",
    "/pallet-storage-london",
    "/commercial-storage-london",
    "/third-party-logistics-london",
    "/ecommerce-storage-london",
    "/retail-storage-london",
    "/office-removals-london",
    "/house-removals-london",
    "/moving-house-storage-london",
    "/packing-services-london",
    "/archive-storage-london",
    "/event-equipment-storage-london",
    "/healthcare-storage-london",
    "/furniture-storage-london",

  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  // Dynamic location pages
  const locationPages = londonLocations.flatMap((location) =>
    services.map((service) => ({
      url: `${base}/${service}/${location.slug}`,
      lastModified: now,
    }))
  );

  return [...staticPages, ...locationPages];
}