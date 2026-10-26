"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Phone } from "lucide-react";

const PHONE_HREF = "tel:+442039165312";
const PHONE_LABEL = "020 3916 5312";
// WhatsApp goes to the mobile number (07470 025636).
const WHATSAPP_HREF =
    "https://wa.me/447470025636?text=" + encodeURIComponent("Hi KXH, I would like a quote for storage / moving in London.");

// Pages where the floating buttons would get in the way (admin, booking and payment flows).
const HIDE_ON = ["/admin", "/checkout", "/login", "/billing", "/payment", "/order-summary", "/success", "/client-inventory"];

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
            <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.54 1.74 6.52L3 29l6.65-1.74A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.62c-2.02 0-4-.54-5.72-1.57l-.41-.24-3.95 1.03 1.05-3.85-.27-.4A10.6 10.6 0 0 1 5.4 16c0-5.86 4.77-10.62 10.64-10.62 5.86 0 10.6 4.76 10.6 10.62 0 5.87-4.74 10.62-10.6 10.62Zm5.83-7.95c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
        </svg>
    );
}

export default function FloatingContact() {
    const pathname = usePathname() || "/";
    if (HIDE_ON.some((p) => pathname === p || pathname.startsWith(p + "/"))) return null;
    const onQuotePage = pathname.startsWith("/get-a-quote");

    const btn =
        "group relative grid h-12 w-12 place-items-center rounded-full text-white shadow-xl ring-2 ring-white/80 transition duration-300 hover:-translate-x-1 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 sm:h-14 sm:w-14";
    const tip =
        "pointer-events-none absolute right-full mr-3 hidden translate-x-2 whitespace-nowrap rounded-xl bg-slate-950 px-3 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block";

    return (
        <div
            className="fixed right-3 top-1/2 z-[45] flex -translate-y-1/2 flex-col items-end gap-3 sm:right-5 print:hidden"
            role="complementary"
            aria-label="Quick contact"
        >
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#25D366]`} aria-label="Chat with KXH on WhatsApp">
                <WhatsAppIcon className="relative h-6 w-6 sm:h-7 sm:w-7" />
                <span className={tip}>WhatsApp us</span>
            </a>

            <a href={PHONE_HREF} className={`${btn} bg-emerald-700`} aria-label={`Call KXH on ${PHONE_LABEL}`}>
                <Phone className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                <span className={tip}>Call {PHONE_LABEL}</span>
            </a>

            {!onQuotePage && (
                <Link
                    href="/get-a-quote"
                    className="kxh-jump kxh-quote-blink kxh-shine group relative flex items-center justify-center overflow-hidden rounded-full bg-slate-950 text-white shadow-xl ring-2 ring-white/80 transition duration-300 hover:-translate-x-1 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-4 max-sm:h-12 max-sm:w-12 sm:rounded-2xl sm:px-3 sm:py-4"
                    aria-label="Get an instant quote"
                >
                    <FileText className="h-5 w-5 sm:hidden" aria-hidden="true" />
                    <span className="hidden text-sm font-bold tracking-wide sm:block [writing-mode:vertical-rl] rotate-180">Get a Quote</span>
                </Link>
            )}
        </div>
    );
}
