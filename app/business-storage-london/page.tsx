import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustpilotJsonLd from "../components/seo/TrustPilotJsonLD";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import { londonLocations } from "../lib/location";

export const metadata: Metadata = {
  title:
    "Business Storage London | Secure Managed Storage with Collection",
  description:
    "Door-to-door business storage in London with collection, secure warehouse storage, organised inventory, pallet support, and return delivery.",
  alternates: {
    canonical: "https://kxhlogistics.co.uk/business-storage-london",
  },
  openGraph: {
    type: "website",
    url: "https://kxhlogistics.co.uk/business-storage-london",
    title:
      "Business Storage London | KXH Storage & Logistics",
    description:
      "Flexible managed business storage with collection, secure warehouse storage, inventory organisation, pallet support, and return delivery across London.",
    images: [
      {
        url: "/images/business-storage/business-storage-london-warehouse-inventory.webp",
        width: 1200,
        height: 630,
        alt: "Business stock stored inside a managed London warehouse",
      },
    ],
  },
};

const coreBenefits = [
  "Pay for the storage you use",
  "Collection from your business",
  "Boxes, items, stock and pallets",
  "Return delivery available",
];

const processSteps = [
  {
    number: "1",
    title: "Get a Quote",
    description:
      "Tell us what you need to store, where it should be collected, and how long you expect to store it.",
  },
  {
    number: "2",
    title: "We Collect",
    description:
      "Our team collects boxes, inventory, equipment, furniture, documents, or pallets from your London premises.",
  },
  {
    number: "3",
    title: "We Store",
    description:
      "Your items are professionally handled, organised, and placed into secure managed warehouse storage.",
  },
  {
    number: "4",
    title: "We Return",
    description:
      "Request selected items or your full stored load when your business needs them back.",
  },
];

const storageTypes = [
  {
    title: "Box Storage",
    description:
      "Documents, packaged products, office supplies, promotional materials, and smaller business items.",
  },
  {
    title: "Individual Items",
    description:
      "Office furniture, IT equipment, display materials, machinery, and commercial assets.",
  },
  {
    title: "Stock Storage",
    description:
      "Ecommerce inventory, retail overflow, seasonal goods, returned products, and packaging.",
  },
  {
    title: "Pallet Storage",
    description:
      "Wholesale stock, imported products, cartons, bulk inventory, and larger commercial loads.",
  },
];

const businessProblems = [
  {
    title: "Running Out of Workspace",
    description:
      "Move stock, archives, supplies, and equipment out of valuable offices, shops, studios, or operational areas.",
  },
  {
    title: "Seasonal Inventory Peaks",
    description:
      "Increase storage during Black Friday, Christmas, product launches, campaigns, and other busy periods.",
  },
  {
    title: "Office Moves and Renovations",
    description:
      "Store furniture, technology, documents, and equipment during relocation, refurbishment, or downsizing.",
  },
  {
    title: "Avoiding Larger Premises",
    description:
      "Add flexible storage capacity without committing to another warehouse or a larger commercial lease.",
  },
];

const industries = [
  {
    title: "Ecommerce Storage",
    href: "/ecommerce-storage-london",
    description:
      "Products, packaging materials, returned goods, seasonal inventory, and stock for online retailers.",
    available: true,
  },
  {
    title: "Retail Stock Storage",
    href: "/retail-stock-storage-london",
    description:
      "Overflow retail stock, seasonal collections, shop fittings, promotional displays, and merchandising equipment.",
    available: true,
  },
  {
    title: "Furniture Storage",
    href: "/furniture-storage-london",
    description:
      "Office furniture, IT equipment, archived documents, business assets, and workplace storage during relocations or refurbishments.",
    available: true,
  },
  {
    title: "Archive Storage",
    href: "/archive-storage-london",
    description:
      "Secure long-term storage for business records, legal files, financial documents, and confidential archives.",
    available: true,
  },
  {
    title: "Construction Equipment Storage",
    href: "/construction-equipment-storage-london",
    description:
      "Secure storage for tools, machinery, building materials, and contractor equipment with collection and delivery.",
    available: false,
  },
  {
    title: "Event Equipment Storage",
    href: "/event-equipment-storage-london",
    description:
      "Storage for exhibition stands, promotional materials, AV equipment, furniture, and event supplies.",
    available: true,
  },
  {
    title: "Healthcare Storage",
    href: "/healthcare-storage-london",
    description:
      "Managed storage for medical supplies, healthcare equipment, records, and operational inventory.",
    available: true,
  },
  {
    title: "School Storage",
    href: "/school-storage-london",
    description:
      "Flexible storage for classroom furniture, teaching resources, archives, sports equipment, and school supplies.",
    available: false,
  },
  {
    title: "Hospitality Storage",
    href: "/hospitality-storage-london",
    description:
      "Storage for hotel furniture, restaurant equipment, seasonal décor, catering supplies, and hospitality inventory.",
    available: false,
  },
  {
    title: "Seasonal Business Storage",
    href: "/seasonal-business-storage-london",
    description:
      "Flexible warehouse storage for seasonal stock, promotional inventory, holiday merchandise, and peak trading periods.",
    available: false,
  },
];

