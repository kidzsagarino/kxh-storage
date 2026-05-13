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
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View Trustpilot reviews"
      className={`group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md hover:border-slate-300 ${className}`}
    >
      {/* stars */}
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => {
          const isFull = i < fullStars;
          const isHalf = i === fullStars && hasHalf;

          return (
            <span
              key={i}
              className={`flex h-4 w-4 items-center justify-center rounded-sm text-[10px] font-bold text-white transition
                ${
                  isFull || isHalf
                    ? "bg-[#00B67A]"
                    : "bg-slate-200 text-slate-400"
                }`}
            >
              ★
            </span>
          );
        })}
      </span>

      {/* rating */}
      <span className="text-xs font-semibold text-slate-900">
        {rating.toFixed(1)}/5
      </span>

      {/* divider dot */}
      <span className="h-1 w-1 rounded-full bg-slate-300" />

      {/* label */}
      <span className="text-[10px] font-medium text-slate-500">
        {label}
      </span>

      {/* optional review count */}
      {reviewCount && (
        <>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-[10px] text-slate-400">
            {reviewCount.toLocaleString()}
          </span>
        </>
      )}
    </Link>
  );
}