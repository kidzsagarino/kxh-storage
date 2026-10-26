"use client";

import { useEffect } from "react";
import { ensureCrisp } from "@/app/lib/crisp";

/**
 * Loads Crisp live chat a few seconds after page load. The default Crisp bubble stays hidden;
 * visitors open the chat from the floating "Live chat" button (see FloatingContact).
 */
export default function CrispChat() {
    useEffect(() => {
        const timer = window.setTimeout(ensureCrisp, 4000);
        return () => window.clearTimeout(timer);
    }, []);

    return null;
}
