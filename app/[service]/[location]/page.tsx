import CrispChat from "@/app/components/chat/CrispChat";
import MainFooter from "@/app/components/footer/MainFooter";
import Nav from "@/app/components/MobileNav";
import { londonLocations } from "@/app/lib/location";
import Link from "next/link";

type FAQ = {
    q: string;
    a: string;
};

const serviceContent = {
    "warehouse-storage-london": {
        label: "Warehouse Storage",
        quoteService: "storage",
        h1: (loc: string) =>
            `Warehouse Storage in ${loc}, London with Pickup & Delivery`,
        intro: (loc: string) =>
            `Need secure storage in ${loc}? KXH Logistics provides managed warehouse storage with collection, secure handling, and return delivery across London.`,
        description:
            "Managed warehouse storage with pickup, secure handling, and return delivery.",
        benefits: [
            "Pickup & delivery",
            "Secure warehouse storage",
            "Short-term storage",
            "Long-term storage",
            "Business storage support",
        ],
        idealFor: [
            "Household storage",
            "Business stock",
            "Office equipment",
            "Student storage",
            "Moving or renovation storage",
        ],
        process: [
            "Book your storage quote online",
            "We collect your items from your location",
            "We store everything securely and deliver it back when needed",
        ],
        faqs: [
            {
                q: "Do you collect items for storage?",
                a: "Yes, we collect items from your location and store them securely in our managed warehouse storage system.",
            },
            {
                q: "Can I request my items back?",
                a: "Yes, you can request return delivery when you need your stored items back.",
            },
            {
                q: "Is this suitable for business storage?",
                a: "Yes, this service is suitable for households, students, offices, and businesses needing flexible storage.",
            },
        ],
    },

    "logistics-moving-london": {
        label: "Moving Service",
        quoteService: "moving",
        h1: (loc: string) => `Moving Services in ${loc}, London`,
        intro: (loc: string) =>
            `Moving in or around ${loc}? KXH Logistics provides fully managed moving services with packing, loading, transport, and delivery support.`,
        description:
            "Professional moving services with packing, transport, loading, and delivery support.",
        benefits: [
            "Home moves",
            "Office relocations",
            "Furniture transport",
            "Packing support",
            "Flexible scheduling",
        ],
        idealFor: [
            "Flat moves",
            "House moves",
            "Office relocations",
            "Furniture transport",
            "Student accommodation moves",
        ],
        process: [
            "Book your moving quote online",
            "Our team collects, packs, and loads your items",
            "We deliver everything safely to your new location",
        ],
        faqs: [
            {
                q: "Do you provide moving services near me?",
                a: "Yes, we provide moving services across London, including collection, transport, and delivery.",
            },
            {
                q: "Can you help with office moves?",
                a: "Yes, we support office and business relocations as well as home moves.",
            },
            {
                q: "Do I need to rent a van?",
                a: "No, we handle transport, loading, and delivery for you.",
            },
        ],
    },

    "shredding-solutions-london": {
        label: "Document Shredding",
        quoteService: "shredding",
        h1: (loc: string) => `Secure Document Shredding in ${loc}, London`,
        intro: (loc: string) =>
            `Need confidential document shredding in ${loc}? KXH Logistics provides secure collection, certified destruction, and compliant document disposal across London.`,
        description:
            "Confidential document shredding with secure collection and certified destruction.",
        benefits: [
            "Secure collection",
            "Confidential shredding",
            "Certificate of destruction",
            "Business shredding",
            "Compliant disposal",
        ],
        idealFor: [
            "Office records",
            "Legal documents",
            "Financial paperwork",
            "Personal files",
            "Business archive clearouts",
        ],
        process: [
            "Book your shredding quote online",
            "We securely collect your documents",
            "Documents are destroyed and handled confidentially",
        ],
        faqs: [
            {
                q: "Do you collect documents for shredding?",
                a: "Yes, we collect documents securely and arrange confidential shredding.",
            },
            {
                q: "Do you provide a certificate of destruction?",
                a: "Yes, a certificate of destruction can be provided after shredding.",
            },
            {
                q: "Is this suitable for businesses?",
                a: "Yes, it is suitable for offices, businesses, legal firms, financial records, and personal documents.",
            },
        ],
    },
} as const;

type ServiceSlug = keyof typeof serviceContent;

export async function generateStaticParams() {
    const services = Object.keys(serviceContent) as ServiceSlug[];

    return services.flatMap((service) =>
        londonLocations.map((loc) => ({
            service,
            location: loc.slug,
        }))
    );
}

export async function generateMetadata({ params }: any) {
    const { service, location } = await params;
    const loc = londonLocations.find((l) => l.slug === location);
    const content = serviceContent[service as ServiceSlug];

    const locName = loc?.name ?? "London";

    return {
        title: `${content.label} in ${locName}, London | Pickup & Delivery | KXH`,
        description: `${content.description} Available in ${locName}, London with simple booking and instant pricing.`,
        alternates: {
            canonical: `https://kxhlogistics.co.uk/${service}/${location}`,
        },
    };
}

