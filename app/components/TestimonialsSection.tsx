"use client";

import FloatingTrustpilot from "./trustpilot/FloatingTrustpilot";

type Testimonial = {
    name: string;
    date: string;
    rating: number;
    text: string;
    truncated?: boolean;
    avatar: string;
};

const testimonials: Testimonial[] = [
    {
        name: "Danhua Zhu",
        date: "Feb 20, 2026",
        rating: 5,
        text: "This is my fourth time using this service, and I truly appreciate the consistent support and value it provides. It genuinely means a lot to me.",
        avatar: "https://user-images.trustpilot.com/65e0c0b60d0ed90012c38393/73x73.png"
    },
    {
        name: "Yadi Gao",
        date: "Feb 1, 2026",
        rating: 5,
        text: "Excellent moving service! The team arrived on time, worked efficiently, and handled all my furniture and goods with great care. Everything was well protected and nothing was damaged during the move. Highly recommended.",
        truncated: false,
        avatar: "https://user-images.trustpilot.com/697e7e0fb51c7077cb8f006b/73x73.png"
    },
    {
        name: "Li Wenky",
        date: "Dec 9, 2025",
        rating: 5,
        text: "I’ve used Keli for every move in the past few years and he’s honestly the most professional and responsible mover I’ve ever met. The whole process is super simple and straightforward.",
        truncated: false,
        avatar: "https://user-images.trustpilot.com/668578be198df2a7a69682b0/73x73.png"
    },
    {
        name: "Kai C",
        date: "Jul 1, 2024",
        rating: 5,
        text: "After moving home three times with Keli’s help, I can confidently say he is the best ever. Always responsible, efficient, easy to communicate with, and incredibly patient.",
        truncated: false,
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
];

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`w-4 h-4 ${i < rating ? "fill-[#00B67A] text-[#00B67A]" : "text-gray-300"
                        }`}
                >
                    <path
                        fill="currentColor"
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                </svg>
            ))}
        </div>
    );
}

export default function TestimonialsSection() {
    return (
        <section className="relative bg-[#fbfbf9] border-t border-slate-200/70">
            <div className="relative mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                <h2 className="text-3xl font-black text-slate-950 sm:text-4xl lg:text-[3.15rem] lg:leading-[1.05]">
                    What our customers say
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mt-4">
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition border border-slate-200 pt-6"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3 ">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
                                        <img
                                            src={t.avatar}
                                            alt={t.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">{t.name}</p>
                                        <p className="text-xs text-gray-500">{t.date}</p>
                                    </div>
                                </div>

                                <Stars rating={t.rating} />
                            </div>

                            {/* Content */}
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {t.text}
                                {t.truncated && (
                                    <span className="text-gray-400">... See more</span>
                                )}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-10 flex justify-center">
                    <FloatingTrustpilot />
                </div>

            </div>

        </section>
    );
}