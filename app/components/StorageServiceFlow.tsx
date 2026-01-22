"use client";

import { useRouter } from "next/navigation";
import { useCheckout, type StorageItemId, type TimeSlotId } from "../components/checkout/CheckoutStore";

const storageItems: { id: StorageItemId; name: string; desc: string }[] = [
    { id: "small-box", name: "Small Box", desc: "45 × 30 × 30 cm" },
    { id: "medium-box", name: "Medium Box", desc: "50 × 40 × 40 cm" },
    { id: "large-box", name: "Large Box", desc: "50 × 50 × 50 cm" },
    { id: "xl-box", name: "XL Box", desc: "70 × 45 × 45 cm" },
    { id: "suitcase", name: "Suitcase", desc: "Hard shelled suitcase" },
    { id: "half-container", name: "½ Container", desc: "25sqft container" },
    { id: "full-container", name: "Full Container", desc: "50sqft container" },
];

export function StorageForm() {
    const router = useRouter();
    const { state, setState } = useCheckout();

    const inc = (id: StorageItemId) =>
        setState((s) => ({ ...s, quantities: { ...s.quantities, [id]: s.quantities[id] + 1 } }));

    const dec = (id: StorageItemId) =>
        setState((s) => ({ ...s, quantities: { ...s.quantities, [id]: Math.max(0, s.quantities[id] - 1) } }));

    const totalItems = Object.values(state.quantities).reduce((a, b) => a + b, 0);

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (totalItems === 0) return; // simple guard
        router.push("/order-summary");
    }

    return (
        <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-8">

            {/* Duration */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Storage Duration
                </label>

                <div className="grid grid-cols-3 gap-3">
                    {[3, 6, 12].map((m) => (
                        <label
                            key={m}
                            className={`cursor-pointer rounded-xl border p-3 text-center transition
          ${state.durationMonth === m
                                    ? "border-[#4CAF50] bg-[#4CAF50]/10"
                                    : "border-slate-200 hover:border-slate-300"
                                }`}
                        >
                            <input
                                type="radio"
                                className="sr-only"
                                name="durationMonths"
                                value={m}
                                checked={state.durationMonth === m}
                                onChange={() => setState((s) => ({ ...s, durationMonth: m }))}
                            />
                            <div className="text-sm font-medium text-slate-900">{m} months</div>
                            <div className="text-xs text-slate-600">
                                {m === 3 ? "5% off" : m === 6 ? "10% off" : "15% off"}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* What are you storing (qty controls) */}
            <div>
                <div className="flex items-end justify-between gap-4">
                    <p className="text-sm font-medium text-slate-700">What are you storing?</p>
                    <div className="text-xs text-slate-600">
                        Total items: <span className="font-medium text-slate-900">{totalItems}</span>
                    </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {storageItems.map((item) => {
                        const count = state.quantities[item.id];

                        return (
                            <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <div className="text-sm font-medium text-slate-900">{item.name}</div>
                                        <div className="mt-1 text-xs text-slate-600">{item.desc}</div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => dec(item.id)}
                                            disabled={count === 0}
                                            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white
                                 text-slate-800 hover:bg-slate-50 disabled:opacity-40"
                                            aria-label={`Decrease ${item.name}`}
                                        >
                                            −
                                        </button>

                                        <div className="min-w-[28px] text-center text-sm font-medium text-slate-900">
                                            {count}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => inc(item.id)}
                                            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white
                                 text-slate-800 hover:bg-slate-50"
                                            aria-label={`Increase ${item.name}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* {count > 0 && (
                                    <div className="mt-3 rounded-lg bg-[#4CAF50]/10 px-3 py-2 text-xs text-slate-700">
                                        Added: <span className="font-medium">{count}</span>
                                    </div>
                                )} */}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Collection date */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Collection Date</label>
                    <input
                        type="date"
                        value={state.collectionDate}
                        onChange={(e) => setState((s) => ({ ...s, collectionDate: e.target.value }))}
                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                    />
                </div>

                {/* Time slot (radio behavior, no radio shown) */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Time Slot</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { id: "morning", label: "Morning", desc: "8am – 12pm" },
                            { id: "afternoon", label: "Afternoon", desc: "12pm – 4pm" },
                            { id: "evening", label: "Evening", desc: "4pm – 8pm" },
                        ].map((slot) => (
                            <label
                                key={slot.id}
                                className={`cursor-pointer rounded-xl border p-3 text-center transition
                  ${state.timeSlot === slot.id
                                        ? "border-[#4CAF50] bg-[#4CAF50]/10"
                                        : "border-slate-200 hover:border-slate-300"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    className="sr-only"
                                    name="timeSlot"
                                    value={slot.id}
                                    checked={state.timeSlot === (slot.id as TimeSlotId)}
                                    onChange={() => setState((s) => ({ ...s, timeSlot: slot.id as TimeSlotId }))}
                                />
                                <div className="text-sm font-medium text-slate-900">{slot.label}</div>
                                <div className="text-xs text-slate-600">{slot.desc}</div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Customer details */}
            <div className="space-y-4">
                <p className="text-sm font-medium text-slate-700">Customer Details</p>

                <div className="grid gap-4 sm:grid-cols-2">
                    <input
                        value={state.postalCode}
                        onChange={(e) => setState((s) => ({ ...s, postalCode: e.target.value }))}
                        type="text"
                        placeholder="Postal Code"
                        className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                    />

                    <input
                        value={state.phoneNumber}
                        onChange={(e) => setState((s) => ({ ...s, phoneNumber: e.target.value }))}
                        type="tel"
                        placeholder="Phone Number"
                        className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                    />
                </div>

                <input
                    value={state.streetAddress}
                    onChange={(e) => setState((s) => ({ ...s, streetAddress: e.target.value }))}
                    type="text"
                    placeholder="Street Address"
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                />
            </div>
        </form>
    );
}
