"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import Link from "next/link";
import {
    ArrowRight,
    BadgePoundSterling,
    Boxes,
    Building2,
    CalendarCheck,
    ChevronRight,
    GraduationCap,
    Info,
    Layers,
    Lock,
    Map as MapIcon,
    MapPin,
    Package,
    Phone,
    Search,
    Truck,
    Warehouse,
    X,
} from "lucide-react";
import { CONTACT_NUMBERS } from "../lib/contact";

type FAQ = { question: string; answer: string; link?: { href: string; label: string } };
type FAQSection = { id: string; title: string; icon: string; description: string; faqs: FAQ[] };
type ServiceLink = { title: string; href: string; description: string };
type PopularQuestion = { label: string; href: string };

type Props = {
    sections: FAQSection[];
    serviceShortcuts: ServiceLink[];
    popularQuestions: PopularQuestion[];
    relatedServicesByCategory: Record<string, ServiceLink[]>;
    lastUpdated: string;
};

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
    general: Info,
    moving: Truck,
    storage: Package,
    "business-storage": Building2,
    "warehouse-storage": Warehouse,
    "student-storage": GraduationCap,
    "inventory-management": Boxes,
    "pallet-storage": Layers,
    "collection-delivery": MapPin,
    pricing: BadgePoundSterling,
    booking: CalendarCheck,
    security: Lock,
    coverage: MapIcon,
};

