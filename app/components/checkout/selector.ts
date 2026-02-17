import type {
    CheckoutState,
    MovingItemId,
    MovingPackageId,
} from "./CheckoutStore";

const GBP = (n: number) => n.toFixed(2);

const STORAGE_PRICE_PER_MONTH: Record<string, number> = {
    "small-box": 5,
    "medium-box": 8,
    "large-box": 12,
    "xl-box": 15,
    suitcase: 10,
    "half-container": 75,
    "full-container": 150,
};

const MOVING_ITEM_PRICE: Record<string, number> = {
    "small-move": 250,
    "1-bedroom-flat": 350,
    "2-bedroom-flat": 500,
    "3-bedroom-flat": 700,
    "4-bedroom-flat": 900,
    "office-move": 2000,
};

const MOVING_PACKAGE_ADDON: Record<string, number> = {
    "basic-package": 0,
    "move-and-pack": 180,
};

export type CheckoutTotals = {
    title: string;
    amount: number;
    amountText: string;
    ctaLabel: string;
    ctaEnabled: boolean;
};

function storageDiscountRate(months: number) {
    return months === 3 ? 0.05 : months === 6 ? 0.1 : months === 12 ? 0.15 : 0;
}

export function selectCheckoutTotals(state: CheckoutState): CheckoutTotals {
    if (state.serviceType === "storage") {
        const s = state.storage;

        const monthly = +(Object.keys(s.quantities) as string[]).reduce(
            (sum, id) => sum + s.quantities[id] * STORAGE_PRICE_PER_MONTH[id],
            0
        ).toFixed(2);

        const months = s.durationMonth;
        const durationPicked = months === 3 || months === 6 || months === 12;
        const hasItems = Object.values(s.quantities).some((v) => v > 0);

        const rate = storageDiscountRate(months);
        const discountPerMonth = durationPicked ? +(monthly * rate).toFixed(2) : 0;

        const amount = Math.max(0, +(monthly - discountPerMonth).toFixed(2));

        return {
            title: "Total Due Today",
            amount,
            amountText: `£${GBP(amount)}`,
            ctaLabel: "Proceed to Payment",
            ctaEnabled: !!s.enableButton && hasItems && durationPicked,
        };
    }

    const m = state.moving;

    const base = m.movingItemId ? MOVING_ITEM_PRICE[m.movingItemId] : 0;
    const addon = m.movingPackageId ? MOVING_PACKAGE_ADDON[m.movingPackageId] : 0;
    const amount = +(base + addon).toFixed(2);

    const movingOk =
        !!m.movingItemId &&
        !!m.movingPackageId &&
        !!m.collectionDate &&
        !!m.timeSlotId &&
        m.fromLocation.address.trim().length > 0 &&
        m.fromLocation.houseNumber.trim().length > 0 &&
        m.toLocation.address.trim().length > 0 &&
        m.toLocation.houseNumber.trim().length > 0 &&
        m.customerDetails.name.trim().length > 0 &&
        m.customerDetails.email.trim().length > 0 &&
        m.customerDetails.phone.trim().length > 0 &&
        m.customerDetails.postalCode.trim().length > 0 &&
        m.customerDetails.address.trim().length > 0;

    return {
        title: "Total Due Today",
        amount,
        amountText: `£${GBP(amount)}`,
        ctaLabel: "Proceed to Payment",
        ctaEnabled: !!m.enableButton && movingOk,
    };
}
