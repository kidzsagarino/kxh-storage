"use client";

import React, { useRef } from "react";
import { useCheckout, type ServiceType } from "./checkout/CheckoutStore";


export function HeroQuoteBar() {
  const { state, setServiceType, setState } = useCheckout();
  const postcodeRef = useRef<HTMLInputElement>(null);

  function applyPostcode(service: ServiceType, postcode: string) {
    setState((s) => {
      if (service === "storage") {
        return {
          ...s,
          storage: {
            ...s.storage,
            customerDetails: {
              ...s.storage.customerDetails,
              postalCode: postcode,
            },
          },
        };
      }

      if (service === "moving") {
        return {
          ...s,
          moving: {
            ...s.moving,
            customerDetails: {
              ...s.moving.customerDetails,
              postalCode: postcode,
            },
          },
        };
      }

      // shredding
      return {
        ...s,
        shredding: {
          ...s.shredding,
          customerDetails: {
            ...s.shredding.customerDetails,
            postalCode: postcode,
          },
        },
      };
    });
  }

  function onGetQuote() {
    const postcode = (postcodeRef.current?.value ?? "").trim();
    if (!postcode) {
      postcodeRef.current?.focus();
      return;
    }

    const service = state.serviceType;

    applyPostcode(service, postcode);

    document.getElementById("pricing")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Top label */}
      <p className="mb-3 text-sm font-semibold text-slate-700">
        Need help with...
      </p>

      {/* Row 1: service + postcode */}
      <div className="grid gap-3 md:grid-cols-2">
        {/* Service select */}
        <div className="relative">
          <label className="sr-only" htmlFor="hero-service">
            What do you need help with?
          </label>

          <select
            id="hero-service"
            value={state.serviceType}
            onChange={(e) => setServiceType(e.target.value as ServiceType)}
            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-11 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-200"
          >
            <option value="storage">Storage</option>
            <option value="moving">Packing and Moving</option>
            <option value="shredding">Shredding</option>
          </select>

          {/* caret */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
            ▾
          </div>

          {/* divider */}
          <div className="pointer-events-none absolute right-10 top-1/2 h-6 w-px -translate-y-1/2 bg-slate-200" />
        </div>

        {/* Postcode input */}
        <div className="relative">
          <label className="sr-only" htmlFor="hero-postcode">
            Enter Postcode
          </label>

          <input
            ref={postcodeRef}
            id="hero-postcode"
            placeholder="Enter Postcode"
            autoComplete="postal-code"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-3 pr-12 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-200"
          />

          <button
            type="button"
            aria-label="Use location"
            className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            ⦿
          </button>
        </div>
      </div>

      {/* Row 2: actions */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onGetQuote}
          className="h-11 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Get Quote
        </button>

        <a
          href="tel:+441474396663"
          className="h-11 rounded-xl bg-[#4CAF50] px-4 text-sm font-semibold text-white inline-flex items-center justify-center gap-2 hover:bg-[#45A049]"
        >
          Call Us
        </a>
      </div>
    </div>
  );
}
