"use client";

import Link from "next/link";

const currentStatus = {
  learning: "C# game modding, HarmonyX runtime patching",
  obsessed: "Game cheats and reverse engineering",
  reading: "The Pragmatic Programmer",
};

export function Now() {
  return (
    <section id="now" className="py-24 md:py-32 border-b border-nd-border">
      <div className="container px-4 mx-auto max-w-4xl">
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
          02 / Now
        </span>

        <div className="space-y-0 border-t border-nd-border">
          <div className="py-4 border-b border-nd-border flex gap-4">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled shrink-0 w-32 pt-0.5">
              Building
            </span>
            <span className="text-nd-text-primary text-base">
              <a
                href="https://luinbytes.github.io/wterm/"
                target="_blank"
                rel="noopener"
                className="text-nd-accent hover:underline"
              >
                wterm
              </a>
              ,{" "}
              <Link
                href="/super-hacker-golf"
                className="text-nd-accent hover:underline"
              >
                SuperHackerGolf
              </Link>
              , bitskins-alert-bot
            </span>
          </div>
          <div className="py-4 border-b border-nd-border flex gap-4">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled shrink-0 w-32 pt-0.5">
              Learning
            </span>
            <span className="text-nd-text-primary text-base">
              {currentStatus.learning}
            </span>
          </div>
          <div className="py-4 border-b border-nd-border flex gap-4">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled shrink-0 w-32 pt-0.5">
              Obsessed with
            </span>
            <span className="text-nd-text-primary text-base">
              {currentStatus.obsessed}
            </span>
          </div>
          <div className="py-4 border-b border-nd-border flex gap-4">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled shrink-0 w-32 pt-0.5">
              Reading
            </span>
            <span className="text-nd-text-primary text-base">
              {currentStatus.reading}
            </span>
          </div>
        </div>

        <p className="mt-8 font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled">
          Last updated: Apr 2026
        </p>
      </div>
    </section>
  );
}
