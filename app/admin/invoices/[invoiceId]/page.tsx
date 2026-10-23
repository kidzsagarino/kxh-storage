
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { assertInvoiceAdmin } from "@/app/lib/invoices/auth";
import {
  money,
  displayDate,
  INVOICE_BUSINESS,
} from "@/app/lib/invoices/config";

import InvoiceActions from "../_components/InvoiceActions";
import InvoiceForm from "../_components/InvoiceForm";

type PageProps = {
  params: Promise<{
    invoiceId: string;
  }>;
};

function countryName(code: string): string {
  try {
    return (
      new Intl.DisplayNames(["en"], {
        type: "region",
      }).of(code) ?? code
    );
  } catch {
    return code;
  }
}

export default async function InvoicePage({
  params,
}: PageProps) {
  await assertInvoiceAdmin();

  const { invoiceId } = await params;

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
    notFound();
  }

  const isDraft = invoice.status === "DRAFT";

  const customers = isDraft
    ? await prisma.customer.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
      },
      orderBy: {
        fullName: "asc",
      },
    })
    : [];

  const billingAddress = invoice.customer.billingAddress;

  return (
    <div className="space-y-5">
      {/* Back navigation */}
      <div className="print:hidden">
        <Link
          href="/admin/invoices"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← All invoices
        </Link>
      </div>

      {/* Page heading and actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {invoice.invoiceNumber}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Status: {invoice.status}
          </p>
        </div>

        <InvoiceActions
          id={invoice.id}
          status={invoice.status}
        />
      </div>

      {/* Printable invoice */}
      <article className="mx-auto max-w-3xl space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:border-0 print:p-0 print:shadow-none sm:p-10">
        {/* Business header */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {INVOICE_BUSINESS.name}
            </h2>

            <div className="mt-2 text-sm leading-6 text-slate-500">
              {INVOICE_BUSINESS.address.map((line, index) => (
                <p key={`${index}-${line}`}>{line}</p>
              ))}
            </div>
          </div>

          <div className="text-left sm:text-right">
            <h2 className="text-3xl font-bold tracking-wide text-slate-900">
              INVOICE
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {invoice.invoiceNumber}
            </p>
          </div>
        </div>

        {/* Customer and invoice information */}
        <div className="grid gap-8 border-t border-slate-200 pt-7 sm:grid-cols-2">
          {/* Bill To */}
          <div className="space-y-2 text-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Bill To
            </h3>

            <p className="font-semibold text-slate-900">
              {invoice.customer.fullName}
            </p>

            {billingAddress && (
              <div className="space-y-1 text-slate-600">
                <p>{billingAddress.line1}</p>

                {billingAddress.line2 && (
                  <p>{billingAddress.line2}</p>
                )}

                <p>{billingAddress.city}</p>

                <p>{billingAddress.postalCode}</p>

                <p>{countryName(billingAddress.country)}</p>
              </div>
            )}

            
          </div>

          {/* Invoice metadata */}
          <div className="space-y-3 text-sm sm:text-right">
            <div>
              <p className="text-xs text-slate-500">
                Invoice Number
              </p>

              <p className="font-semibold text-slate-900">
                {invoice.invoiceNumber}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Invoice Date
              </p>

              <p className="font-medium">
                {displayDate(invoice.invoiceDate)}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Due Date
              </p>

              <p className="font-medium">
                {displayDate(invoice.dueDate)}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Status
              </p>

              <p className="font-semibold">
                {invoice.status}
              </p>
            </div>
          </div>
        </div>

        {/* Invoice items */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="p-3 font-semibold">
                  Item
                </th>

                <th className="p-3 text-right font-semibold">
                  Qty
                </th>

                <th className="p-3 text-right font-semibold">
                  Rate
                </th>

                <th className="p-3 text-right font-semibold">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {invoice.items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100"
                >
                  <td className="max-w-xs break-words p-3 align-top">
                    {item.description}
                  </td>

                  <td className="p-3 text-right align-top">
                    {item.quantity}
                  </td>

                  <td className="whitespace-nowrap p-3 text-right align-top">
                    {money(item.unitPriceMinor)}
                  </td>

                  <td className="whitespace-nowrap p-3 text-right align-top font-medium">
                    {money(item.totalMinor)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="ml-auto w-full max-w-xs space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-slate-600">
              Subtotal
            </span>

            <span>{money(invoice.subtotalMinor)}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-slate-600">
              Tax ({invoice.taxPercent}%)
            </span>

            <span>{money(invoice.taxMinor)}</span>
          </div>

          <div className="flex justify-between gap-4 border-t border-slate-200 pt-4 text-lg font-bold">
            <span>Total</span>

            <span>{money(invoice.totalMinor)}</span>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <section className="border-t border-slate-200 pt-6">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Notes
            </h3>

            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
              {invoice.notes}
            </p>
          </section>
        )}

        {/* Terms and conditions */}
        {invoice.terms && (
          <section className="border-t border-slate-200 pt-6">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Terms &amp; Conditions
            </h3>

            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
              {invoice.terms}
            </p>
          </section>
        )}
      </article>

      {/* Edit draft invoice */}
      {isDraft && (
        <details className="rounded-xl border border-slate-200 bg-white p-4 print:hidden">
          <summary className="cursor-pointer font-semibold text-slate-900">
            Edit Invoice
          </summary>

          <div className="pt-5">
            <InvoiceForm
              customers={customers}
              invoice={{
                id: invoice.id,
                invoiceNumber: invoice.invoiceNumber,
                customerId: invoice.customerId,
                invoiceDate: invoice.invoiceDate
                  .toISOString()
                  .slice(0, 10),
                dueDate: invoice.dueDate
                  .toISOString()
                  .slice(0, 10),
                taxPercent: invoice.taxPercent,
                notes: invoice.notes ?? "",
                terms: invoice.terms ?? "",
                items: invoice.items.map((item) => ({
                  description: item.description,
                  quantity: item.quantity,
                  unitPriceMinor: item.unitPriceMinor,
                })),
              }}
            />
          </div>
        </details>
      )}
    </div>
  );
}
