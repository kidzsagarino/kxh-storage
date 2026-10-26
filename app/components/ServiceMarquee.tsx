import Link from "next/link";
import {
    Archive,
    Boxes,
    Building2,
    FileText,
    GraduationCap,
    Layers,
    Package,
    PackageCheck,
    ShoppingCart,
    Tag,
    Truck,
    Warehouse,
} from "lucide-react";
import type { ReactNode } from "react";

type Item = { label: string; href: string; icon: ReactNode; promo?: boolean };

const IC = "h-5 w-5";

const ROW_A: Item[] = [
    { label: "Warehouse Storage", href: "/warehouse-storage-london", icon: <Warehouse className={IC} /> },
    { label: "Storage", href: "/get-a-quote?service=storage", icon: <Tag className={IC} />, promo: true },
    { label: "Business Storage", href: "/business-storage-london", icon: <Building2 className={IC} /> },
    { label: "Student Storage", href: "/student-storage-london", icon: <GraduationCap className={IC} /> },
    { label: "Moving Services", href: "/logistics-moving-london", icon: <Truck className={IC} /> },
    { label: "Moving", href: "/get-a-quote?service=moving", icon: <Tag className={IC} />, promo: true },
    { label: "Pallet Storage", href: "/pallet-storage-london", icon: <Layers className={IC} /> },
    { label: "Secure Shredding", href: "/shredding-solutions-london", icon: <FileText className={IC} /> },
    { label: "Shredding", href: "/get-a-quote?service=shredding", icon: <Tag className={IC} />, promo: true },
    { label: "Collection & Delivery", href: "/services", icon: <Package className={IC} /> },
];

const ROW_B: Item[] = [
    { label: "Inventory Management", href: "/inventory-management-london", icon: <PackageCheck className={IC} /> },
    { label: "Third Party Logistics", href: "/third-party-logistics-london", icon: <Boxes className={IC} /> },
    { label: "Ecommerce Storage", href: "/ecommerce-storage-london", icon: <ShoppingCart className={IC} /> },
    { label: "House Removals", href: "/house-removals-london", icon: <Truck className={IC} /> },
    { label: "Office Removals", href: "/office-removals-london", icon: <Building2 className={IC} /> },
    { label: "Archive Storage", href: "/archive-storage-london", icon: <Archive className={IC} /> },
    { label: "Packing Services", href: "/packing-services-london", icon: <Package className={IC} /> },
];

function Row({ items, tone, reverse }: { items: Item[]; tone: "dark" | "lime"; reverse?: boolean }) {
    const dark = tone === "dark";
    // The list is rendered twice so the loop is seamless; the copy is hidden from screen readers.
    const renderList = (copy: boolean) => (
        <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={copy || undefined}>
            {items.map((it) => (
                <li key={it.label + copy} className="flex items-center gap-3">
                    {it.promo ? (
                        <Link
                            href={it.href}
                            tabIndex={copy ? -1 : undefined}
                            className="kxh-chip kxh-promo group flex items-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-r from-lime-300 via-yellow-200 to-lime-300 px-5 py-2.5 text-base font-black text-emerald-950 ring-2 ring-white/60 sm:text-lg"
                        >
                            <span className="kxh-promo-badge rounded-full bg-emerald-950 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-lime-300 sm:text-sm">
                                10% OFF
                            </span>
                            {it.label}
                        </Link>
                    ) : (
                        <Link
                            href={it.href}
                            tabIndex={copy ? -1 : undefined}
                            className={`kxh-chip group flex items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-2.5 text-base font-bold transition sm:text-lg ${
                                dark
                                    ? "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white hover:text-emerald-900"
                                    : "bg-slate-950/5 text-emerald-950 ring-1 ring-emerald-950/10 hover:bg-emerald-950 hover:text-lime-200"
                            }`}
                        >
                            <span
                                className={`grid h-8 w-8 place-items-center rounded-full transition group-hover:rotate-[360deg] group-hover:scale-110 ${
                                    dark ? "bg-lime-300 text-emerald-950" : "bg-emerald-900 text-lime-200"
                                }`}
                                style={{ transitionDuration: "600ms" }}
                            >
                                {it.icon}
                            </span>
                            {it.label}
                        </Link>
                    )}
                    <span
                        aria-hidden="true"
                        className={`kxh-diamond inline-block h-3 w-3 rotate-45 rounded-[2px] ${dark ? "bg-lime-300" : "bg-emerald-800"}`}
                    />
                </li>
            ))}
        </ul>
    );

    return (
        <div className={`kxh-marquee group/row flex overflow-hidden py-3 ${reverse ? "kxh-marquee-reverse" : ""}`}>
            <div className="kxh-marquee-track flex">
                {renderList(false)}
                {renderList(true)}
            </div>
        </div>
    );
}

/** Two crossing, tilted ribbons of services that scroll in opposite directions (3D tape effect). */
export default function ServiceMarquee() {
    return (
        <section aria-label="KXH services" className="kxh-tapes relative overflow-hidden bg-white py-16 sm:py-20">
            <div className="kxh-tapes-stage relative mx-[-4%]">
                {/* Back ribbon (lime), tilted the other way, moving right */}
                <div className="kxh-tape kxh-tape-back absolute inset-x-0 top-1/2 bg-gradient-to-r from-lime-300 via-lime-200 to-emerald-200 shadow-[0_20px_40px_-20px_rgba(6,78,59,0.45)]">
                    <Row items={ROW_B} tone="lime" reverse />
                </div>
                {/* Front ribbon (dark green), moving left */}
                <div className="kxh-tape kxh-tape-front relative bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 shadow-[0_30px_60px_-25px_rgba(2,6,23,0.65)]">
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" aria-hidden="true" />
                    <Row items={ROW_A} tone="dark" />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black/30" aria-hidden="true" />
                </div>
            </div>
        </section>
    );
}
