import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/command-menu";

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
    url: "https://luinbytes.dev",
    title: "Lu | Software Engineer",
    description: "Self-taught software engineer in the UK.",
    siteName: "Luinbytes",
  },
  keywords: ["Software Engineer", "Raycast Extensions", "Next.js", "Brutalist Design", "TypeScript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceMono.variable} font-mono bg-black text-white antialiased selection:bg-neon selection:text-black`}>
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
