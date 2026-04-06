// app/success/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { prisma } from "@/src/lib/prisma";
import { EmailLive } from "./EmailLive";
import { money } from "../utils/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion: "2024-06-20",
});

type Props = { searchParams: Promise<{ session_id?: string; orderId?: string }> };
type OrderTimeSlot = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
} | null;

function fmtAddr(a?: any) {
  if (!a) return "—";
  return [a.line1, a.line2, a.city, a.postalCode, a.country].filter(Boolean).join(", ");
}
const SLOT_LABELS: Record<string, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

const SLOT_RANGES: Record<string, string> = {
  morning: "7am – 10am",
  afternoon: "10am – 3pm",
  evening: "3pm – 6pm",
};

function fmtDate(d?: Date | string | null) {
  if (!d) return "—";
  const x = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(x.getTime())) return "—";
  return x.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

function fmtSlot(slot?: string | null) {
  if (!slot) return "—";
  const key = String(slot).toLowerCase(); // handles "MORNING" etc.
  const label = SLOT_LABELS[key] ?? slot;
  const range = SLOT_RANGES[key];
  return range ? `${label} (${range})` : label;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id, orderId } = await searchParams;
  if (!session_id && !orderId) redirect("/");

  let payment: any = null;
  let order: any = null;
  let session: any = null;

  if (orderId) {
    order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        addresses: true,
        items: true,
        movingPackage: { include: { prices: true } },
        storageDiscountTier: true,
        timeSlot: true,
        discountCode: true
      },
    });

    payment = await prisma.payment.findFirst({ where: { orderId } });
    session = null;
  } else if (session_id) {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent", "customer_details"],
    });

    if (session.payment_status !== "paid") redirect("/checkout?status=unpaid");

    payment = await prisma.payment.findUnique({
      where: { providerRef: session_id },
      include: {
        order: {
          include: {
            customer: true,
            addresses: true,
            items: true,
            movingPackage: true,
            storageDiscountTier: true,
            discountCode: true
          },
        },
      },
    });

    order = payment?.order ?? null;
  }

  const isProcessing = !payment || !order;

  if (isProcessing) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-900">Payment confirmed</h1>
            <p className="mt-2 text-slate-600">
              We&apos;re finalizing your order details. This usually takes a few seconds.
              You can refresh this page.
            </p>
            <div className="mt-6 flex gap-3">
              {/* <Link
                href="/account/orders"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                View orders
              </Link>
              <Link
                href="/support"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Contact support
              </Link> */}
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Stripe session: <span className="font-mono">{session_id}</span>
            </p>
          </div>
        </div>
      </main>
    );
  }

  // --- Pricing bits ---
  let movingPackagePrice: any = null;
  if (order?.serviceType === "MOVING" && order?.movingPackage?.id) {
    movingPackagePrice = await prisma.movingPackagePrice.findFirst({
      where: { packageId: order.movingPackage.id, currency: "GBP", isActive: true },
    });
  }

  const settings = await prisma.adminSettings.findUnique({
    where: { id: "global_settings" },
  });

  const movingPricePerMileMinor = settings?.movingPricePerMileMinor ?? 58;

  const isMoving = order?.serviceType === "MOVING";
  const isStorage = order?.serviceType === "STORAGE";
  const isReturn = order?.serviceType === "RETURN";

  const distanceMiles = isMoving ? (order.distanceMiles ?? 0) : 0;
  const distanceCostMinor = isMoving ? Math.max(0, distanceMiles) * movingPricePerMileMinor : 0;

  const orderSubtotalMinor =
    order?.items?.reduce(
      (sum: number, item: any) => sum + (item.lineTotalMinor ?? item.unitPriceMinor ?? 0),
      0
    ) ?? 0;

  const discountMinor =
    isStorage && order?.storageDiscountTier
      ? Math.round(orderSubtotalMinor * (order.storageDiscountTier.percentOff / 100))
      : 0;

  let discountCodeMinor = order.promoDiscountMinor;

  const totalMinor = payment?.amountMinor ?? session?.amount_total ?? null;

  const email =
    session?.customer_details?.email ??
    session?.customer_email ??
    "—";

  const orderNumber = order?.orderNumber ?? order?.id ?? "—";

  const pickup = isMoving || isReturn ? order?.addresses?.find((a: any) => a.type === "PICKUP") : null;
  const dropoff = isMoving || isReturn ? order?.addresses?.find((a: any) => a.type === "DROPOFF") : null;

  // Adjust these field names to match your schema:
  const scheduledDate =
    (order?.scheduledDate as Date | undefined) ??
    (order?.serviceDate as Date | undefined) ??
    (order?.pickupDate as Date | undefined) ??
    null;

  const timeSlot: OrderTimeSlot = order?.timeSlot ?? null;
  const primaryAddr = order?.addresses?.[0];

  // Build display rows (what user sees)
  const rows: { key: string; label: string; qty: number; minor: number }[] = [];

  if (isMoving) {
    rows.push({
      key: "distance",
      label: `Distance (${distanceMiles} mile${distanceMiles === 1 ? "" : "s"})`,
      qty: 1,
      minor: distanceCostMinor,
    });
    if (order?.movingPackage) {
      rows.push({
        key: "package",
        label: order.movingPackage.name || order.movingPackage.sku || "Moving Package",
        qty: 1,
        minor: movingPackagePrice?.priceMinor ?? 0,
      });
    }
  }

  for (const it of order?.items ?? []) {
    rows.push({
      key: it.id,
      label: it.label || it.name || it.sku || it.id,
      qty: it.qty ?? it.quantity ?? 1,
      minor: it.lineTotalMinor ?? it.unitPriceMinor ?? 0,
    });
  }

  if (isStorage && order?.storageDiscountTier && discountMinor > 0) {
    rows.push({
      key: "discount",
      label: `Discount (${order.storageDiscountTier.minMonths} mo • ${order.storageDiscountTier.percentOff}% off)`,
      qty: 1,
      minor: -discountMinor,
    });
  }

  if (discountCodeMinor && discountCodeMinor > 0) {
    rows.push({
      key: "discountCode",
      label: `Discount Code (${order.discountCode.code})`,
      qty: 1,
      minor: -discountCodeMinor,
    });
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Header card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-5 sm:p-6">
            {/* Top row: icon + title + actions */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                    Payment confirmed
                  </h1>

                  <p className="mt-1 text-sm text-slate-600">
                    We emailed your receipt to{" "}
                    {order?.id ? (
                      <EmailLive
                        orderId={order.id}
                        initialEmail={order?.customer?.email ?? "—"}
                      />
                    ) : (
                      <span className="font-medium text-slate-900">
                        getting your detail…
                      </span>
                    )}
                    .
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
                <Link
                  href="/"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800 transition"
                >
                  Return Home
                </Link>

                <a
                  href={`mailto:help@kxhlogistics.co.uk?subject=Order%20${encodeURIComponent(
                    String(orderNumber)
                  )}%20Support`}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
                >
                  Email Support
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-slate-200" />

            {/* Stats row */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Order
                </div>
                <div className="mt-1 truncate font-semibold text-slate-900">
                  {orderNumber}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Service
                </div>
                <div className="mt-1 font-semibold text-slate-900">
                  {order?.serviceType ?? "—"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Date
                </div>
                <div className="mt-1 font-semibold text-slate-900">
                  {fmtDate(scheduledDate)}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Timeslot
                </div>
                <div className="mt-1 font-semibold text-slate-900">
                  {timeSlot?.startTime && timeSlot?.endTime
                    ? `${timeSlot.startTime} – ${timeSlot.endTime}`
                    : "—"}
                </div>
                {timeSlot?.name ? (
                  <div className="mt-1 text-[11px] text-slate-500 capitalize">
                    {timeSlot.name}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* Left column */}
          <div className="space-y-6">
            {/* Service details */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Service details
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {isMoving || isReturn ? (
                  <>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-xs font-semibold text-slate-500">
                        Pickup
                      </div>
                      <div className="mt-2 text-sm font-medium text-slate-900">
                        {fmtAddr(pickup)}
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-xs font-semibold text-slate-500">
                        Drop-off
                      </div>
                      <div className="mt-2 text-sm font-medium text-slate-900">
                        {fmtAddr(dropoff)}
                      </div>
                    </div>
                    {isMoving && (<div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                      <div className="text-xs font-semibold text-slate-500">
                        Distance
                      </div>
                      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
                        <div className="text-sm font-medium text-slate-900">
                          {distanceMiles} mile{distanceMiles === 1 ? "" : "s"}
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          {money(distanceCostMinor)}
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        Calculated at {money(movingPricePerMileMinor)} per mile
                      </div>
                    </div>)}

                  </>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                    <div className="text-xs font-semibold text-slate-500">
                      Address
                    </div>
                    <div className="mt-2 text-sm font-medium text-slate-900">
                      {fmtAddr(primaryAddr)}
                    </div>
                  </div>
                )}

                {order?.notes ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                    <div className="text-xs font-semibold text-slate-500">
                      Notes
                    </div>
                    <div className="mt-2 text-sm text-slate-700">
                      {order.notes}
                    </div>
                  </div>
                ) : null}
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Payment processed by Stripe. If you don&apos;t see the email in 2
                minutes, check spam/junk.
              </p>
            </section>

            {/* Order items */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-slate-900">
                  Order details
                </h2>
                <div className="text-xs text-slate-500">
                  {rows.length} item{rows.length === 1 ? "" : "s"}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {rows.length ? (
                  rows.map((r) => (
                    <div
                      key={r.key}
                      className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-slate-900">
                          {r.label}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          Qty: {r.qty}
                        </div>
                      </div>

                      <div
                        className={`shrink-0 text-sm font-semibold ${r.minor < 0 ? "text-emerald-700" : "text-slate-900"
                          }`}
                      >
                        {r.minor < 0
                          ? `− ${money(Math.abs(r.minor))}`
                          : money(r.minor)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-500">No items found.</div>
                )}
              </div>
            </section>
          </div>

          {/* Right column (sticky) */}
          <aside className="space-y-4 lg:sticky lg:top-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Summary</h2>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-slate-900">
                    {money(
                      orderSubtotalMinor +
                      (isMoving
                        ? (movingPackagePrice?.priceMinor ?? 0) + distanceCostMinor
                        : 0)
                    )}
                  </span>
                </div>

                {isStorage && discountMinor > 0 ? (
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Storage Discount</span>
                    <span className="font-semibold text-emerald-700">
                      − {money(discountMinor)}
                    </span>
                  </div>
                ) : null}

                <div className="my-2 h-px bg-slate-200" />
                {discountCodeMinor && discountCodeMinor > 0 ? (
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Discount Code {order.discountCode.code}</span>
                    <span className="font-semibold text-emerald-700">
                      − {money(discountCodeMinor)}
                    </span>
                  </div>
                ) : null}

                <div className="my-2 h-px bg-slate-200" />

                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-slate-900">Total paid</span>
                  <span className="text-xl font-bold text-slate-900">
                    {money(totalMinor)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="shrink-0 text-slate-600">Stripe ref</span>
                  <span className="break-all text-right font-mono text-[11px] text-slate-500">
                    {payment?.providerRef ?? "—"}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">
                  Next steps
                </div>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>✅ Booking received</li>
                  <li>✅ Payment verified</li>
                  <li>🕒 Our team is assessing your request</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}