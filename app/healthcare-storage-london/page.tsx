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

const pageUrl = "https://kxhlogistics.co.uk/healthcare-storage-london";
const quoteUrl = "/get-a-quote?service=storage";
const parentPageUrl = "https://kxhlogistics.co.uk/business-storage-london";

export const metadata: Metadata = {
    title: "Healthcare Storage London | Records, Furniture & Equipment | KXH",
    description:
        "Managed healthcare storage in London for records, furniture and reviewed non-clinical equipment, with collection, organisation, retrieval and return delivery.",
    applicationName: "KXH Storage & Logistics",
    category: "Healthcare business storage",
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
        title: "Healthcare Storage London | Records, Furniture & Equipment | KXH",
        description:
            "Managed offsite storage for healthcare records, furniture and suitable non-clinical equipment across London.",
        images: [
            {
                url: "/images/healthcare-storage/healthcare-storage-london.webp",
                width: 1200,
                height: 630,
                alt: "Organised healthcare business items inside a managed London warehouse",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Healthcare Storage London | Records, Furniture & Equipment | KXH",
        description:
            "Managed healthcare storage with collection, inventory organisation, retrieval and return delivery across London.",
        images: ["/images/healthcare-storage/healthcare-storage-london.webp"],
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
    "Collection from healthcare premises",
    "Managed warehouse storage",
    "Inventory organisation",
    "Retrieval & return delivery",
];

const differentiationItems: CardItem[] = [
    {
        title: "Not Self Storage",
        description:
            "Your team does not need to hire vehicles, move items into a unit, visit the site or manage access.",
    },
    {
        title: "Not Clinical Waste Storage",
        description:
            "KXH does not present this service as storage for clinical waste, medicines, controlled substances or hazardous materials.",
    },
    {
        title: "Not Digital Records Management",
        description:
            "The service concerns physical items such as suitable records, furniture, non-clinical equipment and operational supplies.",
    },
    {
        title: "Managed Healthcare Storage",
        description:
            "Collection, organisation, warehouse storage, retrieval and return delivery can be coordinated as one physical logistics service.",
    },
];

const customerProblems: CardItem[] = [
    {
        title: "Storage Rooms Are Overcrowded",
        description:
            "Move inactive records, surplus furniture, boxed supplies and reviewed equipment out of valuable operational space.",
    },
    {
        title: "A Clinic or Practice Is Relocating",
        description:
            "Store physical items between premises, during phased moves or while the receiving site is prepared.",
    },
    {
        title: "A Refurbishment Needs Clear Space",
        description:
            "Remove furniture, records and suitable non-clinical items before contractors begin and arrange phased return later.",
    },
    {
        title: "Inactive Records Still Need Access",
        description:
            "Store suitable paper records offsite while maintaining a practical retrieval and return process.",
    },
    {
        title: "Equipment Is Awaiting Deployment",
        description:
            "Hold suitable non-clinical equipment, room contents and operational items until the destination is ready.",
    },
    {
        title: "Different Sites Hold Separate Items",
        description:
            "Consolidate items from clinics, offices, care settings, former premises, project sites or administrative locations.",
    },
    {
        title: "Inventory Is Poorly Organised",
        description:
            "Replace mixed boxes and unclear labels with agreed item references, categories, departments or supplied manifests.",
    },
    {
        title: "Self Storage Creates More Work",
        description:
            "Avoid asking staff to arrange vans, move bulky items, search through units and coordinate repeated return trips.",
    },
];

const processSteps: CardItem[] = [
    {
        title: "Request a Quote",
        description:
            "Tell us what needs storing, the approximate volume, collection address, expected storage period and retrieval requirements.",
    },
    {
        title: "Pre-collection Item Review",
        description:
            "We review item types, access, packaging, handling, confidentiality expectations and any restricted categories before collection.",
    },
    {
        title: "Collect & Organise",
        description:
            "Suitable items are collected and organised using agreed labels, departments, projects, item references or supplied manifests.",
    },
    {
        title: "Store, Retrieve & Return",
        description:
            "Items remain in managed warehouse storage and can be retrieved or returned according to the agreed service.",
    },
];

const lifecycleSteps: CardItem[] = [
    {
        title: "Items Become Inactive",
        description:
            "Records, furniture, equipment or supplies are no longer needed in daily operations but may still need to be retained.",
    },
    {
        title: "Collection Is Planned",
        description:
            "KXH reviews volume, access, item suitability, handling requirements and the agreed collection schedule.",
    },
    {
        title: "Items Are Registered",
        description:
            "Labels, departments, projects, box references, inventory records or supplied manifests are confirmed.",
    },
    {
        title: "Items Enter Storage",
        description:
            "Suitable items are placed into managed warehouse storage and separated according to the agreed organisation.",
    },
    {
        title: "Items Are Retrieved",
        description:
            "Selected boxes, furniture groups, equipment or supplies can be requested using agreed references.",
    },
    {
        title: "Items Are Returned",
        description:
            "Retrieved items can be delivered to an agreed site, department, project or receiving location.",
    },
    {
        title: "Storage Is Reviewed",
        description:
            "The organisation can decide whether items should remain stored, be returned, transferred or handled through another approved service.",
    },
];

const pricingFactors: CardItem[] = [
    {
        title: "Storage Volume",
        description:
            "The quantity, dimensions, condition and type of records, furniture, equipment, cartons or operational supplies.",
    },
    {
        title: "Collection & Access",
        description:
            "Collection postcode, floor level, lifts, loading access, parking restrictions, building procedures and handling distance.",
    },
    {
        title: "Handling Requirements",
        description:
            "Whether items need protection, dismantling, special grouping, additional labour or other agreed handling.",
    },
    {
        title: "Storage Duration",
        description:
            "Temporary, project-based, rolling or longer-term requirements and any expected review dates.",
    },
    {
        title: "Inventory Organisation",
        description:
            "The level of box referencing, department grouping, asset identification, manifest checking or category organisation required.",
    },
    {
        title: "Retrieval & Delivery",
        description:
            "The likely frequency, urgency, quantity, destination and handling requirements for future returns.",
    },
];

const suitabilityItems = [
    "Confirm whether items are clinical or non-clinical",
    "Identify confidential paper records",
    "Separate medicines and restricted substances",
    "Flag hazardous, contaminated or temperature-sensitive items",
    "Provide existing item lists or manifests",
    "Explain handling and access restrictions",
    "Confirm likely retrieval requirements",
    "Nominate authorised business contacts",
];

const storedItems = [
    "Administrative records",
    "Suitable physical healthcare records",
    "Finance and accounting files",
    "HR and personnel files",
    "Governance documentation",
    "Supplier and procurement records",
    "Office furniture",
    "Waiting-room furniture",
    "Non-clinical equipment",
    "Mobility-aid accessories",
    "Training materials",
    "Exhibition and outreach materials",
    "Boxed operational supplies",
    "Project documentation",
    "Property and facilities records",
    "Uniforms and textiles",
    "Marketing materials",
    "Archive boxes",
    "Room contents",
    "Furniture awaiting installation",
];

const industries: CardItem[] = [
    {
        title: "Private Clinics & GP Practices",
        description:
            "Suitable records, office contents, waiting-room furniture, non-clinical equipment and operational supplies.",
    },
    {
        title: "Dental Practices & Surgeries",
        description:
            "Administrative records, furniture, boxed supplies, office equipment and items held during moves or refurbishments.",
    },
    {
        title: "Care Providers",
        description:
            "Office records, training materials, furniture, reviewed supplies and non-clinical operational items.",
    },
    {
        title: "Healthcare Suppliers",
        description:
            "Approved stock, samples, displays, packaging, office contents and equipment awaiting deployment or collection.",
    },
    {
        title: "Medical Administration Offices",
        description:
            "Administrative files, governance records, furniture and non-clinical equipment requiring managed offsite storage.",
    },
    {
        title: "Therapy & Wellness Practices",
        description:
            "Furniture, office contents, reviewed supplies, files and materials held during relocation or refurbishment.",
    },
    {
        title: "Healthcare Charities",
        description:
            "Campaign materials, records, furniture, event items and reviewed supplies requiring managed storage.",
    },
    {
        title: "Training Providers",
        description:
            "Course materials, furniture, display equipment, records and items used across multiple locations.",
    },
    {
        title: "Healthcare Contractors",
        description:
            "Project files, reviewed equipment, furniture, site materials and operational items between contracts or locations.",
    },
    {
        title: "Healthcare Estates & Facilities Teams",
        description:
            "Furniture, room contents, maintenance records, project items and reviewed equipment during site changes.",
    },
    {
        title: "Healthcare Property Operators",
        description:
            "Furniture, administrative records and reviewed site contents during refurbishment, closure or transition.",
    },
    {
        title: "Community & Outpatient Health Organisations",
        description:
            "Records, outreach materials, office furniture, training items and reviewed supplies across several locations.",
    },
];

const useCases: CardItem[] = [
    {
        title: "Clinic Relocation",
        description:
            "Store suitable items between sites and coordinate phased delivery to the new premises.",
    },
    {
        title: "Refurbishment Storage",
        description:
            "Clear furniture, records and reviewed equipment before work begins and return items when rooms are ready.",
    },
    {
        title: "Records Overflow",
        description:
            "Move inactive paper records out of office space while maintaining an agreed retrieval workflow.",
    },
    {
        title: "Equipment Awaiting Deployment",
        description:
            "Hold suitable non-clinical equipment until installation, allocation or destination access is confirmed.",
    },
    {
        title: "Multiple-Site Consolidation",
        description:
            "Bring together items from clinics, offices, stores, former sites or project locations.",
    },
    {
        title: "Temporary Closure",
        description:
            "Store agreed contents while a site is closed, refurbished, transferred or awaiting a new lease.",
    },
    {
        title: "Furniture Surplus",
        description:
            "Keep reusable waiting-room, office and administrative furniture without filling active clinical space.",
    },
    {
        title: "Project Storage",
        description:
            "Hold reviewed project materials, records, displays and equipment between phases or locations.",
    },
];

const comparisonRows = [
    {
        category: "Collection",
        selfStorage: "Your team arranges vehicles, labour and loading",
        warehouseRental: "Your organisation manages the move into rented space",
        kxh: "KXH can coordinate collection from agreed London healthcare premises",
    },
    {
        category: "Pre-collection Item Review",
        selfStorage: "Your organisation decides what can enter the unit",
        warehouseRental: "Your team manages item acceptance and restrictions",
        kxh: "Item types and restrictions can be reviewed before collection",
    },
    {
        category: "Inventory",
        selfStorage: "Your team creates and maintains all records",
        warehouseRental: "Your organisation operates its own inventory process",
        kxh: "Items can be organised around agreed references, categories and manifests",
    },
    {
        category: "Retrieval",
        selfStorage: "Staff visit the unit and search for items",
        warehouseRental: "Your staff or contractors retrieve the items",
        kxh: "Selected suitable items can be requested using agreed references",
    },
    {
        category: "Delivery",
        selfStorage: "Your organisation arranges return transport",
        warehouseRental: "Delivery is managed separately",
        kxh: "Return delivery can be coordinated to an agreed London site",
    },
    {
        category: "Handling",
        selfStorage: "All handling is your responsibility",
        warehouseRental: "Your organisation manages labour and movement",
        kxh: "Collection, handling, storage and return can be coordinated together",
    },
    {
        category: "Business Support",
        selfStorage: "Space only",
        warehouseRental: "Space with your own operation",
        kxh: "Storage can connect with relocation, inventory and shredding services",
    },
    {
        category: "Flexibility",
        selfStorage: "Flexible access but high internal workload",
        warehouseRental: "Best suited to organisations running their own warehouse process",
        kxh: "Suitable for healthcare organisations needing managed physical logistics",
    },
];

const chooseKxh: CardItem[] = [
    {
        title: "Managed Collection",
        description:
            "KXH can collect suitable healthcare records, furniture, equipment and supplies from agreed London premises.",
    },
    {
        title: "Pre-collection Item Review",
        description:
            "Restricted, hazardous, clinical, pharmaceutical or temperature-sensitive items should be identified before collection.",
    },
    {
        title: "Organised Warehouse Storage",
        description:
            "Items can be grouped around departments, sites, projects, item types, references or supplied manifests.",
    },
    {
        title: "Selected Retrieval",
        description:
            "Request reviewed boxes, furniture groups, equipment or supplies without returning the full stored collection.",
    },
    {
        title: "Return Delivery",
        description:
            "Retrieved items can be delivered to an agreed clinic, office, project site or receiving location.",
    },
    {
        title: "Wider Business Support",
        description:
            "Healthcare storage can connect with office relocation, archive storage, inventory organisation and document shredding.",
    },
];

const inventoryBenefits = [
    "Box and item references",
    "Department grouping",
    "Site and project grouping",
    "Manifest-based organisation",
    "Selected-item retrieval",
    "Return-delivery coordination",
];

const existingSystems = [
    "Existing box numbers",
    "Department references",
    "Asset registers",
    "Excel inventories",
    "Project codes",
    "Site or room labels",
    "Existing barcode labels",
    "Paper or digital manifests",
];

const retrievalRequests = [
    "Administrative records",
    "HR files",
    "Finance documents",
    "Governance records",
    "Waiting-room furniture",
    "Office furniture",
    "Training materials",
    "Project equipment",
    "Boxed supplies",
    "Full site returns",
];

const quoteChecklist = [
    "Approximate item volume",
    "Collection postcode and floor level",
    "Lift, loading and parking details",
    "Item categories and restrictions",
    "Existing labels or manifests",
    "Expected storage duration",
    "Retrieval frequency",
    "Delivery destination and access",
];

const customerFit = [
    "You need reviewed healthcare items collected",
    "You need flexible offsite storage",
    "You need selected items retrieved later",
    "You are moving or refurbishing a healthcare site",
    "You need records, furniture or supplies organised",
    "You prefer a managed service over operating a unit",
];

const preCollectionChecks = [
    "Confirm authorised project contacts",
    "Review collection access and loading restrictions",
    "Check packaging and item condition",
    "Identify restricted or specialist-storage items",
    "Agree box, asset or department references",
    "Confirm confidentiality and handling expectations",
    "Define likely retrieval and delivery workflows",
    "Separate records-led, furniture-led and mixed requirements",
];

const typicalProjects: CardItem[] = [
    {
        title: "Practice Refurbishment",
        description:
            "Temporary storage for reviewed records, office furniture and suitable non-clinical contents while rooms are cleared and upgraded.",
    },
    {
        title: "Dental Practice Relocation",
        description:
            "Collection, temporary storage and phased return of administrative records, furniture and agreed business contents between premises.",
    },
    {
        title: "Administrative Records Overflow",
        description:
            "Offsite storage for inactive physical records where office or clinic space is needed for current operations.",
    },
    {
        title: "Care Provider Consolidation",
        description:
            "Bring together furniture, records, training materials and suitable operational items from several offices or locations.",
    },
    {
        title: "Healthcare Training Centre Storage",
        description:
            "Store course materials, furniture, display items and reviewed equipment between programmes or venue changes.",
    },
    {
        title: "Equipment Awaiting Deployment",
        description:
            "Hold reviewed non-clinical equipment and project items until a receiving site, room or installation date is ready.",
    },
];

const offsiteStorageReasons: CardItem[] = [
    {
        title: "Protect Active Workspace",
        description:
            "Move inactive records, surplus furniture and reviewed equipment out of consultation, office, storage and circulation areas.",
    },
    {
        title: "Support Refurbishment",
        description:
            "Clear rooms before contractors begin and return selected items once each area is ready.",
    },
    {
        title: "Consolidate Several Sites",
        description:
            "Bring together suitable contents from clinics, offices, training centres and former premises.",
    },
    {
        title: "Manage Inactive Records",
        description:
            "Keep physical records offsite while maintaining agreed references for later retrieval.",
    },
    {
        title: "Hold Items Between Projects",
        description:
            "Store reviewed furniture, supplies and non-clinical equipment until the next destination is ready.",
    },
    {
        title: "Reduce Internal Handling",
        description:
            "Avoid asking healthcare staff to arrange vans, operate storage units and manage repeated collection trips.",
    },
];

const retrievalWorkflow: CardItem[] = [
    {
        title: "Identify the Required Items",
        description:
            "Use agreed box numbers, asset references, departments, sites, projects or manifest entries.",
    },
    {
        title: "Submit an Authorised Request",
        description:
            "A nominated contact provides the references, destination and required return details.",
    },
    {
        title: "KXH Retrieves the Items",
        description:
            "The requested boxes, furniture group, equipment or supplies are located using the agreed storage references.",
    },
    {
        title: "Arrange Return Delivery",
        description:
            "Retrieved items can be delivered to the agreed site while the remaining contents stay in storage.",
    },
];

const relatedServices: LinkCardItem[] = [
    {
        title: "Business Storage London",
        href: "/business-storage-london",
        description:
            "The parent KXH service for healthcare contents, furniture, equipment, archives and other managed business-storage requirements.",
    },
    {
        title: "Archive Storage London",
        href: "/archive-storage-london",
        description:
            "Managed collection, organisation, storage and retrieval for physical business archives and document boxes.",
    },
    {
        title: "Furniture Storage London",
        href: "/furniture-storage-london",
        description:
            "Collection, warehouse storage, inventory organisation and return delivery for office and commercial furniture.",
    },
    {
        title: "Commercial Storage London",
        href: "/commercial-storage-london",
        description:
            "Flexible managed storage for commercial contents, equipment, materials and operational items.",
    },
    {
        title: "Warehouse Storage London",
        href: "/warehouse-storage-london",
        description:
            "Managed warehouse capacity for reviewed business goods, equipment, furniture and boxed items.",
    },
    {
        title: "Inventory Management London",
        href: "/inventory-management-london",
        description:
            "Physical inventory organisation, item references, categorisation and selected-item return support.",
    },
    {
        title: "Office Removals London",
        href: "/office-removals-london",
        description:
            "Business relocation support for healthcare offices, clinics and administrative premises.",
    },
    {
        title: "Document Shredding",
        href: "/shredding-solutions-london",
        description:
            "Secure document shredding for eligible records approved for destruction.",
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
        question: "What healthcare items can KXH store?",
        answer:
            "KXH can discuss storage for suitable paper records, office furniture, waiting-room furniture, non-clinical equipment, training materials, boxed operational supplies and other suitable business items.",
    },
    {
        question: "Do you store medical records?",
        answer:
            "Storage of confidential physical healthcare records is subject to a separate suitability and handling review. Your organisation must explain its confidentiality, retention, access and authorisation requirements before collection is agreed.",
    },
    {
        question: "Do you store medicines or controlled substances?",
        answer:
            "No such storage should be assumed. Medicines, controlled substances, pharmaceuticals and other regulated items must be identified before quotation and may not be suitable for this service.",
    },
    {
        question: "Do you store clinical waste?",
        answer:
            "No. This page does not describe a clinical-waste storage or disposal service. Clinical, hazardous, contaminated or regulated waste requires specialist handling.",
    },
    {
        question: "Can you collect from clinics and healthcare offices?",
        answer:
            "Yes. Collection can be discussed for suitable items from clinics, practices, offices, care providers, project sites and other agreed London premises.",
    },
    {
        question: "Can selected records or items be retrieved?",
        answer:
            "Yes, where suitable references have been agreed. Selected boxes, furniture groups, equipment or supplies can be requested for managed retrieval and return delivery.",
    },
    {
        question: "Can you store items during a clinic refurbishment?",
        answer:
            "Yes. Suitable records, furniture and non-clinical items can be collected before work begins and returned when the relevant rooms or premises are ready.",
    },
    {
        question: "Can you help during a healthcare relocation?",
        answer:
            "Yes. Healthcare storage can form part of a wider relocation plan covering collection, temporary storage, phased delivery and return to the new site.",
    },
    {
        question: "How are stored items organised?",
        answer:
            "Items may be organised using box numbers, departments, sites, projects, asset references, categories, manifests or another agreed physical inventory structure.",
    },
    {
        question: "Can you collect from multiple healthcare sites?",
        answer:
            "Multiple collection points can be discussed for consolidations, relocations or project work. Pricing depends on the number of sites, access, volume and handling requirements.",
    },
    {
        question: "Can more items be added later?",
        answer:
            "Ongoing additions may be possible where they fit the agreed storage and inventory process. Expected collection frequency should be discussed during quotation.",
    },
    {
        question: "How long can healthcare items remain in storage?",
        answer:
            "Storage can support temporary, project-based, rolling or longer-term requirements. The appropriate arrangement depends on item type, volume, review dates and retrieval needs.",
    },
    {
        question: "Is this a compliant medical-storage service?",
        answer:
            "KXH does not make a blanket compliance guarantee. Your organisation must explain applicable legal, contractual, confidentiality, retention and handling requirements so suitability can be assessed.",
    },
    {
        question: "Can you store temperature-sensitive equipment or supplies?",
        answer:
            "Temperature-sensitive items should not be assumed suitable. Any environmental, monitoring or specialist storage requirement must be disclosed before quotation.",
    },
    {
        question: "Can you store healthcare furniture?",
        answer:
            "Yes. KXH can discuss storage for suitable office, waiting-room, administrative and other non-clinical furniture, subject to condition, dimensions and handling requirements.",
    },
    {
        question: "What information is needed for a quote?",
        answer:
            "Useful details include item categories, approximate quantity, collection postcode, access, restrictions, packaging, confidentiality expectations, storage duration and retrieval requirements.",
    },
    {
        question: "Can stored items be delivered to a different site?",
        answer:
            "Yes. Return delivery can be coordinated to an agreed London address, subject to destination access, item volume and scheduling.",
    },
    {
        question: "What items may not be suitable?",
        answer:
            "Clinical waste, medicines, controlled substances, hazardous materials, contaminated items, temperature-sensitive goods and items requiring specialist regulated storage may not be suitable.",
    },
    {
        question: "Can healthcare training equipment be stored?",
        answer:
            "Reviewed non-clinical training equipment, course materials, furniture and display items may be suitable, subject to dimensions, condition, packaging and any specialist handling requirements.",
    },
    {
        question: "Can departments share one storage arrangement?",
        answer:
            "Yes. Items can be grouped by department, site, project or another agreed reference structure while remaining part of one broader healthcare-storage arrangement.",
    },
    {
        question: "Can records and furniture be stored within the same project?",
        answer:
            "Yes, where both item groups are suitable and clearly organised. Records-led requirements may still be better directed to Archive Storage London if indexing and retrieval are the main need.",
    },
];

function ServiceJsonLd() {
    const serviceItems = [
        "Healthcare item collection",
        "Physical records storage",
        "Healthcare furniture storage",
        "Non-clinical equipment storage",
        "Inventory organisation",
        "Retrieval and return delivery",
    ];

    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Healthcare Storage London",
        serviceType: "Managed Healthcare Business Storage",
        isRelatedTo: {
            "@type": "Service",
            "@id": `${parentPageUrl}#service`,
            name: "Business Storage London",
            url: parentPageUrl,
        },
        url: pageUrl,
        description:
            "Managed healthcare storage in London for suitable records, furniture, non-clinical equipment and supplies with collection, organisation, retrieval and delivery.",
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
            audienceType: "Healthcare businesses and organisations in London",
        },
        offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            url: `https://kxhlogistics.co.uk${quoteUrl}`,
            itemOffered: { "@id": `${pageUrl}#service` },
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Managed Healthcare Storage Services",
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
                name: "Healthcare Storage London",
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
        name: "Healthcare Storage London",
        description:
            "Managed healthcare storage in London for suitable records, furniture, non-clinical equipment and supplies.",
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
            url: "https://kxhlogistics.co.uk/images/healthcare-storage/healthcare-storage-london.webp",
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
    { href: "#items", label: "Items stored" },
    { href: "#retrieval", label: "Retrieval" },
    { href: "#service-fit", label: "Choose service" },
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
            <span aria-hidden="true" className="mx-2">/</span>
            <Link href="/services" className="transition hover:text-emerald-700">
                Services
            </Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link
                href="/business-storage-london"
                className="transition hover:text-emerald-700"
            >
                Business Storage
            </Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page" className="font-medium text-slate-700">
                Healthcare Storage London
            </span>
        </nav>
    );
}

