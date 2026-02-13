"use client";

import { Quote, Users } from "lucide-react";

interface Testimonial {
    quote: string;
    author: string;
    role?: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Exactly what I needed. Simple, fast, and does the job perfectly.",
        author: "file-deduplicator user",
    },
    {
        quote: "Finally, a window switcher that works the way I think.",
        author: "Window Walker user",
        role: "Developer",
    },
    {
        quote: "These Raycast extensions have become part of my daily workflow.",
        author: "Raycast user",
    },
];

const stats = [
    { value: "1000+", label: "Downloads" },
    { value: "5+", label: "Raycast Extensions" },
    { value: "100%", label: "Open Source" },
];

export function Testimonials() {
    return (
        <section className="py-16 relative border-t border-white/5">
            <div className="container px-4 mx-auto max-w-6xl">
                {/* Stats Bar */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-neon mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
                        <Users className="w-5 h-5 text-gray-500" />
                        What People Say
                    </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-surface border border-white/10 rounded-xl p-6 relative"
                        >
                            <Quote className="w-8 h-8 text-neon/20 absolute top-4 right-4" />
                            <p className="text-gray-300 mb-4 relative z-10">"{testimonial.quote}"</p>
                            <div className="text-sm">
                                <span className="text-neon font-bold">{testimonial.author}</span>
                                {testimonial.role && (
                                    <span className="text-gray-500"> — {testimonial.role}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
