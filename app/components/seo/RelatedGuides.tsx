import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { seoLandingPages } from "@/app/lib/seo-pages";
import { blogPosts } from "@/app/lib/blog-posts";

type Props = {
  /** Landing page slugs to show. Omit to show all. */
  slugs?: string[];
  /** Blog post slugs to show. Omit to show none. */
  posts?: string[];
  heading?: string;
};

export default function RelatedGuides({
  slugs,
  posts = [],
  heading = "Storage guides and related services",
}: Props) {
  const pages = slugs
    ? slugs.map((s) => seoLandingPages.find((p) => p.slug === s)).filter(Boolean)
    : seoLandingPages;
  const articles = posts
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <section aria-labelledby="related-guides" className="border-t border-slate-200/70 bg-slate-50 py-14">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 id="related-guides" className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
          {heading}
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((p) => (
            <li key={p!.slug}>
              <Link
                href={`/${p!.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-900 transition hover:border-emerald-400 hover:bg-emerald-50"
              >
                {p!.h1}
                <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
          {articles.map((a) => (
            <li key={a!.slug}>
              <Link
                href={`/blog/${a!.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-900 transition hover:border-emerald-400 hover:bg-emerald-50"
              >
                {a!.title}
                <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm">
          <Link href="/blog" className="font-semibold text-emerald-700 hover:underline">
            Read all KXH storage guides
          </Link>
        </p>
      </div>
    </section>
  );
}
