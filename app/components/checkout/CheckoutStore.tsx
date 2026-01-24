"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type StorageItemId =
  | "small-box"
  | "medium-box"
  | "large-box"
  | "xl-box"
  | "suitcase"
  | "half-container"
  | "full-container";

export type TimeSlotId = "morning" | "afternoon" | "evening" | "";

export type CheckoutState = {
  durationMonth: number;
  quantities: Record<StorageItemId, number>;
  collectionDate: string; // YYYY-MM-DD
  timeSlot: TimeSlotId;

  postalCode: string;
  streetAddress: string;
  phoneNumber: string;
  enableButton: boolean;
};

const emptyState: CheckoutState = {
  durationMonth: 0,
  quantities: {
    "small-box": 0,
    "medium-box": 0,
    "large-box": 0,
    "xl-box": 0,
    "suitcase": 0,
    "half-container": 0,
    "full-container": 0,
  },
  collectionDate: "",
  timeSlot: "",
  postalCode: "",
  streetAddress: "",
  phoneNumber: "",
  enableButton: false,
};

type CheckoutContextValue = {
  state: CheckoutState;
  setState: React.Dispatch<React.SetStateAction<CheckoutState>>;
  reset: () => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CheckoutState>(emptyState);

  const value = useMemo(
    () => ({
      state,
      setState,
      reset: () => setState(emptyState),
    }),
    [state]
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}
