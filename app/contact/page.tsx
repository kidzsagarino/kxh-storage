import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MainFooter from "../components/footer/MainFooter";
import { londonLocations } from "../sitemap";
import CrispChat from "../components/chat/CrispChat";
import Nav from "../components/MobileNav";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import AreaMapExplorer from "../components/AreaMapExplorer";
import type { ReactNode } from "react";
import { ArrowRight, Boxes, Building2, CheckCircle2, ChevronRight, ClipboardList, Clock, FileText, GraduationCap, Hammer, Home, Layers, Mail, MapPin, Package, Phone, ShoppingCart, Smartphone, Star, Truck, Warehouse, Zap } from "lucide-react";
import { CONTACT_NUMBERS } from "../lib/contact";

const SITE_URL = "https://kxhlogistics.co.uk";
const PHONE_DISPLAY = CONTACT_NUMBERS[0].phone;
const PHONE_HREF = CONTACT_NUMBERS[0].href;
const EMAIL = "help@kxhlogistics.co.uk";
const ADDRESS_LINE = "9 New City Road, London E13 9LL";
const OPENING_HOURS = [
    { label: "Monday–Sunday", value: "Open 24 hours" },
];



export const metadata: Metadata = {
    title: "Contact KXH | Storage & Moving in London, Open 24/7",
    description:
        "Contact KXH Storage & Logistics for moving services, managed storage, business storage, warehouse storage, student storage, collection and delivery across London. Request a tailored quotation today.",
    keywords: [
        "contact KXH Storage and Logistics",
        "moving company London contact",
        "storage company London contact",
        "warehouse storage London quote",
        "business storage London enquiry",
        "removals quote London",
        "managed storage London",
        "student storage London contact",
    ],
    alternates: {
        canonical: `${SITE_URL}/contact`,
    },
    openGraph: {
        title:
            "Contact KXH Storage & Logistics | London Moving & Storage Specialists",
        description:
            "Speak with KXH about moving, storage, warehouse services, business logistics, collection and delivery across London.",
        url: `${SITE_URL}/contact`,
        siteName: "KXH Storage & Logistics",
        type: "website",
        locale: "en_GB",
    },
    twitter: {
        card: "summary_large_image",
        title:
            "Contact KXH Storage & Logistics | London Moving & Storage Specialists",
        description:
            "Request a tailored quotation for moving, storage and logistics services across London.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const contactMethods = [
    ...CONTACT_NUMBERS.map((contact) => ({
        title: `Call ${contact.label}`,
        description:
            "Best for urgent enquiries, date availability and quick questions about moving or storage.",
        href: contact.href,
        label: contact.phone,
        icon: "☎",
    })),
    {
        title: "Email Our Team",
        description:
            "Ideal for detailed requirements, photos, inventory lists, access notes and business enquiries.",
        href: `mailto:${EMAIL}`,
        label: EMAIL,
        icon: "✉",
    },
    {
        title: "Request a Quote",
        description:
            "Tell us what you need and receive a quotation based on your locations, items, dates and service requirements.",
        href: "/get-a-quote",
        label: "Start your quote",
        icon: "📋",
    },
];

const services = [
    {
        title: "Moving Services",
        description:
            "House moves, apartment relocations, office removals and furniture transport across London.",
        href: "/logistics-moving-london",
        icon: "🚚",
    },
    {
        title: "Warehouse Storage",
        description:
            "Managed collection, organised warehouse storage and scheduled return delivery.",
        href: "/warehouse-storage-london",
        icon: "🏭",
    },
    {
        title: "Business Storage",
        description:
            "Flexible storage for stock, equipment, office furniture, files and operational assets.",
        href: "/business-storage-london",
        icon: "🏢",
    },
    {
        title: "Student Storage",
        description:
            "Collection, summer storage and next-term redelivery for students across London.",
        href: "/student-storage-london",
        icon: "🎓",
    },
    {
        title: "Inventory Management",
        description:
            "Physical stock organisation, storage, collection and staged delivery for businesses.",
        href: "/inventory-management-london",
        icon: "🗂️",
    },
    {
        title: "Pallet Storage",
        description:
            "Flexible pallet capacity for commercial stock, seasonal demand and operational overflow.",
        href: "/pallet-storage-london",
        icon: "🧱",
    },
    {
        title: "Collection & Delivery",
        description:
            "Managed collection and delivery for homes, offices, stock, furniture and stored items.",
        href: "/services",
        icon: "📍",
    },
    {
        title: "Document Shredding",
        description:
            "Secure disposal support for unwanted confidential business and personal documents.",
        href: "/shredding-solutions-london",
        icon: "🗄️",
    },
];


const serviceContactCards = [
    {
        title: "Moving Services Enquiry",
        description:
            "Discuss house moves, apartment relocations, office removals, packing and furniture transport.",
        href: "mailto:help@kxhlogistics.co.uk?subject=Moving%20Services%20Enquiry",
        cta: "Email moving enquiry",
        icon: "🚚",
    },
    {
        title: "Warehouse Storage Enquiry",
        description:
            "Ask about managed storage, collection, storage duration, access and return delivery.",
        href: "mailto:help@kxhlogistics.co.uk?subject=Warehouse%20Storage%20Enquiry",
        cta: "Email storage enquiry",
        icon: "🏭",
    },
    {
        title: "Business Storage Enquiry",
        description:
            "Discuss stock, office furniture, archived files, recurring collections and staged deliveries.",
        href: "mailto:help@kxhlogistics.co.uk?subject=Business%20Storage%20Enquiry",
        cta: "Email business enquiry",
        icon: "🏢",
    },
    {
        title: "Student Storage Enquiry",
        description:
            "Ask about hall collection, summer storage, luggage, boxes and next-term redelivery.",
        href: "mailto:help@kxhlogistics.co.uk?subject=Student%20Storage%20Enquiry",
        cta: "Email student enquiry",
        icon: "🎓",
    },
];

const enquiryScenarios = [
    {
        title: "Moving home",
        description:
            "House and flat moves with optional packing, dismantling, temporary storage and redelivery.",
        icon: "🏠",
    },
    {
        title: "Student move or summer break",
        description:
            "Collection from halls or shared accommodation, storage and next-term delivery.",
        icon: "🎓",
    },
    {
        title: "Office relocation",
        description:
            "Planned moving support for desks, equipment, files and temporary business storage.",
        icon: "🏢",
    },
    {
        title: "Home renovation",
        description:
            "Temporary storage for furniture and household belongings while work is completed.",
        icon: "🛠️",
    },
    {
        title: "Warehouse overflow",
        description:
            "Flexible space for pallets, stock, equipment and seasonal commercial demand.",
        icon: "📦",
    },
    {
        title: "Ecommerce stock storage",
        description:
            "Physical inventory storage with collection, organisation and staged delivery.",
        icon: "🛒",
    },
];


const londonAreas = [
    {
        name: "Camden",
        href: "/warehouse-storage-london/camden",
    },
    {
        name: "Hackney",
        href: "/warehouse-storage-london/hackney",
    },
    {
        name: "Westminster",
        href: "/warehouse-storage-london/westminster",
    },
    {
        name: "Southwark",
        href: "/warehouse-storage-london/southwark",
    },
    {
        name: "Islington",
        href: "/warehouse-storage-london/islington",
    },
    {
        name: "Lambeth",
        href: "/warehouse-storage-london/lambeth",
    },
    {
        name: "Tower Hamlets",
        href: "/warehouse-storage-london/tower-hamlets",
    },
    {
        name: "Kensington & Chelsea",
        href: "/warehouse-storage-london/kensington-chelsea",
    },
];

const industries = [
    "Ecommerce",
    "Retail",
    "Construction",
    "Property Management",
    "Education",
    "Healthcare",
    "Professional Offices",
    "Events",
    "Manufacturing",
];

const reasons = [
    {
        title: "Tailored quotations",
        description:
            "Pricing is based on the actual items, addresses, access, labour, transport and storage required.",
    },
    {
        title: "Residential and business support",
        description:
            "KXH supports households, students, landlords, offices, retailers and growing businesses.",
    },
    {
        title: "Collection available",
        description:
            "Managed collection reduces the need to hire a vehicle or transport belongings to storage yourself.",
    },
    {
        title: "Flexible service combinations",
        description:
            "Moving, packing, storage, collection and redelivery can be coordinated as one service.",
    },
    {
        title: "London-wide coverage",
        description:
            "Services are available across supported London boroughs and selected routes beyond London.",
    },
    {
        title: "Clear communication",
        description:
            "Detailed information about items, dates and access helps the team provide a practical service plan.",
    },
];

const faqs = [
    {
        question: "How quickly does KXH respond to enquiries?",
        answer:
            "Response times depend on enquiry volume and the information provided. Including your addresses, preferred dates, item list and access details helps the team review your request more efficiently.",
    },
    {
        question: "Can I request a moving or storage quote online?",
        answer:
            "Yes. Use the online quote form to provide your service type, locations, dates, item volume and any packing, storage or delivery requirements.",
    },
    {
        question: "Can I send photos or an inventory list?",
        answer:
            "Yes. Photos, measurements and inventory lists can help the team understand volume, access and handling requirements before preparing a quotation.",
    },
    {
        question: "Can businesses request ongoing storage or logistics support?",
        answer:
            "Yes. Businesses can enquire about recurring collections, flexible warehouse capacity, stock storage, pallet storage and staged delivery.",
    },
    {
        question: "Can moving and storage be combined?",
        answer:
            "Yes. KXH can collect belongings, move them into managed storage and arrange redelivery when your home, office or new premises are ready.",
    },
    {
        question: "Do you cover my London borough?",
        answer:
            "KXH serves multiple London boroughs. Include your collection and delivery postcodes in the enquiry so route and availability can be confirmed.",
    },
    {
        question: "Can I request short-notice collection?",
        answer:
            "Short-notice support may be available depending on location, vehicle capacity, labour and the service required. Contact the team as early as possible.",
    },
    {
        question: "Can KXH provide packing?",
        answer:
            "Packing and suitable materials may be included when agreed in advance. Identify fragile, bulky or high-care items when requesting your quotation.",
    },
    {
        question: "How do I change an existing booking?",
        answer:
            "Contact KXH as soon as possible. Changes to dates, addresses, item volume or services are subject to availability and may affect pricing.",
    },
    {
        question: "Can I book by phone?",
        answer:
            "You can call the team to discuss your requirements. A complete booking may still require written details, acceptance of the quotation and any applicable payment steps.",
    },
    {
        question: "Can I contact KXH about student storage?",
        answer:
            "Yes. Students can enquire about hall collection, summer storage, luggage, boxes, small furniture and next-term delivery.",
    },
    {
        question: "Can KXH collect from offices, suppliers or warehouses?",
        answer:
            "Commercial collection may be arranged from approved offices, retail premises, supplier locations and warehouses, subject to access and loading requirements.",
    },
    {
        question: "How much notice should I give for a move or collection?",
        answer:
            "Earlier booking is recommended, especially for weekends, month-end dates, student changeovers and larger commercial jobs. Short-notice availability depends on capacity.",
    },
    {
        question: "Can you collect from an apartment without a lift?",
        answer:
            "Yes, subject to access and handling requirements. Tell the team about stairs, floor level, carrying distance and parking when requesting a quotation.",
    },
    {
        question: "Can I store furniture during a renovation?",
        answer:
            "Yes. KXH can collect and store approved furniture and household belongings while renovation, decorating or building work is completed.",
    },
    {
        question: "Do you support ecommerce businesses?",
        answer:
            "Yes. Ecommerce businesses can enquire about stock storage, inventory organisation, pallet capacity, collections and staged deliveries.",
    },
    {
        question: "Can you collect from more than one address?",
        answer:
            "Multi-address collections may be possible. Include every location, item group and access requirement in the enquiry.",
    },
    {
        question: "Can stored items be delivered to a different address?",
        answer:
            "Yes, where the new destination, access, route and delivery requirements are confirmed before scheduling.",
    },
    {
        question: "Do you provide office furniture storage?",
        answer:
            "Yes. Desks, chairs, cabinets and other approved office assets can be stored during relocation, refurbishment or space changes.",
    },
    {
        question: "Can I arrange recurring business collections?",
        answer:
            "Recurring collection or delivery may be available for suitable business requirements. Frequency, volume and locations should be discussed with the team.",
    },
    {
        question: "Can KXH help if my completion date is delayed?",
        answer:
            "Yes. Temporary managed storage can help bridge the gap between leaving one property and gaining access to another.",
    },
    {
        question: "What items should not be included in my enquiry?",
        answer:
            "Do not request storage or transport for hazardous, illegal, explosive, perishable or otherwise prohibited items. Ask the team if you are unsure about a specific item.",
    },

];

function ContactPageJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact#contactpage`,
        url: `${SITE_URL}/contact`,
        name: "Contact KXH Storage & Logistics",
        description:
            "Contact KXH Storage & Logistics for moving, storage, warehouse and logistics services across London.",
        isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "KXH Storage & Logistics",
        },
        about: {
            "@type": "LocalBusiness",
            "@id": `${SITE_URL}/#business`,
            name: "KXH Storage & Logistics",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

function LocalBusinessJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "MovingCompany", "StorageFacility"],
        "@id": `${SITE_URL}/#business`,
        name: "KXH Storage & Logistics",
        url: SITE_URL,
        telephone: PHONE_DISPLAY,
        email: EMAIL,
        address: {
            "@type": "PostalAddress",
            streetAddress: "9 New City Road",
            addressLocality: "London",
            postalCode: "E13 9LL",
            addressCountry: "GB",
        },
        areaServed: {
            "@type": "City",
            name: "London",
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "00:00",
                closes: "23:59",
            },
        ],
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: PHONE_DISPLAY,
                email: EMAIL,
                contactType: "customer service",
                areaServed: "GB",
                availableLanguage: ["English"],
            },
            {
                "@type": "ContactPoint",
                telephone: PHONE_DISPLAY,
                email: EMAIL,
                contactType: "sales",
                areaServed: "London",
                availableLanguage: ["English"],
            },
        ],
        makesOffer: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: service.title,
                url: `${SITE_URL}${service.href}`,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

function BreadcrumbJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Contact",
                item: `${SITE_URL}/contact`,
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

function FAQJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

const SERVICE_ICONS: Record<string, ReactNode> = {
    "/logistics-moving-london": <Truck className="h-5 w-5" />,
    "/warehouse-storage-london": <Warehouse className="h-5 w-5" />,
    "/business-storage-london": <Building2 className="h-5 w-5" />,
    "/student-storage-london": <GraduationCap className="h-5 w-5" />,
    "/inventory-management-london": <ClipboardList className="h-5 w-5" />,
    "/pallet-storage-london": <Layers className="h-5 w-5" />,
    "/services": <MapPin className="h-5 w-5" />,
    "/shredding-solutions-london": <FileText className="h-5 w-5" />,
};

const SCENARIO_ICONS = [Home, GraduationCap, Building2, Hammer, Boxes, ShoppingCart];

export default function ContactPage() {
    return (
        <>
            <CrispChat />
            <Nav />
            <main className="min-h-screen bg-white text-slate-900">
                <ContactPageJsonLd />
                <LocalBusinessJsonLd />
                <BreadcrumbJsonLd />
                <FAQJsonLd />

                {/* HERO */}
                <section className="kxh-hero relative isolate overflow-hidden bg-slate-950 text-white">
                    <div className="absolute inset-0 -z-20">
                        <Image src="/images/delivery-warehouse.webp" alt="KXH Storage & Logistics van in London" fill priority sizes="100vw" className="kxh-kenburns object-cover object-center" />
                    </div>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
                    <div className="mx-auto max-w-screen-xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-20">
                        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-slate-300 sm:text-sm">
                            <Link href="/" className="transition hover:text-white">Home</Link>
                            <ChevronRight className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                            <span className="font-semibold text-white" aria-current="page">Contact</span>
                        </nav>

                        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="kxh-rise">
                                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-emerald-300 sm:text-xs">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                    </span>
                                    Open 24 hours · 7 days a week
                                </p>
                                <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                                    Contact KXH{" "}
                                    <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent">Storage & Logistics</span>
                                </h1>
                                <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
                                    Call, email or get an instant quote for storage, moving and logistics anywhere in London. A real person from our team will help you.
                                </p>
                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href="/get-a-quote"
                                        className="kxh-shine group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-500 px-7 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400"
                                    >
                                        Get Instant Quote <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </Link>
                                    <a
                                        href={PHONE_HREF}
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                                    >
                                        <Phone className="h-4 w-4" /> 020 3916 5312
                                    </a>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm backdrop-blur">
                                        <span className="font-bold">Google</span>
                                        <span className="flex">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</span>
                                        <span className="font-semibold">5.0</span>
                                    </span>
                                    <a href="https://www.trustpilot.com/review/kxhlogistics.co.uk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm backdrop-blur transition hover:bg-white/20">
                                        <Star className="h-4 w-4 fill-[#00b67a] text-[#00b67a]" />
                                        <span className="font-bold">Trustpilot</span>
                                        <span className="font-semibold">4.8</span>
                                    </a>
                                </div>
                            </div>

                            <div className="kxh-rise grid gap-3 [animation-delay:150ms] sm:grid-cols-2 lg:grid-cols-1">
                                {CONTACT_NUMBERS.map((c) => (
                                    <a
                                        key={c.href}
                                        href={c.href}
                                        className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-emerald-400/60 hover:bg-emerald-500/15"
                                    >
                                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-500 text-slate-950">
                                            {c.label === "Mobile" ? <Smartphone className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
                                        </span>
                                        <span>
                                            <span className="block text-xs font-bold uppercase tracking-wider text-emerald-300">{c.label}</span>
                                            <span className="mt-0.5 block text-lg font-black">{c.phone}</span>
                                        </span>
                                    </a>
                                ))}
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-emerald-400/60 hover:bg-emerald-500/15"
                                >
                                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-emerald-700">
                                        <Mail className="h-6 w-6" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-xs font-bold uppercase tracking-wider text-emerald-300">Email</span>
                                        <span className="mt-0.5 block truncate text-lg font-black">{EMAIL}</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* VISIT / MAP */}
                <section className="bg-white py-16 lg:py-24">
                    <div className="mx-auto grid max-w-screen-xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
                        <div className="kxh-reveal">
                            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">Find us</p>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Our London base</h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                We collect from and deliver to homes, student halls and businesses across London. Tell us your postcode and we will confirm availability.
                            </p>
                            <ul className="mt-8 space-y-3">
                                <li className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                                    <span>
                                        <span className="block font-bold text-slate-950">Address</span>
                                        <span className="mt-1 block text-sm text-slate-600">{ADDRESS_LINE}</span>
                                    </span>
                                </li>
                                <li className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                                    <span>
                                        <span className="block font-bold text-slate-950">Opening hours</span>
                                        {OPENING_HOURS.map((h) => (
                                            <span key={h.label} className="mt-1 block text-sm text-slate-600">{h.label}: {h.value}</span>
                                        ))}
                                    </span>
                                </li>
                                <li className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <Zap className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                                    <span>
                                        <span className="block font-bold text-slate-950">Urgent collection?</span>
                                        <span className="mt-1 block text-sm text-slate-600">Call us for same-week dates and quick answers on availability.</span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="kxh-reveal overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl">
                            <iframe
                                title="KXH Storage & Logistics location map"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS_LINE)}&z=14&output=embed`}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="h-[360px] w-full border-0 sm:h-[460px] lg:h-full lg:min-h-[480px]"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </section>

                {/* WHAT CAN WE HELP WITH */}
                <section className="border-y border-slate-200 bg-slate-50 py-16 lg:py-24">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="kxh-reveal max-w-2xl">
                            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">What do you need?</p>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Pick a service to get started</h2>
                        </div>
                        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {services.map((s, i) => (
                                <Link
                                    key={s.href + s.title}
                                    href={s.href}
                                    className="kxh-reveal kxh-card3d group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
                                    style={{ transitionDelay: `${(i % 4) * 60}ms` }}
                                >
                                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                                        {SERVICE_ICONS[s.href] ?? <Package className="h-5 w-5" />}
                                    </span>
                                    <h3 className="mt-4 font-bold text-slate-950">{s.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{s.description}</p>
                                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                                        Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-10 grid gap-3 md:grid-cols-2">
                            {serviceContactCards.map((c) => (
                                <a
                                    key={c.title}
                                    href={c.href}
                                    className="kxh-reveal group flex items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-white p-5 transition hover:border-emerald-400 hover:bg-emerald-50"
                                >
                                    <span>
                                        <span className="block font-bold text-slate-950">{c.title}</span>
                                        <span className="mt-1 block text-sm text-slate-600">{c.description}</span>
                                    </span>
                                    <Mail className="h-5 w-5 shrink-0 text-emerald-600 transition group-hover:scale-110" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* COMMON ENQUIRIES */}
                <section className="bg-white py-16 lg:py-24">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="kxh-reveal mx-auto max-w-2xl text-center">
                            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">Common enquiries</p>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">We regularly help with</h2>
                        </div>
                        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {enquiryScenarios.map((s, i) => {
                                const Icon = SCENARIO_ICONS[i % SCENARIO_ICONS.length];
                                return (
                                    <div key={s.title} className="kxh-reveal flex gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-300 hover:shadow-lg">
                                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-950 text-emerald-400">
                                            <Icon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <span>
                                            <span className="block font-bold text-slate-950">{s.title}</span>
                                            <span className="mt-1 block text-sm leading-6 text-slate-600">{s.description}</span>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* WHY KXH */}
                <section className="kxh-hero relative overflow-hidden bg-slate-950 py-16 text-white lg:py-24">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" aria-hidden="true" />
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="kxh-reveal max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Why contact KXH</p>
                            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">One team for storage, moving and logistics</h2>
                        </div>
                        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {reasons.map((r, i) => (
                                <div
                                    key={r.title}
                                    className="kxh-reveal kxh-card3d rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-emerald-400/50 hover:bg-white/10"
                                    style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                                >
                                    <CheckCircle2 className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                                    <h3 className="mt-3 text-lg font-bold">{r.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-300">{r.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-slate-400">Industries we support:</span>
                            {industries.map((x) => (
                                <span key={x} className="rounded-full border border-white/15 px-3 py-1 text-sm text-slate-200">{x}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* AREAS */}
                <section id="areas" className="bg-slate-50 py-16 lg:py-24">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="kxh-reveal max-w-3xl">
                            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">Areas we cover</p>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Collection and delivery across London</h2>
                            <p className="mt-3 leading-7 text-slate-600">Tap an area to open its map and see the services available there.</p>
                        </div>
                        <div className="mt-10"><AreaMapExplorer /></div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* FAQ */}
                <section id="faqs" className="bg-white py-16 lg:py-24">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div className="kxh-reveal text-center">
                            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">FAQs</p>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Before you get in touch</h2>
                        </div>
                        <div className="mt-10 space-y-3">
                            {faqs.map((f) => (
                                <details key={f.question} className="group rounded-2xl border border-slate-200 bg-slate-50 open:border-emerald-300 open:bg-white open:shadow-lg">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold text-slate-950 [&::-webkit-details-marker]:hidden">
                                        {f.question}
                                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700 transition group-open:rotate-45" aria-hidden="true">+</span>
                                    </summary>
                                    <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{f.answer}</p>
                                </details>
                            ))}
                        </div>
                        <p className="mt-6 text-center text-sm text-slate-600">
                            More answers in our <Link href="/faqs" className="font-bold text-emerald-700 hover:underline">FAQs</Link>.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
                    <div className="kxh-hero relative mx-auto max-w-screen-xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-950 px-6 py-14 text-center text-white shadow-2xl sm:px-12">
                        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Ready when you are, day or night</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-emerald-50">Get a clear quote in minutes, or call and speak to the team.</p>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link href="/get-a-quote" className="kxh-shine relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-7 py-4 text-sm font-bold text-emerald-800 shadow-xl transition hover:-translate-y-0.5">
                                Get Instant Quote <ArrowRight className="h-4 w-4" />
                            </Link>
                            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/20">
                                <Phone className="h-4 w-4" /> 020 3916 5312
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <MainFooter locations={londonLocations} />
        </>
    );
}
