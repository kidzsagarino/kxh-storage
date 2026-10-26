import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Boxes,
    BriefcaseBusiness,
    Building2,
    CalendarCheck,
    CheckCircle2,
    Clock,
    GraduationCap,
    Home,
    KeyRound,
    Mail,
    MapPin,
    PackageCheck,
    Phone,
    ShieldCheck,
    ShoppingBag,
    Timer,
    Truck,
    Warehouse,
} from "lucide-react";
import AreaMapExplorer from "./AreaMapExplorer";
import TestimonialsSection from "./TestimonialsSection";
import { CONTACT_NUMBERS } from "../lib/contact";

type Faq = { q: string; a: string };

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
    return (
        <p
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] ${
                light ? "bg-white/10 text-emerald-300" : "bg-emerald-50 text-emerald-700"
            }`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-emerald-300" : "bg-emerald-600"}`} />
            {children}
        </p>
    );
}

const STEPS = [
    {
        icon: CalendarCheck,
        title: "Book online in minutes",
        text: "Choose storage, moving, shredding or a return, pick a date and see your price instantly.",
    },
    {
        icon: Truck,
        title: "We collect from your door",
        text: "Our team collects from homes, offices, student halls and businesses anywhere in London.",
    },
    {
        icon: Warehouse,
        title: "Stored safely, returned on request",
        text: "Items are kept in our monitored warehouse and delivered back whenever you need them.",
    },
];

const WHY = [
    { icon: Truck, title: "Door-to-door collection", desc: "We collect from homes, offices, student accommodation and business premises across London." },
    { icon: ShieldCheck, title: "Secure warehouse storage", desc: "Monitored warehouse with controlled access, organised racking and careful handling." },
    { icon: Timer, title: "Flexible storage terms", desc: "Store for a few weeks or many months. Longer plans get a lower monthly price." },
    { icon: PackageCheck, title: "Return delivery", desc: "Ask for some or all of your items back and we deliver them to the address you choose." },
    { icon: BriefcaseBusiness, title: "Business & student support", desc: "Stock, office equipment, archives, student belongings and household items." },
    { icon: Clock, title: "Instant online quotes", desc: "See your price online and book in a few clicks, any time of day or night." },
];

const SERVICES = [
    { href: "/warehouse-storage-london", title: "Warehouse Storage", desc: "Managed storage with collection and return delivery.", img: "/images/kxh-collection-delivery-london.webp" },
    { href: "/logistics-moving-london", title: "Moving & Removals", desc: "Same-day house, flat and office moves in London.", img: "/images/kxh-moving-removals-london.webp" },
    { href: "/student-storage-london", title: "Student Storage", desc: "Summer and term-break storage for students.", img: "/images/kxh-student-storage-london.webp" },
    { href: "/business-storage-london", title: "Business Storage", desc: "Space for stock, equipment and archives.", img: "/images/kxh-business-storage-london.webp" },
    { href: "/pallet-storage-london", title: "Pallet Storage", desc: "Pallet space for retail, wholesale and bulk goods.", img: "/images/kxh-pallet-storage-london.webp" },
    { href: "/inventory-management-london", title: "Inventory Management", desc: "Organised stock handling, counts and dispatch.", img: "/images/kxh-inventory-management-london.webp" },
    { href: "/third-party-logistics-london", title: "Third Party Logistics", desc: "3PL storage, picking and delivery support.", img: "/images/kxh-third-party-logistics-london.webp" },
    { href: "/commercial-storage-london", title: "Commercial Storage", desc: "Scalable storage for growing organisations.", img: "/images/kxh-commercial-storage-london.webp" },
    { href: "/shredding-solutions-london", title: "Document Shredding", desc: "Confidential collection and secure destruction.", img: "/images/kxh-shredding-solutions-london.webp" },
];

const AUDIENCES = [
    { icon: BriefcaseBusiness, title: "Businesses", desc: "Storage for stock, office equipment, archives and commercial items.", href: "/business-storage-london" },
    { icon: GraduationCap, title: "Students", desc: "Storage for summer breaks, accommodation moves and term gaps.", href: "/student-storage-london" },
    { icon: KeyRound, title: "Renters", desc: "Short-term storage during flat moves, delayed move-ins and relocations.", href: "/warehouse-storage-london" },
    { icon: Building2, title: "Office relocations", desc: "Moving and storage for office furniture, equipment and IT.", href: "/office-removals-london" },
    { icon: ShoppingBag, title: "Retail & ecommerce", desc: "Inventory, pallet and warehouse support for growing brands.", href: "/ecommerce-storage-london" },
    { icon: Home, title: "Households", desc: "Flexible household storage with collection and return delivery.", href: "/house-removals-london" },
];

