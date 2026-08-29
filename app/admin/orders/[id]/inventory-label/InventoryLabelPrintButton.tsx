"use client";


export default function InventoryLabelPrintButton() {
    return (
        <button
            type="button"
            onClick={() =>
                window.print()
            }
            className="h-10 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800"
        >
            Print Label
        </button>
    );
}