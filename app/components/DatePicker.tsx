"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

type Props = {
  value?: string; // YYYY-MM-DD
  onChange: (value: string) => void;
};

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatPrettyDate(d: Date) {
  const day = d.getDate();

  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" :
    "th";

  const month = d.toLocaleString("en-GB", { month: "short" });
  const year = d.getFullYear();

  return `${day}${suffix} ${month}, ${year}`;
}

export function DatePicker({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(true);

  const selected = value ? new Date(value + "T00:00:00") : undefined;

  return (
    <div className="relative">
      {/* <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-left text-sm text-slate-800
                   outline-none hover:border-slate-300 focus:ring-2 focus:ring-[#4CAF50]/30"
      >
        {selected ? format(selected, "PPP") : "Select date"}
      </button> */}

      {open && (
        <>
          {/* click outside */}
          
          <div className="mt-2 w-[320px] rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(d) => {
                if (!d) return;
                onChange(formatPrettyDate(d));
              }}
            //   hidden={new Date()} // prevents past dates (optional)
            />
          </div>
        </>
      )}
    </div>
  );
}
