
import { z } from "zod";

export const invoiceSchema = z.object({
  invoiceNumber: z
    .string()
    .optional(),
  customerId: z.string().min(1),

  invoiceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

  // 20 means 20% VAT
  taxPercent: z.number().int().min(0).max(100),

  notes: z.string().max(3000).default(""),
  terms: z.string().max(3000).default(""),

  items: z
    .array(
      z.object({
        description: z.string().trim().min(1).max(500),
        quantity: z.number().int().min(1).max(100000),
        unitPriceMinor: z.number().int().min(0).max(100000000),
      })
    )
    .min(1)
    .max(100),
});

export type InvoiceInput = z.input<typeof invoiceSchema>;

export function parseInvoice(input: InvoiceInput) {
  const parsed = invoiceSchema.parse(input);

  const parseDate = (value: string): Date => {
    const date = new Date(`${value}T12:00:00.000Z`);

    if (
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== value
    ) {
      throw new Error("Invalid date");
    }

    return date;
  };

  const invoiceDate = parseDate(parsed.invoiceDate);
  const dueDate = parseDate(parsed.dueDate);

  if (dueDate < invoiceDate) {
    throw new Error("Due date cannot precede invoice date");
  }

  const items = parsed.items.map((item) => ({
    ...item,
    totalMinor: item.quantity * item.unitPriceMinor,
  }));

  const subtotalMinor = items.reduce(
    (sum, item) => sum + item.totalMinor,
    0
  );

  // Convert percentage to actual tax amount
  const taxMinor = Math.round(
    (subtotalMinor * parsed.taxPercent) / 100
  );

  const totalMinor = subtotalMinor + taxMinor;

  if (
    ![subtotalMinor, taxMinor, totalMinor].every(
      (n) =>
        Number.isSafeInteger(n) &&
        n >= 0 &&
        n <= 2147483647
    )
  ) {
    throw new Error("Invoice amount is too large");
  }

  return {
    ...parsed,
    invoiceDate,
    dueDate,
    items,
    subtotalMinor,
    taxMinor,
    totalMinor,
  };
}
