import type { ServiceType } from "@/app/components/checkout/CheckoutStore";

type OrderFlow = {
  timeSlots: Array<{
    id: string;
    name: string;
    startTime: string; // "07:00"
    endTime: string;   // "10:00"
    isActive: boolean;
  }>;
  settings: {
    scheduling: {
      capacities: Array<{
        serviceType: "STORAGE" | "MOVING" | "SHREDDING";
        slotKey: "MORNING" | "AFTERNOON" | "EVENING";
        capacity: number;
      }>;
    };
  };
};

type DbServiceType = "STORAGE" | "MOVING" | "SHREDDING";
type SlotKey = "MORNING" | "AFTERNOON" | "EVENING";

// service|date|slotId
type VolKey = `${ServiceType}|${string}|${string}`;

/** Temporary volumes store (in-memory). Replace later with API. */
const VOLUME_BY_KEY: Record<VolKey, number> = {};

// OPTIONAL: persist to localStorage so refresh doesn't wipe it
const LS_KEY = "kxh_volumes_v1";

function loadVolumesOnce() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Record<string, number>;
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === "number") (VOLUME_BY_KEY as any)[k] = v;
    }
  } catch {
    // ignore
  }
}

function saveVolumes() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(VOLUME_BY_KEY));
  } catch {
    // ignore
  }
}

function toDbServiceType(service: ServiceType): DbServiceType {
  return service.toUpperCase() as DbServiceType;
}

/** Map a timeSlot to MORNING/AFTERNOON/EVENING via startTime (until DB links capacity to slotId). */
function slotKeyFromStartTime(startTime: string): SlotKey {
  const h = Number(startTime.slice(0, 2));
  if (h < 10) return "MORNING";
  if (h < 15) return "AFTERNOON";
  return "EVENING";
}

/** Capacity per slotId (from orderFlow). */
export function getSlotCapacities(
  orderFlow: OrderFlow,
  service: ServiceType
): Record<string, number> {
  const dbService = toDbServiceType(service);

  const caps = orderFlow.settings.scheduling.capacities.filter(
    (c) => c.serviceType === dbService
  );

  const capByKey = new Map<SlotKey, number>(
    caps.map((c) => [c.slotKey, c.capacity])
  );

  const out: Record<string, number> = {};
  for (const slot of orderFlow.timeSlots) {
    if (!slot.isActive) continue;
    const slotKey = slotKeyFromStartTime(slot.startTime);
    out[slot.id] = capByKey.get(slotKey) ?? 0;
  }
  return out;
}

/** Volume per slotId (temporary store). */
export function getSlotVolumes(
  orderFlow: OrderFlow,
  service: ServiceType,
  dateISO: string
): Record<string, number> {
  // if you use localStorage persistence
  loadVolumesOnce();

  const out: Record<string, number> = {};
  for (const slot of orderFlow.timeSlots) {
    if (!slot.isActive) continue;
    const k: VolKey = `${service}|${dateISO}|${slot.id}`;
    out[slot.id] = VOLUME_BY_KEY[k] ?? 0;
  }
  return out;
}

/** Increment volume when a new order is created (call this after you save an order). */
export function bumpSlotVolume(args: {
  service: ServiceType;
  dateISO: string;
  timeSlotId: string;
  by?: number;
}) {
  const by = args.by ?? 1;
  const k: VolKey = `${args.service}|${args.dateISO}|${args.timeSlotId}`;
  VOLUME_BY_KEY[k] = (VOLUME_BY_KEY[k] ?? 0) + by;
  saveVolumes();
}

/** Decrement volume if order is cancelled/refunded etc (optional). */
export function unbumpSlotVolume(args: {
  service: ServiceType;
  dateISO: string;
  timeSlotId: string;
  by?: number;
}) {
  const by = args.by ?? 1;
  const k: VolKey = `${args.service}|${args.dateISO}|${args.timeSlotId}`;
  VOLUME_BY_KEY[k] = Math.max(0, (VOLUME_BY_KEY[k] ?? 0) - by);
  saveVolumes();
}

/** Convenience: tell if slot is full. */
export function isSlotFullUsingOrderFlow(args: {
  orderFlow: OrderFlow;
  service: ServiceType;
  dateISO: string;
  timeSlotId: string;
}) {
  const caps = getSlotCapacities(args.orderFlow, args.service);
  const vols = getSlotVolumes(args.orderFlow, args.service, args.dateISO);

  const cap = caps[args.timeSlotId] ?? 0;
  const vol = vols[args.timeSlotId] ?? 0;

  // If cap=0 treat as disabled/full (choose what you want)
  return cap > 0 ? vol >= cap : true;
}
