import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Archive,
    Armchair,
    ArrowRight,
    Boxes,
    Building2,
    CalendarRange,
    CheckCircle2,
    ClipboardList,
    FileText,
    GraduationCap,
    HeartPulse,
    Home,
    Layers,
    Package,
    PackageCheck,
    Phone,
    RotateCcw,
    ShieldCheck,
    ShoppingCart,
    Store,
    Truck,
    Warehouse,
} from "lucide-react";
import CrispChat from "@/app/components/chat/CrispChat";
import MainFooter from "@/app/components/footer/MainFooter";
import Nav from "@/app/components/MobileNav";
import { londonLocations } from "../sitemap";
import TestimonialsSection from "../components/TestimonialsSection";
import ServiceHero from "../components/ServiceHero";
import ServiceShowcase from "../components/ServiceShowcase";
import AreaMapExplorer from "../components/AreaMapExplorer";

const SITE = "https://kxhlogistics.co.uk";

export const metadata: Metadata = {
    title: { absolute: "Storage, Moving & Logistics Services London | KXH" },
    description:
        "All KXH services in London: warehouse, business and student storage, pallet storage, inventory management, removals, packing and document shredding.",
    alternates: { canonical: `${SITE}/services` },
    openGraph: {
        title: "Storage, Moving & Logistics Services London | KXH",
        description:
            "Storage with collection and delivery, business logistics, removals and secure shredding across London. One team, one call.",
        url: `${SITE}/services`,
        images: ["/images/kxh-home-hero-warehouse-london.webp"],
    },
};

type Service = { title: string; href: string; image: string; icon: ReactNode; desc: string; points: string[] };
type Category = { id: string; name: string; eyebrow: string; intro: string; services: Service[] };

const IC = "h-5 w-5";

