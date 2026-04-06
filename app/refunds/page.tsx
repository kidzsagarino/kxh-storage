export const metadata = {
  title: "Refund Policy | KXH Logistics",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">
          KXH LOGISTICS – REFUND POLICY
        </h1>

        <p className="text-sm text-slate-500 mb-6">
          Effective Date: March 20, 2026
        </p>

        <p className="mb-6">
          This Refund Policy outlines how refunds are handled for services provided by KXH Logistics (“KXH”, “we”, “us”, “our”).
          By booking our services, you agree to the terms below.
        </p>

        <Section title="1. CANCELLATION REFUNDS">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Free cancellation</strong> within 36 hours of booking – full refund issued
            </li>
            <li>
              <strong>After 36 hours:</strong> £45 administrative fee will be deducted
            </li>
            <li>
              <strong>Within 2 working days of service:</strong> £50–£250 cancellation fee depending on booking size
            </li>
          </ul>
        </Section>

        <Section title="2. SERVICE-BASED REFUNDS">
          <ul className="list-disc pl-6 space-y-1">
            <li>No refunds once a service has been fully completed</li>
            <li>
              Partial refunds may be considered if KXH is unable to deliver the agreed service
            </li>
            <li>
              Refund eligibility will be assessed on a case-by-case basis
            </li>
          </ul>
        </Section>

        <Section title="3. NON-REFUNDABLE FEES">
          <ul className="list-disc pl-6 space-y-1">
            <li>Administrative fees</li>
            <li>Late cancellation charges</li>
            <li>Completed service charges</li>
            <li>Additional box charges once processed</li>
            <li>Overweight item fees</li>
          </ul>
        </Section>

        <Section title="4. RETURNS & RESCHEDULING">
          <ul className="list-disc pl-6 space-y-1">
            <li>Minimum 2 working days’ notice required for returns</li>
            <li>
              Rescheduling within 2 working days may incur a £50–£250 fee
            </li>
            <li>
              Missed or failed service due to customer unavailability may not be eligible for a refund
            </li>
          </ul>
        </Section>

        <Section title="5. PAYMENT CONDITIONS">
          <ul className="list-disc pl-6 space-y-1">
            <li>All outstanding balances must be cleared before refunds are processed</li>
            <li>
              Any applicable fees will be deducted from the total refundable amount
            </li>
          </ul>
        </Section>

        <Section title="6. REFUND PROCESSING">
          <ul className="list-disc pl-6 space-y-1">
            <li>Refunds are processed within 5–10 business days</li>
            <li>
              Refunds are issued to the original payment method used during booking
            </li>
            <li>
              Processing time may vary depending on your payment provider
            </li>
          </ul>
        </Section>

        <Section title="7. DISPUTES & CLAIMS">
          <ul className="list-disc pl-6 space-y-1">
            <li>All disputes must be reported within 24 hours of service completion</li>
            <li>
              Supporting evidence (photos, booking reference, description) is required
            </li>
            <li>
              Refund decisions related to claims will follow our Claims & Liability terms
            </li>
          </ul>
        </Section>

        <Section title="8. CONTACT">
          <p>Email: help@kxhlogistics.co.uk</p>
          <p>Phone: +44 1474 396663</p>
        </Section>
      </div>
    </main>
  );
}

/* Reusable Components */

function Section({ title, children }: any) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="text-sm leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}