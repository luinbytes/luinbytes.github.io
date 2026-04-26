"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center border-b border-nd-border"
    >
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-grid-subtle opacity-40 pointer-events-none" />

      <div className="container px-4 mx-auto max-w-5xl relative z-10 py-32 md:py-48">
        {/* Status indicator */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-nd-success" />
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-secondary">
            Available for work
          </span>
        </div>

        {/* Hero headline — Doto for the "one moment of surprise" */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-nd-text-display leading-[1.0] tracking-[-0.03em] mb-8">
          Self-taught
          <br />
          engineer making
          <br />
          <span className="text-nd-text-display">computers</span>{" "}
          <span className="text-nd-accent">do things.</span>
        </h1>

        {/* Description */}
        <p className="text-nd-text-secondary text-base md:text-lg max-w-xl leading-relaxed mb-12">
          Building Android apps, Linux tools, game mods, and Raycast
          extensions. If it saves me 5 seconds, I&apos;ll spend 5 hours
          automating it.
        </p>

        {/* Actions — Nothing button style */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-nd-text-display text-nd-black font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:opacity-80 min-h-[44px]"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-nd-border-visible text-nd-text-primary font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:border-nd-text-secondary min-h-[44px]"
          >
            Get in Touch
          </Link>
          <Link
            href="/lumi/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-nd-text-secondary font-mono text-[13px] tracking-[0.06em] uppercase nd-transition hover:text-nd-text-display min-h-[44px]"
          >
            Lumi&apos;s Blog
          </Link>
        </div>

        {/* Scroll hint — tertiary, pushed to edge */}
        <div className="mt-24 md:mt-32">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled">
            Scroll to explore ↓
          </span>
        </div>
      </div>
    </section>
  );
}
