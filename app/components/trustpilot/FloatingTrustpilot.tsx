"use client";

import dynamic from "next/dynamic";

const TrustpilotCollector = dynamic(
    () => import("./TrustPilotCollector"),
    {
        ssr: false,
        loading: () => null,
    }
);

const tooltipClasses = [
    "pointer-events-none",
    "absolute",
    "left-full",
    "top-1/2",
    "z-50",
    "ml-2",
    "-translate-y-1/2",
    "whitespace-nowrap",
    "rounded-md",
    "bg-slate-900",
    "px-2",
    "py-1",
    "text-[11px]",
    "text-white",
    "opacity-0",
    "shadow-lg",
    "transition-opacity",
    "duration-200",
    "group-hover:opacity-100",
].join(" ");

export default function FloatingTrustpilot() {
    return (
        <div className="group relative inline-flex items-center">
            <TrustpilotCollector />

            <span
                className={tooltipClasses}
            >
                4.8 on Trustpilot
            </span>
        </div>
    );
}