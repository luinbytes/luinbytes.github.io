import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Now } from "@/components/sections/now";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Activity } from "@/components/sections/activity";
import { AutomationPlayground } from "@/components/sections/automation-playground";
import { Contact } from "@/components/sections/contact";
import { SectionErrorBoundary } from "@/components/error-boundary";

export default function Home() {
  return (
    <div className="flex flex-col bg-background font-sans">
      <Hero />
      <div className="border-t-2 border-foreground/10" />
      <About />
      <div className="border-t-2 border-foreground/10" />
      <Now />
      <div className="border-t-2 border-foreground/10" />
      <Skills />
      <div className="border-t-2 border-foreground/10" />
      <Projects />
      <SectionErrorBoundary>
        <AutomationPlayground />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Activity />
      </SectionErrorBoundary>
      <div className="border-t-2 border-foreground/10" />
      <Contact />
    </div>
  );
}
