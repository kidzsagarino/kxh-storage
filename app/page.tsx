
import { ServicesGrid } from "./components/ServicesGrid";
import CrispChat from "./components/chat/CrispChat";
import Nav from "./components/MobileNav";

import type { Metadata } from "next";
import Link from "next/link";
import { londonLocations } from "./lib/location";
import MainFooter from "./components/footer/MainFooter";
import TestimonialsSection from "./components/TestimonialsSection";
import TrustpilotPill from "./components/trustpilot/TrustpilotPill";
import Image from "next/image";
import { CONTACT_NUMBERS } from "./lib/contact";

export const metadata: Metadata = {
    title: "Warehouse Storage, Business Storage & Moving Services London | KXH",
    description:
        "Secure warehouse storage, business storage, inventory management, student storage, moving services, and pickup & delivery across London. Instant online quotes.",
    keywords: [
        "storage London",
        "moving service London",
        "document shredding London",
        "cheap storage London",
        "removals London",
        "warehouse storage London",
    ],
    openGraph: {
        title: "KXH Storage & Logistics London",
        description:
            "Book storage, moving, and shredding services in London with instant pricing and flexible scheduling.",
        url: "https://kxhlogistics.co.uk",
        siteName: "KXH Storage & Logistics",
        locale: "en_GB",
        type: "website",
    },
    alternates: {
        canonical: "https://kxhlogistics.co.uk",
    },
};

function JsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://kxhlogistics.co.uk/#business",

        name: "KXH Storage & Logistics",
        url: "https://kxhlogistics.co.uk",
        logo: "https://kxhlogistics.co.uk/logo.png",
        image: "https://kxhlogistics.co.uk/og.jpg",
        telephone: "+44 7386 277785",
        email: "help@kxhlogistics.co.uk",
        priceRange: "££",

        description:
            "Door-to-door storage, moving, and shredding services in London with pickup, delivery, secure warehouse storage, and business logistics support.",

        address: {
            "@type": "PostalAddress",
            streetAddress: "London, UK",
            addressLocality: "London",
            addressCountry: "GB",
        },

        geo: {
            "@type": "GeoCoordinates",
            latitude: "51.5074",
            longitude: "-0.1278",
        },

        areaServed: {
            "@type": "Place",
            name: "London, United Kingdom",
        },

        serviceArea: {
            "@type": "Place",
            name: "London, United Kingdom",
        },

        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                ],
                opens: "08:00",
                closes: "18:00",
            },
        ],

        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+44 7386 277785",
            contactType: "Customer Service",
            areaServed: "GB",
            availableLanguage: "English",
        },

        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "66",
        },

        sameAs: [
            "https://uk.trustpilot.com/review/kxhlogistics.co.uk",
        ],

        makesOffer: [
            { "@type": "Offer", name: "Storage Service London" },
            { "@type": "Offer", name: "Moving Service London" },
            { "@type": "Offer", name: "Document Shredding London" },
            { "@type": "Offer", name: "Storage Pickup and Delivery London" },
            { "@type": "Offer", name: "Business Warehouse Storage London" },
            { "@type": "Offer", name: "Inventory Management Services London" },
            { "@type": "Offer", name: "Commercial Storage Solutions London" },
            { "@type": "Offer", name: "Student Storage London" },
            { "@type": "Offer", name: "Third Party Logistics London" },
        ],

        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Storage & Logistics Services",
            itemListElement: [
                { "@type": "OfferCatalog", name: "Warehouse Storage" },
                { "@type": "OfferCatalog", name: "Business Storage" },
                { "@type": "OfferCatalog", name: "Inventory Management" },
                { "@type": "OfferCatalog", name: "Pallet Storage" },
                { "@type": "OfferCatalog", name: "Commercial Storage" },
                { "@type": "OfferCatalog", name: "Third Party Logistics" },
                { "@type": "OfferCatalog", name: "Document Shredding" },
                { "@type": "OfferCatalog", name: "Student Storage" },
            ],
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

