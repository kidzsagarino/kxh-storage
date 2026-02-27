import type { ServiceType } from "../checkout/CheckoutStore";

export const HERO_BY_SERVICE: Record<
  ServiceType,
  {
    image: string;
    primaryPill: string;
    secondaryPill?: string;
    alt: string;
  }
> = {
  storage: {
    image: "/images/hero_storage.png",
    primaryPill: "Available from 2 business days",
    secondaryPill: "Door-to-door convenience",
    alt: "Secure storage collection and monthly storage service",
  },
  moving: {
    image: "/images/hero_moving.png",
    primaryPill: "Same-day moves available",
    secondaryPill: "Careful crews & handling",
    alt: "Professional removals and moving service",
  },
  shredding: {
    image: "/images/hero_shredding.png",
    primaryPill: "Secure & compliant disposal",
    secondaryPill: "Confidential document shredding",
    alt: "Secure document shredding service",
  },
};
