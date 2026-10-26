import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Archive,
  Armchair,
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  CalendarRange,
  CheckCircle2,
  ClipboardList,
  HeartPulse,
  Layers,
  Package,
  PackageCheck,
  PartyPopper,
  Phone,
  Rocket,
  Scaling,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
  Warehouse,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustpilotJsonLd from "../components/seo/TrustPilotJsonLD";
import ServiceHero from "../components/ServiceHero";
import AreaMapExplorer from "../components/AreaMapExplorer";
import { londonLocations } from "../lib/location";
import { CONTACT_NUMBERS } from "../lib/contact";

export const metadata: Metadata = {
  title: "Business Storage London | Collection & Delivery | KXH",
  description:
    "Business storage in London with collection from your premises, secure managed warehouse storage, organised inventory and return delivery. Get a quote.",
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
        url: "/images/kxh-business-storage-london.webp",
        width: 1600,
        height: 900,
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
      telephone: "+44 20 3916 5312",
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

const storageTypeIcons = [Package, Armchair, Boxes, Layers];
const problemIcons = [Building2, CalendarRange, Truck, Warehouse];
const whyIcons = [BadgeCheck, Truck, Scaling, ShieldCheck, Rocket, Layers];
const industryIcons: Record<string, typeof Package> = {
  "/ecommerce-storage-london": ShoppingCart,
  "/retail-stock-storage-london": Store,
  "/furniture-storage-london": Armchair,
  "/archive-storage-london": Archive,
  "/event-equipment-storage-london": PartyPopper,
  "/healthcare-storage-london": HeartPulse,
};
const relatedImages: Record<string, string> = {
  "/inventory-management-london": "/images/kxh-inventory-management-london.webp",
  "/warehouse-storage-london": "/images/kxh-collection-delivery-london.webp",
  "/pallet-storage-london": "/images/kxh-pallet-storage-london.webp",
  "/commercial-storage-london": "/images/kxh-commercial-storage-london.webp",
  "/third-party-logistics-london": "/images/kxh-third-party-logistics-london.webp",
};

const comparisonRows = [
  { feature: "Collection from your business", selfStorage: "Usually arranged by your team", warehouseLease: "Your team arranges transport", kxh: "Collection can be arranged across London" },
  { feature: "Return delivery", selfStorage: "Your team collects stored items", warehouseLease: "Your team manages retrieval and transport", kxh: "Selected-item or full return delivery available" },
  { feature: "Storage capacity", selfStorage: "Limited to the unit size rented", warehouseLease: "Fixed warehouse size", kxh: "Capacity can change with business requirements" },
  { feature: "Warehouse management", selfStorage: "You organise and manage the unit", warehouseLease: "Your business manages the facility", kxh: "Professionally managed warehouse storage" },
  { feature: "Inventory organisation", selfStorage: "Managed by your own team", warehouseLease: "Requires internal staff and processes", kxh: "Physical inventory organisation available" },
  { feature: "Property commitment", selfStorage: "Separate unit rental", warehouseLease: "Longer commercial lease and overhead", kxh: "No separate warehouse lease required" },
];

const whyItems = [
  { title: "Business Storage Specialists", description: "Managed business, commercial, warehouse, and ecommerce storage across London." },
  { title: "Door-to-Door Service", description: "Collection, organised warehouse storage, and return delivery without repeated self-storage visits." },
  { title: "Flexible Storage Capacity", description: "Increase or reduce storage as stock levels and operational requirements change." },
  { title: "Secure Warehouse", description: "Business inventory stored in a professionally managed commercial warehouse." },
  { title: "Supports Growing Businesses", description: "Suitable for startups, retailers, ecommerce brands, importers, wholesalers, and offices." },
  { title: "Complete Storage Solution", description: "Business storage supported by inventory management, pallet storage, warehouse storage, and logistics." },
];

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] ${light ? "bg-white/10 text-emerald-300" : "bg-emerald-50 text-emerald-700"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-emerald-300" : "bg-emerald-600"}`} />
      {children}
    </p>
  );
}

