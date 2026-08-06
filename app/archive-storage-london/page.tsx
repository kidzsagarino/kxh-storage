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

const pageUrl = "https://kxhlogistics.co.uk/archive-storage-london";
const quoteUrl = "/get-a-quote?service=storage&storageType=archive";

export const metadata: Metadata = {
    title: "Archive Storage London | Collection & Retrieval | KXH",
    description:
        "Managed archive storage in London with business collection, organised offsite storage, archive indexing, retrieval and return delivery.",
    applicationName: "KXH Storage & Logistics",
    category: "Business archive storage",
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
        title: "Archive Storage London | Collection & Retrieval | KXH",
        description:
            "Managed archive storage for London businesses with collection, organised offsite storage, indexing, retrieval and return delivery.",
        images: [
            {
                url: "/images/archive-storage/archive-storage-london.webp",
                width: 1200,
                height: 630,
                alt: "Organised archive boxes inside a secure managed London warehouse",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Archive Storage London | Collection & Retrieval | KXH",
        description:
            "Managed archive storage for London businesses with collection, indexing, retrieval and return delivery.",
        images: ["/images/archive-storage/archive-storage-london.webp"],
    },
};

const coreBenefits = [
    "Archive collection",
    "Secure warehouse storage",
    "Archive organisation",
    "Archive retrieval",
];

const customerProblems = [
    {
        title: "Filing Cabinets Are Taking Over",
        description:
            "Move inactive records and archive boxes out of offices, corridors, meeting rooms, basements, and valuable operational space.",
    },
    {
        title: "Retention Requirements Keep Growing",
        description:
            "Keep records for required business, legal, financial, contractual, or governance periods without overcrowding your premises.",
    },
    {
        title: "Archives Are Poorly Organised",
        description:
            "Replace mixed stacks, unclear labels, and scattered storage areas with a structured physical archive inventory and agreed references.",
    },
    {
        title: "Your Business Is Moving or Downsizing",
        description:
            "Transfer retained documents offsite before an office relocation, refurbishment, consolidation, or reduction in occupied space.",
    },
    {
        title: "Inactive Records Still Need Access",
        description:
            "Store documents away from daily operations while retaining a practical process for requesting selected boxes or files.",
    },
    {
        title: "Self Storage Creates More Work",
        description:
            "Avoid arranging vans, loading boxes, visiting a unit, searching through stacks, and transporting records back to your office.",
    },
    {
        title: "Different Teams Hold Separate Archives",
        description:
            "Consolidate records from departments, branches, former offices, project sites, or multiple storage locations into one managed service.",
    },
    {
        title: "Confidential Records Need Better Control",
        description:
            "Keep sensitive business records within a managed warehouse workflow rather than in open office areas or uncontrolled cupboards.",
    },
];

const processSteps = [
    {
        number: "1",
        title: "Request a Quote",
        description:
            "Tell us what you need to store, the approximate archive volume, collection address, expected storage term, and likely retrieval requirements.",
    },
    {
        number: "2",
        title: "Collect & Register",
        description:
            "We collect boxed archives from the agreed London premises and organise them using suitable labels, references, categories, or supplied manifests.",
    },
    {
        number: "3",
        title: "Store Offsite",
        description:
            "Your physical records are placed into managed warehouse storage, freeing office space while keeping the archive available for future requests.",
    },
    {
        number: "4",
        title: "Retrieve & Return",
        description:
            "Request selected boxes or a full archive for delivery to an agreed address, with re-storage available when included in your arrangement.",
    },
];

const pricingFactors = [
    {
        title: "Archive Volume",
        description:
            "The number, dimensions, weight, and condition of archive boxes, bound records, plans, tubes, or other approved document containers.",
    },
    {
        title: "Storage Duration",
        description:
            "The expected retention period, whether temporary, project-based, rolling, multi-year, or subject to future review.",
    },
    {
        title: "Collection & Handling",
        description:
            "Collection location, access conditions, stairs or lifts, loading requirements, packing status, and handling needed before storage.",
    },
    {
        title: "Retrieval & Delivery",
        description:
            "The likely frequency, urgency, quantity, destination, and handling requirements for archive retrieval and return delivery requests.",
    },
];

const archiveTypes = [
    "Business records",
    "Contracts and agreements",
    "Personnel and HR files",
    "Accounting documents",
    "Legal case files",
    "Medical and care records",
    "Financial records",
    "Engineering drawings",
    "Project documentation",
    "Archive boxes",
    "Bound registers and records",
    "Historical company files",
    "Blueprints and plans",
    "Property and tenancy records",
    "Governance and board papers",
];

const industries = [
    { title: "Law Firms", description: "Closed matter files, contracts, case documentation, property records, correspondence, and retained legal archives." },
    { title: "Accountants", description: "Client files, tax records, working papers, payroll documentation, accounts, invoices, and historical financial records." },
    { title: "Healthcare", description: "Approved medical, care, administrative, governance, finance, supplier, and operational records requiring managed physical storage." },
    { title: "Schools & Universities", description: "Administrative files, student-related records, finance documents, governance papers, estates records, and historical archives." },
    { title: "Property Management", description: "Tenancy records, leases, inspections, maintenance histories, contractor documents, compliance files, and property archives." },
    { title: "Construction", description: "Project files, drawings, handover packs, site documentation, contracts, certificates, manuals, and completed-project archives." },
    { title: "Engineering", description: "Technical drawings, project records, reports, specifications, manuals, calculations, and historical design documentation." },
    { title: "Financial Services", description: "Client documentation, transaction records, audit materials, agreements, governance files, and retained business records." },
    { title: "Retail & Hospitality", description: "Property files, supplier records, HR archives, finance paperwork, operating manuals, and records from multiple locations." },
    { title: "Charities", description: "Governance records, donor administration, programme files, finance documentation, grant records, and historical organisational archives." },
    { title: "Government Contractors", description: "Project documentation, contracts, reporting records, supplier files, compliance evidence, and retained operational archives." },
    { title: "Architecture Firms", description: "Plans, drawings, specifications, project files, planning documents, client records, samples documentation, and completed-job archives." },
];

const archiveUseCases = [
    { title: "Office Archive Overflow", description: "Move inactive files off desks, shelves, cupboards, corridors, and filing rooms while keeping active documents onsite." },
    { title: "Business Expansion", description: "Create room for more employees, equipment, customer areas, production, or operational activity without losing retained records." },
    { title: "Office Downsizing", description: "Reduce the space allocated to filing and move older records into managed offsite archive storage." },
    { title: "Compliance & Retention", description: "Support internal retention policies by storing physical records for agreed periods and organising them for future review." },
    { title: "Long-Term Retention", description: "Hold records that are rarely used but still need to remain available for legal, contractual, historical, or business reasons." },
    { title: "Inactive Records", description: "Separate closed files from active working documents so teams can access current information more efficiently." },
    { title: "Archive Consolidation", description: "Bring records together from departments, former branches, home offices, project sites, or several existing storage locations." },
    { title: "Office Moves", description: "Remove retained records before relocation day and return selected archives once the new office is ready." },
];

const comparisonRows = [
    { category: "Collection", selfStorage: "Your team packs, loads, transports, and unloads the archives", traditional: "Collection may be available within a fixed archive programme", kxh: "KXH can collect archive boxes from London business premises" },
    { category: "Inventory", selfStorage: "Your team creates and maintains all box lists and locations", traditional: "Formal barcode or records-management systems may be required", kxh: "Physical archive records can be organised around agreed labels, manifests, and references" },
    { category: "Retrieval", selfStorage: "Your staff visit the unit and search for the required box", traditional: "Retrieval follows the provider's contracted process and service level", kxh: "Request selected boxes or identified archives for managed retrieval" },
    { category: "Warehouse", selfStorage: "You rent and manage access to a storage unit", traditional: "Purpose-built records facility with standardised archive services", kxh: "Archives are stored inside KXH's managed business warehouse environment" },
    { category: "Delivery", selfStorage: "Your team arranges vehicles and returns documents", traditional: "Delivery may be scheduled under the provider's service terms", kxh: "Return delivery can be coordinated to the agreed London address" },
    { category: "Handling", selfStorage: "All lifting, sorting, labelling, and movement is your responsibility", traditional: "Structured handling designed for high-volume records contracts", kxh: "Collection, physical organisation, storage handling, retrieval, and return can be managed together" },
    { category: "Flexibility", selfStorage: "Flexible unit rental but high internal labour and travel", traditional: "Often suited to larger formal records-management programmes", kxh: "Suitable for businesses needing practical managed storage without operating their own unit" },
    { category: "Business support", selfStorage: "Space only", traditional: "Specialist archive and records-management service", kxh: "Integrated with business storage, inventory organisation, relocation, and document shredding services" },
];

const chooseKxh = [
    { title: "Managed Archive Collection", description: "We can collect archive boxes from offices and business premises, reducing disruption and removing the need to arrange your own transport." },
    { title: "Secure Managed Warehouse", description: "Physical archives are stored within a professionally managed business-storage environment rather than an unattended office cupboard or customer-managed unit." },
    { title: "Archive Organisation", description: "Boxes can be structured around agreed references, departments, date ranges, projects, clients, retention categories, or supplied manifests." },
    { title: "Retrieval Support", description: "Request selected archives instead of collecting the entire stored load whenever a team needs a specific box, file group, or project record." },
    { title: "Return Delivery", description: "Retrieved archives can be delivered to an agreed address, helping teams access records without repeated warehouse visits." },
    { title: "Business Storage Expertise", description: "Archive storage can form part of a wider solution covering office equipment, commercial goods, relocation support, inventory organisation, and secure shredding." },
];

const archiveInventoryBenefits = [
    "Physical archive indexing",
    "Box and category references",
    "Department or project grouping",
    "Manifest-based organisation",
    "Selected archive retrieval",
    "Return-delivery coordination",
];

const customerFit = [
    "You need archive boxes collected from your premises",
    "You need selected archives retrieved and returned",
    "You want flexible offsite storage without renting a unit",
    "You need to release office space occupied by inactive files",
    "You are implementing a retention or records policy",
    "You prefer a managed service over self-storage access",
];

const archiveLifecycle = [
    { title: "Archive Created", description: "Documents begin as active working records used by teams, clients, projects, finance, HR, governance, or operations." },
    { title: "Collected by KXH", description: "Once records become inactive or space is needed, KXH can collect boxed archives from the agreed London premises." },
    { title: "Registered & Organised", description: "Archive boxes are arranged using agreed box references, departments, projects, date ranges, retention labels, or supplied manifests." },
    { title: "Stored Offsite", description: "Physical records are moved into managed warehouse storage, freeing office space while keeping the archive available for future requests." },
    { title: "Retrieved When Needed", description: "Selected boxes or identified records can be requested for audits, legal work, projects, HR reviews, finance checks, or operational use." },
    { title: "Returned or Re-Stored", description: "Retrieved archives can be delivered to the agreed address and returned to storage after use when this is part of the service." },
    { title: "Reviewed at Retention End", description: "At the end of an organisation's approved retention period, records may be returned, retained longer, reviewed, or securely shredded with authorisation." },
];

const retentionExamples = [
    "Project-based archive periods",
    "Organisation-defined review dates",
    "Rolling retention schedules",
    "Contract-specific retention categories",
    "Long-term historical archives",
    "Authorised return or destruction reviews",
];

const retrievalOptions = [
    "Selected archive-box retrieval",
    "Multiple-box project requests",
    "Scheduled business delivery",
    "Return-to-storage coordination",
    "Retrieval from agreed references",
    "Full archive return when required",
];

const commonArchiveMistakes = [
    "Boxes stored without clear references",
    "Active and inactive files mixed together",
    "Retention-review dates not recorded",
    "Different departments using inconsistent labels",
    "Duplicate records taking up valuable space",
    "Self-storage units managed by office staff",
    "No agreed retrieval-authorisation process",
    "Archive lists that no longer match physical boxes",
];

const collectionPreparation = [
    "Use sturdy archive boxes suitable for handling",
    "Label boxes with clear, unique references",
    "Separate active files from inactive records",
    "Group boxes by department, project, client, or year",
    "Identify confidential or restricted records",
    "Provide existing manifests or archive lists",
    "Flag damaged, heavy, or unusual document containers",
    "Explain likely retrieval and return requirements",
];

const postCollectionSteps = [
    {
        title: "Arrival and handling review",
        description:
            "Collected archive boxes enter the agreed warehouse workflow and are checked against the collection information provided.",
    },
    {
        title: "Reference confirmation",
        description:
            "Existing labels, box numbers, department references, manifests, or agreed identifiers are confirmed for physical organisation.",
    },
    {
        title: "Storage location assignment",
        description:
            "Archives are placed into an organised warehouse location so stored boxes can be distinguished and requested later.",
    },
    {
        title: "Retrieval-ready records",
        description:
            "The agreed archive references support future requests for selected boxes, document groups, projects, or a complete archive.",
    },
];

const existingArchiveSystems = [
    "Existing box numbers",
    "Excel archive inventories",
    "Department references",
    "Project or client codes",
    "Date-range labels",
    "Retention-review dates",
    "Existing barcode labels",
    "Paper or digital manifests",
];

const typicalRetrievalRequests = [
    "Payroll and HR records",
    "Historic contracts",
    "Board and governance papers",
    "Invoices and accounting files",
    "Closed legal matters",
    "Property and tenancy records",
    "Engineering drawings",
    "Project and handover documentation",
    "Medical or care records",
    "Historical company archives",
];

const relatedServices = [
    { title: "Business Storage London", href: "/business-storage-london", description: "The main KXH business-storage service for archives, stock, equipment, office contents, collection, warehouse storage, and return delivery." },
    { title: "Commercial Storage London", href: "/commercial-storage-london", description: "Flexible managed storage for commercial records, equipment, stock, furniture, materials, and operational items." },
    { title: "Inventory Management London", href: "/inventory-management-london", description: "Physical inventory organisation, item records, categorisation, warehouse handling, and selected-item return support." },
    { title: "Warehouse Storage London", href: "/warehouse-storage-london", description: "Managed warehouse capacity for business records, stock, equipment, pallets, and commercial storage requirements." },
    { title: "Document Shredding", href: "/shredding-solutions-london", description: "Secure document shredding for records that have reached the end of their approved retention period." },
    { title: "Office Relocation London", href: "/office-relocation-london", description: "Business moving support for offices relocating, consolidating, refurbishing, or changing how their workspace is used." },
    { title: "Moving & Storage London", href: "/logistics-moving-london", description: "Combined collection, moving, temporary storage, handling, and return delivery for London businesses." },
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
    { question: "How secure is archive storage?", answer: "KXH provides managed physical archive storage inside a business warehouse environment. Security, access, collection, handling, indexing, retrieval, and delivery requirements should be discussed during quotation so the proposed service matches the confidentiality and operational needs of your records." },
    { question: "Do you collect archive boxes from London businesses?", answer: "Yes. KXH can arrange archive collection from offices, commercial premises, project sites, former business locations, and other agreed addresses across London. Collection requirements are priced according to volume, access, location, handling, and transport needs." },
    { question: "Can I retrieve individual files or archive boxes?", answer: "KXH can arrange retrieval of selected archive boxes or identified records where the archive has been organised with suitable references. The practical retrieval method depends on the indexing information, labels, manifests, and level of document identification agreed for your service." },
    { question: "Do you store legal documents?", answer: "Yes, subject to suitability and agreed handling requirements. Legal archives may include closed matter files, contracts, property records, correspondence, case documents, and other retained business records." },
    { question: "Can you store medical records?", answer: "KXH can discuss storage of approved physical medical, care, administrative, and healthcare records. The organisation must explain applicable confidentiality, retention, access, and handling requirements so suitability can be assessed before collection." },
    { question: "Can you collect archives directly from my office?", answer: "Yes. Our managed model is designed to reduce the need for businesses to visit a storage unit. We can collect boxed archives from the office, transport them to storage, organise them using agreed references, and arrange retrieval and delivery later." },
    { question: "How long can archives remain in storage?", answer: "Archive storage can support temporary, medium-term, rolling, or long-term requirements. The appropriate arrangement depends on archive volume, retention policy, review dates, retrieval frequency, and any planned destruction or return programme." },
    { question: "How are archive boxes organised?", answer: "Boxes may be organised using existing labels, box numbers, departments, date ranges, client or project references, retention categories, manifests, or another agreed physical archive structure. KXH is not cloud storage or document-management software; the service concerns real boxes and records held in the warehouse." },
    { question: "Do you provide archive delivery?", answer: "Yes. Selected archives or a full stored collection can be returned to an agreed address. Delivery timing, volume, handling, access, and any re-storage requirement are confirmed before the movement is scheduled." },
    { question: "Can archived documents be retrieved quickly?", answer: "Retrieval speed depends on how the archive is indexed, the quantity requested, warehouse handling requirements, delivery location, and scheduling availability. Businesses with frequent or time-sensitive retrieval needs should explain those expectations during quotation." },
    { question: "Is KXH archive storage the same as self storage?", answer: "No. Self storage generally provides a unit that your team must transport records to, organise, visit, and manage. KXH provides a managed archive workflow that can include collection, transport, organisation, warehouse storage, retrieval, and return delivery." },
    { question: "Is this digital document storage or cloud archiving?", answer: "No. KXH stores physical archive boxes, paper files, bound records, drawings, plans, and approved business documentation. We do not present this service as cloud storage, scanning software, electronic records management, or a digital document platform." },
    { question: "Can you store confidential business records?", answer: "KXH can discuss confidential document storage where the records, packaging, indexing, handling, access, and retrieval requirements are suitable for the service. Businesses remain responsible for explaining any sector-specific, contractual, legal, or internal controls that apply." },
    { question: "Can you help during an office relocation or downsizing?", answer: "Yes. Archive collection can be coordinated before an office move, consolidation, refurbishment, or downsizing project. Inactive records can remain offsite while active files, furniture, and equipment move to the new workplace." },
    { question: "What happens when records reach the end of their retention period?", answer: "You can request return, continued storage, review, or an agreed shredding service for eligible records. Destruction should only proceed with clear authorisation from the organisation responsible for the documents and in line with its retention policy." },
    { question: "Do archive boxes need to be indexed before collection?", answer: "Not always. Existing box lists, labels, manifests, departments, project references or date ranges are useful, but the required level of organisation can be discussed during quotation. Retrieval is easier when each box or record group has a clear agreed identifier." },
    { question: "Can you collect archives from more than one London office?", answer: "Multiple collection points can be discussed as part of an archive consolidation or office-relocation project. Pricing and scheduling depend on the number of locations, archive volume, access, handling and transport requirements." },
    { question: "Can more archive boxes be added after the initial collection?", answer: "Ongoing additions may be possible where they fit the agreed storage and inventory process. Tell KXH how frequently new boxes are likely to be added so collection, labelling, storage records and pricing can be planned appropriately." },
];

function ServiceJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Archive Storage London",
        serviceType: "Managed Archive and Document Storage",
        url: pageUrl,
        description:
            "Managed archive storage in London with collection, secure transport, archive registration, organised warehouse storage, retrieval, and return delivery.",
        provider: {
            "@type": "LocalBusiness",
            "@id": "https://kxhlogistics.co.uk/#business",
            name: "KXH Storage & Logistics",
            url: "https://kxhlogistics.co.uk",
            telephone: "+447386277785",
        },
        areaServed: { "@type": "City", name: "London" },
        audience: { "@type": "BusinessAudience", audienceType: "London businesses and organisations" },
        offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            url: `https://kxhlogistics.co.uk${quoteUrl}`,
            availability: "https://schema.org/InStock",
            itemOffered: { "@id": `${pageUrl}#service` },
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Managed Archive Storage Services",
            itemListElement: [
                "Archive collection",
                "Physical archive registration",
                "Offsite warehouse storage",
                "Archive retrieval",
                "Return delivery",
                "Authorised shredding coordination",
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
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
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
            { "@type": "ListItem", position: 3, name: "Business Storage London", item: "https://kxhlogistics.co.uk/business-storage-london" },
            { "@type": "ListItem", position: 4, name: "Archive Storage London", item: pageUrl },
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
        name: "Archive Storage London",
        description:
            "Managed archive storage in London with collection, physical archive organisation, warehouse storage, retrieval and return delivery.",
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
            url: "https://kxhlogistics.co.uk/images/archive-storage/archive-storage-london.webp",
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
            {description && (
                <p className="mt-4 leading-7 text-slate-600">{description}</p>
            )}
        </div>
    );
}

