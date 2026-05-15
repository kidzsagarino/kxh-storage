import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import Link from "next/link";
import { londonLocations } from "../lib/location";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import TestimonialsSection from "../components/TestimonialsSection";

function JsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Moving Service London",
        provider: {
            "@type": "LocalBusiness",
            name: "KXH Storage & Logistics",
            url: "https://kxhlogistics.co.uk",
        },
        areaServed: "London",
        description:
            "Professional moving services in London with fast, safe, and fully managed relocation for homes and businesses.",
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
        mainEntity: [
            {
                "@type": "Question",
                name: "How much does a moving service in London cost?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "The cost depends on distance, volume of items, and service requirements. You can use our instant calculator to get an accurate quote.",
                },
            },
            {
                "@type": "Question",
                name: "Do you provide packing services?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we offer full packing services including wrapping, boxing, and securing your items for safe transport.",
                },
            },
            // {
            //     "@type": "Question",
            //     name: "Are your movers insured?",
            //     acceptedAnswer: {
            //         "@type": "Answer",
            //         text: "Yes, our moving services include protection to keep your belongings safe during the move.",
            //     },
            // },
            {
                "@type": "Question",
                name: "Can you handle office and business relocations?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we provide professional moving services for offices and businesses, including equipment handling and relocation planning.",
                },
            },
            {
                "@type": "Question",
                name: "Do you offer same-day moving services in London?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Same-day or next-day moving may be available depending on your location and availability.",
                },
            },
            {
                "@type": "Question",
                name: "Can I book a moving service near me?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we operate across London. Enter your postcode to check availability and book a moving service near you.",
                },
            },
            {
                "@type": "Question",
                name: "Do I need to rent a van for moving?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "No, we handle transport, loading, and unloading so you don’t need to rent or drive a van.",
                },
            },
            {
                "@type": "Question",
                name: "Can you move a single item or furniture?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we offer single-item and furniture moving services as well as full home or office relocations.",
                },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": "Moving Services London",
                            "item":
                                "https://kxhlogistics.co.uk/logistics-moving-london",
                        },
                    ],
                }),
            }}
        />
    );
}

