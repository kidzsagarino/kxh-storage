import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { PrismaClient, AddressType, ServiceType } from "@prisma/client";
import { sendEmail } from "@/app/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// --- Types & Helpers ---
type LineItem = {
    description: string;
    qty: number;
    unitMinor: number;
    lineTotalMinor: number;
};

const moneyGBP = (minor: number | null | undefined) =>
    `£${(((minor || 0) / 100) as number).toFixed(2)}`;

function fmtAddress(addr?: any | null) {
    if (!addr) return "-";
    const parts = [addr.line1, addr.line2, addr.city, addr.postalCode].filter(Boolean);
    return parts.join(", ");
}

function findAddr(addresses: any[], type: AddressType) {
    return addresses.find((a) => String(a.type) === String(type)) ?? null;
}

function formatServiceDate(d?: Date | null) {
    return d ? d.toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' }) : "";
}

function formatTimeSlot(timeSlot?: any | null) {
    if (!timeSlot) return "";
    const { name, startTime, endTime } = timeSlot;
    return startTime && endTime ? `${name} (${startTime}–${endTime})` : name;
}

function getMovingPackagePriceMinor(orderCurrency: string, movingPackage?: any | null) {
    const prices = (movingPackage?.prices ?? []) as any[];
    const match = prices.find((p) => p.isActive && p.currency === orderCurrency) ?? prices[0];
    return match?.priceMinor ?? 0;
}