export default function BusinessStoragePage() {
  const availableIndustries = industries.filter((industry) => industry.available);

  return (
    <>
      <CrispChat />
      <Nav />

      <main className="min-h-screen bg-white text-slate-900">
        <ServiceJsonLd />
        <FAQJsonLd />
        <BreadcrumbJsonLd />
        <TrustpilotJsonLd />

        {/* HERO */}
        <ServiceHero
          image="/images/kxh-business-storage-london.webp"
          imageAlt="Business stock and office equipment stored inside the KXH warehouse in London"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Business Storage London" }]}
          eyebrow="Door-to-door business storage"
          title="Business Storage London with Collection & Return Delivery"
          highlight="Collection & Return Delivery"
          intro="We collect business items from your premises, store them securely, organise them and deliver them back when required. Pay only for the boxes, items, stock and pallets you store, without renting a whole unit or leasing more space."
          chips={coreBenefits}
          ctaHref="/get-a-quote?service=storage"
          ctaLabel="Get Business Storage Quote"
          cardEyebrow="What we store"
          cardTitle="Storage for every business"
          cardItems={storageTypes.map((t, i) => {
            const Icon = storageTypeIcons[i % storageTypeIcons.length];
            return { icon: <Icon className="h-6 w-6" aria-hidden="true" />, title: t.title, text: t.description.split(",")[0] };
          })}
        />

        {/* PROCESS */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="kxh-reveal mx-auto max-w-3xl text-center">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl lg:text-5xl">We collect, store, organise and return</h2>
              <p className="mt-4 text-lg text-slate-600">
                A managed storage service that removes the need for van hire, warehouse leases and repeated self-storage visits.
              </p>
            </div>
            <ol className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <span className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-400 to-emerald-100 lg:block" aria-hidden="true" />
              {processSteps.map((step, i) => {
                const Icon = [ClipboardList, Truck, Warehouse, PackageCheck][i];
                return (
                  <li key={step.number} className="kxh-reveal kxh-card3d group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" style={{ transitionDelay: `${i * 80}ms` }}>
                    <span className="kxh-pop relative flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                      <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">{step.number}</span>
                    </span>
                    <h3 className="mt-6 text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* PRICING */}
        <section className="border-t border-slate-200/70 bg-slate-50 py-16 lg:py-24">
          <div className="mx-auto grid max-w-screen-xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="kxh-reveal">
              <Eyebrow>Flexible pricing</Eyebrow>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Pay for the storage your business uses</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Your quote reflects what you need to store rather than the cost of an entire unit that may remain partly empty.
              </p>
              <p className="mt-4 leading-7 text-slate-600">
                Pricing can account for the type and quantity of boxes, individual items or pallets, the storage duration, collection, handling and return delivery.
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                Collection, storage, handling and return-delivery charges are calculated according to your items, locations, storage term and service requirements.
              </p>
              <Link
                href="/get-a-quote?service=storage"
                className="kxh-shine relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-emerald-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-700/25 transition hover:-translate-y-0.5 hover:bg-emerald-800"
              >
                Calculate your storage quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {storageTypes.map((type, i) => {
                const Icon = storageTypeIcons[i % storageTypeIcons.length];
                return (
                  <article key={type.title} className="kxh-reveal kxh-card3d group rounded-3xl border border-slate-200 bg-white p-6" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                    <span className="kxh-pop flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">{type.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{type.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* BUSINESS PROBLEMS */}
        <section className="relative overflow-hidden bg-[#04140f] py-16 text-white lg:py-24">
          <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-emerald-600/25 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="kxh-reveal mx-auto max-w-3xl text-center">
              <Eyebrow light>Make space for growth</Eyebrow>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl" style={{ color: "#fff" }}>
                Your office, shop or studio should not become your <span className="text-emerald-300">warehouse</span>
              </h2>
              <p className="mt-5 text-slate-300">
                Free up valuable working space, avoid unnecessary property overhead and scale storage around the changing needs of your business.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {businessProblems.map((problem, i) => {
                const Icon = problemIcons[i % problemIcons.length];
                return (
                  <article key={problem.title} className="kxh-reveal group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-white/[0.08]" style={{ transitionDelay: `${i * 70}ms` }}>
                    <Icon className="h-8 w-8 text-emerald-300 transition group-hover:scale-110" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-bold" style={{ color: "#fff" }}>{problem.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{problem.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* MANAGED STORAGE */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto grid max-w-screen-xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="kxh-reveal relative">
              <div className="absolute -inset-4 -z-10 -rotate-2 rounded-[2rem] bg-gradient-to-br from-emerald-200 to-lime-100" aria-hidden="true" />
              <div className="overflow-hidden rounded-[1.75rem] shadow-2xl">
                <Image
                  src="/images/kxh-collection-delivery-london.webp"
                  alt="KXH collecting storage items from a London business"
                  width={1600}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-[320px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[440px]"
                />
              </div>
            </div>
            <div className="kxh-reveal">
              <Eyebrow>Managed door-to-door storage</Eyebrow>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">No van hire. No storage-unit visits. No extra premises.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                KXH collects from offices, shops, warehouses, studios and approved commercial locations across London.
              </p>
              <p className="mt-4 leading-7 text-slate-600">
                When your team needs items back, request the relevant boxes, inventory, equipment, furniture or pallets and arrange scheduled delivery.
              </p>
              <p className="mt-4 leading-7 text-slate-600">
                Businesses looking for specialist storage can also explore our{" "}
                <Link href="/ecommerce-storage-london" className="font-semibold text-emerald-700 hover:underline">Ecommerce Storage</Link>,{" "}
                <Link href="/inventory-management-london" className="font-semibold text-emerald-700 hover:underline">Inventory Management</Link> and{" "}
                <Link href="/pallet-storage-london" className="font-semibold text-emerald-700 hover:underline">Pallet Storage</Link> services.
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Collection from business premises", "Secure managed warehouse storage", "Organised physical inventory records", "Selected-item or full return requests", "Scheduled return delivery"].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* INDUSTRY PAGES */}
        <section className="border-t border-slate-200/70 bg-slate-50 py-16 lg:py-24">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="kxh-reveal mx-auto max-w-3xl text-center">
              <Eyebrow>Storage by business type</Eyebrow>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Storage designed around your industry</h2>
              <p className="mt-4 text-slate-600">
                Explore storage solutions based on the products, equipment, furniture, documents and operational materials your company needs to manage.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {availableIndustries.map((industry, i) => {
                const Icon = industryIcons[industry.href] ?? Package;
                return (
                  <Link key={industry.href} href={industry.href} className="kxh-reveal kxh-card3d group rounded-3xl border border-slate-200 bg-white p-6" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                    <span className="kxh-pop flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">{industry.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{industry.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                      Explore storage options <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="kxh-reveal mx-auto max-w-3xl text-center">
              <Eyebrow>Compare your storage options</Eyebrow>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Self storage vs warehouse lease vs KXH business storage</h2>
              <p className="mt-4 text-slate-600">
                Compare renting a self-storage unit, leasing your own warehouse and using KXH managed business storage with collection, organised handling and return delivery.
              </p>
            </div>

            <div className="kxh-reveal mt-12 hidden overflow-hidden rounded-3xl border border-slate-200 shadow-xl md:block">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Comparison of self storage, a warehouse lease and KXH managed business storage</caption>
                <thead>
                  <tr className="bg-slate-950 text-white">
                    <th scope="col" className="p-5 font-bold">Service feature</th>
                    <th scope="col" className="p-5 text-center font-bold">Self storage</th>
                    <th scope="col" className="p-5 text-center font-bold">Warehouse lease</th>
                    <th scope="col" className="bg-emerald-600 p-5 text-center font-bold">KXH managed storage</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-t border-slate-200 transition hover:bg-slate-50">
                      <th scope="row" className="bg-slate-50 p-5 font-semibold text-slate-900">{row.feature}</th>
                      <td className="p-5 leading-6 text-slate-600">{row.selfStorage}</td>
                      <td className="p-5 leading-6 text-slate-600">{row.warehouseLease}</td>
                      <td className="bg-emerald-50 p-5 font-medium leading-6 text-slate-900">
                        <span className="inline-flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                          {row.kxh}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 grid gap-4 md:hidden">
              {comparisonRows.map((row) => (
                <article key={row.feature} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <h3 className="bg-slate-950 px-5 py-4 font-bold" style={{ color: "#fff" }}>{row.feature}</h3>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Self storage</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{row.selfStorage}</p>
                  </div>
                  <div className="border-t border-slate-200 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Warehouse lease</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{row.warehouseLease}</p>
                  </div>
                  <div className="border-t border-emerald-100 bg-emerald-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">KXH managed storage</p>
                    <p className="mt-1 text-sm font-medium leading-6 text-slate-900">✓ {row.kxh}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/get-a-quote?service=storage"
                className="kxh-shine relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-emerald-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-700/25 transition hover:-translate-y-0.5 hover:bg-emerald-800"
              >
                Compare your storage requirements <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* WHY KXH */}
        <section className="border-t border-slate-200/70 bg-slate-50 py-16 lg:py-24">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="kxh-reveal mx-auto max-w-3xl text-center">
              <Eyebrow>Trusted business storage partner</Eyebrow>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Why London businesses choose KXH Storage &amp; Logistics</h2>
              <p className="mt-4 text-slate-600">
                Businesses choose KXH because we provide more than warehouse space: collection, managed storage, organised inventory handling and return delivery that adapts as your requirements change.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {whyItems.map((item, i) => {
                const Icon = whyIcons[i % whyIcons.length];
                return (
                  <article key={item.title} className="kxh-reveal kxh-card3d group rounded-3xl border border-slate-200 bg-white p-7" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                    <span className="kxh-pop flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* INVENTORY */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto grid max-w-screen-xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="kxh-reveal">
              <Eyebrow>Beyond basic storage</Eyebrow>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Keep stored business inventory organised</h2>
              <p className="mt-4 leading-7 text-slate-600">
                KXH works as a door-to-door storage provider while also supporting businesses that need clearer physical inventory organisation and warehouse handling.
              </p>
              <p className="mt-4 leading-7 text-slate-600">
                This service concerns real stored products, boxes, cartons, equipment and pallets, not standalone inventory software.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {inventoryBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /> {benefit}
                  </div>
                ))}
              </div>
              <Link
                href="/inventory-management-london"
                className="kxh-shine relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-emerald-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-700/25 transition hover:-translate-y-0.5 hover:bg-emerald-800"
              >
                Explore inventory management <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="kxh-reveal relative">
              <div className="absolute -inset-4 -z-10 rotate-2 rounded-[2rem] bg-gradient-to-br from-emerald-200 to-lime-100" aria-hidden="true" />
              <div className="overflow-hidden rounded-[1.75rem] shadow-2xl">
                <Image
                  src="/images/kxh-inventory-management-london.webp"
                  alt="Business inventory organised on warehouse racking in London"
                  width={1600}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-[320px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[440px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CUSTOMER FIT */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="kxh-reveal mx-auto max-w-screen-xl rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-7 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <Eyebrow>Is KXH right for you?</Eyebrow>
                <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Is KXH business storage right for your company?</h2>
                <p className="mt-4 leading-7 text-slate-700">
                  KXH suits businesses that prefer collection, managed storage, organisation and return delivery over unrestricted access to a self-storage unit.
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {reasonsToChooseKxh.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-white p-4 font-medium text-slate-800 shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /> {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* LONDON COVERAGE */}
        <section id="areas" className="border-t border-slate-200/70 bg-slate-50 py-16 lg:py-24">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="kxh-reveal max-w-3xl">
              <Eyebrow>London coverage</Eyebrow>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Business storage across Greater London</h2>
              <p className="mt-4 text-slate-600">
                Tap an area to see it on the map. KXH provides collection, managed warehouse storage, inventory organisation and return delivery for businesses throughout Greater London.
              </p>
            </div>
            <div className="mt-10">
              <AreaMapExplorer primaryHref="/business-storage-london" />
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {londonLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/business-storage-london/${location.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-800"
                >
                  Business Storage {location.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED SERVICES */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="kxh-reveal mx-auto max-w-3xl text-center">
              <Eyebrow>Related services</Eyebrow>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Related storage &amp; logistics services</h2>
              <p className="mt-4 text-slate-600">
                Combine managed storage with inventory handling, pallet capacity, warehouse services and logistics support.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {relatedServices.map((service, i) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="kxh-reveal kxh-card3d group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-3xl bg-slate-900"
                  style={{ transitionDelay: `${(i % 5) * 60}ms` }}
                >
                  <Image
                    src={relatedImages[service.href] ?? "/images/kxh-business-storage-london.webp"}
                    alt={`${service.title} in London`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover opacity-90 transition duration-700 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" aria-hidden="true" />
                  <span className="kxh-pop relative p-5">
                    <span className="block text-lg font-black text-white">{service.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-200">{service.description}</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-300">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection />

        {/* FINAL CTA */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="kxh-reveal relative mx-auto max-w-screen-xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 px-6 py-14 text-center shadow-2xl sm:px-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime-300/20 blur-3xl" aria-hidden="true" />
            <p className="relative text-sm font-bold uppercase tracking-[0.18em] text-emerald-200">Flexible business storage</p>
            <h2 className="relative mx-auto mt-3 max-w-3xl text-3xl font-black sm:text-4xl lg:text-5xl" style={{ color: "#fff" }}>
              Free up business space without leasing more premises
            </h2>
            <p className="relative mx-auto mt-5 max-w-2xl text-emerald-50/90">
              Get a quote for collection, secure managed storage, inventory organisation and return delivery across London.
            </p>
            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/get-a-quote?service=storage"
                className="kxh-shine relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-white px-8 py-4 text-sm font-bold text-emerald-800 shadow-xl transition hover:-translate-y-0.5"
              >
                Get Business Storage Quote <ArrowRight className="h-4 w-4" />
              </Link>
              {CONTACT_NUMBERS.map((contact) => (
                <a
                  key={contact.href}
                  href={contact.href}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/30 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" /> Call {contact.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-slate-200/70 bg-slate-50 py-16 lg:py-20">
          <div className="mx-auto grid max-w-screen-xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div className="kxh-reveal">
              <Eyebrow>FAQs</Eyebrow>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Business storage FAQs</h2>
              <p className="mt-4 text-slate-600">Can’t find your answer? Call us any time on 020 3916 5312.</p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="kxh-reveal group rounded-2xl border border-slate-200 bg-white p-5 transition open:border-emerald-300 open:shadow-lg">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">
                    {faq.question}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-lg text-emerald-700 transition group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <MainFooter locations={londonLocations} />
      </main>
    </>
  );
}
