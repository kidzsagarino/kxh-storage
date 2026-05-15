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
    "Inventory Management London | Warehouse Stock Handling | KXH Logistics",
  description:
    "Organised inventory management in London with secure warehouse storage, stock handling, item organisation, pickup & delivery, and business logistics support.",
  alternates: {
    canonical: "https://kxhlogistics.co.uk/inventory-management-london",
  },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Inventory Management London",
    provider: {
      "@type": "LocalBusiness",
      name: "KXH Storage & Logistics",
      url: "https://kxhlogistics.co.uk",
    },
    areaServed: "London",
    serviceType: "Inventory Management",
    description:
      "Warehouse inventory management in London with organised stock handling, item categorisation, secure storage, pickup, and delivery support.",
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
        name: "Do you provide inventory management in London?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, KXH Logistics provides organised warehouse inventory handling and storage support for businesses in London.",
        },
      },
      {
        "@type": "Question",
        name: "Is this a customer-facing inventory dashboard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our inventory management is handled through internal warehouse and order management processes to help organise, handle, and retrieve stored items efficiently.",
        },
      },
      {
        "@type": "Question",
        name: "Can you store business stock?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we can support storage for business stock, ecommerce inventory, retail goods, office supplies, and operational items.",
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
    q: "Do you provide inventory management in London?",
    a: "Yes, we provide organised warehouse inventory handling and storage support for businesses across London.",
  },
  {
    q: "Is this a customer-facing inventory dashboard?",
    a: "No. Inventory handling is managed through our internal warehouse and order management processes to help organise, handle, and retrieve stored items efficiently.",
  },
  {
    q: "Can you store business stock?",
    a: "Yes, we can support business stock, ecommerce inventory, retail goods, office supplies, equipment, and operational items.",
  },
];

export default function InventoryManagementPage() {
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
              Warehouse Inventory Support
            </div>

            <h1 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight tracking-tight">
              Inventory Management London for Business Storage
            </h1>

            <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
              Organised warehouse stock handling, item categorisation, secure
              storage, pickup, and return delivery for London businesses.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/?service=storage#pricing"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
              >
                Get Storage Quote
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

        <section className="border-y border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
            {[
              "Organised Stock Handling",
              "Secure Warehouse Storage",
              "Pickup & Delivery",
              "Business Inventory Support",
              "Internal Order Management",
            ].map((item) => (
              <span key={item} className="rounded-full border px-4 py-2 bg-slate-50">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="py-20 max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-black">
                Organised inventory handling without extra warehouse overhead
              </h2>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Managing business stock can become difficult when your office,
                shop, or workspace starts running out of room. KXH Logistics
                supports London businesses with secure warehouse storage and
                organised inventory handling.
              </p>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Stored items are handled through internal warehouse processes so
                they can be grouped, organised, and retrieved more efficiently
                when your business needs them.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-bold text-lg">Useful for:</h3>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li>✔ Ecommerce stock storage</li>
                <li>✔ Retail inventory overflow</li>
                <li>✔ Office supplies and equipment</li>
                <li>✔ Archived stock and documents</li>
                <li>✔ Seasonal business inventory</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-slate-200/70 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black">
                Inventory support built around managed storage
              </h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                All inventory-related services fall under our managed warehouse
                storage quote and operational handling process.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Item Organisation",
                  desc: "Stored items can be grouped and organised through internal warehouse handling processes.",
                },
                {
                  title: "Stock Storage",
                  desc: "Secure storage for business stock, ecommerce goods, supplies, and operational items.",
                },
                {
                  title: "Pickup & Delivery",
                  desc: "We collect business items and return them when requested.",
                },
                {
                  title: "Warehouse Handling",
                  desc: "Items are handled professionally inside managed warehouse storage facilities.",
                },
                {
                  title: "Storage Flexibility",
                  desc: "Useful for overflow stock, seasonal inventory, and growing business storage needs.",
                },
                {
                  title: "Business Logistics Support",
                  desc: "A practical storage solution for companies that need more space without leasing extra premises.",
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
                Explore more storage and logistics solutions.
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
                  title: "Pallet Storage",
                  href: "/pallet-storage-london",
                  desc: "Bulk pallet storage for business goods.",
                },
                {
                  title: "Commercial Storage",
                  href: "/commercial-storage-london",
                  desc: "Scalable storage for growing companies.",
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
              Need organised storage for business stock?
            </h2>

            <p className="mt-4 text-slate-600">
              Get a fast quote for managed storage, warehouse handling, and
              return delivery across London.
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

        <MainFooter locations={londonLocations}
        />
      </main>
    </>
  );
}