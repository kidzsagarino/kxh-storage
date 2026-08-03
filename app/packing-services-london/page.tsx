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

const pageUrl = "https://kxhlogistics.co.uk/packing-services-london";
const parentPageUrl = "https://kxhlogistics.co.uk/logistics-moving-london";
const quoteUrl = "/get-a-quote?service=moving";

export const metadata: Metadata = {
    title: "Packing Services London | Business & Office Packing | KXH",
    description:
        "Professional packing services in London for offices, businesses, moves, storage and relocations, including materials, labelling and organised handling.",
    applicationName: "KXH Storage & Logistics",
    category: "Moving and packing services",
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
        title: "Packing Services London | Business & Office Packing | KXH",
        description:
            "Managed packing support for London businesses, offices, relocations, storage projects and commercial moves.",
        images: [
            {
                url: "/images/packing-services/packing-services-london.webp",
                width: 1200,
                height: 630,
                alt: "Professional business packing team preparing office items for a London move",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Packing Services London | Business & Office Packing | KXH",
        description:
            "Professional packing for London offices, businesses, relocations and storage projects.",
        images: ["/images/packing-services/packing-services-london.webp"],
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
    "Professional packing team",
    "Packing materials supplied",
    "Clear labelling",
    "Move-ready organisation",
];

const differentiationItems: CardItem[] = [
    {
        title: "Not Just Box Delivery",
        description:
            "KXH can provide a practical packing service rather than simply leaving materials for your team to handle.",
    },
    {
        title: "Not Unplanned Labour",
        description:
            "The packing scope can be agreed around rooms, departments, item types, dates and access requirements.",
    },
    {
        title: "Not Residential-Only Packing",
        description:
            "The service is designed for offices, commercial premises, storage projects, relocations and business operations.",
    },
    {
        title: "Managed Packing Workflow",
        description:
            "Materials, packing, labelling, handling and handover can be coordinated as part of a wider move or storage project.",
    },
];

const customerProblems: CardItem[] = [
    {
        title: "Your Team Has No Time to Pack",
        description:
            "Reduce disruption by moving packing work away from employees who need to remain focused on business operations.",
    },
    {
        title: "The Move Has Too Many Item Types",
        description:
            "Organise documents, equipment, stock, office contents, furniture components and mixed business items into a clear packing plan.",
    },
    {
        title: "Boxes Are Poorly Labelled",
        description:
            "Avoid unclear cartons, mixed departments and lost context by using agreed labels, room references and handling notes.",
    },
    {
        title: "Fragile Items Need More Care",
        description:
            "Identify screens, glass, artwork, equipment and delicate items that require additional protection or separate handling.",
    },
    {
        title: "The New Site Needs Phased Unpacking",
        description:
            "Pack by floor, team, room or project so items can be delivered and unpacked in a more useful sequence.",
    },
    {
        title: "Storage Items Need Separation",
        description:
            "Separate items going to storage from those going directly to a new office, branch, warehouse or project site.",
    },
    {
        title: "The Timeline Is Tight",
        description:
            "Plan packing activity around access windows, contractor schedules, move dates and business-critical deadlines.",
    },
    {
        title: "You Need One Coordinated Provider",
        description:
            "Connect packing with moving, storage, collection, inventory organisation and return delivery through one operational workflow.",
    },
];

const processSteps: CardItem[] = [
    {
        title: "Scope the Project",
        description:
            "Tell us what needs packing, the premises involved, item types, access conditions, timing and any storage or relocation requirements.",
    },
    {
        title: "Plan Materials & Labels",
        description:
            "Agree suitable boxes, protective materials, labels, department references, room codes and handling instructions.",
    },
    {
        title: "Pack & Organise",
        description:
            "Items are packed according to the agreed scope and grouped for moving, storage, phased delivery or later unpacking.",
    },
    {
        title: "Handover for Move or Storage",
        description:
            "Packed items are prepared for collection, loading, transport, warehouse storage or delivery to the destination.",
    },
];

const postPackingSteps: CardItem[] = [
    {
        title: "Label Review",
        description:
            "Packed cartons and protected items are checked against the agreed room, department, project or destination references.",
    },
    {
        title: "Move or Storage Separation",
        description:
            "Items can be separated into direct-delivery, storage, phased-return or special-handling groups.",
    },
    {
        title: "Collection Readiness",
        description:
            "Packed items are positioned and organised for the planned loading and collection workflow where practical.",
    },
    {
        title: "Destination Handover",
        description:
            "Labels and grouping support more organised delivery, placement and unpacking at the receiving site.",
    },
];

const pricingFactors: CardItem[] = [
    {
        title: "Volume of Items",
        description:
            "The number of rooms, workstations, cartons, equipment items, stock units and business contents requiring packing.",
    },
    {
        title: "Packing Materials",
        description:
            "The type and quantity of boxes, tape, wrapping, protective materials, labels and specialist packing supplies required.",
    },
    {
        title: "Item Complexity",
        description:
            "Fragile, heavy, awkward, high-value or unusually shaped items may require additional preparation and handling.",
    },
    {
        title: "Access & Timing",
        description:
            "Floor level, lifts, parking, loading restrictions, working hours, security procedures and project schedule.",
    },
    {
        title: "Labelling & Organisation",
        description:
            "The level of room coding, department grouping, destination labelling, inventory references or phased delivery planning required.",
    },
    {
        title: "Related Services",
        description:
            "Whether packing is combined with moving, warehouse storage, archive handling, furniture storage or return delivery.",
    },
];

const preparationItems = [
    "Identify items that should not be packed",
    "Separate personal belongings from business contents",
    "Confirm departments, rooms and destination areas",
    "Flag fragile, valuable or restricted items",
    "Provide access, lift and loading information",
    "Identify items going into storage",
    "Confirm IT or specialist-equipment responsibilities",
    "Nominate a project contact for decisions",
];

const packingTypes = [
    "Office contents",
    "Desk contents",
    "Files and documents",
    "Books and manuals",
    "IT accessories",
    "Monitors and screens",
    "Small office equipment",
    "Retail stock",
    "Marketing materials",
    "Samples and displays",
    "Kitchen and breakroom items",
    "Meeting-room contents",
    "Reception items",
    "Archive boxes",
    "Project materials",
    "Decor and artwork",
    "Furniture components",
    "Storage-bound items",
    "Showroom contents",
    "Commercial move cartons",
];

const industries: CardItem[] = [
    {
        title: "Offices & Professional Services",
        description:
            "Workstations, files, equipment, meeting rooms, reception areas, kitchens and general office contents.",
    },
    {
        title: "Legal & Financial Firms",
        description:
            "Files, records, office contents, equipment and departmental materials requiring clear references and controlled handling.",
    },
    {
        title: "Schools & Universities",
        description:
            "Classroom contents, books, files, departmental materials, office equipment and items moving between sites or into storage.",
    },
    {
        title: "Healthcare",
        description:
            "Approved administrative, office and non-clinical items requiring careful organisation and clear destination labelling.",
    },
    {
        title: "Retail & Showrooms",
        description:
            "Stock, displays, samples, fixtures, office contents and campaign materials moving between stores, storage and project sites.",
    },
    {
        title: "Hospitality",
        description:
            "Office, reception, back-of-house, decor, small equipment and venue contents during refurbishment, closure or relocation.",
    },
    {
        title: "Property & Facilities Management",
        description:
            "Office contents, site materials, property files and operational items moving between managed locations.",
    },
    {
        title: "Construction & Fit-Out",
        description:
            "Project materials, samples, office contents and items requiring packing for phased moves, site handovers or storage.",
    },
    {
        title: "Architecture & Interior Design",
        description:
            "Samples, project materials, presentation items, office contents and carefully labelled client or project groups.",
    },
    {
        title: "Coworking & Flexible Workspace",
        description:
            "Shared-office contents, meeting-room items, supplies and move-ready packing during floor or tenant changes.",
    },
    {
        title: "Charities",
        description:
            "Office contents, campaign materials, donated items and operational supplies requiring practical packing and transport support.",
    },
    {
        title: "Government Contractors",
        description:
            "Project, office and site contents requiring organised packing for moves, storage or phased deployment.",
    },
];

const useCases: CardItem[] = [
    {
        title: "Office Relocation",
        description:
            "Pack departments, workstations, files, equipment and shared areas for a coordinated office move.",
    },
    {
        title: "Temporary Storage",
        description:
            "Pack items for warehouse storage during refurbishment, lease changes, project delays or phased moves.",
    },
    {
        title: "Office Refurbishment",
        description:
            "Clear rooms and protect contents before contractors begin, then support phased return when areas are ready.",
    },
    {
        title: "Business Downsizing",
        description:
            "Separate items for the new office, storage, disposal, resale or transfer to another branch.",
    },
    {
        title: "Multiple-Site Consolidation",
        description:
            "Use site, department and destination labels when packing contents from several business locations.",
    },
    {
        title: "Archive Moves",
        description:
            "Pack physical records, files and document boxes using agreed references before storage or relocation.",
    },
    {
        title: "Retail or Showroom Change",
        description:
            "Pack displays, samples, stock and operational contents during store closure, relocation or refurbishment.",
    },
    {
        title: "Project Handover",
        description:
            "Prepare equipment, materials, samples and project contents for transport, storage or transfer to the next site.",
    },
];

const comparisonRows = [
    {
        category: "Planning",
        selfPacked: "Your team decides materials, labels and sequence",
        labourOnly: "Labour may be supplied without a detailed packing system",
        kxh: "Packing can be scoped around rooms, departments, destinations and related services",
    },
    {
        category: "Materials",
        selfPacked: "Your business sources boxes and protection",
        labourOnly: "Materials may be separate or limited",
        kxh: "Materials can be planned as part of the packing scope",
    },
    {
        category: "Labelling",
        selfPacked: "Depends on internal consistency",
        labourOnly: "May be basic unless specifically instructed",
        kxh: "Labels can follow agreed room, department, project or destination references",
    },
    {
        category: "Fragile Items",
        selfPacked: "Handled by internal staff",
        labourOnly: "Depends on the labour provider and instructions",
        kxh: "Special handling requirements can be identified during planning",
    },
    {
        category: "Storage Separation",
        selfPacked: "Your team separates items",
        labourOnly: "May require additional supervision",
        kxh: "Items can be grouped for direct delivery, storage or phased return",
    },
    {
        category: "Move Integration",
        selfPacked: "Packing and moving are managed separately",
        labourOnly: "Often limited to labour",
        kxh: "Packing can connect with collection, moving, storage and delivery",
    },
    {
        category: "Business Disruption",
        selfPacked: "Employees spend time packing",
        labourOnly: "Some management remains with your team",
        kxh: "A managed plan can reduce internal workload and confusion",
    },
    {
        category: "Project Support",
        selfPacked: "Internal responsibility",
        labourOnly: "Varies by provider",
        kxh: "Suitable for managed office, storage and commercial-move projects",
    },
];

const chooseKxh: CardItem[] = [
    {
        title: "Business-Focused Packing",
        description:
            "Packing plans can be shaped around offices, departments, commercial premises, storage projects and operational requirements.",
    },
    {
        title: "Materials Planning",
        description:
            "The service can account for boxes, wrapping, tape, labels and other materials needed for the agreed item types.",
    },
    {
        title: "Clear Organisation",
        description:
            "Items can be grouped using rooms, departments, floors, destinations, projects or supplied inventory references.",
    },
    {
        title: "Move & Storage Integration",
        description:
            "Packing can connect directly with KXH moving, collection, warehouse storage and return-delivery workflows.",
    },
    {
        title: "Practical Handling",
        description:
            "Fragile, heavy, awkward or destination-sensitive items can be identified before packing begins.",
    },
    {
        title: "One Operational Partner",
        description:
            "Reduce handoffs by coordinating packing with broader business-storage and relocation services.",
    },
];

const labellingBenefits = [
    "Room and floor references",
    "Department grouping",
    "Destination labels",
    "Storage vs direct-delivery separation",
    "Fragile-item notes",
    "Project or client references",
];

const existingSystems = [
    "Existing room plans",
    "Department lists",
    "Move spreadsheets",
    "Asset references",
    "Project codes",
    "Storage manifests",
    "Destination floor plans",
    "Colour-coded label systems",
];

const typicalPackingRequests = [
    "Full office packing",
    "Department-by-department packing",
    "Storage-only packing",
    "Archive and file packing",
    "Retail stock packing",
    "IT accessory packing",
    "Showroom packing",
    "Refurbishment packing",
    "Partial office packing",
    "Move-day packing support",
];

const quoteChecklist = [
    "Approximate number of rooms or workstations",
    "Premises type and collection postcode",
    "Floor level, lifts and loading access",
    "Main item categories",
    "Fragile or specialist items",
    "Required packing date",
    "Storage or destination requirements",
    "Whether unpacking support is needed",
];

const customerFit = [
    "You need office or commercial packing",
    "You want to reduce staff disruption",
    "You need materials and labelling support",
    "You are moving, refurbishing or storing items",
    "You need storage and direct-delivery groups separated",
    "You prefer one provider for packing, moving and storage",
];

const relatedServices: LinkCardItem[] = [
    {
        title: "Moving Services London",
        href: "/logistics-moving-london",
        description:
            "The parent KXH moving service for packing, loading, transport, delivery, removals and optional storage across London.",
    },
    {
        title: "Office Relocation London",
        href: "/office-relocation-london",
        description:
            "Managed office moving support for businesses relocating, consolidating or changing premises.",
    },
    {
        title: "Business Storage London",
        href: "/business-storage-london",
        description:
            "Managed storage for furniture, archives, stock, equipment and other business contents.",
    },
    {
        title: "Furniture Storage London",
        href: "/furniture-storage-london",
        description:
            "Collection, warehouse storage, inventory organisation and return delivery for business furniture.",
    },
    {
        title: "Archive Storage London",
        href: "/archive-storage-london",
        description:
            "Managed collection, organisation, storage and retrieval for physical business archives.",
    },
    {
        title: "Commercial Storage London",
        href: "/commercial-storage-london",
        description:
            "Flexible managed storage for commercial contents, materials, equipment and operational items.",
    },
    {
        title: "Warehouse Storage London",
        href: "/warehouse-storage-london",
        description:
            "Managed warehouse capacity for business goods, equipment, stock and packed contents.",
    },
    {
        title: "Inventory Management London",
        href: "/inventory-management-london",
        description:
            "Physical inventory organisation, item records and selected-item handling support.",
    },
];

const londonAreas = [
    { name: "Tower Hamlets", href: "/logistics-moving-london/tower-hamlets" },
    { name: "Camden", href: "/logistics-moving-london/camden" },
    { name: "Hackney", href: "/logistics-moving-london/hackney" },
    { name: "Lambeth", href: "/logistics-moving-london/lambeth" },
    { name: "Southwark", href: "/logistics-moving-london/southwark" },
    { name: "Westminster", href: "/logistics-moving-london/westminster" },
];

const faqs = [
    {
        question: "Do you provide office packing services in London?",
        answer:
            "Yes. KXH can provide packing support for offices, commercial premises, relocations, refurbishments, storage projects and other agreed business requirements across London.",
    },
    {
        question: "Do you supply packing materials?",
        answer:
            "Packing materials can be included in the agreed scope. The required boxes, wrapping, tape, labels and protective materials depend on the item types, quantity and handling requirements.",
    },
    {
        question: "Can you pack an entire office?",
        answer:
            "Yes. Full-office packing can be discussed for workstations, shared areas, meeting rooms, reception, files, small equipment, supplies and other approved business contents.",
    },
    {
        question: "Can you pack only part of an office?",
        answer:
            "Yes. The service can focus on selected departments, rooms, floors, item categories, storage-bound items or business-critical areas.",
    },
    {
        question: "Can items be labelled by room or department?",
        answer:
            "Yes. Labels can follow agreed rooms, floors, departments, projects, destinations, storage groups or other practical references supplied by your business.",
    },
    {
        question: "Can you pack fragile office items?",
        answer:
            "Fragile items can be discussed during planning. Screens, glass, artwork, decor and delicate equipment may require additional protection or separate handling depending on the item and condition.",
    },
    {
        question: "Do you pack IT equipment?",
        answer:
            "KXH can discuss packing approved IT-related items such as monitors, accessories and small office equipment. Your business should confirm any specialist disconnection, data-security or vendor requirements.",
    },
    {
        question: "Can you pack files and archives?",
        answer:
            "Yes. Files, document boxes and physical archives can be packed using agreed references, subject to confidentiality, handling and records-management requirements.",
    },
    {
        question: "Can packing be combined with storage?",
        answer:
            "Yes. Items can be packed and separated for direct delivery, temporary storage, longer-term storage or phased return as part of a wider KXH project.",
    },
    {
        question: "Can you help during an office refurbishment?",
        answer:
            "Yes. KXH can pack office contents before refurbishment, coordinate collection or storage and support return delivery once the relevant areas are ready.",
    },
    {
        question: "How much do packing services cost?",
        answer:
            "Pricing depends on item volume, labour, materials, access, timing, complexity, labelling requirements and whether the service is combined with moving or storage.",
    },
    {
        question: "How far in advance should packing be booked?",
        answer:
            "Booking lead time depends on project size, material requirements, access and the planned move or storage date. Larger or more complex projects should be discussed as early as practical.",
    },
    {
        question: "Do employees need to be present during packing?",
        answer:
            "A nominated business contact should usually be available for access, decisions and exceptions. The exact level of onsite supervision depends on the agreed project plan.",
    },
    {
        question: "Can you separate items for different destinations?",
        answer:
            "Yes. Items can be grouped and labelled for different offices, floors, departments, storage locations or project destinations where this is agreed before packing.",
    },
    {
        question: "Do you offer unpacking services?",
        answer:
            "Unpacking or placement requirements should be discussed during quotation. Availability and scope depend on the destination, access, item types and wider move plan.",
    },
    {
        question: "What should not be packed?",
        answer:
            "Personal belongings, hazardous materials, prohibited items, confidential items requiring specialist controls and anything outside the agreed scope should be identified before packing begins.",
    },
    {
        question: "Can you pack items from multiple London offices?",
        answer:
            "Yes. Multi-site packing can be discussed for consolidations, relocations or phased projects. Pricing and scheduling depend on the number of sites, access, volume and timing.",
    },
    {
        question: "What information is needed for a packing quote?",
        answer:
            "Useful details include the number of rooms or workstations, item types, photographs, access, floor level, lifts, packing date, fragile items and whether items are moving, entering storage or going to several destinations.",
    },
];

function ServiceJsonLd() {
    const serviceItems = [
        "Office packing",
        "Business packing",
        "Packing materials",
        "Labelling and organisation",
        "Storage preparation",
        "Move preparation",
    ];

    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Packing Services London",
        serviceType: "Professional Packing Service for Moves and Storage",
        isRelatedTo: {
            "@type": "Service",
            "@id": `${parentPageUrl}#service`,
            name: "Moving Services London",
            url: parentPageUrl,
        },
        url: pageUrl,
        description:
            "Professional packing services in London for offices, businesses, storage projects, relocations and commercial moves.",
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
            name: "Packing Services",
            itemListElement: serviceItems.map((name) => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name,
                },
            })),
        },
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
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

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function BreadcrumbJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kxhlogistics.co.uk" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://kxhlogistics.co.uk/services" },
            { "@type": "ListItem", position: 3, name: "Moving Services London", item: "https://kxhlogistics.co.uk/logistics-moving-london" },
            { "@type": "ListItem", position: 4, name: "Packing Services London", item: pageUrl },
        ],
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function WebPageJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Packing Services London",
        description:
            "Professional packing services in London for offices, businesses, relocations, storage projects and commercial moves.",
        mainEntity: { "@id": `${pageUrl}#service` },
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
                name: "Moving Services London",
            },
        ],
        about: { "@id": `${pageUrl}#service` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        primaryImageOfPage: {
            "@type": "ImageObject",
            url: "https://kxhlogistics.co.uk/images/packing-services/packing-services-london.webp",
            width: 1200,
            height: 800,
        },
        inLanguage: "en-GB",
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
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
            {description && <p className="mt-4 leading-7 text-slate-600">{description}</p>}
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
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
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
    { href: "#what-we-pack", label: "What we pack" },
    { href: "#labelling", label: "Labelling" },
    { href: "#coverage", label: "London coverage" },
    { href: "#faqs", label: "FAQs" },
];

