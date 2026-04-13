"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { getAdminSettings, saveAdminSettings, type PricingSettings } from "./action";

type WeekdayKey = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

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
          <span className="whitespace-nowrap text-xs font-semibold text-slate-500">{suffix}</span>
        ) : null}
      </div>
    </label>
  );
}

function typedEntries<T extends Record<string, any>>(obj: T) {
  return Object.entries(obj) as { [K in keyof T]-?: [K, T[K]] }[keyof T][];
}

export default function AdminSettingsClient() {

  const FALLBACK_DEFAULT = React.useMemo(
    () =>
      ({
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
        shredding: { bagPrice: 12, archiveBoxPrice: 18 },
        timeSlots: [
          { id: "morning", label: "Morning", range: "7am – 10am", enabled: true },
          { id: "afternoon", label: "Afternoon", range: "10am – 3pm", enabled: true },
          { id: "evening", label: "Evening", range: "3pm – 6pm", enabled: true },
        ],
        serviceEnabled: { storage: true, moving: true, shredding: true },
        scheduling: {
          disableAutoBlockSchedule: false,
          capacityEnabled: true,
          capacityPerService: {
            storage: { morning: 6, afternoon: 8, evening: 6 },
            moving: { morning: 3, afternoon: 3, evening: 2 },
            shredding: { morning: 10, afternoon: 12, evening: 10 },
          },
          weekdaysByService: {
            storage: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: false },
            moving: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false },
            shredding: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: true },
          },
          blackoutDates: [],
        },
        movingPackagePrices: {
          basic_package: 0,
          move_and_pack: 295,
        },
        movingAndCollectionFee: 14.95,
      }) as PricingSettings,
    []
  );

  const [settings, setSettings] = React.useState<PricingSettings>(FALLBACK_DEFAULT);

  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const [savedMsg, setSavedMsg] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [newBlackoutDate, setNewBlackoutDate] = React.useState("");

  const initialJsonRef = React.useRef<string>("");

  const WEEKDAYS: { key: WeekdayKey; label: string }[] = [
    { key: "mon", label: "Mon" },
    { key: "tue", label: "Tue" },
    { key: "wed", label: "Wed" },
    { key: "thu", label: "Thu" },
    { key: "fri", label: "Fri" },
    { key: "sat", label: "Sat" },
    { key: "sun", label: "Sun" },
  ];

  const SERVICES = ["storage", "moving", "shredding"] as const;

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const data = await getAdminSettings();
        if (cancelled) return;
        setSettings(data);
        initialJsonRef.current = JSON.stringify(data);
      } catch (e) {
        if (cancelled) return;
        setSettings(FALLBACK_DEFAULT);
        initialJsonRef.current = JSON.stringify(FALLBACK_DEFAULT);
        setErrorMsg("Failed to load settings. Showing defaults.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [FALLBACK_DEFAULT]);

  const hasChanges = React.useMemo(() => {
    if (loading) return false;
    return JSON.stringify(settings) !== initialJsonRef.current;
  }, [settings, loading]);

  async function save() {
    setSaving(true);
    setErrorMsg(null);
    try {
      await saveAdminSettings(settings);
      initialJsonRef.current = JSON.stringify(settings);
      setSavedMsg("Saved.");
      window.setTimeout(() => setSavedMsg(null), 1500);
    } catch (e) {
      setErrorMsg("Save failed.");
      window.setTimeout(() => setErrorMsg(null), 2500);
    } finally {
      setSaving(false);
    }
  }

  async function reset() {
    // Reset to fallback defaults locally (and optionally save)
    setSettings(FALLBACK_DEFAULT);
    setSavedMsg("Reset to defaults (not saved).");
    window.setTimeout(() => setSavedMsg(null), 1500);
  }

  return (
    <main className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Settings</h1>
            <p className="text-xs text-slate-500">Stored in DB via server actions.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={reset}
              disabled={saving || loading}
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving || loading || !hasChanges}
              className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span
            className={`inline-flex rounded-full border px-2 py-1 font-semibold ${loading
              ? "bg-slate-50 text-slate-700 border-slate-200"
              : hasChanges
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
              }`}
          >
            {loading ? "Loading..." : hasChanges ? "Unsaved changes" : "All saved"}
          </span>
          {savedMsg ? <span className="text-slate-600">{savedMsg}</span> : null}
          {errorMsg ? <span className="text-rose-600 font-semibold">{errorMsg}</span> : null}
        </div>
      </div>

      {/* Service Toggles */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <SectionTitle title="Services" desc="Enable or disable services shown in the quote flow." />

        <div className="grid gap-3 sm:grid-cols-3">
          {(["storage", "moving", "shredding"] as const).map((k) => (
            <label
              key={k}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <span className="text-sm font-semibold capitalize text-slate-900">{k}</span>
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
            onChange={(n) => setSettings((s) => ({ ...s, packingAssistancePrice: n }))}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {typedEntries(settings.movingHomeTypePrice).map(([k, v]) => (
            <Field
              key={String(k)}
              label={String(k).replaceAll("-", " ")}
              value={v}
              suffix="£"
              onChange={(n) =>
                setSettings((s) => ({
                  ...s,
                  movingHomeTypePrice: { ...s.movingHomeTypePrice, [k]: n },
                }))
              }
            />
          ))}
        </div>
      </div>
      {/* Moving packages */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <SectionTitle
          title="Moving packages"
          desc="Set add-on package pricing (used for package selection in moving checkout)."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Basic package"
            value={settings.movingPackagePrices.basic_package}
            suffix="£"
            onChange={(n) =>
              setSettings((s) => ({
                ...s,
                movingPackagePrices: { ...s.movingPackagePrices, basic_package: n },
              }))
            }
          />

          <Field
            label="Move & Pack package"
            value={settings.movingPackagePrices.move_and_pack}
            suffix="£"
            onChange={(n) =>
              setSettings((s) => ({
                ...s,
                movingPackagePrices: { ...s.movingPackagePrices, move_and_pack: n },
              }))
            }
          />
        </div>
      </div>
      {/* Storage */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <SectionTitle title="Storage pricing" desc="Price per month per item + discounts." />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {typedEntries(settings.storagePricePerMonth).map(([k, v]) => (
            <Field
              key={String(k)}
              label={String(k).replaceAll("-", " ")}
              value={v}
              suffix="£ / mo"
              onChange={(n) =>
                setSettings((s) => ({
                  ...s,
                  storagePricePerMonth: { ...s.storagePricePerMonth, [k]: n },
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
                <span className="text-xs font-semibold text-slate-600">{d.months} months (% off)</span>
                <input
                  inputMode="numeric"
                  value={String(d.percentOff)}
                  onChange={(e) => {
                    const percentOff = num(e.target.value);
                    setSettings((s) => ({
                      ...s,
                      storageDiscounts: s.storageDiscounts.map((x, i) => (i === idx ? { ...x, percentOff } : x)),
                    }));
                  }}
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </label>
            ))}
          </div>
        </div>
        {/*moving and collection fee */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
          <SectionTitle title="Packing Material & Collection Fee" desc="Set the flat fee for moving and collection (storage orders)." />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Packing Material & Collection Fee"
              value={settings.movingAndCollectionFee}
              suffix="£"
              onChange={(n) => setSettings((s) => ({ ...s, movingAndCollectionFee: n }))}
            />
          </div>
        </div>
      </div>
      {/* Shredding */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <SectionTitle title="Shredding pricing" desc="Set unit prices for shredding items." />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Bag price"
            value={settings.shredding.bagPrice}
            suffix="£"
            onChange={(n) => setSettings((s) => ({ ...s, shredding: { ...s.shredding, bagPrice: n } }))}
          />
          <Field
            label="Archive box price"
            value={settings.shredding.archiveBoxPrice}
            suffix="£"
            onChange={(n) => setSettings((s) => ({ ...s, shredding: { ...s.shredding, archiveBoxPrice: n } }))}
          />
        </div>
      </div>

      {/* Time Slots */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <SectionTitle title="Time slots" desc="Control which time slots appear in the booking flow." />

        <div className="grid gap-3 sm:grid-cols-3">
          {settings.timeSlots.map((t, idx) => (
            <div key={t.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">{t.label}</div>
                <input
                  type="checkbox"
                  checked={t.enabled}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      timeSlots: s.timeSlots.map((x, i) => (i === idx ? { ...x, enabled: e.target.checked } : x)),
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
                      timeSlots: s.timeSlots.map((x, i) => (i === idx ? { ...x, label: e.target.value } : x)),
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
                      timeSlots: s.timeSlots.map((x, i) => (i === idx ? { ...x, range: e.target.value } : x)),
                    }))
                  }
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Weekday availability */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <SectionTitle title="Weekday availability (per service)" desc="Choose which weekdays can be booked for each service." />

        <div className="grid gap-3 lg:grid-cols-3">
          {SERVICES.map((svc) => (
            <div key={svc} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <div className="text-sm font-semibold capitalize text-slate-900">{svc}</div>

              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {WEEKDAYS.map((w) => (
                  <label
                    key={w.key}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2"
                  >
                    <span className="text-xs font-semibold text-slate-800">{w.label}</span>
                    <input
                      type="checkbox"
                      checked={settings.scheduling.weekdaysByService[svc][w.key]}
                      onChange={(e) =>
                        setSettings((s) => ({
                          ...s,
                          scheduling: {
                            ...s.scheduling,
                            weekdaysByService: {
                              ...s.scheduling.weekdaysByService,
                              [svc]: {
                                ...s.scheduling.weekdaysByService[svc],
                                [w.key]: e.target.checked,
                              },
                            },
                          },
                        }))
                      }
                      className="h-4 w-4"
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduling */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <SectionTitle title="Scheduling" desc="Control blackout dates and volume-based capacity limits." />

        {/* Blackout dates */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-900">Blackout dates</div>
              <p className="mt-1 text-xs text-slate-500">Disable booking for specific dates (YYYY-MM-DD).</p>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="date"
              value={newBlackoutDate}
              onChange={(e) => setNewBlackoutDate(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <button
              type="button"
              onClick={() => {
                const d = newBlackoutDate;
                if (!d) return;
                if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return;

                setSettings((s) => {
                  const existing = new Set(s.scheduling.blackoutDates);
                  existing.add(d);
                  return {
                    ...s,
                    scheduling: { ...s.scheduling, blackoutDates: Array.from(existing).sort() },
                  };
                });

                setNewBlackoutDate("");
              }}
              className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Add date
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {settings.scheduling.blackoutDates.length === 0 ? (
              <div className="text-xs text-slate-500">No blackout dates.</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {settings.scheduling.blackoutDates.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800"
                  >
                    {d}
                    <button
                      type="button"
                      onClick={() =>
                        setSettings((s) => ({
                          ...s,
                          scheduling: {
                            ...s.scheduling,
                            blackoutDates: s.scheduling.blackoutDates.filter((x) => x !== d),
                          },
                        }))
                      }
                      className="grid h-5 w-5 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      aria-label={`Remove ${d}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Capacity grid */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-sm font-semibold text-slate-900">Capacity per slot</div>
          <p className="mt-1 text-xs text-slate-500">Orders allowed per service per time slot.</p>

          <div className="mt-3 grid gap-3 lg:grid-cols-3">
            {(["storage", "moving", "shredding"] as const).map((svc) => (
              <div key={svc} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="text-sm font-semibold capitalize text-slate-900">{svc}</div>

                <div className="grid gap-3">
                  {(["morning", "afternoon", "evening"] as const).map((slot) => (
                    <label key={slot} className="grid gap-1">
                      <span className="text-xs font-semibold text-slate-600">{slot} cap</span>
                      <input
                        inputMode="numeric"
                        value={String(settings.scheduling.capacityPerService[svc][slot])}
                        onChange={(e) => {
                          const v = Math.max(0, num(e.target.value));
                          setSettings((s) => ({
                            ...s,
                            scheduling: {
                              ...s.scheduling,
                              capacityPerService: {
                                ...s.scheduling.capacityPerService,
                                [svc]: {
                                  ...s.scheduling.capacityPerService[svc],
                                  [slot]: v,
                                },
                              },
                            },
                          }));
                        }}
                        className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}