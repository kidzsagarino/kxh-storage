import Image from "next/image";
import { notFound } from "next/navigation";

import { prisma } from "@/src/lib/prisma";

import {
    generateInventoryQrCode,
} from "@/app/lib/order/inventory-qr";

import InventoryLabelPrintButton
    from "./InventoryLabelPrintButton";


type Props = {
    params: Promise<{
        id: string;
    }>;
};


export default async function InventoryLabelPage({
    params,
}: Props) {
    const { id } =
        await params;


    const order =
        await prisma.order.findUnique({
            where: {
                id,
            },

            include: {
                customer:
                    true,

                inventoryAccessTokens: {
                    where: {
                        revokedAt:
                            null,
                    },

                    orderBy: {
                        createdAt:
                            "desc",
                    },

                    take:
                        1,
                },
            },
        });


    if (!order) {
        notFound();
    }


    if (
        order.serviceType !==
        "STORAGE"
    ) {
        notFound();
    }


    const access =
        order
            .inventoryAccessTokens[0];


    if (!access) {
        return (
            <main className="bg-slate-100 p-4 print:min-h-0 print:bg-white print:p-0">
                <div className="mx-auto max-w-5xl print:m-0 print:h-full print:w-full print:max-w-none">
                    <h1 className="text-xl font-bold text-slate-900">
                        Inventory QR Not Available
                    </h1>

                    <p className="mt-2 text-sm text-slate-600">
                        Generate and send an inventory
                        access link for this order first.
                    </p>

                    <p className="mt-4 text-sm text-slate-500">
                        Order #{order.orderNumber}
                    </p>
                </div>
            </main>
        );
    }


    const {
        qrDataUrl,
        inventoryUrl,
    } =
        await generateInventoryQrCode(
            access.token
        );


    return (
        <main
            className="
                    min-h-screen
                    bg-slate-100
                    p-4

                    print:m-0
                    print:h-screen
                    print:min-h-0
                    print:w-screen
                    print:overflow-hidden
                    print:bg-white
                    print:p-0
                ">
            <div className="mx-auto
                        max-w-5xl

                        print:m-0
                        print:h-full
                        print:w-full
                        print:max-w-none">

                {/* Controls hidden when printing */}
                <div className="mb-4 flex justify-end print:hidden">
                    <InventoryLabelPrintButton />
                </div>


                <div
                    className="
                        print-sheet
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-2

                        print:mx-auto
                        print:grid-cols-2
                        print:grid-rows-2
                        print:gap-0
                    "
                >
                    {Array.from({ length: 4 }).map(
                        (_, index) => (
                            <section
                                key={index}
                                className="
                                        print-label
                                        border-2
                                        border-solid
                                        border-slate-300
                                        bg-white
                                        p-5
                                        text-slate-950

                                        print:flex
                                        print:h-[108mm]
                                        print:flex-col
                                        print:items-center
                                        print:justify-center
                                        print:overflow-hidden
                                        print:p-[4mm]
                                "
                            >
                                <div className="w-full text-center">

                                    {/* Company */}
                                    <Image
                                        src="/logo.webp"
                                        alt="KXH Storage & Logistics"
                                        width={120}
                                        height={60}
                                        className="mx-auto h-auto w-[120px] print:w-[85px]"
                                    />

                                    <h1 className="mt-2 text-lg font-black uppercase tracking-wide print:mt-1 print:text-sm">
                                        KXH Storage & Logistics
                                    </h1>

                                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                        Storage Inventory
                                    </div>


                                    <div className="my-3 border-t border-slate-900 print:my-2" />


                                    {/* Customer */}
                                    <div className="text-left">
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                                Client
                                            </div>

                                            <div className="mt-0.5 font-bold print:text-sm">
                                                {order.customer.fullName || "Customer"}
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                                Order Number
                                            </div>

                                            <div className="mt-0.5 font-mono font-bold print:text-sm">
                                                #{order.orderNumber}
                                            </div>
                                        </div>
                                    </div>


                                    {/* QR */}
                                    <div className="my-3 flex justify-center print:my-2">
                                        <img
                                            src={qrDataUrl}
                                            alt={`Inventory QR for order ${order.orderNumber}`}
                                            className="
                                                    h-36
                                                    w-36
                                                    print:h-[28mm]
                                                    print:w-[28mm]
                                                "
                                        />
                                    </div>


                                    {/* Description */}
                                    <div className="text-center">
                                        <div className="text-xs font-bold uppercase print:text-[10px]">
                                            Scan to View Stored Inventory
                                        </div>

                                        <p className="mx-auto mt-1 max-w-[250px] text-[9px] leading-4 text-slate-500 print:leading-tight">
                                            Secure, read-only access to the inventory
                                            recorded for this storage order.
                                        </p>
                                    </div>


                                    {/* URL */}
                                    <div className="mt-3 break-all border-t border-slate-300 pt-2 text-center text-[7px] text-slate-400 print:mt-2 print:pt-1">
                                        {inventoryUrl}
                                    </div>

                                </div>
                            </section>
                        )
                    )}
                </div>
            </div>
        </main>
    );
}