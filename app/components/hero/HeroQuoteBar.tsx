"use client";

import React, { useMemo, useRef } from "react";
import { useCheckout, type ServiceType } from "../checkout/CheckoutStore";
import { HERO_BY_SERVICE } from "./hero.config";

const SERVICE_META: Record<
    ServiceType,
    {
        label: string;
        tagline: string;
        bullets: string[];
    }
> = {
    storage: {
        label: "Storage",
        tagline: "Collection + flexible monthly storage.",
        bullets: [
            "We collect from your door and store securely",
            "Flexible monthly terms — upgrade anytime",
            "Ideal for decluttering, renovations, and business stock",
        ],
    },
    moving: {
        label: "Packing and Moving",
        tagline: "Same-day moves with careful crews.",
        bullets: [
            "Door-to-door moves with protected handling",
            "Optional packing support and materials",
            "Slot-based pickup for predictable scheduling",
        ],
    },
    shredding: {
        label: "Shredding",
        tagline: "Secure document destruction for homes & businesses.",
        bullets: [
            "Scheduled pickup or drop-off options",
            "Compliance-friendly secure disposal",
            "Perfect for clearing paperwork safely",
        ],
    },
};

function ServiceOption(props: {
    active: boolean;
    title: string;
    subtitle: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className={[
                "w-full rounded-xl border px-3 py-3 text-left transition active:scale-[.99]",
                props.active
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white hover:border-slate-300",
            ].join(" ")}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="text-sm font-extrabold text-slate-900">{props.title}</div>
                    <div className="mt-0.5 text-xs font-semibold text-slate-600">{props.subtitle}</div>
                </div>

                <span
                    className={[
                        "rounded-full px-2 py-1 text-[11px] font-semibold",
                        props.active ? "bg-white text-emerald-700" : "bg-slate-100 text-slate-600 opacity-80",
                    ].join(" ")}
                >
                    {props.active ? "Selected" : "Select"}
                </span>
            </div>
        </button>
    );
}

export function HeroQuoteBar() {
    const { state, setServiceType, setState } = useCheckout();
    const postcodeRef = useRef<HTMLInputElement>(null);
    const meta = useMemo(() => SERVICE_META[state.serviceType], [state.serviceType]);

    function applyPostcode(service: ServiceType, postcode: string) {
        setState((s) => {
            if (service === "storage") {
                return {
                    ...s,
                    storage: {
                        ...s.storage,
                        customerDetails: {
                            ...s.storage.customerDetails,
                            postalCode: postcode,
                        },
                    },
                };
            }

            if (service === "moving") {
                return {
                    ...s,
                    moving: {
                        ...s.moving,
                        customerDetails: {
                            ...s.moving.customerDetails,
                            postalCode: postcode,
                        },
                    },
                };
            }

            // shredding
            return {
                ...s,
                shredding: {
                    ...s.shredding,
                    customerDetails: {
                        ...s.shredding.customerDetails,
                        postalCode: postcode,
                    },
                },
            };
        });
    }

    function onGetQuote() {
        const postcode = (postcodeRef.current?.value ?? "").trim();
        if (!postcode) {
            postcodeRef.current?.focus();
            return;
        }

        const service = state.serviceType;

        applyPostcode(service, postcode);

        document.getElementById("pricing")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    return (
        <div
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
            onSubmit={(e) => e.preventDefault()}
        >
            {/* Main grid: left selectable + right description */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                {/* LEFT: selectable services */}
                <div className="space-y-2">
                    <ServiceOption
                        active={state.serviceType === "storage"}
                        title="Storage"
                        subtitle="Collection + monthly storage"
                        onClick={() => { setServiceType("storage"); setTimeout(() => postcodeRef.current?.focus(), 0); }}

                    />
                    <ServiceOption
                        active={state.serviceType === "moving"}
                        title="Packing and Moving"
                        subtitle="Same-day moves across London"
                        onClick={() => { setServiceType("moving"); setTimeout(() => postcodeRef.current?.focus(), 0); }}
                    />
                    <ServiceOption
                        active={state.serviceType === "shredding"}
                        title="Shredding"
                        subtitle="Secure document disposal"
                        onClick={() => { setServiceType("shredding"); setTimeout(() => postcodeRef.current?.focus(), 0); }}
                    />
                </div>

                {/* RIGHT: description panel */}
                {/* <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="text-xs font-semibold text-emerald-700">Selected</div>
                                <div className="mt-1 text-base font-extrabold text-slate-900">{meta.label}</div>
                                <div className="mt-1 text-sm font-semibold text-slate-600">{meta.tagline}</div>
                            </div>
                            <span className="rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-slate-600">
                                Default: Storage
                            </span>
                        </div>

                        <div className="mt-3 space-y-2">
                            {meta.bullets.map((b) => (
                                <div key={b} className="flex gap-2">
                                    <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                                    <p className="text-sm text-slate-700">{b}</p>
                                </div>
                            ))}
                        </div>
                    </div> */}
            </div>

            {/* Postcode input */}
            <div className="mt-3">
                <div className="relative">
                    <label className="sr-only" htmlFor="hero-postcode">
                        Enter Postcode
                    </label>

                    <input
                        ref={postcodeRef}
                        id="hero-postcode"
                        placeholder="Enter Postcode"
                        autoComplete="postal-code"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-3 pr-12 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-200"
                    />

                    <button
                        type="button"
                        aria-label="Use location"
                        className="absolute right-2 top-1/3 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    >
                        ⦿
                    </button>

                    <p className="mt-1 text-xs text-slate-500">
                        Helps us route your request to the right team.
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                    type="button"
                    onClick={onGetQuote}
                    className="h-11 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 cursor-pointer sm:order-none order-1"
                >
                    Get instant quote →
                </button>

                <a
                    href="tel:+441474396663"
                    className="h-11 rounded-xl bg-[#4CAF50] px-4 text-sm font-semibold text-white inline-flex items-center justify-center gap-2 hover:bg-[#45A049] sm:order-none order-2"
                >
                    Call Us
                </a>
            </div>
            <div className="mb-4 flex justify-center">
                {/* Trust row */}
                <a href="https://uk.trustpilot.com/review/kxhlogistics.co.uk" target="_blank" rel="noopener noreferrer">
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600">
                        <span className="font-bold text-slate-900">4.8</span>
                        <span>Excellent</span>
                        <span className="inline-flex items-center gap-0.5" aria-label="5 star rating">
                            <span className="inline-block rounded bg-[#4CAF50] px-1 text-xs text-white">★</span>
                            <span className="inline-block rounded bg-[#4CAF50] px-1 text-xs text-white">★</span>
                            <span className="inline-block rounded bg-[#4CAF50] px-1 text-xs text-white">★</span>
                            <span className="inline-block rounded bg-[#4CAF50] px-1 text-xs text-white">★</span>
                            <span className="inline-block rounded bg-[#4CAF50] px-1 text-xs text-white">★</span>
                        </span>
                        <span className="font-semibold text-slate-700">Trustpilot</span>
                    </div>
                </a>
            </div>
        </div>
    );
}
