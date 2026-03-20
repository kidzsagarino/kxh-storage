import { useEffect, useState } from "react";
import { fetchNominatim, NominatimResult } from "../lib/address";

export function AddressLookupField({
    value,
    onValueChange,
    onSelectAddress,
    placeholder,
    onNoResults,
}: {
    value: string;
    onValueChange: (value: string) => void;
    onSelectAddress: (result: NominatimResult) => void;
    placeholder: string;
    onNoResults?: () => void;
}) {
    const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        const q = value.trim();

        if (!open || q.length < 3) {
            setSuggestions([]);
            return;
        }

        const t = setTimeout(async () => {
            try {
                setLoading(true);
                setSearched(false);
                const results = await fetchNominatim(`${q}`);
                setSuggestions(results ?? []);
                setSearched(true);
            } catch {
                setSuggestions([]);
                setSearched(true);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(t);
    }, [value, open]);
    useEffect(() => {
        if (open && searched && !loading && suggestions.length === 0) {
            onNoResults?.();
        }
    }, [open, searched, loading, suggestions.length]);
    return (
        <div className="relative">
            <input
                value={value}
                onChange={(e) => {
                    onValueChange(e.target.value);
                    setOpen(true);
                    setSearched(false);
                }}
                placeholder={placeholder}
                className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none"
            />

            {open && suggestions.length > 0 && (
                <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                    <ul className="max-h-64 overflow-auto">
                        {suggestions.map((sug, idx) => {
                            const addr = sug.address;
                            const city =
                                addr?.city ??
                                addr?.town ??
                                addr?.village ??
                                addr?.suburb ??
                                addr?.county ??
                                "";

                            return (
                                <li key={idx}>
                                    <button
                                        type="button"
                                        className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            onSelectAddress(sug);
                                            setOpen(false);
                                            setSuggestions([]);
                                            setSearched(false);
                                        }}
                                    >
                                        <div className="truncate font-medium text-slate-900">{sug.displayName}</div>
                                        <div className="text-xs text-slate-500 truncate">
                                            {addr?.postcode ? `Postcode: ${addr.postcode}` : ""}
                                            {city ? (addr?.postcode ? ` • ${city}` : city) : ""}
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            {open && searched && !loading && suggestions.length === 0 && (
                <div className="mt-2 text-xs text-rose-600">
                    No results found. Try a postcode or a street name.
                </div>
            )}
        </div>
    );
}
