"use server";
import { revalidatePath } from "next/cache";
import { InvoiceStatus, Prisma } from "@prisma/client";
import { Resend } from "resend";
import { prisma } from "@/src/lib/prisma";
import { assertInvoiceAdmin } from "@/app/lib/invoices/auth";
import {
  parseInvoice,
  type InvoiceInput,
} from "@/app/lib/invoices/validation";
import { invoicePdf } from "@/app/lib/invoices/pdf";
import { money } from "@/app/lib/invoices/config";
import { generateInvoiceNumber } from "@/app/lib/invoices/number";

type Result = { success: true; id: string } | { success: false; error: string };
const fail = (error: string): Result => ({ success: false, error });
function message(error: unknown) {
  if (error instanceof Error && error.message === "Unauthorized") return "Unauthorized";
  if (error instanceof Error && error.message === "Invalid date") return error.message;
  if (error instanceof Error && error.message.startsWith("Due date")) return error.message;
  if (error instanceof Error && error.message.startsWith("Invoice amount")) return error.message;
  if (error instanceof Error && error.name === "ZodError") return "Please check the invoice fields";
  return "Unable to complete invoice action";
}

export async function createInvoice(
  input: InvoiceInput
): Promise<Result> {
  try {
    await assertInvoiceAdmin();

    const data = parseInvoice(input);

    const customer = await prisma.customer.findUnique({
      where: {
        id: data.customerId,
      },
      select: {
        id: true,
      },
    });

    if (!customer) {
      return fail("Customer not found");
    }

    const invoice = await withTransactionRetry(() =>
      prisma.$transaction(
        async (tx) => {
          // Generate a unique sequential invoice number.
          const invoiceNumber =
            await generateInvoiceNumber(tx);

          // Create invoice and its items atomically.
          return tx.invoice.create({
            data: {
              invoiceNumber,
              customerId: data.customerId,
              invoiceDate: data.invoiceDate,
              dueDate: data.dueDate,

              subtotalMinor: data.subtotalMinor,
              taxPercent: data.taxPercent,
              taxMinor: data.taxMinor,
              totalMinor: data.totalMinor,

              notes: data.notes || null,
              terms: data.terms || null,

              items: {
                create: data.items,
              },
            },
            select: {
              id: true,
              invoiceNumber: true,
            },
          });
        },
        {
          isolationLevel:
            Prisma.TransactionIsolationLevel.Serializable,
        }
      )
    );

    revalidatePath("/admin/invoices");

    return {
      success: true,
      id: invoice.id,
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return fail(
        "Invoice number conflict. Check the invoice counter and existing invoice numbers."
      );
    }

    console.error("[invoice create]", error);

    return fail(message(error));
  }
}

export async function updateInvoice(id: string, input: InvoiceInput): Promise<Result> {
  try {
    await assertInvoiceAdmin();
    const data = parseInvoice(input);
    const customer = await prisma.customer.findUnique({ where: { id: data.customerId }, select: { id: true } });
    if (!customer) return fail("Customer not found");
    await prisma.$transaction(async tx => {
      const invoice = await tx.invoice.findUnique({ where: { id }, select: { status: true } });
      if (!invoice) throw new Error("Invoice not found");
      if (invoice.status !== InvoiceStatus.DRAFT) throw new Error("Paid or void invoices cannot be edited");
      await tx.invoiceItem.deleteMany({ where: { invoiceId: id } });
      await tx.invoice.update({
        where: { id }, data: {
          customerId: data.customerId, invoiceDate: data.invoiceDate, dueDate: data.dueDate,
          subtotalMinor: data.subtotalMinor,
          taxPercent: data.taxPercent,
          taxMinor: data.taxMinor,
          totalMinor: data.totalMinor,
          notes: data.notes || null, terms: data.terms || null,
          items: { create: data.items },
        }
      });
    });
    revalidatePath("/admin/invoices"); revalidatePath(`/admin/invoices/${id}`);
    return { success: true, id };
  } catch (error) { console.error("[invoice update]", error); return fail(error instanceof Error && /cannot be edited|not found/.test(error.message) ? error.message : message(error)); }
}
export async function changeInvoiceStatus(id: string, status: "PAID" | "VOID"): Promise<Result> {
  try {
    await assertInvoiceAdmin();
    const invoice = await prisma.invoice.findUnique({ where: { id }, select: { status: true } });
    if (!invoice) return fail("Invoice not found");
    if (invoice.status === "PAID" || invoice.status === "VOID") return fail("This invoice is final");
    const result = await prisma.invoice.updateMany({ where: { id, status: { in: ["DRAFT", "SENT"] } }, data: { status, paidAt: status === "PAID" ? new Date() : null } });
    if (!result.count) return fail("Invoice was already updated");
    revalidatePath("/admin/invoices"); revalidatePath(`/admin/invoices/${id}`);
    return { success: true, id };
  } catch (error) { console.error("[invoice status]", error); return fail(message(error)); }
}
export async function sendInvoice(id: string): Promise<Result> {
  try {
    await assertInvoiceAdmin();
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: {
          include: {
            billingAddress: true,
          },
        },
        items: true,
      },
    });

    if (!invoice) return fail("Invoice not found");
    if (invoice.status === "VOID") return fail("Cannot send a void invoice");
    if (invoice.status === "PAID") return fail("Paid invoice cannot be sent as a payment request");
    if (!invoice.customer.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invoice.customer.email)) return fail("Customer has no valid email");
    const from = process.env.INVOICE_FROM_EMAIL;
    const key = process.env.RESEND_API_KEY;
    if (!from || !key) return fail("Email service is not configured");
    const bytes = await invoicePdf(invoice);
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from, to: invoice.customer.email,
      subject: `Invoice ${invoice.invoiceNumber} - KXH Storage & Logistics`,
      text: `Hello ${invoice.customer.fullName},\n\nPlease find attached invoice ${invoice.invoiceNumber} for ${money(invoice.totalMinor)}.\n\nThank you,\nKXH Storage & Logistics`,
      attachments: [{ filename: `${invoice.invoiceNumber}.pdf`, content: Buffer.from(bytes) }],
    });
    if (error) { console.error("[invoice email provider]", error); return fail("Email provider rejected the message"); }
    await prisma.invoice.updateMany({ where: { id, status: "DRAFT" }, data: { status: "SENT", sentAt: new Date() } });
    revalidatePath("/admin/invoices"); revalidatePath(`/admin/invoices/${id}`);
    return { success: true, id };
  } catch (error) { console.error("[invoice email]", error); return fail(message(error)); }
}

async function withTransactionRetry<T>(
  operation: () => Promise<T>
): Promise<T> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const retryable =
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034";

      if (!retryable || attempt === 2) {
        throw error;
      }
    }
  }

  throw new Error("Transaction failed");
}