const BUSINESS_LINKS = [
    { label: "Business Storage London", href: "/business-storage-london" },
    { label: "Inventory Management London", href: "/inventory-management-london" },
    { label: "Pallet Storage London", href: "/pallet-storage-london" },
    { label: "Commercial Storage London", href: "/commercial-storage-london" },
    { label: "Third Party Logistics London", href: "/third-party-logistics-london" },
    { label: "Ecommerce Storage London", href: "/ecommerce-storage-london" },
];

export default function HomeSections({ faqs }: { faqs: Faq[] }) {
    return (
        <>
            {/* HOW IT WORKS */}
            <section className="bg-white py-16 lg:py-24">
                <div className="mx-auto grid max-w-screen-xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div className="kxh-reveal">
                        <Eyebrow>How it works</Eyebrow>
                        <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl lg:text-5xl">
                            Storage with pickup and delivery in London
                        </h2>
                        <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                            A fully managed storage service: we collect, store and return your items. You never need to
                            hire a van or visit a storage unit.
                        </p>
                        <ol className="mt-8 space-y-4">
                            {STEPS.map(({ icon: Icon, title, text }, i) => (
                                <li
                                    key={title}
                                    className="kxh-reveal group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-lg"
                                    style={{ transitionDelay: `${i * 80}ms` }}
                                >
                                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 transition group-hover:rotate-6">
                                        <Icon className="h-6 w-6" aria-hidden="true" />
                                        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                                            {i + 1}
                                        </span>
                                    </span>
                                    <span>
                                        <span className="block font-bold text-slate-900">{title}</span>
                                        <span className="mt-1 block text-sm leading-6 text-slate-600">{text}</span>
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="kxh-reveal relative">
                        <div className="absolute -inset-4 -z-10 rotate-2 rounded-[2rem] bg-gradient-to-br from-emerald-200 to-lime-100" aria-hidden="true" />
                        <div className="overflow-hidden rounded-[1.75rem] shadow-2xl">
                            <Image
                                src="/images/kxh-collection-delivery-london.webp"
                                alt="KXH team collecting boxes from a London home for storage"
                                width={1600}
                                height={900}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="h-[320px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[460px]"
                            />
                        </div>
                        <div className="absolute -bottom-6 left-6 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Open</p>
                            <p className="text-xl font-black text-emerald-700">24 hours · 7 days</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY KXH */}
            <section className="border-t border-slate-200/70 bg-slate-50 py-16 lg:py-24">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="kxh-reveal mx-auto max-w-3xl text-center">
                        <Eyebrow>Why choose KXH</Eyebrow>
                        <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Storage, collection and delivery made simple</h2>
                        <p className="mt-4 text-slate-600">
                            KXH Storage &amp; Logistics helps London customers avoid the stress of self-storage, van hire and
                            separate transport. We collect, store and return your items when you need them.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {WHY.map(({ icon: Icon, title, desc }, i) => (
                            <div
                                key={title}
                                className="kxh-reveal kxh-card3d group rounded-3xl border border-slate-200 bg-white p-7"
                                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                            >
                                <span className="kxh-pop flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                                    <Icon className="h-6 w-6" aria-hidden="true" />
                                </span>
                                <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="bg-white py-16 lg:py-24">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="kxh-reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="max-w-2xl">
                            <Eyebrow>Our services</Eyebrow>
                            <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl lg:text-5xl">Choose the service that fits your move</h2>
                            <p className="mt-4 text-lg text-slate-600">
                                From secure storage and same-day moving to confidential shredding, with clear pricing and
                                flexible scheduling.
                            </p>
                        </div>
                        <Link href="/services" className="inline-flex items-center gap-2 font-bold text-emerald-700 hover:underline">
                            View all services <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {SERVICES.map((s, i) => (
                            <Link
                                key={s.href}
                                href={s.href}
                                className="kxh-reveal kxh-card3d group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl bg-slate-900"
                                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                            >
                                <Image
                                    src={s.img}
                                    alt={`${s.title} in London by KXH`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover opacity-90 transition duration-700 group-hover:scale-110"
                                />
                                <span className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" aria-hidden="true" />
                                <span className="kxh-pop relative p-6">
                                    <span className="block text-xl font-black text-white">{s.title}</span>
                                    <span className="mt-1 block text-sm text-slate-200">{s.desc}</span>
                                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur transition group-hover:bg-emerald-500">
                                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                                    </span>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHO WE HELP */}
            <section className="relative overflow-hidden bg-[#04140f] py-16 text-white lg:py-24">
                <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-emerald-600/25 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" aria-hidden="true" />
                <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="kxh-reveal max-w-3xl">
                        <Eyebrow light>Who we help</Eyebrow>
                        <h2 className="mt-4 text-3xl font-black sm:text-4xl" style={{ color: "#fff" }}>
                            Storage &amp; logistics support for London customers
                        </h2>
                        <p className="mt-4 text-slate-300">
                            Flexible storage, collection, delivery and moving support for businesses, students, renters,
                            households and office teams.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {AUDIENCES.map(({ icon: Icon, title, desc, href }, i) => (
                            <Link
                                key={title}
                                href={href}
                                className="kxh-reveal group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-white/[0.08]"
                                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                            >
                                <Icon className="h-8 w-8 text-emerald-300 transition group-hover:scale-110" aria-hidden="true" />
                                <span className="mt-4 block text-xl font-bold text-white">{title}</span>
                                <span className="mt-2 block text-sm leading-6 text-slate-300">{desc}</span>
                                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-emerald-300">
                                    Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* BUSINESS */}
            <section className="bg-white py-16 lg:py-24">
                <div className="mx-auto grid max-w-screen-xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div className="kxh-reveal relative order-2 lg:order-1">
                        <div className="overflow-hidden rounded-[1.75rem] shadow-2xl">
                            <Image
                                src="/images/kxh-business-storage-london.webp"
                                alt="Business stock and office equipment stored in the KXH warehouse in London"
                                width={1600}
                                height={900}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="h-[320px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[440px]"
                            />
                        </div>
                        <div className="absolute -right-3 -top-5 hidden rounded-2xl bg-emerald-600 px-5 py-4 text-white shadow-xl sm:block">
                            <Boxes className="h-6 w-6" aria-hidden="true" />
                            <p className="mt-1 text-sm font-bold">Stock · Pallets · Archives</p>
                        </div>
                    </div>
                    <div className="kxh-reveal order-1 lg:order-2">
                        <Eyebrow>For businesses</Eyebrow>
                        <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Warehouse storage &amp; inventory management for London businesses</h2>
                        <p className="mt-4 leading-7 text-slate-600">
                            Secure warehouse storage, inventory management and stock handling for businesses across London.
                            Manage excess inventory, office equipment, retail stock, archived documents and pallets without
                            signing a long warehouse lease.
                        </p>
                        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                            {["Short-term warehouse overflow", "Pallet and bulk storage", "Office equipment storage", "Collection and return delivery"].map((t) => (
                                <li key={t} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /> {t}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-7 flex flex-wrap gap-2">
                            {BUSINESS_LINKS.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* STUDENTS */}
            <section className="border-t border-slate-200/70 bg-gradient-to-br from-emerald-50 via-white to-lime-50 py-16 lg:py-24">
                <div className="mx-auto grid max-w-screen-xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div className="kxh-reveal">
                        <Eyebrow>Student storage London</Eyebrow>
                        <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Student storage with collection &amp; delivery</h2>
                        <p className="mt-4 leading-7 text-slate-600">
                            Storage for summer breaks, university accommodation moves, term breaks, shared house moves and gaps
                            between tenancies. We collect from halls, private student accommodation, shared houses and flats
                            across London, and bring everything back when your new term starts.
                        </p>
                        <ul className="mt-6 space-y-2.5">
                            {["Summer student storage", "University accommodation moves", "Storage between tenancies", "Collection from halls, flats and shared houses", "Return delivery when needed"].map((t) => (
                                <li key={t} className="flex items-center gap-2 text-slate-700">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" /> {t}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/student-storage-london"
                            className="kxh-shine relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-emerald-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-700/25 transition hover:-translate-y-0.5 hover:bg-emerald-800"
                        >
                            View student storage <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="kxh-reveal">
                        <div className="overflow-hidden rounded-[1.75rem] shadow-2xl">
                            <Image
                                src="/images/kxh-student-storage-london.webp"
                                alt="Student belongings packed for storage with KXH in London"
                                width={1600}
                                height={900}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="h-[320px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[440px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* AREAS + MAP */}
            <section id="areas" className="bg-white py-16 lg:py-24">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="kxh-reveal max-w-3xl">
                        <Eyebrow>London boroughs</Eyebrow>
                        <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Storage services across London boroughs</h2>
                        <p className="mt-4 text-slate-600">
                            Tap an area to see it on the map and choose a local service. We also collect from the rest of
                            Greater London, including our home base in Newham (E13).
                        </p>
                    </div>
                    <div className="mt-10">
                        <AreaMapExplorer />
                    </div>
                </div>
            </section>

            <TestimonialsSection />

            {/* REAL PHOTOS */}
            <section className="bg-white py-16 lg:py-20">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="kxh-reveal max-w-2xl">
                        <Eyebrow>On the road</Eyebrow>
                        <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Our vans and warehouse</h2>
                    </div>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {[
                            { src: "/images/new-van.webp", alt: "KXH Storage & Logistics van in London" },
                            { src: "/images/delivery-warehouse.webp", alt: "KXH van collecting from a London apartment building" },
                            { src: "/images/warehouse.webp", alt: "Racking inside the KXH storage warehouse" },
                        ].map((p, i) => (
                            <div
                                key={p.src}
                                className="kxh-reveal kxh-card3d overflow-hidden rounded-3xl border border-slate-200 bg-slate-100"
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                <Image
                                    src={p.src}
                                    alt={p.alt}
                                    width={1200}
                                    height={800}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="h-64 w-full object-cover transition duration-700 hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 pb-16 sm:px-6 lg:px-8">
                <div className="kxh-reveal relative mx-auto max-w-screen-xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 px-6 py-14 text-center shadow-2xl sm:px-12">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime-300/20 blur-3xl" aria-hidden="true" />
                    <p className="relative text-sm font-bold uppercase tracking-[0.18em] text-emerald-200">Instant online quote</p>
                    <h2 className="relative mx-auto mt-3 max-w-3xl text-3xl font-black sm:text-4xl lg:text-5xl" style={{ color: "#fff" }}>
                        Ready to get your storage or moving quote?
                    </h2>
                    <p className="relative mx-auto mt-5 max-w-2xl text-emerald-50/90">
                        Tell us what you need and get an instant estimate for warehouse, business or student storage,
                        moving, collection and delivery across London.
                    </p>
                    <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href="/get-a-quote"
                            className="kxh-shine relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-white px-8 py-4 text-sm font-bold text-emerald-800 shadow-xl transition hover:-translate-y-0.5"
                        >
                            Get Instant Quote <ArrowRight className="h-4 w-4" />
                        </Link>
                        <a
                            href={CONTACT_NUMBERS[0].href}
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/30 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                        >
                            <Phone className="h-4 w-4" /> Call 020 3916 5312
                        </a>
                    </div>
                    <div className="relative mt-8 flex flex-wrap justify-center gap-3 text-sm text-white">
                        {["No obligation", "Instant estimate", "Collection & delivery"].map((t) => (
                            <span key={t} className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">✓ {t}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQS */}
            <section id="faq" className="border-t border-slate-200/70 bg-slate-50 py-16 lg:py-20">
                <div className="mx-auto grid max-w-screen-xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
                    <div className="kxh-reveal">
                        <Eyebrow>FAQs</Eyebrow>
                        <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Questions about storage and moving</h2>
                        <p className="mt-4 text-slate-600">Can’t find your answer? Call us any time on 020 3916 5312.</p>
                        <Link href="/faqs" className="mt-6 inline-flex items-center gap-2 font-bold text-emerald-700 hover:underline">
                            See all FAQs <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((f) => (
                            <details
                                key={f.q}
                                className="kxh-reveal group rounded-2xl border border-slate-200 bg-white p-5 transition open:border-emerald-300 open:shadow-lg"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">
                                    {f.q}
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-lg text-emerald-700 transition group-open:rotate-45" aria-hidden="true">
                                        +
                                    </span>
                                </summary>
                                <p className="mt-4 leading-7 text-slate-600">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="bg-white py-16 lg:py-20">
                <div className="mx-auto grid max-w-screen-xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div className="kxh-reveal">
                        <Eyebrow>Contact KXH</Eyebrow>
                        <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Need storage or logistics support in London?</h2>
                        <p className="mt-4 text-slate-600">
                            Our team can help with storage, moving, business inventory, student storage, pickup, delivery and
                            shredding enquiries.
                        </p>
                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            {CONTACT_NUMBERS.map((c) => (
                                <a
                                    key={c.href}
                                    href={c.href}
                                    className="group flex items-center gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:shadow-md"
                                >
                                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
                                        <Phone className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{c.label}</span>
                                        <span className="block font-bold text-slate-900">{c.phone}</span>
                                    </span>
                                </a>
                            ))}
                            <a
                                href="mailto:help@kxhlogistics.co.uk"
                                className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:shadow-md"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                    <Mail className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <span>
                                    <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Email</span>
                                    <span className="block font-bold text-slate-900">help@kxhlogistics.co.uk</span>
                                </span>
                            </a>
                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                    <Clock className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <span>
                                    <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Opening hours</span>
                                    <span className="block font-bold text-slate-900">Open 24 hours, 7 days a week</span>
                                </span>
                            </div>
                        </div>
                        <p className="mt-6 flex items-start gap-2 text-slate-600">
                            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                            9 New City Road, London E13 9LL
                        </p>
                    </div>
                    <div className="kxh-reveal overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
                        <iframe
                            title="KXH Storage & Logistics location, 9 New City Road, London E13 9LL"
                            src="https://maps.google.com/maps?q=9%20New%20City%20Road%2C%20London%20E13%209LL&z=15&output=embed"
                            className="h-[380px] w-full border-0 lg:h-full lg:min-h-[420px]"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
