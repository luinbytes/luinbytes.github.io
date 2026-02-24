"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/3 rounded-full blur-[100px]" />
            </div>

            <div className="container px-4 relative z-10 flex flex-col items-center max-w-5xl mx-auto text-center">
                <div className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-surface border border-border text-sm text-accent font-mono">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    Available for work
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[1.1] mb-8">
                    Self-taught engineer <br />
                    making computers <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">
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
                        className="group px-8 py-4 bg-accent text-white hover:bg-accent-hover transition-all duration-200 font-display font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
                    >
                        View Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="#contact"
                        className="px-8 py-4 bg-surface border border-border hover:border-foreground-muted transition-colors text-foreground font-display font-semibold rounded-xl flex items-center justify-center"
                    >
                        Get in Touch
                    </Link>
                </div>
            </div>
        </section>
    );
}
