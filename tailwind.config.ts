import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#f0f0f0",
        primary: "#7c3aed", // deep violet
        secondary: "#06b6d4", // cyan glow
        accent: "#10b981", // emerald green
        dark: "#050505",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-ibm-plex-mono)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        scroll: "scroll 2s ease-in-out infinite",
      },
      keyframes: {
        scroll: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
