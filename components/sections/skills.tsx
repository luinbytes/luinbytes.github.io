"use client";

import { Code2, Wrench, Layers } from "lucide-react";

interface SkillCategory {
    title: string;
    icon: React.ReactNode;
    skills: string[];
}

const skillCategories: SkillCategory[] = [
    {
        title: "Languages",
        icon: <Code2 className="w-5 h-5" />,
        skills: ["TypeScript", "Go", "Python", "JavaScript", "HTML/CSS", "SQL"],
    },
    {
        title: "Frameworks & Libraries",
        icon: <Layers className="w-5 h-5" />,
        skills: ["Next.js", "React", "Node.js", "Tailwind CSS", "Discord.js", "Drizzle ORM"],
    },
    {
        title: "Tools & Platforms",
        icon: <Wrench className="w-5 h-5" />,
        skills: ["Git", "Docker", "Linux", "Raycast API", "GitHub Actions", "Supabase"],
    },
];

export function Skills() {
    return (
        <section id="skills" className="py-24 relative border-t border-white/5">
            <div className="container px-4 mx-auto max-w-6xl">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 flex items-center gap-3">
                        <span className="text-neon">/</span> Skills & Tech Stack
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        The tools I reach for when building things.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {skillCategories.map((category) => (
                        <div
                            key={category.title}
                            className="bg-surface border border-white/10 rounded-xl p-8 hover:border-neon/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-neon/10 rounded-lg text-neon">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white">{category.title}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-sm text-gray-300 hover:border-neon/50 hover:text-neon transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
