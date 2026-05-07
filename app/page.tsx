
import { ServicesGrid } from "./components/ServicesGrid";
import HomeClientControls from "./components/HomeClientControls";
import { HeroQuoteBar } from "./components/hero/HeroQuoteBar";
import { loadOrderFlow } from "@/server/order-flow/loadOrderFlow";
import { CheckoutProvider } from "./components/checkout/CheckoutStore";
import CrispChat from "./components/chat/CrispChat";
import Nav from "./components/MobileNav";
import FloatingTrustpilot from "./components/trustpilot/FloatingTrustpilot";

import type { Metadata } from "next";
import Link from "next/link";
import { londonLocations } from "./lib/location";
import { Footer } from "react-day-picker";
import MainFooter from "./components/footer/MainFooter";

export const metadata: Metadata = {
    title: "Storage Pickup & Delivery London | Secure Warehousing | KXH Logistics",
    description:
        "Affordable storage, moving, and document shredding in London. Get instant quotes with pickup, delivery, and secure handling.",
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
        "priceRange": "££",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "London, UK",
            "addressLocality": "London",
            "addressCountry": "GB",
        },
        "@id": "https://kxhlogistics.co.uk/#business",
        name: "KXH Storage & Logistics",
        url: "https://kxhlogistics.co.uk",
        telephone: "+44 1474 396663",
        image: "https://kxhlogistics.co.uk/og.jpg",
        description:
            "Door-to-door storage, moving, and shredding services in London with pickup, delivery, and secure handling.",
        areaServed: {
            "@type": "Place",
            name: "London, United Kingdom",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: "51.5074",
            longitude: "-0.1278",
        },
        sameAs: [
            "https://uk.trustpilot.com/review/kxhlogistics.co.uk",
        ],
        makesOffer: [
            {
                "@type": "Offer",
                name: "Storage Service London",
            },
            {
                "@type": "Offer",
                name: "Moving Service London",
            },
            {
                "@type": "Offer",
                name: "Document Shredding London",
            },
            {
                "@type": "Offer",
                name: "Storage Pickup and Delivery London",
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

export const dynamic = "force-dynamic";

export default async function HomePage() {

    const initialData = await loadOrderFlow("GBP");

    return (
        <CheckoutProvider initialOrderFlow={initialData}>
            <FloatingTrustpilot />
            <CrispChat />
            <Nav />

            <main className="min-h-screen bg-white text-slate-900">
                <JsonLd />
                <FAQJsonLd />
                {/* Hero Section */}

                <section className="relative overflow-hidden bg-slate-50 py-12 lg:py-20">
                    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-500 shadow-sm backdrop-blur">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Trusted Storage & Logistics in London
                        </div>

                        <h1 className="mt-5 max-w-3xl mx-auto text-4xl font-black sm:text-5xl lg:text-[56px] lg:leading-tight">
                            Storage with Pickup & Delivery in London
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-6">
                            Book storage with pickup and delivery in London. We collect your items, store them securely in our warehouse, and deliver them back when needed — simple, flexible, and cost-effective.
                        </p>
                        <div className="mt-5 flex flex-wrap justify-center gap-3">
                            {["Instant quote", "Clear pricing", "Flexible scheduling"].map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm text-slate-600 shadow ring-1 ring-slate-200"
                                >
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="mt-8 mx-auto max-w-4xl">
                            <HeroQuoteBar />
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
                            <a href="/warehouse-storage-london" className="text-emerald-600 hover:underline">
                                Secure warehouse storage in London
                            </a>
                            <a href="/logistics-moving-london" className="text-emerald-600 hover:underline">
                                Moving Services London
                            </a>
                            <a href="/shredding-solutions-london" className="text-emerald-600 hover:underline">
                                Document Shredding London
                            </a>
                        </div>
                        {/* Hero Stats */}
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
                                <div className="text-2xl font-black text-slate-900">5,000+</div>
                                <div className="mt-1 text-sm text-slate-500">Londoners served</div>
                            </div>

                            <a href="https://uk.trustpilot.com/review/kxhlogistics.co.uk" target="_blank" rel="noopener noreferrer">
                                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
                                    <div className="text-2xl font-black text-slate-900">4.8★</div>
                                    <div className="mt-1 text-sm text-slate-500">Excellent on Trustpilot</div>
                                </div>
                            </a>

                            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
                                <div className="text-2xl font-black text-slate-900">Under 1 min</div>
                                <div className="mt-1 text-sm text-slate-500">To get your quote</div>
                            </div>
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
                            Your items are stored in monitored facilities with controlled access and professional handling, ideal for personal and business storage.
                        </p>

                        <h3 className="text-xl font-bold mt-6 mb-2">
                            Flexible Access with Delivery
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            Request your items anytime and we’ll deliver them back quickly — no need to travel to a storage unit.
                        </p>

                    </div>
                </section>
                <section className="py-10 text-center max-w-3xl mx-auto">
                    <h2 className="text-xl font-bold">
                        A Fully Managed Storage Service in London
                    </h2>
                    <p className="mt-3 text-slate-600">
                        Unlike traditional self-storage, we handle everything for you — collection, secure storage, and delivery — so you never need to visit a storage unit.
                    </p>
                </section>
                {/* Services Section */}
                <section id="services" className="bg-gradient-to-b from-white to-slate-50/70 border-t border-slate-200/70">
                    <div className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                                <span className="h-2 w-2 rounded-full bg-emerald-600" />
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
                        <div className="mt-6 flex justify-center">
                            <Link
                                href="/services"
                                className="text-emerald-600 font-semibold hover:underline"
                            >
                                View all services →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="relative bg-[#fbfbf9] border-t border-slate-200/70">
                    <div className="relative mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                        <h2 className="text-3xl font-black text-slate-950 sm:text-4xl lg:text-[3.15rem] lg:leading-[1.05]">
                            Get an instant quote
                        </h2>
                        <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                            Choose a service, customise your details, and see your price instantly — all in one seamless flow.
                        </p>

                        <div className="mt-10">
                            <HomeClientControls variant="pricing" />
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
                    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-black tracking-tight">Contact</h2>
                        <p className="mt-4 max-w-xl text-base md:text-lg text-slate-600 leading-relaxed">
                            Prefer messaging? Our team is ready to assist you with any questions or support you need. Reach out
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href="tel:+441474396663" className="rounded-xl px-5 py-3 text-sm font-semibold text-white bg-emerald-600 shadow-lg">
                                Call +44 1474 396663
                            </a>
                            <a href="mailto:help@kxhlogistics.co.uk" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50">
                                Email help@kxhlogistics.co.uk
                            </a>
                        </div>
                    </div>
                </section>

                <MainFooter services={[
                    { label: "Storage London", href: "/warehouse-storage-london" },
                    { label: "Moving London", href: "/logistics-moving-london" },
                    { label: "Shredding London", href: "/shredding-solutions-london" },
                ]} locations={londonLocations} />
            </main>
        </CheckoutProvider>
    );
}
