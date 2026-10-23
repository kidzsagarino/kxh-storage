"use client";

import { useEffect } from "react";
import { useCheckout } from "@/app/components/checkout/CheckoutStore";


export default function ClientLanding({ initialData }: { initialData: any }) {
  const { setOrderFlow } = useCheckout();

  useEffect(() => {
    setOrderFlow(initialData);
  }, [initialData, setOrderFlow]);

  return null;
}
