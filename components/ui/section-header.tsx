"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeaderProps {
    title: string;
    className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
    return (
        <div className={cn("mb-12 relative pb-4", className)}>
            <h2 className="text-4xl md:text-5xl font-bold font-mono uppercase text-white">
                <span className="text-neon mr-2">#</span>
                {title}
            </h2>
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="absolute bottom-0 left-0 w-full h-1 bg-charcoal origin-left"
            />
        </div>
    );
}
