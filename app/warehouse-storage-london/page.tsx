import CrispChat from "../components/chat/CrispChat";
import Nav from "../components/MobileNav";
import Link from "next/link";

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Warehouse Storage London",
    provider: {
      "@type": "LocalBusiness",
      name: "KXH Storage & Logistics",
      url: "https://kxhlogistics.co.uk",
    },
    areaServed: "London",
    description:
      "Secure, flexible warehouse storage in London with collection, delivery, and transparent pricing.",
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

        {/* HERO */}
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Premium Warehouse Storage in London
            </div>

            <h1 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight tracking-tight">
              Secure Warehouse Storage in London, Without the Complexity
            </h1>

            <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              A fully managed storage service with collection, secure warehousing,
              and on-demand delivery — built for businesses and individuals who value simplicity and control.
            </p>

            {/* TRUST BADGES */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["Secure Facilities", "Flexible Terms", "Collection & Delivery"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border bg-white px-4 py-2 text-sm text-slate-600 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                 href="/?service=storage#pricing"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
              >
                Get Instant Storage Price
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 border-t border-slate-200/70 bg-white">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">

            <div>
              <h2 className="text-2xl font-black mb-4">
                Enterprise-Grade Storage Security
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Your items are stored in monitored, controlled-access facilities designed for long-term protection and reliability.
              </p>

              <ul className="space-y-3 text-slate-700">
                <li>✔ 24/7 CCTV monitoring & access control</li>
                <li>✔ Fully insured warehouse storage</li>
                <li>✔ Clean, organized, and secure environment</li>
                <li>✔ Real-time handling support</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-black mb-4">
                Flexible Storage Built Around You
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Scale your storage up or down as your needs change — no rigid contracts.
              </p>

              <ul className="space-y-3 text-slate-700">
                <li>✔ Personal & household storage</li>
                <li>✔ Ecommerce inventory storage</li>
                <li>✔ Pallet & bulk storage options</li>
                <li>✔ Short-term & long-term plans</li>
              </ul>
            </div>

          </div>
        </section>

        {/* USE CASES */}
        <section className="py-16 bg-slate-50 border-t border-slate-200/70">
          <div className="max-w-6xl mx-auto px-4">

            <h2 className="text-2xl font-black mb-8 text-center">
              Designed for Modern Storage Needs
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-slate-700">
              <div className="bg-white p-4 rounded-xl border shadow-sm">✔ Ecommerce fulfillment storage</div>
              <div className="bg-white p-4 rounded-xl border shadow-sm">✔ Retail inventory management</div>
              <div className="bg-white p-4 rounded-xl border shadow-sm">✔ Home relocation & decluttering</div>
              <div className="bg-white p-4 rounded-xl border shadow-sm">✔ Business overflow storage</div>
            </div>

          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 text-center border-t border-slate-200/70 bg-white">
          <div className="max-w-3xl mx-auto px-4">

            <h2 className="text-3xl font-black">
              Get a Transparent Storage Price in Seconds
            </h2>

            <p className="mt-4 text-slate-600 leading-relaxed">
              No hidden fees. No complicated quotes. Just instant pricing based on your storage needs.
            </p>

            <div className="mt-8">
              <Link
                 href="/?service=storage#pricing"
                className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
              >
                Calculate Your Storage Cost
              </Link>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 py-14 border-t border-slate-200/70">
          <div className="max-w-4xl mx-auto px-4">

            <h2 className="text-2xl font-black mb-6 text-center">Frequently Asked Questions</h2>

            <div className="space-y-3">
              <details className="border rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  How much does warehouse storage in London cost?
                </summary>
                <p className="mt-3 text-slate-600">
                  Pricing depends on space and duration. Use our instant calculator for accurate pricing in seconds.
                </p>
              </details>

              <details className="border rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  Do you provide pickup and delivery?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes — we collect your items, store them securely, and deliver them back when needed.
                </p>
              </details>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}