"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    type TimeSlotId,
    useMovingCheckout,
} from "../checkout/CheckoutStore";
import { DatePicker } from "../DatePicker";
import { isDayFull, isSlotFull } from "../scheduling/capacityLogic";
import { to12Hour, toLocalISODate, weekdayKey } from "@/app/utils/utils";

type StepId = 0 | 1 | 2 | 3 | 4;
const steps = [
    { id: 0 as StepId, title: "Origin" },
    { id: 1 as StepId, title: "Destination" },
    { id: 2 as StepId, title: "Items" },
    { id: 3 as StepId, title: "Package" },
    { id: 4 as StepId, title: "Schedule" },
];

const LAST_STEP: StepId = 4;
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
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-6">
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
                            ${isActive ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"}
                            ${!isEnabled ? "opacity-40 cursor-not-allowed hover:border-slate-200" : ""}`}
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold transition
                                    ${isCompleted
                                            ? "border-emerald-600 bg-emerald-600 text-white"
                                            : isActive
                                                ? "border-emerald-600 bg-emerald-600 text-white"
                                                : "border-slate-200 bg-white text-slate-700"
                                        }
                                    ${isActive ? "ring-2 ring-emerald-200" : ""}`}
                                >
                                    {idx + 1}
                                </div>
                                <div className="min-w-0">
                                    <div className={`truncate text-sm font-medium ${isActive ? "text-slate-900" : "text-slate-800"}`}>
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
    isPaying,
}: {
    canBack: boolean;
    canNext: boolean;
    isLast: boolean;
    onBack: () => void;
    onNext: () => void;
    isPaying: boolean;
}) {
    return (
        <div className="flex items-center justify-between gap-3 pt-2">
            <button
                type="button"
                onClick={onBack}
                disabled={!canBack || isPaying}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-40"
            >
                Back
            </button>

            <button
                type="button"
                onClick={onNext}
                disabled={!canNext || isPaying}
                className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-40 inline-flex items-center justify-center gap-2"
            >
                {isPaying && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                )}
                {isLast
                    ? isPaying
                        ? "Opening payment..."
                        : "Proceed to Payment"
                    : "Continue"}
            </button>
        </div>
    );
}

