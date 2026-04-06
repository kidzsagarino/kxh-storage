export const metadata = {
  title: "Privacy Policy | KXH Logistics",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">
          KXH LOGISTICS – PRIVACY POLICY
        </h1>

        <p className="text-sm text-slate-500 mb-6">
          Effective Date: March 20, 2026
        </p>

        <p className="mb-6">
          <strong>KXH Logistics</strong> (“KXH”, “we”, “us”, “our”) is committed to protecting your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
        </p>

        <Section title="1. INFORMATION WE COLLECT">
          <ul className="list-disc pl-6 space-y-1">
            <li>Name, email address, and phone number</li>
            <li>Collection and delivery addresses</li>
            <li>Booking and service details</li>
            <li>Payment information (processed via secure third-party providers)</li>
            <li>Photos and claim-related documentation (if applicable)</li>
            <li>Website usage data (IP address, browser type, device info)</li>
          </ul>
        </Section>

        <Section title="2. HOW WE USE YOUR DATA">
          <ul className="list-disc pl-6 space-y-1">
            <li>To process bookings and provide services</li>
            <li>To communicate updates and service notifications</li>
            <li>To process payments and manage billing</li>
            <li>To handle claims and customer support</li>
            <li>To improve our services and website performance</li>
            <li>To comply with legal obligations</li>
          </ul>
        </Section>

        <Section title="3. LEGAL BASIS FOR PROCESSING">
          <p className="mb-2">We process your personal data based on:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Contractual necessity</strong> – to fulfill your booking</li>
            <li><strong>Legal obligation</strong> – compliance with UK laws</li>
            <li><strong>Legitimate interests</strong> – improving services and preventing fraud</li>
            <li><strong>Consent</strong> – for marketing communications (if applicable)</li>
          </ul>
        </Section>

        <Section title="4. DATA SHARING">
          <p className="mb-2">
            We do not sell your personal data. We may share your data with:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Payment processors (e.g., Stripe, PayPal)</li>
            <li>IT and hosting providers</li>
            <li>Operational partners (e.g., drivers or logistics staff)</li>
            <li>Legal authorities if required by law</li>
          </ul>
        </Section>

        <Section title="5. DATA RETENTION">
          <ul className="list-disc pl-6 space-y-1">
            <li>Booking and transaction data: up to 6 years (legal requirement)</li>
            <li>Customer support and claims data: up to 2 years</li>
            <li>Marketing data: until consent is withdrawn</li>
          </ul>
        </Section>

        <Section title="6. YOUR RIGHTS">
          <p className="mb-2">Under UK GDPR, you have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Restrict or object to processing</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </Section>

        <Section title="7. DATA SECURITY">
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data against unauthorized access, loss, or misuse.
          </p>
        </Section>

        <Section title="8. COOKIES">
          <p>
            Our website may use cookies to improve user experience and analyze traffic.
            You can control cookie preferences through your browser settings.
          </p>
        </Section>

        <Section title="9. THIRD-PARTY SERVICES">
          <p>
            Our website may contain links to third-party services. We are not responsible
            for their privacy practices. Please review their policies separately.
          </p>
        </Section>

        <Section title="10. CHANGES TO THIS POLICY">
          <p>
            We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date.
          </p>
        </Section>

        <Section title="11. CONTACT US">
         <p>Email: help@kxhlogistics.co.uk</p>
          <p>Phone: +44 1474 396663</p>
          <p>
            You also have the right to lodge a complaint with the UK Information Commissioner’s Office (ICO).
          </p>
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