
"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/src/lib/prisma";
import { assertInvoiceAdmin } from "@/app/lib/invoices/auth";

const addressSchema = z.object({
  line1: z.string().trim().max(200),
  line2: z.string().trim().max(200),
  city: z.string().trim().max(100),
  postalCode: z.string().trim().max(20),
  country: z.string().trim().length(2),
});

const createCustomerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "Customer name is required")
      .max(150),

    email: z.union([
      z.email("Enter a valid email address"),
      z.literal(""),
    ]),

    phone: z.string().trim().max(40),

    address: addressSchema,
  })
  .superRefine((data, ctx) => {
    const { line1, line2, city, postalCode } = data.address;

    const hasAddress = Boolean(
      line1 || line2 || city || postalCode
    );

    if (!hasAddress) return;

    if (!line1) {
      ctx.addIssue({
        code: "custom",
        path: ["address", "line1"],
        message: "Address line 1 is required.",
      });
    }

    if (!city) {
      ctx.addIssue({
        code: "custom",
        path: ["address", "city"],
        message: "City is required.",
      });
    }

    if (!postalCode) {
      ctx.addIssue({
        code: "custom",
        path: ["address", "postalCode"],
        message: "Postcode is required.",
      });
    }
  });

export type CustomerOption = {
  id: string;
  fullName: string;
  email: string | null;
};

export type CreateCustomerInput = z.input<
  typeof createCustomerSchema
>;

type CustomerResult =
  | {
      success: true;
      customer: CustomerOption;
    }
  | {
      success: false;
      error: string;
    };

export async function createInvoiceCustomer(
  input: CreateCustomerInput
): Promise<CustomerResult> {
  await assertInvoiceAdmin();

  const parsed = createCustomerSchema.safeParse({
    ...input,
    fullName: input.fullName?.trim(),
    email: input.email?.trim().toLowerCase(),
    phone: input.phone?.trim(),
  });

  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.issues[0]?.message ??
        "Invalid customer details.",
    };
  }

  const { fullName, email, phone, address } = parsed.data;

  const hasAddress = Boolean(
    address.line1 ||
    address.line2 ||
    address.city ||
    address.postalCode
  );

  try {
    const customer = await prisma.customer.create({
      data: {
        fullName,
        email: email || null,
        phone: phone || null,

        ...(hasAddress
          ? {
              billingAddress: {
                create: {
                  line1: address.line1,
                  line2: address.line2 || null,
                  city: address.city,
                  postalCode: address.postalCode,
                  country: address.country.toUpperCase(),
                },
              },
            }
          : {}),
      },

      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    revalidatePath("/admin/invoices");
    revalidatePath("/admin/invoices/new");

    return {
      success: true,
      customer,
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "A customer with this email already exists.",
      };
    }

    console.error("[createInvoiceCustomer]", error);

    return {
      success: false,
      error: "Unable to create customer. Please try again.",
    };
  }
}