function PageBreadcrumb() {
    return (
        <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-6xl overflow-x-auto px-5 pt-4 text-xs text-slate-500 sm:px-6 sm:pt-6 sm:text-sm lg:px-8"
        >
            <Link href="/" className="transition hover:text-emerald-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="transition hover:text-emerald-700">Services</Link>
            <span className="mx-2">/</span>
            <Link href="/logistics-moving-london" className="transition hover:text-emerald-700">
                Moving Services
            </Link>
            <span className="mx-2">/</span>
            <span aria-current="page" className="font-medium text-slate-700">
                Packing Services London
            </span>
        </nav>
    );
}

function PageSectionNav() {
    return (
        <nav aria-label="Packing services page sections" className="border-b border-slate-200 bg-white">
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
                    Professional Packing for London Moves
                </div>

                <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                    Packing Services London
                </h1>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                    Professional packing support for house moves, office relocations, commercial removals,
                    storage projects, refurbishments and other London moves.
                </p>

                <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                    KXH can supply materials, pack approved business contents, organise labels
                    and prepare items for moving, warehouse storage or phased delivery.
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
                        Get Packing Services Quote
                    </Link>
                    <a
                        href="tel:+447386277785"
                        className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2 sm:w-auto"
                    >
                        Call KXH
                    </a>
                </div>

                <p className="mt-4 text-sm text-slate-500">
                    Not sure how many boxes or rooms are involved? An estimate is enough to begin.
                </p>

                <div className="mt-6 flex justify-center">
                    <TrustpilotPill />
                </div>

                <div className="mt-12">
                    <Image
                        src="/images/moving-services/moving-services-hero.webp"
                        alt="Professional business packing team preparing office items for a London move"
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


function ParentServiceSection() {
    return (
        <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
                    <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Part of KXH Moving Services London
                            </p>
                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                                Add Professional Packing to Your London Move
                            </h2>
                            <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                                Packing Services London is a specialist service within
                                KXH&apos;s wider moving and removals offering. It can be booked
                                alongside office removals, commercial moves, house removals,
                                loading, transport, temporary storage and final delivery.
                            </p>
                        </div>
                        <Link
                            href="/logistics-moving-london"
                            className="inline-flex w-full justify-center rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 lg:w-auto"
                        >
                            Explore Moving Services London
                        </Link>
                    </div>
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
                    eyebrow="Managed Business Packing"
                    title="More Than Boxes and Tape"
                    description="KXH provides a structured packing service for business moves and storage projects rather than leaving employees to organise the entire process themselves."
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
                        Planning a Packing Project
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Good Packing Starts with the Destination Plan
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        The most effective packing projects begin by deciding what will move,
                        what will enter storage, which rooms or teams items belong to and how
                        the receiving site should be organised.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        KXH manages the agreed packing work. Your business remains responsible
                        for deciding what should be moved, retained, disposed of, restricted or
                        handled by specialist vendors.
                    </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                        Decisions to make before packing begins
                    </h3>
                    <ul className="mt-6 space-y-3 text-slate-700">
                        <li>✓ What is moving directly to the destination?</li>
                        <li>✓ What is going into storage?</li>
                        <li>✓ Which items should not be packed?</li>
                        <li>✓ Which teams or rooms need separate labels?</li>
                        <li>✓ Are there fragile or restricted items?</li>
                        <li>✓ Is phased delivery or unpacking required?</li>
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
                            Your Team Should Run the Business, Not Spend Days{" "}
                            <span className="text-emerald-700">Packing the Office</span>
                        </>
                    }
                    description="Reduce disruption, improve organisation and prepare items for moving or storage without relying entirely on internal staff."
                    maxWidth="3xl"
                />
                <SimpleCardGrid items={customerProblems} />
            </div>
        </section>
    );
}

function ProcessSection() {
    return (
        <section id="how-it-works" className="scroll-mt-24 border-b border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="How It Works"
                    title="Four Steps from Project Scope to Move-Ready Packing"
                    description="A managed process covering planning, materials, packing, labelling and handover for moving or storage."
                />
                <SimpleCardGrid items={processSteps} background="bg-slate-50" />
            </div>
        </section>
    );
}

function PostPackingSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="After Packing"
                    title="What Happens Once the Items Are Packed?"
                    description="The post-packing workflow prepares business contents for loading, storage, direct delivery or phased handover."
                    maxWidth="3xl"
                />
                <SimpleCardGrid items={postPackingSteps} background="bg-white" />
            </div>
        </section>
    );
}

