import {
    PutObjectCommand,
} from "@aws-sdk/client-s3";

import {
    NextResponse,
} from "next/server";

import {
    randomUUID,
} from "crypto";

import {
    r2,
} from "@/app/lib/r2";


const MAX_FILE_SIZE =
    5 * 1024 * 1024;


const ALLOWED_TYPES =
    new Set([
        "image/jpeg",
        "image/png",
        "image/webp",
    ]);


export async function POST(
    request: Request
) {
    try {
        const formData =
            await request.formData();

        const file =
            formData.get("file");

        const orderId =
            formData.get("orderId");


        if (!(file instanceof File)) {
            return NextResponse.json(
                {
                    error:
                        "Image file is required.",
                },
                {
                    status: 400,
                }
            );
        }


        if (
            typeof orderId !== "string" ||
            !orderId
        ) {
            return NextResponse.json(
                {
                    error:
                        "Order ID is required.",
                },
                {
                    status: 400,
                }
            );
        }


        if (
            !ALLOWED_TYPES.has(
                file.type
            )
        ) {
            return NextResponse.json(
                {
                    error:
                        "Only JPG, PNG and WebP images are allowed.",
                },
                {
                    status: 400,
                }
            );
        }


        if (
            file.size >
            MAX_FILE_SIZE
        ) {
            return NextResponse.json(
                {
                    error:
                        "Image must be 5 MB or smaller.",
                },
                {
                    status: 400,
                }
            );
        }


        const extension =
            file.type === "image/jpeg"
                ? "jpg"
                : file.type === "image/png"
                    ? "png"
                    : "webp";


        const key =
            `inventory/${orderId}/${randomUUID()}.${extension}`;


        const bytes =
            await file.arrayBuffer();


        await r2.send(
            new PutObjectCommand({
                Bucket:
                    process.env
                        .R2_BUCKET_NAME!,

                Key:
                    key,

                Body:
                    Buffer.from(
                        bytes
                    ),

                ContentType:
                    file.type,
            })
        );


        const publicBaseUrl =
            process.env
                .R2_PUBLIC_URL;


        if (!publicBaseUrl) {
            throw new Error(
                "R2_PUBLIC_URL is missing."
            );
        }


        const imageUrl =
            `${publicBaseUrl.replace(
                /\/$/,
                ""
            )}/${key}`;


        return NextResponse.json({
            success:
                true,

            imageUrl,
        });

    } catch (error: unknown) {
        console.error(
            "[INVENTORY_IMAGE_UPLOAD]",
            error
        );


        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to upload image.",
            },
            {
                status: 500,
            }
        );
    }
}