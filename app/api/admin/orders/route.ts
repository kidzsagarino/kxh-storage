import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ message: "Get all orders" });
}
export async function DELETE(request: Request) {
  return NextResponse.json({ message: "Delete all orders" });
}