function PageSectionNav() {
    return (
        <nav
            aria-label="Healthcare storage page sections"
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
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
                    Managed Healthcare Storage for London Organisations
                </div>

                <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                    Healthcare Storage London
                </h1>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                    Managed offsite storage for healthcare organisations, including suitable
                    records, office furniture and reviewed non-clinical operational
                    equipment, with collection, organisation and return delivery.
                </p>

                <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                    KXH can collect suitable items from your premises, organise them in
                    a managed warehouse workflow, retrieve selected items and coordinate
                    return delivery across London.
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
                        Get Healthcare Storage Quote
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
                    Not sure of the exact volume? An estimate is enough to begin.
                </p>

                <div className="mx-auto mt-5 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                    This service does not cover medicines, controlled substances,
                    clinical waste, contaminated items or goods requiring specialist
                    temperature-controlled storage.
                </div>

                <div className="mt-6 flex justify-center">
                    <TrustpilotPill />
                </div>

                <div className="mt-12">
                    <Image
                        src="/images/business-storage/business-storage-london-warehouse-inventory.webp"
                        alt="Organised healthcare business items inside a managed London warehouse"
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
                    eyebrow="Managed Physical Healthcare Storage"
                    title="More Than Empty Storage Space"
                    description="KXH provides a managed physical storage workflow for suitable healthcare business items without presenting the service as clinical-waste storage, pharmaceutical storage or digital records management."
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
                        Planning a Healthcare Storage Project
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Suitability Must Be Confirmed Before Collection
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Healthcare organisations hold a wide range of items with
                        different handling, confidentiality and environmental
                        requirements. The first step is to separate suitable physical
                        business items from anything requiring specialist regulated
                        storage.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        KXH provides the physical logistics workflow. Your organisation
                        remains responsible for explaining applicable retention,
                        confidentiality, authorisation and specialist handling rules.
                    </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                        Confirm these points before items move offsite
                    </h3>
                    <ul className="mt-6 space-y-3 text-slate-700">
                        <li><span aria-hidden="true">✓</span> Are the items clinical or non-clinical?</li>
                        <li><span aria-hidden="true">✓</span> Do any items require temperature control?</li>
                        <li><span aria-hidden="true">✓</span> Are medicines or controlled substances involved?</li>
                        <li><span aria-hidden="true">✓</span> Which items contain confidential information?</li>
                        <li><span aria-hidden="true">✓</span> How should items be referenced?</li>
                        <li><span aria-hidden="true">✓</span> Who may authorise retrieval and delivery?</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}


function PreCollectionReviewSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Before We Collect"
                    title="What KXH Reviews Before Healthcare Items Move Offsite"
                    description="A practical pre-collection review helps define what can enter the service, how items should be organised, who may authorise retrieval and what the destination workflow should look like."
                    maxWidth="3xl"
                />

                <ChecklistGrid
                    items={preCollectionChecks}
                    columns="lg:grid-cols-4"
                />

                <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-500">
                    This review does not replace your organisation&apos;s legal,
                    confidentiality, retention or regulatory responsibilities.
                </p>
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
                            Healthcare Space Should Support Services, Not Become a{" "}
                            <span className="text-emerald-700">Storeroom</span>
                        </>
                    }
                    description="Release operational space, support relocations and keep suitable records, furniture, equipment and supplies available without running a separate storage unit."
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
                    title="Four Steps from Item Review to Return Delivery"
                    description="A managed process covering item review, collection, inventory organisation, warehouse storage, retrieval and return."
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
                    eyebrow="Healthcare Storage Lifecycle"
                    title="Manage Suitable Physical Items from Collection to Review"
                    description="KXH supports the physical stages after items are approved for offsite storage: collection, registration, organisation, storage, retrieval and return."
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
                    eyebrow="Flexible Healthcare Storage Pricing"
                    title="A Quote Based on the Items and Work Involved"
                    description="Pricing reflects the storage volume, collection conditions, handling, organisation, storage duration and likely retrieval requirements."
                    maxWidth="3xl"
                />

                <SimpleCardGrid
                    items={pricingFactors}
                    columns="lg:grid-cols-3"
                    background="bg-slate-50"
                />

                <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-slate-950">
                        Why two healthcare storage projects may be priced differently
                    </h3>
                    <p className="mt-4 leading-7 text-slate-700">
                        A small records-only collection stored for a longer period may
                        require less handling than a short-term relocation involving
                        furniture, multiple floors, item grouping and phased delivery.
                        The quote reflects the physical work and service pattern rather
                        than only the amount of warehouse space used.
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                        Rough quantities are acceptable at the enquiry stage. Photographs,
                        room counts and existing inventories can help KXH prepare an
                        initial scope.
                    </p>
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href={quoteUrl}
                        className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Calculate Your Healthcare Storage Quote
                    </Link>
                    <p className="mt-4 text-sm leading-6 text-slate-500">
                        No fixed rate is published because item types, access,
                        restrictions and handling requirements vary between projects.
                        A rough estimate is enough for an initial quotation.
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
                    alt="Approved healthcare records and non-clinical items organised in a London warehouse"
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
                        Managed Healthcare Storage
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Physical Storage for Suitable Healthcare Business Items
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        KXH stores reviewed physical items rather than medicines,
                        clinical waste, digital records or regulated substances.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Records, furniture, non-clinical equipment and supplies can be
                        organised using agreed labels, sites, departments, categories or
                        supplied manifests. Where the main need is physical item control,
                        see{" "}
                        <Link
                            href="/inventory-management-london"
                            className="rounded-sm font-semibold text-emerald-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                        >
                            Inventory Management London
                        </Link>
                        .
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Healthcare Storage London is intended for mixed physical
                        healthcare business contents. If your requirement is mainly
                        confidential records and archive boxes, use our{" "}
                        <Link
                            href="/archive-storage-london"
                            className="rounded-sm font-semibold text-emerald-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                        >
                            Archive Storage London
                        </Link>{" "}
                        service for a records-led workflow.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Organisations with broader needs can also explore{" "}
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
                        <li><span aria-hidden="true">✓</span> Suitable records and business contents</li>
                        <li><span aria-hidden="true">✓</span> Item and box references</li>
                        <li><span aria-hidden="true">✓</span> Department and site grouping</li>
                        <li><span aria-hidden="true">✓</span> Selected-item retrieval</li>
                        <li><span aria-hidden="true">✓</span> Return-delivery coordination</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

