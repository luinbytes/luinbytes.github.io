export type ProjectType = "Raycast Extension" | "Discord Utility" | "Steam Tool" | "Automation" | "Web App" | "Python Utility";

export interface Project {
    id: string;
    name: string;
    type: ProjectType;
    description: string;
    longDescription?: string; // For detail view
    approach?: string;       // For detail view
    outcome?: string;        // For detail view
    techStack: string[];
    tags: string[];
    sourceUrl?: string; // GitHub or similar
    demoUrl?: string;
    featured: boolean;
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
        id: "raycast-extensions",
        name: "Raycast Extensions",
        type: "Raycast Extension",
        description: "A collection of powerful extensions for Raycast to boost productivity.",
        longDescription: "I develop and maintain several extensions for the Raycast store, focusing on system monitoring and developer tools.",
        approach: "Built using React, Node.js, and the Raycast API. Optimized for speed and keyboard-first interactions.",
        outcome: "Used by thousands of developers to streamline their daily workflows.",
        techStack: ["TypeScript", "React", "Node.js"],
        tags: ["Raycast", "Productivity", "Open Source"],
        sourceUrl: "https://github.com/luinbytes/extensions",
        featured: true,
    },
    {
        id: "window-walker",
        name: "Window Walker",
        type: "Raycast Extension",
        description: "Quickly switch between windows and manage your workspace from Raycast.",
        longDescription: "A fast and intuitive window switcher for Raycast. Search and jump to any open window instantly with keyboard-first navigation.",
        approach: "Uses native system APIs to enumerate windows and provide instant switching with fuzzy search.",
        outcome: "Seamless window management without lifting your hands from the keyboard.",
        techStack: ["TypeScript", "Raycast API"],
        tags: ["Productivity", "Windows", "Workspace"],
        sourceUrl: "https://github.com/luinbytes/extensions/tree/window-walker-extension",
        featured: true,
    },
    {
        id: "discord-utilities-raycast",
        name: "Discord Utilities",
        type: "Raycast Extension",
        description: "Quick actions for Discord: check messages and more.",
        longDescription: "Seamless integration with Discord to manage your presence and servers from the command line.",
        approach: "Uses discord.js-selfbot-v13@v3.7 to control the local client.",
        outcome: "Faster context switching for power users.",
        techStack: ["TypeScript", "Discord RPC"],
        tags: ["Discord", "Social", "Tools"],
        sourceUrl: "https://github.com/luinbytes/discord-utilities-raycast",
        featured: true,
    },
    {
        id: "fastuploader",
        name: "FastUploader",
        type: "Automation",
        description: "Automates uploading files via shareX to a custom host.",
        longDescription: "Run the script to grab the most recent clip in your clips folder and upload it to your custom host using ShareX's API.",
        approach: "Simple and efficient automation.",
        outcome: "Automated file uploads to a custom host.",
        techStack: ["Python", "Automation"],
        tags: ["Bot", "Canvas", "Scripting"],
        sourceUrl: "https://github.com/luinbytes/fast_uploader",
        featured: false,
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
    {
        id: "bytebot",
        name: "ByteBot",
        type: "Discord Utility",
        description: "A powerful Discord bot with moderation, utilities, and BytePod voice channels.",
        longDescription: "ByteBot is a feature-rich Discord bot offering moderation tools, custom commands, and the unique BytePod system for dynamic voice channel management.",
        approach: "Built with Node.js and discord.js, featuring a modular command architecture and persistent database storage.",
        outcome: "Streamlined server management with an intuitive control system.",
        techStack: ["JavaScript", "Node.js", "Discord.js"],
        tags: ["Discord", "Bot", "Moderation"],
        sourceUrl: "https://github.com/luinbytes/bytebot-definitive-edition",
        featured: true,
    },
    {
        id: "sleep-calculator",
        name: "Sleep Calculator",
        type: "Raycast Extension",
        description: "Calculate optimal sleep and wake times based on sleep cycles.",
        longDescription: "Plan your sleep schedule around natural 90-minute sleep cycles to wake up feeling refreshed instead of groggy.",
        approach: "Uses sleep science to calculate optimal bedtimes or wake times based on cycle completion.",
        outcome: "Better sleep quality through cycle-aware scheduling.",
        techStack: ["TypeScript", "Raycast API"],
        tags: ["Health", "Productivity", "Sleep"],
        sourceUrl: "https://github.com/luinbytes/extensions/tree/sleep-calculator-extension",
        featured: false,
    },
    {
        id: "lifx-controller",
        name: "LIFX Controller",
        type: "Raycast Extension",
        description: "Control your LIFX smart lights directly from Raycast.",
        longDescription: "Full control over your LIFX smart lighting ecosystem. Toggle lights, adjust brightness, change colors, and manage scenes without leaving your keyboard.",
        approach: "Integrates with the LIFX HTTP API for reliable cloud-based control with natural language commands.",
        outcome: "Instant smart home control from your launcher.",
        techStack: ["TypeScript", "Raycast API", "LIFX API"],
        tags: ["Smart Home", "LIFX", "Automation"],
        sourceUrl: "https://github.com/luinbytes/extensions/tree/lifx-controller-extension",
        featured: false,
    }
];

export const recentActivity: ActivityItem[] = [
    {
        id: "1",
        type: "contribution",
        title: "Contributed to Raycast Extensions",
        description: "Added new commands to the official Spotify extension.",
        date: "Dec 2024",
    },
    {
        id: "2",
        type: "release",
        title: "Shipped System Monitor v2.0",
        description: "Complete rewrite with new graphs and historical data.",
        date: "Nov 2024",
    },
    {
        id: "3",
        type: "experiment",
        title: "Exploring Rust for Game Tooling",
        description: "Porting my C# memory reader to Rust for performance.",
        date: "Oct 2024",
    }
];

// buildLog export removed - Build Log section replaced with Quick Dev Stats in activity.tsx
