type ProceedArgs<TState> = {
  state: TState;
  submitOrder: (state: TState) => Promise<any>; // returns { id } or { orderId }
  createEmbeddedSession: (orderId: string) => Promise<{ clientSecret: string }>;
  setOrderId: (id: string) => void;
  setClientSecret: (secret: string) => void;
  setEnableButton: (enabled: boolean) => void;
};

export async function proceedToPayment<TState>({
  state,
  submitOrder,
  createEmbeddedSession,
  setOrderId,
  setClientSecret,
  setEnableButton,
}: ProceedArgs<TState>) {
  // 1) create order
  const created = await submitOrder(state);
  const newOrderId = created?.id ?? created?.orderId;
  if (!newOrderId) throw new Error("Order created but missing orderId");

  setOrderId(newOrderId);

  // 2) create embedded checkout session
  const session = await createEmbeddedSession(newOrderId);
  if (!session?.clientSecret) throw new Error("Missing embedded checkout client secret");

  setClientSecret(session.clientSecret);

  // disable further submit/proceed buttons
  setEnableButton(false);

  return { orderId: newOrderId, clientSecret: session.clientSecret };
}
