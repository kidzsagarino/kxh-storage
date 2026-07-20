import Link from "next/link";
import FloatingTrustpilot from "../trustpilot/FloatingTrustpilot";

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
  {
    label: "Warehouse Storage",
    href: "/warehouse-storage-london",
  },
  {
    label: "Business Storage",
    href: "/business-storage-london",
  },
  {
    label: "Student Storage",
    href: "/student-storage-london",
  },
  {
    label: "Moving Services",
    href: "/logistics-moving-london",
  },
  {
    label: "Document Shredding",
    href: "/shredding-solutions-london",
  },
];

const businessSolutions: Service[] = [
  {
    label: "Ecommerce Storage",
    href: "/ecommerce-storage-london",
  },
  {
    label: "Inventory Management",
    href: "/inventory-management-london",
  },
  {
    label: "Pallet Storage",
    href: "/pallet-storage-london",
  },
  {
    label: "Commercial Storage",
    href: "/commercial-storage-london",
  },
  {
    label: "Third Party Logistics",
    href: "/third-party-logistics-london",
  },
];

const locationServices: Service[] = [
  {
    label: "Warehouse Storage",
    href: "/warehouse-storage-london",
  },
  {
    label: "Business Storage",
    href: "/business-storage-london",
  },
  {
    label: "Moving Services",
    href: "/logistics-moving-london",
  },
  // {
  //   label: "Student Storage",
  //   href: "/student-storage-london",
  // },
];

const companyLinks: Service[] = [
  {
    label: "All Services",
    href: "/services",
  },
  {
    label: "Get a Quote",
    href: "/get-a-quote",
  },
  {
    label: "Frequently Asked Questions",
    href: "/faqs",
  },
  {
    label: "Contact KXH",
    href: "/contact",
  },
];

export default function MainFooter({
  brandName = "KXH Storage & Logistics",
  year = new Date().getFullYear(),
  locations = [],
}: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-screen-xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="inline-block text-lg font-black text-slate-950"
            >
              {brandName}
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              Collection, secure managed storage, inventory handling, moving,
              shredding, and return delivery for businesses, students, and
              households across London.
            </p>

            <div className="mt-6 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Address:</span>{" "}
                9 New City Road, London E13 9LL
              </p>

              <p>
                <span className="font-semibold text-slate-900">Telephone:</span>{" "}
                <a
                  href="tel:+447470025636"
                  className="transition hover:text-emerald-700"
                >
                  +44 7470 025636
                </a>
              </p>
            </div>

            <Link
              href="/get-a-quote"
              className="mt-6 inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Get a Quote
            </Link>
          </div>

          {/* CORE SERVICES */}
          <nav
            aria-labelledby="footer-core-services"
            className="lg:col-span-2"
          >
            <h2
              id="footer-core-services"
              className="text-sm font-black text-slate-950"
            >
              Core Services
            </h2>

            <ul className="mt-4 space-y-3">
              {coreServices.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-slate-600 transition hover:text-emerald-700"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* BUSINESS SOLUTIONS */}
          <nav
            aria-labelledby="footer-business-solutions"
            className="lg:col-span-3"
          >
            <h2
              id="footer-business-solutions"
              className="text-sm font-black text-slate-950"
            >
              Business Solutions
            </h2>

            <ul className="mt-4 space-y-3">
              {businessSolutions.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-slate-600 transition hover:text-emerald-700"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* COMPANY */}
          <nav aria-labelledby="footer-company" className="lg:col-span-3">
            <h2
              id="footer-company"
              className="text-sm font-black text-slate-950"
            >
              Company
            </h2>

            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:text-emerald-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* LOCATION LINKS */}
        {locations.length > 0 && (
          <div className="mt-12 border-t border-slate-200 pt-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                London Service Areas
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-950">
                Storage and Logistics Across Greater London
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Explore local collection, storage, moving, and delivery services
                available across London boroughs.
              </p>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {locationServices.map((service) => (
                <details
                  key={service.href}
                  className="group rounded-2xl border border-slate-200 bg-slate-50"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-slate-900 transition hover:text-emerald-700">
                    <span>{service.label}</span>

                    <span
                      aria-hidden="true"
                      className="text-lg font-normal text-slate-400 transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>

                  <nav
                    aria-label={`${service.label} locations`}
                    className="border-t border-slate-200 px-5 py-4"
                  >
                    <ul className="space-y-2">
                      {locations.map((location) => (
                        <li key={`${service.href}-${location.slug}`}>
                          <Link
                            href={`${service.href}/${location.slug}`}
                            className="text-sm leading-6 text-slate-600 transition hover:text-emerald-700"
                          >
                            {service.label} in {location.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* TRUSTPILOT */}
      <div className="border-t border-slate-200 bg-slate-50 px-5 py-6">
        <div className="flex justify-center">
          <FloatingTrustpilot />
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-5 py-6 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {year} {brandName}. All rights reserved.
          </p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="transition hover:text-slate-800"
                >
                  Privacy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition hover:text-slate-800"
                >
                  Terms
                </Link>
              </li>

              <li>
                <Link
                  href="/refunds"
                  className="transition hover:text-slate-800"
                >
                  Refunds
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}