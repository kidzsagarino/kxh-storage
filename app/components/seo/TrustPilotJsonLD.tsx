export default function TrustpilotJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "KXH Storage & Logistics",
    url: "https://kxhlogistics.co.uk",
    telephone: "+44 1474 396663",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "66",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.trustpilot.com/review/kxhlogistics.co.uk"
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