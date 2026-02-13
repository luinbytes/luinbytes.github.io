"use client";

import { Calendar, GraduationCap, Rocket, Briefcase } from "lucide-react";

interface TimelineItem {
    year: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    iconBg: string;
}

const timelineItems: TimelineItem[] = [
    {
        year: "2025 - Present",
        title: "Raycast Extensions Developer",
        description: "Published multiple extensions to the Raycast store, including Window Walker, Sleep Calculator, and LIFX Controller.",
        icon: <Rocket className="w-4 h-4" />,
        iconBg: "bg-neon/20 text-neon",
    },
    {
        year: "2024",
        title: "AI-Adjacent Development",
        description: "Embraced AI tools and started building AI-powered utilities and automation tools.",
        icon: <Briefcase className="w-4 h-4" />,
        iconBg: "bg-purple-500/20 text-purple-400",
    },
    {
        year: "2020 - 2023",
        title: "Homelab & Self-Hosting",
        description: "Deep dive into Linux, Docker, and self-hosting. Built and maintained game servers and personal infrastructure.",
        icon: <GraduationCap className="w-4 h-4" />,
        iconBg: "bg-green-500/20 text-green-400",
    },
    {
        year: "2015 - 2019",
        title: "Self-Taught Foundation",
        description: "Started with Python, JavaScript, and web development. Explored game development and C++. The building blocks.",
        icon: <Calendar className="w-4 h-4" />,
        iconBg: "bg-yellow-500/20 text-yellow-400",
    },
    {
        year: "2013 - 2014",
        title: "The Modding Era",
        description: "PS3 modding, C#, VB.NET. Where it all started—learning by breaking things and putting them back together.",
        icon: <GraduationCap className="w-4 h-4" />,
        iconBg: "bg-red-500/20 text-red-400",
    },
];

export function Timeline() {
    return (
        <section id="timeline" className="py-24 relative border-t border-white/5">
            <div className="container px-4 mx-auto max-w-4xl">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 flex items-center gap-3">
                        <span className="text-neon">/</span> The Journey
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        From modding games to building tools people actually use.
                    </p>
                </div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px" />

                    {/* Timeline items */}
                    <div className="space-y-12">
                        {timelineItems.map((item, index) => (
                            <div
                                key={index}
                                className={`relative flex items-start gap-6 ${
                                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                            >
                                {/* Icon */}
                                <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 flex items-center justify-center">
                                    <div className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center border-2 border-background`}>
                                        {item.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                                    <span className="text-sm font-mono text-neon mb-2 block">{item.year}</span>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
