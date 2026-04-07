import { Github, Twitter, Mail, Coffee } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 border-b border-nd-border">
      <div className="container px-4 mx-auto max-w-4xl">
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4">
          07 / Contact
        </span>
        <h2 className="font-body text-3xl md:text-4xl font-bold text-nd-text-display tracking-[-0.02em] mb-4">
          Let&apos;s Build Something
        </h2>
        <p className="text-nd-text-secondary text-base mb-12 max-w-xl">
          Got a tedious workflow that needs automating? Or just want to talk about Rust?
          Drop me a line.
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Socials */}
          <div className="md:col-span-1 space-y-0 border-t border-nd-border">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4 pt-4">
              Socials
            </span>
            <div className="space-y-0">
              <a
                href="https://github.com/luinbytes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 text-nd-text-secondary hover:text-nd-text-display nd-transition border-b border-nd-border group"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm font-body">GitHub</span>
              </a>
              <a
                href="https://x.com/x6c75"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 text-nd-text-secondary hover:text-nd-text-display nd-transition border-b border-nd-border group"
              >
                <Twitter className="w-4 h-4" />
                <span className="text-sm font-body">@x6c75</span>
              </a>
              <a
                href="mailto:0x6c75@protonmail.com"
                className="flex items-center gap-3 py-3 text-nd-text-secondary hover:text-nd-text-display nd-transition border-b border-nd-border group"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm font-body">Email</span>
              </a>
              <a
                href="https://buymeacoffee.com/luinbytes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 text-nd-text-secondary hover:text-nd-text-display nd-transition border-b border-nd-border group"
              >
                <Coffee className="w-4 h-4" />
                <span className="text-sm font-body">Buy Me a Coffee</span>
              </a>
            </div>

            {/* Raycast Extensions */}
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-4 pt-6">
              Raycast Extensions
            </span>
            <div className="space-y-0">
              <a
                href="https://www.raycast.com/nazzy_wazzy_lu/window-walker?via=lu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-0 py-3 border-b border-nd-border group"
              >
                <div className="flex-1">
                  <div className="text-sm text-nd-text-secondary font-body group-hover:text-nd-text-display nd-transition">
                    Window Walker
                  </div>
                  <div className="font-mono text-[10px] text-nd-text-disabled">
                    Quick window switching
                  </div>
                </div>
              </a>
              <a
                href="https://www.raycast.com/nazzy_wazzy_lu/archisteamfarm?via=lu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-0 py-3 border-b border-nd-border group"
              >
                <div className="flex-1">
                  <div className="text-sm text-nd-text-secondary font-body group-hover:text-nd-text-display nd-transition">
                    ArchiSteamFarm
                  </div>
                  <div className="font-mono text-[10px] text-nd-text-disabled">
                    Steam bot management
                  </div>
                </div>
              </a>
              <a
                href="https://www.raycast.com/khlebobul/bed-time-calculator?via=lu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-0 py-3 border-b border-nd-border group"
              >
                <div className="flex-1">
                  <div className="text-sm text-nd-text-secondary font-body group-hover:text-nd-text-display nd-transition">
                    Bed Time Calculator
                  </div>
                  <div className="font-mono text-[10px] text-nd-text-disabled">
                    Optimal sleep cycles
                  </div>
                </div>
              </a>
              <a
                href="https://raycast.com/?via=lu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[10px] text-nd-text-disabled hover:text-nd-interactive nd-transition pt-4"
              >
                Get Raycast free →
              </a>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="md:col-span-2">
            <div className="border border-nd-border p-8 md:p-12">
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-nd-text-disabled block mb-6">
                Get in Touch
              </span>
              <p className="text-nd-text-secondary text-base font-body mb-8 max-w-md">
                Interested in working together, have a project idea, or just want to say hi?
                Send me an email and I&apos;ll get back to you.
              </p>
              <a
                href="mailto:0x6c75@protonmail.com"
                className="inline-flex items-center gap-3 bg-nd-text-display text-nd-black font-mono text-[13px] font-bold tracking-[0.06em] uppercase py-4 px-8 rounded-full nd-transition hover:opacity-80 min-h-[44px]"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-nd-border text-center font-mono text-[11px]">
          <p className="text-nd-text-disabled tracking-[0.06em]">
            © {new Date().getFullYear()} Luinbytes. Built with Next.js & Caffeine.
          </p>
          <p className="text-nd-text-disabled tracking-[0.06em] mt-1 opacity-60">
            Powered by{" "}
            <a
              href="https://hermes.al"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nd-interactive nd-transition"
            >
              Hermes
            </a>{" "}
            · AI assistant: Lumi
          </p>
        </div>
      </div>
    </section>
  );
}
