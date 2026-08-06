import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustpilotJsonLd from "../components/seo/TrustPilotJsonLD";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import { londonLocations } from "../sitemap";
import { CONTACT_NUMBERS } from "../lib/contact";

export const metadata: Metadata = {
  title: "Inventory Storage with Tracking London | Collection & Delivery | KXH",
  description:
    "Managed inventory storage in London with collection, organised item records, secure warehouse storage, pallet support and return delivery for business stock.",
  alternates: {
    canonical: "https://kxhlogistics.co.uk/inventory-management-london",
  },
  openGraph: {
    title: "Inventory Storage with Tracking London | KXH",
    description:
      "Physical inventory storage for London businesses with collection, organised item records, warehouse storage, pallet support and return delivery.",
    url: "https://kxhlogistics.co.uk/inventory-management-london",
    type: "website",
    images: [
      {
        url: "/images/inventory-management/inventory-management-london-warehouse-stock-handling.webp",
        width: 1200,
        height: 630,
        alt: "Organised business inventory inside a managed London warehouse",
      },
    ],
  },
};

type Benefit = {
  title: string;
  description: string;
};

type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

type CardItem = {
  title: string;
  description: string;
};

type LinkedCardItem = CardItem & {
  href?: string;
  linkLabel?: string;
};

type ComparisonRow = {
  feature: string;
  managed: string;
  selfStorage: string;
};

type RelatedService = {
  title: string;
  href: string;
  description: string;
};

type LondonArea = {
  name: string;
  href: string;
};

type Faq = {
  question: string;
  answer: string;
};

const quoteUrl = "/get-a-quote?service=storage";

const benefits: Benefit[] = [
  {
    title: "Business collection",
    description: "Arrange pickup from your office, shop, workspace or other agreed London location.",
  },
  {
    title: "Organised item records",
    description: "Stored goods can be grouped and recorded using agreed item lists or manifests.",
  },
  {
    title: "Secure warehouse storage",
    description: "Keep stock away from crowded business premises in managed warehouse storage.",
  },
  {
    title: "Return delivery",
    description: "Coordinate retrieval and return delivery when stored inventory is needed again.",
  },
];

const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discuss your inventory",
    description:
      "Tell us what you need to store, the approximate volume, collection location and how you expect to retrieve items.",
  },
  {
    step: "02",
    title: "Collection is arranged",
    description:
      "KXH can coordinate collection of agreed boxes, stock, equipment or pallets from your business premises.",
  },
  {
    step: "03",
    title: "Items are organised and stored",
    description:
      "Inventory is placed into the agreed storage arrangement and can be grouped by box, unit, category or pallet.",
  },
  {
    step: "04",
    title: "Returns are coordinated",
    description:
      "When items are required, contact the team to discuss retrieval and return delivery under your agreed service terms.",
  },
];

const recordFeatures: CardItem[] = [
  {
    title: "Item lists",
    description:
      "Create a practical reference for stored boxes, units, assets or grouped stock under the agreed arrangement.",
  },
  {
    title: "Inventory manifests",
    description:
      "For suitable jobs, stock can be documented in a structured manifest to support clearer stored-item visibility.",
  },
  {
    title: "Category organisation",
    description:
      "Separate ecommerce goods, retail stock, packaging, equipment or project materials into useful categories.",
  },
  {
    title: "Box, unit or pallet identification",
    description:
      "Use practical identifiers so retrieval conversations can refer to the correct stored group or handling unit.",
  },
  {
    title: "Retrieval coordination",
    description:
      "Request the return of agreed inventory without having to operate your own additional warehouse space.",
  },
  {
    title: "Measured stock visibility",
    description:
      "Gain a clearer record of what is in storage without claiming a live software dashboard or real-time stock count.",
  },
];

