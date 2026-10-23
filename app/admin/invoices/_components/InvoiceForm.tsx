
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createInvoice, updateInvoice } from "../actions";
import type { InvoiceInput } from "@/app/lib/invoices/validation";
import { money } from "@/app/lib/invoices/config";
import AddCustomerModal from "./AddCustomerModal";
import type { CustomerOption } from "@/app/admin/invoices/customer-action";

type EditInvoice = InvoiceInput & {
  id: string;
};

const dateToday = () =>
  new Date().toLocaleDateString("en-CA", {
    timeZone: "Europe/London",
  });

const fieldClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass =
  "block space-y-2 text-sm font-semibold text-slate-700";

const cardClass =
  "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6";

export default function InvoiceForm({
  customers,
  invoice,
}: {
  customers: CustomerOption[];
  invoice?: EditInvoice;
}) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [customerOptions, setCustomerOptions] =
    useState<CustomerOption[]>(customers);

  const [form, setForm] = useState<InvoiceInput>(
    invoice ?? {
      invoiceNumber: "",
      customerId: "",
      invoiceDate: dateToday(),
      dueDate: dateToday(),
      taxPercent: 0,
      notes: "Thanks for your business.",
      terms: "Please pay by the due date.",
      items: [
        {
          description: "",
          quantity: 1,
          unitPriceMinor: 0,
        },
      ],
    }
  );

  const update = <K extends keyof InvoiceInput>(
    key: K,
    value: InvoiceInput[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const changeItem = (
    index: number,
    key: "description" | "quantity" | "unitPriceMinor",
    value: string | number
  ) => {
    setForm((previous) => ({
      ...previous,
      items: previous.items.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const subtotal = form.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPriceMinor,
    0
  );

  const tax = Math.round(
    (subtotal * form.taxPercent) / 100
  );

  const total = subtotal + tax;

  function handleCustomerCreated(customer: CustomerOption) {
    setCustomerOptions((previous) => {
      const updated = previous.filter(
        (item) => item.id !== customer.id
      );

      return [...updated, customer].sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
    });

    setForm((previous) => ({
      ...previous,
      customerId: customer.id,
    }));

    setError("");
  }

  function save() {
    setError("");

    // if (!form.invoiceNumber.trim()) {
    //   setError("Please enter an invoice number.");
    //   return;
    // }

    if (!form.customerId.trim()) {
      setError("Please select a customer.");
      return;
    }

    if (form.items.length === 0) {
      setError("Please add at least one invoice item.");
      return;
    }

    if (
      form.items.some(
        (item) => !item.description.trim()
      )
    ) {
      setError(
        "Please enter a description for every invoice item."
      );
      return;
    }

    if (
      form.items.some(
        (item) =>
          !Number.isInteger(item.quantity) ||
          item.quantity < 1 ||
          !Number.isSafeInteger(item.unitPriceMinor) ||
          item.unitPriceMinor < 0
      )
    ) {
      setError("Please check the item quantities and prices.");
      return;
    }

    if (
      !Number.isInteger(form.taxPercent) ||
      form.taxPercent < 0 ||
      form.taxPercent > 100
    ) {
      setError(
        "Tax must be a whole percentage between 0 and 100."
      );
      return;
    }

    if (form.dueDate < form.invoiceDate) {
      setError("Due date cannot precede invoice date.");
      return;
    }

    startTransition(async () => {
      try {
        const result = invoice
          ? await updateInvoice(invoice.id, form)
          : await createInvoice(form);

        if (!result.success) {
          setError(result.error);
          return;
        }

        router.push(`/admin/invoices/${result.id}`);
        router.refresh();
      } catch (error) {
        console.error("[InvoiceForm]", error);
        setError("Unable to save invoice. Please retry.");
      }
    });
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {invoice ? "Edit Invoice" : "New Invoice"}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {invoice
            ? "Update the invoice details below."
            : "Create a new invoice for your customer."}
        </p>
      </div>

      <div className="space-y-6">
        {/* Invoice Information */}
        <div className={cardClass}>
          <div className="mb-5 border-b border-slate-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Invoice Information
            </h2>
          </div>

          <div className="space-y-5">
            <label className={labelClass}>
              Invoice Number *

              <input
                type="text"
                className={`${fieldClass} ${
                  invoice ? "bg-slate-50 text-slate-500" : ""
                }`}
                value={form.invoiceNumber}
                onChange={(e) =>
                  update("invoiceNumber", e.target.value)
                }
                placeholder="e.g. INV-0050"
                maxLength={50}
                required
                readOnly={true}
                
              />

              <span className="block text-xs font-normal text-slate-500">
                Enter a unique invoice number.
              </span>
            </label>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label
                  htmlFor="customerId"
                  className="text-sm font-semibold text-slate-700"
                >
                  Customer *
                </label>

                <AddCustomerModal
                  onCreated={handleCustomerCreated}
                />
              </div>

              <select
                id="customerId"
                value={form.customerId}
                onChange={(e) =>
                  update("customerId", e.target.value)
                }
                required
                className={fieldClass}
              >
                <option value="">Select customer</option>

                {customerOptions.map((customer) => (
                  <option
                    key={customer.id}
                    value={customer.id}
                  >
                    {customer.fullName}
                    {customer.email
                      ? ` — ${customer.email}`
                      : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Invoice Date

                <input
                  className={fieldClass}
                  type="date"
                  value={form.invoiceDate}
                  onChange={(e) =>
                    update("invoiceDate", e.target.value)
                  }
                />
              </label>

              <label className={labelClass}>
                Due Date

                <input
                  className={fieldClass}
                  type="date"
                  value={form.dueDate}
                  onChange={(e) =>
                    update("dueDate", e.target.value)
                  }
                />
              </label>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className={cardClass}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Invoice Items
            </h2>

            <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
              {form.items.length}{" "}
              {form.items.length === 1 ? "Item" : "Items"}
            </span>
          </div>

          <div className="space-y-4">
            {form.items.map((item, index) => (
              <div
                key={index}
                className="space-y-4 rounded-xl border border-slate-300 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-700">
                    Item {index + 1}
                  </h3>

                  <button
                    type="button"
                    aria-label={`Remove item ${index + 1}`}
                    disabled={form.items.length === 1}
                    onClick={() =>
                      update(
                        "items",
                        form.items.filter(
                          (_, i) => i !== index
                        )
                      )
                    }
                    className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Remove
                  </button>
                </div>

                <label className={labelClass}>
                  Description *

                  <input
                    className={fieldClass}
                    placeholder="e.g. Storage service"
                    value={item.description}
                    maxLength={500}
                    required
                    onChange={(e) =>
                      changeItem(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className={labelClass}>
                    Quantity

                    <input
                      className={fieldClass}
                      type="number"
                      min={1}
                      step={1}
                      value={item.quantity}
                      onChange={(e) =>
                        changeItem(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />
                  </label>

                  <label className={labelClass}>
                    Unit Price (£)

                    <input
                      className={fieldClass}
                      type="number"
                      min={0}
                      step="0.01"
                      value={item.unitPriceMinor / 100}
                      onChange={(e) =>
                        changeItem(
                          index,
                          "unitPriceMinor",
                          Math.round(
                            Number(e.target.value) * 100
                          )
                        )
                      }
                    />
                  </label>
                </div>

                <div className="flex justify-between border-t border-slate-200 pt-3 text-sm">
                  <span className="text-slate-500">
                    Line Total
                  </span>

                  <span className="font-bold text-slate-900">
                    {money(
                      item.quantity * item.unitPriceMinor
                    )}
                  </span>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                update("items", [
                  ...form.items,
                  {
                    description: "",
                    quantity: 1,
                    unitPriceMinor: 0,
                  },
                ])
              }
              className="w-full rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition-colors hover:border-blue-500 hover:bg-blue-100"
            >
              + Add Item
            </button>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className={cardClass}>
          <div className="mb-5 border-b border-slate-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Invoice Summary
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-slate-600">
                Subtotal
              </span>

              <strong>{money(subtotal)}</strong>
            </div>

            <label className="flex items-center justify-between gap-4 text-sm font-medium text-slate-700">
              Tax (%)

              <input
                aria-label="Tax percentage"
                className="w-28 rounded-xl border border-slate-300 bg-white px-3 py-2 text-right text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="number"
                min={0}
                max={100}
                step={1}
                value={form.taxPercent}
                onChange={(e) =>
                  update(
                    "taxPercent",
                    Number(e.target.value)
                  )
                }
              />
            </label>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-slate-600">
                Tax Amount
              </span>

              <strong>{money(tax)}</strong>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <span className="text-lg font-bold text-slate-900">
                Total GBP
              </span>

              <span className="text-xl font-bold text-blue-700">
                {money(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className={cardClass}>
          <div className="mb-5 border-b border-slate-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Additional Information
            </h2>
          </div>

          <div className="space-y-5">
            <label className={labelClass}>
              Notes

              <textarea
                className={fieldClass}
                rows={3}
                maxLength={3000}
                value={form.notes}
                onChange={(e) =>
                  update("notes", e.target.value)
                }
              />
            </label>

            <label className={labelClass}>
              Terms &amp; Conditions

              <textarea
                className={fieldClass}
                rows={3}
                maxLength={3000}
                value={form.terms}
                onChange={(e) =>
                  update("terms", e.target.value)
                }
              />
            </label>
          </div>
        </div>

        {/* Errors */}
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {/* Save */}
        <button
          type="button"
          disabled={pending}
          onClick={save}
          className="w-full rounded-xl border border-blue-700 bg-emerald-800 px-5 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending
            ? "Saving..."
            : invoice
              ? "Save Changes"
              : "Generate Invoice"}
        </button>
      </div>
    </section>
  );
}
