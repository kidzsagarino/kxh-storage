
export type DiscountMeta = {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  valueMinor: number;
};

export function calculateDiscount({
  baseAmount, // in major (e.g. £10.00)
  discountMeta,
}: {
  baseAmount: number;
  discountMeta?: DiscountMeta | null;
}) {
  if (!discountMeta) return 0;

  if (discountMeta.type === "percentage") {
    return (baseAmount * discountMeta.valueMinor) / 100;
  }

  return discountMeta.valueMinor / 100; // minor → major
}