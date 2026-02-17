export async function submitOrderAction(checkoutState: any) {
    let state = checkoutState ?? {};

    let serviceType = state.serviceType;

    let items:any = [];
    
    if (serviceType== "moving") {
        state = state.moving ?? state;
        items = [{
            serviceItemId: (state.movingItemId || "").replace(/-/g, "_"),
            quantity: 1,
            packageId: state.movingPackageId,
        }];
    } else if(serviceType == "storage") {
        state = state.storage ?? state;
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

function mapAddresses(state: any) {
    const addr = [];

    if (state.fromLocation || state.origin || state.address) {
        const source = state.fromLocation || state.origin || state.address;
        addr.push({
            type: "PICKUP",
            line1: source.houseNumber || source.line1 || "",
            line2: source.streetAddress || source.line2 || "",
            postalCode: state.fromLocation ? "" : source.postalCode || "",
            country: "GB",
        });
    } 
    if(state.toLocation || state.destination){
        const source = state.toLocation || state.destination;
        addr.push({
            type: "DROPOFF",
            line1: source.houseNumber || source.line1 || "",
            line2: source.streetAddress || source.line2 || "",
            postalCode: "",
            country: "GB",
        });
    }

    return addr;
}