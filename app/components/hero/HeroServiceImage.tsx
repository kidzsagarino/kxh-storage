"use client";
import { useCheckout } from "../checkout/CheckoutStore";

import { HERO_BY_SERVICE } from "./hero.config";

export function HeroServiceImage() {
  const { state } = useCheckout();
  const hero = HERO_BY_SERVICE[state.serviceType];

  return (
    <div className="relative">
      {/* Image */}
      <img
        src={hero.image}
        alt={hero.alt}
        className="h-[420px] w-full rounded-2xl object-cover shadow-xl lg:h-[480px]"
      />

      {/* Pills */}
      <div className=" absolute z-20 flex flex-wrap gap-2 bottom-4 left-4 right-4 sm:top-4 sm:bottom-auto">
        {/* Secondary (lighter) */}
        {hero.secondaryPill && (
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-3 py-1 text-xs font-medium text-emerald-700 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {hero.secondaryPill}
          </span>
        )}

        {/* Primary (stronger) */}
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
          <span className="h-2 w-2 rounded-full bg-white" />
          {hero.primaryPill}
        </span>
      </div>
    </div>
  );
}
