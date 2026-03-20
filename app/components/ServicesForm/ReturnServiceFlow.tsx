"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useReturnCheckout } from "../checkout/CheckoutStore";
import { DatePicker } from "../DatePicker";
import { isDayFull, isSlotFull } from "../scheduling/capacityLogic";
import { money, to12Hour, toLocalISODate, weekdayKey } from "@/app/utils/utils";
import {
    NominatimResult,
    fetchNominatim,
    pickCity,
    streetFromNominatim,
} from "@/app/lib/address";
import {
    displayToStoredGB,
    formatGBForDisplay,
    isValidGBPhone,
    normalizeGBPhone,
    toGBNational,
} from "@/app/lib/phone";
import { AddressLookupField } from "../addressLookUpField";

type StepId = 0 | 1 | 2 | 3;

const steps = [
    { id: 0 as StepId, title: "Type" },
    { id: 1 as StepId, title: "Schedule" },
    { id: 2 as StepId, title: "Order" },
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
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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
                                        }`}
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
    busy,
    isPaying
}: {
    canBack: boolean;
    canNext: boolean;
    isLast: boolean;
    onBack: () => void;
    onNext: () => void;
    busy?: boolean;
    isPaying: boolean;
}) {
    return (
        <div className="flex items-center justify-between gap-3 pt-2">
            <button
                type="button"
                onClick={onBack}
                disabled={!canBack || !!busy}
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

export function ReturnForm({
    onProceed,
    busy,
    error,
}: {
    onProceed: () => void;
    busy?: boolean;
    error?: string | null;
}) {
    const { state, setState, orderFlow, setServiceType, resetNonce } = useReturnCheckout();
    const [step, setStep] = useState<StepId>(0);

    const [collectionQuery, setCollectionQuery] = useState("");
    const [returnQuery, setReturnQuery] = useState("");
    const returnItems = orderFlow && orderFlow.catalog.return.items;

    useEffect(() => {
        setServiceType("return");
    }, [setServiceType]);

    useEffect(() => {
        setStep(0);
    }, [resetNonce]);

    const disableAuto = orderFlow?.settings?.scheduling?.disableAutoBlockSchedule;
    const timeSlots = orderFlow?.timeSlots ?? [];

    const inc = (id: string) => {
        if (!orderFlow) return;

        const item = orderFlow.catalog.return.itemsBySku?.[id];
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

    const itemsOk = totalItems > 0;
    const scheduleOk = !!state.collectionDate && !!state.timeSlotId;
    const orderOk = state.originalOrderNumber.trim().length > 0;
    const detailsOk =
        state.customerDetails.name.trim().length > 0 &&
        state.customerDetails.email.trim().length > 0 &&
        isValidGBPhone(state.customerDetails.phone ?? "") &&
        state.fromLocation.houseNumber.trim().length > 0 &&
        state.fromLocation.streetAddress.trim().length > 0 &&
        state.toLocation.houseNumber.trim().length > 0 &&
        state.toLocation.streetAddress.trim().length > 0;

    const canGoNext =
        (step === 0 && itemsOk) ||
        (step === 1 && scheduleOk) ||
        (step === 2 && orderOk) ||
        (step === 3 && detailsOk);

    const maxAllowedStep: StepId = useMemo(() => {
        if (!itemsOk) return 0;
        if (!scheduleOk) return 1;
        if (!orderOk) return 2;
        if (!detailsOk) return 3;
        return step;
    }, [itemsOk, scheduleOk, orderOk, detailsOk, step]);


    useEffect(() => {
        setState((s) => ({ ...s, enableButton: detailsOk }));
    }, [detailsOk, setState]);

    useEffect(() => {
        if (!orderFlow?.ok) return;
        if (orderFlow.settings.scheduling.disableAutoBlockSchedule) return;
        if (!state.collectionDate || !state.timeSlotId) return;

        const slotIsFull = isSlotFull({
            orderFlow,
            service: "return",
            dateISO: state.collectionDate,
            timeSlotId: state.timeSlotId,
        });

        if (slotIsFull) {
            setState((s) => ({ ...s, timeSlotId: "" }));
        }
    }, [orderFlow, state.collectionDate, state.timeSlotId, setState]);

    const goNext = () => setStep((s) => Math.min(LAST_STEP, s + 1) as StepId);
    const goBack = () => setStep((s) => Math.max(0, s - 1) as StepId);

    return (
        <form className="space-y-6">
            <div className="space-y-2">
                <Stepper
                    current={step}
                    maxAllowed={maxAllowedStep}
                    onGo={setStep}
                    allCompleted={itemsOk && scheduleOk && orderOk && detailsOk}
                />
                <div className="text-xs text-slate-600">
                    {step === 0 && "Choose your return type."}
                    {step === 1 && "Pick the preferred return date and time slot."}
                    {step === 2 && "Enter the original order number."}
                    {step === 3 && "Provide addresses and customer details."}
                </div>
            </div>

            {step === 0 && (
                <div>
                    <div className="flex items-end justify-between gap-4">
                        <p className="text-sm font-medium text-slate-700">Return Type</p>
                        <div className="text-xs text-slate-600">
                            Total:{" "}
                            <span className="font-medium text-slate-900">
                                {totalItems}
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        {returnItems.map((item: any) => {
                            const id = item.sku as string;
                            const count = state.quantities[id] ?? 0;
                            const price = item.price?.price ?? 0;

                            return (
                                <div
                                    key={item.id}
                                    className={`group rounded-2xl border p-4 transition-all duration-200
          ${count > 0
                                            ? "border-emerald-600 bg-emerald-50 shadow-sm"
                                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                                        }
        `}
                                >
                                    <div className="flex items-center justify-between gap-4">

                                        {/* LEFT: Item Info */}
                                        <div className="flex-1">
                                            <div className={`text-sm font-semibold ${count > 0 ? "text-emerald-700" : "text-slate-900"}`}>
                                                {item.name}
                                            </div>

                                            <div className="mt-1 text-xs text-slate-500 line-clamp-2">
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

                        {/* Validation */}
                        {!itemsOk && (
                            <div className="mt-2 text-xs text-rose-600">
                                Add at least 1 return type to continue.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {step === 1 && (
                <div className="space-y-4">
                    <div>
                        <span className="block text-sm font-medium text-slate-700 mb-1">Return Date</span>

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

                                while (businessDaysAdded < 3) {
                                    minDate.setDate(minDate.getDate() + 1);
                                    const dayOfWeek = minDate.getDay();
                                    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                                    if (!isWeekend) businessDaysAdded++;
                                }

                                const d = new Date(day);
                                d.setHours(0, 0, 0, 0);

                                if (d < minDate) return true;

                                const iso = toLocalISODate(d);

                                if (scheduling.blackoutDates.includes(iso)) return true;

                                const wk = weekdayKey(d).toUpperCase();

                                const weekdayRule = scheduling.weekdayRules.find(
                                    (r: any) => r.serviceType === "RETURN" && r.weekday === wk
                                );

                                if (weekdayRule && !weekdayRule.enabled) return true;

                                return isDayFull({
                                    orderFlow,
                                    service: "return",
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
                                        service: "return",
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
                                    setState((s) => ({
                                        ...s,
                                        timeSlotId: slot.id,
                                    }));
                                }

                                return (
                                    <div
                                        key={slot.id}
                                        className={`relative min-w-0 rounded-xl border p-3 text-center transition
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
                                        <div className="text-[11px] text-slate-500 whitespace-nowrap">{rangeLabel}</div>
                                    </div>
                                );
                            })}
                        </div>

                        {!scheduleOk && (
                            <div className="mt-2 text-xs text-rose-600">
                                Select a date and time slot to continue.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Original Order Number</label>
                    <input
                        value={state.originalOrderNumber}
                        onChange={(e) =>
                            setState((s) => ({
                                ...s,
                                originalOrderNumber: e.target.value,
                            }))
                        }
                        placeholder="Enter your order number"
                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                    />

                    {!orderOk && (
                        <div className="text-xs text-rose-600">Enter the order number to continue.</div>
                    )}
                </div>
            )}

            {step === 3 && (
                <div className="space-y-5">
                    <p className="text-sm font-medium text-slate-700">Collection Address</p>

                    <AddressLookupField
                        value={collectionQuery}
                        onValueChange={(val) => {
                            setCollectionQuery(val);
                            if (!val || val.trim() === "") {
                                setState((st) => ({
                                    ...st,
                                    fromLocation: {
                                        ...st.fromLocation,
                                        streetAddress: "",
                                        houseNumber: "",
                                        postalCode: "",
                                        lat: 0,
                                        lon: 0,
                                    },
                                }));
                            }
                        }}
                        onNoResults={() => {
                            // 🔥 invalidate when no suggestions found
                            setState((st) => ({
                                ...st,
                                fromLocation: {
                                    ...st.fromLocation,
                                    streetAddress: "",
                                    houseNumber: "",
                                    postalCode: "",
                                    lat: 0,
                                    lon: 0,
                                },
                            }));
                        }}
                        placeholder="Collection address/postcode"
                        onSelectAddress={(sug) => {
                            const a = sug.address ?? {};
                            const city = pickCity(a);
                            const street = streetFromNominatim(sug);

                            setState((st) => ({
                                ...st,
                                fromLocation: {
                                    ...st.fromLocation,
                                    streetAddress: sug.displayName ?? street,
                                    houseNumber: a.house_number ?? st.fromLocation.houseNumber,
                                    postalCode: a.postcode ?? st.fromLocation.postalCode,
                                    lat: sug.lat ? Number(sug.lat) : 0,
                                    lon: sug.lon ? Number(sug.lon) : 0,
                                },
                                customerDetails: {
                                    ...st.customerDetails,
                                    postalCode: a.postcode ?? st.customerDetails.postalCode,
                                    address: sug.displayName ?? st.customerDetails.address,
                                },
                            }));

                            setCollectionQuery(sug.displayName ?? street);
                        }}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <input
                            value={state.fromLocation.houseNumber}
                            onChange={(e) =>
                                setState((s) => ({
                                    ...s,
                                    fromLocation: {
                                        ...s.fromLocation,
                                        houseNumber: e.target.value,
                                    },
                                }))
                            }
                            type="text"
                            placeholder="House/Flat Number"
                            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                        />

                    </div>

                    <p className="text-sm font-medium text-slate-700">Return Delivery Address</p>

                    <AddressLookupField
                        value={returnQuery}
                        onValueChange={(val) => {
                            setReturnQuery(val);

                            if (!val.trim()) {
                                setState((st) => ({
                                    ...st,
                                    toLocation: {
                                        ...st.toLocation,
                                        streetAddress: "",
                                        houseNumber: "",
                                        postalCode: "",
                                        lat: 0,
                                        lon: 0,
                                    },
                                }));
                            }
                        }}
                        onNoResults={() => {

                            setState((st) => ({
                                ...st,
                                toLocation: {
                                    ...st.toLocation,
                                    lat: 0,
                                    lon: 0,
                                    streetAddress: "",
                                    houseNumber: "",
                                    postalCode: "",
                                },
                            }));
                        }}
                        placeholder="Return delivery address/postcode"
                        onSelectAddress={(sug) => {
                            const a = sug.address ?? {};
                            const street = streetFromNominatim(sug);

                            setState((st) => ({
                                ...st,
                                toLocation: {
                                    ...st.toLocation,
                                    streetAddress: sug.displayName ?? street,
                                    houseNumber: a.house_number ?? st.toLocation.houseNumber,
                                    postalCode: a.postcode ?? st.toLocation.postalCode,
                                    lat: sug.lat ? Number(sug.lat) : 0,
                                    lon: sug.lon ? Number(sug.lon) : 0,
                                },
                            }));

                            setReturnQuery(sug.displayName ?? street);
                        }}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <input
                            value={state.toLocation.houseNumber}
                            onChange={(e) =>
                                setState((s) => ({
                                    ...s,
                                    toLocation: {
                                        ...s.toLocation,
                                        houseNumber: e.target.value,
                                    },
                                }))
                            }
                            type="text"
                            placeholder="House/Flat Number"
                            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                        />
                    </div>

                    <p className="text-sm font-medium text-slate-700">Customer Details</p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <input
                            value={state.customerDetails.name}
                            onChange={(e) =>
                                setState((s) => ({
                                    ...s,
                                    customerDetails: {
                                        ...s.customerDetails,
                                        name: e.target.value,
                                    },
                                }))
                            }
                            placeholder="Full name"
                            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                        />

                        <input
                            value={state.customerDetails.email}
                            onChange={(e) =>
                                setState((s) => ({
                                    ...s,
                                    customerDetails: {
                                        ...s.customerDetails,
                                        email: e.target.value,
                                    },
                                }))
                            }
                            type="email"
                            placeholder="Email address"
                            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:ring-2 focus-within:ring-emerald-200">
                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 text-sm text-slate-700 border-r border-slate-200">
                                <span className="text-base leading-none">🇬🇧</span>
                                <span className="font-semibold">+44</span>
                            </div>

                            <input
                                inputMode="tel"
                                autoComplete="tel"
                                placeholder="7123 456789"
                                className="h-11 flex-1 px-3 text-sm text-slate-800 outline-none"
                                value={formatGBForDisplay(state.customerDetails.phone ?? "")}
                                onChange={(e) => {
                                    const stored = displayToStoredGB(e.target.value);
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

                        {normalizeGBPhone(state.customerDetails.phone ?? "").length >= 10 &&
                            !isValidGBPhone(state.customerDetails.phone ?? "") && (
                                <div className="text-xs text-rose-600">Enter a valid UK phone number.</div>
                            )}
                    </div>

                    {!detailsOk && (
                        <div className="text-xs text-rose-600">
                            Fill in the required customer details and both addresses to continue.
                        </div>
                    )}
                </div>
            )}

            <FooterNav
                canBack={step > 0}
                canNext={canGoNext && step <= maxAllowedStep}
                isLast={step === LAST_STEP}
                onBack={goBack}
                onNext={() => {
                    if (!canGoNext) return;
                    if (step === LAST_STEP) onProceed();
                    else goNext();
                }}
                isPaying={!!busy}
            />

            {error && <div className="text-red-500 mb-4">{error}</div>}
        </form>
    );
}