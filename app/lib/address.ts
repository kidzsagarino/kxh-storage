const UK_POSTCODE_REGEX =
    /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;


export type NominatimResult = {
    displayName: string;
    lat: string;
    lon: string;
    address?: {
        house_number?: string;
        road?: string;
        neighbourhood?: string;
        suburb?: string;
        city?: string;
        town?: string;
        village?: string;
        county?: string;
        postcode?: string;
        country_code?: string;
    };
};

export function normalizeUKPostcode(input: string) {
    return input.trim().toUpperCase().replace(/\s+/g, "");
}

export function formatUKPostcode(input: string) {
    const clean = normalizeUKPostcode(input);
    if (clean.length < 5) return input;

    return clean.slice(0, clean.length - 3) + " " + clean.slice(-3);
}

export function isValidUKPostcode(input: string) {
    const formatted = formatUKPostcode(input);
    return UK_POSTCODE_REGEX.test(formatted);
}

export function pickCity(a?: NominatimResult["address"]) {
    if (!a) return "";
    return a.city || a.town || a.village || a.suburb || a.county || "";
}

export function streetFromNominatim(sug: NominatimResult) {
    const a = sug.address;
    const house = a?.house_number?.trim() || "";
    const road = a?.road?.trim() || "";

    // best short street label
    const streetShort = [house, road].filter(Boolean).join(" ").trim();

    // fallback if no road/house
    return streetShort || road || sug.displayName;
}

export async function fetchNominatim(query: string): Promise<NominatimResult[]> {
    const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    return res.json();
}