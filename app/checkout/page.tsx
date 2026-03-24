// app/success/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { CheckoutClient } from "./CheckoutClient";

type Props = { searchParams: Promise<{ orderId?: string }> };
type OrderTimeSlot = {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
} | null;

const moneyGBP = (minor?: number | null) =>
    minor == null ? "—" : `£${(minor / 100).toFixed(2)}`;

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

export async function handlePaymentDoneServer(paidOrderId?: string) {
    if (paidOrderId) {
        redirect(`/success?orderId=${paidOrderId}`);
    } else {
        redirect(`/success`);
    }
}

export default async function SuccessPage({
    searchParams
}: Props) {
    const { orderId } = await searchParams;

    if (!orderId) redirect("/");

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
            },
        });

        session = null;
    }

    console.log(order);

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

    const totalMinor = payment?.amountMinor ?? session?.amount_total ?? null;

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

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto w-full max-w-6xl px-4 py-5">

                {/* Main content grid */}
                <div className="mt-6">
                    <div className="space-y-4 mb-4">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                            <h2 className="text-sm font-semibold text-slate-900">Summary</h2>

                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Subtotal</span>
                                    <span className="font-medium text-slate-900">
                                        {moneyGBP(
                                            orderSubtotalMinor +
                                            (isMoving
                                                ? (movingPackagePrice?.priceMinor ?? 0) + distanceCostMinor
                                                : 0)
                                        )}
                                    </span>
                                </div>

                                {isStorage && discountMinor > 0 ? (
                                    <div className="flex justify-between">
                                        <span className="text-emerald-700">Discount</span>
                                        <span className="font-semibold text-emerald-700">
                                            − {moneyGBP(discountMinor)}
                                        </span>
                                    </div>
                                ) : null}

                                <div className="my-2 h-px bg-slate-200" />
                                <div className="flex items-baseline justify-between">
                                    <span className="font-semibold text-slate-900">Total payable</span>
                                    <span className="text-xl font-bold text-slate-900">
                                        {moneyGBP(order.totalMinor)}
                                    </span>
                                </div>
                            </div>
                            {order.status === "PENDING_PAYMENT" && (
                                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                                    <CheckoutClient orderId={orderId as string} />
                                </div>
                            )}
                            {order.status === "SCHEDULED" && (
                                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                                    This order is already SCHEDULED.
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Left column */}
                    <div className="space-y-6">
                        {/* Service details */}
                        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                            <h2 className="text-sm font-semibold text-slate-900 mb-4">
                                Service details
                            </h2>
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
                                                    {moneyGBP(distanceCostMinor)}
                                                </div>
                                            </div>
                                            <div className="mt-1 text-xs text-slate-500">
                                                Calculated at {moneyGBP(movingPricePerMileMinor)} per mile
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
                                                    ? `− ${moneyGBP(Math.abs(r.minor))}`
                                                    : moneyGBP(r.minor)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-slate-500">No items found.</div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}