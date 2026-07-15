"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        $crisp?: unknown[];
        CRISP_WEBSITE_ID?: string;
    }
}

const CRISP_SCRIPT_ID = "crisp-chat-script";
const CRISP_WEBSITE_ID = "6273a801-a6d4-4682-ab18-603a4b7a0c56";

export default function CrispChat() {
    useEffect(() => {
        const loadCrisp = () => {
            if (document.getElementById(CRISP_SCRIPT_ID)) {
                return;
            }

            window.$crisp = window.$crisp ?? [];
            window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

            const script = document.createElement("script");
            script.id = CRISP_SCRIPT_ID;
            script.src = "https://client.crisp.chat/l.js";
            script.async = true;

            document.head.appendChild(script);
        };

        const timer = window.setTimeout(loadCrisp, 4000);

        return () => {
            window.clearTimeout(timer);
        };
    }, []);

    return null;
}