"use client";

import React from "react";
import { DiscountForm } from "./types";

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (form: DiscountForm) => void;
    loading?: boolean;

    initialData?: Partial<DiscountForm>;
    mode?: "create" | "edit";
    error?: string;
};

const DEFAULT_FORM: DiscountForm = {
    id: "",
    code: "",
    type: "percentage",
    valueMinor: 0,
    maxUses: "",
    startDate: "",
    endDate: "",
};

export default function DiscountModal({
    open,
    onClose,
    onSubmit,
    loading,
    initialData,
    mode = "create",
    error,
}: Props) {
    const [form, setForm] = React.useState<DiscountForm>(DEFAULT_FORM);

    React.useEffect(() => {
        if (open) {
            setForm({
                ...DEFAULT_FORM,
                ...initialData,
            });
        }
    }, [open, initialData]);
    React.useEffect(() => {
        console.log("Form state updated:", form);
    }, [form]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay with blur */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal content */}
            <div
                className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold text-slate-600">
                        {mode === "edit" ? "Update Discount" : "Create Discount"}
                    </h1>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-800 text-xl"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-3">
                    <form className="space-y-3" onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(form);
                    }}>
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <input
                            required
                            type="text"
                            placeholder="Code (e.g. SAVE10)"
                            value={form.code}
                            disabled={mode === "edit"}
                            onChange={(e) =>
                                setForm({ ...form, code: e.target.value.toUpperCase() })
                            }
                            className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
                        />

                        {/* Type */}
                        <select
                            required
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                            className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
                        >
                            <option value="percentage">Percentage (%)</option>
                            {/* <option value="fixed">Fixed (£)</option> */}
                        </select>

                        {/* Value */}
                        <input
                            required
                            type="number"
                            placeholder="Value"
                            value={form.valueMinor}
                            onChange={(e) => setForm({ ...form, valueMinor: Number(e.target.value) })}
                            className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
                        />

                        {/* Max Uses */}
                        {/* <input
                        type="number"
                        placeholder="Max uses (optional)"
                        value={form.maxUses}
                        onChange={(e) =>
                            setForm({ ...form, maxUses: Number(e.target.value) })
                        }
                        className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
                    /> */}

                        {/* Date Range */}
                        {/* <div className="grid grid-cols-2 gap-2">
                            <input
                                required
                                type="date"
                                value={form.startDate}
                                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                            />
                            <input
                                required
                                type="date"
                                value={form.endDate}
                                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                            />
                        </div>
                         */}
                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                onClick={onClose}
                                className="h-10 px-4 rounded-xl border border-slate-200 text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={loading}
                                className="h-10 px-4 rounded-xl bg-slate-900 text-white text-sm disabled:opacity-50"
                            >
                                {loading
                                    ? mode === "edit"
                                        ? "Updating..."
                                        : "Creating..."
                                    : mode === "edit"
                                        ? "Update"
                                        : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}