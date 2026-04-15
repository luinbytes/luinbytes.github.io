"use client";

import Link from "next/link";
import {
  X,
  ExternalLink,
  Github,
  Download,
  Shield,
  Crosshair,
  Eye,
  Zap,
  Gamepad2,
  Keyboard,
  Settings,
} from "lucide-react";

const features = [
  {
    icon: Crosshair,
    title: "Golf Aim Assist",
    description:
      "Orbit-camera auto-aim toward the hole with analytic pitch solver and crosswind compensation. Releases the swing at optimal power to land on target.",
    details: [
      "Wind-aware trajectory prediction using decompiled game physics",
      "Per-contact terrain layer settings (wet grass, sand, cart paths)",
      "Cup-rim aware targeting for long approaches",
      "Crosswind aim compensation (2D solver, long shots only)",
      "Overcharge clamp removal and manual-charge mode",
      "Impact preview camera showing predicted landing zone",
    ],
  },
  {
    icon: Crosshair,
    title: "Weapon Aimbot",
    description:
      "Three modes with full target filtering. Legit mode steers the camera, rage mode uses silent-aim so bullets redirect without camera movement.",
    details: [
      "Legit: camera steer with configurable smoothing (Linear / EaseOut / Spring)",
      "Rage: silent-aim postfix rewriting GetFirearmAimPoint direction",
      "Custom: every sub-setting individually configurable",
      "Target filtering: players, dummies, mines, carts, skip-protected",
      "Hitbox priority: Head (+1.4m) / Chest / Legs, multi-select",
      "Visibility linecast and FOV cone checks",
    ],
  },
  {
    icon: Eye,
    title: "ESP Overlay",
    description:
      "Box and corner-bracket overlays around every in-frustum target. Name, distance, health bar, and tracers with per-category colors.",
    details: [
      "SkinnedMeshRenderer to Collider to CharacterController bounds cascade",
      "Frustum culling with single Linecast visibility check",
      "Per-category colors (players / dummies / mines / carts)",
      "[PROT] badge next to shielded targets",
      "Snapshot built in LateUpdate, drawn in OnGUI (Repaint-gated)",
    ],
  },
  {
    icon: Shield,
    title: "Anti-Cheat Bypass",
    description:
      "8 HarmonyX patches suppress every known server-side detection path. Rate limiter, vote-kick, session ban, and disconnect UI all neutralized.",
    details: [
      "AntiCheatRateChecker.RegisterHit — primary rate counter prefix",
      "AntiCheatPerPlayerRateChecker.RegisterHit — per-player variant",
      "OnPlayerConfirmedCheatingDetected — void-skip detection event",
      "ServerKickConnection — void-skip server-side kicks",
      "BanPlayerGuidThisSession — suppress per-session ban path",
      "Mirror.NetworkManager.OnClientDisconnectInternal — gated skip",
    ],
  },
  {
    icon: Zap,
    title: "Combat Tools",
    description:
      "Force shield, mine pre-arm, bunnyhop, and coffee speed boost. Each wired through the unified bind system with toggle/hold/released modes.",
    details: [
      "Force shield: writes isElectromagnetShieldActive + knockoutImmunity directly",
      "Mine pre-arm: instant arming via Harmony-patched Landmine handlers (host-only)",
      "Bunnyhop: skips grounded check for repeated jumps without friction",
      "Coffee speed boost hotkey",
    ],
  },
  {
    icon: Gamepad2,
    title: "Item Spawner",
    description:
      "IMGUI grid of all 12 player-usable items. Calls CmdAddItem via reflection with the cheats-enabled gate patched open.",
    details: [
      "12-item catalog: Coffee, DuelingPistol, ElephantGun, Airhorn, SpringBoots, GolfCart, RocketLauncher, Landmine, Electromagnet, OrbitalLaser, RocketDriver, FreezeBomb",
      "Falls back to ServerTryAddItem on non-authorized hosts",
      "MatchSetupRules.IsCheatsEnabled patched to always return true",
    ],
  },
  {
    icon: Keyboard,
    title: "Unified Bind System",
    description:
      "Every hotkey rebindable from the in-game CONFIG tab. Supports toggle, hold, and released activation modes for sustained actions.",
    details: [
      "Click a bind slot, press any key to capture, Escape to cancel",
      "Three activation modes: Toggle / Hold / Released (inverse hold)",
      "Persisted to Mods/SuperHackerGolf.cfg on Save",
      "Applied to weapon aimbot, force shield, and bunnyhop",
    ],
  },
  {
    icon: Settings,
    title: "Settings GUI",
    description:
      "Tabbed IMGUI window with Aim, Combat, Visuals, Physics, Data, and Config tabs. Sliders, dropdowns, toggles, and per-bind rebinding.",
    details: [
      "6 tabs: Aim / Combat / Visuals / Physics / Data / Config",
      "Save and reload configuration buttons",
      "Per-bind rebinding from CONFIG tab",
      "Shot prediction telemetry CSV writer",
      "HUD overlay with player name and assist status",
    ],
  },
];

