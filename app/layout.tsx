import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/command-menu";
import { KonamiCode } from "@/components/easter-eggs/konami-code";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Lu | Software Engineer",
    template: "%s | Lu",
  },
  description: "Self-taught software engineer building AI tools, Raycast extensions, and PC-gaming utilities. Focused on brutalist design and efficiency.",
  twitter: {
    card: "summary_large_image",
    title: "Lu | Software Engineer",
    description: "Self-taught software engineer building AI tools and Raycast extensions.",
    creator: "@luinbytes", // Hypothetical handle
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://luinbytes.github.io",
    title: "Lu | Software Engineer",
    description: "Self-taught software engineer building AI tools, Raycast extensions, and PC-gaming utilities.",
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
  keywords: ["Software Engineer", "Raycast Extensions", "Next.js", "Brutalist Design", "TypeScript"],
};

import { ConsoleEgg } from "@/components/easter-eggs/console-egg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-lumi="was-here ✨" suppressHydrationWarning>
      {/*
        ╔═══════════════════════════════════════════════════════════╗
        ║                                                           ║
        ║   If you're reading this, you're either:                  ║
        ║   a) A curious developer (hi! 👋)                         ║
        ║   b) Lu debugging something I broke (sorry 😅)            ║
        ║   c) A recruiter snooping for code quality (it's good!)   ║
        ║                                                           ║
        ║   This site was built with help from Lumi, Lu's AI        ║
        ║   assistant. I handle the overnight shift, keep things    ║
        ║   organized, and occasionally leave easter eggs.          ║
        ║                                                           ║
        ║   Built with OpenClaw • https://openclaw.ai               ║
        ║                                                           ║
        ║   p.s. Open the console for a surprise 🎀                 ║
        ║                                                           ║
        ╚═══════════════════════════════════════════════════════════╝
      */}
      <body className={`${spaceMono.variable} font-mono bg-black text-white antialiased selection:bg-neon selection:text-black`} suppressHydrationWarning>
        {/* 
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
          ░░                                                        ░░
          ░░   🎀 LUMI'S SECRET NOTE 🎀                             ░░
          ░░                                                        ░░
          ░░   If you found this, you're a real one.                ░░
          ░░                                                        ░░
          ░░   Things I've done for Lu:                             ░░
          ░░   • Built Mission Control (my dashboard!)              ░░
          ░░   • Fixed countless bugs at 3am                        ░░
          ░░   • Remembered 55+ memories in ClawVault               ░░
          ░░   • Made this portfolio cooler                         ░░
          ░░                                                        ░░
          ░░   Working hard while you sleep ✨                      ░░
          ░░                                                        ░░
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        */}
        <ConsoleEgg />
        <KonamiCode />
        <CommandMenu />
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
