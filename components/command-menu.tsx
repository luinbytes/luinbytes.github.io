"use client";

import * as React from "react";
import { Command } from "cmdk";
import {
  Coffee,
  ExternalLink,
  Folder,
  Github,
  Mail,
  Search,
  User,
  type LucideIcon,
} from "lucide-react";
import { commandFilters, problemBuilds } from "@/lib/homepage";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    const openMenu = () => setOpen(true);
    window.addEventListener("lu:open-command-menu", openMenu);
    return () => window.removeEventListener("lu:open-command-menu", openMenu);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const scrollToSection = React.useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const openHref = React.useCallback((href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = href;
  }, []);

  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }

    if (e.key !== "Tab") return;

    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
      className="fixed inset-0 z-[99] bg-nd-black/80 flex items-start justify-center pt-[20vh]"
      onClick={() => setOpen(false)}
      onKeyDown={handleDialogKeyDown}
    >
      <div
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg"
      >
        <Command className="bg-nd-surface border border-nd-border-visible text-nd-text-primary overflow-hidden">
          <div className="flex items-center border-b border-nd-border px-3">
            <Command.Input
              aria-label="Type a command or search"
              autoFocus
              placeholder="Type a command or search…"
              className="w-full bg-transparent p-4 font-mono text-sm text-nd-text-display placeholder:text-nd-text-disabled nd-focus"
            />
            <kbd className="hidden sm:inline-block pointer-events-none h-5 select-none items-center gap-1 bg-nd-surface-raised px-1.5 font-mono text-[10px] text-nd-text-disabled border border-nd-border">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[360px] overflow-y-auto p-2">
            <Command.Empty className="p-4 text-center font-mono text-[11px] uppercase tracking-label text-nd-text-disabled">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="font-mono text-[10px] uppercase tracking-label text-nd-text-disabled mb-1 px-2 pt-2">
              <Item icon={Folder} onSelect={() => runCommand(() => scrollToSection("builds"))}>
                Builds
              </Item>
              <Item icon={User} onSelect={() => runCommand(() => scrollToSection("about"))}>
                About
              </Item>
              <Item icon={Search} onSelect={() => runCommand(() => scrollToSection("status"))}>
                Status
              </Item>
              <Item icon={Mail} onSelect={() => runCommand(() => scrollToSection("contact"))}>
                Contact
              </Item>
            </Command.Group>

            <Command.Group heading="Quick filters" className="font-mono text-[10px] uppercase tracking-label text-nd-text-disabled mb-1 px-2 pt-4">
              {commandFilters.map((filter) => (
                <Item
                  key={filter.value}
                  icon={filter.icon}
                  keywords={[filter.value]}
                  onSelect={() => runCommand(() => scrollToSection("builds"))}
                >
                  {filter.label}
                </Item>
              ))}
            </Command.Group>

            <Command.Group heading="Builds" className="font-mono text-[10px] uppercase tracking-label text-nd-text-disabled mb-1 px-2 pt-4">
              {problemBuilds.map((build) => (
                <Item
                  key={build.id}
                  icon={build.icon}
                  keywords={[build.shortName, ...build.filters]}
                  onSelect={() => runCommand(() => openHref(build.href))}
                >
                  {build.buildName}
                </Item>
              ))}
            </Command.Group>

            <Command.Group heading="Social" className="font-mono text-[10px] uppercase tracking-label text-nd-text-disabled mb-1 px-2 pt-4">
              <Item icon={Github} onSelect={() => runCommand(() => openHref("https://github.com/luinbytes"))}>
                GitHub
              </Item>
              <Item icon={ExternalLink} onSelect={() => runCommand(() => openHref("https://x.com/x6c75"))}>
                X / Twitter
              </Item>
              <Item
                icon={Coffee}
                onSelect={() => runCommand(() => openHref("https://buymeacoffee.com/luinbytes"))}
              >
                Buy Me a Coffee
              </Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

function Item({
  children,
  icon: Icon,
  keywords,
  onSelect,
}: {
  children: React.ReactNode;
  icon: LucideIcon;
  keywords?: string[];
  onSelect: () => void;
}) {
  return (
    <Command.Item
      keywords={keywords}
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 px-3 py-2 font-mono text-sm text-nd-text-secondary aria-selected:bg-nd-text-display aria-selected:text-nd-black"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
      {children}
    </Command.Item>
  );
}
