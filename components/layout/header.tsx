"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Header() {
    const [activeSection, setActiveSection] = useState("home");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ["home", "projects", "about", "activity", "playground", "contact"];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Adjust these values to fine-tune when the specific link becomes active
                    return rect.top >= -150 && rect.top <= 300;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Projects", href: "#projects" },
        { name: "About", href: "#about" },
        { name: "Activity", href: "#activity" },
        { name: "Playground", href: "#playground" },
        { name: "Contact", href: "#contact" },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveSection(targetId);
        }
    };

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
            scrolled
                ? "bg-black/80 backdrop-blur-md border-white/10 py-3"
                : "bg-transparent border-transparent py-5"
        )}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="#home" onClick={(e) => scrollToSection(e, "#home")} className="text-xl font-bold tracking-tighter hover:text-neon transition-colors">
                    luinbytes<span className="text-neon">.dev</span>
                </Link>

                <nav className="hidden md:flex gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-neon relative",
                                activeSection === link.href.replace("#", "") ? "text-neon" : "text-gray-400"
                            )}
                        >
                            {link.name}
                            {activeSection === link.href.replace("#", "") && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-neon rounded-full" />
                            )}
                        </a>
                    ))}
                </nav>

                {/* Mobile Menu Placeholder */}
                <button className="md:hidden text-gray-400 hover:text-white p-2">
                    <span className="sr-only">Open menu</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
