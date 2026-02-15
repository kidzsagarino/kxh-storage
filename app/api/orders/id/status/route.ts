import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(
  _req: NextRequest,
  ctx : { params: { id: string } }
) {
  const order = await prisma.order.findUnique({
    where: { id: ctx.params.id },
    select: {
      id: true,
      status: true,
      orderNumber: true,
      totalMinor: true,
      currency: true,
    },
  });

  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(order);
}