const inventoryBenefits = [
  "Physical inventory organisation",
  "Item records and categorisation",
  "Stock identification support",
  "Selected-item return requests",
  "Collection and delivery coordination",
  "Boxes, cartons and pallet support",
];

const reasonsToChooseKxh = [
  "You want items collected from your premises",
  "You do not want to visit a self-storage unit",
  "Your storage requirements change during the year",
  "You store a mixture of boxes, stock, equipment, or pallets",
  "You want to avoid leasing larger commercial premises",
  "You need stored items delivered back when required",
];

const relatedServices = [
  {
    title: "Inventory Management",
    href: "/inventory-management-london",
    description:
      "Organised physical inventory storage, warehouse handling, and return-request support.",
  },
  {
    title: "Warehouse Storage",
    href: "/warehouse-storage-london",
    description:
      "Flexible managed warehouse storage with collection and delivery.",
  },
  {
    title: "Pallet Storage",
    href: "/pallet-storage-london",
    description:
      "Bulk inventory and palletised stock storage for growing businesses.",
  },
  {
    title: "Commercial Storage",
    href: "/commercial-storage-london",
    description:
      "Storage for equipment, assets, archives, stock, and commercial materials.",
  },
  {
    title: "Third Party Logistics",
    href: "/third-party-logistics-london",
    description:
      "Inventory handling, warehouse operations, and delivery coordination.",
  },
];

const faqs = [
  {
    question: "What is business storage?",
    answer:
      "Business storage allows companies to store stock, equipment, documents, furniture, supplies, and operational items in a managed warehouse without leasing additional premises.",
  },
  {
    question: "How much does business storage cost?",
    answer:
      "Pricing depends on the quantity and type of boxes, individual items or pallets stored, the storage duration, collection requirements, and return-delivery needs.",
  },
  {
    question: "Do I need to rent an entire storage unit?",
    answer:
      "No. KXH provides managed storage based on the items and storage capacity your business actually requires.",
  },
  {
    question: "Do you collect items from my business?",
    answer:
      "Yes. We can collect from offices, shops, warehouses, studios, commercial premises, and other approved London locations.",
  },
  {
    question: "Can I increase or reduce my storage?",
    answer:
      "Yes. Your storage requirement can be reviewed as stock levels and operational needs change.",
  },
  {
    question: "Can you store boxes, individual items, and pallets?",
    answer:
      "Yes. KXH can support boxes, office equipment, furniture, business stock, cartons, commercial assets, and palletised goods, subject to suitability.",
  },
  {
    question: "How does inventory organisation work?",
    answer:
      "Stored items are organised through warehouse handling and inventory-record processes so they can be identified and requested more efficiently.",
  },
  {
    question: "Can I request selected items back?",
    answer:
      "Where supported by the selected service, you can request particular boxes, items, stock, or pallets rather than returning the full storage load.",
  },
  {
    question: "How do I request return delivery?",
    answer:
      "Return delivery requests are submitted through our online request form, similar to requesting a storage quote. Tell us which stored items you need returned, where they should be delivered, and your preferred delivery date. After reviewing your request, the KXH team will confirm availability, delivery arrangements, and any applicable charges before scheduling the return."
  },
  {
    question: "Is there a minimum storage period?",
    answer:
      "Minimum storage periods may depend on the item type and selected service. Your applicable storage term will be confirmed before booking.",
  },
  {
    question: "Can you collect from multiple business locations?",
    answer:
      "Yes. Depending on your storage requirements, KXH can arrange collection from multiple approved business locations across London. Speak with our team to discuss your collection requirements."
  },
  {
    question: "Can I access only part of my stored items?",
    answer:
      "Yes. If you only require selected boxes, equipment, stock, or pallets, contact our team and we can arrange retrieval and return delivery for the required items rather than your entire stored load."
  },
];

function ServiceJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://kxhlogistics.co.uk/business-storage-london#service",
    name: "Business Storage London",
    serviceType: "Business Storage",
    url: "https://kxhlogistics.co.uk/business-storage-london",
    description:
      "Door-to-door business storage in London with collection, secure warehousing, inventory organisation, and return delivery.",
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://kxhlogistics.co.uk/#business",
      name: "KXH Storage & Logistics",
      url: "https://kxhlogistics.co.uk",
      telephone: "+44 1474 396663",
    },
    areaServed: {
      "@type": "City",
      name: "London",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      url: "https://kxhlogistics.co.uk/get-a-quote?service=storage",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

function FAQJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
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
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

export default function BusinessStoragePage() {
  const availableIndustries = industries.filter(
    (industry) => industry.available,
  );

  return (
    <>
      <CrispChat />
      <Nav />

      <main className="min-h-screen bg-white text-slate-900">
        <ServiceJsonLd />
        <FAQJsonLd />
        <BreadcrumbJsonLd />
        <TrustpilotJsonLd />

        {/* BREADCRUMB */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-6xl overflow-x-auto px-5 pt-4 text-xs text-slate-500 sm:px-6 sm:pt-6 sm:text-sm lg:px-8"
        >
          <Link href="/" className="transition hover:text-emerald-700">
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/services"
            className="transition hover:text-emerald-700"
          >
            Services
          </Link>

          <span className="mx-2">/</span>

          <span className="font-medium text-slate-700">
            Business Storage London
          </span>
        </nav>

        {/* HERO */}
        <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Door-to-Door Business Storage
            </div>

            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
              Business Storage London with Collection & Return Delivery
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              We collect business items from your premises, store them
              securely, organise them, and deliver them back when required.
            </p>

            <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
              Pay for the boxes, individual items, inventory, pallets, and
              storage capacity your business uses—without renting an entire
              storage unit or leasing more commercial space.
            </p>

            <div className="mx-auto mt-7 grid max-w-4xl grid-cols-1 gap-3 min-[430px]:grid-cols-2 lg:grid-cols-4">
              {coreBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
                >
                  ✓ {benefit}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/get-a-quote?service=storage"
                className="w-full rounded-xl bg-emerald-700 px-6 py-4 text-center font-semibold text-white shadow-lg transition hover:bg-emerald-800 sm:w-auto"
              >
                Get Business Storage Quote
              </Link>

              <a
                href="tel:+447386277785"
                className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              >
                Call KXH
              </a>
            </div>

            <div className="mt-6 flex justify-center">
              <TrustpilotPill />
            </div>

            <div className="mt-12">
              <Image
                src="/images/business-storage/business-storage-london-warehouse-inventory.webp"
                alt="Business stock stored inside a managed London warehouse"
                width={1200}
                height={800}
                quality={80}
                sizes="(max-width: 768px) 100vw, 960px"
                className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                How It Works
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                We Collect, Store, Organise and Return
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                A managed storage service that removes the need for van hire,
                warehouse leases, and repeated self-storage visits.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {processSteps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
                >
                  <span className="text-sm font-black text-emerald-700">
                    {step.number}
                  </span>

                  <h3 className="mt-4 text-xl font-bold">{step.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="bg-slate-50 py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Flexible Pricing
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Pay for the Storage Your Business Uses
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Your quote reflects what you need to store rather than the
                cost of an entire unit that may remain partly empty.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                Pricing can account for the type and quantity of boxes,
                individual items or pallets, the storage duration, collection,
                handling, and return delivery.
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Collection, storage, handling, and return-delivery charges are
                calculated according to your items, locations, storage term,
                and service requirements.
              </p>

              <Link
                href="/get-a-quote?service=storage"
                className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
              >
                Calculate Your Storage Quote
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {storageTypes.map((type) => (
                <article
                  key={type.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <h3 className="font-bold text-slate-900">{type.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {type.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BUSINESS PROBLEMS */}
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Make Space for Growth
              </p>

              <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                Your Office, Shop or Studio Should Not Become Your{" "}
                <span className="text-emerald-700">
                  Warehouse
                </span>
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Free up valuable working space, avoid unnecessary property
                overhead, and scale storage around the changing needs of your
                business.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {businessProblems.map((problem) => (
                <article
                  key={problem.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <h3 className="text-lg font-bold text-slate-950">{problem.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {problem.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MANAGED STORAGE */}
        <section className="bg-slate-50 py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <Image
              src="/images/business-storage/business-storage-pickup-delivery-london.webp"
              alt="KXH collecting storage items from a London business"
              width={1200}
              height={800}
              quality={75}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
              loading="lazy"
              decoding="async"
            />

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Managed Door-to-Door Storage
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                No Van Hire. No Storage-Unit Visits. No Extra Premises.
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                KXH collects from offices, shops, warehouses, studios, and
                approved commercial locations across London.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                When your team needs items back, request the relevant boxes,
                inventory, equipment, furniture, or pallets and arrange
                scheduled delivery.
              </p>
              <p className="mt-4 leading-7 text-slate-600">
                Businesses looking for specialist storage can also explore our{" "}
                <Link
                  href="/ecommerce-storage-london"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  Ecommerce Storage
                </Link>
                ,{" "}
                <Link
                  href="/inventory-management-london"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  Inventory Management
                </Link>
                {" "}and{" "}
                <Link
                  href="/pallet-storage-london"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  Pallet Storage
                </Link>
                {" "}services.
              </p>

              <ul className="mt-7 space-y-3 text-sm font-medium text-slate-700 sm:text-base">
                <li>✓ Collection from business premises</li>
                <li>✓ Secure managed warehouse storage</li>
                <li>✓ Organised physical inventory records</li>
                <li>✓ Selected-item or full return requests</li>
                <li>✓ Scheduled return delivery</li>
              </ul>
            </div>
          </div>
        </section>
        {/* INDUSTRY PAGES */}
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Storage by Business Type
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Storage Designed Around Your Industry
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Explore storage solutions based on the products, equipment,
                furniture, documents, and operational materials your company
                needs to manage.
              </p>
            </div>

            <div
              className={`mt-12 grid gap-6 ${availableIndustries.length === 1
                ? "mx-auto max-w-xl"
                : "md:grid-cols-2 lg:grid-cols-4"
                }`}
            >
              {availableIndustries.map((industry) => (
                <Link
                  key={industry.href}
                  href={industry.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm sm:p-6"
                >
                  <h3 className="text-lg font-bold text-slate-900">
                    {industry.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {industry.description}
                  </p>

                  <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                    Explore storage options →
                  </span>
                </Link>
              ))}
            </div>


          </div>
        </section>
        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Compare Your Storage Options
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Self Storage vs Warehouse Lease vs KXH Business Storage
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Compare the differences between renting a self-storage unit, leasing
                your own warehouse, and using KXH managed business storage with
                collection, organised handling, and return delivery.
              </p>
            </div>

            {/* DESKTOP TABLE */}
            <div className="mt-12 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
              <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr] bg-emerald-800 text-sm font-bold text-white">
                <div className="p-5">Service Feature</div>

                <div className="border-l border-white/10 p-5 text-center">
                  Self Storage
                </div>

                <div className="border-l border-white/10 p-5 text-center">
                  Warehouse Lease
                </div>

                <div className="border-l border-white/10 p-5 text-center">
                  KXH Managed Storage
                </div>
              </div>

              {[
                {
                  feature: "Collection from your business",
                  selfStorage: "Usually arranged by your team",
                  warehouseLease: "Your team arranges transport",
                  kxh: "Collection can be arranged across London",
                },
                {
                  feature: "Return delivery",
                  selfStorage: "Your team collects stored items",
                  warehouseLease: "Your team manages retrieval and transport",
                  kxh: "Selected-item or full return delivery available",
                },
                {
                  feature: "Storage capacity",
                  selfStorage: "Limited to the unit size rented",
                  warehouseLease: "Fixed warehouse size",
                  kxh: "Capacity can change with business requirements",
                },
                {
                  feature: "Warehouse management",
                  selfStorage: "You organise and manage the unit",
                  warehouseLease: "Your business manages the facility",
                  kxh: "Professionally managed warehouse storage",
                },
                {
                  feature: "Inventory organisation",
                  selfStorage: "Managed by your own team",
                  warehouseLease: "Requires internal staff and processes",
                  kxh: "Physical inventory organisation available",
                },
                {
                  feature: "Property commitment",
                  selfStorage: "Separate unit rental",
                  warehouseLease: "Longer commercial lease and overhead",
                  kxh: "No separate warehouse lease required",
                },
              ].map((row) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-[1.1fr_1fr_1fr_1fr] border-t border-slate-200 text-sm"
                >
                  <div className="bg-slate-100 p-5 font-semibold text-slate-900">
                    {row.feature}
                  </div>

                  <div className="border-l border-slate-200 p-5 leading-6 text-slate-600">
                    {row.selfStorage}
                  </div>

                  <div className="border-l border-slate-200 p-5 leading-6 text-slate-600">
                    {row.warehouseLease}
                  </div>

                  <div className="border-l border-slate-200 bg-emerald-50 p-5 font-medium leading-6 text-slate-900">
                    <span className="mr-2 text-emerald-700">✓</span>
                    {row.kxh}
                  </div>
                </div>
              ))}
            </div>

            {/* MOBILE CARDS */}
            <div className="mt-10 grid gap-5 md:hidden">
              {[
                {
                  feature: "Collection from your business",
                  selfStorage: "Usually arranged by your team",
                  warehouseLease: "Your team arranges transport",
                  kxh: "Collection can be arranged across London",
                },
                {
                  feature: "Return delivery",
                  selfStorage: "Your team collects stored items",
                  warehouseLease: "Your team manages retrieval and transport",
                  kxh: "Selected-item or full return delivery available",
                },
                {
                  feature: "Storage capacity",
                  selfStorage: "Limited to the unit size rented",
                  warehouseLease: "Fixed warehouse size",
                  kxh: "Capacity can change with business requirements",
                },
                {
                  feature: "Warehouse management",
                  selfStorage: "You organise and manage the unit",
                  warehouseLease: "Your business manages the facility",
                  kxh: "Professionally managed warehouse storage",
                },
                {
                  feature: "Inventory organisation",
                  selfStorage: "Managed by your own team",
                  warehouseLease: "Requires internal staff and processes",
                  kxh: "Physical inventory organisation available",
                },
                {
                  feature: "Property commitment",
                  selfStorage: "Separate unit rental",
                  warehouseLease: "Longer commercial lease and overhead",
                  kxh: "No separate warehouse lease required",
                },
              ].map((row) => (
                <article
                  key={row.feature}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <h3 className="bg-emerald-800 px-5 py-4 font-bold text-white">
                    {row.feature}
                  </h3>

                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Self storage
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {row.selfStorage}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Warehouse lease
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {row.warehouseLease}
                    </p>
                  </div>

                  <div className="border-t border-emerald-100 bg-emerald-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                      KXH managed storage
                    </p>

                    <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
                      ✓ {row.kxh}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/get-a-quote?service=storage"
                className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
              >
                Compare Your Storage Requirements
              </Link>
            </div>
          </div>
        </section>
        {/* WHY BUSINESSES TRUST KXH */}

        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Trusted Business Storage Partner
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Why London Businesses Choose KXH Storage & Logistics
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Businesses choose KXH because we provide more than warehouse space.
                We offer collection, managed storage, organised inventory handling,
                and return delivery that adapts as your storage requirements change.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {[
                {
                  title: "Business Storage Specialists",
                  description:
                    "Managed business, commercial, warehouse, and ecommerce storage across London.",
                },
                {
                  title: "Door-to-Door Service",
                  description:
                    "Collection, organised warehouse storage, and return delivery without repeated self-storage visits.",
                },
                {
                  title: "Flexible Storage Capacity",
                  description:
                    "Increase or reduce storage as stock levels and operational requirements change.",
                },
                {
                  title: "Secure Warehouse",
                  description:
                    "Business inventory stored in a professionally managed commercial warehouse.",
                },
                {
                  title: "Supports Growing Businesses",
                  description:
                    "Suitable for startups, retailers, ecommerce brands, importers, wholesalers, and offices.",
                },
                {
                  title: "Complete Storage Solution",
                  description:
                    "Business storage supported by inventory management, pallet storage, warehouse storage, and logistics.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                    ✓
                  </div>

                  <h3 className="text-lg font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}

            </div>
          </div>
        </section>

        {/* INVENTORY DIFFERENTIATOR */}
        <section className="bg-slate-50 py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Evolving Beyond Basic Storage
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Keep Stored Business Inventory Organised
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                KXH competes directly as a door-to-door storage provider while
                also supporting businesses that need clearer physical inventory
                organisation and warehouse handling.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                This service concerns real stored products, boxes, cartons,
                equipment, and pallets—not standalone inventory software.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {inventoryBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
                  >
                    ✓ {benefit}
                  </div>
                ))}
              </div>

              <Link
                href="/inventory-management-london"
                className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
              >
                Explore Inventory Management
              </Link>
            </div>

            <Image
              src="/images/business-storage/inventory-management-business-storage-london.webp"
              alt="Warehouse worker organising and scanning business inventory"
              width={1200}
              height={800}
              quality={75}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        {/* CUSTOMER FIT */}
        <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:rounded-3xl sm:p-10">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Is KXH Business Storage Right for Your Company?
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-700">
                KXH is suitable for businesses that prefer collection,
                managed storage, organisation, and return delivery over
                unrestricted access to a self-storage unit.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {reasonsToChooseKxh.map((reason) => (
                  <div
                    key={reason}
                    className="rounded-xl border border-emerald-100 bg-white p-4 font-medium text-slate-800"
                  >
                    ✓ {reason}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="border-t border-slate-200 bg-slate-50 py-16">

          <div className="mx-auto max-w-6xl px-5">

            <div className="mx-auto max-w-3xl text-center">

              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                London Coverage
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Business Storage Across Greater London
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                KXH provides collection, managed warehouse storage,
                inventory organisation and return delivery for businesses
                throughout Greater London.
              </p>

            </div>

            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3">

              {londonLocations.map((location) => (

                <Link
                  key={location.slug}
                  href={`/business-storage-london/${location.slug}`}
                  className="text-sm font-medium text-emerald-700 hover:underline"
                >
                  Business Storage {location.name}
                </Link>

              ))}

            </div>

          </div>

        </section>
        {/* RELATED SERVICES */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Related Storage & Logistics Services
              </h2>

              <p className="mt-4 text-slate-600">
                Combine managed storage with inventory handling, pallet
                capacity, warehouse services, and logistics support.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {relatedServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-300 hover:bg-white"
                >
                  <h3 className="font-semibold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>

                  <span className="mt-4 inline-block text-xs font-semibold text-emerald-700">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM IMAGE */}
        <section className="border-t border-slate-200 bg-slate-50 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <Image
              src="/images/business-storage/business-storage-warehouse-team-london.webp"
              alt="KXH warehouse team supporting London business storage"
              width={1200}
              height={800}
              quality={75}
              sizes="(max-width: 768px) 100vw, 960px"
              className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        <TestimonialsSection />

        {/* FINAL CTA */}
        <section className="border-t border-emerald-800 bg-emerald-800 py-14 text-center text-white sm:py-20">
          <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide !text-white">
              Flexible Business Storage
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
              Free Up Business Space Without Leasing More Premises
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
              Get a quote for collection, secure managed storage,
              inventory organisation, and return delivery across London.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/get-a-quote?service=storage"
                className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 sm:w-auto sm:px-8"
              >
                Get Business Storage Quote
              </Link>

              <a
                href="tel:+447386277785"
                className="w-full rounded-xl border border-white/20 px-6 py-4 text-center font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:px-8"
              >
                Call KXH
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-slate-200 bg-slate-50 py-12">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Business Storage FAQs
            </h2>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
                >
                  <summary className="cursor-pointer font-semibold">
                    {faq.question}
                  </summary>

                  <p className="mt-3 leading-7 text-slate-600">
                    {faq.answer}
                  </p>
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