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

const pageUrl = "https://kxhlogistics.co.uk/home-removals-london";
const quoteUrl = "/get-a-quote?service=moving";

export const metadata: Metadata = {
    title: "Home Removals London | Packing, Moving & Storage | KXH",
    description:
        "Professional home removals in London with packing, furniture protection, careful transport, temporary storage and flexible delivery from one managed team.",
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        type: "website",
        url: pageUrl,
        title: "Home Removals London | KXH Storage & Logistics",
        description:
            "Plan your London house or flat move with one team managing packing, collection, furniture protection, transport, optional storage and delivery.",
        images: [
            {
                url: "/images/home-removals/home-removals-london-hero.webp",
                width: 1200,
                height: 630,
                alt: "KXH home removals team moving household furniture in London",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Home Removals London | KXH",
        description:
            "Professional house and flat removals across London with packing, careful handling, storage and flexible delivery.",
        images: ["/images/home-removals/home-removals-london-hero.webp"],
    },
};

const heroBenefits = [
    "Professional moving team",
    "Packing available",
    "Furniture protection",
    "Temporary storage available",
];

const moveSituations = [
    {
        title: "Moving Into Your First Home",
        description:
            "Coordinate the move from rented accommodation, a shared home or storage into your first property with a clear collection, loading and delivery plan.",
    },
    {
        title: "Moving Between London Flats",
        description:
            "Plan around stairs, lift bookings, concierge rules, controlled parking zones and limited loading space at both properties.",
    },
    {
        title: "Relocating a Family Home",
        description:
            "Move furniture, appliances, boxes and personal belongings with professional packing, protection and an agreed room-by-room delivery plan.",
    },
    {
        title: "Upsizing or Downsizing",
        description:
            "Move directly, store selected belongings or arrange staged delivery when everything does not need to arrive at the new property immediately.",
    },
    {
        title: "Moving During Renovation",
        description:
            "Remove furniture before works begin, protect belongings from dust and damage, then return them when the property is ready.",
    },
    {
        title: "Managing a Chain Delay",
        description:
            "Complete the move out on schedule even when keys for the next property are delayed by placing belongings into managed storage.",
    },
    {
        title: "Moving Into Temporary Accommodation",
        description:
            "Keep bulky furniture and non-essential boxes out of short-term accommodation while waiting for a permanent address.",
    },
    {
        title: "Relocating Abroad",
        description:
            "Store selected household items while accommodation, shipping, employment or visa arrangements are finalised.",
    },
];

const serviceSteps = [
    {
        number: "1",
        title: "Request a Quote",
        description:
            "Tell us what you are moving, the collection and delivery addresses, access details, preferred date and whether packing or storage may be required.",
    },
    {
        number: "2",
        title: "Plan the Move",
        description:
            "We review property size, item volume, stairs, lifts, parking, loading restrictions, dismantling and any fragile or unusually heavy belongings.",
    },
    {
        number: "3",
        title: "Survey and Confirm",
        description:
            "Where needed, photographs, an item list or a survey help confirm labour, vehicle, materials, timing and the final service scope.",
    },
    {
        number: "4",
        title: "Pack and Protect",
        description:
            "You can pack yourself or include professional packing, furniture wrapping, mattress covers, wardrobe cartons and fragile-item preparation.",
    },
    {
        number: "5",
        title: "Collect and Transport",
        description:
            "The moving team loads the vehicle carefully, secures the consignment and transports it directly to the destination or into storage.",
    },
    {
        number: "6",
        title: "Deliver and Unload",
        description:
            "Belongings are unloaded into the agreed rooms, with reassembly or staged delivery completed where included in the booking.",
    },
];

const whatWeMove = [
    "Sofas and armchairs",
    "Beds and mattresses",
    "Wardrobes and drawers",
    "Dining tables and chairs",
    "Televisions and electronics",
    "Kitchen appliances",
    "Boxes and personal belongings",
    "Artwork and mirrors",
    "Books and home-office equipment",
    "Musical instruments",
    "Garden furniture",
    "Large and heavy household items",
];

const packingFeatures = [
    {
        title: "Full or Partial Packing",
        description:
            "Choose packing for the whole property, selected rooms, fragile belongings or specific furniture rather than paying for support you do not need.",
    },
    {
        title: "Furniture Wrapping",
        description:
            "Furniture blankets, suitable wrapping and vehicle protection help reduce marks, movement and contact during handling and transport.",
    },
    {
        title: "Mattress and Wardrobe Protection",
        description:
            "Mattress covers and wardrobe cartons can keep clothing and bedding cleaner and easier to organise during the move.",
    },
    {
        title: "Fragile-Item Preparation",
        description:
            "Glassware, mirrors, artwork, televisions and other delicate items can be identified and packed according to the agreed handling plan.",
    },
    {
        title: "Dismantling and Reassembly",
        description:
            "Beds, tables, wardrobes and other suitable furniture can be dismantled and reassembled where this is agreed before moving day.",
    },
    {
        title: "Careful Loading and Unloading",
        description:
            "The team plans loading order, weight distribution and access so belongings can be moved safely through the property and vehicle.",
    },
];

const storageScenarios = [
    "Property-chain or completion delays",
    "Renovations and refurbishment",
    "Short-term rented accommodation",
    "Decluttering before photography or sale",
    "Downsizing with decisions still pending",
    "Furniture awaiting a future property",
    "Relocation abroad",
    "Staged delivery into a new home",
];

const commonProblems = [
    {
        title: "Parking and Loading Restrictions",
        description:
            "Controlled parking zones, red routes, loading windows and restricted streets may require advance planning or customer-arranged permits.",
    },
    {
        title: "Flats, Lifts and Concierge Rules",
        description:
            "Lift bookings, building-management approval, loading-bay access and concierge hours can affect the moving schedule.",
    },
    {
        title: "Narrow Stairs and Doorways",
        description:
            "Victorian terraces, converted flats and older properties may require dismantling, careful carrying and route planning.",
    },
    {
        title: "Heavy or Fragile Furniture",
        description:
            "Large wardrobes, stone tables, antiques, mirrors and delicate furniture need accurate information before moving day.",
    },
    {
        title: "Changing Completion Dates",
        description:
            "Optional storage creates a practical buffer when exchange, completion or key-release dates change unexpectedly.",
    },
    {
        title: "Short-Notice Moves",
        description:
            "Availability depends on the move size, access and date, but a clear item list helps the team assess what can be arranged quickly.",
    },
    {
        title: "Busy Family Schedules",
        description:
            "Packing, collection, transport and delivery can be planned as one service, reducing the number of separate providers to coordinate.",
    },
    {
        title: "More Belongings Than Expected",
        description:
            "Photographs, inventories and surveys reduce the risk of underestimating labour, vehicle space, packing materials or storage capacity.",
    },
];

const whyChooseKxh = [
    {
        title: "One Managed Plan",
        description:
            "Packing, collection, transport, optional storage and final delivery are coordinated as connected stages of the same move.",
    },
    {
        title: "London Access Planning",
        description:
            "The service accounts for stairs, lifts, concierge rules, controlled parking zones, loading restrictions and busy streets.",
    },
    {
        title: "Professional Handling",
        description:
            "Suitable protection, secure loading, careful carrying and agreed dismantling help reduce avoidable disruption and damage risk.",
    },
    {
        title: "Flexible Storage Option",
        description:
            "When move-out and move-in dates do not match, belongings can be moved into managed warehouse storage and delivered later.",
    },
    {
        title: "Clear Service Scope",
        description:
            "Your quotation can identify labour, vehicles, packing, storage, access and delivery requirements before the booking is confirmed.",
    },
    {
        title: "One Point of Coordination",
        description:
            "You avoid separately arranging a moving team, van hire, self-storage unloading and another delivery provider.",
    },
    {
        title: "Full, Partial or Staged Delivery",
        description:
            "Where agreed, essential belongings can arrive first while lower-priority furniture or boxes remain stored.",
    },
    {
        title: "Residential and Logistics Experience",
        description:
            "KXH combines household moving support with warehouse storage and scheduled delivery capability across London.",
    },
];

const comparisonRows = [
    { feature: "Planning support", diy: "You coordinate everything", traditional: "Focused on the moving day", kxh: "One connected moving plan" },
    { feature: "Packing", diy: "Customer packs", traditional: "Often optional", kxh: "Full or partial packing available" },
    { feature: "Heavy lifting", diy: "Customer and helpers", traditional: "Usually included", kxh: "Professional moving team" },
    { feature: "Furniture protection", diy: "Customer supplies it", traditional: "Usually included", kxh: "Planned for moving and storage" },
    { feature: "Vehicle and loading", diy: "Customer hires and loads", traditional: "Included", kxh: "Included in the agreed plan" },
    { feature: "Temporary storage", diy: "Arrange separately", traditional: "May require another provider", kxh: "Integrated when required" },
    { feature: "Return delivery", diy: "Arrange another journey", traditional: "Usually not relevant", kxh: "Scheduled when the property is ready" },
    { feature: "Changing dates", diy: "Customer absorbs disruption", traditional: "May require rebooking", kxh: "Storage can provide a practical buffer" },
    { feature: "Coordination", diy: "Several bookings and tasks", traditional: "One direct move", kxh: "One logistics partner" },
    { feature: "Convenience", diy: "Lowest service level", traditional: "Suitable for direct moves", kxh: "Best for managed or uncertain moves" },
];

const moveTypes = [
    {
        title: "Studio and One-Bed Flats",
        description:
            "Compact moves still require accurate access, parking and item-volume information, especially in central and high-rise buildings.",
    },
    {
        title: "Apartments and Purpose-Built Flats",
        description:
            "Plan around concierge procedures, lift reservations, loading bays and building time restrictions.",
    },
    {
        title: "Victorian Terraces",
        description:
            "Narrow hallways, staircases, front steps and restricted street access may affect dismantling and carrying routes.",
    },
    {
        title: "Townhouses and Multi-Storey Homes",
        description:
            "Room-by-room planning helps manage furniture and boxes across several floors without blocking access.",
    },
    {
        title: "Semi-Detached and Detached Homes",
        description:
            "Larger moves may require more labour, vehicle capacity, packing materials and a detailed inventory or survey.",
    },
    {
        title: "Family Homes",
        description:
            "Packing, furniture protection and labelled room delivery can reduce disruption for households moving with children.",
    },
    {
        title: "Retirement and Downsizing Moves",
        description:
            "Selected furniture can move directly while other belongings remain stored until long-term decisions are made.",
    },
    {
        title: "Luxury and High-Value Homes",
        description:
            "Detailed planning is important for delicate furniture, artwork, mirrors and properties with strict access procedures.",
    },
];

const checklistGroups = [
    {
        title: "8 Weeks Before",
        items: [
            "Create a room-by-room inventory",
            "Decide what to move, sell, donate or store",
            "Request quotes and share realistic access information",
            "Check lease, completion and key-release dates",
        ],
    },
    {
        title: "4 Weeks Before",
        items: [
            "Confirm your moving plan and service scope",
            "Book lifts, loading bays or parking where required",
            "Order packing materials or confirm professional packing",
            "Notify utilities, schools and key service providers",
        ],
    },
    {
        title: "2 Weeks Before",
        items: [
            "Pack low-priority rooms and label every box",
            "Separate valuables and important documents",
            "Confirm dismantling and fragile-item requirements",
            "Review access at both properties",
        ],
    },
    {
        title: "1 Week Before",
        items: [
            "Finish most packing and create an essentials box",
            "Defrost and prepare appliances where appropriate",
            "Confirm timings, contact details and key arrangements",
            "Keep medicines, chargers and documents with you",
        ],
    },
    {
        title: "Moving Day",
        items: [
            "Keep children and pets away from loading routes",
            "Show the team priority, fragile and non-moving items",
            "Check rooms, cupboards, lofts and outdoor areas",
            "Confirm delivery rooms and access instructions",
        ],
    },
    {
        title: "After Moving",
        items: [
            "Check delivered items before unpacking fully",
            "Reassemble priority furniture where agreed",
            "Update final addresses and services",
            "Arrange delivery of any belongings remaining in storage",
        ],
    },
];

const costFactors = [
    {
        title: "Property Size and Item Volume",
        description:
            "The number, dimensions and weight of furniture, boxes and appliances affect labour, vehicle space and moving time.",
    },
    {
        title: "Distance and Travel",
        description:
            "Collection and delivery locations, travel time, route restrictions and congestion can influence the operational plan.",
    },
    {
        title: "Packing Requirements",
        description:
            "Pricing changes depending on whether you pack yourself or require materials, partial packing, full packing or specialist preparation.",
    },
    {
        title: "Property Access",
        description:
            "Stairs, lifts, long carries, narrow entrances, loading bays and controlled parking zones affect labour and timing.",
    },
    {
        title: "Dismantling and Reassembly",
        description:
            "Furniture that must be taken apart and rebuilt requires additional time and should be identified before the move.",
    },
    {
        title: "Storage Duration",
        description:
            "Temporary storage is priced according to the space, handling, duration and final delivery plan required.",
    },
    {
        title: "Moving Date and Notice",
        description:
            "Weekend dates, short notice, waiting time and uncertain completion schedules may affect availability and cost.",
    },
    {
        title: "Fragile or Special-Handling Items",
        description:
            "Artwork, mirrors, antiques, pianos, stone furniture and unusually heavy items may require specific planning.",
    },
];

const movingScenarios = [
    {
        title: "London Flat Move With Lift Booking",
        challenge:
            "A customer must leave a managed apartment building during a fixed lift and loading-bay window.",
        solution:
            "The move is planned around building access, parking, labelled boxes and a defined loading sequence.",
        outcome:
            "Collection and delivery follow the approved time windows without relying on last-minute access decisions.",
    },
    {
        title: "Family Move With Completion Delay",
        challenge:
            "The current home completes before keys for the next property are released.",
        solution:
            "KXH collects the household contents, places them into managed storage and schedules delivery after access is confirmed.",
        outcome:
            "The family can leave on time without filling temporary accommodation with furniture and boxes.",
    },
    {
        title: "Renovation Move in a Victorian Terrace",
        challenge:
            "Furniture must be removed before dusty building work, but narrow stairs make handling difficult.",
        solution:
            "Suitable items are dismantled, protected, carried through the agreed route and stored off-site.",
        outcome:
            "Contractors gain working space and the belongings can be returned after the renovation reaches the right stage.",
    },
];

const coverageAreas = [
    { name: "Camden", href: "/logistics-moving-london/camden" },
    { name: "Westminster", href: "/logistics-moving-london/westminster" },
    { name: "Tower Hamlets", href: "/logistics-moving-london/tower-hamlets" },
    { name: "Kensington & Chelsea", href: "/logistics-moving-london/kensington-chelsea" },
    { name: "Southwark", href: "/logistics-moving-london/southwark" },
    { name: "Hackney", href: "/logistics-moving-london/hackney" },
    { name: "Lambeth", href: "/logistics-moving-london/lambeth" },
    { name: "Islington", href: "/logistics-moving-london/islington" },
];

const relatedGuides = [
    {
        title: "Moving & Storage London",
        href: "/moving-storage-london",
        description: "Collection, managed warehouse storage and flexible return delivery when moving dates do not match.",
    },
    {
        title: "Moving Services London",
        href: "/logistics-moving-london",
        description: "Direct residential and commercial removals across London where storage is optional rather than central.",
    },
    {
        title: "Student Storage London",
        href: "/student-storage-london",
        description: "Collection, summer storage and redelivery between halls, shared accommodation and new tenancies.",
    },
    {
        title: "Warehouse Storage London",
        href: "/warehouse-storage-london",
        description: "Secure managed storage for household and commercial items that cannot move directly to the destination.",
    },
    {
        title: "Business Storage London",
        href: "/business-storage-london",
        description: "Managed off-site storage for furniture, equipment, stock and operational assets.",
    },
    {
        title: "Commercial Storage London",
        href: "/commercial-storage-london",
        description: "Flexible capacity for businesses relocating, refurbishing or reorganising premises.",
    },
    {
        title: "Inventory Management London",
        href: "/inventory-management-london",
        description: "Physical inventory organisation for stored stock, equipment and business belongings.",
    },
    {
        title: "Retail Stock Storage London",
        href: "/retail-stock-storage-london",
        description: "Managed storage for retail inventory, seasonal stock, fixtures and shop equipment.",
    },
];

const faqs = [
    {
        question: "How much do home removals in London cost?",
        answer:
            "The cost depends on property size, item volume, distance, access, labour, vehicles, packing, dismantling, storage and the moving date. KXH provides a tailored quotation based on the agreed job rather than a headline price that may exclude important requirements.",
    },
    {
        question: "Do you provide professional packing?",
        answer:
            "Yes. Packing materials, partial packing, full packing, furniture wrapping and fragile-item preparation can be included, subject to the agreed service scope.",
    },
    {
        question: "Can you move belongings into storage if my new home is not ready?",
        answer:
            "Yes. KXH can collect household belongings, place them into managed warehouse storage and arrange delivery after the new property becomes available.",
    },
    {
        question: "Do you move furniture from flats and apartments?",
        answer:
            "Yes. Apartment moves can be planned around stairs, lift bookings, concierge procedures, loading bays, parking controls and building-management rules.",
    },
    {
        question: "Can you dismantle and reassemble furniture?",
        answer:
            "Suitable beds, tables, wardrobes and other furniture may be dismantled and reassembled where this is included in the quotation and agreed before moving day.",
    },
    {
        question: "Do you supply moving boxes and packing materials?",
        answer:
            "Packing materials can be included as part of the agreed service. Tell KXH whether you need boxes, tape, wrapping, wardrobe cartons, mattress protection or full professional packing.",
    },
    {
        question: "Can I book a weekend home removal?",
        answer:
            "Weekend moves may be available, depending on the date, move size, access and operational schedule. Request the date as early as possible.",
    },
    {
        question: "What happens if my completion date changes?",
        answer:
            "Contact KXH as soon as possible. Where availability and the agreed service allow, the collection, delivery or storage plan can be reviewed around the revised date.",
    },
    {
        question: "Do you handle fragile items?",
        answer:
            "Fragile belongings such as mirrors, artwork, televisions and glass items should be identified before the move so suitable packing and handling can be planned.",
    },
    {
        question: "Are my belongings insured during the move?",
        answer:
            "Insurance and liability arrangements depend on the booking and service terms. Ask KXH to confirm the applicable cover, exclusions, packing requirements and claim procedure before confirming the move.",
    },
    {
        question: "Can you help with a move abroad?",
        answer:
            "KXH can support the London collection and storage stages of an overseas relocation. Explain the onward shipping or future-delivery plan when requesting a quote.",
    },
    {
        question: "Can you move heavy furniture?",
        answer:
            "Many heavy household items can be moved, but exact dimensions, weight, access and handling requirements should be supplied in advance so the team can confirm suitability.",
    },
    {
        question: "Who arranges parking for the removal vehicle?",
        answer:
            "The arrangement depends on the location and booking. Customers may need to organise permits, suspensions, loading-bay access or building approval. KXH should be told about all restrictions before moving day.",
    },
    {
        question: "How much notice should I give?",
        answer:
            "Book as early as practical, especially for weekends, larger properties, professional packing, restricted-access buildings or uncertain completion dates. Short-notice moves depend on availability.",
    },
    {
        question: "What happens after I request a quote?",
        answer:
            "KXH reviews the addresses, item volume, access, dates, packing, storage and delivery requirements. The team may request photographs, an item list or a survey before confirming the service scope and quotation.",
    },
];

function ServiceJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Home Removals London",
        serviceType: "Home Removal Service",
        url: pageUrl,
        description:
            "Professional home removals in London with packing, furniture protection, collection, secure transport, optional storage and flexible delivery.",
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
            url: `https://kxhlogistics.co.uk${quoteUrl}`,
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Home Removal Services",
            itemListElement: [
                "House Removals London",
                "Flat Removals London",
                "Apartment Removals London",
                "Professional Packing Services",
                "Furniture Removals",
                "Home Removals with Storage",
                "Dismantling and Reassembly",
                "Flexible Delivery",
            ].map((name) => ({
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
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kxhlogistics.co.uk" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://kxhlogistics.co.uk/services" },
            { "@type": "ListItem", position: 3, name: "Moving Services", item: "https://kxhlogistics.co.uk/logistics-moving-london" },
            { "@type": "ListItem", position: 4, name: "Home Removals London", item: pageUrl },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

function BreadcrumbNavigation() {
    return (
        <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl overflow-x-auto px-5 pt-4 text-xs text-slate-500 sm:px-6 sm:pt-6 sm:text-sm lg:px-8">
            <Link href="/" className="transition hover:text-emerald-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="transition hover:text-emerald-700">Services</Link>
            <span className="mx-2">/</span>
            <Link href="/logistics-moving-london" className="transition hover:text-emerald-700">Moving Services</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-700">Home Removals London</span>
        </nav>
    );
}

function HeroSection() {
    return (
        <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    Professional House and Flat Removals Across London
                </div>

                <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                    Home Removals London Made Easier
                </h1>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                    Move your home with one London team managing planning, professional packing, furniture protection, collection, secure transport, optional storage and delivery to the new address.
                </p>

                <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                    Suitable for house removals, flat moves, apartment relocations, family moves, downsizing, renovations and delayed completion dates where belongings may need to remain stored between addresses.
                </p>

                <div className="mx-auto mt-7 grid max-w-4xl grid-cols-1 gap-3 min-[430px]:grid-cols-2 lg:grid-cols-4">
                    {heroBenefits.map((benefit) => (
                        <div key={benefit} className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                            <span aria-hidden="true">✓</span> {benefit}
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link href={quoteUrl} className="w-full rounded-xl bg-emerald-700 px-6 py-4 text-center font-semibold text-white shadow-lg transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:w-auto">
                        Get a Free Home Removal Quote
                    </Link>
                    <a href="tel:+447470025636" className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:w-auto">
                        Call KXH
                    </a>
                </div>

                <p className="mt-4 text-sm text-slate-500">
                    Share both addresses, property access, item volume, preferred date and any packing or storage requirements.
                </p>

                <div className="mt-6 flex justify-center"><TrustpilotPill /></div>

                <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                    <Image
                        src="/images/moving-services/moving-services-hero.webp"
                        alt="KXH home removals team collecting household furniture in London"
                        width={1400}
                        height={800}
                        priority
                        quality={80}
                        sizes="(max-width: 768px) 100vw, 960px"
                        className="h-auto w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}

function WhyProfessionalRemovalsSection() {
    return (
        <section aria-labelledby="why-professional-removals" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Why Use Professional Home Movers?</p>
                    <h2 id="why-professional-removals" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">A Home Move Is More Than Hiring a Van</h2>
                    <p className="mt-4 leading-7 text-slate-600">Professional removals bring labour, protection, loading experience and practical planning together. That matters most when access is restricted, furniture is bulky, dates are uncertain or the household has limited time to organise every stage.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {moveSituations.map((item) => (
                        <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProcessSection() {
    return (
        <section aria-labelledby="home-removal-process" className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">How It Works</p>
                    <h2 id="home-removal-process" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">One Managed Home Removal From Quote to Unloading</h2>
                    <p className="mt-4 leading-7 text-slate-600">After you request a quote, KXH reviews the move details and confirms the agreed labour, vehicle, packing, access, storage and delivery requirements.</p>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {serviceSteps.map((step) => (
                        <article key={step.number} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                            <span className="text-sm font-black text-emerald-700">{step.number}</span>
                            <h3 className="mt-4 text-lg font-bold text-slate-950">{step.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                        </article>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Link href={quoteUrl} className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">Plan Your Home Move</Link>
                </div>
            </div>
        </section>
    );
}

function WhatWeMoveSection() {
    return (
        <section aria-labelledby="what-we-move" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <Image
                    src="/images/moving-services/moving-services-packing-loading.webp"
                    alt="KXH movers protecting and loading household furniture"
                    width={1400}
                    height={800}
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                    loading="lazy"
                    decoding="async"
                />
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">What We Move</p>
                    <h2 id="what-we-move" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Household Furniture, Boxes, Appliances and Personal Belongings</h2>
                    <p className="mt-4 leading-7 text-slate-600">Provide an accurate item list, photographs or survey information so KXH can plan vehicle capacity, labour, packing, dismantling and any specialist handling before the move.</p>
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                        {whatWeMove.map((item) => (
                            <li key={item} className="text-sm font-medium text-slate-700 sm:text-base"><span className="mr-2 text-emerald-700" aria-hidden="true">✓</span>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function PackingSection() {
    return (
        <section aria-labelledby="packing-protection" className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Packing and Furniture Protection</p>
                    <h2 id="packing-protection" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Prepare Belongings for Carrying, Transport and Storage</h2>
                    <p className="mt-4 leading-7 text-slate-600">Professional packing can reduce pressure before moving day and help ensure furniture, boxes and fragile belongings are prepared consistently for the agreed journey.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {packingFeatures.map((item) => (
                        <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function StorageSection() {
    return (
        <section aria-labelledby="temporary-storage" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Temporary Storage During Your Move</p>
                    <h2 id="temporary-storage" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Bridge the Gap Between Moving Out and Moving In</h2>
                    <p className="mt-4 leading-7 text-slate-600">A direct move is not always possible. KXH can collect belongings, place them into managed warehouse storage and arrange full, partial or staged delivery when the next property is ready.</p>
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                        {storageScenarios.map((item) => (
                            <li key={item} className="text-sm font-medium text-slate-700 sm:text-base"><span className="mr-2 text-emerald-700" aria-hidden="true">✓</span>{item}</li>
                        ))}
                    </ul>
                    <p className="mt-6 leading-7 text-slate-600">
                        Explore <Link href="/moving-storage-london" className="font-semibold text-emerald-700 hover:underline">Moving &amp; Storage London</Link> or <Link href="/warehouse-storage-london" className="font-semibold text-emerald-700 hover:underline">Warehouse Storage London</Link> for moves where storage is central to the plan.
                    </p>
                </div>
                <Image
                    src="/images/moving-services/moving-services-team-working.webp"
                    alt="Household furniture organised inside KXH managed warehouse storage"
                    width={1400}
                    height={800}
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </section>
    );
}

function ProblemsSection() {
    return (
        <section aria-labelledby="moving-problems" className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Common Moving Problems We Solve</p>
                    <h2 id="moving-problems" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Practical Planning for London Homes and Streets</h2>
                    <p className="mt-4 leading-7 text-slate-600">London removals often depend on access details that are easy to overlook. Sharing them early helps avoid delays, unsuitable vehicles and unrealistic moving-day assumptions.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {commonProblems.map((problem) => (
                        <article key={problem.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h3 className="text-lg font-bold text-slate-950">{problem.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{problem.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function WhyKxhSection() {
    return (
        <section aria-labelledby="why-kxh" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Why London Families Choose KXH</p>
                    <h2 id="why-kxh" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">More Than a Point-to-Point Removal Company</h2>
                    <p className="mt-4 leading-7 text-slate-600">KXH can manage the connected journey from planning and packing through collection, transport, optional storage and final delivery, reducing the number of separate providers involved.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {whyChooseKxh.map((item, index) => (
                        <article key={item.title} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-700" aria-hidden="true">{index + 1}</div>
                            <h3 className="mt-5 text-lg font-bold text-slate-950">{item.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ComparisonSection() {
    return (
        <section aria-labelledby="removal-comparison" className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Compare Your Options</p>
                    <h2 id="removal-comparison" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">DIY Move vs Traditional Movers vs KXH Managed Removals</h2>
                    <p className="mt-4 leading-7 text-slate-600">The best option depends on your time, access, item volume, storage requirements and how much of the process you want to coordinate yourself.</p>
                </div>

                <div className="mt-12 hidden overflow-hidden rounded-2xl border border-slate-200 lg:block">
                    <div className="grid grid-cols-[1.25fr_1fr_1fr_1fr] bg-emerald-800 text-sm font-bold text-white">
                        <div className="p-5">Service Feature</div>
                        <div className="border-l border-white/10 p-5 text-center">DIY Move</div>
                        <div className="border-l border-white/10 p-5 text-center">Traditional Movers</div>
                        <div className="border-l border-white/10 p-5 text-center">KXH Managed Removals</div>
                    </div>
                    {comparisonRows.map((row) => (
                        <div key={row.feature} className="grid grid-cols-[1.25fr_1fr_1fr_1fr] border-t border-slate-200 text-sm">
                            <div className="bg-slate-100 p-5 font-semibold text-slate-900">{row.feature}</div>
                            <div className="border-l border-slate-200 p-5 leading-6 text-slate-600">{row.diy}</div>
                            <div className="border-l border-slate-200 p-5 leading-6 text-slate-600">{row.traditional}</div>
                            <div className="border-l border-slate-200 bg-emerald-50 p-5 font-medium leading-6 text-emerald-900">{row.kxh}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 space-y-4 lg:hidden">
                    {comparisonRows.map((row) => (
                        <article key={row.feature} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                            <h3 className="bg-slate-100 p-4 font-bold text-slate-950">{row.feature}</h3>
                            <dl className="divide-y divide-slate-200 text-sm">
                                <div className="grid grid-cols-[7rem_1fr] gap-3 p-4"><dt className="font-semibold">DIY</dt><dd className="text-slate-600">{row.diy}</dd></div>
                                <div className="grid grid-cols-[7rem_1fr] gap-3 p-4"><dt className="font-semibold">Traditional</dt><dd className="text-slate-600">{row.traditional}</dd></div>
                                <div className="grid grid-cols-[7rem_1fr] gap-3 bg-emerald-50 p-4"><dt className="font-semibold text-emerald-900">KXH</dt><dd className="text-emerald-900">{row.kxh}</dd></div>
                            </dl>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function MoveTypesSection() {
    return (
        <section aria-labelledby="types-of-home-moves" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Types of Home Moves</p>
                    <h2 id="types-of-home-moves" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">House, Flat and Apartment Removals Across London</h2>
                    <p className="mt-4 leading-7 text-slate-600">Each property type creates different access, carrying and parking considerations. The quotation should reflect the real building and item requirements rather than only the number of bedrooms.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {moveTypes.map((item) => (
                        <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ChecklistSection() {
    return (
        <section aria-labelledby="moving-checklist" className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Moving Home Checklist</p>
                    <h2 id="moving-checklist" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Prepare for Your Move in Manageable Stages</h2>
                    <p className="mt-4 leading-7 text-slate-600">Starting early makes it easier to identify access issues, reduce unnecessary belongings and provide the information needed for an accurate quotation.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {checklistGroups.map((group) => (
                        <article key={group.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h3 className="text-xl font-bold text-slate-950">{group.title}</h3>
                            <ul className="mt-5 space-y-3">
                                {group.items.map((item) => (
                                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="font-bold text-emerald-700" aria-hidden="true">✓</span><span>{item}</span></li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CostSection() {
    return (
        <section aria-labelledby="removal-cost" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Pricing Explained</p>
                    <h2 id="removal-cost" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">What Affects Home Removal Costs in London?</h2>
                    <p className="mt-4 leading-7 text-slate-600">A useful quotation should reflect the actual work required. Bedroom count alone does not show furniture volume, carrying distance, stairs, parking, packing or special handling.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {costFactors.map((factor) => (
                        <article key={factor.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="text-lg font-bold text-slate-950">{factor.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{factor.description}</p>
                        </article>
                    ))}
                </div>
                <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8">
                    <h3 className="text-xl font-bold text-slate-950">For a more accurate quotation</h3>
                    <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">Provide photographs or an item list, both addresses, floor and access details, preferred dates, packing requirements, dismantling needs and whether storage may be required.</p>
                    <Link href={quoteUrl} className="mt-5 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">Get a Tailored Quote</Link>
                </div>
            </div>
        </section>
    );
}

function ScenariosSection() {
    return (
        <section aria-labelledby="moving-scenarios" className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Realistic Moving Scenarios</p>
                    <h2 id="moving-scenarios" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">How a Managed Plan Solves Common Home-Moving Challenges</h2>
                    <p className="mt-4 leading-7 text-slate-600">These examples show how access, timing and storage requirements can change the right moving approach.</p>
                </div>
                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {movingScenarios.map((scenario) => (
                        <article key={scenario.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h3 className="text-xl font-bold text-slate-950">{scenario.title}</h3>
                            <dl className="mt-5 space-y-4 text-sm leading-6">
                                <div><dt className="font-bold text-slate-950">Challenge</dt><dd className="mt-1 text-slate-600">{scenario.challenge}</dd></div>
                                <div><dt className="font-bold text-slate-950">Solution</dt><dd className="mt-1 text-slate-600">{scenario.solution}</dd></div>
                                <div><dt className="font-bold text-slate-950">Outcome</dt><dd className="mt-1 text-slate-600">{scenario.outcome}</dd></div>
                            </dl>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function LondonCoverageSection() {
    return (
        <section aria-labelledby="london-coverage" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Areas We Cover</p>
                    <h2 id="london-coverage" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Home Removals Across London Boroughs</h2>
                    <p className="mt-4 leading-7 text-slate-600">KXH supports approved collections and deliveries across London. Every move should account for parking controls, loading restrictions, stairs, lifts, concierge access and building requirements.</p>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {coverageAreas.map((area) => (
                        <Link key={area.href} href={area.href} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-300 hover:shadow-sm">
                            <h3 className="font-semibold text-slate-900">Home Removals in {area.name}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Professional collection, moving, optional storage and delivery for London homes.</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function RelatedGuidesSection() {
    return (
        <section aria-labelledby="related-guides" className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Related Services and Guides</p>
                    <h2 id="related-guides" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Build the Right Moving and Storage Plan</h2>
                    <p className="mt-4 leading-7 text-slate-600">Explore direct moving, temporary storage and specialist services for students, households and businesses across London.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {relatedGuides.map((service) => (
                        <Link key={service.href} href={service.href} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm">
                            <h3 className="text-lg font-bold text-slate-950">{service.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                            <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">Explore this service →</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FinalCallToActionSection() {
    return (
        <section className="border-t border-emerald-800 bg-emerald-800 py-14 text-center text-white sm:py-20">
            <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
                <p className="text-sm font-semibold uppercase tracking-wide !text-white">Plan Your London Home Move</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">Moving Home in London?</h2>
                <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-200">Tell us what needs moving, both addresses, property access, your preferred date and whether you require packing, dismantling or storage. KXH will review the details and prepare a tailored quotation for the agreed service.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link href={quoteUrl} className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 sm:w-auto sm:px-8">Request Your Free Quote</Link>
                    <a href="tel:+447470025636" className="w-full rounded-xl border border-white/20 px-6 py-4 text-center font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:px-8">Call KXH</a>
                </div>
            </div>
        </section>
    );
}

function FaqsSection() {
    return (
        <section aria-labelledby="home-removals-faqs" className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16">
            <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                <h2 id="home-removals-faqs" className="mb-8 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Home Removals London FAQs</h2>
                <div className="space-y-3">
                    {faqs.map((faq) => (
                        <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                            <summary className="cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">{faq.question}</summary>
                            <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function HomeRemovalsLondonPage() {
    return (
        <>
            <CrispChat />
            <Nav />

            <main className="min-h-screen bg-white text-slate-900">
                <ServiceJsonLd />
                <FAQJsonLd />
                <BreadcrumbJsonLd />
                <TrustpilotJsonLd />

                <BreadcrumbNavigation />
                <HeroSection />
                <WhyProfessionalRemovalsSection />
                <ProcessSection />
                <WhatWeMoveSection />
                <PackingSection />
                <StorageSection />
                <ProblemsSection />
                <WhyKxhSection />
                <ComparisonSection />
                <MoveTypesSection />
                <ChecklistSection />
                <CostSection />
                <ScenariosSection />
                <LondonCoverageSection />
                <RelatedGuidesSection />
                <TestimonialsSection />
                <FinalCallToActionSection />
                <FaqsSection />
                <MainFooter locations={londonLocations} />
            </main>
        </>
    );
}