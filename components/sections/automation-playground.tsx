"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Command, Bot, Copy, Clock, Shield, MessageSquare, Users, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

export function AutomationPlayground() {
    return (
        <section id="playground" className="py-32 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-surface/50 to-black pointer-events-none" />

            <div className="container px-4 mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 flex items-center justify-center gap-3">
                        <Command className="w-8 h-8 text-neon" />
                        Raycast Extensions
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Interactive demos of my Raycast extensions that make productivity effortless.
                        Built with TypeScript and the Raycast API.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <WindowWalkerDemo />
                    <ByteBotDemo />
                </div>
            </div>
        </section>
    );
}

// --- Window Walker Raycast Demo Component ---
function WindowWalkerDemo() {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const windows = [
        { id: '1', app: 'VS Code', title: 'luinbytes-site - Visual Studio Code', icon: '💻', workspace: 'Desktop 1' },
        { id: '2', app: 'Chrome', title: 'GitHub - luinbytes/extensions', icon: '🌐', workspace: 'Desktop 1' },
        { id: '3', app: 'Terminal', title: 'pwsh - npm run dev', icon: '⬛', workspace: 'Desktop 1' },
        { id: '4', app: 'Discord', title: 'Dev Community Server', icon: '💬', workspace: 'Desktop 2' },
        { id: '5', app: 'Figma', title: 'Portfolio Redesign v2', icon: '🎨', workspace: 'Desktop 2' },
        { id: '6', app: 'Spotify', title: 'Coding Focus Mix', icon: '🎵', workspace: 'Desktop 1' },
    ];

    const filtered = windows.filter(w =>
        w.app.toLowerCase().includes(query.toLowerCase()) ||
        w.title.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col h-[500px]">
            <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-mono uppercase tracking-widest">
                <Command className="w-4 h-4" /> Window Walker
            </div>

            {/* Mock UI */}
            <div className="flex-1 bg-surface/50 rounded-lg border border-white/10 overflow-hidden flex flex-col shadow-2xl">
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                    <Search className="w-5 h-5 text-gray-500" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search windows..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-transparent text-xl text-white outline-none w-full placeholder-gray-600 font-medium"
                        autoComplete="off"
                    />
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {filtered.length === 0 ? (
                        <div className="text-center text-gray-600 mt-10">No windows found</div>
                    ) : (
                        filtered.map((window, i) => (
                            <div
                                key={window.id}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors cursor-default relative",
                                    i === selectedIndex ? "bg-neon/10 text-white" : "text-gray-400"
                                )}
                                onMouseEnter={() => setSelectedIndex(i)}
                            >
                                <div className={cn("text-2xl p-1 rounded-md", i === selectedIndex ? "bg-white/10" : "bg-white/5")}>
                                    {window.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center gap-2">
                                        <span className={cn("font-medium truncate", i === selectedIndex ? "text-white" : "text-gray-300")}>
                                            {window.app}
                                        </span>
                                        <span className="text-[10px] bg-white/5 text-gray-500 px-1.5 py-0.5 rounded font-mono">
                                            {window.workspace}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500 truncate mt-0.5">{window.title}</div>
                                </div>
                                {i === selectedIndex && (
                                    <div className="w-1 h-10 bg-neon rounded-full absolute left-0" />
                                )}
                            </div>
                        ))
                    )}
                </div>
                <div className="p-2 border-t border-white/5 bg-black/20 text-[10px] text-gray-500 flex justify-between font-mono">
                    <span>window-walker-extension</span>
                    <div className="flex gap-2">
                        <span>↵ Focus</span>
                        <span>⌘W Close</span>
                    </div>
                </div>
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
                Try searching for apps or window titles
            </p>
        </div>
    );
}

