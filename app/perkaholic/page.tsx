import type { Metadata } from "next";
import PerkaholicPage from "./PerkaholicPage";

export const metadata: Metadata = {
  title: "perkaholic",
  description:
    "Hybrid trainer for BO3 Zombies under Wine/Proton. An XInput proxy DLL inside the game owns reads, writes, aim, visibility, and ESP command production. A native Wayland layer-shell overlay owns drawing and input routing. Both halves communicate through a binary IPC frame at /tmp/perkaholic-ipc.bin.",
  openGraph: {
    title: "perkaholic — hybrid DLL + Wayland overlay trainer for BO3 Zombies",
    description:
      "XInput proxy DLL inside BO3 owns internal hooks and ESP command production. Native Wayland layer-shell overlay owns drawing and input. Binary IPC frame bridges both halves.",
    url: "https://luinbytes.github.io/perkaholic",
    siteName: "Luinbytes",
  },
};

export default function Page() {
  return <PerkaholicPage />;
}
