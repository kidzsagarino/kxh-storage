import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import Link from "next/link";
import { londonLocations } from "../lib/location";

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Document Shredding Service London",
    provider: {
      "@type": "LocalBusiness",
      name: "KXH Storage & Logistics",
      url: "https://kxhlogistics.co.uk",
    },
    areaServed: "London",
    description:
      "Confidential document shredding service in London with secure collection, certified destruction, and full compliance.",
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
        name: "Is your shredding service GDPR compliant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all shredding processes follow GDPR standards with secure handling, strict chain of custody, and certified destruction.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide a certificate of destruction?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide an official certificate of destruction after shredding for compliance and record keeping.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer document shredding collection in London?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide secure collection services across London. We pick up your documents, transport them safely, and shred them securely.",
        },
      },
      {
        "@type": "Question",
        name: "What types of documents can be shredded?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We shred financial records, legal documents, business paperwork, and personal files securely and safely.",
        },
      },
      {
        "@type": "Question",
        name: "How much does document shredding cost in London?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pricing depends on the volume of documents and service type. You can use our instant quote tool for accurate pricing.",
        },
      },
      {
        "@type": "Question",
        name: "Is your document shredding service secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we use secure handling, controlled processes, and certified destruction methods to ensure complete confidentiality.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer one-off and business shredding services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer both one-time shredding for individuals and scheduled shredding services for businesses and offices.",
        },
      },
      {
        "@type": "Question",
        name: "Can you collect documents for shredding near me?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer document collection services across London. Enter your postcode to check availability in your area.",
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
              "name": "Document Shredding London",
              "item":
                "https://kxhlogistics.co.uk/shredding-solutions-london",
            },
          ],
        }),
      }}
    />
  );
}

export default function ShreddingServicePage() {
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
          Document Shredding London
        </span>
      </nav>

      <main className="min-h-screen bg-white text-slate-900">
        <JsonLd />
        <FAQJsonLd />
        <BreadcrumbJsonLd />

        {/* HERO */}
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Confidential Shredding Service in London
            </div>

            <h1 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight tracking-tight">
              Secure Document Shredding in London, Done Right
            </h1>

            <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Protect your sensitive information with fully managed shredding services — secure collection, certified destruction, and complete peace of mind.
            </p>

            {/* TRUST BADGES */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["Confidential & Secure", "Fully Compliant", "Certified Destruction"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border bg-white px-4 py-2 text-sm text-slate-600 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex justify-center">
              <Link
                href="/?service=shredding#pricing"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
              >
                Get Shredding Quote
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 border-t border-slate-200/40 bg-white">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">

            <div>
              <h2 className="text-2xl font-black mb-4">
                Secure & Compliant Destruction
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We ensure your confidential documents are destroyed securely and in compliance with data protection standards.
              </p>

              <ul className="space-y-3 text-slate-700">
                <li>✔ GDPR-compliant shredding</li>
                <li>✔ Secure chain of custody</li>
                <li>✔ Certified document destruction</li>
                <li>✔ Environmentally responsible disposal</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-black mb-4">
                Flexible Shredding Solutions
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Whether you need one-time shredding or regular scheduled services, we adapt to your needs.
              </p>

              <ul className="space-y-3 text-slate-700">
                <li>✔ One-off shredding services</li>
                <li>✔ Scheduled business shredding</li>
                <li>✔ Office cleanouts</li>
                <li>✔ Bulk document disposal</li>
              </ul>
            </div>

          </div>
        </section>

        {/* USE CASES */}
        <section className="py-16 bg-slate-50 border-t border-slate-200/40">
          <div className="max-w-6xl mx-auto px-4">

            <h2 className="text-2xl font-black mb-8 text-center">
              Who Our Shredding Service Is For
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-slate-700">
              <div className="bg-white p-4 rounded-xl border shadow-sm">✔ Businesses handling sensitive data</div>
              <div className="bg-white p-4 rounded-xl border shadow-sm">✔ Offices clearing old records</div>
              <div className="bg-white p-4 rounded-xl border shadow-sm">✔ Legal & financial firms</div>
              <div className="bg-white p-4 rounded-xl border shadow-sm">✔ Individuals protecting personal documents</div>
            </div>

          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 text-center border-t border-slate-200/40 bg-white">
          <div className="max-w-3xl mx-auto px-4">

            <h2 className="text-3xl font-black">
              Dispose of Sensitive Documents Safely
            </h2>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Get a fast, transparent shredding quote and ensure your data is securely destroyed.
            </p>

            <div className="mt-8">
              <Link
                href="/?service=shredding#pricing"
                className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
              >
                Get Your Shredding Quote
              </Link>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 py-14 border-t border-slate-200/40">
          <div className="max-w-4xl mx-auto px-4">

            <h2 className="text-2xl font-black mb-6 text-center">Frequently Asked Questions</h2>

            <div className="space-y-3">
              <details className="border rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  Is your shredding service GDPR compliant?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes, all shredding processes follow GDPR standards with secure handling, strict chain of custody, and certified destruction.
                </p>
              </details>

              <details className="border rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  Do you provide a certificate of destruction?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes, we provide an official certificate of destruction after shredding for compliance and record keeping.
                </p>
              </details>

              <details className="border rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  Do you offer document shredding collection in London?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes, we provide secure collection services across London. We pick up your documents and shred them securely.
                </p>
              </details>

              <details className="border rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  What types of documents can be shredded?
                </summary>
                <p className="mt-3 text-slate-600">
                  We shred financial records, legal documents, business paperwork, and personal files securely and safely.
                </p>
              </details>

              <details className="border rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  How much does document shredding cost in London?
                </summary>
                <p className="mt-3 text-slate-600">
                  Pricing depends on the volume of documents and service type. Use our instant quote tool for accurate pricing.
                </p>
              </details>

              <details className="border rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  Is your document shredding service secure?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes, we use secure handling, controlled processes, and certified destruction methods to ensure confidentiality.
                </p>
              </details>

              <details className="border rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  Do you offer one-off and business shredding services?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes, we provide both one-time shredding and scheduled business shredding services.
                </p>
              </details>

              <details className="border rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  Can you collect documents for shredding near me?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes, we offer document collection across London. Enter your postcode to check availability.
                </p>
              </details>
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
                  href={`/shredding-solutions-london/${l.slug}`}
                  className="text-emerald-600 hover:underline text-sm"
                >
                  Shredding Solutions in {l.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <MainFooter services={[
          { label: "Storage London", href: "/warehouse-storage-london" },
          { label: "Moving London", href: "/logistics-moving-london" },
          { label: "Shredding London", href: "/shredding-solutions-london" },
        ]} locations={londonLocations} />
      </main>
    </>
  );
}