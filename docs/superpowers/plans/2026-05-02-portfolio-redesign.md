# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved lean, interactive portfolio homepage: a sharper brutalist Problem Index with light Workbench Dashboard texture and a small command/search layer.

**Architecture:** Add a homepage-specific data module that defines problems, selected builds, workbench fields, and command-search terms. Replace the current long homepage section stack with focused sections: hero/workbench, interactive problem index, selected builds, compact origin, status strip, and contact. Reuse the existing Next.js App Router, Tailwind tokens, `cmdk` command menu, and lucide icon system.

**Tech Stack:** Next.js 16 App Router, React 19 client components where interaction is needed, Tailwind CSS v4 theme tokens in `app/globals.css`, `cmdk`, `lucide-react`, existing `lib/data.ts` project catalog.

---

## File Map

- Create `lib/homepage.ts`: canonical homepage data for problem rows, selected build rows, workbench fields, quick filters, and contact actions.
- Create `components/sections/problem-index.tsx`: client component for selectable problem rows, detail pane, arrow-key navigation, and responsive layout.
- Create `components/sections/selected-builds.tsx`: server component rendering the lean selected-build dossier rows.
- Create `components/sections/origin-status.tsx`: compact origin note plus current status strip.
- Modify `components/sections/hero.tsx`: replace the current hero with the approved headline, CTA controls, and workbench panel.
- Modify `components/sections/contact.tsx`: simplify to direct contact/footer close.
- Modify `components/command-menu.tsx`: search projects and quick filters, jump to sections/pages, keep Ctrl/Cmd+K.
- Modify `components/layout/header.tsx`: simplify main-page nav to Builds, About, Status, Contact, command trigger; keep dedicated project-page navigation safe.
- Modify `app/page.tsx`: remove long section imports and compose the new lean homepage.
- Leave `app/globals.css` unchanged unless visual QA reveals a concrete repeated styling bug that cannot be fixed cleanly in component classes.

## Task 1: Homepage Data Model

**Files:**
- Create: `lib/homepage.ts`
- Read: `lib/data.ts`

- [ ] **Step 1: Create the homepage data module**

Create `lib/homepage.ts` with this complete content:

