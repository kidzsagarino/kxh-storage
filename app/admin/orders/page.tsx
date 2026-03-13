import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth-options";
import AdminOrdersClient from "./AdminOrdersClient";

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/orders");
  }

  if ((session.user as any).role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin/orders");
  }

  return <AdminOrdersClient />;
}