const problemsSolved: CardItem[] = [
  {
    title: "Your office or shop is full",
    description:
      "Move non-daily stock, supplies or equipment out of working areas while keeping it available for future use.",
  },
  {
    title: "Seasonal stock has increased",
    description:
      "Use additional capacity during busy trading periods without committing to a larger permanent premises.",
  },
  {
    title: "Ecommerce inventory has overflowed",
    description:
      "Store excess products, packaging and returns that no longer fit comfortably in your current workspace.",
  },
  {
    title: "Retail stock is crowding the premises",
    description:
      "Keep overflow goods, promotional stock and seasonal ranges outside the main customer-facing space.",
  },
  {
    title: "Inventory is scattered",
    description:
      "Consolidate stock from multiple rooms or locations into a more organised managed storage arrangement.",
  },
  {
    title: "You are relocating or refurbishing",
    description:
      "Temporarily protect stock, business assets and supplies while premises are moved, reorganised or improved.",
  },
  {
    title: "Slow-moving stock still has value",
    description:
      "Retain archived, project-based or infrequently used inventory without letting it dominate active workspace.",
  },
  {
    title: "Bulk cartons or pallets need space",
    description:
      "Move larger commercial volumes into a storage format that may be more suitable than small room-based storage.",
  },
];

const stockTypes: CardItem[] = [
  { title: "Ecommerce products", description: "Boxed products, returns and supporting packaging materials." },
  { title: "Retail stock", description: "Overflow ranges, promotional goods and seasonal retail inventory." },
  { title: "Packaging materials", description: "Cartons, inserts, branded packaging and dispatch supplies." },
  { title: "Promotional stock", description: "Campaign materials, branded items and point-of-sale resources." },
  { title: "Office supplies", description: "Consumables, spare equipment and non-daily operational items." },
  { title: "Archived documents", description: "Boxed records where storage suitability and handling are agreed." },
  { title: "Event materials", description: "Displays, printed materials, signage and reusable event assets." },
  { title: "Tools and equipment", description: "Suitable trade, project or operational equipment." },
  { title: "Seasonal goods", description: "Inventory held for future campaigns, peaks or trading periods." },
  { title: "Palletised stock", description: "Bulk cartons and commercial goods prepared for pallet storage." },
  { title: "Business assets", description: "Suitable furniture, fixtures and reusable operational items." },
  { title: "Project inventory", description: "Materials reserved for installations, refurbishments or future work." },
];

const businessTypes: LinkedCardItem[] = [
  {
    title: "Ecommerce businesses",
    description:
      "Store products, packaging and overflow inventory outside the home, office or small fulfilment workspace.",
    href: "/ecommerce-storage-london",
    linkLabel: "Explore ecommerce storage",
  },
  {
    title: "Retailers",
    description:
      "Create space for trading by moving seasonal ranges, displays and excess stock into managed storage.",
    href: "/retail-stock-storage-london",
    linkLabel: "Explore retail stock storage",
  },
  {
    title: "Offices",
    description:
      "Store supplies, spare equipment, records and assets that do not need to occupy active office space.",
  },
  {
    title: "Event companies",
    description:
      "Keep reusable stands, signage, printed materials and equipment organised between events.",
  },
  {
    title: "Construction and trade businesses",
    description:
      "Store suitable project stock, fixtures, tools and equipment between jobs or site phases.",
  },
  {
    title: "Education organisations",
    description:
      "Hold suitable resources, equipment and boxed materials during reorganisations or seasonal changeovers.",
  },
  {
    title: "Hospitality businesses",
    description:
      "Store suitable non-perishable supplies, fixtures, promotional items and seasonal equipment.",
  },
  {
    title: "Growing small businesses",
    description:
      "Add storage capacity as stock increases without taking on the overhead of a dedicated warehouse lease.",
    href: "/business-storage-london",
    linkLabel: "Explore business storage",
  },
];

