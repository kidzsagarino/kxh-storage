"use client";

import { useEffect, useState } from "react";
import FloatingTrustpilot from "./FloatingTrustpilot";

/**
 * On the live domain this shows the official Trustpilot widget (Trustpilot only renders it there).
 * On any other host (staging, previews) it shows a simple branded fallback instead of a blank box.
 */
export default function TrustpilotBlock({ tone = "dark" }: { tone?: "dark" | "light" }) {
    const [onLive, setOnLive] = useState<boolean | null>(null);

    useEffect(() => {
        setOnLive(/(^|\.)kxhlogistics\.co\.uk$/.test(window.location.hostname));
    }, []);

    if (onLive === null) return null;

    if (onLive) {
        return (
            <div className="flex justify-center rounded-2xl bg-white px-5 py-4">
                <FloatingTrustpilot />
            </div>
        );
    }

    const dark = tone === "dark";
    return (
        <div
            className={`flex flex-col items-center justify-between gap-4 rounded-2xl px-5 py-5 text-center sm:flex-row sm:text-left ${
                dark ? "border border-white/10 bg-white/5" : "border border-slate-200 bg-white"
            }`}
        >
            <p className={`text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}>
                <span className={`font-bold ${dark ? "text-white" : "text-slate-900"}`}>Read our reviews on Trustpilot</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2">
                <a
                    href="https://www.trustpilot.com/review/kxhlogistics.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                        dark ? "border border-white/20 text-white hover:bg-white/10" : "border border-slate-300 text-slate-900 hover:border-[#00b67a]"
                    }`}
                >
                    Read reviews
                </a>
                <a
                    href="https://www.trustpilot.com/evaluate/kxhlogistics.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-[#00b67a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#00a36d]"
                >
                    Write a review
                </a>
            </div>
        </div>
    );
}
