import QRCode from "qrcode";


export async function generateInventoryQrCode(
    token: string
) {
    const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL;

    if (!baseUrl) {
        throw new Error(
            "NEXT_PUBLIC_APP_URL is missing."
        );
    }


    const inventoryUrl =
        `${baseUrl.replace(
            /\/$/,
            ""
        )}/client-inventory/${token}`;


    const qrDataUrl =
        await QRCode.toDataURL(
            inventoryUrl,
            {
                width: 400,
                margin: 1,

                errorCorrectionLevel:
                    "M",
            }
        );


    return {
        qrDataUrl,
        inventoryUrl,
    };
}