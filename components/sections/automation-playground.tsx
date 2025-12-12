"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Command, Terminal, Bot, Zap, Hash, Bookmark, Copy, Clock } from "lucide-react";
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
                    <DiscordUtilitiesDemo />
                    <ASFBotDemo />
                </div>
            </div>
        </section>
    );
}

// --- Discord Utilities Raycast Demo Component ---
function DiscordUtilitiesDemo() {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<"pins" | "bookmarks" | "profiles">("pins");
    const inputRef = useRef<HTMLInputElement>(null);

    const pinnedLinks = [
        { id: '1', icon: <Hash className="w-4 h-4" />, title: "#general", subtitle: "Main Server", tags: ["Dev", "Community"] },
        { id: '2', icon: <Hash className="w-4 h-4" />, title: "#coding-help", subtitle: "Dev Community", tags: ["Dev", "Help"] },
        { id: '3', icon: <Hash className="w-4 h-4" />, title: "#gaming", subtitle: "Gaming Server", tags: ["Gaming", "Social"] },
        { id: '4', icon: <Hash className="w-4 h-4" />, title: "@friend_dm", subtitle: "Direct Message", tags: ["Friends"] },
    ];

    const bookmarks = [
        { id: 'b1', icon: <Bookmark className="w-4 h-4" />, title: "Important Announcement", subtitle: "Saved 2 days ago" },
        { id: 'b2', icon: <Bookmark className="w-4 h-4" />, title: "Code Snippet", subtitle: "Saved 1 week ago" },
    ];

    const profiles = [
        { id: 'p1', icon: <div className="w-4 h-4 rounded bg-[#5865F2] text-white flex items-center justify-center font-bold text-[10px]">D</div>, title: "Discord Stable", subtitle: "Default profile", active: true },
        { id: 'p2', icon: <div className="w-4 h-4 rounded bg-[#7289da] text-white flex items-center justify-center font-bold text-[10px]">P</div>, title: "Discord PTB", subtitle: "Testing features", active: false },
        { id: 'p3', icon: <div className="w-4 h-4 rounded bg-[#faa61a] text-white flex items-center justify-center font-bold text-[10px]">C</div>, title: "Discord Canary", subtitle: "Bleeding edge", active: false },
    ];

    const currentItems = activeTab === "pins" ? pinnedLinks : activeTab === "bookmarks" ? bookmarks : profiles;
    const filtered = currentItems.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col h-[500px]">
            <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-mono uppercase tracking-widest">
                <Command className="w-4 h-4" /> Discord Utilities
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-3">
                {(['pins', 'bookmarks', 'profiles'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-3 py-1.5 rounded text-xs font-mono transition-colors uppercase tracking-wide",
                            activeTab === tab ? "bg-neon/20 text-neon border border-neon/40" : "bg-white/5 text-gray-500 border border-white/10 hover:bg-white/10"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Mock UI */}
            <div className="flex-1 bg-surface/50 rounded-lg border border-white/10 overflow-hidden flex flex-col shadow-2xl">
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                    <Search className="w-5 h-5 text-gray-500" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search Discord links..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-transparent text-xl text-white outline-none w-full placeholder-gray-600 font-medium"
                        autoComplete="off"
                    />
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {filtered.length === 0 ? (
                        <div className="text-center text-gray-600 mt-10">No matches found</div>
                    ) : (
                        filtered.map((item, i) => (
                            <div
                                key={item.id}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors cursor-default relative",
                                    i === selectedIndex ? "bg-[#5865F2]/10 text-white" : "text-gray-400"
                                )}
                                onMouseEnter={() => setSelectedIndex(i)}
                            >
                                <div className={cn("p-2 rounded-md", i === selectedIndex ? "bg-white/10 text-white" : "bg-white/5")}>
                                    {item.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center gap-2">
                                        <span className={cn("font-medium truncate", i === selectedIndex ? "text-white" : "text-gray-300")}>
                                            {item.title}
                                        </span>
                                        {i === selectedIndex && (
                                            <Copy className="w-3 h-3 text-gray-500" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="text-xs text-gray-500 truncate">{item.subtitle}</div>
                                        {'tags' in item && item.tags && (
                                            <div className="flex gap-1">
                                                {item.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] bg-[#5865F2]/20 text-[#5865F2] px-1.5 py-0.5 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {'active' in item && item.active && (
                                            <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">Active</span>
                                        )}
                                    </div>
                                </div>
                                {i === selectedIndex && (
                                    <div className="w-1 h-10 bg-[#5865F2] rounded-full absolute left-0" />
                                )}
                            </div>
                        ))
                    )}
                </div>
                <div className="p-2 border-t border-white/5 bg-black/20 text-[10px] text-gray-500 flex justify-between font-mono">
                    <span>discord-utilities-raycast</span>
                    <div className="flex gap-2">
                        <span>↵ Open</span>
                        <span>⌘C Copy</span>
                    </div>
                </div>
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
                Try switching tabs or searching channels
            </p>
        </div>
    );
}

// --- ASF Bot Manager Demo Component ---
function ASFBotDemo() {
    const [selectedBot, setSelectedBot] = useState(0);
    const [twoFATime, setTwoFATime] = useState(30);
    const [twoFACode, setTwoFACode] = useState('123 456');

    const bots = [
        { id: 'bot1', name: 'MainAccount', status: 'Farming', game: 'Team Fortress 2', cards: '3/5', online: true },
        { id: 'bot2', name: 'AltAccount', status: 'Online', game: 'Idle', cards: '0/0', online: true },
        { id: 'bot3', name: 'TradingBot', status: 'Offline', game: null, cards: '0/0', online: false },
    ];

    const generateCode = () => {
        const code1 = Math.floor(Math.random() * 900 + 100);
        const code2 = Math.floor(Math.random() * 900 + 100);
        return `${code1} ${code2}`;
    };

    useEffect(() => {
        // Generate initial code on client
        setTwoFACode(generateCode());

        const interval = setInterval(() => {
            setTwoFATime(prev => {
                if (prev <= 1) {
                    setTwoFACode(generateCode());
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col h-[500px]">
            <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-mono uppercase tracking-widest">
                <Bot className="w-4 h-4" /> ASF Bot Manager
            </div>

            {/* Bot Dashboard */}
            <div className="flex-1 bg-surface/50 rounded-lg border border-white/10 overflow-hidden flex flex-col shadow-2xl">

                {/* Bot List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {bots.map((bot, i) => (
                        <div
                            key={bot.id}
                            className={cn(
                                "p-3 rounded-lg border transition-all cursor-default relative",
                                i === selectedBot
                                    ? "bg-[#171a21]/50 border-neon/40"
                                    : "bg-[#171a21]/30 border-white/10 hover:border-white/20"
                            )}
                            onMouseEnter={() => setSelectedBot(i)}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        bot.online ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" : "bg-gray-600"
                                    )} />
                                    <div>
                                        <div className="font-medium text-white text-sm">{bot.name}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">
                                            {bot.status}
                                            {bot.game && <span className="text-gray-600"> • {bot.game}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    {bot.cards !== '0/0' && (
                                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-mono">
                                            Cards: {bot.cards}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 2FA Token Display */}
                <div className="p-4 border-t border-white/10 bg-black/30">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-400 font-mono">2FA Token</span>
                        </div>
                        <div className={cn(
                            "text-xs font-mono px-2 py-0.5 rounded",
                            twoFATime <= 5 ? "bg-red-500/20 text-red-400" : "bg-gray-500/20 text-gray-400"
                        )}>
                            {twoFATime}s
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-black/50 border border-white/10 rounded px-3 py-2 font-mono text-lg text-white text-center tracking-widest">
                            {twoFACode}
                        </div>
                        <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors">
                            <Copy className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2 h-1 bg-black/50 rounded-full overflow-hidden">
                        <div
                            className={cn(
                                "h-full transition-all duration-1000",
                                twoFATime <= 5 ? "bg-red-500" : "bg-neon"
                            )}
                            style={{ width: `${(twoFATime / 30) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-2 border-t border-white/5 bg-black/20 text-[10px] text-gray-500 flex justify-between font-mono">
                    <span>archisteamfarm-raycast</span>
                    <div className="flex gap-2">
                        <span>↵ Manage</span>
                        <span>⌘C Copy 2FA</span>
                    </div>
                </div>
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
                Real-time bot monitoring and 2FA management
            </p>
        </div>
    );
}