function SuitabilitySection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Healthcare Storage Suitability"
                    title="Separate Suitable Business Items from Restricted Categories"
                    description="The storage plan must reflect the actual item types involved. Medicines, clinical waste, hazardous materials, contaminated items and temperature-sensitive goods should not be assumed suitable."
                    maxWidth="3xl"
                />
                <ChecklistGrid items={suitabilityItems} />
            </div>
        </section>
    );
}

function StoredItemsSection() {
    return (
        <section
            id="items"
            className="scroll-mt-24 bg-slate-50 py-14 sm:py-20"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="What Can Be Stored"
                    title="Storage for Healthcare Records, Furniture, Equipment and Supplies"
                    description="KXH can discuss a broad range of suitable physical healthcare business items, subject to item condition, confidentiality, environmental requirements and available warehouse capacity."
                    maxWidth="3xl"
                />
                <ChecklistGrid items={storedItems} columns="lg:grid-cols-5" />
                <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-500">
                    All items are subject to review. Acceptance depends on condition,
                    packaging, dimensions, contamination risk, confidentiality requirements
                    and whether specialist environmental or regulated storage is required.
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
                    eyebrow="Healthcare Organisations We Support"
                    title="Managed Storage Across Healthcare, Care and Support Services"
                    description="Different healthcare organisations hold different physical items, follow different internal policies and require different retrieval workflows."
                    maxWidth="3xl"
                />
                <SimpleCardGrid items={industries} columns="lg:grid-cols-3" />
            </div>
        </section>
    );
}


function WhyOffsiteStorageSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Why Healthcare Organisations Use Offsite Storage"
                    title="Keep Operational Space Focused on Current Services"
                    description="Offsite storage is most useful when suitable physical items still need to be retained, reused or retrieved but no longer justify occupying active healthcare space."
                    maxWidth="3xl"
                />

                <SimpleCardGrid
                    items={offsiteStorageReasons}
                    columns="lg:grid-cols-3"
                    background="bg-white"
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
                    alt="KXH collecting approved healthcare furniture and records for storage in London"
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
                        eyebrow="Healthcare Storage Use Cases"
                        title="Support Relocations, Refurbishments, Records Overflow and Project Work"
                        description="Managed healthcare storage can solve an immediate space problem or support a broader operational change."
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
                    eyebrow="Typical Healthcare Storage Projects"
                    title="Storage Designed for Real Operational Change"
                    description="These examples show the kinds of healthcare-sector projects the service is designed to support. They are service scenarios, not claims about specific completed projects."
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
                    title="Healthcare Storage vs Self Storage vs Warehouse Rental"
                    description="The right model depends on item suitability, internal resources, confidentiality, retrieval needs and whether your organisation wants to operate the storage process itself."
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
                                KXH Managed Healthcare Storage
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
                                    <span aria-hidden="true" className="mr-2 text-emerald-700">✓</span>
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
                                    KXH managed healthcare storage
                                </p>
                                <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
                                    ✓ {row.kxh}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center sm:p-8">
                    <h3 className="text-xl font-bold text-slate-950">
                        Not sure which KXH storage service fits?
                    </h3>
                    <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-700">
                        Describe the main item types, approximate quantity and likely
                        retrieval needs. KXH can then direct the enquiry toward{" "}
                        <Link
                            href="/archive-storage-london"
                            className="font-semibold text-emerald-700 hover:underline"
                        >
                            Archive Storage
                        </Link>
                        ,{" "}
                        <Link
                            href="/furniture-storage-london"
                            className="font-semibold text-emerald-700 hover:underline"
                        >
                            Furniture Storage
                        </Link>{" "}
                        or this mixed-content Healthcare Storage service.
                    </p>
                    <Link
                        href={quoteUrl}
                        className="mt-6 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
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
                    eyebrow="Managed Healthcare Logistics Partner"
                    title="Why London Healthcare Organisations Choose KXH"
                    description="KXH combines collection, suitability review, inventory organisation, managed warehouse storage, retrieval and return delivery with wider business-storage services."
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
                        Healthcare Inventory Organisation
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Know What Is Stored and Request What You Need
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Physical inventory organisation helps distinguish stored boxes,
                        furniture, reviewed equipment and operational supplies. For a
                        dedicated physical-item workflow, see{" "}
                        <Link
                            href="/inventory-management-london"
                            className="font-semibold text-emerald-700 hover:underline"
                        >
                            Inventory Management London
                        </Link>
                        .
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        The right structure may use box numbers, departments, sites,
                        projects, asset references, categories or a manifest supplied by
                        your organisation.
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
                        Organisation built around authorised retrieval
                    </h3>
                    <p className="mt-5 leading-7 text-slate-700">
                        Before collection, decide how stored items will be identified,
                        who may authorise retrieval, where delivery should go and which
                        items require additional internal controls.
                    </p>
                    <ul className="mt-6 space-y-3 text-slate-700">
                        <li><span aria-hidden="true">✓</span> Clear box and item references</li>
                        <li><span aria-hidden="true">✓</span> Department and site grouping</li>
                        <li><span aria-hidden="true">✓</span> Project and category grouping</li>
                        <li><span aria-hidden="true">✓</span> Retrieval-request support</li>
                        <li><span aria-hidden="true">✓</span> Return-delivery coordination</li>
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
                        Existing Healthcare Inventories
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Keep Useful References Your Team Already Understands
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Healthcare organisations may already use box references, asset
                        registers, spreadsheets, department codes, project numbers or
                        manifests.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Where suitable, these references can form the starting point for
                        the physical organisation agreed with KXH.
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
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="How Retrieval Requests Work"
                    title="Return Selected Items Without Emptying the Full Storage Account"
                    description="A clear retrieval workflow allows approved items to leave storage while the remaining records, furniture, equipment and supplies stay organised offsite."
                    maxWidth="3xl"
                />

                <SimpleCardGrid
                    items={retrievalWorkflow}
                    columns="lg:grid-cols-4"
                    background="bg-white"
                />

                <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-500">
                    Retrieval timing depends on reference quality, item quantity,
                    destination, handling requirements and scheduling availability.
                </p>
            </div>
        </section>
    );
}

