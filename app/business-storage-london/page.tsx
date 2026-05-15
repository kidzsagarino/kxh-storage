import type { Metadata } from "next";
import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import Link from "next/link";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import TestimonialsSection from "../components/TestimonialsSection";
import { londonLocations } from "../lib/location";

export const metadata: Metadata = {
  title:
    "Business Storage London | Secure Warehouse Storage for Companies | KXH Logistics",
  description:
    "Secure business storage in London with pickup, delivery, warehouse handling, stock storage, office equipment storage, and flexible commercial storage solutions.",
  alternates: {
    canonical: "https://kxhlogistics.co.uk/business-storage-london",
  },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Business Storage London",
    provider: {
      "@type": "LocalBusiness",
      name: "KXH Storage & Logistics",
      url: "https://kxhlogistics.co.uk",
    },
    areaServed: "London",
    serviceType: "Business Storage",
    description:
      "Secure business storage in London with flexible warehouse space, collection, delivery, stock handling, and commercial storage solutions for companies.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "GBP",
    },
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
        name: "What is business storage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Business storage allows companies to store stock, equipment, archived documents, office furniture, and operational items securely in a managed warehouse facility.",
        },
      },
      {
        "@type": "Question",
        name: "Do you collect and deliver business storage items?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, KXH Logistics provides pickup and delivery for business storage customers across London.",
        },
      },
      {
        "@type": "Question",
        name: "Can businesses store inventory or stock?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, businesses can store retail stock, ecommerce inventory, office supplies, equipment, and palletised goods depending on storage requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Is business storage suitable for short-term and long-term use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, business storage can be used for short-term overflow storage, seasonal stock, relocations, or long-term commercial storage.",
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
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://kxhlogistics.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://kxhlogistics.co.uk/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Business Storage London",
        item: "https://kxhlogistics.co.uk/business-storage-london",
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
    q: "What is business storage?",
    a: "Business storage gives companies secure warehouse space for stock, equipment, archived documents, office furniture, and operational items without needing to lease additional premises.",
  },
  {
    q: "Do you collect business storage items?",
    a: "Yes, we provide collection and return delivery across London, so your team does not need to arrange van hire or visit a storage unit.",
  },
  {
    q: "Can I store business inventory or stock?",
    a: "Yes, our business storage service can support retail stock, ecommerce inventory, office supplies, equipment, and palletised goods depending on your requirements.",
  },
  {
    q: "Is business storage suitable for growing companies?",
    a: "Yes, it is ideal for growing businesses that need flexible storage without committing to larger premises or long commercial leases.",
  },
];

export default function BusinessStoragePage() {
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
          Business Storage London
        </span>
      </nav>

      <main className="min-h-screen bg-white text-slate-900">
        <JsonLd />
        <FAQJsonLd />
        <BreadcrumbJsonLd />

        <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Secure Business Storage in London
            </div>

            <h1 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight tracking-tight">
              Flexible Business Storage London with Pickup & Delivery
            </h1>

            <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
              Secure warehouse storage for business stock, office equipment,
              archived documents, and commercial items. We collect, store, and
              deliver your items when needed.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/?service=storage#pricing"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
              >
                Get Business Quote
              </Link>

              <Link
                href="/warehouse-storage-london"
                className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                View Warehouse Storage
              </Link>
            </div>

            <div className="mt-6 flex justify-center">
              <TrustpilotPill />
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
            {[
              "Pickup & Delivery",
              "Secure Warehouse Storage",
              "Business Stock Storage",
              "Office Equipment Storage",
              "Flexible Storage Plans",
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
                Business storage without extra premises
              </h2>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Renting more office or warehouse space can be expensive and
                inflexible. KXH Logistics gives London businesses a simpler
                option: managed storage with collection, secure handling, and
                return delivery.
              </p>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Whether you need overflow storage, seasonal stock space,
                document storage, or equipment storage during an office move,
                our team helps keep your business organised.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-bold text-lg">Ideal for:</h3>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li>✔ Retail stock and ecommerce inventory</li>
                <li>✔ Office furniture and equipment</li>
                <li>✔ Archived business documents</li>
                <li>✔ Event materials and marketing stock</li>
                <li>✔ Seasonal or overflow business items</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-slate-200/70 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black">
                Why businesses choose KXH Logistics
              </h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                A managed storage service designed for business convenience,
                security, and flexibility.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Managed Collection",
                  desc: "We collect your business items from your office, shop, or site across London.",
                },
                {
                  title: "Secure Warehouse Storage",
                  desc: "Items are stored in monitored facilities with professional handling and controlled access.",
                },
                {
                  title: "Return Delivery",
                  desc: "Request your items back when needed and we arrange scheduled delivery.",
                },
                {
                  title: "Organised Item Handling",
                  desc: "Items are labelled, grouped, and handled through internal warehouse processes.",
                },
                {
                  title: "Flexible Capacity",
                  desc: "Store a few items, office equipment, stock, or larger business loads.",
                },
                {
                  title: "Commercial Support",
                  desc: "Useful for office moves, stock overflow, seasonal storage, and operational storage needs.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 max-w-5xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-black">
              How business storage works
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              A simple process for London companies that need space without the
              hassle of self-storage.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            {[
              {
                step: "1",
                title: "Book collection",
                desc: "Tell us what you need stored and choose a convenient pickup time.",
              },
              {
                step: "2",
                title: "We store securely",
                desc: "Your business items are handled, organised, and stored in our warehouse.",
              },
              {
                step: "3",
                title: "Request delivery",
                desc: "When you need items back, we arrange delivery to your chosen London location.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-slate-200 p-6">
                <div className="text-2xl font-black text-emerald-600">
                  {s.step}
                </div>
                <h3 className="mt-3 font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-slate-200/70 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black">
                Related warehouse services
              </h2>
              <p className="mt-3 text-slate-600">
                Explore more business storage and logistics solutions.
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
                  title: "Inventory Management",
                  href: "/inventory-management-london",
                  desc: "Organised stock and item handling.",
                },
                {
                  title: "Pallet Storage",
                  href: "/pallet-storage-london",
                  desc: "Bulk storage for business goods.",
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
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
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
              Need secure storage for your business?
            </h2>
            <p className="mt-4 text-slate-600">
              Get a fast quote for business storage, collection, and return
              delivery across London.
            </p>

            <div className="mt-8">
              <Link
                href="/?service=storage#pricing"
                className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
              >
                Get Business Quote
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

        <section className="bg-slate-50 py-14 border-t border-slate-200/70">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-bold text-lg mb-3">Other areas we serve</h2>
            <div className="flex flex-wrap gap-3">
              {londonLocations.map((l) => (
                <Link
                  key={l.slug}
                  href={`/warehouse-storage-london/${l.slug}`}
                  className="text-emerald-600 hover:underline text-sm"
                >
                  Business Storage in {l.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <MainFooter
          services={[
            { label: "Warehouse Storage", href: "/warehouse-storage-london" },
            { label: "Business Storage", href: "/business-storage-london" },
            { label: "Inventory Management", href: "/inventory-management-london" },
            { label: "Pallet Storage", href: "/pallet-storage-london" },
            { label: "Commercial Storage", href: "/commercial-storage-london" },
            { label: "Moving Services", href: "/logistics-moving-london" },
            { label: "Document Shredding", href: "/shredding-solutions-london" },
          ]}
          locations={londonLocations}
        />
      </main>
    </>
  );
}