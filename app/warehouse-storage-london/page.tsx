import ServiceShowcase from "../components/ServiceShowcase";
import ServiceHero from "../components/ServiceHero";
import AreaMapExplorer from "../components/AreaMapExplorer";
import { Package as HIcPackage, Armchair as HIcArmchair, GraduationCap as HIcGraduationCap, Boxes as HIcBoxes } from "lucide-react";
import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import Link from "next/link";
import { londonLocations } from "../lib/location";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import Image from "next/image";
import TrustpilotJsonLd from "../components/seo/TrustPilotJsonLD";

export const metadata = {
  title: "Warehouse Storage London | Pickup & Delivery | KXH",
  description:
    "Managed warehouse storage in London with collection from your door, secure storage and return delivery. For homes, students and businesses. Get a quote.",
  alternates: {
    canonical: "https://kxhlogistics.co.uk/warehouse-storage-london",
  },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Managed Warehouse Storage London",
    provider: {
      "@type": "LocalBusiness",
      name: "KXH Storage & Logistics",
      url: "https://kxhlogistics.co.uk",
    },
    areaServed: "London",
    description:
      "Managed warehouse storage in London with collection, delivery, and secure handling.",
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
        name: "How does storage pickup and delivery work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We collect your items from your location, store them securely, and deliver them back when requested.",
        },
      },
      {
        "@type": "Question",
        name: "Is your warehouse storage secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, items are stored in monitored facilities with controlled access and professional handling.",
        },
      },
      {
        "@type": "Question",
        name: "Can I store business inventory?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we support ecommerce inventory, retail stock, and bulk storage for businesses.",
        },
      },
      {
        "@type": "Question",
        name: "How do I access my items?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can request delivery anytime and we will return your items based on your schedule.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer short-term storage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer flexible short-term and long-term storage options.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer storage for students and renters?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, KXH Logistics supports students, renters, apartment moves, temporary relocations, and short-term storage with collection and delivery services across London.",
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
              "name": "Warehouse Storage London",
              "item":
                "https://kxhlogistics.co.uk/warehouse-storage-london",
            },
          ],
        }),
      }}
    />
  );
}

