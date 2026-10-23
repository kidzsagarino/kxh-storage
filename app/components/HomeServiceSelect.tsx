"use client";

import React from "react";
import { useCheckout, type ServiceType } from "./checkout/CheckoutStore";

export function HeroServiceSelect() {
  const { state, setServiceType } = useCheckout();

  return (
    <select
      id="need"
      name="need"
      value={state.serviceType}
      onChange={(e) => {
        const v = e.target.value as ServiceType;
        setServiceType(v);
        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-11 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-200"
    >
      <option value="storage">Storage</option>
      <option value="moving">Packing and Moving</option>
      <option value="shredding">Shredding</option>
    </select>
  );
}
