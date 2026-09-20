"use client";

import Link from "next/link";

type TrustpilotPillProps = {
  href?: string;
  rating?: number;
  maxRating?: number;
  label?: string;
  reviewCount?: number;
  className?: string;
};

export default function TrustpilotPill({
  href = "https://uk.trustpilot.com/review/kxhlogistics.co.uk",
  rating = 4.8,
  maxRating = 5,
  label = "Trustpilot Reviews",
  reviewCount,
  className = "",
}: TrustpilotPillProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    
    <div className="trustpilot-widget" data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="667201b1e980b7848cc8c4fe" data-style-height="52px" data-style-width="100%" data-token="113201a9-e7ab-4e7f-a46e-78f8b93866fb">
        <a href="https://www.trustpilot.com/review/kxhlogistics.co.uk" target="_blank" rel="noopener">Trustpilot</a>
      </div>
  );
}