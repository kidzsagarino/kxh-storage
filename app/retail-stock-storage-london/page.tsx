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
    title: "Retail Stock Storage London | Secure Managed Storage with Collection",
    description:
        "Door-to-door retail stock storage in London with collection, secure warehouse storage, organised inventory, pallet support, and return delivery.",
    alternates: {
        canonical: "https://kxhlogistics.co.uk/retail-stock-storage-london",
    },
    openGraph: {
        type: "website",
        url: "https://kxhlogistics.co.uk/retail-stock-storage-london",
        title: "Retail Stock Storage London | KXH Storage & Logistics",
        description:
            "Flexible managed retail stock storage with collection, secure warehouse storage, inventory organisation, pallet support, and return delivery across London.",
        images: [
            {
                url: "/images/retail-stock-storage/retail-stock-storage-london-warehouse.webp",
                width: 1200,
                height: 630,
                alt: "Retail stock, cartons and store fixtures inside a managed London warehouse",
            },
        ],
    },
};

const coreBenefits = [
    "Flexible space for changing stock levels",
    "Collection from shops and commercial premises",
    "Cartons, fixtures, displays and pallets",
    "Selected-stock return delivery available",
];

const processSteps = [
    {
        number: "1",
        title: "Get a Quote",
        description:
            "Tell us what retail stock, fixtures, displays, or supplies you need to store, where they should be collected, and your expected storage period.",
    },
    {
        number: "2",
        title: "We Collect",
        description:
            "Our team collects cartons, seasonal stock, store fittings, promotional materials, reserve inventory, or pallets from your London premises.",
    },
    {
        number: "3",
        title: "We Organise & Store",
        description:
            "Your retail items are professionally handled, categorised, and placed into secure managed warehouse storage.",
    },
    {
        number: "4",
        title: "We Return",
        description:
            "Request selected products, displays, fixtures, or your full stored load for scheduled delivery when required.",
    },
];

const storageTypes = [
    {
        title: "Overflow Retail Stock",
        description:
            "Extra product lines, slow-moving goods, reserve inventory, and stock that no longer fits comfortably in your shop or backroom.",
    },
    {
        title: "Seasonal Collections",
        description:
            "Christmas ranges, summer stock, sale inventory, launch collections, and campaign-specific products stored between trading periods.",
    },
    {
        title: "Fixtures & Displays",
        description:
            "Shelving, mannequins, display units, signage, counters, point-of-sale materials, and temporary store fittings.",
    },
    {
        title: "Packaging & Supplies",
        description:
            "Bags, boxes, hangers, labels, tissue paper, promotional materials, and operational supplies for future replenishment.",
    },
];

const businessProblems = [
    {
        title: "Crowded Stockrooms",
        description:
            "Move reserve stock and bulky supplies out of valuable backroom space so your team can work safely and efficiently.",
    },
    {
        title: "Seasonal Peaks",
        description:
            "Add flexible capacity for Christmas, Black Friday, sales, new collections, product launches, and temporary demand increases.",
    },
    {
        title: "Stock Arriving Early",
        description:
            "Receive and hold collections, fixtures, and campaign materials before your store or launch date is ready.",
    },
    {
        title: "Returns Taking Over",
        description:
            "Move suitable returns, exchanges, reserve stock, and clearance inventory out of customer-facing and operational areas.",
    },
    {
        title: "Store Refits and Relocations",
        description:
            "Store fixtures, displays, products, signage, and equipment during refurbishment, relocation, closure, or rollout projects.",
    },
    {
        title: "Multi-Site Stock Pressure",
        description:
            "Centralise overflow inventory from one or more retail locations without leasing a separate warehouse.",
    },
    {
        title: "Bulky Visual Merchandising",
        description:
            "Protect mannequins, plinths, window displays, seasonal decorations, signage, and point-of-sale materials between campaigns.",
    },
    {
        title: "Supplier Overstocks",
        description:
            "Create temporary capacity when minimum order quantities, delayed launches, or supplier schedules leave you with excess inventory.",
    },
    {
        title: "Branch Transfers",
        description:
            "Consolidate stock from closing, relocating, or overstocked branches before redistributing it to another location.",
    },
    {
        title: "Click-and-Collect Overflow",
        description:
            "Free up store space when omnichannel orders, packaging, and reserve inventory put additional pressure on backrooms.",
    },
    {
        title: "Clearance and Dead Stock",
        description:
            "Separate slow-moving, clearance, and discontinued lines from active replenishment stock while a sales plan is arranged.",
    },
    {
        title: "Shopping-Centre Constraints",
        description:
            "Reduce on-site storage pressure where loading windows, access rules, and limited stockroom space make self-managed storage difficult.",
    },
];

const retailAudiences = [
    {
        title: "Independent Retailers & Boutiques",
        description:
            "Flexible capacity for fashion, footwear, beauty, gift, and specialist shops that need more room without taking a larger lease.",
        examples:
            "Seasonal collections, reserve sizes, boxed products, displays, packaging, and promotional stock.",
    },
    {
        title: "High-Street & Multi-Site Chains",
        description:
            "Centralised overflow storage, branch-transfer support, and replenishment planning for retailers operating across multiple locations.",
        examples:
            "Campaign materials, replacement fixtures, branch-specific stock, store-opening kits, and reserve inventory.",
    },
    {
        title: "Shopping-Centre Stores",
        description:
            "Managed collections planned around loading bays, access windows, security procedures, and limited on-site stockrooms.",
        examples:
            "Fashion stock, beauty launches, electronics accessories, visual-merchandising assets, and packaging supplies.",
    },
    {
        title: "Pop-Up Shops & Temporary Retail",
        description:
            "Short-term storage before, during, and after temporary trading periods, launches, exhibitions, and seasonal activations.",
        examples:
            "Launch inventory, fixtures, signage, POS materials, event stock, and dismantled displays.",
    },
    {
        title: "Luxury & Premium Brands",
        description:
            "Organised managed storage for suitable packaged products, launch materials, showroom assets, and carefully handled retail equipment.",
        examples:
            "Boxed goods, presentation materials, mannequins, display units, reserve collections, and campaign assets.",
    },
    {
        title: "Homeware, Furniture & Lifestyle Retailers",
        description:
            "Flexible capacity for bulkier products, showroom rotation stock, samples, seasonal ranges, and store fixtures.",
        examples:
            "Flat-packed goods, home collections, shelving, plinths, samples, and promotional displays.",
    },
    {
        title: "Importers, Wholesalers & Franchise Operators",
        description:
            "Overflow capacity for incoming goods, palletised stock, franchise rollout materials, and inventory awaiting retail allocation.",
        examples:
            "Mixed cartons, pallets, branch kits, replacement fixtures, campaign materials, and reserve stock.",
    },
    {
        title: "Omnichannel & Ecommerce Retailers",
        description:
            "Extra space for store inventory and online retail operations when returns, packaging, and click-and-collect activity increase stock pressure.",
        examples:
            "Ecommerce products, returned goods, packaging, click-and-collect stock, clearance lines, and replenishment cartons.",
    },
];

