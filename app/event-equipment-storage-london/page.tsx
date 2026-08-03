import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustpilotJsonLd from "../components/seo/TrustPilotJsonLD";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import { londonLocations } from "../sitemap";

const pageUrl = "https://kxhlogistics.co.uk/event-equipment-storage-london";
const quoteUrl = "/get-a-quote?service=storage";
const parentPageUrl = "https://kxhlogistics.co.uk/business-storage-london";

export const metadata: Metadata = {
    title: "Event Equipment Storage London | Collection & Delivery | KXH",
    description:
        "Managed event equipment storage in London with collection, organised warehouse storage, inventory support, event delivery and return logistics.",
    applicationName: "KXH Storage & Logistics",
    category: "Event equipment storage",
    creator: "KXH Storage & Logistics",
    publisher: "KXH Storage & Logistics",
    alternates: { canonical: pageUrl },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        type: "website",
        url: pageUrl,
        title: "Event Equipment Storage London | Collection & Delivery | KXH",
        description:
            "Managed storage and logistics for event equipment, exhibition stands, displays, furniture and promotional materials across London.",
        images: [
            {
                url: "/images/event-equipment-storage/event-equipment-storage-london.webp",
                width: 1200,
                height: 630,
                alt: "Event equipment and exhibition materials organised inside a London warehouse",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Event Equipment Storage London | Collection & Delivery | KXH",
        description:
            "Managed event equipment storage with collection, inventory organisation, event delivery and return logistics.",
        images: [
            "/images/event-equipment-storage/event-equipment-storage-london.webp",
        ],
    },
};

type CardItem = {
    title: string;
    description: string;
};

type LinkCardItem = CardItem & {
    href: string;
};

const coreBenefits = [
    "Event equipment collection",
    "Organised warehouse storage",
    "Inventory organisation",
    "Event delivery & return",
];

const differentiationItems: CardItem[] = [
    {
        title: "Not Self Storage",
        description:
            "Your team does not need to hire vans, move bulky equipment into a unit, visit the site or search for event items.",
    },
    {
        title: "Not Warehouse Rental",
        description:
            "KXH provides a managed storage workflow rather than handing your business empty space to operate.",
    },
    {
        title: "Not Event Production",
        description:
            "The service focuses on physical storage and logistics, not event design, technical production or onsite event management.",
    },
    {
        title: "Managed Event Logistics",
        description:
            "Collection, organisation, warehouse storage, retrieval, event delivery and return collection can work as one service.",
    },
];

const customerProblems: CardItem[] = [
    {
        title: "Equipment Between Events",
        description:
            "Store reusable stands, displays, furniture, signage and promotional materials between bookings and campaigns.",
    },
    {
        title: "The Office Is Full of Event Gear",
        description:
            "Free offices, studios, corridors and back rooms currently occupied by cases, banners, counters and event stock.",
    },
    {
        title: "Exhibition Components Are Disorganised",
        description:
            "Replace mixed crates and unclear labels with agreed project, client, stand and component references.",
    },
    {
        title: "Multiple Events Need Different Kits",
        description:
            "Separate equipment by event, campaign, venue, brand, client or destination to support repeated use.",
    },
    {
        title: "Seasonal Campaign Materials Need Storage",
        description:
            "Keep branded displays, décor, stock and promotional materials available without occupying active workspace.",
    },
    {
        title: "Event Dates Keep Changing",
        description:
            "Hold equipment while venues, contractors, installation windows and delivery schedules are confirmed.",
    },
    {
        title: "Partial Retrieval Is Required",
        description:
            "Request selected stands, cases, counters or promotional items without returning the full stored inventory.",
    },
    {
        title: "Return Logistics Are Creating Work",
        description:
            "Avoid asking staff to arrange repeated collections from venues and move equipment back into office storage.",
    },
];

const processSteps: CardItem[] = [
    {
        title: "Request a Quote",
        description:
            "Tell us what needs storing, the approximate volume, collection address, event schedule and delivery requirements.",
    },
    {
        title: "Equipment Review",
        description:
            "KXH reviews dimensions, packaging, access, handling, item condition and any specialist-storage requirements.",
    },
    {
        title: "Collect & Register",
        description:
            "Equipment is collected and organised using agreed labels, cases, projects, clients, events or supplied manifests.",
    },
    {
        title: "Store, Deliver & Return",
        description:
            "Items remain in managed storage and can be retrieved, delivered to an event and returned after use.",
    },
];

const lifecycleSteps: CardItem[] = [
    {
        title: "Equipment Returns from an Event",
        description:
            "Stands, cases, displays, furniture and promotional items return from a venue or campaign.",
    },
    {
        title: "Items Are Checked In",
        description:
            "Returned items are matched to agreed references, cases, projects or manifests.",
    },
    {
        title: "Storage Locations Are Assigned",
        description:
            "Equipment is placed into organised warehouse storage according to the agreed grouping.",
    },
    {
        title: "The Next Event Is Confirmed",
        description:
            "Your team identifies the required kit, destination, delivery date and access window.",
    },
    {
        title: "Equipment Is Retrieved",
        description:
            "Selected cases, stand components, furniture or promotional materials are prepared for dispatch.",
    },
    {
        title: "Delivery Is Coordinated",
        description:
            "Items are delivered to the agreed venue, contractor, loading bay or receiving location.",
    },
    {
        title: "Return Collection Is Planned",
        description:
            "After the event, reusable equipment can be collected and returned to storage.",
    },
];

const pricingFactors: CardItem[] = [
    {
        title: "Equipment Volume",
        description:
            "The number, size, weight, stackability and condition of cases, stands, displays, furniture and materials.",
    },
    {
        title: "Collection & Access",
        description:
            "Collection postcode, floor level, loading restrictions, parking, stairs, lifts and handling distance.",
    },
    {
        title: "Handling Requirements",
        description:
            "Whether items are fragile, oversized, loose, palletised, cased, dismantled or require additional labour.",
    },
    {
        title: "Storage Duration",
        description:
            "Short-term, seasonal, rolling or longer-term storage and the likely frequency of inventory changes.",
    },
    {
        title: "Inventory Organisation",
        description:
            "The level of case referencing, component grouping, project organisation, photography or manifest checking required.",
    },
    {
        title: "Event Delivery Schedule",
        description:
            "Delivery dates, venue access windows, destinations, partial loads, return collection and repeated event movements.",
    },
];

const equipmentReviewItems = [
    "Confirm dimensions and approximate weights",
    "Identify fragile or high-value items",
    "Check cases, crates and packaging condition",
    "Separate specialist technical equipment",
    "Provide project, event or client references",
    "Explain likely delivery frequency",
    "Confirm venue and loading restrictions",
    "Nominate authorised project contacts",
];

const storedItems = [
    "Exhibition stands",
    "Modular stand components",
    "Pop-up displays",
    "Branded backdrops",
    "Display counters",
    "Event furniture",
    "Reception desks",
    "POS displays",
    "Printed graphics",
    "Promotional materials",
    "Branded merchandise",
    "Flight cases",
    "Event crates",
    "Signage",
    "Exhibition flooring",
    "Lighting cases",
    "Cable boxes",
    "Décor and props",
    "Marketing collateral",
    "Roadshow equipment",
];

const industries: CardItem[] = [
    {
        title: "Event Agencies",
        description:
            "Reusable event kits, displays, branded materials, furniture, cases and campaign equipment.",
    },
    {
        title: "Exhibition Companies",
        description:
            "Stand components, graphics, counters, flooring, crates and reusable exhibition equipment.",
    },
    {
        title: "Marketing Agencies",
        description:
            "Brand activation kits, promotional materials, displays, merchandise and campaign assets.",
    },
    {
        title: "Conference Organisers",
        description:
            "Signage, registration furniture, branded backdrops, display materials and event-support equipment.",
    },
    {
        title: "AV & Production Suppliers",
        description:
            "Suitable cased equipment, cable boxes, stands and non-specialist support items subject to review.",
    },
    {
        title: "Venue Suppliers",
        description:
            "Furniture, counters, décor, signage and reusable event items moving between venues.",
    },
    {
        title: "Festival Organisers",
        description:
            "Approved signage, branded materials, décor, cases and equipment used across seasonal programmes.",
    },
    {
        title: "Retail & Brand Teams",
        description:
            "Promotional displays, pop-up equipment, POS materials and branded activation stock.",
    },
    {
        title: "Corporate Events Teams",
        description:
            "Conference displays, banners, furniture, registration materials and reusable event kits.",
    },
    {
        title: "Universities",
        description:
            "Open-day displays, graduation materials, event furniture, signage and outreach equipment.",
    },
    {
        title: "Charities",
        description:
            "Campaign stands, fundraising materials, event furniture, signage and outreach equipment.",
    },
    {
        title: "Hospitality Groups",
        description:
            "Event furniture, décor, promotional displays and materials used across venues and seasonal campaigns.",
    },
];

const useCases: CardItem[] = [
    {
        title: "Exhibition Season",
        description:
            "Store stand components, cases, graphics and counters between trade shows and exhibitions.",
    },
    {
        title: "Product Launches",
        description:
            "Hold branded displays, demo counters, furniture and promotional materials before launch dates.",
    },
    {
        title: "Brand Activations",
        description:
            "Organise campaign kits by brand, city, venue or activation format for repeated deployment.",
    },
    {
        title: "Corporate Conferences",
        description:
            "Store registration equipment, signage, backdrops, displays and event furniture between conferences.",
    },
    {
        title: "Roadshows",
        description:
            "Support repeated movement of event kits between London venues and wider campaign locations.",
    },
    {
        title: "Seasonal Campaigns",
        description:
            "Keep reusable promotional stock and display equipment offsite between campaign periods.",
    },
    {
        title: "Venue Changes",
        description:
            "Hold equipment while delivery dates, access windows or replacement venues are finalised.",
    },
    {
        title: "Event Equipment Overflow",
        description:
            "Free agency, studio, showroom and office space without losing access to reusable assets.",
    },
];

const comparisonRows = [
    {
        category: "Collection",
        selfStorage: "Your team arranges vehicles, labour and loading",
        warehouseRental: "Your business manages inbound transport",
        kxh: "KXH can coordinate collection from offices, venues and event suppliers",
    },
    {
        category: "Inventory",
        selfStorage: "Your team creates and maintains all records",
        warehouseRental: "Your business operates its own inventory process",
        kxh: "Equipment can be organised around cases, components, projects and manifests",
    },
    {
        category: "Retrieval",
        selfStorage: "Staff visit the unit and search for equipment",
        warehouseRental: "Your team or contractors retrieve the items",
        kxh: "Selected event kits and equipment groups can be requested",
    },
    {
        category: "Event Delivery",
        selfStorage: "Your team arranges transport to the venue",
        warehouseRental: "Delivery is managed separately",
        kxh: "Delivery can be coordinated to agreed venues and receiving points",
    },
    {
        category: "Return Collection",
        selfStorage: "Your team handles the return journey",
        warehouseRental: "Your business coordinates the return",
        kxh: "Reusable equipment can be collected after the event and returned to storage",
    },
    {
        category: "Organisation",
        selfStorage: "Depends on internal staff",
        warehouseRental: "Your team operates the warehouse system",
        kxh: "Equipment can be grouped by client, campaign, event, stand or destination",
    },
    {
        category: "Business Support",
        selfStorage: "Space only",
        warehouseRental: "Space with your own operation",
        kxh: "Storage can connect with moving, inventory, furniture and commercial storage",
    },
    {
        category: "Flexibility",
        selfStorage: "Flexible access but high internal workload",
        warehouseRental: "Best for businesses running their own warehouse operation",
        kxh: "Suitable for event teams needing managed storage and logistics",
    },
];

const chooseKxh: CardItem[] = [
    {
        title: "Managed Collection",
        description:
            "KXH can collect suitable event equipment from offices, venues, suppliers and agreed London addresses.",
    },
    {
        title: "Organised Warehouse Storage",
        description:
            "Items can be grouped around clients, campaigns, event dates, stands, cases or supplied manifests.",
    },
    {
        title: "Selected Retrieval",
        description:
            "Request one event kit, a set of cases or a complete exhibition package without returning everything.",
    },
    {
        title: "Venue Delivery",
        description:
            "Equipment can be delivered to agreed venues, loading bays, contractors or receiving teams.",
    },
    {
        title: "Return Logistics",
        description:
            "Reusable items can be collected after events and returned to managed warehouse storage.",
    },
    {
        title: "Wider Business Support",
        description:
            "Event storage can connect with furniture storage, inventory organisation, commercial storage and moving services.",
    },
];

const inventoryBenefits = [
    "Case and crate references",
    "Stand component grouping",
    "Client and campaign grouping",
    "Event-date organisation",
    "Selected-kit retrieval",
    "Venue-delivery coordination",
];

const existingSystems = [
    "Existing case numbers",
    "Asset registers",
    "Event manifests",
    "Excel inventories",
    "Client references",
    "Campaign codes",
    "Barcode or QR labels",
    "Stand component lists",
];

const retrievalWorkflow: CardItem[] = [
    {
        title: "Identify the Event Kit",
        description:
            "Use agreed event, client, case, stand, campaign or manifest references.",
    },
    {
        title: "Confirm Delivery Details",
        description:
            "Provide the venue, date, access window, onsite contact and required item list.",
    },
    {
        title: "KXH Retrieves the Equipment",
        description:
            "The requested cases, components, furniture and promotional items are prepared for dispatch.",
    },
    {
        title: "Deliver and Return",
        description:
            "Equipment is delivered to the venue and reusable items can be collected after the event.",
    },
];

const retrievalRequests = [
    "Exhibition stand kits",
    "Branded backdrops",
    "Display counters",
    "Event furniture",
    "Flight cases",
    "Printed graphics",
    "Promotional stock",
    "Roadshow kits",
    "Partial event loads",
    "Complete project returns",
];

const quoteChecklist = [
    "Approximate equipment volume",
    "Collection postcode and access",
    "Case, crate and pallet quantities",
    "Oversized or fragile items",
    "Existing inventory or manifest",
    "Expected storage duration",
    "Upcoming event dates",
    "Venue delivery and return requirements",
];

const customerFit = [
    "You need event equipment collected",
    "You need between-event storage",
    "You need selected kits retrieved later",
    "You deliver to multiple London venues",
    "You need equipment grouped by client or campaign",
    "You prefer managed logistics over self storage",
];

const typicalProjects: CardItem[] = [
    {
        title: "Trade Show Stand Storage",
        description:
            "Store modular stand components, graphics, cases, counters and flooring between exhibitions.",
    },
    {
        title: "Brand Activation Inventory",
        description:
            "Organise reusable campaign equipment by brand, format, city or client.",
    },
    {
        title: "Corporate Event Kit Storage",
        description:
            "Hold registration furniture, signage, displays and branded materials between conferences.",
    },
    {
        title: "Roadshow Logistics",
        description:
            "Retrieve and deliver selected kits for repeated events across multiple locations.",
    },
    {
        title: "Seasonal Event Storage",
        description:
            "Store event décor, furniture and promotional stock outside peak campaign periods.",
    },
    {
        title: "Agency Equipment Consolidation",
        description:
            "Bring event assets together from offices, suppliers, former sites and temporary project locations.",
    },
];

const relatedServices: LinkCardItem[] = [
    {
        title: "Business Storage London",
        href: "/business-storage-london",
        description:
            "The parent KXH service for event equipment, furniture, stock, archives and other managed business-storage requirements.",
    },
    {
        title: "Commercial Storage London",
        href: "/commercial-storage-london",
        description:
            "Flexible managed storage for commercial equipment, materials, furniture and operational items.",
    },
    {
        title: "Warehouse Storage London",
        href: "/warehouse-storage-london",
        description:
            "Managed warehouse capacity for event equipment, cases, displays, stock and broader business requirements.",
    },
    {
        title: "Inventory Management London",
        href: "/inventory-management-london",
        description:
            "Physical inventory organisation, item references, categorisation and selected-item return support.",
    },
    {
        title: "Furniture Storage London",
        href: "/furniture-storage-london",
        description:
            "Collection, warehouse storage and return delivery for event, office and commercial furniture.",
    },
    {
        title: "Moving & Storage London",
        href: "/logistics-moving-london",
        description:
            "Combined collection, moving, temporary storage and return delivery for London businesses.",
    },
    {
        title: "Packing Services London",
        href: "/packing-services-london",
        description:
            "Professional packing and labelling support for moves, storage and event-equipment projects.",
    },
    {
        title: "Archive Storage London",
        href: "/archive-storage-london",
        description:
            "Managed collection, organisation, storage and retrieval for physical business archives.",
    },
];

const londonAreas = [
    { name: "Tower Hamlets", href: "/business-storage-london/tower-hamlets" },
    { name: "Camden", href: "/business-storage-london/camden" },
    { name: "Hackney", href: "/business-storage-london/hackney" },
    { name: "Lambeth", href: "/business-storage-london/lambeth" },
    { name: "Southwark", href: "/business-storage-london/southwark" },
    { name: "Westminster", href: "/business-storage-london/westminster" },
];

const faqs = [
    {
        question: "What event equipment can KXH store?",
        answer:
            "KXH can discuss storage for exhibition stands, displays, event furniture, signage, graphics, promotional materials, flight cases, crates, roadshow kits and other suitable event assets.",
    },
    {
        question: "Do you collect event equipment?",
        answer:
            "Yes. Collection can be discussed from offices, venues, suppliers, event sites and other agreed London addresses.",
    },
    {
        question: "Can you store exhibition stands?",
        answer:
            "Yes. Modular stand components, counters, graphics, flooring, crates and related equipment may be suitable, subject to dimensions, packaging and handling requirements.",
    },
    {
        question: "Can equipment be delivered directly to an event venue?",
        answer:
            "Yes. Delivery can be coordinated to an agreed venue, loading bay, contractor or receiving contact, subject to access details and scheduling.",
    },
    {
        question: "Can you collect equipment after an event?",
        answer:
            "Return collection can be discussed as part of the service so reusable equipment can be brought back into storage after the event.",
    },
    {
        question: "Can I retrieve only part of the stored equipment?",
        answer:
            "Yes, where suitable references have been agreed. You may request selected cases, stand components, furniture, promotional items or one complete event kit.",
    },
    {
        question: "How is event equipment organised?",
        answer:
            "Equipment may be organised using case numbers, client names, campaigns, event dates, stand references, asset numbers or supplied manifests.",
    },
    {
        question: "Can you store event furniture?",
        answer:
            "Yes. KXH can discuss storage for suitable tables, chairs, counters, reception furniture, display units and other event furniture.",
    },
    {
        question: "Do you store AV equipment?",
        answer:
            "Suitable cased AV equipment may be considered, but specialist, highly sensitive, temperature-controlled or technically regulated items require separate review.",
    },
    {
        question: "Can you store promotional materials and merchandise?",
        answer:
            "Yes. Branded merchandise, printed materials, campaign stock, POS items and promotional equipment may be suitable.",
    },
    {
        question: "Can equipment be grouped by client or campaign?",
        answer:
            "Yes. Items can be organised around clients, campaigns, projects, event formats or destinations where agreed.",
    },
    {
        question: "Can you support multiple events?",
        answer:
            "Yes. Multi-event workflows can be discussed where selected equipment is repeatedly retrieved, delivered and returned to storage.",
    },
    {
        question: "How much does event equipment storage cost?",
        answer:
            "Pricing depends on equipment volume, collection, handling, storage duration, inventory organisation, delivery frequency and return logistics.",
    },
    {
        question: "Can additional equipment be added later?",
        answer:
            "Ongoing additions may be possible where they fit the agreed storage and inventory process.",
    },
    {
        question: "Can you store oversized display equipment?",
        answer:
            "Oversized items may be suitable, subject to dimensions, weight, packaging, access and available warehouse capacity.",
    },
    {
        question: "What information is needed for a quote?",
        answer:
            "Useful details include approximate volume, photographs, case and pallet counts, collection access, event dates, venue details and expected return requirements.",
    },
    {
        question: "Can you work with our existing event inventory?",
        answer:
            "Yes. Existing case numbers, asset registers, spreadsheets, barcodes and manifests can be discussed as the basis for physical organisation.",
    },
    {
        question: "What equipment may not be suitable?",
        answer:
            "Hazardous, contaminated, wet, unstable, prohibited, temperature-sensitive or specialist regulated equipment may not be suitable.",
    },
    {
        question: "Can equipment remain stored between event seasons?",
        answer:
            "Yes. Temporary, seasonal, rolling and longer-term storage arrangements can be discussed.",
    },
    {
        question: "Is this a self-storage service?",
        answer:
            "No. KXH provides managed collection, warehouse storage, inventory organisation, retrieval and event delivery rather than a customer-operated storage unit.",
    },
];

function ServiceJsonLd() {
    const serviceItems = [
        "Event equipment collection",
        "Exhibition stand storage",
        "Event furniture storage",
        "Promotional material storage",
        "Inventory organisation",
        "Event delivery and return logistics",
    ];

    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Event Equipment Storage London",
        serviceType: "Managed Event Equipment Storage and Logistics",
        isRelatedTo: {
            "@type": "Service",
            "@id": `${parentPageUrl}#service`,
            name: "Business Storage London",
            url: parentPageUrl,
        },
        url: pageUrl,
        description:
            "Managed event equipment storage in London with collection, inventory organisation, warehouse storage, event delivery and return logistics.",
        provider: {
            "@type": "LocalBusiness",
            "@id": "https://kxhlogistics.co.uk/#business",
            name: "KXH Storage & Logistics",
            url: "https://kxhlogistics.co.uk",
            telephone: "+447386277785",
        },
        areaServed: { "@type": "City", name: "London" },
        audience: {
            "@type": "BusinessAudience",
            audienceType:
                "Event agencies, exhibition companies and London businesses",
        },
        offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            url: `https://kxhlogistics.co.uk${quoteUrl}`,
            itemOffered: { "@id": `${pageUrl}#service` },
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Managed Event Equipment Storage Services",
            itemListElement: serviceItems.map((name) => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name,
                },
            })),
        },
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
        "@id": `${pageUrl}#faq`,
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
        "@id": `${pageUrl}#breadcrumb`,
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
                name: "Business Storage London",
                item: parentPageUrl,
            },
            {
                "@type": "ListItem",
                position: 4,
                name: "Event Equipment Storage London",
                item: pageUrl,
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

function WebPageJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Event Equipment Storage London",
        description:
            "Managed event equipment storage in London with collection, organised warehouse storage, retrieval and event delivery.",
        isPartOf: [
            {
                "@type": "WebSite",
                "@id": "https://kxhlogistics.co.uk/#website",
                url: "https://kxhlogistics.co.uk",
                name: "KXH Storage & Logistics",
            },
            {
                "@type": "WebPage",
                "@id": `${parentPageUrl}#webpage`,
                url: parentPageUrl,
                name: "Business Storage London",
            },
        ],
        mainEntity: { "@id": `${pageUrl}#service` },
        about: { "@id": `${pageUrl}#service` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        primaryImageOfPage: {
            "@type": "ImageObject",
            url: "https://kxhlogistics.co.uk/images/event-equipment-storage/event-equipment-storage-london.webp",
            width: 1200,
            height: 800,
        },
        inLanguage: "en-GB",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

type SectionHeadingProps = {
    eyebrow?: string;
    title: ReactNode;
    description?: ReactNode;
    maxWidth?: "2xl" | "3xl";
};

function SectionHeading({
    eyebrow,
    title,
    description,
    maxWidth = "2xl",
}: SectionHeadingProps) {
    const widthClass = maxWidth === "3xl" ? "max-w-3xl" : "max-w-2xl";

    return (
        <div className={`mx-auto ${widthClass} text-center`}>
            {eyebrow && (
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                    {eyebrow}
                </p>
            )}
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {title}
            </h2>
            {description && (
                <p className="mt-4 leading-7 text-slate-600">{description}</p>
            )}
        </div>
    );
}

function SimpleCardGrid({
    items,
    columns = "lg:grid-cols-4",
    background = "bg-slate-50",
}: {
    items: CardItem[];
    columns?: string;
    background?: string;
}) {
    return (
        <div className={`mt-10 grid gap-6 md:grid-cols-2 ${columns}`}>
            {items.map((item) => (
                <article
                    key={item.title}
                    className={`rounded-2xl border border-slate-200 ${background} p-6`}
                >
                    <h3 className="text-lg font-bold text-slate-950">
                        {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        {item.description}
                    </p>
                </article>
            ))}
        </div>
    );
}

function ChecklistGrid({
    items,
    columns = "lg:grid-cols-4",
    tone = "white",
}: {
    items: string[];
    columns?: string;
    tone?: "white" | "emerald";
}) {
    const className =
        tone === "emerald"
            ? "border-emerald-100 bg-emerald-50 text-emerald-800"
            : "border-slate-200 bg-white text-slate-800";

    return (
        <div className={`mt-10 grid gap-4 sm:grid-cols-2 ${columns}`}>
            {items.map((item) => (
                <div
                    key={item}
                    className={`rounded-2xl border p-5 text-sm font-medium leading-6 ${className}`}
                >
                    <span aria-hidden="true">✓</span> {item}
                </div>
            ))}
        </div>
    );
}

const pageSections = [
    { href: "#how-it-works", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#equipment", label: "Equipment stored" },
    { href: "#delivery", label: "Event delivery" },
    { href: "#coverage", label: "London coverage" },
    { href: "#faqs", label: "FAQs" },
];

function PageBreadcrumb() {
    return (
        <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-6xl overflow-x-auto px-5 pt-4 text-xs text-slate-500 sm:px-6 sm:pt-6 sm:text-sm lg:px-8"
        >
            <Link href="/" className="transition hover:text-emerald-700">
                Home
            </Link>
            <span aria-hidden="true" className="mx-2">
                /
            </span>
            <Link href="/services" className="transition hover:text-emerald-700">
                Services
            </Link>
            <span aria-hidden="true" className="mx-2">
                /
            </span>
            <Link
                href="/business-storage-london"
                className="transition hover:text-emerald-700"
            >
                Business Storage
            </Link>
            <span aria-hidden="true" className="mx-2">
                /
            </span>
            <span aria-current="page" className="font-medium text-slate-700">
                Event Equipment Storage London
            </span>
        </nav>
    );
}

function PageSectionNav() {
    return (
        <nav
            aria-label="Event equipment storage page sections"
            className="border-b border-slate-200 bg-white"
        >
            <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-4 sm:px-6 lg:px-8">
                {pageSections.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}

function HeroSection() {
    return (
        <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                    <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full bg-emerald-500"
                    />
                    Managed Event Equipment Storage for London Businesses
                </div>

                <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                    Event Equipment Storage London
                </h1>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                    Managed storage for exhibition stands, event furniture,
                    promotional materials, displays, flight cases and reusable
                    event equipment.
                </p>

                <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                    KXH can collect event assets, organise them in a managed
                    warehouse workflow, retrieve selected kits and coordinate
                    event delivery and return logistics.
                </p>

                <div className="mx-auto mt-7 grid max-w-4xl grid-cols-1 gap-3 min-[430px]:grid-cols-2 lg:grid-cols-4">
                    {coreBenefits.map((benefit) => (
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
                        href={quoteUrl}
                        className="w-full rounded-xl bg-emerald-700 px-6 py-4 text-center font-semibold text-white shadow-lg transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 sm:w-auto"
                    >
                        Get Event Equipment Storage Quote
                    </Link>
                    <a
                        href="tel:+447386277785"
                        className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2 sm:w-auto"
                    >
                        Call KXH
                    </a>
                </div>

                <p className="mt-4 text-sm text-slate-500">
                    Not sure of the exact volume? Photographs and an estimate are
                    enough to begin.
                </p>

                <div className="mt-6 flex justify-center">
                    <TrustpilotPill />
                </div>

                <div className="mt-12">
                    <Image
                        src="/images/business-storage/business-storage-london-warehouse-inventory.webp"
                        alt="Event equipment and exhibition materials organised inside a London warehouse"
                        width={1200}
                        height={800}
                        priority
                        quality={80}
                        sizes="(max-width: 768px) 100vw, 960px"
                        className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                    />
                </div>
            </div>
        </section>
    );
}

function DifferentiationSection() {
    return (
        <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Managed Event Equipment Storage"
                    title="More Than Empty Warehouse Space"
                    description="KXH provides a managed physical storage and logistics workflow rather than asking your team to operate a self-storage unit or rented warehouse area."
                    maxWidth="3xl"
                />
                <SimpleCardGrid items={differentiationItems} />
            </div>
        </section>
    );
}

function GuidanceSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Planning an Event Storage Project
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Good Storage Starts with the Next Event Plan
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Event equipment is easier to retrieve when cases, stand
                        components, furniture and promotional materials are
                        organised around how they will be used next.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Before collection, decide how equipment should be grouped,
                        who can request delivery, which items travel together and
                        what should return to storage after each event.
                    </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                        Confirm these points before collection
                    </h3>
                    <ul className="mt-6 space-y-3 text-slate-700">
                        <li>
                            <span aria-hidden="true">✓</span> Which items belong
                            to each event or campaign?
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Are cases and crates
                            clearly labelled?
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Are any items
                            fragile, oversized or specialist?
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Which venues need
                            delivery?
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Is return collection
                            required?
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Who may authorise
                            retrieval?
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

function ProblemsSection() {
    return (
        <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Problems We Solve"
                    title={
                        <>
                            Your Office Should Not Become an{" "}
                            <span className="text-emerald-700">
                                Event Equipment Warehouse
                            </span>
                        </>
                    }
                    description="Free working space, organise reusable assets and support repeated events without asking staff to manage a storage unit."
                    maxWidth="3xl"
                />
                <SimpleCardGrid items={customerProblems} />
            </div>
        </section>
    );
}

function ProcessSection() {
    return (
        <section
            id="how-it-works"
            className="scroll-mt-24 border-b border-slate-200 bg-white py-14 sm:py-20"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="How It Works"
                    title="Four Steps from Collection to Event Delivery"
                    description="A managed process covering equipment review, collection, inventory organisation, warehouse storage, retrieval and return logistics."
                />
                <SimpleCardGrid items={processSteps} background="bg-slate-50" />
            </div>
        </section>
    );
}

function LifecycleSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Event Equipment Lifecycle"
                    title="Manage Reusable Assets Between Events"
                    description="KXH supports the physical stages between event use: return, check-in, storage, retrieval, venue delivery and return collection."
                    maxWidth="3xl"
                />
                <SimpleCardGrid
                    items={lifecycleSteps}
                    columns="lg:grid-cols-4"
                    background="bg-white"
                />
            </div>
        </section>
    );
}

function PricingSection() {
    return (
        <section
            id="pricing"
            className="scroll-mt-24 border-y border-slate-200 bg-white py-14 sm:py-20"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Flexible Event Equipment Storage Pricing"
                    title="A Quote Based on Equipment and Event Logistics"
                    description="Pricing reflects equipment volume, collection, handling, inventory organisation, storage duration, venue delivery and return requirements."
                    maxWidth="3xl"
                />

                <SimpleCardGrid
                    items={pricingFactors}
                    columns="lg:grid-cols-3"
                    background="bg-slate-50"
                />

                <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-slate-950">
                        Why event storage projects are priced differently
                    </h3>
                    <p className="mt-4 leading-7 text-slate-700">
                        A small set of cased displays stored between two annual
                        exhibitions requires a different workflow from a rolling
                        roadshow with frequent retrievals, multiple venues and return
                        collections.
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                        Photographs, case counts, pallet quantities and upcoming event
                        dates can help KXH prepare an initial scope.
                    </p>
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href={quoteUrl}
                        className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Calculate Your Event Storage Quote
                    </Link>
                </div>
            </div>
        </section>
    );
}

function ManagedStorageSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <Image
                    src="/images/business-storage/business-storage-pickup-delivery-london.webp"
                    alt="Exhibition stands, flight cases and event displays organised in a London warehouse"
                    width={1200}
                    height={800}
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                    loading="lazy"
                    decoding="async"
                />

                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Managed Event Storage
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Store Event Assets Around How They Are Used
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Event equipment can be organised around clients, campaigns,
                        event dates, venues, stand formats, cases or supplied
                        manifests.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Where the main requirement is detailed physical stock control,
                        explore{" "}
                        <Link
                            href="/inventory-management-london"
                            className="font-semibold text-emerald-700 hover:underline"
                        >
                            Inventory Management London
                        </Link>
                        .
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Businesses needing wider capacity can also use{" "}
                        <Link
                            href="/business-storage-london"
                            className="font-semibold text-emerald-700 hover:underline"
                        >
                            Business Storage London
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/warehouse-storage-london"
                            className="font-semibold text-emerald-700 hover:underline"
                        >
                            Warehouse Storage London
                        </Link>
                        .
                    </p>
                    <ul className="mt-7 space-y-3 text-slate-700">
                        <li>
                            <span aria-hidden="true">✓</span> Case and component
                            references
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Client and campaign
                            grouping
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Selected-kit
                            retrieval
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Venue-delivery
                            coordination
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Return collection
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

function EquipmentReviewSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Before We Collect"
                    title="What KXH Reviews Before Event Equipment Moves Offsite"
                    description="A practical pre-collection review helps confirm dimensions, packaging, access, grouping, delivery frequency and any specialist requirements."
                    maxWidth="3xl"
                />
                <ChecklistGrid items={equipmentReviewItems} />
            </div>
        </section>
    );
}

function StoredItemsSection() {
    return (
        <section
            id="equipment"
            className="scroll-mt-24 bg-slate-50 py-14 sm:py-20"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="What Can Be Stored"
                    title="Storage for Exhibition, Event and Promotional Equipment"
                    description="KXH can discuss a broad range of suitable event assets, subject to dimensions, condition, packaging, handling requirements and available warehouse capacity."
                    maxWidth="3xl"
                />
                <ChecklistGrid items={storedItems} columns="lg:grid-cols-5" />
                <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-500">
                    All items are subject to review. Acceptance depends on
                    condition, packaging, dimensions, weight, stability and whether
                    specialist environmental or regulated storage is required.
                </p>
            </div>
        </section>
    );
}

function IndustriesSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Who We Support"
                    title="Event Equipment Storage Across Agencies, Exhibitors and Brand Teams"
                    description="Different event organisations use different equipment, delivery schedules, venues and inventory systems."
                    maxWidth="3xl"
                />
                <SimpleCardGrid items={industries} columns="lg:grid-cols-3" />
            </div>
        </section>
    );
}

function UseCasesSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <Image
                    src="/images/business-storage/inventory-management-business-storage-london.webp"
                    alt="Event equipment loaded for delivery to a London exhibition venue"
                    width={1200}
                    height={800}
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 960px"
                    className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                    loading="lazy"
                    decoding="async"
                />

                <div className="mt-12">
                    <SectionHeading
                        eyebrow="Event Storage Use Cases"
                        title="Support Exhibitions, Activations, Roadshows and Seasonal Campaigns"
                        description="Managed event equipment storage can solve an immediate space problem or support a repeated delivery and return workflow."
                        maxWidth="3xl"
                    />
                </div>

                <SimpleCardGrid
                    items={useCases}
                    columns="lg:grid-cols-4"
                    background="bg-white"
                />
            </div>
        </section>
    );
}

function TypicalProjectsSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Typical Event Storage Projects"
                    title="Storage Designed for Reusable Event Assets"
                    description="These examples show the kinds of event workflows the service is designed to support. They are service scenarios, not claims about specific completed projects."
                    maxWidth="3xl"
                />
                <SimpleCardGrid
                    items={typicalProjects}
                    columns="lg:grid-cols-3"
                    background="bg-slate-50"
                />
            </div>
        </section>
    );
}

function ComparisonSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Choose the Right Storage Model"
                    title="Event Equipment Storage vs Self Storage vs Warehouse Rental"
                    description="The right model depends on equipment volume, internal resources, retrieval frequency and whether your team wants to operate the storage process itself."
                    maxWidth="3xl"
                />

                <div className="mt-10 hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white lg:block">
                    <div className="min-w-[980px]">
                        <div className="grid grid-cols-[0.7fr_1fr_1fr_1fr] bg-emerald-800 text-sm font-bold text-white">
                            <div className="p-5">Comparison</div>
                            <div className="border-l border-white/10 p-5">
                                Self Storage
                            </div>
                            <div className="border-l border-white/10 p-5">
                                Warehouse Rental
                            </div>
                            <div className="border-l border-white/10 p-5">
                                KXH Managed Event Storage
                            </div>
                        </div>

                        {comparisonRows.map((row) => (
                            <div
                                key={row.category}
                                className="grid grid-cols-[0.7fr_1fr_1fr_1fr] border-t border-slate-200 text-sm"
                            >
                                <div className="bg-slate-100 p-5 font-semibold text-slate-900">
                                    {row.category}
                                </div>
                                <div className="border-l border-slate-200 p-5 leading-6 text-slate-600">
                                    {row.selfStorage}
                                </div>
                                <div className="border-l border-slate-200 p-5 leading-6 text-slate-600">
                                    {row.warehouseRental}
                                </div>
                                <div className="border-l border-slate-200 bg-emerald-50 p-5 font-medium leading-6 text-slate-900">
                                    <span
                                        aria-hidden="true"
                                        className="mr-2 text-emerald-700"
                                    >
                                        ✓
                                    </span>
                                    {row.kxh}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 grid gap-4 lg:hidden">
                    {comparisonRows.map((row) => (
                        <article
                            key={row.category}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                        >
                            <h3 className="bg-emerald-800 px-5 py-4 font-bold text-white">
                                {row.category}
                            </h3>
                            <div className="p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Self storage
                                </p>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {row.selfStorage}
                                </p>
                            </div>
                            <div className="border-t border-slate-200 p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Warehouse rental
                                </p>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {row.warehouseRental}
                                </p>
                            </div>
                            <div className="border-t border-emerald-100 bg-emerald-50 p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                                    KXH managed event storage
                                </p>
                                <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
                                    <span aria-hidden="true">✓</span> {row.kxh}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center sm:p-8">
                    <h3 className="text-xl font-bold text-slate-950">
                        Not sure whether you need storage, inventory support or
                        wider event logistics?
                    </h3>
                    <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-700">
                        Describe the equipment, expected event schedule and delivery
                        pattern. An approximate list is enough for KXH to scope the
                        most practical service.
                    </p>
                    <Link
                        href={quoteUrl}
                        className="mt-6 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                    >
                        Ask KXH Which Service Fits
                    </Link>
                </div>
            </div>
        </section>
    );
}

function WhyKxhSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Managed Event Logistics Partner"
                    title="Why London Event Teams Choose KXH"
                    description="KXH combines collection, organised warehouse storage, selected retrieval, venue delivery and return logistics with wider business-storage services."
                    maxWidth="3xl"
                />
                <SimpleCardGrid
                    items={chooseKxh}
                    columns="lg:grid-cols-3"
                    background="bg-white"
                />
            </div>
        </section>
    );
}

function InventorySection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Event Equipment Inventory Organisation
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Know Which Equipment Belongs to Each Event
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Physical inventory organisation helps distinguish one case,
                        stand component, campaign kit, client asset or event package
                        from another.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        The right structure may use case numbers, client names,
                        campaigns, stand references, event dates, asset numbers or
                        supplied manifests.
                    </p>

                    <ChecklistGrid
                        items={inventoryBenefits}
                        columns="lg:grid-cols-2"
                        tone="emerald"
                    />

                    <Link
                        href="/inventory-management-london"
                        className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                    >
                        Explore Inventory Management
                    </Link>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                        Organisation built around event delivery
                    </h3>
                    <p className="mt-5 leading-7 text-slate-700">
                        Before collection, decide how teams will identify each kit,
                        who may authorise retrieval, where delivery should go and
                        which items should return after the event.
                    </p>
                    <ul className="mt-6 space-y-3 text-slate-700">
                        <li>
                            <span aria-hidden="true">✓</span> Clear case and item
                            references
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Client and campaign
                            grouping
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Stand component
                            grouping
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Selected-kit
                            retrieval
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Venue and return
                            coordination
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

function ExistingSystemsSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Existing Event Inventories
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Keep Useful References Your Team Already Uses
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Event businesses often already use case labels, asset
                        registers, spreadsheets, client references, campaign codes
                        or stand component lists.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Where suitable, these references can form the starting point
                        for the physical organisation agreed with KXH.
                    </p>
                </div>

                <ChecklistGrid
                    items={existingSystems}
                    columns="lg:grid-cols-2"
                    tone="emerald"
                />
            </div>
        </section>
    );
}

