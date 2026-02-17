export async function submitOrderAction(checkoutState: any) {
    let state = checkoutState ?? {};

    let serviceType = state.serviceType;

    let items:any = [];
    
    if (serviceType== "moving") {
        state = state.moving ?? state;
        items = [{
            // Use optional chaining and fallbacks to avoid crashes
            serviceItemId: (state.movingItemId || "").replace(/-/g, "_"),
            quantity: 1,
            packageId: state.movingPackageId,
        }];
    } else if(serviceType == "storage") {
        state = state.storage ?? state;
        // If quantities is undefined, items will be []
        const quantities = state.quantities || {};
        items = Object.entries(quantities)
            .filter(([_, qty]) => (Number(qty) || 0) > 0)
            .map(([id, qty]) => ({
                serviceItemId: id.replace(/-/g, "_"),
                quantity: Number(qty) || 0,
                months: Number(state.durationMonth) || 1,
            }));
    }else if(serviceType == "shredding") {
        state = state.shredding ?? state;
        // If quantities is undefined, items will be []
        const quantities = state.quantities || {};
        items = Object.entries(quantities)
            .filter(([_, qty]) => (Number(qty) || 0) > 0)
            .map(([id, qty]) => ({
                serviceItemId: id.replace(/-/g, "_"),
                quantity: Number(qty) || 0,
            }));
    }

    const payload = {
        serviceType: serviceType.toUpperCase(),
        serviceDate: state.collectionDate || state.date || "",
        timeSlotId: state.timeSlotId || "",
        distanceMiles: Number(state.distanceMiles) || 0,
        customer: {
            email: state.email || state.customerDetails?.email || state.customer?.email || "",
            fullName: state.fullName || state.name || state.customerDetails?.name || "Valued Customer",
            phone: state.phone || state.customerDetails?.phone || "",
        },
        items,
        addresses: mapAddresses(state),
        movingPackageId: state.movingPackageId || null,
        notes: state.notes
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

// Separate helper to debug address mapping
function mapAddresses(state: any) {
    const addr = [];
    // Check if the keys are actually 'fromLocation' or something else like 'origin'
    if (state.fromLocation || state.origin) {
        const source = state.fromLocation || state.origin;
        addr.push({
            type: "PICKUP",
            line1: source.houseNumber || source.line1 || "",
            line2: source.address || source.line2 || "",
            postalCode: source.postalCode || state.postalCode || "",
            country: "GB",
        });
    }
    return addr;
}