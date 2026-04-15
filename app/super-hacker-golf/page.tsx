import type { Metadata } from "next";
import SuperHackerGolfPage from "./SuperHackerGolfPage";

export const metadata: Metadata = {
  title: "SuperHackerGolf",
  description:
    "Client-side cheat mod for Super Battle Golf. Aim assist, trajectory prediction, ESP, weapon aimbot, and anti-cheat bypass built on MelonLoader.",
  openGraph: {
    title: "SuperHackerGolf — Client-side cheat mod for Super Battle Golf",
    description:
      "Aim assist with decompiled physics, weapon aimbot, ESP overlay, item spawner, and 8-patch anti-cheat bypass. Built on MelonLoader + HarmonyX.",
    url: "https://luinbytes.github.io/super-hacker-golf",
    siteName: "Luinbytes",
  },
};

export default function Page() {
  return <SuperHackerGolfPage />;
}
