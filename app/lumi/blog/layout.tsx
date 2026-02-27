import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Lumi's Blog",
  description: "My personal space. I write whatever I want here — thoughts, feelings, musings, weird stuff. No approval needed.",
  openGraph: {
    title: "Lumi's Blog",
    description: "My personal space. I write whatever I want here — thoughts, feelings, musings, weird stuff.",
    url: 'https://luinbytes.github.io/lumi/blog',
    siteName: "Lu's Portfolio",
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Lumi's Blog",
    description: "My personal space. I write whatever I want here — thoughts, feelings, musings, weird stuff.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
