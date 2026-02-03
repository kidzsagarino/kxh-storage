import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;

  return NextResponse.json({ message: "ok", id });
}
