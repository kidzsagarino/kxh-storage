"use client";

import { useEffect, useState } from "react";

function isPlaceholderEmail(email?: string | null) {
  if (!email) return true;
  const e = email.trim().toLowerCase();
  return e.endsWith("@placeholder.com") || e.startsWith("draft-");
}

export function EmailLive({
  orderId,
  initialEmail,
}: {
  orderId: string;
  initialEmail: string;
}) {
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      // If already real, stop.
      if (!isPlaceholderEmail(email)) return;

      for (let i = 0; i < 12; i++) {
        try {
          const res = await fetch(`/api/orders/email?orderId=${orderId}`, {
            cache: "no-store",
          });
          const data = await res.json();
          if (cancelled) return;

          if (data?.email) setEmail(data.email);

          if (data?.ready) return;
        } catch {
          // ignore and retry
        }

        await new Promise((r) => setTimeout(r, 1500));
      }
    }

    poll();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return <span className="font-medium text-slate-900">{email || "—"}</span>;
}