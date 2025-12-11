"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "outline";
}

export function Button({
    className,
    variant = "primary",
    children,
    ...props
}: ButtonProps) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -2 }}
            className={cn(
                "px-6 py-3 font-mono font-bold uppercase tracking-wider text-sm transition-colors duration-200",
                "border-2 border-neon",
                variant === "primary" && "bg-neon text-black hover:bg-neon/90",
                variant === "outline" && "bg-transparent text-neon hover:bg-neon hover:text-black",
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
