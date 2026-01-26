"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type ServiceType = "storage" | "moving";

export type StorageItemId =
  | "small-box"
  | "medium-box"
  | "large-box"
  | "xl-box"
  | "suitcase"
  | "half-container"
  | "full-container";

export type MovingItemId =
  | "1-bedroom-flat"
  | "2-bedroom-flat"
  | "3-bedroom-flat"
  | "4-bedroom-flat";

export type MovingPackageId = "basic-package" | "move-and-pack";

export type TimeSlotId = "morning" | "afternoon" | "evening" | "";

export type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
};

export type LocationDetails = {
  address: string;
  houseNumber: string;
};

// --------------------
// Service payloads
// --------------------
export type StoragePayload = {
  durationMonth: 0 | 3 | 6 | 12;
  quantities: Record<StorageItemId, number>;
};

export type MovingPayload = {
  movingItemId: MovingItemId | "";
  movingPackageId: MovingPackageId | "";
  fromLocation: LocationDetails;
  toLocation: LocationDetails;
};

// --------------------
// Common + Union
// --------------------
export type CommonCheckout = {
  serviceType: ServiceType;
  collectionDate: string; // YYYY-MM-DD
  timeSlot: TimeSlotId;
  customerDetails: CustomerDetails;
  enableButton: boolean;
};

export type CheckoutState =
  | (CommonCheckout & { serviceType: "storage"; storage: StoragePayload })
  | (CommonCheckout & { serviceType: "moving"; moving: MovingPayload });

const emptyCommon: Omit<CommonCheckout, "serviceType"> = {
  collectionDate: "",
  timeSlot: "",
  customerDetails: {
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
  },
  enableButton: false,
};

const emptyStorageState: CheckoutState = {
  serviceType: "storage",
  ...emptyCommon,
  storage: {
    durationMonth: 0,
    quantities: {
      "small-box": 0,
      "medium-box": 0,
      "large-box": 0,
      "xl-box": 0,
      suitcase: 0,
      "half-container": 0,
      "full-container": 0,
    },
  },
};

const emptyMovingState: CheckoutState = {
  serviceType: "moving",
  ...emptyCommon,
  moving: {
    movingItemId: "",
    movingPackageId: "",
    fromLocation: { address: "", houseNumber: "" },
    toLocation: { address: "", houseNumber: "" },
  },
};

type CheckoutContextValue = {
  state: CheckoutState;
  setState: React.Dispatch<React.SetStateAction<CheckoutState>>;
  reset: () => void;
  setServiceType: (t: ServiceType) => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CheckoutState>(emptyStorageState);

  const value = useMemo(
    () => ({
      state,
      setState,
      reset: () => setState(emptyStorageState),
      setServiceType: (t: ServiceType) =>
        setState((prev) => {
          // keep common fields when switching (optional but nice UX)
          const common = {
            collectionDate: prev.collectionDate,
            timeSlot: prev.timeSlot,
            customerDetails: prev.customerDetails,
            enableButton: prev.enableButton,
          };

          return t === "storage"
            ? { ...emptyStorageState, ...common }
            : { ...emptyMovingState, ...common };
        }),
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

// Strong typed helpers
export function useStorageCheckout() {
  const { state, setState, ...rest } = useCheckout();
  if (state.serviceType !== "storage") throw new Error("Storage hook used in non-storage state");

  const setStorage = (updater: (s: StoragePayload) => StoragePayload) => {
    setState((prev) => {
      if (prev.serviceType !== "storage") return prev;
      return { ...prev, storage: updater(prev.storage) };
    });
  };

  return { ...rest, state, setState, setStorage };
}

export function useMovingCheckout() {
  const { state, setState, ...rest } = useCheckout();
  if (state.serviceType !== "moving") throw new Error("Moving hook used in non-moving state");

  const setMoving = (updater: (m: MovingPayload) => MovingPayload) => {
    setState((prev) => {
      if (prev.serviceType !== "moving") return prev;
      return { ...prev, moving: updater(prev.moving) };
    });
  };

  return { ...rest, state, setState, setMoving };
}
