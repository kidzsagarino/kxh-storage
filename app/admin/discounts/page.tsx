import { getDiscountCodes } from "./actions";
import DiscountAdminClient from "./DiscountAdminClient";

export default async function Page() {
  const codes = await getDiscountCodes();

  return <DiscountAdminClient initialCodes={codes} />;
}