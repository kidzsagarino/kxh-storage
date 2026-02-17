"use client";

import { useEffect } from "react";
import { MovingForm } from "@/app/components/ServicesForm/MovingServiceFlow";
import { StorageForm } from "@/app/components/ServicesForm/StorageServiceFlow";
import { ShreddingForm } from "@/app/components/ServicesForm/ShreddingServiceFlow";
import { useCheckout } from "@/app/components/checkout/CheckoutStore";


export default function ClientCheckout({ initialData }: { initialData: any }) {
  const { state, setOrderFlow } = useCheckout();

  useEffect(() => {
    setOrderFlow(initialData);
  }, [initialData, setOrderFlow]);

  return (
    <>
      {state.serviceType === "storage" && <StorageForm onProceed={async()=>{}} error={''} busy={false} />}
      {state.serviceType === "moving" && <MovingForm onProceed={async()=>{}} error={''} busy={false}/>}
      {state.serviceType === "shredding" && <ShreddingForm onProceed={async()=>{}} error={''} busy={false}/>}
    </>
  );
}
