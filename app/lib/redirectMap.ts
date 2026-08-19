// app/lib/redirectMap.ts

export const serviceRedirectMap = [
  {
    from: "storage",
    to: "warehouse-storage-london",
  },
  {
    from: "moving",
    to: "logistics-moving-london",
  },
  {
    from: "shredding",
    to: "shredding-solutions-london",
  },
] as const;

export const legacyBoroughRedirectMap = [
  {
    from: "business-storage-london",
    to: "business-storage-london",
  },
  {
    from: "logistics-moving-london",
    to: "logistics-moving-london",
  },
  {
    from: "shredding-solutions-london",
    to: "shredding-solutions-london",
  },
  {
    from: "warehouse-storage-london",
    to: "warehouse-storage-london",
  },
  {
    from: "pallet-storage-london",
    to: "pallet-storage-london",
  },
  {
    from: "inventory-management-london",
    to: "inventory-management-london",
  },
  {
    from: "third-party-logistics-london",
    to: "third-party-logistics-london",
  },
] as const;

export const londonBoroughs = [
  "camden",
  "westminster",
  "hackney",
  "islington",
  "southwark",
  "lambeth",
  "tower-hamlets",
  "kensington-chelsea",
] as const;