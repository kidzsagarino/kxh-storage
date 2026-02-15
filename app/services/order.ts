export async function submitOrderAction(checkoutState: any) {
  const storage = checkoutState?.storage ?? checkoutState ?? {};
  const quantities = storage?.quantities ?? {};

  const items = Object.entries(quantities)
    .filter(([_, qty]) => (Number(qty) || 0) > 0)
    .map(([id, qty]) => ({
      serviceItemId: id.replace(/-/g, "_"),
      quantity: Number(qty) || 0,
      months: Number(storage?.durationMonth) || 1,
    }));

  const customerDetails = storage?.customerDetails ?? {};
  const pickupAddress = {
    type: "PICKUP",
    line1: customerDetails.houseNumber ?? "",
    line2: customerDetails.address ?? "",
    city: customerDetails.city ?? "", // if you don't have city, remove this field
    postalCode: customerDetails.postalCode ?? "",
    country: "GB",
  };

  const payload = {
    serviceType: "STORAGE",
    serviceDate: storage?.collectionDate ?? "",
    timeSlotId: storage?.timeSlotId ?? "",
    customer: {
      email: customerDetails.email ?? "", // you currently don't collect email in your StorageForm step 3
      fullName: customerDetails.name ?? "Valued Customer", // store field is `name`
      phone: customerDetails.phone ?? "",
    },
    items,
    addresses: [pickupAddress],
    discountId: storage?.discountId || null,
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
