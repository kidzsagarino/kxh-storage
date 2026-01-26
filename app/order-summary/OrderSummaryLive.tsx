"use client";

import { useMemo } from "react";
import { useCheckout, type StorageItemId } from "../components/checkout/CheckoutStore";
import { OrderSummary, type OrderItem } from "../components/OrderSummary";

const PRICE_PER_MONTH: Record<StorageItemId, number> = {
  "small-box": 5,
  "medium-box": 8,
  "large-box": 12,
  "xl-box": 15,
  suitcase: 10,
  "half-container": 75,
  "full-container": 150,
};

const LABELS: Record<StorageItemId, string> = {
  "small-box": "Small Box",
  "medium-box": "Medium Box",
  "large-box": "Large Box",
  "xl-box": "XL Box",
  suitcase: "Suitcase",
  "half-container": "½ Container",
  "full-container": "Full Container",
};

export function OrderSummaryLive() {
  const { state } = useCheckout();

  // Safe: only storage has quantities/duration
  const quantities =
    state.serviceType === "storage"
      ? state.storage.quantities
      : ({
          "small-box": 0,
          "medium-box": 0,
          "large-box": 0,
          "xl-box": 0,
          suitcase: 0,
          "half-container": 0,
          "full-container": 0,
        } as Record<StorageItemId, number>);

  const durationMonth = state.serviceType === "storage" ? state.storage.durationMonth : 0;

  const totalItems = useMemo(
    () => Object.values(quantities).reduce((a, b) => a + b, 0),
    [quantities]
  );

  const { items, storagePerMonth, discount, totalDueNow, discountRate } = useMemo(() => {
    const items: OrderItem[] = (Object.keys(quantities) as StorageItemId[])
      .filter((id) => quantities[id] > 0)
      .map((id) => ({
        label: LABELS[id],
        qty: quantities[id],
        price: PRICE_PER_MONTH[id] * quantities[id], // monthly line total
      }));

    // monthly subtotal
    const storagePerMonth = +items.reduce((sum, it) => sum + it.price, 0).toFixed(2);

    // duration discount
    const months = durationMonth === 0 ? 1 : durationMonth;

    const discountRate =
      months === 3 ? 0.05 : months === 6 ? 0.10 : months === 12 ? 0.15 : 0;

    // total for entire duration
    const durationSubtotal = +(storagePerMonth * months).toFixed(2);

    // discount applied to duration total
    // (keeping your original behavior: show "discount per month")
    const discount = +(durationSubtotal * discountRate).toFixed(2) / months;

    // due now (per month amount after discount, per your current UI)
    const totalDueNow = +(storagePerMonth - discount).toFixed(2);

    return { items, storagePerMonth, discount, totalDueNow, discountRate };
  }, [quantities, durationMonth]);

  return (
    <div className="md:sticky md:top-24 h-fit">
      <OrderSummary
        title="Order Summary"
        storagePerMonth={storagePerMonth}
        discount={discount}
        totalDueNow={totalDueNow}
        items={items}
        ctaLabel="Proceed to Payment"
        ctaHref="/order-summary" // keep or change later
        note={
          state.serviceType !== "storage"
            ? "Select Storage service to see the storage order summary."
            : totalItems === 0
            ? "Add items on the left to see your order summary."
            : `Collection: ${state.collectionDate || "—"} • Slot: ${state.timeSlot}`
        }
        durationMonth={durationMonth}
        enableButton={state.enableButton}
      />
    </div>
  );
}