function PricingSection() {
    return (
        <section id="pricing" className="scroll-mt-24 border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Flexible Packing Services Pricing"
                    title="A Quote Based on the Packing Work Required"
                    description="Packing is priced around item volume, materials, labour, access, complexity, timing and whether the service connects with moving or storage."
                    maxWidth="3xl"
                />

                <SimpleCardGrid items={pricingFactors} columns="lg:grid-cols-3" background="bg-slate-50" />

                <div className="mt-10 text-center">
                    <Link
                        href={quoteUrl}
                        className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Calculate Your Packing Services Quote
                    </Link>
                    <p className="mt-4 text-sm leading-6 text-slate-500">
                        No fixed price is published because every business move, storage project and packing scope is different.
                    </p>
                </div>
            </div>
        </section>
    );
}

function ManagedPackingSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <Image
                    src="/images/moving-services/moving-services-packing-loading.webp"
                    alt="Office packing team labelling business cartons for a London relocation"
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
                        Managed Packing Support
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Pack for the Move, Storage Plan and Receiving Site
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        KXH can pack approved business contents using agreed labels and groups
                        so the next step—moving, storage, delivery or unpacking—is easier to manage.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        The service can be combined with{" "}
                        <Link
                            href="/logistics-moving-london"
                            className="rounded-sm font-semibold text-emerald-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                        >
                            Moving & Storage London
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/business-storage-london"
                            className="rounded-sm font-semibold text-emerald-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                        >
                            Business Storage London
                        </Link>
                        .
                    </p>
                    <ul className="mt-7 space-y-3 text-slate-700">
                        <li>✓ Materials planning</li>
                        <li>✓ Room and department labels</li>
                        <li>✓ Storage and direct-delivery separation</li>
                        <li>✓ Fragile-item identification</li>
                        <li>✓ Move-ready organisation</li>
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
                    eyebrow="Preparing for Packing"
                    title="Help the Packing Team Work Efficiently"
                    description="A few decisions before packing day can reduce delays, avoid accidental packing and improve organisation at the destination."
                    maxWidth="3xl"
                />
                <ChecklistGrid items={preparationItems} />
            </div>
        </section>
    );
}