```ts
import {
  Activity,
  AudioLines,
  Bot,
  Boxes,
  CheckSquare,
  Files,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";

export type HomepageLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ProblemBuild = {
  id: string;
  index: string;
  problem: string;
  buildName: string;
  shortName: string;
  summary: string;
  outcome: string;
  tech: string[];
  href: string;
  sourceHref?: string;
  filters: string[];
  icon: LucideIcon;
};

export const workbenchItems = [
  { label: "Focus", value: "Building & shipping" },
  { label: "Currently", value: "Meteor, linux-sonar, Raycast extensions" },
  { label: "Always", value: "Learning, breaking, rebuilding" },
  { label: "Jump", value: "/linux /android /reverse /raycast" },
] as const;

export const problemBuilds: ProblemBuild[] = [
  {
    id: "linux-sonar",
    index: "01",
    problem: "Linux audio tools are stuck in 2005.",
    buildName: "linux-sonar",
    shortName: "Linux audio",
    summary:
      "SteelSeries Sonar for Linux: per-app PipeWire routing, ChatMix, mic effects, and hardware-aware controls.",
    outcome:
      "Turns headset routing and mic processing into a native Linux workflow instead of a Windows-only compromise.",
    tech: ["Python", "PipeWire", "WirePlumber", "GTK4"],
    href: "/linux-sonar",
    sourceHref: "https://github.com/luinbytes/linux-sonar",
    filters: ["linux", "audio", "pipewire", "systems"],
    icon: AudioLines,
  },
  {
    id: "meteor",
    index: "02",
    problem: "Task and habit apps are either bloated or inflexible.",
    buildName: "Meteor",
    shortName: "Android daily view",
    summary:
      "An offline-first Android app that keeps tasks, habits, streaks, reminders, and widgets in one daily surface.",
    outcome:
      "One calm local-first place for the daily loop: no account, no cloud, no productivity theater.",
    tech: ["Kotlin", "Compose", "Room", "Android"],
    href: "/meteor",
    filters: ["android", "kotlin", "habits", "tasks"],
    icon: CheckSquare,
  },
  {
    id: "file-deduplicator",
    index: "03",
    problem: "Duplicate files waste space and clutter everything.",
    buildName: "file-deduplicator",
    shortName: "Duplicate cleanup",
    summary:
      "A fast CLI that finds exact duplicates and visually similar images with perceptual hashing.",
    outcome:
      "Safe dry-runs, move-before-delete flows, and real cleanup for messy photo/file libraries.",
    tech: ["Go", "CLI", "pHash", "SHA256"],
    href: "/file-deduplicator",
    sourceHref: "https://github.com/luinbytes/file-deduplicator",
    filters: ["cli", "go", "files", "images"],
    icon: Files,
  },
  {
    id: "reverse-engineering",
    index: "04",
    problem: "Game systems are opaque black boxes.",
    buildName: "game systems / reverse engineering",
    shortName: "Systems craft",
    summary:
      "Tools to inspect, understand, and work with game internals: overlays, hooks, trainers, and runtime instrumentation.",
    outcome:
      "A practical path from unknown runtime behavior to usable tooling and clear feedback loops.",
    tech: ["C#", "C", "HarmonyX", "BepInEx"],
    href: "/risk-of-anticheat",
    filters: ["reverse", "systems", "game", "modding"],
    icon: Gamepad2,
  },
  {
    id: "raycast-automation",
    index: "05",
    problem: "Automation is more work than doing the thing.",
    buildName: "Raycast automation",
    shortName: "Small workflow tools",
    summary:
      "Raycast extensions and utilities that remove friction from lookups, window switching, smart-home control, and repeated tasks.",
    outcome:
      "Small tools with big leverage: fast to summon, easy to trust, and designed for muscle memory.",
    tech: ["TypeScript", "Raycast API", "Node"],
    href: "https://github.com/luinbytes/extensions",
    sourceHref: "https://github.com/luinbytes/extensions",
    filters: ["raycast", "automation", "typescript", "workflow"],
    icon: Bot,
  },
];

export const selectedBuilds = problemBuilds;

export const originLines = [
  "Started on a PS3: jailbreaks, modding, firmware rabbit holes, and too many late nights taking things apart.",
  "That curiosity never really left. Now it shows up as Android apps, Linux tools, automation, and runtime systems work.",
  "The through-line is simple: understand the system, rebuild the annoying part, ship the useful version.",
];

export const commandFilters = [
  { label: "/linux", value: "linux", icon: AudioLines },
  { label: "/android", value: "android", icon: CheckSquare },
  { label: "/reverse", value: "reverse", icon: Activity },
  { label: "/raycast", value: "raycast", icon: Bot },
  { label: "/cli", value: "cli", icon: Boxes },
] as const;

export const contactLinks: HomepageLink[] = [
  { label: "Email", href: "mailto:0x6c75@protonmail.com" },
  { label: "GitHub", href: "https://github.com/luinbytes", external: true },
  { label: "X / Twitter", href: "https://x.com/x6c75", external: true },
];
```

- [ ] **Step 2: Run lint to catch type/import issues**

Run:

```bash
npm run lint
```

Expected: lint passes, or only pre-existing warnings unrelated to `lib/homepage.ts`. If `lucide-react` type exports differ, change `type LucideIcon` import to:

```ts
import type { LucideIcon } from "lucide-react";
```

- [ ] **Step 3: Commit the data model**

```bash
git add lib/homepage.ts
git commit -m "feat: add homepage redesign data"
```

## Task 2: Interactive Problem Index

**Files:**
- Create: `components/sections/problem-index.tsx`
- Read: `lib/homepage.ts`

- [ ] **Step 1: Create the ProblemIndex component**

Create `components/sections/problem-index.tsx`:

```tsx
"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { problemBuilds } from "@/lib/homepage";
import { cn } from "@/lib/utils";

export function ProblemIndex() {
  const [selectedId, setSelectedId] = useState(problemBuilds[0]?.id ?? "");
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedIndex = useMemo(
    () => Math.max(0, problemBuilds.findIndex((item) => item.id === selectedId)),
    [selectedId]
  );
  const selected = problemBuilds[selectedIndex] ?? problemBuilds[0];
  const SelectedIcon = selected.icon;

  const moveSelection = (direction: 1 | -1) => {
    const nextIndex =
      (selectedIndex + direction + problemBuilds.length) % problemBuilds.length;
    const next = problemBuilds[nextIndex];
    setSelectedId(next.id);
    rowRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="builds" className="border-b border-nd-border py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-label text-nd-accent">
              01 / Problems I Refused To Accept
            </span>
            <h2 className="max-w-2xl font-body text-3xl font-bold leading-tight tracking-normal text-nd-text-display md:text-5xl">
              The annoying parts became the roadmap.
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm leading-relaxed text-nd-text-secondary md:block">
            Select a problem to see the build, stack, and outcome. The range is
            the point: different surfaces, same reflex.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1fr)]">
          <div
            role="listbox"
            aria-label="Problems I refused to accept"
            aria-activedescendant={`problem-${selected.id}`}
            className="border border-nd-border-visible"
          >
            {problemBuilds.map((item, index) => {
              const Icon = item.icon;
              const isSelected = item.id === selected.id;

              return (
                <button
                  id={`problem-${item.id}`}
                  key={item.id}
                  ref={(node) => {
                    rowRefs.current[index] = node;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(item.id)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      moveSelection(1);
                    }
                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      moveSelection(-1);
                    }
                  }}
                  className={cn(
                    "group grid w-full grid-cols-[52px_1fr_28px] items-center gap-4 border-b border-nd-border p-4 text-left nd-transition last:border-b-0 md:grid-cols-[72px_1fr_40px] md:p-5",
                    isSelected
                      ? "bg-nd-surface text-nd-text-display"
                      : "bg-nd-black text-nd-text-secondary hover:bg-nd-surface/60 hover:text-nd-text-primary"
                  )}
                >
                  <span
                    className={cn(
                      "flex aspect-square items-center justify-center border nd-transition",
                      isSelected
                        ? "border-nd-accent text-nd-accent"
                        : "border-nd-border-visible text-nd-text-disabled group-hover:text-nd-text-primary"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="mb-1 block font-mono text-[10px] uppercase tracking-label text-nd-text-disabled">
                      {item.index} / Problem
                    </span>
                    <span className="block text-base font-medium leading-snug md:text-lg">
                      {item.problem}
                    </span>
                  </span>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 nd-transition",
                      isSelected
                        ? "translate-x-0 text-nd-accent"
                        : "text-nd-text-disabled group-hover:translate-x-1 group-hover:text-nd-text-primary"
                    )}
                  />
                </button>
              );
            })}
          </div>

          <article className="min-h-[420px] border border-nd-border-visible bg-nd-surface p-6 md:p-8">
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <span className="mb-3 block font-mono text-[11px] uppercase tracking-label text-nd-text-disabled">
                  Selected build
                </span>
                <h3 className="font-body text-3xl font-bold leading-tight tracking-normal text-nd-text-display md:text-5xl">
                  {selected.buildName}
                </h3>
              </div>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-nd-accent text-nd-accent">
                <SelectedIcon className="h-6 w-6" strokeWidth={1.5} />
              </span>
            </div>

            <div className="grid gap-8 md:grid-cols-[1fr_0.85fr]">
              <div>
                <p className="text-base leading-relaxed text-nd-text-primary md:text-lg">
                  {selected.summary}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-nd-text-secondary">
                  {selected.outcome}
                </p>
              </div>

              <div>
                <span className="mb-3 block font-mono text-[11px] uppercase tracking-label text-nd-text-disabled">
                  Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {selected.tech.map((tech) => (
                    <span
                      key={tech}
                      className="border border-nd-border-visible px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-label-tight text-nd-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-nd-border pt-6 sm:flex-row">
              <Link
                href={selected.href}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-nd-text-display bg-nd-text-display px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-label-tight text-nd-black nd-transition hover:opacity-80"
              >
                View build
                <ArrowRight className="h-4 w-4" />
              </Link>
              {selected.sourceHref && (
                <a
                  href={selected.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-nd-border-visible px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-label-tight text-nd-text-primary nd-transition hover:border-nd-text-secondary"
                >
                  Source
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected: pass. If Next lint complains about `role="option"` buttons, keep the role because the listbox pattern is intentional and accessible with arrow keys.

- [ ] **Step 3: Commit the problem index**

```bash
git add components/sections/problem-index.tsx
git commit -m "feat: add interactive problem index"
```

## Task 3: Hero And Workbench Panel

**Files:**
- Modify: `components/sections/hero.tsx`

- [ ] **Step 1: Replace the Hero component**

Replace the full contents of `components/sections/hero.tsx` with:

```tsx
"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, Command } from "lucide-react";
import { workbenchItems } from "@/lib/homepage";

