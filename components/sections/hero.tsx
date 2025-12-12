"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container px-4 relative z-10 flex flex-col items-start max-w-4xl">
                <div className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-neon font-mono w-fit backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon"></span>
                    </span>
                    Only shipping useful tools
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6 text-white">
                    Self-taught engineer <br />
                    making computers <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-purple-500">
                        do things.
                    </span>
                </h1>

                <p className="text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
                    Building AI-adjacent tools, Raycast extensions, and PC-gaming utilities.
                    If it saves me 5 seconds, I'll spend 5 hours automating it.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group px-8 py-4 bg-white text-black hover:bg-neon transition-all duration-300 font-bold rounded-full flex items-center justify-center gap-2"
                    >
                        View Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 bg-transparent border border-white/20 hover:border-white transition-colors text-white font-bold rounded-full flex items-center justify-center"
                    >
                        Request a Tool
                    </Link>
                </div>
            </div>
        </section>
    );
}
