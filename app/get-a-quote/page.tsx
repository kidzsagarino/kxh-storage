import type { Metadata } from "next";
import { loadOrderFlow } from "@/server/order-flow/loadOrderFlow";
import { CheckoutProvider } from "../components/checkout/CheckoutStore";
import HomeClientControls from "../components/HomeClientControls";
import Nav from "../components/MobileNav";
import MainFooter from "../components/footer/MainFooter";
import { londonLocations } from "../lib/location";

export const metadata: Metadata = {
    title: "Get a Storage or Moving Quote London | KXH Logistics",
    description:
        "Get an instant quote for storage, moving, student storage, business storage, collection, and delivery services across London.",
    alternates: {
        canonical: "https://kxhlogistics.co.uk/get-a-quote",
    },
};

export const dynamic = "force-dynamic";

export default async function QuotePage() {
    const initialData = await loadOrderFlow("GBP");

    return (
        <CheckoutProvider initialOrderFlow={initialData}>
            <Nav />

            <main className="min-h-screen bg-slate-50">
                <section className="border-b border-slate-200 bg-white py-14">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                            Instant Quote
                        </p>

                        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
                            Get Your Storage or Moving Quote
                        </h1>

                        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                            Choose your service, enter your details, and view your
                            estimated price for storage, moving, collection, or delivery
                            across London.
                        </p>
                    </div>
                </section>

                <section className="py-12">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <HomeClientControls variant="pricing" />
                    </div>
                </section>
            </main>

            <MainFooter locations={londonLocations} />
        </CheckoutProvider>
    );
}