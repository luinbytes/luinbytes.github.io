"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Command, Terminal, Bot, Zap, Hash, Bookmark, Copy, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function AutomationPlayground() {
    return (
        <section id="playground" className="py-32 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-surface/50 to-black pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <DiscordUtilitiesDemo />
                    <ASFBotDemo />
                </div>
            </div>
        </section>
    );
}

// --- Raycast Demo Component ---
function RaycastDemo() {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const commands = [
        { id: 'steam-launch', icon: <div className="w-4 h-4 rounded bg-[#171a21] text-white flex items-center justify-center font-bold text-[10px]">S</div>, title: "Steam: Launch Game", subtitle: "Counter-Strike 2" },
        { id: 'steam-friends', icon: <div className="w-4 h-4 rounded bg-[#171a21] text-white flex items-center justify-center font-bold text-[10px]">S</div>, title: "Steam: Friends Online", subtitle: "3 Friends Online" },
        { id: 'discord-status', icon: <div className="w-4 h-4 rounded bg-[#5865F2] text-white flex items-center justify-center font-bold text-[10px]">D</div>, title: "Discord: Set Status", subtitle: "Coding..." },
        { id: 'discord-mute', icon: <div className="w-4 h-4 rounded bg-[#5865F2] text-white flex items-center justify-center font-bold text-[10px]">D</div>, title: "Discord: Toggle Mute", subtitle: "Microphone Muted" },
        { id: 'sys-cpu', icon: <Terminal className="w-4 h-4" />, title: "System: CPU Details", subtitle: "Usage: 12% • Temp: 45°C" },
    ];

    const filtered = commands.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col h-[400px]">
            <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-mono uppercase tracking-widest">
                <Command className="w-4 h-4" /> Raycast Simulation
            </div>

            {/* Mock UI */}
            <div className="flex-1 bg-surface/50 rounded-lg border border-white/10 overflow-hidden flex flex-col shadow-2xl">
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                    <Search className="w-5 h-5 text-gray-500" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search commands..."
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
                        filtered.map((cmd, i) => (
                            <div
                                key={cmd.id}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors cursor-default",
                                    i === selectedIndex ? "bg-neon/10 text-white" : "text-gray-400"
                                )}
                                onMouseEnter={() => setSelectedIndex(i)}
                            >
                                <div className={cn("p-2 rounded-md", i === selectedIndex ? "bg-white/10 text-white" : "bg-white/5")}>
                                    {cmd.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <span className={cn("font-medium truncate", i === selectedIndex ? "text-white" : "text-gray-300")}>
                                            {cmd.title}
                                        </span>
                                        {i === selectedIndex && (
                                            <span className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-gray-400">↵</span>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">{cmd.subtitle}</div>
                                </div>
                                {i === selectedIndex && (
                                    <div className="w-1 h-8 bg-neon rounded-full absolute left-0" />
                                )}
                            </div>
                        ))
                    )}
                </div>
                <div className="p-2 border-t border-white/5 bg-black/20 text-[10px] text-gray-500 flex justify-between font-mono">
                    <span>Extensions: Steam, Discord, System</span>
                    <div className="flex gap-2">
                        <span>↵ Select</span>
                        <span>⌃K Actions</span>
                    </div>
                </div>
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
                Try searching "Steam" or "Discord"
            </p>
        </div>
    );
}

// --- Canvas Bot (wplacer) Demo Component ---
function CanvasBotDemo() {
    const [pixels, setPixels] = useState<{ x: number, y: number, color: string }[]>([]);
    const [log, setLog] = useState<string[]>([]);

    // Canvas dimensions (grid)
    const gridSize = 16;

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const drawPixel = () => {
            const x = Math.floor(Math.random() * gridSize);
            const y = Math.floor(Math.random() * gridSize);
            // Random pastel color
            const colors = ['#ff9eb5', '#b3688a', '#794a63', '#ffffff', '#00f3ff'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            setPixels(prev => [...prev.slice(-30), { x, y, color }]); // Keep last 30 pixels
            setLog(prev => [`[BOT] Placing pixel at (${x},${y}) - ${color}`, ...prev].slice(0, 6)); // Keep last 6 logs
        };

        interval = setInterval(drawPixel, 600);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col h-[400px]">
            <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-mono uppercase tracking-widest">
                <Bot className="w-4 h-4" /> wplacer Logic
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4 bg-[#0a0a0a] rounded-lg border border-white/5 overflow-hidden p-4 relative">

                {/* Visual Grid */}
                <div className="flex-1 aspect-square md:aspect-auto bg-[#1a1a1a] rounded border border-white/5 relative overflow-hidden"
                    style={{
                        backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                        backgroundSize: '10px 10px'
                    }}
                >
                    {pixels.map((p, i) => (
                        <div
                            key={i}
                            className="absolute w-[6.25%] h-[6.25%] transition-all duration-300 animate-in fade-in zoom-in"
                            style={{
                                left: `${(p.x / gridSize) * 100}%`,
                                top: `${(p.y / gridSize) * 100}%`,
                                backgroundColor: p.color,
                                boxShadow: `0 0 10px ${p.color}`
                            }}
                        />
                    ))}
                </div>

                {/* Console Log */}
                <div className="w-full md:w-1/3 bg-black/50 rounded border border-white/10 p-3 font-mono text-[10px] space-y-1 overflow-hidden flex flex-col">
                    <div className="text-gray-500 border-b border-white/10 pb-1 mb-1">
                        ~/wplacer/logs
                    </div>
                    {log.map((line, i) => (
                        <div key={i} className={cn("truncate", i === 0 ? "text-neon" : "text-gray-400")}>
                            {line}
                        </div>
                    ))}
                </div>
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
                Simulating <code>wplacer</code> logic
            </p>
        </div>
    );
}
