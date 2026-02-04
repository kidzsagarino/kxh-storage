"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useShreddingCheckout,
  type TimeSlotId,
} from "../components/checkout/CheckoutStore";
import { DatePicker } from "./DatePicker";
import { useAdminSettings } from "../admin/useAdminSettings";
import { isDayFull, isSlotFull } from "./scheduling/capacityLogic";

type StepId = 0 | 1 | 2;

const steps = [
  { id: 0 as StepId, title: "Items" },
  { id: 1 as StepId, title: "Schedule" },
  { id: 2 as StepId, title: "Details" },
];

const LAST_STEP: StepId = 2;

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
      moving: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: true },
      shredding: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false },
    },
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
                  ? "border-[#4CAF50] bg-[#4CAF50]/10"
                  : "border-slate-200 bg-white hover:border-slate-300"
                }
              ${!isEnabled ? "opacity-40 cursor-not-allowed hover:border-slate-200" : ""
                }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold transition
                  ${isActive && isCompleted
                      ? "border-[#4CAF50] bg-[#4CAF50] text-white ring-2 ring-[#4CAF50]/30"
                      : isActive
                        ? "border-[#4CAF50] bg-[#4CAF50]/10 text-[#2e7d32]"
                        : isCompleted
                          ? "border-[#4CAF50] bg-[#4CAF50] text-white"
                          : "border-slate-200 bg-white text-slate-700"
                    }`}
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

export function ShreddingForm() {
  const router = useRouter();
  const { state, setState } = useShreddingCheckout();

  const [step, setStep] = useState<StepId>(0);

  const admin = useAdminSettings(ADMIN_DEFAULT);

  const disableAuto = admin.scheduling.disableAutoBlockSchedule;
  const capacityEnabled = admin.scheduling.capacityEnabled;
  const caps = admin.scheduling.capacityPerService.storage;

  const totalQty = useMemo(() => {
    const bag = Number(state.items?.bagQty ?? 0);
    const box = Number(state.items?.boxQty ?? 0);
    return bag + box;
  }, [state.items?.bagQty, state.items?.boxQty]);

  // validation
  const itemsOk = totalQty > 0;
  const scheduleOk = !!state.collectionDate && !!state.timeSlot;

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
    if (maxAllowedStep < 2) return;
    router.push("/order-summary");
  }

  const goNext = () => setStep((s) => (Math.min(3, s + 1) as StepId));
  const goBack = () => setStep((s) => (Math.max(0, s - 1) as StepId));

  const setBagQty = (qty: number) =>
    setState((s) => ({ ...s, items: { ...s.items, bagQty: Math.max(0, qty) } }));

  const setBoxQty = (qty: number) =>
    setState((s) => ({ ...s, items: { ...s.items, boxQty: Math.max(0, qty) } }));

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
        <div className="space-y-3">
          <div className="flex items-end justify-between gap-4">
            <p className="text-sm font-medium text-slate-700">Items for Shredding</p>
            <div className="text-xs text-slate-600">
              Total items: <span className="font-medium text-slate-900">{totalQty}</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* BAG */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-slate-900">Bag</div>
                  <div className="mt-1 text-xs text-slate-600">Up to 15 lbs</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setBagQty((state.items?.bagQty ?? 0) - 1)}
                    disabled={(state.items?.bagQty ?? 0) === 0}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white
                    text-slate-800 hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Decrease Bag"
                  >
                    −
                  </button>

                  <div className="min-w-[28px] text-center text-sm font-medium text-slate-900">
                    {state.items?.bagQty ?? 0}
                  </div>

                  <button
                    type="button"
                    onClick={() => setBagQty((state.items?.bagQty ?? 0) + 1)}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                    aria-label="Increase Bag"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* ARCHIVE BOX */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-slate-900">Archive Box</div>
                  <div className="mt-1 text-xs text-slate-600">Up to 15 lbs</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setBoxQty((state.items?.boxQty ?? 0) - 1)}
                    disabled={(state.items?.boxQty ?? 0) === 0}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white
                    text-slate-800 hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Decrease Archive Box"
                  >
                    −
                  </button>

                  <div className="min-w-[28px] text-center text-sm font-medium text-slate-900">
                    {state.items?.boxQty ?? 0}
                  </div>

                  <button
                    type="button"
                    onClick={() => setBoxQty((state.items?.boxQty ?? 0) + 1)}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                    aria-label="Increase Archive Box"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {!itemsOk && (
            <div className="text-xs text-rose-600">Add at least 1 bag or archive box to continue.</div>
          )}
        </div>
      )}

      {/* Step 2: Schedule */}
      {step === 1 && (
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
                if (!admin.scheduling.weekdaysByService.shredding[wk]) return true;

                // disable full days by volume
                const iso = toLocalISODate(d);
                return isDayFull({
                  enabled: capacityEnabled,
                  caps,
                  service: "shredding",
                  dateISO: iso,
                });
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Time Slot</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "morning", label: "Morning", desc: "7am – 10am" },
                { id: "afternoon", label: "Afternoon", desc: "10am – 3pm" },
                { id: "evening", label: "Evening", desc: "3pm – 6pm" },
              ].map((slot) => {
                const dateISO = state.collectionDate;

                const slotIsFull =
                  !disableAuto &&
                  !!dateISO &&
                  isSlotFull({
                    enabled: capacityEnabled,
                    caps,
                    service: "shredding",
                    dateISO,
                    slot: slot.id as Exclude<TimeSlotId, "">,
                  });

                return (
                  <label
                    key={slot.id}
                    className={`rounded-xl border p-3 text-center transition
                                ${slotIsFull ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
                                ${state.timeSlot === slot.id ? "border-[#4CAF50] bg-[#4CAF50]/10" : "border-slate-200 hover:border-slate-300"}
                            `}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      name="timeSlot"
                      value={slot.id}
                      disabled={slotIsFull}
                      checked={state.timeSlot === (slot.id as TimeSlotId)}
                      onChange={() =>
                        setState((s) => ({ ...s, timeSlot: slot.id as TimeSlotId }))
                      }
                    />
                    <div className="text-sm font-medium text-slate-900">
                      {slot.label} {slotIsFull ? "(Full)" : ""}
                    </div>
                    <div className="text-xs text-slate-600">{slot.desc}</div>
                  </label>
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
