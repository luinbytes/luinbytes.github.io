"use client";

import { Activity } from "lucide-react";

export function About() {
    const milestones = [
        { year: "2025", event: "Started developing Raycast extensions, maintainer of Iniuria.us AI Helper Bot" },
        { year: "2024", event: "Contributed to wplacer bot for r/place clones" },
        { year: "2020", event: "Started messing with servers, linux, self hosting and homelabbing" },
        { year: "2019", event: "Started learning React, Next.js, Tailwind CSS along side some C++ game software development" },
        { year: "2016", event: "Moved to PC Gaming" },
        { year: "2015", event: "Started learning Python, JS, web development" },
        { year: "2014", event: "PS3 GSC & SPRX Modding, C# and VB.NET, Skype tools!" },
        { year: "2013", event: "First PS3 Jailbreak" },
    ];

    return (
        <section id="about" className="py-32 relative border-t border-white/5">
            <div className="container px-4 mx-auto max-w-4xl">
                <div className="flex flex-col md:flex-row gap-16 items-start">

                    <div className="flex-1">
                        <h2 className="text-4xl font-bold tracking-tighter mb-8 flex items-center gap-3">
                            <span className="text-neon">/</span> About Me
                        </h2>

                        <div className="prose prose-invert prose-lg text-gray-400">
                            <p>
                                I’m a self-taught software engineer who learns by breaking things. My journey didn't start with "Hello World"—it started with the <span className="text-white font-bold">PlayStation 3</span> and <span className="text-white font-bold">Call of Duty: World at War</span>.
                            </p>
                            <p>
                                I saw people modifying the game and wanted to do the same. I started with simple save game modding to load config files, then moved onto patches. Eventually, I was soldering an <span className="text-neon">E3 Flasher</span> to my PS3 to downgrade it, install custom firmware, and run my own unsigned code.
                            </p>
                            <p>
                                That experience—taking hardware apart, understanding how it works, and making it do things it wasn't supposed to—ignited a passion for code that has only grown since. Now I build tools because <span className="text-neon">if something doesn't work how I want it to, I fix it.</span>
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-80 flex-shrink-0">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-gray-500" />
                            Milestones
                        </h3>
                        <div className="space-y-6 border-l border-white/10 pl-6 relative">
                            {milestones.map((m, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-[29px] top-1.5 w-3 h-3 bg-surface border border-white/20 rounded-full" />
                                    <span className="block text-xs font-mono text-neon mb-1">{m.year}</span>
                                    <p className="text-sm text-gray-300 leading-snug">{m.event}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
