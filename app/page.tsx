import { LumiToast } from "@/components/easter-eggs/lumi-toast";
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
    <>
      <LumiToast />
      <div className="flex flex-col bg-background font-mono selection:bg-neon selection:text-black">
        <Hero />
        <div className="h-16" />
        <About />
        <Now />
        <Skills />
        <Projects />
        <SectionErrorBoundary>
          <AutomationPlayground />
        </SectionErrorBoundary>
        <SectionErrorBoundary>
          <Activity />
        </SectionErrorBoundary>
        <Contact />
      </div>
    </>
  );
}