export function Hero() {
  const openCommandMenu = () => {
    window.dispatchEvent(new CustomEvent("lu:open-command-menu"));
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden border-b border-nd-border"
    >
      <div className="absolute inset-0 dot-grid-subtle opacity-30" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-nd-border-visible" />

      <div className="container relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-24 md:py-28 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <h1 className="max-w-4xl font-body text-5xl font-bold leading-[0.95] tracking-normal text-nd-text-display md:text-7xl lg:text-8xl">
            I get annoyed,
            <br />
            then I build the
            <br />
            <span className="text-nd-accent">missing thing.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-nd-text-secondary md:text-lg">
            Android apps, Linux systems, reverse-engineering tools, automation,
            and small utilities from the edge cases normal software leaves
            behind.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#builds"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-nd-text-display bg-nd-text-display px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-label-tight text-nd-black nd-transition hover:opacity-80"
            >
              Explore Problems
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={openCommandMenu}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-nd-border-visible px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-label-tight text-nd-text-primary nd-transition hover:border-nd-text-secondary"
            >
              <Command className="h-4 w-4" />
              Open Command Menu
            </button>
          </div>
        </div>

        <aside className="border border-nd-border-visible bg-nd-black/80 p-5 md:p-6">
          <div className="mb-6 flex items-center justify-between border-b border-nd-border pb-4 font-mono text-[10px] uppercase tracking-label text-nd-text-disabled">
            <span>Workbench</span>
            <span>May 2026</span>
          </div>
          <dl className="space-y-0">
            {workbenchItems.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[7rem_1fr] gap-4 border-b border-nd-border py-4 last:border-b-0"
              >
                <dt className="font-mono text-[10px] uppercase tracking-label text-nd-accent">
                  {item.label}
                </dt>
                <dd className="text-sm leading-relaxed text-nd-text-primary">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>

        <a
          href="#builds"
          className="absolute bottom-6 left-4 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-label text-nd-text-disabled nd-transition hover:text-nd-text-primary md:flex"
        >
          <span>// next</span>
          <ArrowDown className="h-4 w-4 text-nd-accent" />
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update command menu to listen for the hero event**

In `components/command-menu.tsx`, add this effect below the existing `Ctrl/Cmd+K` effect:

```tsx
  React.useEffect(() => {
    const openMenu = () => setOpen(true);
    window.addEventListener("lu:open-command-menu", openMenu);
    return () => window.removeEventListener("lu:open-command-menu", openMenu);
  }, []);
```

- [ ] **Step 3: Run lint**

Run:

```bash
npm run lint
```

Expected: pass.

- [ ] **Step 4: Commit hero/workbench**

```bash
git add components/sections/hero.tsx components/command-menu.tsx
git commit -m "feat: redesign hero workbench"
```

## Task 4: Selected Builds, Origin, And Status

**Files:**
- Create: `components/sections/selected-builds.tsx`
- Create: `components/sections/origin-status.tsx`

- [ ] **Step 1: Create SelectedBuilds**

Create `components/sections/selected-builds.tsx`:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { selectedBuilds } from "@/lib/homepage";

export function SelectedBuilds() {
  return (
    <section id="selected-builds" className="border-b border-nd-border py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-label text-nd-accent">
              02 / Selected Builds
            </span>
            <h2 className="font-body text-3xl font-bold tracking-normal text-nd-text-display md:text-5xl">
              Fewer entries, stronger signal.
            </h2>
          </div>
          <a
            href="https://github.com/luinbytes"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-mono text-[11px] uppercase tracking-label text-nd-accent nd-transition hover:text-nd-text-display md:inline-flex"
          >
            View all builds →
          </a>
        </div>

        <div className="border border-nd-border-visible">
          {selectedBuilds.map((build) => {
            const Icon = build.icon;
            return (
              <Link
                key={build.id}
                href={build.href}
                className="group grid gap-4 border-b border-nd-border p-5 nd-transition last:border-b-0 hover:bg-nd-surface md:grid-cols-[72px_1fr_auto_32px] md:items-center md:p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center border border-nd-border-visible text-nd-text-primary group-hover:border-nd-accent group-hover:text-nd-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block font-body text-xl font-bold text-nd-text-display">
                    {build.buildName}
                  </span>
                  <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-nd-text-secondary">
                    {build.summary}
                  </span>
                </span>
                <span className="flex flex-wrap gap-2">
                  {build.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="border border-nd-border-visible px-2 py-1 font-mono text-[10px] uppercase tracking-label-tight text-nd-text-disabled"
                    >
                      {tech}
                    </span>
                  ))}
                </span>
                <ArrowRight className="h-4 w-4 text-nd-accent nd-transition group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create OriginStatus**

Create `components/sections/origin-status.tsx`:

```tsx
import { originLines, workbenchItems } from "@/lib/homepage";

export function OriginStatus() {
  return (
    <>
      <section id="about" className="border-b border-nd-border py-20 md:py-28">
        <div className="container mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-label text-nd-accent">
              03 / Origin
            </span>
            <h2 className="font-body text-3xl font-bold leading-tight tracking-normal text-nd-text-display md:text-5xl">
              Started on a PS3. Stayed for the systems.
            </h2>
          </div>
          <div className="space-y-5 border-l border-nd-border-visible pl-6">
            {originLines.map((line) => (
              <p key={line} className="text-base leading-relaxed text-nd-text-secondary md:text-lg">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="status" className="border-b border-nd-border py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-label text-nd-accent">
            04 / Current Status
          </span>
          <dl className="grid border border-nd-border-visible md:grid-cols-4">
            {workbenchItems.map((item) => (
              <div
                key={item.label}
                className="border-b border-nd-border p-5 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <dt className="mb-2 font-mono text-[10px] uppercase tracking-label text-nd-text-disabled">
                  {item.label}
                </dt>
                <dd className="text-sm leading-relaxed text-nd-text-primary">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Run lint**

Run:

```bash
npm run lint
```

Expected: pass.

- [ ] **Step 4: Commit supporting sections**

```bash
git add components/sections/selected-builds.tsx components/sections/origin-status.tsx
git commit -m "feat: add selected builds and status sections"
```

## Task 5: Lean Contact Section

**Files:**
- Modify: `components/sections/contact.tsx`

- [ ] **Step 1: Replace Contact with the lean close**

Replace `components/sections/contact.tsx` with:

```tsx
import { ArrowRight, Coffee, Github, Mail, Twitter } from "lucide-react";
import { contactLinks } from "@/lib/homepage";

const iconMap = {
  Email: Mail,
  GitHub: Github,
  "X / Twitter": Twitter,
};

export function Contact() {
  return (
    <section id="contact" className="border-b border-nd-border py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <span className="mb-4 block font-mono text-[11px] uppercase tracking-label text-nd-accent">
          05 / Contact
        </span>
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="max-w-3xl font-body text-4xl font-bold leading-tight tracking-normal text-nd-text-display md:text-6xl">
              Open to interesting projects and unsolicited bug reports.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-nd-text-secondary">
              Send the weird workflow, the broken tool, or the idea that keeps
              getting stuck in your head.
            </p>
          </div>

          <div className="grid min-w-[260px] gap-3">
            {contactLinks.map((link) => {
              const Icon = iconMap[link.label as keyof typeof iconMap];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group inline-flex min-h-[48px] items-center justify-between gap-4 border border-nd-border-visible px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-label-tight text-nd-text-primary nd-transition hover:border-nd-text-secondary hover:bg-nd-surface"
                >
                  <span className="inline-flex items-center gap-3">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                    {link.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-nd-accent nd-transition group-hover:translate-x-1" />
                </a>
              );
            })}
          </div>
        </div>

        <footer className="mt-20 flex flex-col gap-4 border-t border-nd-border pt-6 font-mono text-[11px] uppercase tracking-label text-nd-text-disabled md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} luinbytes.dev</span>
          <a
            href="https://buymeacoffee.com/luinbytes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 nd-transition hover:text-nd-text-primary"
          >
            <Coffee className="h-3.5 w-3.5" />
            Buy Me a Coffee
          </a>
        </footer>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected: pass.

- [ ] **Step 3: Commit contact**

```bash
git add components/sections/contact.tsx
git commit -m "feat: simplify portfolio contact"
```

## Task 6: Compose The Lean Homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace homepage composition**

Replace `app/page.tsx` with:

```tsx
import { Hero } from "@/components/sections/hero";
import { ProblemIndex } from "@/components/sections/problem-index";
import { SelectedBuilds } from "@/components/sections/selected-builds";
import { OriginStatus } from "@/components/sections/origin-status";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex flex-col bg-nd-black font-body selection:bg-nd-text-display selection:text-nd-black">
      <Hero />
      <ProblemIndex />
      <SelectedBuilds />
      <OriginStatus />
      <Contact />
    </div>
  );
}
```

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected: pass. The old `About`, `Now`, `Skills`, `Projects`, `AutomationPlayground`, and `Activity` components may remain unused for now; removal can happen after browser QA confirms nothing else imports them.

- [ ] **Step 3: Commit homepage composition**

```bash
git add app/page.tsx
git commit -m "feat: compose lean portfolio homepage"
```

## Task 7: Header Simplification

**Files:**
- Modify: `components/layout/header.tsx`

- [ ] **Step 1: Replace Header with the lean portfolio nav**

Replace `components/layout/header.tsx` with:

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Builds", href: "#builds" },
  { name: "About", href: "#about" },
  { name: "Status", href: "#status" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (!isMainPage) return;

      const sections = ["home", "builds", "about", "status", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top >= -160 && rect.top <= 320;
      });

      if (current) setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMainPage]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const openCommandMenu = () => {
    window.dispatchEvent(new CustomEvent("lu:open-command-menu"));
    setMobileMenuOpen(false);
  };

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!isMainPage) return;

    event.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  const linkHref = (href: string) => (isMainPage ? href : `/${href}`);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b nd-transition",
        scrolled || mobileMenuOpen
          ? "border-nd-border bg-nd-black/95"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href={isMainPage ? "#home" : "/"}
          onClick={(event) => isMainPage && scrollToSection(event, "#home")}
          className="font-mono text-sm font-bold tracking-normal text-nd-text-display nd-focus nd-transition hover:text-nd-accent"
        >
          luinbytes<span className="text-nd-accent">.</span>dev
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={linkHref(link.href)}
                onClick={(event) => scrollToSection(event, link.href)}
                className={cn(
                  "px-3 py-2 font-mono text-[11px] uppercase tracking-label nd-focus nd-transition",
                  activeSection === sectionId
                    ? "text-nd-text-display"
                    : "text-nd-text-disabled hover:text-nd-text-secondary"
                )}
              >
                /{link.name.toLowerCase()}
              </a>
            );
          })}
          <button
            type="button"
            onClick={openCommandMenu}
            className="ml-3 inline-flex items-center gap-2 border border-nd-border-visible px-3 py-1.5 font-mono text-[11px] uppercase tracking-label-tight text-nd-text-secondary nd-focus nd-transition hover:border-nd-text-secondary hover:text-nd-text-display"
          >
            <Command className="h-3.5 w-3.5" />
            Cmd K
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="p-2 text-nd-text-secondary nd-focus nd-transition hover:text-nd-text-display md:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-nd-border bg-nd-black px-4 py-4 md:hidden"
        >
          <nav className="grid gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={linkHref(link.href)}
                onClick={(event) => scrollToSection(event, link.href)}
                className="border-b border-nd-border py-4 font-mono text-[12px] uppercase tracking-label text-nd-text-primary nd-focus"
              >
                /{link.name.toLowerCase()}
              </a>
            ))}
            <button
              type="button"
              onClick={openCommandMenu}
              className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 border border-nd-border-visible px-4 py-3 font-mono text-[12px] uppercase tracking-label text-nd-text-primary nd-focus"
            >
              <Command className="h-4 w-4" />
              Open Command Menu
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected: pass.

