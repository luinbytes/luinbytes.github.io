"use client";

import { motion, HTMLMotionProps } from "framer-motion";

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
    delay?: number;
    staggerDelay?: number;
}

export function StaggerContainer({
    children,
    delay = 0,
    staggerDelay = 0.1,
    className,
    ...props
}: StaggerContainerProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={container}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}
