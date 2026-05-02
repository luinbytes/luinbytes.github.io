import { ArrowRight, Coffee, Github, Mail, Twitter } from "lucide-react";
import { contactLinks } from "@/lib/homepage";

const iconMap = {
  Email: Mail,
  GitHub: Github,
  "X / Twitter": Twitter,
};

export function Contact() {
  return (
    <section id="contact" className="border-b border-nd-border py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <span className="mb-4 block font-mono text-[11px] uppercase tracking-label text-nd-accent">
          05 / Contact
        </span>
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="max-w-3xl font-body text-4xl font-bold leading-tight tracking-normal text-nd-text-display md:text-6xl">
              Open to interesting projects and unsolicited bug reports.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-nd-text-secondary">
              Send the weird workflow, the broken tool, or the idea that keeps
              getting stuck in your head.
            </p>
          </div>

          <div className="grid min-w-[260px] gap-3">
            {contactLinks.map((link) => {
              const Icon = iconMap[link.label as keyof typeof iconMap];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group inline-flex min-h-[48px] items-center justify-between gap-4 border border-nd-border-visible px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-label-tight text-nd-text-primary nd-transition hover:border-nd-text-secondary hover:bg-nd-surface"
                >
                  <span className="inline-flex items-center gap-3">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                    {link.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-nd-accent nd-transition group-hover:translate-x-1" />
                </a>
              );
            })}
          </div>
        </div>

        <footer className="mt-20 flex flex-col gap-4 border-t border-nd-border pt-6 font-mono text-[11px] uppercase tracking-label text-nd-text-disabled md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} luinbytes.dev</span>
          <a
            href="https://buymeacoffee.com/luinbytes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 nd-transition hover:text-nd-text-primary"
          >
            <Coffee className="h-3.5 w-3.5" />
            Buy Me a Coffee
          </a>
        </footer>
      </div>
    </section>
  );
}
