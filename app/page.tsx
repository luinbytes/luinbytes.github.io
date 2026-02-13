import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Now } from "@/components/sections/now";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/sections/timeline";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { Activity } from "@/components/sections/activity";
import { AutomationPlayground } from "@/components/sections/automation-playground";
import { Contact } from "@/components/sections/contact";
import { SectionErrorBoundary } from "@/components/error-boundary";

export default function Home() {
  return (
    <div className="flex flex-col bg-background font-mono selection:bg-neon selection:text-black">
      <Hero />
      <div className="h-16" />
      <About />
      <Now />
      <Skills />
      <Timeline />
      <Projects />
      <Testimonials />
      <SectionErrorBoundary>
        <AutomationPlayground />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Activity />
      </SectionErrorBoundary>
      <Contact />
    </div>
  );
}
