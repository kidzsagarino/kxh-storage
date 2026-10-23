import { loadOrderFlow } from "@/server/order-flow/loadOrderFlow";
import ClientCheckout from "./ClientCheckout";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const data = await loadOrderFlow("GBP");
  return <ClientCheckout initialData={data} />;
}
