import { prisma } from "@/src/lib/prisma";
import { assertInvoiceAdmin } from "@/app/lib/invoices/auth";
import InvoiceForm from "../_components/InvoiceForm";
export default async function NewInvoicePage() {
  await assertInvoiceAdmin();
  const customers = await prisma.customer.findMany({select: {id: true, fullName: true, email: true}, orderBy: {fullName: "asc"}, take: 1000});
  return <InvoiceForm customers={customers} />;
}
