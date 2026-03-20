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
        label: "Moving",
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
    return: {
        label: "Returns",
        tagline: "Hassle-free returns management for your business.",
        bullets: [
            "Easy return initiation and tracking",
            "Flexible pickup options for your convenience",
            "Dedicated support for all return inquiries",
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
    const { state, setServiceType, setState, resetAll } = useCheckout();
    const postcodeRef = useRef<HTMLInputElement>(null);
    const meta = useMemo(() => SERVICE_META[state.serviceType], [state.serviceType]);

    function applyPostcode(service: ServiceType, postcodeRaw: string) {
        const postcode = postcodeRaw.trim().toUpperCase();
        if (!postcode) return;

        resetAll();
        setServiceType(service);

        setState((s) => {
            if (service === "storage") {
                return {
                    ...s,
                    storage: {
                        ...s.storage,
                        address: {
                            ...s.storage.address,
                            postalCode: postcode
                        }
                    },
                };
            }

            if (service === "moving") {
                return {
                    ...s,
                    moving: {
                        ...s.moving,
                        fromLocation: {
                            ...s.moving.fromLocation,
                            postalCode: postcode
                        },
                        toLocation: {
                            ...s.moving.toLocation,
                            postalCode: postcode
                        }
                    },
                };
            }

            // shredding
            return {
                ...s,
                shredding: {
                    ...s.shredding,
                    address: {
                        ...s.shredding.address,
                        postalCode: postcode
                    }
                },
            };
        });
    }

    function onGetQuote() {
        const postcode = postcodeRef.current?.value ?? "";
        const service = state.serviceType;

        applyPostcode(service, postcode);

        document.getElementById("pricing")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
    const SERVICE_DATA = {
        storage: {
            label: "Storage",
            tagline: "Secure & Climate Controlled",
            bullets: ["24/7 CCTV Monitoring", "Flexible monthly terms", "Insurance included"]
        },
        moving: {
            label: "Packing & Moving",
            tagline: "Professional London Transit",
            bullets: ["Full packing service", "Goods in transit insurance", "Expert handling"]
        },
        shredding: {
            label: "Secure Shredding",
            tagline: "GDPR & Data Compliant",
            bullets: ["Destruction Certificate", "Eco-friendly recycling", "Secure chain of custody"]
        },
        return: {
            label: "Return My Items",
            tagline: "Streamlined Returns for Your Business",
            bullets: ["Easy return initiation", "Flexible pickup options", "Dedicated support"]
        }
    } as const;

    const ServiceOption = ({ active, title, subtitle, onClick }: { active: boolean; title: string; subtitle: string; onClick: () => void }) => (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-all duration-200 ${active
                ? "border-emerald-500 bg-emerald-50/50 ring-4 ring-emerald-500/5 shadow-sm"
                : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                }`}
        >
            <div className="flex flex-col">
                <span className={`text-sm font-bold ${active ? "text-emerald-900" : "text-slate-900"}`}>{title}</span>
                <span className="text-xs text-slate-500 mt-0.5">{subtitle}</span>
            </div>
            <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${active ? "border-emerald-500 bg-emerald-500" : "border-slate-200 bg-white"
                }`}>
                {active && <div className="h-2 w-2 rounded-full bg-white animate-in zoom-in-50 duration-300" />}
            </div>
        </button>
    );

    return (
        <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-emerald-100/40 blur-[100px]" />

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                {/* top trust strip */}
                <div className="bg-slate-900 px-6 py-2 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                        Guaranteed Secure • 5,000+ Londoners Served
                    </p>
                </div>

                <div className="p-5 md:p-7">
                    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
                        {/* left */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Select Service
                                </p>
                                <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900">
                                    Get your instant quote
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Choose a service.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                                {(Object.keys(SERVICE_DATA) as Array<keyof typeof SERVICE_DATA>).map((key) => (
                                    <ServiceOption
                                        key={key}
                                        active={state.serviceType === key}
                                        title={SERVICE_DATA[key].label}
                                        subtitle={SERVICE_DATA[key].tagline}
                                        onClick={() => {
                                            setServiceType(key);
                                            setTimeout(() => postcodeRef.current?.focus(), 0);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* right */}
                        <div className="space-y-5">
                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                                    Included with {SERVICE_DATA[state.serviceType as keyof typeof SERVICE_DATA].label}
                                </p>

                                <div className="space-y-3">
                                    {SERVICE_DATA[state.serviceType as keyof typeof SERVICE_DATA].bullets
                                        .slice(0, 3)
                                        .map((bullet) => (
                                            <div key={bullet} className="flex items-start gap-2">
                                                <svg
                                                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={3}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                <span className="text-sm font-medium leading-5 text-slate-600">
                                                    {bullet}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <button
                                    onClick={onGetQuote}
                                    className="group relative h-12 overflow-hidden rounded-xl bg-slate-900 px-4 font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Get instant quote
                                        <span className="transition-transform group-hover:translate-x-1">→</span>
                                    </span>
                                </button>

                                <a
                                    href="tel:+441474396663"
                                    className="flex h-12 items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 font-bold text-emerald-700 transition-all hover:bg-emerald-100 active:scale-[0.98]"
                                >
                                    Call an expert
                                </a>
                            </div>

                            <div className="flex justify-center lg:justify-center">
                                <a href="https://uk.trustpilot.com/review/kxhlogistics.co.uk" target="_blank" rel="noopener noreferrer">
                                    <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-4 py-1.5">
                                        <span>
                                            <span className="inline-flex items-center gap-0.5">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-[#00B67A] text-[10px] font-bold text-white"
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </span>
                                        </span>
                                        <span className="text-xs font-bold text-slate-900">4.8/5</span>
                                        <span className="text-[10px] font-medium text-slate-500">
                                            Trustpilot Reviews
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
