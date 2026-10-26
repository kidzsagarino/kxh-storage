"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Star, Phone, ArrowRight, Package, Truck, FileX2, RotateCcw, ShieldCheck, Clock } from "lucide-react";

const GOOGLE_REVIEWS_URL =
    "https://www.google.com/maps/place/KXH+Storage+and+Logistics/@51.4005411,-1.5718478,8z/data=!3m1!4b1!4m6!3m5!1s0x47d8b51f343bb04f:0x23adefcf1e4277f3!8m2!3d51.4062307!4d-0.2527389!16s%2Fg%2F11y92dhgp4";

const QUICK_SERVICES = [
    { label: "Storage", sub: "Collection + monthly storage", icon: Package },
    { label: "Moving", sub: "Same-day moves in London", icon: Truck },
    { label: "Shredding", sub: "Secure document disposal", icon: FileX2 },
    { label: "Return", sub: "Items back to your door", icon: RotateCcw },
];

/** 3D tilt that follows the pointer; disabled for reduced motion and touch. */
function useTilt(max = 8) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const fine = window.matchMedia("(pointer: fine)").matches;
        if (reduce || !fine) return;
        const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform = `perspective(1000px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateZ(0)`;
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

/** Background parallax driven by pointer position (desktop only). */
function useParallax(strength = 14) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const fine = window.matchMedia("(pointer: fine)").matches;
        if (reduce || !fine) return;
        let frame = 0;
        const onMove = (e: PointerEvent) => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                setOffset({
                    x: (e.clientX / window.innerWidth - 0.5) * -strength,
                    y: (e.clientY / window.innerHeight - 0.5) * -strength,
                });
            });
        };
        window.addEventListener("pointermove", onMove);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", onMove);
        };
    }, [strength]);
    return offset;
}

/** Pure-CSS isometric stack of storage boxes (decorative). */
function BoxStack3D() {
    return (
        <div className="kxh-scene pointer-events-none select-none" aria-hidden="true">
            <div className="kxh-stack">
                {[
                    { x: 0, y: 0, z: 0 },
                    { x: 64, y: 0, z: 0 },
                    { x: 32, y: 0, z: 56 },
                ].map((b, i) => (
                    <div
                        key={i}
                        className="kxh-cube"
                        style={{ transform: `translate3d(${b.x}px, ${-b.z}px, ${b.y}px)`, animationDelay: `${i * 0.35}s` }}
                    >
                        <span className="kxh-face kxh-front" />
                        <span className="kxh-face kxh-back" />
                        <span className="kxh-face kxh-right" />
                        <span className="kxh-face kxh-left" />
                        <span className="kxh-face kxh-top" />
                        <span className="kxh-face kxh-bottom" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function HomeHeroCover() {
    const tiltRef = useTilt(7);
    const p = useParallax(16);

    return (
        <section className="kxh-hero relative isolate overflow-hidden bg-slate-950 text-white">
            {/* Cover image with slow zoom + pointer parallax */}
            <div
                className="absolute inset-[-24px] -z-20 will-change-transform"
                style={{ transform: `translate3d(${p.x}px, ${p.y}px, 0)` }}
            >
                <Image
                    src="/images/kxh-home-hero-warehouse-london.webp"
                    alt="KXH Storage & Logistics warehouse loading bay with a collection van and the London skyline"
                    fill
                    priority
                    sizes="100vw"
                    className="kxh-kenburns object-cover object-center"
                />
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/20" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-slate-950/80 to-transparent" />

            <div className="mx-auto grid max-w-screen-xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-20 lg:pt-12">
                {/* LEFT */}
                <div className="kxh-rise text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur sm:text-xs">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        Open 24 hours · 7 days a week
                    </div>

                    <h1 className="mt-6 text-4xl text-white font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                        Storage with{" "}
                        <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent">
                            collection &amp; delivery
                        </span>{" "}
                        across London
                    </h1>

                    <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg lg:mx-0">
                        We collect from your door, store your items in our secure warehouse and bring them back
                        when you need them. For homes, students, offices and businesses.
                    </p>

                    <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                        <Link
                            href="/get-a-quote"
                            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-7 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400"
                        >
                            Get Instant Quote
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>
                        <a
                            href="tel:+442039165312"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                        >
                            <Phone className="h-4 w-4" />
                            020 3916 5312
                        </a>
                    </div>

                    {/* Real review scores */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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
                            <span className="text-slate-300">(50 reviews)</span>
                        </a>
                        <a
                            href="https://www.trustpilot.com/review/kxhlogistics.co.uk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm backdrop-blur transition hover:bg-white/20"
                            aria-label="Rated 4.8 on Trustpilot"
                        >
                            <Star className="h-4 w-4 fill-[#00b67a] text-[#00b67a]" />
                            <span className="font-bold">Trustpilot</span>
                            <span className="font-semibold">4.8</span>
                        </a>
                    </div>
                </div>

                {/* RIGHT: 3D tilt quick-quote card */}
                <div className="kxh-rise relative mx-auto w-full max-w-md [animation-delay:150ms] lg:mx-0 lg:justify-self-end">
                    <div className="absolute -right-10 -top-32 hidden xl:block">
                        <BoxStack3D />
                    </div>
                    <div
                        ref={tiltRef}
                        className="relative rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl transition-transform duration-200 ease-out [transform-style:preserve-3d] sm:p-7"
                    >
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 [transform:translateZ(30px)]">
                            Instant price
                        </p>
                        <h2 className="mt-1 text-2xl font-black text-white [transform:translateZ(40px)]">What do you need?</h2>
                        <div className="mt-5 grid grid-cols-2 gap-3 [transform:translateZ(25px)]">
                            {QUICK_SERVICES.map(({ label, sub, icon: Icon }) => (
                                <Link
                                    key={label}
                                    href="/get-a-quote"
                                    className="group flex min-h-[44px] flex-col rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-left transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-emerald-500/15"
                                >
                                    <Icon className="h-6 w-6 text-emerald-300 transition group-hover:scale-110" />
                                    <span className="mt-3 font-bold">{label}</span>
                                    <span className="mt-1 text-xs leading-5 text-slate-300">{sub}</span>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-200 [transform:translateZ(20px)]">
                            <span className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-emerald-300" /> Secure warehouse
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-emerald-300" /> Instant online price
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
