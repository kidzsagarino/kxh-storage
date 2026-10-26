/**
 * Business reference used on service pages. It points to the main LocalBusiness
 * entity (defined on the homepage) and uses the same name, phone and profiles.
 * No self-served review rating is included: Google ignores it for LocalBusiness
 * and it must always match the live Google/Trustpilot scores.
 */
export default function TrustpilotJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://kxhlogistics.co.uk/#business",
    name: "KXH Storage & Logistics",
    url: "https://kxhlogistics.co.uk",
    telephone: "+442039165312",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9 New City Road",
      addressLocality: "London",
      postalCode: "E13 9LL",
      addressCountry: "GB",
    },
    sameAs: [
      "https://uk.trustpilot.com/review/kxhlogistics.co.uk",
      "https://www.facebook.com/kxhlogistics",
      "https://www.instagram.com/kxh_logistics",
      "https://www.tiktok.com/@kxhlogistics",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
