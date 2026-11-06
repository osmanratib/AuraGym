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
          canvas: "#F8F8F6",
          surface: "#FFFFFF",
          subtle: "#F1F1EE",
          ink: "#111114",
          slate: "#686873",
          mist: "#9E9EA8",
          ember: "#FF521B",
          "ember-dark": "#E04310",
          "ember-subtle": "#FFF2EC",
          "ember-glow": "rgba(255, 82, 27, 0.15)",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
      borderRadius: {
        card: "20px",
        pill: "9999px",
      },
      boxShadow: {
        "aura-sm": "0 2px 10px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)",
        "aura-card": "0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
        "aura-card-hover": "0 20px 40px -10px rgba(0, 0, 0, 0.08), 0 6px 12px -2px rgba(0, 0, 0, 0.03)",
        "aura-glow": "0 10px 25px -5px rgba(255, 82, 27, 0.35)",
        "aura-glow-hover": "0 15px 35px -5px rgba(255, 82, 27, 0.45)",
      },
      transitionTimingFunction: {
        aura: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
