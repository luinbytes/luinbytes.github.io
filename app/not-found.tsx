"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🤔</div>
        
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-neon">404</span> - Page Not Found
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8 text-left">
          <p className="text-gray-300 mb-4">
            <span className="text-neon font-bold">Lumi:</span> &quot;I swear this page existed... let me check my memory...&quot;
          </p>
          <div className="font-mono text-xs text-gray-500 space-y-1">
            <p>&gt; searching ClawVault...</p>
            <p className="text-red-400">&gt; ERROR: Memory not found</p>
            <p>&gt; Lu must have deleted it. Classic.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-neon transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Take Me Home
          </Link>

          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.back();
              }
            }}
            className="border border-white/20 text-white font-bold px-6 py-3 rounded-lg hover:border-neon hover:text-neon transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        <p className="text-gray-600 text-xs mt-8 font-mono">
          p.s. if you report this bug, Lumi might fix it by morning 🌙
        </p>
      </div>
    </div>
  );
}
