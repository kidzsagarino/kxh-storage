import type { Metadata } from "next";
import Link from "next/link";
import CrispChat from "../components/chat/CrispChat";
import Nav from "../components/MobileNav";
import MainFooter from "../components/footer/MainFooter";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import { londonLocations } from "../sitemap";
import TrustpilotJsonLd from "../components/seo/TrustPilotJsonLD";

export const metadata: Metadata = {
  title: "Business Inventory Storage London | Stock Storage & Collection",
  description:
    "Secure business inventory storage in London with stock handling, pallet storage, item organisation, collection and return delivery for ecommerce, retail and growing businesses.",
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
      "Business inventory storage in London with organised stock handling, item categorisation, secure warehouse storage, pickup, pallet storage, and return delivery support.",
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
    q: "How does inventory tracking work?",
    a: "Stored items are organised through internal warehouse handling processes, helping businesses manage inventory, identify stored stock, and arrange return delivery when required.",
  },
  {
    q: "Can you store business stock?",
    a: "Yes, we can support business stock, ecommerce inventory, retail goods, office supplies, equipment, and operational items.",
  },
  {
    q: "Can stored inventory be returned on request?",
    a: "Yes, stored inventory can be returned when needed through our collection and return delivery process, helping businesses access stock without managing warehouse space directly.",

  }
];

