
"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

import { createPortal } from "react-dom";

import {
  createInvoiceCustomer,
  type CustomerOption,
} from "@/app/admin/invoices/customer-action";

type CustomerForm = {
  fullName: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    postalCode: string;
    country: string;
  };
};

const initialForm: CustomerForm = {
  fullName: "",
  email: "",
  phone: "",
  address: {
    line1: "",
    line2: "",
    city: "",
    postalCode: "",
    country: "GB",
  },
};

const fieldClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100";

const labelClass =
  "block space-y-2 text-sm font-semibold text-slate-700";

export default function AddCustomerModal({
  onCreated,
}: {
  onCreated: (customer: CustomerOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [form, setForm] = useState<CustomerForm>(initialForm);

  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    nameRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !pending) {
        setOpen(false);
        triggerRef.current?.focus();
      }

      if (event.key !== "Tab") return;

      const focusable =
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
        );

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
      document.body.style.overflow = previousOverflow;
    };
  }, [open, pending]);

  function updateField(
    key: "fullName" | "email" | "phone",
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function updateAddress(
    key: keyof CustomerForm["address"],
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      address: {
        ...previous.address,
        [key]: value,
      },
    }));
  }

  function close() {
    if (pending) return;

    setOpen(false);
    setError("");
    triggerRef.current?.focus();
  }

  function save() {
    setError("");

    if (!form.fullName.trim()) {
      setError("Customer name is required.");
      return;
    }

    const { line1, city, postalCode } = form.address;

    const hasAddress =
      line1.trim() ||
      form.address.line2.trim() ||
      city.trim() ||
      postalCode.trim();

    if (
      hasAddress &&
      (!line1.trim() ||
        !city.trim() ||
        !postalCode.trim())
    ) {
      setError(
        "Please complete address line 1, city, and postcode."
      );
      return;
    }

    startTransition(async () => {
      try {
        const result = await createInvoiceCustomer(form);

        if (!result.success) {
          setError(result.error);
          return;
        }

        onCreated(result.customer);
        setForm(initialForm);
        setOpen(false);
        triggerRef.current?.focus();
      } catch (error) {
        console.error("[AddCustomerModal]", error);
        setError(
          "Unable to save customer. Please try again."
        );
      }
    });
  }

  return (
    <>
      {/* Open modal button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-800 bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      >
        <span className="text-lg leading-none">+</span>
        New Customer
      </button>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-modal-title"
            className="flex h-[90dvh] min-h-0 w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl sm:h-[85dvh]"
          >
            {/* Modal header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-5 sm:px-7">
              <div>
                <h2
                  id="customer-modal-title"
                  className="text-xl font-bold text-slate-900"
                >
                  Add New Customer
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter customer information for KXH invoices.
                </p>
              </div>

              <button
                type="button"
                disabled={pending}
                onClick={close}
                aria-label="Close customer form"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-xl text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-100 disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <form
              className="flex min-h-0 flex-1 flex-col overflow-hidden"
              onSubmit={(event) => {
                event.preventDefault();
                save();
              }}
            >
              {/* Scrollable content */}
              <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain bg-slate-50/50 px-5 py-6 sm:px-7"
                style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "thin" }}>
                {/* Customer details */}
                <section className="rounded-xl border border-slate-300 bg-white p-5 shadow-sm">
                  <div className="mb-5 border-b border-slate-200 pb-4">
                    <h3 className="text-base font-bold text-slate-900">
                      Customer Details
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Basic contact information.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className={labelClass}>
                      Full Name
                      <span className="text-red-600"> *</span>

                      <input
                        ref={nameRef}
                        className={fieldClass}
                        value={form.fullName}
                        required
                        maxLength={150}
                        onChange={(e) =>
                          updateField(
                            "fullName",
                            e.target.value
                          )
                        }
                        placeholder="John Smith"
                      />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className={labelClass}>
                        Email Address

                        <input
                          type="email"
                          className={fieldClass}
                          value={form.email}
                          onChange={(e) =>
                            updateField(
                              "email",
                              e.target.value
                            )
                          }
                          placeholder="john@example.com"
                        />
                      </label>

                      <label className={labelClass}>
                        Phone Number

                        <input
                          type="tel"
                          className={fieldClass}
                          value={form.phone}
                          maxLength={40}
                          onChange={(e) =>
                            updateField(
                              "phone",
                              e.target.value
                            )
                          }
                          placeholder="+44 7700 900000"
                        />
                      </label>
                    </div>
                  </div>
                </section>

                {/* Billing address */}
                <section className="rounded-xl border border-slate-300 bg-white p-5 shadow-sm">
                  <div className="mb-5 border-b border-slate-200 pb-4">
                    <h3 className="text-base font-bold text-slate-900">
                      Billing Address
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Optional. This address will appear on
                      customer invoices.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className={labelClass}>
                      Address Line 1

                      <input
                        className={fieldClass}
                        value={form.address.line1}
                        maxLength={200}
                        onChange={(e) =>
                          updateAddress(
                            "line1",
                            e.target.value
                          )
                        }
                        placeholder="123 High Street"
                      />
                    </label>

                    <label className={labelClass}>
                      Address Line 2

                      <input
                        className={fieldClass}
                        value={form.address.line2}
                        maxLength={200}
                        onChange={(e) =>
                          updateAddress(
                            "line2",
                            e.target.value
                          )
                        }
                        placeholder="Flat, unit, building"
                      />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className={labelClass}>
                        City

                        <input
                          className={fieldClass}
                          value={form.address.city}
                          maxLength={100}
                          onChange={(e) =>
                            updateAddress(
                              "city",
                              e.target.value
                            )
                          }
                          placeholder="London"
                        />
                      </label>

                      <label className={labelClass}>
                        Postcode

                        <input
                          className={fieldClass}
                          value={form.address.postalCode}
                          maxLength={20}
                          onChange={(e) =>
                            updateAddress(
                              "postalCode",
                              e.target.value
                            )
                          }
                          placeholder="SW1A 1AA"
                        />
                      </label>
                    </div>

                    <label className={labelClass}>
                      Country

                      <select
                        className={fieldClass}
                        value={form.address.country}
                        onChange={(e) =>
                          updateAddress(
                            "country",
                            e.target.value
                          )
                        }
                      >
                        <option value="GB">
                          United Kingdom
                        </option>
                      </select>
                    </label>
                  </div>
                </section>

                {/* Validation error */}
                {error && (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </p>
                )}
              </div>

              {/* Fixed footer */}
              <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                <button
                  type="button"
                  disabled={pending}
                  onClick={close}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-900 bg-emerald-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {pending ? "Saving..." : "Save Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
