
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/src/lib/prisma";
import { assertInvoiceAdmin } from "@/app/lib/invoices/auth";
import { invoicePdf } from "@/app/lib/invoices/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    invoiceId: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  // Verify authorization before accessing invoice data.
  try {
    await assertInvoiceAdmin();
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  const { invoiceId } = await params;

  if (!invoiceId) {
    return NextResponse.json(
      { error: "Invoice ID is required." },
      { status: 400 }
    );
  }

  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
      include: {
        customer: {
          include: {
            billingAddress: true,
          },
        },
        items: true,
      },
    });

    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice not found." },
        { status: 404 }
      );
    }

    // Generate PDF using the existing invoice template.
    const pdfBytes = await invoicePdf(invoice);

    // Make the manually entered invoice number safe for filenames.
    const safeInvoiceNumber = invoice.invoiceNumber
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .slice(0, 100);

    const filename = `${safeInvoiceNumber || "invoice"}.pdf`;

    // Convert PDF bytes into a Node.js Buffer.
    const pdfBuffer = Buffer.from(pdfBytes);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",

        "Content-Disposition":
          `attachment; filename="${filename}"`,

        "Content-Length": String(pdfBuffer.byteLength),

        "Cache-Control": "private, no-store",

        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(
      "[GET /api/admin/invoices/[invoiceId]/pdf]",
      error
    );

    return NextResponse.json(
      { error: "Unable to generate invoice PDF." },
      { status: 500 }
    );
  }
}
