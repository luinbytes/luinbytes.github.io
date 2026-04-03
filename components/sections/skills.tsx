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
    <section id="skills" className="py-24 md:py-32 border-b border-nd-border">
      <div className="container px-4 mx-auto max-w-4xl">
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
          03 / Stack
        </span>

        <div className="space-y-8">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
                {category.title}
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-nd-text-primary text-base"
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
