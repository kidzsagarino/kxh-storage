import TrustpilotBlock from "../trustpilot/TrustpilotBlock";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import SocialLinks from "../SocialLinks";
import { CONTACT_NUMBERS } from "@/app/lib/contact";

type Location = {
  name: string;
  slug: string;
};

type Service = {
  label: string;
  href: string;
};

type FooterProps = {
  brandName?: string;
  year?: number;
  locations?: Location[];
};

const coreServices: Service[] = [
  { label: "Warehouse Storage", href: "/warehouse-storage-london" },
  { label: "Student Storage", href: "/student-storage-london" },
  { label: "Moving Services", href: "/logistics-moving-london" },
  { label: "House Removals", href: "/house-removals-london" },
  { label: "Office Removals", href: "/office-removals-london" },
  { label: "Packing Services", href: "/packing-services-london" },
  { label: "Document Shredding", href: "/shredding-solutions-london" },
];

const businessSolutions: Service[] = [
  { label: "Business Storage", href: "/business-storage-london" },
  { label: "Ecommerce Storage", href: "/ecommerce-storage-london" },
  { label: "Inventory Management", href: "/inventory-management-london" },
  { label: "Pallet Storage", href: "/pallet-storage-london" },
  { label: "Commercial Storage", href: "/commercial-storage-london" },
  { label: "Third Party Logistics", href: "/third-party-logistics-london" },
  { label: "Archive Storage", href: "/archive-storage-london" },
];

/** The 8 services that have a page for every borough (8 × 8 = 64 local pages). */
const locationServices: Service[] = [
  { label: "Warehouse Storage", href: "/warehouse-storage-london" },
  { label: "Business Storage", href: "/business-storage-london" },
  { label: "Moving Services", href: "/logistics-moving-london" },
  { label: "Pallet Storage", href: "/pallet-storage-london" },
  { label: "Inventory Management", href: "/inventory-management-london" },
  { label: "Commercial Storage", href: "/commercial-storage-london" },
  { label: "Third Party Logistics", href: "/third-party-logistics-london" },
  { label: "Document Shredding", href: "/shredding-solutions-london" },
];

const companyLinks: Service[] = [
  { label: "All Services", href: "/services" },
  { label: "Get a Quote", href: "/get-a-quote" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact KXH", href: "/contact" },
];

function LinkColumn({ title, links }: { title: string; links: Service[] }) {
  return (
    <nav aria-label={title}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-1.5 text-sm text-slate-300 transition hover:text-white"
            >
              <span className="h-px w-0 bg-emerald-400 transition-all duration-300 group-hover:w-3" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function MainFooter({
  brandName = "KXH Storage & Logistics",
  year = new Date().getFullYear(),
  locations = [],
}: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-[#04140f] text-slate-300">
      {/* soft glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-emerald-600/20 blur-3xl" aria-hidden="true" />

      {/* CTA STRIP */}
      <div className="relative mx-auto max-w-screen-xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-700 to-emerald-600 p-7 shadow-2xl shadow-emerald-900/40 sm:p-9 lg:flex-row lg:items-center">
          <div>
            <p className="text-2xl font-black text-white sm:text-3xl">Need space? We collect, store and deliver.</p>
            <p className="mt-2 text-emerald-50/90">Get an instant online price or speak to our London team, 24 hours a day.</p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/get-a-quote"
              className="kxh-shine relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-emerald-800 shadow-lg transition hover:-translate-y-0.5"
            >
              Get Instant Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={CONTACT_NUMBERS[0].href}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" /> 020 3916 5312
            </a>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="relative mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* BRAND + CONTACT */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex rounded-2xl bg-white px-4 py-3" aria-label={`${brandName} home`}>
              <Image src="/logo.webp" alt={brandName} width={130} height={32} className="h-auto w-[130px]" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Collection, secure managed storage, inventory handling, moving, shredding and return delivery for
              businesses, students and households across London.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>9 New City Road, London E13 9LL</span>
              </li>
              {CONTACT_NUMBERS.map((c) => (
                <li key={c.href} className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <a href={c.href} className="transition hover:text-white">
                    {c.label}: {c.phone}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <a href="mailto:help@kxhlogistics.co.uk" className="transition hover:text-white">
                  help@kxhlogistics.co.uk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>Open 24 hours, 7 days a week</span>
              </li>
            </ul>

            <div className="mt-6">
              <SocialLinks variant="brand" size="sm" />
            </div>
          </div>

          <div className="lg:col-span-3">
            <LinkColumn title="Storage & Moving" links={coreServices} />
          </div>
          <div className="lg:col-span-3">
            <LinkColumn title="Business Solutions" links={businessSolutions} />
          </div>
          <div className="lg:col-span-2">
            <LinkColumn title="Company" links={companyLinks} />
          </div>
        </div>

        {/* LOCAL PAGES */}
        {locations.length > 0 && (
          <div className="mt-14 border-t border-white/10 pt-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">London service areas</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Local collection, storage, moving and delivery across{" "}
              {locations.map((l) => l.name).join(", ")}.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {locationServices.map((service) => (
                <details
                  key={service.href}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] transition open:bg-white/[0.06]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-white">
                    <span>{service.label}</span>
                    <span aria-hidden="true" className="text-lg font-normal text-emerald-300 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <ul className="space-y-1.5 border-t border-white/10 px-5 py-4">
                    {locations.map((location) => (
                      <li key={`${service.href}-${location.slug}`}>
                        <Link
                          href={`${service.href}/${location.slug}`}
                          className="text-sm leading-6 text-slate-400 transition hover:text-white"
                        >
                          {service.label} in {location.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <TrustpilotBlock tone="dark" />
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-6 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {year} {brandName}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li><Link href="/privacy" className="transition hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="transition hover:text-white">Terms</Link></li>
              <li><Link href="/refunds" className="transition hover:text-white">Refunds</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