export default function WarehouseStoragePage() {
  return (
    <>
      <CrispChat />
      <Nav />

      {/* HERO */}
      <main className="min-h-screen bg-white text-slate-900">
        <JsonLd />
        <FAQJsonLd />
        <BreadcrumbJsonLd />
        <TrustpilotJsonLd />
        <ServiceHero
            image="/images/kxh-collection-delivery-london.webp"
            imageAlt="Warehouse Storage London with Pickup & Delivery with KXH Storage & Logistics"
            breadcrumb={[{"label": "Home", "href": "/"}, {"label": "Services", "href": "/services"}, {"label": "Warehouse Storage London"}]}
            eyebrow="Managed warehouse storage"
            title="Warehouse Storage London with Pickup & Delivery"
            highlight="Pickup & Delivery"
            intro="We collect your boxes, furniture or stock, keep them in our secure London warehouse and deliver them back when you need them. No van hire and no storage unit visits."
            chips={["Collection from your door", "Secure managed warehouse", "Flexible monthly storage", "Return delivery on request"]}
            ctaHref="/get-a-quote?service=storage"
            ctaLabel="Get a Storage Quote"
            cardEyebrow="We store"
            cardTitle="Storage for homes and businesses"
            cardItems={[
                { icon: <HIcPackage className="h-6 w-6" aria-hidden="true" />, title: "Boxes", text: "Household and business boxes" },
                { icon: <HIcArmchair className="h-6 w-6" aria-hidden="true" />, title: "Furniture", text: "Sofas, beds and tables" },
                { icon: <HIcGraduationCap className="h-6 w-6" aria-hidden="true" />, title: "Student items", text: "Term-break storage" },
                { icon: <HIcBoxes className="h-6 w-6" aria-hidden="true" />, title: "Business stock", text: "Stock and equipment" },
            ]}
        />

        {/* TRUST STRIP */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
            {[
              "Secure Warehouse Storage",
              "Pickup & Delivery Included",
              "Flexible Monthly Plans",
              "Business, Student & Personal Storage",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border px-4 py-2 bg-slate-50"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* PROBLEM → SOLUTION */}
        <section className="py-20 max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              Storage without the hassle of storage units
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-6 border border-slate-200 rounded-xl bg-red-50">
              <h3 className="font-semibold text-red-600 mb-3">Traditional Storage</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• You travel to the storage unit</li>
                <li>• Heavy lifting & transport stress</li>
                <li>• Limited access hours</li>
                <li>• Wasted time and effort</li>
              </ul>
            </div>

            <div className="p-6 border border-slate-200 rounded-xl bg-emerald-50">
              <h3 className="font-semibold text-emerald-700 mb-3">Our Managed Storage</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• We collect everything from you</li>
                <li>• Secure warehouse storage</li>
                <li>• Flexible student & renter storage</li>
                <li>• Request delivery anytime</li>
                <li>• Fully managed for convenience</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Everything taken care of for you
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Pickup & Delivery",
                desc: "We collect and return your items anytime you need them.",
              },
              {
                title: "Inventory Management",
                desc: "We organize, track, and manage stored inventory for businesses and commercial storage needs.",
              },
              {
                title: "Secure Storage",
                desc: "Monitored warehouse with professional handling and access control.",
              },
            ].map((f) => (
              <div key={f.title} className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm">
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="py-16 max-w-5xl mx-auto px-4 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">
              Flexible Storage for Students & Renters
            </h2>

            <p className="mt-4 text-slate-600 leading-relaxed">
              KXH Logistics also supports students, renters, apartment moves,
              temporary relocations, and short-term storage needs across London
              with collection, secure warehouse storage, and return delivery.
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Whether you are moving between flats, storing belongings during
              university breaks, or needing temporary storage during relocation,
              our managed service helps make storage simpler and more convenient.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Businesses looking for organised stock handling can also
              explore our{" "}
              <Link
                href="/inventory-management-london"
                className="text-emerald-700 hover:underline font-medium"
              >
                inventory management storage services
              </Link>
              {" "}for ecommerce inventory, warehouse handling,
              and flexible delivery support across London.
            </p>
            <p className="mt-8 text-center text-slate-600 max-w-3xl mx-auto">
              Need support for larger commercial stock or palletised goods?
              Explore our{" "}
              <Link
                href="/pallet-storage-london"
                className="text-emerald-700 hover:underline font-medium"
              >
                pallet storage services
              </Link>
              {" "}and{" "}
              <Link
                href="/third-party-logistics-london"
                className="text-emerald-700 hover:underline font-medium"
              >
                third party logistics solutions
              </Link>
              {" "}for warehouse overflow, inventory coordination,
              and business delivery support.
            </p>
          </div>
        </section>
        <section className="py-14 border-t border-slate-200/70 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">

            <div className="text-center mb-8">
              <h2 className="text-2xl font-black">
                Business & Inventory Storage Solutions
              </h2>

              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                We also provide business warehouse storage, student storage,
                temporary relocation storage, pallet storage,
                inventory management, and commercial logistics support
                across London.
              </p>

            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">

              <Link
                href="/business-storage-london"
                className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-white p-5 hover:border-emerald-300 transition"
              >
                <h3 className="font-semibold text-slate-900">
                  Business Storage
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Flexible warehouse storage solutions for businesses.
                </p>
              </Link>

              <Link
                href="/inventory-management-london"
                className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-white p-5 hover:border-emerald-300 transition"
              >
                <h3 className="font-semibold text-slate-900">
                  Inventory Management
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Organised stock handling and inventory tracking.
                </p>
              </Link>

              <Link
                href="/pallet-storage-london"
                className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-white p-5 hover:border-emerald-300 transition"
              >
                <h3 className="font-semibold text-slate-900">
                  Pallet Storage
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Secure bulk pallet storage for logistics and retail.
                </p>
              </Link>

              <Link
                href="/commercial-storage-london"
                className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-white p-5 hover:border-emerald-300 transition"
              >
                <h3 className="font-semibold text-slate-900">
                  Commercial Storage
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Scalable warehouse storage for growing businesses.
                </p>
              </Link>
              <Link
                href="/third-party-logistics-london"
                className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-white p-5 hover:border-emerald-300 transition"
              >
                <h3 className="font-semibold text-slate-900">
                  Third Party Logistics
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  3PL warehouse support including inventory handling,
                  pallet storage, and delivery coordination.
                </p>
              </Link>

            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-4">
            How our warehouse storage service works
          </h2>

          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            A simple managed storage process with collection, secure warehouse handling,
            and return delivery across London.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              {
                step: "1",
                title: "We collect",
                desc: "We pick up your items from your home or business.",
              },
              {
                step: "2",
                title: "We store",
                desc: "Your items are safely stored in our warehouse.",
              },
              {
                step: "3",
                title: "We deliver",
                desc: "Request delivery anytime you need your items back.",
              },
            ].map((s) => (
              <div key={s.step} className="p-6 border border-slate-200 rounded-xl">
                <div className="text-2xl font-black text-emerald-700">
                  {s.step}
                </div>
                <h3 className="font-semibold mt-2">{s.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
                <ServiceShowcase
                    eyebrow="See it in action"
                    title="Your own space in a managed London warehouse"
                    intro="Everything we collect is logged, labelled and kept on racking in our warehouse, so it is easy to find and quick to deliver back."
                    points={["Collection from your door", "Secure managed warehouse", "Flexible monthly storage", "Return delivery on request"]}
                    images={[
                        { src: "/images/warehouse.webp", alt: "Stock and boxes stored on racking in the KXH London warehouse", label: "Inside our warehouse" },
                        { src: "/images/kxh-inventory-management-london.webp", alt: "Warehouse Storage London with KXH Storage & Logistics", label: "Organised racking" },
                        { src: "/images/delivery-warehouse.webp", alt: "Branded KXH Storage & Logistics van ready for collection and delivery", label: "Collection & delivery" },
                    ]}
                    ctaHref="/get-a-quote?service=storage"
                    ctaLabel="Get a Storage Quote"
                />
        <section id="areas" className="border-t border-slate-200/70 bg-slate-50 py-16 lg:py-24">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="kxh-reveal max-w-3xl">
                            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">London service areas</p>
                            <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Warehouse Storage London across London boroughs</h2>
                            <p className="mt-4 text-slate-600">Tap an area to see it on the map and open the local warehouse storage page.</p>
                        </div>
                        <div className="mt-10">
                            <AreaMapExplorer primaryHref="/warehouse-storage-london" />
                        </div>
                    </div>
                </section>
                <TestimonialsSection />
        {/* CTA */}
        <section className="py-20 text-center bg-slate-50">
          <h2 className="text-3xl font-bold">
            Get your storage price in seconds
          </h2>
          <p className="mt-3 text-slate-600">
            Transparent pricing. No hidden fees.
          </p>

          <div className="mt-6">
            <Link
              href="/get-a-quote?service=storage"
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold"
            >
              Get Quote
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How does storage pickup and delivery work?",
                a: "We collect your items, store them securely, and deliver them back when requested.",
              },
              {
                q: "Is your warehouse storage secure?",
                a: "Yes, monitored facilities with controlled access and professional handling.",
              },
              {
                q: "Can I store business inventory?",
                a: "Yes, we support ecommerce and retail inventory storage.",
              },
              {
                q: "How do I access my items?",
                a: "Request delivery anytime and we will return your items.",
              },
            ].map((f) => (
              <details
                key={f.q}
                className="border border-slate-200 p-4 rounded-lg bg-white"
              >
                <summary className="font-medium cursor-pointer">
                  {f.q}
                </summary>
                <p className="mt-2 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <MainFooter
          locations={londonLocations}
        />
      </main>
    </>
  );
}