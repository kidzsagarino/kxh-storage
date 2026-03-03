import { CheckoutProvider } from "./components/checkout/CheckoutStore";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kxhlogistics.co.uk"),
  title: {
    default: "KXH Storage & Logistics | Storage with Pickup & Delivery",
    template: "%s | KXH Storage & Logistics",
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "KXH Storage & Logistics | Storage with Pickup & Delivery",
    description:
      "Pickup, store, and return your items with door-to-door convenience.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "KXH storage team loading boxes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KXH Storage & Logistics",
    description: "Storage with pickup & delivery—door-to-door convenience.",
    images: ["/og.jpg"],
  },
  robots: {
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
        <CheckoutProvider>{children}</CheckoutProvider>
        <Script id="tawkto" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),
              s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/69149f9ffcc0e1195703fef0/1j9s8v2nj';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>

  );
}