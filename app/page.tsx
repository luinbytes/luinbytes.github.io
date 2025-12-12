import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Activity } from "@/components/sections/activity";
import { AutomationPlayground } from "@/components/sections/automation-playground";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex flex-col bg-background font-mono selection:bg-neon selection:text-black">
      <Hero />
      <div className="h-16" />
      <About />
      <Projects />
      <AutomationPlayground />
      <Activity />
      <Contact />
    </div>
  );
}
