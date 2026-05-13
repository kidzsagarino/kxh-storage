"use client";

import Link from "next/link";

type TrustpilotBadgeProps = {
  href?: string;
  rating?: number;
  maxRating?: number;
  label?: string;
  reviewCount?: number;
  className?: string;
};

export default function TrustpilotBadge({
  href = "https://uk.trustpilot.com/review/kxhlogistics.co.uk",
  rating = 4.8,
  maxRating = 5,
  label = "Excellent on Trustpilot",
  reviewCount,
  className = "",
}: TrustpilotBadgeProps) {
 
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block ${className}`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
        
        {/* subtle shine */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] duration-700" />

        {/* rating */}
        <div className="text-2xl font-black text-slate-900">
          {rating.toFixed(1)}★
        </div>

        {/* stars */}
        <div className="mt-1 flex justify-center gap-0.5 text-green-600">
          {Array.from({ length: maxRating }).map((_, i) => {
          
            return (
              <span key={i} className="text-sm">
               ★
              </span>
            );
          })}
        </div>

        {/* label */}
        <div className="mt-1 text-sm font-medium text-slate-600">
          {label}
        </div>

        {/* reviews */}
        {reviewCount && (
          <div className="mt-0.5 text-xs text-slate-400">
            Based on {reviewCount.toLocaleString()} reviews
          </div>
        )}

        {/* trustpilot hint */}
        <div className="mt-2 text-xs font-semibold text-green-600 opacity-80 group-hover:opacity-100 transition">
          View reviews →
        </div>
      </div>
    </Link>
  );
}