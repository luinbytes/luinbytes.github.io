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
