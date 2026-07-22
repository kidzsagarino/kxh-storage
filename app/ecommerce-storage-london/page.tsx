import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustpilotJsonLd from "../components/seo/TrustPilotJsonLD";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import { londonLocations } from "../sitemap";

export const metadata: Metadata = {
    title: "Ecommerce Storage London | Stock & Warehouse Storage",
    description:
        "Flexible ecommerce storage in London with stock collection, secure warehouse storage, inventory organisation, pallet support, and return delivery.",
    keywords: [
        "ecommerce storage London",
        "ecommerce warehouse London",
        "ecommerce warehouse storage",
        "ecommerce stock storage",
        "stock storage London",
        "inventory storage London",
        "warehouse storage London",
        "online retailer storage",
        "pallet storage London",
        "seasonal stock storage",
    ],
    alternates: {
        canonical: "https://kxhlogistics.co.uk/ecommerce-storage-london",
    },
    openGraph: {
        type: "website",
        url: "https://kxhlogistics.co.uk/ecommerce-storage-london",
        title: "Ecommerce Storage London | KXH Storage & Logistics",
        description:
            "Managed ecommerce stock and warehouse storage with collection, flexible capacity, inventory organisation, pallet support, and return delivery across London.",
        images: [
            {
                url: "/images/ecommerce-storage/ecommerce-storage-london.webp",
                width: 1200,
                height: 630,
                alt: "Ecommerce stock stored inside a managed London warehouse",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Ecommerce Storage London | KXH Storage & Logistics",
        description:
            "Flexible ecommerce warehouse storage with stock collection, organised inventory handling, and return delivery across London.",
        images: ["/images/ecommerce-storage/ecommerce-storage-london.webp"],
    },
};

const coreBenefits = [
    "Collection from your business",
    "Pay for the storage you use",
    "Boxes, cartons, stock and pallets",
    "Return delivery available",
];

const customerProblems = [
    {
        title: "Stock Is Taking Over Your Workspace",
        description:
            "Move products, cartons, packaging, and returns out of spare rooms, offices, shops, studios, or operational areas.",
    },
    {
        title: "Seasonal Demand Changes Quickly",
        description:
            "Add ecommerce stock storage for Black Friday, Christmas, launches, promotions, and other high-volume sales periods.",
    },
    {
        title: "Your Current Warehouse Is Full",
        description:
            "Create flexible warehouse overflow capacity without interrupting your existing fulfilment, retail, or wholesale operation.",
    },
    {
        title: "A Larger Lease Is Too Much",
        description:
            "Increase inventory storage without taking on another warehouse, fixed premises costs, or a long commercial commitment.",
    },
];

const processSteps = [
    {
        number: "1",
        title: "Request a Quote",
        description:
            "Tell us what you need to store, where it should be collected, and how long you expect to keep it in storage.",
    },
    {
        number: "2",
        title: "We Collect",
        description:
            "Our team collects products, cartons, pallets, packaging, or equipment from your London business location.",
    },
    {
        number: "3",
        title: "We Store",
        description:
            "Your ecommerce inventory is professionally handled, organised, and placed into secure managed warehouse storage.",
    },
    {
        number: "4",
        title: "We Return",
        description:
            "Request selected stock, packaging, equipment, or your full stored load when your business needs it back.",
    },
];

const storageTypes = [
    {
        title: "Product & Box Storage",
        description:
            "Packaged products, smaller ecommerce inventory, subscription stock, samples, and promotional goods.",
    },
    {
        title: "Carton Storage",
        description:
            "Bulk cartons, imported stock, packaging supplies, dispatch materials, and warehouse overflow inventory.",
    },
    {
        title: "Returns & Seasonal Stock",
        description:
            "Returned products, clearance goods, campaign stock, launch inventory, and seasonal ecommerce collections.",
    },
    {
        title: "Pallet Storage",
        description:
            "Palletised commercial stock, wholesale products, imported goods, and larger ecommerce inventory volumes.",
    },
];

const inventoryTypes = [
    "Clothing and footwear",
    "Beauty and skincare products",
    "Consumer electronics",
    "Homeware and kitchen goods",
    "Toys and packaged products",
    "Packaging and dispatch supplies",
    "Promotional and marketing materials",
    "Seasonal and clearance inventory",
    "Returns and excess products",
    "Palletised commercial stock",
];

const industries = [
    {
        title: "Fashion & Apparel",
        description:
            "Clothing, footwear, accessories, seasonal collections, returns, packaging, and promotional stock.",
    },
    {
        title: "Beauty & Personal Care",
        description:
            "Packaged skincare, cosmetics, salon products, campaign stock, samples, and dispatch supplies.",
    },
    {
        title: "Homeware & Lifestyle",
        description:
            "Home accessories, kitchenware, décor, subscription products, cartons, and seasonal collections.",
    },
    {
        title: "Consumer Products",
        description:
            "Packaged electronics, toys, gifts, accessories, imported goods, and fast-moving online inventory.",
    },
    {
        title: "Subscription Brands",
        description:
            "Products, boxes, inserts, labels, and packaging held between packing and fulfilment cycles.",
    },
    {
        title: "Importers & Wholesalers",
        description:
            "Cartons, pallets, bulk stock, and imported inventory awaiting retail, fulfilment, or distribution.",
    },
];

const ecommercePlatforms = [
    {
        title: "Shopify Stores",
        description:
            "Store product inventory, packaging supplies, promotional materials, and seasonal stock while growing your Shopify business.",
    },
    {
        title: "Amazon Sellers",
        description:
            "Hold excess inventory before sending products to fulfilment centres or preparing stock for future sales periods.",
    },
    {
        title: "TikTok Shop Sellers",
        description:
            "Create flexible storage capacity for fast-moving products, promotional campaigns, and sudden increases in demand.",
    },
    {
        title: "WooCommerce Stores",
        description:
            "Store packaged goods, fulfilment supplies, returns, and overflow stock outside your office or home workspace.",
    },
    {
        title: "eBay & Etsy Sellers",
        description:
            "Keep products and packaging organised without filling your home, office, studio, or retail premises.",
    },
    {
        title: "Independent Online Brands",
        description:
            "Add managed stock storage without building a warehouse operation before your business is ready for one.",
    },
];

const ecommerceUseCases = [
    {
        title: "Seasonal Stock",
        description:
            "Increase storage capacity for Christmas, Black Friday, summer promotions, and other seasonal sales periods.",
    },
    {
        title: "Product Launches",
        description:
            "Store incoming stock, launch materials, packaging, and promotional products before a campaign begins.",
    },
    {
        title: "Warehouse Overflow",
        description:
            "Create temporary capacity when your existing warehouse, office, shop, or fulfilment space becomes full.",
    },
    {
        title: "Returns Storage",
        description:
            "Keep returned or excess products outside your working space until they are reviewed, reorganised, or redistributed.",
    },
    {
        title: "Packaging Storage",
        description:
            "Store cartons, mailers, inserts, labels, and other dispatch supplies required by your ecommerce operation.",
    },
    {
        title: "Imported Stock",
        description:
            "Store imported cartons and pallets before stock is sent to retail premises, fulfilment centres, or customers.",
    },
];

const inventoryBenefits = [
    "Physical inventory organisation",
    "Item records and categorisation",
    "Stock identification support",
    "Selected-item return requests",
    "Collection and delivery coordination",
    "Boxes, cartons and pallet support",
];

const reasonsToChooseKxh = [
    "You want ecommerce stock collected from your premises",
    "You do not want repeated trips to a self-storage unit",
    "Your inventory requirement changes during the year",
    "You store a mixture of boxes, cartons, products, or pallets",
    "You want to avoid leasing a larger ecommerce warehouse",
    "You need stored stock delivered back when required",
];

const comparisonRows = [
    {
        category: "Space commitment",
        traditional: "Fixed warehouse size, even when stock levels fall",
        managed: "Storage capacity based on the inventory you use",
    },
    {
        category: "Contract and overhead",
        traditional: "Longer lease, rates, utilities, staffing, and maintenance",
        managed: "Flexible storage term with fewer premises overheads",
    },
    {
        category: "Collection",
        traditional: "Your team arranges vehicles, loading, and transport",
        managed: "Business stock collection can be arranged across London",
    },
    {
        category: "Warehouse operations",
        traditional: "Your business manages the premises and stored goods",
        managed: "Managed warehouse environment and physical stock handling",
    },
    {
        category: "Seasonal demand",
        traditional: "Fixed costs continue through quieter trading periods",
        managed: "Increase or reduce capacity as inventory demand changes",
    },
    {
        category: "Stock retrieval",
        traditional: "Your team visits the warehouse and retrieves stock",
        managed: "Selected-item or full return delivery can be arranged",
    },
];

const relatedServices = [
    {
        title: "Business Storage",
        href: "/business-storage-london",
        description:
            "Our main business storage service for companies needing flexible warehouse space, stock storage, office storage, collection, and delivery across London.",
    },
    {
        title: "Warehouse Storage",
        href: "/warehouse-storage-london",
        description:
            "Secure managed warehouse storage for business inventory, stock overflow, equipment, and commercial goods.",
    },
    {
        title: "Inventory Management",
        href: "/inventory-management-london",
        description:
            "Physical inventory organisation, warehouse records, stock handling, and managed return delivery.",
    },
    {
        title: "Commercial Storage",
        href: "/commercial-storage-london",
        description:
            "Scalable commercial storage for offices, retailers, wholesalers, and growing businesses.",
    },
    {
        title: "Pallet Storage",
        href: "/pallet-storage-london",
        description:
            "Flexible pallet storage for bulk stock, imported goods, wholesale inventory, and ecommerce businesses.",
    },
    {
        title: "Third Party Logistics",
        href: "/third-party-logistics-london",
        description:
            "Collection, warehouse handling, inventory coordination, and business logistics support.",
    },
];

const londonAreas = [
    {
        name: "Tower Hamlets",
        href: "/warehouse-storage-london/tower-hamlets",
    },
    {
        name: "Camden",
        href: "/warehouse-storage-london/camden",
    },
    {
        name: "Hackney",
        href: "/warehouse-storage-london/hackney",
    },
    {
        name: "Lambeth",
        href: "/warehouse-storage-london/lambeth",
    },
    {
        name: "Southwark",
        href: "/warehouse-storage-london/southwark",
    },
    {
        name: "Westminster",
        href: "/warehouse-storage-london/westminster",
    },
];

const faqs = [
    {
        question: "Do you provide ecommerce storage in London?",
        answer:
            "Yes. KXH provides managed ecommerce inventory storage for online retailers, marketplace sellers, importers, wholesalers, and growing businesses across London.",
    },
    {
        question: "How is ecommerce storage priced?",
        answer:
            "Pricing is based on the storage you use, the type and quantity of items, collection requirements, storage duration, handling, and return delivery needs. This helps businesses avoid paying for unused warehouse space.",
    },
    {
        question: "Can you collect stock from my business?",
        answer:
            "Yes. We can collect products, cartons, pallets, packaging, and business equipment from offices, shops, warehouses, fulfilment centres, and home-based businesses across London.",
    },
    {
        question: "Can you store Shopify or Amazon inventory?",
        answer:
            "Yes. Our ecommerce stock storage service is suitable for inventory sold through Shopify, Amazon, WooCommerce, TikTok Shop, eBay, Etsy, and other online sales channels.",
    },
    {
        question: "Can I store seasonal or overflow stock?",
        answer:
            "Yes. Businesses can store additional inventory for Black Friday, Christmas, promotional campaigns, product launches, fulfilment overflow, and temporary warehouse capacity.",
    },
    {
        question: "Can you store pallets and bulk stock?",
        answer:
            "Yes. KXH supports boxed inventory, individual business items, cartons, pallets, and larger commercial stock requirements, subject to suitability and available capacity.",
    },
    {
        question: "Can stored inventory be returned when required?",
        answer:
            "Yes. Selected-item or full return delivery can be arranged when your business needs products, packaging, equipment, or other stored items back.",
    },
    {
        question: "Do you provide ecommerce fulfilment?",
        answer:
            "KXH primarily provides managed storage, collection, physical inventory organisation, pallet support, and delivery coordination. Speak with our team about any additional handling or logistics requirements.",
    },
    {
        question: "How do I request return delivery?",
        answer:
            "Return delivery requests are submitted through our online request form, similar to requesting a storage quote. Tell us which stored items you need returned, where they should be delivered, and your preferred delivery date. After reviewing your request, the KXH team will confirm availability, delivery arrangements, and any applicable charges before scheduling the return."
    },
    {
        question: "Is this the same as renting a self-storage unit?",
        answer:
            "No. KXH provides managed door-to-door storage. We can collect your ecommerce stock, place it into managed warehouse storage, organise physical inventory, and arrange return delivery, so your team does not need to make repeated storage-unit visits.",
    },
    {
        question: "Can my storage capacity change as my business grows?",
        answer:
            "Yes. Your ecommerce storage requirement can be reviewed as product ranges, sales volumes, seasonal demand, and pallet quantities change.",
    },
    {
        question: "Can I access only part of my stored stock?",
        answer:
            "Yes. If you only need specific products, cartons, pallets, packaging, or other stored items, contact our team and we can arrange retrieval and return delivery for the required inventory rather than your entire stored load."
    },
    {
        question: "Can ecommerce startups use KXH?",
        answer:
            "Yes. Our managed ecommerce storage service is suitable for startups, growing online retailers, established ecommerce brands, wholesalers, and importers. Flexible storage allows businesses to increase or reduce capacity as inventory requirements change."
    },
    {
        question: "Is there a minimum storage period?",
        answer:
            "Storage requirements vary depending on your inventory and business needs. Contact KXH to discuss the most suitable storage arrangement for your ecommerce operation."
    },
    {
        question: "Can you store packaging and shipping supplies as well as products?",
        answer:
            "Yes. We can store products, cartons, packaging materials, labels, inserts, dispatch supplies, pallets, promotional materials, and other business inventory, subject to suitability and available capacity."
    },
];

function ServiceJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://kxhlogistics.co.uk/ecommerce-storage-london#service",
        name: "Ecommerce Storage London",
        serviceType: "Ecommerce Inventory and Warehouse Storage",
        url: "https://kxhlogistics.co.uk/ecommerce-storage-london",
        description:
            "Managed ecommerce stock and warehouse storage in London with collection, flexible capacity, inventory organisation, pallet support, and return delivery.",
        provider: {
            "@type": "LocalBusiness",
            "@id": "https://kxhlogistics.co.uk/#business",
            name: "KXH Storage & Logistics",
            url: "https://kxhlogistics.co.uk",
            telephone: "+447470025636",
        },
        areaServed: {
            "@type": "City",
            name: "London",
        },
        offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            url: "https://kxhlogistics.co.uk/get-a-quote?service=storage",
            availability: "https://schema.org/InStock",
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
                name: "Ecommerce Storage London",
                item: "https://kxhlogistics.co.uk/ecommerce-storage-london",
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

export default function EcommerceStorageLondonPage() {
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
                        Ecommerce Storage London
                    </span>
                </nav>

                {/* HERO */}
                <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Managed Storage for Online Retailers
                        </div>

                        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                            Ecommerce Warehouse Storage London
                        </h1>

                        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                            Collection, inventory organisation and return delivery for online retailers across London.
                        </p>

                        <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                            Pay for the inventory storage capacity your business uses without
                            leasing a larger ecommerce warehouse or paying fixed overhead for
                            unused commercial space.
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
                                Get Ecommerce Storage Quote
                            </Link>

                            <a
                                href="tel:+447470025636"
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
                                src="/images/ecommerce-storage/ecommerce-storage-london.webp"
                                alt="Ecommerce inventory stored inside a managed London warehouse"
                                width={1200}
                                height={800}
                                quality={80}
                                sizes="(max-width: 768px) 100vw, 960px"
                                className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                </section>

                {/* CUSTOMER PROBLEMS */}
                <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Make Space for Growth
                            </p>

                            <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                Your Office, Shop or Home Should Not Become Your{" "}
                                <span className="text-emerald-700">Ecommerce Warehouse</span>
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600">
                                Free up valuable working space, prevent stock from disrupting
                                daily operations, and scale warehouse storage around the
                                changing needs of your online business.
                            </p>
                        </div>

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

                {/* PROCESS */}
                <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                How It Works
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                We Collect, Store, Organise and Return
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                A managed ecommerce storage service that removes the need for
                                van hire, another warehouse lease, and repeated self-storage
                                visits.
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

                {/* PRICING AND STORAGE TYPES */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Flexible Ecommerce Storage Pricing
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Pay for the Stock Storage Your Business Uses
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Your quote reflects the products, cartons, pallets, and
                                warehouse capacity you need instead of the cost of an entire
                                storage unit or fixed ecommerce warehouse that may remain partly
                                empty.
                            </p>
                            <p className="mt-4 leading-7 text-slate-600">
                                Pricing can account for item type and quantity, storage
                                duration, collection, handling, physical inventory organisation,
                                and return delivery requirements.
                            </p>
                            <p className="mt-4 text-sm leading-6 text-slate-500">
                                Collection, storage, handling, and return-delivery charges are
                                calculated according to your inventory, locations, storage term,
                                and service requirements.
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

                {/* MANAGED ECOMMERCE WAREHOUSING */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                        <Image
                            src="/images/ecommerce-storage/ecommerce-stock-organisation-london.webp"
                            alt="Organised ecommerce products and packaging stored in a London warehouse"
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
                                Managed Ecommerce Warehousing
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Grow Your Online Business Without Leasing Another Warehouse
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Unlike warehouse software or fulfilment systems, KXH provides managed physical storage for ecommerce inventory.
                                We collect products, organise them inside our secure warehouse, and return them whenever your business needs stock back.
                            </p>
                            <p className="mt-4 leading-7 text-slate-600">
                                Ecommerce businesses often outgrow spare rooms, offices, retail
                                premises, and small warehouses before they are ready to operate
                                a larger dedicated facility.
                            </p>
                            <p className="mt-4 leading-7 text-slate-600">
                                A traditional warehouse lease can add staffing, maintenance,
                                insurance, utilities, business rates, and long-term commitments.
                                KXH provides managed ecommerce warehouse storage that can expand
                                or reduce alongside your inventory.
                            </p>
                            <ul className="mt-7 space-y-3 text-sm font-medium text-slate-700 sm:text-base">
                                <li>✓ Products and retail inventory</li>
                                <li>✓ Packaging and dispatch supplies</li>
                                <li>✓ Seasonal and promotional stock</li>
                                <li>✓ Returns and excess products</li>
                                <li>✓ Cartons and palletised goods</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* WHAT CAN BE STORED */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Ecommerce Inventory Storage
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                What Can Your Ecommerce Business Store?
                            </h2>
                            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
                                KXH supports a wide range of packaged ecommerce inventory,
                                operational materials, warehouse overflow stock, and palletised
                                commercial goods.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                            {inventoryTypes.map((item) => (
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

                {/* INDUSTRIES */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Industries We Support
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Ecommerce Storage for Products, Brands and Online Retailers
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Our managed stock storage service supports businesses with
                                different product ranges, packaging needs, seasonal cycles, and
                                warehouse capacity requirements.
                            </p>
                        </div>

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

                {/* PLATFORMS */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Online Selling Channels
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Storage for Marketplace Sellers and Growing Online Brands
                            </h2>
                            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
                                Store inventory sold through leading ecommerce platforms or an
                                independent online shop while keeping products and packaging
                                away from your working space.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {ecommercePlatforms.map((platform) => (
                                <article
                                    key={platform.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-6"
                                >
                                    <h3 className="text-lg font-bold">{platform.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {platform.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* OPERATIONS AND USE CASES */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <Image
                            src="/images/ecommerce-storage/ecommerce-warehouse-storage-london.webp"
                            alt="Warehouse team organising ecommerce stock in London"
                            width={1200}
                            height={800}
                            quality={75}
                            sizes="(max-width: 768px) 100vw, 960px"
                            className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                            loading="lazy"
                            decoding="async"
                        />

                        <div className="mx-auto mt-12 max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Storage Built Around Ecommerce Operations
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Add Warehouse Capacity When Your Business Needs It
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Use managed warehouse storage for temporary overflow, recurring
                                inventory requirements, seasonal capacity, returns, packaging,
                                imported stock, and continued business growth.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {ecommerceUseCases.map((item) => (
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

                {/* COMPARISON */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Flexible Warehouse Capacity
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Managed Ecommerce Storage vs a Traditional Warehouse Lease
                            </h2>
                            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
                                Add stock storage and warehouse capacity without committing to
                                more commercial space, operational overhead, or fixed capacity
                                than your ecommerce business currently needs.
                            </p>
                        </div>

                        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
                            <div className="grid grid-cols-[0.8fr_1fr_1fr] bg-emerald-800 text-sm font-bold text-white">
                                <div className="p-5">Comparison</div>
                                <div className="border-l border-white/10 p-5">
                                    Traditional Warehouse Lease
                                </div>
                                <div className="border-l border-white/10 p-5">
                                    KXH Managed Ecommerce Storage
                                </div>
                            </div>

                            {comparisonRows.map((row) => (
                                <div
                                    key={row.category}
                                    className="grid grid-cols-[0.8fr_1fr_1fr] border-t border-slate-200 text-sm"
                                >
                                    <div className="bg-slate-100 p-5 font-semibold text-slate-900">
                                        {row.category}
                                    </div>
                                    <div className="border-l border-slate-200 bg-white p-5 leading-6 text-slate-600">
                                        {row.traditional}
                                    </div>
                                    <div className="border-l border-slate-200 bg-emerald-50 p-5 font-medium leading-6 text-slate-900">
                                        <span className="mr-2 text-emerald-700">✓</span>
                                        {row.managed}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 grid gap-4 md:hidden">
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
                                            Traditional warehouse lease
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {row.traditional}
                                        </p>
                                    </div>
                                    <div className="border-t border-emerald-100 bg-emerald-50 p-5">
                                        <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                                            KXH managed storage
                                        </p>
                                        <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
                                            ✓ {row.managed}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                {/* WHY BUSINESSES CHOOSE KXH */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Trusted Ecommerce Storage Partner
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Why London Businesses Choose KXH Storage & Logistics
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600">
                                Every ecommerce business has different storage requirements. Instead of
                                offering fixed warehouse space, KXH provides flexible managed storage
                                with collection, organised physical inventory handling, and return
                                delivery to help businesses scale without committing to larger premises.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    title: "Business Storage Specialists",
                                    description:
                                        "KXH specialises in managed business, commercial, warehouse, and ecommerce storage solutions across London."
                                },
                                {
                                    title: "Managed Door-to-Door Service",
                                    description:
                                        "Collection, organised warehouse storage, and return delivery help businesses avoid repeated trips to self-storage facilities."
                                },
                                {
                                    title: "Flexible Storage for Growing Businesses",
                                    description:
                                        "Suitable for startups, growing ecommerce brands, wholesalers, importers, and established retailers with changing inventory levels."
                                },
                                {
                                    title: "Secure Commercial Warehouse",
                                    description:
                                        "Inventory is stored within a professionally managed warehouse designed for business stock, cartons, pallets, and commercial equipment."
                                },
                                {
                                    title: "Part of a Complete Business Storage Solution",
                                    description:
                                        "Ecommerce storage integrates with our business storage, pallet storage, inventory management, commercial storage, and logistics services."
                                },
                                {
                                    title: "Serving Businesses Across London",
                                    description:
                                        "Supporting companies throughout Greater London with flexible warehouse storage, collection, and inventory management."
                                },
                            ].map((item) => (
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

                        <div className="mt-12 rounded-3xl border border-emerald-100 bg-emerald-50 p-8 text-center">
                            <h3 className="text-2xl font-bold text-slate-950">
                                Trusted by Businesses That Need Flexible Warehouse Storage
                            </h3>

                            <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-700">
                                Whether you're launching an online store, managing seasonal demand,
                                or looking for additional warehouse capacity, KXH provides managed
                                business storage with collection, organised inventory handling,
                                and return delivery across Greater London.
                            </p>
                        </div>
                    </div>
                </section>
                {/* INVENTORY DIFFERENTIATOR */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Physical Inventory Management
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Keep Stored Ecommerce Stock Organised
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Unlike ecommerce software, our inventory management service
                                focuses on real products, boxes, cartons, packaging, equipment,
                                and pallets held in physical warehouse storage.
                            </p>
                            <p className="mt-4 leading-7 text-slate-600">
                                Organised warehouse handling and physical stock records help
                                your team maintain a clearer view of stored inventory and
                                request selected items more efficiently.
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

                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
                            <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                                Inventory support that can scale
                            </h3>
                            <p className="mt-5 leading-7 text-slate-700">
                                Increase the number of products, boxes, cartons, or pallets
                                stored during seasonal peaks and review your requirement when
                                inventory levels return to normal.
                            </p>
                            <ul className="mt-6 space-y-3 text-slate-700">
                                <li>✓ Organised item records</li>
                                <li>✓ Ecommerce stock storage</li>
                                <li>✓ Seasonal inventory support</li>
                                <li>✓ Return delivery coordination</li>
                                <li>✓ Pallet and bulk storage options</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* PALLET STORAGE */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8 lg:order-2">
                            <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                                Flexible capacity for growing brands
                            </h3>
                            <p className="mt-5 leading-7 text-slate-700">
                                Move from individual boxes to cartons and pallets without
                                changing storage providers or immediately committing to a larger
                                warehouse lease.
                            </p>
                        </div>

                        <div className="lg:order-1">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Pallet & Bulk Stock Storage
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Need Storage for Pallets or Larger Stock Volumes?
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                KXH supports palletised ecommerce inventory, wholesale stock,
                                imported goods, cartons, and larger commercial warehouse storage
                                requirements.
                            </p>
                            <ul className="mt-6 space-y-3 text-slate-700">
                                <li>✓ Pallet storage for ecommerce stock</li>
                                <li>✓ Wholesale and imported products</li>
                                <li>✓ Seasonal inventory overflow</li>
                                <li>✓ Business collection and delivery</li>
                            </ul>

                            <Link
                                href="/pallet-storage-london"
                                className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                            >
                                View Pallet Storage
                            </Link>
                        </div>
                    </div>
                </section>

                {/* CUSTOMER FIT */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:rounded-3xl sm:p-10">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Is KXH Ecommerce Storage Right for Your Business?
                            </h2>
                            <p className="mt-4 max-w-2xl leading-7 text-slate-700">
                                KXH is suitable for online businesses that prefer collection,
                                managed warehouse storage, physical inventory organisation, and
                                return delivery over unrestricted access to a self-storage unit.
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

                {/* LONDON AREAS */}
                {/* LONDON COVERAGE */}
                <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                London Coverage
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Ecommerce Storage Across London
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600">
                                KXH provides ecommerce warehouse storage, inventory organisation,
                                collection, and return delivery for businesses across Greater London.
                                Whether you operate from an office, retail premises, warehouse, studio,
                                or home-based business, we can support your storage requirements.
                            </p>
                        </div>

                        {/* Featured boroughs */}
                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {londonAreas.map((area) => (
                                <Link
                                    key={area.href}
                                    href={area.href}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm"
                                >
                                    <h3 className="font-bold text-slate-900">
                                        {area.name}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        Managed ecommerce storage with collection, warehouse storage,
                                        inventory organisation, and return delivery.
                                    </p>

                                    <span className="mt-4 inline-block text-sm font-semibold text-emerald-700">
                                        Learn more →
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* All locations */}
                        <div className="mt-14 border-t border-slate-200 pt-10">

                            <h3 className="text-lg font-bold text-slate-900">
                                Browse All London Locations
                            </h3>

                            <p className="mt-3 text-slate-600">
                                We also provide business storage and warehouse services throughout
                                Greater London.
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

                {/* RELATED SERVICES */}
                <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Related Business Storage & Logistics Services
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Combine ecommerce stock storage with inventory handling, pallet
                                capacity, warehouse services, commercial storage, and logistics
                                support.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

                {/* DELIVERY IMAGE */}
                <section className="bg-slate-50 py-14 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <Image
                            src="/images/ecommerce-storage/ecommerce-inventory-collection-delivery-london.webp"
                            alt="Ecommerce inventory collection and return delivery service in London"
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

                <TestimonialsSection />

                {/* FINAL CTA */}
                <section className="border-t border-emerald-800 bg-emerald-800 py-14 text-center text-white sm:py-20">
                    <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
                        <p className="text-sm font-semibold uppercase tracking-wide !text-white">
                            Flexible Ecommerce Storage
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
                            Free Up Space Without Leasing a Larger Ecommerce Warehouse
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
                            Get a quote for ecommerce stock collection, secure warehouse
                            storage, inventory organisation, pallet capacity, and return
                            delivery across London.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link
                                href="/get-a-quote?service=storage"
                                className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 sm:w-auto sm:px-8"
                            >
                                Get Ecommerce Storage Quote
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

                {/* FAQ */}
                <section className="border-t border-slate-200 bg-slate-50 py-12">
                    <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                            Ecommerce Storage FAQs
                        </h2>

                        <div className="space-y-3">
                            {faqs.map((faq) => (
                                <details
                                    key={faq.question}
                                    className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
                                >
                                    <summary className="cursor-pointer font-semibold text-slate-900">
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