export default function MovingServicePage() {

    return (
        <>
            <CrispChat />
            <Nav />
            <nav className="max-w-6xl mx-auto px-4 pt-6 text-sm text-slate-500">
                <Link href="/">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/services">Services</Link>
                <span className="mx-2">/</span>
                <span className="text-slate-700 font-medium">
                    Moving Services London
                </span>
            </nav>
            <main className="min-h-screen bg-white text-slate-900">
                <JsonLd />
                <FAQJsonLd />
                <BreadcrumbJsonLd />
                {/* HERO */}
                <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
                    <div className="mx-auto max-w-5xl px-4 text-center">

                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Professional Moving Service in London
                        </div>

                        <h1 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight tracking-tight">
                            Fast, Safe & Fully Managed Moving Services in London
                        </h1>

                        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
                            We handle packing, loading, transport, and delivery — so you don’t have to.
                        </p>

                        <div className="mt-10">
                            <Link
                                href="/?service=moving#pricing"
                                className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
                            >
                                Get Quote
                            </Link>
                        </div>

                    </div>
                    <div className="mt-6 flex justify-center">
                        <TrustpilotPill />
                    </div>
                </section>
                <section className="py-20 max-w-5xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold">
                            Moving doesn’t need to be stressful
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-xl border border-slate-200 bg-red-50">
                            <h3 className="font-semibold text-red-600 mb-3">Traditional Moving</h3>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li>• You pack everything yourself</li>
                                <li>• You rent and drive a van</li>
                                <li>• Risk of damage or delays</li>
                                <li>• Stressful coordination</li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl border border-slate-200 bg-emerald-50">
                            <h3 className="font-semibold text-emerald-600 mb-3">Our Service</h3>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li>• We pack and protect your items</li>
                                <li>• We handle transport & logistics</li>
                                <li>• Safe, insured handling</li>
                                <li>• Fully managed end-to-end move</li>
                            </ul>
                        </div>
                    </div>
                </section>
                {/* FEATURES */}
                <section className="py-16 border-t border-slate-200/70 bg-white">
                    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">

                        <div>
                            <h2 className="text-2xl font-black mb-4">
                                Professional Moving Team
                            </h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Our trained movers handle your items with care, ensuring safe transport from start to finish.
                            </p>

                            <ul className="space-y-3 text-slate-700">
                                <li>✔ Experienced moving specialists</li>
                                <li>✔ Furniture protection & wrapping</li>
                                <li>✔ Safe loading & unloading</li>
                                <li>✔ Damage-free handling process</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black mb-4">
                                Flexible Moving Solutions
                            </h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Whether you're moving a flat, house, or office, we tailor the service to your needs.
                            </p>

                            <ul className="space-y-3 text-slate-700">
                                <li>✔ Home removals</li>
                                <li>✔ Office relocations</li>
                                <li>✔ Single item transport</li>
                                <li>✔ Short & long-distance moves</li>
                            </ul>
                        </div>

                    </div>
                </section>
                {/* HOW IT WORKS */}
                <section className="py-20 bg-slate-50 border-t border-slate-200/40">
                    <div className="max-w-5xl mx-auto px-4">

                        <div className="text-center">
                            <h2 className="text-3xl font-black">
                                How your move works
                            </h2>
                            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                                A simple 3-step moving process designed to make your relocation stress-free and fully managed.
                            </p>
                        </div>

                        <div className="mt-12 grid md:grid-cols-3 gap-6">

                            {/* STEP 1 */}
                            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                                <div className="text-2xl font-black text-emerald-600">1</div>
                                <h3 className="mt-3 font-semibold">
                                    Book your move
                                </h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Get a quick quote online and choose a date that works for your move in London.
                                </p>
                            </div>

                            {/* STEP 2 */}
                            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                                <div className="text-2xl font-black text-emerald-600">2</div>
                                <h3 className="mt-3 font-semibold">
                                    We pack & load everything
                                </h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Our trained movers arrive, carefully pack your items, and securely load them into our transport vehicles.
                                </p>
                            </div>

                            {/* STEP 3 */}
                            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                                <div className="text-2xl font-black text-emerald-600">3</div>
                                <h3 className="mt-3 font-semibold">
                                    Safe delivery to your new location
                                </h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    We transport and unload everything safely at your new home or office — stress-free and on time.
                                </p>
                            </div>

                        </div>

                    </div>
                </section>
                {/* USE CASES */}
                <section className="py-16 bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-6xl mx-auto px-4">

                        <h2 className="text-2xl font-black mb-8 text-center">
                            Who Our Moving Service Is For
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4 text-slate-700">
                            <div className="bg-white p-4 rounded-xl border shadow-sm border border-slate-200">✔ Homeowners relocating</div>
                            <div className="bg-white p-4 rounded-xl border shadow-sm border border-slate-200">✔ Office & business moves</div>
                            <div className="bg-white p-4 rounded-xl border shadow-sm border border-slate-200">✔ Students moving accommodation</div>
                            <div className="bg-white p-4 rounded-xl border shadow-sm border border-slate-200">✔ Furniture & large item transport</div>
                        </div>

                    </div>
                </section>
                <TestimonialsSection />

                {/* FINAL CTA */}
                <section className="py-20 text-center bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-3xl mx-auto px-4">

                        <h2 className="text-3xl font-black">
                            Move in London without stress
                        </h2>

                        <p className="mt-4 text-slate-600">
                            Get a fast, transparent quote and let our team handle everything.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/?service=moving#pricing"
                                className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
                            >
                                Get Quote
                            </Link>
                        </div>

                    </div>
                </section>

                {/* FAQ */}
                <section className="bg-slate-50 py-14 border-t border-slate-200/70">
                    <div className="max-w-4xl mx-auto px-4">

                        <h2 className="text-2xl font-black mb-6 text-center">Frequently Asked Questions</h2>

                        <div className="space-y-3">
                            <details className="border border-slate-200 rounded-xl p-5 bg-white">
                                <summary className="font-semibold cursor-pointer">
                                    How much does a moving service in London cost?
                                </summary>
                                <p className="mt-3 text-slate-600">
                                    The cost depends on distance, volume of items, and service requirements. Use our instant calculator for accurate pricing.
                                </p>
                            </details>

                            <details className="border border-slate-200 rounded-xl p-5 bg-white">
                                <summary className="font-semibold cursor-pointer">
                                    Do you provide packing services?
                                </summary>
                                <p className="mt-3 text-slate-600">
                                    Yes, we offer full packing services including wrapping, boxing, and securing your items.
                                </p>
                            </details>

                            {/* <details className="border rounded-xl p-5 bg-white">
                                <summary className="font-semibold cursor-pointer">
                                    Are your movers insured?
                                </summary>
                                <p className="mt-3 text-slate-600">
                                    Yes, your items are protected during the move for peace of mind.
                                </p>
                            </details> */}

                            <details className="border border-slate-200 rounded-xl p-5 bg-white">
                                <summary className="font-semibold cursor-pointer">
                                    Can you handle office and business relocations?
                                </summary>
                                <p className="mt-3 text-slate-600">
                                    Yes, we handle office and business moves including equipment and planning.
                                </p>
                            </details>

                            <details className="border border-slate-200 rounded-xl p-5 bg-white">
                                <summary className="font-semibold cursor-pointer">
                                    Do you offer same-day moving services in London?
                                </summary>
                                <p className="mt-3 text-slate-600">
                                    Same-day or next-day moves may be available depending on availability.
                                </p>
                            </details>

                            <details className="border border-slate-200 rounded-xl p-5 bg-white">
                                <summary className="font-semibold cursor-pointer">
                                    Can I book a moving service near me?
                                </summary>
                                <p className="mt-3 text-slate-600">
                                    Yes, we cover all areas in London. Enter your postcode to check availability.
                                </p>
                            </details>

                            <details className="border border-slate-200 rounded-xl p-5 bg-white">
                                <summary className="font-semibold cursor-pointer">
                                    Do I need to rent a van for moving?
                                </summary>
                                <p className="mt-3 text-slate-600">
                                    No, we handle transport, loading, and delivery for you.
                                </p>
                            </details>

                            <details className="border border-slate-200 rounded-xl p-5 bg-white">
                                <summary className="font-semibold cursor-pointer">
                                    Can you move a single item or furniture?
                                </summary>
                                <p className="mt-3 text-slate-600">
                                    Yes, we offer single-item moves as well as full home or office relocations.
                                </p>
                            </details>
                        </div>

                    </div>
                </section>
                <section className="bg-slate-50 py-14 border-t border-slate-200/70">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="font-bold text-lg mb-3">Other areas we serve</h2>
                        <div className="flex flex-wrap gap-3">
                            {londonLocations.map((l) => (
                                <Link
                                    key={l.slug}
                                    href={`/logistics-moving-london/${l.slug}`}
                                    className="text-emerald-600 hover:underline text-sm"
                                >
                                    Moving Service in {l.name}
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