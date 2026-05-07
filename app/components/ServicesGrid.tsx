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
    key: "storage",
    title: "Storage Solutions",
    desc: "Flexible, secure, and accessible storage facilities tailored to your needs.",
    url: "/warehouse-storage-london",
  },
  {
    key: "shredding",
    title: "Shredding Solutions",
    desc: "Eco-friendly clearance and secure document disposal services.",
    url: "/shredding-solutions-london",
  },
] as const;

export function ServicesGrid() {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <Link
          key={s.key}
          href={s.url}
          className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6
                     shadow-[0_6px_20px_rgba(15,23,42,0.06)]
                     transition-all duration-200
                     hover:-translate-y-1 hover:border-emerald-300"
        >
          {/* Icon */}
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

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900">
            {s.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {s.desc}
          </p>

          {/* CTA */}
          <div className="mt-4 text-xs font-semibold text-emerald-600">
            Learn more →
          </div>
        </Link>
      ))}
    </div>
  );
}
