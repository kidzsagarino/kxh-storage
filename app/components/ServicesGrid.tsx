import { Icon } from "./Icons";

const services = [
  {
    key: "packaging",
    title: "Moving",
    desc: "Careful packing, safe transport, and smooth relocation for homes and businesses.",
  },
  {
    key: "removals",
    title: "Removals",
    desc: "Local London removal services designed for speed and security.",
  },
  {
    key: "storage",
    title: "Storage Solutions",
    desc: "Flexible, secure, and accessible storage facilities tailored to your needs.",
  },
  {
    key: "shredding",
    title: "Shredding Solutions",
    desc: "Eco-friendly clearance and secure document disposal services.",
  },
] as const;

export function ServicesGrid() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <div
          key={s.key}
          className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm
                 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          {/* Icon */}
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl
                      bg-emerald-50 ring-1 ring-emerald-100 transition
                      group-hover:bg-emerald-100">
            <Icon
              name={s.key}
              set="lucide"
              size={22}
              className="text-emerald-600"
              title={s.title}
            />
          </div>

          <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>

          {/* Optional: subtle affordance */}
          {/* <div className="mt-4 text-xs font-semibold text-slate-500 transition group-hover:text-slate-700">
            Learn more →
          </div> */}
        </div>
      ))}
    </div>

  );
}
