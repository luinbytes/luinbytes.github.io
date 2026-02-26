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
        background: "#0a0a0a",
        foreground: "#ededed",
        neon: "#ff9eb5",
        "neon-hover": "#ff7da0",
        surface: "#111111",
        "surface-highlight": "#1a1a1a",
        border: "#333333",
        charcoal: "#18181b",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
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
      keyframes: {
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in-from-bottom-2": "slide-in-from-bottom 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
