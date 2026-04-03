"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  const milestones = [
    { year: "Feb 2026", event: "Launched Beam — contractor quoting SaaS, first revenue-focused project" },
    { year: "Jan 2026", event: "Window Walker Raycast extension published to the store!" },
    { year: "Late 2025", event: "First Raycast extension published to the store!" },
    { year: "Mid 2025", event: "Started developing Raycast extensions, maintainer of Iniuria.us AI Helper Bot" },
    { year: "2024", event: "The 'AI Boom', started developing with AI tools" },
    { year: "2022", event: "LOTS of home labbing..." },
    { year: "2021", event: "Hosted a few of my own game servers." },
    { year: "2020", event: "Started messing with servers, linux, self hosting and homelabbing" },
    { year: "2019", event: "Started learning React, Next.js, Tailwind CSS along side some C++ game software development" },
    { year: "2016", event: "Moved to PC Gaming" },
    { year: "2015", event: "Started learning Python, JS, web development, joined a modding team." },
    { year: "2014", event: "PS3 GSC & SPRX Modding, C# and VB.NET, Skype tools!" },
    { year: "2013", event: "First PS3 Jailbreak" },
  ];

  const INITIAL_SHOW = 4;
  const hiddenCount = milestones.length - INITIAL_SHOW;

  return (
    <section id="about" className="py-24 md:py-32 border-b border-nd-border">
      <div className="container px-4 mx-auto max-w-6xl">
        {/* Section label */}
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
          01 / About
        </span>

        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="flex-1">
            <h2 className="font-body text-3xl md:text-4xl font-bold text-nd-text-display tracking-[-0.02em] leading-tight mb-8">
              I started with a PS3
              <br />
              <span className="text-nd-text-secondary">and never stopped breaking things.</span>
            </h2>

            <div className="space-y-5 text-nd-text-secondary text-base leading-relaxed">
              <p>
                I&apos;m a self-taught software engineer who learns by breaking things. My
                journey didn&apos;t start with &quot;Hello World&quot;—it started with the{" "}
                <span className="text-nd-text-display font-medium">PlayStation 3</span> and{" "}
                <span className="text-nd-text-display font-medium">
                  Call of Duty: World at War
                </span>
                .
              </p>
              <p>
                I saw people modifying the game and wanted to do the same. I started
                with simple save game modding to load config files, then moved onto
                patches. Eventually, I was soldering an{" "}
                <span className="text-nd-accent">E3 Flasher</span> to my PS3 to
                downgrade it, install custom firmware, and run my own unsigned code.
              </p>
              <p>
                That experience—taking hardware apart, understanding how it works, and
                making it do things it wasn&apos;t supposed to—ignited a passion for
                code that has only grown since. Now I build tools because{" "}
                <span className="text-nd-text-display font-medium">
                  if something doesn&apos;t work how I want it to, I fix it.
                </span>
              </p>
            </div>
          </div>

          {/* Milestones — data list style */}
          <div className="w-full md:w-80 flex-shrink-0">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
              Milestones
            </span>
            <div className="border-t border-nd-border">
              <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: isExpanded ? `${milestones.length * 52}px` : `${INITIAL_SHOW * 52}px`,
                }}
              >
                {milestones.map((m, i) => (
                  <div
                    key={i}
                    className="py-3 border-b border-nd-border flex gap-3 transition-all duration-300"
                    style={{
                      opacity: !isExpanded && i >= INITIAL_SHOW ? 0 : 1,
                    }}
                  >
                    <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled shrink-0 w-20 pt-0.5">
                      {m.year}
                    </span>
                    <span className="text-sm text-nd-text-secondary">{m.event}</span>
                  </div>
                ))}
              </div>

              {hiddenCount > 0 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 flex items-center gap-1 font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled hover:text-nd-text-secondary nd-transition group"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-3 h-3" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3" />
                      Show {hiddenCount} more
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
