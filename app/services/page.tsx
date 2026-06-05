import CrispChat from "@/app/components/chat/CrispChat";
import MainFooter from "@/app/components/footer/MainFooter";
import Nav from "@/app/components/MobileNav";
import Link from "next/link";
import { londonLocations } from "../sitemap";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import TestimonialsSection from "../components/TestimonialsSection";
import Image from "next/image";

export const metadata = {
    title: "Storage, Inventory, Pallet & Moving Services London | KXH",
    description:
        "Explore KXH Logistics services including warehouse storage, inventory management, pallet storage, business storage, moving services, and secure document shredding across London.",
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
                            name: "Business Storage London",
                            url: "https://kxhlogistics.co.uk/business-storage-london",
                        },
                        {
                            "@type": "Service",
                            position: 3,
                            name: "Inventory Management London",
                            url: "https://kxhlogistics.co.uk/inventory-management-london",
                        },
                        {
                            "@type": "Service",
                            position: 4,
                            name: "Pallet Storage London",
                            url: "https://kxhlogistics.co.uk/pallet-storage-london",
                        },
                        {
                            "@type": "Service",
                            position: 5,
                            name: "Commercial Storage London",
                            url: "https://kxhlogistics.co.uk/commercial-storage-london",
                        },
                        {
                            "@type": "Service",
                            position: 6,
                            name: "Logistics Moving London",
                            url: "https://kxhlogistics.co.uk/logistics-moving-london",
                        },
                        {
                            "@type": "Service",
                            position: 7,
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

const faqs = [
    {
        q: "What logistics services does KXH offer in London?",
        a: "KXH provides warehouse storage, business storage, inventory management, pallet storage, commercial storage, moving services, document shredding, and collection and delivery support across London.",
    },
    {
        q: "Do you provide pickup and delivery?",
        a: "Yes. KXH can collect items, transport them securely, store them, and return or deliver them when needed.",
    },
    {
        q: "Can businesses store inventory with KXH?",
        a: "Yes. KXH supports ecommerce stock, retail inventory, office equipment, archive boxes, pallets, and commercial overflow storage.",
    },
    {
        q: "Do you offer short-term and long-term storage?",
        a: "Yes. KXH offers flexible storage options for both short-term and long-term requirements.",
    },
    {
        q: "Do you cover different London boroughs?",
        a: "Yes. KXH serves businesses and homes across London, including Camden, Westminster, Hackney, Islington, Southwark, Lambeth, Tower Hamlets, and Kensington & Chelsea.",
    },
    {
        q: "Do you offer student storage in London?",
        a: "Yes. Students can store boxes, luggage, books, bicycles, and personal belongings during holidays, accommodation changes, internships, or study abroad periods."
    },
    {
        q: "Can renters use KXH for temporary storage?",
        a: "Yes. Many renters use KXH while moving house, renovating, downsizing, or waiting for a tenancy to begin."
    }
];

function FaqJsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
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
        {
            title: "Business Storage London",
            desc: "Flexible storage for business stock, office equipment, inventory, and archives.",
            href: "/business-storage-london",
        },
        {
            title: "Inventory Management London",
            desc: "Managed inventory storage with item tracking, warehouse handling, collection, and delivery.",
            href: "/inventory-management-london",
        },
        {
            title: "Pallet Storage London",
            desc: "Secure pallet storage for retail, wholesale, ecommerce, and commercial stock.",
            href: "/pallet-storage-london",
        },
        {
            title: "Commercial Storage London",
            desc: "Commercial warehouse support for offices, equipment, stock overflow, and business storage.",
            href: "/commercial-storage-london",
        },
        {
            title: "Third Party Logistics London",
            desc: "3PL warehouse support including inventory handling, pallet storage, collection, and delivery coordination.",
            href: "/third-party-logistics-london",
        },
    ];

    return (
        <>
            <Nav />
            <CrispChat />

            <main className="min-h-screen bg-white text-slate-900">

                <JsonLd />
                <BreadcrumbJsonLd />
                <FaqJsonLd />

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
                                className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-emerald-700 transition"
                            >
                                Get Quote
                            </Link>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <TrustpilotPill />
                        </div>
                        <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
                            <Image
                                src="/images/services/services-hero.webp"
                                alt="Warehouse storage, inventory management and logistics services in London"
                                width={1400}
                                height={800}
                                priority
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </section>
                <section className="max-w-5xl mx-auto px-4 py-16">
                    <div className="prose prose-slate max-w-none">
                        <div className="mb-10 overflow-hidden rounded-3xl border border-slate-200">
                            <Image
                                src="/images/services/services-overview.webp"
                                alt="Warehouse storage and logistics services"
                                width={1400}
                                height={700}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <h2>Storage, Moving & Logistics Services Across London</h2>

                        <p>
                            KXH Storage & Logistics provides flexible storage, moving, inventory,
                            pallet, commercial, and document handling services for homes and
                            businesses across London. Whether you need short-term storage during a
                            move, long-term warehouse space for business stock, or a reliable team to
                            collect, store, and return your items, KXH helps manage the full process
                            from collection to delivery.
                        </p>

                        <p>
                            Our warehouse storage services are designed for customers who need secure
                            space without the stress of transporting everything themselves. We can
                            collect boxes, suitcases, containers, office items, business stock, and
                            other goods, then keep them organised until you need them returned.
                        </p>

                        <p>
                            For businesses, KXH offers inventory management, pallet storage, and
                            commercial storage support. This is useful for ecommerce sellers, retail
                            brands, offices, contractors, and companies that need extra space for
                            stock, equipment, archive boxes, or seasonal overflow.
                        </p>

                        <p>
                            KXH also provides logistics moving services for homes and offices,
                            including packing support, transport, and delivery. For companies handling
                            confidential records, our document shredding service helps manage secure
                            collection and compliant destruction.
                        </p>
                    </div>
                </section>
                <section className="bg-slate-50 border-t border-slate-200 py-16">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="mb-10 overflow-hidden rounded-3xl border border-slate-200">
                            <Image
                                src="/images/services/services-student-storage.webp"
                                alt="Student and renter storage services in London"
                                width={1400}
                                height={700}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-center">
                            Flexible Storage for Students, Renters & London Residents
                        </h2>

                        <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">

                            <p>
                                Whether you're moving between university accommodation, relocating to a
                                new rental property, travelling abroad, or simply running out of space,
                                KXH provides affordable storage solutions with collection and delivery
                                across London.
                            </p>

                            <p>
                                Students can store suitcases, boxes, books, bicycles, and personal
                                belongings during summer breaks, internships, study abroad programmes,
                                or accommodation changes without needing to transport everything
                                themselves.
                            </p>

                            <p>
                                Renters and apartment residents often use our storage services during
                                house moves, renovations, downsizing, or while waiting for tenancy
                                agreements to begin. Our flexible storage options help free up valuable
                                living space while keeping belongings secure and accessible.
                            </p>

                            <p>
                                With pickup, secure warehouse storage, and return delivery available,
                                KXH makes temporary storage simple for students, renters, professionals,
                                and families throughout London.
                            </p>

                        </div>
                    </div>
                </section>
                {/* SERVICES GRID */}
                <section className="max-w-5xl mx-auto px-4 py-16">
                    <div className="mb-10 overflow-hidden rounded-3xl border border-slate-200">
                        <Image
                            src="/images/services/services-business-logistics.webp"
                            alt="Business storage, pallet storage and logistics support"
                            width={1400}
                            height={700}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-center">
                        Explore our core services
                    </h2>

                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <Link
                                key={service.href}
                                href={service.href}
                                className="group border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-sm transition bg-white"
                            >
                                <h3 className="text-lg font-bold group-hover:text-emerald-700 transition">
                                    {service.title}
                                </h3>

                                <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                                    {service.desc}
                                </p>

                                <div className="mt-4 text-sm text-emerald-700 font-medium">
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
                        <div className="mb-10 overflow-hidden rounded-3xl border border-slate-200">
                            <Image
                                src="/images/services/services-team.webp"
                                alt="KXH Storage and Logistics team"
                                width={1400}
                                height={700}
                                className="w-full h-auto object-cover"
                            />
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
                <section className="bg-white border-t border-slate-200/50 py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-2xl font-bold text-center">
                            Frequently Asked Questions
                        </h2>

                        <div className="mt-8 space-y-4">
                            {faqs.map((faq) => (
                                <div
                                    key={faq.q}
                                    className="border border-slate-200 rounded-xl p-5 bg-slate-50"
                                >
                                    <h3 className="font-semibold text-slate-900">{faq.q}</h3>
                                    <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                                        {faq.a}
                                    </p>
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
                                    className="text-emerald-700 hover:underline text-sm"
                                >
                                    {s.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            <MainFooter locations={londonLocations} />
        </>
    );
}