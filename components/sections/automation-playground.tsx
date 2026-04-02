"use client";

import { useState, useRef } from "react";
import { Search, Command, Bot, Shield, MessageSquare, Users, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

export function AutomationPlayground() {
  return (
    <section id="playground" className="py-24 md:py-32 border-b border-nd-border">
      <div className="container px-4 mx-auto max-w-7xl">
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
          05 / Raycast Extensions
        </span>
        <p className="text-nd-text-secondary text-base max-w-xl mb-12">
          Interactive demos of my Raycast extensions. Built with TypeScript and the Raycast API.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <WindowWalkerDemo />
          <ByteBotDemo />
        </div>
      </div>
    </section>
  );
}

function WindowWalkerDemo() {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const windows = [
    { id: "1", app: "VS Code", title: "luinbytes-site - Visual Studio Code", icon: "💻", workspace: "Desktop 1" },
    { id: "2", app: "Chrome", title: "GitHub - luinbytes/extensions", icon: "🌐", workspace: "Desktop 1" },
    { id: "3", app: "Terminal", title: "pwsh - npm run dev", icon: "⬛", workspace: "Desktop 1" },
    { id: "4", app: "Discord", title: "Dev Community Server", icon: "💬", workspace: "Desktop 2" },
    { id: "5", app: "Figma", title: "Portfolio Redesign v2", icon: "🎨", workspace: "Desktop 2" },
    { id: "6", app: "Spotify", title: "Coding Focus Mix", icon: "🎵", workspace: "Desktop 1" },
  ];

  const filtered = windows.filter(
    (w) =>
      w.app.toLowerCase().includes(query.toLowerCase()) ||
      w.title.toLowerCase().includes(query.toLowerCase())
  );

  const effectiveSelectedIndex = Math.min(selectedIndex, filtered.length - 1);

  return (
    <div className="bg-nd-surface border border-nd-border p-6 flex flex-col h-[420px]">
      <div className="flex items-center gap-2 mb-4">
        <Command className="w-4 h-4 text-nd-text-disabled" />
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled">
          Window Walker
        </span>
      </div>

      <div className="flex-1 bg-nd-black border border-nd-border overflow-hidden flex flex-col">
        <div className="p-4 border-b border-nd-border flex items-center gap-3">
          <Search className="w-4 h-4 text-nd-text-disabled" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search windows..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="bg-transparent text-base text-nd-text-display outline-none w-full placeholder-nd-text-disabled font-body"
            autoComplete="off"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-1">
          {filtered.length === 0 ? (
            <div className="text-center text-nd-text-disabled mt-10 font-mono text-sm">
              [NO RESULTS]
            </div>
          ) : (
            filtered.map((window, i) => (
              <div
                key={window.id}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 nd-transition cursor-default relative",
                  i === effectiveSelectedIndex
                    ? "bg-nd-surface-raised text-nd-text-display"
                    : "text-nd-text-secondary"
                )}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                {i === effectiveSelectedIndex && (
                  <div className="w-0.5 h-8 bg-nd-accent rounded-full absolute left-0" />
                )}
                <div className="text-lg p-1 bg-nd-surface">{window.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center gap-2">
                    <span
                      className={cn(
                        "text-sm font-medium truncate",
                        i === effectiveSelectedIndex ? "text-nd-text-display" : "text-nd-text-secondary"
                      )}
                    >
                      {window.app}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-nd-text-disabled">
                      {window.workspace}
                    </span>
                  </div>
                  <div className="text-xs text-nd-text-disabled truncate mt-0.5">
                    {window.title}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-2 border-t border-nd-border bg-nd-surface font-mono text-[10px] text-nd-text-disabled flex justify-between">
          <span>window-walker-extension</span>
          <div className="flex gap-3">
            <span>↵ FOCUS</span>
            <span>⌘W CLOSE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ByteBotDemo() {
  const [activeTab, setActiveTab] = useState<"activity" | "moderation" | "bytepods">("activity");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activityItems = [
    { id: "1", icon: <MessageSquare className="w-4 h-4" />, user: "DevUser", action: "Used /help command", time: "2m ago", channel: "#general" },
    { id: "2", icon: <Users className="w-4 h-4" />, user: "NewMember", action: "Joined the server", time: "5m ago", channel: null },
    { id: "3", icon: <Mic className="w-4 h-4" />, user: "Lu", action: "Created BytePod: Gaming Session", time: "12m ago", channel: null },
    { id: "4", icon: <Shield className="w-4 h-4" />, user: "ByteBot", action: "Auto-moderated spam message", time: "15m ago", channel: "#chat" },
  ];

  const modActions = [
    { id: "m1", type: "warn", user: "SpamUser", reason: "Advertising", mod: "Lu", time: "1h ago" },
    { id: "m2", type: "mute", user: "ToxicUser", reason: "Inappropriate language", mod: "ByteBot", time: "3h ago" },
    { id: "m3", type: "kick", user: "RuleBreaker", reason: "Repeated violations", mod: "Lu", time: "1d ago" },
  ];

  const bytepods = [
    { id: "bp1", name: "Lu's Lounge", owner: "Lu", users: 3, maxUsers: 5, locked: false },
    { id: "bp2", name: "Coding Session", owner: "DevUser", users: 2, maxUsers: 4, locked: true },
    { id: "bp3", name: "Gaming Squad", owner: "Gamer123", users: 5, maxUsers: 5, locked: false },
  ];

  const getModTypeColor = (type: string) => {
    switch (type) {
      case "warn":
        return "text-nd-warning";
      case "mute":
        return "text-nd-text-disabled";
      case "kick":
        return "text-nd-accent";
      default:
        return "text-nd-text-secondary";
    }
  };

  return (
    <div className="bg-nd-surface border border-nd-border p-6 flex flex-col h-[420px]">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-4 h-4 text-nd-text-disabled" />
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled">
          ByteBot Dashboard
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-3 border border-nd-border rounded-full overflow-hidden inline-flex">
        {(["activity", "moderation", "bytepods"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSelectedIndex(0);
            }}
            className={cn(
              "px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] uppercase nd-transition",
              activeTab === tab
                ? "bg-nd-text-display text-nd-black"
                : "bg-transparent text-nd-text-secondary"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      <div className="flex-1 bg-nd-black border border-nd-border overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-1">
          {activeTab === "activity" &&
            activityItems.map((item, i) => (
              <div
                key={item.id}
                className={cn(
                  "p-3 border-b border-nd-border nd-transition cursor-default flex items-center gap-3",
                  i === selectedIndex ? "bg-nd-surface-raised" : "hover:bg-nd-surface"
                )}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div className="p-2 bg-nd-surface text-nd-text-secondary">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-nd-text-display text-sm">
                      {item.user}
                    </span>
                    {item.channel && (
                      <span className="font-mono text-[10px] text-nd-text-disabled">
                        {item.channel}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-nd-text-secondary truncate">
                    {item.action}
                  </div>
                </div>
                <span className="font-mono text-[10px] text-nd-text-disabled shrink-0">
                  {item.time}
                </span>
              </div>
            ))}

          {activeTab === "moderation" &&
            modActions.map((action, i) => (
              <div
                key={action.id}
                className={cn(
                  "p-3 border-b border-nd-border nd-transition cursor-default",
                  i === selectedIndex ? "bg-nd-surface-raised" : "hover:bg-nd-surface"
                )}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "font-mono text-[10px] tracking-[0.08em] uppercase",
                        getModTypeColor(action.type)
                      )}
                    >
                      [{action.type}]
                    </span>
                    <span className="font-medium text-nd-text-display text-sm">
                      {action.user}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-nd-text-disabled">
                    {action.time}
                  </span>
                </div>
                <div className="text-xs text-nd-text-secondary">{action.reason}</div>
              </div>
            ))}

          {activeTab === "bytepods" &&
            bytepods.map((pod, i) => (
              <div
                key={pod.id}
                className={cn(
                  "p-3 border-b border-nd-border nd-transition cursor-default",
                  i === selectedIndex ? "bg-nd-surface-raised" : "hover:bg-nd-surface"
                )}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-nd-success" />
                    <span className="font-medium text-nd-text-display text-sm">
                      {pod.name}
                    </span>
                    {pod.locked && (
                      <span className="font-mono text-[10px] text-nd-text-disabled">
                        [LOCKED]
                      </span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "font-mono text-[10px] px-2 py-0.5 border",
                      pod.users === pod.maxUsers
                        ? "text-nd-accent border-nd-accent/30"
                        : "text-nd-success border-nd-success/30"
                    )}
                  >
                    {pod.users}/{pod.maxUsers}
                  </span>
                </div>
                <div className="text-xs text-nd-text-disabled mt-1">
                  Owner: {pod.owner}
                </div>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-nd-border bg-nd-surface font-mono text-[10px] text-nd-text-disabled flex justify-between">
          <span>bytebot-definitive-edition</span>
          <div className="flex gap-3">
            <span>↵ DETAILS</span>
            <span>⌘A ACTIONS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
