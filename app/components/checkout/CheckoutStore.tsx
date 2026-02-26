"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type ServiceType = "storage" | "moving" | "shredding";
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

export type CustomerDetails = {
  houseNumber: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
};

export type LocationDetails = {
  streetAddress: string;
  houseNumber: string;
  postalCode: string;
  lat: number;
  lon: number;
};

export type StorageState = {
  durationMonth: 0 | 1 | 3 | 6 | 12;
  quantities: Record<string, number>;
  collectionDate: string;
  timeSlotId: string;
  customerDetails: CustomerDetails;
  enableButton: boolean;
  discountId: string | null;
  address: LocationDetails;
};

export type MovingState = {
  movingItemId: MovingItemId | "";
  movingPackageId: MovingPackageId | "";
  collectionDate: string;
  timeSlotId: string;
  fromLocation: LocationDetails;
  toLocation: LocationDetails;
  customerDetails: CustomerDetails;
  enableButton: boolean;
  distanceMiles?: number;
  packingAssistance?: "yes" | "no";
  notes: string;
};

export type ShreddingState = {
  quantities: Record<string, number>;
  collectionDate: string;
  timeSlotId: string;
  customerDetails: CustomerDetails;
  enableButton: boolean;
  address: LocationDetails;
};

export type OrderFlowData = any;

export type CheckoutSettings = {
  disableAutoBlockSchedule: boolean;
};

export type CheckoutState = {
  serviceType: ServiceType;
  storage: StorageState;
  moving: MovingState;
  shredding: ShreddingState;
  settings: CheckoutSettings;
  orderFlow: OrderFlowData | null;
  enableProceedButton: boolean;
  resetNonce: number;
};

/** ✅ FACTORIES (fresh objects every time) */
const makeEmptyCustomer = (): CustomerDetails => ({
  houseNumber: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  postalCode: "",
});

const makeEmptyAddress = (): LocationDetails => ({
  streetAddress: "",
  houseNumber: "",
  postalCode: "",
  lat: 0,
  lon: 0
});

const makeEmptyStorage = (): StorageState => ({
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
  timeSlotId: "",
  customerDetails: makeEmptyCustomer(),
  enableButton: false,
  discountId: "",
  address: makeEmptyAddress(),
});

const makeEmptyMoving = (): MovingState => ({
  movingItemId: "",
  movingPackageId: "",
  collectionDate: "",
  timeSlotId: "",
  fromLocation: makeEmptyAddress(),
  toLocation: makeEmptyAddress(),
  customerDetails: makeEmptyCustomer(),
  enableButton: false,
  distanceMiles: 0,
  notes: "",
});

const makeEmptyShredding = (): ShreddingState => ({
  quantities: {
    "archive-box": 0,
    bag: 0,
  },
  collectionDate: "",
  timeSlotId: "",
  customerDetails: makeEmptyCustomer(),
  enableButton: false,
  address: makeEmptyAddress(),
});

const defaultSettings: CheckoutSettings = { disableAutoBlockSchedule: false };

const makeInitialState = (initialOrderFlow?: any | null): CheckoutState => ({
  serviceType: "storage",
  storage: makeEmptyStorage(),
  moving: makeEmptyMoving(),
  shredding: makeEmptyShredding(),
  settings: defaultSettings,
  orderFlow: initialOrderFlow ?? null,
  enableProceedButton: false,
  resetNonce: 0,
});

type CheckoutContextValue = {
  state: CheckoutState;
  setState: React.Dispatch<React.SetStateAction<CheckoutState>>;

  setServiceType: (t: ServiceType) => void;

  setStorage: React.Dispatch<React.SetStateAction<StorageState>>;
  resetStorage: () => void;

  setMoving: React.Dispatch<React.SetStateAction<MovingState>>;
  resetMoving: () => void;

  setShredding: React.Dispatch<React.SetStateAction<ShreddingState>>;
  resetShredding: () => void;

  setSettings: React.Dispatch<React.SetStateAction<CheckoutSettings>>;
  setOrderFlow: (data: OrderFlowData) => void;

  resetAll: () => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({
  children,
  initialOrderFlow,
}: {
  children: React.ReactNode;
  initialOrderFlow?: any | null;
}) {
  const [state, setState] = useState<CheckoutState>(() =>
    makeInitialState(initialOrderFlow)
  );

  const value = useMemo<CheckoutContextValue>(() => {
    const setServiceType = (t: ServiceType) =>
      setState((s) => ({ ...s, serviceType: t }));

    const setOrderFlow = (data: OrderFlowData) =>
      setState((s) => ({ ...s, orderFlow: data }));

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

    const setSettings: React.Dispatch<React.SetStateAction<CheckoutSettings>> = (updater) =>
      setState((s) => ({
        ...s,
        settings: typeof updater === "function" ? (updater as any)(s.settings) : updater,
      }));

    return {
      state,
      setState,
      setServiceType,
      setOrderFlow,

      setStorage,
      resetStorage: () => setState((s) => ({ ...s, storage: makeEmptyStorage() })),

      setMoving,
      resetMoving: () => setState((s) => ({ ...s, moving: makeEmptyMoving() })),

      setShredding,
      resetShredding: () => setState((s) => ({ ...s, shredding: makeEmptyShredding() })),

      setSettings,

      resetAll: () =>
        setState((prev) => ({
          serviceType: "storage",
          storage: makeEmptyStorage(),
          moving: makeEmptyMoving(),
          shredding: makeEmptyShredding(),
          settings: defaultSettings,
          orderFlow: prev.orderFlow, // keep server-loaded data
          enableProceedButton: false,
          resetNonce: prev.resetNonce + 1,
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

export function useStorageCheckout() {
  const { state, setStorage, setServiceType, resetStorage } = useCheckout();
  return {
    state: state.storage,
    setState: setStorage,
    setServiceType,
    reset: resetStorage,
    orderFlow: state.orderFlow,
    resetNonce: state.resetNonce,
  };
}

export function useMovingCheckout() {
  const { state, setMoving, setServiceType, resetMoving } = useCheckout();
  return {
    state: state.moving,
    setState: setMoving,
    setServiceType,
    reset: resetMoving,
    orderFlow: state.orderFlow,
  };
}

export function useShreddingCheckout() {
  const { state, setShredding, setServiceType, resetShredding } = useCheckout();
  return {
    state: state.shredding,
    setState: setShredding,
    setServiceType,
    reset: resetShredding,
    orderFlow: state.orderFlow,
  };
}

export function useCheckoutSettings() {
  const { state, setSettings } = useCheckout();
  return { settings: state.settings, setSettings };
}
