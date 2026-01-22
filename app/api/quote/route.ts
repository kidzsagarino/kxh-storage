import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const need = String(form.get("need") || "");
  const postcode = String(form.get("postcode") || "");

  // TODO: send to your DB, email, CRM, or webhook (e.g., Slack/Make/Zapier)
  // For now we just return a success message.
  return NextResponse.json({
    ok: true,
    message: "Quote request received",
    data: { need, postcode },
  });
}