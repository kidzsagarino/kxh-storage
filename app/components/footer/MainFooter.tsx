import Link from "next/link";
import FloatingTrustpilot from "../trustpilot/FloatingTrustpilot";

type Location = {
    name: string;
    slug: string;
};

type Service = {
    label: string;
    href: string;
};

type FooterProps = {
    brandName?: string;
    year?: number;
    services?: Service[];
    locations?: Location[];
};

export default function MainFooter({
    brandName = "KXH Storage & Logistics",
    year = new Date().getFullYear(),
    services = [
        { label: "Warehouse Storage", href: "/warehouse-storage-london" },
        { label: "Business Storage", href: "/business-storage-london" },
        { label: "Inventory Management", href: "/inventory-management-london" },
        { label: "Pallet Storage", href: "/pallet-storage-london" },
        { label: "Commercial Storage", href: "/commercial-storage-london" },
        { label: "Moving Services", href: "/logistics-moving-london" },
        { label: "Document Shredding", href: "/shredding-solutions-london" },
    ],
    locations = [{ name: "London, UK", slug: "london-uk" }],
}: FooterProps) {
    return (
        <footer className="bg-white border-t border-slate-200/70">
            <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">

                {/* TOP FOOTER GRID */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-black text-slate-900 mb-3">
                            Services
                        </h3>
                        <div className="flex flex-col gap-2 text-sm text-slate-600">
                            {services.map((service) => (
                                <Link
                                    key={service.href}
                                    href={service.href}
                                    className="hover:text-emerald-600"
                                >
                                    {service.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Locations */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <h3 className="text-sm font-black text-slate-900 mb-3">
                            Warehouse Storage Locations
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {locations.map((loc) => (
                                <Link
                                    key={loc.slug}
                                    href={`/warehouse-storage-london/${loc.slug}`}
                                    className="text-sm text-slate-600 hover:text-emerald-600"
                                >
                                    Warehouse Storage {loc.name}
                                </Link>
                            ))}
                        </div>


                    </div>


                </div>
            </div>
            <div className="flex justify-center">
                <FloatingTrustpilot />
            </div>
            {/* BOTTOM BAR */}
            <div className="mx-auto max-w-screen-xl px-4 py-8 flex flex-wrap items-center justify-between text-sm text-slate-500 sm:px-6 lg:px-8 gap-3">
                <div className="text-sm text-slate-500 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span>© {year} {brandName}</span>
                    <span className="hidden sm:inline">·</span>
                    <span>10 Northridge Road, London DA12 5AY</span>
                    <span className="hidden sm:inline">·</span>
                    <span>01474 396663</span>
                </div>

                <div className="flex gap-4 flex-wrap">
                    <a href="/privacy" className="hover:text-slate-700">Privacy</a>
                    <a href="/terms" className="hover:text-slate-700">Terms</a>
                    <a href="/refunds" className="hover:text-slate-700">Refunds</a>
                </div>
            </div>
        </footer>
    );
}