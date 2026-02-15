import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/src/lib/prisma";
type Ctx = { params: Promise<{ id: string }> };

export async function GET(
  _req: NextRequest,
  ctx: Ctx
) {
  const { id } = await ctx.params;
  const order = await prisma.order.findUnique({
    where: { id: id },
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
