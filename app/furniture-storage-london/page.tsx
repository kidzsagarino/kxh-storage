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
import { CONTACT_NUMBERS } from "../lib/contact";

const pageUrl = "https://kxhlogistics.co.uk/furniture-storage-london";
const quoteUrl = "/get-a-quote?service=storage";

export const metadata: Metadata = {
    title: "Furniture Storage London | Collection & Delivery | KXH",
    description:
        "Managed furniture storage in London with business collection, organised warehouse storage, inventory support and return delivery.",
    applicationName: "KXH Storage & Logistics",
    category: "Business furniture storage",
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
        title: "Furniture Storage London | Collection & Delivery | KXH",
        description:
            "Managed furniture storage for London businesses with collection, organised warehouse storage, inventory support and return delivery.",
        images: [
            {
                url: "/images/furniture-storage/furniture-storage-london.webp",
                width: 1200,
                height: 630,
                alt: "Business furniture stored inside a managed London warehouse",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Furniture Storage London | Collection & Delivery | KXH",
        description:
            "Managed business furniture storage with collection, warehouse storage, inventory support and return delivery across London.",
        images: ["/images/furniture-storage/furniture-storage-london.webp"],
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
    "Furniture collection",
    "Managed warehouse storage",
    "Inventory organisation",
    "Return delivery",
];

const differentiationItems: CardItem[] = [
    {
        title: "Not Self Storage",
        description:
            "Your team does not need to hire vans, move bulky furniture into a unit, visit the site, or manage access.",
    },
    {
        title: "Not Warehouse Rental",
        description:
            "KXH provides a managed service rather than handing your business an empty warehouse area to operate.",
    },
    {
        title: "Not Container Hire",
        description:
            "Furniture is handled through a managed warehouse workflow instead of being left inside a customer-managed container.",
    },
    {
        title: "Managed Furniture Logistics",
        description:
            "Collection, handling, inventory organisation, storage, retrieval and return delivery can be coordinated as one service.",
    },
];

const customerProblems: CardItem[] = [
    {
        title: "Unused Furniture Is Taking Over",
        description:
            "Free offices, corridors, stockrooms and meeting areas currently occupied by surplus desks, chairs, cabinets and fixtures.",
    },
    {
        title: "Your Office Is Moving",
        description:
            "Store furniture between leases, during phased relocations, or while a new workplace is being prepared.",
    },
    {
        title: "A Refurbishment Needs Clear Space",
        description:
            "Remove furniture before contractors begin and arrange phased return delivery when rooms are ready.",
    },
    {
        title: "Furniture Is Awaiting Installation",
        description:
            "Hold desks, seating, cabinets, fixtures or project furniture until the receiving site can accept delivery.",
    },
    {
        title: "Different Sites Hold Surplus Items",
        description:
            "Consolidate furniture from offices, schools, retail sites, hospitality venues, project locations or former premises.",
    },
    {
        title: "Seasonal Furniture Needs Storage",
        description:
            "Move temporary seating, display units, event furniture and seasonal fixtures out of active business space.",
    },
    {
        title: "You Need Partial Deliveries",
        description:
            "Request selected items for a floor, project, department or new site instead of returning the full stored load.",
    },
    {
        title: "Self Storage Creates More Work",
        description:
            "Avoid asking staff to dismantle, transport, stack, find and redeliver bulky furniture from a rented unit.",
    },
];

const processSteps: CardItem[] = [
    {
        title: "Request a Quote",
        description:
            "Tell us the furniture types, approximate volume, collection address, storage period and expected delivery requirements.",
    },
    {
        title: "Collect & Handle",
        description:
            "KXH arranges collection from the agreed London premises and handles items according to the planned scope.",
    },
    {
        title: "Register & Store",
        description:
            "Furniture is organised using agreed item references, departments, projects, manifests or other practical identifiers.",
    },
    {
        title: "Retrieve & Deliver",
        description:
            "Request selected furniture or the complete stored collection for return delivery to an agreed address.",
    },
];

const postCollectionSteps: CardItem[] = [
    {
        title: "Arrival Review",
        description:
            "Collected furniture enters the agreed warehouse workflow and is checked against the collection information provided.",
    },
    {
        title: "Item Reference Confirmation",
        description:
            "Existing labels, asset numbers, department references, manifests or agreed descriptions are confirmed.",
    },
    {
        title: "Storage Location Assignment",
        description:
            "Items are placed into organised warehouse storage so different furniture groups can be distinguished later.",
    },
    {
        title: "Delivery-Ready Inventory",
        description:
            "The agreed references support later requests for selected desks, chairs, fixtures, room sets or complete projects.",
    },
];

const pricingFactors: CardItem[] = [
    {
        title: "Furniture Volume",
        description:
            "The quantity, dimensions, stackability, condition and type of furniture being collected and stored.",
    },
    {
        title: "Collection & Access",
        description:
            "Collection postcode, parking, stairs, lifts, loading restrictions, floor level and the distance from the building to the vehicle.",
    },
    {
        title: "Handling Requirements",
        description:
            "Whether items need dismantling, protection, grouping, special handling or additional labour before storage.",
    },
    {
        title: "Storage Duration",
        description:
            "Temporary, project-based, rolling or longer-term storage requirements and any expected review dates.",
    },
    {
        title: "Inventory Organisation",
        description:
            "The level of item referencing, room grouping, department grouping, manifest checking or project organisation required.",
    },
    {
        title: "Return Delivery",
        description:
            "Delivery quantity, destination, access, reassembly expectations, phasing and the number of separate delivery requests.",
    },
];

const preparationItems = [
    "Identify furniture that should remain onsite",
    "Group items by department, floor or project",
    "Provide existing asset numbers or inventories",
    "Flag fragile, valuable or unusually heavy items",
    "Confirm whether dismantling is required",
    "Remove personal belongings from desks and cabinets",
    "Explain likely partial-delivery requirements",
    "Share collection and destination access details",
];

const furnitureTypes = [
    "Office desks",
    "Office chairs",
    "Meeting tables",
    "Reception furniture",
    "Filing cabinets",
    "Storage cabinets",
    "Bookcases and shelving",
    "Conference furniture",
    "Restaurant furniture",
    "Hotel furniture",
    "School furniture",
    "Retail display units",
    "Shop fixtures",
    "Waiting-room furniture",
    "Soft seating",
    "Office partitions",
    "Lockers",
    "Property-staging furniture",
    "Showroom furniture",
    "Furniture awaiting installation",
];

const industries: CardItem[] = [
    {
        title: "Offices & Professional Services",
        description:
            "Desks, task chairs, meeting furniture, reception items, filing units, cabinets and surplus workplace furniture.",
    },
    {
        title: "Schools & Universities",
        description:
            "Classroom furniture, tables, chairs, storage units, library furniture and items held during refurbishment or term breaks.",
    },
    {
        title: "Healthcare",
        description:
            "Approved waiting-room, office, administrative and non-clinical furniture requiring managed physical storage.",
    },
    {
        title: "Hospitality",
        description:
            "Tables, chairs, soft seating, reception pieces and furniture stored during refurbishment, closure or seasonal change.",
    },
    {
        title: "Retail & Showrooms",
        description:
            "Display furniture, counters, shelving, seating, fixtures and items waiting for a new store, campaign or fit-out.",
    },
    {
        title: "Property & Facilities Management",
        description:
            "Furniture from managed offices, residential developments, common areas, vacant units and phased property projects.",
    },
    {
        title: "Construction & Fit-Out",
        description:
            "Project furniture, temporary furniture and items awaiting installation, handover or access to the final site.",
    },
    {
        title: "Architecture & Interior Design",
        description:
            "Client furniture, samples furniture, staging items, room sets and project-specific pieces between installation phases.",
    },
    {
        title: "Coworking & Flexible Workspace",
        description:
            "Desks, chairs, meeting-room furniture and surplus items moved as floor plans and occupier requirements change.",
    },
    {
        title: "Manufacturing",
        description:
            "Office, reception, canteen, training-room and administrative furniture held during moves or facility changes.",
    },
    {
        title: "Charities",
        description:
            "Donated, operational, event and office furniture requiring collection, temporary storage or phased delivery.",
    },
    {
        title: "Government Contractors",
        description:
            "Project, office and site furniture held between contracts, site changes, fit-outs or phased deployments.",
    },
];

const useCases: CardItem[] = [
    {
        title: "Office Relocation",
        description:
            "Hold furniture between move dates and coordinate phased delivery to the new workplace.",
    },
    {
        title: "Office Refurbishment",
        description:
            "Clear rooms before building work and return selected furniture when each area is ready.",
    },
    {
        title: "New Fit-Out",
        description:
            "Store furniture that has arrived before the receiving site, contractor or installation team is ready.",
    },
    {
        title: "Furniture Surplus",
        description:
            "Keep reusable desks, chairs, cabinets and meeting furniture without filling active office space.",
    },
    {
        title: "Business Downsizing",
        description:
            "Store excess furniture while the business decides what will be reused, relocated, sold or returned.",
    },
    {
        title: "Seasonal Operations",
        description:
            "Hold temporary seating, display furniture and event-related items between peak periods.",
    },
    {
        title: "Property Staging",
        description:
            "Store staging furniture between properties, projects, photography, viewings or installation schedules.",
    },
    {
        title: "Multiple-Site Consolidation",
        description:
            "Bring furniture together from branches, offices, schools, stores, venues or project locations.",
    },
];

const comparisonRows = [
    {
        category: "Collection",
        selfStorage: "Your team arranges vehicles, labour and loading",
        warehouseRental: "Usually managed by your own staff or contractors",
        kxh: "KXH can coordinate collection from London business premises",
    },
    {
        category: "Loading",
        selfStorage: "Your team handles bulky items",
        warehouseRental: "Your business organises labour and equipment",
        kxh: "Furniture handling can form part of the managed collection scope",
    },
    {
        category: "Inventory",
        selfStorage: "You create and maintain all item records",
        warehouseRental: "Your business operates its own inventory process",
        kxh: "Items can be organised using agreed references, departments and manifests",
    },
    {
        category: "Storage",
        selfStorage: "You rent and manage a unit",
        warehouseRental: "You operate the rented space",
        kxh: "Furniture is placed into a managed business-storage workflow",
    },
    {
        category: "Retrieval",
        selfStorage: "Your staff visit and search for items",
        warehouseRental: "Your staff or contractors pick the items",
        kxh: "Request selected furniture or a complete project for managed retrieval",
    },
    {
        category: "Delivery",
        selfStorage: "Your team arranges return transport",
        warehouseRental: "Delivery is managed separately",
        kxh: "Return delivery can be coordinated to an agreed London address",
    },
    {
        category: "Business Support",
        selfStorage: "Space only",
        warehouseRental: "Space with your own operation",
        kxh: "Collection, storage, inventory organisation and delivery can work together",
    },
    {
        category: "Flexibility",
        selfStorage: "Flexible access but high internal workload",
        warehouseRental: "Best suited to businesses operating their own warehouse process",
        kxh: "Suitable for businesses needing a managed furniture logistics service",
    },
];

const chooseKxh: CardItem[] = [
    {
        title: "Managed Collection",
        description:
            "KXH can collect furniture from offices, commercial premises, schools, venues, project sites and other agreed London addresses.",
    },
    {
        title: "Practical Handling",
        description:
            "The collection plan can account for access, item size, dismantling needs, fragile pieces and loading requirements.",
    },
    {
        title: "Organised Warehouse Storage",
        description:
            "Furniture can be grouped around departments, floors, room sets, projects, sites, clients or supplied inventories.",
    },
    {
        title: "Partial Retrieval",
        description:
            "Request selected desks, chairs, fixtures or room groups instead of returning the complete stored collection.",
    },
    {
        title: "Return Delivery",
        description:
            "Furniture can be delivered to an agreed business address when the receiving site is ready.",
    },
    {
        title: "Wider Business Logistics",
        description:
            "Furniture storage can connect with office relocation, commercial storage, warehouse capacity and inventory organisation.",
    },
];

const inventoryBenefits = [
    "Item and asset references",
    "Department or floor grouping",
    "Project and client grouping",
    "Manifest-based organisation",
    "Selected-item retrieval",
    "Phased-delivery coordination",
];

const existingSystems = [
    "Existing asset numbers",
    "Excel furniture inventories",
    "Department labels",
    "Room and floor references",
    "Project or client codes",
    "Existing QR or barcode labels",
    "Supplier delivery lists",
    "Furniture tags and manifests",
];

const typicalDeliveryRequests = [
    "Meeting-room furniture",
    "Office desks",
    "Task chairs",
    "Reception furniture",
    "Project furniture",
    "Showroom furniture",
    "Retail fixtures",
    "Property-staging sets",
    "Partial floor deliveries",
    "Complete office returns",
];

const quoteChecklist = [
    "Approximate number and type of items",
    "Collection postcode and floor level",
    "Lift, loading and parking information",
    "Whether dismantling is required",
    "Existing inventory or asset references",
    "Expected storage duration",
    "Likely partial-delivery requirements",
    "Delivery postcode and access details",
];

const customerFit = [
    "You need furniture collected from business premises",
    "You need temporary or longer-term warehouse storage",
    "You need selected items delivered later",
    "You are moving, refurbishing or fitting out a site",
    "You need furniture grouped by project or department",
    "You prefer a managed service over operating a storage unit",
];

const relatedServices: LinkCardItem[] = [
    {
        title: "Business Storage London",
        href: "/business-storage-london",
        description:
            "The parent KXH service for furniture, equipment, archives, stock and other managed business-storage requirements.",
    },
    {
        title: "Commercial Storage London",
        href: "/commercial-storage-london",
        description:
            "Flexible managed storage for commercial furniture, equipment, materials and operational items.",
    },
    {
        title: "Warehouse Storage London",
        href: "/warehouse-storage-london",
        description:
            "Managed warehouse capacity for furniture, stock, equipment, pallets and broader business requirements.",
    },
    {
        title: "Inventory Management London",
        href: "/inventory-management-london",
        description:
            "Physical inventory organisation, item references, categorisation, warehouse handling and selected-item return support.",
    },
    {
        title: "Office Relocation London",
        href: "/office-relocation-london",
        description:
            "Business moving support for offices relocating, consolidating, refurbishing or changing how their workspace is used.",
    },
    {
        title: "Moving & Storage London",
        href: "/logistics-moving-london",
        description:
            "Combined collection, moving, temporary storage, handling and return delivery for London businesses.",
    },
    {
        title: "Archive Storage London",
        href: "/archive-storage-london",
        description:
            "Managed collection, organisation, storage and retrieval for physical business archives and document boxes.",
    },
    {
        title: "Document Shredding",
        href: "/shredding-solutions-london",
        description:
            "Secure document shredding for business records that are authorised for destruction.",
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
        question: "Do you collect office furniture?",
        answer:
            "Yes. KXH can arrange collection from offices, commercial premises, schools, venues, project sites and other agreed London addresses. Pricing depends on item volume, access, labour, dismantling, handling and transport requirements.",
    },
    {
        question: "Do I need to dismantle desks before collection?",
        answer:
            "Not always. Some furniture can remain assembled, while larger desks, tables, shelving or partitions may need dismantling for safer handling or more efficient storage. Explain the furniture type and access conditions during quotation so the collection plan can be agreed.",
    },
    {
        question: "Can furniture remain in storage long term?",
        answer:
            "Furniture storage can support temporary, project-based, rolling or longer-term requirements. The appropriate arrangement depends on volume, item condition, storage duration, retrieval needs and future delivery plans.",
    },
    {
        question: "Can I retrieve only part of my furniture?",
        answer:
            "Yes, where the stored items have been organised using suitable references. You may request selected desks, chairs, fixtures, room sets, departments or project groups rather than returning the complete stored collection.",
    },
    {
        question: "Can you deliver furniture to a new office?",
        answer:
            "Yes. Return delivery can be coordinated to an agreed business address. The destination postcode, parking, floor level, lifts, loading restrictions and any assembly requirements should be discussed before delivery is scheduled.",
    },
    {
        question: "Do you store furniture during refurbishment?",
        answer:
            "Yes. KXH can collect furniture before refurbishment work begins, hold it in managed warehouse storage and coordinate phased or full return delivery when the relevant areas are ready.",
    },
    {
        question: "Can stored furniture be inventoried?",
        answer:
            "Furniture can be organised around agreed descriptions, asset numbers, departments, floors, rooms, projects, clients, manifests or existing inventory records. The level of detail should be agreed before collection.",
    },
    {
        question: "How is furniture protected in storage?",
        answer:
            "Protection requirements depend on the furniture material, condition, dimensions and handling needs. Tell KXH about fragile, valuable, finished, upholstered or unusually shaped items so suitable handling and packaging requirements can be discussed.",
    },
    {
        question: "Can you store restaurant or hotel furniture?",
        answer:
            "KXH can discuss storage for approved tables, chairs, reception furniture, soft seating, cabinets and other hospitality furniture during refurbishment, seasonal changes, closure or relocation.",
    },
    {
        question: "Can you collect furniture from multiple offices?",
        answer:
            "Multiple collection points can be discussed as part of a consolidation, relocation or refurbishment project. Pricing and scheduling depend on the number of sites, access, furniture volume, labour and transport requirements.",
    },
    {
        question: "Can more furniture be added after the first collection?",
        answer:
            "Ongoing additions may be possible where they fit the agreed storage and inventory workflow. Tell KXH how frequently new items are likely to arrive so collection, organisation and pricing can be planned.",
    },
    {
        question: "Is this the same as self storage?",
        answer:
            "No. Self storage normally provides a unit that your team must transport furniture to, organise, visit and manage. KXH provides a managed furniture-storage workflow that can include collection, handling, inventory organisation, storage, retrieval and return delivery.",
    },
    {
        question: "Can you store retail fixtures and display units?",
        answer:
            "KXH can discuss storage for approved shop fixtures, display furniture, shelving, counters, seating and showroom items. Dimensions, condition, dismantling and future delivery requirements should be explained during quotation.",
    },
    {
        question: "Can you store furniture awaiting installation?",
        answer:
            "Yes. Furniture can be held while a site is being prepared, access is delayed, contractors complete fit-out work or installation dates are finalised.",
    },
    {
        question: "What information is needed for a quote?",
        answer:
            "Useful information includes approximate item quantities, photographs or descriptions, collection postcode, floor level, lift and loading details, dismantling needs, expected storage duration and likely return-delivery requirements.",
    },
    {
        question: "Can furniture be grouped by department or project?",
        answer:
            "Yes. Furniture can be organised around practical references such as department, floor, room, project, client, site, asset number or supplied manifest where agreed.",
    },
    {
        question: "Do you provide assembly or installation?",
        answer:
            "Any dismantling, reassembly or installation requirement should be discussed during quotation. Availability and pricing depend on the furniture type, complexity, access and project scope.",
    },
    {
        question: "What furniture may not be suitable for storage?",
        answer:
            "Suitability depends on condition, dimensions, materials, contamination risk, packaging, handling requirements and available warehouse capacity. KXH should review unusual, damaged, wet, infested, hazardous or exceptionally valuable items before collection is agreed.",
    },
];

function ServiceJsonLd() {
    const serviceItems = [
        "Furniture collection",
        "Furniture handling",
        "Inventory organisation",
        "Managed warehouse storage",
        "Furniture retrieval",
        "Return delivery",
    ];

    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Furniture Storage London",
        serviceType: "Managed Business Furniture Storage",
        url: pageUrl,
        description:
            "Managed furniture storage in London with collection, handling, inventory organisation, warehouse storage, retrieval and return delivery.",
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
            audienceType: "London businesses and organisations",
        },
        offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            url: `https://kxhlogistics.co.uk${quoteUrl}`,
            availability: "https://schema.org/InStock",
            itemOffered: { "@id": `${pageUrl}#service` },
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Managed Furniture Storage Services",
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
                item: "https://kxhlogistics.co.uk/business-storage-london",
            },
            {
                "@type": "ListItem",
                position: 4,
                name: "Furniture Storage London",
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
        name: "Furniture Storage London",
        description:
            "Managed furniture storage in London with collection, organised warehouse storage, inventory support and return delivery.",
        isPartOf: {
            "@type": "WebSite",
            "@id": "https://kxhlogistics.co.uk/#website",
            url: "https://kxhlogistics.co.uk",
            name: "KXH Storage & Logistics",
        },
        mainEntity: { "@id": `${pageUrl}#service` },
        about: { "@id": `${pageUrl}#service` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        primaryImageOfPage: {
            "@type": "ImageObject",
            url: "https://kxhlogistics.co.uk/images/furniture-storage/furniture-storage-london.webp",
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
                    <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
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
                    ✓ {item}
                </div>
            ))}
        </div>
    );
}

