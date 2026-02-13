"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
    const [activeSection, setActiveSection] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ["home", "about", "projects", "playground", "activity", "contact"];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= -150 && rect.top <= 300;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Playground", href: "#playground" },
        { name: "Activity", href: "#activity" },
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
            setMobileMenuOpen(false);
        }
    };

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
            scrolled
                ? "bg-black/90 backdrop-blur-md border-white/10 py-2"
                : "bg-transparent border-transparent py-5"
        )}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="#home" onClick={(e) => scrollToSection(e, "#home")} className={cn(
                    "font-bold tracking-tighter hover:text-neon transition-all duration-300",
                    scrolled ? "text-lg" : "text-xl"
                )}>
                    luinbytes<span className="text-neon">.dev</span>
                </Link>

                <nav className="hidden md:flex gap-6 items-center">
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

                    {/* Applets Dropdown */}
                    <div className="relative ml-4 group">
                        <button
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-white font-medium transition-all duration-300 hover:border-purple-400/50 hover:bg-purple-500/10",
                                scrolled ? "text-xs px-2.5 py-1" : "text-sm"
                            )}
                        >
                            <span className={cn("transition-all duration-300", scrolled ? "text-sm" : "text-base")}>🎨</span>
                            Applets
                        </button>
                        <div className="absolute right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="bg-black/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl p-2 min-w-[180px]">
                                <a
                                    href="https://luinbytes.github.io/price-tracker/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white"
                                >
                                    <span className="text-lg">🏷️</span>
                                    Price Pulse
                                </a>
                                <a
                                    href="https://luinbytes.github.io/pixel-morph/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white"
                                >
                                    <span className="text-lg">🖌️</span>
                                    Pixel Morph
                                </a>
                                <a
                                    href="https://luinbytes.github.io/afk/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white"
                                >
                                    <span className="text-lg">💤</span>
                                    AFK Tracker
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Raycast Extensions Dropdown */}
                    <div className="relative ml-4 group">
                        <a
                            href="https://raycast.com/?via=lu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-white font-medium transition-all duration-300 hover:border-[#FF6154]/50 hover:bg-[#FF6154]/10",
                                scrolled ? "text-xs px-2.5 py-1" : "text-sm"
                            )}
                        >
                            <svg className={cn("transition-all duration-300 text-[#FF6154]", scrolled ? "w-4 h-4" : "w-5 h-5")} viewBox="0 0 512 512" fill="currentColor">
                                <path d="M256 0L0 256l256 256 256-256L256 0zm0 96l160 160-160 160-160-160L256 96z" />
                            </svg>
                            Raycast
                        </a>
                        <div className="absolute right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="bg-black/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl p-2 min-w-[200px]">
                                <a
                                    href="https://www.raycast.com/nazzy_wazzy_lu/window-walker?via=lu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white"
                                >
                                    <span className="text-lg">🪟</span>
                                    Window Walker
                                </a>
                                <a
                                    href="https://www.raycast.com/nazzy_wazzy_lu/archisteamfarm?via=lu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white"
                                >
                                    <span className="text-lg">🎮</span>
                                    ArchiSteamFarm
                                </a>
                                <a
                                    href="https://www.raycast.com/nazzy_wazzy_lu/lifx-advanced-controller?via=lu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white"
                                >
                                    <span className="text-lg">💡</span>
                                    LIFX Controller
                                </a>
                                <div className="border-t border-white/10 mt-2 pt-2">
                                    <a
                                        href="https://raycast.com/?via=lu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-[#FF6154] to-[#FF8F47] text-white text-xs font-medium hover:opacity-90 transition-opacity"
                                    >
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 512 512" fill="currentColor">
                                            <path d="M256 0L0 256l256 256 256-256L256 0zm0 96l160 160-160 160-160-160L256 96z" />
                                        </svg>
                                        Get Raycast
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gumroad Store Link */}
                    <a
                        href="https://x6c75.gumroad.com/l/file-deduplicator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-white font-medium transition-all duration-300 hover:border-[#FF90E8]/50 hover:bg-[#FF90E8]/10",
                            scrolled ? "text-xs px-2.5 py-1 ml-4" : "text-sm ml-4"
                        )}
                    >
                        <ShoppingBag className={cn("transition-all duration-300 text-[#FF90E8]", scrolled ? "w-4 h-4" : "w-5 h-5")} />
                        Store
                    </a>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-400 hover:text-white p-2 z-50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                    <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-all duration-300 md:hidden",
                    mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
                style={{ top: scrolled ? '52px' : '68px' }}
            >
                <nav className="flex flex-col h-full overflow-y-auto px-6 py-8">
                    {/* Navigation Links */}
                    <div className="space-y-1 mb-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={cn(
                                    "block py-3 px-4 text-lg font-medium transition-all rounded-lg",
                                    activeSection === link.href.replace("#", "")
                                        ? "text-neon bg-neon/10"
                                        : "text-gray-300 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10 my-4" />

                    {/* Applets Section */}
                    <div className="mb-6">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3 px-4">Applets</h3>
                        <a
                            href="https://luinbytes.github.io/price-tracker/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
                        >
                            <span className="text-xl">🏷️</span>
                            Price Pulse
                        </a>
                        <a
                            href="https://luinbytes.github.io/pixel-morph/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
                        >
                            <span className="text-xl">🖌️</span>
                            Pixel Morph
                        </a>
                        <a
                            href="https://luinbytes.github.io/afk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
                        >
                            <span className="text-xl">💤</span>
                            AFK Tracker
                        </a>
                    </div>

                    {/* Raycast Extensions Section */}
                    <div className="mb-6">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3 px-4">Raycast Extensions</h3>
                        <a
                            href="https://www.raycast.com/nazzy_wazzy_lu/window-walker?via=lu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
                        >
                            <span className="text-xl">🪟</span>
                            Window Walker
                        </a>
                        <a
                            href="https://www.raycast.com/nazzy_wazzy_lu/archisteamfarm?via=lu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
                        >
                            <span className="text-xl">🎮</span>
                            ArchiSteamFarm
                        </a>
                        <a
                            href="https://www.raycast.com/nazzy_wazzy_lu/lifx-advanced-controller?via=lu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
                        >
                            <span className="text-xl">💡</span>
                            LIFX Controller
                        </a>

                        {/* Get Raycast CTA */}
                        <a
                            href="https://raycast.com/?via=lu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 mx-4 mt-4 px-4 py-3 rounded-lg bg-gradient-to-r from-[#FF6154] to-[#FF8F47] text-white font-medium hover:opacity-90 transition-opacity"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor">
                                <path d="M256 0L0 256l256 256 256-256L256 0zm0 96l160 160-160 160-160-160L256 96z" />
                            </svg>
                            Get Raycast Free
                        </a>
                    </div>

                    {/* Store Section */}
                    <div className="mb-6">
                        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3 px-4">Store</h3>
                        <a
                            href="https://x6c75.gumroad.com/l/file-deduplicator"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
                        >
                            <ShoppingBag className="text-[#FF90E8] w-5 h-5" />
                            File Deduplicator
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}
