"use client";

import TrustpilotCollector from "./TrustPilotCollector";

export default function FloatingTrustpilot() {
    return (
        <div className="fixed left-0 bottom-0 z-50">

            <TrustpilotCollector  />
            {/* Tooltip */}
            <span className="absolute left-12 whitespace-nowrap rounded-md bg-slate-900 text-white text-[11px] px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                4.8 on Trustpilot
            </span>

        </div>
    );
}