const pageSections = [
    { href: "#how-it-works", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#furniture-types", label: "Furniture stored" },
    { href: "#delivery", label: "Delivery" },
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
            <span className="mx-2">/</span>
            <Link href="/services" className="transition hover:text-emerald-700">
                Services
            </Link>
            <span className="mx-2">/</span>
            <Link
                href="/business-storage-london"
                className="transition hover:text-emerald-700"
            >
                Business Storage
            </Link>
            <span className="mx-2">/</span>
            <span aria-current="page" className="font-medium text-slate-700">
                Furniture Storage London
            </span>
        </nav>
    );
}

function PageSectionNav() {
    return (
        <nav
            aria-label="Furniture storage page sections"
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
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Managed Furniture Storage for London Businesses
                </div>

                <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                    Furniture Storage London
                </h1>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                    Managed storage for office furniture, commercial furniture, fixtures,
                    room sets, surplus items and furniture awaiting installation.
                </p>

                <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                    KXH can collect furniture from your premises, organise it inside a
                    managed warehouse workflow, retrieve selected items and coordinate
                    return delivery when your business is ready.
                </p>

                <div className="mx-auto mt-7 grid max-w-4xl grid-cols-1 gap-3 min-[430px]:grid-cols-2 lg:grid-cols-4">
                    {coreBenefits.map((benefit) => (
                        <div
                            key={benefit}
                            className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
                        >
                            ✓ {benefit}
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href={quoteUrl}
                        className="w-full rounded-xl bg-emerald-700 px-6 py-4 text-center font-semibold text-white shadow-lg transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 sm:w-auto"
                    >
                        Get Furniture Storage Quote
                    </Link>
                    {CONTACT_NUMBERS.map((contact) => (
                        <a
                            key={contact.href}
                            href={contact.href}
                            className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2 sm:w-auto"
                        >
                            Call {contact.label}
                        </a>
                    ))}
                </div>

                <p className="mt-4 text-sm text-slate-500">
                    Not sure how many items you have? An estimate is enough to begin.
                </p>

                <div className="mt-6 flex justify-center">
                    <TrustpilotPill />
                </div>

                <div className="mt-12">
                    <Image
                        src="/images/business-storage/business-storage-london-warehouse-inventory.webp"
                        alt="Business furniture stored inside a managed London warehouse"
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
                    eyebrow="Managed Furniture Storage"
                    title="More Than Empty Warehouse Space"
                    description="KXH provides a managed furniture-storage workflow rather than asking your business to operate a self-storage unit, rented warehouse area or container."
                    maxWidth="3xl"
                />
                <SimpleCardGrid items={differentiationItems} />
            </div>
        </section>
    );
}

function ProjectGuidanceSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Planning a Furniture Storage Project
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Good Storage Starts with the Return Plan
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        The strongest furniture-storage projects begin by deciding which
                        items will be reused, how furniture should be grouped, who can
                        request delivery and where each group will eventually go.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        KXH manages the physical collection, organisation, warehouse
                        storage, retrieval and delivery workflow. Your business decides
                        what should be stored, reused, transferred, sold or disposed of.
                    </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                        Decisions to make before collection
                    </h3>
                    <ul className="mt-6 space-y-3 text-slate-700">
                        <li>✓ Which furniture remains in daily use?</li>
                        <li>✓ Which items belong to each department or site?</li>
                        <li>✓ Will desks or tables need dismantling?</li>
                        <li>✓ Which items are fragile, valuable or unusually heavy?</li>
                        <li>✓ Are partial deliveries likely?</li>
                        <li>✓ What access will be available at the destination?</li>
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
                            Your Workplace Should Support the Business, Not Become a{" "}
                            <span className="text-emerald-700">
                                Furniture Storeroom
                            </span>
                        </>
                    }
                    description="Release working space, simplify moves and fit-outs, and keep reusable furniture available without asking employees to operate a storage facility."
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
                    title="Four Steps from Collection to Return Delivery"
                    description="A managed process covering collection, handling, inventory organisation, warehouse storage, retrieval and delivery."
                />
                <SimpleCardGrid items={processSteps} background="bg-slate-50" />
            </div>
        </section>
    );
}

function PostCollectionSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="After Collection"
                    title="What Happens When Furniture Reaches Storage?"
                    description="The post-collection workflow turns transported furniture into an organised stored inventory that can support future retrieval and delivery."
                    maxWidth="3xl"
                />
                <SimpleCardGrid items={postCollectionSteps} background="bg-white" />
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
                    eyebrow="Flexible Furniture Storage Pricing"
                    title="A Quote Based on the Furniture and Work Involved"
                    description="Furniture storage is priced around the physical items, collection conditions, handling, storage period, inventory requirements and return-delivery plan."
                    maxWidth="3xl"
                />

                <SimpleCardGrid
                    items={pricingFactors}
                    columns="lg:grid-cols-3"
                    background="bg-slate-50"
                />

                <div className="mt-10 text-center">
                    <Link
                        href={quoteUrl}
                        className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Calculate Your Furniture Storage Quote
                    </Link>
                    <p className="mt-4 text-sm leading-6 text-slate-500">
                        No fixed prices are published because furniture dimensions,
                        access, labour and delivery requirements vary between projects.
                    </p>
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
                    alt="Office and commercial furniture arranged inside a London warehouse"
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
                        Managed Warehouse Storage
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Furniture Storage Without Operating Your Own Unit
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        KXH stores physical furniture inside a managed business-storage
                        workflow. This is not unrestricted self-storage access, empty
                        warehouse rental or container hire.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Furniture can be collected, grouped using practical identifiers,
                        stored offsite and returned when your receiving site is ready.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Businesses needing wider capacity can also explore{" "}
                        <Link
                            href="/business-storage-london"
                            className="rounded-sm font-semibold text-emerald-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                        >
                            Business Storage London
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/warehouse-storage-london"
                            className="rounded-sm font-semibold text-emerald-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                        >
                            Warehouse Storage London
                        </Link>
                        .
                    </p>
                    <ul className="mt-7 space-y-3 text-slate-700">
                        <li>✓ Organised furniture storage</li>
                        <li>✓ Item and asset references</li>
                        <li>✓ Department and project grouping</li>
                        <li>✓ Selected-item retrieval</li>
                        <li>✓ Return-delivery coordination</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

function PreparationSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Preparing Furniture for Storage"
                    title="Make Collection, Storage and Delivery Easier"
                    description="You do not need a perfect inventory before requesting a quote, but practical preparation helps reduce handling issues and supports later retrieval."
                    maxWidth="3xl"
                />
                <ChecklistGrid items={preparationItems} />
            </div>
        </section>
    );
}

function FurnitureTypesSection() {
    return (
        <section
            id="furniture-types"
            className="scroll-mt-24 bg-slate-50 py-14 sm:py-20"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="What Can Be Stored"
                    title="Furniture Storage for Offices, Projects, Venues and Commercial Sites"
                    description="KXH can discuss storage for a broad range of approved business furniture, subject to dimensions, condition, handling requirements and available warehouse capacity."
                    maxWidth="3xl"
                />
                <ChecklistGrid
                    items={furnitureTypes}
                    columns="lg:grid-cols-5"
                />
            </div>
        </section>
    );
}

function IndustriesSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Industries We Support"
                    title="Furniture Storage Across Professional, Public and Commercial Sectors"
                    description="Different organisations hold different furniture, operate different sites and require different collection and delivery workflows."
                    maxWidth="3xl"
                />
                <SimpleCardGrid
                    items={industries}
                    columns="lg:grid-cols-3"
                />
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
                    alt="KXH team handling business furniture for collection and storage in London"
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
                        eyebrow="Furniture Storage Use Cases"
                        title="Support Moves, Refurbishments, Fit-Outs and Business Change"
                        description="Managed furniture storage can solve an immediate space problem or become part of a phased relocation, refurbishment or installation project."
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

function ComparisonSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Choose the Right Storage Model"
                    title="Furniture Storage vs Self Storage vs Warehouse Rental"
                    description="The right option depends on furniture volume, internal resources, handling requirements, delivery frequency and whether your business wants to operate the storage process itself."
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
                                KXH Managed Furniture Storage
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
                                    <span className="mr-2 text-emerald-700">✓</span>
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
                                    KXH managed furniture storage
                                </p>
                                <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
                                    ✓ {row.kxh}
                                </p>
                            </div>
                        </article>
                    ))}
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
                    eyebrow="Managed Furniture Logistics Partner"
                    title="Why London Businesses Choose KXH Storage & Logistics"
                    description="KXH combines furniture collection, handling, organised warehouse storage, selected-item retrieval and return delivery with wider business-storage and relocation services."
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
                        Furniture Inventory Organisation
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Know What Is Stored and Request the Items You Need
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Furniture organisation focuses on physical items held in the
                        warehouse. Agreed identifiers help distinguish one desk, chair,
                        cabinet, room set, department or project group from another.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        The right structure may use asset numbers, room references,
                        departments, floors, sites, projects, clients or a manifest
                        supplied by your organisation.
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
                        Furniture organisation built around future delivery
                    </h3>
                    <p className="mt-5 leading-7 text-slate-700">
                        Before collection, decide how teams will identify the furniture
                        they need, who may authorise retrieval, where each delivery should
                        go and whether items should return in phases.
                    </p>
                    <ul className="mt-6 space-y-3 text-slate-700">
                        <li>✓ Organised item references</li>
                        <li>✓ Department and floor grouping</li>
                        <li>✓ Project and site grouping</li>
                        <li>✓ Partial-delivery support</li>
                        <li>✓ Full return coordination</li>
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
                        Existing Furniture Inventories
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Keep Useful References Your Team Already Understands
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Businesses often already have asset tags, spreadsheets, room
                        lists, department codes, supplier manifests or project
                        references. Where suitable, these can form the starting point for
                        the furniture organisation agreed with KXH.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        KXH does not replace your asset-management system. The goal is to
                        connect useful existing references with the physical items held
                        in storage.
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

