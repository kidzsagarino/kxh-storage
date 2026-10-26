import ServiceShowcase from "../components/ServiceShowcase";
import ServiceHero from "../components/ServiceHero";
import AreaMapExplorer from "../components/AreaMapExplorer";
import { FileText as HIcFileText, Landmark as HIcLandmark, HeartPulse as HIcHeartPulse, Archive as HIcArchive } from "lucide-react";
import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import Link from "next/link";
import { londonLocations } from "../lib/location";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import TestimonialsSection from "../components/TestimonialsSection";
import Image from "next/image";
import TrustpilotJsonLd from "../components/seo/TrustPilotJsonLD";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Shredding London | Secure Collection | KXH",
  description:
    "Confidential document shredding in London. We collect paper records from homes and offices and securely destroy them. Book online or call 020 3916 5312.",
  alternates: { canonical: "https://kxhlogistics.co.uk/shredding-solutions-london" },
  openGraph: {
    title: "Document Shredding London | KXH Storage & Logistics",
    description: "Secure collection and confidential destruction of documents across London.",
    url: "https://kxhlogistics.co.uk/shredding-solutions-london",
    images: [{ url: "/images/kxh-shredding-solutions-london.webp", width: 1600, height: 900 }],
  },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Secure Document Shredding London",
    title: "Secure Document Shredding London | Confidential Shredding Services | KXH Logistics",
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

      <main className="min-h-screen bg-white text-slate-900">
        <JsonLd />
        <FAQJsonLd />
        <BreadcrumbJsonLd />
        <TrustpilotJsonLd />

        {/* HERO */}
        <ServiceHero
            image="/images/kxh-shredding-solutions-london.webp"
            imageAlt="Confidential Document Shredding Services in London with KXH Storage & Logistics"
            breadcrumb={[{"label": "Home", "href": "/"}, {"label": "Services", "href": "/services"}, {"label": "Document Shredding London"}]}
            eyebrow="Confidential shredding"
            title="Confidential Document Shredding Services in London"
            highlight="Document Shredding"
            intro="Secure collection and destruction of confidential paperwork for London homes and businesses. Book a one-off clear-out or regular collections from your office."
            chips={["Collection from your door", "Confidential handling", "Homes and offices", "One-off or regular"]}
            ctaHref="/get-a-quote?service=shredding"
            ctaLabel="Book Document Shredding"
            cardEyebrow="We shred"
            cardTitle="Confidential paperwork"
            cardItems={[
                { icon: <HIcFileText className="h-6 w-6" aria-hidden="true" />, title: "Business records", text: "Invoices and files" },
                { icon: <HIcLandmark className="h-6 w-6" aria-hidden="true" />, title: "Financial papers", text: "Bank and tax documents" },
                { icon: <HIcHeartPulse className="h-6 w-6" aria-hidden="true" />, title: "Personal data", text: "Medical and HR files" },
                { icon: <HIcArchive className="h-6 w-6" aria-hidden="true" />, title: "Archive clear-outs", text: "Old storage boxes" },
            ]}
        />
        <section className="border-y border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
            {[
              "GDPR-Compliant",
              "Certificate of Destruction",
              "Secure Collection",
              "Business & Office Shredding",
              "Confidential Disposal",
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
        {/* PROBLEM STATEMENT */}
        <section className="py-16 border-t border-slate-200/40 bg-white">
          <div className="max-w-5xl mx-auto px-4 text-center">

            <h2 className="text-3xl font-black">
              Storing or disposing sensitive documents shouldn’t be risky or complicated
            </h2>

            <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Many businesses and individuals still store or discard confidential documents without proper security, putting sensitive data at risk of leaks, fines, or compliance issues.
            </p>
            {/* PROBLEM CARDS */}
            <div className="mt-10 grid md:grid-cols-3 gap-6 text-left">

              <div className="p-6 rounded-xl border border-slate-200 bg-red-50">
                <h3 className="font-semibold text-red-600 mb-2">
                  Data breach risk
                </h3>
                <p className="text-sm text-slate-600">
                  Improper disposal of documents can expose sensitive personal or business information.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-slate-200 bg-red-50">
                <h3 className="font-semibold text-red-600 mb-2">
                  GDPR compliance issues
                </h3>
                <p className="text-sm text-slate-600">
                  Failure to securely destroy records can lead to compliance penalties and legal risk.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-slate-200 bg-red-50">
                <h3 className="font-semibold text-red-600 mb-2">
                  Time-consuming handling
                </h3>
                <p className="text-sm text-slate-600">
                  Manual shredding or storage wastes time and increases operational hassle.
                </p>
              </div>

            </div>

          </div>
        </section>
        {/* FEATURES */}
        <section className="py-16 border-t border-slate-200/40 bg-white">
          <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-12">

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
              <p className="mt-4 text-slate-600 leading-relaxed">
                Our shredding services are suitable for offices, legal firms,
                accountants, healthcare providers, retailers, and businesses
                handling confidential information that requires secure disposal.
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
        {/* HOW IT WORKS */}
        <section className="py-20 bg-slate-50 border-t border-slate-200/40">
          <div className="max-w-5xl mx-auto px-4">

            <div className="text-center">
              <h2 className="text-3xl font-black">
                How our shredding service works
              </h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                A simple, secure 3-step process to safely destroy your confidential documents.
              </p>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">

              {/* STEP 1 */}
              <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="text-2xl font-black text-emerald-700">1</div>
                <h3 className="mt-3 font-semibold">
                  We collect your documents
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  We securely pick up your documents from your home or office anywhere in London.
                </p>
              </div>

              {/* STEP 2 */}
              <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="text-2xl font-black text-emerald-700">2</div>
                <h3 className="mt-3 font-semibold">
                  Secure transport & shredding
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Your documents are transported under strict chain-of-custody and destroyed using certified shredding processes.
                </p>
              </div>

              {/* STEP 3 */}
              <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="text-2xl font-black text-emerald-700">3</div>
                <h3 className="mt-3 font-semibold">
                  Receive certificate of destruction
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  You receive an official certificate confirming secure and compliant destruction of your documents.
                </p>
              </div>

            </div>

          </div>
        </section>
        {/* USE CASES */}
        <section className="py-16 bg-slate-50 border-t border-slate-200/40">
          <div className="max-w-screen-xl mx-auto px-4">

            <h2 className="text-2xl font-black mb-8 text-center">
              Who Our Document Shredding Services Are For
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-slate-700">
              <div className="bg-white p-4 rounded-xl border shadow-sm border border-slate-200">✔ Businesses handling sensitive data</div>
              <div className="bg-white p-4 rounded-xl border shadow-sm border border-slate-200">✔ Offices clearing old records</div>
              <div className="bg-white p-4 rounded-xl border shadow-sm border border-slate-200">✔ Legal & financial firms</div>
              <div className="bg-white p-4 rounded-xl border shadow-sm border border-slate-200">✔ Individuals protecting personal documents</div>
            </div>

          </div>
        </section>
        <section className="py-16 border-t border-slate-200/70 bg-white">
          <div className="max-w-5xl mx-auto px-4">

            <div className="text-center mb-8">
              <h2 className="text-2xl font-black">
                Related business storage services
              </h2>

              <p className="mt-3 text-slate-600">
                Explore more warehouse and logistics services across London.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <Link
                href="/warehouse-storage-london"
                className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 transition"
              >
                <h3 className="font-semibold">
                  Warehouse Storage
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Managed storage with pickup and delivery.
                </p>
              </Link>

              <Link
                href="/business-storage-london"
                className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 transition"
              >
                <h3 className="font-semibold">
                  Business Storage
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Flexible warehouse storage for businesses.
                </p>
              </Link>

              <Link
                href="/inventory-management-london"
                className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 transition"
              >
                <h3 className="font-semibold">
                  Inventory Management
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Organised stock handling and storage support.
                </p>
              </Link>

              <Link
                href="/commercial-storage-london"
                className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 transition"
              >
                <h3 className="font-semibold">
                  Commercial Storage
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Scalable storage for growing businesses.
                </p>
              </Link>
              <Link
                href="/pallet-storage-london"
                className="kxh-reveal kxh-card3d rounded-3xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 transition"
              >
                <h3 className="font-semibold">
                  Pallet Storage
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Secure storage for palletised business goods.
                </p>
              </Link>

            </div>
          </div>
        </section>
                <ServiceShowcase
                    eyebrow="See it in action"
                    title="Secure document collection and destruction"
                    intro="Confidential paperwork is collected in sealed containers and securely destroyed, with collection from your home or office."
                    points={["Collection from your door", "Confidential handling", "Homes and offices", "One-off or regular"]}
                    images={[
                        { src: "/images/warehouse.webp", alt: "Stock and boxes stored on racking in the KXH London warehouse", label: "Inside our warehouse" },
                        { src: "/images/kxh-collection-delivery-london.webp", alt: "Document Shredding London with KXH Storage & Logistics", label: "Secure destruction" },
                        { src: "/images/delivery-warehouse.webp", alt: "Branded KXH Storage & Logistics van ready for collection and delivery", label: "Collection & delivery" },
                    ]}
                    ctaHref="/get-a-quote?service=shredding"
                    ctaLabel="Book Document Shredding"
                />
        <section id="areas" className="border-t border-slate-200/70 bg-slate-50 py-16 lg:py-24">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="kxh-reveal max-w-3xl">
                            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">London service areas</p>
                            <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Document Shredding London across London boroughs</h2>
                            <p className="mt-4 text-slate-600">Tap an area to see it on the map and open the local document shredding page.</p>
                        </div>
                        <div className="mt-10">
                            <AreaMapExplorer primaryHref="/shredding-solutions-london" />
                        </div>
                    </div>
                </section>
                <TestimonialsSection />

        {/* FINAL CTA */}
        <section className="py-16 text-center border-t border-slate-200/40 bg-white">
          <div className="max-w-3xl mx-auto px-4">

            <h2 className="text-3xl font-black">
              Securely destroy confidential documents with trusted London shredding services
            </h2>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Get a fast quote for secure document collection, confidential shredding, and certified destruction across London.
            </p>

            <div className="mt-8">
              <Link
                href="/get-a-quote?service=shredding"
                className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
              >
                Get Quote
              </Link>
            </div>

          </div>
        </section>
        <section className="py-16 border-t border-slate-200/40 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black">
                Secure shredding for businesses and individuals
              </h2>

              <p className="mt-4 text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Whether you need to destroy archived office files,
                confidential financial records, legal paperwork,
                employee documents, or personal paperwork,
                our London shredding service provides secure,
                compliant, and fully managed disposal.
              </p>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section className="bg-slate-50 py-14 border-t border-slate-200/40">
          <div className="max-w-4xl mx-auto px-4">

            <h2 className="text-2xl font-black mb-6 text-center">Frequently Asked Questions</h2>

            <div className="space-y-3">
              <details className="border border-slate-200 rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  Is your shredding service GDPR compliant?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes, all shredding processes follow GDPR standards with secure handling, strict chain of custody, and certified destruction.
                </p>
              </details>

              <details className="border border-slate-200 rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  Do you provide a certificate of destruction?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes, we provide an official certificate of destruction after shredding for compliance and record keeping.
                </p>
              </details>

              <details className="border border-slate-200 rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  Do you offer document shredding collection in London?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes, we provide secure collection services across London. We pick up your documents and shred them securely.
                </p>
              </details>

              <details className="border border-slate-200 rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  What types of documents can be shredded?
                </summary>
                <p className="mt-3 text-slate-600">
                  We shred financial records, legal documents, business paperwork, and personal files securely and safely.
                </p>
              </details>

              <details className="border border-slate-200 rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  How much does document shredding cost in London?
                </summary>
                <p className="mt-3 text-slate-600">
                  Pricing depends on the volume of documents and service type. Use our instant quote tool for accurate pricing.
                </p>
              </details>

              <details className="border border-slate-200 rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  Is your document shredding service secure?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes, we use secure handling, controlled processes, and certified destruction methods to ensure confidentiality.
                </p>
              </details>

              <details className="border border-slate-200 rounded-xl p-5 bg-white">
                <summary className="font-semibold cursor-pointer">
                  Do you offer one-off and business shredding services?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes, we provide both one-time shredding and scheduled business shredding services.
                </p>
              </details>

              <details className="border border-slate-200 rounded-xl p-5 bg-white">
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
                  className="text-emerald-700 hover:underline text-sm"
                >
                  Shredding Solutions in {l.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <MainFooter locations={londonLocations} />
      </main>
    </>
  );
}