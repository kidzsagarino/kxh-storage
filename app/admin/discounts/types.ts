export type DiscountForm = {
    id: "" | string;
    code: string;
    type: "percentage" | "fixed";
    valueMinor: number;
    maxUses?: number | "";
    startDate?: string;
    endDate?: string;
};