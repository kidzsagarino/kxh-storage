import { NextResponse } from "next/server";
import { sendEmail } from "@/app/lib/resend";

// Contact form enquiries are emailed to the address shown on the contact page.
const CONTACT_TO = process.env.CONTACT_FORM_TO || "help@kxhlogistics.co.uk";

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

// Very small in-memory rate limit: 5 submissions per IP per 10 minutes.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > 5;
}

function clean(v: unknown, max: number) {
    return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function esc(v: string) {
    return v.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }

    // Honeypot: real visitors never fill this hidden field.
    if (clean(body.company, 200)) {
        return NextResponse.json({ ok: true });
    }

    const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
    if (rateLimited(ip)) {
        return NextResponse.json({ ok: false, error: "Too many messages. Please call us on 020 3916 5312." }, { status: 429 });
    }

    const name = clean(body.name, 120);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 160);
    const pickup = clean(body.pickup, 200);
    const service = clean(body.service, 80);
    const message = clean(body.message, 2000);

    const errors: string[] = [];
    if (name.length < 2) errors.push("Please enter your name.");
    if (!/^[+()\d\s-]{7,20}$/.test(phone)) errors.push("Please enter a valid phone number.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push("Please enter a valid email address.");
    if (pickup.length < 3) errors.push("Please enter your pickup postcode or address.");
    if (!SERVICES.includes(service)) errors.push("Please choose a service.");
    if (errors.length) {
        return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 400 });
    }

    const rows: [string, string][] = [
        ["Name", name],
        ["Phone", phone],
        ["Email", email],
        ["Pickup postcode / address", pickup],
        ["Service", service],
        ["Message", message || "-"],
    ];

    const html = `
      <div style="font-family:Arial,sans-serif;font-size:14px;color:#0f172a">
        <h2 style="margin:0 0 12px;color:#065f46">New website enquiry: ${esc(service)}</h2>
        <table cellpadding="8" style="border-collapse:collapse;border:1px solid #e2e8f0">
          ${rows
              .map(
                  ([k, v]) =>
                      `<tr><td style="background:#f1f5f9;font-weight:bold;border:1px solid #e2e8f0">${k}</td><td style="border:1px solid #e2e8f0">${esc(v).replace(/\n/g, "<br />")}</td></tr>`,
              )
              .join("")}
        </table>
        <p style="color:#64748b;font-size:12px;margin-top:12px">Sent from the contact form on kxhlogistics.co.uk. Reply to this email to answer the customer.</p>
      </div>`;

    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

    try {
        await sendEmail({
            to: CONTACT_TO,
            subject: `Website enquiry: ${service} from ${name}`,
            html,
            text,
            replyTo: email,
        });
    } catch (error) {
        console.error("Contact form email failed:", error);
        return NextResponse.json(
            { ok: false, error: "Sorry, we could not send your message. Please call us on 020 3916 5312." },
            { status: 500 },
        );
    }

    return NextResponse.json({ ok: true });
}
