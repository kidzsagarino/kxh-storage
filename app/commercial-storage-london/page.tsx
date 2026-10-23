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
  title:
    "Commercial Storage London | Managed Warehouse Storage | KXH Logistics",
  description:
    "Commercial storage in London for inventory, equipment, archives and warehouse overflow. Managed collection, secure handling and return delivery for businesses.",
  alternates: {
    canonical: "https://kxhlogistics.co.uk/commercial-storage-london",
  },
  openGraph: {
    title: "Commercial Storage London | KXH Storage & Logistics",
    description:
      "Flexible commercial warehouse storage with collection, organised handling and return delivery across London.",
    url: "https://kxhlogistics.co.uk/commercial-storage-london",
    type: "website",
    images: [
      {
        url: "/images/commercial-storage/commercial-storage-hero.webp",
        width: 1400,
        height: 800,
        alt: "Managed commercial warehouse storage in London",
      },
    ],
  },
};

type IconName =
  | "warehouse"
  | "boxes"
  | "truck"
  | "shield"
  | "chart"
  | "archive"
  | "building"
  | "calendar"
  | "clipboard"
  | "return"
  | "equipment"
  | "check";

function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "warehouse":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 5l9 5.5V21H3V10.5Z" />
          <path d="M7 21v-7h10v7M7 10h.01M17 10h.01" />
        </svg>
      );
    case "boxes":
      return (
        <svg {...common}>
          <path d="m4 7 4-2 4 2-4 2-4-2Z" />
          <path d="M4 7v5l4 2 4-2V7M8 9v5" />
          <path d="m12 12 4-2 4 2-4 2-4-2Z" />
          <path d="M12 12v5l4 2 4-2v-5M16 14v5" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.8 2.8 8.1 7 10 4.2-1.9 7-5.2 7-10V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        </svg>
      );
    case "archive":
      return (
        <svg {...common}>
          <path d="M4 7h16v13H4zM3 4h18v3H3z" />
          <path d="M9 11h6" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M4 21V4h10v17M14 9h6v12M8 8h2M8 12h2M8 16h2M17 13h1M17 17h1M2 21h20" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <path d="M4 5h16v16H4zM8 3v4M16 3v4M4 10h16" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...common}>
          <path d="M9 5h6M9 3h6v4H9z" />
          <path d="M6 5H4v16h16V5h-2M8 12h8M8 16h5" />
        </svg>
      );
    case "return":
      return (
        <svg {...common}>
          <path d="M9 7 4 12l5 5" />
          <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
        </svg>
      );
    case "equipment":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-3 3-3-3 3-3Z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );
  }
}

