"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Download,
  Shield,
  Flame,
  RefreshCw,
  PauseCircle,
  Smartphone,
  ArrowUpCircle,
  ListTodo,
  CheckCircle,
  Tag,
} from "lucide-react";

const SECTION_NAV = [
  { id: "overview", label: "Overview" },
  { id: "habits", label: "Habits" },
  { id: "tasks", label: "Tasks" },
  { id: "free-vs-pro", label: "Free vs Pro" },
  { id: "tech", label: "Tech" },
  { id: "get-the-app", label: "Get the app" },
] as const;

const habitFeatures = [
  {
    icon: Flame,
    title: "Streaks & Heatmap",
    description:
      "Track your consistency with a daily streak counter and a full calendar heatmap. See your history at a glance.",
    details: [
      "Daily streak with best-streak tracking",
      "Calendar heatmap — Pro: full history, Free: 30 days",
      "Completion ring shows today's progress at a glance",
    ],
  },
  {
    icon: RefreshCw,
    title: "Flexible Cadences",
    description:
      "Set habits to repeat daily, on specific weekdays, X times per week, or every N days.",
    details: [
      "Daily / specific weekdays / X per week / every N days",
      "Target count per day: binary (1) or countable (N)",
      "Reminder time per habit",
    ],
  },
  {
    icon: PauseCircle,
    title: "Pause Without Penalty",
    description:
      "Life happens. Pause a habit temporarily — your streak stays intact.",
    details: [
      "Open-ended pause from any date",
      "Streak preserved while paused",
      "Resume from Today screen with one tap",
    ],
  },
  {
    icon: Smartphone,
    title: "Home Screen Widget",
    description:
      "Quick-tap habit completions without opening the app.",
    details: [
      "Glance widget on the Android home screen",
      "Shows today's habits + completion state",
      "Tap to complete — no app open required",
    ],
  },
];

const taskFeatures = [
  {
    icon: ArrowUpCircle,
    title: "Three Priority Levels",
    description:
      "High, medium, and low priority. Tasks sort by priority within each due-date group.",
    details: [
      "High / Medium / Low — visual indicator on each row",
      "Sort order: priority within date group",
      "Overdue tasks surface at the top",
    ],
  },
  {
    icon: ListTodo,
    title: "Subtasks & Notes",
    description:
      "Break tasks down and add context without leaving the edit screen.",
    details: [
      "Unlimited subtasks per task",
      "Notes field for free-form context",
      "Subtask completion tracked independently",
    ],
  },
  {
    icon: CheckCircle,
    title: "Swipe to Complete",
    description:
      "Swipe right to complete, swipe left to delete. Fast.",
    details: [
      "Swipe-complete with haptic feedback",
      "Satisfying empty state when inbox is clear",
      "Undo window on accidental swipe",
    ],
  },
  {
    icon: Tag,
    title: "Tags & Search",
    description:
      "Tag tasks for quick filtering. Search across everything.",
    details: [
      "Free-form tags on tasks",
      "Global search across title + notes + tags",
      "Filter by tag from the task list",
    ],
  },
];

const techStack = [
  { name: "Kotlin 2.x", description: "Primary language" },
  {
    name: "Jetpack Compose",
    description: "Declarative UI, Material 3, dynamic color",
  },
  { name: "Hilt", description: "Dependency injection" },
  {
    name: "Room + DataStore",
    description:
      "Local persistence: tasks/habits/completions in Room, settings in DataStore",
  },
  {
    name: "WorkManager",
    description: "Daily streak rollover, notification scheduling",
  },
  {
    name: "Glance",
    description: "Compose-based home screen widget (official Jetpack)",
  },
  {
    name: "Play Billing 7.x",
    description: "Subscription entitlement, restore purchases",
  },
  {
    name: "Kotlin Coroutines + Flow",
    description: "Async state, reactive UI",
  },
  {
    name: "Sentry",
    description:
      "Anonymised crash reporting (release builds only, no personal data)",
  },
  {
    name: "Min SDK 26",
    description: "Android 8.0 — covers ~97% of active devices",
  },
];

