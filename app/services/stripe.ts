export async function createEmbeddedSession(orderId: string) {
  const res = await fetch("/api/stripe/create-embedded-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, mode: "DEPOSIT" }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? "Failed to start payment");

  return { clientSecret: data.clientSecret as string };
}
