import type { Metadata } from "next";
import LinuxSonarPage from "./LinuxSonarPage";

export const metadata: Metadata = {
  title: "linux-sonar",
  description:
    "SteelSeries Sonar for Linux. Five virtual PipeWire sinks for per-app audio routing, ChatMix balancing, and a full mic effects chain (RNNoise, gate, EQ, compressor, limiter). GTK4 GUI with waybar integration.",
  openGraph: {
    title: "linux-sonar — Sonar for Linux on PipeWire",
    description:
      "Per-app audio routing, ChatMix, and mic effects on PipeWire. Full Sonar feature parity on Linux without SteelSeries software.",
    url: "https://luinbytes.github.io/linux-sonar",
    siteName: "Luinbytes",
  },
};

export default function Page() {
  return <LinuxSonarPage />;
}
