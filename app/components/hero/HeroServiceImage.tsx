"use client";
import { useCheckout } from "../checkout/CheckoutStore";

import { HERO_BY_SERVICE } from "./hero.config";

export function HeroServiceImage() {
  const { state } = useCheckout();
  const hero = HERO_BY_SERVICE[state.serviceType];

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/50 via-slate-900/10 to-slate-950/10" />

      {/* Image */}
      <img
        src={hero.image}
        alt={hero.alt}
          className="h-[480px] lg:h-[520px] w-full object-cover"

      />

      {/* Bottom info strip */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {hero.secondaryPill && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/85 px-4 py-2 text-xs font-semibold text-slate-800 shadow-lg backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {hero.secondaryPill}
            </span>
          )}

          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-900/20">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            {hero.primaryPill}
          </span>
        </div>
      </div>

      {/* Optional subtle top label */}
      <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
        <div className="rounded-full border border-white/15 bg-slate-900/35 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/95 backdrop-blur">
          KXH Logistics
        </div>
      </div>
    </div>
  );
}
