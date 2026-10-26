"use client";

// Crisp live chat helpers. The default Crisp bubble is hidden; the chat is opened from the
// floating "Live chat" button (next to WhatsApp / Call) and hides again when closed.

const CRISP_SCRIPT_ID = "crisp-chat-script";
export const CRISP_WEBSITE_ID = "6273a801-a6d4-4682-ab18-603a4b7a0c56";

type CrispQueue = unknown[];

function queue(): CrispQueue {
    const w = window as unknown as { $crisp?: CrispQueue };
    w.$crisp = w.$crisp ?? [];
    return w.$crisp;
}

export function ensureCrisp() {
    if (typeof window === "undefined") return;
    const q = queue();
    if (document.getElementById(CRISP_SCRIPT_ID)) return;

    (window as unknown as { CRISP_WEBSITE_ID?: string }).CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;
    // Hide the default bubble and hide it again whenever the chat window is closed.
    q.push(["do", "chat:hide"]);
    q.push(["on", "chat:closed", () => queue().push(["do", "chat:hide"])]);

    const script = document.createElement("script");
    script.id = CRISP_SCRIPT_ID;
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);
}

export function openCrisp() {
    ensureCrisp();
    const q = queue();
    q.push(["do", "chat:show"]);
    q.push(["do", "chat:open"]);
}
