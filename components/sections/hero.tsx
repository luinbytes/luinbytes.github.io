"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden bg-surface">
            {/* Brutalist grid overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
                <div className="w-full h-full" style={{
                    backgroundImage: `
                        linear-gradient(to right, #000 1px, transparent 1px),
                        linear-gradient(to bottom, #000 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px'
                }} />
            </div>

            {/* Diagonal accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent transform skew-x-12 origin-top -mr-20 z-0" />

            <div className="container px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
                    {/* Left column - Label */}
                    <div className="col-span-12 md:col-span-3 order-1 md:order-1">
                        <div className="md:fixed md:left-8 md:top-32">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-3 h-3 bg-accent animate-pulse" />
                                <span className="font-mono text-xs tracking-widest uppercase">
                                    Available for work
                                </span>
                            </div>
                            <div className="font-mono text-xs text-foreground/60">
                                EST. 2024
                            </div>
                        </div>
                    </div>

                    {/* Center column - Main content */}
                    <div className="col-span-12 md:col-span-6 order-2 md:order-2">
                        <h1 className="font-display text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.85] tracking-tighter mb-8">
                            LU
                            <span className="text-accent">.</span>
                        </h1>

                        <div className="space-y-6 mb-12">
                            <p className="font-body text-xl md:text-2xl leading-relaxed text-foreground/80">
                                Self-taught engineer building tools that actually matter.
                            </p>
                            <p className="font-mono text-sm text-foreground/60 leading-relaxed">
                                AI automation • Raycast extensions • Gaming utilities
                                <br />
                                <span className="text-accent">If it saves 5 seconds, I'll automate it.</span>
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="#projects"
                                className="group px-6 py-4 bg-foreground text-surface hover:bg-accent transition-colors font-mono text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-foreground"
                            >
                                See Projects
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#contact"
                                className="px-6 py-4 bg-transparent border-2 border-foreground/30 hover:border-foreground transition-colors font-mono text-sm font-bold uppercase tracking-wider text-foreground flex items-center justify-center"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>

                    {/* Right column - Stats */}
                    <div className="col-span-12 md:col-span-3 order-3 md:order-3">
                        <div className="md:fixed md:right-8 md:top-32 space-y-6">
                            <div className="border-l-2 border-accent pl-4">
                                <div className="font-display text-4xl md:text-5xl font-bold">40+</div>
                                <div className="font-mono text-xs uppercase tracking-wider text-foreground/60">
                                    Public Repos
                                </div>
                            </div>
                            <div className="border-l-2 border-accent-secondary pl-4">
                                <div className="font-display text-4xl md:text-5xl font-bold">10K+</div>
                                <div className="font-mono text-xs uppercase tracking-wider text-foreground/60">
                                    Lines of Code
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom strip */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-foreground flex items-center justify-center overflow-hidden">
                <div className="font-mono text-xs text-surface whitespace-nowrap animate-marquee">
                    BUILDING • AUTOMATING • SHIPPING • REPEAT •
                </div>
            </div>
        </section>
    );
}
