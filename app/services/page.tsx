import CrispChat from "@/app/components/chat/CrispChat";
import MainFooter from "@/app/components/footer/MainFooter";
import Nav from "@/app/components/MobileNav";
import Link from "next/link";
import { londonLocations } from "../sitemap";

export const metadata = {
    title: "Our Services | Storage, Moving & Shredding London | KXH",
    description:
        "Explore KXH Logistics services including warehouse storage, moving services, and secure document shredding across London.",
    alternates: {
        canonical: "https://kxhlogistics.co.uk/services",
    },
};

function JsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    name: "KXH Logistics Services",
                    itemListElement: [
                        {
                            "@type": "Service",
                            position: 1,
                            name: "Warehouse Storage London",
                            url: "https://kxhlogistics.co.uk/warehouse-storage-london",
                        },
                        {
                            "@type": "Service",
                            position: 2,
                            name: "Logistics Moving London",
                            url: "https://kxhlogistics.co.uk/logistics-moving-london",
                        },
                        {
                            "@type": "Service",
                            position: 3,
                            name: "Document Shredding London",
                            url: "https://kxhlogistics.co.uk/shredding-solutions-london",
                        },
                    ],
                }),
            }}
        />
    );
}

function BreadcrumbJsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://kxhlogistics.co.uk",
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Services",
                            "item": "https://kxhlogistics.co.uk/services",
                        },
                    ],
                }),
            }}
        />
    );
}

export default function ServicesPage() {
    const services = [
        {
            title: "Warehouse Storage London",
            desc: "Secure, flexible storage solutions for personal and business needs.",
            href: "/warehouse-storage-london",
        },
        {
            title: "Logistics Moving London",
            desc: "Reliable home and office moving with pickup and delivery included.",
            href: "/logistics-moving-london",
        },
        {
            title: "Document Shredding London",
            desc: "Secure and certified shredding services for sensitive documents.",
            href: "/shredding-solutions-london",
        },
    ];

    return (
        <>

            <Nav />
            <main className="min-h-screen bg-white text-slate-900 px-4 py-16 max-w-4xl mx-auto">

                <CrispChat />

                <JsonLd />
                <BreadcrumbJsonLd />
                <nav className="text-sm text-slate-500 mb-6">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-slate-700 font-medium">Services</span>
                </nav>

                {/* HERO */}
                <h1 className="text-4xl font-black">
                    Our Logistics Services in London
                </h1>

                <p className="mt-4 text-slate-600">
                    KXH Logistics provides secure and reliable storage, moving, and
                    shredding services across London with full pickup and delivery
                    options.
                </p>

                {/* SERVICE CARDS */}
                <section className="mt-10 space-y-6">
                    {services.map((service) => (
                        <Link
                            key={service.href}
                            href={service.href}
                            className="block border border-slate-200 rounded-xl p-5 hover:border-emerald-500 transition"
                        >
                            <h2 className="text-xl font-bold">{service.title}</h2>
                            <p className="text-slate-600 mt-2">{service.desc}</p>
                            <p className="text-emerald-600 mt-3 text-sm">
                                Learn more →
                            </p>
                        </Link>
                    ))}
                </section>

                {/* CONTENT SECTION */}
                <section className="mt-12 space-y-4 text-slate-700">
                    <h2 className="text-2xl font-bold">Why choose KXH Logistics?</h2>

                    <ul className="list-disc pl-5 space-y-2">
                        <li>Full pickup and delivery across London</li>
                        <li>Secure facilities and professional handling</li>
                        <li>Transparent pricing with no hidden fees</li>
                        <li>Flexible short-term and long-term options</li>
                    </ul>

                    <p>
                        Whether you need moving services, storage solutions, or secure
                        shredding, we provide end-to-end logistics support designed for
                        convenience and reliability.
                    </p>
                </section>

                <div className="mt-10">
                    <h2 className="font-bold text-lg mb-3">Explore services</h2>

                    <div className="flex flex-wrap gap-3">
                        {services.map((s) => (
                            <Link
                                key={s.href}
                                href={s.href}
                                className="text-emerald-600 hover:underline text-sm"
                            >
                                {s.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <MainFooter
                services={[
                    { label: "Storage London", href: "/warehouse-storage-london" },
                    { label: "Moving London", href: "/logistics-moving-london" },
                    { label: "Shredding London", href: "/shredding-solutions-london" },
                ]}
                locations={londonLocations}
            />
        </>
    );
}