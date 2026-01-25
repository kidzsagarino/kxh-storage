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
        <div className="relative w-full min-h-[22rem]">
            {/* Absolute, always open */}
            <div className="absolute inset-x-0 top-0 sm:static sm:inset-auto">
                <div
                    className="
                        mx-auto
                        w-full
                        max-w-[270px]      /* mobile */
                            /* tablet+ */
                        overflow-hidden
                        rounded-xl
                        border border-slate-200
                        bg-white
                        p-3
                        shadow-lg
          "
                >
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={(d) => {
                            if (!d) return;
                            onChange(toISODate(d));
                        }}
                        disabled={{ before: new Date() }} // optional
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}
