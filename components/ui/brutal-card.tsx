"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrutalCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
}

export function BrutalCard({ children, className, title, subtitle }: BrutalCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className={cn(
                "bg-charcoal/50 border border-white/10 rounded-lg p-6 flex flex-col gap-4 h-full",
                "hover:border-neon hover:shadow-[0_0_20px_-5px_rgba(204,255,0,0.3)] transition-all duration-300 group",
                className
            )}
        >
            {(title || subtitle) && (
                <div className="flex flex-col gap-1 border-b border-white/5 pb-4 mb-2">
                    {title && (
                        <h3 className="text-xl font-bold font-mono uppercase text-white tracking-tight group-hover:text-neon transition-colors">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="text-xs text-gray-400 font-mono tracking-widest uppercase">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
            <div className="text-gray-300 text-sm leading-relaxed flex-grow font-mono">
                {children}
            </div>
        </motion.div>
    );
}
