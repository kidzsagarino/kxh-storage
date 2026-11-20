import Image from "next/image";
import Link from "next/link";

import CrispChat from "../chat/CrispChat";
import MainFooter from "../footer/MainFooter";
import Nav from "../MobileNav";
import { londonLocations } from "../../lib/location";
import { CONTACT_NUMBERS } from "../../lib/contact";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumb, CtaBand, Faqs, JsonLd, QuoteCard, Toc, renderRich, slugify } from "./seo-ui";
import { SITE, type SeoLandingData } from "../../lib/seo-types";

export default function SeoLandingPage({ page }: { page: SeoLandingData }) {
  const url = `${SITE}/${page.slug}`;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: page.serviceType,
    description: page.metaDescription,
    url,
    provider: {
      "@type": "LocalBusiness",
      name: "KXH Storage & Logistics",
      url: SITE,
    },
    areaServed: { "@type": "City", name: "London" },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
      { "@type": "ListItem", position: 3, name: page.eyebrow, item: url },
    ],
  };

  return (
    <>
      <CrispChat />
      <Nav />

      <main className="min-h-screen bg-white text-slate-900">
        <JsonLd data={service} />
        <JsonLd data={breadcrumb} />

        <section className="relative isolate overflow-hidden bg-slate-950 text-white">
          <Image src={page.image.src} alt={page.image.alt} fill priority quality={75} sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50" />
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:px-8 lg:py-20">
            <div>
              <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: page.eyebrow }]} />
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {page.eyebrow}
              </div>
              <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight !text-white sm:text-5xl lg:text-6xl">{page.h1}</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">{page.lead}</p>
              <ul className="mt-6 grid max-w-xl gap-2 text-sm text-slate-100 sm:grid-cols-2">
                {["Collection from your door", "Secure London warehouse", "Flexible storage terms", "Delivery back on request"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/get-a-quote?service=storage" className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-center font-semibold text-white shadow-lg transition hover:bg-emerald-400">
                  {page.ctaLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {CONTACT_NUMBERS.map((c) => (
                  <a key={c.href} href={c.href} className="whitespace-nowrap rounded-xl border border-white/30 bg-white/5 px-6 py-4 text-center font-semibold text-white backdrop-blur transition hover:bg-white/15">
                    Call {c.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur lg:block">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">How it works</p>
              <ol className="mt-4 space-y-4">
                {[
                  ["Get a quote", "Tell us what you need to store."],
                  ["We collect", "Our own team and van arrive on your date."],
                  ["We store", "Your items go into our London warehouse."],
                  ["We deliver back", "Ask for some or all items back."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 font-bold text-white">{i + 1}</span>
                    <span>
                      <span className="block font-semibold text-white">{t}</span>
                      <span className="block text-sm text-slate-300">{d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <article>
            {page.sections.map((section, index) => (
              <section key={section.heading} id={slugify(section.heading)} className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{section.heading}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="mt-4 text-[17px] leading-8 text-slate-700">{renderRich(p)}</p>
                ))}
                {section.bullets && (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-3 leading-7 text-slate-700">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                        <span>{renderRich(b)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {index === 1 && page.secondImage && (
                  <Image src={page.secondImage.src} alt={page.secondImage.alt} width={1200} height={800} quality={75} loading="lazy" sizes="(max-width: 768px) 100vw, 768px" className="mt-8 h-auto w-full rounded-2xl border border-slate-200 object-cover shadow-sm" />
                )}
              </section>
            ))}

            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-slate-950">Related KXH services</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {page.related.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 transition hover:border-emerald-400 hover:bg-emerald-50">
                      {l.label}
                      <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600 transition group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-5">
              <Toc headings={page.sections.map((x) => x.heading)} />
              <QuoteCard cta={page.ctaLabel} />
            </div>
          </aside>
        </div>

        <CtaBand cta={page.ctaLabel} />
        <Faqs faqs={page.faqs} />

        <MainFooter locations={londonLocations} />
      </main>
    </>
  );
}
