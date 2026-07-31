"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    Archive,
    Boxes,
    BriefcaseBusiness,
    Building2,
    ChevronDown,
    CircleHelp,
    FileText,
    Home,
    MapPin,
    Menu,
    PackageCheck,
    Phone,
    School,
    ShieldCheck,
    Truck,
    Warehouse,
    X,
} from "lucide-react";
import SocialLinks from "./SocialLinks";

const PHONE_DISPLAY = "+44 7386 277785";
const PHONE_HREF = "tel:+447386277785";

const primaryNavItems = [
    {
        href: "/",
        label: "Home",
        icon: Home,
        exact: true,
    },
    {
        href: "/business-storage-london",
        label: "Business Storage",
        icon: BriefcaseBusiness,
    },
    {
        href: "/logistics-moving-london",
        label: "Moving Services",
        icon: Truck,
    },
];

const serviceGroups = [
    {
        title: "Storage Services",
        items: [
            {
                href: "/warehouse-storage-london",
                label: "Warehouse Storage",
                description: "Secure managed storage for stock and equipment.",
                icon: Warehouse,
            },
            {
                href: "/student-storage-london",
                label: "Student Storage",
                description: "Collection, storage and return for students.",
                icon: School,
            },
            {
                href: "/pallet-storage-london",
                label: "Pallet Storage",
                description: "Flexible pallet space for London businesses.",
                icon: Boxes,
            },
            {
                href: "/commercial-storage-london",
                label: "Commercial Storage",
                description: "Scalable storage for growing organisations.",
                icon: Building2,
            },
        ],
    },
    {
        title: "Business Support",
        items: [
            {
                href: "/inventory-management-london",
                label: "Inventory Management",
                description: "Organised stock storage, listing and handling.",
                icon: PackageCheck,
            },
            {
                href: "/shredding-solutions-london",
                label: "Secure Shredding",
                description: "Confidential document collection and disposal.",
                icon: ShieldCheck,
            },
            {
                href: "/services",
                label: "All Services",
                description: "Explore every KXH storage and logistics service.",
                icon: Archive,
            },
        ],
    },
];

const locations = [
    {
        href: "/warehouse-storage-london/camden",
        label: "Camden",
    },
    {
        href: "/warehouse-storage-london/westminster",
        label: "Westminster",
    },
    {
        href: "/warehouse-storage-london/hackney",
        label: "Hackney",
    },
    {
        href: "/warehouse-storage-london/islington",
        label: "Islington",
    },
    {
        href: "/warehouse-storage-london/lambeth",
        label: "Lambeth",
    },
    {
        href: "/warehouse-storage-london/southwark",
        label: "Southwark",
    },
    {
        href: "/warehouse-storage-london/tower-hamlets",
        label: "Tower Hamlets",
    },
    {
        href: "/warehouse-storage-london/kensington-chelsea",
        label: "Kensington & Chelsea",
    },
];

const informationItems = [
    {
        href: "/faqs",
        label: "FAQs",
        icon: CircleHelp,
    },
    {
        href: "/contact",
        label: "Contact",
        icon: Phone,
    },
];