function RetrievalSection() {
    return (
        <section
            id="retrieval"
            className="scroll-mt-24 border-y border-slate-200 bg-white py-14 sm:py-20"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Typical Retrieval Requests"
                    title="Request Approved Records, Furniture, Equipment or Supplies"
                    description="Retrieval may involve one labelled box, selected furniture, a project group, reviewed equipment or the complete stored collection."
                    maxWidth="3xl"
                />

                <ChecklistGrid
                    items={retrievalRequests}
                    columns="lg:grid-cols-5"
                />

                <div className="mt-10 text-center">
                    <Link
                        href={quoteUrl}
                        className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Discuss Your Retrieval Requirements
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
                        Prepare Your Healthcare Storage Quote
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        What Information Helps Us Scope the Service?
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        A clear quote depends on item categories, suitability,
                        collection access, organisation, storage duration and future
                        retrieval requirements.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Estimates, photographs and existing inventories are useful when
                        exact figures are not available.
                    </p>
                    <Link
                        href={quoteUrl}
                        className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Request a Healthcare Storage Quote
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
                        Is KXH Healthcare Storage Right for Your Organisation?
                    </h2>
                    <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                        KXH is designed for organisations that need managed physical
                        storage for suitable healthcare business items rather than
                        clinical, pharmaceutical or specialist regulated storage.
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
                    title="Healthcare Storage Collection Across London"
                    description="KXH supports collection, managed storage, inventory organisation, retrieval and return delivery for approved healthcare business items across Greater London."
                    maxWidth="3xl"
                />

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {londonAreas.map((area) => (
                        <Link
                            key={area.href}
                            href={area.href}
                            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                        >
                            <h3 className="font-bold text-slate-900">{area.name}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Managed healthcare and business storage with collection,
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


function ServiceDecisionSection() {
    const serviceRoutes = [
        {
            need: "Mostly confidential records and archive boxes",
            service: "Archive Storage London",
            href: "/archive-storage-london",
        },
        {
            need: "Mostly office, waiting-room or project furniture",
            service: "Furniture Storage London",
            href: "/furniture-storage-london",
        },
        {
            need: "Mixed healthcare business contents",
            service: "Healthcare Storage London",
            href: "/healthcare-storage-london",
        },
        {
            need: "Regular stock, supplies or item handling",
            service: "Inventory Management London",
            href: "/inventory-management-london",
        },
        {
            need: "Clinic, practice or healthcare office relocation",
            service: "Office Removals London",
            href: "/office-removals-london",
        },
    ];

    return (
        <section id="service-fit" className="scroll-mt-24 bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Choose the Right KXH Service"
                    title="Match the Service to Your Main Storage Requirement"
                    description="Healthcare Storage London is designed for mixed physical contents. More specialised requirements may be better served by another KXH page."
                    maxWidth="3xl"
                />

                <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="hidden grid-cols-[1.4fr_1fr] bg-emerald-800 text-sm font-bold text-white sm:grid">
                        <div className="p-5">Your main requirement</div>
                        <div className="border-l border-white/10 p-5">Best KXH route</div>
                    </div>

                    {serviceRoutes.map((route) => (
                        <div
                            key={route.need}
                            className="grid gap-3 border-t border-slate-200 p-5 sm:grid-cols-[1.4fr_1fr] sm:items-center"
                        >
                            <div className="font-medium text-slate-900">{route.need}</div>
                            <Link
                                href={route.href}
                                className="font-semibold text-emerald-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                            >
                                {route.service} →
                            </Link>
                        </div>
                    ))}
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
                    title="Related Healthcare, Archive, Furniture and Business Storage Services"
                    description="Connect healthcare storage with archive storage, furniture storage, inventory organisation, relocation and document shredding."
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
                    Plan Your Healthcare Storage Project
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
                    Tell Us What You Need to Collect, Store and Retrieve
                </h2>
                <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
                    Share the item categories, estimated volume, collection postcode,
                    storage duration and retrieval requirements. KXH will review the
                    proposed items and scope a practical managed storage workflow.
                </p>

                <div className="mx-auto mt-7 grid max-w-xl gap-3 text-left sm:grid-cols-2">
                    {[
                        "Approximate item volume",
                        "Collection postcode",
                        "Item suitability details",
                        "Retrieval requirements",
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
                    Not sure of the exact quantity? An estimate is enough to start.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href={quoteUrl}
                        className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800 sm:w-auto sm:px-8"
                    >
                        Plan Your Healthcare Storage Quote
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
                    Healthcare Storage FAQs
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

export default function HealthcareStorageLondonPage() {
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
                <PreCollectionReviewSection />
                <ProblemsSection />
                <ProcessSection />
                <LifecycleSection />
                <PricingSection />
                <ManagedStorageSection />
                <SuitabilitySection />
                <StoredItemsSection />
                <IndustriesSection />
                <WhyOffsiteStorageSection />
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
                <ServiceDecisionSection />
                <RelatedServicesSection />
                <TestimonialsSection />
                <FinalCtaSection />
                <FaqSection />

                <MainFooter locations={londonLocations} />
            </main>
        </>
    );
}