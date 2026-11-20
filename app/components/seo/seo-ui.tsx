import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronDown, Phone } from "lucide-react";
import { CONTACT_NUMBERS } from "../../lib/contact";
import type { SeoFaq } from "../../lib/seo-types";

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Renders [anchor](/path) markup as internal links. */
export function renderRich(text: string) {
  const parts = text.split(/(\[[^\]]+\]\(\/[^)]*\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((\/[^)]*)\)$/);
    if (!m) return part;
    return (
      <Link key={i} href={m[2]} className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2 transition hover:decoration-emerald-600">
        {m[1]}
      </Link>
    );
  });
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 text-sm text-slate-300">
      {items.map((it, i) => (
        <span key={it.label} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true">/</span>}
          {it.href ? (
            <Link href={it.href} className="transition hover:text-white">{it.label}</Link>
          ) : (
            <span className="font-semibold text-white">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function Toc({ headings }: { headings: string[] }) {
  return (
    <nav aria-label="In this article" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">In this article</p>
      <ol className="mt-3 space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h}>
            <a href={`#${slugify(h)}`} className="block leading-5 text-slate-600 transition hover:text-emerald-700">{h}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function QuoteCard({ cta = "Get a storage quote" }: { cta?: string }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-lg">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Free quote</p>
      <p className="mt-2 text-xl font-bold !text-white">Storage with collection and delivery</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {["Collection from your door", "Secure London warehouse", "Delivery back on request"].map((t) => (
          <li key={t} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
      <Link href="/get-a-quote?service=storage" className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-center font-semibold text-white transition hover:bg-emerald-400">
        {cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <div className="mt-3 space-y-2">
        {CONTACT_NUMBERS.map((c) => (
          <a key={c.href} href={c.href} className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
            <Phone className="h-4 w-4" aria-hidden="true" /> Call {c.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Faqs({ faqs, title = "Frequently asked questions" }: { faqs: SeoFaq[]; title?: string }) {
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">FAQs</p>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <details key={f.question} className="group rounded-2xl border border-slate-200 bg-white shadow-sm open:border-emerald-300">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-slate-900">
                {f.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-emerald-600 transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-5 pb-5 leading-7 text-slate-600">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ cta, heading = "Get a storage quote for your items" }: { cta: string; heading?: string }) {
  return (
    <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 py-14 text-center text-white sm:py-20">
      <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight !text-white sm:text-4xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-50">
          Tell us what you need to store and where to collect it from. We come back with a quote based on your items, locations and storage term.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/get-a-quote?service=storage" className="rounded-xl bg-white px-8 py-4 font-semibold text-emerald-900 shadow-lg transition hover:bg-emerald-50">
            {cta}
          </Link>
          {CONTACT_NUMBERS.map((c) => (
            <a key={c.href} href={c.href} className="rounded-xl border border-white/40 px-6 py-4 font-semibold text-white transition hover:bg-white/10">
              Call {c.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
