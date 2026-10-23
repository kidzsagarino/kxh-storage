
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  Printer,
  Mail,
  CheckCircle2,
  Ban,
} from "lucide-react";

import {
  changeInvoiceStatus,
  sendInvoice,
} from "../actions";

type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "VOID";

type Props = {
  id: string;
  status: InvoiceStatus;
};

const baseButton =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const primaryButton =
  `${baseButton} border-emerald-800 bg-emerald-800 text-white hover:border-emerald-900 hover:bg-emerald-900`;

const secondaryButton =
  `${baseButton} border-slate-300 bg-white text-slate-700 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-800`;

const successButton =
  `${baseButton} border-emerald-300 bg-emerald-50 text-emerald-800 hover:border-emerald-700 hover:bg-emerald-100`;

const dangerButton =
  `${baseButton} border-red-200 bg-white text-red-600 hover:border-red-500 hover:bg-red-50`;

export default function InvoiceActions({
  id,
  status,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();
  const [activeAction, setActiveAction] = useState<
    "send" | "paid" | "void" | null
  >(null);
  const [error, setError] = useState("");

  const canModify =
    status === "DRAFT" || status === "SENT";

  const run = (action: "send" | "paid" | "void") => {
    if (pending) return;

    if (
      action === "paid" &&
      !window.confirm(
        "Confirm payment was received outside this invoice module?"
      )
    ) {
      return;
    }

    if (
      action === "void" &&
      !window.confirm(
        "Void this invoice? This cannot be undone."
      )
    ) {
      return;
    }

    setError("");
    setActiveAction(action);

    startTransition(async () => {
      try {
        const result =
          action === "send"
            ? await sendInvoice(id)
            : await changeInvoiceStatus(
              id,
              action === "paid" ? "PAID" : "VOID"
            );

        if (!result.success) {
          setError(result.error);
          return;
        }

        router.refresh();
      } catch (error) {
        console.error("[InvoiceActions]", error);
        setError("Action failed. Please retry.");
      } finally {
        setActiveAction(null);
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Download PDF */}
      <a
        href={`/api/admin/invoices/${id}/pdf`}
        className={secondaryButton}
      >
        <Download className="h-4 w-4" />
        <span>Download PDF</span>
      </a>

      {/* Print */}
      <button
        type="button"
        className={secondaryButton}
        onClick={() => window.print()}
      >
        <Printer className="h-4 w-4" />
        <span>Print</span>
      </button>

      {canModify && (
        <>
          {/* Email Invoice */}
          {/* <button
            type="button"
            disabled={pending}
            className={primaryButton}
            onClick={() => run("send")}
          >
            <Mail className="h-4 w-4" />

            <span>
              {pending && activeAction === "send"
                ? "Sending..."
                : "Email Invoice"}
            </span>
          </button> */}

          {/* Mark as Paid */}
          <button
            type="button"
            disabled={pending}
            className={successButton}
            onClick={() => run("paid")}
          >
            <CheckCircle2 className="h-4 w-4" />

            <span>
              {pending && activeAction === "paid"
                ? "Updating..."
                : "Mark Paid"}
            </span>
          </button>

          {/* Void Invoice */}
          <button
            type="button"
            disabled={pending}
            className={dangerButton}
            onClick={() => run("void")}
          >
            <Ban className="h-4 w-4" />

            <span>
              {pending && activeAction === "void"
                ? "Voiding..."
                : "Void"}
            </span>
          </button>
        </>
      )}

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}
    </div>
  );
}
