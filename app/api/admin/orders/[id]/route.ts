import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  return NextResponse.json({ message: `Order ID: ${id}` });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  return NextResponse.json({ message: `Delete Order ID: ${id}` });
}