const techStack = [
  { name: "C#", description: "Core mod logic across 28 source files, ~13k lines" },
  { name: "MelonLoader 0.7.2", description: "Mod loader framework with IL2CPP interop" },
  { name: "HarmonyX", description: "Runtime method patching for anti-cheat bypass" },
  { name: "Unity IMGUI", description: "In-game settings GUI and ESP overlay rendering" },
  { name: ".NET 8", description: "Build target with CI pipeline on GitHub Actions" },
  { name: "Reflection", description: "Game state access via cached FieldInfo/MethodInfo" },
];

export function SuperHackerGolfPage() {
  return (
    <div className="min-h-screen bg-nd-black">
      {/* Hero */}
      <section className="relative border-b border-nd-border">
        <div className="absolute inset-0 dot-grid-subtle opacity-30 pointer-events-none" />
        <div className="container px-4 mx-auto max-w-5xl relative z-10 py-24 md:py-40">
          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled hover:text-nd-text-display nd-transition mb-12"
          >
            ← Back to projects
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled border border-nd-border px-2 py-1 rounded-full">
              Game Mod
            </span>
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-success border border-nd-success/30 px-2 py-1 rounded-full">
              Open Source
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-nd-text-display leading-[1.0] tracking-[-0.03em] mb-6">
            SuperHackerGolf<span className="text-nd-accent">.</span>
          </h1>

          <p className="text-nd-text-secondary text-base md:text-lg max-w-2xl leading-relaxed mb-10">
            Client-side cheat mod for Super Battle Golf. Aim assist with
            decompiled ball physics, weapon aimbot (legit/rage/silent-aim),
            ESP overlay, item spawner, force shield, and an 8-patch
            anti-cheat bypass stack. Built on MelonLoader with HarmonyX.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://github.com/luinbytes/SuperHackerGolf/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-nd-text-display text-nd-black font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:opacity-80 min-h-[44px]"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
            <a
              href="https://github.com/luinbytes/SuperHackerGolf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-nd-border-visible text-nd-text-primary font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:border-nd-text-secondary min-h-[44px]"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-nd-border">
            <div>
              <span className="font-display text-2xl md:text-3xl font-bold text-nd-text-display">28</span>
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled mt-1">
                Source files
              </p>
            </div>
            <div>
              <span className="font-display text-2xl md:text-3xl font-bold text-nd-text-display">~13k</span>
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled mt-1">
                Lines of C#
              </p>
            </div>
            <div>
              <span className="font-display text-2xl md:text-3xl font-bold text-nd-text-display">8</span>
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled mt-1">
                Anti-cheat patches
              </p>
            </div>
            <div>
              <span className="font-display text-2xl md:text-3xl font-bold text-nd-text-display">12</span>
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled mt-1">
                Spawnable items
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32 border-b border-nd-border">
        <div className="container px-4 mx-auto max-w-5xl">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
            Features
          </span>
          <p className="text-nd-text-secondary text-base max-w-xl mb-16">
            Everything patched through HarmonyX runtime hooks. No DLL injection, no memory writing, no external processes.
          </p>

          <div className="space-y-16">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="grid md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 flex items-center justify-center border border-nd-border-visible text-nd-text-secondary">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-body text-lg font-bold text-nd-text-display mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-nd-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="bg-nd-surface border border-nd-border p-6">
                    <ul className="space-y-2.5">
                      {feature.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-3 text-sm text-nd-text-secondary"
                        >
                          <span className="w-1 h-1 rounded-full bg-nd-text-disabled mt-2 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Anti-Cheat Deep Dive */}
      <section className="py-24 md:py-32 border-b border-nd-border">
        <div className="container px-4 mx-auto max-w-5xl">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
            Anti-Cheat Audit
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-nd-text-display tracking-[-0.02em] mb-6">
            8-patch bypass stack
          </h2>
          <p className="text-nd-text-secondary text-base max-w-2xl leading-relaxed mb-12">
            Super Battle Golf ships a rate-limiter anti-cheat that tracks hit
            frequency and triggers automatic vote-kicks. This mod Harmony-patches
            both rate checker methods plus every downstream path that can flag or
            disconnect a cheating client.
          </p>

          <div className="grid gap-3">
            {[
              { method: "AntiCheatRateChecker.RegisterHit", action: "Prefix returns true, skips original", type: "Rate Counter" },
              { method: "AntiCheatPerPlayerRateChecker.RegisterHit", action: "Prefix returns true, skips original", type: "Rate Counter" },
              { method: "OnPlayerConfirmedCheatingDetected", action: "Void-skip, detection event becomes no-op", type: "Event Handler" },
              { method: "ServerKickConnection", action: "Void-skip, server kicks never fire", type: "Server Kick" },
              { method: "BanPlayerGuidThisSession", action: "Void-skip, per-session ban suppressed", type: "Ban Path" },
              { method: "DisplayDisconnectReasonMessage", action: "Void-skip, kick UI never renders", type: "Client UI" },
              { method: "NetworkManager.OnClientDisconnectInternal", action: "Gated skip when cheat-flag disconnect in flight", type: "Network Layer" },
              { method: "MatchSetupRules.IsCheatsEnabled", action: "Returns true unconditionally for item spawner", type: "Server Gate" },
            ].map((patch) => (
              <div
                key={patch.method}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-nd-surface border border-nd-border p-4"
              >
                <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-nd-accent border border-nd-accent/30 px-2 py-0.5 rounded-full w-fit shrink-0">
                  {patch.type}
                </span>
                <code className="font-mono text-[12px] text-nd-text-display break-all">
                  {patch.method}
                </code>
                <span className="text-[12px] text-nd-text-disabled sm:ml-auto shrink-0">
                  {patch.action}
                </span>
              </div>
            ))}
          </div>

          <p className="font-mono text-[11px] tracking-[0.06em] text-nd-text-disabled mt-6">
            All patches installed in OnApplicationStart. Each wrapped in individual try/catch so a single missing type never blocks the rest of the stack.
          </p>
        </div>
      </section>

      {/* Physics Engine */}
      <section className="py-24 md:py-32 border-b border-nd-border">
        <div className="container px-4 mx-auto max-w-5xl">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
            Golf Physics
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-nd-text-display tracking-[-0.02em] mb-6">
            Decompiled, not guessed
          </h2>
          <p className="text-nd-text-secondary text-base max-w-2xl leading-relaxed mb-12">
            The trajectory predictor doesn&apos;t use estimated coefficients. Launch speed, air damping, bounce chains, ground roll, and wind drift are all reproduced from static analysis of GameAssembly.dll so the predicted line matches real ball physics exactly.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Launch & Flight",
                items: [
                  "Launch speed formula from Hittable decompilation",
                  "Exact reimplementation of ApplyAirDamping",
                  "WindFactor + CrossWindFactor read via reflection from WindHittableSettings",
                  "Crosswind 2D solver nudges aim target for long shots (>15m)",
                ],
              },
              {
                title: "Bounce & Roll",
                items: [
                  "Per-contact terrain query via TerrainManager.GetDominantLayerSettingsAtPoint",
                  "Real bounciness and damping for wet grass, sand, and cart paths",
                  "Bounce chain until velocity drops below threshold",
                  "Ground roll phase with terrain-specific friction",
                ],
              },
              {
                title: "Targeting",
                items: [
                  "GolfHole trigger geometry used for cup-rim aware targeting",
                  "Long approaches aim at the rim instead of overshooting",
                  "Nearest-ball mode targets closest ball instead of local",
                  "Analytic closed-form pitch and speed solver",
                ],
              },
              {
                title: "Verification",
                items: [
                  "Shot prediction telemetry CSV logger",
                  "Predicted-vs-actual impact comparison for every auto-fired shot",
                  "Trail visualizers: predicted, frozen, and actual as LineRenderers",
                  "Impact preview camera with offscreen render texture",
                ],
              },
            ].map((group) => (
              <div
                key={group.title}
                className="bg-nd-surface border border-nd-border p-6"
              >
                <h3 className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-display mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-nd-text-secondary"
                    >
                      <span className="w-1 h-1 rounded-full bg-nd-text-disabled mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 md:py-32 border-b border-nd-border">
        <div className="container px-4 mx-auto max-w-5xl">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
            Technical Details
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-nd-text-display tracking-[-0.02em] mb-12">
            How it&apos;s built
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="bg-nd-surface border border-nd-border p-6"
              >
                <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-nd-text-display block mb-2">
                  {tech.name}
                </span>
                <p className="text-sm text-nd-text-secondary">{tech.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-nd-surface border border-nd-border p-6">
            <h3 className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-display mb-3">
              CI Pipeline
            </h3>
            <p className="text-sm text-nd-text-secondary leading-relaxed">
              GitHub Actions builds the mod from a clean checkout without a game install.
              A handwritten stub assembly (ci/stubs/) exports every UnityEngine, MelonLoader,
              HarmonyLib, and TextMeshPro type the mod references, then the mod compiles
              against that single stub DLL. Auto-releases tagged builds on every push to main.
            </p>
          </div>
        </div>
      </section>

      {/* Default Hotkeys */}
      <section className="py-24 md:py-32 border-b border-nd-border">
        <div className="container px-4 mx-auto max-w-5xl">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
            Controls
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-nd-text-display tracking-[-0.02em] mb-12">
            Default hotkeys
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { key: "F", action: "Toggle golf aim assist" },
              { key: "F2", action: "Coffee speed boost" },
              { key: "F3", action: "Nearest-ball mode" },
              { key: "F4", action: "Unlock all cosmetics" },
              { key: "F6", action: "Force shield (toggle/hold/released)" },
              { key: "F7", action: "Weapon aimbot (toggle/hold/released)" },
              { key: "F9", action: "Mine pre-arm (host-only)" },
              { key: "F10", action: "Bunnyhop (toggle/hold/released)" },
              { key: "Insert", action: "Open/close settings GUI" },
              { key: "Mouse4", action: "Default weapon-aimbot hold key" },
              { key: "RMB", action: "Auto-aim camera (hold)" },
            ].map((bind) => (
              <div
                key={bind.key}
                className="flex items-center gap-4 bg-nd-surface border border-nd-border p-4"
              >
                <kbd className="font-mono text-[13px] text-nd-text-display bg-nd-black border border-nd-border-visible px-3 py-1.5 min-w-[80px] text-center">
                  {bind.key}
                </kbd>
                <span className="text-sm text-nd-text-secondary">{bind.action}</span>
              </div>
            ))}
          </div>

          <p className="font-mono text-[11px] tracking-[0.06em] text-nd-text-disabled mt-6">
            All binds are rebindable from the in-game CONFIG tab. Persisted to Mods/SuperHackerGolf.cfg.
          </p>
        </div>
      </section>

      {/* Installation */}
      <section className="py-24 md:py-32 border-b border-nd-border">
        <div className="container px-4 mx-auto max-w-5xl">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
            Setup
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-nd-text-display tracking-[-0.02em] mb-12">
            Installation
          </h2>

          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Install MelonLoader",
                content:
                  "Install MelonLoader 0.7.2 into your Super Battle Golf folder. Do not use r2modman's BepInEx proxy — it shadows MelonLoader's version.dll.",
              },
              {
                step: "02",
                title: "Set launch options",
                content:
                  'Add WINEDLLOVERRIDES="version=n,b" %command% to your Steam launch options so the game loads MelonLoader.',
              },
              {
                step: "03",
                title: "Download the mod",
                content:
                  "Grab the latest release DLL from GitHub Releases and drop it into your game's Mods folder. The DLL auto-builds on every push to main.",
              },
              {
                step: "04",
                title: "Configure",
                content:
                  "Launch the game and press Insert to open the settings GUI. Rebind keys from the CONFIG tab. Hit Save to persist.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-6 items-start"
              >
                <span className="font-display text-3xl font-bold text-nd-text-disabled shrink-0 w-12">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-body text-lg font-bold text-nd-text-display mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-nd-text-secondary leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container px-4 mx-auto max-w-5xl text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-nd-text-display tracking-[-0.02em] mb-4">
            Get the mod
          </h2>
          <p className="text-nd-text-secondary text-base max-w-lg mx-auto mb-10">
            Open source. Auto-releasing CI builds. Grab the latest DLL or read the full source.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://github.com/luinbytes/SuperHackerGolf/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-nd-text-display text-nd-black font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:opacity-80 min-h-[44px]"
            >
              <Download className="w-4 h-4" />
              Latest Release
            </a>
            <a
              href="https://github.com/luinbytes/SuperHackerGolf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-nd-border-visible text-nd-text-primary font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:border-nd-text-secondary min-h-[44px]"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SuperHackerGolfPage;
