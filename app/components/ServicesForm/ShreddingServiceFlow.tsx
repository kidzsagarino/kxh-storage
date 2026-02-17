"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  type TimeSlotId,
  useShreddingCheckout,
} from "../checkout/CheckoutStore";
import { DatePicker } from "../DatePicker";
import { isDayFull, isSlotFull } from "../scheduling/capacityLogic";
import { to12Hour, toLocalISODate, weekdayKey } from "@/app/utils/utils";

type StepId = 0 | 1 | 2;

const steps = [
  { id: 0 as StepId, title: "Items" },
  { id: 1 as StepId, title: "Schedule" },
  { id: 2 as StepId, title: "Details" },
];

const LAST_STEP: StepId = 2;


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
              ${isActive ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"}
              ${!isEnabled ? "opacity-40 cursor-not-allowed hover:border-slate-200" : ""
                }`}
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

export function ShreddingForm({
  onProceed,
  busy,
  error
}: {
  onProceed: () => void;
  busy?: boolean;
  error?: string | null;
}) {
  const router = useRouter();
  const { state, setState, orderFlow } = useShreddingCheckout();

  const [step, setStep] = useState<StepId>(0);
  const timeSlots = orderFlow && orderFlow.timeSlots;
  const disableAuto = orderFlow && orderFlow.settings.scheduling.disableAutoBlockSchedule;
  const [orderId, setOrderId] = useState<string | null>(null);
  const shreddingItems = orderFlow?.catalog?.shredding.items ?? [];
  const totalItems = useMemo(
          () =>
              Object.values(state.quantities).reduce(
                  (acc, val) => acc + (Number(val) || 0),
                  0
              ),
          [state.quantities]
      );
  // validation
  const itemsOk = totalItems > 0;
  const scheduleOk = !!state.collectionDate && !!state.timeSlotId;

  const detailsOk =
    (state.customerDetails.postalCode ?? "").trim().length > 0 &&
    (state.customerDetails.phone ?? "").trim().length > 0 &&
    (state.customerDetails.address ?? "").trim().length > 0;

  const canGoNext =
    (step === 0 && itemsOk) ||
    (step === 1 && scheduleOk) ||
    (step === 2 && detailsOk);

  const maxAllowedStep: StepId = useMemo(() => {
    if (!itemsOk) return 0;
    if (!scheduleOk) return 1;
    if (!detailsOk) return 2;
    return step;
  }, [itemsOk, scheduleOk, detailsOk, step]);

  useEffect(() => {
    setState((s) => ({ ...s, enableButton: step === 2 && itemsOk && scheduleOk && detailsOk }));
  }, [detailsOk, itemsOk, scheduleOk, step, setState]);

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


  const goNext = () => setStep((s) => (Math.min(3, s + 1) as StepId));
  const goBack = () => setStep((s) => (Math.max(0, s - 1) as StepId));

  const inc = (id: string) => {
        if (!orderFlow) return;
        
        const item = orderFlow.catalog.shredding.itemsBySku?.[id];

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

  return (
    <form
      className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-6 shadow-sm space-y-6"
    >
      {/* Stepper */}
      <div className="space-y-2">
        <Stepper
          current={step}
          maxAllowed={maxAllowedStep}
          onGo={setStep}
          allCompleted={itemsOk && scheduleOk && detailsOk}
        />
        <div className="text-xs text-slate-600">
          {step === 0 && "Choose what you want to shred and quantities."}
          {step === 1 && "Pick a collection date and time slot."}
          {step === 2 && "Enter your address and contact details."}
          {/* {step === 3 && "Review your shredding order before payment."} */}
        </div>
      </div>

      {/* Step 1: Items */}
      {step === 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {shreddingItems.map((item: any) => {
            const id = item.sku as string;
            const count = state.quantities[id] ?? 0;
            const price = item.price?.price ?? 0;

            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{item.name}</div>
                    <div className="mt-1 text-xs text-slate-600">{item.desc}</div>
                    <div className="mt-1 text-xs text-slate-600">{price}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => dec(item.sku)}
                      disabled={count === 0}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white
                                                text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label={`Decrease ${item.name}`}
                    >
                      −
                    </button>

                    <div className="min-w-[28px] text-center text-sm font-medium text-slate-900">
                      {count}
                    </div>

                    <button
                      type="button"
                      onClick={() => inc(item.sku)}
                      disabled={
                        false
                      }
                      className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white 
                                                    text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label={`Increase ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {!itemsOk && <div className="sm:col-span-2 text-xs text-rose-600">Add atleast 1 item to continue</div>}
        </div>
      )}

      {/* Step 2: Schedule */}
      {step === 1 && (
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
            {/* <input
              value={state.customerDetails.address}
              onChange={(e) =>
                setState((s) => ({ ...s, notes: e.target.value }))
              }
              placeholder="Additional Address Details"
              className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
            /> */}
            {!scheduleOk && <div className="mt-2 text-xs text-rose-600">Select a date and time slot.</div>}
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-700">Customer Details</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={state.customerDetails.postalCode}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  customerDetails: { ...s.customerDetails, postalCode: e.target.value },
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
                  customerDetails: { ...s.customerDetails, phone: e.target.value },
                }))
              }
              type="tel"
              placeholder="Phone Number"
              className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
            />
          </div>

          <input
            value={state.customerDetails.address}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                customerDetails: { ...s.customerDetails, address: e.target.value },
              }))
            }
            type="text"
            placeholder="Street Address"
            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
          />

          {!detailsOk && (
            <div className="text-xs text-rose-600">
              Fill in postal code, phone number, and street address to continue.
            </div>
          )}
        </div>
      )}

      {/* Step 4: Review */}
      {/* {step === 3 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">Review</p>

          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Bag (up to 15 lbs)</span>
              <span className="font-medium text-slate-900">{state.items?.bagQty ?? 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Archive Box (up to 15 lbs)</span>
              <span className="font-medium text-slate-900">{state.items?.boxQty ?? 0}</span>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Collection</span>
              <span className="font-medium text-slate-900">
                {state.collectionDate || "—"} · {state.timeSlot || "—"}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4 text-sm">
              <span className="text-slate-600">Address</span>
              <span className="text-right font-medium text-slate-900">
                {state.customerDetails.address || "—"}
                <br />
                {state.customerDetails.postalCode || ""}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Phone</span>
              <span className="font-medium text-slate-900">{state.customerDetails.phone || "—"}</span>
            </div>
          </div>

          {!(itemsOk && scheduleOk && detailsOk) && (
            <div className="text-xs text-rose-600">
              Please complete all steps before proceeding to payment.
            </div>
          )}
        </div>
      )} */}

      {/* Footer navigation */}
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
