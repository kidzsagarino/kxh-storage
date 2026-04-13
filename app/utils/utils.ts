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

function normalizeTo24Hour(time: string): string {
  const s = time.trim().toLowerCase();

  // If already 24-hour format (HH:mm)
  if (/^\d{1,2}:\d{2}$/.test(s)) {
    return s;
  }

  // Handle "7am", "7:30pm", etc.
  const m = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
  if (!m) {
    throw new Error(`Invalid time format: "${time}"`);
  }

  let hours = Number(m[1]);
  const minutes = m[2] ? Number(m[2]) : 0;
  const meridian = m[3];

  if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
    throw new Error(`Invalid time format: "${time}"`);
  }

  if (meridian === "am") {
    if (hours === 12) hours = 0;
  } else {
    if (hours !== 12) hours += 12;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function to12Hour(time: string): string {
  const time24 = normalizeTo24Hour(time);

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
    throw new Error(`Invalid 24-hour time format: "${time}"`);
  }

  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${hour12}:${minuteStr.padStart(2, "0")} ${period}`;
}

export function money(n: number, sym = "£") {
  return `${sym}${(n / 100).toFixed(2)}`;
}


export function formatServiceDate(d?: Date | null) {
    return d ? d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";
}