const pageSections = [
    { href: "#how-it-works", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#documents", label: "Documents stored" },
    { href: "#retrieval", label: "Retrieval" },
    { href: "#coverage", label: "London coverage" },
    { href: "#faqs", label: "FAQs" },
];

function PageSectionNav() {
    return (
        <nav
            aria-label="Archive storage page sections"
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
                Archive Storage London
            </span>
        </nav>
    );
}

function HeroSection() {
    return (
        <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Managed Archive Storage for London Businesses
                </div>

                <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                    Archive Storage London
                </h1>

                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                    Secure managed archive storage for business records, document
                    boxes, legal files, financial records, project archives, and
                    retained paperwork.
                </p>

                <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                    KXH manages the physical archive lifecycle from collection and
                    secure transport to organisation, warehouse storage, retrieval,
                    and return delivery. Your team does not need to rent, visit, or
                    operate a self-storage unit.
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
                        Get Archive Storage Quote
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

                <div className="mt-6 flex justify-center">
                    <TrustpilotPill />
                </div>

                <div className="mt-12">
                    <Image
                        src="/images/business-storage/business-storage-london-warehouse-inventory.webp"
                        alt="Organised archive boxes inside a secure managed London warehouse"
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
    const items = [
        {
            title: "Not Self Storage",
            text: "Your team does not need to hire vans, visit a unit, search through stacks, or manage another facility.",
        },
        {
            title: "Not Cloud Storage",
            text: "KXH stores physical archive boxes, files, plans, drawings, and bound records rather than digital documents.",
        },
        {
            title: "Not Archive Software",
            text: "The service is built around real warehouse handling, physical references, retrieval requests, and return delivery.",
        },
        {
            title: "Managed Physical Archives",
            text: "KXH collects, organises, stores, retrieves, returns, and can coordinate authorised shredding at retention end.",
        },
    ];

    return (
        <section className="border-b border-slate-200 bg-white py-12 sm:py-16">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Managed Physical Archive Storage"
                    title="More Than Space for Archive Boxes"
                    description="KXH manages the physical movement and organisation of business archives without presenting the service as self storage, cloud storage, or records-management software."
                    maxWidth="3xl"
                />

                <div className="mt-10 grid gap-4 md:grid-cols-4">
                    {items.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                        >
                            <h3 className="text-lg font-bold text-slate-950">
                                {item.title}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {item.text}
                            </p>
                        </article>
                    ))}
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
                            Your Office Should Support Your Team, Not Become an{" "}
                            <span className="text-emerald-700">Archive Warehouse</span>
                        </>
                    }
                    description="Free working space, improve physical records organisation, and keep retained documents available without asking employees to manage transport, unit access, shelving, or repeated archive searches."
                    maxWidth="3xl"
                />

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {customerProblems.map((problem) => (
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
    );
}

function ProcessSection() {
    return (
        <section id="how-it-works" className="scroll-mt-24 border-b border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="How It Works"
                    title="Four Steps from Office Collection to Archive Return"
                    description="A practical managed process covering archive collection, physical organisation, offsite storage, retrieval and return delivery."
                />

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
    );
}

function LifecycleSection() {
    return (
        <section className="border-b border-slate-200 bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Archive Lifecycle"
                    title="Manage Physical Records from Office Use to Retention Review"
                    description="KXH supports the physical stages that follow active office use: collection, organisation, offsite storage, retrieval, return, re-storage, and authorised end-of-retention handling."
                    maxWidth="3xl"
                />

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {archiveLifecycle.map((stage, index) => (
                        <article
                            key={stage.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6"
                        >
                            <span className="text-sm font-black text-emerald-700">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="mt-4 text-lg font-bold text-slate-950">
                                {stage.title}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {stage.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PricingSection() {
    return (
        <section id="pricing" className="scroll-mt-24 bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Flexible Archive Storage Pricing
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        A Quote Based on the Archive Service You Actually Need
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Archive storage is not priced as a one-size-fits-all room.
                        Your quote reflects the physical volume stored and the work
                        required to collect, handle, organise, retain, retrieve, and
                        return your business records.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        This makes the service suitable for anything from a defined
                        office-clearance archive project to an ongoing offsite records
                        requirement with scheduled additions and retrieval requests.
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-500">
                        No fixed prices are published because access, box condition,
                        volume, indexing, storage term, retrieval frequency, and
                        delivery requirements vary between organisations.
                    </p>
                    <Link
                        href={quoteUrl}
                        className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                    >
                        Calculate Your Archive Storage Quote
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {pricingFactors.map((factor) => (
                        <article
                            key={factor.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6"
                        >
                            <h3 className="font-bold text-slate-900">
                                {factor.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                {factor.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ManagedStorageSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <Image
                    src="/images/business-storage/business-storage-pickup-delivery-london.webp"
                    alt="Archive boxes being organised for managed document storage in London"
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
                        Managed Archive Storage
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Physical Archive Storage, Not Cloud Storage or Document Software
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        KXH stores real archive boxes, paper documents, bound records,
                        plans, drawings, and approved business files. This is a
                        physical warehouse service, not electronic document
                        management, scanning software, or a digital records platform.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        We collect archives from your premises, place them into an
                        organised warehouse workflow, maintain agreed physical archive
                        references, retrieve requested records, and coordinate return
                        delivery.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        The managed model is designed for businesses that need offsite
                        capacity and practical access support but do not want employees
                        travelling to a self-storage site or managing an additional
                        facility. Businesses needing wider commercial capacity can also
                        explore{" "}
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
                    <ul className="mt-7 space-y-3 text-sm font-medium text-slate-700 sm:text-base">
                        <li>✓ Organised archive storage</li>
                        <li>✓ Physical archive inventory</li>
                        <li>✓ Organised shelving and warehouse handling</li>
                        <li>✓ Selected archive retrieval</li>
                        <li>✓ Return delivery coordination</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

function ArchiveSuitabilitySection() {
    const considerations = [
        {
            title: "Packaging and condition",
            text: "Boxes and document containers should be suitable for transport, handling and the proposed storage period.",
        },
        {
            title: "Confidentiality requirements",
            text: "Tell KXH about internal access restrictions, authorisation processes and sector-specific handling expectations.",
        },
        {
            title: "Archive references",
            text: "Clear box numbers, manifests or agreed identifiers make later retrieval more practical and reliable.",
        },
        {
            title: "Retention responsibility",
            text: "Your organisation remains responsible for deciding what must be retained, returned, reviewed or destroyed.",
        },
    ];

    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Archive Security & Suitability"
                    title="Agree the Handling Requirements Before Collection"
                    description="Sensitive business archives need a storage workflow that reflects the documents, packaging, access controls and retrieval expectations involved. KXH reviews these requirements during quotation rather than applying unsupported one-size-fits-all claims."
                    maxWidth="3xl"
                />

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {considerations.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                        >
                            <h3 className="text-lg font-bold text-slate-950">
                                {item.title}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {item.text}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function StoredItemsSection() {
    return (
        <section id="documents" className="scroll-mt-24 bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="What Can Be Stored"
                    title="Archive Storage for Business Documents, Files, Plans and Records"
                    description="KXH supports a broad range of boxed and appropriately packaged business archives, subject to suitability, condition, confidentiality requirements, and available warehouse capacity."
                />

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {archiveTypes.map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-800"
                        >
                            ✓ {item}
                        </div>
                    ))}
                </div>
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
                    title="Business Archive Storage Across Professional, Public and Commercial Sectors"
                    description="Different industries retain different documents, use different reference systems, and require different retrieval workflows. KXH shapes the physical storage plan around the records you hold and how your teams expect to use them."
                    maxWidth="3xl"
                />

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {industries.map((industry) => (
                        <article
                            key={industry.title}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                        >
                            <h3 className="text-lg font-bold text-slate-950">
                                {industry.title}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {industry.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function UseCasesSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <Image
                    src="/images/business-storage/inventory-management-business-storage-london.webp"
                    alt="Managed archive warehouse storing labelled business document boxes in London"
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
                        eyebrow="Archive Use Cases"
                        title="Use Offsite Archive Storage Through Every Stage of Business Change"
                        description="Archive storage can solve an immediate space problem, support a relocation, or become an ongoing records process for inactive documents that still need to be retained and retrieved."
                    />
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {archiveUseCases.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                        >
                            <h3 className="font-bold text-slate-950">{item.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                {item.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ComparisonSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Choose the Right Archive Model"
                    title="Archive Storage vs Self Storage vs a Traditional Archive Company"
                    description="The right model depends on archive volume, governance requirements, retrieval frequency and the level of operational support your organisation needs. KXH provides a practical managed option built around collection, organised storage, retrieval and delivery."
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
                                Traditional Archive Company
                            </div>
                            <div className="border-l border-white/10 p-5">
                                KXH Managed Archive Storage
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
                                <div className="border-l border-slate-200 bg-white p-5 leading-6 text-slate-600">
                                    {row.selfStorage}
                                </div>
                                <div className="border-l border-slate-200 bg-white p-5 leading-6 text-slate-600">
                                    {row.traditional}
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
                                    Traditional archive company
                                </p>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {row.traditional}
                                </p>
                            </div>
                            <div className="border-t border-emerald-100 bg-emerald-50 p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                                    KXH managed archive storage
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
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Managed Business Archive Partner"
                    title="Why London Businesses Choose KXH Storage & Logistics"
                    description="KXH combines archive collection, physical organisation, warehouse storage, retrieval, and delivery with wider business-storage and relocation capabilities. That makes it easier to manage records alongside the other physical items your organisation needs to move or store."
                    maxWidth="3xl"
                />

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {chooseKxh.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                        >
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                                ✓
                            </div>
                            <h3 className="text-lg font-bold text-slate-950">
                                {item.title}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                {item.description}
                            </p>
                        </article>
                    ))}
                </div>

                <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-slate-950">
                        What KXH will confirm before your archive is collected
                    </h3>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            "Collection access and handling",
                            "Archive references and organisation",
                            "Storage and retrieval expectations",
                            "Return or shredding authorisation process",
                        ].map((item) => (
                            <div
                                key={item}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800"
                            >
                                ✓ {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 rounded-3xl border border-emerald-100 bg-emerald-50 p-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-950">
                        A Complete Managed Archive Workflow
                    </h3>
                    <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-700">
                        From the first collection through long-term storage, selected
                        retrieval, office delivery, re-storage, or authorised shredding,
                        KXH gives businesses one operational partner for the physical
                        archive lifecycle. Records approved for destruction can move
                        into our{" "}
                        <Link
                            href="/shredding-solutions-london"
                            className="rounded-sm font-semibold text-emerald-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                        >
                            Document Shredding
                        </Link>{" "}
                        service.
                    </p>
                </div>
            </div>
        </section>
    );
}

function InventoryOrganisationSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Archive Inventory Organisation
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Know What Has Been Stored and Request What You Need
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Archive organisation focuses on physical records: boxes, files,
                        plans, registers, and document groups held inside the warehouse.
                        Agreed identifiers help distinguish one stored archive from
                        another and support more efficient retrieval requests.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        The right structure may use box numbers, departments, projects,
                        client references, year ranges, record categories, retention
                        dates, or a manifest supplied by your organisation. The service
                        does not replace your legal records policy or digital document
                        system.
                    </p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        {archiveInventoryBenefits.map((benefit) => (
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

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                        Archive organisation built around retrieval
                    </h3>
                    <p className="mt-5 leading-7 text-slate-700">
                        A useful archive inventory should make future action easier.
                        Before collection, decide how teams will identify a requested
                        record, who may authorise retrieval, where deliveries should go,
                        and what should happen when records reach their review date.
                    </p>
                    <ul className="mt-6 space-y-3 text-slate-700">
                        <li>✓ Organised box references</li>
                        <li>✓ Department and project grouping</li>
                        <li>✓ Retrieval-request support</li>
                        <li>✓ Return-delivery coordination</li>
                        <li>✓ Retention-review planning</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

function RetentionRetrievalSection() {
    return (
        <section id="retrieval" className="scroll-mt-24 bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Archive Retention Support
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Store Records Around Your Organisation&apos;s Retention Policy
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Retention periods vary by record type, sector, contract,
                        internal policy, and legal responsibility. KXH does not
                        determine how long your organisation must keep a document, but
                        we can structure physical storage around the review dates and
                        categories you provide.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Archive labels and manifests can include retention dates or
                        review categories so your team can identify records that need
                        continued storage, return, review, or authorised destruction.
                    </p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        {retentionExamples.map((item) => (
                            <div
                                key={item}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800"
                            >
                                ✓ {item}
                            </div>
                        ))}
                    </div>
                    <p className="mt-5 text-sm leading-6 text-slate-500">
                        These are examples of archive arrangements, not legal retention
                        advice. Your organisation remains responsible for setting and
                        approving its own retention schedule.
                    </p>
                </div>

                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Archive Retrieval Service
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Request Selected Records Without Visiting the Warehouse
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Retrieval is a core part of the managed service. Where archives
                        are stored under suitable references, your team can request
                        particular boxes, project files, departmental records, date
                        ranges, or a complete stored archive.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Timing depends on the quality of the archive references, the
                        number of records requested, warehouse handling, delivery
                        location, and scheduling availability. Frequent or
                        time-sensitive retrieval requirements should be agreed during
                        quotation.
                    </p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        {retrievalOptions.map((item) => (
                            <div
                                key={item}
                                className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
                            >
                                ✓ {item}
                            </div>
                        ))}
                    </div>
                    <Link
                        href={quoteUrl}
                        className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Discuss Retrieval Requirements
                    </Link>
                </div>
            </div>
        </section>
    );
}

function ArchiveProjectGuidanceSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Planning a Successful Archive Project
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Good Archive Storage Starts Before Collection
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Archive projects work best when the business decides what will
                        be stored, how boxes should be identified, who can request
                        retrieval, and what should happen when records reach their review
                        date.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        KXH provides the physical collection, organisation, warehouse
                        storage, retrieval and return-delivery workflow. Your organisation
                        remains responsible for document ownership, retention decisions,
                        access approval and destruction authorisation.
                    </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                        Decisions to make before archives move offsite
                    </h3>
                    <ul className="mt-6 space-y-3 text-slate-700">
                        <li>✓ Which records are active and which are inactive?</li>
                        <li>✓ How will each box or document group be referenced?</li>
                        <li>✓ Who may authorise retrieval and return delivery?</li>
                        <li>✓ Are there department, project, or client groupings?</li>
                        <li>✓ Which records need retention-review dates?</li>
                        <li>✓ What should happen at the end of retention?</li>
                    </ul>
                </div>
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
                    title="What Happens When Your Archives Reach Storage?"
                    description="The post-collection workflow turns transported boxes into an organised physical archive that can support later retrieval and return delivery."
                    maxWidth="3xl"
                />

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {postCollectionSteps.map((step, index) => (
                        <article
                            key={step.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6"
                        >
                            <span className="text-sm font-black text-emerald-700">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="mt-4 text-lg font-bold text-slate-950">
                                {step.title}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {step.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CommonMistakesSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Common Archive Problems
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Avoid Turning Offsite Storage into Another Disorganised Filing Room
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Moving archive boxes offsite only solves the space problem if the
                        records remain identifiable. Poor labels, inconsistent references
                        and missing ownership information make future retrieval slower and
                        more difficult.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        KXH can work around agreed physical references and manifests so
                        the archive-storage process remains connected to the way your
                        business identifies records.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {commonArchiveMistakes.map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-medium leading-6 text-slate-800"
                        >
                            <span className="mr-2 text-amber-600">!</span>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CollectionPreparationSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Preparing Archives for Collection"
                    title="Make Collection, Storage and Retrieval Easier"
                    description="You do not need a perfect archive before requesting a quote, but a few practical preparation steps can reduce handling issues and improve future retrieval."
                    maxWidth="3xl"
                />

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {collectionPreparation.map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium leading-6 text-slate-800"
                        >
                            ✓ {item}
                        </div>
                    ))}
                </div>

                <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-500">
                    Unsure how organised the archive needs to be? An estimate and a
                    description of the current condition are enough to begin the
                    quotation discussion.
                </p>
            </div>
        </section>
    );
}

function ExistingSystemsSection() {
    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Existing Archive Systems
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Keep Useful References Your Team Already Understands
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        Businesses often already have box labels, spreadsheets,
                        department codes, project numbers or retention dates. Where
                        suitable, these references can form the starting point for the
                        physical archive organisation agreed with KXH.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        KXH does not replace your records-management policy or internal
                        system. The goal is to connect your existing identifiers with the
                        physical boxes held in warehouse storage.
                    </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    {existingArchiveSystems.map((item) => (
                        <div
                            key={item}
                            className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
                        >
                            ✓ {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TypicalRetrievalSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Typical Retrieval Requests"
                    title="Retrieve the Records Your Team Needs"
                    description="Archive retrieval may involve one labelled box, several project files, a department archive or the complete stored collection. Clear references help identify the requested records."
                    maxWidth="3xl"
                />

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {typicalRetrievalRequests.map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-800"
                        >
                            ✓ {item}
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href={quoteUrl}
                        className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Discuss Your Retrieval Workflow
                    </Link>
                </div>
            </div>
        </section>
    );
}

function QuoteChecklistSection() {
    const quoteDetails = [
        "Approximate number and type of archive boxes",
        "Collection postcode and building-access details",
        "Whether the archive is already boxed and labelled",
        "Existing box lists, manifests, or department references",
        "Expected storage duration or review arrangement",
        "Likely retrieval frequency and delivery destinations",
    ];

    return (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        Prepare Your Archive Quote
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        What Information Helps Us Scope the Service?
                    </h2>
                    <p className="mt-4 leading-7 text-slate-600">
                        A clear archive-storage quote depends on more than box count.
                        Collection access, existing organisation, retention expectations,
                        handling and retrieval requirements all affect the proposed
                        workflow.
                    </p>
                    <p className="mt-4 leading-7 text-slate-600">
                        Estimates are still useful when exact figures are unavailable.
                        KXH can discuss the practical next steps before collection is
                        scheduled.
                    </p>
                    <Link
                        href={quoteUrl}
                        className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Request an Archive Storage Quote
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {quoteDetails.map((detail) => (
                        <div
                            key={detail}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-medium leading-6 text-slate-800"
                        >
                            ✓ {detail}
                        </div>
                    ))}
                </div>
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
                        Is KXH Archive Storage Right for Your Business?
                    </h2>
                    <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                        KXH is designed for organisations that want a managed physical
                        archive service with collection, organisation, offsite storage,
                        retrieval, and return delivery rather than unrestricted
                        self-storage access.
                    </p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {customerFit.map((reason) => (
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
    );
}

function LondonCoverageSection() {
    return (
        <section id="coverage" className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="London Coverage"
                    title="Archive Storage Collection Across London"
                    description="KXH supports archive collection, managed warehouse storage, physical inventory organisation, retrieval, and return delivery for businesses across Greater London. We work with offices, professional practices, schools, project sites, retail groups, charities, and other organisations holding retained records."
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
                                Managed business and archive storage with collection,
                                physical organisation, retrieval, and return delivery.
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
                    title="Related Business Storage, Relocation & Records Services"
                    description="Connect archive storage with broader warehouse capacity, physical inventory organisation, office moves, temporary storage, and secure document disposal."
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

function DeliveryImageSection() {
    return (
        <section className="bg-slate-50 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <Image
                    src="/images/business-storage/business-storage-warehouse-team-london.webp"
                    alt="KXH archive collection and document return delivery service in London"
                    width={1200}
                    height={800}
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 960px"
                    className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </section>
    );
}

function FinalCtaSection() {
    return (
        <section className="border-t border-emerald-800 bg-emerald-800 py-14 text-center text-white sm:py-20">
            <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
                <p className="text-sm font-semibold uppercase tracking-wide !text-white">
                    Plan Your Archive Storage Project
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
                    Tell Us What You Need to Store
                </h2>
                <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
                    Share an estimated box count, collection postcode, storage duration
                    and likely retrieval requirements. KXH will use that information to
                    scope a practical managed archive-storage workflow.
                </p>
                <div className="mx-auto mt-7 grid max-w-xl gap-3 text-left sm:grid-cols-2">
                    {[
                        "Approximate archive volume",
                        "Collection postcode",
                        "Expected storage duration",
                        "Retrieval requirements",
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
                    Not sure how many boxes you have? An estimate is enough to start.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href={quoteUrl}
                        className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800 sm:w-auto sm:px-8"
                    >
                        Plan Your Archive Storage Quote
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
        <section id="faqs" className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-12">
            <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    Archive Storage FAQs
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

export default function ArchiveStorageLondonPage() {
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
                <ArchiveProjectGuidanceSection />
                <ProblemsSection />
                <ProcessSection />
                <PostCollectionSection />
                <LifecycleSection />
                <PricingSection />
                <ManagedStorageSection />
                <ArchiveSuitabilitySection />
                <CollectionPreparationSection />
                <StoredItemsSection />
                <IndustriesSection />
                <UseCasesSection />
                <ComparisonSection />
                <WhyKxhSection />
                <CommonMistakesSection />
                <InventoryOrganisationSection />
                <ExistingSystemsSection />
                <RetentionRetrievalSection />
                <TypicalRetrievalSection />
                <QuoteChecklistSection />
                <CustomerFitSection />
                <LondonCoverageSection />
                <RelatedServicesSection />
                <DeliveryImageSection />
                <TestimonialsSection />
                <FinalCtaSection />
                <FaqSection />

                <MainFooter locations={londonLocations} />
            </main>
        </>
    );
}