- [ ] **Step 3: Commit header**

```bash
git add components/layout/header.tsx
git commit -m "feat: simplify portfolio header"
```

## Task 8: Command Menu Search And Filters

**Files:**
- Modify: `components/command-menu.tsx`

- [ ] **Step 1: Add imports**

Update the imports at the top of `components/command-menu.tsx`:

```tsx
import * as React from "react";
import { Command } from "cmdk";
import {
  Coffee,
  ExternalLink,
  Folder,
  Github,
  Mail,
  Search,
  User,
  type LucideIcon,
} from "lucide-react";
import { commandFilters, problemBuilds } from "@/lib/homepage";
```

- [ ] **Step 2: Add helpers inside CommandMenu**

Add these helpers below `runCommand`:

```tsx
  const scrollToSection = React.useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const openHref = React.useCallback((href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = href;
  }, []);
```

- [ ] **Step 3: Replace command groups**

Replace the current `Command.List` contents with:

```tsx
          <Command.List className="max-h-[360px] overflow-y-auto p-2">
            <Command.Empty className="p-4 text-center font-mono text-[11px] uppercase tracking-label text-nd-text-disabled">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="font-mono text-[10px] uppercase tracking-label text-nd-text-disabled mb-1 px-2 pt-2">
              <Item icon={Folder} onSelect={() => runCommand(() => scrollToSection("builds"))}>
                Builds
              </Item>
              <Item icon={User} onSelect={() => runCommand(() => scrollToSection("about"))}>
                About
              </Item>
              <Item icon={Search} onSelect={() => runCommand(() => scrollToSection("status"))}>
                Status
              </Item>
              <Item icon={Mail} onSelect={() => runCommand(() => scrollToSection("contact"))}>
                Contact
              </Item>
            </Command.Group>

            <Command.Group heading="Quick filters" className="font-mono text-[10px] uppercase tracking-label text-nd-text-disabled mb-1 px-2 pt-4">
              {commandFilters.map((filter) => (
                <Item
                  key={filter.value}
                  icon={filter.icon}
                  keywords={[filter.value]}
                  onSelect={() => runCommand(() => scrollToSection("builds"))}
                >
                  {filter.label}
                </Item>
              ))}
            </Command.Group>

            <Command.Group heading="Builds" className="font-mono text-[10px] uppercase tracking-label text-nd-text-disabled mb-1 px-2 pt-4">
              {problemBuilds.map((build) => (
                <Item
                  key={build.id}
                  icon={build.icon}
                  keywords={[build.shortName, ...build.filters]}
                  onSelect={() => runCommand(() => openHref(build.href))}
                >
                  {build.buildName}
                </Item>
              ))}
            </Command.Group>

            <Command.Group heading="Social" className="font-mono text-[10px] uppercase tracking-label text-nd-text-disabled mb-1 px-2 pt-4">
              <Item icon={Github} onSelect={() => runCommand(() => openHref("https://github.com/luinbytes"))}>
                GitHub
              </Item>
              <Item icon={ExternalLink} onSelect={() => runCommand(() => openHref("https://x.com/x6c75"))}>
                X / Twitter
              </Item>
              <Item icon={Coffee} onSelect={() => runCommand(() => openHref("https://buymeacoffee.com/luinbytes"))}>
                Buy Me a Coffee
              </Item>
            </Command.Group>
          </Command.List>
```

