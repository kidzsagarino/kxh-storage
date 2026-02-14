type ServiceType = "storage" | "moving" | "shredding";

type SlotKey = "MORNING" | "AFTERNOON" | "EVENING";

type OrderFlow = {
  timeSlots: Array<{
    id: string;
    name: string; // "Morning" | "Afternoon" | "Evening"
    startTime: string; // "07:00"
    endTime: string;   // "10:00"
    isActive: boolean;
  }>;
  settings: {
    scheduling: {
      disableAutoBlockSchedule: boolean;
      capacityEnabled: boolean;
      capacities: Array<{
        serviceType: "STORAGE" | "MOVING" | "SHREDDING";
        slotKey: SlotKey;
        capacity: number;
      }>;
      blackoutDates: string[]; // ["YYYY-MM-DD", ...]
    };
  };
};

function toServiceEnum(service: ServiceType): "STORAGE" | "MOVING" | "SHREDDING" {
  if (service === "storage") return "STORAGE";
  if (service === "moving") return "MOVING";
  return "SHREDDING";
}

// Best-effort mapping (based on your data: timeSlots[].name = Morning/Afternoon/Evening)
function toSlotKey(slotName: string): SlotKey | null {
  const n = slotName.trim().toLowerCase();
  if (n.includes("morning")) return "MORNING";
  if (n.includes("afternoon")) return "AFTERNOON";
  if (n.includes("evening")) return "EVENING";
  return null;
}

function capacityFor(orderFlow: OrderFlow, service: ServiceType, slotKey: SlotKey): number {
  const serviceEnum = toServiceEnum(service);
  const row = orderFlow.settings.scheduling.capacities.find(
    (c) => c.serviceType === serviceEnum && c.slotKey === slotKey
  );
  return typeof row?.capacity === "number" ? row.capacity : 0;
}

/**
 * volumesByTimeSlotId shape from your API:
 * { [timeSlotId]: number }
 */
export function isSlotFull(args: {
  orderFlow: OrderFlow;
  service: ServiceType;
  dateISO: string; // YYYY-MM-DD
  timeSlotId: string;
  volumesByTimeSlotId?: Record<string, number>;
}) {
  const { orderFlow, service, dateISO, timeSlotId, volumesByTimeSlotId } = args;

  const scheduling = orderFlow.settings.scheduling;

  // If you turned off auto-blocking, never treat it as full
  if (scheduling.disableAutoBlockSchedule) return false;

  // If capacity is not enabled, never treat it as full
  if (!scheduling.capacityEnabled) return false;

  // Blackout date => treat as "full"/blocked
  if (scheduling.blackoutDates?.includes(dateISO)) return true;

  const slot = orderFlow.timeSlots.find((s) => s.id === timeSlotId);
  if (!slot || !slot.isActive) return true; // if slot not found/inactive => block it

  const key = toSlotKey(slot.name);
  if (!key) return false; // unknown slot naming => don't block

  const cap = capacityFor(orderFlow, service, key);

  // If cap is 0, consider it unavailable (blocks selection)
  if (cap <= 0) return true;

  const used = volumesByTimeSlotId?.[timeSlotId] ?? 0;

  return used >= cap;
}

export function isDayFull(args: {
  orderFlow: OrderFlow;
  service: ServiceType;
  dateISO: string; // YYYY-MM-DD
  volumesByTimeSlotId?: Record<string, number>;
}) {
  const { orderFlow, service, dateISO, volumesByTimeSlotId } = args;
  const scheduling = orderFlow.settings.scheduling;

  if (scheduling.disableAutoBlockSchedule) return false;
  if (!scheduling.capacityEnabled) return false;

  if (scheduling.blackoutDates?.includes(dateISO)) return true;

  // Active slots only
  const active = orderFlow.timeSlots.filter((s) => s.isActive);

  // If no active slots, treat day as blocked
  if (active.length === 0) return true;

  // Day is full if *all* active slots are full
  return active.every((slot) =>
    isSlotFull({
      orderFlow,
      service,
      dateISO,
      timeSlotId: slot.id,
      volumesByTimeSlotId,
    })
  );
}
