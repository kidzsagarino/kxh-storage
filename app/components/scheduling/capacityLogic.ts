import type { ServiceType, TimeSlotId } from "@/app/components/checkout/CheckoutStore";
import { getSlotVolume } from "./volume";

export type Slot = Exclude<TimeSlotId, "">;
export type Caps = Record<Slot, number>;

export function isSlotFull(args: {
  enabled: boolean;
  caps: Caps;
  service: ServiceType;
  dateISO: string;
  slot: Slot;
}) {
  const { enabled, caps, service, dateISO, slot } = args;
  if (!enabled) return false;

  const volume = getSlotVolume(service, dateISO)[slot];
  const cap = caps[slot];
  return volume >= cap;
}

export function isDayFull(args: {
  enabled: boolean;
  caps: Caps;
  service: ServiceType;
  dateISO: string;
}) {
  const { enabled, caps, service, dateISO } = args;
  if (!enabled) return false;

  const v = getSlotVolume(service, dateISO);
  return v.morning >= caps.morning && v.afternoon >= caps.afternoon && v.evening >= caps.evening;
}
