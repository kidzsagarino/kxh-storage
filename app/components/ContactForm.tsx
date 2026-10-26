"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const SERVICES = [
    "Warehouse Storage",
    "Business Storage",
    "Student Storage",
    "Furniture Storage",
    "Pallet Storage",
    "Moving Services",
    "House Removals",
    "Office Removals",
    "Packing Services",
    "Document Shredding",
    "Inventory Management / 3PL",
    "Other",
];

const field =
    "mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";
const label = "block text-sm font-semibold text-slate-800";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [error, setError] = useState("");

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());
        setStatus("sending");
        setError("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok || !json.ok) {
                setStatus("error");
                setError(json.error || "Something went wrong. Please call us on 020 3916 5312.");
                return;
            }
            form.reset();
            setStatus("sent");
        } catch {
            setStatus("error");
            setError("Network error. Please try again or call us on 020 3916 5312.");
        }
    }

    if (status === "sent") {
        return (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center" role="status">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-black text-slate-950">Thank you, message sent</h3>
                <p className="mt-2 text-slate-600">Our team will get back to you shortly. For anything urgent, call 020 3916 5312.</p>
                <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-xl border border-emerald-300 px-5 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-100"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} noValidate={false} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="cf-name" className={label}>Full name *</label>
                    <input id="cf-name" name="name" type="text" required minLength={2} maxLength={120} autoComplete="name" className={field} placeholder="Your name" />
                </div>
                <div>
                    <label htmlFor="cf-phone" className={label}>Phone number *</label>
                    <input id="cf-phone" name="phone" type="tel" required pattern="[+()0-9\s-]{7,20}" maxLength={20} autoComplete="tel" className={field} placeholder="07xxx xxxxxx" />
                </div>
                <div>
                    <label htmlFor="cf-email" className={label}>Email *</label>
                    <input id="cf-email" name="email" type="email" required maxLength={160} autoComplete="email" className={field} placeholder="you@example.com" />
                </div>
                <div>
                    <label htmlFor="cf-pickup" className={label}>Pickup postcode or address *</label>
                    <input id="cf-pickup" name="pickup" type="text" required minLength={3} maxLength={200} autoComplete="postal-code" className={field} placeholder="e.g. NW1 7AA" />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="cf-service" className={label}>Service *</label>
                    <select id="cf-service" name="service" required defaultValue="" className={field}>
                        <option value="" disabled>Choose a service</option>
                        {SERVICES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="cf-message" className={label}>Message (optional)</label>
                    <textarea id="cf-message" name="message" rows={4} maxLength={2000} className={field} placeholder="Tell us what you need to store or move, and your preferred dates." />
                </div>
                {/* Honeypot field, hidden from people */}
                <div className="hidden" aria-hidden="true">
                    <label htmlFor="cf-company">Company</label>
                    <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>
            </div>

            {status === "error" && (
                <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={status === "sending"}
                className="kxh-shine relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
            >
                {status === "sending" ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending...
                    </>
                ) : (
                    <>
                        Send message <Send className="h-4 w-4" aria-hidden="true" />
                    </>
                )}
            </button>
            <p className="mt-3 text-xs text-slate-500">
                We only use your details to reply to your enquiry. See our <a href="/privacy" className="underline">privacy policy</a>.
            </p>
        </form>
    );
}
