import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustpilotJsonLd from "../components/seo/TrustPilotJsonLD";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import { londonLocations } from "../lib/location";

export const metadata: Metadata = {
    title: "Moving Services London | House, Office & Commercial Removals",
    description:
        "Managed moving services across London for homes, apartments, offices, businesses and students, with packing, furniture transport and optional storage.",
    alternates: {
        canonical: "https://kxhlogistics.co.uk/logistics-moving-london",
    },
    openGraph: {
        type: "website",
        url: "https://kxhlogistics.co.uk/logistics-moving-london",
        title: "Moving Services London | KXH Storage & Logistics",
        description:
            "Plan a London move with packing, loading, transport, delivery and optional temporary storage coordinated by one team.",
        images: [
            {
                url: "/images/moving-services/moving-services-hero.webp",
                width: 1200,
                height: 630,
                alt: "KXH movers completing a managed move in London",
            },
        ],
    },
};

const heroBenefits = [
    "House and apartment moves",
    "Office and commercial relocations",
    "Packing and furniture protection",
    "Temporary storage available",
];

const movingSteps = [
    {
        number: "1",
        title: "Request a Quote",
        description:
            "Tell us what you are moving, the collection and delivery addresses, preferred dates, access details and any packing or storage requirements.",
    },
    {
        number: "2",
        title: "Confirm the Plan",
        description:
            "We review the volume, property access, vehicle and labour requirements, then confirm the service scope and moving arrangements.",
    },
    {
        number: "3",
        title: "Choose Extra Support",
        description:
            "Add packing materials, professional packing, furniture dismantling, temporary storage or staged delivery where required.",
    },
    {
        number: "4",
        title: "We Collect and Move",
        description:
            "Our team protects, loads and transports your belongings using the agreed moving plan and delivery schedule.",
    },
    {
        number: "5",
        title: "Delivery Is Completed",
        description:
            "Items are unloaded at the destination, with reassembly or storage redelivery coordinated when included in your service.",
    },
];

const pricingFactors = [
    "Distance between collection and delivery addresses",
    "Property size and quantity of belongings",
    "Packing materials and professional packing",
    "Heavy, bulky, fragile or high-care furniture",
    "Vehicle size and number of movers required",
    "Stairs, lifts, loading bays and narrow entrances",
    "Parking, congestion and access restrictions",
    "Dismantling and reassembly requirements",
    "Temporary storage or staged delivery",
    "Evening, weekend or date-sensitive scheduling",
];
const estimatedMoveTimes = [
    {
        property: "Studio Apartment",
        duration: "2–4 Hours",
        notes: "Ideal for smaller moves with straightforward access.",
    },
    {
        property: "1 Bedroom",
        duration: "4–6 Hours",
        notes: "Typical apartment or small house move within London.",
    },
    {
        property: "2 Bedroom",
        duration: "5–8 Hours",
        notes: "Depends on furniture volume, parking and access.",
    },
    {
        property: "3–4 Bedroom House",
        duration: "Full Day",
        notes: "May require multiple movers, packing or staged loading.",
    },
    {
        property: "Office Relocation",
        duration: "Project Based",
        notes: "Planned around equipment, departments and business continuity.",
    },
];

const movingProblems = [
    {
        title: "Moving Dates Change",
        description:
            "Property chains, tenancy dates and key collection can move unexpectedly. A flexible plan can include revised scheduling or storage between addresses.",
    },
    {
        title: "London Access Is Difficult",
        description:
            "Controlled parking zones, loading restrictions, narrow streets, flats and building rules can complicate collection and delivery without advance planning.",
    },
    {
        title: "Furniture Is Heavy or Awkward",
        description:
            "Sofas, wardrobes, beds, desks and appliances may require protection, careful handling, dismantling or additional moving support.",
    },
    {
        title: "The New Property Is Not Ready",
        description:
            "Temporary accommodation, renovation work or delayed completion can leave belongings without a destination. Moving and storage can be coordinated together.",
    },
    {
        title: "Office Downtime Must Be Reduced",
        description:
            "Business moves may need phased collections, weekend scheduling and clear handling plans for furniture, equipment, files and departmental assets.",
    },
    {
        title: "Student Deadlines Are Fixed",
        description:
            "Hall check-out dates, summer travel and new-term move-in windows often require collection, storage and redelivery to work as one connected service.",
    },
];

const managedServices = [
    "Move planning and scheduling",
    "Packing materials",
    "Professional packing",
    "Furniture coverings and protection",
    "Dismantling and reassembly",
    "Loading and unloading",
    "Secure transport coordination",
    "Temporary storage",
    "Staged or final delivery",
    "Flexible service options",
];

