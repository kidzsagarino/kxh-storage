import CrispChat from "@/app/components/chat/CrispChat";
import MainFooter from "@/app/components/footer/MainFooter";
import Nav from "@/app/components/MobileNav";
import Link from "next/link";
import { londonLocations } from "../sitemap";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import TestimonialsSection from "../components/TestimonialsSection";

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
            desc: "Secure, flexible storage with pickup & delivery for personal and business needs.",
            href: "/warehouse-storage-london",
        },
        {
            title: "Logistics Moving London",
            desc: "Fully managed home and office moving with packing, transport, and delivery.",
            href: "/logistics-moving-london",
        },
        {
            title: "Document Shredding London",
            desc: "GDPR-compliant secure shredding with certified destruction and collection.",
            href: "/shredding-solutions-london",
        },
    ];

    return (
        <>
            <Nav />
            <CrispChat />

            <main className="min-h-screen bg-white text-slate-900">

                <JsonLd />
                <BreadcrumbJsonLd />

                {/* HERO */}
                <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200/50">
                    <div className="max-w-5xl mx-auto px-4 py-20 text-center">

                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
                            Logistics Services Built for London Businesses & Homes
                        </h1>

                        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
                            Secure storage, reliable moving, and compliant document shredding — all managed end-to-end with pickup and delivery included.
                        </p>

                        {/* CTA */}
                        <div className="mt-8 flex justify-center">
                            <Link
                                href="/#pricing"
                                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-emerald-700 transition"
                            >
                                Get Quote
                            </Link>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <TrustpilotPill />
                        </div>
                    </div>
                </section>

                {/* SERVICES GRID */}
                <section className="max-w-5xl mx-auto px-4 py-16">
                    <h2 className="text-2xl font-bold text-center">
                        Explore our core services
                    </h2>

                    <div className="mt-10 grid md:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <Link
                                key={service.href}
                                href={service.href}
                                className="group border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-sm transition bg-white"
                            >
                                <h3 className="text-lg font-bold group-hover:text-emerald-600 transition">
                                    {service.title}
                                </h3>

                                <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                                    {service.desc}
                                </p>

                                <div className="mt-4 text-sm text-emerald-600 font-medium">
                                    Learn more →
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
                <section className="border-t border-slate-200/50 bg-white py-16">
                    <div className="max-w-5xl mx-auto px-4">

                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold">
                                Trusted by customers across London
                            </h2>
                            <p className="mt-2 text-slate-600">
                                Real reviews from people who use our storage, moving, and shredding services.
                            </p>
                        </div>

                        <TestimonialsSection />

                    </div>
                </section>
                {/* WHY US */}
                <section className="bg-slate-50 border-t border-slate-200/50 py-16">
                    <div className="max-w-4xl mx-auto px-4 text-center">

                        <h2 className="text-2xl font-bold">
                            Why choose KXH Logistics?
                        </h2>

                        <p className="mt-3 text-slate-600">
                            We handle logistics end-to-end so you don’t have to coordinate multiple providers.
                        </p>

                        <div className="mt-10 grid md:grid-cols-2 gap-4 text-left">

                            {[
                                "Full pickup & delivery across London",
                                "Secure handling & monitored storage",
                                "Transparent pricing with no hidden fees",
                                "Flexible short & long-term options",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="bg-white border border-slate-200 rounded-xl p-4"
                                >
                                    ✔ {item}
                                </div>
                            ))}

                        </div>

                    </div>
                </section>

                {/* SECOND CTA */}
                <section className="py-16 text-center">
                    <h2 className="text-2xl font-bold">
                        Need a logistics service today?
                    </h2>

                    <p className="mt-3 text-slate-600">
                        Get a fast quote and we’ll handle the rest.
                    </p>

                    <div className="mt-6">
                        <Link
                            href="/#pricing"
                            className="inline-block bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
                        >
                            Get Quote
                        </Link>
                    </div>
                </section>

                {/* QUICK LINKS */}
                <section className="pb-16">
                    <div className="max-w-5xl mx-auto px-4">
                        <h3 className="font-semibold mb-3">Quick navigation</h3>

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
                </section>

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