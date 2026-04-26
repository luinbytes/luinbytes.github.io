import type { Metadata } from "next";
import { MeteorPage } from "./MeteorPage";

export const metadata: Metadata = {
  title: "Meteor",
  description:
    "Tasks and habits, unified. A local-first Android app with streaks, heatmaps, and a home screen widget. No account required.",
  openGraph: {
    title: "Meteor — Tasks & Habits",
    description:
      "Tasks and habits, unified. Local-first Android app with streaks, heatmaps, and a home screen widget.",
    url: "https://luinbytes.github.io/meteor",
    siteName: "Luinbytes",
  },
};

export default function Page() {
  return <MeteorPage />;
}
