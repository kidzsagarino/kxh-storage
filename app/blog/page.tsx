import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import CrispChat from "../components/chat/CrispChat";
import MainFooter from "../components/footer/MainFooter";
import Nav from "../components/MobileNav";
import { blogPosts } from "../lib/blog-posts";
import { londonLocations } from "../lib/location";

export const metadata: Metadata = {
  title: "Storage and Moving Blog | KXH Storage & Logistics London",
  description:
    "Practical guides on storage, packing, moving and decluttering in London from KXH Storage & Logistics.",
  alternates: { canonical: "https://kxhlogistics.co.uk/blog" },
};

export default function BlogIndex() {
  return (
    <>
      <CrispChat />
      <Nav />
      <main className="min-h-screen bg-white text-slate-900">
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 py-16 text-center text-white sm:py-20">
          <div className="mx-auto max-w-3xl px-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">KXH blog</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight !text-white sm:text-5xl">Storage and Moving Guides for London</h1>
            <p className="mt-4 leading-7 text-slate-300">
              Practical advice on storage, packing, decluttering and moving, from the team behind KXH Storage &amp; Logistics.
            </p>
          </div>
        </section>
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Image src={post.image.src} alt={post.image.alt} width={600} height={400} sizes="(max-width: 768px) 100vw, 33vw" className="h-48 w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{post.readMinutes} min read</p>
                <h2 className="mt-2 text-lg font-bold leading-snug text-slate-950">{post.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                <p className="mt-4 text-sm font-semibold text-emerald-700">Read article &rarr;</p>
              </div>
            </Link>
          ))}
        </section>
        <section className="mx-auto max-w-6xl px-5 pb-16 lg:px-8">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-950">Looking for a service, not a guide?</h2>
            <p className="mt-2 text-slate-700">Browse all KXH storage and moving services, or get a free quote.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/services" className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800">View all services</Link>
              <Link href="/get-a-quote?service=storage" className="rounded-xl border border-emerald-300 bg-white px-5 py-3 font-semibold text-emerald-800 hover:bg-emerald-50">Get a quote</Link>
            </div>
          </div>
        </section>
        <MainFooter locations={londonLocations} />
      </main>
    </>
  );
}