const CATEGORIES: Category[] = [
    {
        id: "home-storage",
        name: "Home & student storage",
        eyebrow: "For homes, renters and students",
        intro: "We collect your boxes and furniture, store them in our London warehouse and bring them back when you need them.",
        services: [
            {
                title: "Warehouse Storage London",
                href: "/warehouse-storage-london",
                image: "/images/kxh-collection-delivery-london.webp",
                icon: <Warehouse className={IC} />,
                desc: "Managed storage with pickup from your door and return delivery on request.",
                points: ["No van hire", "Flexible monthly plans", "Return on request"],
            },
            {
                title: "Student Storage London",
                href: "/student-storage-london",
                image: "/images/kxh-student-storage-london.webp",
                icon: <GraduationCap className={IC} />,
                desc: "Summer and term-break storage with collection from halls, flats and shared houses.",
                points: ["Halls and flat pickups", "Pay for what you store", "Delivery for new term"],
            },
            {
                title: "Furniture Storage London",
                href: "/furniture-storage-london",
                image: "/images/kxh-moving-removals-london.webp",
                icon: <Armchair className={IC} />,
                desc: "Sofas, beds, wardrobes and office furniture collected, protected and stored.",
                points: ["Careful handling", "Short or long term", "Home or office items"],
            },
        ],
    },
    {
        id: "business-storage",
        name: "Business storage & logistics",
        eyebrow: "For shops, brands and companies",
        intro: "Flexible warehouse space and logistics support without a lease, with collection and delivery handled by our own team.",
        services: [
            {
                title: "Business Storage London",
                href: "/business-storage-london",
                image: "/images/kxh-business-storage-london.webp",
                icon: <Building2 className={IC} />,
                desc: "Storage for stock, equipment, files and office items with flexible terms.",
                points: ["No long lease", "Collection included", "Scale up or down"],
            },
            {
                title: "Commercial Storage London",
                href: "/commercial-storage-london",
                image: "/images/kxh-commercial-storage-london.webp",
                icon: <Boxes className={IC} />,
                desc: "Overflow space for inventory, equipment and commercial goods.",
                points: ["Overflow stock", "Equipment storage", "Scheduled deliveries"],
            },
            {
                title: "Pallet Storage London",
                href: "/pallet-storage-london",
                image: "/images/kxh-pallet-storage-london.webp",
                icon: <Layers className={IC} />,
                desc: "Pay-per-pallet space for palletised stock and bulk goods.",
                points: ["Pay per pallet", "Racked storage", "Delivery across London"],
            },
            {
                title: "Inventory Management London",
                href: "/inventory-management-london",
                image: "/images/kxh-inventory-management-london.webp",
                icon: <ClipboardList className={IC} />,
                desc: "Stock grouped, labelled and tracked so you can call it back quickly.",
                points: ["Labelled stock", "Easy retrieval", "Growing businesses"],
            },
            {
                title: "Third Party Logistics London",
                href: "/third-party-logistics-london",
                image: "/images/kxh-third-party-logistics-london.webp",
                icon: <PackageCheck className={IC} />,
                desc: "3PL support for storage, order handling and delivery coordination.",
                points: ["Warehouse storage", "Order support", "London delivery"],
            },
            {
                title: "Ecommerce Storage London",
                href: "/ecommerce-storage-london",
                image: "/images/kxh-third-party-logistics-london.webp",
                icon: <ShoppingCart className={IC} />,
                desc: "Stock storage for online sellers, close to your London customers.",
                points: ["Online seller stock", "Returns space", "Seasonal peaks"],
            },
            {
                title: "Retail Stock Storage London",
                href: "/retail-stock-storage-london",
                image: "/images/kxh-business-storage-london.webp",
                icon: <Store className={IC} />,
                desc: "Room for surplus, seasonal and display stock, returned when you need it.",
                points: ["Seasonal stock", "Shop fit-outs", "Fast return"],
            },
        ],
    },
    {
        id: "moving",
        name: "Moving & removals",
        eyebrow: "Home and office moves",
        intro: "Our own vans and crew pack, move and deliver, with storage ready if your dates do not line up.",
        services: [
            {
                title: "Moving Services London",
                href: "/logistics-moving-london",
                image: "/images/kxh-moving-removals-london.webp",
                icon: <Truck className={IC} />,
                desc: "Home and office moves with packing, transport and optional storage.",
                points: ["Own vans and crew", "Packing available", "Storage between moves"],
            },
            {
                title: "House Removals London",
                href: "/house-removals-london",
                image: "/images/delivery-warehouse.webp",
                icon: <Home className={IC} />,
                desc: "Flat and house moves handled carefully from first box to last.",
                points: ["Furniture protection", "Flats and houses", "Fixed quote"],
            },
            {
                title: "Office Removals London",
                href: "/office-removals-london",
                image: "/images/kxh-commercial-storage-london.webp",
                icon: <Building2 className={IC} />,
                desc: "Planned office relocations with labelling and minimal downtime.",
                points: ["Desks and IT", "Evening or weekend", "Staged delivery"],
            },
            {
                title: "Moving & Storage London",
                href: "/moving-house-storage-london",
                image: "/images/kxh-collection-delivery-london.webp",
                icon: <RotateCcw className={IC} />,
                desc: "Move out, store for as long as you need and deliver to your new home.",
                points: ["One team", "Flexible dates", "Delivery when ready"],
            },
            {
                title: "Packing Services London",
                href: "/packing-services-london",
                image: "/images/kxh-moving-removals-london.webp",
                icon: <Package className={IC} />,
                desc: "Professional packing, wrapping and labelling for every room.",
                points: ["Materials supplied", "Fragile items", "Labelled boxes"],
            },
        ],
    },
    {
        id: "specialist",
        name: "Specialist & secure storage",
        eyebrow: "Records, documents and equipment",
        intro: "Secure handling for confidential paperwork, business archives and specialist equipment.",
        services: [
            {
                title: "Document Shredding London",
                href: "/shredding-solutions-london",
                image: "/images/kxh-shredding-solutions-london.webp",
                icon: <FileText className={IC} />,
                desc: "Secure collection and destruction of confidential documents.",
                points: ["Sealed collection", "Secure destruction", "Home or office"],
            },
            {
                title: "Archive Storage London",
                href: "/archive-storage-london",
                image: "/images/kxh-inventory-management-london.webp",
                icon: <Archive className={IC} />,
                desc: "Business records stored securely and returned when you need a file.",
                points: ["Labelled boxes", "Easy retrieval", "Clear office space"],
            },
            {
                title: "Healthcare Storage London",
                href: "/healthcare-storage-london",
                image: "/images/kxh-business-storage-london.webp",
                icon: <HeartPulse className={IC} />,
                desc: "Storage for clinics and practices: records, furniture and non-clinical kit.",
                points: ["Clinics and practices", "Approved records", "Scheduled returns"],
            },
            {
                title: "Event Equipment Storage London",
                href: "/event-equipment-storage-london",
                image: "/images/kxh-commercial-storage-london.webp",
                icon: <CalendarRange className={IC} />,
                desc: "Stands, displays and flight cases stored and delivered to your venue.",
                points: ["Exhibition stands", "Venue delivery", "Between events"],
            },
        ],
    },
];

