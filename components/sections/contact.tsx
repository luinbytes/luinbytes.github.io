"use client";

import { useState } from "react";
import { Github, Twitter, Mail, Coffee } from "lucide-react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 border-b border-nd-border">
      <div className="container px-4 mx-auto max-w-4xl">
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
          07 / Contact
        </span>
        <h2 className="font-body text-3xl md:text-4xl font-bold text-nd-text-display tracking-[-0.02em] mb-4">
          Let&apos;s Build Something
        </h2>
        <p className="text-nd-text-secondary text-base mb-12 max-w-xl">
          Got a tedious workflow that needs automating? Or just want to talk about Rust?
          Drop me a line.
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Socials */}
          <div className="md:col-span-1 space-y-0 border-t border-nd-border">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4 pt-4">
              Socials
            </span>
            <div className="space-y-0">
              <a
                href="https://github.com/luinbytes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 text-nd-text-secondary hover:text-nd-text-display nd-transition border-b border-nd-border group"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm font-body">GitHub</span>
              </a>
              <a
                href="https://x.com/x6c75"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 text-nd-text-secondary hover:text-nd-text-display nd-transition border-b border-nd-border group"
              >
                <Twitter className="w-4 h-4" />
                <span className="text-sm font-body">@x6c75</span>
              </a>
              <a
                href="mailto:0x6c75@protonmail.com"
                className="flex items-center gap-3 py-3 text-nd-text-secondary hover:text-nd-text-display nd-transition border-b border-nd-border group"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm font-body">Email</span>
              </a>
              <a
                href="https://buymeacoffee.com/luinbytes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 text-nd-text-secondary hover:text-nd-text-display nd-transition border-b border-nd-border group"
              >
                <Coffee className="w-4 h-4" />
                <span className="text-sm font-body">Buy Me a Coffee</span>
              </a>
            </div>

            {/* Raycast Extensions */}
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4 pt-6">
              Raycast Extensions
            </span>
            <div className="space-y-0">
              <a
                href="https://www.raycast.com/nazzy_wazzy_lu/window-walker?via=lu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-0 py-3 border-b border-nd-border group"
              >
                <div className="flex-1">
                  <div className="text-sm text-nd-text-secondary font-body group-hover:text-nd-text-display nd-transition">
                    Window Walker
                  </div>
                  <div className="font-mono text-[10px] text-nd-text-disabled">
                    Quick window switching
                  </div>
                </div>
              </a>
              <a
                href="https://www.raycast.com/nazzy_wazzy_lu/archisteamfarm?via=lu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-0 py-3 border-b border-nd-border group"
              >
                <div className="flex-1">
                  <div className="text-sm text-nd-text-secondary font-body group-hover:text-nd-text-display nd-transition">
                    ArchiSteamFarm
                  </div>
                  <div className="font-mono text-[10px] text-nd-text-disabled">
                    Steam bot management
                  </div>
                </div>
              </a>
              <a
                href="https://www.raycast.com/khlebobul/bed-time-calculator?via=lu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-0 py-3 border-b border-nd-border group"
              >
                <div className="flex-1">
                  <div className="text-sm text-nd-text-secondary font-body group-hover:text-nd-text-display nd-transition">
                    Bed Time Calculator
                  </div>
                  <div className="font-mono text-[10px] text-nd-text-disabled">
                    Optimal sleep cycles
                  </div>
                </div>
              </a>
              <a
                href="https://raycast.com/?via=lu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[10px] text-nd-text-disabled hover:text-nd-interactive nd-transition pt-4"
              >
                Get Raycast free →
              </a>
            </div>
          </div>

          {/* Contact Form — Nothing inputs */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-secondary block mb-2"
                  >
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    id="name"
                    className="w-full bg-transparent border-b border-nd-border-visible py-3 text-nd-text-display outline-none nd-transition focus:border-nd-text-display font-mono text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-secondary block mb-2"
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    className="w-full bg-transparent border-b border-nd-border-visible py-3 text-nd-text-display outline-none nd-transition focus:border-nd-text-display font-mono text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-secondary block mb-2"
                >
                  Reason
                </label>
                <select
                  id="reason"
                  className="w-full bg-transparent border-b border-nd-border-visible py-3 text-nd-text-display outline-none nd-transition focus:border-nd-text-display font-mono text-sm"
                >
                  <option className="bg-nd-surface">Collaboration</option>
                  <option className="bg-nd-surface">Job Opportunity</option>
                  <option className="bg-nd-surface">Custom Tool Request</option>
                  <option className="bg-nd-surface">Just Saying Hi</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-secondary block mb-2"
                >
                  Message
                </label>
                <textarea
                  required
                  id="message"
                  rows={5}
                  className="w-full bg-transparent border-b border-nd-border-visible py-3 text-nd-text-display outline-none nd-transition focus:border-nd-text-display font-mono text-sm resize-none"
                  placeholder="I need a bot that..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="w-full bg-nd-text-display text-nd-black font-mono text-[13px] font-bold tracking-[0.06em] uppercase py-4 rounded-full nd-transition hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
              >
                {status === "idle" && "SEND MESSAGE"}
                {status === "submitting" && "[SENDING...]"}
                {status === "success" && "[SENT]"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-nd-border text-center font-mono text-[11px]">
          <p className="text-nd-text-disabled tracking-[0.06em]">
            © {new Date().getFullYear()} Luinbytes. Built with Next.js & Caffeine.
          </p>
          <p className="text-nd-text-disabled tracking-[0.06em] mt-1 opacity-60">
            Powered by{" "}
            <a
              href="https://openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nd-interactive nd-transition"
            >
              OpenClaw
            </a>{" "}
            · AI assistant: Lumi
          </p>
        </div>
      </div>
    </section>
  );
}