export default function Nav() {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const [openDesktopMenu, setOpenDesktopMenu] = useState<
        "services" | "locations" | null
    >(null);

    const navRef = useRef<HTMLElement>(null);

    const isActive = (href: string, exact = false) => {
        if (exact) {
            return pathname === href;
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const isServicesActive = serviceGroups.some((group) =>
        group.items.some((item) => isActive(item.href)),
    );

    const isLocationsActive = locations.some((location) =>
        isActive(location.href),
    );

    const closeMenus = () => {
        setIsOpen(false);
        setOpenDesktopMenu(null);
    };

    useEffect(() => {
        closeMenus();
    }, [pathname]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeMenus();
            }
        };

        window.addEventListener("keydown", closeOnEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", closeOnEscape);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                navRef.current &&
                !navRef.current.contains(event.target as Node)
            ) {
                setOpenDesktopMenu(null);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/95 backdrop-blur">
                <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <Link
                        href="/"
                        className="shrink-0"
                        aria-label="KXH Storage & Logistics London home"
                    >
                        <Image
                            src="/logo.webp"
                            alt="KXH Storage & Logistics London"
                            width={125}
                            height={30}
                            priority
                            className="h-auto w-[110px] sm:w-[125px]"
                        />
                    </Link>

                    <nav
                        ref={navRef}
                        className="hidden items-center gap-1 xl:flex"
                        aria-label="Primary navigation"
                    >
                        {primaryNavItems.map((item) => {
                            const active = isActive(
                                item.href,
                                item.exact,
                            );

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={
                                        active ? "page" : undefined
                                    }
                                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${active
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        {/* Services mega menu */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenDesktopMenu((current) =>
                                        current === "services"
                                            ? null
                                            : "services",
                                    )
                                }
                                aria-expanded={
                                    openDesktopMenu === "services"
                                }
                                aria-controls="desktop-services-menu"
                                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${isServicesActive
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                                    }`}
                            >
                                Services

                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${openDesktopMenu === "services"
                                        ? "rotate-180"
                                        : ""
                                        }`}
                                    aria-hidden="true"
                                />
                            </button>

                            {openDesktopMenu === "services" && (
                                <div
                                    id="desktop-services-menu"
                                    className="absolute left-1/2 top-full mt-3 w-[650px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
                                >
                                    <div className="grid grid-cols-2 gap-6">
                                        {serviceGroups.map((group) => (
                                            <div key={group.title}>
                                                <p className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                                                    {group.title}
                                                </p>

                                                <div className="grid gap-1">
                                                    {group.items.map(
                                                        (item) => {
                                                            const Icon =
                                                                item.icon;

                                                            return (
                                                                <Link
                                                                    key={
                                                                        item.href
                                                                    }
                                                                    href={
                                                                        item.href
                                                                    }
                                                                    className="group flex gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                                                                >
                                                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                                                                        <Icon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>

                                                                    <span>
                                                                        <span className="block text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </span>

                                                                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                                                                            {
                                                                                item.description
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                </Link>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Locations dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenDesktopMenu((current) =>
                                        current === "locations"
                                            ? null
                                            : "locations",
                                    )
                                }
                                aria-expanded={
                                    openDesktopMenu === "locations"
                                }
                                aria-controls="desktop-locations-menu"
                                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${isLocationsActive
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                                    }`}
                            >
                                Locations

                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${openDesktopMenu === "locations"
                                        ? "rotate-180"
                                        : ""
                                        }`}
                                    aria-hidden="true"
                                />
                            </button>

                            {openDesktopMenu === "locations" && (
                                <div
                                    id="desktop-locations-menu"
                                    className="absolute right-0 top-full mt-3 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl"
                                >
                                    <div className="mb-3 flex items-center gap-2 px-2">
                                        <MapPin
                                            className="h-4 w-4 text-emerald-700"
                                            aria-hidden="true"
                                        />

                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                                            London service areas
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-1">
                                        {locations.map((location) => (
                                            <Link
                                                key={location.href}
                                                href={location.href}
                                                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                                            >
                                                {location.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {informationItems.map((item) => {
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={
                                        active ? "page" : undefined
                                    }
                                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${active
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                    </nav>
                    <div className="hidden xl:block">
                        <SocialLinks
                            variant="brand"
                            size="sm"
                            className="justify-center"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Mobile */}
                        <a
                            href={PHONE_HREF}
                            aria-label={`Call KXH Storage and Logistics on ${PHONE_DISPLAY}`}
                            className="inline-flex xl:hidden items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Call
                        </a>

                        <Link
                            href="/get-a-quote"
                            className="inline-flex xl:hidden items-center justify-center rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                        >
                            Quote
                        </Link>

                        {/* Desktop */}
                        <div className="hidden xl:flex items-center gap-2">
                            <a
                                href={PHONE_HREF}
                                aria-label={`Call KXH Storage and Logistics on ${PHONE_DISPLAY}`}
                                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                            >
                                Call KXH
                            </a>

                            <Link
                                href="/get-a-quote"
                                className="inline-flex rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:bg-emerald-800"
                            >
                                Get Free Quote
                            </Link>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 xl:hidden"
                        aria-label="Open navigation menu"
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                    >
                        <Menu
                            className="h-6 w-6 text-slate-700"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </header>

            {/* Mobile backdrop */}
            <button
                type="button"
                onClick={closeMenus}
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 xl:hidden ${isOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
                aria-label="Close navigation menu"
                tabIndex={isOpen ? 0 : -1}
            />

            {/* Mobile navigation */}
            <aside
                id="mobile-navigation"
                className={`fixed left-0 top-0 z-50 h-dvh w-[min(20rem,calc(100vw-2rem))] max-w-full overflow-y-auto bg-white shadow-2xl transition-transform duration-300 xl:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                aria-hidden={!isOpen}
                aria-label="Mobile navigation menu"
            >
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
                    <span className="text-lg font-bold text-slate-900">
                        Menu
                    </span>

                    <button
                        type="button"
                        onClick={closeMenus}
                        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
                        aria-label="Close navigation menu"
                    >
                        <X
                            className="h-6 w-6 text-slate-700"
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div className="flex justify-center border-b border-slate-200 py-6">
                    <Link
                        href="/"
                        onClick={closeMenus}
                        aria-label="KXH Storage & Logistics London home"
                    >
                        <Image
                            src="/logo.webp"
                            alt="KXH Storage & Logistics London"
                            width={125}
                            height={30}
                            className="h-auto w-[125px]"
                        />
                    </Link>
                </div>

                <nav
                    className="px-4 py-6"
                    aria-label="Mobile primary navigation"
                >
                    {/* Main services */}
                    <div>
                        <p className="mb-2 px-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                            Main Services
                        </p>

                        <div className="grid gap-1">
                            {primaryNavItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(
                                    item.href,
                                    item.exact,
                                );

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={closeMenus}
                                        aria-current={
                                            active ? "page" : undefined
                                        }
                                        className={`flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition ${active
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "text-slate-700 hover:bg-slate-100 hover:text-emerald-700"
                                            }`}
                                    >
                                        <Icon
                                            className="h-5 w-5 shrink-0"
                                            aria-hidden="true"
                                        />

                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                    </div>

                    {/* Other services */}
                    <div className="mt-6 border-t border-slate-200 pt-5">
                        <p className="mb-2 px-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                            More Services
                        </p>

                        <div className="grid gap-1">
                            {serviceGroups
                                .flatMap((group) => group.items)
                                .map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={closeMenus}
                                            aria-current={
                                                active
                                                    ? "page"
                                                    : undefined
                                            }
                                            className={`flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition ${active
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "text-slate-700 hover:bg-slate-100 hover:text-emerald-700"
                                                }`}
                                        >
                                            <Icon
                                                className="h-5 w-5 shrink-0"
                                                aria-hidden="true"
                                            />

                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>

                    {/* Locations */}
                    <div className="mt-6 border-t border-slate-200 pt-5">
                        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                            London Locations
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                            {locations.map((location) => (
                                <Link
                                    key={location.href}
                                    href={location.href}
                                    onClick={closeMenus}
                                    className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                                >
                                    {location.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Information */}
                    <div className="mt-6 border-t border-slate-200 pt-5">
                        <p className="mb-2 px-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                            Information
                        </p>

                        <div className="grid gap-1">
                            {informationItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={closeMenus}
                                        aria-current={
                                            active ? "page" : undefined
                                        }
                                        className={`flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition ${active
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "text-slate-700 hover:bg-slate-100 hover:text-emerald-700"
                                            }`}
                                    >
                                        <Icon
                                            className="h-5 w-5 shrink-0"
                                            aria-hidden="true"
                                        />

                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile actions */}
                    <div className="mt-6 grid gap-3 border-t border-slate-200 pt-5">
                        <SocialLinks variant="brand" className="justify-center md:justify-end" size="sm" />

                        <a
                            href={PHONE_HREF}
                            onClick={closeMenus}
                            aria-label={`Call KXH Storage and Logistics on ${PHONE_DISPLAY}`}
                            className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Call {PHONE_DISPLAY}
                        </a>

                        <Link
                            href="/get-a-quote"
                            onClick={closeMenus}
                            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                        >
                            <FileText
                                className="h-4 w-4"
                                aria-hidden="true"
                            />

                            Get Free Quote
                        </Link>

                    </div>
                </nav>
            </aside>
        </>
    );
}