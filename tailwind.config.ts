import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F1",
        "paper-dim": "#F1ECE1",
        ink: "#1F2B24",
        "ink-soft": "#4B5A50",
        line: "#E3DCCC",
        brand: {
          50: "#EAF3EF",
          100: "#CFE4DA",
          200: "#A3CBB9",
          300: "#73AE97",
          400: "#4C9179",
          500: "#2F6F5E",
          600: "#265A4C",
          700: "#1E483E",
          800: "#173730",
          900: "#102822",
        },
        amber: {
          50: "#FDF4E4",
          100: "#FAE5BE",
          300: "#F0BD6E",
          400: "#E8A33D",
          500: "#D98F26",
          600: "#B4741C",
        },
        urgent: {
          50: "#FBEAE9",
          100: "#F3C7C4",
          300: "#E28581",
          400: "#D64545",
          500: "#BC3737",
          600: "#992B2B",
          700: "#7A2222",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "22px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(31,43,36,0.06)",
        floating: "0 8px 24px rgba(16,40,34,0.16)",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.8s cubic-bezier(0.2,0.6,0.4,1) infinite",
        riseIn: "riseIn 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
