import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, MapPin, ShieldCheck } from "lucide-react";

export type ShowcaseImage = { src: string; alt: string; label: string };

type Props = {
    eyebrow: string;
    title: string;
    intro: string;
    points: string[];
    images: [ShowcaseImage, ShowcaseImage, ShowcaseImage];
    ctaHref: string;
    ctaLabel: string;
};

/**
 * Compact photo section for service pages: text + checklist on one side,
 * a fixed-height bento of three real KXH photos on the other.
 */
export default function ServiceShowcase(p: Props) {
    const [big, a, b] = p.images;
    const tile =
        "kxh-card3d group relative overflow-hidden rounded-3xl bg-slate-900 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5";
    const label =
        "absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 shadow backdrop-blur";

    return (
        <section className="relative overflow-hidden bg-white py-16 lg:py-24">
            <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" aria-hidden="true" />
            <div className="mx-auto grid max-w-screen-xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
                <div className="kxh-reveal">
                    <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                        {p.eyebrow}
                    </p>
                    <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{p.title}</h2>
                    <p className="mt-4 text-base leading-7 text-slate-600">{p.intro}</p>

                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {p.points.map((pt) => (
                            <li key={pt} className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-800">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                                {pt}
                            </li>
                        ))}
                    </ul>

                    <dl className="mt-7 grid grid-cols-3 gap-3 text-center">
                        <div className="rounded-2xl bg-slate-950 px-2 py-4 text-white">
                            <Clock className="mx-auto h-5 w-5 text-emerald-400" aria-hidden="true" />
                            <dt className="mt-2 text-[11px] uppercase tracking-wider text-slate-400">Open</dt>
                            <dd className="text-sm font-bold">24/7</dd>
                        </div>
                        <div className="rounded-2xl bg-slate-950 px-2 py-4 text-white">
                            <ShieldCheck className="mx-auto h-5 w-5 text-emerald-400" aria-hidden="true" />
                            <dt className="mt-2 text-[11px] uppercase tracking-wider text-slate-400">Storage</dt>
                            <dd className="text-sm font-bold">Secure</dd>
                        </div>
                        <div className="rounded-2xl bg-slate-950 px-2 py-4 text-white">
                            <MapPin className="mx-auto h-5 w-5 text-emerald-400" aria-hidden="true" />
                            <dt className="mt-2 text-[11px] uppercase tracking-wider text-slate-400">Coverage</dt>
                            <dd className="text-sm font-bold">All London</dd>
                        </div>
                    </dl>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href={p.ctaHref}
                            className="kxh-shine group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                        >
                            {p.ctaLabel}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                        <a
                            href="tel:+442039165312"
                            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-emerald-600 hover:text-emerald-700"
                        >
                            Call 020 3916 5312
                        </a>
                    </div>
                </div>

                <div className="kxh-reveal grid h-[380px] grid-cols-2 grid-rows-2 gap-3 sm:h-[460px] sm:gap-4 lg:h-[520px]">
                    <figure className={`${tile} row-span-2`}>
                        <Image src={big.src} alt={big.alt} fill sizes="(max-width: 1024px) 50vw, 28vw" className="object-cover transition duration-700 group-hover:scale-105" />
                        <span className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" aria-hidden="true" />
                        <figcaption className={label}>{big.label}</figcaption>
                    </figure>
                    <figure className={tile}>
                        <Image src={a.src} alt={a.alt} fill sizes="(max-width: 1024px) 50vw, 28vw" className="object-cover transition duration-700 group-hover:scale-105" />
                        <span className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" aria-hidden="true" />
                        <figcaption className={label}>{a.label}</figcaption>
                    </figure>
                    <figure className={tile}>
                        <Image src={b.src} alt={b.alt} fill sizes="(max-width: 1024px) 50vw, 28vw" className="object-cover transition duration-700 group-hover:scale-105" />
                        <span className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" aria-hidden="true" />
                        <figcaption className={label}>{b.label}</figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}
