import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import AdminPaymentByIdClient from "./AdminPaymentByIDClient";

export default async function AdminPaymentByIdPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/orders");
  }

  if ((session.user as any).role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin/orders");

  }

  return <AdminPaymentByIdClient />;
}
