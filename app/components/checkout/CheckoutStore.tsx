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

export type CheckoutState = {
  serviceType: ServiceType;

  // shared fields
  collectionDate: string; // YYYY-MM-DD
  timeSlot: TimeSlotId;
  customerDetails: CustomerDetails;
  enableButton: boolean;

  // storage payload
  storage: {
    durationMonth: 0 | 3 | 6 | 12;
    quantities: Record<StorageItemId, number>;
  };

  // moving payload
  moving: {
    movingItemId: MovingItemId | "";
    movingPackageId: MovingPackageId | "";
    fromLocation: LocationDetails;
    toLocation: LocationDetails;
  };
};

const EMPTY: CheckoutState = {
  serviceType: "storage",
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

  // helpers (optional but nice)
  setStorage: (updater: (s: CheckoutState["storage"]) => CheckoutState["storage"]) => void;
  setMoving: (updater: (m: CheckoutState["moving"]) => CheckoutState["moving"]) => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CheckoutState>(EMPTY);

  const value = useMemo<CheckoutContextValue>(() => {
    return {
      state,
      setState,
      reset: () => setState(EMPTY),

      // ✅ THIS MUST ACTUALLY UPDATE serviceType
      setServiceType: (t) => setState((s) => ({ ...s, serviceType: t })),

      setStorage: (updater) =>
        setState((s) => ({
          ...s,
          serviceType: "storage",
          storage: updater(s.storage),
        })),

      setMoving: (updater) =>
        setState((s) => ({
          ...s,
          serviceType: "moving",
          moving: updater(s.moving),
        })),
    };
  }, [state]);

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}

// Optional “scoped” hooks that DO NOT THROW
export function useStorageCheckout() {
  const ctx = useCheckout();
  return { ...ctx, storage: ctx.state.storage };
}

export function useMovingCheckout() {
  const ctx = useCheckout();
  return { ...ctx, moving: ctx.state.moving };
}
