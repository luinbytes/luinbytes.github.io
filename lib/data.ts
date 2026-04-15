export type ProjectType = "Raycast Extension" | "Discord Utility" | "Steam Tool" | "Automation" | "Web App" | "Python Utility" | "CLI Tool" | "Game Mod";

export interface Project {
    id: string;
    name: string;
    type: ProjectType;
    description: string;
    longDescription?: string;
    approach?: string;
    outcome?: string;
    techStack: string[];
    tags: string[];
    sourceUrl?: string;
    demoUrl?: string;
    purchaseUrl?: string;  // Gumroad etc.
    pageUrl?: string;      // Dedicated product page route
    featured: boolean;
    lumiApproved?: boolean; // Projects Lumi helped build/polish
}

export interface ActivityItem {
    id: string;
    type: "contribution" | "release" | "experiment";
    title: string;
    description: string;
    date: string; // ISO string or loose date "Dec 2025"
}

// BuildLogItem interface removed - Build Log section replaced with Quick Dev Stats

export const projects: Project[] = [
    {
        id: "linux-sonar",
        name: "linux-sonar",
        type: "CLI Tool",
        description: "SteelSeries Sonar for Linux. Per-app audio routing, ChatMix, and mic effects on PipeWire.",
        longDescription: "Five virtual audio channels route apps independently to your headset. ChatMix slider balances game and chat volume, with hardware wheel support over USB-HID. Mic effects chain runs RNNoise, gate, 8-band EQ, compressor, and limiter as a PipeWire filter-chain subprocess. GTK4/libadwaita GUI with waybar integration.",
        approach: "Five libpipewire-module-filter-chain virtual sinks pinned to the headset via target.object. Per-app routing enforced by a daemon polling wpctl/pactl every 1.5s. WirePlumber persists moves across reboots. Mic chain runs as an isolated pipewire subprocess with debounced silent restarts.",
        outcome: "Full Sonar feature parity on Linux without SteelSeries software. Works on Arch with any PipeWire stereo output sink.",
        techStack: ["Python", "PipeWire", "WirePlumber", "GTK4", "libadwaita"],
        tags: ["Linux", "Audio", "PipeWire", "GTK4", "Open Source"],
        sourceUrl: "https://github.com/luinbytes/linux-sonar",
        featured: true,
        lumiApproved: true,
    },
    {
        id: "wterm",
        name: "wterm",
        type: "CLI Tool",
        description: "A Warp-inspired terminal emulator. Fast, modern, AI-ready. Built with Go + Bubble Tea.",
        longDescription: "wterm is a modern terminal emulator inspired by Warp. Features a beautiful Tokyo Night theme, command block grouping, AI integration (BYOK), and persistent history. Single binary, zero dependencies.",
        approach: "Built with Go and the Bubble Tea TUI framework. Uses Lip Gloss for styling with a Tokyo Night-inspired color palette. PTY integration for real shell execution. NLP parser with 39 patterns for command understanding.",
        outcome: "In active development. Goal: feature parity with modern terminals like Warp, Alacritty, and Kitty. Focusing on AI integration and developer productivity.",
        techStack: ["Go", "Bubble Tea", "Lip Gloss", "PTY", "NLP"],
        tags: ["Terminal", "CLI", "Go", "TUI", "AI", "Developer Tools"],
        sourceUrl: "https://github.com/luinbytes/wterm",
        demoUrl: "https://luinbytes.github.io/wterm/",
        featured: true,
        lumiApproved: true,
    },
    {
        id: "devscribe",
        name: "DevScribe",
        type: "CLI Tool",
        description: "AI-powered terminal session logger — git log for your whole dev life. Silent background logging, AI summaries, fuzzy search.",
        longDescription: "DevScribe silently watches your terminal sessions and builds a searchable, AI-summarized log. Get plain-English summaries of what you built, broke, and learned — perfect for weekly standups, portfolio documentation, or just remembering what you did last Tuesday.",
        approach: "Uses shell hooks to capture every command with exit codes and timestamps. Auto-tags sessions with git repo names. Integrates LiteLLM for AI-powered 5-bullet session recaps. Built with Python 3.12+ for cross-platform compatibility across Linux, macOS, and Windows.",
        outcome: "Never lose context again. Search your entire command history, export markdown reports, and get instant AI summaries of your work sessions.",
        techStack: ["Python", "LiteLLM", "Shell Hooks", "CLI"],
        tags: ["CLI", "DevTools", "AI", "Productivity", "Python"],
        sourceUrl: "https://github.com/luinbytes/devscribe",
        demoUrl: "https://luinbytes.github.io/devscribe/",
        featured: true,
        lumiApproved: true,
    },
    {
        id: "file-deduplicator",
        name: "file-deduplicator",
        type: "CLI Tool",
        description: "The only CLI tool that finds similar images, not just exact duplicates. v3.0.0 released! 🚀",
        longDescription: "A fast, parallel CLI duplicate finder with a killer feature: perceptual image hashing. Finds similar photos even when they've been edited, compressed, or renamed — something no other CLI tool does.",
        approach: "Built in Go for speed with parallel SHA256 hashing. Implements dHash, aHash, and pHash algorithms for perceptual similarity detection. Cross-platform with safe defaults (dry-run, move-instead-of-delete).",
        outcome: "Open source with paid binaries. The only CLI tool with perceptual image deduplication — perfect for cleaning up massive photo libraries.",
        techStack: ["Go", "Perceptual Hashing", "CLI", "Cross-Platform"],
        tags: ["CLI", "Go", "Image Processing", "Open Source", "Released"],
        sourceUrl: "https://github.com/luinbytes/file-deduplicator",
        demoUrl: "https://luinbytes.github.io/file-deduplicator/",
        purchaseUrl: "https://luinbytes.gumroad.com/l/file-deduplicator",
        featured: true,
    },
    {
        id: "window-walker",
        name: "Window Walker",
        type: "Raycast Extension",
        description: "Quickly switch between windows and manage your workspace from Raycast.",
        longDescription: "A fast and intuitive window switcher for Raycast. Search and jump to any open window instantly with keyboard-first navigation.",
        approach: "Uses native system APIs to enumerate windows and provide instant switching with fuzzy search.",
        outcome: "Seamless window management without lifting your hands from keyboard.",
        techStack: ["TypeScript", "Raycast API"],
        tags: ["Productivity", "Windows", "Workspace"],
        sourceUrl: "https://github.com/luinbytes/extensions/tree/window-walker-extension",
        featured: true,
    },
    {
        id: "bytebot",
        name: "ByteBot",
        type: "Discord Utility",
        description: "A powerful Discord bot with moderation, utilities, games, and BytePod voice channels.",
        longDescription: "ByteBot is a feature-rich Discord bot offering moderation tools, custom commands, F1 racing data, War Thunder stats, and unique BytePod system for dynamic voice channel management.",
        approach: "Built with Node.js and discord.js, featuring a modular command architecture, Drizzle ORM, and real-time API integrations.",
        outcome: "Streamlined server management with gaming integrations and an intuitive control system.",
        techStack: ["JavaScript", "Node.js", "Discord.js", "Drizzle ORM", "SQLite"],
        tags: ["Discord", "Bot", "Moderation", "F1", "Gaming"],
        sourceUrl: "https://github.com/luinbytes/bytebot-definitive-edition",
        featured: true,
        lumiApproved: true,
    },
    {
        id: "raycast-extensions",
        name: "Raycast Extensions",
        type: "Raycast Extension",
        description: "A collection of powerful extensions for Raycast to boost productivity.",
        longDescription: "I develop and maintain several extensions for Raycast store, focusing on system monitoring and developer tools.",
        approach: "Built using React, Node.js, and Raycast API. Optimized for speed and keyboard-first interactions.",
        outcome: "Used by thousands of developers to streamline their daily workflows.",
        techStack: ["TypeScript", "React", "Node.js"],
        tags: ["Raycast", "Productivity", "Open Source"],
        sourceUrl: "https://github.com/luinbytes/extensions",
        featured: false,
    },
    {
        id: "afk-tracker",
        name: "AFK Tracker",
        type: "Web App",
        description: "Smart AFK (Away From Keyboard) tracker with AI-powered estimations and analytics.",
        longDescription: "A feature-rich productivity tool that tracks your break times with AI-powered predictions, comprehensive analytics, achievements, and gamification to help you understand and optimize your work/break patterns.",
        approach: "Built with pure HTML/CSS/JavaScript (no frameworks), using IndexedDB for local storage and Canvas API for visualizations. Features fuzzy matching for grouping similar AFK reasons and statistical outlier detection for accurate predictions.",
        outcome: "100% privacy-focused with all data stored locally in the browser. Helps users optimize their productivity through data-driven insights about their break patterns.",
        techStack: ["JavaScript", "HTML5 Canvas", "IndexedDB", "Web Audio API", "Service Worker"],
        tags: ["Productivity", "Analytics", "AI", "PWA", "Privacy"],
        sourceUrl: "https://github.com/luinbytes/afk",
        demoUrl: "https://luinbytes.github.io/afk/",
        featured: true,
    },
    {
        id: "lifx-controller",
        name: "LIFX Controller",
        type: "Raycast Extension",
        description: "Control your LIFX smart lights directly from Raycast.",
        longDescription: "Full control over your LIFX smart lighting ecosystem. Toggle lights, adjust brightness, change colors, and manage scenes without leaving your keyboard.",
        approach: "Integrates with LIFX HTTP API for reliable cloud-based control with natural language commands.",
        outcome: "Instant smart home control from your launcher.",
        techStack: ["TypeScript", "Raycast API", "LIFX API"],
        tags: ["Smart Home", "LIFX", "Automation"],
        sourceUrl: "https://github.com/luinbytes/extensions/tree/lifx-controller-extension",
        featured: true,
    },
    {
        id: "bed-time-calculator",
        name: "Bed Time Calculator",
        type: "Raycast Extension",
        description: "Calculate optimal sleep and wake times based on 90-minute sleep cycles.",
        longDescription: "Plan your sleep schedule around natural 90-minute sleep cycles to wake up feeling refreshed. Calculate when to go to sleep, when to wake up, or both.",
        approach: "Uses sleep science to calculate optimal bedtimes or wake times based on cycle completion, helping you avoid waking up mid-cycle.",
        outcome: "Better mornings through cycle-aware sleep scheduling.",
        techStack: ["TypeScript", "Raycast API"],
        tags: ["Health", "Productivity", "Sleep"],
        sourceUrl: "https://www.raycast.com/khlebobul/bed-time-calculator",
        featured: true,
    },
    {
        id: "fastuploader",
        name: "FastUploader",
        type: "Automation",
        description: "Automates uploading files via shareX to a custom host.",
        longDescription: "Run a script to grab the most recent clip in your clips folder and upload it to your custom host using ShareX's API.",
        approach: "Simple and efficient automation.",
        outcome: "Automated file uploads to a custom host.",
        techStack: ["Python", "Automation"],
        tags: ["Bot", "Canvas", "Scripting"],
        sourceUrl: "https://github.com/luinbytes/fast_uploader",
        featured: false,
    },
    {
        id: "super-hacker-golf",
        name: "SuperHackerGolf",
        type: "Game Mod",
        description: "Client-side cheat mod for Super Battle Golf with aim assist, trajectory prediction, ESP, and anti-cheat bypass.",
        longDescription: "MelonLoader mod that hooks Super Battle Golf through HarmonyX patches. Golf assist reads the game's own wind and terrain settings via reflection to predict exact ball trajectory, accounting for air damping, bounce chains, ground roll, and crosswind drift. Combat tools include a silent-aim weapon aimbot with legit/rage/custom modes, ESP overlay, force shield, item spawner, and bunnyhop. Eight HarmonyX patches suppress the game's rate-limiter anti-cheat and vote-kick system.",
        approach: "Built on MelonLoader 0.7.2 with HarmonyX runtime patching. Reverse-engineers ball physics from static analysis of GameAssembly.dll rather than guessed coefficients. CI pipeline compiles handwritten Unity type stubs so GitHub Actions builds without a game install. Reflection caches use cached FieldInfo and MethodInfo with fallback cascades for resilience across game updates.",
        outcome: "31 commits with auto-releasing tagged builds on every push to main. The anti-cheat bypass stack covers every known server-side detection path in the game.",
        techStack: ["C#", "MelonLoader", "HarmonyX", "Unity", ".NET 8"],
        tags: ["Game Mod", "Reverse Engineering", "C#", "Unity"],
        sourceUrl: "https://github.com/luinbytes/SuperHackerGolf",
        pageUrl: "/super-hacker-golf",
        featured: true,
    },
    {
        id: "bongocat",
        name: "Bongo Cat",
        type: "Python Utility",
        description: "A Python project featuring the legendary Bongo Cat.",
        techStack: ["Python"],
        tags: ["Fun", "Python"],
        sourceUrl: "https://github.com/luinbytes/bongocat",
        featured: false,
    },
];

// buildLog export removed - Build Log section replaced with Quick Dev Stats in activity.tsx