const faqs = [
    {
        q: "How does pickup and delivery storage work?",
        a: "We collect your items from your location, store them securely, and deliver them back whenever you need them.",
    },
    {
        q: "Is my storage secure?",
        a: "Yes, your items are stored in secure, monitored facilities with controlled access and inventory handling.",
    },
    {
        q: "How much does storage cost in London?",
        a: "Storage prices vary depending on the volume of items and duration. Use our instant quote tool for accurate pricing.",
    },
    {
        q: "Where can I find cheap storage in London?",
        a: "Affordable storage options are available depending on size and duration. You only pay for the space you use.",
    },
    {
        q: "How much is storage per month in London?",
        a: "Monthly storage costs depend on volume and service type. Smaller loads cost less, larger storage costs more.",
    },
    {
        q: "What size storage do I need?",
        a: "It depends on how many items you have. Our quote tool helps estimate the right storage size for you.",
    },
    {
        q: "Is pickup storage cheaper than self-storage?",
        a: "In many cases yes, because you avoid van hire, transport costs, and paying for unused space.",
    },
    {
        q: "Can I book storage with collection near me?",
        a: "Yes, we offer collection and delivery across London. Enter your postcode to check availability.",
    },
    {
        q: "How quickly can I arrange storage?",
        a: "Storage can often be arranged within 24–48 hours depending on availability.",
    },
    {
        q: "Is there flexible short-term storage?",
        a: "Yes, we offer both short-term and long-term storage options depending on your needs.",
    },
    {
        q: "Do you offer inventory tracking for stored items?",
        a: "Yes, we use organised inventory handling and internal warehouse management processes to track stored items for both personal and business customers."
    },
    {
        q: "Do you provide business warehouse storage in London?",
        a: "Yes, we provide flexible business warehouse storage solutions including inventory storage, stock management, office equipment storage, and pallet storage."
    },
    {
        q: "Do you offer storage for students and renters in London?",
        a: "Yes, KXH Logistics supports students, renters, apartment moves, temporary relocations, and short-term storage with collection and delivery services across London.",
    },
    {
        q: "Do you provide commercial warehouse storage for growing businesses?",
        a: "Yes. KXH Logistics supports retailers, ecommerce businesses, wholesalers, contractors, and growing companies with flexible commercial warehouse storage, inventory handling, pallet storage, and collection and delivery services across London.",
    }
];

function FAQJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "How does pickup and delivery storage work?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "We collect your items from your location, store them securely, and deliver them back whenever you need them.",
                },
            },
            {
                "@type": "Question",
                name: "Is my storage secure?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Your items are stored in secure, monitored facilities with controlled access and inventory tracking.",
                },
            },
            {
                "@type": "Question",
                name: "How much does storage cost in London?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Storage pricing depends on volume and duration. Use our instant quote tool for accurate pricing.",
                },
            },
            {
                "@type": "Question",
                name: "Where can I find cheap storage in London?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Affordable storage is available depending on size and duration. You only pay for the space you use.",
                },
            },
            {
                "@type": "Question",
                name: "How much is storage per month in London?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Monthly storage costs depend on volume and service type. Smaller loads cost less, larger storage costs more.",
                },
            },
            {
                "@type": "Question",
                name: "What size storage do I need?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "The size depends on your items. Our quote tool helps estimate the right storage size for you.",
                },
            },
            {
                "@type": "Question",
                name: "Is pickup storage cheaper than self-storage?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "In many cases yes, because you avoid van hire, transport costs, and paying for unused space.",
                },
            },
            {
                "@type": "Question",
                name: "Can I book storage with collection near me?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we offer collection and delivery across London. Enter your postcode to check availability.",
                },
            },
            {
                "@type": "Question",
                name: "How quickly can I arrange storage?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Storage can often be arranged within 24–48 hours depending on availability.",
                },
            },
            {
                "@type": "Question",
                name: "Is there flexible short-term storage?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we offer both short-term and long-term storage options depending on your needs.",
                },
            },
            {
                "@type": "Question",
                name: "Do you offer inventory tracking for stored items?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we use organised inventory handling and internal warehouse management processes to track stored items for both personal and business customers."
                },
            },
            {
                "@type": "Question",
                name: "Do you provide business warehouse storage in London?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we provide flexible business warehouse storage solutions including inventory storage, stock management, office equipment storage, and pallet storage."
                },
            },
            {
                "@type": "Question",
                name: "Do you offer storage for students and renters in London?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, KXH Logistics supports students, renters, apartment moves, temporary relocations, and short-term storage with collection and delivery services across London."
                },
            },
            {
                "@type": "Question",
                name: "Do you provide commercial warehouse storage for growing businesses?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. KXH Logistics supports retailers, ecommerce businesses, wholesalers, contractors, and growing companies with flexible commercial warehouse storage, inventory handling, pallet storage, and collection and delivery services across London."
                }
            }
        ],
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
                item: "https://kxhlogistics.co.uk",
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data),
            }}
        />
    );
}

