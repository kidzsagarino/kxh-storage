"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, X } from "lucide-react";

export type Area = {
    slug: string;
    name: string;
    postcodes: string;
    places: string;
};

/** Boroughs with a local page for every service. Postcode districts are the main ones each borough covers. */
export const AREAS: Area[] = [
    { slug: "camden", name: "Camden", postcodes: "NW1, NW3, NW5, NW6, WC1", places: "Camden Town, Kentish Town, Hampstead, Bloomsbury" },
    { slug: "westminster", name: "Westminster", postcodes: "W1, W2, SW1, WC2, NW8", places: "Mayfair, Soho, Marylebone, Pimlico, Paddington" },
    { slug: "hackney", name: "Hackney", postcodes: "E2, E5, E8, E9, N16", places: "Dalston, Shoreditch, Stoke Newington, Homerton" },
    { slug: "islington", name: "Islington", postcodes: "N1, N4, N5, N7, N19, EC1", places: "Angel, Highbury, Holloway, Archway, Clerkenwell" },
    { slug: "kensington-chelsea", name: "Kensington & Chelsea", postcodes: "SW3, SW5, SW7, SW10, W8, W10, W11", places: "Chelsea, South Kensington, Notting Hill, Earl's Court" },
    { slug: "tower-hamlets", name: "Tower Hamlets", postcodes: "E1, E2, E3, E14", places: "Whitechapel, Bethnal Green, Bow, Canary Wharf" },
    { slug: "southwark", name: "Southwark", postcodes: "SE1, SE5, SE15, SE16, SE22", places: "Borough, Bermondsey, Peckham, Camberwell, Dulwich" },
    { slug: "lambeth", name: "Lambeth", postcodes: "SE11, SW2, SW4, SW8, SW9, SE27", places: "Brixton, Clapham, Vauxhall, Streatham, Waterloo" },
];

const AREA_SERVICES = [
    { label: "Warehouse Storage", href: "/warehouse-storage-london" },
    { label: "Business Storage", href: "/business-storage-london" },
    { label: "Moving Services", href: "/logistics-moving-london" },
    { label: "Pallet Storage", href: "/pallet-storage-london" },
    { label: "Inventory Management", href: "/inventory-management-london" },
    { label: "Commercial Storage", href: "/commercial-storage-london" },
    { label: "Third Party Logistics", href: "/third-party-logistics-london" },
    { label: "Document Shredding", href: "/shredding-solutions-london" },
];

function mapSrc(area: Area) {
    const q = encodeURIComponent(`London Borough of ${area.name.replace("&", "and")}, London, UK`);
    return `https://maps.google.com/maps?q=${q}&z=13&output=embed`;
}

export default function AreaMapExplorer({ primaryHref }: { primaryHref?: string } = {}) {
    const [active, setActive] = useState<Area | null>(null);
    const primary = AREA_SERVICES.find((s) => s.href === primaryHref);
    const services = primary ? [primary, ...AREA_SERVICES.filter((s) => s !== primary)] : AREA_SERVICES;
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!active) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActive(null);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [active]);

    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {AREAS.map((area, i) => (
                    <button
                        key={area.slug}
                        type="button"
                        onClick={() => setActive(area)}
                        className="kxh-reveal kxh-card3d group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm"
                        style={{ transitionDelay: `${(i % 4) * 60}ms` }}
                        aria-haspopup="dialog"
                        aria-label={`Show ${area.name} on the map`}
                    >
                        <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-100 transition-transform duration-500 group-hover:scale-[2.2]" aria-hidden="true" />
                        <span className="kxh-pop relative flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                            <MapPin className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="relative mt-4 block text-lg font-black text-slate-900">{area.name}</span>
                        <span className="relative mt-1 block text-xs font-semibold tracking-wide text-emerald-700">{area.postcodes}</span>
                        <span className="relative mt-2 block text-sm leading-6 text-slate-600">{area.places}</span>
                        <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                            View on map <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </span>
                    </button>
                ))}
            </div>

            {active && (
                <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${active.name} service area map`}>
                    <button type="button" className="kxh-fade absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setActive(null)} aria-label="Close map" tabIndex={-1} />
                    <div className="kxh-sheet relative grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl lg:grid-cols-[1.4fr_1fr]">
                        <div className="relative h-[42vh] bg-slate-100 sm:h-[52vh] lg:h-auto lg:min-h-[520px]">
                            <iframe
                                key={active.slug}
                                title={`Map of ${active.name}, London`}
                                src={mapSrc(active)}
                                className="absolute inset-0 h-full w-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                        <div className="overflow-y-auto p-6 sm:p-7">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">London service area</p>
                                    <p className="mt-1 text-2xl font-black text-slate-900">{active.name}</p>
                                    <p className="mt-1 text-sm text-slate-500">Postcodes {active.postcodes}</p>
                                </div>
                                <button
                                    ref={closeRef}
                                    type="button"
                                    onClick={() => setActive(null)}
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-100"
                                    aria-label="Close map"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <p className="mt-4 text-sm leading-6 text-slate-600">
                                We collect from homes, flats, student halls and businesses in {active.places} and the rest of {active.name}.
                            </p>
                            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Services in {active.name}</p>
                            <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
                                {services.map((s) => (
                                    <li key={s.href}>
                                        <Link
                                            href={`${s.href}/${active.slug}`}
                                            className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                                        >
                                            {s.label}
                                            <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {primary && (
                                <Link
                                    href={`${primary.href}/${active.slug}`}
                                    className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100"
                                >
                                    {primary.label} in {active.name} <ArrowRight className="h-4 w-4" />
                                </Link>
                            )}
                            <Link
                                href="/get-a-quote"
                                className="kxh-shine relative mt-3 flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-800"
                            >
                                Get a quote for {active.name} <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