export async function POST(req: NextRequest) {
    try {
        const { paidOrderId } = await req.json();
        if (!paidOrderId) return NextResponse.json({ ok: false, error: "Missing orderId" }, { status: 400 });

        const order = await prisma.order.findUnique({
            where: { id: paidOrderId },
            include: {
                customer: true,
                items: true,
                storageDiscountTier: true,
                movingPackage: { include: { prices: true } },
                addresses: true,
                timeSlot: true,
            },
        });

        if (!order) return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });

        const isMoving = order.serviceType === ServiceType.MOVING;

        const settings = await prisma.adminSettings.findUnique({
            where: { id: "global_settings" },
            select: { movingPricePerMileMinor: true },
        });
        const pricePerMileMinor = settings?.movingPricePerMileMinor ?? 58;
        const distanceMiles = isMoving ? Number(order.distanceMiles ?? 0) : 0;
        const distanceCostMinor = distanceMiles * pricePerMileMinor;

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595.28, 841.89]);
        const { width, height } = page.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const margin = 50;
        const PRIMARY_TEXT = rgb(0.1, 0.1, 0.1);
        const SECONDARY_TEXT = rgb(0.45, 0.45, 0.45);
        const BORDER_COLOR = rgb(0.9, 0.9, 0.9);
        const ACCENT_GREEN = rgb(0.298, 0.686, 0.314);

        const drawRightText = (str: string, xEnd: number, y: number, opts: any) => {
            const w = (opts.font || font).widthOfTextAtSize(str, opts.size || 10);
            page.drawText(str, { ...opts, x: xEnd - w, y });
        };

        // Header Branding
        page.drawText("KXH", { x: margin, y: height - 60, font: fontBold, size: 24, color: ACCENT_GREEN });
        page.drawText("LOGISTICS", { x: margin + 55, y: height - 60, font: font, size: 20, color: PRIMARY_TEXT });
        drawRightText("RECEIPT", width - margin, height - 60, { font: fontBold, size: 22 });

        page.drawLine({ start: { x: margin, y: height - 90 }, end: { x: width - margin, y: height - 90 }, thickness: 1, color: BORDER_COLOR });

        // Bill To & Order Info
        let y = height - 120;
        page.drawText("BILL TO", { x: margin, y, font: fontBold, size: 8, color: SECONDARY_TEXT });
        page.drawText(order.customer.fullName || "-", { x: margin, y: y - 15, font: fontBold, size: 10 });
        page.drawText(order.customer.email || "-", { x: margin, y: y - 28, size: 9, color: SECONDARY_TEXT });

        const metaX = width / 2 + 50;
        const drawMeta = (label: string, value: string, rowY: number) => {
            page.drawText(label, { x: metaX, y: rowY, font: fontBold, size: 8, color: SECONDARY_TEXT });
            drawRightText(value, width - margin, rowY, { size: 10, color: PRIMARY_TEXT });
        };
        drawMeta("ORDER NO.", String(order.orderNumber || order.id.slice(0, 8)), y);
        drawMeta("DATE", order.createdAt.toLocaleDateString("en-GB"), y - 18);
        drawMeta("SERVICE", order.serviceType, y - 36);

        // --- Logistics Section (Conditional Logic) ---
        y -= 80;
        page.drawText("LOGISTICS & SCHEDULE", { x: margin, y, font: fontBold, size: 8, color: SECONDARY_TEXT });
        y -= 15;
        
        const pickup = findAddr(order.addresses, AddressType.PICKUP);
        const dropoff = findAddr(order.addresses, AddressType.DROPOFF);
        const billing = findAddr(order.addresses, AddressType.BILLING);

        // Define Box Height based on Service
        const boxHeight = isMoving ? 75 : 45;
        page.drawRectangle({ 
            x: margin, 
            y: y - (boxHeight - 10), 
            width: width - (margin * 2), 
            height: boxHeight, 
            color: rgb(0.98, 0.98, 0.99), 
            borderColor: BORDER_COLOR, 
            borderWidth: 0.5 
        });
        
        let logY = y - 15;
        const drawLogDetail = (label: string, value: string) => {
            page.drawText(label, { x: margin + 10, y: logY, font: fontBold, size: 9 });
            page.drawText(value, { x: margin + 90, y: logY, size: 9, color: SECONDARY_TEXT });
            logY -= 15;
        };

        if (isMoving) {
            drawLogDetail("PICKUP:", fmtAddress(pickup ?? billing));
            drawLogDetail("DROP-OFF:", fmtAddress(dropoff ?? billing));
            if (distanceMiles > 0) {
                drawLogDetail("DISTANCE:", `${distanceMiles} miles (${moneyGBP(distanceCostMinor)})`);
            }
        } else {
            // Storage/Shredding only shows collection point
            drawLogDetail("COLLECTION:", fmtAddress(pickup ?? billing));
        }
        drawLogDetail("SCHEDULE:", `${formatServiceDate(order.serviceDate)} | ${formatTimeSlot(order.timeSlot)}`);

        // --- Items Table ---
        y = logY - 30;
        page.drawRectangle({ x: margin, y: y - 5, width: width - (margin * 2), height: 20, color: PRIMARY_TEXT });
        page.drawText("DESCRIPTION", { x: margin + 10, y: y + 3, font: fontBold, size: 8, color: rgb(1, 1, 1) });
        drawRightText("QTY", width - margin - 110, y + 3, { font: fontBold, size: 8, color: rgb(1, 1, 1) });
        drawRightText("UNIT", width - margin - 60, y + 3, { font: fontBold, size: 8, color: rgb(1, 1, 1) });
        drawRightText("TOTAL", width - margin - 10, y + 3, { font: fontBold, size: 8, color: rgb(1, 1, 1) });

        const lineItems: LineItem[] = [];
        if (isMoving) {
            if (distanceMiles > 0) {
                lineItems.push({ description: `Mileage (${distanceMiles} miles)`, qty: 1, unitMinor: pricePerMileMinor, lineTotalMinor: distanceCostMinor });
            }
            const pkgPrice = getMovingPackagePriceMinor(order.currency, order.movingPackage);
            lineItems.push({ description: `Package: ${order.movingPackage?.name || 'Standard'}`, qty: 1, unitMinor: pkgPrice, lineTotalMinor: pkgPrice });
        }

        order.items.forEach(it => {
            const suffix = order.serviceType === ServiceType.STORAGE && it.months ? ` (${it.months} mo)` : "";
            lineItems.push({ description: `${it.name}${suffix}`, qty: it.quantity, unitMinor: it.unitPriceMinor, lineTotalMinor: it.lineTotalMinor });
        });

        if (order.discountMinor > 0) {
            lineItems.push({ description: "Promotional Discount", qty: 1, unitMinor: -order.discountMinor, lineTotalMinor: -order.discountMinor });
        }

        y -= 25;
        lineItems.forEach(item => {
            page.drawText(item.description, { x: margin + 10, y, size: 9 });
            drawRightText(String(item.qty), width - margin - 110, y, { size: 9 });
            drawRightText(moneyGBP(item.unitMinor), width - margin - 60, y, { size: 9 });
            drawRightText(moneyGBP(item.lineTotalMinor), width - margin - 10, y, { font: fontBold, size: 9 });
            y -= 22;
            page.drawLine({ start: { x: margin, y: y + 14 }, end: { x: width - margin, y: y + 14 }, thickness: 0.5, color: BORDER_COLOR });
        });

        // Totals
        y -= 20;
        const totalBoxX = width - margin - 160;
        const drawTotal = (label: string, val: string, rowY: number, isBold = false) => {
            page.drawText(label, { x: totalBoxX, y: rowY, font: isBold ? fontBold : font, size: 10 });
            drawRightText(val, width - margin - 10, rowY, { font: isBold ? fontBold : font, size: 10 });
        };

        drawTotal("Subtotal", moneyGBP(order.subtotalMinor), y);
        drawTotal("Discount", `-${moneyGBP(order.discountMinor)}`, y - 18);
        page.drawLine({ start: { x: totalBoxX, y: y - 28 }, end: { x: width - margin, y: y - 28 }, thickness: 1, color: PRIMARY_TEXT });
        drawTotal("TOTAL PAID", moneyGBP(order.totalMinor), y - 45, true);

        // Footer
        page.drawText("Thank you for your order!", { x: margin, y: 70, font: fontBold, size: 10, color: ACCENT_GREEN });
        page.drawText("KXH Storage and Logistics | hello@kxhlogistics.co.uk | +44 1474 396663", { x: margin, y: 58, size: 8, color: SECONDARY_TEXT });

        const pdfBytes = await pdfDoc.save();

        await sendEmail({
            to: order.customer.email || "hello@kxhlogistics.co.uk",
            //to: "kennedysagarino@gmail.com",
            subject: `Receipt for Order #${order.orderNumber || order.id.slice(0,8)}`,
            html: `<p>Thank you for your order. Please find your receipt attached.</p>`,
            attachments: [{
                filename: `receipt-${order.orderNumber || 'order'}.pdf`,
                content: Buffer.from(pdfBytes),
                contentType: "application/pdf",
            }],
        });

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}