const ALL_SERVICES = CATEGORIES.flatMap((c) => c.services);

const STEPS = [
    { n: "01", title: "Get a quote", text: "Tell us what you need online or by phone. Clear pricing, no surprises." },
    { n: "02", title: "We collect", text: "Our team arrives with our own van at a time that suits you." },
    { n: "03", title: "We store or move", text: "Items go into our secure London warehouse or straight to the new address." },
    { n: "04", title: "We deliver back", text: "Ask for some or all of your items back and we deliver them to you." },
];

const MATCH = [
    { need: "I am moving home and my new place is not ready", service: "Moving & Storage London", href: "/moving-house-storage-london" },
    { need: "I am a student leaving halls for the summer", service: "Student Storage London", href: "/student-storage-london" },
    { need: "My shop or online store has too much stock", service: "Ecommerce or Retail Stock Storage", href: "/ecommerce-storage-london" },
    { need: "I need space for pallets or bulk goods", service: "Pallet Storage London", href: "/pallet-storage-london" },
    { need: "My office is relocating", service: "Office Removals London", href: "/office-removals-london" },
    { need: "I have confidential papers to destroy", service: "Document Shredding London", href: "/shredding-solutions-london" },
];

const faqs = [
    {
        q: "What services does KXH offer in London?",
        a: "KXH offers warehouse, student, furniture and business storage, pallet storage, inventory management, third party logistics, ecommerce and retail stock storage, home and office removals, packing services, archive storage and secure document shredding across London.",
    },
    {
        q: "Do you collect and deliver?",
        a: "Yes. Our own team collects from your home or business, stores your items in our London warehouse and delivers them back when you ask.",
    },
    {
        q: "Can businesses store stock with KXH?",
        a: "Yes. We store ecommerce stock, retail inventory, pallets, office equipment, archive boxes and commercial overflow with flexible terms and no long lease.",
    },
    {
        q: "Do you offer short-term and long-term storage?",
        a: "Yes. You can store for a few weeks or for as long as you need, and pay monthly for the space you use.",
    },
    {
        q: "Which areas of London do you cover?",
        a: "We work across London, including Camden, Westminster, Hackney, Islington, Southwark, Lambeth, Tower Hamlets and Kensington & Chelsea. Contact us with your postcode to confirm availability.",
    },
    {
        q: "What are your opening hours?",
        a: "We are open 24 hours a day, 7 days a week. Call 020 3916 5312 or get an instant quote online.",
    },
    {
        q: "Can renters use KXH for temporary storage?",
        a: "Yes. Many renters store with us while moving house, renovating, downsizing or waiting for a tenancy to start.",
    },
];

function SchemaJsonLd() {
    const graph = [
        {
            "@type": "ItemList",
            name: "KXH Storage & Logistics services in London",
            itemListElement: ALL_SERVICES.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                    "@type": "Service",
                    name: s.title,
                    url: `${SITE}${s.href}`,
                    description: s.desc,
                    areaServed: { "@type": "City", name: "London" },
                    provider: { "@id": `${SITE}/#business` },
                },
            })),
        },
        {
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE },
                { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
            ],
        },
        {
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
        },
    ];
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
        />
    );
}

