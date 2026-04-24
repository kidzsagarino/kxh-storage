import CrispChat from "../components/chat/CrispChat";
import Nav from "../components/MobileNav";
import Link from "next/link";

export const metadata = {
  title: "Managed Warehouse Storage in London with Pickup & Delivery | KXH Logistics",
  description:
    "Secure warehouse storage in London with pickup & delivery. Fully managed storage for businesses and individuals with flexible pricing.",
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function WarehouseStoragePage() {
  return (
    <>
      <CrispChat />
      <Nav />

      <main className="min-h-screen bg-white text-slate-900">
        <JsonLd />
        <FAQJsonLd />

        {/* HERO */}
        <section className="py-20 text-center">
          <h1 className="text-4xl font-bold">
            Managed Warehouse Storage in London with Pickup & Delivery
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We collect your items, store them securely, and deliver them back when needed — no need to visit a storage unit.
          </p>

          <div className="mt-8">
            <Link
              href="/?service=storage#pricing"
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Get Instant Price
            </Link>
          </div>
        </section>

        {/* CORE FEATURES */}
        <section className="py-16 max-w-5xl mx-auto px-4 space-y-12">

          <div>
            <h2 className="text-2xl font-semibold">
              Storage with Pickup and Delivery in London
            </h2>
            <p className="mt-3 text-slate-600">
              Our team collects your items from your location, stores them securely in our warehouse, and delivers them back when you need them.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Managed Inventory Storage
            </h2>
            <p className="mt-3 text-slate-600">
              We organize and manage your stored items internally, making it ideal for ecommerce inventory, retail stock, and business storage needs.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Secure Warehouse Storage in London
            </h2>
            <p className="mt-3 text-slate-600">
              Your items are stored in monitored facilities with controlled access and professional handling.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Access Your Items Anytime with Delivery
            </h2>
            <p className="mt-3 text-slate-600">
              Request your items anytime and we’ll deliver them back to your location quickly and efficiently.
            </p>
          </div>

        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <h2 className="text-2xl font-semibold">
            Get Your Storage Price in Seconds
          </h2>
          <p className="mt-3 text-slate-600">
            Transparent pricing with no hidden fees.
          </p>

          <div className="mt-6">
            <Link
              href="/?service=storage#pricing"
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Calculate Price
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-slate-50 border-t">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <details className="border p-4 rounded-lg bg-white">
                <summary className="font-medium cursor-pointer">
                  How does storage pickup and delivery work?
                </summary>
                <p className="mt-2 text-slate-600">
                  We collect your items from your location, store them securely, and deliver them back when requested.
                </p>
              </details>

              <details className="border p-4 rounded-lg bg-white">
                <summary className="font-medium cursor-pointer">
                  Is your warehouse storage secure?
                </summary>
                <p className="mt-2 text-slate-600">
                  Yes, items are stored in monitored facilities with controlled access and professional handling.
                </p>
              </details>

              <details className="border p-4 rounded-lg bg-white">
                <summary className="font-medium cursor-pointer">
                  Can I store business inventory?
                </summary>
                <p className="mt-2 text-slate-600">
                  Yes, we support ecommerce inventory, retail stock, and bulk storage.
                </p>
              </details>

              <details className="border p-4 rounded-lg bg-white">
                <summary className="font-medium cursor-pointer">
                  How do I access my items?
                </summary>
                <p className="mt-2 text-slate-600">
                  Request delivery anytime and we’ll return your items based on your schedule.
                </p>
              </details>

              <details className="border p-4 rounded-lg bg-white">
                <summary className="font-medium cursor-pointer">
                  Do you offer short-term storage?
                </summary>
                <p className="mt-2 text-slate-600">
                  Yes, we offer flexible short-term and long-term storage options.
                </p>
              </details>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}