type ComparisonRow = {
  label: string;
  free: string;
  pro: string;
};

const comparisonRows: ComparisonRow[] = [
  { label: "Unlimited tasks", free: "yes", pro: "yes" },
  { label: "Up to 3 habits", free: "yes", pro: "unlimited" },
  { label: "Streak history (30 days)", free: "yes", pro: "yes" },
  { label: "Full heatmap history", free: "no", pro: "yes" },
  { label: "Home-screen widget", free: "yes", pro: "yes" },
  { label: "Multiple widget styles", free: "no", pro: "yes" },
  { label: "Tags, search, subtasks", free: "yes", pro: "yes" },
  { label: "Custom accent themes", free: "no", pro: "yes" },
  { label: "Brutalist monospace theme", free: "no", pro: "yes" },
  { label: "Data export (JSON)", free: "yes", pro: "yes" },
  { label: "No account required", free: "yes", pro: "yes" },
  { label: "No ads", free: "yes", pro: "yes" },
];

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.luinbytes.meteor";

function ComparisonCell({ value }: { value: string }) {
  if (value === "yes") {
    return <span className="text-nd-success font-mono text-sm">✓</span>;
  }
  if (value === "no") {
    return (
      <span className="text-nd-text-disabled font-mono text-sm">—</span>
    );
  }
  if (value === "unlimited") {
    return (
      <span className="text-nd-text-display font-mono text-sm">
        ✓ (unlimited)
      </span>
    );
  }
  return <span className="text-nd-text-secondary font-mono text-sm">{value}</span>;
}