function ServiceCard({ s, i }: { s: Service; i: number }) {
    return (
        <Link
            href={s.href}
            className="kxh-reveal kxh-card3d group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
            style={{ transitionDelay: `${(i % 3) * 70}ms` }}
        >
            <div className="relative h-44 overflow-hidden bg-slate-900">
                <Image
                    src={s.image}
                    alt={`${s.title} by KXH Storage & Logistics`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" aria-hidden="true" />
                <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white text-emerald-700 shadow-lg">{s.icon}</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-black text-slate-950">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
                <ul className="mt-4 space-y-1.5">
                    {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" /> {p}
                        </li>
                    ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-emerald-700">
                    Explore service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
            </div>
        </Link>
    );
}

export default function ServicesPage() {
    return (
        <>
            <CrispChat />
            <Nav />
            <main className="min-h-screen bg-white text-slate-900">
                <SchemaJsonLd />

                <ServiceHero
                    image="/images/kxh-home-hero-warehouse-london.webp"
                    imageAlt="KXH Storage & Logistics warehouse in London"
                    breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
                    eyebrow="All KXH services"
                    title="Storage, Moving & Logistics Services in London"
                    highlight="Logistics Services"
                    intro="One London team for storage with collection and delivery, business logistics, home and office moves and secure document shredding. Pick a service below or call us and we will point you to the right one."
                    chips={["Collection and delivery included", "Secure London warehouse", "Open 24 hours, 7 days", "Homes, students and businesses"]}
                    ctaHref="/get-a-quote"
                    ctaLabel="Get Instant Quote"
                    cardEyebrow="Choose a category"
                    cardTitle={`${ALL_SERVICES.length} services, one team`}
                    cardItems={[
                        { icon: <Warehouse className="h-6 w-6" />, title: "Home storage", text: "Boxes, furniture, students" },
                        { icon: <Building2 className="h-6 w-6" />, title: "Business", text: "Stock, pallets, 3PL" },
                        { icon: <Truck className="h-6 w-6" />, title: "Moving", text: "Home and office moves" },
                        { icon: <ShieldCheck className="h-6 w-6" />, title: "Secure", text: "Shredding and archives" },
                    ]}
                />

                {/* CATEGORY JUMP NAV */}
                <nav aria-label="Service categories" className="sticky top-16 z-30 border-b border-slate-200 bg-white/90 backdrop-blur lg:top-[72px]">
                    <div className="mx-auto flex max-w-screen-xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
                        {CATEGORIES.map((c) => (
                            <a
                                key={c.id}
                                href={`#${c.id}`}
                                className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800"
                            >
                                {c.name}
                                <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">{c.services.length}</span>
                            </a>
                        ))}
                        <a href="#how-it-works" className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-slate-500 hover:text-emerald-700">
                            How it works
                        </a>
                        <a href="#faqs" className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-slate-500 hover:text-emerald-700">
                            FAQs
                        </a>
                    </div>
                </nav>

                {/* SERVICE CATEGORIES */}
                {CATEGORIES.map((c, ci) => (
                    <section key={c.id} id={c.id} className={`py-16 lg:py-20 ${ci % 2 ? "bg-slate-50" : "bg-white"}`}>
                        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                            <div className="kxh-reveal flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                                <div className="max-w-2xl">
                                    <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                                        {c.eyebrow}
                                    </p>
                                    <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{c.name}</h2>
                                    <p className="mt-3 text-base leading-7 text-slate-600">{c.intro}</p>
                                </div>
                                <Link href="/get-a-quote" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:underline">
                                    Get a quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                            </div>
                            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {c.services.map((s, i) => (
                                    <ServiceCard key={s.href + s.title} s={s} i={i} />
                                ))}
                            </div>
                        </div>
                    </section>
                ))}

                {/* HOW IT WORKS */}
                <section id="how-it-works" className="kxh-hero relative overflow-hidden bg-slate-950 py-16 text-white lg:py-24">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" aria-hidden="true" />
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="kxh-reveal max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">How it works</p>
                            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Four simple steps, whatever the service</h2>
                        </div>
                        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {STEPS.map((s, i) => (
                                <li
                                    key={s.n}
                                    className="kxh-reveal kxh-card3d rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-emerald-400/50 hover:bg-white/10"
                                    style={{ transitionDelay: `${i * 80}ms` }}
                                >
                                    <span className="text-4xl font-black text-emerald-400/80">{s.n}</span>
                                    <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-300">{s.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* WHICH SERVICE */}
                <section className="bg-white py-16 lg:py-24">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="kxh-reveal mx-auto max-w-2xl text-center">
                            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                                Not sure where to start?
                            </p>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Which KXH service is right for you?</h2>
                        </div>
                        <div className="mt-10 grid gap-3 md:grid-cols-2">
                            {MATCH.map((m) => (
                                <Link
                                    key={m.need}
                                    href={m.href}
                                    className="kxh-reveal group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-400 hover:bg-emerald-50"
                                >
                                    <span>
                                        <span className="block text-sm text-slate-600">&ldquo;{m.need}&rdquo;</span>
                                        <span className="mt-1 block font-bold text-slate-950">{m.service}</span>
                                    </span>
                                    <ArrowRight className="h-5 w-5 shrink-0 text-emerald-600 transition group-hover:translate-x-1" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <ServiceShowcase
                    eyebrow="See it in action"
                    title="Our own team, vans and London warehouse"
                    intro="Every KXH service is handled by our own people, from the first collection to the final delivery, so you always know who has your things."
                    points={["Collection from your door", "Secure managed warehouse", "Flexible monthly storage", "Return delivery on request"]}
                    images={[
                        { src: "/images/warehouse.webp", alt: "Stock and boxes stored on racking in the KXH London warehouse", label: "Inside our warehouse" },
                        { src: "/images/kxh-moving-removals-london.webp", alt: "KXH team packing and moving belongings in London", label: "Moving and packing" },
                        { src: "/images/delivery-warehouse.webp", alt: "Branded KXH Storage & Logistics van ready for collection and delivery", label: "Collection & delivery" },
                    ]}
                    ctaHref="/get-a-quote"
                    ctaLabel="Get Instant Quote"
                />

                {/* AREAS */}
                <section id="areas" className="border-t border-slate-200/70 bg-slate-50 py-16 lg:py-24">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="kxh-reveal max-w-3xl">
                            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                                Areas we cover
                            </p>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">KXH services across London boroughs</h2>
                            <p className="mt-3 text-base leading-7 text-slate-600">Tap an area to open its map and see every service we offer there.</p>
                        </div>
                        <div className="mt-10">
                            <AreaMapExplorer />
                        </div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* FAQ */}
                <section id="faqs" className="bg-white py-16 lg:py-24">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div className="kxh-reveal text-center">
                            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">FAQs</p>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Questions about our services</h2>
                        </div>
                        <div className="mt-10 space-y-3">
                            {faqs.map((f) => (
                                <details key={f.q} className="kxh-reveal group rounded-2xl border border-slate-200 bg-slate-50 p-5 open:border-emerald-300 open:bg-white open:shadow-lg">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-950">
                                        {f.q}
                                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700 transition group-open:rotate-45">+</span>
                                    </summary>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
                    <div className="kxh-hero relative mx-auto max-w-screen-xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-950 px-6 py-14 text-center text-white shadow-2xl sm:px-12">
                        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-lime-300/20 blur-3xl" aria-hidden="true" />
                        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Tell us what you need. We will handle the rest.</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-emerald-50">Storage, moving or logistics, get a clear quote in minutes. We are open 24 hours, 7 days a week.</p>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/get-a-quote"
                                className="kxh-shine relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-7 py-4 text-sm font-bold text-emerald-800 shadow-xl transition hover:-translate-y-0.5"
                            >
                                Get Instant Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                            <a
                                href="tel:+442039165312"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
                            >
                                <Phone className="h-4 w-4" aria-hidden="true" /> 020 3916 5312
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <MainFooter locations={londonLocations} />
        </>
    );
}