export default function InventoryManagementPage() {
  return (
    <>
      <CrispChat />
      <Nav />

      <main className="min-h-screen bg-white text-slate-900">
        <JsonLd />
        <FAQJsonLd />
        <TrustpilotJsonLd />

        <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Warehouse Inventory Support
            </div>

            <h1 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight tracking-tight">
              Business Inventory Storage London
            </h1>

            <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
              Organised inventory management and storage in London with
              inventory tracking support, warehouse stock handling,
              business storage, collection, and return delivery.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Businesses needing outsourced warehouse operations can also explore our{" "}
              <Link
                href="/third-party-logistics-london"
                className="text-emerald-700 hover:underline font-medium"
              >
                third party logistics services
              </Link>
              {" "}for inventory handling, pallet coordination, collection,
              and flexible delivery support across London.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/?service=storage#pricing"
                className="rounded-xl bg-emerald-700 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
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
            <div className="mt-12">
              <img
                src="/images/inventory-management/inventory-management-london-warehouse-stock-handling.webp"
                alt="Warehouse inventory management and stock handling in London"
                className="w-full rounded-3xl border border-slate-200 shadow-xl"
              />
            </div>
            <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-black">
                Inventory Tracking & Return Requests
              </h2>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Businesses often need more than storage space. Our managed storage
                process helps organise stored inventory, maintain item records,
                coordinate collection, and arrange return delivery when items are
                needed back.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Inventory Tracking",
                  "Return Requests",
                  "Collection & Delivery",
                  "Business Stock Storage",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-sm font-medium text-emerald-700"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white border-t border-slate-200/70">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Collection, Storage & Return Delivery
              </p>
              <h2 className="mt-2 text-3xl font-black">
                We Collect, Store & Return Your Business Inventory
              </h2>
              <p className="mt-4 text-slate-600">
                KXH helps London businesses store stock without leasing extra warehouse
                space. We can collect your inventory, store it securely, organise it,
                and return items when required.
              </p>
            </div>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "We Collect",
                  desc: "Book a collection and our team picks up your boxes, stock, pallets, or business items.",
                },
                {
                  step: "2",
                  title: "We Store",
                  desc: "Your items are kept in secure London warehouse storage with organised stock handling.",
                },
                {
                  step: "3",
                  title: "We Return",
                  desc: "Request return delivery when your business needs access to stored inventory.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
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

            <div>
              <img
                src="/images/inventory-management/business-inventory-organisation-london.webp"
                alt="Business inventory organisation and warehouse stock management"
                className="w-full rounded-3xl border border-slate-200 shadow-lg"
              />

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
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
          </div>
        </section>

        <section className="py-16 border-t border-slate-200/70 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-6xl mx-auto px-4 pb-12">
              <img
                src="/images/inventory-management/warehouse-inventory-support-london.webp"
                alt="Warehouse worker organising inventory and stock storage"
                className="w-full rounded-3xl border border-slate-200 shadow-lg"
              />
            </div>
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
        <section className="py-16 bg-slate-50 border-t border-slate-200/70">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-black">
                Who Uses Our Inventory Storage?
              </h2>
              <p className="mt-4 text-slate-600">
                Our inventory storage service is designed for businesses that need
                secure space, better stock organisation, and flexible collection or
                delivery support.
              </p>
            </div>

            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Ecommerce Businesses",
                  desc: "Store products, packaging, returns, and seasonal stock without managing your own warehouse.",
                },
                {
                  title: "Retail Shops",
                  desc: "Keep overflow stock, promotional displays, and seasonal inventory outside your main premises.",
                },
                {
                  title: "Event Companies",
                  desc: "Store exhibition stands, branded materials, equipment, and event stock between projects.",
                },
                {
                  title: "Construction & Trade",
                  desc: "Store tools, materials, fixtures, and project equipment with flexible access options.",
                },
                {
                  title: "Offices",
                  desc: "Store archive boxes, office equipment, documents, and business supplies securely.",
                },
                {
                  title: "Growing Businesses",
                  desc: "Free up workspace while keeping stock organised and available when required.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="mt-3 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-white border-t border-slate-200/70">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                London Inventory Storage
              </p>
              <h2 className="text-3xl font-black">
                Inventory Storage for Businesses Across London
              </h2>
              <p className="mt-4 text-slate-600">
                KXH Logistics supports London businesses that need secure inventory
                storage, organised stock handling, collection, and return delivery
                across key boroughs.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Tower Hamlets", href: "/warehouse-storage-london/tower-hamlets" },
                { name: "Camden", href: "/warehouse-storage-london/camden" },
                { name: "Hackney", href: "/warehouse-storage-london/hackney" },
                { name: "Lambeth", href: "/warehouse-storage-london/lambeth" },
                { name: "Southwark", href: "/warehouse-storage-london/southwark" },
                { name: "Westminster", href: "/warehouse-storage-london/westminster" },
              ].map((area) => (
                <Link
                  key={area.href}
                  href={area.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition"
                >
                  <h3 className="font-semibold text-slate-900">
                    Inventory & Storage Support in {area.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Secure storage space with collection and delivery for local
                    businesses, stock, equipment, and inventory overflow.
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 border-t border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-black text-center">
              Why Businesses Use Inventory Storage
            </h2>

            <p className="mt-4 text-center text-slate-600 max-w-3xl mx-auto">
              Inventory management and storage can help businesses free up workspace,
              organise stock, improve inventory visibility, and access stored items
              when required.
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Inventory Tracking",
                  desc: "Organised stock records and warehouse handling help businesses keep inventory easier to identify, manage, and retrieve.",
                },
                {
                  title: "Inventory Records & Item Manifests",
                  desc: "Stored stock can be organised through item records, inventory manifests, and stock categorisation for better visibility.",
                },
                {
                  title: "Collection & Return Delivery",
                  desc: "Stored inventory can be collected, securely stored, and returned when needed through a managed delivery process.",
                },
                {
                  title: "Business Stock Storage",
                  desc: "Suitable for ecommerce inventory, retail stock, office supplies, equipment, archived documents, and seasonal business goods.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="mt-3 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-white border-t border-slate-200/70">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                  Pallet & Bulk Stock Storage
                </p>
                <h2 className="mt-2 text-3xl font-black">
                  Need Space for Pallets or Bulk Inventory?
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  For larger stock volumes, KXH also supports pallet storage and bulk
                  business storage. This is useful for ecommerce stock, retail inventory,
                  seasonal goods, and commercial overflow storage.
                </p>

                <ul className="mt-6 space-y-3 text-slate-700">
                  <li>✔ Pallet storage for business stock</li>
                  <li>✔ Overflow inventory storage</li>
                  <li>✔ Ecommerce and retail stock storage</li>
                  <li>✔ Collection and return delivery available</li>
                </ul>

                <Link
                  href="/pallet-storage-london"
                  className="mt-8 inline-block rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800 transition"
                >
                  View Pallet Storage
                </Link>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                <h3 className="text-2xl font-black">
                  Inventory storage that can scale
                </h3>
                <p className="mt-4 text-slate-600">
                  If your business is outgrowing office space, shop storage, or small
                  self-storage units, pallet storage gives you a more practical option
                  for larger volumes of stock.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 border-t border-slate-200/70 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black">
                Related Business Storage & Logistics Services

              </h2>
              <p className="mt-3 text-slate-600">
                Explore warehouse storage, business storage, pallet storage, commercial storage,
                and third party logistics services connected to inventory management.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                {
                  title: "Third Party Logistics",
                  href: "/third-party-logistics-london",
                  desc: "3PL warehouse support including inventory handling and delivery coordination.",
                }
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
        <section className="py-16 bg-white border-t border-slate-200/70">
          <div className="max-w-6xl mx-auto px-4">
            <img
              src="/images/inventory-management/inventory-collection-delivery-london.webp"
              alt="Business inventory pickup and delivery service in London"
              className="w-full rounded-3xl border border-slate-200 shadow-lg"
            />
          </div>
        </section>
        <TestimonialsSection />
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <img
              src="/images/inventory-management/kxh-inventory-management-team.webp"
              alt="KXH Logistics inventory management warehouse team"
              className="w-full rounded-3xl border border-slate-200 shadow-lg"
            />
          </div>
        </section>
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