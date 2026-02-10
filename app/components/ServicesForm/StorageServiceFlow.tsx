"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    useStorageCheckout,
    type StorageItemId,
    type TimeSlotId,
} from "../checkout/CheckoutStore";
import { DatePicker } from "../DatePicker";
import { isDayFull, isSlotFull } from "../scheduling/capacityLogic";
import { useAdminSettings } from "../../admin/useAdminSettings";

const storageItems: { id: StorageItemId; name: string; desc: string }[] = [
    { id: "small-box", name: "Small Box", desc: "45 × 30 × 30 cm" },
    { id: "medium-box", name: "Medium Box", desc: "50 × 40 × 40 cm" },
    { id: "large-box", name: "Large Box", desc: "50 × 50 × 50 cm" },
    { id: "xl-box", name: "XL Box", desc: "70 × 45 × 45 cm" },
    { id: "suitcase", name: "Suitcase", desc: "Hard shelled suitcase" },
    { id: "half-container", name: "½ Container", desc: "25sqft container" },
    { id: "full-container", name: "Full Container", desc: "50sqft container" },
];

type StepId = 0 | 1 | 2 | 3;

const steps = [
    { id: 0 as StepId, title: "Duration" },
    { id: 1 as StepId, title: "Items" },
    { id: 2 as StepId, title: "Schedule" },
    { id: 3 as StepId, title: "Details" },
];

const LAST_STEP: StepId = 3;
const ADMIN_DEFAULT = {
    scheduling: {
        disableAutoBlockSchedule: false,
        capacityEnabled: true,
        capacityPerService: {
            storage: { morning: 6, afternoon: 8, evening: 6 },
            moving: { morning: 3, afternoon: 3, evening: 2 },
            shredding: { morning: 10, afternoon: 12, evening: 10 },
        },
        weekdaysByService: {
            storage: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: false },
            moving: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false },
            shredding: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: true },
        },
        blackoutDates: ["2026-02-11", "2026-02-12"],
    },
};

type WeekdayKey = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

