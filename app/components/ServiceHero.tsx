"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, ChevronRight, Phone, Star } from "lucide-react";

const GOOGLE_REVIEWS_URL =
    "https://www.google.com/maps/place/KXH+Storage+and+Logistics/@51.4005411,-1.5718478,8z/data=!3m1!4b1!4m6!3m5!1s0x47d8b51f343bb04f:0x23adefcf1e4277f3!8m2!3d51.4062307!4d-0.2527389!16s%2Fg%2F11y92dhgp4";

export type HeroCardItem = { icon: ReactNode; title: string; text: string };

type Props = {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    highlight?: string;
    intro: string;
    chips?: string[];
    breadcrumb: { label: string; href?: string }[];
    ctaHref: string;
    ctaLabel: string;
    cardEyebrow: string;
    cardTitle: string;
    cardItems: HeroCardItem[];
};

function useTilt(max = 7) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform = `perspective(1000px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
        };
        const onLeave = () => {
            el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
        };
    }, [max]);
    return ref;
}

/** Dark cover hero used on service pages (same look as the homepage cover). */
export default function ServiceHero(p: Props) {
    const tiltRef = useTilt();
    const hiAt = p.highlight ? p.title.indexOf(p.highlight) : -1;
    const before = hiAt >= 0 ? p.title.slice(0, hiAt) : p.title;
    const after = hiAt >= 0 && p.highlight ? p.title.slice(hiAt + p.highlight.length) : "";

    return (
        <section className="kxh-hero relative isolate overflow-hidden bg-slate-950 text-white">
            <div className="absolute inset-0 -z-20">
                <Image src={p.image} alt={p.imageAlt} fill priority sizes="100vw" className="kxh-kenburns object-cover object-center" />
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/30" />

            <div className="mx-auto max-w-screen-xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-20">
                <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-slate-300 sm:text-sm">
                    {p.breadcrumb.map((b, i) => (
                        <span key={b.label} className="inline-flex items-center gap-1">
                            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />}
                            {b.href ? (
                                <Link href={b.href} className="transition hover:text-white">
                                    {b.label}
                                </Link>
                            ) : (
                                <span className="font-semibold text-white" aria-current="page">
                                    {b.label}
                                </span>
                            )}
                        </span>
                    ))}
                </nav>

                <div className="mt-8 grid items-center gap-10 lg:mt-12 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="kxh-rise">
                        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur sm:text-xs">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            {p.eyebrow}
                        </p>
                        <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                            {before}
                            {hiAt >= 0 && (
                                <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent">{p.highlight}</span>
                            )}
                            {after}
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">{p.intro}</p>

                        {p.chips && (
                            <ul className="mt-6 grid max-w-xl gap-2 sm:grid-cols-2">
                                {p.chips.map((c) => (
                                    <li key={c} className="flex items-center gap-2 text-sm font-medium text-slate-100">
                                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" /> {c}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={p.ctaHref}
                                className="kxh-shine group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-500 px-7 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400"
                            >
                                {p.ctaLabel}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                            </Link>
                            <a
                                href="tel:+442039165312"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                            >
                                <Phone className="h-4 w-4" /> 020 3916 5312
                            </a>
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <a
                                href={GOOGLE_REVIEWS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm backdrop-blur transition hover:bg-white/20"
                                aria-label="Rated 5.0 from 50 Google reviews"
                            >
                                <span className="font-bold">Google</span>
                                <span className="flex">
                                    {[0, 1, 2, 3, 4].map((i) => (
                                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                    ))}
                                </span>
                                <span className="font-semibold">5.0</span>
                                <span className="text-slate-300">(50)</span>
                            </a>
                        </div>
                    </div>

                    <div className="kxh-rise mx-auto w-full max-w-md [animation-delay:150ms] lg:mx-0 lg:justify-self-end">
                        <div
                            ref={tiltRef}
                            className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl transition-transform duration-200 ease-out [transform-style:preserve-3d] sm:p-7"
                        >
                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 [transform:translateZ(30px)]">{p.cardEyebrow}</p>
                            <h2 className="mt-1 text-2xl font-black [transform:translateZ(40px)]">{p.cardTitle}</h2>
                            <ul className="mt-5 grid grid-cols-2 gap-3 [transform:translateZ(25px)]">
                                {p.cardItems.map((it) => (
                                    <li key={it.title} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-emerald-500/15">
                                        <span className="text-emerald-300">{it.icon}</span>
                                        <span className="mt-3 block font-bold">{it.title}</span>
                                        <span className="mt-1 block text-xs leading-5 text-slate-300">{it.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
