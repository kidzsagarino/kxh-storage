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

const pageUrl = "https://kxhlogistics.co.uk/moving-storage-london";
const quoteUrl = "/get-a-quote?service=storage";

export const metadata: Metadata = {
    title: "Moving & Storage London | Collection, Storage & Delivery",
    description:
        "Managed moving and storage in London with professional collection, secure warehouse storage, inventory organisation and flexible return delivery.",
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        type: "website",
        url: pageUrl,
        title: "Moving & Storage London | KXH Storage & Logistics",
        description:
            "Move directly, store between addresses or arrange staged delivery with one London team managing collection, removals, storage and return.",
        images: [
            {
                url: "/images/moving-services/moving-services-hero.webp",
                width: 1200,
                height: 630,
                alt: "KXH moving and storage team collecting furniture in London",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Moving & Storage London | KXH",
        description:
            "Professional removals, secure storage, organised inventory and return delivery across London.",
        images: ["/images/moving-services/moving-services-hero.webp"],
    },
};

const heroBenefits = [
    "Professional collection",
    "Careful moving team",
    "Secure warehouse storage",
    "Flexible return delivery",
];

const serviceScenarios = [
    {
        title: "Your Completion Date Changed",
        description:
            "Move out on schedule even when keys for the next property are delayed. We can collect, store and redeliver when completion is confirmed.",
    },
    {
        title: "You Are Renovating",
        description:
            "Protect furniture and create working space by moving selected belongings into storage for part or all of a refurbishment project.",
    },
    {
        title: "You Are Waiting for a New Build",
        description:
            "Avoid extending a tenancy or filling temporary accommodation with boxes while waiting for a property to be completed.",
    },
    {
        title: "You Are Downsizing or Decluttering",
        description:
            "Clear rooms before photography, viewings or a sale, then decide what should move, remain stored or be returned later.",
    },
    {
        title: "You Are Moving Abroad",
        description:
            "Store furniture, personal belongings and selected household items while accommodation, shipping or long-term plans are finalised.",
    },
    {
        title: "Your Business Premises Are Not Ready",
        description:
            "Use temporary warehouse space for office furniture, equipment, archives or stock during relocation, refurbishment or fit-out work.",
    },
    {
        title: "You Need Temporary Accommodation",
        description:
            "Keep bulky belongings out of short-term accommodation and arrange delivery only when your permanent address is ready.",
    },
    {
        title: "You Are a Student Between Tenancies",
        description:
            "Coordinate collection, summer storage and return delivery between halls, shared accommodation, travel and the next academic term.",
    },
];

const customerTypes = [
    {
        title: "Homeowners Between Completion Dates",
        description:
            "When a sale completes before the next purchase, KXH can collect the contents of your property, place them into managed storage and deliver them after keys are released. This avoids filling temporary accommodation with furniture or arranging several separate removals.",
    },
    {
        title: "Renters Between Tenancies",
        description:
            "A short gap between rental agreements can create a major logistics problem. We can collect boxes, furniture and personal belongings at the end of one tenancy, store them for the required period and return them to the next London address.",
    },
    {
        title: "Families Renovating a Home",
        description:
            "Removing furniture before building work creates safer working space and protects belongings from dust, paint and accidental damage. Store one room, one floor or the contents of the whole property until the renovation reaches the right stage.",
    },
    {
        title: "People Relocating Overseas",
        description:
            "International moves do not always have a fixed final address. KXH can hold selected household belongings while accommodation, shipping, employment or visa arrangements are finalised, then coordinate an agreed return or onward delivery.",
    },
    {
        title: "Landlords and Property Professionals",
        description:
            "Landlords, estate agents, developers and property managers can use temporary storage to clear homes for sale, protect furnishings during works, manage tenant changeovers or hold staging furniture between projects.",
    },
    {
        title: "Students Between Accommodation",
        description:
            "Students leaving halls or shared housing can arrange collection before travelling, store luggage and small furniture through the summer, and schedule return delivery when the next tenancy or academic term begins.",
    },
    {
        title: "Offices Planning a Phased Relocation",
        description:
            "Businesses can move essential teams and equipment first while surplus furniture, archives, fixtures or stock remain stored. Staged delivery reduces congestion and helps fit-out teams prepare the new workplace.",
    },
    {
        title: "Retailers and Ecommerce Businesses",
        description:
            "Temporary warehouse capacity can support shop refurbishments, seasonal inventory peaks, premises changes or stock transfers. Items can be collected, organised and returned according to an agreed operational plan.",
    },
];

const costFactors = [
    { title: "Volume and Item Type", description: "The number, size, weight and handling requirements of furniture, boxes, equipment or stock affect labour, vehicle and storage capacity." },
    { title: "Collection and Delivery Access", description: "Stairs, lifts, loading bays, long carries, concierge rules, parking controls and restricted access can change the time and team required." },
    { title: "Packing and Protection", description: "Costs vary depending on whether you pack yourself or require materials, full packing, fragile-item preparation, furniture wrapping or dismantling." },
    { title: "Storage Duration", description: "A short bridge between dates is different from long-term storage. The quotation reflects the expected period and the capacity reserved." },
    { title: "Return Delivery Plan", description: "A single full return is usually simpler than several partial retrievals, staged deliveries or delivery to more than one approved address." },
    { title: "Timing and Flexibility", description: "Preferred dates, short notice, weekends, waiting time and uncertain completion schedules may affect availability and operational planning." },
];

const warehouseJourney = [
    { number: "01", title: "Arrival and Check-In", description: "The vehicle arrives at the managed facility and the agreed consignment is checked into the storage process." },
    { number: "02", title: "Item Identification", description: "Items can be matched to agreed labels, room references, records or manifests so they are easier to locate later." },
    { number: "03", title: "Storage Planning", description: "The team considers size, handling, fragility, likely retrieval needs and efficient use of the allocated storage area." },
    { number: "04", title: "Managed Placement", description: "Belongings are placed into the agreed warehouse space rather than requiring you to unload and organise a self-storage unit." },
    { number: "05", title: "Ongoing Organisation", description: "Where agreed, stored items remain associated with inventory records, zones or grouped consignments during the storage period." },
    { number: "06", title: "Return Preparation", description: "When delivery is requested, the relevant items are prepared for full, partial or staged dispatch according to the confirmed plan." },
];

const preparationItems = [
    "Confirm the collection and destination addresses",
    "Share lift, stair, concierge and loading-bay details",
    "Identify items requiring dismantling or specialist handling",
    "Reserve parking or building access where required",
    "Separate anything that must not enter storage",
    "Label priority items needed for early return",
    "Provide realistic storage-duration expectations",
    "Tell us whether return will be full, partial or staged",
];

const serviceSteps = [
    {
        number: "1",
        title: "Request a Quote",
        description:
            "Share collection details, item volume, access, preferred dates, storage duration and the expected delivery plan.",
    },
    {
        number: "2",
        title: "Confirm the Move",
        description:
            "We review labour, vehicle, packing, property access and storage requirements, then confirm the agreed service scope.",
    },
    {
        number: "3",
        title: "Collection and Handling",
        description:
            "Our moving team protects, loads and transports your belongings from the home, office, flat, shop or other approved address.",
    },
    {
        number: "4",
        title: "Warehouse Storage",
        description:
            "Items are placed into secure managed storage for the agreed short-term or long-term period rather than left for you to self-store.",
    },
    {
        number: "5",
        title: "Inventory Organisation",
        description:
            "Belongings can be organised using agreed item records, labels, zones or manifests so stored items remain easier to identify and manage.",
    },
    {
        number: "6",
        title: "Return When Ready",
        description:
            "Arrange full, partial, staged or final delivery to the new property, office or another approved London address.",
    },
];

const storageOptions = [
    {
        title: "Short-Term Moving Storage",
        description:
            "Flexible storage for days, weeks or a few months while waiting for keys, completing renovation work or bridging tenancy dates.",
    },
    {
        title: "Long-Term Moving Storage",
        description:
            "Managed storage for customers relocating abroad, downsizing, delaying a permanent move or keeping selected belongings off-site.",
    },
    {
        title: "Furniture Storage",
        description:
            "Storage for sofas, beds, wardrobes, tables, appliances and other household or commercial furniture requiring careful handling.",
    },
    {
        title: "Boxes and Personal Belongings",
        description:
            "Store labelled boxes, luggage, household contents, books, clothing and selected personal items between addresses.",
    },
    {
        title: "Office Equipment and Furniture",
        description:
            "Temporary capacity for desks, chairs, cabinets, meeting-room furniture, equipment and operational assets during an office move.",
    },
    {
        title: "Business Inventory Storage",
        description:
            "Organised storage for stock, supplies, fixtures and business assets requiring collection, physical inventory control and scheduled return.",
    },
    {
        title: "Pallet and Warehouse Storage",
        description:
            "Commercial storage for palletised goods, overflow inventory and larger quantities that cannot move directly into new premises.",
    },
    {
        title: "Seasonal and Staged Storage",
        description:
            "Keep seasonal items or lower-priority belongings stored while essential items are delivered first as part of a staged move.",
    },
];

const problems = [
    {
        title: "Property-Chain Delays",
        description:
            "The sale completes but the onward purchase does not. We bridge the gap without forcing all belongings into temporary accommodation.",
    },
    {
        title: "Renovation Disruption",
        description:
            "Dust, contractors and restricted access place furniture at risk. Off-site storage creates working space and protects selected belongings.",
    },
    {
        title: "Uncertain Return Dates",
        description:
            "When timelines change, storage can continue for the agreed period and delivery can be scheduled once access is confirmed.",
    },
    {
        title: "Too Many Providers",
        description:
            "Using separate movers, van hire, self-storage and delivery teams creates handovers. KXH coordinates the connected service through one plan.",
    },
    {
        title: "Limited London Access",
        description:
            "Flats, stairs, lift bookings, controlled parking zones and loading restrictions require advance planning at both collection and delivery.",
    },
    {
        title: "Business Downtime",
        description:
            "Phased collection and staged return can reduce congestion at new premises and support fit-out, refurbishment or departmental moves.",
    },
    {
        title: "Not Enough Space",
        description:
            "Keep non-essential furniture, stock or equipment off-site rather than overcrowding a new home, office, shop or studio.",
    },
    {
        title: "Student Summer Gaps",
        description:
            "Store luggage, boxes and small furniture between accommodation contracts, then schedule delivery for the next move-in date.",
    },
];

const residentialFeatures = [
    "House, flat and apartment collections",
    "Packing materials and professional packing",
    "Furniture wrapping and protection",
    "Dismantling and reassembly where agreed",
    "Short or long-term household storage",
    "Partial, staged or full return delivery",
    "Support for delayed completion dates",
    "Storage during renovation or downsizing",
];

const businessFeatures = [
    "Office and commercial removals",
    "Desks, chairs and office furniture",
    "IT and operational equipment",
    "Archives, files and boxed materials",
    "Retail stock and shop fixtures",
    "Warehouse overflow and pallets",
    "Physical inventory organisation",
    "Phased collection and scheduled return",
];

const whyChooseKxh = [
    {
        title: "One Managed Service",
        description:
            "Collection, moving, storage, inventory organisation and return delivery are planned as connected stages rather than separate bookings.",
    },
    {
        title: "Collection and Delivery Included",
        description:
            "You do not need to hire a van, carry belongings into a self-storage unit or organise a separate delivery provider later.",
    },
    {
        title: "Professional Handling",
        description:
            "Moving support can include suitable packing, furniture protection, careful loading, unloading and agreed reassembly.",
    },
    {
        title: "Secure Warehouse Storage",
        description:
            "Belongings are held in managed warehouse storage for the agreed period until the destination or return schedule is ready.",
    },
    {
        title: "Inventory Organisation",
        description:
            "Agreed labels, records, zones or manifests help keep household or business items organised while they are stored.",
    },
    {
        title: "Flexible Storage Periods",
        description:
            "Use storage for a short gap, a longer relocation or a changing project timeline, subject to the agreed service and availability.",
    },
    {
        title: "Staged Return Delivery",
        description:
            "Deliver priority items first and leave other belongings stored until rooms, departments or premises are ready.",
    },
    {
        title: "London Planning Experience",
        description:
            "The service accounts for local access, parking, loading bays, building rules, lifts, stairs and time-sensitive moving dates.",
    },
];

const comparisonRows = [
    { feature: "Professional collection", traditional: "Usually included", kxh: "Included in the agreed plan" },
    { feature: "Packing support", traditional: "Optional or provider dependent", kxh: "Available as part of one service" },
    { feature: "Furniture protection", traditional: "Focused on the direct journey", kxh: "Planned for moving and storage handling" },
    { feature: "Secure storage", traditional: "Often arranged separately", kxh: "Connected directly to the move" },
    { feature: "Warehouse unloading", traditional: "A second provider may handle it", kxh: "Managed within the agreed workflow" },
    { feature: "Return delivery", traditional: "Separate booking may be needed", kxh: "Scheduled when the destination is ready" },
    { feature: "Inventory organisation", traditional: "Provider dependent", kxh: "Available for agreed stored items" },
    { feature: "Partial or staged return", traditional: "May require extra providers", kxh: "Available by arrangement" },
    { feature: "Changing move dates", traditional: "Can create rebooking pressure", kxh: "Storage provides a practical buffer" },
    { feature: "Business stock and equipment", traditional: "May be limited", kxh: "Residential and commercial support" },
    { feature: "One point of coordination", traditional: "Multiple providers may be involved", kxh: "One managed service" },
    { feature: "Self-storage lifting and transport", traditional: "Customer may manage it", kxh: "KXH handles agreed collection and delivery" },
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
        title: "Business Storage London",
        href: "/business-storage-london",
        description: "Managed storage for furniture, equipment, stock and operational assets with collection and return delivery.",
    },
    {
        title: "Commercial Storage London",
        href: "/commercial-storage-london",
        description: "Flexible off-site capacity for companies relocating, refurbishing, expanding or reorganising premises.",
    },
    {
        title: "Inventory Management London",
        href: "/inventory-management-london",
        description: "Physical inventory organisation for stored stock, equipment and business items using agreed records or manifests.",
    },
    {
        title: "Warehouse Storage London",
        href: "/warehouse-storage-london",
        description: "Secure managed warehouse storage for household and commercial items that cannot move directly to their destination.",
    },
    {
        title: "Student Storage London",
        href: "/student-storage-london",
        description: "Collection, storage and redelivery between halls, shared accommodation, summer travel and new tenancies.",
    },
    {
        title: "Retail Stock Storage London",
        href: "/retail-stock-storage-london",
        description: "Storage for retail inventory, seasonal stock, fixtures and shop equipment with managed handling.",
    },
    {
        title: "Ecommerce Storage London",
        href: "/ecommerce-storage-london",
        description: "Flexible storage for online retail stock, packaging, overflow inventory and organised collections or returns.",
    },
    {
        title: "Moving Services London",
        href: "/logistics-moving-london",
        description: "Direct house, apartment, office and commercial removals where storage is optional rather than central to the move.",
    },
];

