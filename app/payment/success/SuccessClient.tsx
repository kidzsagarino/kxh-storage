"use client";

import { useEffect, useState } from "react";

type OrderStatusResponse = {
  id: string;
  status: string;
  orderNumber: string;
  totalMinor: number;
  currency: string;
};

export function SuccessClient({ orderId }: { orderId: string }) {
  const [data, setData] = useState<OrderStatusResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const res = await fetch(`/api/orders/${orderId}/status`, { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error ?? "Failed to load status");
        if (alive) setData(json);
      } catch (e: any) {
        if (alive) setErr(e.message);
      }
    }

    load();
    const t = setInterval(load, 2000); // poll every 2s
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [orderId]);

  if (err) return <div className="text-sm text-rose-600">{err}</div>;
  if (!data) return <div className="text-sm text-slate-600">Checking order status…</div>;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-slate-600">Status</span>
        <span className="font-semibold text-slate-900">{data.status}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-slate-600">Order #</span>
        <span className="font-mono text-slate-900">{data.orderNumber}</span>
      </div>
    </div>
  );
}
