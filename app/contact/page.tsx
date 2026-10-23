import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MainFooter from "../components/footer/MainFooter";
import { londonLocations } from "../sitemap";
import CrispChat from "../components/chat/CrispChat";
import Nav from "../components/MobileNav";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustpilotPill from "../components/trustpilot/TrustpilotPill";
import { CONTACT_NUMBERS } from "../lib/contact";

const SITE_URL = "https://kxhlogistics.co.uk";
const PHONE_DISPLAY = CONTACT_NUMBERS[0].phone;
const PHONE_HREF = CONTACT_NUMBERS[0].href;
const EMAIL = "help@kxhlogistics.co.uk";
const OPENING_HOURS = [
    { label: "Monday–Friday", value: "8:00 AM–6:00 PM" },
    { label: "Saturday", value: "9:00 AM–4:00 PM" },
    { label: "Sunday", value: "By appointment" },
];
const TRUSTPILOT_RATING = "4.8";
const TRUSTPILOT_REVIEW_COUNT = "66";



export const metadata: Metadata = {
    title:
        "Contact KXH Storage & Logistics | London Moving, Storage & Warehouse Services",
    description:
        "Contact KXH Storage & Logistics for moving services, managed storage, business storage, warehouse storage, student storage, collection and delivery across London. Request a tailored quotation today.",
    keywords: [
        "contact KXH Storage and Logistics",
        "moving company London contact",
        "storage company London contact",
        "warehouse storage London quote",
        "business storage London enquiry",
        "removals quote London",
        "managed storage London",
        "student storage London contact",
    ],
    alternates: {
        canonical: `${SITE_URL}/contact`,
    },
    openGraph: {
        title:
            "Contact KXH Storage & Logistics | London Moving & Storage Specialists",
        description:
            "Speak with KXH about moving, storage, warehouse services, business logistics, collection and delivery across London.",
        url: `${SITE_URL}/contact`,
        siteName: "KXH Storage & Logistics",
        type: "website",
        locale: "en_GB",
    },
    twitter: {
        card: "summary_large_image",
        title:
            "Contact KXH Storage & Logistics | London Moving & Storage Specialists",
        description:
            "Request a tailored quotation for moving, storage and logistics services across London.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const contactMethods = [
    ...CONTACT_NUMBERS.map((contact) => ({
        title: `Call ${contact.label}`,
        description:
            "Best for urgent enquiries, date availability and quick questions about moving or storage.",
        href: contact.href,
        label: contact.phone,
        icon: "☎",
    })),
    {
        title: "Email Our Team",
        description:
            "Ideal for detailed requirements, photos, inventory lists, access notes and business enquiries.",
        href: `mailto:${EMAIL}`,
        label: EMAIL,
        icon: "✉",
    },
    {
        title: "Request a Quote",
        description:
            "Tell us what you need and receive a quotation based on your locations, items, dates and service requirements.",
        href: "/get-a-quote",
        label: "Start your quote",
        icon: "📋",
    },
];

const services = [
    {
        title: "Moving Services",
        description:
            "House moves, apartment relocations, office removals and furniture transport across London.",
        href: "/logistics-moving-london",
        icon: "🚚",
    },
    {
        title: "Warehouse Storage",
        description:
            "Managed collection, organised warehouse storage and scheduled return delivery.",
        href: "/warehouse-storage-london",
        icon: "🏭",
    },
    {
        title: "Business Storage",
        description:
            "Flexible storage for stock, equipment, office furniture, files and operational assets.",
        href: "/business-storage-london",
        icon: "🏢",
    },
    {
        title: "Student Storage",
        description:
            "Collection, summer storage and next-term redelivery for students across London.",
        href: "/student-storage-london",
        icon: "🎓",
    },
    {
        title: "Inventory Management",
        description:
            "Physical stock organisation, storage, collection and staged delivery for businesses.",
        href: "/inventory-management-london",
        icon: "🗂️",
    },
    {
        title: "Pallet Storage",
        description:
            "Flexible pallet capacity for commercial stock, seasonal demand and operational overflow.",
        href: "/pallet-storage-london",
        icon: "🧱",
    },
    {
        title: "Collection & Delivery",
        description:
            "Managed collection and delivery for homes, offices, stock, furniture and stored items.",
        href: "/services",
        icon: "📍",
    },
    {
        title: "Document Shredding",
        description:
            "Secure disposal support for unwanted confidential business and personal documents.",
        href: "/shredding-solutions-london",
        icon: "🗄️",
    },
];


const serviceContactCards = [
    {
        title: "Moving Services Enquiry",
        description:
            "Discuss house moves, apartment relocations, office removals, packing and furniture transport.",
        href: "mailto:hello@kxhlogistics.co.uk?subject=Moving%20Services%20Enquiry",
        cta: "Email moving enquiry",
        icon: "🚚",
    },
    {
        title: "Warehouse Storage Enquiry",
        description:
            "Ask about managed storage, collection, storage duration, access and return delivery.",
        href: "mailto:hello@kxhlogistics.co.uk?subject=Warehouse%20Storage%20Enquiry",
        cta: "Email storage enquiry",
        icon: "🏭",
    },
    {
        title: "Business Storage Enquiry",
        description:
            "Discuss stock, office furniture, archived files, recurring collections and staged deliveries.",
        href: "mailto:hello@kxhlogistics.co.uk?subject=Business%20Storage%20Enquiry",
        cta: "Email business enquiry",
        icon: "🏢",
    },
    {
        title: "Student Storage Enquiry",
        description:
            "Ask about hall collection, summer storage, luggage, boxes and next-term redelivery.",
        href: "mailto:hello@kxhlogistics.co.uk?subject=Student%20Storage%20Enquiry",
        cta: "Email student enquiry",
        icon: "🎓",
    },
];

const enquiryScenarios = [
    {
        title: "Moving home",
        description:
            "House and flat moves with optional packing, dismantling, temporary storage and redelivery.",
        icon: "🏠",
    },
    {
        title: "Student move or summer break",
        description:
            "Collection from halls or shared accommodation, storage and next-term delivery.",
        icon: "🎓",
    },
    {
        title: "Office relocation",
        description:
            "Planned moving support for desks, equipment, files and temporary business storage.",
        icon: "🏢",
    },
    {
        title: "Home renovation",
        description:
            "Temporary storage for furniture and household belongings while work is completed.",
        icon: "🛠️",
    },
    {
        title: "Warehouse overflow",
        description:
            "Flexible space for pallets, stock, equipment and seasonal commercial demand.",
        icon: "📦",
    },
    {
        title: "Ecommerce stock storage",
        description:
            "Physical inventory storage with collection, organisation and staged delivery.",
        icon: "🛒",
    },
];


const londonAreas = [
    {
        name: "Camden",
        href: "/warehouse-storage-london/camden",
    },
    {
        name: "Hackney",
        href: "/warehouse-storage-london/hackney",
    },
    {
        name: "Westminster",
        href: "/warehouse-storage-london/westminster",
    },
    {
        name: "Southwark",
        href: "/warehouse-storage-london/southwark",
    },
    {
        name: "Islington",
        href: "/warehouse-storage-london/islington",
    },
    {
        name: "Lambeth",
        href: "/warehouse-storage-london/lambeth",
    },
    {
        name: "Tower Hamlets",
        href: "/warehouse-storage-london/tower-hamlets",
    },
    {
        name: "Kensington & Chelsea",
        href: "/warehouse-storage-london/kensington-chelsea",
    },
];

const industries = [
    "Ecommerce",
    "Retail",
    "Construction",
    "Property Management",
    "Education",
    "Healthcare",
    "Professional Offices",
    "Events",
    "Manufacturing",
];

const reasons = [
    {
        title: "Tailored quotations",
        description:
            "Pricing is based on the actual items, addresses, access, labour, transport and storage required.",
    },
    {
        title: "Residential and business support",
        description:
            "KXH supports households, students, landlords, offices, retailers and growing businesses.",
    },
    {
        title: "Collection available",
        description:
            "Managed collection reduces the need to hire a vehicle or transport belongings to storage yourself.",
    },
    {
        title: "Flexible service combinations",
        description:
            "Moving, packing, storage, collection and redelivery can be coordinated as one service.",
    },
    {
        title: "London-wide coverage",
        description:
            "Services are available across supported London boroughs and selected routes beyond London.",
    },
    {
        title: "Clear communication",
        description:
            "Detailed information about items, dates and access helps the team provide a practical service plan.",
    },
];

const faqs = [
    {
        question: "How quickly does KXH respond to enquiries?",
        answer:
            "Response times depend on enquiry volume and the information provided. Including your addresses, preferred dates, item list and access details helps the team review your request more efficiently.",
    },
    {
        question: "Can I request a moving or storage quote online?",
        answer:
            "Yes. Use the online quote form to provide your service type, locations, dates, item volume and any packing, storage or delivery requirements.",
    },
    {
        question: "Can I send photos or an inventory list?",
        answer:
            "Yes. Photos, measurements and inventory lists can help the team understand volume, access and handling requirements before preparing a quotation.",
    },
    {
        question: "Can businesses request ongoing storage or logistics support?",
        answer:
            "Yes. Businesses can enquire about recurring collections, flexible warehouse capacity, stock storage, pallet storage and staged delivery.",
    },
    {
        question: "Can moving and storage be combined?",
        answer:
            "Yes. KXH can collect belongings, move them into managed storage and arrange redelivery when your home, office or new premises are ready.",
    },
    {
        question: "Do you cover my London borough?",
        answer:
            "KXH serves multiple London boroughs. Include your collection and delivery postcodes in the enquiry so route and availability can be confirmed.",
    },
    {
        question: "Can I request short-notice collection?",
        answer:
            "Short-notice support may be available depending on location, vehicle capacity, labour and the service required. Contact the team as early as possible.",
    },
    {
        question: "Can KXH provide packing?",
        answer:
            "Packing and suitable materials may be included when agreed in advance. Identify fragile, bulky or high-care items when requesting your quotation.",
    },
    {
        question: "How do I change an existing booking?",
        answer:
            "Contact KXH as soon as possible. Changes to dates, addresses, item volume or services are subject to availability and may affect pricing.",
    },
    {
        question: "Can I book by phone?",
        answer:
            "You can call the team to discuss your requirements. A complete booking may still require written details, acceptance of the quotation and any applicable payment steps.",
    },
    {
        question: "Can I contact KXH about student storage?",
        answer:
            "Yes. Students can enquire about hall collection, summer storage, luggage, boxes, small furniture and next-term delivery.",
    },
    {
        question: "Can KXH collect from offices, suppliers or warehouses?",
        answer:
            "Commercial collection may be arranged from approved offices, retail premises, supplier locations and warehouses, subject to access and loading requirements.",
    },
    {
        question: "How much notice should I give for a move or collection?",
        answer:
            "Earlier booking is recommended, especially for weekends, month-end dates, student changeovers and larger commercial jobs. Short-notice availability depends on capacity.",
    },
    {
        question: "Can you collect from an apartment without a lift?",
        answer:
            "Yes, subject to access and handling requirements. Tell the team about stairs, floor level, carrying distance and parking when requesting a quotation.",
    },
    {
        question: "Can I store furniture during a renovation?",
        answer:
            "Yes. KXH can collect and store approved furniture and household belongings while renovation, decorating or building work is completed.",
    },
    {
        question: "Do you support ecommerce businesses?",
        answer:
            "Yes. Ecommerce businesses can enquire about stock storage, inventory organisation, pallet capacity, collections and staged deliveries.",
    },
    {
        question: "Can you collect from more than one address?",
        answer:
            "Multi-address collections may be possible. Include every location, item group and access requirement in the enquiry.",
    },
    {
        question: "Can stored items be delivered to a different address?",
        answer:
            "Yes, where the new destination, access, route and delivery requirements are confirmed before scheduling.",
    },
    {
        question: "Do you provide office furniture storage?",
        answer:
            "Yes. Desks, chairs, cabinets and other approved office assets can be stored during relocation, refurbishment or space changes.",
    },
    {
        question: "Can I arrange recurring business collections?",
        answer:
            "Recurring collection or delivery may be available for suitable business requirements. Frequency, volume and locations should be discussed with the team.",
    },
    {
        question: "Can KXH help if my completion date is delayed?",
        answer:
            "Yes. Temporary managed storage can help bridge the gap between leaving one property and gaining access to another.",
    },
    {
        question: "What items should not be included in my enquiry?",
        answer:
            "Do not request storage or transport for hazardous, illegal, explosive, perishable or otherwise prohibited items. Ask the team if you are unsure about a specific item.",
    },

];

function ContactPageJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact#contactpage`,
        url: `${SITE_URL}/contact`,
        name: "Contact KXH Storage & Logistics",
        description:
            "Contact KXH Storage & Logistics for moving, storage, warehouse and logistics services across London.",
        isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "KXH Storage & Logistics",
        },
        about: {
            "@type": "LocalBusiness",
            "@id": `${SITE_URL}/#localbusiness`,
            name: "KXH Storage & Logistics",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

function LocalBusinessJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "MovingCompany", "StorageFacility"],
        "@id": `${SITE_URL}/#localbusiness`,
        name: "KXH Storage & Logistics",
        url: SITE_URL,
        telephone: PHONE_DISPLAY,
        email: EMAIL,
        areaServed: {
            "@type": "City",
            name: "London",
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "18:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "09:00",
                closes: "16:00",
            },
        ],
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: TRUSTPILOT_RATING,
            reviewCount: TRUSTPILOT_REVIEW_COUNT,
            bestRating: "5",
        },
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: PHONE_DISPLAY,
                email: EMAIL,
                contactType: "customer service",
                areaServed: "GB",
                availableLanguage: ["English"],
            },
            {
                "@type": "ContactPoint",
                telephone: PHONE_DISPLAY,
                email: EMAIL,
                contactType: "sales",
                areaServed: "London",
                availableLanguage: ["English"],
            },
        ],
        makesOffer: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: service.title,
                url: `${SITE_URL}${service.href}`,
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

function BreadcrumbJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Contact",
                item: `${SITE_URL}/contact`,
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export default function ContactPage() {
    return (
        <>
            {/* <CrispChat /> */}
            <Nav />
            <ContactPageJsonLd />
            <LocalBusinessJsonLd />
            <BreadcrumbJsonLd />
            <FAQJsonLd />

            <main className="min-h-screen bg-white text-slate-900">
                <nav
                    aria-label="Breadcrumb"
                    className="mx-auto max-w-6xl overflow-x-auto px-5 pt-4 text-xs text-slate-500 sm:px-6 sm:pt-6 sm:text-sm lg:px-8"
                >
                    <Link href="/" className="transition hover:text-emerald-700">
                        Home
                    </Link>
                    <span className="mx-2" aria-hidden="true">
                        /
                    </span>
                    <span className="font-medium text-slate-700">Contact</span>
                </nav>

                <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            London Moving, Storage & Logistics
                        </div>

                        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                            Contact KXH Storage & Logistics
                        </h1>

                        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                            Speak with our London team about moving, managed storage,
                            warehouse space, business storage, student storage,
                            collection or delivery.
                        </p>

                        <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                            Share your addresses, dates, item list and access details so
                            we can understand the work and prepare a tailored quotation.
                        </p>

                        <div className="mx-auto mt-7 grid max-w-4xl grid-cols-1 gap-3 min-[430px]:grid-cols-2 lg:grid-cols-4">
                            {[
                                "Tailored quotations",
                                "Residential and business support",
                                "Collection available",
                                "London-wide coverage",
                            ].map((benefit) => (
                                <div
                                    key={benefit}
                                    className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
                                >
                                    ✓ {benefit}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                            <Link
                                href="/get-a-quote"
                                className="w-full rounded-xl bg-emerald-700 px-6 py-4 text-center font-semibold text-white shadow-lg transition hover:bg-emerald-800 sm:w-auto"
                            >
                                Request a Quote
                            </Link>

                            {CONTACT_NUMBERS.map((contact) => (
                                <a
                                    key={contact.href}
                                    href={contact.href}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                                >
                                    Call {contact.label}
                                </a>
                            ))}

                            <a
                                href={`mailto:${EMAIL}`}
                                className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                            >
                                Email KXH
                            </a>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <TrustpilotPill />
                        </div>
                    </div>
                </section>

                <section className="border-b border-slate-200 bg-white py-6">
                    <div className="mx-auto grid max-w-6xl gap-4 px-5 text-center text-sm font-semibold text-slate-700 sm:grid-cols-2 sm:px-6 lg:grid-cols-6 lg:px-8">
                        {[
                            "Serving London",
                            "Managed Collection",
                            "Secure Storage",
                            "Business Support",
                            "Flexible Scheduling",
                            "Fast Quotations",
                        ].map((item) => (
                            <div
                                key={item}
                                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </section>

                <section
                    aria-labelledby="contact-options"
                    className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Contact Options
                            </p>
                            <h2
                                id="contact-options"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Choose the Best Way to Reach KXH
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Call for a quick conversation, email detailed requirements or
                                use the quote form for a structured service request.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-5 lg:grid-cols-3">
                            {contactMethods.map((method) => (
                                <a
                                    key={method.title}
                                    href={method.href}
                                    className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
                                >
                                    <span
                                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl"
                                        aria-hidden="true"
                                    >
                                        {method.icon}
                                    </span>
                                    <h3 className="mt-5 text-xl font-bold text-slate-950 group-hover:text-emerald-700">
                                        {method.title}
                                    </h3>
                                    <p className="mt-3 leading-7 text-slate-600">
                                        {method.description}
                                    </p>
                                    <span className="mt-5 inline-block font-semibold text-emerald-700">
                                        {method.label} →
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>


                <section
                    aria-labelledby="service-contact-options"
                    className="border-b border-slate-200 bg-white py-16 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Service Enquiries
                            </p>
                            <h2
                                id="service-contact-options"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Contact the Team About a Specific Service
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Choose the enquiry type that best matches your requirements so
                                you can include the most relevant information from the start.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-5 md:grid-cols-2">
                            {serviceContactCards.map((card) => (
                                <a
                                    key={card.title}
                                    href={card.href}
                                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-sm"
                                >
                                    <span className="text-3xl" aria-hidden="true">
                                        {card.icon}
                                    </span>
                                    <h3 className="mt-4 text-xl font-bold text-slate-950 group-hover:text-emerald-700">
                                        {card.title}
                                    </h3>
                                    <p className="mt-3 leading-7 text-slate-600">
                                        {card.description}
                                    </p>
                                    <span className="mt-5 inline-block font-semibold text-emerald-700">
                                        {card.cta} →
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="quote-process"
                    className="border-b border-slate-200 bg-white py-16 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Simple Process
                            </p>
                            <h2
                                id="quote-process"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                From Enquiry to Collection
                            </h2>
                        </div>

                        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    number: "01",
                                    title: "Tell us what you need",
                                    text: "Share the service, locations, dates, items and access requirements.",
                                },
                                {
                                    number: "02",
                                    title: "Receive a tailored quote",
                                    text: "We review the work and prepare a quotation based on your actual requirements.",
                                },
                                {
                                    number: "03",
                                    title: "Confirm your booking",
                                    text: "Choose an available date and complete the required confirmation steps.",
                                },
                                {
                                    number: "04",
                                    title: "We collect, move or store",
                                    text: "Our team carries out the agreed collection, moving, storage or delivery service.",
                                },
                            ].map((step) => (
                                <li
                                    key={step.number}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                                >
                                    <span className="text-sm font-bold text-emerald-700">
                                        {step.number}
                                    </span>
                                    <h3 className="mt-4 text-lg font-bold text-slate-950">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {step.text}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section
                    aria-labelledby="start-enquiry"
                    className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20"
                >
                    <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Ready to Get Started?
                            </p>
                            <h2
                                id="start-enquiry"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Choose the Fastest Way to Start Your Enquiry
                            </h2>
                            <p className="mt-5 max-w-2xl leading-7 text-slate-600">
                                Request a tailored quotation online, call for urgent
                                availability or email detailed requirements with photos,
                                measurements and inventory information.
                            </p>

                            <ul className="mt-8 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                                {[
                                    "Home and apartment moves",
                                    "Business and warehouse storage",
                                    "Student storage",
                                    "Collection and delivery",
                                    "Packing and dismantling",
                                    "Tailored quotations",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                                    >
                                        <span
                                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700"
                                            aria-hidden="true"
                                        >
                                            ✓
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid gap-5">
                            <Link
                                href="/get-a-quote"
                                className="group rounded-2xl border border-emerald-700 bg-emerald-700 p-7 text-white shadow-lg transition hover:bg-emerald-800 hover:shadow-xl"
                            >
                                <span className="text-3xl" aria-hidden="true">
                                    📋
                                </span>
                                <h3 className="mt-5 text-2xl font-bold">
                                    Request a Quote
                                </h3>
                                <p className="mt-3 leading-7 text-emerald-50">
                                    Provide your locations, dates, items and service
                                    requirements through our structured quotation process.
                                </p>
                                <span className="mt-5 inline-flex font-semibold">
                                    Start your quote →
                                </span>
                            </Link>

                            <div className="grid gap-5 sm:grid-cols-2">
                                {CONTACT_NUMBERS.map((contact) => (
                                    <a
                                        key={contact.href}
                                        href={contact.href}
                                        className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm"
                                    >
                                        <span className="text-2xl" aria-hidden="true">
                                            ☎
                                        </span>

                                        <h3 className="mt-4 text-xl font-bold text-slate-950 group-hover:text-emerald-700">
                                            Call {contact.label}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-slate-600">
                                            Best for urgent enquiries, date availability and quick service
                                            questions.
                                        </p>

                                        <span className="mt-5 inline-block font-semibold text-emerald-700">
                                            {contact.phone} →
                                        </span>
                                    </a>
                                ))}

                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm"
                                >
                                    <span className="text-2xl" aria-hidden="true">
                                        ✉
                                    </span>

                                    <h3 className="mt-4 text-xl font-bold text-slate-950 group-hover:text-emerald-700">
                                        Email Our Team
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        Ideal for detailed requirements, photos, inventory lists and business
                                        enquiries.
                                    </p>

                                    <span className="mt-5 inline-block break-all font-semibold text-emerald-700">
                                        {EMAIL} →
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
                                <h3 className="text-2xl font-bold text-slate-950">Prepare for an Accurate Quote</h3>
                                <p className="mt-4 leading-7 text-slate-600">Providing collection and delivery postcodes, preferred dates, access details, parking information and an inventory list helps our team prepare a tailored quotation.</p>
                                <ul className="mt-6 space-y-3 text-slate-700">
                                    <li>✓ Collection & delivery addresses</li>
                                    <li>✓ Item list or estimated volume</li>
                                    <li>✓ Parking and access information</li>
                                    <li>✓ Preferred collection date</li>
                                    <li>✓ Packing or storage requirements</li>
                                </ul>
                            </div>

                            <div className="mt-8 grid gap-8 md:grid-cols-2">
                                <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">

                                    <figcaption className="p-6">
                                        <h3 className="text-lg font-bold text-slate-950">
                                            Moving and Collection
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            Planned household, student and business collections
                                            with optional packing, storage and redelivery.
                                        </p>
                                    </figcaption>
                                </figure>

                                <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">

                                    <figcaption className="p-6">
                                        <h3 className="text-lg font-bold text-slate-950">
                                            Warehouse and Business Support
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            Managed warehouse capacity for stock, pallets, office
                                            assets, furniture and operational overflow.
                                        </p>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="services"
                    className="border-b border-slate-200 bg-white py-16 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Services
                            </p>
                            <h2
                                id="services"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                What Can KXH Help You With?
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                Contact us for one-off residential work, student services or
                                ongoing business storage and logistics support.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {services.map((service) => (
                                <Link
                                    key={service.title}
                                    href={service.href}
                                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-sm"
                                >
                                    <span
                                        className="text-2xl"
                                        aria-hidden="true"
                                    >
                                        {service.icon}
                                    </span>
                                    <h3 className="mt-4 text-lg font-bold text-slate-950 group-hover:text-emerald-700">
                                        {service.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {service.description}
                                    </p>
                                    <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                                        View service →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>


                <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Common Enquiries
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Why Customers Contact KXH
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                We support one-off moves, temporary storage and ongoing
                                commercial requirements across London.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {enquiryScenarios.map((scenario) => (
                                <article
                                    key={scenario.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-6"
                                >
                                    <span className="text-2xl" aria-hidden="true">
                                        {scenario.icon}
                                    </span>
                                    <h3 className="mt-4 text-lg font-bold text-slate-950">
                                        {scenario.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {scenario.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="coverage"
                    className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                    London Coverage
                                </p>
                                <h2
                                    id="coverage"
                                    className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                                >
                                    Moving, Storage and Collection Across London
                                </h2>
                                <p className="mt-5 leading-7 text-slate-600">
                                    KXH supports customers across multiple London boroughs.
                                    Availability depends on the requested service, route,
                                    dates, parking and building access.
                                </p>
                                <p className="mt-4 leading-7 text-slate-600">
                                    Include both postcodes when requesting a quote so the team
                                    can review the route and any congestion, loading or access
                                    requirements.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {londonAreas.map((area) => (
                                    <Link
                                        key={area.name}
                                        href={area.href}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 transition hover:border-emerald-300 hover:text-emerald-700 hover:shadow-sm"
                                    >
                                        {area.name}
                                        <span className="ml-2" aria-hidden="true">
                                            →
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
                    <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                            <iframe
                                title="KXH Storage and Logistics service area map"
                                src="https://www.google.com/maps?q=KXH%20Storage%20%26%20Logistics%20London&output=embed"
                                width="100%"
                                height="100%"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="min-h-[440px] w-full border-0"
                                allowFullScreen
                            />
                        </div>

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Location and Hours
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                Contact Our London Team
                            </h2>
                            <p className="mt-5 leading-7 text-slate-600">
                                KXH serves customers across supported London boroughs.
                                Collection and delivery availability depends on the route,
                                parking, loading restrictions and requested service.
                            </p>

                            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                                <h3 className="font-bold text-slate-950">Opening hours</h3>
                                <dl className="mt-4 space-y-3 text-sm">
                                    {OPENING_HOURS.map((hours) => (
                                        <div
                                            key={hours.label}
                                            className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 last:border-0 last:pb-0"
                                        >
                                            <dt className="font-medium text-slate-700">
                                                {hours.label}
                                            </dt>
                                            <dd className="text-right text-slate-600">
                                                {hours.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
                                <h3 className="font-bold text-slate-950">
                                    Typical response
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Enquiries are reviewed during business hours. For urgent
                                    collections or date availability, call the team directly.
                                </p>

                                <div className="mt-4 flex flex-col gap-2">
                                    {CONTACT_NUMBERS.map((contact) => (
                                        <a
                                            key={contact.href}
                                            href={contact.href}
                                            className="inline-flex font-semibold text-emerald-700 hover:underline"
                                        >
                                            Call {contact.label} ({contact.phone}) →
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="business-support"
                    className="border-y border-slate-200 bg-slate-50 py-14 sm:py-20"
                >
                    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-8">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Business Enquiries
                            </p>

                            <h2
                                id="business-support"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Need Ongoing Storage or Logistics Support?
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600">
                                KXH works with businesses that need additional space,
                                stock collection, office storage, pallet capacity,
                                project support or staged delivery.
                            </p>

                            <p className="mt-4 leading-7 text-slate-600">
                                Tell us what needs collecting, where it is located and
                                how frequently you expect storage or delivery support.
                            </p>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/business-storage-london"
                                    className="rounded-xl bg-emerald-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-emerald-800"
                                >
                                    Explore Business Storage
                                </Link>

                                <a
                                    href={`mailto:${EMAIL}?subject=Business%20Storage%20Enquiry`}
                                    className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Email Business Enquiry
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {industries.map((industry) => (
                                <div
                                    key={industry}
                                    className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-center text-sm font-semibold text-slate-700 shadow-sm"
                                >
                                    {industry}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="why-contact"
                    className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20"
                >
                    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Why KXH
                            </p>
                            <h2
                                id="why-contact"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Practical Support Built Around Your Requirements
                            </h2>
                        </div>

                        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {reasons.map((reason) => (
                                <article
                                    key={reason.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-6"
                                >
                                    <span
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 font-bold text-emerald-700"
                                        aria-hidden="true"
                                    >
                                        ✓
                                    </span>
                                    <h3 className="mt-5 text-lg font-bold text-slate-950">
                                        {reason.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {reason.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                <TestimonialsSection />

                <section
                    aria-labelledby="contact-faq"
                    className="border-b border-slate-200 bg-white py-16 sm:py-20"
                >
                    <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Contact FAQs
                            </p>
                            <h2
                                id="contact-faq"
                                className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                            >
                                Questions Before You Contact KXH
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                These answers cover common questions about quotes, bookings,
                                coverage, packing and business enquiries.
                            </p>
                        </div>

                        <div className="mt-10 space-y-4">
                            {faqs.map((faq) => (
                                <details
                                    key={faq.question}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 open:border-emerald-200 open:bg-white sm:p-6"
                                >
                                    <summary className="cursor-pointer pr-5 text-base font-bold text-slate-950 marker:text-emerald-700 sm:text-lg">
                                        {faq.question}
                                    </summary>
                                    <p className="mt-4 border-t border-slate-200 pt-4 leading-7 text-slate-600">
                                        {faq.answer}
                                    </p>
                                </details>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <Link
                                href="/faqs"
                                className="font-semibold text-emerald-700 hover:underline"
                            >
                                Browse all frequently asked questions →
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="bg-emerald-700 py-16 text-white sm:py-20">
                    <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
                        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
                            Ready to Get Started?
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                            Let&apos;s Discuss Your Moving, Storage or Logistics Requirements
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl leading-7 text-emerald-50">
                            Request a tailored quote, call our London team or send your
                            requirements by email.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                            <Link
                                href="/get-a-quote"
                                className="rounded-xl bg-white px-6 py-4 font-semibold text-emerald-700 transition hover:bg-emerald-50"
                            >
                                Request a Quote
                            </Link>

                            {CONTACT_NUMBERS.map((contact) => (
                                <a
                                    key={contact.href}
                                    href={contact.href}
                                    className="rounded-xl border border-white/40 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
                                >
                                    Call {contact.label}
                                </a>
                            ))}

                            <a
                                href={`mailto:${EMAIL}`}
                                className="rounded-xl border border-white/40 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
                            >
                                Email Us
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <MainFooter locations={londonLocations} />
        </>
    );
}