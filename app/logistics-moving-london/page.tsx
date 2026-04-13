import CrispChat from "../components/chat/CrispChat";
import Nav from "../components/MobileNav";
import Link from "next/link";

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

export default function MovingServicePage() {
   
    return (
        <>
            <CrispChat />
            <Nav />

            <main className="min-h-screen bg-white text-slate-900">
                <JsonLd />

                {/* HERO */}
                <section className="relative bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
                    <div className="mx-auto max-w-5xl px-4 text-center">

                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Premium Moving Service in London
                        </div>

                        <h1 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight tracking-tight">
                            Fast, Safe & Hassle-Free Moving Services in London
                        </h1>

                        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            A fully managed moving service for homes and businesses — we pack, load, transport, and deliver your items safely and efficiently.
                        </p>

                        {/* TRUST BADGES */}
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            {["Trained Movers", "Fully Insured", "Same-Day Moves"].map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full border bg-white px-4 py-2 text-sm text-slate-600 shadow-sm"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
                            <Link
                                href="/?service=moving#pricing"
                                className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
                            >
                                Get Moving Quote
                            </Link>
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

                {/* USE CASES */}
                <section className="py-16 bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-6xl mx-auto px-4">

                        <h2 className="text-2xl font-black mb-8 text-center">
                            Who Our Moving Service Is For
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4 text-slate-700">
                            <div className="bg-white p-4 rounded-xl border shadow-sm">✔ Homeowners relocating</div>
                            <div className="bg-white p-4 rounded-xl border shadow-sm">✔ Office & business moves</div>
                            <div className="bg-white p-4 rounded-xl border shadow-sm">✔ Students moving accommodation</div>
                            <div className="bg-white p-4 rounded-xl border shadow-sm">✔ Furniture & large item transport</div>
                        </div>

                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="py-16 text-center border-t border-slate-200/70 bg-white">
                    <div className="max-w-3xl mx-auto px-4">

                        <h2 className="text-3xl font-black">
                            Move in London Without Stress
                        </h2>

                        <p className="mt-4 text-slate-600 leading-relaxed">
                            Get a fast, transparent moving quote and let our team handle everything for you.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/?service=moving#pricing"
                                className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
                            >
                                Get Your Moving Quote
                            </Link>
                        </div>

                    </div>
                </section>

                {/* FAQ */}
                <section className="bg-slate-50 py-14 border-t border-slate-200/70">
                    <div className="max-w-4xl mx-auto px-4">

                        <h2 className="text-2xl font-black mb-6 text-center">Frequently Asked Questions</h2>

                        <div className="space-y-3">
                            <details className="border rounded-xl p-5 bg-white">
                                <summary className="font-semibold cursor-pointer">
                                    How much does a moving service in London cost?
                                </summary>
                                <p className="mt-3 text-slate-600">
                                    Pricing depends on distance, size, and requirements. Use our instant calculator for accurate pricing.
                                </p>
                            </details>

                            <details className="border rounded-xl p-5 bg-white">
                                <summary className="font-semibold cursor-pointer">
                                    Do you provide packing services?
                                </summary>
                                <p className="mt-3 text-slate-600">
                                    Yes — we can pack, wrap, and secure all items before transport.
                                </p>
                            </details>
                        </div>

                    </div>
                </section>

            </main>
        </>
    );
}