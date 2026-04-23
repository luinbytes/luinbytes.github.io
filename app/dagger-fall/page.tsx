import type { Metadata } from "next";
import DaggerFallPage from "./DaggerFallPage";

export const metadata: Metadata = {
  title: "DaggerFall",
  description:
    "External Linux trainer for Devil Daggers. Auto-bhop, full air control, click-through Wayland overlay with dagger landing prediction, and sticky aim assist with lead prediction — all via process_vm_readv with no injection.",
  openGraph: {
    title: "DaggerFall — Devil Daggers trainer for Linux",
    description:
      "External trainer using process_vm_readv. Auto-bhop, air control, dagger trajectory overlay, aim assist with lead prediction. No injection. Wayland-compatible.",
    url: "https://luinbytes.github.io/dagger-fall",
    siteName: "Luinbytes",
  },
};

export default function Page() {
  return <DaggerFallPage />;
}