function toId(sectionId: string, question: string) {
    return `${sectionId}-${question}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function SectionIcon({ id, className }: { id: string; className?: string }) {
    const Icon = ICONS[id] ?? Info;
    return <Icon className={className} aria-hidden="true" />;
}

export default function FAQsClient({ sections, serviceShortcuts, popularQuestions, relatedServicesByCategory, lastUpdated }: Props) {
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(sections[0]?.id ?? "");

    const filteredSections = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return sections;
        return sections
            .map((s) => ({
                ...s,
                faqs: s.faqs.filter((f) => `${s.title} ${f.question} ${f.answer}`.toLowerCase().includes(q)),
            }))
            .filter((s) => s.faqs.length > 0);
    }, [query, sections]);

    const resultCount = filteredSections.reduce((t, s) => t + s.faqs.length, 0);
    const total = sections.reduce((t, s) => t + s.faqs.length, 0);

    // Highlight the category currently on screen in the sidebar.
    useEffect(() => {
        const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
        const io = new IntersectionObserver(
            (entries) => {
                const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (vis[0]) setActive(vis[0].target.id);
            },
            { rootMargin: "-120px 0px -60% 0px" },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [sections, filteredSections]);

    // Open a question when arriving from a #link.
    useEffect(() => {
        const open = () => {
            const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
            if (el instanceof HTMLDetailsElement) el.open = true;
        };
        open();
        window.addEventListener("hashchange", open);
        return () => window.removeEventListener("hashchange", open);
    }, []);

    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* HERO */}
            <section className="kxh-hero relative isolate overflow-hidden bg-slate-950 text-white">
                <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-96 w-96 rounded-full bg-emerald-500/25 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-32 right-0 -z-10 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" aria-hidden="true" />
                <div className="mx-auto max-w-screen-xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-20">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-slate-300 sm:text-sm">
                        <Link href="/" className="transition hover:text-white">Home</Link>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                        <span className="font-semibold text-white" aria-current="page">FAQs</span>
                    </nav>

                    <div className="kxh-rise mx-auto mt-10 max-w-3xl text-center">
                        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-emerald-300 sm:text-xs">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" /> KXH help centre · {total} answers
                        </p>
                        <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                            Storage, Moving & Logistics{" "}
                            <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent">FAQs</span>
                        </h1>
                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                            Quick answers about storage, moving, collection, delivery, pricing and bookings across London.
                        </p>

                        <div className="mx-auto mt-8 max-w-2xl">
                            <label htmlFor="faq-search" className="sr-only">Search frequently asked questions</label>
                            <div className="relative">
                            <Search className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                            <input
                                style={{ paddingLeft: "3.25rem", paddingRight: "3rem", height: "3.75rem", borderRadius: "1rem" }}
                                id="faq-search"
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search e.g. price, student, collection..."
                                className="w-full rounded-2xl border border-white/15 bg-white py-4 pl-14 pr-12 text-base text-slate-900 shadow-2xl shadow-black/30 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-emerald-400/40"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    aria-label="Clear search"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                            </div>
                            <p className="mt-3 text-sm text-slate-300" aria-live="polite">
                                {query ? `${resultCount} ${resultCount === 1 ? "answer" : "answers"} found` : `Last updated ${lastUpdated} · Reviewed by the KXH team`}
                            </p>
                        </div>

                        {!query && (
                            <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
                                {popularQuestions.map((q) => (
                                    <a
                                        key={q.href}
                                        href={q.href}
                                        className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-100 backdrop-blur transition hover:border-emerald-400/60 hover:bg-emerald-500/20 sm:text-sm"
                                    >
                                        {q.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CATEGORY CARDS */}
            {!query && (
                <section aria-labelledby="browse-categories" className="border-b border-slate-200 bg-slate-50 py-14 lg:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <h2 id="browse-categories" className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Browse by topic</h2>
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                            {sections.map((s) => (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="kxh-card3d group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
                                >
                                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                                        <SectionIcon id={s.id} className="h-5 w-5" />
                                    </span>
                                    <span className="mt-3 block font-bold text-slate-950">{s.title}</span>
                                    <span className="mt-0.5 block text-xs text-slate-500">{s.faqs.length} questions</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ LIST */}
            <div className="mx-auto grid max-w-screen-xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8 lg:py-20">
                <aside className="hidden lg:block">
                    <nav aria-label="FAQ categories" className="sticky top-28 space-y-1">
                        {filteredSections.map((s) => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active === s.id ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}
                            >
                                <SectionIcon id={s.id} className="h-4 w-4 shrink-0" />
                                <span className="flex-1">{s.title}</span>
                                <span className={`text-xs ${active === s.id ? "text-emerald-100" : "text-slate-400"}`}>{s.faqs.length}</span>
                            </a>
                        ))}
                        <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
                            <p className="font-bold">Still need help?</p>
                            <p className="mt-1 text-sm text-slate-300">We are open 24 hours, 7 days a week.</p>
                            <a href={CONTACT_NUMBERS[0]?.href ?? "tel:+442039165312"} className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-300 hover:text-emerald-200">
                                <Phone className="h-4 w-4" aria-hidden="true" /> 020 3916 5312
                            </a>
                        </div>
                    </nav>
                </aside>

                <div className="min-w-0">
                    {filteredSections.length ? (
                        filteredSections.map((section) => (
                            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28 pb-14 last:pb-0">
                                <div className="flex items-start gap-4">
                                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                                        <SectionIcon id={section.id} className="h-6 w-6" />
                                    </span>
                                    <div>
                                        <h2 id={`${section.id}-title`} className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                            {section.title}
                                        </h2>
                                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{section.description}</p>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    {section.faqs.map((faq) => (
                                        <details
                                            key={faq.question}
                                            id={toId(section.id, faq.question)}
                                            className="group scroll-mt-28 rounded-2xl border border-slate-200 bg-white transition open:border-emerald-300 open:shadow-lg open:shadow-emerald-900/5 hover:border-emerald-200"
                                        >
                                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-bold text-slate-950 sm:text-lg [&::-webkit-details-marker]:hidden">
                                                {faq.question}
                                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-lg font-bold text-emerald-700 transition group-open:rotate-45 group-open:bg-emerald-600 group-open:text-white" aria-hidden="true">
                                                    +
                                                </span>
                                            </summary>
                                            <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                                                <p className="leading-7 text-slate-600">{faq.answer}</p>
                                                {faq.link && (
                                                    <Link href={faq.link.href} className="mt-3 inline-flex items-center gap-1 font-semibold text-emerald-700 hover:underline">
                                                        {faq.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                                    </Link>
                                                )}
                                            </div>
                                        </details>
                                    ))}
                                </div>

                                {!query && relatedServicesByCategory[section.id]?.length ? (
                                    <div className="mt-5 flex flex-wrap items-center gap-2">
                                        <span className="text-sm font-semibold text-slate-500">Related:</span>
                                        {relatedServicesByCategory[section.id].map((s) => (
                                            <Link
                                                key={`${section.id}-${s.href}`}
                                                href={s.href}
                                                title={s.description}
                                                className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-600 hover:text-white"
                                            >
                                                {s.title}
                                            </Link>
                                        ))}
                                    </div>
                                ) : null}
                            </section>
                        ))
                    ) : (
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
                            <h2 className="text-2xl font-black text-slate-950">No matching questions found</h2>
                            <p className="mt-3 text-slate-600">Try a broader word, or ask our team directly.</p>
                            <button type="button" onClick={() => setQuery("")} className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700">
                                Clear search
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* SERVICE SHORTCUTS */}
            {!query && (
                <section aria-labelledby="service-shortcuts" className="border-t border-slate-200 bg-slate-50 py-14 lg:py-20">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <h2 id="service-shortcuts" className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Looking for a specific service?</h2>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {serviceShortcuts.map((s) => (
                                <Link key={s.href} href={s.href} className="kxh-card3d group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-lg">
                                    <span>
                                        <span className="block font-bold text-slate-950 group-hover:text-emerald-700">{s.title}</span>
                                        <span className="mt-1 block text-sm leading-6 text-slate-600">{s.description}</span>
                                    </span>
                                    <ArrowRight className="h-5 w-5 shrink-0 text-emerald-600 transition group-hover:translate-x-1" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="kxh-hero relative mx-auto max-w-screen-xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-950 px-6 py-14 text-center text-white shadow-2xl sm:px-12">
                    <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Did not find your answer?</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-emerald-50">Tell us about your items, addresses and dates and we will recommend the right service.</p>
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link href="/get-a-quote" className="kxh-shine relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-7 py-4 text-sm font-bold text-emerald-800 shadow-xl transition hover:-translate-y-0.5">
                            Get Instant Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        {CONTACT_NUMBERS.map((c) => (
                            <a key={c.href} href={c.href} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/20">
                                <Phone className="h-4 w-4" aria-hidden="true" /> {c.label}: {c.phone}
                            </a>
                        ))}
                        <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10">
                            Contact us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
