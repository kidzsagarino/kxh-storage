"use client";

type TrustpilotPillProps = {
    className?: string;
};

export default function TrustpilotPill({
    className = "",
}: TrustpilotPillProps) {
    return (
        <div
            className={`flex items-center justify-start ${className}`}
        >
            <div
                className="trustpilot-widget"
                data-locale="en-US"
                data-template-id="56278e9abfbbba0bdcd568bc"
                data-businessunit-id="667201b1e980b7848cc8c4fe"
                data-style-height="52px"
                data-style-width="230px"
                data-token="113201a9-e7ab-4e7f-a46e-78f8b93866fb"
            >
                <a
                    href="https://www.trustpilot.com/review/kxhlogistics.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Trustpilot
                </a>
            </div>
        </div>
    );
}