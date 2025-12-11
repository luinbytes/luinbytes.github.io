export interface Project {
    name: string;
    role: "extension" | "utility" | "AI tool" | "web";
    tech: string;
    description: string;
    link: string;
}

export const PROJECTS: Project[] = [
    {
        name: "archisteamfarm-raycast",
        role: "extension",
        tech: "TypeScript, Raycast API",
        description: "Manage your ASF bots directly from Raycast.",
        link: "https://github.com/luinbytes/archisteamfarm-raycast",
    },
    {
        name: "discord-utilities-raycast",
        role: "extension",
        tech: "TypeScript, Discord API",
        description: "Multi-tool for Discord power users.",
        link: "https://github.com/luinbytes/discord-utilities-raycast",
    },
    {
        name: "raycast-discord",
        role: "extension",
        tech: "TypeScript, Raycast",
        description: "Review and manage Discord connections.",
        link: "https://github.com/luinbytes/raycast-discord",
    },
    {
        name: "steam-account-switcher",
        role: "utility",
        tech: "C#, .NET",
        description: "Fast account switching for Steam power users.",
        link: "https://github.com/luinbytes/steam-account-switcher",
    },
    {
        name: "sharex-utilities",
        role: "utility",
        tech: "C#, ShareX",
        description: "Custom uploaders and tools for ShareX.",
        link: "https://github.com/luinbytes/sharex-utilities",
    },
    {
        name: "fantasy.comet",
        role: "web",
        tech: "Next.js, Tailwind",
        description: "Fantasy league tracker styling experiment.",
        link: "https://github.com/luinbytes/fantasy.comet",
    },
    {
        name: "ByteBot",
        role: "AI tool",
        tech: "Python, Discord.py",
        description: "AI-powered moderation and utility bot.",
        link: "https://github.com/luinbytes/ByteBot",
    },
    {
        name: "fast_uploader",
        role: "utility",
        tech: "Rust",
        description: "Blazingly fast file uploader CLI.",
        link: "https://github.com/luinbytes/fast_uploader",
    },
    {
        name: "gmail-wrapper",
        role: "utility",
        tech: "Python, Google API",
        description: "Simplify Gmail automation scripts.",
        link: "https://github.com/luinbytes/gmail-wrapper",
    },
    {
        name: "6c75-planner",
        role: "web",
        tech: "React, Drag-n-Drop",
        description: "Visual planner for complex workflows.",
        link: "https://github.com/luinbytes/6c75-planner",
    },
    {
        name: "constelia.ai-forum",
        role: "extension",
        tech: "TypeScript",
        description: "Viewer for AI forum posts and threads.",
        link: "https://github.com/luinbytes/constelia.ai-forum-post-viewer",
    },
];
