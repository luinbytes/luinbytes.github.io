import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Doto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/command-menu";
import { KonamiCode } from "@/components/easter-eggs/konami-code";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const doto = Doto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lu | Software Engineer",
    template: "%s | Lu",
  },
  description:
    "Self-taught software engineer building AI tools, Raycast extensions, and PC-gaming utilities.",
  twitter: {
    card: "summary_large_image",
    title: "Lu | Software Engineer",
    description: "Self-taught software engineer building AI tools and Raycast extensions.",
    creator: "@luinbytes",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://luinbytes.github.io",
    title: "Lu | Software Engineer",
    description:
      "Self-taught software engineer building AI tools, Raycast extensions, and PC-gaming utilities.",
    siteName: "Luinbytes",
    images: [
      {
        url: "https://luinbytes.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lu | Software Engineer",
      },
    ],
  },
  keywords: [
    "Software Engineer",
    "Raycast Extensions",
    "Next.js",
    "TypeScript",
  ],
};

import { ConsoleEgg } from "@/components/easter-eggs/console-egg";
import { CursorTrail } from "@/components/easter-eggs/cursor-trail";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-lumi="was-here ✨"
      suppressHydrationWarning
    >
      {/*
        ╔═══════════════════════════════════════════════════════════╗
        ║                                                           ║
        ║   If you're reading this, you're either:                  ║
        ║   a) A curious developer (hi!)                            ║
        ║   b) Lu debugging something I broke (sorry)               ║
        ║   c) A recruiter snooping for code quality (it's good!)   ║
        ║                                                           ║
        ║   Nothing Design System. Monochromatic. Typographic.      ║
        ║   Industrial warmth. OLED dark mode.                      ║
        ║                                                           ║
        ║   Built with help from Lumi, Lu's AI assistant.          ║
        ║   https://openclaw.ai                                     ║
        ║                                                           ║
        ╚═══════════════════════════════════════════════════════════╝
      */}
      <head></head>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${doto.variable} font-body bg-nd-black text-nd-text-primary antialiased`}
        suppressHydrationWarning
      >
        {/* Accessibility easter egg - screen readers only */}
        <span className="sr-only" aria-hidden="false">
          Psst... Lumi the AI assistant says hi! You&apos;re awesome for using
          accessibility tools.
        </span>

        <CursorTrail />
        <ConsoleEgg />
        <KonamiCode />
        <CommandMenu />
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
