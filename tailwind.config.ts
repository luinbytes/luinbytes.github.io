import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#E8E8E8",
        neon: "#FFFFFF",
        "neon-hover": "#E8E8E8",
        surface: "#111111",
        "surface-highlight": "#1A1A1A",
        border: "#222222",
        "border-visible": "#333333",
        charcoal: "#111111",
        // Nothing design system tokens
        "nd-black": "#000000",
        "nd-surface": "#111111",
        "nd-surface-raised": "#1A1A1A",
        "nd-border": "#222222",
        "nd-border-visible": "#333333",
        "nd-text-disabled": "#666666",
        "nd-text-secondary": "#999999",
        "nd-text-primary": "#E8E8E8",
        "nd-text-display": "#FFFFFF",
        "nd-accent": "#D71921",
        "nd-success": "#4A9E5C",
        "nd-warning": "#D4A843",
        "nd-interactive": "#5B9BF6",
      },
      fontFamily: {
        display: ['"Doto"', '"Space Mono"', 'monospace'],
        body: ['"Space Grotesk"', '"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "2px",
        md: "4px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
        full: "9999px",
      },
      letterSpacing: {
        'label': '0.08em',
        'label-tight': '0.06em',
      },
    },
  },
  plugins: [],
};
export default config;
