import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { code } = await req.json();

        const discount = await prisma.discountCode.findUnique({
            where: { code: code.toUpperCase() },
        });

        if (!discount || !discount.active) {
            return NextResponse.json(
                { error: "Invalid or inactive code" },
                { status: 400 }
            );
        }

        // const now = new Date();
        // if (
        //     (discount.startDate && now < discount.startDate) ||
        //     (discount.endDate && now > discount.endDate)
        // ) {
        //     return NextResponse.json(
        //         { error: "Code expired or not yet active" },
        //         { status: 400 }
        //     );
        // }

        // if (discount.maxUses && discount.usedCount >= discount.maxUses) {
        //     return NextResponse.json(
        //         { error: "Code usage limit reached" },
        //         { status: 400 }
        //     );
        // }

        return NextResponse.json({
            success: true,
            id: discount.id,
            code: discount.code,
            type: discount.type,
            valueMinor: discount.valueMinor
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}