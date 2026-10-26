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
import { CONTACT_NUMBERS } from "../lib/contact";

const PHONE_DISPLAY = CONTACT_NUMBERS[0].phone;
const PHONE_HREF = CONTACT_NUMBERS[0].href;

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

const megaServiceColumns = [
    {
        title: "Storage",
        items: [
            { href: "/warehouse-storage-london", label: "Warehouse Storage" },
            { href: "/business-storage-london", label: "Business Storage" },
            { href: "/student-storage-london", label: "Student Storage" },
            { href: "/pallet-storage-london", label: "Pallet Storage" },
            { href: "/commercial-storage-london", label: "Commercial Storage" },
            { href: "/ecommerce-storage-london", label: "Ecommerce Storage" },
            { href: "/retail-stock-storage-london", label: "Retail Stock Storage" },
            { href: "/furniture-storage-london", label: "Furniture Storage" },
            { href: "/archive-storage-london", label: "Archive Storage" },
            { href: "/event-equipment-storage-london", label: "Event Equipment Storage" },
            { href: "/healthcare-storage-london", label: "Healthcare Storage" },
        ],
    },
    {
        title: "Moving & removals",
        items: [
            { href: "/logistics-moving-london", label: "Moving Services" },
            { href: "/house-removals-london", label: "House Removals" },
            { href: "/office-removals-london", label: "Office Removals" },
            { href: "/moving-house-storage-london", label: "Moving & Storage" },
            { href: "/packing-services-london", label: "Packing Services" },
        ],
    },
    {
        title: "Business logistics",
        items: [
            { href: "/inventory-management-london", label: "Inventory Management" },
            { href: "/third-party-logistics-london", label: "Third Party Logistics" },
            { href: "/shredding-solutions-london", label: "Document Shredding" },
        ],
    },
];

const boroughs = [
    { slug: "camden", label: "Camden" },
    { slug: "westminster", label: "Westminster" },
    { slug: "hackney", label: "Hackney" },
    { slug: "islington", label: "Islington" },
    { slug: "kensington-chelsea", label: "Kensington & Chelsea" },
    { slug: "tower-hamlets", label: "Tower Hamlets" },
    { slug: "southwark", label: "Southwark" },
    { slug: "lambeth", label: "Lambeth" },
];

