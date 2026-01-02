"use client";

import { useState } from "react";
import { Send, Mail, Github, Twitter, Coffee } from "lucide-react";
import { Footer } from "@/components/layout/footer";

export function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        // Simulate network request
        setTimeout(() => {
            setStatus("success");
        }, 1500);
    };

    return (
        <section id="contact" className="py-20 relative bg-surface border-t border-white/5">
            <div className="container px-4 mx-auto max-w-4xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-center">
                    Let's Build Something
                </h2>
                <p className="text-center text-gray-400 mb-16 max-w-xl mx-auto">
                    Got a tedious workflow that needs automating? Or just want to talk about Rust?
                    Drop me a line.
                </p>

                <div className="grid md:grid-cols-3 gap-16">

                    <div className="md:col-span-1 space-y-6">
                        <h3 className="font-bold text-white text-lg">Socials</h3>
                        <div className="space-y-6">
                            <a href="https://github.com/luinbytes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-neon/20 group-hover:text-neon transition-colors">
                                    <Github className="w-5 h-5" />
                                </div>
                                <span>GitHub</span>
                            </a>
                            <a href="https://x.com/x6c75" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-neon/20 group-hover:text-neon transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </div>
                                <span>@x6c75</span>
                            </a>
                            <a href="mailto:0x6c75@protonmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-neon/20 group-hover:text-neon transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span>Email</span>
                            </a>
                            <a href="https://buymeacoffee.com/luinbytes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-yellow-400/20 group-hover:text-yellow-400 transition-colors">
                                    <Coffee className="w-5 h-5" />
                                </div>
                                <span>Buy Me a Coffee</span>
                            </a>
                        </div>

                        {/* Raycast Extensions */}
                        <h3 className="font-bold text-white text-lg mt-8">Raycast Extensions</h3>
                        <div className="space-y-3 mt-4">
                            <a
                                href="https://www.raycast.com/nazzy_wazzy_lu/window-walker?via=lu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-[#FF6154]/50 hover:bg-[#FF6154]/10 transition-colors group"
                            >
                                <span className="text-xl">🪟</span>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-white group-hover:text-[#FF6154]">Window Walker</div>
                                    <div className="text-xs text-gray-500">Quick window switching</div>
                                </div>
                            </a>
                            <a
                                href="https://www.raycast.com/nazzy_wazzy_lu/archisteamfarm?via=lu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-[#FF6154]/50 hover:bg-[#FF6154]/10 transition-colors group"
                            >
                                <span className="text-xl">🎮</span>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-white group-hover:text-[#FF6154]">ArchiSteamFarm</div>
                                    <div className="text-xs text-gray-500">Steam bot management</div>
                                </div>
                            </a>
                            <a
                                href="https://raycast.com/?via=lu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#FF6154] transition-colors mt-2"
                            >
                                Get Raycast free →
                            </a>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-mono text-gray-500">Name</label>
                                    <input
                                        required
                                        type="text"
                                        id="name"
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-neon outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-mono text-gray-500">Email</label>
                                    <input
                                        required
                                        type="email"
                                        id="email"
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-neon outline-none transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="reason" className="text-sm font-mono text-gray-500">Reason</label>
                                <select
                                    id="reason"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-neon outline-none transition-colors"
                                >
                                    <option>Collaboration</option>
                                    <option>Job Opportunity</option>
                                    <option>Custom Tool Request</option>
                                    <option>Just Saying Hi</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-mono text-gray-500">Message</label>
                                <textarea
                                    required
                                    id="message"
                                    rows={5}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-neon outline-none transition-colors resize-none"
                                    placeholder="I need a bot that..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting' || status === 'success'}
                                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-neon transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'idle' && <>Send Message <Send className="w-4 h-4" /></>}
                                {status === 'submitting' && 'Sending...'}
                                {status === 'success' && 'Message Sent!'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer embedded in contact section for flow */}
            <div className="mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-sm font-mono">
                <p>&copy; {new Date().getFullYear()} Luinbytes. Built with Next.js & Caffeine.</p>
            </div>
        </section>
    );
}
