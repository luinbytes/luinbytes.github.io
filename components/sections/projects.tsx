"use client";

import { useState } from "react";
import { projects, Project, ProjectType } from "@/lib/data";
import { cn } from "@/lib/utils";
import { X, ExternalLink } from "lucide-react";

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

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => filterMap[activeFilter]?.includes(p.type));

  return (
    <section id="projects" className="py-24 md:py-32 border-b border-nd-border">
      <div className="container px-4 mx-auto max-w-7xl">
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
          04 / Selected Work
        </span>
        <p className="text-nd-text-secondary text-base max-w-xl mb-8">
          A collection of tools I built because I was too lazy to do things the hard way.
        </p>

        {/* Segmented control — Nothing style */}
        <div className="flex gap-0 mb-10 border border-nd-border-visible rounded-full overflow-hidden inline-flex">
          {filterButtons.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-2 font-mono text-[11px] tracking-[0.08em] uppercase nd-transition",
                activeFilter === filter
                  ? "bg-nd-text-display text-nd-black"
                  : "bg-transparent text-nd-text-secondary hover:text-nd-text-display"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project cards — flat surface, border separation, no shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-nd-surface border border-nd-border p-6 cursor-pointer flex flex-col h-full nd-transition hover:border-nd-border-visible"
            >
              {/* Top: tags */}
              <div className="flex items-center gap-2 mb-6">
                <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled border border-nd-border px-2 py-1 rounded-full">
                  {project.type}
                </span>
                {project.lumiApproved && (
                  <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-success border border-nd-success/30 px-2 py-1 rounded-full">
                    Lumi approved
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="font-body text-xl font-bold text-nd-text-display mb-3 group-hover:text-nd-interactive nd-transition">
                {project.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-nd-text-secondary leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] tracking-[0.06em] uppercase text-nd-text-disabled border border-nd-border px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action */}
              <div className="flex items-center gap-1.5 text-sm font-mono text-nd-text-disabled group-hover:text-nd-text-display nd-transition">
                View Details
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal — Nothing style */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-nd-black/80"
            onClick={() => setSelectedProject(null)}
          />
          <div className="relative bg-nd-surface border border-nd-border-visible w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-none flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-nd-surface border-b border-nd-border p-6 md:p-8 flex justify-between items-start z-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled border border-nd-border px-2 py-1 rounded-full">
                    {selectedProject.type}
                  </span>
                  {selectedProject.featured && (
                    <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-warning border border-nd-warning/30 px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="font-body text-2xl md:text-3xl font-bold text-nd-text-display tracking-[-0.02em] mb-2">
                  {selectedProject.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] text-nd-text-disabled tracking-[0.06em] uppercase">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-nd-surface-raised nd-transition font-mono text-nd-text-disabled hover:text-nd-text-display"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-8">
              <div>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-3">
                  Description
                </span>
                <p className="text-nd-text-secondary text-base leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-3">
                    Approach
                  </span>
                  <p className="text-nd-text-secondary text-sm leading-relaxed">
                    {selectedProject.approach ||
                      "Optimized for performance and developer ergonomics."}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-3">
                    Outcome
                  </span>
                  <p className="text-nd-text-secondary text-sm leading-relaxed">
                    {selectedProject.outcome || "Improved workflow efficiency."}
                  </p>
                </div>
              </div>

              <div className="border-t border-nd-border pt-8">
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-nd-border px-3 py-1.5 font-mono text-[11px] tracking-[0.06em] uppercase text-nd-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 md:p-8 bg-nd-black border-t border-nd-border-visible flex flex-wrap gap-3">
              {selectedProject.sourceUrl && (
                <a
                  href={selectedProject.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-nd-text-display text-nd-black font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:opacity-80 min-h-[44px]"
                >
                  View Source
                </a>
              )}
              {selectedProject.purchaseUrl && (
                <a
                  href={selectedProject.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-nd-accent text-nd-accent font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:bg-nd-accent-subtle min-h-[44px]"
                >
                  Buy $10
                </a>
              )}
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-nd-border-visible text-nd-text-primary font-mono text-[13px] font-bold tracking-[0.06em] uppercase rounded-full nd-transition hover:border-nd-text-secondary min-h-[44px]"
                >
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
