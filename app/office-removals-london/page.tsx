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

const pageUrl = "https://kxhlogistics.co.uk/office-relocation-london";
const quoteUrl = "/get-a-quote?service=moving";
const phoneNumber = "+447386277785";

export const metadata: Metadata = {
    title: "Office Relocation London | Managed Office Moves & Storage",
    description:
        "Fully managed office relocation in London with professional removals, furniture handling, IT equipment transport, secure storage and scheduled delivery.",
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        type: "website",
        url: pageUrl,
        title: "Office Relocation London | KXH Storage & Logistics",
        description:
            "Plan your London office move with one team managing removals, packing, furniture, IT equipment, warehouse storage, inventory organisation and staged delivery.",
        images: [
            {
                url: "/images/moving-services/moving-services-team-working.webp",
                width: 1200,
                height: 630,
                alt: "KXH team handling office furniture during a London office relocation",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Office Relocation London | KXH",
        description:
            "Professional office removals, secure business storage, inventory organisation and staged delivery across London.",
        images: ["/images/moving-services/moving-services-team-working.webp"],
    },
};

const heroBenefits = [
    "Professional office movers",
    "Furniture dismantling and reassembly",
    "IT equipment handling",
    "Secure storage and staged delivery",
];

const relocationReasons = [
    {
        title: "Business Expansion",
        description:
            "Move teams, furniture and operational equipment into larger premises without overwhelming the new office on day one.",
    },
    {
        title: "Office Downsizing",
        description:
            "Separate essential workplace assets from surplus furniture, archives and equipment that should remain in managed storage.",
    },
    {
        title: "Hybrid Working",
        description:
            "Reconfigure space, reduce desk capacity and store approved furniture or equipment while the new workplace model is introduced.",
    },
    {
        title: "Lease Expiration",
        description:
            "Clear the current premises on schedule even when the replacement office, fit-out programme or access date is delayed.",
    },
    {
        title: "Office Refurbishment",
        description:
            "Protect desks, meeting-room furniture, equipment and records off-site while contractors complete building or fit-out work.",
    },
    {
        title: "New Office Opening",
        description:
            "Coordinate collections from existing premises, storage facilities or suppliers and deliver assets in a controlled sequence.",
    },
    {
        title: "Multi-Site Consolidation",
        description:
            "Combine assets from multiple London locations and manage what moves, what remains stored and what is delivered later.",
    },
    {
        title: "Departmental Move",
        description:
            "Relocate a team, floor or operational function without treating the project as a full-company shutdown.",
    },
];

const serviceSteps = [
    {
        number: "01",
        title: "Request a Quote",
        description:
            "Share both addresses, target dates, access details, approximate volume, packing needs, storage requirements and any operational constraints.",
    },
    {
        number: "02",
        title: "Relocation Planning",
        description:
            "KXH reviews labour, vehicles, building access, loading areas, lift bookings, departmental priorities and the proposed move sequence.",
    },
    {
        number: "03",
        title: "Packing and Protection",
        description:
            "Agreed items are labelled, wrapped, packed or prepared for transport, including furniture, boxed files and approved IT equipment.",
    },
    {
        number: "04",
        title: "Office Move",
        description:
            "The moving team collects, loads and transports office assets according to the confirmed schedule and handling plan.",
    },
    {
        number: "05",
        title: "Storage When Required",
        description:
            "Items that cannot move directly are placed into managed warehouse storage and organised using agreed labels, zones or records.",
    },
    {
        number: "06",
        title: "Installation and Return",
        description:
            "Furniture can be reassembled where agreed, while stored items are returned in full or in stages as rooms and departments become ready.",
    },
    {
        number: "07",
        title: "Business Ready",
        description:
            "The relocation plan finishes with the agreed delivery scope completed and outstanding stored assets documented for later return.",
    },
];

const moveItems = [
    { title: "Office Furniture", items: "Desks, chairs, cabinets, pedestals, shelving and reception furniture." },
    { title: "Meeting Spaces", items: "Boardroom tables, meeting chairs, presentation units and approved collaboration equipment." },
    { title: "IT Equipment", items: "Computers, monitors, printers, peripherals and approved server or network equipment." },
    { title: "Archives and Documents", items: "Boxed files, records, reference materials and approved archive consignments." },
    { title: "Retail and Studio Fixtures", items: "Display units, worktables, storage fixtures, props and operational furniture." },
    { title: "Commercial Equipment", items: "Approved office appliances, specialist equipment and non-hazardous business assets." },
    { title: "Inventory and Supplies", items: "Packaging, workplace supplies, samples, marketing materials and overflow stock." },
    { title: "Employee Equipment", items: "Labelled workstation assets and approved equipment assigned to teams or departments." },
];

const storageScenarios = [
    {
        title: "Delayed Office Handover",
        description:
            "Leave the current premises on time while furniture and equipment remain stored until access to the new office is confirmed.",
    },
    {
        title: "Phased Fit-Out",
        description:
            "Deliver priority workstations first and keep surplus assets off-site while contractors finish remaining floors or rooms.",
    },
    {
        title: "Furniture Storage",
        description:
            "Hold desks, chairs, cabinets and meeting-room furniture during refurbishment, downsizing or workplace reconfiguration.",
    },
    {
        title: "Archive Storage",
        description:
            "Move approved boxed records away from operational areas and arrange later delivery when specific consignments are required.",
    },
    {
        title: "Equipment Storage",
        description:
            "Keep approved IT, office or operational equipment in managed storage until installation teams or destination rooms are ready.",
    },
    {
        title: "Overflow Inventory",
        description:
            "Create temporary capacity for supplies, retail stock, samples or business inventory during a premises change.",
    },
    {
        title: "Multi-Site Consolidation",
        description:
            "Use one storage point while assets from several offices are assessed, organised and assigned to their final destination.",
    },
    {
        title: "Scheduled Return Delivery",
        description:
            "Arrange full, partial or staged return so departments receive the right assets at the right stage of the relocation.",
    },
];

const costFactors = [
    {
        title: "Office Size and Volume",
        description:
            "The number of workstations, rooms, boxes, fixtures and equipment affects labour, vehicle capacity and project duration.",
    },
    {
        title: "Access and Building Rules",
        description:
            "Loading bays, service lifts, security procedures, parking restrictions, long carries and booked access windows affect planning.",
    },
    {
        title: "Packing and Labelling",
        description:
            "Pricing changes depending on whether your team packs or KXH provides materials, packing, labelling and furniture protection.",
    },
    {
        title: "Dismantling and Reassembly",
        description:
            "Desk systems, shelving, tables and other furniture may require additional time, tools and an agreed installation scope.",
    },
    {
        title: "IT and Specialist Handling",
        description:
            "Sensitive or high-value equipment may require a more detailed inventory, additional protection and coordination with your IT team.",
    },
    {
        title: "Storage and Delivery Phases",
        description:
            "Storage duration, partial retrievals, multiple delivery dates and delivery to more than one site influence the total quotation.",
    },
];

const businessProblems = [
    {
        title: "Business Downtime",
        description:
            "Phased collections, out-of-hours scheduling and prioritised delivery can reduce disruption to staff and customer operations.",
    },
    {
        title: "Expensive Equipment at Risk",
        description:
            "Agreed packing, labelling and handling procedures help protect approved IT and operational assets during each handover.",
    },
    {
        title: "New Premises Not Ready",
        description:
            "Managed storage provides a practical buffer when fit-out, lease, access or construction timelines change.",
    },
    {
        title: "Too Many Suppliers",
        description:
            "KXH can connect removals, storage, inventory organisation and scheduled delivery through one relocation plan.",
    },
    {
        title: "Complex Building Access",
        description:
            "The plan can account for loading bays, security desks, lift reservations, restricted hours and London parking controls.",
    },
    {
        title: "Phased Department Moves",
        description:
            "Move essential teams first while furniture, archives or lower-priority equipment remain organised off-site.",
    },
    {
        title: "Unclear Asset Ownership",
        description:
            "Room, team, department or item labels can support clearer allocation before storage and later return delivery.",
    },
    {
        title: "Surplus Furniture and Archives",
        description:
            "Avoid filling the new office with items that are not immediately needed by placing approved assets into managed storage.",
    },
];

const whyChooseKxh = [
    {
        title: "One Managed Relocation",
        description:
            "Office removals, storage, inventory organisation and return delivery are planned as connected stages rather than separate bookings.",
    },
    {
        title: "Professional Handling",
        description:
            "The agreed service can include packing, labelling, furniture protection, careful loading and reassembly at the destination.",
    },
    {
        title: "Secure Warehouse Storage",
        description:
            "Assets that cannot move directly can be held in managed storage until the new office or delivery phase is ready.",
    },
    {
        title: "Inventory Organisation",
        description:
            "Agreed labels, manifests, item records or storage zones help keep business assets identifiable throughout the relocation.",
    },
    {
        title: "Flexible Scheduling",
        description:
            "Daytime, evening or weekend work may be planned subject to availability, access permissions and the confirmed project scope.",
    },
    {
        title: "Staged Delivery",
        description:
            "Priority furniture and equipment can be delivered first while lower-priority assets remain stored for later phases.",
    },
    {
        title: "London Access Planning",
        description:
            "The team plans around controlled parking, loading restrictions, service entrances, lifts and building-management requirements.",
    },
    {
        title: "Clear Communication",
        description:
            "Your quote and agreed relocation plan set out the collection, handling, storage and delivery requirements before work begins.",
    },
];

const comparisonRows = [
    { feature: "Office removals", traditional: "Usually included", kxh: "Included in the agreed relocation plan" },
    { feature: "Packing and labelling", traditional: "Optional or separately scoped", kxh: "Available within one managed service" },
    { feature: "Furniture protection", traditional: "Focused on direct transport", kxh: "Planned for moving and storage handling" },
    { feature: "Dismantling and reassembly", traditional: "Provider dependent", kxh: "Available where agreed in advance" },
    { feature: "IT equipment handling", traditional: "May require another specialist", kxh: "Coordinated with your team within the agreed scope" },
    { feature: "Temporary storage", traditional: "Often arranged separately", kxh: "Connected directly to the office move" },
    { feature: "Inventory organisation", traditional: "Limited or separate", kxh: "Available for agreed stored assets" },
    { feature: "Partial or staged delivery", traditional: "May require repeat bookings", kxh: "Planned as part of the relocation sequence" },
    { feature: "Archive and furniture storage", traditional: "Usually separate", kxh: "Available through KXH business storage" },
    { feature: "One point of coordination", traditional: "Several suppliers may be involved", kxh: "One managed logistics partner" },
    { feature: "Changing timelines", traditional: "Can create rebooking pressure", kxh: "Storage can provide a practical buffer" },
    { feature: "Ongoing commercial logistics", traditional: "Usually outside scope", kxh: "Supported through connected storage and delivery services" },
];

const industries = [
    { title: "Corporate Offices", description: "Departmental, floor-by-floor and complete workplace relocations." },
    { title: "Technology Companies", description: "Moves involving workstations, monitors and approved IT equipment." },
    { title: "Professional Services", description: "Structured relocations for consultancies, accountants and advisory firms." },
    { title: "Legal Firms", description: "Office furniture, boxed files, archives and carefully labelled departmental assets." },
    { title: "Healthcare Offices", description: "Approved non-clinical furniture, records and administrative equipment." },
    { title: "Education Organisations", description: "Administrative offices, staff equipment, furniture and stored materials." },
    { title: "Marketing Agencies", description: "Creative workspaces, production furniture, samples and campaign materials." },
    { title: "Retail Businesses", description: "Head-office assets, shop fixtures, stock and temporary storage during changeovers." },
    { title: "Creative Studios", description: "Worktables, props, equipment, samples and flexible staged delivery." },
    { title: "Ecommerce Businesses", description: "Office relocation combined with inventory and packaging storage." },
    { title: "Warehouses and Operations", description: "Office assets, stock-support equipment and multi-site consolidation." },
    { title: "Small and Growing Businesses", description: "Flexible relocation support without coordinating several separate suppliers." },
];

const preparationItems = [
    "Confirm the collection and destination addresses",
    "Nominate a relocation contact for each site",
    "Share floor plans, loading and lift information",
    "Identify priority departments and workstations",
    "List furniture requiring dismantling or reassembly",
    "Separate items moving directly from items entering storage",
    "Identify approved IT or specialist equipment",
    "Confirm building security and access procedures",
    "Label assets by room, team or delivery phase",
    "Provide expected storage and return-delivery dates",
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

const relatedServices = [
    {
        title: "Moving & Storage London",
        href: "/moving-storage-london",
        description: "Managed removals, temporary storage and return delivery for moves where dates or destinations do not align.",
    },
    {
        title: "Business Storage London",
        href: "/business-storage-london",
        description: "Managed storage for office furniture, equipment, stock and operational assets with collection and return delivery.",
    },
    {
        title: "Commercial Storage London",
        href: "/commercial-storage-london",
        description: "Flexible off-site capacity for companies relocating, refurbishing, expanding or reorganising premises.",
    },
    {
        title: "Inventory Management London",
        href: "/inventory-management-london",
        description: "Physical organisation of stored business assets using agreed item records, labels, zones or manifests.",
    },
    {
        title: "Warehouse Storage London",
        href: "/warehouse-storage-london",
        description: "Secure managed warehouse storage for larger commercial quantities and assets awaiting delivery.",
    },
    {
        title: "Retail Stock Storage London",
        href: "/retail-stock-storage-london",
        description: "Storage for retail inventory, seasonal stock, shop fixtures and equipment during relocations or refurbishments.",
    },
    {
        title: "Ecommerce Storage London",
        href: "/ecommerce-storage-london",
        description: "Flexible storage for online retail stock, packaging, overflow inventory and organised collections or returns.",
    },
    {
        title: "Moving Services London",
        href: "/logistics-moving-london",
        description: "Direct office, commercial and residential removals where temporary storage is not central to the move.",
    },
];

const faqs = [
    {
        question: "Can you move offices outside normal business hours?",
        answer:
            "Evening, weekend or other out-of-hours office moves may be available subject to team availability, both buildings' access rules and the agreed relocation scope. Include your preferred working window when requesting a quote.",
    },
    {
        question: "Do you provide office packing services?",
        answer:
            "Yes. Packing materials, labelled crate or box preparation, furniture wrapping and selected-item packing can be included. The quotation should clearly state what your team will pack and what KXH will prepare.",
    },
    {
        question: "Can office furniture be stored temporarily?",
        answer:
            "Yes. Desks, chairs, cabinets, meeting-room furniture and other approved items can be collected, placed into managed storage and returned when the new premises or relevant department is ready.",
    },
    {
        question: "Can you relocate computers and IT equipment?",
        answer:
            "KXH can handle approved computers, monitors, printers, peripherals and other agreed equipment. Your IT team should normally manage shutdown, data security, cabling decisions and recommissioning unless a different scope is agreed.",
    },
    {
        question: "Do you dismantle and reassemble office furniture?",
        answer:
            "Furniture dismantling and reassembly may be included for agreed desks, tables, shelving and other suitable items. Share photographs, quantities and manufacturer information where available so the work can be assessed.",
    },
    {
        question: "Can you relocate office archives and documents?",
        answer:
            "Yes. Approved boxed archives, files and records can be moved or stored using agreed labels and handling instructions. Tell KXH about confidentiality, retention or access requirements before the move.",
    },
    {
        question: "Can you manage a phased office relocation?",
        answer:
            "Yes. A phased plan can move teams, floors or priority equipment in sequence while other furniture, archives or assets remain stored for later delivery.",
    },
    {
        question: "Can you move several offices into one location?",
        answer:
            "Multi-site consolidation can be planned around separate collection windows, asset labelling, temporary storage and staged delivery to the final premises.",
    },
    {
        question: "How long does an office move take?",
        answer:
            "The duration depends on office size, item volume, packing, dismantling, access restrictions, travel, lift bookings, storage and the number of delivery phases. KXH confirms the expected operational plan after reviewing the details.",
    },
    {
        question: "What happens if our new office is not ready?",
        answer:
            "Approved furniture, equipment, archives or stock can move into managed warehouse storage until access is confirmed. Delivery can then be arranged in full or in agreed stages.",
    },
    {
        question: "Can equipment be delivered later than the main office move?",
        answer:
            "Yes. Priority items can move first while selected equipment remains stored. Later delivery should be planned in advance so items are labelled and organised for the correct phase.",
    },
    {
        question: "Do you provide business storage after the relocation?",
        answer:
            "Yes. Businesses can continue using managed storage for surplus furniture, archives, equipment, stock or operational assets after the main relocation is complete.",
    },
    {
        question: "How should we prepare staff for an office move?",
        answer:
            "Nominate internal coordinators, confirm packing responsibilities, label personal and departmental equipment, communicate downtime, back up data and give staff clear deadlines for clearing workstations.",
    },
    {
        question: "How is an office relocation priced?",
        answer:
            "Pricing depends on volume, labour, vehicles, access, packing, furniture dismantling, equipment handling, move timing, storage duration and the number of delivery phases. KXH provides a tailored quotation for the agreed scope.",
    },
    {
        question: "What information is needed for an office relocation quote?",
        answer:
            "Provide both addresses, preferred dates, access details, approximate workstation and furniture quantities, photographs or an inventory, packing requirements, IT equipment details and any storage or staged-delivery needs.",
    },
];

function ServiceJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Office Relocation London",
        serviceType: "Office Relocation Service",
        url: pageUrl,
        description:
            "Fully managed office relocation in London with professional removals, furniture handling, IT equipment transport, warehouse storage, inventory organisation and staged delivery.",
        provider: {
            "@type": "LocalBusiness",
            "@id": "https://kxhlogistics.co.uk/#business",
            name: "KXH Storage & Logistics",
            url: "https://kxhlogistics.co.uk",
            telephone: "+44 7386 277785",
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
            name: "Office Relocation Services",
            itemListElement: [
                "Office Removals London",
                "Business Relocation Planning",
                "Office Furniture Removals",
                "Furniture Dismantling and Reassembly",
                "IT Equipment Relocation",
                "Office Archive Relocation",
                "Temporary Business Storage",
                "Inventory Organisation",
                "Phased Office Moves",
                "Scheduled Return Delivery",
            ].map((name) => ({
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
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kxhlogistics.co.uk" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://kxhlogistics.co.uk/services" },
            { "@type": "ListItem", position: 3, name: "Moving Services", item: "https://kxhlogistics.co.uk/logistics-moving-london" },
            { "@type": "ListItem", position: 4, name: "Office Relocation London", item: pageUrl },
        ],
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
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
            <span className="font-medium text-slate-700">Office Relocation London</span>
        </nav>
    );
}

function HeroSection() {
    return (
        <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    Fully Managed Business Relocation Across London
                </div>

                <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                    Office Relocation London Made Simple
                </h1>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                    Move your office with one London logistics partner managing professional removals, packing, furniture handling, approved IT equipment, secure warehouse storage, inventory organisation and scheduled delivery.
                </p>

                <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                    KXH supports complete office moves, phased relocations, departmental moves, refurbishments and premises changes where business continuity matters more than simply transporting items from A to B.
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
                        Get a Free Office Move Quote
                    </Link>
                    <a href={`tel:${phoneNumber}`} className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:w-auto">
                        Call KXH
                    </a>
                </div>

                <p className="mt-4 text-sm text-slate-500">Tell us your locations, office size, preferred dates, access requirements and whether temporary storage is needed.</p>
                <div className="mt-6 flex justify-center"><TrustpilotPill /></div>

                <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                    <Image
                        src="/images/moving-services/moving-services-team-working.webp"
                        alt="KXH office relocation team moving business furniture and equipment in London"
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

function WhyProfessionalRelocationSection() {
    return (
        <section aria-labelledby="why-professional-relocation" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Why Use Office Relocation Specialists?</p>
                    <h2 id="why-professional-relocation" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Protect Business Continuity While the Workplace Changes</h2>
                    <p className="mt-4 leading-7 text-slate-600">An office move affects staff, technology, customer service, building access and daily operations. A managed plan reduces avoidable handovers and keeps the physical relocation aligned with your business timeline.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {relocationReasons.map((item) => (
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
        <section aria-labelledby="office-relocation-process" className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">How It Works</p>
                    <h2 id="office-relocation-process" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">One Managed Office Relocation Plan From First Collection to Final Delivery</h2>
                    <p className="mt-4 leading-7 text-slate-600">The exact sequence depends on your premises, timetable and assets, but every project starts with a clear scope and finishes with an agreed delivery outcome.</p>
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
                <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8">
                    <h3 className="text-xl font-bold text-slate-950">What happens after you request a quote?</h3>
                    <p className="mx-auto mt-3 max-w-3xl leading-7 text-slate-600">KXH reviews the information, identifies anything that needs clarification and prepares a tailored scope covering labour, vehicles, packing, access, storage and delivery. Work is scheduled only after the quotation and service requirements are agreed.</p>
                    <Link href={quoteUrl} className="mt-5 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">Start Your Relocation Plan</Link>
                </div>
            </div>
        </section>
    );
}

function WhatWeMoveSection() {
    return (
        <section aria-labelledby="what-we-move" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">What We Move</p>
                    <h2 id="what-we-move" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Office Furniture, Equipment, Archives and Operational Assets</h2>
                    <p className="mt-4 leading-7 text-slate-600">Every relocation should start with an accurate inventory. Tell KXH about unusually heavy, fragile, confidential, high-value or specialist items before the move so suitability and handling can be assessed.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {moveItems.map((item) => (
                        <article key={item.title} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm">
                            <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{item.items}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function StorageSection() {
    return (
        <section aria-labelledby="temporary-business-storage" className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Temporary Business Storage</p>
                    <h2 id="temporary-business-storage" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Build Storage Into the Office Move Instead of Arranging It Later</h2>
                    <p className="mt-4 leading-7 text-slate-600">Storage gives your relocation room to adapt when fit-out work, lease dates, furniture decisions or departmental delivery schedules do not align.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {storageScenarios.map((item) => (
                        <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                        </article>
                    ))}
                </div>
                <p className="mx-auto mt-8 max-w-3xl text-center leading-7 text-slate-600">
                    Explore <Link href="/business-storage-london" className="font-semibold text-emerald-700 hover:underline">Business Storage London</Link>, <Link href="/commercial-storage-london" className="font-semibold text-emerald-700 hover:underline">Commercial Storage London</Link> and <Link href="/inventory-management-london" className="font-semibold text-emerald-700 hover:underline">Inventory Management London</Link> for ongoing requirements.
                </p>
            </div>
        </section>
    );
}

function CostSection() {
    return (
        <section aria-labelledby="office-relocation-cost" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Pricing Explained</p>
                    <h2 id="office-relocation-cost" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">What Affects the Cost of an Office Relocation in London?</h2>
                    <p className="mt-4 leading-7 text-slate-600">A reliable quote must reflect the real labour, access, protection, transport, storage and delivery requirements. KXH prices the agreed project rather than relying on a headline rate that may exclude essential work.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {costFactors.map((factor) => (
                        <article key={factor.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="text-lg font-bold text-slate-950">{factor.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{factor.description}</p>
                        </article>
                    ))}
                </div>
                <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-slate-950">For the most accurate quotation, provide:</h3>
                    <p className="mt-3 leading-7 text-slate-600">An item list or photographs, both addresses, floor and access details, preferred dates, packing responsibilities, IT or specialist handling requirements, furniture dismantling needs, expected storage duration and the proposed delivery sequence.</p>
                    <Link href={quoteUrl} className="mt-5 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">Get a Tailored Office Move Quote</Link>
                </div>
            </div>
        </section>
    );
}

function ProblemsSection() {
    return (
        <section aria-labelledby="business-problems" className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Business Problems We Solve</p>
                    <h2 id="business-problems" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">A Relocation Plan Built Around Operational Reality</h2>
                    <p className="mt-4 leading-7 text-slate-600">London office moves rarely involve a single empty building, an unrestricted loading area and a new premises that is completely ready. The service is designed around those practical complications.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {businessProblems.map((problem) => (
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

function ManagedRelocationSection() {
    return (
        <section aria-labelledby="managed-office-relocation" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <Image
                    src="/images/moving-services/moving-services-packing-loading.webp"
                    alt="Professional packing and furniture protection for a London office relocation"
                    width={1400}
                    height={800}
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                    loading="lazy"
                    decoding="async"
                />
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">More Than an Office Moving Company</p>
                    <h2 id="managed-office-relocation" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">One Partner for Removals, Storage, Organisation and Delivery</h2>
                    <p className="mt-4 leading-7 text-slate-600">Traditional office removals focus on the journey between two buildings. KXH can also manage the gap between those buildings: temporary storage, physical inventory organisation, phased returns and ongoing commercial storage.</p>
                    <p className="mt-4 leading-7 text-slate-600">That means your business does not have to separately coordinate movers, van hire, self-storage, warehouse unloading and another delivery provider later. The agreed service is planned as one connected workflow.</p>
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                        {[
                            "Professional office removals",
                            "Packing and asset protection",
                            "Furniture dismantling and reassembly",
                            "Approved IT equipment handling",
                            "Managed warehouse storage",
                            "Inventory organisation",
                            "Phased and scheduled delivery",
                            "Commercial storage after the move",
                        ].map((item) => (
                            <li key={item} className="text-sm font-medium text-slate-700 sm:text-base"><span className="mr-2 text-emerald-700" aria-hidden="true">✓</span>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function WhyKxhSection() {
    return (
        <section aria-labelledby="why-kxh" className="bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Why London Businesses Choose KXH</p>
                    <h2 id="why-kxh" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Managed Logistics Without the Self-Storage Handoffs</h2>
                    <p className="mt-4 leading-7 text-slate-600">KXH focuses on the full journey of your business assets—from the old office, through storage where required and into the destination according to the agreed sequence.</p>
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
        <section aria-labelledby="office-relocation-comparison" className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Office Movers Compared</p>
                    <h2 id="office-relocation-comparison" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Traditional Office Movers vs KXH Managed Office Relocation</h2>
                    <p className="mt-4 leading-7 text-slate-600">Direct movers are suitable when everything can travel immediately into a ready office. KXH is designed for businesses that also need storage, organisation, flexible timing or staged delivery.</p>
                </div>

                <div className="mt-12 hidden overflow-hidden rounded-2xl border border-slate-200 lg:block">
                    <div className="grid grid-cols-[1.3fr_1fr_1fr] bg-emerald-800 text-sm font-bold text-white">
                        <div className="p-5">Service Feature</div>
                        <div className="border-l border-white/10 p-5 text-center">Traditional Office Movers</div>
                        <div className="border-l border-white/10 p-5 text-center">KXH Office Relocation</div>
                    </div>
                    {comparisonRows.map((row) => (
                        <div key={row.feature} className="grid grid-cols-[1.3fr_1fr_1fr] border-t border-slate-200 text-sm">
                            <div className="bg-slate-100 p-5 font-semibold text-slate-900">{row.feature}</div>
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
                                <div className="grid grid-cols-[8rem_1fr] gap-3 p-4"><dt className="font-semibold">Traditional</dt><dd className="text-slate-600">{row.traditional}</dd></div>
                                <div className="grid grid-cols-[8rem_1fr] gap-3 bg-emerald-50 p-4"><dt className="font-semibold text-emerald-900">KXH</dt><dd className="text-emerald-900">{row.kxh}</dd></div>
                            </dl>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function IndustriesSection() {
    return (
        <section aria-labelledby="industries-supported" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Industries We Support</p>
                    <h2 id="industries-supported" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Commercial Relocation Support for Different London Workplaces</h2>
                    <p className="mt-4 leading-7 text-slate-600">The project scope should reflect the building, assets and operational requirements of your organisation rather than using a one-size-fits-all office moving checklist.</p>
                </div>
                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {industries.map((industry) => (
                        <article key={industry.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="text-lg font-bold text-slate-950">{industry.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{industry.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PreparationSection() {
    return (
        <section aria-labelledby="prepare-office-move" className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Prepare for the Move</p>
                    <h2 id="prepare-office-move" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Information That Helps Your Office Relocation Run Smoothly</h2>
                    <p className="mt-4 leading-7 text-slate-600">Accurate details help prevent avoidable delays on collection day. London offices often involve security checks, booked service lifts, loading restrictions, controlled parking zones and strict building-management windows.</p>
                    <p className="mt-4 leading-7 text-slate-600">Internally, assign decision-makers early. Your staff should know what is moving, what is being stored, what they must pack and which equipment must remain operational until the final working day.</p>
                    <Link href={quoteUrl} className="mt-6 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">Discuss Your Office Move</Link>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-slate-950">Office relocation planning checklist</h3>
                    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                        {preparationItems.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                                <span className="mt-0.5 font-bold text-emerald-700" aria-hidden="true">✓</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function DeliverySection() {
    return (
        <section aria-labelledby="staged-delivery" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Flexible Delivery Planning</p>
                    <h2 id="staged-delivery" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Deliver the Office in the Order the Business Needs It</h2>
                    <p className="mt-4 leading-7 text-slate-600">Commercial relocations do not always require every asset at the same time. Storage and labelling can support a more controlled sequence.</p>
                    <ol className="mt-7 space-y-4 text-sm leading-6 text-slate-700 sm:text-base">
                        <li><strong className="text-slate-950">Direct move:</strong> approved assets travel from the existing office to the ready destination.</li>
                        <li><strong className="text-slate-950">Priority delivery:</strong> essential workstations, equipment or department assets arrive first.</li>
                        <li><strong className="text-slate-950">Phased delivery:</strong> remaining furniture and equipment arrive as floors or rooms are completed.</li>
                        <li><strong className="text-slate-950">Ongoing storage:</strong> surplus furniture, archives or stock remain off-site after the main move.</li>
                    </ol>
                    <p className="mt-6 leading-7 text-slate-600">Likely retrieval and delivery requirements should be identified before items enter storage so the consignment can be organised around the relocation plan.</p>
                </div>
                <Image
                    src="/images/moving-services/moving-services-team.webp"
                    alt="KXH team preparing staged delivery for a London office relocation"
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

function LondonCoverageSection() {
    return (
        <section aria-labelledby="london-coverage" className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Areas We Cover</p>
                    <h2 id="london-coverage" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Office Relocation Across London Boroughs</h2>
                    <p className="mt-4 leading-7 text-slate-600">KXH supports approved office collections and deliveries across London. Every plan considers building access, parking controls, loading restrictions, service lifts, security and time-sensitive moving windows.</p>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {coverageAreas.map((area) => (
                        <Link key={area.href} href={area.href} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm">
                            <h3 className="font-semibold text-slate-900">Office Relocation in {area.name}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Commercial removals, temporary storage and scheduled delivery for London businesses.</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function RelatedServicesSection() {
    return (
        <section aria-labelledby="related-services" className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Related Services</p>
                    <h2 id="related-services" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Build the Right Logistics and Storage Plan Around Your Office Move</h2>
                    <p className="mt-4 leading-7 text-slate-600">Use specialist KXH services for ongoing business storage, larger warehouse requirements, inventory organisation and commercial stock.</p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {relatedServices.map((service) => (
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
            <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
                <p className="text-sm font-semibold uppercase tracking-wide !text-white">Plan Your Business Move</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">Planning an Office Relocation in London?</h2>
                <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-200">Tell us what is moving, both locations, your target dates, access requirements and whether you need packing, temporary storage or staged delivery. KXH will review the project and prepare a tailored quotation.</p>
                <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium text-emerald-50">
                    <span>✓ Professional planning</span>
                    <span>✓ Secure transport</span>
                    <span>✓ Managed storage</span>
                    <span>✓ Scheduled delivery</span>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link href={quoteUrl} className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 sm:w-auto sm:px-8">Get Your Free Business Moving Quote</Link>
                    <a href={`tel:${phoneNumber}`} className="w-full rounded-xl border border-white/20 px-6 py-4 text-center font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:px-8">Call KXH</a>
                </div>
            </div>
        </section>
    );
}

function OfficeRelocationFaqsSection() {
    return (
        <section aria-labelledby="office-relocation-faqs" className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16">
            <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                <h2 id="office-relocation-faqs" className="mb-8 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Office Relocation London FAQs</h2>
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

export default function OfficeRelocationLondonPage() {
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
                <WhyProfessionalRelocationSection />
                <ProcessSection />
                <WhatWeMoveSection />
                <StorageSection />
                <CostSection />
                <ProblemsSection />
                <ManagedRelocationSection />
                <WhyKxhSection />
                <ComparisonSection />
                <IndustriesSection />
                <PreparationSection />
                <DeliverySection />
                <LondonCoverageSection />
                <RelatedServicesSection />
                <TestimonialsSection />
                <FinalCallToActionSection />
                <OfficeRelocationFaqsSection />
                <MainFooter locations={londonLocations} />
            </main>
        </>
    );
}