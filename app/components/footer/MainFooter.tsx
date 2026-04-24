import Link from "next/link";

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
    services = [],
    locations = [],
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
                            Storage Locations
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {locations.map((loc) => (
                                <Link
                                    key={loc.slug}
                                    href={`/storage/${loc.slug}`}
                                    className="text-sm text-slate-600 hover:text-emerald-600"
                                >
                                    Storage {loc.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="mx-auto max-w-screen-xl px-4 py-8 flex flex-wrap items-center justify-between text-sm text-slate-500 sm:px-6 lg:px-8 gap-3">
                <span>© {year} {brandName}</span>

                <div className="flex gap-4 flex-wrap">
                    <a href="/privacy" className="hover:text-slate-700">Privacy</a>
                    <a href="/terms" className="hover:text-slate-700">Terms</a>
                    <a href="/refunds" className="hover:text-slate-700">Refunds</a>
                </div>
            </div>
        </footer>
    );
}