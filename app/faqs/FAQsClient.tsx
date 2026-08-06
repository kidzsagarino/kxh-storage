"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CONTACT_NUMBERS } from "../lib/contact";

type FAQ = {
    question: string;
    answer: string;
    link?: {
        href: string;
        label: string;
    };
};

type FAQSection = {
    id: string;
    title: string;
    icon: string;
    description: string;
    faqs: FAQ[];
};

type ServiceLink = {
    title: string;
    href: string;
    description: string;
};

type PopularQuestion = {
    label: string;
    href: string;
};

type Props = {
    sections: FAQSection[];
    serviceShortcuts: ServiceLink[];
    popularQuestions: PopularQuestion[];
    relatedServicesByCategory: Record<string, ServiceLink[]>;
    lastUpdated: string;
};

function toId(sectionId: string, question: string) {
    return `${sectionId}-${question}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export default function FAQsClient({
    sections,
    serviceShortcuts,
    popularQuestions,
    relatedServicesByCategory,
    lastUpdated,
}: Props) {
    const [query, setQuery] = useState("");

    const filteredSections = useMemo(() => {
        const normalized = query.trim().toLowerCase();

        if (!normalized) {
            return sections;
        }

        return sections
            .map((section) => ({
                ...section,
                faqs: section.faqs.filter((faq) =>
                    `${section.title} ${section.description} ${faq.question} ${faq.answer}`
                        .toLowerCase()
                        .includes(normalized),
                ),
            }))
            .filter((section) => section.faqs.length > 0);
    }, [query, sections]);

    const resultCount = filteredSections.reduce(
        (total, section) => total + section.faqs.length,
        0,
    );

    return (
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
                <span className="font-medium text-slate-700">
                    Frequently Asked Questions
                </span>
            </nav>

            <section className="border-b border-slate-200 bg-slate-50 py-14 sm:py-20">
                <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        KXH Help Centre
                    </p>
                    <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                        Storage, Moving and Logistics FAQs
                    </h1>
                    <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                        Find clear answers about moving, managed storage, warehouse
                        services, business logistics, student storage, pricing,
                        collections, deliveries and bookings across London.
                    </p>
                    <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
                        Browse by category, search all questions or contact our team when
                        your requirements depend on specific items, locations, dates or
                        access conditions.
                    </p>

                    <div className="mx-auto mt-7 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
                        <span>
                            Last updated: <strong className="text-slate-800">{lastUpdated}</strong>
                        </span>
                        <span aria-hidden="true">•</span>
                        <span>Reviewed by the KXH Storage & Logistics team</span>
                    </div>

                    <div className="mx-auto mt-8 max-w-2xl">
                        <label htmlFor="faq-search" className="sr-only">
                            Search frequently asked questions
                        </label>
                        <input
                            id="faq-search"
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search questions about moving, storage, pricing..."
                            className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-base shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />
                        {query ? (
                            <p className="mt-3 text-sm text-slate-600" aria-live="polite">
                                {resultCount} {resultCount === 1 ? "answer" : "answers"} found
                            </p>
                        ) : null}
                    </div>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/get-a-quote"
                            className="rounded-xl bg-emerald-700 px-6 py-4 font-semibold text-white transition hover:bg-emerald-800"
                        >
                            Request a Quote
                        </Link>
                        <Link
                            href="/contact"
                            className="rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Contact KXH
                        </Link>
                    </div>
                </div>
            </section>

            {!query ? (
                <>
                    <section
                        aria-labelledby="service-shortcuts"
                        className="border-b border-slate-200 bg-white py-14 sm:py-20"
                    >
                        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-3xl text-center">
                                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                    Service Shortcuts
                                </p>
                                <h2
                                    id="service-shortcuts"
                                    className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                                >
                                    Need Help With a Specific Service?
                                </h2>
                            </div>

                            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {serviceShortcuts.map((service) => (
                                    <Link
                                        key={service.href}
                                        href={service.href}
                                        className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-emerald-300 hover:bg-white hover:shadow-sm"
                                    >
                                        <h3 className="text-lg font-bold text-slate-950">
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

                    <section
                        aria-labelledby="popular-questions"
                        className="border-b border-slate-200 bg-slate-50 py-14 sm:py-20"
                    >
                        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-3xl text-center">
                                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                    Most Popular
                                </p>
                                <h2
                                    id="popular-questions"
                                    className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                                >
                                    Popular Questions
                                </h2>
                            </div>

                            <div className="mt-10 grid gap-4 md:grid-cols-2">
                                {popularQuestions.map((question) => (
                                    <a
                                        key={question.href}
                                        href={question.href}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 transition hover:border-emerald-300 hover:text-emerald-700 hover:shadow-sm"
                                    >
                                        {question.label}
                                        <span className="ml-2" aria-hidden="true">
                                            →
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section
                        aria-labelledby="browse-categories"
                        className="border-b border-slate-200 bg-white py-14 sm:py-20"
                    >
                        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-3xl text-center">
                                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                    Browse by Category
                                </p>
                                <h2
                                    id="browse-categories"
                                    className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                                >
                                    Find the Right Answer Faster
                                </h2>
                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-300 hover:bg-white hover:shadow-sm"
                                    >
                                        <div className="flex items-start gap-4">
                                            <span
                                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl"
                                                aria-hidden="true"
                                            >
                                                {section.icon}
                                            </span>
                                            <div>
                                                <h3 className="font-bold text-slate-950 group-hover:text-emerald-700">
                                                    {section.title}
                                                </h3>
                                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                                    {section.description}
                                                </p>
                                                <span className="mt-3 inline-block text-sm font-semibold text-emerald-700">
                                                    {section.faqs.length} questions →
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            ) : null}

            {filteredSections.length ? (
                filteredSections.map((section, index) => (
                    <section
                        key={section.id}
                        id={section.id}
                        aria-labelledby={`${section.id}-title`}
                        className={`scroll-mt-24 border-b border-slate-200 py-14 sm:py-20 ${index % 2 === 0 ? "bg-slate-50" : "bg-white"
                            }`}
                    >
                        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
                            <div className="flex items-start gap-4">
                                <span
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-2xl"
                                    aria-hidden="true"
                                >
                                    {section.icon}
                                </span>
                                <div>
                                    <h2
                                        id={`${section.id}-title`}
                                        className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                                    >
                                        {section.title}
                                    </h2>
                                    <p className="mt-3 leading-7 text-slate-600">
                                        {section.description}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 space-y-4">
                                {section.faqs.map((faq) => {
                                    const faqId = toId(section.id, faq.question);

                                    return (
                                        <details
                                            key={faq.question}
                                            id={faqId}
                                            className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm open:border-emerald-200 sm:p-6"
                                        >
                                            <summary className="cursor-pointer pr-5 text-base font-bold text-slate-950 marker:text-emerald-700 sm:text-lg">
                                                {faq.question}
                                            </summary>
                                            <div className="mt-4 border-t border-slate-100 pt-4">
                                                <p className="leading-7 text-slate-600">
                                                    {faq.answer}
                                                </p>
                                                {faq.link ? (
                                                    <Link
                                                        href={faq.link.href}
                                                        className="mt-4 inline-flex font-semibold text-emerald-700 hover:underline"
                                                    >
                                                        {faq.link.label} →
                                                    </Link>
                                                ) : null}
                                            </div>
                                        </details>
                                    );
                                })}
                            </div>

                            {!query && relatedServicesByCategory[section.id]?.length ? (
                                <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
                                    <h3 className="text-lg font-bold text-slate-950">
                                        Related Services
                                    </h3>
                                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                        {relatedServicesByCategory[section.id].map((service) => (
                                            <Link
                                                key={`${section.id}-${service.href}`}
                                                href={service.href}
                                                className="rounded-xl border border-emerald-100 bg-white p-4 transition hover:border-emerald-300 hover:shadow-sm"
                                            >
                                                <span className="font-semibold text-emerald-800">
                                                    {service.title} →
                                                </span>
                                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                                    {service.description}
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {!query && index === 5 ? (
                                <div className="mt-12 rounded-3xl bg-emerald-900 p-8 text-center text-white sm:p-10">
                                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
                                        Need Personal Help?
                                    </p>
                                    <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                                        Still Cannot Find the Right Answer?
                                    </h3>
                                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-50">
                                        Tell us about your items, addresses, preferred dates and
                                        access requirements. The KXH team can recommend the most
                                        suitable service.
                                    </p>
                                    <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                                        <Link
                                            href="/get-a-quote"
                                            className="rounded-xl bg-white px-6 py-3 font-semibold text-emerald-900 transition hover:bg-emerald-50"
                                        >
                                            Request a Quote
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
                                        <Link
                                            href="/contact"
                                            className="rounded-xl border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10"
                                        >
                                            Contact Us
                                        </Link>
                                    </div>
                                </div>
                            ) : null}

                            {!query ? (
                                <div className="mt-8 text-right">
                                    <a
                                        href="#browse-categories"
                                        className="text-sm font-semibold text-emerald-700 hover:underline"
                                    >
                                        Back to categories ↑
                                    </a>
                                </div>
                            ) : null}
                        </div>
                    </section>
                ))
            ) : (
                <section className="border-b border-slate-200 bg-white py-20">
                    <div className="mx-auto max-w-3xl px-5 text-center">
                        <h2 className="text-3xl font-bold text-slate-950">
                            No matching questions found
                        </h2>
                        <p className="mt-4 leading-7 text-slate-600">
                            Try a broader search, request a quote or contact our team for
                            help with your specific requirements.
                        </p>
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className="mt-7 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                        >
                            Clear Search
                        </button>
                    </div>
                </section>
            )}

            <section className="bg-emerald-900 py-16 text-white sm:py-20">
                <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
                        Still Need Help?
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl !text-white">
                        Tell Us What You Need
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-50">
                        Our team can review your items, addresses, dates, access
                        requirements and preferred service before preparing a tailored
                        quotation.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/get-a-quote"
                            className="rounded-xl bg-white px-6 py-4 font-semibold text-emerald-900 transition hover:bg-emerald-50"
                        >
                            Request a Quote
                        </Link>
                        <Link
                            href="/contact"
                            className="rounded-xl border border-white/40 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