function RetrievalWorkflowSection() {
    return (
        <section
            id="delivery"
            className="scroll-mt-24 border-y border-slate-200 bg-white py-14 sm:py-20"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="How Event Delivery Requests Work"
                    title="Retrieve the Right Kit and Deliver It to the Right Venue"
                    description="A clear event-delivery workflow allows selected equipment to leave storage while the remaining inventory stays organised offsite."
                    maxWidth="3xl"
                />

                <SimpleCardGrid
                    items={retrievalWorkflow}
                    columns="lg:grid-cols-4"
                    background="bg-slate-50"
                />
            </div>
        </section>
    );
}

function RetrievalSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Typical Retrieval Requests"
                    title="Request One Event Kit or a Complete Project"
                    description="Retrieval may involve one flight case, selected stand components, a campaign kit, event furniture or the full stored project."
                    maxWidth="3xl"
                />

                <ChecklistGrid
                    items={retrievalRequests}
                    columns="lg:grid-cols-5"
                />

                <div className="mt-10 text-center">
                    <Link
                        href={quoteUrl}
                        className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                    >
                        Discuss Your Event Delivery Requirements
                    </Link>
                </div>
            </div>
        </section>
    );
}

function QuoteChecklistSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Prepare Your Event Storage Quote
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        What Information Helps Us Scope the Service?
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        A clear quote depends on equipment volume, packaging,
                        collection access, storage duration, event dates, venue
                        delivery and return requirements.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Estimates, photographs, case counts and existing manifests
                        are useful when a complete inventory is not available.
                    </p>
                    <Link
                        href={quoteUrl}
                        className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                    >
                        Request an Event Equipment Storage Quote
                    </Link>
                </div>

                <ChecklistGrid
                    items={quoteChecklist}
                    columns="lg:grid-cols-2"
                />
            </div>
        </section>
    );
}

function CustomerFitSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:rounded-3xl sm:p-10">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Is KXH Event Equipment Storage Right for Your Business?
                    </h2>
                    <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                        KXH is designed for event teams that need managed collection,
                        organised warehouse storage, selected retrieval, venue
                        delivery and return logistics.
                    </p>

                    <ChecklistGrid
                        items={customerFit}
                        columns="lg:grid-cols-2"
                    />
                </div>
            </div>
        </section>
    );
}

function LondonCoverageSection() {
    return (
        <section
            id="coverage"
            className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-16 sm:py-20"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="London Coverage"
                    title="Event Equipment Collection and Delivery Across London"
                    description="KXH supports collection, managed storage, inventory organisation, venue delivery and return logistics across Greater London."
                    maxWidth="3xl"
                />

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {londonAreas.map((area) => (
                        <Link
                            key={area.href}
                            href={area.href}
                            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                        >
                            <h3 className="font-bold text-slate-900">
                                {area.name}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Managed event equipment and business storage with
                                collection, organisation and delivery.
                            </p>
                            <span className="mt-4 inline-block text-sm font-semibold text-emerald-700">
                                Learn more →
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-14 border-t border-slate-200 pt-10">
                    <h3 className="text-lg font-bold text-slate-900">
                        Browse All London Locations
                    </h3>
                    <p className="mt-3 text-slate-600">
                        Explore business-storage coverage throughout Greater London.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                        {londonLocations.map((location) => (
                            <Link
                                key={location.slug}
                                href={`/business-storage-london/${location.slug}`}
                                className="text-sm font-medium text-emerald-700 hover:underline"
                            >
                                {location.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function RelatedServicesSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Related Event, Inventory, Furniture and Business Storage Services"
                    description="Connect event-equipment storage with commercial storage, inventory organisation, furniture storage, packing and moving services."
                    maxWidth="3xl"
                />

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {relatedServices.map((service) => (
                        <Link
                            key={service.href}
                            href={service.href}
                            className={
                                service.href === "/business-storage-london"
                                    ? "rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-6 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                                    : "rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-emerald-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                            }
                        >
                            {service.href === "/business-storage-london" && (
                                <span className="mb-3 inline-flex rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">
                                    Main Business Storage Service
                                </span>
                            )}
                            <h3 className="font-semibold text-slate-900">
                                {service.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                {service.description}
                            </p>
                            <span className="mt-4 inline-block text-xs font-semibold text-emerald-700">
                                Learn more →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FinalCtaSection() {
    return (
        <section className="border-t border-emerald-800 bg-emerald-800 py-14 text-center text-white sm:py-20">
            <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
                <p className="text-sm font-semibold uppercase tracking-wide !text-white">
                    Plan Your Event Equipment Storage
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
                    Tell Us What You Need to Store and Deliver
                </h2>
                <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
                    Share the approximate equipment volume, collection postcode,
                    upcoming event dates and venue-delivery requirements. KXH will
                    scope a practical managed storage and logistics workflow.
                </p>

                <div className="mx-auto mt-7 grid max-w-xl gap-3 text-left sm:grid-cols-2">
                    {[
                        "Approximate equipment volume",
                        "Collection postcode",
                        "Upcoming event dates",
                        "Delivery and return requirements",
                    ].map((item) => (
                        <div
                            key={item}
                            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white"
                        >
                            <span aria-hidden="true">✓</span> {item}
                        </div>
                    ))}
                </div>

                <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-slate-300">
                    Not sure of the exact quantities? Photographs and an estimate are
                    enough to start.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href={quoteUrl}
                        className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800 sm:w-auto sm:px-8"
                    >
                        Plan Your Event Storage Quote
                    </Link>
                    <a
                        href="tel:+447386277785"
                        className="w-full rounded-xl border border-white/20 px-6 py-4 text-center font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:px-8"
                    >
                        Call KXH
                    </a>
                </div>
            </div>
        </section>
    );
}

function FaqSection() {
    return (
        <section
            id="faqs"
            className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-12"
        >
            <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    Event Equipment Storage FAQs
                </h2>
                <div className="space-y-3">
                    {faqs.map((faq) => (
                        <details
                            key={faq.question}
                            className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
                        >
                            <summary className="cursor-pointer rounded-md font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2">
                                {faq.question}
                            </summary>
                            <p className="mt-3 leading-7 text-slate-600">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function EventEquipmentStorageLondonPage() {
    return (
        <>
            <CrispChat />
            <Nav />

            <main className="min-h-screen bg-white text-slate-900">
                <ServiceJsonLd />
                <FAQJsonLd />
                <BreadcrumbJsonLd />
                <WebPageJsonLd />
                <TrustpilotJsonLd />

                <PageBreadcrumb />
                <HeroSection />
                <PageSectionNav />
                <DifferentiationSection />
                <GuidanceSection />
                <ProblemsSection />
                <ProcessSection />
                <LifecycleSection />
                <PricingSection />
                <ManagedStorageSection />
                <EquipmentReviewSection />
                <StoredItemsSection />
                <IndustriesSection />
                <UseCasesSection />
                <TypicalProjectsSection />
                <ComparisonSection />
                <WhyKxhSection />
                <InventorySection />
                <ExistingSystemsSection />
                <RetrievalWorkflowSection />
                <RetrievalSection />
                <QuoteChecklistSection />
                <CustomerFitSection />
                <LondonCoverageSection />
                <RelatedServicesSection />
                <TestimonialsSection />
                <FinalCtaSection />
                <FaqSection />

                <MainFooter locations={londonLocations} />
            </main>
        </>
    );
}