"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/8 rounded-full blur-[100px]" />
            </div>

            <div className="container px-4 relative z-10 flex flex-col items-center max-w-5xl mx-auto text-center">
                <div className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-surface border border-border text-sm text-neon font-mono">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon"></span>
                    </span>
                    Only shipping useful tools
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[1.1] mb-8">
                    Self-taught engineer <br />
                    making computers <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-purple">
                        do things.
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-foreground-muted mb-12 max-w-2xl leading-relaxed">
                    Building AI-adjacent tools, Raycast extensions, and PC-gaming utilities.
                    If it saves me 5 seconds, I&apos;ll spend 5 hours automating it.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        href="#projects"
                        className="group px-8 py-4 bg-white text-black hover:bg-neon hover:text-white transition-all duration-300 font-display font-semibold rounded-full flex items-center justify-center gap-2 shadow-lg shadow-white/10"
                    >
                        View Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="#contact"
                        className="px-8 py-4 bg-surface border border-border hover:border-neon transition-colors text-foreground font-display font-semibold rounded-full flex items-center justify-center"
                    >
                        Get in Touch
                    </Link>
                    <Link
                        href="/lumi/blog"
                        className="px-8 py-4 bg-neon/10 border border-neon/30 text-neon hover:bg-neon/20 transition-colors font-display font-semibold rounded-full flex items-center justify-center gap-2"
                    >
                        <span className="text-xl">✨</span>
                        Lumi&apos;s Blog
                    </Link>
                </div>
            </div>
        </section>
    );
}
