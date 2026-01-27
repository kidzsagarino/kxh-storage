"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  type MovingItemId,
  type MovingPackageId,
  type TimeSlotId,
  useCheckout,
  useMovingCheckout,
} from "./checkout/CheckoutStore";
import { DatePicker } from "./DatePicker";

const movingItems: { id: MovingItemId; name: string; desc: string }[] = [
  { id: "1-bedroom-flat", name: "1 Bedroom Flat", desc: "A small one-bedroom flat" },
  { id: "2-bedroom-flat", name: "2 Bedroom Flat", desc: "A medium two-bedroom flat" },
  { id: "3-bedroom-flat", name: "3 Bedroom Flat", desc: "A large three-bedroom flat" },
  { id: "4-bedroom-flat", name: "4 Bedroom Flat", desc: "A very large four-bedroom flat" },
];

const movingPackages: { id: MovingPackageId; name: string; desc: string }[] = [
  { id: "basic-package", name: "Basic Package", desc: "You provide the packing materials" },
  { id: "move-and-pack", name: "Move and Pack", desc: "We pack for you and provide all materials" },
];

type StepId = 0 | 1 | 2 | 3 | 4 | 5;

const steps = [
  { id: 0 as StepId, title: "Origin" },
  { id: 1 as StepId, title: "Destination" },
  { id: 2 as StepId, title: "Items" },
  { id: 3 as StepId, title: "Package" },
  { id: 4 as StepId, title: "Schedule" },
  { id: 5 as StepId, title: "Details" },
];

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
                ${isActive ? "border-[#4CAF50] bg-[#4CAF50]/10" : "border-slate-200 bg-white hover:border-slate-300"}
                ${!isEnabled ? "opacity-40 cursor-not-allowed hover:border-slate-200" : ""}`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold transition
                    ${
                      isActive && isCompleted
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

export function MovingForm() {
  const router = useRouter();
  const { state, setState } = useMovingCheckout();

  const [step, setStep] = useState<StepId>(0);

  const originOk = state.fromLocation.address.trim().length > 0 && state.fromLocation.houseNumber.trim().length > 0;

  const destinationOk = state.toLocation.address.trim().length > 0 && state.toLocation.houseNumber.trim().length > 0;

  const itemOk = state.movingItemId !== "";
  const packageOk = state.movingPackageId !== "";
  const scheduleOk = !!state.collectionDate && !!state.timeSlot;

  const detailsOk =
    state.customerDetails.name.trim().length > 0 &&
    state.customerDetails.email.trim().length > 0 &&
    state.customerDetails.phone.trim().length > 0 &&
    state.customerDetails.postalCode.trim().length > 0 &&
    state.customerDetails.address.trim().length > 0;

  const canGoNext =
    (step === 0 && originOk) ||
    (step === 1 && destinationOk) ||
    (step === 2 && itemOk) ||
    (step === 3 && packageOk) ||
    (step === 4 && scheduleOk) ||
    (step === 5 && detailsOk);

  const maxAllowedStep: StepId = useMemo(() => {
    if (!originOk) return 0;
    if (!destinationOk) return 1;
    if (!itemOk) return 2;
    if (!packageOk) return 3;
    if (!scheduleOk) return 4;
    if (!detailsOk) return 5;
    return 5;
  }, [originOk, destinationOk, itemOk, packageOk, scheduleOk, detailsOk]);

  useEffect(() => {
    setState((s) => ({ ...s, enableButton: detailsOk }));
  }, [detailsOk, setState]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!originOk || !destinationOk || !itemOk || !packageOk || !scheduleOk || !detailsOk) return;
    router.push("/order-summary");
  }

  const goNext = () => setStep((s) => (Math.min(5, s + 1) as StepId));
  const goBack = () => setStep((s) => (Math.max(0, s - 1) as StepId));

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-6 shadow-sm space-y-6">
      <div className="space-y-2">
        <Stepper
          current={step}
          maxAllowed={maxAllowedStep}
          onGo={setStep}
          allCompleted={originOk && destinationOk && itemOk && packageOk && scheduleOk && detailsOk}
        />
        <div className="text-xs text-slate-600">
          {step === 0 && "Enter where we are collecting from."}
          {step === 1 && "Enter where we are delivering to."}
          {step === 2 && "Select the size of your move."}
          {step === 3 && "Choose a package."}
          {step === 4 && "Pick a date and a time slot."}
          {step === 5 && "Enter your contact details."}
        </div>
      </div>

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
            value={state.fromLocation.address}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                fromLocation: { ...s.fromLocation, address: e.target.value },
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
            value={state.toLocation.address}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                toLocation: { ...s.toLocation, address: e.target.value },
              }))
            }
            placeholder="To Address"
            className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
          />
          {!destinationOk && <div className="sm:col-span-2 text-xs text-rose-600">Enter house number and address.</div>}
        </div>
      )}

      {/* Step 2: Items */}
      {step === 2 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {movingItems.map((it) => (
            <label
              key={it.id}
              className={`cursor-pointer rounded-xl border p-4 transition ${
                state.movingItemId === it.id
                  ? "border-[#4CAF50] bg-[#4CAF50]/10"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                className="sr-only"
                type="radio"
                name="movingItemId"
                value={it.id}
                checked={state.movingItemId === it.id}
                onChange={() => setState((s) => ({ ...s, movingItemId: it.id }))}
              />
              <div className="text-sm font-medium text-slate-900">{it.name}</div>
              <div className="text-xs text-slate-600">{it.desc}</div>
            </label>
          ))}
          {!itemOk && <div className="sm:col-span-2 text-xs text-rose-600">Select a move size.</div>}
        </div>
      )}

      {/* Step 3: Package */}
      {step === 3 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {movingPackages.map((pk) => (
            <label
              key={pk.id}
              className={`cursor-pointer rounded-xl border p-4 transition ${
                state.movingPackageId === pk.id
                  ? "border-[#4CAF50] bg-[#4CAF50]/10"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                className="sr-only"
                type="radio"
                name="movingPackageId"
                value={pk.id}
                checked={state.movingPackageId === pk.id}
                onChange={() => setState((s) => ({ ...s, movingPackageId: pk.id }))}
              />
              <div className="text-sm font-medium text-slate-900">{pk.name}</div>
              <div className="text-xs text-slate-600">{pk.desc}</div>
            </label>
          ))}
          {!packageOk && <div className="sm:col-span-2 text-xs text-rose-600">Select a package.</div>}
        </div>
      )}

      {/* Step 4: Schedule */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <span className="block text-sm font-medium text-slate-700 mb-1">Collection Date</span>
            <DatePicker
              value={state.collectionDate}
              onChange={(val) => setState((s) => ({ ...s, collectionDate: val }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Time Slot</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "morning", label: "Morning", desc: "7am – 10am" },
                { id: "afternoon", label: "Afternoon", desc: "10am – 3pm" },
                { id: "evening", label: "Evening", desc: "3pm – 6pm" },
              ].map((slot) => (
                <label
                  key={slot.id}
                  className={`cursor-pointer rounded-xl border p-3 text-center transition
                    ${
                      state.timeSlot === slot.id
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

            {!scheduleOk && <div className="mt-2 text-xs text-rose-600">Select a date and time slot.</div>}
          </div>
        </div>
      )}

      {/* Step 5: Details */}
      {step === 5 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-700">Customer Details</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={state.customerDetails.name}
              onChange={(e) =>
                setState((s) => ({ ...s, customerDetails: { ...s.customerDetails, name: e.target.value } }))
              }
              placeholder="Full Name"
              className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
            />
            <input
              value={state.customerDetails.email}
              onChange={(e) =>
                setState((s) => ({ ...s, customerDetails: { ...s.customerDetails, email: e.target.value } }))
              }
              placeholder="Email"
              className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={state.customerDetails.phone}
              onChange={(e) =>
                setState((s) => ({ ...s, customerDetails: { ...s.customerDetails, phone: e.target.value } }))
              }
              placeholder="Phone"
              className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
            />
            <input
              value={state.customerDetails.postalCode}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  customerDetails: { ...s.customerDetails, postalCode: e.target.value },
                }))
              }
              placeholder="Postal Code"
              className="h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
            />
          </div>

          <input
            value={state.customerDetails.address}
            onChange={(e) =>
              setState((s) => ({ ...s, customerDetails: { ...s.customerDetails, address: e.target.value } }))
            }
            placeholder="Address"
            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
          />

          {!detailsOk && <div className="text-xs text-rose-600">Fill in all details to continue.</div>}
        </div>
      )}

      <FooterNav
        canBack={step > 0}
        canNext={canGoNext && step <= maxAllowedStep}
        isLast={step === 5}
        onBack={() => setStep((s) => (Math.max(0, s - 1) as StepId))}
        onNext={() => {
          if (!canGoNext) return;
          goNext();
        }}
      />
    </form>
  );
}