function weekdayKey(d: Date): WeekdayKey {
    return (["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const)[d.getDay()];
}

function toLocalISODate(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

function Stepper({
    current,
    maxAllowed,
    onGo,
    allCompleted,
}: {
    current: StepId;
    maxAllowed: StepId;
    onGo: (s: StepId) => void;
    allCompleted?: boolean;
}) {
    return (
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {steps.map((s, idx) => {
                const isActive = s.id === current;
                const isCompleted = s.id < maxAllowed || allCompleted;
                const isLocked = !isCompleted && !isActive;
                const isEnabled = isActive || isCompleted;

                return (
                    <li key={s.id} className="min-w-0">
                        <button
                            type="button"
                            onClick={() => !isLocked && onGo(s.id)}
                            disabled={!isEnabled}
                            className={`w-full rounded-xl border px-3 py-2 text-left transition
                            ${isActive
                                    ? "border-emerald-200 bg-emerald-50"
                                    : "border-slate-200 bg-white hover:border-slate-300"
                                }
                            ${!isEnabled ? "opacity-40 cursor-not-allowed hover:border-slate-200" : ""}`}
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold transition
                                        ${isActive && isCompleted
                                            ? "border-emerald-600 bg-emerald-600 text-white ring-2 ring-emerald-200"
                                            : isActive
                                                ? "border-emerald-600 bg-emerald-600 text-white"
                                                : isCompleted
                                                    ? "border-emerald-600 bg-emerald-600 text-white"
                                                    : "border-slate-200 bg-white text-slate-700"
                                        }
`}
                                >
                                    {idx + 1}
                                </div>

                                <div className="min-w-0">
                                    <div
                                        className={`truncate text-sm font-medium ${isActive ? "text-slate-900" : "text-slate-800"
                                            }`}
                                    >
                                        {s.title}
                                    </div>
                                </div>
                            </div>
                        </button>
                    </li>
                );
            })}
        </ol>
    );
}

function FooterNav({
    canBack,
    canNext,
    isLast,
    onBack,
    onNext,
}: {
    canBack: boolean;
    canNext: boolean;
    isLast: boolean;
    onBack: () => void;
    onNext: () => void;
}) {
    return (
        <div className="flex items-center justify-between gap-3 pt-2">
            <button
                type="button"
                onClick={onBack}
                disabled={!canBack}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-40"
            >
                Back
            </button>

            <button
                type={isLast ? "submit" : "button"}
                onClick={isLast ? undefined : onNext}
                disabled={!canNext}
                className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-40"
            >
                {isLast ? "Proceed to Payment" : "Continue"}
            </button>
        </div>
    );
}

export function StorageForm() {
    const router = useRouter();
    const { state, setState } = useStorageCheckout();

    const [step, setStep] = useState<StepId>(0);
    const admin = useAdminSettings(ADMIN_DEFAULT);

    const disableAuto = admin.scheduling.disableAutoBlockSchedule;
    const capacityEnabled = admin.scheduling.capacityEnabled;
    const caps = admin.scheduling.capacityPerService.storage;
    const blackout = new Set(admin.scheduling.blackoutDates);

    const inc = (id: StorageItemId) =>
        setState((st) => ({
            ...st,
            quantities: { ...st.quantities, [id]: st.quantities[id] + 1 },
        }));

    const dec = (id: StorageItemId) =>
        setState((st) => ({
            ...st,
            quantities: { ...st.quantities, [id]: Math.max(0, st.quantities[id] - 1) },
        }));

    const totalItems = useMemo(
        () => Object.values(state.quantities).reduce((a, b) => a + b, 0),
        [state.quantities]
    );

    // Step validation
    const durationOk =
        state.durationMonth === 1 ||
        state.durationMonth === 3 ||
        state.durationMonth === 6 ||
        state.durationMonth === 12;

    const itemsOk = totalItems > 0;

    const scheduleOk = !!state.collectionDate && !!state.timeSlot;

    const detailsOk =
        (state.customerDetails.houseNumber ?? "").trim().length > 0 &&
        (state.customerDetails.postalCode ?? "").trim().length > 0 &&
        (state.customerDetails.phone ?? "").trim().length > 0 &&
        (state.customerDetails.address ?? "").trim().length > 0;

    const canGoNext =
        (step === 0 && durationOk) ||
        (step === 1 && itemsOk) ||
        (step === 2 && scheduleOk) ||
        (step === 3 && detailsOk);

    const maxAllowedStep: StepId = useMemo(() => {
        if (!durationOk) return 0;
        if (!itemsOk) return 1;
        if (!scheduleOk) return 2;
        if (!detailsOk) return 3;
        return step;
    }, [durationOk, itemsOk, scheduleOk, detailsOk, step]);

    useEffect(() => {
        setState((s) => ({ ...s, enableButton: detailsOk }));
    }, [detailsOk, setState]);

    useEffect(() => {
        if (disableAuto) return;
        if (!state.collectionDate) return;
        if (!state.timeSlot) return; // protects against ""

        const slotIsFull = isSlotFull({
            enabled: capacityEnabled,
            caps,
            service: "storage",
            dateISO: state.collectionDate,
            slot: state.timeSlot, // now it's safe
        });

        if (slotIsFull) {
            setState((s) => ({ ...s, timeSlot: "" as TimeSlotId }));
        }
    }, [disableAuto, capacityEnabled, caps, state.collectionDate, state.timeSlot, setState]);

    useEffect(() => {
        setState((s) => ({ ...s, timeSlot: "" as TimeSlotId }));
    }, [state.collectionDate]);

    useEffect(() => {
        if (disableAuto) return;
        if (!state.collectionDate) return;

        const d = new Date(`${state.collectionDate}T00:00:00`);
        const wk = weekdayKey(d);

        if (!admin.scheduling.weekdaysByService.storage[wk]) {
            setState((s) => ({ ...s, collectionDate: "", timeSlot: "" as TimeSlotId }));
        }
    }, [disableAuto, admin.scheduling.weekdaysByService.storage, state.collectionDate, setState]);

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (maxAllowedStep < 3) return;
        router.push("/order-summary");
    }

    const goNext = () => setStep((s) => (Math.min(3, s + 1) as StepId));
    const goBack = () => setStep((s) => (Math.max(0, s - 1) as StepId));

    return (
        <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-6 shadow-sm space-y-6"
        >
            {/* Stepper */}
            <div className="space-y-2">
                <Stepper
                    current={step}
                    maxAllowed={maxAllowedStep}
                    onGo={setStep}
                    allCompleted={durationOk && itemsOk && scheduleOk && detailsOk}
                />
                <div className="text-xs text-slate-600">
                    {step === 0 && "Choose how long you want to store your items."}
                    {step === 1 && "Select what you’re storing and quantities."}
                    {step === 2 && "Pick a collection date and time slot."}
                    {step === 3 && "Enter your address and contact details."}
                </div>
            </div>

            {/* Step 0: Duration */}
            {step === 0 && (
                <div className="space-y-2 max-w-full">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Storage Duration
                    </label>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                        {[1, 3, 6, 12].map((m) => (
                            <div
                                key={m}
                                className={`relative min-w-0 w-full flex flex-col items-center justify-center
                                    rounded-xl border p-2 py-3 text-center transition
                                    ${state.durationMonth === m
                                        ? "border-emerald-600 bg-emerald-50"
                                        : "border-slate-200 bg-white hover:border-slate-300"
                                    }
                                    cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200`}
                                role="radio"
                                aria-checked={state.durationMonth === m}
                                tabIndex={0}
                                onClick={() =>
                                    setState((st) => ({ ...st, durationMonth: m as 1 | 3 | 6 | 12 }))
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setState((st) => ({ ...st, durationMonth: m as 1 | 3 | 6 | 12 }));
                                    }
                                }}
                            >
                                <input
                                    type="radio"
                                    className="sr-only"
                                    name="durationMonths"
                                    value={m}
                                    checked={state.durationMonth === m}
                                    readOnly
                                />

                                <div className="text-sm font-bold text-slate-900 truncate">
                                    {m} <span className="">months</span>
                                </div>

                                <div className="mt-1 text-[10px] text-slate-500 truncate">
                                    {m === 1 ? "Standard" : m === 3 ? "5% off" : m === 6 ? "10% off" : "15% off"}
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            )}

            {/* Step 2: Items */}
            {step === 1 && (
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
                                <div
                                    key={item.id}
                                    className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition"
                                >
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
                                                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                                                aria-label={`Increase ${item.name}`}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {!itemsOk && (
                        <div className="mt-2 text-xs text-rose-600">Add at least 1 item to continue.</div>
                    )}
                </div>
            )}

            {/* Step 3: Schedule */}
            {step === 2 && (
                <div className="space-y-4">
                    <div>
                        <span className="block text-sm font-medium text-slate-700 mb-1">
                            Collection Date
                        </span>
                        <DatePicker
                            value={state.collectionDate}
                            onChange={(val) => setState((s) => ({ ...s, collectionDate: val }))}
                            disabled={(day: Date) => {
                                if (disableAuto) return false;

                                // disable past dates
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const d = new Date(day);
                                d.setHours(0, 0, 0, 0);
                                if (d < today) return true;


                                // ✅ weekday per service (storage)
                                const wk = weekdayKey(d);
                                if (!admin.scheduling.weekdaysByService.storage[wk]) return true;

                                // disable full days by volume
                                const iso = toLocalISODate(d);
                                if (blackout.has(iso)) return true;

                                return isDayFull({
                                    enabled: capacityEnabled,
                                    caps,
                                    service: "storage",
                                    dateISO: iso,
                                });
                            }}
                        />
                    </div>
                    <div className="w-full max-w-full">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Time Slot</label>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 w-full">
                            {[
                                { id: "morning", label: "Morning", desc: "7am – 10am" },
                                { id: "afternoon", label: "Afternoon", desc: "10am – 3pm" },
                                { id: "evening", label: "Evening", desc: "3pm – 6pm" },
                            ].map((slot) => {
                                const dateISO = state.collectionDate;
                                const slotIsFull = !disableAuto && !!dateISO && isSlotFull({
                                    enabled: capacityEnabled,
                                    caps,
                                    service: "storage",
                                    dateISO,
                                    slot: slot.id as Exclude<TimeSlotId, "">,
                                });

                                return (
                                    <div
                                        key={slot.id}
                                        className={`relative min-w-0 rounded-xl border p-3 text-center transition
                                                    ${slotIsFull
                                                ? "cursor-not-allowed bg-slate-50 opacity-50 border-slate-200"
                                                : "cursor-pointer bg-white hover:border-slate-300"
                                            }
                                                    ${state.timeSlot === slot.id
                                                ? "border-emerald-600 bg-emerald-50"
                                                : "border-slate-200"
                                            }
                                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200`}
                                        onClick={() => {
                                            if (slotIsFull) return;
                                            setState((s) => ({ ...s, timeSlot: slot.id as TimeSlotId }));
                                        }}
                                        role="radio"
                                        aria-checked={state.timeSlot === slot.id}
                                        tabIndex={slotIsFull ? -1 : 0}
                                    >
                                        <input
                                            type="radio"
                                            className="sr-only"
                                            name="timeSlot"
                                            value={slot.id}
                                            disabled={slotIsFull}
                                            checked={state.timeSlot === (slot.id as TimeSlotId)}
                                            readOnly
                                        />
                                        <div className="text-sm font-bold text-slate-900 truncate">
                                            {slot.label} {slotIsFull ? "(Full)" : ""}
                                        </div>
                                        <div className="text-[11px] text-slate-500 whitespace-nowrap">
                                            {slot.desc}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {!scheduleOk && (
                            <div className="mt-2 text-xs text-rose-600">
                                Select a date and a time slot to continue.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Step 4: Details */}
            {step === 3 && (
                <div className="space-y-4">
                    <p className="text-sm font-medium text-slate-700">Customer Details</p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <input
                            value={state.customerDetails.postalCode}
                            onChange={(e) =>
                                setState((s) => ({
                                    ...s,
                                    customerDetails: {
                                        ...s.customerDetails,
                                        postalCode: e.target.value,
                                    },
                                }))
                            }
                            type="text"
                            placeholder="Postal Code"
                            className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                        />

                        <input
                            value={state.customerDetails.phone}
                            onChange={(e) =>
                                setState((s) => ({
                                    ...s,
                                    customerDetails: {
                                        ...s.customerDetails,
                                        phone: e.target.value,
                                    },
                                }))
                            }
                            type="tel"
                            placeholder="Phone Number"
                            className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                        />
                        <input
                            value={state.customerDetails.houseNumber}
                            onChange={(e) =>
                                setState((s) => ({
                                    ...s,
                                    customerDetails: {
                                        ...s.customerDetails,
                                        houseNumber: e.target.value,
                                    },
                                }))
                            }
                            type="text"
                            placeholder="House/Flat Number"
                            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                        />
                        <input
                            value={state.customerDetails.address}
                            onChange={(e) =>
                                setState((s) => ({
                                    ...s,
                                    customerDetails: {
                                        ...s.customerDetails,
                                        address: e.target.value,
                                    },
                                }))
                            }
                            type="text"
                            placeholder="Street Address"
                            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                        />
                    </div>



                    {!detailsOk && (
                        <div className="text-xs text-rose-600">
                            Fill in postal code, phone number, house/flat number and street address to continue.
                        </div>
                    )}
                </div>
            )}

            {/* Footer navigation */}
            <FooterNav
                canBack={step > 0}
                canNext={canGoNext && step <= maxAllowedStep}
                isLast={step === LAST_STEP}
                onBack={goBack}
                onNext={() => {
                    if (!canGoNext) return;
                    goNext();
                }}
            />
        </form>
    );
}
