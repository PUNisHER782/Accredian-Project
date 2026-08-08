import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0A0E17", raised: "#121729", line: "#232A42" },
        parchment: { DEFAULT: "#E8E1CA", dim: "#DCD3B7", line: "#C9BD98" },
        brass: { DEFAULT: "#B98A3D", bright: "#E0B368", dim: "#8C6A30" },
        emerald: { DEFAULT: "#29604F", bright: "#57B592", dim: "#1C4739" },
        charcoal: "#1C1A14",
        bone: "#EAE6D9",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