const whyChooseKxh = [
    {
        title: "Professional Moving Specialists",
        description:
            "Trained movers handle belongings carefully through collection, loading, transport, unloading and delivery.",
    },
    {
        title: "Fully Managed Moving",
        description:
            "Packing, labour, transport, protection, storage and delivery can be coordinated as one connected service.",
    },
    {
        title: "Flexible Scheduling",
        description:
            "Weekday, weekend, staged, urgent and date-sensitive moves may be supported where availability allows.",
    },
    {
        title: "Packing and Protection",
        description:
            "Suitable materials, furniture coverings and careful loading help protect belongings throughout the move.",
    },
    {
        title: "Storage Available",
        description:
            "Temporary or longer-term storage can bridge the gap when a destination, tenancy or business premises is not ready.",
    },
    {
        title: "London Moving Knowledge",
        description:
            "Planning accounts for borough access, traffic, parking controls, flats, terraces, loading bays and building requirements.",
    },
];

const serviceCategories = [
    {
        title: "House Removals",
        description:
            "Managed house removals for homeowners, renters, families, downsizers and upsizers. Our moving company can coordinate packing, loading, furniture protection, transport and delivery throughout London.",
    },
    {
        title: "Apartment Moving",
        description:
            "Professional apartment moving for flats, high-rise buildings and modern developments with lift bookings, concierge requirements, restricted parking and controlled access.",
    },
    {
        title: "Office Relocation",
        description:
            "Office removal services for businesses relocating desks, IT equipment, documents, furniture and operational assets with minimal disruption.",
    },
    {
        title: "Commercial Moving",
        description:
            "Commercial removal services for retail businesses, warehouses, studios, workshops and other organisations moving equipment, inventory and furniture across London.",
    },
    {
        title: "Furniture Transport",
        description:
            "Professional furniture moving for sofas, wardrobes, beds, appliances, antiques and bulky purchases requiring careful handling and transport.",
    },
    {
        title: "Student Moving",
        href: "/student-storage-london",
        description:
            "Collection, moving, storage and redelivery for halls, shared accommodation, term-time moves, summer travel, luggage, boxes and small furniture.",
    },
];

const comparisonRows = [
    {
        feature: "Professional packing",
        diy: "Customer managed",
        vanHire: "Customer managed",
        traditional: "Provider dependent",
        kxh: "Available",
    },
    {
        feature: "Loading and unloading",
        diy: "Customer managed",
        vanHire: "Customer managed",
        traditional: "Usually included",
        kxh: "Included",
    },
    {
        feature: "Vehicle and transport",
        diy: "Customer arranged",
        vanHire: "Van supplied; customer drives",
        traditional: "Included",
        kxh: "Included",
    },
    {
        feature: "Furniture protection",
        diy: "Customer managed",
        vanHire: "Customer managed",
        traditional: "Provider dependent",
        kxh: "Included as required",
    },
    {
        feature: "Temporary storage",
        diy: "Separately arranged",
        vanHire: "Separately arranged",
        traditional: "Provider dependent",
        kxh: "Available",
    },
    {
        feature: "Dismantling and reassembly",
        diy: "Customer managed",
        vanHire: "Customer managed",
        traditional: "Optional or dependent",
        kxh: "Available",
    },
    {
        feature: "Flexible staged service",
        diy: "Customer coordinated",
        vanHire: "Limited by rental period",
        traditional: "Provider dependent",
        kxh: "Available",
    },
    {
        feature: "One coordinated moving and storage service",
        diy: "No",
        vanHire: "No",
        traditional: "Provider dependent",
        kxh: "Available",
    },
];

const movingStorageScenarios = [
    "Property-chain delays",
    "Moving before completion",
    "Student summer moves",
    "Office refurbishments",
    "Temporary accommodation",
    "International relocation preparation",
    "Home renovation or downsizing",
    "Delayed key collection",
    "Staged office relocation",
    "New premises not yet ready",
];

const customerFitItems = [
    {
        title: "Moving house",
        description:
            "For a complete household move with furniture, boxes and appliances.",
    },
    {
        title: "Moving between rented properties",
        description:
            "For tenants working around check-out dates, deposits and key collection.",
    },
    {
        title: "Apartment relocation",
        description:
            "For flats with stairs, lifts, concierge rules or restricted access.",
    },
    {
        title: "Office or commercial relocation",
        description:
            "For furniture, equipment, files, stock and operational assets.",
    },
    {
        title: "Student accommodation move",
        description:
            "For halls, shared housing, summer storage and next-term redelivery.",
    },
    {
        title: "Temporary storage between addresses",
        description:
            "For property delays, renovations, travel or phased relocation.",
    },
    {
        title: "Furniture transport",
        description:
            "For individual bulky items, purchases or high-care furniture.",
    },
    {
        title: "Downsizing or refurbishment",
        description:
            "For moving selected items while creating space or changing premises.",
    },
];