const boroughServices = [
    { href: "/warehouse-storage-london", label: "Warehouse Storage" },
    { href: "/business-storage-london", label: "Business Storage" },
    { href: "/logistics-moving-london", label: "Moving Services" },
    { href: "/inventory-management-london", label: "Inventory Management" },
    { href: "/pallet-storage-london", label: "Pallet Storage" },
    { href: "/commercial-storage-london", label: "Commercial Storage" },
    { href: "/third-party-logistics-london", label: "Third Party Logistics" },
    { href: "/shredding-solutions-london", label: "Document Shredding" },
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

    const [activeBorough, setActiveBorough] = useState(boroughs[0].slug);
    const currentBorough = boroughs.find((b) => b.slug === activeBorough) ?? boroughs[0];
    const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hoverOpenedAt = useRef(0);
    const openOnHover = (menu: "services" | "locations") => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        if (window.matchMedia("(hover: hover)").matches) {
            hoverOpenedAt.current = Date.now();
            setOpenDesktopMenu(menu);
        }
    };
    // A click right after hover-open should keep the menu open, not toggle it shut.
    const toggleMenu = (menu: "services" | "locations") => {
        const justHovered = Date.now() - hoverOpenedAt.current < 600;
        setOpenDesktopMenu((current) => (current === menu && !justHovered ? null : menu));
    };
    const closeOnLeave = () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => setOpenDesktopMenu(null), 180);
    };

    const navRef = useRef<HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let frame = 0;
        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const y = window.scrollY;
                const max = document.documentElement.scrollHeight - window.innerHeight;
                setScrolled(y > 12);
                setProgress(max > 0 ? Math.min(1, y / max) : 0);
            });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const isActive = (href: string, exact = false) => {
        if (exact) {
            return pathname === href;
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const isServicesActive = megaServiceColumns.some((col) =>
        col.items.some((item) => isActive(item.href) && item.href !== "/business-storage-london" && item.href !== "/logistics-moving-london"),
    );

    const isLocationsActive = boroughs.some((b) => pathname.endsWith(`/${b.slug}`));

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
            <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-all duration-300 ${scrolled ? "border-slate-200 bg-white/85 shadow-lg shadow-slate-900/5" : "border-transparent bg-white/95"}`}>
                <div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-lime-300 transition-[width] duration-150"
                    style={{ width: `${progress * 100}%` }}
                    aria-hidden="true"
                />
                <div className={`mx-auto flex w-full max-w-screen-xl items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${scrolled ? "py-2" : "py-3"}`}>
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
                            className={`h-auto transition-all duration-300 ${scrolled ? "w-[100px] sm:w-[112px]" : "w-[110px] sm:w-[125px]"}`}
                        />
                    </Link>

                    <nav
                        ref={navRef}
                        className="hidden items-center gap-0.5 lg:flex xl:gap-1"
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
                                    className={`kxh-navlink relative whitespace-nowrap rounded-lg px-2 py-2 text-sm font-semibold transition xl:px-3 ${item.exact ? "hidden xl:block" : ""} ${active
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        {/* Services mega menu (full width) */}
                        <div
                            onMouseEnter={() => openOnHover("services")}
                            onMouseLeave={closeOnLeave}
                        >
                            <button
                                type="button"
                                onClick={() => toggleMenu("services")}
                                aria-expanded={openDesktopMenu === "services"}
                                aria-controls="desktop-services-menu"
                                className={`kxh-navlink relative flex items-center whitespace-nowrap gap-1 rounded-lg px-2 py-2 text-sm font-semibold transition xl:px-3 ${openDesktopMenu === "services"
                                    ? "bg-slate-950 text-white"
                                    : isServicesActive
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                                    }`}
                            >
                                Services
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${openDesktopMenu === "services" ? "rotate-180" : ""}`}
                                    aria-hidden="true"
                                />
                            </button>

                            {openDesktopMenu === "services" && (
                                <div
                                    id="desktop-services-menu"
                                    className="kxh-drop absolute inset-x-0 top-full border-t border-slate-200 bg-white shadow-2xl shadow-slate-900/10"
                                >
                                    <div className="mx-auto grid max-w-screen-xl grid-cols-[1.6fr_0.9fr_0.9fr_1.1fr] gap-8 px-8 py-8">
                                        {megaServiceColumns.map((col) => (
                                            <div key={col.title}>
                                                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                                    {col.title}
                                                </p>
                                                <ul className={col.items.length > 6 ? "grid grid-cols-2 gap-x-6 gap-y-1" : "grid gap-1"}>
                                                    {col.items.map((item) => (
                                                        <li key={item.href}>
                                                            <Link
                                                                href={item.href}
                                                                className={`block rounded-lg py-1.5 text-[15px] transition hover:translate-x-1 hover:text-emerald-700 ${isActive(item.href) ? "font-semibold text-emerald-700" : "text-slate-800"}`}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                        <Link
                                            href="/services"
                                            className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-2xl bg-slate-900 p-6"
                                        >
                                            <Image
                                                src="/images/warehouse.webp"
                                                alt="KXH Storage & Logistics warehouse in London"
                                                fill
                                                sizes="320px"
                                                className="object-cover opacity-70 transition duration-700 group-hover:scale-105"
                                            />
                                            <span className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/10" aria-hidden="true" />
                                            <span className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-lime-300">All services</span>
                                            <span className="relative mt-2 text-2xl font-black leading-tight text-white">Storage, moving &amp; logistics across London</span>
                                            <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-bold text-white">
                                                View all services <span aria-hidden="true" className="transition group-hover:translate-x-1">&rarr;</span>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Locations mega menu (full width) */}
                        <div
                            onMouseEnter={() => openOnHover("locations")}
                            onMouseLeave={closeOnLeave}
                        >
                            <button
                                type="button"
                                onClick={() => toggleMenu("locations")}
                                aria-expanded={openDesktopMenu === "locations"}
                                aria-controls="desktop-locations-menu"
                                className={`kxh-navlink relative flex items-center whitespace-nowrap gap-1 rounded-lg px-2 py-2 text-sm font-semibold transition xl:px-3 ${openDesktopMenu === "locations"
                                    ? "bg-slate-950 text-white"
                                    : isLocationsActive
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                                    }`}
                            >
                                Locations
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${openDesktopMenu === "locations" ? "rotate-180" : ""}`}
                                    aria-hidden="true"
                                />
                            </button>

                            {openDesktopMenu === "locations" && (
                                <div
                                    id="desktop-locations-menu"
                                    className="kxh-drop absolute inset-x-0 top-full border-t border-slate-200 bg-white shadow-2xl shadow-slate-900/10"
                                >
                                    <div className="mx-auto grid max-w-screen-xl grid-cols-[0.75fr_1.25fr] gap-10 px-8 py-8">
                                        <div>
                                            <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                                <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> London boroughs
                                            </p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {boroughs.map((b) => (
                                                    <Link
                                                        key={b.slug}
                                                        href={`/warehouse-storage-london/${b.slug}`}
                                                        onMouseEnter={() => setActiveBorough(b.slug)}
                                                        onFocus={() => setActiveBorough(b.slug)}
                                                        className={`rounded-xl px-3 py-2.5 text-[15px] font-medium transition ${activeBorough === b.slug ? "bg-slate-950 text-white" : "text-slate-800 hover:bg-slate-100"}`}
                                                    >
                                                        {b.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="rounded-2xl border border-slate-200 p-6">
                                            <div className="flex items-baseline justify-between gap-4">
                                                <p className="text-2xl font-black text-slate-950">
                                                    Services in {currentBorough.label}
                                                </p>
                                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                                    {boroughServices.length} local services
                                                </p>
                                            </div>
                                            <div className="mt-5 grid grid-cols-2 gap-2">
                                                {boroughServices.map((svc) => (
                                                    <Link
                                                        key={svc.href}
                                                        href={`${svc.href}/${currentBorough.slug}`}
                                                        className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-slate-800 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800"
                                                    >
                                                        {svc.label} in {currentBorough.label}
                                                        <span aria-hidden="true" className="text-emerald-600 transition group-hover:translate-x-1">&rarr;</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
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
                                    className={`kxh-navlink relative whitespace-nowrap rounded-lg px-2 py-2 text-sm font-semibold transition xl:px-3 ${active
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                    </nav>
                    <div className="hidden min-[1720px]:block">
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
                            className="inline-flex lg:hidden items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Call
                        </a>

                        <Link
                            href="/get-a-quote"
                            className="inline-flex lg:hidden items-center justify-center rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                        >
                            Quote
                        </Link>

                        {/* Desktop */}
                        <div className="hidden lg:flex items-center gap-2">
                            <a
                                href={PHONE_HREF}
                                aria-label={`Call KXH Storage and Logistics on ${PHONE_DISPLAY}`}
                                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 xl:px-4"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                </span>
                                <Phone className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                                <span className="hidden xl:inline">{PHONE_DISPLAY.replace("+44 ", "0")}</span>
                                <span className="xl:hidden">Call</span>
                            </a>

                            <Link
                                href="/get-a-quote"
                                className="kxh-shine relative inline-flex overflow-hidden whitespace-nowrap rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-700/25 transition hover:-translate-y-0.5 hover:bg-emerald-800"
                            >
                                Get Free Quote
                            </Link>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 lg:hidden"
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
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 lg:hidden ${isOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
                aria-label="Close navigation menu"
                tabIndex={isOpen ? 0 : -1}
            />

            {/* Mobile navigation */}
            <aside
                id="mobile-navigation"
                className={`fixed left-0 top-0 z-50 h-dvh w-[min(20rem,calc(100vw-2rem))] max-w-full overflow-y-auto bg-white shadow-2xl transition-transform duration-300 lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
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