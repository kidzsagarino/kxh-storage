export const INVOICE_BUSINESS = {
  name: "KXH Storage & Logistics",
  address: [
    "10 Northridge Road",
    "Gravesend, DA12 5AY",
    "United Kingdom",
  ],
};

export function money(minor: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(minor / 100);
}

export function displayDate(value: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(value);
}