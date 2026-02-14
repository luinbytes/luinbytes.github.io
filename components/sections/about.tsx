"use client";

import { useState } from "react";
import { Activity, ChevronDown, ChevronUp } from "lucide-react";

export function About() {
    const [isExpanded, setIsExpanded] = useState(false);

    const milestones = [
        { year: "Feb 2026", event: "Launched Beam — contractor quoting SaaS, first revenue-focused project" },
        { year: "Jan 2026", event: "Window Walker Raycast extension published to the store!" },
        { year: "Late 2025", event: "First Raycast extension published to the store!" },
        { year: "Mid 2025", event: "Started developing Raycast extensions, maintainer of Iniuria.us AI Helper Bot" },
        { year: "2024", event: "The 'AI Boom', started developing with AI tools" },
        { year: "2022", event: "LOTS of home labbing..." },
        { year: "2021", event: "Hosted a few of my own game servers." },
        { year: "2020", event: "Started messing with servers, linux, self hosting and homelabbing" },
        { year: "2019", event: "Started learning React, Next.js, Tailwind CSS along side some C++ game software development" },
        { year: "2016", event: "Moved to PC Gaming" },
        { year: "2015", event: "Started learning Python, JS, web development, joined a modding team." },
        { year: "2014", event: "PS3 GSC & SPRX Modding, C# and VB.NET, Skype tools!" },
        { year: "2013", event: "First PS3 Jailbreak" },
    ];

    const INITIAL_SHOW = 4;
    const visibleMilestones = isExpanded ? milestones : milestones.slice(0, INITIAL_SHOW);
    const hiddenCount = milestones.length - INITIAL_SHOW;

    return (
        <section id="about" className="py-20 relative border-t border-white/5">
            <div className="container px-4 mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row gap-20 items-start">

                    <div className="flex-1">
                        <h2 className="text-4xl font-bold tracking-tighter mb-12 flex items-center gap-3">
                            <span className="text-neon">/</span> About Me
                        </h2>

                        <div className="prose prose-invert prose-lg text-gray-400 space-y-6">
                            <p>
                                I'm a self-taught software engineer who learns by breaking things. My journey didn't start with "Hello World"—it started with the <span className="text-white font-bold">PlayStation 3</span> and <span className="text-white font-bold">Call of Duty: World at War</span>.
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
                        <div className="border-l border-white/10 pl-5 relative">
                            <div
                                className="space-y-3 overflow-hidden transition-all duration-500 ease-out"
                                style={{
                                    maxHeight: isExpanded ? `${milestones.length * 60}px` : `${INITIAL_SHOW * 60}px`
                                }}
                            >
                                {milestones.map((m, i) => (
                                    <div
                                        key={i}
                                        className="relative transition-all duration-300"
                                        style={{
                                            opacity: !isExpanded && i >= INITIAL_SHOW ? 0 : 1,
                                            transform: !isExpanded && i >= INITIAL_SHOW ? 'translateY(-10px)' : 'translateY(0)'
                                        }}
                                    >
                                        <div className="absolute -left-[23px] top-1 w-2 h-2 bg-surface border border-white/20 rounded-full" />
                                        <span className="text-xs font-mono text-neon">{m.year}</span>
                                        <span className="text-xs text-gray-500 mx-1">—</span>
                                        <span className="text-xs text-gray-400">{m.event}</span>
                                    </div>
                                ))}
                            </div>

                            {hiddenCount > 0 && (
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="mt-4 flex items-center gap-1 text-xs text-gray-500 hover:text-neon transition-colors duration-200 group"
                                >
                                    {isExpanded ? (
                                        <>
                                            <ChevronUp className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" />
                                            Show less
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5" />
                                            Show {hiddenCount} more
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
