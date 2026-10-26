import { CheckoutProvider } from "./components/checkout/CheckoutStore";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import Script from "next/script";
import RevealObserver from "./components/RevealObserver";
import FloatingContact from "./components/FloatingContact";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kxhlogistics.co.uk"),
  title: {
    default: "KXH Storage & Logistics | Storage with Pickup & Delivery",
    template: "%s",
  },
  description:
    "Door-to-door storage with pickup & delivery. We collect, store, and return your items—simple, secure, and flexible.",
  applicationName: "KXH Storage & Logistics",
  keywords: [
    "storage",
    "self storage",
    "storage with pickup",
    "storage delivery",
    "logistics",
    "warehouse storage",
    "UK storage service",
  ],
  openGraph: {
    type: "website",
    siteName: "KXH Storage & Logistics",
    locale: "en_GB",
    title: "KXH Storage & Logistics | Storage with Pickup & Delivery",
    description:
      "Pickup, store, and return your items with door-to-door convenience.",
    images: [{ url: "/images/kxh-home-hero-warehouse-london.webp", width: 1600, height: 900, alt: "KXH Storage & Logistics warehouse and collection van in London" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KXH Storage & Logistics",
    description: "Storage with pickup & delivery—door-to-door convenience.",
    images: ["/images/kxh-home-hero-warehouse-london.webp"],
  },
  // Salmova staging (Netlify) is noindex; the live site keeps full indexing.
  robots:
    (process.env.NETLIFY === "true" || process.env.KXH_STAGING === "true" || /netlify\.app|vercel\.app/.test(process.env.NEXT_PUBLIC_APP_URL ?? ""))
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* <CheckoutProvider></CheckoutProvider> */}
        {children}
        <RevealObserver />
        <FloatingContact />
        <Toaster position="top-right" richColors />
        <Script
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>

  );
}