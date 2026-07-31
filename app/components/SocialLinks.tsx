// components/SocialLinks.tsx

import type { ReactNode } from "react";
import Link from "next/link";

type SocialPlatform = "facebook" | "instagram" | "tiktok";
type SocialSize = "sm" | "md" | "lg";
type SocialVariant = "default" | "light" | "brand";

type SocialLink = {
  platform: SocialPlatform;
  href: string;
  label: string;
};

type SocialLinksProps = {
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  className?: string;
  iconClassName?: string;
  showLabels?: boolean;
  variant?: SocialVariant;
  size?: SocialSize;
};

const icons: Record<SocialPlatform, ReactNode> = {
  facebook: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-full w-full"
    >
      <path d="M13.5 22v-8h2.75l.41-3.2H13.5V8.76c0-.93.26-1.56 1.59-1.56h1.7V4.34a22.8 22.8 0 0 0-2.48-.13c-2.45 0-4.13 1.5-4.13 4.25v2.34H7.4V14h2.78v8h3.32Z" />
    </svg>
  ),

  instagram: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-full w-full"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),

  tiktok: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-full w-full"
    >
      <path d="M15.7 3c.18 1.55 1.06 2.93 2.4 3.75A6.6 6.6 0 0 0 21 7.7v3.24a9.7 9.7 0 0 1-3.12-.53 9.58 9.58 0 0 1-2.18-1.08v6.1a6.57 6.57 0 1 1-5.67-6.51c.35-.05.7-.08 1.06-.08.22 0 .44.01.66.04v3.3a3.28 3.28 0 1 0 .65 5.96 3.27 3.27 0 0 0 1.3-2.62V3h2Z" />
    </svg>
  ),
};

const variantStyles: Record<SocialVariant, string> = {
  default:
    "border border-neutral-200 bg-white text-neutral-700 hover:border-[#5A862C] hover:bg-[#5A862C] hover:text-white",
  light:
    "border border-white/20 bg-white/10 text-white hover:border-white hover:bg-white hover:text-[#5A862C]",
  brand:
    "border border-emerald-800 bg-emerald-800 text-white hover:border-emerald-700 hover:bg-emerald-700 hover:text-white",
};

const sizeStyles: Record<
  SocialSize,
  {
    button: string;
    buttonWithLabel: string;
    icon: string;
    text: string;
    gap: string;
  }
> = {
  sm: {
    button: "h-8 w-8",
    buttonWithLabel: "h-8 px-3",
    icon: "h-4 w-4",
    text: "text-xs",
    gap: "gap-2",
  },
  md: {
    button: "h-11 w-11",
    buttonWithLabel: "h-11 px-4",
    icon: "h-5 w-5",
    text: "text-sm",
    gap: "gap-3",
  },
  lg: {
    button: "h-12 w-12",
    buttonWithLabel: "h-12 px-5",
    icon: "h-6 w-6",
    text: "text-base",
    gap: "gap-3",
  },
};

export default function SocialLinks({
  facebookUrl = "https://www.facebook.com/kxhlogistics",
  instagramUrl = "https://www.instagram.com/kxh_logistics",
  tiktokUrl = "https://www.tiktok.com/@kxhlogistics",
  className = "",
  iconClassName = "",
  showLabels = false,
  variant = "default",
  size = "md",
}: SocialLinksProps) {
  const styles = sizeStyles[size];

  const socialLinks: SocialLink[] = [
    facebookUrl
      ? {
          platform: "facebook",
          href: facebookUrl,
          label: "Follow KXH on Facebook",
        }
      : null,
    instagramUrl
      ? {
          platform: "instagram",
          href: instagramUrl,
          label: "Follow KXH on Instagram",
        }
      : null,
    tiktokUrl
      ? {
          platform: "tiktok",
          href: tiktokUrl,
          label: "Follow KXH on TikTok",
        }
      : null,
  ].filter((link): link is SocialLink => Boolean(link));

  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="KXH social media"
      className={`flex flex-wrap items-center ${styles.gap} ${className}`}
    >
      {socialLinks.map(({ platform, href, label }) => (
        <Link
          key={platform}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`
            group inline-flex items-center justify-center gap-2
            rounded-full transition-all duration-200
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#5A862C]
            focus-visible:ring-offset-2
            ${showLabels ? styles.buttonWithLabel : styles.button}
            ${variantStyles[variant]}
          `}
        >
          <span
            className={`${styles.icon} shrink-0 ${iconClassName}`}
            aria-hidden="true"
          >
            {icons[platform]}
          </span>

          {showLabels && (
            <span className={`${styles.text} font-semibold capitalize`}>
              {platform}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}