"use client";

import { useMemo } from "react";
import { useCheckout, type MovingItemId, type MovingPackageId, type TimeSlotId } from "../components/checkout/CheckoutStore";
import { OrderSummary, type OrderItem } from "../components/OrderSummary";

// -------- Pricing (edit anytime) --------
const PRICE_PER_MILE = 0.58;

const HOME_TYPE_PRICE: Record<MovingItemId, number> = {
    "1-bedroom-flat": 650,
    "2-bedroom-flat": 850,
    "3-bedroom-flat": 1100,
    "4-bedroom-flat": 1358,
};

const HOME_TYPE_LABEL: Record<MovingItemId, string> = {
    "1-bedroom-flat": "1 Bed Flat",
    "2-bedroom-flat": "2 Bed Flat",
    "3-bedroom-flat": "3 Bed Flat",
    "4-bedroom-flat": "4 Bed Flat",
};

const PACKAGE_PRICE: Record<MovingPackageId, number> = {
    "basic-package": 0,
    "move-and-pack": 295,
};

const PACKAGE_LABEL: Record<MovingPackageId, string> = {
    "basic-package": "Package - Basic",
    "move-and-pack": "Package - Move & Pack",
};

const SLOT_LABEL: Record<Exclude<TimeSlotId, "">, string> = {
    morning: "7am - 9am",
    afternoon: "10am - 3pm",
    evening: "3pm - 6pm",
};

function moneyGBP(n: number) {
    return n.toLocaleString("en-GB", { style: "currency", currency: "GBP" });
}

export function MovingOrderSummaryLive() {
    const { state } = useCheckout();

    const moving = state.moving;

    const { items, totalDueNow, note } = useMemo(() => {

        const miles = Math.max(0, Number((moving as any).distanceMiles ?? 1));
        const distanceCost = +(miles * PRICE_PER_MILE).toFixed(2);

        const homeId = moving.movingItemId;
        const homeCost = homeId ? HOME_TYPE_PRICE[homeId] : 0;
        const pkgId = moving.movingPackageId;
        const pkgCost = pkgId ? PACKAGE_PRICE[pkgId] : 0;

        const items: OrderItem[] = [
            {
                label: "Distance",
                qty: miles,
                price: distanceCost,
            },
            ...(homeId
                ? [
                    {
                        label: "Home Type",
                        qty: 1,
                        price: homeCost,
                    } as OrderItem,
                ]
                : []),
            ...(pkgId
                ? [
                    {
                        label: "Package",
                        qty: 1,
                        price: pkgCost,
                    } as OrderItem,
                ]
                : []),
        ];

        const totalDueNow = +(distanceCost + homeCost + pkgCost).toFixed(2);

        const slotText =
            state.timeSlot
                ? SLOT_LABEL[state.timeSlot as Exclude<TimeSlotId, "">]
                : "";

        const note = `Collection\n${state.collectionDate || "—"}${slotText ? ` (${slotText})` : ""}`;

        return { items, totalDueNow, note };
    }, [moving, state.collectionDate, state.timeSlot]);

    const displayItems = useMemo<OrderItem[]>(() => {
        const miles = Math.max(0, Number((moving as any).distanceMiles ?? 1));

        const items: OrderItem[] = [];

        // Distance
        items.push({
            label: "Distance",
            subLabel: `${miles} Miles`,
            price: +(miles * PRICE_PER_MILE).toFixed(2),
            qty: 1,
        });

        // Home type
        if (moving.movingItemId) {
            items.push({
                label: "Home Type",
                subLabel: HOME_TYPE_LABEL[moving.movingItemId],
                price: HOME_TYPE_PRICE[moving.movingItemId],
                qty: 1,
            });
        }

        // Package
        if (moving.movingPackageId) {
            items.push({
                label: "Package",
                subLabel: PACKAGE_LABEL[moving.movingPackageId],
                price: PACKAGE_PRICE[moving.movingPackageId],
                qty: 1,
            });
        }

        return items;
    }, [moving]);


    return (
        <div className="md:sticky md:top-24 h-fit">
            <OrderSummary
                title="Your Order"
                // For moving, we don’t have “storagePerMonth/discount”
                // so we pass 0s and rely on items + totalDueNow.
                storagePerMonth={0}
                discount={0}
                totalDueNow={totalDueNow}
                items={
                    // If your OrderSummary expects storage items only, swap it to a
                    // generic list renderer. If it already renders items generically, keep this.
                    displayItems.map((it) => {
                        // rewrite labels to match EXACT lines you wrote
                        if (it.label === "Distance") {
                            return { ...it, label: "Distance", qty: it.qty, price: it.price };
                        }
                        if (it.label === "Home Type" && moving.movingItemId) {
                            return { ...it, label: "Home Type", qty: 1, price: it.price };
                        }
                        if (it.label === "Package" && moving.movingPackageId) {
                            return { ...it, label: "Package", qty: 1, price: it.price };
                        }
                        return it;
                    })
                }
                ctaLabel="Proceed to Payment"
                ctaHref="/order-summary"
                note={note}
                durationMonth={0}
                enableButton={state.enableButton}
            />
        </div>
    );
}