- [ ] **Step 4: Extend Item props**

Replace `Item` with:

```tsx
function Item({
  children,
  icon: Icon,
  keywords,
  onSelect,
}: {
  children: React.ReactNode;
  icon: LucideIcon;
  keywords?: string[];
  onSelect: () => void;
}) {
  return (
    <Command.Item
      keywords={keywords}
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 px-3 py-2 font-mono text-sm text-nd-text-secondary aria-selected:bg-nd-text-display aria-selected:text-nd-black"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
      {children}
    </Command.Item>
  );
}
```

- [ ] **Step 5: Run lint and manual command check**

Run:

```bash
npm run lint
```

Expected: pass.

Then run the dev server and verify Ctrl/Cmd+K opens the menu:

```bash
npm run dev
```

Expected: Next dev server starts. In browser, pressing Ctrl/Cmd+K opens the command menu; searching `linux`, `android`, `reverse`, and `raycast` returns relevant results.

- [ ] **Step 6: Commit command menu**

```bash
git add components/command-menu.tsx
git commit -m "feat: update portfolio command menu"
```

## Task 9: Visual Polish And Responsive QA

**Files:**
- Modify: section files from prior tasks only to fix visual mismatches

- [ ] **Step 1: Build and lint**

Run:

```bash
npm run lint
npm run build
```

