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
        aura: {
          canvas: "#F5F4F0",
          surface: "#FFFFFF",
          subtle: "#EDEDE8",
          studio: "#E8E7E2",
          ink: "#0D0D11",
          slate: "#5E5E69",
          mist: "#9494A0",
          ember: "#8E1616",
          "ember-dark": "#6E0F0F",
          "ember-subtle": "#FBEAEA",
          "ember-glow": "rgba(142, 22, 22, 0.15)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "var(--font-space-grotesk)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        card: "20px",
        pill: "9999px",
      },
      boxShadow: {
        "aura-sm": "0 2px 10px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)",
        "aura-card": "0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
        "aura-card-hover": "0 20px 40px -10px rgba(0, 0, 0, 0.08), 0 6px 12px -2px rgba(0, 0, 0, 0.03)",
        "aura-glow": "0 10px 25px -5px rgba(142, 22, 22, 0.35)",
        "aura-glow-hover": "0 15px 35px -5px rgba(142, 22, 22, 0.45)",
      },
      transitionTimingFunction: {
        aura: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
