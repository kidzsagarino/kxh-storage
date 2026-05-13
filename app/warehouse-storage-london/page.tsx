import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import Link from "next/link";
import { londonLocations } from "../lib/location";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";

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
      <nav className="max-w-5xl mx-auto px-4 pt-6 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/services">Services</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700 font-medium">
          Warehouse Storage London
        </span>
      </nav>

      {/* HERO */}
      <main className="min-h-screen bg-white text-slate-900">
        <JsonLd />
        <FAQJsonLd />
        <BreadcrumbJsonLd />
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Secure Warehouse Storage London
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Managed Warehouse Storage in London with Pickup & Delivery
            </h1>

            {/* Subtext */}
            <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
              We collect your items, store them securely, and deliver them back when needed — no need to visit a storage unit.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/?service=storage#pricing"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
              >
                Get Quote
              </Link>

            </div>

            {/* Trustpilot */}
            <div className="mt-6 flex justify-center">
              <TrustpilotPill />
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
            {[
              "⭐ 4.8/5 Trusted Reviews",
              "Secure Warehouse Storage",
              "Pickup & Delivery Included",
              "Flexible Monthly Plans",
              "Business Inventory Ready",
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
              <h3 className="font-semibold text-emerald-600 mb-3">Our Managed Storage</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• We collect everything from you</li>
                <li>• Secure warehouse storage</li>
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
                desc: "We organize and track your stored items for easy access.",
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

        {/* TESTIMONIALS (IMPORTANT POSITION) */}
        <TestimonialsSection />

        {/* HOW IT WORKS */}
        <section className="py-20 max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Simple 3-step process
          </h2>

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
                <div className="text-2xl font-black text-emerald-600">
                  {s.step}
                </div>
                <h3 className="font-semibold mt-2">{s.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

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
              href="/?service=storage#pricing"
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
          services={[
            { label: "Storage London", href: "/warehouse-storage-london" },
            { label: "Moving London", href: "/logistics-moving-london" },
            { label: "Shredding London", href: "/shredding-solutions-london" },
          ]}
          locations={londonLocations}
        />
      </main>
    </>
  );
}