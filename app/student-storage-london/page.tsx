// app/student-storage-london/page.tsx

import ServiceShowcase from "../components/ServiceShowcase";
import ServiceHero from "../components/ServiceHero";
import { Sun as HIcSun, Building2 as HIcBuilding2, Luggage as HIcLuggage, Truck as HIcTruck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import CrispChat from "../components/chat/CrispChat";
import Nav from "../components/MobileNav";
import MainFooter from "../components/footer/MainFooter";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import TrustpilotJsonLd from "../components/seo/TrustPilotJsonLD";
import { londonLocations } from "../lib/location";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Student Storage London | Collection & Delivery | KXH",
    description:
    "Student storage in London with collection from halls, flats and shared houses. Store over summer or between terms and get it delivered back. Get a quote.",
    alternates: {
        canonical: "https://kxhlogistics.co.uk/student-storage-london",
    },
};

function JsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Student Storage London",
        serviceType: "Student Storage",
        areaServed: "London",
        provider: {
            "@type": "LocalBusiness",
            name: "KXH Storage & Logistics",
            url: "https://kxhlogistics.co.uk",
            telephone: "+44 20 3916 5312",
        },
        description:
            "Student storage in London with collection, secure warehouse storage and return delivery for university students, summer storage, accommodation moves and temporary storage between terms.",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

