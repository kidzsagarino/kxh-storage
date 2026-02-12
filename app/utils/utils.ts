export function toLocalISODate(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

type WeekdayKey = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export function weekdayKey(d: Date): WeekdayKey {
    return (["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const)[d.getDay()];
}


export function to12Hour(time24: string): string {
  const [hourStr, minuteStr] = time24.split(":");

  const hours = Number(hourStr);
  const minutes = Number(minuteStr);

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error(`Invalid 24-hour time format: "${time24}"`);
  }

  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${hour12}:${minuteStr.padStart(2, "0")} ${period}`;
}
