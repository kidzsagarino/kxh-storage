import type { TimeSlotId, ServiceType } from "@/app/components/checkout/CheckoutStore";

type Slot = Exclude<TimeSlotId, "">;
type Key = `${ServiceType}|${string}`; // service|YYYY-MM-DD

// Dummy volumes for now (replace with API later)
const DUMMY_VOLUME: Record<Key, Partial<Record<Slot, number>>> = {
    "storage|2026-02-10": { morning: 0, afternoon: 0, evening: 0 },
    "shredding|2026-02-10": { morning: 0, afternoon: 0, evening: 0 },
    "moving|2026-02-10": { morning: 0, afternoon: 0, evening: 0 },
};

export function getSlotVolume(service: ServiceType, dateISO: string) {
    const key: Key = `${service}|${dateISO}`;
    const s = DUMMY_VOLUME[key] ?? {};
    return {
        morning: s.morning ?? 0,
        afternoon: s.afternoon ?? 0,
        evening: s.evening ?? 0,
    };
}
