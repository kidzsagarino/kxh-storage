import Image from "next/image";
import { ServicesGrid } from "./components/ServicesGrid";
import HomeClientControls from "./components/HomeClientControls";
import { HeroQuoteBar } from "./components/hero/HeroQuoteBar";
import { loadOrderFlow } from "@/server/order-flow/loadOrderFlow";
import { CheckoutProvider } from "./components/checkout/CheckoutStore";
import CrispChat from "./components/chat/CrispChat";

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

export const dynamic = "force-dynamic";

export default async function HomePage() {

    const initialData = await loadOrderFlow("GBP");

    return (
        <CheckoutProvider initialOrderFlow={initialData}>
            <main className="min-h-screen bg-white text-slate-900 pb-24 md:pb-0">
                <JsonLd />
                <div id="top" className="h-0 scroll-mt-24" />
                <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
                    <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
                        <a href="#top" className="text-lg font-black text-emerald-700">
                            <Image src="/logo.png" alt="KXH Logo" width={125} height={30} />
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

                <section className="relative overflow-hidden bg-slate-50 py-8 lg:py-12">
                    {/* Soft background */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute left-1/2 top-0 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-emerald-100/50 blur-3xl" />
                        <div className="absolute -left-20 bottom-0 h-[240px] w-[240px] rounded-full bg-slate-200/60 blur-3xl" />
                        <div className="absolute -right-16 top-16 h-[220px] w-[220px] rounded-full bg-emerald-50 blur-3xl" />
                    </div>

                    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 shadow-sm backdrop-blur">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Trusted Storage & Logistics in London
                            </div>

                            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-[56px] lg:leading-[1.02]">
                                Storage, moving, and shredding made simple
                            </h1>

                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                                Book secure logistics in minutes with clear pricing, flexible scheduling,
                                and support from a real team.
                            </p>

                            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                                {["Instant quote", "Clear pricing", "Flexible scheduling"].map((item) => (
                                    <span
                                        key={item}
                                        className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200"
                                    >
                                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mx-auto mt-8 max-w-4xl">
                            <HeroQuoteBar />
                        </div>

                        <div className="mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
                                <div className="text-2xl font-black tracking-tight text-slate-900">5,000+</div>
                                <div className="mt-1 text-sm text-slate-500">Londoners served</div>
                            </div>

                            <a href="https://uk.trustpilot.com/review/kxhlogistics.co.uk" target="_blank" rel="noopener noreferrer">
                                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
                                    <div className="text-2xl font-black tracking-tight text-slate-900">4.8★</div>
                                    <div className="mt-1 text-sm text-slate-500">Excellent on Trustpilot</div>
                                </div>
                            </a>

                            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
                                <div className="text-2xl font-black tracking-tight text-slate-900">Under 1 min</div>
                                <div className="mt-1 text-sm text-slate-500">To get your quote</div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="services"
                    className="border-t border-slate-200/70 bg-gradient-to-b from-white to-slate-50/70"
                >
                    <div className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                                Services
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                                Choose the service that fits your move
                            </h2>

                            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                                From secure storage and same-day moving to confidential shredding, book the
                                service you need with clear pricing and flexible scheduling.
                            </p>
                        </div>

                        <div className="mt-8 sm:mt-10">
                            <ServicesGrid />
                        </div>
                    </div>
                </section>
                <section
                    id="pricing"
                    className="relative overflow-hidden border-t border-slate-200/70 bg-[#fbfbf9]"
                >
                    {/* soft bottom green background */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.16),_rgba(34,197,94,0.06)_45%,_transparent_75%)]" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-emerald-950/5" />

                    <div className="relative mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                        <div className="max-w-3xl">
                            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-[3.15rem] lg:leading-[1.05]">
                                Get an instant quote
                            </h2>

                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                                Choose a service, customise your details, and see your price instantly —
                                all in one seamless flow.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                <a
                                    href="https://uk.trustpilot.com/review/kxhlogistics.co.uk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2"
                                    aria-label="View our Trustpilot reviews"
                                >
                                    <span className="font-bold text-slate-900">4.8</span>
                                    <span className="font-semibold text-slate-700">Excellent</span>

                                    <span className="inline-flex items-center gap-0.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#00B67A] text-[10px] font-bold text-white"
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
                                <span className="font-medium">No hidden fees</span>

                                <span className="h-1 w-1 rounded-full bg-slate-300" />
                                <span className="font-medium">Cancel anytime</span>
                            </div>
                        </div>

                        <div className="mt-10">
                            <HomeClientControls variant="pricing" />
                        </div>
                    </div>
                </section>
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
                <section id="contact" className="border-t border-slate-200/70 bg-white">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
                        <h2 className="text-2xl font-black tracking-tight">Contact</h2>
                        <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-slate-600">
                            Prefer messaging? Our team is ready to assist you with any questions or support you need. Reach out
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="tel:+441474396663"
                                className="rounded-xl px-5 py-3 text-sm font-semibold text-white bg-[linear-gradient(135deg,#2e7d57_0%,#3f8f66_100%)] text-white shadow-[0_10px_30px_rgba(34,197,94,0.18)]"
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
                <CrispChat />
            </main>
        </CheckoutProvider>
    );
}
