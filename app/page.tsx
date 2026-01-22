import Image from "next/image";
import { ServicesGrid } from "./components/ServicesGrid";
import { StorageForm } from "./components/StorageServiceFlow";
import { OrderSummary } from "./components/OrderSummary";
import { OrderSummaryLive } from "./order-summary/OrderSummaryLive";


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
        <main className="min-h-screen bg-white text-slate-900">
            <JsonLd />

            {/* Top Bar */}
            <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    <a href="#top" className="text-lg font-black text-emerald-700">
                        <Image src="/logo.png" alt="KXH Logo" width={100} height={200} />
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        <a className="text-sm font-semibold text-slate-700 hover:text-slate-900" href="#services">
                            Services
                        </a>
                        <a className="text-sm font-semibold text-slate-700 hover:text-slate-900" href="#pricing">
                            Pricing
                        </a>
                        <a className="text-sm font-semibold text-slate-700 hover:text-slate-900" href="#faq">
                            FAQ
                        </a>
                        <a className="text-sm font-semibold text-slate-700 hover:text-slate-900" href="#contact">
                            Contact
                        </a>
                    </nav>

                    <div className="flex items-center gap-2">
                        <a
                            href="tel:+441474396663"
                            className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 md:inline-flex"
                        >
                            Call
                        </a>
                        <a
                            href="#quote"
                            className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm"
                        >
                            Get Quote
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section id="top" className="relative overflow-hidden">
                <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:py-10">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-600" />
                            Door-to-door convenience
                        </div>

                        <h1 className="mt-4 text-4xl font-normal tracking-tight text-slate-900">
                            Our Fleet Is Ready to Move You Forward
                        </h1>

                        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                            From local removals to nation-wide relocations, KXH Storage and Removal delivers safe, efficient, and reliable solutions tailored to your needs.
                        </p>

                        {/* CTA Bar (inspired by reference image) */}
                        <div
                            id="quote"
                            className="mt-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                        >
                            <form
                                action="/api/quote"
                                method="post"
                                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                            >
                                {/* Top label */}
                                <p className="mb-3 text-sm font-semibold text-slate-700">
                                    Need help with...
                                </p>

                                {/* Row 1: select + postcode */}
                                <div className="grid gap-3 md:grid-cols-2">
                                    {/* Select with dropdown caret */}
                                    <div className="relative">
                                        <label className="sr-only" htmlFor="need">What do you need help with?</label>
                                        <select
                                            id="need"
                                            name="need"
                                            defaultValue="storage"
                                            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-11 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-200"
                                        >
                                            <option value="storage">Storage</option>
                                            <option value="pickup">Packing and Moving</option>
                                            <option value="delivery">Shredding</option>
                                            <option value="business">Small Moves</option>
                                        </select>

                                        {/* caret */}
                                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                                            ▾
                                        </div>

                                        {/* subtle divider like the image */}
                                        <div className="pointer-events-none absolute right-10 top-1/2 h-6 w-px -translate-y-1/2 bg-slate-200" />
                                    </div>

                                    {/* Postcode input with icon button */}
                                    <div className="relative">
                                        <label className="sr-only" htmlFor="postcode">Enter Postcode</label>
                                        <input
                                            id="postcode"
                                            name="postcode"
                                            placeholder="Enter Postcode"
                                            autoComplete="postal-code"
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-3 pr-12 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-200"
                                        />

                                        {/* small icon button at right (like the image) */}
                                        <button
                                            type="button"
                                            aria-label="Use location"
                                            className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                        >
                                            ⦿
                                        </button>
                                    </div>
                                </div>

                                {/* Row 2: buttons */}
                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    <button
                                        type="submit"
                                        className="h-11 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white"
                                    >
                                        Get Quote
                                    </button>

                                    <a
                                        href="tel:+441474396663"
                                        className="h-11 rounded-xl bg-[#4CAF50] px-4 text-sm font-semibold text-white inline-flex items-center justify-center gap-2"
                                    >
                                        {/* <span aria-hidden>📞</span> */}
                                        Call Us
                                    </a>
                                </div>

                                {/* Trust row */}
                                <a href="https://uk.trustpilot.com/review/kxhlogistics.co.uk" target="_blank" rel="noopener noreferrer">
                                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600">
                                        <span className="font-bold text-slate-900">4.8</span>
                                        <span>Excellent</span>
                                        <span className="inline-flex items-center gap-0.5" aria-label="5 star rating">
                                            <span className="inline-block rounded bg-[#4CAF50] px-1 text-xs text-white">★</span>
                                            <span className="inline-block rounded bg-[#4CAF50] px-1 text-xs text-white">★</span>
                                            <span className="inline-block rounded bg-[#4CAF50] px-1 text-xs text-white">★</span>
                                            <span className="inline-block rounded bg-[#4CAF50] px-1 text-xs text-white">★</span>
                                            <span className="inline-block rounded bg-[#4CAF50] px-1 text-xs text-white">★</span>
                                        </span>
                                        <span className="font-semibold text-slate-700">Trustpilot</span>
                                    </div>
                                </a>
                            </form>
                        </div>

                        {/* Trust row */}
                        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                            <span className="inline-flex items-center gap-2">
                                <span className="font-black text-slate-900">4.8</span> Excellent
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                            <span>Pickup slots available weekly</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                            <span>Inventory tracking</span>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative">
                        <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-b from-emerald-50 to-transparent" />
                        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                            {/* Replace /hero.jpg with your own unique hero image */}
                            <Image
                                src="/hero.png"
                                alt="Two KXH staff handling boxes beside a delivery van"
                                width={1200}
                                height={900}
                                priority
                                className="h-auto w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            {/* <section id="services" className="border-t border-slate-200/70 bg-slate-50/40">
                <div className="mx-auto max-w-6xl px-4 py-12">
                    <h2 className="text-2xl font-black tracking-tight">What we offer</h2>
                    <p className="mt-2 max-w-2xl text-slate-600">
                        We Offer The Best For You.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-4">
                        {[
                            { t: "Packaging and Moving", d: "Careful packing, safe transport, and smooth relocation for homes and businesses." },
                            { t: "Removals", d: "Local and nationwide removal services designed for speed and security." },
                            { t: "Storage Solutions", d: "Flexible, secure, and accessible storage facilities tailored to your needs." },
                            { t: "Shredding Solutions", d: "Eco-friendly clearance and secure document disposal services." },
                        ].map((c) => (
                            <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="text-sm font-bold text-emerald-700">{c.t}</div>
                                <div className="mt-2 text-slate-700">{c.d}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
            <section id="services" className="border-t border-slate-200/70 bg-slate-50/40">
                <div className="mx-auto max-w-6xl px-4 py-12">
                    <h2 className="text-2xl font-black tracking-tight">What we offer</h2>
                    <p className="mt-2 max-w-2xl text-slate-600">
                        We Offer The Best For You.
                    </p>
                    <ServicesGrid />
                </div>
            </section>
            {/* Pricing */}
            <section id="pricing" className="border-t border-slate-200/70 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-12">
                    <h2 className="text-2xl font-black tracking-tight">Storage Service Quote</h2>
                    <div className="mt-6 grid gap-2 md:grid-cols-[auto_300px]">
                        <div><StorageForm /></div>
                        <div><OrderSummaryLive /></div>
                    </div>
                    
                    {/* <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {[
                            { t: "Small", p: "£XX / mo", d: "A few boxes, luggage, seasonal items." },
                            { t: "Medium", p: "£XX / mo", d: "Studio / 1-bed contents, student storage." },
                            { t: "Business", p: "Custom", d: "Inventory, pallets, regular pickup cycles." },
                        ].map((plan) => (
                            <div key={plan.t} className="rounded-2xl border border-slate-200 bg-slate-50/40 p-6">
                                <div className="flex items-baseline justify-between">
                                    <div className="text-lg font-black">{plan.t}</div>
                                    <div className="text-sm font-extrabold text-emerald-700">{plan.p}</div>
                                </div>
                                <p className="mt-2 text-slate-600">{plan.d}</p>
                                <a
                                    href="#quote"
                                    className="mt-4 inline-flex w-full justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                                >
                                    Get Quote
                                </a>
                            </div>
                        ))}
                    </div> */}
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="border-t border-slate-200/70 bg-slate-50/40">
                <div className="mx-auto max-w-6xl px-4 py-12">
                    <h2 className="text-2xl font-black tracking-tight">FAQ</h2>

                    <div className="mt-6 grid gap-3">
                        {faqs.map((f) => (
                            <details key={f.q} className="rounded-2xl border border-slate-200 bg-white p-5">
                                <summary className="cursor-pointer text-sm font-bold text-slate-900">
                                    {f.q}
                                </summary>
                                <p className="mt-2 text-sm text-slate-600">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="border-t border-slate-200/70 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-12">
                    <h2 className="text-2xl font-black tracking-tight">Contact</h2>
                    <p className="mt-2 text-slate-600">
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
                <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
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
