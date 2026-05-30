// app/third-party-logistics-london/page.tsx

import CrispChat from "@/app/components/chat/CrispChat";
import MainFooter from "@/app/components/footer/MainFooter";
import Nav from "@/app/components/MobileNav";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import TrustpilotPill from "@/app/components/trustpilot/TrustpilotPill";
import { londonLocations } from "@/app/lib/location";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title:
        "Third Party Logistics London | 3PL Warehouse, Inventory & Delivery | KXH",

    description:
        "Third party logistics services in London including inventory management, pallet storage, warehouse handling, ecommerce stock storage, collection, and delivery support.",

    alternates: {
        canonical: "https://kxhlogistics.co.uk/third-party-logistics-london",
    },
};

function JsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Third Party Logistics London",
        serviceType: "Third Party Logistics",
        provider: {
            "@type": "LocalBusiness",
            name: "KXH Storage & Logistics",
            url: "https://kxhlogistics.co.uk",
            telephone: "+44 1474 396663",
        },
        areaServed: "London",
        description:
            "Third party logistics services including inventory storage, pallet handling, collection, warehouse support, and delivery coordination across London.",
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

const faqs = [
    {
        q: "What is third party logistics?",
        a: "Third party logistics (3PL) refers to outsourced warehouse, inventory, storage, handling, and delivery support for businesses.",
    },
    {
        q: "Do you offer inventory management support?",
        a: "Yes, KXH Logistics supports inventory storage, organised stock handling, and flexible warehouse support for businesses.",
    },
    {
        q: "Can you store palletised goods?",
        a: "Yes, pallet storage and warehouse handling support are available for commercial goods and inventory.",
    },
    {
        q: "Do you offer collection and delivery?",
        a: "Yes, we can arrange collection, warehouse storage, and return delivery across London.",
    },
];

function FAQJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
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