function WhatWePackSection() {
    return (
        <section id="what-we-pack" className="scroll-mt-24 bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="What We Can Pack"
                    title="Packing Support for Office, Commercial and Storage Projects"
                    description="KXH can discuss packing for a broad range of approved business contents, subject to item condition, confidentiality, handling requirements and project scope."
                    maxWidth="3xl"
                />
                <ChecklistGrid items={packingTypes} columns="lg:grid-cols-5" />
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
                    title="Packing Services Across Professional, Public and Commercial Sectors"
                    description="Different businesses have different item types, confidentiality requirements, destination plans and move schedules."
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
                    src="/images/moving-services/moving-services-student-move.webp"
                    alt="Packed and labelled office boxes prepared for a London business move"
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
                        eyebrow="Packing Service Use Cases"
                        title="Support Moves, Storage, Refurbishments and Business Change"
                        description="Professional packing can reduce disruption and improve organisation across a wide range of business projects."
                        maxWidth="3xl"
                    />
                </div>

                <SimpleCardGrid items={useCases} columns="lg:grid-cols-4" background="bg-white" />
            </div>
        </section>
    );
}

function ComparisonSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Choose the Right Packing Model"
                    title="Self Packing vs Labour-Only Help vs KXH Managed Packing"
                    description="The right approach depends on project size, internal resources, labelling requirements, item complexity and whether packing must connect with moving or storage."
                    maxWidth="3xl"
                />

                <div className="mt-10 hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white lg:block">
                    <div className="min-w-[980px]">
                        <div className="grid grid-cols-[0.7fr_1fr_1fr_1fr] bg-emerald-800 text-sm font-bold text-white">
                            <div className="p-5">Comparison</div>
                            <div className="border-l border-white/10 p-5">Self Packing</div>
                            <div className="border-l border-white/10 p-5">Labour-Only Help</div>
                            <div className="border-l border-white/10 p-5">KXH Managed Packing</div>
                        </div>

                        {comparisonRows.map((row) => (
                            <div
                                key={row.category}
                                className="grid grid-cols-[0.7fr_1fr_1fr_1fr] border-t border-slate-200 text-sm"
                            >
                                <div className="bg-slate-100 p-5 font-semibold text-slate-900">{row.category}</div>
                                <div className="border-l border-slate-200 p-5 leading-6 text-slate-600">{row.selfPacked}</div>
                                <div className="border-l border-slate-200 p-5 leading-6 text-slate-600">{row.labourOnly}</div>
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
                            <h3 className="bg-emerald-800 px-5 py-4 font-bold text-white">{row.category}</h3>
                            <div className="p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Self packing</p>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{row.selfPacked}</p>
                            </div>
                            <div className="border-t border-slate-200 p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Labour-only help</p>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{row.labourOnly}</p>
                            </div>
                            <div className="border-t border-emerald-100 bg-emerald-50 p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">KXH managed packing</p>
                                <p className="mt-2 text-sm font-medium leading-6 text-slate-900">✓ {row.kxh}</p>
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
                    eyebrow="Business Packing Partner"
                    title="Why London Businesses Choose KXH Storage & Logistics"
                    description="KXH combines packing with moving, collection, storage, inventory organisation and delivery, reducing the number of separate providers involved."
                    maxWidth="3xl"
                />
                <SimpleCardGrid items={chooseKxh} columns="lg:grid-cols-3" background="bg-white" />
            </div>
        </section>
    );
}

function LabellingSection() {
    return (
        <section id="labelling" className="scroll-mt-24 border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Packing Labels & Organisation
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Make Delivery and Unpacking Easier
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Good labels help teams understand where packed items came from,
                        where they are going and whether they should enter storage or be
                        delivered directly.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        The right system may use room numbers, departments, floors,
                        destinations, projects, clients, colour codes or a move spreadsheet.
                    </p>

                    <ChecklistGrid items={labellingBenefits} columns="lg:grid-cols-2" tone="emerald" />
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                        Labels should support the next action
                    </h3>
                    <p className="mt-5 leading-7 text-slate-700">
                        Before packing starts, decide whether each group is moving directly,
                        entering storage, returning later or going to a different destination.
                    </p>
                    <ul className="mt-6 space-y-3 text-slate-700">
                        <li>✓ Clear room and floor references</li>
                        <li>✓ Storage vs direct-delivery groups</li>
                        <li>✓ Fragile and special-handling notes</li>
                        <li>✓ Department and project separation</li>
                        <li>✓ Destination-ready organisation</li>
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
                        Existing Move Plans
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Use the References Your Team Already Understands
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Businesses often already have floor plans, department lists,
                        project codes, asset references or move spreadsheets. Where suitable,
                        these can guide the packing and labelling workflow.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        KXH does not replace your internal move governance. The goal is to
                        connect useful existing references with the physical packing work.
                    </p>
                </div>

                <ChecklistGrid items={existingSystems} columns="lg:grid-cols-2" tone="emerald" />
            </div>
        </section>
    );
}

function TypicalRequestsSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Typical Packing Requests"
                    title="Choose the Level of Packing Support Your Project Needs"
                    description="Packing may cover the entire office, selected departments, storage-bound items or specific areas that need additional support."
                    maxWidth="3xl"
                />
                <ChecklistGrid items={typicalPackingRequests} columns="lg:grid-cols-5" />

                <div className="mt-10 text-center">
                    <Link
                        href={quoteUrl}
                        className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Discuss Your Packing Requirements
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
                        Prepare Your Packing Quote
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        What Information Helps Us Scope the Service?
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        A clear quote depends on project size, item types, access, materials,
                        timing and whether the packed contents are moving, entering storage
                        or going to several destinations.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Estimates and photographs are useful when a complete inventory is not available.
                    </p>
                    <Link
                        href={quoteUrl}
                        className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Request a Packing Services Quote
                    </Link>
                </div>

                <ChecklistGrid items={quoteChecklist} columns="lg:grid-cols-2" />
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
                        Are KXH Packing Services Right for Your Business?
                    </h2>
                    <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                        KXH is suited to organisations that want structured business packing
                        connected with moving, storage, phased delivery or commercial relocation.
                    </p>

                    <ChecklistGrid items={customerFit} columns="lg:grid-cols-2" />
                </div>
            </div>
        </section>
    );
}