const faqs = [
    {
        question: "Can you store furniture after collecting it for a move?",
        answer:
            "Yes. KXH can collect furniture and other belongings, move them into managed warehouse storage for the agreed period and arrange delivery when the new property or premises is ready.",
    },
    {
        question: "How long can I keep items in storage?",
        answer:
            "Storage can support short gaps between moving dates or longer relocations. The appropriate period, capacity and return arrangements are confirmed as part of your tailored quotation.",
    },
    {
        question: "Can I retrieve individual items from storage?",
        answer:
            "Partial or selected-item return may be possible when items have been identified and organised in advance. Include likely retrieval requirements when requesting a quote so handling and access can be planned correctly.",
    },
    {
        question: "Do you provide packing for moving and storage?",
        answer:
            "Yes. Packing materials, professional packing, furniture wrapping and protection can be included for selected items or the full move, subject to the agreed service.",
    },
    {
        question: "Can businesses use KXH moving and storage?",
        answer:
            "Yes. KXH supports offices, retailers, studios, ecommerce businesses and other organisations moving furniture, equipment, archives, fixtures, stock and operational assets.",
    },
    {
        question: "Can you move and store office furniture?",
        answer:
            "Yes. Office desks, chairs, cabinets, meeting-room furniture and other approved equipment can be collected, stored and returned as part of a phased or complete office relocation.",
    },
    {
        question: "Do you collect from London flats and apartments?",
        answer:
            "Yes. Apartment collections can be planned around stairs, lifts, concierge requirements, loading bays, parking controls and building-management rules.",
    },
    {
        question: "How secure is the warehouse storage?",
        answer:
            "KXH uses managed warehouse storage rather than leaving customers to handle a self-storage unit. Specific security, access and handling arrangements can be confirmed for your booking and item type.",
    },
    {
        question: "What happens if my moving date changes?",
        answer:
            "Tell KXH as soon as possible. Where availability and the agreed service allow, collection, storage duration or return delivery can be revised around the updated date.",
    },
    {
        question: "Can I combine moving with business inventory storage?",
        answer:
            "Yes. Business moves can combine removals, warehouse storage, physical inventory organisation and scheduled return delivery for stock, furniture, equipment or other operational items.",
    },
    {
        question: "Can you store belongings during a renovation?",
        answer:
            "Yes. KXH can remove selected rooms or a larger volume of belongings before work starts, store them off-site and return them when the property is ready.",
    },
    {
        question: "Can you deliver my belongings in stages?",
        answer:
            "Staged delivery may be arranged so essential furniture, stock or equipment arrives first while lower-priority items remain stored for a later date.",
    },
    {
        question: "Is this different from self-storage?",
        answer:
            "Yes. With self-storage, customers often arrange transport, loading, unloading and later collection themselves. KXH provides a managed service combining agreed collection, storage organisation and return delivery.",
    },
    {
        question: "Do you offer student moving and storage?",
        answer:
            "Yes. Student support can include collection from halls or shared accommodation, summer storage and redelivery for the next tenancy or academic term.",
    },
    {
        question: "How is moving and storage priced?",
        answer:
            "Pricing depends on item volume, collection and delivery locations, access, labour, vehicles, packing, storage duration, inventory requirements and whether return delivery is full, partial or staged. KXH provides a tailored quote.",
    },
];

function ServiceJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Moving & Storage London",
        serviceType: "Moving and Storage Service",
        url: pageUrl,
        description:
            "Fully managed moving and storage in London with professional collection, removals, secure warehouse storage, inventory organisation and flexible return delivery.",
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
            name: "Moving and Storage Services",
            itemListElement: [
                "House Removals with Storage",
                "Temporary Storage During a Move",
                "Furniture Storage During a Move",
                "Office Moving and Storage",
                "Business Moving and Storage",
                "Short-Term Moving Storage",
                "Long-Term Moving Storage",
                "Inventory Organisation and Return Delivery",
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
            { "@type": "ListItem", position: 4, name: "Moving & Storage London", item: pageUrl },
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
        <span className="font-medium text-slate-700">Moving &amp; Storage London</span>
    </nav>
    );
}

function HeroSection() {
    return (
    <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                Managed Collection, Storage and Return Across London
            </div>

            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                Moving &amp; Storage London Made Simple
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                Move directly to your new address or place belongings into secure managed storage until your home, office or commercial premises is ready. KXH coordinates professional movers, collection, careful handling, warehouse storage, inventory organisation and flexible return delivery through one connected service.
            </p>

            <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                Ideal for house removals with storage, delayed completion dates, renovations, temporary accommodation, office moves, student changeovers and any London move where collection and final delivery cannot happen on the same day.
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
                    Get a Free Quote
                </Link>
                <a href="tel:+447470025636" className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:w-auto">
                    Call KXH
                </a>
            </div>

            <p className="mt-4 text-sm text-slate-500">Tell us what needs collecting, where it is, your preferred date and how long storage may be required.</p>

            <div className="mt-6 flex justify-center"><TrustpilotPill /></div>

            <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <Image src="/images/moving-services/moving-services-hero.webp" alt="KXH moving team collecting household furniture for secure storage in London" width={1400} height={800} priority quality={80} sizes="(max-width: 768px) 100vw, 960px" className="h-auto w-full object-cover" />
            </div>
        </div>
    </section>
    );
}

