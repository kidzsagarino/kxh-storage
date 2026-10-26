"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds a light fade-up to elements with the `kxh-reveal` class.
 * Content is fully visible without JavaScript, and elements start animating
 * 200px before they enter the screen so fast scrolling never shows blank areas.
 */
export default function RevealObserver() {
    const pathname = usePathname();

    useEffect(() => {
        const root = document.documentElement;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
            return;
        }
        const items = Array.from(document.querySelectorAll<HTMLElement>(".kxh-reveal:not(.is-in)"));
        const vh = window.innerHeight;
        // Anything already on screen is shown straight away.
        items.forEach((el) => {
            if (el.getBoundingClientRect().top < vh) el.classList.add("is-in");
        });
        root.classList.add("kxh-reveal-ready");

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-in");
                        io.unobserve(e.target);
                    }
                });
            },
            { rootMargin: "0px 0px 320px 0px", threshold: 0 },
        );
        items.forEach((el) => {
            if (!el.classList.contains("is-in")) io.observe(el);
        });
        return () => io.disconnect();
    }, [pathname]);

    return null;
}