function TypicalDeliverySection() {
    return (
        <section
            id="delivery"
            className="scroll-mt-24 border-y border-slate-200 bg-white py-14 sm:py-20"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Typical Delivery Requests"
                    title="Return the Furniture Your Team or Project Needs"
                    description="Delivery may involve one room set, selected desks and chairs, a department, a project group or the complete stored collection."
                    maxWidth="3xl"
                />
                <ChecklistGrid
                    items={typicalDeliveryRequests}
                    columns="lg:grid-cols-5"
                />

                <div className="mt-10 text-center">
                    <Link
                        href={quoteUrl}
                        className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Discuss Your Delivery Requirements
                    </Link>
                </div>
            </div>
        </section>
    );
}

function QuoteChecklistSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Prepare Your Furniture Quote
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        What Information Helps Us Scope the Service?
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        A clear furniture-storage quote depends on more than item count.
                        Dimensions, access, dismantling, labour, storage period and future
                        delivery requirements all affect the proposed workflow.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Estimates, photographs and general descriptions are still useful
                        when an exact inventory is not available.
                    </p>
                    <Link
                        href={quoteUrl}
                        className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Request a Furniture Storage Quote
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
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:rounded-3xl sm:p-10">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Is KXH Furniture Storage Right for Your Business?
                    </h2>
                    <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                        KXH is designed for organisations that want a managed furniture
                        service with collection, organised warehouse storage, retrieval
                        and return delivery rather than operating a storage unit
                        themselves.
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
                    title="Furniture Collection and Storage Across London"
                    description="KXH supports furniture collection, managed warehouse storage, inventory organisation and return delivery for businesses across Greater London."
                    maxWidth="3xl"
                />

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {londonAreas.map((area) => (
                        <Link
                            key={area.href}
                            href={area.href}
                            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm"
                        >
                            <h3 className="font-bold text-slate-900">{area.name}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Managed business and furniture storage with collection,
                                organisation and return delivery.
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
                    title="Related Business Storage, Relocation and Logistics Services"
                    description="Connect furniture storage with broader warehouse capacity, office moves, physical inventory organisation and other managed business services."
                    maxWidth="3xl"
                />

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {relatedServices.map((service) => (
                        <Link
                            key={service.href}
                            href={service.href}
                            className={
                                service.href === "/business-storage-london"
                                    ? "rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-6 shadow-sm"
                                    : "rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-emerald-300 hover:bg-white"
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

function TestimonialsWrapper() {
    return <TestimonialsSection />;
}

function FinalCtaSection() {
    return (
        <section className="border-t border-emerald-800 bg-emerald-800 py-14 text-center text-white sm:py-20">
            <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
                <p className="text-sm font-semibold uppercase tracking-wide !text-white">
                    Plan Your Furniture Storage Project
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
                    Tell Us What You Need to Collect, Store and Deliver
                </h2>
                <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
                    Share an estimated item count, collection postcode, storage duration
                    and likely delivery requirements. KXH will use that information to
                    scope a practical managed furniture-storage workflow.
                </p>

                <div className="mx-auto mt-7 grid max-w-xl gap-3 text-left sm:grid-cols-2">
                    {[
                        "Approximate furniture volume",
                        "Collection postcode",
                        "Expected storage duration",
                        "Delivery requirements",
                    ].map((item) => (
                        <div
                            key={item}
                            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white"
                        >
                            ✓ {item}
                        </div>
                    ))}
                </div>

                <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-slate-300">
                    Not sure how many items you have? An estimate is enough to start.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href={quoteUrl}
                        className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800 sm:w-auto sm:px-8"
                    >
                        Plan Your Furniture Storage Quote
                    </Link>
                    {CONTACT_NUMBERS.map((contact) => (
                        <a
                            key={contact.href}
                            href={contact.href}
                            className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2 sm:w-auto"
                        >
                            Call {contact.label}
                        </a>
                    ))}
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
                    Furniture Storage FAQs
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

export default function FurnitureStorageLondonPage() {
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
                <ProjectGuidanceSection />
                <ProblemsSection />
                <ProcessSection />
                <PostCollectionSection />
                <PricingSection />
                <ManagedStorageSection />
                <PreparationSection />
                <FurnitureTypesSection />
                <IndustriesSection />
                <UseCasesSection />
                <ComparisonSection />
                <WhyKxhSection />
                <InventorySection />
                <ExistingSystemsSection />
                <TypicalDeliverySection />
                <QuoteChecklistSection />
                <CustomerFitSection />
                <LondonCoverageSection />
                <RelatedServicesSection />
                <TestimonialsWrapper />
                <FinalCtaSection />
                <FaqSection />

                <MainFooter locations={londonLocations} />
            </main>
        </>
    );
}