"use client";

import { useCheckoutSettings } from "@/app/components/checkout/CheckoutStore";
import React, { useEffect, useMemo, useState } from "react";

type TimeSlot = {
  id: "morning" | "afternoon" | "evening";
  label: string;
  range: string; // e.g. "7am – 10am"
  enabled: boolean;
};

type PricingSettings = {
  // Moving
  pricePerMile: number;
  movingHomeTypePrice: {
    "small-move": number;
    "1-bedroom-flat": number;
    "2-bedroom-flat": number;
    "3-bedroom-flat": number;
    "4-bedroom-flat": number;
    "office-move": number;
  };
  packingAssistancePrice: number; // used when yes

  // Storage (example: price per month per item)
  storagePricePerMonth: {
    "small-box": number;
    "medium-box": number;
    "large-box": number;
    "xl-box": number;
    suitcase: number;
    "half-container": number;
    "full-container": number;
  };
  storageDiscounts: { months: 1 | 3 | 6 | 12; percentOff: number }[];

  // Shredding
  shredding: {
    bagPrice: number;
    archiveBoxPrice: number;
  };

  timeSlots: TimeSlot[];
  serviceEnabled: {
    storage: boolean;
    moving: boolean;
    shredding: boolean;
  };
};

const STORAGE_DEFAULT: PricingSettings = {
  pricePerMile: 0.58,
  movingHomeTypePrice: {
    "small-move": 450,
    "1-bedroom-flat": 650,
    "2-bedroom-flat": 850,
    "3-bedroom-flat": 1100,
    "4-bedroom-flat": 1358,
    "office-move": 1500,
  },
  packingAssistancePrice: 295,

  storagePricePerMonth: {
    "small-box": 5,
    "medium-box": 8,
    "large-box": 12,
    "xl-box": 15,
    suitcase: 10,
    "half-container": 75,
    "full-container": 150,
  },
  storageDiscounts: [
    { months: 1, percentOff: 0 },
    { months: 3, percentOff: 5 },
    { months: 6, percentOff: 10 },
    { months: 12, percentOff: 15 },
  ],

  shredding: {
    bagPrice: 12,
    archiveBoxPrice: 18,
  },

  timeSlots: [
    { id: "morning", label: "Morning", range: "7am – 10am", enabled: true },
    { id: "afternoon", label: "Afternoon", range: "10am – 3pm", enabled: true },
    { id: "evening", label: "Evening", range: "3pm – 6pm", enabled: true },
  ],

  serviceEnabled: { storage: true, moving: true, shredding: true },
};

const LS_KEY = "kxh_admin_settings_v1";

