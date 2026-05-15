import type { Metadata } from "next";
import Link from "next/link";
import CrispChat from "../components/chat/CrispChat";
import Nav from "../components/MobileNav";
import MainFooter from "../components/footer/MainFooter";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import { londonLocations } from "../sitemap";

export const metadata: Metadata = {
  title:
    "Commercial Storage London | Secure Warehouse Storage for Businesses | KXH Logistics",
  description:
    "Flexible commercial storage in London with secure warehouse space, business inventory handling, pickup & delivery, and scalable storage solutions.",
  alternates: {
    canonical: "https://kxhlogistics.co.uk/commercial-storage-london",
  },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Commercial Storage London",
    provider: {
      "@type": "LocalBusiness",
      name: "KXH Storage & Logistics",
      url: "https://kxhlogistics.co.uk",
    },
    areaServed: "London",
    serviceType: "Commercial Storage",
    description:
      "Commercial warehouse storage in London for businesses requiring scalable storage capacity, inventory handling, and flexible storage solutions.",
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
        name: "What is commercial storage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Commercial storage provides warehouse space for businesses needing secure storage for stock, equipment, documents, or operational items.",
        },
      },
      {
        "@type": "Question",
        name: "Can commercial storage scale with business growth?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, commercial storage solutions can scale depending on inventory levels, operational needs, and seasonal demand.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer pickup and delivery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide collection and return delivery across London for commercial storage customers.",
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

const faqs = [
  {
    q: "What is commercial storage?",
    a: "Commercial storage provides warehouse space for stock, equipment, archived items, documents, and operational materials.",
  },
  {
    q: "Can businesses increase storage space when needed?",
    a: "Yes, storage capacity can scale depending on seasonal demand, stock levels, and operational requirements.",
  },
  {
    q: "Do you offer pickup and return delivery?",
    a: "Yes, our managed storage service includes collection and delivery across London.",
  },
];

export default function CommercialStoragePage() {
  return (
    <>
      <CrispChat />
      <Nav />

      <main className="min-h-screen bg-white text-slate-900">
        <JsonLd />
        <FAQJsonLd />

        {/* HERO */}
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-4 text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Commercial Warehouse Storage London
            </div>

            <h1 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight tracking-tight">
              Commercial Storage Solutions for London Businesses
            </h1>

            <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
              Secure and scalable commercial warehouse storage with inventory handling,
              pickup & delivery, and flexible business storage support.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/?service=storage#pricing"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
              >
                Get Commercial Quote
              </Link>

              <Link
                href="/business-storage-london"
                className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Business Storage
              </Link>
            </div>

            <div className="mt-6 flex justify-center">
              <TrustpilotPill />
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-y border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
            {[
              "Scalable Storage Capacity",
              "Commercial Inventory Storage",
              "Pickup & Delivery",
              "Flexible Storage Plans",
              "Secure Warehouse Handling",
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

        {/* CONTENT */}
        <section className="py-20 max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            <div>
              <h2 className="text-3xl font-black">
                Flexible commercial storage without long-term warehouse leases
              </h2>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Commercial storage helps businesses manage inventory,
                operational stock, equipment, and overflow items without the
                expense of additional warehouse premises.
              </p>

              <p className="mt-4 text-slate-600 leading-relaxed">
                KXH Logistics provides managed warehouse storage in London with
                collection, secure handling, and delivery support for businesses
                needing scalable storage flexibility.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-bold text-lg">Ideal for:</h3>

              <ul className="mt-4 space-y-3 text-slate-700">
                <li>✔ Ecommerce businesses</li>
                <li>✔ Retail stock overflow</li>
                <li>✔ Commercial equipment storage</li>
                <li>✔ Seasonal inventory storage</li>
                <li>✔ Office relocations & refurbishments</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 border-t border-slate-200/70 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">

            <div className="text-center mb-10">
              <h2 className="text-3xl font-black">
                Commercial storage built for business operations
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Warehouse Capacity",
                  desc: "Flexible storage space for growing inventory and operational stock.",
                },
                {
                  title: "Managed Collection",
                  desc: "We collect commercial items from your business location across London.",
                },
                {
                  title: "Secure Handling",
                  desc: "Monitored facilities with professional warehouse handling and storage processes.",
                },
                {
                  title: "Flexible Scaling",
                  desc: "Increase or reduce storage requirements based on your business needs.",
                },
                {
                  title: "Inventory Organisation",
                  desc: "Structured item handling and organised warehouse processes.",
                },
                {
                  title: "Return Delivery",
                  desc: "Request business items back whenever needed.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED SERVICES */}
        <section className="py-16 border-t border-slate-200/70 bg-white">
          <div className="max-w-5xl mx-auto px-4">

            <div className="text-center mb-8">
              <h2 className="text-2xl font-black">
                Related warehouse services
              </h2>

              <p className="mt-3 text-slate-600">
                Explore more storage and logistics solutions for London businesses.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

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
                href="/business-storage-london"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 transition"
              >
                <h3 className="font-semibold">Business Storage</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Flexible warehouse storage for businesses.
                </p>
              </Link>

              <Link
                href="/inventory-management-london"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 transition"
              >
                <h3 className="font-semibold">Inventory Management</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Organised inventory handling and stock management.
                </p>
              </Link>

              <Link
                href="/pallet-storage-london"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 transition"
              >
                <h3 className="font-semibold">Pallet Storage</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Bulk pallet storage for logistics and retail.
                </p>
              </Link>

            </div>
          </div>
        </section>

        <TestimonialsSection />

        {/* CTA */}
        <section className="py-20 text-center bg-slate-50 border-t border-slate-200/70">
          <div className="max-w-3xl mx-auto px-4">

            <h2 className="text-3xl font-black">
              Need scalable commercial storage?
            </h2>

            <p className="mt-4 text-slate-600">
              Get a fast quote for secure commercial warehouse storage in London.
            </p>

            <div className="mt-8">
              <Link
                href="/?service=storage#pricing"
                className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
              >
                Get Commercial Quote
              </Link>
            </div>

          </div>
        </section>

        {/* FAQ */}
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

                  <p className="mt-3 text-slate-600">
                    {f.a}
                  </p>
                </details>
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