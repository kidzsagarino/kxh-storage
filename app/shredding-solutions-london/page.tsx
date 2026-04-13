import CrispChat from "../components/chat/CrispChat";
import Nav from "../components/MobileNav";
import Link from "next/link";

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

export default function ShreddingServicePage() {
  return (
    <>
      <CrispChat />
      <Nav />

      <main className="min-h-screen bg-white text-slate-900">
        <JsonLd />

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
                  Yes — all shredding processes follow GDPR standards with secure handling and certified destruction.
                </p>
              </details>

              <details className="border rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  Do you provide a certificate of destruction?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes, we provide official certification after shredding for compliance and records.
                </p>
              </details>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}