const faqs = [
    {
        q: "Do you collect student items for storage?",
        a: "Yes, KXH Logistics can collect student items from halls, flats, shared houses, or student accommodation across London.",
    },
    {
        q: "Is this suitable for summer student storage?",
        a: "Yes, our student storage service is ideal for summer breaks, term breaks, study abroad, and accommodation changes.",
    },
    {
        q: "Can you collect from university halls?",
        a: "Yes, collection can be arranged from student halls, private flats, shared houses, and university accommodation where access is available.",
    },
    {
        q: "Can I store just a few boxes or suitcases?",
        a: "Yes, student storage can be used for boxes, suitcases, bedding, small furniture, personal belongings, and other student items.",
    },
    {
        q: "Can you deliver my items back later?",
        a: "Yes, return delivery can be arranged when you need your items back for the new term, new tenancy, or move-in date.",
    },
    {
        q: "Can you deliver to a different address?",
        a: "Yes, return delivery can usually be arranged to a different London address, such as a new flat, shared house, or student accommodation.",
    },
    {
        q: "Do I need to rent a van?",
        a: "No, our collection and delivery service means you do not need to rent a van or visit a storage facility yourself.",
    },
    {
        q: "Can I use this between tenancies?",
        a: "Yes, this service is useful when there is a gap between moving out of one student property and moving into another.",
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export default function StudentStoragePage() {
    return (
        <>
            <CrispChat />
            <Nav />

            <main className="min-h-screen bg-white text-slate-900">
                <JsonLd />
                <FAQJsonLd />
                <TrustpilotJsonLd />

                <ServiceHero
                    image="/images/kxh-student-storage-london.webp"
                    imageAlt="Student Storage London with Collection & Delivery with KXH Storage & Logistics"
                    breadcrumb={[{"label": "Home", "href": "/"}, {"label": "Services", "href": "/services"}, {"label": "Student Storage London"}]}
                    eyebrow="Storage for students"
                    title="Student Storage London with Collection & Delivery"
                    highlight="Collection & Delivery"
                    intro="Summer, term-break and between-tenancy storage for London students. We collect from your halls, flat or shared house, store your things safely and bring them back when term starts."
                    chips={["Collection from halls and flats", "Summer and term-break storage", "Pay only for what you store", "Delivery to your new address"]}
                    ctaHref="/get-a-quote?service=storage"
                    ctaLabel="Get a Student Storage Quote"
                    cardEyebrow="Perfect for"
                    cardTitle="Every student move"
                    cardItems={[
                        { icon: <HIcSun className="h-6 w-6" aria-hidden="true" />, title: "Summer break", text: "Store until September" },
                        { icon: <HIcBuilding2 className="h-6 w-6" aria-hidden="true" />, title: "Halls moves", text: "Halls to private flats" },
                        { icon: <HIcLuggage className="h-6 w-6" aria-hidden="true" />, title: "Suitcases", text: "Bags, boxes and bikes" },
                        { icon: <HIcTruck className="h-6 w-6" aria-hidden="true" />, title: "Delivery", text: "Back to your new place" },
                    ]}
                />

                <section className="py-16 bg-white border-t border-slate-200/70">
                    <div className="max-w-screen-xl mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">
                            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                                How It Works
                            </p>
                            <h2 className="mt-2 text-3xl font-black">
                                We Collect, Store & Return Your Student Items
                            </h2>
                            <p className="mt-4 text-slate-600">
                                KXH makes student storage simple. We collect your belongings,
                                store them securely, and deliver them back when you need them.
                            </p>
                        </div>

                        <div className="mt-10 grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    step: "1",
                                    title: "We Collect",
                                    desc: "Book a collection from your student halls, flat, shared house, or accommodation.",
                                },
                                {
                                    step: "2",
                                    title: "We Store",
                                    desc: "Your items are stored securely in managed warehouse storage.",
                                },
                                {
                                    step: "3",
                                    title: "We Return",
                                    desc: "Request return delivery when your new term, tenancy, or move-in date starts.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-slate-50 p-6"
                                >
                                    <div className="text-3xl font-black text-emerald-700">
                                        {item.step}
                                    </div>
                                    <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                                    <p className="mt-3 text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-y border-slate-200 bg-white">
                    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
                        {[
                            "Summer Student Storage",
                            "Collection & Delivery",
                            "Short-Term Storage",
                            "University Accommodation Moves",
                            "No Van Hire Needed",
                        ].map((item) => (
                            <span key={item} className="rounded-full border px-4 py-2 bg-slate-50">
                                {item}
                            </span>
                        ))}
                    </div>
                </section>

                <section className="py-20 max-w-screen-xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-3xl font-black">
                                Student storage without the stress of moving everything yourself
                            </h2>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                Moving between student accommodation, heading home for summer,
                                or waiting for a new tenancy can make storage difficult. KXH
                                Logistics helps students store belongings securely without
                                needing to rent a van or visit a storage unit.
                            </p>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                Our collection and return delivery service is useful for
                                students who need temporary storage between terms, during
                                accommodation changes, or while moving between flats.
                            </p>
                        </div>

                        <div className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="font-bold text-lg">Useful for:</h3>

                            <ul className="mt-4 space-y-3 text-slate-700">
                                <li>✔ Summer student storage</li>
                                <li>✔ University accommodation moves</li>
                                <li>✔ Storage between tenancies</li>
                                <li>✔ International student storage</li>
                                <li>✔ Student flat moves</li>
                                <li>✔ Short-term storage during holidays</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-screen-xl mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="rounded-3xl border border-red-100 bg-red-50 p-8">
                                <h2 className="text-2xl font-black text-slate-900">
                                    Traditional Self Storage
                                </h2>
                                <ul className="mt-6 space-y-3 text-slate-700">
                                    <li>✘ You rent or borrow a van</li>
                                    <li>✘ You carry boxes yourself</li>
                                    <li>✘ You travel to the storage facility</li>
                                    <li>✘ You return again to collect your items</li>
                                </ul>
                            </div>

                            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8">
                                <h2 className="text-2xl font-black text-slate-900">
                                    KXH Student Storage
                                </h2>
                                <ul className="mt-6 space-y-3 text-slate-700">
                                    <li>✔ We collect from your accommodation</li>
                                    <li>✔ We store items securely</li>
                                    <li>✔ We return items when needed</li>
                                    <li>✔ No van hire or storage visit required</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-white border-t border-slate-200/70">
                    <div className="max-w-screen-xl mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            <div>
                                <Image
                                    src="/images/kxh-collection-delivery-london.webp"
                                    alt="University student leaving accommodation for summer storage in London"
                                    className="kxh-reveal h-64 w-full rounded-[1.75rem] object-cover shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5 sm:h-80 lg:h-[420px]"
                                    width={1200}
                                    height={800}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                    loading="lazy"
                                    decoding="async"
                                />

                            </div>
                            <div>
                                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                                    Summer Student Storage
                                </p>
                                <h2 className="mt-2 text-3xl font-black">
                                    Store Your Belongings During the Summer Break
                                </h2>
                                <p className="mt-4 text-slate-600 leading-relaxed">
                                    Heading home for summer or travelling between terms? KXH can
                                    collect your belongings from your accommodation, store them
                                    securely, and return them when the new academic year begins.
                                </p>
                                <p className="mt-4 text-slate-600 leading-relaxed">
                                    This is ideal for students who do not want to carry boxes,
                                    suitcases, bedding, small furniture, or personal items back
                                    and forth during university holidays.
                                </p>
                            </div>

                            <div className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <h3 className="font-bold text-lg">Perfect for:</h3>
                                <ul className="mt-4 space-y-3 text-slate-700">
                                    <li>✔ End-of-term move-outs</li>
                                    <li>✔ Summer holiday storage</li>
                                    <li>✔ Study abroad periods</li>
                                    <li>✔ Accommodation gaps</li>
                                    <li>✔ Students returning home between terms</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            <div className="lg:sticky lg:top-24">
                                <Image
                                    src="/images/delivery-warehouse.webp"
                                    alt="University students using KXH Storage & Logistics collection service in London"
                                    className="kxh-reveal h-64 w-full rounded-[1.75rem] object-cover shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5 sm:h-80 lg:h-[420px]"
                                    width={1200}
                                    height={800}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                    loading="lazy"
                                    decoding="async"
                                />

                            </div>

                            <div>
                                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                                    Universities We Support
                                </p>

                                <h2 className="mt-2 text-3xl font-black">
                                    Student Storage Near London's Universities
                                </h2>

                                <p className="mt-4 text-slate-600 leading-relaxed">
                                    KXH Storage & Logistics supports university students across London
                                    with collection, secure warehouse storage, and return delivery.
                                    Whether you're moving out of halls, relocating to a shared flat,
                                    studying abroad, or returning home for the summer, we make student
                                    storage simple and convenient.
                                </p>

                                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                                    {[
                                        "University College London (UCL)",
                                        "King's College London",
                                        "Imperial College London",
                                        "London School of Economics (LSE)",
                                        "Queen Mary University of London",
                                        "University of Westminster",
                                        "City St George's, University of London",
                                        "SOAS University of London",
                                        "London South Bank University",
                                    ].map((school) => (
                                        <div
                                            key={school}
                                            className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                                        >
                                            <h3 className="font-semibold text-slate-900">{school}</h3>
                                            <p className="mt-2 text-sm text-slate-600">
                                                Student collection, secure storage, and return delivery across London.
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-white border-t border-slate-200/70">
                    <div className="max-w-screen-xl mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl font-black">
                                Who Uses Our Student Storage?
                            </h2>
                            <p className="mt-4 text-slate-600">
                                Our student storage service is designed for students who need
                                flexible, short-term, and convenient storage across London.
                            </p>
                        </div>

                        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "University Students",
                                    desc: "Store belongings during holidays, term breaks, or accommodation changes.",
                                },
                                {
                                    title: "International Students",
                                    desc: "Avoid transporting items overseas between terms or during summer breaks.",
                                },
                                {
                                    title: "Students in Halls",
                                    desc: "Collection available from student halls and university accommodation.",
                                },
                                {
                                    title: "Shared House Renters",
                                    desc: "Useful when moving between shared houses or waiting for a new tenancy.",
                                },
                                {
                                    title: "Students Moving Flats",
                                    desc: "Store items temporarily during move-out and move-in gaps.",
                                },
                                {
                                    title: "Short-Term Storage Users",
                                    desc: "Flexible storage for students who only need space for a limited period.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
                                >
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <p className="mt-3 text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-screen-xl mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                                    Student Moving Support
                                </p>

                                <h2 className="mt-2 text-3xl font-black">
                                    Moving Between Halls, Flats or Shared Houses?
                                </h2>

                                <p className="mt-4 text-slate-600 leading-relaxed">
                                    KXH can also help with student moves across London. Whether you are
                                    moving from halls to a flat, between shared houses, or into new
                                    accommodation, our team can collect, transport, store, and return your
                                    belongings when needed.
                                </p>

                                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
                                    <h3 className="font-bold text-lg">Student move support:</h3>

                                    <ul className="mt-4 space-y-3 text-slate-700">
                                        <li>✔ Hall-to-flat moves</li>
                                        <li>✔ Flat-to-flat student moves</li>
                                        <li>✔ Shared house moves</li>
                                        <li>✔ Storage during move-in gaps</li>
                                        <li>✔ Collection and return delivery</li>
                                    </ul>

                                    <Link
                                        href="/logistics-moving-london"
                                        className="mt-6 inline-block rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800 transition"
                                    >
                                        View Moving Services
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <Image
                                    src="/images/kxh-moving-removals-london.webp"
                                    alt="Student moving service London"
                                    className="kxh-reveal h-64 w-full rounded-[1.75rem] object-cover shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5 sm:h-80 lg:h-[420px]"
                                    width={1200}
                                    height={800}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                    loading="lazy"
                                    decoding="async"
                                />

                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-white border-t border-slate-200/70">
                    <div className="max-w-screen-xl mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">
                            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                                Areas We Serve
                            </p>
                            <h2 className="text-3xl font-black">
                                Student Storage Across London
                            </h2>
                            <p className="mt-4 text-slate-600">
                                KXH supports student storage needs across London boroughs,
                                including areas where student storage searches are already
                                appearing in Search Console.
                            </p>
                        </div>

                        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { name: "Tower Hamlets", href: "/warehouse-storage-london/tower-hamlets" },
                                { name: "Camden", href: "/warehouse-storage-london/camden" },
                                { name: "Lambeth", href: "/warehouse-storage-london/lambeth" },
                                { name: "Islington", href: "/warehouse-storage-london/islington" },
                                { name: "Southwark", href: "/warehouse-storage-london/southwark" },
                                { name: "Westminster", href: "/warehouse-storage-london/westminster" },
                            ].map((area) => (
                                <Link
                                    key={area.href}
                                    href={area.href}
                                    className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition"
                                >
                                    <h3 className="font-semibold text-slate-900">
                                        Student Storage in {area.name}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-600">
                                        Collection, secure storage, and return delivery for
                                        students, renters, and accommodation moves.
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 border-t border-slate-200/70 bg-white">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black">
                                Related Student Moving & Storage Services
                            </h2>
                            <p className="mt-3 text-slate-600">
                                Explore services that support students, renters, flat moves,
                                temporary storage, and collection across London.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                {
                                    title: "Moving Services",
                                    href: "/logistics-moving-london",
                                    desc: "Student moves, flat moves, and furniture transport.",
                                },
                                {
                                    title: "Moving House Storage",
                                    href: "/moving-house-storage-london",
                                    desc: "Temporary storage during house and flat moves.",
                                },
                                {
                                    title: "Warehouse Storage",
                                    href: "/warehouse-storage-london",
                                    desc: "Secure storage with pickup and delivery.",
                                },
                                {
                                    title: "Business Storage",
                                    href: "/business-storage-london",
                                    desc: "Flexible storage for businesses and stock.",
                                },
                            ].map((item, index) => (
                                <Link
                                    key={`${item.href}-${index}`}
                                    href={item.href}
                                    className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 transition"
                                >
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <ServiceShowcase
                    eyebrow="See it in action"
                    title="Student storage without the van hire"
                    intro="Pack your boxes and suitcases, and our team collects from your halls or flat, stores everything safely and brings it back for the new term."
                    points={["Collection from halls and flats", "Summer and term-break storage", "Pay only for what you store", "Delivery to your new address"]}
                    images={[
                        { src: "/images/new-van.webp", alt: "KXH Storage & Logistics van outside a London apartment block", label: "Our own KXH vans" },
                        { src: "/images/kxh-collection-delivery-london.webp", alt: "Student Storage London with KXH Storage & Logistics", label: "Halls and flat pickups" },
                        { src: "/images/delivery-warehouse.webp", alt: "Branded KXH Storage & Logistics van ready for collection and delivery", label: "Collection & delivery" },
                    ]}
                    ctaHref="/get-a-quote?service=storage"
                    ctaLabel="Get a Student Storage Quote"
                />
                <TestimonialsSection />

                <section className="py-20 text-center bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-3xl mx-auto px-4">
                        <h2 className="text-3xl font-black">
                            Need student storage in London?
                        </h2>

                        <p className="mt-4 text-slate-600">
                            Get a fast quote for student storage with collection, secure
                            storage, and return delivery across London.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/get-a-quote?service=storage"
                                className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
                            >
                                Get Student Storage Quote
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
                            {faqs.map((f) => (
                                <details
                                    key={f.q}
                                    className="border border-slate-200 rounded-xl p-5 bg-white"
                                >
                                    <summary className="font-semibold cursor-pointer">
                                        {f.q}
                                    </summary>
                                    <p className="mt-3 text-slate-600">{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <MainFooter locations={londonLocations} />
            </main>
        </>
    );
}