export const dynamic = "force-dynamic";

export default async function HomePage() {

    return (
        <>
            <CrispChat />
            <Nav />

            <main className="min-h-screen bg-white text-slate-900">
                <JsonLd />
                <FAQJsonLd />
                <BreadcrumbJsonLd />
                {/* Hero Section */}

                <section className="relative overflow-hidden bg-gradient-to-b from-white to-emerald-50/30">
                    <div className="mx-auto grid max-w-screen-xl items-center gap-10 px-4 pt-12 pb-14 sm:px-6 sm:pt-16 lg:min-h-screen lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20">

                        {/* LEFT CONTENT */}
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-emerald-700 shadow-sm sm:text-sm">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Trusted Storage & Logistics in London
                            </div>

                            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Warehouse Storage & Logistics in London
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                                KXH Storage & Logistics provides secure warehouse storage with collection and return delivery across London. We support businesses, students, renters, office relocations, inventory storage, and temporary moves with flexible storage solutions tailored to your needs.
                            </p>

                            <div className="mt-8 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
                                <a
                                    href="/get-a-quote"
                                    className="rounded-2xl bg-emerald-700 px-7 py-4 text-center text-sm font-bold text-white shadow-xl shadow-emerald-500/20 transition hover:bg-emerald-500"
                                >
                                    Get Instant Quote
                                </a>

                                <a
                                    href="/services"
                                    className="rounded-2xl border border-emerald-200 bg-white px-7 py-4 text-center text-sm font-bold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
                                >
                                    View All Services
                                </a>
                            </div>

                            <div className="mt-10 grid w-full gap-4 sm:grid-cols-2 lg:max-w-xl">
                                {[
                                    {
                                        title: "Collection from Your Door",
                                        text: "We collect directly from homes, offices, student accommodation, and businesses across London.",
                                    },
                                    {
                                        title: "Secure Warehouse Storage",
                                        text: "Your belongings are stored safely in monitored warehouse facilities with professional handling.",
                                    },
                                    {
                                        title: "Flexible Storage Terms",
                                        text: "Choose short-term or long-term storage with collection and return delivery whenever needed.",
                                    },
                                    {
                                        title: "Trusted Across London",
                                        text: "Supporting businesses, students, renters, and households with reliable storage and logistics.",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.title}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:shadow-md"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                                ✓
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-slate-900">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                                    {item.text}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <TrustpilotPill className="mt-5" />
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="relative w-full lg:pl-4">
                            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                                <Image
                                    src="/images/home-hero-storage.webp"
                                    alt="KXH Storage & Logistics warehouse storage with collection and delivery service in London"
                                    className="h-[320px] w-full object-cover object-center sm:h-[460px] lg:h-[640px] h-auto"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                    loading="lazy"
                                    decoding="async"
                                    width={1200}
                                    height={800}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="border-t border-slate-200/70 bg-white py-14">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

                        <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">

                            <div>
                                <h3 className="text-4xl font-black text-emerald-700">7+</h3>
                                <p className="mt-2 text-slate-600">
                                    Storage & Logistics Services
                                </p>
                            </div>

                            <div>
                                <h3 className="text-4xl font-black text-emerald-700">66+</h3>
                                <p className="mt-2 text-slate-600">
                                    Verified Trustpilot Reviews
                                </p>
                            </div>

                            <div>
                                <h3 className="text-4xl font-black text-emerald-700">London</h3>
                                <p className="mt-2 text-slate-600">
                                    Collection & Delivery Coverage
                                </p>
                            </div>

                            <div>
                                <h3 className="text-4xl font-black text-emerald-700">24–48h</h3>
                                <p className="mt-2 text-slate-600">
                                    Typical Collection Availability
                                </p>
                            </div>

                        </div>

                    </div>
                </section>
                <section className="bg-white py-6 sm:py-8">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                            <Image
                                src="/images/warehouse-team.webp"
                                alt="KXH warehouse team handling storage and logistics in London"
                                className="h-[200px] w-full object-cover sm:h-[300px] lg:h-[360px]"
                                width={1200}
                                height={800}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                </section>
                <section className="bg-gradient-to-b from-white to-slate-50/70 border-t border-slate-200/70">

                    <div className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">

                        <h2 className="text-2xl font-black mb-4">
                            Storage with Pickup and Delivery in London
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Our fully managed storage service includes collection, secure warehouse storage, and return delivery. You don’t need to visit a storage unit — we handle everything for you.
                        </p>

                        <h3 className="text-xl font-bold mt-6 mb-2">
                            Secure Warehouse Storage
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            Your items are stored in monitored facilities with controlled access and professional handling, ideal for businesses, students, renters, apartment moves, and personal storage needs.                        </p>

                        <h3 className="text-xl font-bold mt-6 mb-2">
                            Flexible Access with Delivery
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            Request your items anytime and we’ll deliver them back quickly — no need to travel to a storage unit.
                        </p>

                    </div>
                </section>
                <section className="border-t border-slate-200/70 bg-white py-16">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Why Choose KXH
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
                                Storage, Collection & Delivery Made Simple
                            </h2>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                KXH Storage & Logistics helps London customers avoid the stress of
                                self-storage, van hire, and separate transport arrangements. We collect,
                                store, and return your items when needed.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    title: "Door-to-Door Collection",
                                    desc: "We collect from homes, offices, student accommodation, and business locations across London.",
                                },
                                {
                                    title: "Secure Warehouse Storage",
                                    desc: "Items are stored in managed warehouse facilities with professional handling and organised storage.",
                                },
                                {
                                    title: "Flexible Storage Terms",
                                    desc: "Choose short-term or long-term storage depending on your move, business needs, or temporary situation.",
                                },
                                {
                                    title: "Return Delivery Available",
                                    desc: "Request your items back when needed and our team can arrange delivery directly to your address.",
                                },
                                {
                                    title: "Business & Student Support",
                                    desc: "We support business inventory, office equipment, student belongings, renters, and household storage.",
                                },
                                {
                                    title: "Instant Online Quotes",
                                    desc: "Get a fast quote online and choose the storage, moving, or logistics service that fits your needs.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                        ✓
                                    </div>

                                    <h3 className="mt-4 font-bold text-slate-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="border-t border-slate-200/70 bg-slate-50 py-16">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Who We Help
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
                                Storage & Logistics Support for London Customers
                            </h2>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                KXH supports businesses, students, renters, households, and office teams
                                with flexible storage, collection, delivery, and moving support across London.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    title: "Businesses",
                                    desc: "Storage for stock, office equipment, archives, and commercial items.",
                                    href: "/business-storage-london",
                                },
                                {
                                    title: "Students",
                                    desc: "Student storage for summer breaks, accommodation moves, and term gaps.",
                                    href: "/student-storage-london",
                                },
                                {
                                    title: "Renters",
                                    desc: "Short-term storage during flat moves, delayed move-ins, and temporary relocations.",
                                    href: "/warehouse-storage-london",
                                },
                                {
                                    title: "Office Relocations",
                                    desc: "Moving and storage support for office furniture, equipment, and business assets.",
                                    href: "/logistics-moving-london",
                                },
                                {
                                    title: "Retail & Ecommerce",
                                    desc: "Inventory storage, pallet storage, and warehouse support for growing businesses.",
                                    href: "/inventory-management-london",
                                },
                                {
                                    title: "Households",
                                    desc: "Flexible household storage with collection and return delivery across London.",
                                    href: "/warehouse-storage-london",
                                },
                            ].map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm"
                                >
                                    <h3 className="text-xl font-bold text-slate-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {item.desc}
                                    </p>

                                    <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                                        Learn more →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="px-4 py-14 text-center max-w-3xl mx-auto sm:px-6 lg:px-8 lg:py-16">
                    <h2 className="text-xl font-bold">
                        A Fully Managed Storage Service in London
                    </h2>
                    <p className="mt-3 text-slate-600">
                        Unlike traditional self-storage, we handle everything for you — collection, secure storage, and delivery — so you never need to visit a storage unit.
                    </p>
                </section>
                <section className="px-4 py-10 text-center max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold">
                        Flexible Storage for Students & Renters
                    </h2>

                    <p className="mt-3 text-slate-600 leading-relaxed">
                        KXH Logistics also supports students, renters, apartment moves,
                        temporary relocations, and short-term storage needs across London
                        with collection, secure warehouse storage, and return delivery.
                    </p>
                </section>
                <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-3 px-4 py-4 sm:grid-cols-3 lg:grid-cols-4">
                    <Link
                        href="/student-storage-london"
                        className="rounded-md bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-800 transition hover:bg-emerald-100"
                    >
                        Student Storage
                    </Link>
                    <Link
                        href="/business-storage-london"
                        className="rounded-md bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-800 transition hover:bg-emerald-100"
                    >
                        Business Storage
                    </Link>

                    <Link
                        href="/inventory-management-london"
                        className="rounded-md bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-800 transition hover:bg-emerald-100"
                    >
                        Inventory Storage
                    </Link>

                    <Link
                        href="/pallet-storage-london"
                        className="rounded-md bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-800 transition hover:bg-emerald-100"
                    >
                        Pallet Storage
                    </Link>

                    <Link
                        href="/third-party-logistics-london"
                        className="rounded-md bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-800 transition hover:bg-emerald-100"
                    >
                        3PL Logistics
                    </Link>

                    <Link
                        href="/warehouse-storage-london"
                        className="rounded-md bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-800 transition hover:bg-emerald-100"
                    >
                        Warehouse Storage
                    </Link>

                    <Link
                        href="/logistics-moving-london"
                        className="rounded-md bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-800 transition hover:bg-emerald-100"
                    >
                        Office Relocation
                    </Link>

                    <Link
                        href="/shredding-solutions-london"
                        className="rounded-md bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-800 transition hover:bg-emerald-100"
                    >
                        Secure Shredding
                    </Link>

                    <Link
                        href="/services"
                        className="rounded-md bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-800 transition hover:bg-emerald-100"
                    >
                        All Services
                    </Link>

                </div>
                <section className="bg-white py-8">
                    <div className="mx-auto grid max-w-screen-xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                            <Image
                                src="/images/moving-team.webp"
                                alt="Professional moving services in London"
                                className="h-[220px] w-full object-cover sm:h-[300px] lg:h-[320px] h-auto"
                                width={1200}
                                height={800}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                            <Image
                                src="/images/student-storage.webp"
                                alt="Student storage and renter storage in London"
                                className="h-[220px] w-full object-cover object-center sm:h-[300px] lg:h-[320px] h-auto"
                                width={1200}
                                height={800}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>

                    </div>
                </section>
                {/* Services Section */}
                <section id="services" className="bg-gradient-to-b from-white to-slate-50/70 border-t border-slate-200/70">
                    <div className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                                <span className="h-2 w-2 rounded-full bg-emerald-700" />
                                Services
                            </div>
                            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
                                Choose the service that fits your move
                            </h2>
                            <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-7">
                                From secure storage and same-day moving to confidential shredding, book the service you need with clear pricing and flexible scheduling.
                            </p>
                        </div>

                        <div className="mt-8 sm:mt-10">

                            <ServicesGrid />
                        </div>
                        <section className="mt-10">
                            <h3 className="text-xl font-bold mb-4">
                                Business Storage & Warehouse Solutions
                            </h3>

                            <div className="flex flex-wrap gap-3 text-sm">
                                <Link href="/business-storage-london" className="font-medium text-emerald-800 hover:text-emerald-900 hover:underline">
                                    Business Storage London
                                </Link>

                                <Link href="/inventory-management-london" className="font-medium text-emerald-800 hover:text-emerald-900 hover:underline">
                                    Inventory Management London
                                </Link>

                                <Link href="/pallet-storage-london" className="font-medium text-emerald-800 hover:text-emerald-900 hover:underline">
                                    Pallet Storage London
                                </Link>

                                <Link href="/commercial-storage-london" className="font-medium text-emerald-800 hover:text-emerald-900 hover:underline">
                                    Commercial Storage London
                                </Link>
                                <Link href="/third-party-logistics-london" className="font-medium text-emerald-800 hover:text-emerald-900 hover:underline">
                                    Third Party Logistics London
                                </Link>
                            </div>
                        </section>
                        <div className="mt-6 flex justify-center">
                            <Link
                                href="/services"
                                className="text-emerald-700 font-semibold hover:underline"
                            >
                                View all services →
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="border-t border-slate-200/70 bg-slate-50 py-16">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl">
                            <h2 className="text-3xl font-black">
                                Business Storage Solutions Across London
                            </h2>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                KXH Logistics provides flexible warehouse storage, inventory storage,
                                pallet storage, office equipment storage, and collection & delivery
                                services for businesses throughout London.
                            </p>
                        </div>

                        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                            <Link href="/business-storage-london" className="rounded-2xl border bg-white p-6 hover:border-emerald-300">
                                <h3 className="font-bold">Business Storage</h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Flexible storage for stock, inventory, office equipment, and archives.
                                </p>
                            </Link>

                            <Link href="/inventory-management-london" className="rounded-2xl border bg-white p-6 hover:border-emerald-300">
                                <h3 className="font-bold">Inventory Storage</h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Organised inventory handling with collection and return delivery.
                                </p>
                            </Link>

                            <Link href="/pallet-storage-london" className="rounded-2xl border bg-white p-6 hover:border-emerald-300">
                                <h3 className="font-bold">Pallet Storage</h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Secure pallet storage for retail, wholesale, and commercial goods.
                                </p>
                            </Link>

                            <Link href="/third-party-logistics-london" className="rounded-2xl border bg-white p-6 hover:border-emerald-300">
                                <h3 className="font-bold">Third Party Logistics</h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    3PL support including inventory handling and warehouse coordination.
                                </p>
                            </Link>

                        </div>
                    </div>
                </section>
                <section className="border-t border-slate-200/70 bg-white py-16">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                    Student Storage London
                                </p>

                                <h2 className="mt-2 text-3xl font-black">
                                    Student Storage with Collection & Delivery
                                </h2>

                                <p className="mt-4 text-slate-600 leading-relaxed">
                                    KXH Logistics provides student storage in London for summer breaks,
                                    university accommodation moves, term breaks, shared house moves, and
                                    temporary storage between tenancies.
                                </p>

                                <p className="mt-4 text-slate-600 leading-relaxed">
                                    We collect your belongings, store them securely, and return them when
                                    your new term or move-in date starts.
                                </p>
                                <p className="mt-4 text-slate-600 leading-relaxed">
                                    We regularly collect from university halls, private student accommodation,
                                    shared houses, and rented flats throughout London.
                                </p>

                                <Link
                                    href="/student-storage-london"
                                    className="mt-8 inline-block rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800 transition"
                                >
                                    View Student Storage
                                </Link>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                                <h3 className="text-2xl font-black">
                                    Ideal for students across London
                                </h3>

                                <ul className="mt-6 space-y-3 text-slate-700">
                                    <li>✔ Summer student storage</li>
                                    <li>✔ University accommodation moves</li>
                                    <li>✔ Storage between tenancies</li>
                                    <li>✔ Collection from halls, flats, and shared houses</li>
                                    <li>✔ Return delivery when needed</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="border-t border-slate-200/70 bg-white py-16">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                London Boroughs
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-slate-900">
                                Storage Services Across London Boroughs
                            </h2>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                KXH Logistics provides warehouse storage, business storage,
                                inventory storage, pallet storage, and collection services
                                across London's major boroughs.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    name: "Tower Hamlets",
                                    href: "/warehouse-storage-london/tower-hamlets",
                                    desc: "Warehouse storage with collection and delivery across Tower Hamlets.",
                                },
                                {
                                    name: "Camden",
                                    href: "/warehouse-storage-london/camden",
                                    desc: "Flexible storage space for students, renters, households, and businesses in Camden.",
                                },
                                {
                                    name: "Hackney",
                                    href: "/warehouse-storage-london/hackney",
                                    desc: "Secure storage for business stock, apartment moves, student storage, and overflow items.",
                                },
                                {
                                    name: "Lambeth",
                                    href: "/warehouse-storage-london/lambeth",
                                    desc: "Managed storage with pickup and return delivery for Lambeth customers.",
                                },
                                {
                                    name: "Southwark",
                                    href: "/warehouse-storage-london/southwark",
                                    desc: "Warehouse storage for households, businesses, students, and office equipment.",
                                },
                                {
                                    name: "Westminster",
                                    href: "/warehouse-storage-london/westminster",
                                    desc: "Central London storage support for offices, students, renters, and commercial items.",
                                },
                                {
                                    name: "Kensington & Chelsea",
                                    href: "/warehouse-storage-london/kensington-chelsea",
                                    desc: "Secure storage space with collection and delivery in Kensington and Chelsea.",
                                },
                            ].map((area) => (
                                <Link
                                    key={area.href}
                                    href={area.href}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-emerald-300 hover:bg-white hover:shadow-sm"
                                >
                                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                        Warehouse Storage
                                    </p>

                                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                                        {area.name}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {area.desc}
                                    </p>

                                    <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                                        View storage in {area.name} →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                <TestimonialsSection />
                <section className="border-t border-slate-200/70 bg-white">
                    <div className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                                <span className="h-2 w-2 rounded-full bg-emerald-700" />
                                Business Storage & Inventory Solutions
                            </div>

                            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
                                Warehouse Storage & Inventory Management for London Businesses
                            </h2>

                            <p className="mt-5 text-base sm:text-lg leading-7 text-slate-600">
                                KXH Logistics provides secure warehouse storage, inventory management
                                and stock handling services for businesses across London. Our
                                commercial storage solutions help companies manage excess inventory,
                                office equipment, retail stock, archived documents, and pallet storage
                                efficiently.
                            </p>

                            <p className="mt-4 text-base sm:text-lg leading-7 text-slate-600">
                                Whether you need short-term warehouse overflow, commercial inventory
                                storage, office equipment storage, pallet storage, student storage,
                                or long-term business warehousing, KXH provides flexible collection,
                                secure warehouse storage, and return delivery throughout London.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href="/warehouse-storage-london"
                                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Warehouse Storage London
                                </Link>

                                <Link
                                    href="/logistics-moving-london"
                                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Office Moving Services
                                </Link>

                                <Link
                                    href="/services"
                                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Storage, Moving & Shredding Services
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white py-8">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                            <Image
                                src="/images/delivery-warehouse.webp"
                                alt="KXH pickup and delivery logistics"
                                className="h-[220px] w-full object-cover sm:h-[320px] lg:h-[420px] h-auto"
                                width={1200}
                                height={800}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                </section>
                {/* CTA */}
                <section className="relative border-t border-slate-200/70 bg-[#fbfbf9]">
                    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">

                        <div className="mx-auto max-w-3xl text-center">

                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Instant Online Quote
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl lg:text-5xl">
                                Ready to Get Your Storage or Moving Quote?
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                                Tell us what you need and receive an instant estimate for warehouse
                                storage, business storage, student storage, moving services, collection,
                                and delivery across London.
                            </p>

                            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

                                <Link
                                    href="/get-a-quote"
                                    className="rounded-2xl bg-emerald-700 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-500/20 transition hover:bg-emerald-500"
                                >
                                    Get Instant Quote
                                </Link>

                                <Link
                                    href="/services"
                                    className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Explore Our Services
                                </Link>

                            </div>

                            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-600">

                                <span className="rounded-full bg-white px-4 py-2 shadow-sm border border-slate-200">
                                    ✓ No obligation
                                </span>

                                <span className="rounded-full bg-white px-4 py-2 shadow-sm border border-slate-200">
                                    ✓ Instant estimate
                                </span>

                                <span className="rounded-full bg-white px-4 py-2 shadow-sm border border-slate-200">
                                    ✓ Collection & delivery
                                </span>

                            </div>

                        </div>

                    </div>
                </section>

                {/* FAQs */}
                <section id="faq" className="bg-slate-50/40 border-t border-slate-200/70">
                    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-black tracking-tight">FAQs</h2>
                        <div className="mt-6 grid gap-3">
                            {faqs.map((f) => (
                                <details key={f.q} className="rounded-2xl border border-slate-200 bg-white p-5">
                                    <summary className="cursor-pointer text-sm font-bold text-slate-900">{f.q}</summary>
                                    <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-600">{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="bg-white border-t border-slate-200/70">
                    <div className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8">
                        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                    Contact KXH
                                </p>

                                <h2 className="mt-2 text-3xl font-black tracking-tight">
                                    Need Storage or Logistics Support in London?
                                </h2>

                                <p className="mt-4 max-w-xl text-base md:text-lg text-slate-600 leading-relaxed">
                                    Our team can help with storage, moving, business inventory,
                                    student storage, pickup, delivery, and shredding enquiries.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    {CONTACT_NUMBERS.map((contact) => (
                                        <a
                                            key={contact.href}
                                            href={contact.href}
                                            className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2 sm:w-auto"
                                        >
                                            Call {contact.label}
                                        </a>
                                    ))}

                                    <a
                                        href="mailto:help@kxhlogistics.co.uk"
                                        className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50"
                                    >
                                        Email help@kxhlogistics.co.uk
                                    </a>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <h3 className="text-xl font-bold">
                                    Service Details
                                </h3>

                                <ul className="mt-5 space-y-3 text-slate-700">
                                    <li>✔ London-wide collection</li>
                                    <li>✔ Flexible storage terms</li>
                                    <li>✔ Return delivery available</li>
                                    <li>✔ Business & student storage specialists</li>
                                    <li>✔ Instant online quote available</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <MainFooter locations={londonLocations} />
            </main>
        </>
    );
}
