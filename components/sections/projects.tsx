"use client";

import { useState } from "react";
import { projects, Project } from "@/lib/data";
import { X, Github, ExternalLink, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="py-24 relative border-t border-white/5">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 flex items-center gap-3">
                        <Terminal className="w-8 h-8 text-neon" />
                        Selected Work
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        A collection of tools I built because I was too lazy to do things the hard way.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            className="group relative bg-surface border border-white/10 rounded-xl p-8 hover:border-neon/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
                        >
                            {/* Type Badge */}
                            <div className="absolute top-8 right-8">
                                <span className="text-xs font-mono text-neon/80 bg-neon/10 px-2 py-1 rounded-full border border-neon/20">
                                    {project.type}
                                </span>
                            </div>

                            <div className="mt-8 mb-4">
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-neon transition-colors">
                                    {project.name}
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-8">
                                    {project.description}
                                </p>
                            </div>

                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2 text-xs font-mono text-gray-500 mb-6">
                                    {project.techStack.slice(0, 3).map((tech) => (
                                        <span key={tech} className="bg-white/5 px-2 py-1 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-neon transition-colors">
                                    View Details
                                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    />
                    <div className="relative bg-[#111] border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">

                        {/* Modal Header */}
                        <div className="sticky top-0 bg-[#111]/95 backdrop-blur-md border-b border-white/10 p-6 md:p-8 flex justify-between items-start z-10">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-neon font-mono text-sm border border-neon/20 bg-neon/10 px-2 py-0.5 rounded-full">
                                        {selectedProject.type}
                                    </span>
                                    {selectedProject.featured && (
                                        <span className="text-yellow-400 font-mono text-xs border border-yellow-400/20 bg-yellow-400/10 px-2 py-0.5 rounded-full">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                                    {selectedProject.name}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tags.map(tag => (
                                        <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 md:p-8 space-y-8">
                            <div>
                                <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-3">The Problem</h4>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {selectedProject.longDescription || selectedProject.description}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-3">Approach</h4>
                                    <p className="text-gray-300 leading-relaxed">
                                        {selectedProject.approach || "Optimized for performance and developer ergonomics."}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-3">Outcome</h4>
                                    <p className="text-gray-300 leading-relaxed">
                                        {selectedProject.outcome || "Improved workflow efficiency."}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-8 mt-8">
                                <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.techStack.map((tech) => (
                                        <span key={tech} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-sm text-gray-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 md:p-8 bg-white/5 border-t border-white/10 flex flex-wrap gap-4">
                            {selectedProject.sourceUrl && (
                                <a
                                    href={selectedProject.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-neon transition-colors"
                                >
                                    <Github className="w-4 h-4" />
                                    View Source
                                </a>
                            )}
                            {selectedProject.demoUrl && (
                                <a
                                    href={selectedProject.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
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
