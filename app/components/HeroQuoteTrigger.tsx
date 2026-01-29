"use client";

import React from "react";
import { useCheckout } from "./checkout/CheckoutStore";

export function HeroQuoteTrigger({
  getPostcode,
}: {
  getPostcode: () => string;
}) {
  const { state, setServiceType, setState } = useCheckout();

  function onClick() {
    const postcode = getPostcode().trim();
    if (!postcode) return;

    setServiceType(state.serviceType);

    // write postcode into the active service slice
    setState((s) => {
      if (state.serviceType === "storage") {
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

      if (state.serviceType === "moving") {
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

      if (state.serviceType === "shredding") {
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
      }

      return s;
    });

    // jump to pricing
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white"
    >
      Get Quote
    </button>
  );
}