const movingChecklist = [
    "Book your preferred moving date early.",
    "Label boxes by room and priority.",
    "Pack an essentials bag for moving day.",
    "Defrost refrigerators and freezers 24 hours beforehand.",
    "Measure large furniture for access points.",
    "Reserve parking or loading areas where required.",
    "Notify utility providers and update your address.",
    "Keep passports, keys and important documents with you.",
];

const coverageAreas = [
    { name: "Camden", href: "/logistics-moving-london/camden" },
    { name: "Westminster", href: "/logistics-moving-london/westminster" },
    { name: "Tower Hamlets", href: "/logistics-moving-london/tower-hamlets" },
    {
        name: "Kensington & Chelsea",
        href: "/logistics-moving-london/kensington-chelsea",
    },
    { name: "Southwark", href: "/logistics-moving-london/southwark" },
    { name: "Hackney", href: "/logistics-moving-london/hackney" },
    { name: "Lambeth", href: "/logistics-moving-london/lambeth" },
    { name: "Islington", href: "/logistics-moving-london/islington" },
];

const relatedServices = [
    {
        title: "Warehouse Storage London",
        href: "/warehouse-storage-london",
        description:
            "Secure managed storage with collection and return delivery when belongings cannot move directly to the new address.",
    },
    {
        title: "Student Storage London",
        href: "/student-storage-london",
        description:
            "Collection, storage and redelivery for summer moves, hall changes and term-time accommodation.",
    },
    {
        title: "Business Storage London",
        href: "/business-storage-london",
        description:
            "Store office furniture, equipment, stock and business assets during relocation, refurbishment or growth.",
    },

    {
        title: "Inventory Management London",
        href: "/inventory-management-london",
        description:
            "Organised physical storage for stock and operational items that need controlled handling during a commercial move.",
    },
    {
        title: "Pallet Storage London",
        href: "/pallet-storage-london",
        description:
            "Flexible pallet capacity for commercial stock that cannot move immediately into new premises.",
    },
    {
        title: "Shredding Solutions London",
        href: "/shredding-solutions-london",
        description:
            "Dispose of unwanted confidential documents securely before or after an office relocation.",
    },
];

const faqs = [
    {
        question: "How much do moving services cost in London?",
        answer:
            "Moving costs depend on the collection and delivery locations, property size, volume of belongings, access, vehicle and labour requirements, packing, dismantling, scheduling and any temporary storage. KXH provides a tailored quote based on the actual move.",
    },
    {
        question: "What affects the price of a London removal?",
        answer:
            "Important factors include distance, stairs or lifts, parking restrictions, loading access, bulky or fragile items, packing requirements, number of movers, vehicle size, timing and whether storage or staged delivery is needed.",
    },
    {
        question: "Can KXH pack my belongings?",
        answer:
            "Yes. Professional packing can be included for selected items or the full move, with appropriate wrapping, boxing and furniture protection based on the agreed service.",
    },
    {
        question: "Do you provide boxes and packing materials?",
        answer:
            "Packing materials can be included as part of the moving plan. Tell us what you are moving so the team can review the type and quantity of materials required.",
    },
    {
        question: "Can you move furniture between London boroughs?",
        answer:
            "Yes. KXH supports individual furniture transport and larger moves between approved collection and delivery locations across London.",
    },
    {
        question: "Can you help with apartment moves?",
        answer:
            "Yes. Apartment moves can be planned around lift bookings, stairs, concierge requirements, loading bays, restricted parking and building-management access rules.",
    },
    {
        question: "Do you provide office removals in London?",
        answer:
            "Yes. Office relocation support can include planning, packing, furniture and equipment handling, loading, transport, temporary storage and phased delivery.",
    },
    {
        question: "Can you store belongings between moving dates?",
        answer:
            "Yes. KXH can collect belongings, move them into managed warehouse storage for the agreed period and arrange redelivery when the destination is ready.",
    },
    {
        question: "Do you provide student moving services?",
        answer:
            "Yes. Student moving support is available for halls, shared accommodation, summer moves, luggage, boxes, small furniture, storage and redelivery.",
    },
    {
        question: "Can you dismantle and reassemble furniture?",
        answer:
            "Dismantling and reassembly may be included where agreed in advance and suitable for the furniture involved. Add these requirements when requesting your quote.",
    },
    {
        question: "How far in advance should I book?",
        answer:
            "Book as early as practical, especially for weekends, month-end dates, student changeovers and office moves. Availability is confirmed when your moving requirements are reviewed.",
    },
    {
        question: "Can you handle short-notice moves?",
        answer:
            "Short-notice, same-day or next-day support may be available depending on the location, team, vehicle capacity and service requirements.",
    },
    {
        question: "How are belongings protected during transport?",
        answer:
            "The moving plan can include suitable packing, furniture coverings, careful loading and secure placement during transport. Specific protection requirements should be discussed before booking.",
    },
    {
        question: "Do you cover all London boroughs?",
        answer:
            "KXH serves approved locations across London. Enter your collection and delivery details when requesting a quote so access and availability can be confirmed.",
    },
    {
        question: "Can you provide moving services on weekends?",
        answer:
            "Weekend moving services may be available depending on team capacity, vehicle availability, the locations involved and the level of support required. Weekend and month-end dates are often booked earlier, so include your preferred date when requesting a quote.",
    },
    {
        question: "How long does a London move usually take?",
        answer:
            "The time required depends on the property size, number of belongings, packing requirements, access conditions, travel distance, parking restrictions and whether dismantling, storage or staged delivery is included. KXH confirms the expected moving schedule after reviewing the job.",
    },
];

