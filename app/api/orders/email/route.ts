import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

function isPlaceholderEmail(email?: string | null) {
  if (!email) return true;
  const e = email.trim().toLowerCase();
  return e.endsWith("@placeholder.com") || e.startsWith("draft-");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { customer: { select: { email: true } } },
  });

  const email = order?.customer?.email ?? null;

  return NextResponse.json(
    {
      email,
      ready: email ? !isPlaceholderEmail(email) : false,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}