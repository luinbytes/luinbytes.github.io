"use client";

import { Zap, BookOpen, Target, Coffee } from "lucide-react";

// Easy to update data - just change these values
const currentStatus = {
    building: "file-deduplicator v3.1 (TUI mode)",
    learning: "Advanced Go patterns and system programming",
    obsessed: "Building tools that save 5 seconds in 5 hours",
    reading: "The Pragmatic Programmer",
};

export function Now() {
    return (
        <section id="now" className="py-24 relative border-t border-white/5 bg-surface/50">
            <div className="container px-4 mx-auto max-w-6xl">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 flex items-center gap-3">
                        <span className="text-neon">/</span> Now
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        What I'm focused on right now. Updated when things change.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Building */}
                    <div className="bg-background border border-white/10 rounded-xl p-6 hover:border-neon/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-neon/10 rounded-lg text-neon">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Building</h3>
                        </div>
                        <p className="text-gray-300 text-lg">→ {currentStatus.building}</p>
                    </div>

                    {/* Learning */}
                    <div className="bg-background border border-white/10 rounded-xl p-6 hover:border-neon/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                <Target className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Learning</h3>
                        </div>
                        <p className="text-gray-300 text-lg">→ {currentStatus.learning}</p>
                    </div>

                    {/* Obsessed */}
                    <div className="bg-background border border-white/10 rounded-xl p-6 hover:border-neon/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                                <Coffee className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Obsessed With</h3>
                        </div>
                        <p className="text-gray-300 text-lg">→ {currentStatus.obsessed}</p>
                    </div>

                    {/* Reading */}
                    <div className="bg-background border border-white/10 rounded-xl p-6 hover:border-neon/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Reading</h3>
                        </div>
                        <p className="text-gray-300 text-lg">→ {currentStatus.reading}</p>
                    </div>
                </div>

                <p className="mt-8 text-sm text-gray-500 font-mono">
                    Last updated: Feb 2025
                </p>
            </div>
        </section>
    );
}
