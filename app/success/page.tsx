// app/success/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion: "2024-06-20",
});

type Props = { searchParams: Promise<{ session_id?: string; orderId?: string }> };

const moneyGBP = (minor?: number | null) =>
  minor == null ? "—" : `£${(minor / 100).toFixed(2)}`;

function fmtAddr(a?: any) {
  if (!a) return "—";
  return [a.line1, a.line2, a.city, a.postalCode, a.country].filter(Boolean).join(", ");
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

  const totalMinor = payment?.amountMinor ?? session?.amount_total ?? null;

  const email =
    order?.customer?.email ??
    session?.customer_details?.email ??
    session?.customer_email ??
    "—";

  const orderNumber = order?.orderNumber ?? order?.id ?? "—";

  const pickup = isMoving ? order?.addresses?.find((a: any) => a.type === "PICKUP") : null;
  const dropoff = isMoving ? order?.addresses?.find((a: any) => a.type === "DROPOFF") : null;

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

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Top success header */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">Payment confirmed</h1>
                <p className="mt-1 text-sm text-slate-600">
                  We emailed your receipt to <span className="font-medium text-slate-900">{email}</span>.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                    Order <span className="ml-1 font-semibold">{orderNumber}</span>
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                    Service <span className="ml-1 font-semibold">{order?.serviceType ?? "—"}</span>
                  </span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Paid <span className="ml-1 font-semibold">{moneyGBP(totalMinor)}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              
              <Link
                href="mailto:hello@kxhlogistics.co.uk/"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Email support
              </Link>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px] items-start">
          {/* Left */}
          <div className="space-y-6">
            {/* Addresses / Notes */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Service details</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {isMoving ? (
                  <>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-xs font-semibold text-slate-500">Pickup</div>
                      <div className="mt-2 text-sm font-medium text-slate-900">{fmtAddr(pickup)}</div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-xs font-semibold text-slate-500">Drop-off</div>
                      <div className="mt-2 text-sm font-medium text-slate-900">{fmtAddr(dropoff)}</div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                      <div className="text-xs font-semibold text-slate-500">Distance</div>
                      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
                        <div className="text-sm font-medium text-slate-900">
                          {distanceMiles} mile{distanceMiles === 1 ? "" : "s"}
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          {moneyGBP(distanceCostMinor)}
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        Calculated at {moneyGBP(movingPricePerMileMinor)} per mile
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                    <div className="text-xs font-semibold text-slate-500">Address</div>
                    <div className="mt-2 text-sm font-medium text-slate-900">{fmtAddr(primaryAddr)}</div>
                  </div>
                )}

                {order?.notes ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                    <div className="text-xs font-semibold text-slate-500">Notes</div>
                    <div className="mt-2 text-sm text-slate-700">{order.notes}</div>
                  </div>
                ) : null}
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Payment processed by Stripe. If you don&apos;t see the email in 2 minutes, check spam/junk.
              </p>
            </div>

            {/* Order details list (mobile-friendly) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Order details</h2>

              <div className="mt-4 space-y-2">
                {rows.length ? (
                  rows.map((r) => (
                    <div
                      key={r.key}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-start justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-900 truncate">{r.label}</div>
                        <div className="mt-1 text-xs text-slate-500">Qty: {r.qty}</div>
                      </div>
                      <div
                        className={`shrink-0 text-sm font-semibold ${r.minor < 0 ? "text-emerald-700" : "text-slate-900"
                          }`}
                      >
                        {r.minor < 0 ? `− ${moneyGBP(Math.abs(r.minor))}` : moneyGBP(r.minor)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-500">No items found.</div>
                )}
              </div>
            </div>
          </div>

          {/* Right: sticky summary */}
          <aside className="lg:sticky lg:top-6 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Summary</h2>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-slate-900">{moneyGBP(orderSubtotalMinor + (isMoving ? (movingPackagePrice?.priceMinor ?? 0) + distanceCostMinor : 0))}</span>
                </div>

                {isStorage && discountMinor > 0 ? (
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Discount</span>
                    <span className="font-semibold text-emerald-700">− {moneyGBP(discountMinor)}</span>
                  </div>
                ) : null}

                <div className="h-px bg-slate-200 my-2" />

                <div className="flex justify-between items-baseline">
                  <span className="text-slate-900 font-semibold">Total paid</span>
                  <span className="text-xl font-bold text-slate-900">{moneyGBP(totalMinor)}</span>
                </div>

                <div className="flex justify-between gap-3 items-start">
                  <span className="text-slate-600 shrink-0">Stripe ref</span>
                  <span className="font-mono text-right break-all text-[11px] text-slate-500">
                    {payment?.providerRef ?? "—"}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">Next steps</div>
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