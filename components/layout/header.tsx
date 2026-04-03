"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

export function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMainPage = pathname === "/";

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

          {/* Store link */}
          <a
            href="https://x6c75.gumroad.com/l/file-deduplicator"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 flex items-center gap-1.5 px-3 py-1.5 border border-nd-border text-nd-text-secondary font-mono text-[11px] tracking-[0.06em] uppercase nd-transition hover:border-nd-text-secondary hover:text-nd-text-display"
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
