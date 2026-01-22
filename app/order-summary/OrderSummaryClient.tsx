"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCheckout, type StorageItemId } from "../components/checkout/CheckoutStore";
import { OrderSummary, type OrderItem } from "../components/OrderSummary";

const PRICE_PER_MONTH: Record<StorageItemId, number> = {
  "small-box": 4.0,
  "medium-box": 8.0,
  "large-box": 10.0,
  "xl-box": 12.0,
  suitcase: 9.0,
  "half-container": 55.0,
};

const LABELS: Record<StorageItemId, string> = {
  "small-box": "Small Box",
  "medium-box": "Medium Box",
  "large-box": "Large Box",
  "xl-box": "XL Box",
  suitcase: "Suitcase",
  "half-container": "½ Container",
};

export function OrderSummaryClient() {
  const router = useRouter();
  const { state } = useCheckout();

  const { items, storagePerMonth, discount, totalDueNow } = useMemo(() => {
    const items: OrderItem[] = (Object.keys(state.quantities) as StorageItemId[])
      .filter((id) => state.quantities[id] > 0)
      .map((id) => ({
        label: LABELS[id],
        qty: state.quantities[id],
        price: PRICE_PER_MONTH[id] * state.quantities[id],
      }));

    const storagePerMonth = items.reduce((sum, it) => sum + it.price, 0);

    // sample: 15% discount if storagePerMonth >= £8
    const discount = storagePerMonth >= 8 ? +(storagePerMonth * 0.15).toFixed(2) : 0;

    const totalDueNow = +(storagePerMonth - discount).toFixed(2);

    return { items, storagePerMonth, discount, totalDueNow };
  }, [state.quantities]);

  return (
    <div className="space-y-4">
      <OrderSummary
        storagePerMonth={storagePerMonth}
        discount={discount}
        totalDueNow={totalDueNow}
        items={items}
        ctaLabel="Proceed to Payment"
        onCtaClick={() => alert("Hook this to Stripe checkout next.")}
        note={`Collection: ${state.collectionDate || "—"} • Time slot: ${state.timeSlot} • Address: ${
          state.postalCode || "—"
        }`}
      />

      <div className="text-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          ← Back to form
        </button>
      </div>
    </div>
  );
}
