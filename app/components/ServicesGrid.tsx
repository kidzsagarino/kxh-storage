import { Icon } from "./Icons";

const services = [
  {
    key: "packaging",
    title: "Packaging and Moving",
    desc: "Careful packing, safe transport, and smooth relocation for homes and businesses.",
  },
  {
    key: "removals",
    title: "Removals",
    desc: "Local and nationwide removal services designed for speed and security.",
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
    <div className="mt-8 grid gap-4 md:grid-cols-4">
      {services.map((s) => (
        <div
          key={s.key}
          className="group rounded-1xl border border-slate-200 bg-white p-6 shadow-sm transition"
        >
          {/* Icon */}
          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl
                          bg-slate-50 text-slate-900">
            <Icon
              name={s.key}
              set="lucide"
              size={24}
              className="text-[#4CAF50]"
              title={s.title}
            />
          </div>

          <h3 className="text-base font-medium text-slate-900">{s.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
