import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth-options";

export async function assertInvoiceAdmin() {
  const session = await getServerSession(authOptions);

  if (
    !session?.user ||
    (session.user as { role?: string }).role !== "ADMIN"
  ) {
    throw new Error("Unauthorized");
  }
}