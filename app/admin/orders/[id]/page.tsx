import { authOptions } from "@/app/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminOrderByIdClient from "./AdminOrderByIDClient";

export default async function AdminOrderByIdPage() {

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/orders");
  }

  if ((session.user as any).role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin/orders");
  }

  return <AdminOrderByIdClient />;
}