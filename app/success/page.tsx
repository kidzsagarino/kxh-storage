// app/success/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  //apiVersion: "2024-06-20",
});

type Props = { searchParams: Promise<{ session_id?: string, orderId?: string }> };

const moneyGBP = (minor?: number | null) =>
  minor == null ? "—" : `£${(minor / 100).toFixed(2)}`;

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id, orderId } = await searchParams;
  if (!session_id && !orderId) redirect("/");

  let payment = null;
  let order = null;
  let session = null;

  if (orderId) {
    order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        addresses: true,
        items: true,
        movingPackage: {
          include: {
            prices: true
          }
        },
        storageDiscountTier: true
      },
    });
    payment = await prisma.payment.findFirst({
      where: { orderId },
    });
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

  let movingPackagePrice = null;
  if (order?.serviceType === "MOVING" && order?.movingPackage?.id) {
    movingPackagePrice = await prisma.movingPackagePrice.findFirst({
      where: { packageId: order.movingPackage.id, currency: "GBP", isActive: true },
    });

  }

  const settings = await prisma.adminSettings.findUnique({
    where: { id: "global_settings" },
  });

  const movingPricePerMileMinor = settings?.movingPricePerMileMinor ?? 58;

  // Distance + cost (moving)
  const distanceMiles = order?.serviceType === "MOVING" ? (order.distanceMiles ?? 0) : 0;
  const distanceCostMinor =
    order?.serviceType === "MOVING"
      ? Math.max(0, distanceMiles) * movingPricePerMileMinor
      : 0;

  // Calculate subtotal for storage orders
  const orderSubtotalMinor = order?.items?.reduce((sum: number, item: any) => sum + (item.lineTotalMinor ?? item.unitPriceMinor ?? 0), 0);
  const discountMinor = order?.serviceType === "STORAGE" && order?.storageDiscountTier ? Math.round((orderSubtotalMinor ?? 0) * (order.storageDiscountTier.percentOff / 100)) : 0;

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
              <Link
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
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Stripe session: <span className="font-mono">{session_id}</span>
            </p>
          </div>
        </div>
      </main>
    );
  }
  const email =
    order?.customer?.email ??
    session?.customer_details?.email ??
    session?.customer_email ??
    "—";

  const orderNumber = order?.orderNumber ?? order?.id ?? "—";
  const addr = order?.addresses?.[0];
  const addrLine = addr
    ? [addr.line1, addr.line2, addr.city, addr.postalCode, addr.country]
      .filter(Boolean)
      .join(", ")
    : "—";

  const totalMinor = payment?.amountMinor ?? session?.amount_total ?? null;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Centered check icon and payment confirmed */}
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 mb-3">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">Payment confirmed</h1>
          </div>

          <div className="min-w-0">
            <p className="mt-1 text-slate-600">
              We emailed your receipt to <span className="font-medium text-slate-900">{email}</span>.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                Order <span className="ml-1 font-semibold">{orderNumber}</span>
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                Service <span className="ml-1 font-semibold">{order?.serviceType ?? "—"}</span>
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Paid <span className="ml-1 font-semibold">{moneyGBP(totalMinor)}</span>
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                Stripe <span className="ml-1 font-mono">{payment?.providerRef ?? "—"}</span>
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">Service address</div>
                <p className="mt-2 text-sm text-slate-700">{addrLine}</p>
                {order?.serviceType === "MOVING" && order?.addresses?.length > 1 && (
                  <>
                    <div className="text-sm font-semibold text-slate-900 mt-4">Dropoff address</div>
                    <p className="mt-2 text-sm text-slate-700">
                      {(() => {
                        const dropoff = order.addresses.find((a: any) => a.type === "DROPOFF");
                        return dropoff
                          ? [dropoff.line1, dropoff.line2, dropoff.city, dropoff.postalCode, dropoff.country].filter(Boolean).join(", ")
                          : "—";
                      })()}
                    </p>
                  </>
                )}
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">Next steps</div>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>✅ Booking received</li>
                  <li>✅ Payment verified</li>
                  <li>🕒 We’ll send a reminder before your slot</li>
                </ul>
              </div>
            </div>

            {/* Remove action buttons for now */}
            {/*
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href={order ? `/orders/${order.id}` : "/account/orders"}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-600 px-6 text-base font-semibold text-white shadow hover:bg-emerald-700 transition"
              >
                View order details
              </Link>
              <Link
                href="/account/orders"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-base font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                Manage booking
              </Link>
            </div>
            */}

            <p className="mt-4 text-xs text-slate-500">
              Payment processed by Stripe. If you don&apos;t see the email in 2 minutes, check spam/junk.
            </p>

            <div className="mt-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Order Details</h2>
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-4 py-2 text-left font-semibold text-slate-700">Item</th>
                      <th className="px-4 py-2 text-left font-semibold text-slate-700">Qty</th>
                      <th className="px-4 py-2 text-left font-semibold text-slate-700">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Moving package row if present */}
                    {order?.serviceType === "MOVING" && (
                      <tr className="border-t border-slate-100 bg-slate-50">
                        <td className="px-4 py-2 text-slate-900 font-medium">
                          Distance ({distanceMiles} mile{distanceMiles === 1 ? "" : "s"})
                        </td>
                        <td className="px-4 py-2">1</td>
                        <td className="px-4 py-2">{moneyGBP(distanceCostMinor)}</td>
                      </tr>
                    )}
                    {order?.serviceType === "MOVING" && order?.movingPackage && (
                      <tr className="border-t border-slate-100 bg-slate-50">
                        <td className="px-4 py-2 text-slate-900 font-medium">
                          {order.movingPackage.name || order.movingPackage.sku || "Moving Package"}
                        </td>
                        <td className="px-4 py-2">1</td>
                        <td className="px-4 py-2">{moneyGBP(movingPackagePrice?.priceMinor ?? 0)}</td>
                      </tr>
                    )}
                    {/* Storage discount tier row if present */}
                    {order?.serviceType === "STORAGE" && (order?.storageDiscountTier) && (
                      <tr className="border-t border-slate-100 bg-slate-50">
                        <td className="px-4 py-2 text-slate-900 font-medium">Discount Tier</td>
                        <td className="px-4 py-2">{order.storageDiscountTier?.minMonths ?? "—"} mo</td>
                        <td className="px-4 py-2">{moneyGBP(discountMinor)}</td>
                      </tr>
                    )}
                    {/* Order items */}
                    {order?.items?.length ? order.items.map((item: any) => (
                      <tr key={item.id} className="border-t border-slate-100">
                        <td className="px-4 py-2 text-slate-900">{item.label || item.name || item.sku || item.id}</td>
                        <td className="px-4 py-2">{item.qty ?? item.quantity ?? 1}</td>
                        <td className="px-4 py-2">{moneyGBP(item.lineTotalMinor ?? item.unitPriceMinor ?? 0)}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan={3} className="px-4 py-2 text-slate-500">No items found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}