const retailWorkflows = [
    {
        title: "Seasonal Stock Planning",
        steps: [
            "Collection before peak trading",
            "Stock categorised by range or campaign",
            "Secure managed storage",
            "Scheduled replenishment or full return",
        ],
    },
    {
        title: "Store Refit or Relocation",
        steps: [
            "Fixtures, displays, and stock collected",
            "Items recorded and separated by use",
            "Stored during building work",
            "Delivered before reopening",
        ],
    },
    {
        title: "New Store Opening",
        steps: [
            "Receive rollout stock and store assets",
            "Organise by branch, department, or launch phase",
            "Hold until site access is available",
            "Deliver in the required sequence",
        ],
    },
    {
        title: "Branch Closure or Transfer",
        steps: [
            "Collect stock from the affected location",
            "Separate saleable, reserve, and fixture inventory",
            "Consolidate into managed storage",
            "Redistribute selected items when required",
        ],
    },
];

const retailTerms = [
    "SKU storage",
    "Backstock",
    "Buffer stock",
    "Replenishment stock",
    "Reserve inventory",
    "Launch inventory",
    "Promotional inventory",
    "Seasonal collections",
    "Clearance stock",
    "Markdown stock",
    "Slow-moving inventory",
    "Fast-moving inventory",
    "Excess inventory",
    "Dead stock",
    "Returned goods",
    "Click-and-collect overflow",
    "Branch transfers",
    "Inter-store transfers",
    "Store rollout inventory",
    "Distribution stock",
    "Stock rotation",
    "Stocktake support",
    "Cycle stock",
    "Safety stock",
    "Carton identification",
    "Pallet identification",
    "Mixed pallets",
    "Roll cages",
    "Shelf-ready packaging",
    "Visual merchandising",
    "POS materials",
    "POP displays",
    "Window-display assets",
    "Store-opening kits",
    "Refit inventory",
    "Fixture storage",
    "Campaign materials",
    "Reserve sizes",
    "Product-range grouping",
    "Branch-specific stock",
];

const handlingSteps = [
    {
        title: "Collection Planning",
        description:
            "KXH confirms the collection location, item types, access requirements, approximate quantities, and agreed handling scope before transport is arranged.",
    },
    {
        title: "Receiving and Initial Checks",
        description:
            "Suitable goods are received into the warehouse and checked against the agreed collection or delivery information before storage placement.",
    },
    {
        title: "Identification and Organisation",
        description:
            "Cartons, pallets, fixtures, and other approved assets can be identified and grouped by branch, campaign, range, item type, or expected return date.",
    },
    {
        title: "Secure Managed Storage",
        description:
            "Items are placed into appropriate managed warehouse storage according to their dimensions, handling needs, and the service agreed with the customer.",
    },
    {
        title: "Retrieval Requests",
        description:
            "Customers can identify the selected cartons, pallets, fixtures, or other stored assets they need returned, subject to the agreed inventory detail and service scope.",
    },
    {
        title: "Scheduled Return Delivery",
        description:
            "KXH confirms the retrieval, delivery location, preferred timing, access requirements, and applicable handling or transport charges before dispatch.",
    },
];

const retailStats = [
    {
        value: "547,000",
        label: "UK wholesale and retail SMEs",
        detail:
            "The Department for Business and Trade estimated 547,000 SMEs in wholesale and retail at the start of 2025.",
        sourceLabel: "UK business population estimates 2025",
        sourceHref:
            "https://www.gov.uk/government/statistics/business-population-estimates-2025/business-population-estimates-for-the-uk-and-regions-2025-statistical-release",
    },
    {
        value: "32%",
        label: "of UK SME turnover",
        detail:
            "Wholesale and retail represented the largest share of UK SME turnover at the start of 2025.",
        sourceLabel: "Department for Business and Trade",
        sourceHref:
            "https://www.gov.uk/government/statistics/business-population-estimates-2025/business-population-estimates-for-the-uk-and-regions-2025-statistical-release",
    },
    {
        value: "28.8%",
        label: "of retail spend was online",
        detail:
            "ONS estimated that online channels represented 28.8% of total Great Britain retail spending in May 2026.",
        sourceLabel: "ONS Retail sales, May 2026",
        sourceHref:
            "https://www.ons.gov.uk/businessindustryandtrade/retailindustry/bulletins/retailsales/may2026",
    },
    {
        value: "+9.8%",
        label: "annual online spending growth",
        detail:
            "Online retail spending in the three months to May 2026 was 9.8% higher than the same period one year earlier.",
        sourceLabel: "ONS Retail sales, May 2026",
        sourceHref:
            "https://www.ons.gov.uk/businessindustryandtrade/retailindustry/bulletins/retailsales/may2026",
    },
];

const seasonalCalendar = [
    {
        season: "January–February",
        focus: "Clearance and returns",
        storage: "Sale stock, returned goods, window displays, and packaging",
    },
    {
        season: "March–May",
        focus: "Spring launches",
        storage: "New ranges, garden lines, fixtures, and campaign materials",
    },
    {
        season: "June–August",
        focus: "Summer trading",
        storage:
            "Outdoor stock, event equipment, reserve sizes, and replenishment cartons",
    },
    {
        season: "September–October",
        focus: "Autumn and Halloween",
        storage:
            "Seasonal collections, decorations, POS materials, and launch stock",
    },
    {
        season: "November–December",
        focus: "Black Friday and Christmas",
        storage: "Peak inventory, gift sets, packaging, displays, and backup stock",
    },
];

