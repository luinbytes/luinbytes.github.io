"use client";

// Easy to update data - just change these values
const currentStatus = {
    building: "file-deduplicator v3.1 (TUI mode)",
    learning: "Advanced Go patterns and system programming",
    obsessed: "Building tools that save 5 seconds in 5 hours",
    reading: "The Pragmatic Programmer",
};

export function Now() {
    return (
        <section id="now" className="py-24 relative border-t border-white/5">
            <div className="container px-4 mx-auto max-w-4xl">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 flex items-center gap-3">
                        <span className="text-neon">/</span> Now
                    </h2>
                </div>

                <div className="space-y-4 font-mono">
                    <p className="text-gray-300">
                        <span className="text-gray-500">→</span> Building: <span className="text-white">{currentStatus.building}</span>
                    </p>
                    <p className="text-gray-300">
                        <span className="text-gray-500">→</span> Learning: <span className="text-white">{currentStatus.learning}</span>
                    </p>
                    <p className="text-gray-300">
                        <span className="text-gray-500">→</span> Obsessed with: <span className="text-white">{currentStatus.obsessed}</span>
                    </p>
                    <p className="text-gray-300">
                        <span className="text-gray-500">→</span> Reading: <span className="text-white">{currentStatus.reading}</span>
                    </p>
                </div>

                <p className="mt-12 text-sm text-gray-600">
                    Last updated: Feb 2025
                </p>
            </div>
        </section>
    );
}
