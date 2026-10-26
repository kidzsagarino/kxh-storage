import TrustpilotBlock from "./trustpilot/TrustpilotBlock";
import { Quote, Star } from "lucide-react";

type Testimonial = {
    name: string;
    date: string;
    rating: number;
    text: string;
    /** Real Trustpilot profile image; when missing we show the reviewer's initials. */
    avatar?: string;
};

const testimonials: Testimonial[] = [
    {
        name: "Danhua Zhu",
        date: "Feb 20, 2026",
        rating: 5,
        text: "This is my fourth time using this service, and I truly appreciate the consistent support and value it provides. It genuinely means a lot to me.",
        avatar: "https://user-images.trustpilot.com/65e0c0b60d0ed90012c38393/73x73.png",
    },
    {
        name: "Yadi Gao",
        date: "Feb 1, 2026",
        rating: 5,
        text: "Excellent moving service! The team arrived on time, worked efficiently, and handled all my furniture and goods with great care. Everything was well protected and nothing was damaged during the move. Highly recommended.",
        avatar: "https://user-images.trustpilot.com/697e7e0fb51c7077cb8f006b/73x73.png",
    },
    {
        name: "Li Wenky",
        date: "Dec 9, 2025",
        rating: 5,
        text: "I’ve used Keli for every move in the past few years and he’s honestly the most professional and responsible mover I’ve ever met. The whole process is super simple and straightforward.",
        avatar: "https://user-images.trustpilot.com/668578be198df2a7a69682b0/73x73.png",
    },
    {
        name: "Kai C",
        date: "Jul 1, 2024",
        rating: 5,
        text: "After moving home three times with Keli’s help, I can confidently say he is the best ever. Always responsible, efficient, easy to communicate with, and incredibly patient.",
    },
];

function initials(name: string) {
    return name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function TestimonialsSection() {
    return (
        <section className="relative overflow-hidden border-t border-slate-200/70 bg-gradient-to-b from-[#f7faf8] to-white">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="kxh-reveal flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
                    <div className="max-w-2xl">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Customer reviews</p>
                        <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl lg:text-5xl">What our customers say</h2>
                        <p className="mt-4 text-slate-600">
                            Real reviews from customers on Trustpilot. We are rated 5.0 from 50 reviews on Google.
                        </p>
                    </div>
                    <a
                        href="https://www.trustpilot.com/review/kxhlogistics.co.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300"
                    >
                        Read all reviews on Trustpilot →
                    </a>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {testimonials.map((t, idx) => (
                        <figure
                            key={t.name}
                            className="kxh-reveal kxh-card3d relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
                            style={{ transitionDelay: `${(idx % 2) * 80}ms` }}
                        >
                            <Quote className="absolute right-6 top-6 h-10 w-10 text-emerald-100" aria-hidden="true" />
                            <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`flex h-6 w-6 items-center justify-center ${i < t.rating ? "bg-[#00b67a]" : "bg-slate-200"}`}
                                    >
                                        <Star className="h-4 w-4 fill-white text-white" aria-hidden="true" />
                                    </span>
                                ))}
                            </div>
                            <blockquote className="mt-5 text-[15px] leading-7 text-slate-700">“{t.text}”</blockquote>
                            <figcaption className="mt-6 flex items-center gap-3">
                                {t.avatar ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={t.avatar}
                                        alt=""
                                        className="h-11 w-11 rounded-full object-cover"
                                        width={44}
                                        height={44}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                ) : (
                                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                                        {initials(t.name)}
                                    </span>
                                )}
                                <span>
                                    <span className="block text-sm font-bold text-slate-900">{t.name}</span>
                                    <span className="block text-xs text-slate-500">
                                        Trustpilot review · {t.date}
                                    </span>
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>

                <div className="mx-auto mt-10 max-w-3xl">
                    <TrustpilotBlock tone="light" />
                </div>
            </div>
        </section>
    );
}