function JsonLd({
    serviceLabel,
    locationName,
    description,
}: {
    serviceLabel: string;
    locationName: string;
    description: string;
}) {
    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${serviceLabel} in ${locationName}, London`,
        serviceType: serviceLabel,
        areaServed: `${locationName}, London`,
        description,
        provider: {
            "@type": "LocalBusiness",
            name: "KXH Storage & Logistics",
            url: "https://kxhlogistics.co.uk",
            telephone: "+44 1474 396663",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

function FAQJsonLd({
    faqs,
}: { faqs: readonly FAQ[] }) {
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

function Breadcrumbs({
    service,
    location,
    serviceLabel,
}: {
    service: string;
    location: {
        slug: string;
        name: string;
    };
    serviceLabel: string;
}) {
    const breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: serviceLabel, href: `/${service}` },
        { name: location.name, href: `/${service}/${location.slug}` },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            item: `https://kxhlogistics.co.uk${b.href}`,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />

            <nav className="max-w-6xl mx-auto px-4 pt-6 text-sm text-slate-500">
                <ol className="flex flex-wrap items-center gap-2">
                    {breadcrumbs.map((b, i) => (
                        <li key={b.href} className="flex items-center gap-2">
                            {i < breadcrumbs.length - 1 ? (
                                <Link href={b.href} className="hover:underline text-emerald-600">
                                    {b.name}
                                </Link>
                            ) : (
                                <span className="text-slate-700 font-medium">{b.name}</span>
                            )}

                            {i < breadcrumbs.length - 1 && (
                                <span className="text-slate-300">/</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}

export default async function LocationServicePage({ params }: any) {
    const { service, location } = await params;

    const loc = londonLocations.find((l) => l.slug === location);
    const content = serviceContent[service as ServiceSlug];

    if (!content || !loc) {
        return null;
    }

    return (
        <>
            <CrispChat />
            <Nav />

            <Breadcrumbs
                service={service}
                location={loc}
                serviceLabel={content.label}
            />

            <main className="min-h-screen bg-white text-slate-900">
                <JsonLd
                    serviceLabel={content.label}
                    locationName={loc.name}
                    description={content.description}
                />
                <FAQJsonLd faqs={content.faqs} />

                <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-24">
                    <div className="max-w-5xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            {content.label} in {loc.name}
                        </div>

                        <h1 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight tracking-tight">
                            {content.h1(loc.name)}
                        </h1>

                        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            {content.intro(loc.name)}
                        </p>

                        <div className="mt-8">
                            <Link
                                href={`/?service=${content.quoteService}#pricing`}
                                className="inline-block rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
                            >
                                Get Instant Quote
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="border-y border-slate-200 bg-white">
                    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
                        {content.benefits.map((item) => (
                            <span key={item} className="rounded-full border px-4 py-2 bg-slate-50">
                                {item}
                            </span>
                        ))}
                    </div>
                </section>

                <section className="py-16 max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-3xl font-black">
                                Local {content.label.toLowerCase()} support in {loc.name}
                            </h2>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                KXH Logistics helps customers in {loc.name} arrange reliable,
                                fully managed {content.label.toLowerCase()} without the stress
                                of handling transport, storage, or logistics alone.
                            </p>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                Whether you are a household, student, office, or business, our
                                team can collect, handle, and deliver your items through a
                                simple quote-based process.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="font-bold text-lg">Ideal for:</h3>
                            <ul className="mt-4 space-y-3 text-slate-700">
                                {content.idealFor.map((item) => (
                                    <li key={item}>✔ {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="text-center">
                            <h2 className="text-3xl font-black">
                                How it works in {loc.name}
                            </h2>

                            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                                A simple managed process from quote to collection, handling,
                                and delivery.
                            </p>
                        </div>

                        <div className="mt-10 grid md:grid-cols-3 gap-6">
                            {content.process.map((step, index) => (
                                <div
                                    key={step}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                                >
                                    <div className="text-2xl font-black text-emerald-600">
                                        {index + 1}
                                    </div>
                                    <p className="mt-3 text-sm text-slate-600">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 border-t border-slate-200/70 bg-white">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black">
                                Related services in London
                            </h2>

                            <p className="mt-3 text-slate-600">
                                Explore other managed storage, moving, and shredding services.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Link
                                href="/warehouse-storage-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 transition"
                            >
                                <h3 className="font-semibold">Warehouse Storage</h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Managed storage with pickup and delivery.
                                </p>
                            </Link>

                            <Link
                                href="/logistics-moving-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 transition"
                            >
                                <h3 className="font-semibold">Moving Services</h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Packing, transport, loading, and delivery.
                                </p>
                            </Link>

                            <Link
                                href="/shredding-solutions-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 transition"
                            >
                                <h3 className="font-semibold">Document Shredding</h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Secure collection and confidential destruction.
                                </p>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="py-20 text-center bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-3xl mx-auto px-4">
                        <h2 className="text-3xl font-black">
                            Need {content.label.toLowerCase()} in {loc.name}?
                        </h2>

                        <p className="mt-4 text-slate-600">
                            Get a fast quote and let KXH Logistics handle collection,
                            transport, and service delivery.
                        </p>

                        <div className="mt-8">
                            <Link
                                href={`/?service=${content.quoteService}#pricing`}
                                className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
                            >
                                Get Instant Quote
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
                            {content.faqs.map((faq) => (
                                <details
                                    key={faq.q}
                                    className="border border-slate-200 rounded-xl p-5 bg-white"
                                >
                                    <summary className="font-semibold cursor-pointer">
                                        {faq.q}
                                    </summary>
                                    <p className="mt-3 text-slate-600">{faq.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-14 border-t border-slate-200/70">
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="font-bold text-lg mb-3">Other areas we serve</h2>

                        <div className="flex flex-wrap gap-3">
                            {londonLocations.map((l) => (
                                <Link
                                    key={l.slug}
                                    href={`/${service}/${l.slug}`}
                                    className="text-emerald-600 hover:underline text-sm"
                                >
                                    {content.label} in {l.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <MainFooter
                    locations={londonLocations}
                />
            </main>
        </>
    );
}