function WhyMovingStorageSection() {
    return (
    <section aria-labelledby="why-moving-storage" className="border-y border-slate-200 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Why Combine Moving and Storage?</p>
                <h2 id="why-moving-storage" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">When the Move-Out Date and Move-In Date Do Not Match</h2>
                <p className="mt-4 leading-7 text-slate-600">A standard removal assumes belongings can travel directly from one property to another. Real moves are often less predictable. KXH creates a practical bridge between collection and final delivery.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {serviceScenarios.map((item) => (
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

function WhoMovingStorageIsForSection() {
    return (
    <section aria-labelledby="who-moving-storage-is-for" className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Who This Service Is For</p>
                <h2 id="who-moving-storage-is-for" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Moving and Storage Built Around Real London Situations</h2>
                <p className="mt-4 leading-7 text-slate-600">The service is useful whenever belongings must leave one address before the final destination is ready, or when a customer wants more control over the order and timing of delivery.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {customerTypes.map((item) => (
                    <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                        <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                    </article>
                ))}
            </div>
            <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8">
                <h3 className="text-xl font-bold text-slate-950">Not sure how long storage will be needed?</h3>
                <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">Share the most likely dates and explain what may change. KXH can quote around the expected move, storage and return requirements and discuss practical options.</p>
                <Link href={quoteUrl} className="mt-5 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">Discuss Your Moving Timeline</Link>
            </div>
        </div>
    </section>
    );
}

function MovingStorageProcessSection() {
    return (
    <section aria-labelledby="moving-storage-process" className="bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">How It Works</p>
                <h2 id="moving-storage-process" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">One Managed Timeline From Collection to Return</h2>
                <p className="mt-4 leading-7 text-slate-600">You deal with one team and one agreed plan rather than separately coordinating movers, self-storage, van hire and later delivery.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {serviceSteps.map((step) => (
                    <article key={step.number} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                        <span className="text-sm font-black text-emerald-700">{step.number}</span>
                        <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                    </article>
                ))}
            </div>
            <div className="mt-10 text-center">
                <Link href={quoteUrl} className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">Plan Your Move and Storage</Link>
            </div>
        </div>
    </section>
    );
}

function StorageOptionsSection() {
    return (
    <section aria-labelledby="storage-options" className="border-y border-slate-200 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Storage Options</p>
                <h2 id="storage-options" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Flexible Storage for Household and Business Moves</h2>
                <p className="mt-4 leading-7 text-slate-600">The right storage plan depends on what is being moved, how it should be organised, how long it must remain stored and whether delivery will be full, partial or staged.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {storageOptions.map((option) => (
                    <article key={option.title} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm">
                        <h3 className="text-lg font-bold text-slate-950">{option.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{option.description}</p>
                    </article>
                ))}
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center leading-7 text-slate-600">For larger commercial quantities, explore our <Link href="/warehouse-storage-london" className="font-semibold text-emerald-700 hover:underline">Warehouse Storage London</Link> and <Link href="/inventory-management-london" className="font-semibold text-emerald-700 hover:underline">Inventory Management London</Link> services.</p>
        </div>
    </section>
    );
}

function MovingStorageCostSection() {
    return (
    <section aria-labelledby="moving-storage-cost" className="bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Pricing Explained</p>
                <h2 id="moving-storage-cost" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">What Affects the Cost of Moving and Storage in London?</h2>
                <p className="mt-4 leading-7 text-slate-600">A reliable quotation must account for the move itself, the storage requirement and the final return. KXH prices the agreed job rather than advertising a headline figure that may exclude labour, access or delivery.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {costFactors.map((factor) => (
                    <article key={factor.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h3 className="text-lg font-bold text-slate-950">{factor.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{factor.description}</p>
                    </article>
                ))}
            </div>
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-950">For the most accurate quote, provide:</h3>
                <p className="mt-3 leading-7 text-slate-600">A clear item list or photographs, both addresses, floor and access information, preferred dates, packing requirements, likely storage duration and whether you expect one return delivery or several stages.</p>
                <Link href={quoteUrl} className="mt-5 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">Get a Tailored Quote</Link>
            </div>
        </div>
    </section>
    );
}

function ProblemsWeSolveSection() {
    return (
    <section aria-labelledby="problems-we-solve" className="bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Problems We Solve</p>
                <h2 id="problems-we-solve" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Storage Removes the Pressure From an Uncertain Move</h2>
                <p className="mt-4 leading-7 text-slate-600">The service is designed for the practical gaps, access restrictions and changing timelines that traditional point-to-point removals do not always solve.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {problems.map((problem) => (
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

function ResidentialMovingStorageSection() {
    return (
    <section aria-labelledby="residential-moving-storage" className="border-y border-slate-200 bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <Image src="/images/moving-services/moving-services-packing-loading.webp" alt="KXH movers packing household belongings before storage" width={1400} height={800} quality={75} sizes="(max-width: 1024px) 100vw, 50vw" className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm" loading="lazy" decoding="async" />
            <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Residential Moving &amp; Storage</p>
                <h2 id="residential-moving-storage" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">House Removals With Storage Between Addresses</h2>
                <p className="mt-4 leading-7 text-slate-600">KXH supports homeowners, renters, families, downsizers and people relocating abroad who need more than direct transport. Your belongings can be collected from a house, flat or apartment, moved into storage and returned when your next property is ready.</p>
                <p className="mt-4 leading-7 text-slate-600">The plan can cover the full household or only selected furniture and boxes. This is useful when clearing a property before sale, protecting belongings during renovation or keeping bulky items out of temporary accommodation.</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {residentialFeatures.map((item) => <li key={item} className="text-sm font-medium text-slate-700 sm:text-base"><span className="mr-2 text-emerald-700" aria-hidden="true">✓</span>{item}</li>)}
                </ul>
            </div>
        </div>
    </section>
    );
}

function BusinessMovingStorageSection() {
    return (
    <section aria-labelledby="business-moving-storage" className="bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Business Moving &amp; Storage</p>
                <h2 id="business-moving-storage" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Move Offices, Stock and Equipment Without Overloading the New Premises</h2>
                <p className="mt-4 leading-7 text-slate-600">Commercial relocations rarely need every item delivered at once. KXH can collect furniture, equipment, archives, shop fixtures or inventory, hold selected assets in managed warehouse storage and arrange return when departments, rooms or new premises are ready.</p>
                <p className="mt-4 leading-7 text-slate-600">This creates a practical buffer during office fit-outs, retail refurbishments, warehouse moves, business expansion and phased relocation. Stored items can be organised using agreed labels, manifests or inventory records to support controlled return delivery.</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {businessFeatures.map((item) => <li key={item} className="text-sm font-medium text-slate-700 sm:text-base"><span className="mr-2 text-emerald-700" aria-hidden="true">✓</span>{item}</li>)}
                </ul>
                <p className="mt-6 leading-7 text-slate-600">See <Link href="/business-storage-london" className="font-semibold text-emerald-700 hover:underline">Business Storage London</Link>, <Link href="/commercial-storage-london" className="font-semibold text-emerald-700 hover:underline">Commercial Storage London</Link> and <Link href="/retail-stock-storage-london" className="font-semibold text-emerald-700 hover:underline">Retail Stock Storage London</Link>.</p>
            </div>
            <Image src="/images/moving-services/moving-services-team-working.webp" alt="KXH team handling office furniture and business equipment during a London relocation" width={1400} height={800} quality={75} sizes="(max-width: 1024px) 100vw, 50vw" className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm" loading="lazy" decoding="async" />
        </div>
    </section>
    );
}

function WarehouseProcessSection() {
    return (
    <section aria-labelledby="warehouse-process" className="border-y border-slate-200 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Warehouse Transparency</p>
                <h2 id="warehouse-process" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">What Happens After Your Belongings Are Collected?</h2>
                <p className="mt-4 leading-7 text-slate-600">A managed service should make the handover clear. The exact process depends on the booking, but the journey typically follows these operational stages.</p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {warehouseJourney.map((step) => (
                    <article key={step.number} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                        <span className="text-sm font-black text-emerald-700">{step.number}</span>
                        <h3 className="mt-4 text-lg font-bold text-slate-950">{step.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
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
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Why London Customers Choose KXH</p>
                <h2 id="why-kxh" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Managed Storage Without the Self-Storage Hassle</h2>
                <p className="mt-4 leading-7 text-slate-600">KXH focuses on the whole journey of your belongings: from the property, into organised storage and back to the destination when you are ready.</p>
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

function MovingStorageComparisonSection() {
    return (
    <section aria-labelledby="moving-storage-comparison" className="bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Moving vs Moving &amp; Storage</p>
                <h2 id="moving-storage-comparison" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">What Changes When Storage Is Built Into the Move?</h2>
                <p className="mt-4 leading-7 text-slate-600">Traditional removals are ideal when belongings travel directly to a ready destination. Moving and storage is designed for gaps, changing dates, staged projects and items that should remain off-site.</p>
            </div>

            <div className="mt-12 hidden overflow-hidden rounded-2xl border border-slate-200 lg:block">
                <div className="grid grid-cols-[1.3fr_1fr_1fr] bg-emerald-800 text-sm font-bold text-white">
                    <div className="p-5">Service Feature</div><div className="border-l border-white/10 p-5 text-center">Traditional Movers</div><div className="border-l border-white/10 p-5 text-center">KXH Moving &amp; Storage</div>
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

function PrepareForCollectionSection() {
    return (
    <section aria-labelledby="prepare-for-collection" className="border-y border-slate-200 bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-8">
            <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Prepare for Collection</p>
                <h2 id="prepare-for-collection" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Information That Helps the Move Run Smoothly</h2>
                <p className="mt-4 leading-7 text-slate-600">London properties often involve access constraints that are not visible from the street. Accurate information helps KXH plan labour, vehicles, protection, parking and timing before collection day.</p>
                <p className="mt-4 leading-7 text-slate-600">Tell us about narrow staircases, lift booking windows, basement storage, loading restrictions, controlled parking zones, concierge requirements, dismantling needs and anything unusually heavy or fragile.</p>
                <Link href={quoteUrl} className="mt-6 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">Start Your Moving Plan</Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-950">Moving and storage checklist</h3>
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

function ReturnDeliverySection() {
    return (
    <section aria-labelledby="return-delivery" className="border-y border-slate-200 bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <Image src="/images/moving-services/moving-services-team.webp" alt="KXH moving and storage team ready for scheduled return delivery" width={1400} height={800} quality={75} sizes="(max-width: 1024px) 100vw, 50vw" className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm" loading="lazy" decoding="async" />
            <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Flexible Return Delivery</p>
                <h2 id="return-delivery" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Deliver Everything at Once or Return Items in Stages</h2>
                <p className="mt-4 leading-7 text-slate-600">Storage should support the move, not create another logistics problem. When the destination is ready, KXH can arrange the agreed return delivery to your home, office, shop, studio or other approved address.</p>
                <ol className="mt-7 space-y-4 text-sm leading-6 text-slate-700 sm:text-base">
                    <li><strong className="text-slate-950">Full return:</strong> all stored belongings delivered together.</li>
                    <li><strong className="text-slate-950">Partial return:</strong> selected labelled items delivered while the remainder stays stored.</li>
                    <li><strong className="text-slate-950">Staged return:</strong> priority furniture, equipment or inventory delivered across planned phases.</li>
                    <li><strong className="text-slate-950">Alternative address:</strong> delivery to another approved location where agreed in advance.</li>
                </ol>
                <p className="mt-6 leading-7 text-slate-600">Provide as much notice as practical, especially for larger deliveries, restricted-access buildings, weekend dates or commercial moves requiring loading-bay coordination.</p>
            </div>
        </div>
    </section>
    );
}

function ChooseServiceSection() {
    return (
    <section aria-labelledby="choose-service" className="bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Choose the Right Service</p>
                <h2 id="choose-service" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Do You Need Removals Only, Moving and Storage, or Managed Business Storage?</h2>
                <p className="mt-4 leading-7 text-slate-600">The right option depends on whether the destination is ready, how long items must remain off-site and whether you need ongoing inventory control.</p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
                <article className="rounded-2xl border border-slate-200 bg-white p-7">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Destination Ready</p>
                    <h3 className="mt-3 text-xl font-bold text-slate-950">Choose Moving Services</h3>
                    <p className="mt-3 leading-7 text-slate-600">Best when belongings can travel directly from collection to the new address on the confirmed moving date.</p>
                    <Link href="/logistics-moving-london" className="mt-5 inline-flex font-semibold text-emerald-700 hover:underline">Explore Moving Services →</Link>
                </article>
                <article className="rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-7 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Dates Do Not Match</p>
                    <h3 className="mt-3 text-xl font-bold text-slate-950">Choose Moving &amp; Storage</h3>
                    <p className="mt-3 leading-7 text-slate-600">Best when items must leave now but the final home, office or commercial premises will be ready later.</p>
                    <Link href={quoteUrl} className="mt-5 inline-flex font-semibold text-emerald-700 hover:underline">Request a Moving &amp; Storage Quote →</Link>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-white p-7">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Ongoing Commercial Need</p>
                    <h3 className="mt-3 text-xl font-bold text-slate-950">Choose Business Storage</h3>
                    <p className="mt-3 leading-7 text-slate-600">Best for recurring inventory, equipment, furniture or operational assets requiring organised off-site capacity.</p>
                    <Link href="/business-storage-london" className="mt-5 inline-flex font-semibold text-emerald-700 hover:underline">Explore Business Storage →</Link>
                </article>
            </div>
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
                <h2 id="london-coverage" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Moving and Storage Across London Boroughs</h2>
                <p className="mt-4 leading-7 text-slate-600">KXH supports approved collections and deliveries across London. Every plan considers parking controls, loading restrictions, stairs, lifts, concierge access and building requirements.</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {coverageAreas.map((area) => (
                    <Link key={area.href} href={area.href} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm">
                        <h3 className="font-semibold text-slate-900">Moving &amp; Storage in {area.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">Collection, removals, temporary storage and scheduled delivery for homes and businesses.</p>
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
                <h2 id="related-services" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Build the Right Storage and Logistics Plan Around Your Move</h2>
                <p className="mt-4 leading-7 text-slate-600">Explore specialist services for business inventory, retail stock, ecommerce goods, students and larger warehouse requirements.</p>
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
        <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide !text-white">Plan Collection, Storage and Delivery</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">Need Moving &amp; Storage in London?</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-200">Tell us what you are moving, the collection address, access details, preferred dates and expected storage period. We will review the job and prepare a tailored quotation for the agreed moving, storage and return-delivery plan.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href={quoteUrl} className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 sm:w-auto sm:px-8">Get Your Free Quote</Link>
                <a href="tel:+447470025636" className="w-full rounded-xl border border-white/20 px-6 py-4 text-center font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:px-8">Call KXH</a>
            </div>
        </div>
    </section>
    );
}

function MovingStorageFaqsSection() {
    return (
    <section aria-labelledby="moving-storage-faqs" className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            <h2 id="moving-storage-faqs" className="mb-8 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Moving &amp; Storage London FAQs</h2>
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

export default function MovingStorageLondonPage() {
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

                <WhyMovingStorageSection />

                <WhoMovingStorageIsForSection />

                <MovingStorageProcessSection />

                <StorageOptionsSection />

                <MovingStorageCostSection />

                <ProblemsWeSolveSection />

                <ResidentialMovingStorageSection />

                <BusinessMovingStorageSection />

                <WarehouseProcessSection />

                <WhyKxhSection />

                <MovingStorageComparisonSection />

                <PrepareForCollectionSection />

                <ReturnDeliverySection />

                <ChooseServiceSection />

                <LondonCoverageSection />

                <RelatedServicesSection />

                <TestimonialsSection />

                <FinalCallToActionSection />

                <MovingStorageFaqsSection />

                <MainFooter locations={londonLocations} />
            </main>
        </>
    );
}