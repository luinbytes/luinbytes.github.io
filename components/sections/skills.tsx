"use client";

const skillCategories = [
    {
        title: "Languages",
        skills: ["TypeScript", "Go", "Python", "JavaScript", "SQL"],
    },
    {
        title: "Frameworks",
        skills: ["Next.js", "React", "Node.js", "Tailwind CSS", "Discord.js"],
    },
    {
        title: "Tools",
        skills: ["Git", "Docker", "Linux", "Raycast API", "GitHub Actions"],
    },
];

export function Skills() {
    return (
        <section id="skills" className="py-24 relative border-t border-white/5">
            <div className="container px-4 mx-auto max-w-4xl">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 flex items-center gap-3">
                        <span className="text-neon">/</span> Stack
                    </h2>
                </div>

                <div className="space-y-8">
                    {skillCategories.map((category) => (
                        <div key={category.title}>
                            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-3">
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {category.skills.map((skill) => (
                                    <span key={skill} className="text-gray-300">
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
