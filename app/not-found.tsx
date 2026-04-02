"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <span className="font-display text-6xl font-bold text-nd-text-display block mb-8 tracking-[-0.03em]">
          404
        </span>

        <h1 className="font-body text-xl font-bold text-nd-text-secondary mb-6">
          Page Not Found
        </h1>

        <div className="bg-nd-surface border border-nd-border p-6 mb-8 text-left">
          <p className="text-nd-text-secondary text-sm mb-3 font-body">
            <span className="text-nd-accent font-mono text-[11px] tracking-[0.06em] uppercase">
              Lumi:
            </span>{" "}
            &quot;I swear this page existed... let me check my memory...&quot;
          </p>
          <div className="font-mono text-[11px] text-nd-text-disabled space-y-1 tracking-[0.04em]">
            <p>&gt; searching ClawVault...</p>
            <p className="text-nd-accent">&gt; ERROR: Memory not found</p>
            <p>&gt; Lu must have deleted it. Classic.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-nd-text-display text-nd-black font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:opacity-80 min-h-[44px]"
          >
            Take Me Home
          </Link>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.back();
              }
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-nd-border-visible text-nd-text-primary font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:border-nd-text-secondary min-h-[44px]"
          >
            Go Back
          </button>
        </div>

        <p className="font-mono text-[10px] text-nd-text-disabled mt-12 tracking-[0.06em] uppercase">
          p.s. if you report this bug, Lumi might fix it by morning
        </p>
      </div>
    </div>
  );
}
