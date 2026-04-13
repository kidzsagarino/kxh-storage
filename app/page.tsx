
import { ServicesGrid } from "./components/ServicesGrid";
import HomeClientControls from "./components/HomeClientControls";
import { HeroQuoteBar } from "./components/hero/HeroQuoteBar";
import { loadOrderFlow } from "@/server/order-flow/loadOrderFlow";
import { CheckoutProvider } from "./components/checkout/CheckoutStore";
import CrispChat from "./components/chat/CrispChat";
import Nav from "./components/MobileNav";
import FloatingTrustpilot from "./components/trustpilot/FloatingTrustpilot";
import TrustpilotCollector from "./components/trustpilot/TrustPilotCollector";

function JsonLd() {
    // Update phone/address/service area as needed
    const data = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "KXH Storage & Logistics",
        url: "https://kxhlogistics.co.uk",
        telephone: "+44 1474 396663",
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
            <FloatingTrustpilot />
            <CrispChat />
            <Nav />

            <main className="min-h-screen bg-white text-slate-900">
                <JsonLd />
                {/* Hero Section */}
               
                <section className="relative overflow-hidden bg-slate-50 py-12 lg:py-20">
                    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-500 shadow-sm backdrop-blur">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Trusted Storage & Logistics in London
                        </div>

                        <h1 className="mt-5 max-w-3xl mx-auto text-4xl font-black sm:text-5xl lg:text-[56px] lg:leading-tight">
                            Storage, moving, and shredding made simple
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-6">
                            Book secure logistics in minutes with clear pricing, flexible scheduling, and support from a real team.
                        </p>

                        <div className="mt-5 flex flex-wrap justify-center gap-3">
                            {["Instant quote", "Clear pricing", "Flexible scheduling"].map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm text-slate-600 shadow ring-1 ring-slate-200"
                                >
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="mt-8 mx-auto max-w-4xl">
                            <HeroQuoteBar />
                        </div>

                        {/* Hero Stats */}
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
                                <div className="text-2xl font-black text-slate-900">5,000+</div>
                                <div className="mt-1 text-sm text-slate-500">Londoners served</div>
                            </div>

                            <a href="https://uk.trustpilot.com/review/kxhlogistics.co.uk" target="_blank" rel="noopener noreferrer">
                                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
                                    <div className="text-2xl font-black text-slate-900">4.8★</div>
                                    <div className="mt-1 text-sm text-slate-500">Excellent on Trustpilot</div>
                                </div>
                            </a>

                            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
                                <div className="text-2xl font-black text-slate-900">Under 1 min</div>
                                <div className="mt-1 text-sm text-slate-500">To get your quote</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="bg-gradient-to-b from-white to-slate-50/70 border-t border-slate-200/70">
                    <div className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                                Services
                            </div>
                            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
                                Choose the service that fits your move
                            </h2>
                            <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-7">
                                From secure storage and same-day moving to confidential shredding, book the service you need with clear pricing and flexible scheduling.
                            </p>
                        </div>

                        <div className="mt-8 sm:mt-10">
                            <ServicesGrid />
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="relative bg-[#fbfbf9] border-t border-slate-200/70">
                    <div className="relative mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                        <h2 className="text-3xl font-black text-slate-950 sm:text-4xl lg:text-[3.15rem] lg:leading-[1.05]">
                            Get an instant quote
                        </h2>
                        <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                            Choose a service, customise your details, and see your price instantly — all in one seamless flow.
                        </p>

                        <div className="mt-10">
                            <HomeClientControls variant="pricing" />
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section id="faq" className="bg-slate-50/40 border-t border-slate-200/70">
                    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-black tracking-tight">FAQs</h2>
                        <div className="mt-6 grid gap-3">
                            {faqs.map((f) => (
                                <details key={f.q} className="rounded-2xl border border-slate-200 bg-white p-5">
                                    <summary className="cursor-pointer text-sm font-bold text-slate-900">{f.q}</summary>
                                    <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-600">{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="bg-white border-t border-slate-200/70">
                    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-black tracking-tight">Contact</h2>
                        <p className="mt-4 max-w-xl text-base md:text-lg text-slate-600 leading-relaxed">
                            Prefer messaging? Our team is ready to assist you with any questions or support you need. Reach out
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href="tel:+441474396663" className="rounded-xl px-5 py-3 text-sm font-semibold text-white bg-emerald-600 shadow-lg">
                                Call +44 1474 396663
                            </a>
                            <a href="mailto:help@kxhlogistics.co.uk" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50">
                                Email help@kxhlogistics.co.uk
                            </a>
                        </div>
                    </div>
                </section>

                <footer className="bg-white border-t border-slate-200/70">
                    <div className="mx-auto max-w-screen-xl px-4 py-8 flex flex-wrap items-center justify-between text-sm text-slate-500 sm:px-6 lg:px-8 gap-3">
                        <span>© 2026 KXH Storage & Logistics</span>
                        <div className="flex gap-4 flex-wrap">
                            <a href="/privacy" className="hover:text-slate-700">Privacy</a>
                            <a href="/terms" className="hover:text-slate-700">Terms</a>
                            <a href="/refunds" className="hover:text-slate-700">Refunds</a>
                        </div>
                    </div>
                </footer>
            </main>
        </CheckoutProvider>
    );
}
