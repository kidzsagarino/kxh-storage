"use client";

import { useEffect } from "react";

export default function CrispChat() {
    useEffect(() => {
        (window as any).$crisp = [];
        (window as any).CRISP_WEBSITE_ID = "6273a801-a6d4-4682-ab18-603a4b7a0c56";

        (window as any).$crisp.push([
            "config",
            "container:index",
            [999999]
        ]);
        
        const d = document;
        const s = d.createElement("script");

        s.src = "https://client.crisp.chat/l.js";
        s.async = true;

        d.getElementsByTagName("head")[0].appendChild(s);
    }, []);

    return null;
}