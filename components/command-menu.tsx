"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Laptop, User, Folder, Mail, Github, Coffee, Monitor } from "lucide-react";
import { LucideIcon } from "lucide-react";

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

          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="p-4 text-center font-mono text-[11px] text-nd-text-disabled tracking-[0.08em] uppercase">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Navigation"
              className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled mb-1 px-2 pt-2"
            >
              <Item
                icon={User}
                onSelect={() =>
                  runCommand(() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  )
                }
              >
                About
              </Item>
              <Item
                icon={Folder}
                onSelect={() =>
                  runCommand(() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  )
                }
              >
                Projects
              </Item>
              <Item
                icon={Monitor}
                onSelect={() =>
                  runCommand(() =>
                    document
                      .getElementById("activity")
                      ?.scrollIntoView({ behavior: "smooth" })
                  )
                }
              >
                Activity
              </Item>
              <Item
                icon={Mail}
                onSelect={() =>
                  runCommand(() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  )
                }
              >
                Contact
              </Item>
            </Command.Group>

            <Command.Group
              heading="Social"
              className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled mb-1 px-2 pt-4"
            >
              <Item
                icon={Github}
                onSelect={() =>
                  runCommand(() =>
                    window.open("https://github.com/luinbytes", "_blank")
                  )
                }
              >
                GitHub
              </Item>
            </Command.Group>

            <Command.Group
              heading="General"
              className="font-mono text-[10px] tracking-[0.08em] uppercase text-nd-text-disabled mb-1 px-2 pt-4"
            >
              <Item
                icon={Laptop}
                onSelect={() => runCommand(() => setOpen(false))}
              >
                Toggle Theme (Coming Soon)
              </Item>
              <Item
                icon={Coffee}
                onSelect={() =>
                  runCommand(() =>
                    window.open("https://buymeacoffee.com", "_blank")
                  )
                }
              >
                Buy RedBull
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
  onSelect,
}: {
  children: React.ReactNode;
  icon: LucideIcon;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 px-3 py-2 text-sm text-nd-text-secondary aria-selected:bg-nd-text-display aria-selected:text-nd-black cursor-pointer font-mono"
    >
      <Icon className="w-4 h-4" strokeWidth={1.5} />
      {children}
    </Command.Item>
  );
}