const storeLifecycle = [
    {
        title: "Opening",
        description:
            "Hold launch stock, fixtures, signage, and store-opening kits until site access is available.",
    },
    {
        title: "Expansion",
        description:
            "Add flexible capacity while a new branch, department, or product range is introduced.",
    },
    {
        title: "Refit",
        description:
            "Store products, shelving, mannequins, counters, and displays during refurbishment.",
    },
    {
        title: "Relocation",
        description:
            "Collect, separate, store, and return retail assets in the sequence required for reopening.",
    },
    {
        title: "Closure",
        description:
            "Consolidate saleable stock, fixtures, and reserve inventory before redistribution or disposal decisions.",
    },
    {
        title: "Rollout",
        description:
            "Organise repeat store kits, campaign materials, and branch-specific stock for phased delivery.",
    },
];

const warehouseOperations = [
    "Inbound collection coordination",
    "Carton, SKU, fixture, and pallet identification",
    "Grouping by branch, range, campaign, or return date",
    "Shelving, zoning, and pallet placement where suitable",
    "Reserve-stock and active-stock separation",
    "Selected-item retrieval and scheduled dispatch",
    "Branch-transfer and store-replenishment support",
    "Physical inventory records for stored goods",
];

const retailLogistics = [
    {
        title: "Supplier Collections",
        description:
            "Collect approved stock or store assets from suppliers and move them into managed storage.",
    },
    {
        title: "Branch Transfers",
        description:
            "Consolidate goods from one retail site and prepare selected inventory for another branch.",
    },
    {
        title: "Store Replenishment",
        description:
            "Return selected cartons, fixtures, or pallets on an agreed schedule when stores need them.",
    },
    {
        title: "Returns Consolidation",
        description:
            "Move suitable returns and reserve stock away from customer-facing and backroom areas.",
    },
];

const retailKnowledgeGuides = [
    {
        title: "Business Storage London",
        href: "/business-storage-london",
        description:
            "The main KXH pillar for managed commercial storage, collection, inventory handling, and return delivery.",
    },
    {
        title: "Inventory Management London",
        href: "/inventory-management-london",
        description:
            "How KXH organises real physical stock, cartons, equipment, and pallets in storage.",
    },
    {
        title: "Pallet Storage London",
        href: "/pallet-storage-london",
        description:
            "Managed capacity for palletised reserve stock and bulk commercial inventory.",
    },
    {
        title: "Ecommerce Storage London",
        href: "/ecommerce-storage-london",
        description:
            "Storage for products, packaging, returns, and stock used across online retail operations.",
    },
    {
        title: "Warehouse Storage London",
        href: "/warehouse-storage-london",
        description:
            "Flexible warehouse storage with collection and scheduled return delivery.",
    },
    {
        title: "Commercial Storage London",
        href: "/commercial-storage-london",
        description:
            "Storage for business assets, equipment, archives, stock, and operational materials.",
    },
];

const retailDistricts = [
    "Oxford Street and the West End",
    "Covent Garden",
    "Camden",
    "Shoreditch and Spitalfields",
    "Canary Wharf",
    "King’s Road and Chelsea",
    "Westfield London and Stratford",
    "Brent Cross",
    "Bromley",
    "Croydon",
];

const industries = [
    {
        title: "Ecommerce Storage",
        href: "/ecommerce-storage-london",
        description:
            "Products, packaging, returned goods, seasonal inventory, and stock for online retailers.",
        available: true,
    },
    {
        title: "Retail Stock Storage",
        href: "/retail-stock-storage-london",
        description:
            "Overflow stock, seasonal collections, displays, fittings, and promotional inventory.",
        available: true,
    },
    {
        title: "Office Storage",
        href: "/office-storage-london",
        description:
            "Furniture, archives, computers, equipment, documents, and operational assets.",
        available: false,
    },
    {
        title: "Startup Storage",
        href: "/startup-storage-london",
        description:
            "Flexible capacity for growing businesses without long warehouse commitments.",
        available: false,
    },
];

const inventoryBenefits = [
    "Physical stock organisation",
    "Carton, item, and pallet categorisation",
    "Retail stock identification support",
    "Selected-item return requests",
    "Collection and delivery coordination",
    "Storage for displays, fixtures, and supplies",
];

const reasonsToChooseKxh = [
    "Your shop or stockroom is running out of space",
    "Your inventory changes with seasons and promotions",
    "You need stock collected from one or more premises",
    "You store cartons, loose items, fixtures, displays, or pallets",
    "You want to avoid leasing and staffing a separate warehouse",
    "You need selected stock or store assets delivered back",
];