Expected: both pass.

- [ ] **Step 2: Start local server**

Run:

```bash
npm run dev
```

Expected: dev server starts on `http://localhost:3000` or the next available port.

- [ ] **Step 3: Desktop visual pass**

Open the homepage and compare against `docs/superpowers/specs/assets/portfolio-redesign-concept.png`.

Check these five comparison points:

- Hero headline, supporting copy, primary CTA, and command CTA match the approved direction.
- Workbench panel is compact and does not dominate the first viewport.
- Problem index rows and selected detail pane are the visual spine.
- Selected builds are rows/dossiers, not a repeated card grid.
- Origin, status, and contact are compact and preserve the black/pink/gray palette.

- [ ] **Step 4: Mobile visual pass**

Use a mobile viewport around 390px wide.

Expected:

- No horizontal overflow.
- Hero CTAs stack cleanly.
- Workbench panel appears below hero text.
- Problem index detail pane appears below the list without layout jumps.
- Selected build rows keep readable text and tags without clipping.

- [ ] **Step 5: Keyboard interaction pass**

Expected:

- Tab reaches hero CTAs, problem rows, selected detail links, build rows, and contact links.
- ArrowDown/ArrowUp inside the problem index changes selected row.
- Ctrl/Cmd+K opens command menu.
- Escape closes command menu.

