import type { Metadata } from "next";
import FileDedupPage from "./FileDedupPage";

export const metadata: Metadata = {
  title: "file-deduplicator",
  description:
    "The only CLI tool that finds similar images, not just exact duplicates. Fast, parallel, cross-platform. Built in Go with dHash, aHash, and pHash perceptual algorithms.",
  openGraph: {
    title: "file-deduplicator — Perceptual image deduplication, on the CLI",
    description:
      "Finds similar photos even after edits, compression, or rename. Open source with paid binaries.",
    url: "https://luinbytes.github.io/file-deduplicator",
    siteName: "Luinbytes",
  },
};

export default function Page() {
  return <FileDedupPage />;
}
