"use client";

import Image from "next/image";
import { useState } from "react";
import { Home, Package, Tag, HelpCircle, Phone, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: "/#top", label: "Home", icon: Home },
        { href: "/services", label: "Services", icon: Package },
        { href: "/get-a-quote", label: "Pricing", icon: Tag },
        { href: "/#faq", label: "FAQs", icon: HelpCircle },
        { href: "/#contact", label: "Contact", icon: Phone },
    ];

    return (
        <>
            <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
                <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="shrink-0"
                        aria-label="KXH Storage & Logistics home"
                    >
                        <Image
                            src="/logo.webp"
                            alt="KXH Storage & Logistics"
                            width={125}
                            height={30}
                            priority
                            className="h-auto w-[110px] sm:w-[125px]"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav
                        className="hidden items-center gap-6 md:flex"
                        aria-label="Primary navigation"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-semibold text-slate-700 transition hover:text-emerald-700"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-2 md:flex">
                        <a
                            href="tel:+447470025636"
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                        >
                            Call
                        </a>

                        <Link
                            href="/get-a-quote"
                            className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                        >
                            Get Quote
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 md:hidden"
                        aria-label="Open navigation menu"
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                    >
                        <Menu className="h-6 w-6 text-slate-700" aria-hidden="true" />
                    </button>

                </div>
            </header>

            {/* Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/30 backdrop-blur transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsOpen(false)}
            />
            {isOpen && (
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] md:hidden"
                    aria-label="Close navigation menu"
                />
            )}
            <aside
                id="mobile-navigation"
                className={`fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                aria-hidden={!isOpen}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
                    <span className="text-lg font-bold text-slate-900">
                        Menu
                    </span>

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100"
                        aria-label="Close navigation menu"
                    >
                        <X className="h-6 w-6 text-slate-700" aria-hidden="true" />
                    </button>
                </div>

                {/* Logo */}
                <div className="flex justify-center border-b border-slate-200 py-6">
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        aria-label="KXH Storage & Logistics home"
                    >
                        <Image
                            src="/logo.webp"
                            alt="KXH Storage & Logistics"
                            width={125}
                            height={30}
                            className="h-auto w-[125px]"
                        />
                    </Link>
                </div>

                {/* Navigation */}
                <nav
                    className="flex flex-col gap-2 px-4 py-6"
                    aria-label="Mobile navigation"
                >
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-emerald-700"
                            >
                                <Icon
                                    className="h-5 w-5 shrink-0"
                                    aria-hidden="true"
                                />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    {/* Mobile actions */}
                    <div className="mt-5 grid gap-3 border-t border-slate-200 pt-5">
                        <a
                            href="tel:+447470025636"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Call +44 7470 025636
                        </a>

                        <Link
                            href="/get-a-quote"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                        >
                            Get Quote
                        </Link>
                    </div>
                </nav>
            </aside>
        </>
    );
}