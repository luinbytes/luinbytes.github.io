"use client";

import Link from "next/link";
import { Home, Terminal } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center max-w-2xl">
                {/* Big 404 */}
                <div className="relative mb-8">
                    <h1 className="text-[12rem] md:text-[16rem] font-bold tracking-tighter text-white/5 leading-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Terminal className="w-24 h-24 md:w-32 md:h-32 text-neon animate-pulse" />
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                    <span className="block mt-2 text-neon">
                        Maybe I deleted it. Who knows.
                    </span>
                </p>

                {/* Debug-style info */}
                <div className="bg-surface border border-white/10 rounded-lg p-4 mb-8 text-left font-mono text-sm">
                    <div className="text-gray-500">
                        <span className="text-red-400">Error:</span> 404 - Not Found
                    </div>
                    <div className="text-gray-500">
                        <span className="text-yellow-400">Path:</span> {typeof window !== 'undefined' ? window.location.pathname : 'unknown'}
                    </div>
                    <div className="text-gray-500">
                        <span className="text-neon">Hint:</span> Check the URL or go home
                    </div>
                </div>

                {/* Back to Home */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-neon text-black font-bold rounded-full hover:bg-neon/90 transition-colors"
                >
                    <Home className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
