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

export function DatePicker({ value, onChange }: Props) {
    const selected = value ? new Date(`${value}T00:00:00`) : undefined;

    return (
        <DayPicker
            mode="single"
            selected={selected}
            onSelect={(d) => {
                if (!d) return;
                onChange(toISODate(d));
            }}
            disabled={{ before: new Date() }}
            className="w-full flex justify-center"
            classNames={{
                /* layout */
                table: "w-full table-fixed border-collapse",
                head_row: "w-full",
                row: "w-full",

                /* each column = 1/7 width */
                head_cell: "w-[14.285%] text-xs text-slate-500 text-center",
                cell: "w-[14.285%] p-0 text-center",

                /* day button */
                day: "mx-auto h-9 w-9 rounded-md text-sm hover:bg-emerald-50",

                /* states */
                day_selected: "bg-emerald-600 text-white hover:bg-emerald-600",
                day_today: "border border-emerald-500",
                day_outside: "text-slate-400 opacity-40",
            }}
        />

    );
}
