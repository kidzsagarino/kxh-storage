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
    "Pallet Storage London | Secure Bulk Warehouse Storage | KXH Logistics",
  description:
    "Secure pallet storage in London with warehouse handling, pickup & delivery, bulk stock storage, and flexible business storage solutions.",
  alternates: {
    canonical: "https://kxhlogistics.co.uk/pallet-storage-london",
  },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pallet Storage London",
    provider: {
      "@type": "LocalBusiness",
      name: "KXH Storage & Logistics",
      url: "https://kxhlogistics.co.uk",
    },
    areaServed: "London",
    serviceType: "Pallet Storage",
    description:
      "Secure pallet storage in London for businesses needing bulk warehouse storage, stock handling, pickup, and delivery support.",
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
        name: "Do you provide pallet storage in London?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, KXH Logistics provides pallet storage support in London as part of managed warehouse storage services.",
        },
      },
      {
        "@type": "Question",
        name: "Can you collect palletised goods?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Collection and delivery may be arranged depending on item type, volume, access, and storage requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Is pallet storage suitable for business stock?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, pallet storage is suitable for bulk stock, retail goods, ecommerce inventory, commercial items, and seasonal business storage.",
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
    q: "Do you provide pallet storage in London?",
    a: "Yes, pallet storage is supported as part of our managed warehouse storage service for businesses across London.",
  },
  {
    q: "Can you collect palletised goods?",
    a: "Collection and delivery may be arranged depending on the size, access requirements, item type, and storage volume.",
  },
  {
    q: "What can pallet storage be used for?",
    a: "Pallet storage is useful for bulk stock, retail goods, ecommerce inventory, commercial equipment, seasonal items, and logistics overflow.",
  },
];

export default function PalletStoragePage() {
  return (
    <>
      <CrispChat />
      <Nav />

      <main className="min-h-screen bg-white text-slate-900">
        <JsonLd />
        <FAQJsonLd />

        <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Bulk Warehouse Storage London
            </div>

            <h1 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight tracking-tight">
              Pallet Storage London for Business Stock & Bulk Goods
            </h1>

            <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
              Secure warehouse storage for palletised stock, bulk goods,
              ecommerce inventory, retail overflow, and commercial items.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/?service=storage#pricing"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
              >
                Get Storage Quote
              </Link>

              <Link
                href="/commercial-storage-london"
                className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Commercial Storage
              </Link>
            </div>

            <div className="mt-6 flex justify-center">
              <TrustpilotPill />
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
            {[
              "Bulk Stock Storage",
              "Palletised Goods",
              "Secure Warehouse Handling",
              "Business Inventory Support",
              "Pickup & Delivery Options",
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

        <section className="py-20 max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-black">
                Pallet storage for businesses that need more warehouse space
              </h2>

              <p className="mt-4 text-slate-600 leading-relaxed">
                When business stock starts taking over your shop, office, or
                workspace, pallet storage gives you a practical way to free up
                space without committing to a larger warehouse lease.
              </p>

              <p className="mt-4 text-slate-600 leading-relaxed">
                KXH Logistics supports London businesses with secure warehouse
                storage for bulk goods, palletised stock, retail overflow, and
                commercial inventory as part of our managed storage service.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-bold text-lg">Ideal for:</h3>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li>✔ Retail stock overflow</li>
                <li>✔ Ecommerce inventory</li>
                <li>✔ Bulk goods and boxed stock</li>
                <li>✔ Commercial equipment</li>
                <li>✔ Seasonal business storage</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-slate-200/70 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black">
                Managed pallet storage support
              </h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                Pallet storage falls under our managed warehouse storage quote,
                with handling based on your stock volume and storage needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Bulk Storage",
                  desc: "Secure space for palletised goods, boxed stock, and larger commercial loads.",
                },
                {
                  title: "Warehouse Handling",
                  desc: "Goods are handled through organised warehouse storage processes.",
                },
                {
                  title: "Flexible Capacity",
                  desc: "Useful for growing inventory, seasonal stock, or temporary overflow.",
                },
                {
                  title: "Business Stock Support",
                  desc: "Suitable for ecommerce, retail, logistics, and operational stock.",
                },
                {
                  title: "Collection Options",
                  desc: "Pickup can be arranged depending on access, volume, and item requirements.",
                },
                {
                  title: "Return Delivery",
                  desc: "Request stored items back when needed through the managed storage process.",
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

        <section className="py-16 border-t border-slate-200/70 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black">
                Related warehouse services
              </h2>
              <p className="mt-3 text-slate-600">
                Explore more storage and logistics services for business stock.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Warehouse Storage",
                  href: "/warehouse-storage-london",
                  desc: "Managed storage with pickup and delivery.",
                },
                {
                  title: "Business Storage",
                  href: "/business-storage-london",
                  desc: "Flexible storage for companies.",
                },
                {
                  title: "Inventory Management",
                  href: "/inventory-management-london",
                  desc: "Organised item and stock handling.",
                },
                {
                  title: "Commercial Storage",
                  href: "/commercial-storage-london",
                  desc: "Scalable storage for growing businesses.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 transition"
                >
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <section className="py-20 text-center bg-slate-50 border-t border-slate-200/70">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-black">
              Need secure pallet storage in London?
            </h2>

            <p className="mt-4 text-slate-600">
              Get a quote for managed warehouse storage based on your stock,
              volume, and pickup requirements.
            </p>

            <div className="mt-8">
              <Link
                href="/?service=storage#pricing"
                className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
              >
                Get Storage Quote
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

        <MainFooter
          locations={londonLocations}
        />
      </main>
    </>
  );
}