const faqs = [
    {
        question: "What is retail stock storage?",
        answer:
            "Retail stock storage is a managed warehouse service for shops, brands, and multi-site retailers that need secure space for overflow inventory, seasonal collections, fixtures, displays, packaging, returns, and reserve stock.",
    },
    {
        question: "How much does retail stock storage cost in London?",
        answer:
            "Pricing depends on the quantity and type of cartons, individual items, fixtures, or pallets stored, the storage duration, collection requirements, handling, and return-delivery needs.",
    },
    {
        question: "Do I need to rent an entire storage unit?",
        answer:
            "No. KXH provides managed storage based on the space and handling your retail operation actually requires, rather than requiring you to rent a fixed self-storage unit.",
    },
    {
        question: "Can you collect stock from my shop?",
        answer:
            "Yes. KXH can arrange collection from shops, stockrooms, offices, warehouses, studios, shopping locations, and other approved commercial premises across London.",
    },
    {
        question: "Can you store seasonal retail stock?",
        answer:
            "Yes. We can store Christmas ranges, summer collections, sale stock, promotional inventory, launch products, and other seasonal goods between trading periods.",
    },
    {
        question: "Can you store shop fixtures and displays?",
        answer:
            "Yes. Suitable fixtures, shelving, display units, mannequins, signage, counters, point-of-sale materials, and store equipment can be stored alongside retail inventory, subject to assessment.",
    },
    {
        question: "Can I increase or reduce storage as stock levels change?",
        answer:
            "Yes. Storage requirements can be reviewed as product volumes, seasonal demand, promotions, and the number of retail locations change.",
    },
    {
        question: "Can I request only selected stock back?",
        answer:
            "Where supported by the selected service, you can request specific cartons, products, fixtures, displays, or pallets instead of returning the full stored load.",
    },
    {
        question: "Can you collect from multiple retail locations?",
        answer:
            "Yes. Depending on your requirements, KXH can coordinate collection from multiple approved London retail locations and consolidate the stock into managed warehouse storage.",
    },
    {
        question: "Do you support returned or reserve stock?",
        answer:
            "Yes. Suitable returned products, reserve stock, replacement items, and back-up inventory can be stored and organised for later retrieval or delivery.",
    },
    {
        question: "How do I arrange return delivery?",
        answer:
            "Submit a return request identifying the products, cartons, fixtures, or pallets you need, the delivery location, and your preferred date. KXH will confirm availability, arrangements, and applicable charges before scheduling delivery.",
    },
    {
        question: "Is there a minimum storage period?",
        answer:
            "Minimum storage periods may vary by item type and service requirement. Your applicable term will be confirmed before booking.",
    },
    {
        question: "Can you store mannequins and visual-merchandising equipment?",
        answer:
            "Suitable mannequins, rails, plinths, signage, window-display materials, and other visual-merchandising assets may be stored subject to assessment, dimensions, condition, and handling requirements.",
    },
    {
        question: "Can KXH support a shop refit?",
        answer:
            "Yes. KXH can collect suitable stock, fixtures, displays, and equipment before refurbishment, hold them in managed storage, and arrange scheduled return delivery when the site is ready.",
    },
    {
        question: "Can you hold stock before a new store opens?",
        answer:
            "Yes. Launch stock, store-opening kits, fixtures, signage, and campaign materials can be held until access and delivery dates are confirmed.",
    },
    {
        question: "Can retail stock be organised by branch?",
        answer:
            "Where agreed, stock can be grouped or identified by branch, product range, campaign, fixture type, carton, or pallet to support later retrieval and redistribution.",
    },
    {
        question: "Do you support branch-transfer logistics?",
        answer:
            "KXH can coordinate approved collections, consolidation, storage, and later delivery for stock moving between retail locations, subject to the agreed service scope.",
    },
    {
        question: "Can you store Black Friday or Christmas stock?",
        answer:
            "Yes. Flexible managed storage is suitable for peak-season inventory, gift sets, packaging, displays, promotional materials, and reserve stock that is not yet needed in store.",
    },
    {
        question: "Can you store clearance or slow-moving stock?",
        answer:
            "Suitable clearance, discontinued, reserve, and slow-moving inventory can be separated from active store stock while the retailer decides how and when it should be sold or redistributed.",
    },
    {
        question: "Can suppliers deliver directly to KXH?",
        answer:
            "Direct supplier delivery or supplier collection may be possible when arranged in advance and approved as part of the service. Delivery details, quantities, access, and handling must be confirmed first.",
    },
    {
        question: "Is this the same as ecommerce fulfilment?",
        answer:
            "No. This page primarily describes managed physical storage, organisation, collection, and return delivery. Order-by-order ecommerce fulfilment is a different operational service and must be confirmed separately.",
    },
    {
        question: "Can you store mixed cartons and pallets?",
        answer:
            "Suitable mixed storage may be possible, including cartons, loose retail assets, fixtures, and palletised inventory. KXH will assess item types, dimensions, quantities, and handling needs before confirming the quote.",
    },
    {
        question: "Can you collect from a shopping centre?",
        answer:
            "Potentially. Shopping-centre collections depend on loading-bay rules, booking windows, vehicle access, security requirements, item volume, and any restrictions imposed by the premises.",
    },
    {
        question: "How does retail storage connect to Business Storage London?",
        answer:
            "Retail Stock Storage London is a specialist service page within the wider KXH Business Storage London pillar. The parent service also covers ecommerce stock, office assets, pallets, commercial equipment, collection, organised warehousing, and return delivery.",
    },
];

function BusinessStorageHierarchy() {
    return (
        <section
            aria-label="Business Storage service hierarchy"
            className="border-b border-slate-200 bg-white py-5"
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <Link
                            href="/business-storage-london"
                            className="font-semibold text-emerald-800 transition hover:underline"
                        >
                            Business Storage London
                        </Link>
                        <span aria-hidden="true" className="text-emerald-500">
                            →
                        </span>
                        <span className="font-semibold text-slate-900">
                            Retail Stock Storage London
                        </span>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">
                        Specialist storage for retail inventory, fixtures, displays, and
                        seasonal stock.
                    </p>
                </div>
            </div>
        </section>
    );
}

function ServiceJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://kxhlogistics.co.uk/retail-stock-storage-london#service",
        name: "Retail Stock Storage London",
        serviceType: "Retail Stock Storage",
        url: "https://kxhlogistics.co.uk/retail-stock-storage-london",
        description:
            "A specialist service within KXH Business Storage London for retail stock, seasonal inventory, fixtures, displays, SKU organisation, collection, and selected-stock return delivery.",
        isPartOf: {
            "@type": "Service",
            "@id": "https://kxhlogistics.co.uk/business-storage-london#service",
            name: "Business Storage London",
            url: "https://kxhlogistics.co.uk/business-storage-london",
        },
        provider: {
            "@type": "LocalBusiness",
            "@id": "https://kxhlogistics.co.uk/#business",
            name: "KXH Storage & Logistics",
            url: "https://kxhlogistics.co.uk",
            telephone: "+44 1474 396663",
        },
        areaServed: {
            "@type": "City",
            name: "London",
        },
        offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            availability: "https://schema.org/InStock",
            url: "https://kxhlogistics.co.uk/get-a-quote?service=storage",
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
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data),
            }}
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
                name: "Business Storage London",
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
                name: "Retail Stock Storage London",
                item: "https://kxhlogistics.co.uk/retail-stock-storage-london",
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

