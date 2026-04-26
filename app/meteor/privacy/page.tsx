import type { Metadata } from "next";
import { MeteorPrivacyPage } from "./MeteorPrivacyPage";

export const metadata: Metadata = {
  title: "Meteor — Privacy Policy",
  description: "Privacy policy for Meteor, the task and habit tracking app for Android.",
  openGraph: {
    title: "Meteor — Privacy Policy",
    description: "Privacy policy for Meteor, a local-first Android task and habit tracker.",
    url: "https://luinbytes.github.io/meteor/privacy",
    siteName: "Luinbytes",
  },
};

export default function Page() {
  return <MeteorPrivacyPage />;
}
