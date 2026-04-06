"use client";

import React from "react";

type Props = {
  code: string;
  setCode: (v: string) => void;
  onApply: () => void;
  onRemove: () => void;
  loading?: boolean;
  error?: string;
  applied?: boolean;
  baseAmount: number;
  discountMeta: {
    id: string;
    type: "percentage" | "fixed";
    valueMinor: number;
  } | null;
};

export function DiscountCodeInput({
  code,
  setCode,
  onApply,
  onRemove,
  loading,
  error,
  applied,
  baseAmount,
  discountMeta,
}: Props) {
  const disabled = baseAmount === 0;

  // ✅ Only reset when discount is applied AND amount becomes 0
  React.useEffect(() => {
    if (
      baseAmount === 0 &&
      applied &&
      !loading &&
      discountMeta &&
      discountMeta.valueMinor !== 100
    ) {
      setCode("");
      onRemove();
    }
  }, [baseAmount, applied, loading, discountMeta]);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          disabled={loading || disabled || applied}
          type="text"
          placeholder="Discount code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="h-10 flex-1 rounded-xl border border-slate-200 px-3 text-sm"
        />

        {!applied && (
          <button
            type="button"
            onClick={onApply}
            disabled={loading || disabled || applied}
            className="px-4 rounded-xl bg-slate-900 text-white text-sm"
          >
            {loading ? "Applying..." : "Apply"}
          </button>
        )}

        {applied && (
          <button
            type="button"
            onClick={onRemove}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-white text-sm"
            style={{
              background: loading
                ? "#991b1b"
                : "linear-gradient(to right, #ef4444, #b91c1c)",
            }}
          >
            Remove
          </button>
        )}
      </div>

      {disabled && !applied && (
        <div className="text-xs text-slate-500">
          No amount due to apply discount to
        </div>
      )}

      {error && <div className="text-xs text-red-500">{error}</div>}

      {applied && !error && (
        <div className="text-xs text-emerald-600">Code applied</div>
      )}
    </div>
  );
}