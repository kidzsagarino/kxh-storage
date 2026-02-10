import Image from "next/image";
import { ServicesGrid } from "./components/ServicesGrid";
import HomeClientControls from "./components/HomeClientControls";
import { HeroQuoteBar } from "./components/hero/HeroQuoteBar";
import { HeroServiceImage } from "./components/hero/HeroServiceImage";

function JsonLd() {
    // Update phone/address/service area as needed
    const data = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "KXH Storage & Logistics",
        url: "https://kxhlogistics.co.uk",
        telephone: "+44 0000 000000",
        image: "https://kxhlogistics.co.uk/og.jpg",
        description:
            "Door-to-door storage with pickup & delivery. We collect, store, and return your items—simple, secure, and flexible.",
        areaServed: "United Kingdom",
        sameAs: [],
        makesOffer: [
            {
                "@type": "Offer",
                name: "Pickup & Delivery Storage",
                availability: "https://schema.org/InStock",
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

const faqs = [
    {
        q: "How does pickup & delivery storage work?",
        a: "Book a pickup, we collect your items, store them securely, then deliver them back when you need them.",
    },
    {
        q: "Is my storage secure?",
        a: "Yes—items are stored in monitored facilities with controlled access. Inventory tracking is available.",
    },
    {
        q: "How fast can you deliver my items back?",
        a: "Delivery time depends on your location and scheduling. Most returns can be arranged quickly once requested.",
    },
];

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white text-slate-900 pb-24 md:pb-0">
            <JsonLd />

            {/* Top Bar */}
            <div id="top" className="h-0 scroll-mt-24" />
            <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
                    <a href="#top" className="text-lg font-black text-emerald-700">
                        <Image src="/logo.png" alt="KXH Logo" width={150} height={50} />
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        <a className="text-sm font-semibold text-slate-700 hover:text-slate-900" href="#services">
                            Services
                        </a>
                        <a className="text-sm font-semibold text-slate-700 hover:text-slate-900" href="#pricing">
                            Pricing
                        </a>
                        <a className="text-sm font-semibold text-slate-700 hover:text-slate-900" href="#faq">
                            FAQs
                        </a>
                        <a className="text-sm font-semibold text-slate-700 hover:text-slate-900" href="#contact">
                            Contact
                        </a>
                    </nav>

                    <div className="flex items-center gap-2">
                        <a
                            href="tel:+441474396663"
                            className="hidden rounded-xl border border-slate-200 px-3 sm:px-4 py-2 text-sm font-semibold hover:bg-slate-50 md:inline-flex"
                        >
                            Call
                        </a>
                        <a
                            href="#quote"
                            className="inline-flex rounded-xl bg-slate-900 px-3 sm:px-4 py-2 text-sm font-semibold text-white shadow-sm"
                        >
                            Get Quote
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative bg-slate-50">
                <div className="mx-auto grid max-w-screen-xl items-center gap-10 px-4 sm:px-6 lg:px-8 py-10 md:grid-cols-2">

                    {/* BOTTOM: Image left, Quote bar right */}
                    <div className="relative z-10">
                        {/* Micro-hint */}
                        <p className="absolute -top-6 left-0 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Choose a service
                        </p>
                        <HeroQuoteBar />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 scale-[1.05] rounded-[32px] bg-gradient-to-tr from-emerald-100/40 to-transparent" />
                        <HeroServiceImage />
                    </div>

                </div>
            </section>
            <section id="services" className="border-t border-slate-200/70 bg-slate-50/40">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-600" />
                            Services
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                            What we offer
                        </h2>

                        <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                            Pick the service you need — storage, moving, or secure shredding — with clear pricing and flexible scheduling.
                        </p>
                    </div>

                    <div className="mt-8">
                        <ServicesGrid />
                    </div>
                </div>
            </section>
            {/* Pricing */}
            <section id="pricing" className="border-t border-slate-200/70 bg-white">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                            Get an instant quote
                        </h2>

                        <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                            Choose a service, customise your details, and see your price instantly — all in one seamless flow.
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                                {/* Trustpilot */}
                                <a
                                    href="https://uk.trustpilot.com/review/kxhlogistics.co.uk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 rounded-lg px-1 py-0.5 hover:bg-slate-50"
                                    aria-label="View our Trustpilot reviews"
                                >
                                    <span className="font-bold text-slate-900">4.8</span>

                                    <span className="font-medium text-slate-700">Excellent</span>

                                    <span className="inline-flex items-center gap-0.5" aria-label="5 star rating">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-[#00B67A] text-[10px] font-bold text-white"
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </span>

                                    <span className="font-semibold text-slate-700 group-hover:underline">
                                        Trustpilot
                                    </span>
                                </a>

                                <span className="h-1 w-1 rounded-full bg-slate-300" />

                                <span className="inline-flex items-center gap-1 font-medium">
                                    No hidden fees
                                </span>

                                <span className="h-1 w-1 rounded-full bg-slate-300" />

                                <span className="inline-flex items-center gap-1 font-medium">
                                    Cancel anytime
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 min-w-0">
                        <HomeClientControls variant="pricing" />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="border-t border-slate-200/70 bg-slate-50/40">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl font-black tracking-tight">FAQs</h2>

                    <div className="mt-6 grid gap-3">
                        {faqs.map((f) => (
                            <details key={f.q} className="rounded-2xl border border-slate-200 bg-white p-5">
                                <summary className="cursor-pointer text-sm font-bold text-slate-900">
                                    {f.q}
                                </summary>
                                <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-slate-600">
                                    {f.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="border-t border-slate-200/70 bg-white">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl font-black tracking-tight">Contact</h2>
                    <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-slate-600">
                        Prefer messaging? Add WhatsApp or a contact form here.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <a
                            href="tel:+441474396663"
                            className="rounded-xl bg-[#4CAF50] px-5 py-3 text-sm font-semibold text-white hover:bg-[#45A049]"
                        >
                            Call +44 1474 396663
                        </a>
                        <a
                            href="mailto:hello@kxhlogistics.co.uk"
                            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50"
                        >
                            Email hello@kxhlogistics.co.uk
                        </a>
                    </div>
                </div>
            </section>

            <footer className="border-t border-slate-200/70 bg-white">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-500">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <span>© 2026 KXH Storage & Logistics</span>
                        <div className="flex gap-4">
                            <a className="hover:text-slate-700" href="/privacy">Privacy</a>
                            <a className="hover:text-slate-700" href="/terms">Terms</a>
                            <a className="hover:text-slate-700" href="/refunds">Refunds</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
