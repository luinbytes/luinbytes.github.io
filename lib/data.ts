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

export interface BuildLogItem {
    id: string;
    content: string;
}

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
        sourceUrl: "https://github.com/luinbytes/raycast-extensions",
        featured: true,
    },
    {
        id: "steam-utilities-raycast",
        name: "Steam Utilities",
        type: "Raycast Extension",
        description: "Control your Steam library directly from Raycast.",
        longDescription: "Launch games, check server status, and manage your library without opening the heavy Steam client.",
        approach: "Reverse-engineered parts of the Steam protocol to interact with the local client via Raycast.",
        outcome: "Instant game launching and status checks.",
        techStack: ["TypeScript", "Raycast API"],
        tags: ["Gaming", "Steam", "Automation"],
        sourceUrl: "https://github.com/luinbytes/steam-utilities-raycast",
        featured: true,
    },
    {
        id: "discord-utilities-raycast",
        name: "Discord Utilities",
        type: "Raycast Extension",
        description: "Quick actions for Discord: change status, check messages, and more.",
        longDescription: "Seamless integration with Discord to manage your presence and servers from the command line.",
        approach: "Utilizes Discord's IPC and API to control the local client.",
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
        id: "iniuria-ai",
        name: "Iniuria.ai Discord Assistant",
        type: "Automation",
        description: "Node.js-based Discord bot that acts as a customer service assistant for Iniuria.us.",
        longDescription: "A specialized Discord bot designed to handle customer inquiries, automate support tickets, and manage server moderation for the Iniuria.us community.",
        approach: "Built with Node.js and discord.js, implementing custom command handling and automated response systems.",
        outcome: "Reduced support ticket response times and streamlined community management.",
        techStack: ["JavaScript", "Node.js", "Discord API"],
        tags: ["Discord", "Bot", "Automation"],
        sourceUrl: "https://github.com/luinbytes/iniuria.ai",
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

export const buildLog: BuildLogItem[] = [
    { id: "1", content: "Experimenting with a new Raycast extension that manages PC gaming profiles" },
    { id: "2", content: "Building an AI-powered helper for managing Steam libraries" },
    { id: "3", content: "Refactoring my home server backup scripts to use Restic" },
    { id: "4", content: "Trying to make my mechanical keyboard firmware do my taxes (kidding... unless?)" },
];