function num(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function SectionTitle({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {desc ? <p className="mt-1 text-xs text-slate-500">{desc}</p> : null}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <div className="flex items-center gap-2">
        <input
          inputMode="decimal"
          value={String(value)}
          onChange={(e) => onChange(num(e.target.value))}
          className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
        />
        {suffix ? (
          <span className="whitespace-nowrap text-xs font-semibold text-slate-500">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<PricingSettings>(STORAGE_DEFAULT);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setSettings(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const hasChanges = useMemo(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return true;
      return raw !== JSON.stringify(settings);
    } catch {
      return true;
    }
  }, [settings]);

  function save() {
    localStorage.setItem(LS_KEY, JSON.stringify(settings));
    setSavedMsg("Saved.");
    window.setTimeout(() => setSavedMsg(null), 1500);
  }

  function reset() {
    localStorage.removeItem(LS_KEY);
    setSettings(STORAGE_DEFAULT);
    setSavedMsg("Reset to defaults.");
    window.setTimeout(() => setSavedMsg(null), 1500);
  }

  return (
    <main className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Settings</h1>
            <p className="text-xs text-slate-500">
              Dummy settings stored locally. Wire to DB later.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={reset}
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={save}
              className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Save
            </button>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs">
          <span
            className={`inline-flex rounded-full border px-2 py-1 font-semibold ${hasChanges
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
              }`}
          >
            {hasChanges ? "Unsaved changes" : "All saved"}
          </span>
          {savedMsg ? <span className="text-slate-600">{savedMsg}</span> : null}
        </div>
      </div>

      {/* Service Toggles */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <SectionTitle
          title="Services"
          desc="Enable or disable services shown in the quote flow."
        />

        <div className="grid gap-3 sm:grid-cols-3">
          {(["storage", "moving", "shredding"] as const).map((k) => (
            <label
              key={k}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <span className="text-sm font-semibold capitalize text-slate-900">
                {k}
              </span>
              <input
                type="checkbox"
                checked={settings.serviceEnabled[k]}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    serviceEnabled: { ...s.serviceEnabled, [k]: e.target.checked },
                  }))
                }
                className="h-5 w-5"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Moving */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <SectionTitle title="Moving pricing" desc="Adjust moving price rules." />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Price per mile"
            value={settings.pricePerMile}
            suffix="£ / mile"
            onChange={(n) => setSettings((s) => ({ ...s, pricePerMile: n }))}
          />

          <Field
            label="Packing assistance (Yes) add-on"
            value={settings.packingAssistancePrice}
            suffix="£"
            onChange={(n) =>
              setSettings((s) => ({ ...s, packingAssistancePrice: n }))
            }
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(settings.movingHomeTypePrice).map(([k, v]) => (
            <Field
              key={k}
              label={k.replaceAll("-", " ")}
              value={v}
              suffix="£"
              onChange={(n) =>
                setSettings((s) => ({
                  ...s,
                  movingHomeTypePrice: { ...s.movingHomeTypePrice, [k]: n } as any,
                }))
              }
            />
          ))}
        </div>
      </div>

      {/* Storage */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <SectionTitle
          title="Storage pricing"
          desc="Price per month per item + discounts."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(settings.storagePricePerMonth).map(([k, v]) => (
            <Field
              key={k}
              label={k.replaceAll("-", " ")}
              value={v}
              suffix="£ / mo"
              onChange={(n) =>
                setSettings((s) => ({
                  ...s,
                  storagePricePerMonth: { ...s.storagePricePerMonth, [k]: n } as any,
                }))
              }
            />
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-sm font-semibold text-slate-900">Discounts</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {settings.storageDiscounts.map((d, idx) => (
              <label key={d.months} className="grid gap-1">
                <span className="text-xs font-semibold text-slate-600">
                  {d.months} months (% off)
                </span>
                <input
                  inputMode="numeric"
                  value={String(d.percentOff)}
                  onChange={(e) => {
                    const percentOff = num(e.target.value);
                    setSettings((s) => ({
                      ...s,
                      storageDiscounts: s.storageDiscounts.map((x, i) =>
                        i === idx ? { ...x, percentOff } : x
                      ),
                    }));
                  }}
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Shredding */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <SectionTitle
          title="Shredding pricing"
          desc="Set unit prices for shredding items."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Bag price"
            value={settings.shredding.bagPrice}
            suffix="£"
            onChange={(n) =>
              setSettings((s) => ({
                ...s,
                shredding: { ...s.shredding, bagPrice: n },
              }))
            }
          />
          <Field
            label="Archive box price"
            value={settings.shredding.archiveBoxPrice}
            suffix="£"
            onChange={(n) =>
              setSettings((s) => ({
                ...s,
                shredding: { ...s.shredding, archiveBoxPrice: n },
              }))
            }
          />
        </div>
      </div>

      {/* Time Slots */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <SectionTitle
          title="Time slots"
          desc="Control which time slots appear in the booking flow."
        />

        <div className="grid gap-3 sm:grid-cols-3">
          {settings.timeSlots.map((t, idx) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">{t.label}</div>
                <input
                  type="checkbox"
                  checked={t.enabled}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      timeSlots: s.timeSlots.map((x, i) =>
                        i === idx ? { ...x, enabled: e.target.checked } : x
                      ),
                    }))
                  }
                  className="h-5 w-5"
                />
              </div>

              <label className="grid gap-1">
                <span className="text-xs font-semibold text-slate-600">Label</span>
                <input
                  value={t.label}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      timeSlots: s.timeSlots.map((x, i) =>
                        i === idx ? { ...x, label: e.target.value } : x
                      ),
                    }))
                  }
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-xs font-semibold text-slate-600">Range</span>
                <input
                  value={t.range}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      timeSlots: s.timeSlots.map((x, i) =>
                        i === idx ? { ...x, range: e.target.value } : x
                      ),
                    }))
                  }
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export function ScheduleSettings() {
  const { settings, setSettings } = useCheckoutSettings();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
      <div>
        <h2 className="text-sm font-semibold text-slate-900">Scheduling</h2>
        <p className="text-xs text-slate-500">
          Control whether dates and time slots are automatically disabled.
        </p>
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4"
          checked={settings.disableAutoBlockSchedule}
          onChange={(e) =>
            setSettings((s) => ({ ...s, disableAutoBlockSchedule: e.target.checked }))
          }
        />
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">
            Disable auto-blocking for Date & Time Slot
          </div>
          <div className="text-xs text-slate-600">
            When enabled, the calendar and time slots will not be auto-disabled (e.g. past
            dates / unavailable slots).
          </div>
        </div>
      </label>
    </section>
  );
}