export function MeteorPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const sectionIds = SECTION_NAV.map((s) => s.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-nd-black scroll-smooth">
      {/* Sticky side-rail nav (desktop only) */}
      <nav
        aria-label="Page sections"
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-5"
      >
        {SECTION_NAV.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="group flex items-center gap-3 nd-transition"
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full nd-transition ${
                  isActive ? "bg-nd-accent" : "bg-nd-border-visible"
                }`}
              />
              <span
                className={`font-mono text-[10px] tracking-[0.08em] uppercase nd-transition ${
                  isActive
                    ? "text-nd-text-display opacity-100"
                    : "text-nd-text-disabled opacity-0 group-hover:opacity-100"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Hero */}
      <section id="overview" className="relative border-b border-nd-border">
        <div className="absolute inset-0 dot-grid-subtle opacity-30 pointer-events-none" />
        <div className="container px-4 mx-auto max-w-5xl relative z-10 py-24 md:py-40">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            {/* Left column — copy */}
            <div>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled hover:text-nd-text-display nd-transition mb-12"
              >
                ← Back to projects
              </Link>

              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled border border-nd-border px-2 py-1 rounded-full">
                  Android App
                </span>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-success border border-nd-success/30 px-2 py-1 rounded-full">
                  Freemium
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-nd-text-display leading-[1.0] tracking-[-0.03em] mb-6">
                Meteor<span className="text-nd-accent">.</span>
              </h1>

              <p className="text-nd-text-secondary text-base md:text-lg max-w-2xl leading-relaxed mb-10">
                Tasks and habits, unified. A clean daily surface for what you need
                to do and the routines you want to keep — without switching apps.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-nd-text-display text-nd-black font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:opacity-80 min-h-[44px]"
                >
                  <Download className="w-4 h-4" />
                  Get on Google Play
                </a>
                <Link
                  href="/meteor/privacy"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-nd-border-visible text-nd-text-primary font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:border-nd-text-secondary min-h-[44px]"
                >
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Right column — architecture */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 dot-grid-subtle opacity-20 pointer-events-none" />
              <div className="relative">
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-nd-text-disabled mb-6">
                  APP.ARCHITECTURE
                </p>

                <div className="flex flex-col items-stretch">
                  <div className="bg-nd-surface border border-nd-border px-5 py-4 rounded-sm">
                    <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled">
                      LAYER 01 / UI
                    </p>
                    <p className="font-mono text-sm text-nd-text-display mt-1">
                      Jetpack Compose + Material 3
                    </p>
                  </div>

                  <div className="flex flex-col items-center py-1">
                    <span className="block w-px h-6 bg-nd-border-visible" />
                    <span className="font-mono text-[10px] leading-none text-nd-text-disabled -mt-0.5">
                      ▼
                    </span>
                  </div>

                  <div className="bg-nd-surface border border-nd-border px-5 py-4 rounded-sm">
                    <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled">
                      LAYER 02 / STATE
                    </p>
                    <p className="font-mono text-sm text-nd-text-display mt-1">
                      ViewModel + StateFlow
                    </p>
                  </div>

                  <div className="flex flex-col items-center py-1">
                    <span className="block w-px h-6 bg-nd-border-visible" />
                    <span className="font-mono text-[10px] leading-none text-nd-text-disabled -mt-0.5">
                      ▼
                    </span>
                  </div>

                  <div className="bg-nd-surface border border-nd-border px-5 py-4 rounded-sm">
                    <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled">
                      LAYER 03 / DOMAIN
                    </p>
                    <p className="font-mono text-sm text-nd-text-display mt-1">
                      Use Cases + EntitlementRepo
                    </p>
                  </div>

                  <div className="flex flex-col items-center py-1">
                    <span className="block w-px h-6 bg-nd-border-visible" />
                    <span className="font-mono text-[10px] leading-none text-nd-text-disabled -mt-0.5">
                      ▼
                    </span>
                  </div>

                  <div className="bg-nd-surface border border-nd-border px-5 py-4 rounded-sm">
                    <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled">
                      LAYER 04 / DATA
                    </p>
                    <p className="font-mono text-sm text-nd-text-display mt-1">
                      Room DB + DataStore + Play Billing
                    </p>
                  </div>

                  <div className="flex flex-col items-center py-1">
                    <span className="block w-px h-6 bg-nd-border-visible" />
                    <span className="font-mono text-[10px] leading-none text-nd-text-disabled -mt-0.5">
                      ▼
                    </span>
                  </div>

                  <div className="bg-nd-surface border border-nd-accent/40 px-5 py-4 rounded-sm">
                    <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled">
                      LAYER 05 / OUTPUT
                    </p>
                    <p className="font-mono text-sm text-nd-accent mt-1">
                      Today · Tasks · Habits · Widget
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-nd-border">
            {(
              [
                {
                  label: "Min SDK",
                  value: "API 26",
                  total: 26,
                  filled: 26,
                  accentFrom: -1,
                },
                {
                  label: "Themes",
                  value: "2",
                  total: 2,
                  filled: 2,
                  accentFrom: -1,
                },
                {
                  label: "Free habits",
                  value: "3",
                  total: 3,
                  filled: 3,
                  accentFrom: -1,
                },
                {
                  label: "Local-first",
                  value: "100%",
                  total: 10,
                  filled: 10,
                  accentFrom: 0,
                },
              ] as const
            ).map((stat) => (
              <div key={stat.label}>
                <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-2">
                  {stat.label}
                </span>
                <span className="font-display text-3xl md:text-4xl font-bold text-nd-text-display block mb-3">
                  {stat.value}
                </span>
                <div className="nd-segmented-bar h-1.5 w-full">
                  {Array.from({ length: stat.total }).map((_, i) => {
                    const isFilled = i < stat.filled;
                    const isAccent =
                      stat.accentFrom >= 0 && i >= stat.accentFrom;
                    const classes = ["segment", "flex-1"];
                    if (isFilled && !isAccent) classes.push("filled");
                    if (isAccent) classes.push("accent");
                    return (
                      <span
                        key={i}
                        className={classes.join(" ")}
                        style={{ height: "100%" }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Habits */}
      <section id="habits" className="py-24 md:py-32 border-b border-nd-border">
        <div className="container px-4 mx-auto max-w-5xl">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
            01 / Habits
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-nd-text-display tracking-[-0.02em] mb-6">
            Build routines that actually stick.
          </h2>
          <p className="text-nd-text-secondary text-base max-w-xl mb-16">
            Habits in Meteor are first-class, not glorified recurring tasks.
          </p>

          <div className="space-y-16">
            {habitFeatures.map((feature, i) => {
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

      {/* Tasks */}
      <section id="tasks" className="py-24 md:py-32 border-b border-nd-border">
        <div className="container px-4 mx-auto max-w-5xl">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
            02 / Tasks
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-nd-text-display tracking-[-0.02em] mb-6">
            A task list that doesn&apos;t get in your way.
          </h2>
          <p className="text-nd-text-secondary text-base max-w-xl mb-16">
            Unlimited tasks, always free. Priority, subtasks, notes, and due
            dates — nothing artificial locked away.
          </p>

          <div className="space-y-16">
            {taskFeatures.map((feature, i) => {
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

      {/* Free vs Pro */}
      <section
        id="free-vs-pro"
        className="py-24 md:py-32 border-b border-nd-border"
      >
        <div className="container px-4 mx-auto max-w-5xl">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
            03 / Free vs Pro
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-nd-text-display tracking-[-0.02em] mb-6">
            One paywall. No dark patterns.
          </h2>
          <p className="text-nd-text-secondary text-base max-w-2xl mb-12 leading-relaxed">
            The only limit on free is 3 habits. Everything else — unlimited
            tasks, search, subtasks, tags, widget, data export — is fully
            unlocked with no account required.
          </p>

          <div className="bg-nd-surface border border-nd-border overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-nd-border">
                  <th className="text-left font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled py-4 px-6 font-normal">
                    Feature
                  </th>
                  <th className="text-center font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-display py-4 px-6 font-normal w-32">
                    Free
                  </th>
                  <th className="text-center font-mono text-[11px] tracking-[0.08em] uppercase text-nd-accent py-4 px-6 font-normal w-32">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={
                      i < comparisonRows.length - 1
                        ? "border-b border-nd-border"
                        : ""
                    }
                  >
                    <td className="text-sm text-nd-text-secondary py-3 px-6">
                      {row.label}
                    </td>
                    <td className="text-center py-3 px-6">
                      <ComparisonCell value={row.free} />
                    </td>
                    <td className="text-center py-3 px-6">
                      <ComparisonCell value={row.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-mono text-nd-text-disabled text-[11px] mt-4">
            Meteor Pro: $2.99 / month or $19.99 / year.
          </p>
        </div>
      </section>

      {/* Tech */}
      <section id="tech" className="py-24 md:py-32 border-b border-nd-border">
        <div className="container px-4 mx-auto max-w-5xl">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
            04 / Technical
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-nd-text-display tracking-[-0.02em] mb-12">
            How it&apos;s built.
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
                <p className="text-sm text-nd-text-secondary">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-nd-surface border border-nd-border p-6">
            <h3 className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-display mb-3">
              AlarmManager &amp; reminders
            </h3>
            <p className="text-sm text-nd-text-secondary leading-relaxed">
              Exact-time habit reminders use AlarmManager with the{" "}
              <code className="font-mono text-nd-text-display">
                USE_EXACT_ALARM
              </code>{" "}
              permission on API 33+. The user is prompted at first reminder-set
              if the permission hasn&apos;t been granted. Background streak
              rollover runs via WorkManager — no exact alarm required.
            </p>
          </div>
        </div>
      </section>

      {/* Get the app */}
      <section id="get-the-app" className="py-24 md:py-32">
        <div className="container px-4 mx-auto max-w-5xl text-center">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
            05 / Download
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-nd-text-display tracking-[-0.02em] mb-4">
            Get Meteor.
          </h2>
          <p className="text-nd-text-secondary text-base max-w-lg mx-auto mb-10">
            Available on Google Play. Free to start — unlimited tasks and 3
            habits included. Upgrade to Pro for unlimited habits, full heatmap
            history, and custom themes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-nd-text-display text-nd-black font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:opacity-80 min-h-[44px]"
            >
              <Download className="w-4 h-4" />
              Get on Google Play
            </a>
            <Link
              href="/meteor/privacy"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-nd-border-visible text-nd-text-primary font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:border-nd-text-secondary min-h-[44px]"
            >
              <Shield className="w-4 h-4" />
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MeteorPage;
