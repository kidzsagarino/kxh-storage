
import CrispChat from "./components/chat/CrispChat";
import Nav from "./components/MobileNav";

import type { Metadata } from "next";
import { londonLocations } from "./lib/location";
import MainFooter from "./components/footer/MainFooter";
import HomeHeroCover from "./components/hero/HomeHeroCover";
import HomeSections from "./components/HomeSections";

export const metadata: Metadata = {
    title: { absolute: "Storage with Collection & Delivery in London | KXH" },
    description:
        "Storage with collection and delivery across London. Warehouse, business and student storage, moving and shredding. Open 24/7. Get an instant online quote.",
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
        logo: "https://kxhlogistics.co.uk/logo.webp",
        image: "https://kxhlogistics.co.uk/images/kxh-home-hero-warehouse-london.webp",
        telephone: "+442039165312",
        email: "help@kxhlogistics.co.uk",
        priceRange: "££",

        description:
            "Door-to-door storage, moving, and shredding services in London with pickup, delivery, secure warehouse storage, and business logistics support.",

        address: {
            "@type": "PostalAddress",
            streetAddress: "9 New City Road",
            addressLocality: "London",
            postalCode: "E13 9LL",
            addressCountry: "GB",
        },

        // Approximate point for New City Road, Plaistow (E13). Verify against the Google Business Profile pin.
        geo: {
            "@type": "GeoCoordinates",
            latitude: 51.5268,
            longitude: 0.0345,
        },

        areaServed: [
            "Camden", "Westminster", "Hackney", "Islington", "Kensington and Chelsea",
            "Tower Hamlets", "Southwark", "Lambeth", "Newham", "Greater London",
        ].map((name) => ({ "@type": "Place", name })),

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
                telephone: "+442039165312",
                contactType: "customer service",
                areaServed: "GB",
                availableLanguage: "English",
            },
            {
                "@type": "ContactPoint",
                telephone: "+447470025636",
                contactType: "sales",
                areaServed: "GB",
                availableLanguage: "English",
            },
        ],

        sameAs: [
            "https://uk.trustpilot.com/review/kxhlogistics.co.uk",
            "https://www.facebook.com/kxhlogistics",
            "https://www.instagram.com/kxh_logistics",
            "https://www.tiktok.com/@kxhlogistics",
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
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
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
                {/* Hero Section (new cover) */}
                <HomeHeroCover />

                {/* Proof band */}
                <section className="border-b border-slate-200/70 bg-white py-10">
                    <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-6 px-4 text-center sm:px-6 lg:grid-cols-4 lg:px-8">
                        {[
                            { big: "5.0★", small: "Google rating from 50 reviews" },
                            { big: "4.8★", small: "Rated on Trustpilot" },
                            { big: "24/7", small: "Open 24 hours, 7 days a week" },
                            { big: "Door to door", small: "Collection and return across London" },
                        ].map((s) => (
                            <div key={s.small} className="rounded-2xl p-2 transition hover:-translate-y-1">
                                <p className="text-3xl font-black text-emerald-700 sm:text-4xl">{s.big}</p>
                                <p className="mt-2 text-sm text-slate-600 sm:text-base">{s.small}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <HomeSections faqs={faqs} />

                <MainFooter locations={londonLocations} />
            </main>
        </>
    );
}
