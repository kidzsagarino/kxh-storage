import React from "react";
import { DiscountMeta } from "../lib/discount";
import { useStorageCheckout, useMovingCheckout, useShreddingCheckout, useReturnCheckout } from "../components/checkout/CheckoutStore";

export function useDiscount(
  service: "storage" | "moving" | "shredding" | "return",
) {
  const [code, setCode] = React.useState("");
  const [discountMeta, setDiscountMeta] = React.useState<DiscountMeta | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  // Pick the correct checkout hook
  const checkoutMap = {
    storage: useStorageCheckout(),
    moving: useMovingCheckout(),
    shredding: useShreddingCheckout(),
    return: useReturnCheckout(),
  };

  const { setState } = checkoutMap[service];

  async function apply() {
    if (!code) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/discount/validate", {
        method: "POST",
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (data.error) {
        setDiscountMeta(null);
        setError(data.error);
        return;
      }

      setState((prev: any) => ({
        ...prev,
        discountMeta: data,
      }));

      setDiscountMeta(data);
    } catch (e) {
      setError("Something went wrong");
      setState((prev: any) => ({ ...prev, discountMeta: null }));
    } finally {
      setLoading(false);
    }
  }
  function remove() {
    clear();
  }

  function clear() {
    setCode("");
    setDiscountMeta(null);
    setState((prev: any) => ({ ...prev, discountMeta: null }));
    setError("");
  }

  return {
    code,
    setCode,
    discountMeta,
    error,
    loading,
    apply,
    remove,
    clear,
  };
}