function LondonCoverageSection() {
    return (
        <section id="coverage" className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="London Coverage"
                    title="Business Packing Services Across London"
                    description="KXH supports office, commercial, storage and relocation packing projects across Greater London."
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
                                Packing, moving and storage support for offices and businesses.
                            </p>
                            <span className="mt-4 inline-block text-sm font-semibold text-emerald-700">
                                Learn more →
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-14 border-t border-slate-200 pt-10">
                    <h3 className="text-lg font-bold text-slate-900">Browse All London Locations</h3>
                    <p className="mt-3 text-slate-600">Explore moving and storage coverage throughout Greater London.</p>
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                        {londonLocations.map((location) => (
                            <Link
                                key={location.slug}
                                href={`/logistics-moving-london/${location.slug}`}
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
                    title="Related Moving, Removal and Storage Services"
                    description="Connect professional packing with house removals, office relocation, commercial moving, temporary storage and final delivery."
                    maxWidth="3xl"
                />

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {relatedServices.map((service) => (
                        <Link
                            key={service.href}
                            href={service.href}
                            className={
                                service.href === "/logistics-moving-london"
                                    ? "rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-6 shadow-sm"
                                    : "rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-emerald-300 hover:bg-white"
                            }
                        >
                            {service.href === "/logistics-moving-london" && (
                                <span className="mb-3 inline-flex rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">
                                    Main Moving Services Page
                                </span>
                            )}
                            <h3 className="font-semibold text-slate-900">{service.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                            <span className="mt-4 inline-block text-xs font-semibold text-emerald-700">Learn more →</span>
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
                    Plan Your Packing Project
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
                    Tell Us What Needs Packing and Where It Is Going
                </h2>
                <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
                    Share an estimated number of rooms or workstations, the packing date,
                    item types and whether the contents are moving, entering storage or
                    going to several destinations.
                </p>

                <div className="mx-auto mt-7 grid max-w-xl gap-3 text-left sm:grid-cols-2">
                    {[
                        "Approximate project size",
                        "Packing postcode",
                        "Required date",
                        "Move or storage plan",
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
                    Not sure how many boxes are needed? An estimate is enough to start.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href={quoteUrl}
                        className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800 sm:w-auto sm:px-8"
                    >
                        Plan Your Packing Services Quote
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
        <section id="faqs" className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-12">
            <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    Packing Services FAQs
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
                            <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function PackingServicesLondonPage() {
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
                <ParentServiceSection />
                <DifferentiationSection />
                <ProjectGuidanceSection />
                <ProblemsSection />
                <ProcessSection />
                <PostPackingSection />
                <PricingSection />
                <ManagedPackingSection />
                <PreparationSection />
                <WhatWePackSection />
                <IndustriesSection />
                <UseCasesSection />
                <ComparisonSection />
                <WhyKxhSection />
                <LabellingSection />
                <ExistingSystemsSection />
                <TypicalRequestsSection />
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