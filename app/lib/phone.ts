export function normalizeGBPhone(input: string) {
  return (input || "").trim().replace(/[^\d+]/g, ""); // keep digits and +
}

export function isValidGBMobile(input: string) {
  const v = normalizeGBPhone(input);

  // +447xxxxxxxxx or 07xxxxxxxxx (11 digits total for 07)
  if (/^\+447\d{9}$/.test(v)) return true;
  if (/^07\d{9}$/.test(v)) return true;

  return false;
}

export function isValidGBPhone(input: string) {
  const v = normalizeGBPhone(input);

  // Convert +44 to 0 format for easy checking
  const national = v.startsWith("+44") ? "0" + v.slice(3) : v;

  // Must be digits only now
  if (!/^0\d{9,10}$/.test(national)) return false; // UK numbers usually 10–11 digits incl leading 0

  // Mobile: 07xxxxxxxxx
  if (/^07\d{9}$/.test(national)) return true;

  // Landline / geographic: 01... or 02...
  if (/^0[12]\d{8,9}$/.test(national)) return true;

  // Non-geographic (common): 03..., 08...
  if (/^0[38]\d{8,9}$/.test(national)) return true;

  return false;
}


function digitsOnly(s: string) {
  return (s || "").replace(/\D/g, "");
}

// Convert whatever the user types into a GB national number starting with 0...
// Examples:
//  - "+44 7123 456789" -> "07123456789"
//  - "447123456789"    -> "07123456789"
//  - "07123 456789"    -> "07123456789"
export function toGBNational(raw: string) {
  const trimmed = (raw || "").trim();

  // If user types +44..., strip it
  if (trimmed.startsWith("+44")) {
    const d = digitsOnly(trimmed.slice(3));
    return "0" + d;
  }

  // If user types 44... without plus
  const d = digitsOnly(trimmed);
  if (d.startsWith("44")) return "0" + d.slice(2);

  // Already national-ish
  if (d.startsWith("0")) return d;

  // If they start typing without 0, assume national remainder
  return d.length ? "0" + d : "";
}

// We SHOW the number WITHOUT the leading 0 because UI already shows +44.
// National "07123456789" -> display "7123 456789"
export function formatGBForDisplay(raw: string) {
  const national = toGBNational(raw);

  // remove the leading 0 for display after +44
  const rest = national.startsWith("0") ? national.slice(1) : national;
  const d = rest.slice(0, 10); // max for mobiles after removing 0 is 10 digits

  // Mobile patterns: 7 + 10 digits total after 0
  // Display as: 7123 456789 (4 + 6)
  if (d.startsWith("7")) {
    if (d.length <= 4) return d;
    return `${d.slice(0, 4)} ${d.slice(4)}`.trim();
  }

  // Landlines vary; a decent generic grouping:
  // 20xxxx.... -> 20 7946 0958 (2 + 4 + 4)
  if (d.startsWith("20")) {
    const a = d.slice(0, 2);
    const b = d.slice(2, 6);
    const c = d.slice(6, 10);
    return [a, b, c].filter(Boolean).join(" ").trim();
  }

  // Default grouping: 3 + 3 + rest (keeps it readable)
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`.trim();
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`.trim();
}

// Convert display value (after +44) into stored number (national 0...)
// Display "7123 456789" -> stored "07123456789"
export function displayToStoredGB(display: string) {
  const d = digitsOnly(display).slice(0, 10); // after +44 we expect up to 10 digits
  return d.length ? "0" + d : "";
}