export function MovingForm({
    onProceed,
    busy,
    error
}: {
    onProceed: () => void;
    busy?: boolean;
    error?: string | null;
}) {
    const router = useRouter();
    const { state, setState, orderFlow } = useMovingCheckout();
    const [step, setStep] = useState<StepId>(0);
    const timeSlots = orderFlow && orderFlow.timeSlots;
    const disableAuto = orderFlow && orderFlow.settings.scheduling.disableAutoBlockSchedule;
    const [orderId, setOrderId] = useState<string | null>(null);
    // --- 1. Extract Dynamic Data from orderFlow ---
    const movingItems = orderFlow?.catalog?.moving.items ?? [];
    const movingPackages = orderFlow?.catalog.moving.packages ?? [];

    // --- 2. Validation Logic ---
    const originOk = state.fromLocation.streetAddress.trim().length > 0 && state.fromLocation.houseNumber.trim().length > 0;
    const destinationOk = state.toLocation.streetAddress.trim().length > 0 && state.toLocation.houseNumber.trim().length > 0;
    const itemOk = state.movingItemId !== "";
    const packageOk = state.movingPackageId !== "";
    const scheduleOk = !!state.collectionDate && !!state.timeSlotId;

    const canGoNext =
        (step === 0 && originOk) ||
        (step === 1 && destinationOk) ||
        (step === 2 && itemOk) ||
        (step === 3 && packageOk) ||
        (step === 4 && scheduleOk);

    const maxAllowedStep = useMemo(() => {
        if (!originOk) return 0;
        if (!destinationOk) return 1;
        if (!itemOk) return 2;
        if (!packageOk) return 3;
        if (!scheduleOk) return 4;
        return step;
    }, [originOk, destinationOk, itemOk, packageOk, scheduleOk, step]);

    useEffect(() => {
        if (!orderFlow?.ok) return;

        const scheduling = orderFlow.settings.scheduling;

        if (scheduling.disableAutoBlockSchedule) return;

        if (!state.collectionDate) return;
        if (!state.timeSlotId) return;

        const slotIsFull = isSlotFull({
            orderFlow,
            service: "storage",
            dateISO: state.collectionDate,
            timeSlotId: state.timeSlotId,
            // volumesByTimeSlotId: optional for now (defaults to 0)
            // volumesByTimeSlotId,
        });

        if (slotIsFull) {
            setState((s) => ({ ...s, timeSlotId: "" }));
        }
    }, [orderFlow, state.collectionDate, state.timeSlotId, setState]);

    useEffect(()=>{
        console.log(state);
    },[state])


    const goNext = () => setStep((s) => (Math.min(4, s + 1) as StepId));
    const goBack = () => setStep((s) => (Math.max(0, s - 1) as StepId));

    return (
        <form className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-6 shadow-sm space-y-6">
            <Stepper
                current={step}
                maxAllowed={maxAllowedStep as StepId}
                onGo={setStep}
                allCompleted={scheduleOk}
            />

            {/* Step 0: Origin */}
            {step === 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                    <input
                        value={state.fromLocation.houseNumber}
                        onChange={(e) =>
                            setState((s) => ({
                                ...s,
                                fromLocation: { ...s.fromLocation, houseNumber: e.target.value },
                            }))
                        }
                        placeholder="From House Number"
                        className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                    />
                    <input
                        value={state.fromLocation.streetAddress}
                        onChange={(e) =>
                            setState((s) => ({
                                ...s,
                                fromLocation: { ...s.fromLocation, streetAddress: e.target.value },
                            }))
                        }
                        placeholder="From Address"
                        className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                    />
                    {!originOk && <div className="sm:col-span-2 text-xs text-rose-600">Enter house number and address.</div>}
                </div>
            )}

            {/* Step 1: Destination */}
            {step === 1 && (
                <div className="grid gap-3 sm:grid-cols-2">
                    <input
                        value={state.toLocation.houseNumber}
                        onChange={(e) =>
                            setState((s) => ({
                                ...s,
                                toLocation: { ...s.toLocation, houseNumber: e.target.value },
                            }))
                        }
                        placeholder="To House Number"
                        className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                    />
                    <input
                        value={state.toLocation.streetAddress}
                        onChange={(e) =>
                            setState((s) => ({
                                ...s,
                                toLocation: { ...s.toLocation, streetAddress: e.target.value },
                            }))
                        }
                        placeholder="To Address"
                        className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                    />
                    {!destinationOk && <div className="sm:col-span-2 text-xs text-rose-600">Enter house number and address.</div>}
                </div>
            )}

            {/* Step 2: Items (Dynamic from orderFlow) */}
            {step === 2 && (
                <div className="grid gap-3 sm:grid-cols-2">
                    {movingItems.map((it: any) => (
                        <div
                            key={it.id}
                            className={`cursor-pointer rounded-xl border p-4 transition ${state.movingItemId === it.id ? "border-emerald-600 bg-emerald-50" : "border-slate-200 bg-white"
                                }`}
                            onClick={() => setState((s) => ({ ...s, movingItemId: it.id}))}
                        >
                            <div className="text-sm font-medium text-slate-900">{it.name}</div>
                            <div className="text-xs text-slate-600">{it.desc || it.description}</div>
                            <div className="text-sm font-medium text-slate-900">{it.price.price}</div>
                        </div>
                    ))}
                    {!itemOk && <div className="sm:col-span-2 text-xs text-rose-600">Select a move size.</div>}
                </div>
            )}

            {/* Step 3: Package (Dynamic from orderFlow) */}
            {step === 3 && (
                <div className="grid gap-3 sm:grid-cols-2">
                    {movingPackages.map((pk: any) => (
                        <div
                            key={pk.id}
                            className={`cursor-pointer rounded-xl border p-4 transition ${state.movingPackageId === pk.id ? "border-emerald-600 bg-emerald-50" : "border-slate-200 bg-white"
                                }`}
                            onClick={() => setState((s) => ({ ...s, movingPackageId: pk.id}))}
                        >
                            <div className="text-sm font-medium text-slate-900">{pk.name}</div>
                            <div className="text-xs text-slate-600">{pk.desc || pk.description}</div>
                            <div className="text-sm font-medium text-slate-900">{pk.price.price}</div>
                        </div>
                    ))}
                    {!packageOk && <div className="sm:col-span-2 text-xs text-rose-600">Select a package.</div>}
                </div>
            )}

            {/* Step 4: Schedule (Dynamic from orderFlow) */}
            {step === 4 && (
                <div className="space-y-4">
                    <DatePicker
                        value={state.collectionDate ?? ""}
                        onChange={(val) =>
                            setState((s) => ({
                                ...s,
                                collectionDate: val,

                            }))
                        }
                        disabled={(day: Date) => {
                            if (!orderFlow?.ok) return false;

                            const scheduling = orderFlow.settings.scheduling;

                            if (scheduling.disableAutoBlockSchedule) return false;

                            const today = new Date();
                            today.setHours(0, 0, 0, 0);

                            const d = new Date(day);
                            d.setHours(0, 0, 0, 0);

                            if (d < today) return true;

                            const iso = toLocalISODate(d);

                            if (scheduling.blackoutDates.includes(iso)) return true;

                            const wk = weekdayKey(d).toUpperCase(); // MON, TUE, etc.

                            const weekdayRule = scheduling.weekdayRules.find(
                                (r: any) =>
                                    r.serviceType === "STORAGE" && r.weekday === wk
                            );

                            if (weekdayRule && !weekdayRule.enabled) return true;

                            return isDayFull({
                                orderFlow,
                                service: "storage",
                                dateISO: iso,
                                // volumesByTimeSlotId optional when you add volumes endpoint
                            });
                        }}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {timeSlots.map((slot: any) => {
                            const dateISO = state.collectionDate;

                            const slotIsFull =
                                !disableAuto &&
                                !!dateISO &&
                                isSlotFull({
                                    orderFlow,
                                    service: "storage",
                                    dateISO,
                                    timeSlotId: slot.id,
                                    // volumesByTimeSlotId,     // optional later when you have volumes endpoint
                                });

                            const selected = state.timeSlotId === slot.id;

                            const rangeLabel = `${to12Hour(slot.startTime)} - ${to12Hour(slot.endTime)}`;

                            function selectSlot() {
                                if (slotIsFull) return;
                                setState((s: any) => ({
                                    ...s,
                                    timeSlotId: slot.id,
                                    timeSlot: rangeLabel,
                                }));
                            }

                            return (
                                <div
                                    key={slot.id}
                                    className={`relative min-w-0 rounded-xl border p-3 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200
                                                                ${slotIsFull
                                            ? "cursor-not-allowed bg-slate-50 opacity-50 border-slate-200"
                                            : "cursor-pointer bg-white hover:border-slate-300"
                                        }
                                                                ${selected
                                            ? "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600"
                                            : "border-slate-200"
                                        }`}
                                    onClick={selectSlot}
                                    onKeyDown={(e) => {
                                        if (slotIsFull) return;
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            selectSlot();
                                        }
                                    }}
                                    role="radio"
                                    aria-checked={selected}
                                    aria-disabled={slotIsFull}
                                    tabIndex={slotIsFull ? -1 : 0}
                                >
                                    <input
                                        type="radio"
                                        className="sr-only"
                                        name="timeSlotId"
                                        value={slot.id}
                                        disabled={slotIsFull}
                                        checked={selected}
                                        readOnly
                                    />

                                    <div className="text-sm font-bold text-slate-900 truncate">
                                        {slot.name} {slotIsFull ? "(Full)" : ""}
                                    </div>
                                    <div className="text-[11px] text-slate-500 whitespace-nowrap">
                                        {rangeLabel}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <input
                            value={state.notes}
                            onChange={(e) =>
                                setState((s) => ({ ...s, notes: e.target.value }))
                            }
                            placeholder="Additional Address Details"
                            className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                        />
                        {!scheduleOk && <div className="mt-2 text-xs text-rose-600">Select a date and time slot.</div>}
                    </div>
                </div>
            )}

            <FooterNav
                canBack={step > 0 && !orderId}
                canNext={!orderId && canGoNext && step <= maxAllowedStep}
                isLast={step === LAST_STEP}
                onBack={goBack}
                onNext={() => {
                    if (!canGoNext) return;

                    if (step === LAST_STEP) {
                        onProceed();
                    } else {
                        goNext();
                    }
                }}
                isPaying={!!busy}
            />

            {error && <div className="text-red-500 mb-4">{error}</div>}
        </form>
    );
}
// export function MovingForm(){
//     return <div>Under Construction</div>
// }
