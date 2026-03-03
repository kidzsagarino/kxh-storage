// "use client";

// import { useEffect } from "react";

// export default function TawkTo() {
//   useEffect(() => {
//     // Prevent duplicate injection (dev strict mode / fast refresh)
//     if (document.getElementById("tawkto-script")) return;

//     (window as any).Tawk_API = (window as any).Tawk_API || {};
//     (window as any).Tawk_LoadStart = new Date();

//     const s1 = document.createElement("script");
//     s1.id = "tawkto-script";
//     s1.async = true;
//     s1.src = "https://embed.tawk.to/69149f9ffcc0e1195703fef0/1j9s8v2nj";
//     s1.charset = "UTF-8";
//     s1.setAttribute("crossorigin", "*");

//     document.body.appendChild(s1);
//   }, []);

//   return null;
// }