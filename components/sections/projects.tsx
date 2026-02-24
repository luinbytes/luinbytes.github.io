"use client";

import { useState } from "react";
import { projects, Project, ProjectType } from "@/lib/data";
import { X, Github, ExternalLink, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterCategory = "All" | "Raycast" | "Web" | "CLI" | "Discord";

const filterMap: Record<FilterCategory, ProjectType[] | null> = {
    All: null,
    Raycast: ["Raycast Extension"],
    Web: ["Web App"],
    CLI: ["CLI Tool"],
    Discord: ["Discord Utility"],
};

const filterButtons: FilterCategory[] = ["All", "Raycast", "Web", "CLI", "Discord"];

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

    const filteredProjects = activeFilter === "All" 
        ? projects 
        : projects.filter(p => filterMap[activeFilter]?.includes(p.type));

    return (
        <section id="projects" className="py-24 relative">
            <div className="container px-4 md:px-8 mx-auto max-w-7xl">
                <div className="mb-16 border-l-4 border-accent pl-6">
                    <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                        Projects
                    </h2>
                    <p className="font-mono text-sm text-foreground-secondary max-w-2xl">
                        Tools built to solve real problems. No vaporware.
                    </p>
                </div>

                {/* Filter Buttons - Brutalist style */}
                <div className="flex flex-wrap gap-0 mb-16 border-2 border-foreground/20">
                    {filterButtons.map((filter, index) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={cn(
                                "px-6 py-3 text-sm font-mono font-bold uppercase tracking-wider border-r-2 border-foreground/20 transition-colors",
                                activeFilter === filter
                                    ? "bg-foreground text-surface"
                                    : "bg-transparent text-foreground hover:bg-foreground/5"
                            )}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-foreground/20">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            className={cn(
                                "group relative bg-surface p-8 cursor-pointer overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-foreground/20 transition-all",
                                "hover:bg-surface-alt"
                            )}
                        >
                            {/* Number */}
                            <div className="absolute top-4 left-4 font-display text-6xl font-bold text-foreground/5 group-hover:text-accent/10 transition-colors">
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            {/* Type Badge */}
                            <div className="absolute top-6 right-6">
                                <span className="font-mono text-xs uppercase tracking-wider text-accent border border-accent/30 px-2 py-1">
                                    {project.type}
                                </span>
                            </div>

                            <div className="mt-12 mb-4">
                                <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                                    {project.name}
                                </h3>
                                <p className="font-body text-foreground-secondary leading-relaxed mb-6">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground-secondary group-hover:text-accent transition-colors">
                                View Project →
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Detail Modal - Brutalist style */}
            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-foreground/90 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    />
                    <div className="relative bg-surface border-4 border-foreground w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">

                        {/* Modal Header */}
                        <div className="sticky top-0 bg-surface border-b-4 border-foreground p-6 md:p-8 flex justify-between items-start z-10">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-mono text-sm uppercase tracking-wider text-accent border-2 border-accent px-3 py-1">
                                        {selectedProject.type}
                                    </span>
                                    {selectedProject.featured && (
                                        <span className="font-mono text-xs uppercase tracking-wider text-foreground border-2 border-foreground px-3 py-1">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
                                    {selectedProject.name}
                                </h3>
                            </div>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="p-2 border-2 border-foreground hover:bg-foreground hover:text-surface transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 md:p-8 space-y-8">
                            <div className="border-l-4 border-accent pl-6">
                                <h4 className="font-mono text-xs uppercase tracking-widest text-foreground-secondary mb-3">The Problem</h4>
                                <p className="font-body text-lg text-foreground leading-relaxed">
                                    {selectedProject.longDescription || selectedProject.description}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="border-l-4 border-accent-secondary pl-6">
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-foreground-secondary mb-3">Approach</h4>
                                    <p className="font-body text-foreground-secondary leading-relaxed">
                                        {selectedProject.approach || "Optimized for performance and developer ergonomics."}
                                    </p>
                                </div>
                                <div className="border-l-4 border-accent pl-6">
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-foreground-secondary mb-3">Outcome</h4>
                                    <p className="font-body text-foreground-secondary leading-relaxed">
                                        {selectedProject.outcome || "Improved workflow efficiency."}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t-4 border-foreground pt-8 mt-8">
                                <h4 className="font-mono text-xs uppercase tracking-widest text-foreground-secondary mb-4">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.techStack.map((tech) => (
                                        <span key={tech} className="font-mono text-sm border-2 border-foreground/30 px-3 py-1.5 text-foreground">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 md:p-8 bg-foreground border-t-4 border-foreground flex flex-wrap gap-4">
                            {selectedProject.sourceUrl && (
                                <a
                                    href={selectedProject.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-surface text-foreground font-mono text-sm font-bold uppercase tracking-wider border-2 border-surface hover:bg-accent hover:border-accent hover:text-white transition-colors"
                                >
                                    <Github className="w-4 h-4" />
                                    View Source
                                </a>
                            )}
                            {selectedProject.purchaseUrl && (
                                <a
                                    href={selectedProject.purchaseUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-accent text-white font-mono text-sm font-bold uppercase tracking-wider border-2 border-accent hover:bg-accent-secondary hover:border-accent-secondary transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Buy $10
                                </a>
                            )}
                            {selectedProject.demoUrl && (
                                <a
                                    href={selectedProject.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-transparent text-white font-mono text-sm font-bold uppercase tracking-wider border-2 border-white hover:bg-white hover:text-foreground transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Live Demo
                                </a>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </section>
    );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    );
}
