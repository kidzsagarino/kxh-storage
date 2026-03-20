"use client";

import Image from "next/image";
import { useState } from "react";
import { Home, Package, Tag, HelpCircle, Phone, Menu, X } from "lucide-react";

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: "#top", label: "Home", icon: Home },
        { href: "#services", label: "Services", icon: Package },
        { href: "#pricing", label: "Pricing", icon: Tag },
        { href: "#faq", label: "FAQ", icon: HelpCircle },
        { href: "#contact", label: "Contact", icon: Phone },
    ];

    return (
        <>
            {/* Desktop Header */}
            <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
                    {/* Logo */}
                    <a href="#top" className="text-lg font-black text-emerald-700">
                        <Image src="/logo.png" alt="KXH Logo" width={125} height={30} />
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-6 md:flex">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center gap-2">
                        <a
                            href="tel:+441474396663"
                            className="rounded-xl border border-slate-200 px-3 sm:px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                        >
                            Call
                        </a>
                        <a
                            href="#quote"
                            onClick={() => {
                                document.getElementById("pricing")?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                            }}
                            className="inline-flex rounded-xl bg-slate-900 px-3 sm:px-4 py-2 text-sm font-semibold text-white shadow-sm"
                        >
                            Get Quote
                        </a>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
                        aria-label="Open menu"
                    >
                        <Menu className="h-6 w-6 text-slate-700" />
                    </button>
                </div>
            </header>

            {/* Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/30 backdrop-blur transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transition-transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Close button */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
                    <span className="text-lg font-bold text-slate-900">Menu</span>
                    <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                        <X className="h-6 w-6 text-slate-700" />
                    </button>
                </div>

                {/* Logo centered */}
                <div className="flex justify-center py-6 border-b border-slate-200">
                    <Image src="/logo.png" alt="KXH Logo" width={125} height={30} />
                </div>

                {/* Nav Items */}
                <nav className="flex flex-col px-4 py-6 gap-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-2 py-2 text-slate-700 font-medium rounded-lg hover:bg-slate-100"
                            >
                                <Icon className="h-5 w-5" />
                                {item.label}
                            </a>
                        );
                    })}

                    {/* Call & Quote buttons in sidebar for mobile */}
                    <a
                        href="tel:+441474396663"
                        className="mt-4 flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                    >
                        Call
                    </a>
                    <a
                        href="#quote"
                        className="mt-2 flex items-center justify-center rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                    >
                        Get Quote
                    </a>
                </nav>
            </aside>
        </>
    );
}