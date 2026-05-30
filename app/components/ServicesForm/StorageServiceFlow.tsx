"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    useStorageCheckout,
} from "../checkout/CheckoutStore";
import { DatePicker } from "../DatePicker";
import { isDayFull, isSlotFull } from "../scheduling/capacityLogic";
import { money, to12Hour, toLocalISODate, weekdayKey } from "@/app/utils/utils";
import { NominatimResult, fetchNominatim, pickCity, streetFromNominatim } from "@/app/lib/address";
import { displayToStoredGB, formatGBForDisplay, isValidGBPhone, normalizeGBPhone, toGBNational } from "@/app/lib/phone";
import { AddressLookupField } from "../addressLookUpField";

type StepId = 0 | 1 | 2 | 3;

const steps = [
    { id: 0 as StepId, title: "Duration" },
    { id: 1 as StepId, title: "Items" },
    { id: 2 as StepId, title: "Schedule" },
    { id: 3 as StepId, title: "Details" },
];

const LAST_STEP: StepId = 3;

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
                                    className={`grid h-7 w-7 place-items-center rounded-full border text-sm font-semibold transition
                                        ${isActive && isCompleted
                                            ? "border-emerald-600 bg-emerald-700 text-white ring-2 ring-emerald-200"
                                            : isActive
                                                ? "border-emerald-600 bg-emerald-700 text-white"
                                                : isCompleted
                                                    ? "border-emerald-600 bg-emerald-700 text-white"
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

export function StorageForm({
    onProceed,
    busy,
    error
}: {
    onProceed: () => void;
    busy?: boolean;
    error?: string | null;
}) {
    const { state, setState, orderFlow, resetNonce } = useStorageCheckout();

    const [step, setStep] = React.useState<StepId>(0);
    const [addressQuery, setAddressQuery] = React.useState("");

    const disableAuto = orderFlow && orderFlow.settings.scheduling.disableAutoBlockSchedule;

    const storageItems = orderFlow && orderFlow.catalog.storage.items;
    const duration = orderFlow && orderFlow.catalog.storage.discountTiers;
    const timeSlots = orderFlow && orderFlow.timeSlots;
    const [orderId, setOrderId] = React.useState<string | null>(null);

    const inc = (id: string) => {
        if (!orderFlow) return;

        const item = orderFlow.catalog.storage.itemsBySku?.[id];
        if (!item) return;

        if (!item.price) return;

        setState((st) => ({
            ...st,
            quantities: {
                ...st.quantities,
                [id]: (st.quantities[id] ?? 0) + 1,
            },
        }));
    };

    const dec = (id: string) => {
        setState((st) => ({
            ...st,
            quantities: {
                ...st.quantities,
                [id]: Math.max(0, (st.quantities[id] ?? 0) - 1),
            },
        }));
    };
    const visibleSlots = useMemo(() => {
        if (!timeSlots) return [];
        const active = timeSlots.filter((s: any) => s && (s.isActive ?? true));
        const map = new Map<string, any>();
        for (const s of active) {
            if (!map.has(String(s.id))) map.set(String(s.id), s);
        }
        return Array.from(map.values());
    }, [timeSlots]);

    const totalItems = useMemo(
        () =>
            Object.values(state.quantities).reduce(
                (acc, val) => acc + (Number(val) || 0),
                0
            ),
        [state.quantities]
    );

    const durationOk = duration.some((d: any) => d.minMonths === state.durationMonth);

    const itemsOk = totalItems > 0;

    const scheduleOk = !!state.collectionDate && !!state.timeSlotId;

    const detailsOk =
        addressQuery.trim().length >= 3 &&
        (state.address.houseNumber ?? "").trim().length > 0 &&
        (state.address.streetAddress ?? "").trim().length > 0 &&
        isValidGBPhone(state.customerDetails.phone ?? "");

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

    React.useEffect(() => {
        setState((s) => ({ ...s, enableButton: detailsOk }));
    }, [detailsOk, setState]);

    React.useEffect(() => {
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

    React.useEffect(() => {
        setStep(0);
        setOrderId("");
    }, [resetNonce])


    const goNext = () => setStep((s) => (Math.min(LAST_STEP, s + 1) as StepId));
    const goBack = () => setStep((s) => (Math.max(0, s - 1) as StepId));

    return (
        <form
            className="space-y-6"
        >
            <div className="space-y-2">
                <Stepper
                    current={step}
                    maxAllowed={maxAllowedStep}
                    onGo={setStep}
                    allCompleted={durationOk && itemsOk && scheduleOk && detailsOk}
                />
                <div className="text-sm text-slate-600">
                    {step === 0 && "Choose how long you want to store your items."}
                    {step === 1 && "Select what you’re storing and quantities."}
                    {step === 2 && "Pick a collection date and time slot."}
                    {step === 3 && "Enter your address and contact details."}
                </div>
            </div>
            {step === 0 && (
                <div className="max-w-full">
                    <label className="block text-sm font-semibold text-slate-800 mb-3">
                        Storage Duration
                    </label>

                    <div
                        role="radiogroup"
                        aria-label="Storage duration"
                        className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {duration.map((m: any) => {
                            const isActive = state.durationMonth === m.minMonths;

                            return (
                                <div
                                    key={m.minMonths}
                                    role="radio"
                                    aria-checked={isActive}
                                    tabIndex={0}
                                    onClick={() =>
                                        setState((st) => ({
                                            ...st,
                                            durationMonth: m.minMonths,
                                            discountId: m.id,
                                        }))
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setState((st) => ({
                                                ...st,
                                                durationMonth: m.minMonths,
                                                discountId: m.id,
                                            }));
                                        }
                                    }}
                                    className={`group relative flex flex-col items-center justify-center
            rounded-2xl border px-3 py-4 text-center cursor-pointer
            transition-all duration-200

            ${isActive
                                            ? "border-emerald-600 bg-emerald-50 shadow-sm"
                                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                                        }

            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300`}
                                >

                                    {/* Badge (discount highlight) */}
                                    {m.percentOff > 0 && (
                                        <div className="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                                            {m.percentOff}% OFF
                                        </div>
                                    )}

                                    {/* Months */}
                                    <div
                                        className={`text-base font-bold ${isActive ? "text-emerald-700" : "text-slate-900"
                                            }`}
                                    >
                                        {m.minMonths}{" "}
                                        <span className="text-sm font-medium text-slate-500">
                                            months
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <div className="mt-1 text-sm text-slate-500">
                                        {m.percentOff === 0 ? "Standard plan" : "Discounted rate"}
                                    </div>

                                    {/* Active indicator */}
                                    {isActive && (
                                        <div className="absolute bottom-2 h-1 w-6 rounded-full bg-emerald-700" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {step === 1 && (
                <div>
                    <div className="flex items-end justify-between gap-4">
                        <p className="text-sm font-medium text-slate-700">What are you storing?</p>
                        <div className="text-sm text-slate-600">
                            Total items: <span className="font-medium text-slate-900">{totalItems}</span>
                        </div>
                    </div>

                    <div className="mt-4">
                        {storageItems.map((item: any) => {
                            const id = item.sku as string;
                            const count = state.quantities[id] ?? 0;
                            const price = item.price?.price ?? 0;

                            return (
                                <div
                                    key={item.id}
                                    className="group rounded-2xl border border-slate-200 bg-white p-4 m-2
  shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
                                >
                                    <div className="flex items-center justify-between gap-4">

                                        {/* LEFT: Item Info */}
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-slate-900 leading-tight">
                                                {item.name}
                                            </div>

                                            <div className="mt-1 text-sm text-slate-500 line-clamp-2">
                                                {item.desc}
                                            </div>

                                            <div className="mt-2 text-sm font-semibold text-slate-900">
                                                {money(price)}
                                            </div>
                                        </div>

                                        {/* RIGHT: Stepper */}
                                        <div className="flex items-center">
                                            <div className="inline-flex items-center rounded-full bg-slate-100 p-1">

                                                <button
                                                    type="button"
                                                    onClick={() => dec(item.sku)}
                                                    disabled={count === 0}
                                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white
          text-lg font-bold text-slate-900 shadow-sm
          hover:bg-slate-50 active:scale-95 active:bg-slate-200
          disabled:opacity-40 disabled:cursor-not-allowed"
                                                    aria-label={`Decrease ${item.name}`}
                                                >
                                                    −
                                                </button>

                                                <span className="mx-3 min-w-[28px] text-center text-sm font-semibold text-slate-900">
                                                    {count}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() => inc(item.sku)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white
          text-lg font-bold text-slate-900 shadow-sm
          hover:bg-slate-50 active:scale-95 active:bg-slate-200"
                                                    aria-label={`Increase ${item.name}`}
                                                >
                                                    +
                                                </button>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {!itemsOk && (
                        <div className="mt-2 text-sm text-rose-600">Add at least 1 item to continue.</div>
                    )}
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <div>
                        <span className="block text-sm font-medium text-slate-700 mb-1">
                            Collection Date
                        </span>
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

                                const minDate = new Date(today);
                                let businessDaysAdded = 0;

                                while (businessDaysAdded < 2) {
                                    minDate.setDate(minDate.getDate() + 1);

                                    const dayOfWeek = minDate.getDay();
                                    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                                    if (!isWeekend) {
                                        businessDaysAdded++;
                                    }
                                }

                                const d = new Date(day);
                                d.setHours(0, 0, 0, 0);

                                if (d < minDate) return true;

                                const iso = toLocalISODate(d);

                                if (scheduling.blackoutDates.includes(iso)) return true;

                                const wk = weekdayKey(d).toUpperCase();

                                const weekdayRule = scheduling.weekdayRules.find(
                                    (r: any) =>
                                        r.serviceType === "STORAGE" && r.weekday === wk
                                );

                                if (weekdayRule && !weekdayRule.enabled) return true;

                                return isDayFull({
                                    orderFlow,
                                    service: "storage",
                                    dateISO: iso,
                                });
                            }}
                        />

                    </div>
                    <div className="w-full max-w-full">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Time Slot</label>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 w-full">
                            {visibleSlots.map((slot: any) => {
                                const dateISO = state.collectionDate;

                                const slotIsFull =
                                    !disableAuto &&
                                    !!dateISO &&
                                    isSlotFull({
                                        orderFlow,
                                        service: "storage",
                                        dateISO,
                                        timeSlotId: slot.id,
                                    });

                                const selected = state.timeSlotId === slot.id;

                                const rangeLabel =
                                    slot.startTime && slot.endTime
                                        ? `${to12Hour(slot.startTime)} - ${to12Hour(slot.endTime)}`
                                        : slot.range ?? "";

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
                        {!scheduleOk && (
                            <div className="mt-2 text-sm text-rose-600">
                                Select a date and a time slot to continue.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                    <p className="text-sm font-medium text-slate-700">Customer Details</p>
                    <div className="relative">
                        <AddressLookupField
                            value={addressQuery}
                            onValueChange={(val) => {
                                setAddressQuery(val);

                                setState((st) => ({
                                    ...st,
                                    address: {
                                        ...st.address,
                                        streetAddress: val,
                                        houseNumber: "",
                                        postalCode: "",
                                        lat: 0,
                                        lon: 0,
                                    },
                                }));
                            }}
                            placeholder="Address/Postcode (e.g. SW1A 1AA)"
                            onSelectAddress={(sug) => {
                                const addr = sug.address ?? {};
                                const city = pickCity(addr);
                                const street = streetFromNominatim(sug);

                                setState((st) => ({
                                    ...st,
                                    address: {
                                        ...st.address,
                                        streetAddress: sug.displayName ?? street,
                                        houseNumber: addr.house_number ?? st.address.houseNumber,
                                        postalCode: addr.postcode ?? st.address.postalCode,
                                        lat: sug.lat ? Number(sug.lat) : 0,
                                        lon: sug.lon ? Number(sug.lon) : 0,
                                    },
                                }));

                                setAddressQuery(sug.displayName ?? street);
                            }}
                            onNoResults={() => {
                                setState((st) => ({
                                    ...st,
                                    address: {
                                        ...st.address,
                                        streetAddress: "",
                                        houseNumber: "",
                                        postalCode: "",
                                        lat: 0,
                                        lon: 0,
                                    },
                                }));
                            }}
                        />

                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                            <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:ring-2 focus-within:ring-emerald-200">
                                {/* Prefix */}
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 text-sm text-slate-700 border-r border-slate-200">
                                    <span className="text-base leading-none">🇬🇧</span>
                                    <span className="font-semibold">+44</span>
                                </div>

                                {/* Input */}
                                <input
                                    inputMode="tel"
                                    autoComplete="tel"
                                    placeholder="7123 456789"
                                    className="h-11 flex-1 px-3 text-sm text-slate-800 outline-none"
                                    value={formatGBForDisplay(state.customerDetails.phone ?? "")}
                                    onChange={(e) => {
                                        const nextDisplay = e.target.value;
                                        const stored = displayToStoredGB(nextDisplay);

                                        setState((s) => ({
                                            ...s,
                                            customerDetails: {
                                                ...s.customerDetails,
                                                phone: stored,
                                            },
                                        }));
                                    }}
                                    onPaste={(e) => {
                                        const pasted = e.clipboardData.getData("text");

                                        // If pasted includes +44 or 07..., normalize then store
                                        const national = toGBNational(pasted);

                                        setState((s) => ({
                                            ...s,
                                            customerDetails: {
                                                ...s.customerDetails,
                                                phone: national,
                                            },
                                        }));

                                        e.preventDefault();
                                    }}
                                />
                            </div>

                            {/* Error (optional) */}
                            {normalizeGBPhone(state.customerDetails.phone ?? "").length >= 10 &&
                                !isValidGBPhone(state.customerDetails.phone ?? "") && (
                                    <div className="text-sm text-rose-600">Enter a valid UK phone number.</div>
                                )}
                        </div>
                        <input
                            value={state.address.houseNumber}
                            onChange={(e) =>
                                setState((s) => ({
                                    ...s,
                                    address: {
                                        ...s.address,
                                        houseNumber: e.target.value,
                                    },
                                }))
                            }
                            type="text"
                            placeholder="House/Flat Number"
                            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                        />
                    </div>

                    {!detailsOk && (
                        <div className="text-sm text-rose-600">
                            Fill in postal code, phone number, house/flat number and street address to continue.
                        </div>
                    )}
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
