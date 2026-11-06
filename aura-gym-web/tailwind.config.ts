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
          black: "#0B0B0D",
          graphite: "#17171B",
          bone: "#F4F1EA",
          mist: "#9A9AA3",
          ember: "#FF5A1F",
          "ember-hover": "#E04C14",
          glow: "#FFB38A",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        card: "16px",
      },
      transitionTimingFunction: {
        aura: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        "aura-card": "0 8px 30px rgba(0, 0, 0, 0.45)",
        "aura-glow": "0 0 35px rgba(255, 90, 31, 0.25)",
        "aura-glow-strong": "0 0 60px rgba(255, 90, 31, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
