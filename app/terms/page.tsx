export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">
          KXH LOGISTICS – TERMS & CONDITIONS
        </h1>

        <p className="text-sm text-slate-500 mb-6">
          Effective Date: March 20, 2026
        </p>

        <p className="mb-6">
          <strong>Company Name:</strong> KXH Logistics (“KXH”, “we”, “us”, “our”) <br />
          <strong>Service Area:</strong> Greater London, United Kingdom
        </p>

        <p className="mb-8">
          By booking or using KXH Logistics services, you (“Customer”, “Client”) agree to the following Terms & Conditions.
        </p>

        {/* SECTION */}
        <Section title="1. SERVICE SCOPE">
          <ul className="list-disc pl-6 space-y-1">
            <li>Collection of packed boxes</li>
            <li>Local removals</li>
            <li>Secure storage services</li>
            <li>Return and delivery of stored items</li>
          </ul>
          <p className="mt-3">
            KXH operates exclusively within Greater London.
          </p>
        </Section>

        <Section title="2. BOOKINGS & CONFIRMATION">
          <ul className="list-disc pl-6 space-y-1">
            <li>All services must be booked in advance</li>
            <li>Bookings are confirmed upon payment</li>
            <li>KXH may refuse or cancel bookings for operational or safety reasons</li>
          </ul>
        </Section>

        <Section title="3. COLLECTION TERMS">
          <SubTitle>Packing Requirements</SubTitle>
          <ul className="list-disc pl-6 space-y-1">
            <li>Maximum 20kg per box</li>
            <li>Boxes must be securely sealed</li>
            <li>Fragile items must be declared</li>
            <li>Improperly packed items may be refused or repacked (fees apply)</li>
          </ul>

          <SubTitle>Access Requirements</SubTitle>
          <ul className="list-disc pl-6 space-y-1">
            <li>Legal parking access must be available</li>
            <li>Safe entry must be ensured</li>
            <li>Someone must be present during collection</li>
          </ul>

          <SubTitle>Additional Boxes</SubTitle>
          <ul className="list-disc pl-6 space-y-1">
            <li>£14.95 per extra box</li>
            <li>Invoice updated immediately</li>
            <li>Payment required before proceeding</li>
          </ul>

          <SubTitle>Overweight Items</SubTitle>
          <p>£50 fee per item exceeding 20kg</p>
        </Section>

        <Section title="4. STORAGE TERMS">
          <ul className="list-disc pl-6 space-y-1">
            <li>Storage billed monthly in advance</li>
            <li>£4–£6 per box per month (as agreed)</li>
          </ul>

          <SubTitle>Fees</SubTitle>
          <ul className="list-disc pl-6 space-y-1">
            <li>Early return: £50 admin fee</li>
            <li>Late fees:
              <ul className="list-disc pl-6">
                <li>15+ days: £30</li>
                <li>30+ days: £50</li>
              </ul>
            </li>
          </ul>

          <p className="mt-3">
            Non-payment may result in suspension or disposal of goods.
          </p>
        </Section>

        <Section title="5. RETURNS (LONDON ONLY)">
          <ul className="list-disc pl-6 space-y-1">
            <li>Minimum 2 working days’ notice</li>
            <li>£14.95 per box</li>
          </ul>

          <SubTitle>Rescheduling</SubTitle>
          <p>£50–£250 depending on container size</p>

          <SubTitle>Outstanding Balances</SubTitle>
          <p>Must be settled before delivery</p>
        </Section>

        <Section title="6. CANCELLATIONS">
          <ul className="list-disc pl-6 space-y-1">
            <li>Free within 36 hours</li>
            <li>£45 admin fee after 36 hours</li>
            <li>£50–£250 within 2 working days</li>
          </ul>
        </Section>

        <Section title="7. PROHIBITED ITEMS">
          <ul className="list-disc pl-6 space-y-1">
            <li>Illegal goods</li>
            <li>Hazardous or flammable materials</li>
            <li>Perishable goods</li>
            <li>Liquids</li>
            <li>Weapons or firearms</li>
            <li>Explosives</li>
            <li>Animals</li>
          </ul>

          <p className="mt-3">
            KXH may refuse or dispose of prohibited items at customer’s expense.
          </p>
        </Section>

        <Section title="8. CLAIMS & LIABILITY">
          <ul className="list-disc pl-6 space-y-1">
            <li>Report within 24 hours</li>
            <li>Provide booking reference, photos, and proof of value</li>
          </ul>

          <SubTitle>Limitations</SubTitle>
          <ul className="list-disc pl-6 space-y-1">
            <li>Limited to insured or declared value</li>
            <li>No liability for poor packing or undeclared fragile items</li>
            <li>No liability for indirect losses</li>
          </ul>
        </Section>

        <Section title="9. INSURANCE">
          <p>
            Optional insurance available during booking. High-value items must be declared.
          </p>
        </Section>

        <Section title="10. GOVERNING LAW">
          <p>These Terms are governed by the laws of England and Wales.</p>
        </Section>

        <Section title="11. CONTACT">
          <p>Email: help.kxhlogistics@gmail.com</p>
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

function SubTitle({ children }: any) {
  return (
    <h3 className="font-semibold mt-4">{children}</h3>
  );
}