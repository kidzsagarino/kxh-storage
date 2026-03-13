import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import AdminSettingsClient from "./AdminSettingsClient";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login?callbackUrl=/admin/orders");
  }

  if ((session.user as any).role !== "ADMIN") {
    redirect("/admin/login?callbackUrl=/admin/orders");
  }
  
  return <AdminSettingsClient />;
}