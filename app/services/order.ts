
export async function submitOrderAction(state: any) {

  const items = Object.entries(state.quantities)
    .filter(([_, qty]) => (qty as number) > 0)
    .map(([id, qty]) => ({
      serviceItemId: id.replace(/-/g, '_'),
      quantity: qty,
      months: state.durationMonth || 1,
    }));

  const payload = {
    serviceType: "STORAGE", 
    serviceDate: state.collectionDate,
    timeSlotId: state.timeSlotId,
    customer: {
      email: state.customerDetails.email,
      fullName: state.customerDetails.fullName,
      phone: state.customerDetails.phone,
    },
    items,
    addresses: [
      {
        type: "PICKUP",
        line1: state.customerDetails.houseNumber,
        line2: state.customerDetails.address,
        city: state.customerDetails.city,
        postalCode: state.customerDetails.postalCode,
        country: "GB",
      },
    ],
    discountId: state.discountId || null,
  };

  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to create order");
  }

  return data;
}