"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Builds", href: "#builds" },
  { name: "About", href: "#about" },
  { name: "Status", href: "#status" },
  { name: "Contact", href: "#contact" },
];

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

      const sections = ["home", "builds", "about", "status", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top >= -160 && rect.top <= 320;
      });

      if (current) setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMainPage]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const openCommandMenu = () => {
    window.dispatchEvent(new CustomEvent("lu:open-command-menu"));
    setMobileMenuOpen(false);
  };

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!isMainPage) return;

    event.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  const linkHref = (href: string) => (isMainPage ? href : `/${href}`);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b nd-transition",
        scrolled || mobileMenuOpen
          ? "border-nd-border bg-nd-black/95"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href={isMainPage ? "#home" : "/"}
          onClick={(event) => isMainPage && scrollToSection(event, "#home")}
          className="font-mono text-sm font-bold tracking-normal text-nd-text-display nd-focus nd-transition hover:text-nd-accent"
        >
          luinbytes<span className="text-nd-accent">.</span>dev
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={linkHref(link.href)}
                onClick={(event) => scrollToSection(event, link.href)}
                className={cn(
                  "px-3 py-2 font-mono text-[11px] uppercase tracking-label nd-focus nd-transition",
                  activeSection === sectionId
                    ? "text-nd-text-display"
                    : "text-nd-text-disabled hover:text-nd-text-secondary"
                )}
              >
                /{link.name.toLowerCase()}
              </a>
            );
          })}
          <button
            type="button"
            onClick={openCommandMenu}
            className="ml-3 inline-flex items-center gap-2 border border-nd-border-visible px-3 py-1.5 font-mono text-[11px] uppercase tracking-label-tight text-nd-text-secondary nd-focus nd-transition hover:border-nd-text-secondary hover:text-nd-text-display"
          >
            <Command className="h-3.5 w-3.5" />
            Cmd K
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="p-2 text-nd-text-secondary nd-focus nd-transition hover:text-nd-text-display md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-nd-border bg-nd-black px-4 py-4 md:hidden"
        >
          <nav className="grid gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={linkHref(link.href)}
                onClick={(event) => scrollToSection(event, link.href)}
                className="border-b border-nd-border py-4 font-mono text-[12px] uppercase tracking-label text-nd-text-primary nd-focus"
              >
                /{link.name.toLowerCase()}
              </a>
            ))}
            <button
              type="button"
              onClick={openCommandMenu}
              className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 border border-nd-border-visible px-4 py-3 font-mono text-[12px] uppercase tracking-label text-nd-text-primary nd-focus"
            >
              <Command className="h-4 w-4" />
              Open Command Menu
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
