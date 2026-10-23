
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFPage,
  type PDFFont,
  type RGB,
} from "pdf-lib";

import type { Prisma } from "@prisma/client";

import {
  INVOICE_BUSINESS,
  money,
  displayDate,
} from "./config";

export type FullInvoice = Prisma.InvoiceGetPayload<{
  include: {
    customer: {
      include: {
        billingAddress: true;
      };
    };
    items: true;
  };
}>;

// A4 portrait
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;

const MARGIN = 45;
const LEFT = MARGIN;
const RIGHT = PAGE_WIDTH - MARGIN;
const CONTENT_WIDTH = RIGHT - LEFT;

const TOP = PAGE_HEIGHT - 48;
const BOTTOM = 58;

// Monochrome invoice palette: black, white and neutral grays.
const black = rgb(0, 0, 0);
const paleGray = rgb(0.94, 0.94, 0.94);

const dark = black;
const muted = rgb(0.35, 0.35, 0.35);
const border = rgb(0.78, 0.78, 0.78);
const light = rgb(0.97, 0.97, 0.97);
const white = rgb(1, 1, 1);

function safe(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\x20-\x7E£]/g, "?");
}

function countryName(code: string): string {
  const countries: Record<string, string> = {
    GB: "United Kingdom",
    IE: "Ireland",
    US: "United States",
  };

  return countries[code] ?? code;
}

