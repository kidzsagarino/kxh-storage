// app/client-inventory/[token]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/src/lib/prisma";


type Props = {
    params: Promise<{
        token: string;
    }>;
};


export default async function ClientInventoryPage({
    params,
}: Props) {
    const { token } =
        await params;


    const access =
        await prisma.orderInventoryAccessToken.findUnique({
            where: {
                token,
            },

            include: {
                order: {
                    include: {
                        customer: true,

                        inventoryItems: {
                            orderBy: {
                                createdAt:
                                    "asc",
                            },
                        },
                    },
                },
            },
        });


    if (!access) {
        notFound();
    }


    if (access.revokedAt) {
        return (
            <AccessUnavailable
                title="This inventory link is no longer active."
                message="Please contact KXH Storage & Logistics or request a new inventory link."
            />
        );
    }

    const order =
        access.order;

    const inventory =
        order.inventoryItems;


    const totalUnits =
        inventory.reduce(
            (
                total,
                item
            ) =>
                total +
                item.quantity,
            0
        );


    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-10">

                {/* Header */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <div className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                KXH Storage & Logistics
                            </div>

                            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Your Stored Inventory
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Items currently recorded under
                                your storage order.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Order
                            </div>

                            <div className="mt-1 font-mono text-sm font-semibold text-slate-900">
                                #{order.orderNumber}
                            </div>
                        </div>
                    </div>


                    <div className="mt-5 grid grid-cols-2 gap-3 sm:max-w-sm">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Inventory Lines
                            </div>

                            <div className="mt-1 text-xl font-bold text-slate-900">
                                {inventory.length}
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Total Units
                            </div>

                            <div className="mt-1 text-xl font-bold text-slate-900">
                                {totalUnits}
                            </div>
                        </div>
                    </div>
                </section>


                {/* Customer */}
                <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900">
                        Storage Details
                    </h2>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl bg-slate-50 p-3">
                            <div className="text-xs font-medium text-slate-500">
                                Customer
                            </div>

                            <div className="mt-1 text-sm font-semibold text-slate-900">
                                {order.customer?.fullName ||
                                    "—"}
                            </div>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-3">
                            <div className="text-xs font-medium text-slate-500">
                                Service
                            </div>

                            <div className="mt-1 text-sm font-semibold text-slate-900">
                                Storage
                            </div>
                        </div>
                    </div>
                </section>


                {/* Inventory */}
                <section className="mt-4">
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-slate-900">
                                Inventory
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Read-only inventory recorded by KXH.
                            </p>
                        </div>
                    </div>


                    {inventory.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {inventory.map(
                                (
                                    item
                                ) => (
                                    <InventoryCard
                                        key={
                                            item.id
                                        }
                                        item={
                                            item
                                        }
                                    />
                                )
                            )}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                            <div className="text-sm font-semibold text-slate-700">
                                No inventory items have been added yet.
                            </div>

                            <p className="mt-1 text-sm text-slate-500">
                                Please contact KXH if you believe
                                this is incorrect.
                            </p>
                        </div>
                    )}
                </section>


                {/* Notice */}
                <section className="mt-4 rounded-2xl border border-slate-200 bg-slate-100 p-4">
                    <div className="text-sm font-semibold text-slate-800">
                        Inventory information
                    </div>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                        This page is read-only. If an item,
                        quantity, condition, or other detail
                        needs correcting, please contact KXH
                        Storage & Logistics.
                    </p>
                </section>


                {/* Footer */}
                <footer className="py-8 text-center text-sm text-slate-500">
                    <p>
                        KXH Storage & Logistics
                    </p>

                    <Link
                        href="/"
                        className="mt-2 inline-block font-semibold text-emerald-700 hover:underline"
                    >
                        Visit KXH
                    </Link>
                </footer>
            </div>
        </main>
    );
}


type InventoryItem = {
    id: string;
    name: string;
    quantity: number;
    description: string | null;
    condition: string | null;
    location: string | null;
    notes: string | null;
    imageUrl: string | null;
};


function InventoryCard({
    item,
}: {
    item: InventoryItem;
}) {
    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {item.imageUrl ? (
                <div className="relative aspect-[4/3] w-full bg-slate-100">
                    <Image
                        src={
                            item.imageUrl
                        }
                        alt={
                            item.name
                        }
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>
            ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-slate-100">
                    <div className="text-sm font-medium text-slate-400">
                        No photo available
                    </div>
                </div>
            )}


            <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900">
                            {item.name}
                        </h3>

                        {item.description && (
                            <p className="mt-1 text-sm leading-5 text-slate-500">
                                {
                                    item.description
                                }
                            </p>
                        )}
                    </div>

                    <div className="shrink-0 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
                        ×
                        {
                            item.quantity
                        }
                    </div>
                </div>


                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                    <div>
                        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Condition
                        </div>

                        <div className="mt-1 text-sm font-medium text-slate-700">
                            {item.condition ||
                                "—"}
                        </div>
                    </div>

                    <div>
                        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Location
                        </div>

                        <div className="mt-1 text-sm font-medium text-slate-700">
                            {item.location ||
                                "—"}
                        </div>
                    </div>
                </div>


                {item.notes && (
                    <div className="mt-4 rounded-xl bg-slate-50 p-3">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Notes
                        </div>

                        <p className="mt-1 text-sm leading-5 text-slate-600">
                            {item.notes}
                        </p>
                    </div>
                )}
            </div>
        </article>
    );
}


function AccessUnavailable({
    title,
    message,
}: {
    title: string;
    message: string;
}) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-xl">
                    🔒
                </div>

                <h1 className="mt-4 text-xl font-bold text-slate-900">
                    {title}
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    {message}
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                    Visit KXH
                </Link>
            </div>
        </main>
    );
}