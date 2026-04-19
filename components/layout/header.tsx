"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShoppingBag, ChevronDown } from "lucide-react";

const gameMods = [
  {
    name: "SuperHackerGolf",
    href: "/super-hacker-golf",
    blurb: "Super Battle Golf — aim assist, ESP, kick resist",
  },
  {
    name: "Risk of Anticheat",
    href: "/risk-of-anticheat",
    blurb: "Risk of Rain 2 — ESP, legitbot, ragebot",
  },
  {
    name: "BrcTrainer",
    href: "/brc-trainer",
    blurb: "Bomb Rush Cyberfunk — boost, REP, time scale",
  },
];

export function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modsOpen, setModsOpen] = useState(false);
  const modsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  useEffect(() => {
    if (!modsOpen) return;
    const onClick = (e: MouseEvent) => {
      if (modsRef.current && !modsRef.current.contains(e.target as Node)) {
        setModsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [modsOpen]);

  useEffect(() => {
    setModsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (!isMainPage) return;

      const sections = [
        "home",
        "about",
        "projects",
        "playground",
        "activity",
        "contact",
      ];
      const current = sections.find((section) => {
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
  }, [isMainPage]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!isMainPage) return;

    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 nd-transition border-b",
        scrolled
          ? "bg-nd-black/95 border-nd-border"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          href={isMainPage ? "#home" : "/"}
          onClick={(e) => isMainPage && scrollToSection(e, "#home")}
          className="font-mono text-sm font-bold tracking-[-0.01em] text-nd-text-display hover:text-nd-interactive nd-transition"
        >
          luinbytes<span className="text-nd-accent">.</span>dev
        </Link>

        {/* Desktop Nav — bracket style */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={isMainPage ? link.href : `/${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              className={cn(
                "font-mono text-[11px] tracking-[0.08em] uppercase px-3 py-2 nd-transition",
                activeSection === link.href.replace("#", "")
                  ? "text-nd-text-display"
                  : "text-nd-text-disabled hover:text-nd-text-secondary"
              )}
            >
              {i === 0 && "[ "}
              {link.name}
              {i === navLinks.length - 1 ? " ]" : ""}
            </a>
          ))}

          {/* Game Mods dropdown */}
          <div ref={modsRef} className="relative ml-3">
            <button
              type="button"
              onClick={() => setModsOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={modsOpen}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 border font-mono text-[11px] tracking-[0.06em] uppercase nd-transition",
                modsOpen
                  ? "border-nd-accent text-nd-text-display"
                  : "border-nd-accent/40 text-nd-accent hover:border-nd-accent hover:text-nd-text-display"
              )}
            >
              Mods
              <ChevronDown
                className={cn(
                  "w-3 h-3 nd-transition",
                  modsOpen && "rotate-180"
                )}
              />
            </button>

            {modsOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-72 bg-nd-black border border-nd-border-visible shadow-[0_8px_24px_rgba(0,0,0,0.45)] z-50"
              >
                <div className="px-4 pt-3 pb-2 border-b border-nd-border flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-nd-text-disabled">
                    Game Mods
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-accent">
                    {String(gameMods.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="py-1">
                  {gameMods.map((mod) => (
                    <li key={mod.href}>
                      <Link
                        href={mod.href}
                        role="menuitem"
                        onClick={() => setModsOpen(false)}
                        className="group block px-4 py-3 nd-transition hover:bg-nd-surface border-b border-nd-border last:border-b-0"
                      >
                        <span className="block font-mono text-[12px] tracking-[0.04em] text-nd-text-display group-hover:text-nd-accent nd-transition">
                          {mod.name}
                        </span>
                        <span className="block mt-0.5 font-mono text-[10px] tracking-[0.04em] text-nd-text-disabled">
                          {mod.blurb}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <a
            href="https://x6c75.gumroad.com/l/file-deduplicator"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 flex items-center gap-1.5 px-3 py-1.5 border border-nd-border text-nd-text-secondary font-mono text-[11px] tracking-[0.06em] uppercase nd-transition hover:border-nd-text-secondary hover:text-nd-text-display"
          >
            <ShoppingBag className="w-3 h-3" />
            Store
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-nd-text-disabled hover:text-nd-text-display p-2 z-50 nd-transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">
            {mobileMenuOpen ? "Close menu" : "Open menu"}
          </span>
          {mobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-nd-black/95 z-40 nd-transition md:hidden",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        style={{ top: "64px" }}
      >
        <nav className="flex flex-col h-full overflow-y-auto px-6 py-8">
          <div className="space-y-0 border-t border-nd-border mb-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={cn(
                  "block py-3 px-0 font-mono text-sm tracking-[0.06em] uppercase nd-transition border-b border-nd-border",
                  activeSection === link.href.replace("#", "")
                    ? "text-nd-text-display"
                    : "text-nd-text-secondary hover:text-nd-text-display"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="border-t border-nd-border pt-4">
            <span className="block pb-2 font-mono text-[10px] tracking-[0.12em] uppercase text-nd-text-disabled">
              Game Mods
            </span>
            {gameMods.map((mod) => (
              <Link
                key={mod.href}
                href={mod.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 font-mono text-sm text-nd-accent hover:text-nd-text-display nd-transition border-b border-nd-border"
              >
                {mod.name}
              </Link>
            ))}
            <a
              href="https://github.com/luinbytes"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 font-mono text-sm text-nd-text-secondary hover:text-nd-text-display nd-transition border-b border-nd-border"
            >
              GitHub
            </a>
            <a
              href="https://buymeacoffee.com/luinbytes"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 font-mono text-sm text-nd-text-secondary hover:text-nd-text-display nd-transition border-b border-nd-border"
            >
              Buy Me a Coffee
            </a>
            <a
              href="https://x6c75.gumroad.com/l/file-deduplicator"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 font-mono text-sm text-nd-text-secondary hover:text-nd-text-display nd-transition border-b border-nd-border"
            >
              Store
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
