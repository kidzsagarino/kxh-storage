
import CrispChat from "@/app/components/chat/CrispChat";
import Nav from "@/app/components/MobileNav";
import { londonLocations } from "@/app/lib/location";
import Link from "next/link";

export async function generateStaticParams() {
    const services = ["storage", "moving", "shredding"];

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

    const serviceName =
        service === "storage"
            ? "Storage"
            : service === "moving"
                ? "Moving Service"
                : "Document Shredding";

    return {
        title: `${serviceName} in ${loc?.name} London with Pickup & Delivery | KXH`,
        description: `Book ${serviceName.toLowerCase()} in ${loc?.name}, London with collection and delivery. Secure, flexible, and fully managed service with instant pricing.`,
    };
}

function JsonLd({ service, locationName }: any) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: `${service} in ${locationName} London`,
                    areaServed: `${locationName}, London`,
                    provider: {
                        "@type": "LocalBusiness",
                        name: "KXH Storage & Logistics",
                        url: "https://kxhlogistics.co.uk",
                    },
                }),
            }}
        />
    );
}

export default async function LocationServicePage({ params }: any) {
    const { service, location } = await params;
    const loc = londonLocations.find((l) => l.slug === location);

    const serviceLabel = service === "storage"
        ? "Storage"
        : service === "moving"
            ? "Moving Service"
            : "Document Shredding";

    return (
        <>
            <Nav />
            <main className="min-h-screen bg-white text-slate-900 px-4 py-16 max-w-4xl mx-auto">
                <CrispChat />

                <JsonLd service={serviceLabel} locationName={loc?.name} />
                <h1 className="text-4xl font-black">
                    {serviceLabel} in {loc?.name}, London with Pickup & Delivery
                </h1>

                <p className="mt-4 text-slate-600">
                    Looking for reliable {serviceLabel.toLowerCase()} in {loc?.name}?
                    KXH Logistics offers secure, affordable, and fully managed services with pickup and delivery.
                </p>

                {/* CTA */}
                <div className="mt-6 flex justify-center">
                    <Link
                        href={`/?service=${service}#pricing`}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-xl"
                    >
                        Get Instant Quote
                    </Link>
                </div>
                <section className="mt-12 space-y-6 text-slate-700">

                    <h2 className="text-2xl font-bold">
                        {serviceLabel} near {loc?.name}
                    </h2>

                    <p>
                        Our {serviceLabel.toLowerCase()} service in {loc?.name}, London includes collection, secure handling, and delivery.
                        You don’t need to visit a facility — we manage everything for you.
                    </p>

                    <h3 className="text-xl font-semibold">
                        Why choose KXH in {loc?.name}?
                    </h3>

                    <ul className="list-disc pl-5 space-y-2">
                        <li>Collection and delivery across {loc?.name}</li>
                        <li>Secure warehouse storage with monitored facilities</li>
                        <li>Flexible short-term and long-term options</li>
                        <li>Simple pricing with no hidden fees</li>
                    </ul>

                    <h3 className="text-xl font-semibold">
                        Who is this service for?
                    </h3>

                    <p>
                        Our {serviceLabel.toLowerCase()} in {loc?.name} is ideal for households, students, and businesses needing reliable storage and logistics without the hassle of managing it themselves.
                    </p>

                </section>
                {/* Content Block */}
                <section className="mt-10 space-y-4 text-slate-700">
                    <p>
                        Our {serviceLabel.toLowerCase()} service in {loc?.name} is designed for both individuals and businesses.
                        We handle everything from collection to delivery, ensuring a seamless experience.
                    </p>

                    <p>
                        Whether you need short-term or long-term {serviceLabel.toLowerCase()},
                        our flexible plans and transparent pricing make it easy.
                    </p>
                </section>

                {/* Internal Links */}
                <div className="mt-10">
                    <h2 className="font-bold text-lg mb-3">Other areas we serve</h2>
                    <div className="flex flex-wrap gap-3">
                        {londonLocations.map((l) => (
                            <Link
                                key={l.slug}
                                href={`/${service}/${l.slug}`}
                                className="text-emerald-600 hover:underline text-sm"
                            >
                                {serviceLabel} in {l.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </>

    );
}