- [ ] **Step 6: Commit polish fixes**

If visual QA produced component changes, commit them:

```bash
git add components/sections components/command-menu.tsx components/layout/header.tsx app/page.tsx
git commit -m "fix: polish portfolio redesign"
```

If visual QA produced no changes, record this in the final handoff and do not create an empty commit.

## Task 10: Final Verification Handoff

**Files:**
- No code changes unless verification finds a bug.

- [ ] **Step 1: Run final checks**

Run:

```bash
npm run lint
npm run build
git status --short
```

Expected:

- `npm run lint` passes.
- `npm run build` passes.
- `git status --short` is clean after commits, or only shows intentional uncommitted screenshots if the implementer captured QA artifacts and plans to remove them.

- [ ] **Step 2: Final response checklist**

The final implementation handoff must include:

- The accepted concept path: `docs/superpowers/specs/assets/portfolio-redesign-concept.png`.
- The local URL used for browser QA.
- Lint/build results.
- Desktop and mobile viewport sizes checked.
- Problem index keyboard behavior result.
- Command menu search result.
- Any intentional deviations from the concept.

## Self-Review

- Spec coverage: Header, hero, problem index, selected builds, origin, current status, contact, command/search, motion, content framing, and verification are all mapped to tasks.
- Placeholder scan: No TBD/TODO/fill-in-later placeholders are present.
- Type consistency: `ProblemBuild`, `workbenchItems`, `problemBuilds`, `selectedBuilds`, `originLines`, `commandFilters`, and `contactLinks` are defined in Task 1 and consumed by later tasks with matching names.