export async function invoicePdf(
  invoice: FullInvoice
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();

  const regular = await pdf.embedFont(
    StandardFonts.Helvetica
  );

  const bold = await pdf.embedFont(
    StandardFonts.HelveticaBold
  );

  let page: PDFPage = pdf.addPage([
    PAGE_WIDTH,
    PAGE_HEIGHT,
  ]);

  let y = TOP;

  function newPage() {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = TOP;
  }

  function ensureSpace(height: number) {
    if (y - height < BOTTOM) {
      newPage();
    }
  }

  function text(
    value: string,
    x: number,
    positionY: number,
    size = 10,
    options?: {
      bold?: boolean;
      color?: RGB;
    }
  ) {
    page.drawText(safe(value), {
      x,
      y: positionY,
      size,
      font: options?.bold ? bold : regular,
      color: options?.color ?? dark,
    });
  }

  function rightText(
    value: string,
    rightX: number,
    positionY: number,
    size = 10,
    options?: {
      bold?: boolean;
      color?: RGB;
    }
  ) {
    const font = options?.bold ? bold : regular;
    const normalized = safe(value);

    const width = font.widthOfTextAtSize(
      normalized,
      size
    );

    text(
      normalized,
      rightX - width,
      positionY,
      size,
      options
    );
  }

  function line(
    positionY: number,
    startX = LEFT,
    endX = RIGHT,
    color = border
  ) {
    page.drawLine({
      start: {
        x: startX,
        y: positionY,
      },
      end: {
        x: endX,
        y: positionY,
      },
      thickness: 0.8,
      color,
    });
  }

  function rectangle(
    x: number,
    positionY: number,
    width: number,
    height: number,
    color: RGB,
    borderColor?: RGB
  ) {
    page.drawRectangle({
      x,
      y: positionY,
      width,
      height,
      color,
      ...(borderColor
        ? {
            borderColor,
            borderWidth: 0.7,
          }
        : {}),
    });
  }

  function wrapText(
    value: string,
    maxWidth: number,
    size = 10,
    font: PDFFont = regular
  ): string[] {
    const lines: string[] = [];

    for (const paragraph of value.split(/\r?\n/)) {
      if (!paragraph.trim()) {
        lines.push("");
        continue;
      }

      let current = "";

      for (const word of safe(paragraph).split(/\s+/)) {
        const candidate = current
          ? `${current} ${word}`
          : word;

        if (
          font.widthOfTextAtSize(candidate, size) <=
          maxWidth
        ) {
          current = candidate;
          continue;
        }

        if (current) {
          lines.push(current);
          current = "";
        }

        let remaining = word;

        while (
          remaining.length &&
          font.widthOfTextAtSize(
            remaining,
            size
          ) > maxWidth
        ) {
          let length = 1;

          while (
            length < remaining.length &&
            font.widthOfTextAtSize(
              remaining.slice(0, length + 1),
              size
            ) <= maxWidth
          ) {
            length++;
          }

          lines.push(remaining.slice(0, length));
          remaining = remaining.slice(length);
        }

        current = remaining;
      }

      if (current) {
        lines.push(current);
      }
    }

    return lines;
  }

  function wrappedText(
    value: string,
    x: number,
    maxWidth: number,
    size = 10,
    lineHeight = 15,
    options?: {
      bold?: boolean;
      color?: RGB;
    }
  ) {
    const font = options?.bold ? bold : regular;

    const lines = wrapText(
      value,
      maxWidth,
      size,
      font
    );

    for (const currentLine of lines) {
      ensureSpace(lineHeight);

      if (currentLine) {
        text(
          currentLine,
          x,
          y,
          size,
          options
        );
      }

      y -= lineHeight;
    }
  }

  // ----------------------------------------
  // 1. Company header
  // ----------------------------------------

  text(
    INVOICE_BUSINESS.name,
    LEFT,
    y,
    17,
    {
      bold: true,
      color: black,
    }
  );

  let companyY = y - 22;

  for (const addressLine of INVOICE_BUSINESS.address) {
    text(
      addressLine,
      LEFT,
      companyY,
      9,
      { color: muted }
    );

    companyY -= 14;
  }

  rightText(
    "INVOICE",
    RIGHT,
    y,
    27,
    {
      bold: true,
      color: dark,
    }
  );

  rightText(
    invoice.invoiceNumber,
    RIGHT,
    y - 27,
    11,
    {
      bold: true,
      color: black,
    }
  );

  y = Math.min(companyY, y - 50) - 24;

  line(y, LEFT, RIGHT, black);
  y -= 28;

  // ----------------------------------------
  // 2. Customer and invoice details
  // ----------------------------------------

  const sectionTop = y;

  const leftColumn = LEFT;
  const rightColumn = 345;

  text(
    "BILL TO",
    leftColumn,
    sectionTop,
    9,
    {
      bold: true,
      color: black,
    }
  );

  text(
    "INVOICE DETAILS",
    rightColumn,
    sectionTop,
    9,
    {
      bold: true,
      color: black,
    }
  );

  // Customer information
  y = sectionTop - 22;

  wrappedText(
    invoice.customer.fullName,
    leftColumn,
    260,
    11,
    17,
    { bold: true }
  );

  const billing = invoice.customer.billingAddress;

  if (billing) {
    wrappedText(
      billing.line1,
      leftColumn,
      260,
      9,
      14,
      { color: muted }
    );

    if (billing.line2) {
      wrappedText(
        billing.line2,
        leftColumn,
        260,
        9,
        14,
        { color: muted }
      );
    }

    wrappedText(
      billing.city,
      leftColumn,
      260,
      9,
      14,
      { color: muted }
    );

    wrappedText(
      billing.postalCode,
      leftColumn,
      260,
      9,
      14,
      { color: muted }
    );

    wrappedText(
      countryName(billing.country),
      leftColumn,
      260,
      9,
      14,
      { color: muted }
    );
  }

  const customerBottom = y;

  // Right-hand metadata
  let detailsY = sectionTop - 24;

  const metadata = [
    ["Invoice No.", invoice.invoiceNumber],
    ["Issue Date", displayDate(invoice.invoiceDate)],
    ["Due Date", displayDate(invoice.dueDate)],
    ["Status", invoice.status],
  ];

  for (const [label, value] of metadata) {
    text(
      label,
      rightColumn,
      detailsY,
      9,
      { color: muted }
    );

    rightText(
      value,
      RIGHT,
      detailsY,
      9,
      { bold: true }
    );

    detailsY -= 21;
  }

  y = Math.min(customerBottom, detailsY) - 28;

  // ----------------------------------------
  // 3. Invoice items
  // ----------------------------------------

  const itemX = LEFT + 12;
  const qtyRight = 345;
  const rateRight = 435;
  const amountRight = RIGHT - 12;

  const headerHeight = 36;

  function drawTableHeader() {
    ensureSpace(headerHeight + 30);

    rectangle(
      LEFT,
      y - headerHeight,
      CONTENT_WIDTH,
      headerHeight,
      black
    );

    const headerTextY = y - 23;

    text(
      "DESCRIPTION",
      itemX,
      headerTextY,
      9,
      {
        bold: true,
        color: white,
      }
    );

    rightText(
      "QTY",
      qtyRight,
      headerTextY,
      9,
      {
        bold: true,
        color: white,
      }
    );

    rightText(
      "RATE",
      rateRight,
      headerTextY,
      9,
      {
        bold: true,
        color: white,
      }
    );

    rightText(
      "AMOUNT",
      amountRight,
      headerTextY,
      9,
      {
        bold: true,
        color: white,
      }
    );

    y -= headerHeight;
  }

  drawTableHeader();

  for (const [index, item] of invoice.items.entries()) {
    const descriptionLines = wrapText(
      item.description,
      245,
      9
    );

    const lineHeight = 14;

    const rowHeight = Math.max(
      42,
      descriptionLines.length * lineHeight + 20
    );

    // Split exceptionally long descriptions across pages.
    let offset = 0;

    while (offset < descriptionLines.length || offset === 0) {
      const available = y - BOTTOM;

      if (available < 42) {
        newPage();
        drawTableHeader();
      }

      const usableHeight = y - BOTTOM;

      const maxLines = Math.max(
        1,
        Math.floor((usableHeight - 20) / lineHeight)
      );

      const chunk = descriptionLines.slice(
        offset,
        offset + maxLines
      );

      const isFirstChunk = offset === 0;

      const chunkHeight =
        descriptionLines.length <= maxLines && isFirstChunk
          ? rowHeight
          : Math.max(
              42,
              chunk.length * lineHeight + 20
            );

      if (y - chunkHeight < BOTTOM) {
        newPage();
        drawTableHeader();
        continue;
      }

      if (index % 2 === 1) {
        rectangle(
          LEFT,
          y - chunkHeight,
          CONTENT_WIDTH,
          chunkHeight,
          light
        );
      }

      const rowTextY = y - 17;

      chunk.forEach((description, lineIndex) => {
        text(
          description,
          itemX,
          rowTextY - lineIndex * lineHeight,
          9
        );
      });

      if (isFirstChunk) {
        rightText(
          String(item.quantity),
          qtyRight,
          rowTextY,
          9
        );

        rightText(
          money(item.unitPriceMinor),
          rateRight,
          rowTextY,
          9
        );

        rightText(
          money(item.totalMinor),
          amountRight,
          rowTextY,
          9,
          { bold: true }
        );
      }

      y -= chunkHeight;

      line(y);

      offset += chunk.length;

      if (offset < descriptionLines.length) {
        newPage();
        drawTableHeader();
      } else {
        break;
      }
    }
  }

  // ----------------------------------------
  // 4. Totals
  // ----------------------------------------

  ensureSpace(145);
  y -= 25;

  const totalsLeft = 325;

  text(
    "Subtotal",
    totalsLeft,
    y,
    10,
    { color: muted }
  );

  rightText(
    money(invoice.subtotalMinor),
    RIGHT - 12,
    y,
    10
  );

  y -= 24;

  text(
    `Tax (${invoice.taxPercent}%)`,
    totalsLeft,
    y,
    10,
    { color: muted }
  );

  rightText(
    money(invoice.taxMinor),
    RIGHT - 12,
    y,
    10
  );

  y -= 20;

  // Highlighted total
  const totalHeight = 48;

  rectangle(
    totalsLeft - 12,
    y - totalHeight,
    RIGHT - totalsLeft + 12,
    totalHeight,
    paleGray,
    black
  );

  text(
    "TOTAL",
    totalsLeft,
    y - 30,
    12,
    {
      bold: true,
      color: black,
    }
  );

  rightText(
    money(invoice.totalMinor),
    RIGHT - 12,
    y - 30,
    14,
    {
      bold: true,
      color: black,
    }
  );

  y -= totalHeight + 35;

  // ----------------------------------------
  // 5. Notes and terms
  // ----------------------------------------

  const sections = [
    ["NOTES", invoice.notes],
    ["TERMS & CONDITIONS", invoice.terms],
  ] as const;

  for (const [heading, content] of sections) {
    if (!content) continue;

    ensureSpace(60);

    line(y);
    y -= 25;

    text(
      heading,
      LEFT,
      y,
      10,
      {
        bold: true,
        color: black,
      }
    );

    y -= 22;

    wrappedText(
      content,
      LEFT,
      CONTENT_WIDTH,
      9,
      15,
      { color: muted }
    );

    y -= 24;
  }

  // ----------------------------------------
  // 6. Footer and page numbers
  // ----------------------------------------

  const pages = pdf.getPages();

  pages.forEach((currentPage, index) => {
    currentPage.drawLine({
      start: {
        x: LEFT,
        y: 47,
      },
      end: {
        x: RIGHT,
        y: 47,
      },
      thickness: 0.7,
      color: border,
    });

    currentPage.drawText(
      safe("Thank you for your business."),
      {
        x: LEFT,
        y: 30,
        size: 8,
        font: regular,
        color: muted,
      }
    );

    const pageLabel =
      `Page ${index + 1} of ${pages.length}`;

    const pageLabelWidth =
      regular.widthOfTextAtSize(
        pageLabel,
        8
      );

    currentPage.drawText(pageLabel, {
      x: RIGHT - pageLabelWidth,
      y: 30,
      size: 8,
      font: regular,
      color: muted,
    });
  });

  return pdf.save();
}
