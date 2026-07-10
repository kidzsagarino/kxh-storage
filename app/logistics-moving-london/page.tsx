import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import Link from "next/link";
import { londonLocations } from "../lib/location";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import TestimonialsSection from "../components/TestimonialsSection";
import Image from "next/image";
import TrustpilotJsonLd from "../components/seo/TrustPilotJsonLD";

export const metadata = {
    title: "Moving Services London | House, Office & Commercial Removals",
    description:
        "Professional moving services in London including house removals, apartment moves, office relocations, commercial removals, student moves, furniture transport, packing, and temporary storage support.",
    alternates: {
        canonical: "https://kxhlogistics.co.uk/logistics-moving-london",
    },
};

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
            "Professional moving services in London including house removals, apartment moves, office relocations, commercial moving, student accommodation moves, furniture transport, packing, and temporary storage support."
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
            {
                "@type": "Question",
                name: "Do you support student and renter moves in London?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, KXH Logistics supports student accommodation moves, renter relocations, apartment moves, and temporary storage needs across London.",
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
                <TrustpilotJsonLd />
                {/* HERO */}
                <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
                    <div className="mx-auto max-w-5xl px-4 text-center">

                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Professional Moving Service in London
                        </div>

                        <h1 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight tracking-tight">
                            Moving Services London for House, Office & Commercial Removals
                        </h1>

                        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
                            KXH Storage & Logistics is a professional removal company in London
                            providing house moves, apartment relocations, office removals,
                            commercial moving, student accommodation moves, packing,
                            transport, and delivery across London.
                        </p>
                        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
                            {[
                                "House & Apartment Moves",
                                "Office & Commercial Removals",
                                "Student Moves & Storage",
                                "Packing, Transport & Delivery",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 text-center"
                                >
                                    ✓ {item}
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <Link
                                href="/get-a-quote?service=moving"
                                className="rounded-xl bg-emerald-700 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
                            >
                                Get Instant Moving Quote
                            </Link>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <TrustpilotPill />
                        </div>
                        <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
                            <Image
                                src="/images/moving-services/moving-services-hero.webp"
                                alt="Professional moving services in London"
                                width={1400}
                                height={800}
                                priority
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </section>
                <section className="py-20 max-w-5xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold">
                            Moving doesn’t need to be stressful
                        </h2>
                    </div>
                    <div className="mt-8 mb-10 overflow-hidden rounded-3xl border border-slate-200">
                        <Image
                            src="/images/moving-services/moving-services-packing-loading.webp"
                            alt="Professional packing and loading service"
                            width={1400}
                            height={700}
                            className="w-full h-auto object-cover"
                        />
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
                            <h3 className="font-semibold text-emerald-700 mb-3">Our Service</h3>
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
                    <div className="max-w-6xl mx-auto px-4 mb-12">
                        <Image
                            src="/images/moving-services/moving-services-team-working.webp"
                            alt="Professional moving team handling furniture"
                            width={1400}
                            height={700}
                            className="w-full rounded-3xl border border-slate-200 object-cover"
                        />
                    </div>
                    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">

                        <div>
                            <h2 className="text-2xl font-black mb-4">
                                Professional Moving Team
                            </h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                As a trusted removal company in London, our trained movers carefully
                                pack, protect, transport, and deliver your belongings safely from
                                collection through to your new destination.
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
                                Whether you're moving a flat, student accommodation, rented apartment, house, or office, we tailor the service to your needs.
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
                                <div className="text-2xl font-black text-emerald-700">1</div>
                                <h3 className="mt-3 font-semibold">
                                    Book your move
                                </h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Get a quick quote online and choose a date that works for your move in London.
                                </p>
                            </div>

                            {/* STEP 2 */}
                            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                                <div className="text-2xl font-black text-emerald-700">2</div>
                                <h3 className="mt-3 font-semibold">
                                    We pack & load everything
                                </h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Our trained movers arrive, carefully pack your items, and securely load them into our transport vehicles.
                                </p>
                            </div>

                            {/* STEP 3 */}
                            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                                <div className="text-2xl font-black text-emerald-700">3</div>
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
                <section className="py-20 bg-white border-t border-slate-200/70">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Removal Services London
                            </p>

                            <h2 className="mt-2 text-3xl font-black">
                                House, Office & Commercial Removals Across London
                            </h2>

                            <p className="mt-4 text-slate-600">
                                KXH Storage & Logistics supports London customers with managed moving,
                                removals, packing, loading, transport, and delivery for homes,
                                apartments, offices, businesses, and temporary relocations.
                            </p>
                        </div>

                        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "House Removals London",
                                    desc: "Managed house moves with packing, loading, transport, and delivery support across London.",
                                },
                                {
                                    title: "Apartment Moving London",
                                    desc: "Flat and apartment moves for renters, families, professionals, and people relocating between boroughs.",
                                },
                                {
                                    title: "Office Removals London",
                                    desc: "Office relocation support for desks, furniture, equipment, archive boxes, and business assets.",
                                },
                                {
                                    title: "Commercial Removals London",
                                    desc: "Commercial moving support for businesses, shops, offices, stock, equipment, and operational items.",
                                },
                                {
                                    title: "Furniture Moving London",
                                    desc: "Single-item and furniture transport for sofas, tables, desks, cabinets, and large household items.",
                                },
                                {
                                    title: "Student Moving London",
                                    desc: "Student accommodation moves between halls, flats, shared houses, and temporary storage locations.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                                >
                                    <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                                    <p className="mt-3 text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Need storage before moving into your new property?
                                Explore our{" "}
                                <Link
                                    href="/warehouse-storage-london"
                                    className="font-medium text-emerald-700 hover:underline"
                                >
                                    temporary storage services
                                </Link>.
                            </p>
                        </div>
                    </div>
                </section>
                {/* USE CASES */}
                <section className="py-16 bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-6xl mx-auto px-4">

                        <h2 className="text-2xl font-black mb-8 text-center">
                            Who Our Moving Service Is For
                        </h2>
                        <div className="mb-10 overflow-hidden rounded-3xl border border-slate-200">
                            <Image
                                src="/images/moving-services/moving-services-student-move.webp"
                                alt="Student accommodation and apartment moving service"
                                width={1400}
                                height={700}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-slate-700">
                            <div className="bg-white p-4 rounded-xl border shadow-sm border border-slate-200">✔ Homeowners relocating</div>
                            <div className="bg-white p-4 rounded-xl border shadow-sm border border-slate-200">✔ Office & business moves</div>
                            <div className="bg-white p-4 rounded-xl border shadow-sm border border-slate-200">✔ Students moving accommodation</div>
                            <div className="bg-white p-4 rounded-xl border shadow-sm border border-slate-200">✔ Apartment & renter relocations</div>
                            <div className="bg-white p-4 rounded-xl border shadow-sm border border-slate-200">✔ Furniture & large item transport</div>
                        </div>

                    </div>
                </section>
                <section className="py-16 border-t border-slate-200/70 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <Image
                            src="/images/moving-services/moving-services-team.webp"
                            alt="KXH Storage and Logistics moving team"
                            width={1400}
                            height={700}
                            className="w-full rounded-3xl border border-slate-200 object-cover"
                        />
                    </div>
                </section>
                <TestimonialsSection />
                <section className="py-16 border-t border-slate-200/70 bg-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">

                        <h2 className="text-3xl font-black">
                            Moving & Temporary Storage Support
                        </h2>

                        <p className="mt-4 text-slate-600 leading-relaxed">
                            KXH Logistics also supports students, renters, apartment moves,
                            and temporary relocations needing both moving services and
                            secure warehouse storage across London.
                        </p>
                        <p className="mt-4 text-slate-600 leading-relaxed">
                            Moving between university accommodation? Combine our{" "}
                            <Link
                                href="/student-storage-london"
                                className="font-medium text-emerald-700 hover:underline"
                            >
                                student moving service
                            </Link>
                            {" "}with our{" "}
                            <Link
                                href="/student-storage-london"
                                className="font-medium text-emerald-700 hover:underline"
                            >
                                secure student storage
                            </Link>
                            {" "}for flexible collection, safe warehouse storage, and return delivery
                            at the start of your next term.
                        </p>

                        <p className="mt-4 text-slate-600 leading-relaxed">
                            We can collect, transport, store, and redeliver your items
                            when you are ready — ideal for accommodation changes,
                            renovation periods, and flexible moving schedules.
                        </p>

                    </div>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link
                            href="/student-storage-london"
                            className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 font-semibold text-emerald-800 hover:bg-emerald-100 transition"
                        >
                            Student Storage London
                        </Link>

                        <Link
                            href="/warehouse-storage-london"
                            className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
                        >
                            Temporary Storage
                        </Link>

                        <Link
                            href="/warehouse-storage-london"
                            className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
                        >
                            Storage with Collection
                        </Link>
                    </div>
                </section>

                <section className="py-16 bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">

                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Areas We Serve
                            </p>

                            <h2 className="mt-2 text-3xl font-black">
                                Moving Services Across London Boroughs
                            </h2>
                            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                                Whether you're moving home, relocating an office, or changing student
                                accommodation, our moving teams operate across London's major boroughs.
                            </p>
                            <p className="mt-4 text-slate-600">
                                KXH provides local moving, office removals, commercial removals,
                                apartment moving, and furniture transport across key London boroughs.
                            </p>
                        </div>

                        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { name: "Camden", href: "/logistics-moving-london/camden" },
                                { name: "Westminster", href: "/logistics-moving-london/westminster" },
                                { name: "Tower Hamlets", href: "/logistics-moving-london/tower-hamlets" },
                                { name: "Kensington & Chelsea", href: "/logistics-moving-london/kensington-chelsea" },
                                { name: "Southwark", href: "/logistics-moving-london/southwark" },
                                { name: "Hackney", href: "/logistics-moving-london/hackney" },
                                { name: "Lambeth", href: "/logistics-moving-london/lambeth" },
                                { name: "Islington", href: "/logistics-moving-london/islington" },
                            ].map((area) => (
                                <Link
                                    key={area.href}
                                    href={area.href}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-300 hover:bg-white transition"
                                >
                                    <h3 className="font-semibold text-slate-900">
                                        Moving Services in {area.name}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-600">
                                        House moves, office removals, apartment moves, furniture transport,
                                        and commercial relocations.
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                {/* FINAL CTA */}
                <section className="py-20 text-center bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-3xl mx-auto px-4">

                        <h2 className="text-3xl font-black">
                            Move in London without stress
                        </h2>

                        <p className="mt-4 text-slate-600">
                            Looking for a reliable removal company in London? Get a fast,
                            transparent quote and let our experienced team manage your move
                            from start to finish.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/get-a-quote?service=moving"
                                className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
                            >
                                Get Instant Moving Quote
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
                            <details className="border border-slate-200 rounded-xl p-5 bg-white">
                                <summary className="font-semibold cursor-pointer">
                                    Do you support student and renter moves in London?
                                </summary>
                                <p className="mt-3 text-slate-600">
                                    Yes, KXH Logistics supports student accommodation moves, renter relocations, apartment moves, and temporary storage needs across London.
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
                                    className="text-emerald-700 hover:underline text-sm"
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