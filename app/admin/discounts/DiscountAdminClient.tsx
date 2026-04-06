"use client";

import React from "react";
import { createDiscountCode, toggleDiscount, updateDiscountCode } from "./actions";
import DiscountModal from "./DiscountModal"; // reusable modal component
import { DiscountForm } from "./types";

export default function DiscountAdminClient({ initialCodes }: any) {
  const [codes, setCodes] = React.useState(initialCodes);
  const [error, setError] = React.useState("");

  const [mode, setMode] = React.useState("all");
  const [rangeKey, setRangeKey] = React.useState("");
  const [q, setQ] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);

  const [form, setForm] = React.useState<DiscountForm>({
    id: "",
    code: "",
    type: "percentage",
    valueMinor: 0,
    maxUses: "",
    startDate: "",
    endDate: "",
  });

  const [selectedDiscount, setSelectedDiscount] = React.useState<DiscountForm | null>(null);
  const [editOpen, setEditOpen] = React.useState(false);

  function openEdit(discount: DiscountForm) {
    setSelectedDiscount(discount);
    setForm({
      id: discount.id,
      code: discount.code,
      type: discount.type,
      valueMinor: discount.valueMinor,
      maxUses: discount.maxUses ?? "",
      startDate: discount.startDate
        ? new Date(discount.startDate).toISOString().split("T")[0]
        : "",
      endDate: discount.endDate
        ? new Date(discount.endDate).toISOString().split("T")[0]
        : "",
    });
    setEditOpen(true);
  }

  async function createOrUpdate(formData: DiscountForm) {
    try {
      let res: any = null;

      // ---------- BUILD PAYLOAD ----------
      const payload = {
        code: formData.code,
        type: formData.type as any,
        valueMinor: Number(formData.valueMinor),
        maxUses: formData.maxUses ? Number(formData.maxUses) : undefined,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
      };

      // ---------- VALIDATION ----------
      const errors: Record<string, string> = {};

      if (!payload.code?.trim()) errors.code = "Code is required";

      if (!payload.type || (payload.type !== "percentage" && payload.type !== "fixed")) {
        errors.type = "Type must be 'percentage' or 'fixed'";
      }

      if (payload.valueMinor === undefined || isNaN(payload.valueMinor)) {
        errors.valueMinor = "Value is required";
      } else if (payload.valueMinor <= 0) {
        errors.valueMinor = "Value must be greater than 0";
      } else if (payload.type === "percentage" && payload.valueMinor > 100) {
        errors.valueMinor = "Percentage cannot exceed 100";
      }

      // if (payload.maxUses !== undefined && payload.maxUses < 1) {
      //   errors.maxUses = "Max uses must be at least 1";
      // }

      // if (!payload.startDate) errors.startDate = "Start date is required";
      // if (!payload.endDate) errors.endDate = "End date is required";

      // if (payload.startDate && payload.endDate) {
      //   const start = new Date(payload.startDate);
      //   const end = new Date(payload.endDate);
      //   if (end < start) errors.endDate = "End date must be after start date";
      // }

      if (Object.keys(errors).length > 0) {

        setError(Object.values(errors).join(", "));

        return;
      }

      // ---------- SUBMIT ----------
      if (isEdit && selectedDiscount) {
        // UPDATE
        res = await updateDiscountCode(selectedDiscount.id, payload);

        setCodes((prev: any) =>
          prev.map((c: any) => (c.id === selectedDiscount.id ? res : c))
        );
      } else {
        // CREATE
        res = await createDiscountCode(payload);

        setCodes((prev: any) => [res, ...prev]);
      }

      resetForm();
      console.log("Success:", res);

    } catch (error: any) {
      console.error("Error creating/updating discount:", error);
      // Optional: show error message in UI
      alert(error.message || "Something went wrong");
    }
  }

  function resetForm() {
    setForm({
      id: "",
      code: "",
      type: "percentage",
      valueMinor: 0,
      maxUses: "",
      startDate: "",
      endDate: "",
    });
    setSelectedDiscount(null);
    setEditOpen(false);
  }

  async function toggle(id: string, active: boolean) {
    const updated = await toggleDiscount(id, !active);
    setCodes((prev: any) =>
      prev.map((c: any) => (c.id === id ? updated : c))
    );
  }

  // filter and search
  const filteredCodes = codes
    .filter((c: any) =>
      mode === "all" ? true : mode === "active" ? c.active : !c.active
    )
    .filter((c: any) =>
      q ? c.code.toLowerCase().includes(q.toLowerCase()) : true
    );

  React.useEffect(() => {
    if (!selectedDiscount) return;

    setForm({
      id: selectedDiscount.id,
      code: selectedDiscount.code,
      type: selectedDiscount.type,
      valueMinor:
        selectedDiscount.type === "fixed"
          ? selectedDiscount.valueMinor / 100
          : selectedDiscount.valueMinor,
      maxUses: selectedDiscount.maxUses ?? "",
      startDate: selectedDiscount.startDate
        ? new Date(selectedDiscount.startDate).toISOString().slice(0, 10)
        : "",
      endDate: selectedDiscount.endDate
        ? new Date(selectedDiscount.endDate).toISOString().slice(0, 10)
        : "",
    });
  }, [selectedDiscount]);

  return (
    <main className="space-y-4">
      {/* Filters + Search + Create Button */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-lg font-bold text-slate-900">Discount Codes</h1>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={mode}
              onChange={(e) => {
                setMode(e.target.value as any);
                setRangeKey("");
              }}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>

            {mode !== "all" && (
              <select
                value={rangeKey}
                onChange={(e) => setRangeKey(e.target.value)}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="">Select range...</option>
                {/* example options */}
                <option value="recent">Recently Created</option>
                <option value="expiring">Expiring Soon</option>
              </select>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search code..."
            className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />

          <button
            onClick={() => { resetForm(); setIsEdit(false); setEditOpen(true); }}
            className="h-10 px-4 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
          >
            Create
          </button>
        </div>
      </div>

      {/* Discounts Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-auto">
          {filteredCodes.length === 0 ? (
            <div className="p-20 text-center text-slate-400">
              No discount codes found.
            </div>
          ) : (
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="px-4 py-4">Code</th>
                  <th className="px-4 py-4">Type</th>
                  <th className="px-4 py-4">Value</th>
                  {/* <th className="px-4 py-4">Max Uses</th> */}
                  {/* <th className="px-4 py-4">Used</th> */}
                  <th className="px-4 py-4">Active</th>
                  <th className="px-4 py-4">Toggle Status</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCodes.map((c: any) => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-4 py-4 font-semibold text-slate-900">
                      {c.code}
                    </td>
                    <td className="px-4 py-4">{c.type}</td>
                    <td className="px-4 py-4">
                      {c.type === "percentage"
                        ? `${c.valueMinor}%`
                        : `£${(c.valueMinor / 100).toFixed(2)}`}
                    </td>
                    {/* <td className="px-4 py-4">{c.maxUses ?? "—"}</td> */}
                    <td className="px-4 py-4">{c.usedCount}</td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggle(c.id, c.active)}
                        className={`px-3 py-1 rounded text-sm ${c.active
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-slate-700"
                          }`}
                      >
                        {c.active ? "Active" : "Disabled"}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => { openEdit(c); setIsEdit(true); }}
                        className="px-3 py-1 rounded bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {editOpen && (
        <DiscountModal
          open={editOpen}
          onClose={() => {
            setError("");
            setEditOpen(false);
            setSelectedDiscount(null);
          }}
          onSubmit={createOrUpdate}
          initialData={form}
          mode={isEdit ? "edit" : "create"}
          error={error}
        />
      )}
    </main>
  );
}