const comparisonRows: ComparisonRow[] = [
  {
    feature: "Collection",
    managed: "Can be arranged as part of the agreed service.",
    selfStorage: "Customers typically transport items themselves unless an add-on is offered.",
  },
  {
    feature: "Transport responsibility",
    managed: "KXH can coordinate collection and return delivery.",
    selfStorage: "Transport is typically organised by the customer.",
  },
  {
    feature: "Item organisation",
    managed: "Stock can be grouped by agreed categories, boxes, units or pallets.",
    selfStorage: "Organisation is typically managed entirely by the customer inside the unit.",
  },
  {
    feature: "Inventory records",
    managed: "Agreed item lists or manifests may support stored-item visibility.",
    selfStorage: "Providers typically do not maintain a detailed customer inventory list.",
  },
  {
    feature: "Pallet support",
    managed: "Suitable palletised and bulk stock can be discussed during quotation.",
    selfStorage: "Suitability varies by provider, unit access and facility rules.",
  },
  {
    feature: "Return delivery",
    managed: "Retrieval and return delivery can be coordinated under the agreed service.",
    selfStorage: "Customers typically collect items directly from their unit.",
  },
  {
    feature: "Warehouse handling",
    managed: "Items are handled within a managed warehouse operation.",
    selfStorage: "Customers typically move and handle their own goods.",
  },
  {
    feature: "Scalability",
    managed: "Storage format can be reviewed as business volume changes.",
    selfStorage: "Customers may need to rent another or larger unit, subject to availability.",
  },
  {
    feature: "Business-stock suitability",
    managed: "Designed around business inventory, operational stock and commercial overflow.",
    selfStorage: "Can suit many uses, but service depth and commercial handling vary.",
  },
  {
    feature: "Need to visit the facility",
    managed: "Return delivery can reduce the need for routine facility visits.",
    selfStorage: "Direct access usually requires visiting the storage location.",
  },
];

const londonAreas: LondonArea[] = [
  { name: "Tower Hamlets", href: "/warehouse-storage-london/tower-hamlets" },
  { name: "Camden", href: "/warehouse-storage-london/camden" },
  { name: "Hackney", href: "/warehouse-storage-london/hackney" },
  { name: "Lambeth", href: "/warehouse-storage-london/lambeth" },
  { name: "Southwark", href: "/warehouse-storage-london/southwark" },
  { name: "Westminster", href: "/warehouse-storage-london/westminster" },
  { name: "Islington", href: "/warehouse-storage-london/islington" },
  {
    name: "Kensington and Chelsea",
    href: "/warehouse-storage-london/kensington-chelsea",
  },
];

const primaryServices: RelatedService[] = [
  {
    title: "Business Storage",
    href: "/business-storage-london",
    description: "Broader managed storage for business assets, supplies, equipment and stock.",
  },
  {
    title: "Pallet Storage",
    href: "/pallet-storage-london",
    description: "Storage for larger quantities, bulk cartons and palletised commercial goods.",
  },
  {
    title: "Ecommerce Storage",
    href: "/ecommerce-storage-london",
    description: "Flexible storage for products, packaging, returns and ecommerce overflow.",
  },
  {
    title: "Retail Stock Storage",
    href: "/retail-stock-storage-london",
    description: "Managed space for seasonal ranges, displays and excess retail inventory.",
  },
];

const secondaryServices: RelatedService[] = [
  {
    title: "Warehouse Storage",
    href: "/warehouse-storage-london",
    description: "Managed warehouse space with collection and delivery support.",
  },
  {
    title: "Commercial Storage",
    href: "/commercial-storage-london",
    description: "Scalable storage for wider commercial requirements.",
  },
  {
    title: "Third Party Logistics",
    href: "/third-party-logistics-london",
    description: "Broader warehouse and logistics support where the required service is available.",
  },
];