const commonRoutes = [
    ["Camden", "Westminster"],
    ["Islington", "Hackney"],
    ["Southwark", "Lambeth"],
    ["Kensington & Chelsea", "Westminster"],
    ["Tower Hamlets", "Hackney"],
    ["Camden", "Islington"],
];

function ServiceJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://kxhlogistics.co.uk/logistics-moving-london#service",

        name: "Moving Services London",

        serviceType: "Moving and Removal Service",

        url: "https://kxhlogistics.co.uk/logistics-moving-london",

        description:
            "Managed moving services across London for houses, apartments, offices, businesses and students, with packing, furniture transport and optional temporary storage.",

        provider: {
            "@type": "LocalBusiness",
            "@id": "https://kxhlogistics.co.uk/#business",
            name: "KXH Storage & Logistics",
            url: "https://kxhlogistics.co.uk",
            telephone: "+44 7470 025636",
        },

        areaServed: {
            "@type": "City",
            name: "London",
        },

        offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            availability: "https://schema.org/InStock",
            url: "https://kxhlogistics.co.uk/get-a-quote?service=moving",
        },

        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Moving Services",

            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "House Removals London",
                        description:
                            "Professional house moving with packing, loading, transport and delivery.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Apartment Moving London",
                        description:
                            "Apartment and flat relocations including lift access and restricted parking planning.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Office Relocation London",
                        description:
                            "Office moving for furniture, IT equipment, archives and business assets.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Commercial Removals London",
                        description:
                            "Commercial relocation for retail stock, equipment and operational assets.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Furniture Transport London",
                        description:
                            "Collection and transport for individual furniture and bulky household items.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Student Moving London",
                        description:
                            "Student accommodation moves with optional storage and return delivery.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Professional Packing Service",
                        description:
                            "Packing materials, wrapping, furniture protection and careful boxing.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Temporary Storage During Moving",
                        description:
                            "Secure warehouse storage between collection and final delivery.",
                    },
                },
            ],
        },
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
            {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://kxhlogistics.co.uk/services",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: "Moving Services London",
                item: "https://kxhlogistics.co.uk/logistics-moving-london",
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

export default function MovingServicePage() {
    return (
        <>
            <CrispChat />
            <Nav />

            <main className="min-h-screen bg-white text-slate-900">
                <ServiceJsonLd />
                <FAQJsonLd />
                <BreadcrumbJsonLd />
                <TrustpilotJsonLd />

                <nav
                    aria-label="Breadcrumb"
                    className="mx-auto max-w-6xl overflow-x-auto px-5 pt-4 text-xs text-slate-500 sm:px-6 sm:pt-6 sm:text-sm lg:px-8"
                >
                    <Link href="/" className="transition hover:text-emerald-700">
                        Home
                    </Link>
                    <span className="mx-2">/</span>
                    <Link href="/services" className="transition hover:text-emerald-700">
                        Services
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-slate-700">
                        Moving Services London
                    </span>
                </nav>

                <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                            <span
                                className="h-2 w-2 rounded-full bg-emerald-500"
                                aria-hidden="true"
                            />
                            Managed Moving Support Across London
                        </div>

                        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                            Moving Services London for Homes, Offices and Businesses
                        </h1>

                        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                            Plan your move with one professional moving company for packing,
                            loading, transport, delivery and optional storage across London.
                            Whether you need a complete house removal, apartment relocation,
                            office move or commercial removal service, KXH provides tailored
                            support based on your requirements.
                        </p>

                        <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                            KXH supports house removals, apartment moves, office relocations,
                            commercial moves, student accommodation changes and furniture
                            transport with a tailored quote based on the actual job.
                        </p>

                        <div className="mx-auto mt-7 grid max-w-4xl grid-cols-1 gap-3 min-[430px]:grid-cols-2 lg:grid-cols-4">
                            {heroBenefits.map((benefit) => (
                                <div
                                    key={benefit}
                                    className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
                                >
                                    <span aria-hidden="true">✓</span> {benefit}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link
                                href="/get-a-quote?service=moving"
                                className="w-full rounded-xl bg-emerald-700 px-6 py-4 text-center font-semibold text-white shadow-lg transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:w-auto"
                            >
                                Get a Moving Quote
                            </Link>
                            <a
                                href="tel:+447470025636"
                                className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:w-auto"
                            >
                                Call KXH
                            </a>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <TrustpilotPill />
                        </div>

                        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                            <Image
                                src="/images/moving-services/moving-services-hero.webp"
                                alt="KXH moving team loading belongings for a London move"
                                width={1400}
                                height={800}
                                quality={80}
                                sizes="(max-width: 768px) 100vw, 960px"
                                className="h-auto w-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="moving-process"
                    className="border-y border-slate-200 bg-white py-14 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                How It Works
                            </p>
                            <h2
                                id="moving-process"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                One Managed Process From Quote to Delivery
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Choose the level of support you need, from transport only to
                                packing, storage and final delivery.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
                            {movingSteps.map((step) => (
                                <article
                                    key={step.number}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
                                >
                                    <span className="text-sm font-black text-emerald-700">
                                        {step.number}
                                    </span>
                                    <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {step.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="moving-cost"
                    className="bg-slate-50 py-14 sm:py-20"
                >
                    <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Tailored Moving Costs
                            </p>
                            <h2
                                id="moving-cost"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                What Affects the Cost of Moving in London?
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                A London move cannot be priced accurately from property size
                                alone. Access, item volume, labour, vehicle requirements and
                                optional services all affect the work involved.
                            </p>
                            <p className="mt-4 leading-7 text-slate-600">
                                KXH provides a tailored quote based on the actual move rather
                                than an unclear one-size-fits-all rate.
                            </p>
                            <p className="mt-4 leading-7 text-slate-600">
                                Every move is different. A one-bedroom apartment with lift access requires different planning than a four-bedroom house or a commercial office relocation. KXH reviews the collection location, destination, item volume, access restrictions, labour requirements and any optional packing or storage before preparing a tailored quotation.
                            </p>
                            <Link
                                href="/get-a-quote?service=moving"
                                className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                            >
                                Request Your Moving Quote
                            </Link>
                        </div>

                        <ul className="grid gap-4 sm:grid-cols-2">
                            {pricingFactors.map((factor) => (
                                <li
                                    key={factor}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700"
                                >
                                    <span
                                        className="mr-2 font-bold text-emerald-700"
                                        aria-hidden="true"
                                    >
                                        ✓
                                    </span>
                                    {factor}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section
                    aria-labelledby="moving-times"
                    className="border-y border-slate-200 bg-white py-14 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Typical Moving Times
                            </p>

                            <h2
                                id="moving-times"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                How Long Does a London Move Usually Take?
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                Every move is different. Property size, access,
                                parking restrictions, packing requirements and
                                furniture volume all influence the overall moving
                                schedule. The examples below provide a general guide.
                            </p>
                        </div>

                        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200">

                            <div className="grid grid-cols-[2fr_1fr_2fr] bg-emerald-800 text-sm font-bold text-white">
                                <div className="p-5">Property Type</div>
                                <div className="p-5 text-center">Estimated Duration</div>
                                <div className="p-5">Typical Scenario</div>
                            </div>

                            {estimatedMoveTimes.map((item) => (
                                <div
                                    key={item.property}
                                    className="grid grid-cols-[2fr_1fr_2fr] border-t border-slate-200 bg-white text-sm"
                                >
                                    <div className="p-5 font-semibold">
                                        {item.property}
                                    </div>

                                    <div className="p-5 text-center font-medium text-emerald-700">
                                        {item.duration}
                                    </div>

                                    <div className="p-5 text-slate-600">
                                        {item.notes}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="mx-auto mt-5 max-w-4xl text-center text-sm leading-6 text-slate-500">
                            These estimates are intended as general guidance. The final moving
                            schedule depends on property access, parking restrictions, the number
                            of belongings, packing requirements and any optional storage or
                            dismantling services.
                        </p>
                    </div>
                </section>

                <section
                    aria-labelledby="moving-problems"
                    className="border-y border-slate-200 bg-white py-14 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Problems We Solve
                            </p>
                            <h2
                                id="moving-problems"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                London Moves Need More Than a Van
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Good moving support accounts for changing dates, difficult
                                access, packing, storage gaps and the practical details that can
                                delay a move.
                            </p>
                            <p className="mt-4 leading-7 text-slate-600">
                                Many customers compare removal companies, van hire and DIY moving
                                before deciding which approach offers the best balance of cost,
                                convenience and protection. Our managed moving service is designed
                                to reduce the planning, lifting and coordination normally required
                                when organising a London move yourself.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {movingProblems.map((problem) => (
                                <article
                                    key={problem.title}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                                >
                                    <h3 className="text-lg font-bold text-slate-950">
                                        {problem.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {problem.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="managed-moving"
                    className="bg-slate-50 py-14 sm:py-20"
                >
                    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                        <Image
                            src="/images/moving-services/moving-services-packing-loading.webp"
                            alt="KXH movers packing and loading belongings for transport"
                            width={1400}
                            height={700}
                            quality={75}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                            loading="lazy"
                            decoding="async"
                        />
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Managed Moving Services
                            </p>
                            <h2
                                id="managed-moving"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Choose a Complete Move or Only the Support You Need
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                As a professional London removal company, KXH can coordinate every
                                stage of your move from planning through delivery. Whether you need
                                a complete moving service or support with packing, loading,
                                transport or temporary storage, the level of assistance can be
                                tailored to your requirements.
                            </p>
                            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                                {managedServices.map((service) => (
                                    <li
                                        key={service}
                                        className="text-sm font-medium text-slate-700 sm:text-base"
                                    >
                                        <span className="mr-2 text-emerald-700" aria-hidden="true">
                                            ✓
                                        </span>
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="why-kxh"
                    className="border-y border-slate-200 bg-white py-14 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Why Choose KXH
                            </p>
                            <h2
                                id="why-kxh"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Moving Support Designed Around London Properties
                            </h2>
                        </div>
                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {whyChooseKxh.map((item, index) => (
                                <article
                                    key={item.title}
                                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm"
                                >
                                    <div
                                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-700"
                                        aria-hidden="true"
                                    >
                                        {index + 1}
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold text-slate-950">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {item.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="moving-categories"
                    className="bg-slate-50 py-14 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Moving Service Categories
                            </p>
                            <h2
                                id="moving-categories"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                House, Apartment, Office, Commercial and Student Moves
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Select a moving service based on the property, items, access
                                requirements and level of support involved.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {serviceCategories.map((service) => {
                                const content = (
                                    <>
                                        <h3 className="text-lg font-bold text-slate-950">
                                            {service.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-6 text-slate-600">
                                            {service.description}
                                        </p>
                                        {service.href ? (
                                            <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                                                Explore student moving and storage →
                                            </span>
                                        ) : null}
                                    </>
                                );
                                return service.href ? (
                                    <Link
                                        key={service.title}
                                        href={service.href}
                                        className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm"
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    <article
                                        key={service.title}
                                        className="rounded-2xl border border-slate-200 bg-white p-6"
                                    >
                                        {content}
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="moving-comparison"
                    className="border-y border-slate-200 bg-white py-14 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Compare Moving Options
                            </p>
                            <h2
                                id="moving-comparison"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                DIY Moving vs Van Hire vs a Managed Moving Service
                            </h2>
                            <p className="mt-5 leading-7 text-slate-600">
                                Compare who manages packing, labour, transport, storage and
                                coordination before choosing the right approach for your move.
                            </p>
                            <p className="mt-5 leading-7 text-slate-600">
                                Choosing between DIY moving, van hire and a professional removal
                                company depends on the amount of work you want to manage yourself.
                                For larger moves, fragile furniture or time-sensitive relocations,
                                many customers prefer a fully managed moving service.
                            </p>
                        </div>

                        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-slate-200 lg:block">
                            <div className="grid grid-cols-[1.25fr_1fr_1fr_1fr_1fr] bg-emerald-800 text-sm font-bold text-white">
                                <div className="p-5">Service Feature</div>
                                <div className="border-l border-white/10 p-5 text-center">
                                    DIY Moving
                                </div>
                                <div className="border-l border-white/10 p-5 text-center">
                                    Van Hire
                                </div>
                                <div className="border-l border-white/10 p-5 text-center">
                                    Traditional Removals
                                </div>
                                <div className="border-l border-white/10 p-5 text-center">
                                    KXH Moving
                                </div>
                            </div>
                            {comparisonRows.map((row) => (
                                <div
                                    key={row.feature}
                                    className="grid grid-cols-[1.25fr_1fr_1fr_1fr_1fr] border-t border-slate-200 text-sm"
                                >
                                    <div className="bg-slate-100 p-5 font-semibold text-slate-900">
                                        {row.feature}
                                    </div>
                                    <div className="border-l border-slate-200 p-5 leading-6 text-slate-600">
                                        {row.diy}
                                    </div>
                                    <div className="border-l border-slate-200 p-5 leading-6 text-slate-600">
                                        {row.vanHire}
                                    </div>
                                    <div className="border-l border-slate-200 p-5 leading-6 text-slate-600">
                                        {row.traditional}
                                    </div>
                                    <div className="border-l border-slate-200 bg-emerald-50 p-5 font-medium leading-6 text-emerald-900">
                                        {row.kxh}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 space-y-4 lg:hidden">
                            {comparisonRows.map((row) => (
                                <article
                                    key={row.feature}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                                >
                                    <h3 className="bg-slate-100 p-4 font-bold text-slate-950">
                                        {row.feature}
                                    </h3>
                                    <dl className="divide-y divide-slate-200 text-sm">
                                        <div className="grid grid-cols-[8rem_1fr] gap-3 p-4">
                                            <dt className="font-semibold">DIY Moving</dt>
                                            <dd className="text-slate-600">{row.diy}</dd>
                                        </div>
                                        <div className="grid grid-cols-[8rem_1fr] gap-3 p-4">
                                            <dt className="font-semibold">Van Hire</dt>
                                            <dd className="text-slate-600">{row.vanHire}</dd>
                                        </div>
                                        <div className="grid grid-cols-[8rem_1fr] gap-3 p-4">
                                            <dt className="font-semibold">Traditional</dt>
                                            <dd className="text-slate-600">{row.traditional}</dd>
                                        </div>
                                        <div className="grid grid-cols-[8rem_1fr] gap-3 bg-emerald-50 p-4">
                                            <dt className="font-semibold text-emerald-900">KXH</dt>
                                            <dd className="text-emerald-900">{row.kxh}</dd>
                                        </div>
                                    </dl>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="moving-storage"
                    className="bg-slate-50 py-14 sm:py-20"
                >
                    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Moving and Storage
                            </p>
                            <h2
                                id="moving-storage"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Move Now and Deliver When the Destination Is Ready
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                KXH can collect belongings, move them into secure managed
                                storage, hold them for the agreed period and arrange redelivery
                                to the final address.
                            </p>
                            <ol className="mt-7 space-y-3 text-sm leading-6 text-slate-700 sm:text-base">
                                <li>
                                    <strong>1.</strong> We collect the belongings.
                                </li>
                                <li>
                                    <strong>2.</strong> Items move into managed storage when
                                    required.
                                </li>
                                <li>
                                    <strong>3.</strong> They remain stored for the agreed period.
                                </li>
                                <li>
                                    <strong>4.</strong> We arrange delivery to the final address.
                                </li>
                            </ol>
                            <p className="mt-6 leading-7 text-slate-600">
                                Explore{" "}
                                <Link
                                    href="/warehouse-storage-london"
                                    className="font-semibold text-emerald-700 hover:underline"
                                >
                                    secure warehouse storage in London
                                </Link>
                                ,{" "}
                                <Link
                                    href="/student-storage-london"
                                    className="font-semibold text-emerald-700 hover:underline"
                                >
                                    student storage with collection and delivery
                                </Link>
                                , or{" "}
                                <Link
                                    href="/business-storage-london"
                                    className="font-semibold text-emerald-700 hover:underline"
                                >
                                    managed business storage in London
                                </Link>
                                .
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {movingStorageScenarios.map((scenario) => (
                                <div
                                    key={scenario}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium leading-6 text-slate-700"
                                >
                                    <span className="mr-2 text-emerald-700" aria-hidden="true">
                                        ✓
                                    </span>
                                    {scenario}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="customer-fit"
                    className="border-y border-slate-200 bg-white py-14 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Who the Service Is For
                            </p>
                            <h2
                                id="customer-fit"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Ideal If You Need Flexible Moving Support
                            </h2>
                        </div>
                        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200">
                            <Image
                                src="/images/moving-services/moving-services-student-move.webp"
                                alt="Students and renters preparing belongings for a London move"
                                width={1400}
                                height={700}
                                quality={75}
                                sizes="(max-width: 768px) 100vw, 960px"
                                className="h-auto w-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div className="mt-10 grid gap-4 md:grid-cols-2">
                            {customerFitItems.map((item) => (
                                <article
                                    key={item.title}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                                >
                                    <h3 className="font-bold text-slate-950">
                                        <span className="mr-2 text-emerald-700" aria-hidden="true">
                                            ✓
                                        </span>
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {item.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                <section
                    aria-labelledby="moving-checklist"
                    className="bg-slate-50 py-14 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Moving Day Preparation
                            </p>

                            <h2
                                id="moving-checklist"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Before Moving Day Checklist
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                A little preparation helps your moving day run more
                                smoothly. The checklist below covers some of the most
                                common tasks before collection.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-4 md:grid-cols-2">

                            {movingChecklist.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-slate-200 bg-white p-5"
                                >
                                    <span className="mr-2 text-emerald-700" aria-hidden="true">✓</span>
                                    {item}
                                </div>
                            ))}

                        </div>

                        <p className="mx-auto mt-8 max-w-3xl text-center leading-7 text-slate-600">
                            Need temporary storage before your new property is ready? Learn more
                            about our{" "}
                            <Link
                                href="/warehouse-storage-london"
                                className="font-semibold text-emerald-700 hover:underline"
                            >
                                Warehouse Storage London
                            </Link>
                            {" "}service.
                        </p>
                    </div>
                </section>
                <section
                    aria-labelledby="london-coverage"
                    className="bg-slate-50 py-14 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                London Coverage
                            </p>
                            <h2
                                id="london-coverage"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Moving Services Across London Boroughs
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Our London moving company supports house removals, apartment
                                relocations, office moves, commercial removals and furniture
                                transport across multiple boroughs. Every move is planned around
                                parking restrictions, congestion, loading bays, building access,
                                lift bookings and local property requirements.
                            </p>
                        </div>
                        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {coverageAreas.map((area) => (
                                <Link
                                    key={area.href}
                                    href={area.href}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm"
                                >
                                    <h3 className="font-semibold text-slate-900">
                                        Moving Services in {area.name}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        Local house, apartment, office, furniture and commercial
                                        moving support.
                                    </p>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8">

                            <h3 className="text-xl font-bold text-slate-950">
                                Common London Moving Routes
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Many moves take place between neighbouring London boroughs.
                                The routes below are examples of areas where customers often
                                request moving support.
                            </p>

                            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                                {commonRoutes.map(([from, to]) => (
                                    <div
                                        key={`${from}-${to}`}
                                        className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                                    >
                                        <span className="font-semibold">
                                            {from}
                                        </span>

                                        <span className="mx-2 text-emerald-700">
                                            →
                                        </span>

                                        <span className="font-semibold">
                                            {to}
                                        </span>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="related-services"
                    className="border-y border-slate-200 bg-white py-14 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Related Services
                            </p>
                            <h2
                                id="related-services"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Storage and Logistics Support Around Your Move
                            </h2>
                        </div>
                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {relatedServices.map((service) => (
                                <Link
                                    key={service.href}
                                    href={service.href}
                                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm"
                                >
                                    <h3 className="text-lg font-bold text-slate-950">
                                        {service.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {service.description}
                                    </p>
                                    <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                                        Explore this service →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="moving-team"
                    className="bg-slate-50 py-14 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Professional Moving Team
                            </p>
                            <h2
                                id="moving-team"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Careful Handling From Collection to Delivery
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                The team coordinates packing, furniture protection, loading,
                                transport, unloading and optional storage around the agreed
                                moving plan.
                            </p>
                        </div>
                        <div className="mt-10 grid gap-6 lg:grid-cols-2">
                            <Image
                                src="/images/moving-services/moving-services-team-working.webp"
                                alt="Professional KXH movers handling furniture during a London move"
                                width={1400}
                                height={700}
                                quality={75}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="h-full w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                                loading="lazy"
                                decoding="async"
                            />
                            <Image
                                src="/images/moving-services/moving-services-team.webp"
                                alt="KXH Storage and Logistics moving crew in London"
                                width={1400}
                                height={700}
                                quality={75}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="h-full w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                </section>

                <TestimonialsSection />

                <section className="border-t border-emerald-800 bg-emerald-800 py-14 text-center text-white sm:py-20">
                    <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
                        <p className="text-sm font-semibold uppercase tracking-wide !text-white">
                            Plan Your London Move
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
                            Plan Your Move With a Trusted London Moving Company
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-200">
                            Request a tailored quotation for house removals, office relocation,
                            commercial moving, furniture transport, packing services and
                            optional warehouse storage from one experienced London removal
                            company.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link
                                href="/get-a-quote?service=moving"
                                className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 sm:w-auto sm:px-8"
                            >
                                Get a Moving Quote
                            </Link>
                            <a
                                href="tel:+447470025636"
                                className="w-full rounded-xl border border-white/20 px-6 py-4 text-center font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:px-8"
                            >
                                Call KXH
                            </a>
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="moving-faqs"
                    className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16"
                >
                    <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                        <h2
                            id="moving-faqs"
                            className="mb-8 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                        >
                            Moving Services London FAQs
                        </h2>
                        <div className="space-y-3">
                            {faqs.map((faq) => (
                                <details
                                    key={faq.question}
                                    className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
                                >
                                    <summary className="cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
                                        {faq.question}
                                    </summary>
                                    <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>


                <MainFooter locations={londonLocations} />
            </main>
        </>
    );
}