// --- ByteBot Discord Bot Demo Component ---
function ByteBotDemo() {
    const [activeTab, setActiveTab] = useState<"activity" | "moderation" | "bytepods">("activity");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const activityItems = [
        { id: '1', icon: <MessageSquare className="w-4 h-4" />, user: 'DevUser', action: 'Used /help command', time: '2m ago', channel: '#general' },
        { id: '2', icon: <Users className="w-4 h-4" />, user: 'NewMember', action: 'Joined the server', time: '5m ago', channel: null },
        { id: '3', icon: <Mic className="w-4 h-4" />, user: 'Lu', action: 'Created BytePod: Gaming Session', time: '12m ago', channel: null },
        { id: '4', icon: <Shield className="w-4 h-4" />, user: 'ByteBot', action: 'Auto-moderated spam message', time: '15m ago', channel: '#chat' },
    ];

    const modActions = [
        { id: 'm1', type: 'warn', user: 'SpamUser', reason: 'Advertising', mod: 'Lu', time: '1h ago' },
        { id: 'm2', type: 'mute', user: 'ToxicUser', reason: 'Inappropriate language', mod: 'ByteBot', time: '3h ago' },
        { id: 'm3', type: 'kick', user: 'RuleBreaker', reason: 'Repeated violations', mod: 'Lu', time: '1d ago' },
    ];

    const bytepods = [
        { id: 'bp1', name: "Lu's Lounge", owner: 'Lu', users: 3, maxUsers: 5, locked: false },
        { id: 'bp2', name: 'Coding Session', owner: 'DevUser', users: 2, maxUsers: 4, locked: true },
        { id: 'bp3', name: 'Gaming Squad', owner: 'Gamer123', users: 5, maxUsers: 5, locked: false },
    ];

    const getModTypeColor = (type: string) => {
        switch (type) {
            case 'warn': return 'text-yellow-400 bg-yellow-400/10';
            case 'mute': return 'text-orange-400 bg-orange-400/10';
            case 'kick': return 'text-red-400 bg-red-400/10';
            default: return 'text-gray-400 bg-gray-400/10';
        }
    };

    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col h-[500px]">
            <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-mono uppercase tracking-widest">
                <Bot className="w-4 h-4" /> ByteBot Dashboard
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-3">
                {(['activity', 'moderation', 'bytepods'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setSelectedIndex(0); }}
                        className={cn(
                            "px-3 py-1.5 rounded text-xs font-mono transition-colors uppercase tracking-wide",
                            activeTab === tab ? "bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/40" : "bg-white/5 text-gray-500 border border-white/10 hover:bg-white/10"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 bg-surface/50 rounded-lg border border-white/10 overflow-hidden flex flex-col shadow-2xl">
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {activeTab === "activity" && activityItems.map((item, i) => (
                        <div
                            key={item.id}
                            className={cn(
                                "p-3 rounded-lg border transition-all cursor-default flex items-center gap-3",
                                i === selectedIndex ? "bg-[#5865F2]/10 border-[#5865F2]/30" : "bg-black/20 border-white/5 hover:border-white/10"
                            )}
                            onMouseEnter={() => setSelectedIndex(i)}
                        >
                            <div className="p-2 rounded-md bg-white/5 text-[#5865F2]">
                                {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-white text-sm">{item.user}</span>
                                    {item.channel && <span className="text-[10px] text-gray-500 font-mono">{item.channel}</span>}
                                </div>
                                <div className="text-xs text-gray-400 truncate">{item.action}</div>
                            </div>
                            <span className="text-[10px] text-gray-500 font-mono">{item.time}</span>
                        </div>
                    ))}

                    {activeTab === "moderation" && modActions.map((action, i) => (
                        <div
                            key={action.id}
                            className={cn(
                                "p-3 rounded-lg border transition-all cursor-default",
                                i === selectedIndex ? "bg-[#5865F2]/10 border-[#5865F2]/30" : "bg-black/20 border-white/5 hover:border-white/10"
                            )}
                            onMouseEnter={() => setSelectedIndex(i)}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <span className={cn("text-[10px] font-mono px-1.5 py-0.5 rounded uppercase", getModTypeColor(action.type))}>
                                        {action.type}
                                    </span>
                                    <span className="font-medium text-white text-sm">{action.user}</span>
                                </div>
                                <span className="text-[10px] text-gray-500 font-mono">{action.time}</span>
                            </div>
                            <div className="text-xs text-gray-400">{action.reason}</div>
                            <div className="text-[10px] text-gray-500 mt-1">by {action.mod}</div>
                        </div>
                    ))}

                    {activeTab === "bytepods" && bytepods.map((pod, i) => (
                        <div
                            key={pod.id}
                            className={cn(
                                "p-3 rounded-lg border transition-all cursor-default",
                                i === selectedIndex ? "bg-[#5865F2]/10 border-[#5865F2]/30" : "bg-black/20 border-white/5 hover:border-white/10"
                            )}
                            onMouseEnter={() => setSelectedIndex(i)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Mic className="w-4 h-4 text-green-400" />
                                    <span className="font-medium text-white text-sm">{pod.name}</span>
                                    {pod.locked && <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">🔒</span>}
                                </div>
                                <span className={cn(
                                    "text-[10px] font-mono px-2 py-0.5 rounded",
                                    pod.users === pod.maxUsers ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                                )}>
                                    {pod.users}/{pod.maxUsers}
                                </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Owner: {pod.owner}</div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-2 border-t border-white/5 bg-black/20 text-[10px] text-gray-500 flex justify-between font-mono">
                    <span>bytebot-definitive-edition</span>
                    <div className="flex gap-2">
                        <span>↵ View Details</span>
                        <span>⌘A Actions</span>
                    </div>
                </div>
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
                Full-featured Discord bot with moderation & BytePod voice channels
            </p>
        </div>
    );
}
