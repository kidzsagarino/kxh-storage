import Image from "next/image";
import Link from "next/link";

import CrispChat from "../chat/CrispChat";
import MainFooter from "../footer/MainFooter";
import Nav from "../MobileNav";
import { londonLocations } from "../../lib/location";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "../../lib/blog-posts";
import { Breadcrumb, CtaBand, Faqs, JsonLd, QuoteCard, Toc, renderRich, slugify } from "./seo-ui";
import { SITE, type BlogPostData } from "../../lib/seo-types";

export default function BlogPostPage({ post }: { post: BlogPostData }) {
  const url = `${SITE}/blog/${post.slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    mainEntityOfPage: url,
    image: `${SITE}${post.image.src}`,
    author: { "@type": "Organization", name: "KXH Storage & Logistics", url: SITE },
    publisher: { "@type": "Organization", name: "KXH Storage & Logistics", url: SITE },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const more = blogPosts.filter((b) => b.slug !== post.slug).slice(0, 3);
  return (
    <>
      <CrispChat />
      <Nav />
      <main className="min-h-screen bg-white text-slate-900">
        <JsonLd data={article} />
        <JsonLd data={breadcrumb} />

        <section className="relative isolate overflow-hidden bg-slate-950 text-white">
          <Image src={post.image.src} alt={post.image.alt} fill priority quality={75} sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/60" />
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readMinutes} min read
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight !text-white sm:text-5xl">{post.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">{post.excerpt}</p>
            <p className="mt-6 text-sm text-slate-300">
              By KXH Storage &amp; Logistics ·{" "}
              <time dateTime={post.datePublished}>
                {new Date(post.datePublished).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <article>
            <div className="lg:hidden"><Toc headings={post.sections.map((x) => x.heading)} /></div>
            {post.sections.map((s) => (
              <section key={s.heading} id={slugify(s.heading)} className="mt-10 scroll-mt-28 first:mt-0">
                <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{s.heading}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="mt-4 text-[17px] leading-8 text-slate-700">{renderRich(p)}</p>
                ))}
                {s.bullets && (
                  <ul className="mt-5 space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3 leading-7 text-slate-700">
                        <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />
                        <span>{renderRich(b)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h2 className="text-xl font-bold text-slate-950">Need storage with collection?</h2>
              <p className="mt-3 leading-7 text-slate-700">
                See how it works on our{" "}
                <Link href={post.landingLink.href} className="font-semibold text-emerald-700 underline underline-offset-2">{post.landingLink.label}</Link>{" "}
                page, or get a quote for your items.
              </p>
              <Link href="/get-a-quote?service=storage" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">
                Get a storage quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            <section className="mt-10 flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Image src="/logo.webp" alt="KXH Storage and Logistics logo" width={64} height={64} className="h-14 w-14 shrink-0 rounded-xl bg-white object-contain p-1" />
              <p className="text-sm leading-6 text-slate-600">
                <span className="block font-bold text-slate-900">Written by the KXH Storage &amp; Logistics team</span>
                We run collection, storage and delivery from our London warehouse. These guides come from the questions we answer for customers every week.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-bold text-slate-950">Keep reading</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {post.related.map((l) => (
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
              <Toc headings={post.sections.map((x) => x.heading)} />
              <QuoteCard />
            </div>
          </aside>
        </div>

        <Faqs faqs={post.faqs} />

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">More from the KXH blog</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((b) => (
                <Link key={b.slug} href={`/blog/${b.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <Image src={b.image.src} alt={b.image.alt} width={600} height={400} sizes="(max-width: 768px) 100vw, 33vw" className="h-44 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="font-bold leading-snug text-slate-950">{b.title}</h3>
                    <p className="mt-3 text-sm font-semibold text-emerald-700">Read article</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaBand cta="Get a storage quote" />
        <MainFooter locations={londonLocations} />
      </main>
    </>
  );
}
