"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type ServiceType = "storage" | "moving" | "shredding";

export type StorageItemId =
  | "small-box"
  | "medium-box"
  | "large-box"
  | "xl-box"
  | "suitcase"
  | "half-container"
  | "full-container";

export type MovingItemId =
  | "small-move"
  | "1-bedroom-flat"
  | "2-bedroom-flat"
  | "3-bedroom-flat"
  | "4-bedroom-flat"
  | "office-move";

export type ShreddingItemId = "bag" | "archive-box";

export type MovingPackageId = "basic-package" | "move-and-pack";

export type TimeSlotId = "morning" | "afternoon" | "evening" | "";

export type ShreddingItems = {
  bagQty: number;
  boxQty: number;
};

export type CustomerDetails = {
  houseNumber?: string;
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

export type StorageState = {
  durationMonth: 0 | 1 | 3 | 6 | 12;
  quantities: Record<StorageItemId, number>;
  collectionDate: string; // YYYY-MM-DD
  timeSlot: TimeSlotId;
  customerDetails: CustomerDetails;
  enableButton: boolean;
};

export type MovingState = {
  movingItemId: MovingItemId | "";
  movingPackageId: MovingPackageId | "";
  collectionDate: string; // YYYY-MM-DD
  timeSlot: TimeSlotId;
  fromLocation: LocationDetails;
  toLocation: LocationDetails;
  customerDetails: CustomerDetails;
  enableButton: boolean;
  distanceMiles?: number;
  packingAssistance?: "yes" | "no";
};

export type CheckoutState = {
  serviceType: ServiceType;
  storage: StorageState;
  moving: MovingState;
  shredding: ShreddingState;
};

/** Helpers */
const emptyCustomer: CustomerDetails = {
  name: "",
  email: "",
  phone: "",
  address: "",
  postalCode: "",
};

const emptyStorage: StorageState = {
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
  collectionDate: "",
  timeSlot: "",
  customerDetails: { ...emptyCustomer },
  enableButton: false,
};

const emptyMoving: MovingState = {
  movingItemId: "",
  movingPackageId: "",
  collectionDate: "",
  timeSlot: "",
  fromLocation: { address: "", houseNumber: "" },
  toLocation: { address: "", houseNumber: "" },
  customerDetails: { ...emptyCustomer },
  enableButton: false,
  distanceMiles: 1
};

const emptyShredding: ShreddingState = {
  items: { bagQty: 0, boxQty: 0 },
  collectionDate: "",
  timeSlot: "",
  customerDetails: { ...emptyCustomer },
  enableButton: false,
};


export type ShreddingState = {
  items: ShreddingItems;
  collectionDate: string;
  timeSlot: TimeSlotId;
  customerDetails: CustomerDetails;
  enableButton: boolean;
};

type CheckoutContextValue = {
  state: CheckoutState;
  setState: React.Dispatch<React.SetStateAction<CheckoutState>>;

  // Slice setters (recommended)
  setServiceType: (t: ServiceType) => void;

  setStorage: React.Dispatch<React.SetStateAction<StorageState>>;
  resetStorage: () => void;

  setMoving: React.Dispatch<React.SetStateAction<MovingState>>;
  resetMoving: () => void;
  setShredding: React.Dispatch<React.SetStateAction<ShreddingState>>;
  resetShredding: () => void;

  resetAll: () => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CheckoutState>({
    serviceType: "storage",
    storage: emptyStorage,
    moving: emptyMoving,
    shredding: emptyShredding,
  });

  const value = useMemo<CheckoutContextValue>(() => {
    const setServiceType = (t: ServiceType) =>
      setState((s) => ({ ...s, serviceType: t }));

    const setStorage: React.Dispatch<React.SetStateAction<StorageState>> = (updater) =>
      setState((s) => ({
        ...s,
        storage: typeof updater === "function" ? (updater as any)(s.storage) : updater,
      }));

    const setMoving: React.Dispatch<React.SetStateAction<MovingState>> = (updater) =>
      setState((s) => ({
        ...s,
        moving: typeof updater === "function" ? (updater as any)(s.moving) : updater,
      }));
    const setShredding: React.Dispatch<React.SetStateAction<ShreddingState>> = (updater) =>
      setState((s) => ({
        ...s,
        shredding: typeof updater === "function" ? (updater as any)(s.shredding) : updater,
      }));

    return {
      state,
      setState,
      setServiceType,

      setStorage,
      resetStorage: () => setState((s) => ({ ...s, storage: emptyStorage })),

      setMoving,
      resetMoving: () => setState((s) => ({ ...s, moving: emptyMoving })),
      setShredding,
      resetShredding: () => setState((s) => ({ ...s, shredding: emptyShredding })),

      resetAll: () =>
        setState({
          serviceType: "storage",
          storage: emptyStorage,
          moving: emptyMoving,
          shredding: emptyShredding,
        }),
    };
  }, [state]);

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}

/** ✅ No more throwing. Always available, independent slices. */
export function useStorageCheckout() {
  const { state, setStorage, setServiceType, resetStorage } = useCheckout();
  return {
    state: state.storage,
    setState: setStorage,
    setServiceType,
    reset: resetStorage,
  };
}

export function useMovingCheckout() {
  const { state, setMoving, setServiceType, resetMoving } = useCheckout();
  return {
    state: state.moving,
    setState: setMoving,
    setServiceType,
    reset: resetMoving,
  };
}

export function useShreddingCheckout() {
  const { state, setShredding, setServiceType, resetShredding } = useCheckout();
  return { state: state.shredding, setState: setShredding, setServiceType, reset: resetShredding };
}
