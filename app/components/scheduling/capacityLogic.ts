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

export function isDayFull({
  orderFlow,
  service,
  dateISO,
  volumesByTimeSlotId,
}: {
  orderFlow: any;
  service: "storage" | "moving" | "shredding";
  dateISO: string;
  volumesByTimeSlotId?: Record<string, number>; // timeSlotId -> volume
}) {
  // ✅ No volumes data yet => can't determine fullness => treat as NOT full
  if (!volumesByTimeSlotId) return false;

  const caps = orderFlow.settings.scheduling.capacities
    .filter((c: any) => c.serviceType === service.toUpperCase());

  // any slot still has capacity -> day not full
  for (const cap of caps) {
    const slotKey = cap.slotKey; // MORNING/AFTERNOON/EVENING (if you use these)
    const slot = orderFlow.timeSlots.find((t: any) => t.key === slotKey);
    if (!slot) continue;

    const used = volumesByTimeSlotId[slot.id] ?? 0;
    if (used < cap.capacity) return false;
  }

  return true;
}