export default function ThirdPartyLogisticsPage() {
    return (
        <>
            <CrispChat />
            <Nav />

            <main className="min-h-screen bg-white text-slate-900">
                <JsonLd />
                <FAQJsonLd />

                <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-24">
                    <div className="max-w-5xl mx-auto px-4 text-center">

                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Third Party Logistics London
                        </div>

                        <h1 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight tracking-tight">
                            Third Party Logistics & 3PL Warehouse Services in London
                        </h1>

                        <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            KXH Logistics provides third party logistics services
                            in London including inventory management, pallet storage,
                            warehouse handling, collection, delivery coordination,
                            and flexible commercial storage support.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/?service=storage#pricing"
                                className="inline-block rounded-xl bg-emerald-700 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
                            >
                                Get Instant Quote
                            </Link>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <TrustpilotPill />
                        </div>
                        <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
                            <Image
                                src="/images/third-party-logistics/3pl-hero-warehouse.webp"
                                alt="KXH Storage and Logistics third party logistics warehouse in London"
                                width={1400}
                                height={800}
                                priority
                                className="h-auto w-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                <section className="border-y border-slate-200 bg-white">
                    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">

                        {[
                            "Third party logistics",
                            "Inventory management",
                            "Pallet storage",
                            "Warehouse handling",
                            "Collection & delivery",
                            "Commercial storage",
                            "Business logistics",
                        ].map((item) => (
                            <span
                                key={item}
                                className="rounded-full border px-4 py-2 bg-slate-50"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </section>

                <section className="py-16 max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        <div>
                            <h2 className="text-3xl font-black">
                                Flexible 3PL warehouse support in London
                            </h2>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                KXH Logistics supports businesses needing
                                outsourced warehouse operations, inventory
                                handling, pallet storage, and flexible logistics
                                support across London.
                            </p>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                Our third party logistics services help businesses
                                manage stock overflow, ecommerce inventory,
                                operational equipment, retail goods, and commercial
                                storage without managing warehouse transport or
                                handling internally.
                            </p>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                We provide collection, organised warehouse handling,
                                storage coordination, and return delivery support
                                for businesses needing flexible logistics solutions.
                            </p>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                Businesses looking for organised stock handling can
                                also explore our{" "}
                                <Link
                                    href="/inventory-management-london"
                                    className="text-emerald-700 hover:underline font-medium"
                                >
                                    inventory management services
                                </Link>
                                {" "}and{" "}
                                <Link
                                    href="/pallet-storage-london"
                                    className="text-emerald-700 hover:underline font-medium"
                                >
                                    pallet storage solutions
                                </Link>
                                {" "}for additional warehouse support.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="font-bold text-lg">
                                Suitable for:
                            </h3>

                            <ul className="mt-4 space-y-3 text-slate-700">
                                <li>✔ Ecommerce businesses</li>
                                <li>✔ Retail inventory storage</li>
                                <li>✔ Warehouse overflow support</li>
                                <li>✔ Palletised goods</li>
                                <li>✔ Office and commercial inventory</li>
                                <li>✔ Business stock management</li>
                                <li>✔ Delivery coordination</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black">
                                Warehouse, inventory and delivery support
                            </h2>

                            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                                Visual support for inventory management, pallet storage,
                                ecommerce fulfilment, business collection, and warehouse logistics.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    src: "/images/third-party-logistics/inventory-scanning.webp",
                                    alt: "KXH worker scanning inventory boxes in a London warehouse",
                                    title: "Inventory management",
                                },
                                {
                                    src: "/images/third-party-logistics/pallet-storage.webp",
                                    alt: "KXH pallet storage warehouse with organised commercial stock",
                                    title: "Pallet storage",
                                },
                                {
                                    src: "/images/third-party-logistics/business-delivery.webp",
                                    alt: "KXH delivery van unloading business inventory in London",
                                    title: "Collection and delivery",
                                },
                                {
                                    src: "/images/third-party-logistics/ecommerce-fulfillment.webp",
                                    alt: "KXH ecommerce fulfilment and warehouse packing support",
                                    title: "Ecommerce fulfilment support",
                                },
                            ].map((image) => (
                                <div
                                    key={image.src}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        width={900}
                                        height={600}
                                        className="h-72 w-full object-cover"
                                    />

                                    <div className="p-5">
                                        <h3 className="font-bold">{image.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-5xl mx-auto px-4">

                        <div className="text-center">
                            <h2 className="text-3xl font-black">
                                How our third party logistics process works
                            </h2>

                            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                                A simple warehouse logistics process from collection
                                to storage, handling, and delivery coordination.
                            </p>
                        </div>

                        <div className="mt-10 grid md:grid-cols-3 gap-6">

                            {[
                                "Book your warehouse or logistics quote online",
                                "We arrange collection, inventory handling, and warehouse coordination",
                                "Items are stored securely and delivered when needed",
                            ].map((step, index) => (
                                <div
                                    key={step}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                                >
                                    <div className="text-2xl font-black text-emerald-700">
                                        {index + 1}
                                    </div>

                                    <p className="mt-3 text-sm text-slate-600">
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-16 border-t border-slate-200/70 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <h2 className="text-3xl font-black">
                                    A professional logistics team supporting London businesses
                                </h2>

                                <p className="mt-4 text-slate-600 leading-relaxed">
                                    Our warehouse and logistics team supports storage, inventory
                                    handling, pallet coordination, collection, and delivery for
                                    businesses across London.
                                </p>
                            </div>

                            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
                                <Image
                                    src="/images/third-party-logistics/warehouse-team.webp"
                                    alt="KXH Storage and Logistics warehouse team in London"
                                    width={900}
                                    height={600}
                                    className="h-auto w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <TestimonialsSection />

                <section className="py-16 border-t border-slate-200/70 bg-white">
                    <div className="max-w-6xl mx-auto px-4">

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black">
                                Related warehouse & logistics services
                            </h2>

                            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                                Explore inventory management, pallet storage,
                                business storage, and commercial warehouse support.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                            <Link
                                href="/inventory-management-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition"
                            >
                                <h3 className="font-semibold">
                                    Inventory Management London
                                </h3>

                                <p className="mt-2 text-sm text-slate-600">
                                    Organised inventory storage with warehouse handling support.
                                </p>
                            </Link>

                            <Link
                                href="/pallet-storage-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition"
                            >
                                <h3 className="font-semibold">
                                    Pallet Storage London
                                </h3>

                                <p className="mt-2 text-sm text-slate-600">
                                    Secure pallet storage for commercial and retail stock.
                                </p>
                            </Link>

                            <Link
                                href="/business-storage-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition"
                            >
                                <h3 className="font-semibold">
                                    Business Storage London
                                </h3>

                                <p className="mt-2 text-sm text-slate-600">
                                    Flexible warehouse storage for business inventory and equipment.
                                </p>
                            </Link>

                        </div>
                    </div>
                </section>

                <section className="py-20 text-center bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-3xl mx-auto px-4">

                        <h2 className="text-3xl font-black">
                            Need third party logistics support in London?
                        </h2>

                        <p className="mt-4 text-slate-600">
                            Get a fast quote for inventory storage, pallet
                            handling, warehouse support, collection, and
                            delivery coordination.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/?service=storage#pricing"
                                className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
                            >
                                Get Instant Quote
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-14 border-t border-slate-200/70">
                    <div className="max-w-4xl mx-auto px-4">

                        <h2 className="text-2xl font-black mb-6 text-center">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-3">
                            {faqs.map((faq) => (
                                <details
                                    key={faq.q}
                                    className="border border-slate-200 rounded-xl p-5 bg-white"
                                >
                                    <summary className="font-semibold cursor-pointer">
                                        {faq.q}
                                    </summary>

                                    <p className="mt-3 text-slate-600">
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-14 border-t border-slate-200/70">
                    <div className="max-w-5xl mx-auto px-4">

                        <h2 className="font-bold text-lg mb-3">
                            Areas we support across London
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            {londonLocations.map((l) => (
                                <Link
                                    key={l.slug}
                                    href={`/warehouse-storage-london/${l.slug}`}
                                    className="text-emerald-700 hover:underline text-sm"
                                >
                                    Warehouse storage in {l.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <MainFooter locations={londonLocations} />
            </main>
        </>
    );
}