export default function RetailStockStoragePage() {
    const availableIndustries = industries.filter(
        (industry) => industry.available,
    );

    return (
        <>
            <CrispChat />
            <Nav />

            <main className="min-h-screen bg-white text-slate-900">
                <ServiceJsonLd />
                <FAQJsonLd />
                <BreadcrumbJsonLd />
                <TrustpilotJsonLd />

                {/* BREADCRUMB */}
                <nav
                    aria-label="Breadcrumb"
                    className="mx-auto max-w-6xl overflow-x-auto px-5 pt-4 text-xs text-slate-500 sm:px-6 sm:pt-6 sm:text-sm lg:px-8"
                >
                    <Link href="/" className="transition hover:text-emerald-700">
                        Home
                    </Link>
                    <span className="mx-2">/</span>

                    <Link
                        href="/services"
                        className="transition hover:text-emerald-700"
                    >
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

                    <span className="font-medium text-slate-700">
                        Retail Stock Storage London
                    </span>
                </nav>

                <BusinessStorageHierarchy />

                {/* HERO */}
                <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Managed Retail Stock Storage
                        </div>

                        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                            Retail Stock Storage London with Collection & Return Delivery
                        </h1>

                        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                            Retail Stock Storage is a specialist service within our{" "}
                            <Link
                                href="/business-storage-london"
                                className="font-semibold text-emerald-700 hover:underline"
                            >
                                Business Storage London
                            </Link>{" "}
                            solution. We collect retail inventory, fixtures, displays, and
                            supplies, organise them in managed storage, and deliver selected
                            items back when required.
                        </p>

                        <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                            Create more room in shops and stockrooms without renting an entire
                            storage unit or committing to a separate warehouse lease.
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
                                href="/get-a-quote?service=storage"
                                className="w-full rounded-xl bg-emerald-700 px-6 py-4 text-center font-semibold text-white shadow-lg transition hover:bg-emerald-800 sm:w-auto"
                            >
                                Get Retail Storage Quote
                            </Link>

                            <a
                                href="tel:+447386277785"
                                className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                            >
                                Call KXH
                            </a>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <TrustpilotPill />
                        </div>

                        <div className="mt-12">
                            <Image
                                src="/images/retail-stock-storage/retail-stock-storage-london-warehouse.webp"
                                alt="Retail stock, cartons and store fixtures inside a managed London warehouse"
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

                {/* PROCESS */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                How It Works
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                We Collect, Organise, Store and Return
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                A managed retail storage service for overflow stock, seasonal
                                ranges, store fixtures, promotional materials, and reserve
                                inventory.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                            {processSteps.map((step) => (
                                <article
                                    key={step.number}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
                                >
                                    <span className="text-sm font-black text-emerald-700">
                                        {step.number}
                                    </span>

                                    <h3 className="mt-4 text-xl font-bold">{step.title}</h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {step.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PRICING */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Flexible Pricing
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Pay for the Retail Storage You Use
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                Your quote reflects the retail stock, fixtures, cartons, and
                                pallets you actually need to store rather than a fixed unit that
                                may remain partly empty.
                            </p>

                            <p className="mt-4 leading-7 text-slate-600">
                                Pricing can account for the volume and type of retail items,
                                storage duration, collection location, warehouse handling, and
                                return delivery.
                            </p>

                            <p className="mt-4 text-sm leading-6 text-slate-500">
                                Collection, storage, handling, and return-delivery charges are
                                calculated according to your items, locations, storage term, and
                                service requirements.
                            </p>

                            <Link
                                href="/get-a-quote?service=storage"
                                className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                            >
                                Calculate Your Storage Quote
                            </Link>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {storageTypes.map((type) => (
                                <article
                                    key={type.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-6"
                                >
                                    <h3 className="font-bold text-slate-900">{type.title}</h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {type.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* BUSINESS PROBLEMS */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Make Space to Trade
                            </p>

                            <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                Your Shop Floor and Stockroom Should Not Become Your{" "}
                                <span className="text-emerald-700">Warehouse</span>
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600">
                                Free up valuable selling and backroom space, reduce property
                                pressure, and scale storage around seasonal demand and changing
                                stock levels.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {businessProblems.map((problem) => (
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

                {/* WHO THIS SERVICE IS FOR */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Who This Service Is For
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Retail Storage Built Around Different Products and Operating
                                Models
                            </h2>
                            <p className="mt-5 leading-7 text-slate-600">
                                KXH supports independent shops, retail chains, pop-ups,
                                franchises, importers, and omnichannel businesses. Storage can
                                be planned around the products, fixtures, packaging, access
                                requirements, and replenishment needs of each operation.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {retailAudiences.map((audience) => (
                                <article
                                    key={audience.title}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                                >
                                    <h3 className="text-lg font-bold text-slate-950">
                                        {audience.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {audience.description}
                                    </p>
                                    <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-700">
                                        <span className="font-semibold text-emerald-700">
                                            Typical items:
                                        </span>{" "}
                                        {audience.examples}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* RETAIL WORKFLOWS */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Retail Storage Workflows
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Practical Support for Retail Projects and Stock Cycles
                            </h2>
                            <p className="mt-5 leading-7 text-slate-600">
                                Use managed storage as part of a defined retail workflow rather
                                than treating the warehouse as passive space.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-6 md:grid-cols-2">
                            {retailWorkflows.map((workflow) => (
                                <article
                                    key={workflow.title}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7"
                                >
                                    <h3 className="text-xl font-bold text-slate-950">
                                        {workflow.title}
                                    </h3>
                                    <ol className="mt-6 space-y-4">
                                        {workflow.steps.map((step, index) => (
                                            <li key={step} className="flex gap-4">
                                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                                                    {index + 1}
                                                </span>
                                                <span className="pt-1 text-sm leading-6 text-slate-700">
                                                    {step}
                                                </span>
                                            </li>
                                        ))}
                                    </ol>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* RETAIL OPERATIONS LANGUAGE */}
                <section className="bg-slate-950 py-14 text-white sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                                    Built Around Retail Operations
                                </p>
                                <h2 className="mt-2 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
                                    More Than Somewhere to Put Boxes
                                </h2>
                                <p className="mt-5 leading-7 text-slate-300">
                                    KXH can support the physical stock flows behind merchandising,
                                    branch transfers, seasonal launches, stock rotation, and store
                                    replenishment. This includes backstock, buffer stock, launch
                                    inventory, slow-moving lines, markdown stock, roll cages,
                                    shelf-ready packaging, branch-specific stock, and physical
                                    stocktake organisation where included in the agreed service.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {retailTerms.map((term) => (
                                    <span
                                        key={term}
                                        className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white"
                                    >
                                        {term}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEASONAL RETAIL CALENDAR */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Seasonal Retail Calendar
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Plan Storage Around the Retail Trading Year
                            </h2>
                            <p className="mt-5 leading-7 text-slate-600">
                                Retail stock pressure changes throughout the year. Flexible
                                managed storage helps separate active selling stock from future
                                collections, clearance goods, displays, and campaign materials.
                            </p>
                        </div>
                        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200">
                            {seasonalCalendar.map((item) => (
                                <div
                                    key={item.season}
                                    className="grid gap-2 border-t border-slate-200 p-5 first:border-t-0 md:grid-cols-[0.8fr_1fr_2fr] md:gap-6"
                                >
                                    <p className="font-bold text-slate-950">{item.season}</p>
                                    <p className="font-semibold text-emerald-700">{item.focus}</p>
                                    <p className="text-sm leading-6 text-slate-600">
                                        {item.storage}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* STORE LIFECYCLE */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Store Lifecycle Support
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Storage From Store Opening to Relocation
                            </h2>
                        </div>
                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {storeLifecycle.map((item) => (
                                <article
                                    key={item.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-6"
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
                    </div>
                </section>

                {/* WAREHOUSE OPERATIONS */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Warehouse Operations
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Managed Handling, Not Passive Floor Space
                            </h2>
                            <p className="mt-5 leading-7 text-slate-600">
                                Retail stock can be organised around how the business expects to
                                use it—by branch, campaign, product range, fixture type, or
                                return schedule. Exact handling depends on the agreed service
                                and item suitability.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {warehouseOperations.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium leading-6 text-slate-800"
                                >
                                    ✓ {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* RETAIL LOGISTICS */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Retail Logistics Support
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Connect Storage With Real Stock Movements
                            </h2>
                            <p className="mt-5 leading-7 text-slate-600">
                                KXH can combine managed storage with collection and scheduled
                                delivery so inventory does not remain trapped in an inaccessible
                                unit.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {retailLogistics.map((item) => (
                                <article
                                    key={item.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-6"
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
                    </div>
                </section>

                {/* MANAGED STORAGE */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                        <Image
                            src="/images/retail-stock-storage/retail-stock-collection-delivery-london.webp"
                            alt="KXH collecting retail stock from a London shop"
                            width={1200}
                            height={800}
                            quality={75}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                        />

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Managed Door-to-Door Storage
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                No Van Hire. No Repeated Storage Visits. No Extra Warehouse.
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                KXH collects retail stock and store assets from shops, offices,
                                warehouses, studios, and approved commercial locations across
                                London.
                            </p>

                            <p className="mt-4 leading-7 text-slate-600">
                                When your team needs stock or store assets back, request the
                                relevant cartons, products, fixtures, displays, or pallets and
                                arrange scheduled delivery.
                            </p>
                            <p className="mt-4 leading-7 text-slate-600">
                                Retailers can combine this service with our{" "}
                                <Link
                                    href="/ecommerce-storage-london"
                                    className="font-semibold text-emerald-700 hover:underline"
                                >
                                    Ecommerce Storage
                                </Link>
                                ,{" "}
                                <Link
                                    href="/inventory-management-london"
                                    className="font-semibold text-emerald-700 hover:underline"
                                >
                                    Inventory Management
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/pallet-storage-london"
                                    className="font-semibold text-emerald-700 hover:underline"
                                >
                                    Pallet Storage
                                </Link>{" "}
                                services.
                            </p>

                            <ul className="mt-7 space-y-3 text-sm font-medium text-slate-700 sm:text-base">
                                <li>✓ Collection from shops and retail premises</li>
                                <li>✓ Secure managed warehouse storage</li>
                                <li>✓ Organised physical retail stock records</li>
                                <li>✓ Selected-item or full return requests</li>
                                <li>✓ Scheduled return delivery</li>
                            </ul>
                        </div>
                    </div>
                </section>
                {/* INDUSTRY PAGES */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Storage by Business Type
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Storage for Retail and Related Operations
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                Explore related storage solutions for ecommerce products, retail
                                stock, office assets, and the operational materials your
                                business needs to manage.
                            </p>
                        </div>

                        <div
                            className={`mt-12 grid gap-6 ${availableIndustries.length === 1
                                ? "mx-auto max-w-xl"
                                : "md:grid-cols-2 lg:grid-cols-4"
                                }`}
                        >
                            {availableIndustries.map((industry) => (
                                <Link
                                    key={industry.href}
                                    href={industry.href}
                                    className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm sm:p-6"
                                >
                                    <h3 className="text-lg font-bold text-slate-900">
                                        {industry.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {industry.description}
                                    </p>

                                    <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                                        Explore storage options →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Compare Retail Storage Options
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Self Storage vs Your Own Warehouse vs KXH Retail Storage
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600">
                                Compare how each option supports seasonal collections, branch
                                transfers, replenishment, fixtures, displays, and changing
                                retail stock volumes—not just the amount of floor space
                                provided.
                            </p>
                        </div>

                        {/* DESKTOP TABLE */}
                        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                            <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr] bg-emerald-800 text-sm font-bold text-white">
                                <div className="p-5">Service Feature</div>

                                <div className="border-l border-white/10 p-5 text-center">
                                    Self Storage
                                </div>

                                <div className="border-l border-white/10 p-5 text-center">
                                    Warehouse Lease
                                </div>

                                <div className="border-l border-white/10 p-5 text-center">
                                    KXH Managed Storage
                                </div>
                            </div>

                            {[
                                {
                                    feature: "Collection from shops or retail sites",
                                    selfStorage: "Your team normally transports the stock",
                                    warehouseLease: "Your team manages collections and drivers",
                                    kxh: "Collection from approved London retail locations",
                                },
                                {
                                    feature: "Selected-stock replenishment",
                                    selfStorage: "Staff visit and retrieve the required products",
                                    warehouseLease:
                                        "Internal warehouse and transport team required",
                                    kxh: "Selected cartons, fixtures, or pallets can be returned",
                                },
                                {
                                    feature: "Seasonal capacity",
                                    selfStorage:
                                        "Increase by renting another unit when available",
                                    warehouseLease: "Fixed premises and longer commitment",
                                    kxh: "Storage can adjust around campaigns and stock cycles",
                                },
                                {
                                    feature: "Multi-site consolidation",
                                    selfStorage: "Each branch usually manages its own transport",
                                    warehouseLease:
                                        "Possible, but requires internal coordination",
                                    kxh: "Collections can be coordinated from multiple approved sites",
                                },
                                {
                                    feature: "Retail inventory organisation",
                                    selfStorage: "Your team labels and tracks stored stock",
                                    warehouseLease:
                                        "Requires warehouse staff and stock processes",
                                    kxh: "Physical stock categorisation and identification support",
                                },
                                {
                                    feature: "Fixtures, displays, and POS materials",
                                    selfStorage:
                                        "Possible if transported and arranged by your team",
                                    warehouseLease:
                                        "Supported, but you carry the property overhead",
                                    kxh: "Stored alongside suitable products and retail supplies",
                                },
                            ].map((row) => (
                                <div
                                    key={row.feature}
                                    className="grid grid-cols-[1.1fr_1fr_1fr_1fr] border-t border-slate-200 text-sm"
                                >
                                    <div className="bg-slate-100 p-5 font-semibold text-slate-900">
                                        {row.feature}
                                    </div>

                                    <div className="border-l border-slate-200 p-5 leading-6 text-slate-600">
                                        {row.selfStorage}
                                    </div>

                                    <div className="border-l border-slate-200 p-5 leading-6 text-slate-600">
                                        {row.warehouseLease}
                                    </div>

                                    <div className="border-l border-slate-200 bg-emerald-50 p-5 font-medium leading-6 text-slate-900">
                                        <span className="mr-2 text-emerald-700">✓</span>
                                        {row.kxh}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* MOBILE CARDS */}
                        <div className="mt-10 grid gap-5 md:hidden">
                            {[
                                {
                                    feature: "Collection from shops or retail sites",
                                    selfStorage: "Your team normally transports the stock",
                                    warehouseLease: "Your team manages collections and drivers",
                                    kxh: "Collection from approved London retail locations",
                                },
                                {
                                    feature: "Selected-stock replenishment",
                                    selfStorage: "Staff visit and retrieve the required products",
                                    warehouseLease:
                                        "Internal warehouse and transport team required",
                                    kxh: "Selected cartons, fixtures, or pallets can be returned",
                                },
                                {
                                    feature: "Seasonal capacity",
                                    selfStorage:
                                        "Increase by renting another unit when available",
                                    warehouseLease: "Fixed premises and longer commitment",
                                    kxh: "Storage can adjust around campaigns and stock cycles",
                                },
                                {
                                    feature: "Multi-site consolidation",
                                    selfStorage: "Each branch usually manages its own transport",
                                    warehouseLease:
                                        "Possible, but requires internal coordination",
                                    kxh: "Collections can be coordinated from multiple approved sites",
                                },
                                {
                                    feature: "Retail inventory organisation",
                                    selfStorage: "Your team labels and tracks stored stock",
                                    warehouseLease:
                                        "Requires warehouse staff and stock processes",
                                    kxh: "Physical stock categorisation and identification support",
                                },
                                {
                                    feature: "Fixtures, displays, and POS materials",
                                    selfStorage:
                                        "Possible if transported and arranged by your team",
                                    warehouseLease:
                                        "Supported, but you carry the property overhead",
                                    kxh: "Stored alongside suitable products and retail supplies",
                                },
                            ].map((row) => (
                                <article
                                    key={row.feature}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                                >
                                    <h3 className="bg-emerald-800 px-5 py-4 font-bold text-white">
                                        {row.feature}
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
                                            Warehouse lease
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {row.warehouseLease}
                                        </p>
                                    </div>

                                    <div className="border-t border-emerald-100 bg-emerald-50 p-5">
                                        <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                                            KXH managed storage
                                        </p>

                                        <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
                                            ✓ {row.kxh}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="mt-10 text-center">
                            <Link
                                href="/get-a-quote?service=storage"
                                className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                            >
                                Compare Your Storage Requirements
                            </Link>
                        </div>
                    </div>
                </section>
                {/* WHY BUSINESSES TRUST KXH */}

                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Trusted Retail Stock Storage Partner
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Why London Retailers Choose KXH Storage & Logistics
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600">
                                Retailers choose KXH for collection, managed warehouse storage,
                                organised physical stock handling, and return delivery that
                                adapts as inventory levels change.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    title: "Retail Stock Storage Specialists",
                                    description:
                                        "Managed business, commercial, warehouse, and ecommerce storage across London.",
                                },
                                {
                                    title: "Door-to-Door Service",
                                    description:
                                        "Collection, organised warehouse storage, and return delivery without repeated self-storage visits.",
                                },
                                {
                                    title: "Flexible Storage Capacity",
                                    description:
                                        "Increase or reduce storage as stock levels and operational requirements change.",
                                },
                                {
                                    title: "Secure Warehouse",
                                    description:
                                        "Business inventory stored in a professionally managed commercial warehouse.",
                                },
                                {
                                    title: "Supports Growing Businesses",
                                    description:
                                        "Suitable for startups, retailers, ecommerce brands, importers, wholesalers, and offices.",
                                },
                                {
                                    title: "Complete Storage Solution",
                                    description:
                                        "Business storage supported by inventory management, pallet storage, warehouse storage, and logistics.",
                                },
                            ].map((item) => (
                                <article
                                    key={item.title}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                                >
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                                        ✓
                                    </div>

                                    <h3 className="text-lg font-bold">{item.title}</h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        {item.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* INVENTORY DIFFERENTIATOR */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Evolving Beyond Basic Storage
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Keep Stored Retail Inventory Organised
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                KXH competes directly as a door-to-door storage provider while
                                also supporting businesses that need clearer physical inventory
                                organisation and warehouse handling.
                            </p>

                            <p className="mt-4 leading-7 text-slate-600">
                                This service concerns real stored products, cartons, fixtures,
                                displays, equipment, and pallets—not standalone inventory
                                software.
                            </p>

                            <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                {inventoryBenefits.map((benefit) => (
                                    <div
                                        key={benefit}
                                        className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
                                    >
                                        ✓ {benefit}
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/inventory-management-london"
                                className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                            >
                                Explore Inventory Management
                            </Link>
                        </div>

                        <Image
                            src="/images/retail-stock-storage/retail-stock-inventory-organisation-london.webp"
                            alt="Warehouse worker organising and scanning business inventory"
                            width={1200}
                            height={800}
                            quality={75}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                            loading="lazy"

                        />
                    </div>
                </section>

                {/* UK RETAIL CONTEXT */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                UK Retail Context
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Retail Storage Must Support Both Stores and Online Demand
                            </h2>
                            <p className="mt-5 leading-7 text-slate-600">
                                Official UK data shows the scale of the retail sector and the
                                continued importance of online sales. Flexible physical storage
                                can help retailers manage stock across both channels.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {retailStats.map((stat) => (
                                <article
                                    key={stat.label}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                                >
                                    <p className="text-3xl font-black tracking-tight text-emerald-700">
                                        {stat.value}
                                    </p>
                                    <h3 className="mt-2 font-bold text-slate-950">
                                        {stat.label}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {stat.detail}
                                    </p>
                                    <a
                                        href={stat.sourceHref}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-4 inline-flex text-xs font-semibold text-emerald-700 hover:underline"
                                    >
                                        Source: {stat.sourceLabel} →
                                    </a>
                                </article>
                            ))}
                        </div>

                        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
                            Statistics describe the wider UK and Great Britain retail market
                            and do not represent KXH customer results.
                        </p>
                    </div>
                </section>

                {/* CUSTOMER FIT */}
                <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:rounded-3xl sm:p-10">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Is KXH Retail Stock Storage Right for Your Business?
                            </h2>

                            <p className="mt-4 max-w-2xl leading-7 text-slate-700">
                                KXH is suitable for retailers that prefer collection, managed
                                storage, stock organisation, and return delivery over repeatedly
                                transporting inventory to and from a self-storage unit.
                            </p>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {reasonsToChooseKxh.map((reason) => (
                                    <div
                                        key={reason}
                                        className="rounded-xl border border-emerald-100 bg-white p-4 font-medium text-slate-800"
                                    >
                                        ✓ {reason}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="border-t border-slate-200 bg-slate-50 py-16">
                    <div className="mx-auto max-w-6xl px-5">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                London Coverage
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                Retail Stock Storage Across Greater London
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600">
                                KXH supports retailers across Greater London, including businesses
                                operating near major high streets, shopping centres, independent
                                retail districts, offices, studios, and commercial premises.
                            </p>

                            <p className="mt-4 leading-7 text-slate-600">
                                Our retail stock storage service is available as part of our wider
                                Business Storage solution. Browse our London business storage
                                locations below to see the areas we currently cover.
                            </p>

                            <div className="mt-7 flex flex-wrap justify-center gap-2">
                                {retailDistricts.map((district) => (
                                    <span
                                        key={district}
                                        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700"
                                    >
                                        {district}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3">
                            {londonLocations.map((location) => (
                                <Link
                                    key={location.slug}
                                    href={`/business-storage-london/${location.slug}`}
                                    className="text-sm font-medium text-emerald-700 hover:underline"
                                >
                                    Business Storage in {location.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                {/* BUSINESS STORAGE CONTENT HUB */}
                <section className="border-t border-slate-200 bg-slate-950 py-14 text-white sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                                Business Storage Knowledge Hub
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
                                Business Storage Services and Specialist Solutions
                            </h2>
                            <p className="mt-5 leading-7 text-slate-300">
                                Start with the main Business Storage London service, then
                                explore specialist solutions for retail stock, ecommerce
                                inventory, physical inventory organisation, pallets, warehouse
                                capacity, and wider commercial assets. These pages form one
                                connected managed-storage topic cluster rather than separate
                                competing services.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {retailKnowledgeGuides.map((guide) => (
                                <Link
                                    key={guide.href}
                                    href={guide.href}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/50 hover:bg-white/10"
                                >
                                    <h3 className="font-bold !text-white">{guide.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-300">
                                        {guide.description}
                                    </p>
                                    <span className="mt-5 inline-block text-sm font-semibold text-emerald-300">
                                        Explore guide →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* HOW KXH HANDLES RETAIL INVENTORY */}
                <section className="border-t border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                How KXH Handles Retail Inventory
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                A Clear Process From Collection to Return Delivery
                            </h2>
                            <p className="mt-5 leading-7 text-slate-600">
                                Each booking is planned around the actual goods, premises,
                                access, handling requirements, and retrieval needs. The exact
                                process and level of item detail are confirmed before service.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {handlingSteps.map((step, index) => (
                                <article
                                    key={step.title}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                                >
                                    <span className="text-sm font-black text-emerald-700">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="mt-4 text-xl font-bold text-slate-950">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {step.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                        <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-sm leading-6 text-slate-700">
                            Storage suitability, inventory detail, retrieval options, access,
                            handling, insurance, and delivery arrangements depend on the items
                            and the service agreed in the quotation.
                        </div>
                    </div>
                </section>

                {/* TEAM IMAGE */}
                <section className="border-t border-slate-200 bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <Image
                            src="/images/retail-stock-storage/retail-storage-warehouse-team-london.webp"
                            alt="KXH warehouse team supporting London retail stock storage"
                            width={1200}
                            height={800}
                            quality={75}
                            sizes="(max-width: 768px) 100vw, 960px"
                            className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                        />
                    </div>
                </section>

                <TestimonialsSection />

                {/* FINAL CTA */}
                <section className="border-t border-emerald-800 bg-emerald-800 py-14 text-center text-white sm:py-20">
                    <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
                        <p className="text-sm font-semibold uppercase tracking-wide !text-white">
                            Flexible Retail Stock Storage
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
                            Free Up Retail Space Without Leasing a Warehouse
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
                            Get a quote for collection, secure managed storage, inventory
                            organisation, and return delivery across London.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link
                                href="/get-a-quote?service=storage"
                                className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 sm:w-auto sm:px-8"
                            >
                                Get Retail Storage Quote
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

                {/* FAQ */}
                <section className="border-t border-slate-200 bg-slate-50 py-12">
                    <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                            Retail Stock Storage FAQs
                        </h2>

                        <div className="space-y-3">
                            {faqs.map((faq) => (
                                <details
                                    key={faq.question}
                                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
                                >
                                    <summary className="cursor-pointer font-semibold">
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
