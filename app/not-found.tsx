import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Phone } from "lucide-react";
import Nav from "./components/MobileNav";
import MainFooter from "./components/footer/MainFooter";
import { londonLocations } from "./lib/location";

export const metadata: Metadata = {
    title: "Page not found | KXH Storage & Logistics",
    robots: { index: false, follow: true },
};

const POPULAR = [
    { label: "Warehouse Storage", href: "/warehouse-storage-london" },
    { label: "Student Storage", href: "/student-storage-london" },
    { label: "Moving Services", href: "/logistics-moving-london" },
    { label: "Business Storage", href: "/business-storage-london" },
    { label: "Pallet Storage", href: "/pallet-storage-london" },
    { label: "Document Shredding", href: "/shredding-solutions-london" },
];

export default function NotFound() {
    return (
        <>
            <Nav />
            <main className="bg-gradient-to-b from-emerald-50/60 to-white">
                <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:py-28">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Error 404</p>
                    <h1 className="mt-3 text-4xl font-black text-slate-950 sm:text-5xl">We couldn’t find that page</h1>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
                        The link may be old or the page may have moved. Try one of our popular services, get an instant
                        quote, or call us. We are open 24 hours, 7 days a week.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href="/get-a-quote"
                            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-800"
                        >
                            Get Instant Quote <ArrowRight className="h-4 w-4" />
                        </Link>
                        <a
                            href="tel:+442039165312"
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                            <Phone className="h-4 w-4" /> 020 3916 5312
                        </a>
                    </div>
                    <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {POPULAR.map((p) => (
                            <Link
                                key={p.href}
                                href={p.href}
                                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md"
                            >
                                {p.label} →
                            </Link>
                        ))}
                    </div>
                    <Link href="/" className="mt-10 inline-block font-semibold text-emerald-700 hover:underline">
                        Back to the homepage
                    </Link>
                </div>
            </main>
            <MainFooter locations={londonLocations} />
        </>
    );
}
