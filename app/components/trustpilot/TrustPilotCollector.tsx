"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, forceReload?: boolean) => void;
    };
  }
}

export default function TrustpilotCollector() {

  useEffect(() => {
    const widget = document.querySelector(".trustpilot-widget");

    if (widget instanceof HTMLElement && window.Trustpilot) {
      window.Trustpilot.loadFromElement(widget, true);
    }
  }, []);

  return (
    <>

      {/* Widget */}
      <div
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="56278e9abfbbba0bdcd568bc"
        data-businessunit-id="667201b1e980b7848cc8c4fe"
        data-style-height="52px"
        data-style-width="100%"
        data-token="113201a9-e7ab-4e7f-a46e-78f8b93866fb"
      >
        <a
          href="https://www.trustpilot.com/review/kxhlogistics.co.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </div>
    </>
  );
}