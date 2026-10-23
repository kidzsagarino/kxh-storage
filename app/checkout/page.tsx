// app/success/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { CheckoutClient } from "./CheckoutClient";
import { money, to12Hour } from "../utils/utils";
import { CheckoutProvider } from "../components/checkout/CheckoutStore";


type Props = { searchParams: Promise<{ orderId?: string }> };

const moneyGBP = (minor?: number | null) =>
    minor == null ? "—" : `£${(minor / 100).toFixed(2)}`;

type AddressLike = {
    line1: string | null;
    line2: string | null;
    city: string | null;
    postalCode: string | null;
    country: string | null;
};

function fmtAddr(
    address?: AddressLike | null
) {
    if (!address) {
        return "—";
    }

    return [
        address.line1,
        address.line2,
        address.city,
        address.postalCode,
        address.country,
    ]
        .filter(Boolean)
        .join(", ");
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

    const order =
        await prisma.order.findUnique({
            where: {
                id: orderId,
            },

            include: {
                customer: true,
                addresses: true,
                items: true,

                movingPackage: true,

                storageDiscountTier:
                    true,

                timeSlot:
                    true,

                discountCode:
                    true,
            },
        });

    if (!order) {
        redirect("/");
    }


    const isMoving =
        order.serviceType === "MOVING";

    const isStorage =
        order.serviceType === "STORAGE";

    const isReturn =
        order.serviceType === "RETURN";

    const isShredding =
        order.serviceType === "SHREDDING";

    /*
     * Historical pricing snapshot.
     */
    const movingPricePerMileMinor =
        isMoving
            ? order.movingPricePerMileMinor ?? 0
            : 0;

    const movingDistanceCostMinor =
        isMoving
            ? order.movingDistanceCostMinor ?? 0
            : 0;

    const movingPackageAmountMinor =
        isMoving
            ? order.movingPackageAmountMinor ?? 0
            : 0;

    const collectionFeeMinor =
        isStorage || isShredding
            ? order.collectionFeeMinor ?? 0
            : 0;

    const distanceMiles =
        isMoving
            ? Number(
                order.distanceMiles ?? 0
            )
            : 0;


    const orderSubtotalMinor =
        order.items.reduce(
            (
                sum,
                item
            ) =>
                sum +
                (
                    item.lineTotalMinor ??
                    item.unitPriceMinor ??
                    0
                ),
            0
        );


    const discountMinor =
        isStorage
            ? order.discountMinor ?? 0
            : 0;

    const discountCodeMinor =
        order.promoDiscountMinor ?? 0;


    const displayedSubtotalMinor =
        orderSubtotalMinor +
        (
            isMoving
                ? movingPackageAmountMinor +
                movingDistanceCostMinor
                : 0
        ) +
        (
            isStorage || isShredding
                ? collectionFeeMinor
                : 0
        );


    const orderNumber =
        order.orderNumber ??
        order.id;
    const pickup =
        isMoving || isReturn
            ? order.addresses.find(
                (address) =>
                    address.type ===
                    "PICKUP"
            )
            : undefined;

    const dropoff =
        isMoving || isReturn
            ? order.addresses.find(
                (address) =>
                    address.type ===
                    "DROPOFF"
            )
            : undefined;

    // Adjust these field names to match your schema:
    const scheduledDate = order.serviceDate ?? null;

    const timeSlot = order.timeSlot;
    const primaryAddr = order?.addresses?.[0];

    // Build display rows (what user sees)
    const rows: { key: string; label: string; qty: number; minor: number }[] = [];

    if (isMoving) {
        rows.push({
            key:
                "distance",

            label:
                `Distance (${distanceMiles} mile${distanceMiles === 1
                    ? ""
                    : "s"
                })`,

            qty:
                1,

            minor:
                movingDistanceCostMinor,
        });

        rows.push({
            key:
                "package",

            label:
                order.movingPackage?.name ||
                order.movingPackage?.sku ||
                "Moving Package",

            qty:
                1,

            minor:
                movingPackageAmountMinor,
        });
    }

    for (const item of order.items) {
        rows.push({
            key: item.id,

            label:
                item.name.trim() ||
                item.sku ||
                item.id,

            qty:
                item.quantity,

            minor:
                item.lineTotalMinor,
        });
    }

    if (isStorage) {
        rows.push({
            key:
                "fee",

            label:
                "Packing Material & Collection Fee",

            qty:
                1,

            minor:
                collectionFeeMinor,
        });
    }
    if (isShredding) {
        rows.push({
            key: "shredding-collection-fee",
            label: "Shredding Collection Fee",
            qty: 1,
            minor: collectionFeeMinor,
        });
    }

    if (
        isStorage &&
        order.storageDiscountTier
    ) {
        rows.push({
            key:
                "discount",

            label:
                `Discount (${order.storageDiscountTier.minMonths} mo • ${order.storageDiscountTier.percentOff}% off)`,

            qty:
                1,

            minor:
                -discountMinor,
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
                                    <span className="text-slate-600">
                                        Items
                                    </span>

                                    <span className="font-medium text-slate-900">
                                        {money(orderSubtotalMinor)}
                                    </span>
                                </div>

                                {(isStorage || isShredding) && (
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">
                                            {isShredding
                                                ? "Shredding Collection Fee"
                                                : "Collection Fee"}
                                        </span>

                                        <span className="font-medium text-slate-900">
                                            {money(collectionFeeMinor)}
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between border-t border-slate-100 pt-2">
                                    <span className="font-medium text-slate-700">
                                        Subtotal
                                    </span>

                                    <span className="font-semibold text-slate-900">
                                        {money(displayedSubtotalMinor)}
                                    </span>
                                </div>

                                {isStorage && (
                                    <div className="flex justify-between">
                                        <span className="text-emerald-700">
                                            Discount
                                        </span>

                                        <span className="font-semibold text-emerald-700">
                                            − {money(
                                                discountMinor
                                            )}
                                        </span>
                                    </div>
                                )}

                                {order.discountCode && (
                                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-emerald-800 font-semibold">Discount Code Applied</span>
                                            <span className="font-bold text-emerald-900">− {money((discountCodeMinor ?? 0))}</span>
                                        </div>
                                        <div className="text-sm text-emerald-700">
                                            {order.discountCode.code} • {order.discountCode.type === "percentage" ? `${order.discountCode.valueMinor}% off` : money(order.discountCode.valueMinor / 100) + " off"}  <br />
                                        </div>
                                    </div>
                                )}


                                <div className="my-2 h-px bg-slate-200" />
                                <div className="flex items-baseline justify-between">
                                    <span className="font-semibold text-slate-900">Total payable</span>
                                    <span className="text-xl font-bold text-slate-900">
                                        {money(order.totalMinor)}
                                    </span>
                                </div>
                            </div>
                            {order.status === "PENDING_PAYMENT" && (
                                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                                    <CheckoutProvider>
                                        <CheckoutClient orderId={orderId as string} />
                                    </CheckoutProvider>
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
                                        Time Slot
                                    </div>
                                    <div className="mt-1 font-semibold text-slate-900">
                                        {timeSlot?.startTime &&
                                            timeSlot?.endTime
                                            ? `${to12Hour(
                                                timeSlot.startTime
                                            )} – ${to12Hour(
                                                timeSlot.endTime
                                            )}`
                                            : "—"}
                                    </div>

                                </div>

                                {timeSlot?.name && (
                                    <div className="mt-1 text-[11px] text-slate-500 capitalize">
                                        {timeSlot.name}
                                    </div>
                                )}
                            </div>


                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                {isMoving || isReturn ? (
                                    <>
                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                            <div className="text-sm font-semibold text-slate-500">
                                                Pickup
                                            </div>
                                            <div className="mt-2 text-sm font-medium text-slate-900">
                                                {fmtAddr(pickup)}
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                            <div className="text-sm font-semibold text-slate-500">
                                                Drop-off
                                            </div>
                                            <div className="mt-2 text-sm font-medium text-slate-900">
                                                {fmtAddr(dropoff)}
                                            </div>
                                        </div>
                                        {isMoving && (
                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                                                <div className="text-sm font-semibold text-slate-500">
                                                    Distance
                                                </div>

                                                <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
                                                    <div className="text-sm font-medium text-slate-900">
                                                        {distanceMiles} mile
                                                        {distanceMiles === 1
                                                            ? ""
                                                            : "s"}
                                                    </div>

                                                    <div className="text-sm font-semibold text-slate-900">
                                                        {money(
                                                            movingDistanceCostMinor
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mt-1 text-sm text-slate-500">
                                                    Calculated at{" "}
                                                    {money(
                                                        movingPricePerMileMinor
                                                    )}{" "}
                                                    per mile
                                                </div>
                                            </div>
                                        )}

                                    </>
                                ) : (
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                                        <div className="text-sm font-semibold text-slate-500">
                                            Address
                                        </div>
                                        <div className="mt-2 text-sm font-medium text-slate-900">
                                            {fmtAddr(primaryAddr)}
                                        </div>
                                    </div>
                                )}

                                {order?.notes ? (
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                                        <div className="text-sm font-semibold text-slate-500">
                                            Notes
                                        </div>
                                        <div className="mt-2 text-sm text-slate-700">
                                            {order.notes}
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            <p className="mt-4 text-sm text-slate-500">
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
                                <div className="text-sm text-slate-500">
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
                                                <div className="mt-1 text-sm text-slate-500">
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
                </div>
            </div>
        </main>
    );
}