const faqs: Faq[] = [
  {
    question: "What is inventory storage?",
    answer:
      "Inventory storage is a managed service for keeping physical business stock, supplies, equipment or other suitable goods away from your main premises. KXH can combine storage with collection, organised item records, retrieval coordination and return delivery under an agreed arrangement.",
  },
  {
    question: "Is this inventory software?",
    answer:
      "No. This page describes physical inventory storage and warehouse handling, not a standalone SaaS platform, ERP system, customer dashboard or live stock-control application.",
  },
  {
    question: "How are stored items recorded?",
    answer:
      "The recording method depends on the agreed storage arrangement. Suitable items may be grouped and referenced by category, box, unit or pallet using practical stored-item records.",
  },
  {
    question: "Can you create an inventory list or manifest?",
    answer:
      "An item list or inventory manifest may be available for suitable storage jobs. The level of detail should be agreed during quotation so the record matches the type and volume of stock being stored.",
  },
  {
    question: "Do you collect inventory from business premises?",
    answer:
      "Collection can be arranged from an agreed London business location. The quote will reflect the collection address, volume, access conditions, handling needs and storage arrangement.",
  },
  {
    question: "Can inventory be returned on request?",
    answer:
      "Yes, retrieval and return delivery can be coordinated under the agreed service. Timing, handling requirements and any delivery charges should be confirmed with the KXH team when arranging the return.",
  },
  {
    question: "Can you store pallets?",
    answer:
      "KXH supports pallet and bulk-stock enquiries. Pallet type, dimensions, weight, goods, volume and handling requirements must be reviewed during quotation to confirm suitability.",
  },
  {
    question: "What types of business stock can be stored?",
    answer:
      "Potentially suitable items include ecommerce products, retail stock, packaging, office supplies, event materials, tools, equipment, seasonal goods, archived boxes and palletised stock. Suitability is confirmed before booking, and hazardous, illegal, regulated or temperature-sensitive items should not be assumed acceptable.",
  },
  {
    question: "Can storage scale during seasonal demand?",
    answer:
      "Storage requirements can be reviewed when stock volumes rise or fall. Availability, handling and pricing will depend on the updated quantity and the most suitable storage format.",
  },
  {
    question: "How is inventory storage pricing calculated?",
    answer:
      "Pricing depends on the volume and type of inventory, collection requirements, storage duration, handling needs, pallet requirements and expected return-delivery arrangements. KXH will provide a quote based on the details supplied.",
  },
  {
    question: "Can businesses visit or directly access stored goods?",
    answer:
      "Access arrangements depend on the agreed managed-storage service and warehouse procedures. Businesses should discuss planned retrieval frequency and any direct-access requirement before booking.",
  },
  {
    question: "Which London areas do you serve?",
    answer:
      "KXH supports inventory-storage enquiries across London, including Tower Hamlets, Camden, Hackney, Lambeth, Southwark, Westminster, Islington, Kensington and Chelsea, subject to collection and service availability.",
  },
];

const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2";

function JsonLd() {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Inventory Storage with Tracking London",
    url: "https://kxhlogistics.co.uk/inventory-management-london",
    provider: {
      "@type": "LocalBusiness",
      name: "KXH Storage & Logistics",
      url: "https://kxhlogistics.co.uk",
    },
    areaServed: {
      "@type": "City",
      name: "London",
    },
    serviceType: "Managed physical inventory storage and warehouse handling",
    description:
      "Physical inventory storage for London businesses with collection, organised item records, warehouse storage, pallet support, retrieval coordination and return delivery.",
    offers: {
      "@type": "Offer",
      url: "https://kxhlogistics.co.uk/get-a-quote?service=storage",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "GBP",
        description:
          "Pricing is quoted according to inventory volume, collection, storage duration, handling, pallet requirements and return delivery.",
      },
    },
  };

  const faqData = {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}

function Breadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-6xl overflow-x-auto px-5 pt-4 text-xs text-slate-500 sm:px-6 sm:pt-6 sm:text-sm lg:px-8"
    >
      <Link href="/" className={`${focusClass} rounded-sm transition hover:text-emerald-700`}>
        Home
      </Link>
      <span aria-hidden="true" className="mx-2">/</span>
      <Link
        href="/services"
        className={`${focusClass} rounded-sm transition hover:text-emerald-700`}
      >
        Services
      </Link>
      <span aria-hidden="true" className="mx-2">/</span>
      <span aria-current="page" className="font-medium text-slate-700">
        Inventory Storage London
      </span>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
          Managed Physical Inventory Storage
        </div>

        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
          Inventory Storage with Tracking for London Businesses
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          We collect business stock, organise it using agreed item records or manifests,
          store it securely, and coordinate return delivery when inventory is needed.
        </p>

        <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
          A managed physical storage service for boxes, products, equipment, bulk cartons,
          business assets and suitable palletised inventory—not inventory software or a live dashboard.
        </p>

        <div className="mx-auto mt-7 grid max-w-4xl grid-cols-1 gap-3 min-[430px]:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
            >
              ✓ {benefit.title}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={quoteUrl}
            className={`${focusClass} w-full rounded-xl bg-emerald-700 px-6 py-4 text-center font-semibold text-white shadow-lg transition hover:bg-emerald-800 sm:w-auto`}
          >
            Get Inventory Storage Quote
          </Link>
          <Link
            href="#how-inventory-storage-works"
            className={`${focusClass} w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto`}
          >
            How Inventory Storage Works
          </Link>
        </div>

        <div className="mt-6 flex justify-center">
          <TrustpilotPill />
        </div>

        <div className="mt-12">
          <Image
            src="/images/inventory-management/inventory-management-london-warehouse-stock-handling.webp"
            alt="KXH warehouse team handling organised business inventory in London"
            width={1200}
            height={800}
            priority
            quality={80}
            sizes="(max-width: 768px) 100vw, 960px"
            className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}

function BenefitsStrip() {
  return (
    <section aria-labelledby="service-clarification" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 lg:px-8">
        <h2 id="service-clarification" className="sr-only">
          Physical managed inventory storage clarification
        </h2>
        <p className="mx-auto max-w-4xl text-center text-sm leading-6 text-slate-600 sm:text-base">
          <strong className="text-slate-900">This is physical inventory storage, not software.</strong>{" "}
          Service details can include collection, agreed inventory records, organised warehouse storage,
          retrieval coordination and return delivery.
        </p>
      </div>
    </section>
  );
}

function PhysicalInventoryExplanation() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Physical Inventory Management
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            What Does Inventory Management Mean at KXH?
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            At KXH, inventory management means helping businesses store and organise
            physical goods inside a managed warehouse arrangement. It does not mean
            selling inventory software or providing a live customer dashboard.
          </p>
          <div className="mt-6 space-y-4 text-slate-600">
            <p>
              Depending on the agreed service, items can be collected, grouped, recorded
              and placed into suitable storage. This gives businesses clearer visibility
              over stored stock while avoiding the overhead of leasing and operating extra
              warehouse space.
            </p>
            <p>
              When stock is needed again, retrieval and return delivery can be coordinated.
              Storage capacity can also be reviewed as inventory volumes change.
            </p>
          </div>
          <p className="mt-6 text-slate-600">
            Businesses needing broader company storage can also explore{" "}
            <Link
              href="/business-storage-london"
              className={`${focusClass} rounded-sm font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-800`}
            >
              business storage in London
            </Link>
            .
          </p>
        </div>

        <Image
          src="/images/inventory-management/business-inventory-organisation-london.webp"
          alt="Business inventory grouped and organised inside a London warehouse"
          width={1200}
          height={900}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
        />
      </div>
    </section>
  );
}

