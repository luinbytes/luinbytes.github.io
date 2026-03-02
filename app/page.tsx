import { LumiToast } from "@/components/easter-eggs/lumi-toast";
import { LumiStatus } from "@/components/easter-eggs/lumi-status";
import { SparkleTrail } from "@/components/animations/sparkle-trail";
import { FadeIn } from "@/components/animations/fade-in";
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
      <SparkleTrail />
      <LumiToast />
      <LumiStatus />
      <div className="flex flex-col bg-background font-mono selection:bg-neon selection:text-black">
        <Hero />
        <div className="h-8" />
        <FadeIn delay={0.1}>
          <About />
        </FadeIn>
        <FadeIn delay={0.15}>
          <Now />
        </FadeIn>
        <FadeIn delay={0.2}>
          <Skills />
        </FadeIn>
        <FadeIn delay={0.25}>
          <Projects />
        </FadeIn>
        <SectionErrorBoundary>
          <FadeIn delay={0.3}>
            <AutomationPlayground />
          </FadeIn>
        </SectionErrorBoundary>
        <SectionErrorBoundary>
          <FadeIn delay={0.35}>
            <Activity />
          </FadeIn>
        </SectionErrorBoundary>
        <FadeIn delay={0.4}>
          <Contact />
        </FadeIn>
      </div>
    </>
  );
}
