
import Link from "next/link";
import {
  FileText,
  Plus,
  ArrowUpRight,
  Receipt,
} from "lucide-react";

import { prisma } from "@/src/lib/prisma";
import { assertInvoiceAdmin } from "@/app/lib/invoices/auth";
import {
  money,
  displayDate,
} from "@/app/lib/invoices/config";

type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "VOID";

const statusStyles: Record<InvoiceStatus, string> = {
  DRAFT:
    "border-slate-300 bg-slate-100 text-slate-700",
  SENT:
    "border-blue-200 bg-blue-50 text-blue-700",
  PAID:
    "border-emerald-200 bg-emerald-50 text-emerald-800",
  VOID:
    "border-red-200 bg-red-50 text-red-700",
};

export default async function InvoicesPage() {
  await assertInvoiceAdmin();

  const invoices = await prisma.invoice.findMany({
    take: 100,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      customer: {
        select: {
          fullName: true,
        },
      },
    },
  });

  return (
    <section className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50">
              <Receipt className="h-5 w-5 text-emerald-800" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Invoices
              </h1>

              <p className="text-sm text-slate-500">
                Manual GBP invoices · Latest 100
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/admin/invoices/new"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-900 bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          New Invoice
        </Link>
      </div>

      {/* Invoice table card */}
      <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
        {/* Table heading */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-800" />

            <h2 className="text-sm font-bold text-slate-900">
              Invoice Records
            </h2>
          </div>

          <span className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
            {invoices.length}{" "}
            {invoices.length === 1
              ? "Invoice"
              : "Invoices"}
          </span>
        </div>

        {invoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="text-slate-900">
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-4 font-semibold"
                  >
                    Invoice
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-4 font-semibold"
                  >
                    Customer
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-4 font-semibold"
                  >
                    Due Date
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-4 text-right font-semibold"
                  >
                    Amount
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-4 text-center font-semibold"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-4 text-right font-semibold"
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="transition-colors hover:bg-emerald-50/50"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/invoices/${invoice.id}`}
                        className="font-semibold text-emerald-800 hover:text-emerald-900 hover:underline"
                      >
                        {invoice.invoiceNumber}
                      </Link>
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-800">
                      {invoice.customer.fullName}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {displayDate(invoice.dueDate)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-right font-semibold tabular-nums text-slate-900">
                      {money(invoice.totalMinor)}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                          statusStyles[invoice.status]
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/invoices/${invoice.id}`}
                        aria-label={`View invoice ${invoice.invoiceNumber}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800"
                      >
                        View
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50">
              <FileText className="h-8 w-8 text-emerald-800" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              No invoices yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Create your first invoice to start tracking
              customer billing and payments.
            </p>

            <Link
              href="/admin/invoices/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-emerald-900 bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
            >
              <Plus className="h-4 w-4" />
              Create Invoice
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
