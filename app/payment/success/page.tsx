import Link from "next/link";
import { SuccessClient } from "./SuccessClient";

type Props = { searchParams: { orderId?: string } };

export default function PaymentSuccessPage({ searchParams }: Props) {
  const orderId = searchParams.orderId;

  return (
    <div className="mx-auto max-w-xl p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="text-2xl font-bold text-slate-900">Payment successful ✅</div>
        <p className="text-sm text-slate-700">
          Thanks! We’ve received your payment. We’ll confirm your booking shortly.
        </p>

        {orderId ? <SuccessClient orderId={orderId} /> : null}

        <div className="flex gap-2">
          <Link
            href={orderId ? `/orders/${orderId}` : "/"}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-800"
          >
            View order
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Back home
          </Link>
        </div>

        <p className="text-xs text-slate-500">
          Status may take a few seconds to update while webhooks process.
        </p>
      </div>
    </div>
  );
}