function InventoryProcessSection() {
  return (
    <section id="how-inventory-storage-works" className="scroll-mt-24 bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Collection, Storage and Return Delivery
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            How Managed Inventory Storage Works
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            The service is planned around what you store, how it arrives, how it should be
            organised and how you expect to retrieve it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item) => (
            <article key={item.step} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-emerald-700">{item.step}</p>
              <h3 className="mt-5 text-xl font-bold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InventoryRecordsSection() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
              Inventory Listing and Tracking
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Inventory Lists and Organised Stock Records
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Businesses searching for inventory storage with tracking usually need a
              dependable way to identify what is stored and coordinate its return.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              KXH uses measured, operational language: item lists, manifests, categories,
              identifiers and retrieval coordination. We do not claim a live software
              portal, automated stock counts or real-time barcode tracking.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {recordFeatures.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-bold text-slate-950">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemsSolvedSection() {
  return (
    <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Practical Business Problems
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            When Managed Inventory Storage Makes Sense
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            This service is designed for real space, stock and logistics pressures—not a
            theoretical software workflow.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {problemsSolved.map((problem) => (
            <article key={problem.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-bold text-slate-950">{problem.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{problem.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InventoryStorageOptionsSection() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Stock Types Supported
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Inventory and Business Stock We Can Discuss
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Storage suitability depends on the goods, volume, dimensions, weight, handling
            needs and warehouse requirements.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stockTypes.map((stockType) => (
            <article key={stockType.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-bold text-slate-950">{stockType.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{stockType.description}</p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-4xl rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
          Storage suitability is confirmed during quotation. Do not assume acceptance of
          hazardous, illegal, regulated, temperature-controlled, perishable or otherwise
          restricted goods.
        </p>
      </div>
    </section>
  );
}

function BusinessTypesSection() {
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Businesses and Industries
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Who Uses Business Inventory Storage?
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Managed stock storage can support companies that need more room, clearer
            organisation and a practical collection-and-return process.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {businessTypes.map((business) => (
            <article key={business.title} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-950">{business.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{business.description}</p>
              {business.href && business.linkLabel ? (
                <Link
                  href={business.href}
                  className={`${focusClass} mt-5 rounded-sm text-sm font-semibold text-emerald-700 hover:text-emerald-800`}
                >
                  {business.linkLabel} →
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InventoryVsSelfStorageSection() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Service Comparison
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Managed Inventory Storage vs Ordinary Self Storage
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Self storage can be useful, but a managed inventory-storage service may be a
            better operational fit when collection, records and return delivery matter.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-[760px] w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparison between managed inventory storage and ordinary self storage
            </caption>
            <thead className="bg-slate-950 text-white">
              <tr>
                <th scope="col" className="px-5 py-4 font-semibold">Feature</th>
                <th scope="col" className="px-5 py-4 font-semibold">KXH managed inventory storage</th>
                <th scope="col" className="px-5 py-4 font-semibold">Ordinary self storage, typically</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="align-top">
                  <th scope="row" className="w-1/4 px-5 py-4 font-semibold text-slate-950">
                    {row.feature}
                  </th>
                  <td className="w-[37.5%] px-5 py-4 leading-6 text-slate-700">{row.managed}</td>
                  <td className="w-[37.5%] px-5 py-4 leading-6 text-slate-600">{row.selfStorage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-emerald-50 p-7 sm:flex-row">
          <div>
            <h3 className="text-xl font-bold text-slate-950">Unsure which storage model fits?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Share your stock volume, collection needs and retrieval pattern so KXH can
              recommend a suitable arrangement.
            </p>
          </div>
          <Link
            href={quoteUrl}
            className={`${focusClass} shrink-0 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800`}
          >
            Request a Storage Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

function PalletStorageSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Pallet and Bulk Inventory Storage
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            A Better Format for Larger Stock Volumes
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Pallet storage may be more suitable when inventory arrives in larger
            quantities, bulk cartons or commercial loads that are inefficient to manage
            as loose boxes in a small storage room.
          </p>
          <ul className="mt-6 grid gap-3 text-slate-700 sm:grid-cols-2">
            {[
              "Bulk cartons",
              "Wholesale goods",
              "Seasonal stock",
              "Commercial overflow",
              "Palletised ecommerce inventory",
              "Larger retail quantities",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="font-bold text-emerald-700">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/pallet-storage-london"
            className={`${focusClass} mt-8 inline-flex rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800`}
          >
            Explore Pallet Storage London
          </Link>
        </div>

        <Image
          src="/images/inventory-management/warehouse-inventory-support-london.webp"
          alt="Warehouse inventory support for bulk cartons and palletised stock in London"
          width={1200}
          height={900}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
        />
      </div>
    </section>
  );
}

function LondonCoverageSection() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            London Coverage
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Inventory Storage for Businesses Across London
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            The links below lead to local managed warehouse-storage pages. They are not
            labelled as dedicated inventory-management borough pages.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {londonAreas.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className={`${focusClass} group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-300 hover:bg-white hover:shadow-md`}
            >
              <h3 className="font-bold text-slate-950 group-hover:text-emerald-800">{area.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore managed warehouse storage in {area.name}.
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={quoteUrl}
            className={`${focusClass} inline-flex rounded-xl border border-emerald-700 px-6 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-50`}
          >
            Check Collection and Storage Availability
          </Link>
        </div>
      </div>
    </section>
  );
}

function RelatedServicesSection() {
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Related Business Services
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Choose the Storage Service That Matches Your Stock
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Inventory management focuses on physical stock organisation and records. Other
            KXH services address broader business, pallet, ecommerce and retail requirements.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {primaryServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className={`${focusClass} group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg`}
            >
              <h3 className="text-xl font-bold text-slate-950 group-hover:text-emerald-800">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">View service →</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-200 pt-7">
          {secondaryServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              title={service.description}
              className={`${focusClass} rounded-sm text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-emerald-800`}
            >
              {service.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamTrustSection() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Image
          src="/images/inventory-management/kxh-inventory-management-team.webp"
          alt="KXH Storage and Logistics warehouse team supporting business inventory storage"
          width={1200}
          height={900}
          sizes="(max-width: 1024px) 100vw, 52vw"
          className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
        />

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Managed by a Logistics Team
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Operational Support, Not Just Empty Space
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            KXH combines storage space with practical handling, collection coordination
            and return-delivery support. The service is designed around the physical
            movement and organisation of business goods.
          </p>
          <div className="mt-6 space-y-4 text-slate-600">
            <p>
              Before booking, the team can review volume, access, item type, pallet needs,
              collection details and expected retrieval frequency.
            </p>
            <p>
              This helps keep the quote and storage plan aligned with the actual work rather
              than promising unsupported software features or fixed access terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Frequently Asked Questions
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Inventory Storage London FAQs
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm open:border-emerald-300">
              <summary className={`${focusClass} cursor-pointer list-none rounded-sm pr-8 font-semibold text-slate-950 marker:hidden`}>
                <span className="flex items-start justify-between gap-4">
                  <span>{faq.question}</span>
                  <span aria-hidden="true" className="text-xl font-normal text-emerald-700 transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-4 border-t border-slate-100 pt-4 leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="border-t border-emerald-800 bg-emerald-800 py-14 text-center text-white sm:py-20">
      <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide !text-white">
          Managed Inventory Storage London
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
          Need Organised Storage for Business Inventory?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
          Tell KXH what you need to store and discuss collection, organised item
          records, secure warehouse storage, pallet support, and return delivery
          across London.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={quoteUrl}
            className={`${focusClass} w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 sm:w-auto sm:px-8`}
          >
            Get Inventory Storage Quote
          </Link>

          {CONTACT_NUMBERS.map((contact) => (
            <a
              key={contact.href}
              href={contact.href}
              className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2 sm:w-auto"
            >
              Call {contact.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function InventoryManagementPage() {
  return (
    <>
      <CrispChat />
      <Nav />

      <main className="min-h-screen bg-white text-slate-900">
        <JsonLd />
        <TrustpilotJsonLd />
        <Breadcrumbs />
        <HeroSection />
        <BenefitsStrip />
        <PhysicalInventoryExplanation />
        <InventoryProcessSection />
        <InventoryRecordsSection />
        <ProblemsSolvedSection />
        <InventoryStorageOptionsSection />
        <BusinessTypesSection />
        <InventoryVsSelfStorageSection />
        <PalletStorageSection />
        <LondonCoverageSection />
        <RelatedServicesSection />
        <TeamTrustSection />
        <TestimonialsSection />
        <FinalCtaSection />
        <FaqSection />
        <MainFooter locations={londonLocations} />
      </main>
    </>
  );
}