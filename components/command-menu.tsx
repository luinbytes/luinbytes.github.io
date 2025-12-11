"use client";

import * as React from "react";
import { Command } from "cmdk";

import { useRouter } from "next/navigation";
import { Laptop, User, Folder, Mail, Github, Coffee, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[99] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg shadow-2xl"
            >
                <Command className="bg-charcoal border-2 border-neon text-white rounded-none overflow-hidden shadow-[0_0_50px_-12px_var(--neon)]">
                    <div className="flex items-center border-b border-gray-700 px-3">
                        <Command.Input
                            placeholder="Type a command or search..."
                            className="w-full bg-transparent p-4 outline-none font-mono text-white placeholder:text-gray-500"
                        />
                        <kbd className="hidden sm:inline-block pointer-events-none h-5 select-none items-center gap-1 bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-gray-400 opacity-100 border border-gray-700">
                            ESC
                        </kbd>
                    </div>

                    <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
                        <Command.Empty className="p-4 text-center text-sm text-gray-500 font-mono">No results found.</Command.Empty>

                        <Command.Group heading="Navigation" className="text-xs font-mono text-gray-500 mb-2 px-2 uppercase tracking-wider">
                            <Item icon={User} onSelect={() => runCommand(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }))}>
                                About
                            </Item>
                            <Item icon={Folder} onSelect={() => runCommand(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }))}>
                                Projects
                            </Item>
                            <Item icon={Monitor} onSelect={() => runCommand(() => document.getElementById('activity')?.scrollIntoView({ behavior: 'smooth' }))}>
                                Activity
                            </Item>
                            <Item icon={Mail} onSelect={() => runCommand(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }))}>
                                Contact
                            </Item>
                        </Command.Group>

                        <Command.Group heading="Social" className="text-xs font-mono text-gray-500 mb-2 px-2 uppercase tracking-wider mt-4">
                            <Item icon={Github} onSelect={() => runCommand(() => window.open('https://github.com/luinbytes', '_blank'))}>
                                GitHub
                            </Item>
                        </Command.Group>

                        <Command.Group heading="General" className="text-xs font-mono text-gray-500 mb-2 px-2 uppercase tracking-wider mt-4">
                            <Item icon={Laptop} onSelect={() => runCommand(() => setOpen(false))}>
                                Toggle Theme (Coming Soon)
                            </Item>
                            <Item icon={Coffee} onSelect={() => runCommand(() => window.open('https://buymeacoffee.com', '_blank'))}>
                                Buy RedBull
                            </Item>
                        </Command.Group>
                    </Command.List>
                </Command>
            </motion.div>
        </div>
    );
}

function Item({ children, icon: Icon, onSelect }: { children: React.ReactNode, icon: any, onSelect: () => void }) {
    return (
        <Command.Item
            onSelect={onSelect}
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 aria-selected:bg-neon aria-selected:text-black transition-colors cursor-pointer data-[disabled]:opacity-50 font-mono"
        >
            <Icon className="w-4 h-4" />
            {children}
        </Command.Item>
    )
}
