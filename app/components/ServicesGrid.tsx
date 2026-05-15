import Link from "next/link";
import { Icon } from "./Icons";

const services = [
  {
    key: "packaging",
    title: "Moving",
    desc: "Careful packing, safe transport, and smooth relocation for homes and businesses.",
    url: "/logistics-moving-london",
  },
  {
    key: "removals",
    title: "Removals",
    desc: "Local London removal services designed for speed and security.",
    url: "/logistics-moving-london",
  },
  {
    key: "warehouseStorage",
    title: "Warehouse Storage London",
    desc: "Secure warehouse storage for personal and business goods with flexible access options.",
    url: "/warehouse-storage-london",
  },
  {
    key: "shredding",
    title: "Shredding Solutions",
    desc: "Eco-friendly clearance and secure document disposal services.",
    url: "/shredding-solutions-london",
  },
  {
    key: "businessStorage",
    title: "Business Storage London",
    desc: "Secure warehouse storage with pickup, delivery, and flexible business storage solutions.",
    url: "/business-storage-london",
  },
  {
    key: "inventory",
    title: "Inventory Management London",
    desc: "Organised warehouse inventory handling and structured stock management for businesses.",
    url: "/inventory-management-london",
  },
  {
    key: "pallet",
    title: "Pallet Storage London",
    desc: "Secure bulk pallet storage for retail, logistics, and commercial inventory.",
    url: "/pallet-storage-london",
  },
  {
    key: "commercial",
    title: "Commercial Storage London",
    desc: "Scalable warehouse storage solutions for growing businesses in London.",
    url: "/commercial-storage-london",
  },
] as const;

export function ServicesGrid() {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <Link
          key={s.key}
          href={s.url}
          className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6
                     shadow-[0_6px_20px_rgba(15,23,42,0.06)]
                     transition-all duration-200
                     hover:-translate-y-1 hover:border-emerald-300"
        >
          <div
            className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl
                       bg-emerald-50 ring-1 ring-emerald-100
                       transition-all duration-200
                       group-hover:bg-emerald-100 group-hover:ring-emerald-200"
          >
            <Icon
              name={s.key}
              set="lucide"
              size={22}
              className="text-emerald-600"
              title={s.title}
            />
          </div>

          <h3 className="text-base font-bold text-slate-900">
            {s.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {s.desc}
          </p>

          <div className="mt-4 text-xs font-semibold text-emerald-600">
            Learn more →
          </div>
        </Link>
      ))}
    </div>
  );
}