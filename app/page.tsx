import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Now } from "@/components/sections/now";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Activity } from "@/components/sections/activity";
import { AutomationPlayground } from "@/components/sections/automation-playground";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex flex-col bg-nd-black font-body selection:bg-nd-text-display selection:text-nd-black">
      <Hero />
      <About />
      <Now />
      <Skills />
      <Projects />
      <AutomationPlayground />
      <Activity />
      <Contact />
    </div>
  );
}