const faqs = [
  {
    q: "What is commercial storage?",
    a: "Commercial storage is warehouse-based storage designed around business operations. It can be used for inventory, equipment, archives, office assets, project materials and overflow stock. Unlike a basic self-storage unit, a managed commercial service can include collection, warehouse handling, organised storage and return delivery.",
  },
  {
    q: "How is commercial storage different from self storage?",
    a: "Self storage usually requires your team to transport, load, unload and organise everything themselves. KXH provides a managed service: we can collect from your premises, handle items inside the warehouse, organise stored goods and return them when requested. This is often more practical for businesses without vehicles, labour or time to manage a storage unit.",
  },
  {
    q: "What types of businesses use commercial storage in London?",
    a: "We support retailers, ecommerce brands, offices, contractors, hospitality operators, schools, healthcare organisations, event teams, manufacturers and other companies that need flexible warehouse capacity without taking on another commercial lease.",
  },
  {
    q: "Can you store commercial inventory and retail stock?",
    a: "Yes. We store boxed inventory, retail stock, promotional materials, packaged goods, business supplies and other commercial items. The right setup depends on item type, quantity, handling needs and expected collection or return frequency.",
  },
  {
    q: "Do you provide collection and return delivery?",
    a: "Yes. KXH can arrange collection from business premises across London and return stored items when required. Delivery requirements, access restrictions, item volumes and handling needs are confirmed during quoting.",
  },
  {
    q: "Can storage capacity increase during busy periods?",
    a: "Yes. Commercial storage can flex around seasonal peaks, contract wins, refurbishment projects, stock arrivals and temporary warehouse overflow. You can discuss increases or reductions in required capacity with our team as your operational needs change.",
  },
  {
    q: "Is commercial storage suitable for warehouse overflow?",
    a: "Yes. Overflow storage is useful when your existing warehouse, stockroom, office or site cannot safely hold incoming goods. It can provide temporary capacity while you clear backlog, reorganise operations, complete a move or manage peak demand.",
  },
  {
    q: "Can you store office furniture and business equipment?",
    a: "Yes. We can store desks, chairs, cabinets, boxed IT equipment, displays, tools, fixtures and other business assets, subject to item suitability and an agreed handling plan.",
  },
  {
    q: "Do you offer archive and document storage?",
    a: "We can store boxed business archives and records that need to be retained but do not require daily access. Tell us how the boxes are labelled and how often you expect retrievals so we can recommend an appropriate arrangement.",
  },
  {
    q: "Is there a minimum or maximum storage period?",
    a: "Commercial requirements vary, so storage can be discussed for short-term projects, seasonal needs and longer operational use. Your quote will confirm the agreed storage arrangement, collection requirements and any expected return schedule.",
  },
  {
    q: "Can I access the warehouse directly?",
    a: "KXH operates as a managed storage service rather than a walk-in self-storage facility. Instead of requiring your team to visit and handle goods, we coordinate warehouse retrieval and return delivery. This reduces transport and labour demands on your business.",
  },
  {
    q: "How quickly can you collect commercial items?",
    a: "Timing depends on volume, location, vehicle requirements, access conditions and current scheduling. Share your preferred date and item list when requesting a quote, and our team will confirm the available collection options.",
  },
  {
    q: "How much does commercial storage in London cost?",
    a: "Pricing depends on the amount of space required, item type, storage duration, collection and delivery requirements, access conditions and handling complexity. We provide a tailored quote so your business pays for the service it actually needs.",
  },
  {
    q: "What information do you need for a commercial storage quote?",
    a: "It helps to provide your collection postcode, item types, approximate quantities or photos, preferred collection date, expected storage duration and any delivery or access restrictions. For larger projects, we may ask additional questions before confirming the plan.",
  },
];

function ServiceJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Commercial Storage London",
    serviceType: "Managed commercial warehouse storage",
    url: "https://kxhlogistics.co.uk/commercial-storage-london",
    description:
      "Managed commercial storage in London for inventory, equipment, archives, business assets and warehouse overflow, with collection and return delivery options.",
    provider: {
      "@type": "LocalBusiness",
      name: "KXH Storage & Logistics",
      url: "https://kxhlogistics.co.uk",
    },
    areaServed: {
      "@type": "City",
      name: "London",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Businesses requiring flexible warehouse storage",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Commercial storage solutions",
      itemListElement: [
        "Commercial inventory storage",
        "Commercial equipment storage",
        "Archive storage",
        "Retail stock storage",
        "Warehouse overflow storage",
        "Seasonal stock storage",
        "Business asset storage",
        "Office furniture storage",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
        name: "Business Storage London",
        item: "https://kxhlogistics.co.uk/business-storage-london",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Commercial Storage London",
        item: "https://kxhlogistics.co.uk/commercial-storage-london",
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

function FAQJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
      <ol className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-4 text-sm text-slate-500 sm:px-6 lg:px-8">
        <li>
          <Link href="/" className="transition hover:text-emerald-700">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link
            href="/business-storage-london"
            className="transition hover:text-emerald-700"
          >
            Business Storage
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="font-medium text-slate-800" aria-current="page">
          Commercial Storage London
        </li>
      </ol>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Managed Commercial Warehouse Storage
        </div>

        <h1 className="mx-auto mt-5 max-w-5xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
          Commercial Storage London for Inventory, Equipment and Warehouse Overflow
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Add flexible warehouse capacity without committing to another commercial lease.
          KXH collects, handles, stores and returns stock, equipment, archives and business assets across London.
        </p>

        <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
          Built for operational storage requirements including warehouse overflow,
          commercial inventory, temporary projects, office moves and long-term business continuity.
        </p>

        <div className="mx-auto mt-7 grid max-w-4xl grid-cols-1 gap-3 min-[430px]:grid-cols-2 lg:grid-cols-4">
          {[
            "Flexible warehouse capacity",
            "Commercial inventory handling",
            "Collection from your premises",
            "Return delivery available",
          ].map((benefit) => (
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
            Get Commercial Storage Quote
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

        <div className="mt-6 flex justify-center">
          <TrustpilotPill />
        </div>

        <div className="mt-12">
          <Image
            src="/images/commercial-storage/commercial-storage-hero.webp"
            alt="Managed commercial warehouse storage for London companies"
            width={1400}
            height={800}
            quality={80}
            sizes="(max-width: 768px) 100vw, 960px"
            className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
            priority
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

const benefits = [
  {
    icon: "warehouse" as IconName,
    title: "Flexible warehouse capacity",
    description: "Add commercial space for weeks, months or longer without taking another property lease.",
  },
  {
    icon: "boxes" as IconName,
    title: "Commercial inventory handling",
    description: "Store stock, supplies and business assets within an organised managed warehouse process.",
  },
  {
    icon: "truck" as IconName,
    title: "Pickup and return delivery",
    description: "Reduce pressure on your team with collection and scheduled return transport across London.",
  },
  {
    icon: "shield" as IconName,
    title: "Secure warehouse operations",
    description: "Keep commercial items away from crowded offices, shop floors, sites and unsuitable back rooms.",
  },
];

function BenefitsSection() {
  return (
    <section aria-label="Commercial storage benefits" className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon name={benefit.icon} />
              </div>
              <h2 className="mt-4 text-base font-bold text-slate-900">{benefit.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommercialOverview() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
          <Image
            src="/images/commercial-storage/commercial-storage-business-inventory.webp"
            alt="Commercial inventory stored inside a managed London warehouse"
            width={900}
            height={600}
            loading="lazy"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[3/2] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Commercial storage explained</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            What commercial storage means for an operating business
          </h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
            <p>
              Commercial storage is flexible warehouse space used to support day-to-day operations,
              growth, projects and business continuity. It gives companies somewhere suitable to hold
              inventory, equipment, archives, furniture, supplies and other assets that no longer fit
              safely or efficiently at the main workplace.
            </p>
            <p>
              The important difference is that commercial storage is built around operational needs.
              A retailer may need overflow capacity before peak season. A contractor may need secure
              space between projects. An office may need furniture stored during a relocation. A growing
              ecommerce brand may need stock removed from a home, studio or undersized unit.
            </p>
            <p>
              KXH provides managed warehouse storage rather than simply handing you an empty room. We can
              arrange collection, receive and handle items, organise them within the warehouse and return
              what you need. Your team avoids repeated van hire, manual loading and time-consuming trips
              to a self-storage facility.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h3 className="text-lg font-bold text-slate-950">Commercial storage is a strong fit when:</h3>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              {[
                "Your premises are running out of usable space",
                "Stock volumes change throughout the year",
                "You need temporary capacity without a lease",
                "Your team does not have transport or warehouse labour",
                "Business assets need organised off-site storage",
                "An office, shop or site must remain operational",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const industries = [
  ["Retail", "Store excess stock, displays, fixtures, packaging and seasonal ranges away from valuable selling space."],
  ["Ecommerce", "Create room for incoming inventory, promotions and growth without turning offices or homes into stockrooms."],
  ["Construction", "Hold tools, boxed materials, site equipment, fixtures and project assets between jobs or phases."],
  ["Hospitality", "Store furniture, catering equipment, event items, décor and seasonal operational supplies."],
  ["Schools", "Create temporary capacity for furniture, learning resources, archived materials and refurbishment projects."],
  ["Healthcare", "Store suitable non-clinical equipment, furniture, supplies and boxed operational materials off site."],
  ["Events", "Keep staging items, branded materials, furniture, equipment and reusable event assets organised between bookings."],
  ["Manufacturers", "Use overflow capacity for packaged components, finished goods, equipment and non-production assets."],
  ["Professional offices", "Store archives, furniture, IT equipment and departmental assets during moves, growth or refurbishment."],
];

function WhoUsesSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Built for real operations</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Who uses commercial storage in London?
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Commercial storage is useful wherever space limitations begin to affect productivity,
            safety, customer experience or the ability to take on more work.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map(([title, description], index) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <Icon name={index % 3 === 0 ? "building" : index % 3 === 1 ? "boxes" : "equipment"} />
                </div>
                <span className="text-sm font-bold text-slate-300">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const problems = [
  {
    title: "Growing inventory",
    description: "Create breathing room when stock volumes outgrow your current office, shop, studio or warehouse footprint.",
    icon: "chart" as IconName,
  },
  {
    title: "Warehouse overflow",
    description: "Move non-urgent or excess goods off site while keeping your main warehouse focused on active operations.",
    icon: "warehouse" as IconName,
  },
  {
    title: "Office relocation",
    description: "Store furniture, boxed equipment and departmental assets while teams move, refurbish or wait for a new site.",
    icon: "building" as IconName,
  },
  {
    title: "Temporary projects",
    description: "Support fit-outs, events, contracts, decants and time-limited programmes without permanent property overhead.",
    icon: "calendar" as IconName,
  },
  {
    title: "Seasonal stock",
    description: "Scale capacity before busy periods, product launches, festive trading and promotional campaigns.",
    icon: "boxes" as IconName,
  },
  {
    title: "Archive storage",
    description: "Move labelled records and retained business documents away from high-cost operational space.",
    icon: "archive" as IconName,
  },
  {
    title: "Equipment storage",
    description: "Keep tools, fixtures, displays and suitable commercial equipment organised between periods of use.",
    icon: "equipment" as IconName,
  },
  {
    title: "Business continuity",
    description: "Protect usable workspace and maintain operations during disruption, repairs, growth or property change.",
    icon: "shield" as IconName,
  },
];

function ProblemsSection() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Operational pressure points</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Commercial storage problems we solve
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Space problems rarely stay isolated. They slow teams down, restrict purchasing, crowd
              customer areas and make valuable assets harder to control. Flexible commercial storage
              helps restore order without forcing a property decision before your business is ready.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {problems.map((problem) => (
              <article key={problem.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon name={problem.icon} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-950">{problem.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{problem.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  {
    number: "01",
    title: "Tell us what needs storing",
    description: "Share item types, approximate quantities, photos, collection postcode, access details and expected storage duration.",
  },
  {
    number: "02",
    title: "We plan the collection",
    description: "We confirm the handling approach, vehicle requirements, timing and any preparation needed before collection day.",
  },
  {
    number: "03",
    title: "Items enter managed storage",
    description: "Your commercial items are transported, handled and organised within the agreed warehouse storage arrangement.",
  },
  {
    number: "04",
    title: "Request return delivery",
    description: "When items are needed again, contact the team to arrange retrieval and return delivery to your chosen London address.",
  },
];

function ProcessSection() {
  return (
    <section className="overflow-hidden bg-slate-950 py-20 text-white lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-400">A managed four-step service</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl !text-white">
              How our commercial storage service works
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              KXH removes the transport and handling burden that makes traditional self storage difficult
              for busy companies. We build the service around your items, premises and operational timeline.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/commercial-storage/commercial-storage-collection-delivery.webp"
                alt="KXH collection and return delivery for commercial storage customers"
                width={1400}
                height={700}
                loading="lazy"
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="aspect-[2/1] w-full object-cover"
              />
            </div>
          </div>

          <ol className="grid gap-4">
            {processSteps.map((step) => (
              <li key={step.number} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 font-bold text-slate-950">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold !text-white">{step.title}</h3>
                    <p className="mt-2 leading-7 text-slate-300">{step.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function WhyKxhSection() {
  const reasons = [
    ["Collection from your premises", "Avoid sourcing vans, coordinating drivers and pulling staff away from their normal work."],
    ["Professional warehouse handling", "Move suitable business items through a managed process rather than an improvised back-room setup."],
    ["Inventory organisation", "Keep commercial goods grouped and stored more systematically than crowded offices or mixed-use units allow."],
    ["Flexible scaling", "Increase or reduce capacity as projects, stock levels and operational demands change."],
    ["Return delivery", "Request stored items back without sending your team to load and transport them personally."],
    ["No warehouse lease", "Use storage capacity without taking on long commitments, business rates, utilities and property management."],
    ["No transport required", "Build collection and delivery into the storage service instead of maintaining vehicles for occasional use."],
    ["Operational flexibility", "Protect valuable working space while keeping assets available for future projects, sales or redeployment."],
  ];

  return (
    <section className="border-b border-slate-200 bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">More than spare space</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Why London businesses choose KXH commercial storage
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            The value is not only the warehouse space. It is the time, transport, labour and property
            commitment your business no longer has to manage alone.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <Icon name="check" className="h-7 w-7 text-emerald-700" />
              <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const comparisonRows = [
  ["Collection", "Collection can be arranged from your London premises", "Usually arranged and completed by the customer"],
  ["Warehouse handling", "Handled within a managed warehouse service", "Customer loads and unloads the unit"],
  ["Inventory support", "Suitable for organised commercial stock and business assets", "Primarily provides an empty lockable space"],
  ["Business suitability", "Designed around operational, project and overflow requirements", "Often better for simple personal or low-touch storage"],
  ["Transport", "Pickup and return delivery can form part of the service", "Customer normally supplies vehicles and labour"],
  ["Access", "Items are retrieved through a managed return process", "Customer visits the facility to access the unit"],
  ["Flexibility", "Capacity can adapt to stock, projects and seasonal change", "Flexibility depends on available unit sizes"],
  ["Scalability", "Can support growing volume without another warehouse lease", "Scaling may require renting and managing more units"],
];

function ComparisonSection() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Choose the right operating model</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Commercial storage vs self storage
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Both options provide space, but they place very different demands on your team. Managed commercial
            storage is designed for companies that need warehouse support, not another location to operate themselves.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <caption className="sr-only">Comparison of managed commercial storage and self storage</caption>
              <thead>
                <tr className="bg-slate-950 text-white">
                  <th scope="col" className="w-1/5 px-6 py-5 text-sm font-bold uppercase tracking-wider">Feature</th>
                  <th scope="col" className="w-2/5 px-6 py-5 text-sm font-bold uppercase tracking-wider text-emerald-300">Commercial Storage</th>
                  <th scope="col" className="w-2/5 px-6 py-5 text-sm font-bold uppercase tracking-wider">Self Storage</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([feature, commercial, self], index) => (
                  <tr key={feature} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <th scope="row" className="border-t border-slate-200 px-6 py-5 font-bold text-slate-950">{feature}</th>
                    <td className="border-t border-slate-200 px-6 py-5 leading-7 text-slate-700">
                      <span className="flex gap-3">
                        <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                        {commercial}
                      </span>
                    </td>
                    <td className="border-t border-slate-200 px-6 py-5 leading-7 text-slate-600">{self}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:flex-row">
          <div>
            <h3 className="text-xl font-bold text-slate-950">Need help deciding how much space and handling support you need?</h3>
            <p className="mt-2 text-slate-600">Send your item list or photos and we will help shape a practical commercial storage plan.</p>
          </div>
          <Link
            href="/get-a-quote?service=storage"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

const storageSolutions = [
  ["Commercial inventory", "Stock, packaged goods, supplies and product inventory that need flexible off-site warehouse capacity.", "boxes"],
  ["Commercial equipment", "Suitable tools, fixtures, displays, boxed technology and operational equipment between periods of use.", "equipment"],
  ["Archive storage", "Labelled document boxes, retained records and business files that do not require daily access.", "archive"],
  ["Retail stock", "Seasonal ranges, shop overflow, packaging, visual merchandising materials and store replenishment stock.", "building"],
  ["Overflow warehouse storage", "Additional capacity for inbound stock, backlogs, reorganisation and short-term pressure on existing facilities.", "warehouse"],
  ["Seasonal storage", "Flexible space before trading peaks, campaigns, events, closures and recurring periods of high inventory.", "calendar"],
  ["Business assets", "Branded materials, project resources, furniture and reusable operational assets that retain future value.", "shield"],
  ["Office furniture", "Desks, chairs, cabinets and boxed workplace equipment during moves, refurbishments and hybrid working changes.", "building"],
] as const;

function ServicesSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Commercial storage solutions</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Warehouse space for the items that keep your business moving
            </h2>
          </div>
          <p className="text-lg leading-8 text-slate-600">
            Different assets require different handling conversations. Tell us what you are storing,
            how it is packed, how often it may be returned and what your premises access is like.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {storageSolutions.map(([title, description, icon]) => (
            <article key={title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                <Icon name={icon} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryLinksSection() {
  const cards = [
    {
      title: "Retail Stock Storage",
      description: "Flexible storage for shop inventory, seasonal ranges, fixtures and merchandising materials.",
      href: "/retail-stock-storage-london",
      status: "Explore service",
    },
    {
      title: "Ecommerce Storage",
      description: "Managed warehouse support for online sellers handling growth, stock arrivals and space constraints.",
      href: "/ecommerce-storage-london",
      status: "Explore service",
    },
    {
      title: "Office Asset Storage",
      description: "Storage for furniture, boxed equipment and archives during relocations and workplace change.",
      status: "Coming Soon",
    },
    {
      title: "Construction Storage",
      description: "Flexible capacity for suitable tools, fixtures and project materials between active sites.",
      status: "Coming Soon",
    },
    {
      title: "Hospitality Storage",
      description: "Off-site space for furniture, seasonal equipment, décor and event-related business assets.",
      status: "Coming Soon",
    },
    {
      title: "Event Equipment Storage",
      description: "Organised storage for reusable displays, branded materials, staging items and event furniture.",
      status: "Coming Soon",
    },
  ];

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Industry-focused support</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Commercial storage by business type</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Our commercial service can be adapted around the stock, access, project cycles and operational pressures of different sectors.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const content = (
              <>
                <div className="flex items-center justify-between gap-4">
                  <Icon name="building" className="h-7 w-7 text-emerald-700" />
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${card.href ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {card.status}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-950">{card.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{card.description}</p>
              </>
            );

            return card.href ? (
              <Link key={card.title} href={card.href} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
                {content}
              </Link>
            ) : (
              <article key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RelatedServicesSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-950 py-20 text-white lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-400">Connected warehouse services</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl !text-white">Build the right business storage solution</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Commercial storage is the operational and enterprise-focused part of our wider business storage offering.
              Use the related services below when you need broader support, more structured stock handling or pallet-based capacity.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/commercial-storage/commercial-storage-inventory-management.webp"
                alt="Commercial inventory management and warehouse operations in London"
                width={1400}
                height={700}
                loading="lazy"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[2/1] w-full object-cover"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Link href="/business-storage-london" className="sm:col-span-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-8 transition hover:bg-emerald-400/15">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">Parent service</p>
              <h3 className="mt-3 text-2xl font-bold !text-white">Business Storage London</h3>
              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Explore the broader managed storage service for companies, including stock, equipment, collection and flexible business support.
              </p>
            </Link>

            {[
              ["Inventory Management", "/inventory-management-london", "Organised physical stock storage and inventory handling for London businesses."],
              ["Pallet Storage", "/pallet-storage-london", "Warehouse capacity for palletised stock, bulk goods and commercial supply chains."],
              ["Third Party Logistics", "/third-party-logistics-london", "Integrated warehouse, inventory, fulfilment coordination and delivery support."],
              ["Warehouse Storage", "/warehouse-storage-london", "Managed warehouse storage with pickup and return delivery across London."],
            ].map(([title, href, description]) => (
              <Link key={title} href={href} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/40 hover:bg-white/10">
                <h3 className="text-xl font-bold !text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
                <span className="mt-5 inline-flex text-sm font-bold text-emerald-300">Explore service →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationsSection() {
  const locations = [
    ["Camden", "/warehouse-storage-london/camden", "Commercial storage collection for offices, retailers and organisations across Camden."],
    ["Westminster", "/warehouse-storage-london/westminster", "Managed warehouse storage for central London commercial premises and projects."],
    ["Hackney", "/warehouse-storage-london/hackney", "Flexible commercial capacity for creative, retail and ecommerce businesses in Hackney."],
    ["Islington", "/warehouse-storage-london/islington", "Collection-led storage for offices, shops and growing businesses throughout Islington."],
    ["Southwark", "/warehouse-storage-london/southwark", "Warehouse storage support for stock, equipment and business assets in Southwark."],
    ["Lambeth", "/warehouse-storage-london/lambeth", "Commercial collection and managed storage for businesses operating across Lambeth."],
  ];

  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">London-wide coverage</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Commercial storage across London</h2>
          </div>
          <p className="text-lg leading-8 text-slate-600">
            KXH supports commercial collections and return deliveries across London. Availability depends on item volume,
            access, timing and vehicle requirements, so share your postcode and preferred date when requesting a quote.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {locations.map(([name, href, description]) => (
            <Link key={name} href={href} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon name="building" />
                </span>
                <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-700">→</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-950">Commercial storage in {name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          We also serve other London boroughs and surrounding service areas. Contact us with your collection postcode for availability.
        </p>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Image
          src="/images/commercial-storage/commercial-storage-team.webp"
          alt="KXH warehouse team supporting commercial storage customers in London"
          width={1400}
          height={800}
          quality={75}
          sizes="(max-width: 768px) 100vw, 960px"
          className="h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Commercial Storage FAQs
        </p>
        <h2 className="mb-8 mt-2 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Questions from London Businesses
        </h2>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <summary className="cursor-pointer font-semibold text-slate-950">
                {faq.q}
              </summary>
              <p className="mt-3 leading-7 text-slate-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="border-t border-emerald-800 bg-emerald-800 py-14 text-center text-white sm:py-20">
      <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide !text-white">
          Flexible Commercial Storage
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
          Add Commercial Warehouse Capacity Without Another Lease
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
          Get a tailored quote for collection, secure warehouse handling,
          organised commercial storage and return delivery across London.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/get-a-quote?service=storage"
            className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-500 sm:w-auto sm:px-8"
          >
            Get Commercial Storage Quote
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

export default function CommercialStoragePage() {
  return (
    <>
      <CrispChat />
      <Nav />

      <main className="min-h-screen bg-white text-slate-900">
        <ServiceJsonLd />
        <BreadcrumbJsonLd />
        <FAQJsonLd />
        <TrustpilotJsonLd />

        <Breadcrumbs />
        <HeroSection />
        <BenefitsSection />
        <CommercialOverview />
        <WhoUsesSection />
        <ProblemsSection />
        <ProcessSection />
        <WhyKxhSection />
        <ComparisonSection />
        <ServicesSection />
        <IndustryLinksSection />
        <RelatedServicesSection />
        <TeamSection />
        <TestimonialsSection />
        <LocationsSection />
        <FinalCTA />
        <FaqSection />
        <MainFooter locations={londonLocations} />
      </main>
    </>
  );
}