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
        primary: {
          DEFAULT: "#2D5016",
          light: "#3d6b1f",
          dark: "#1e3710",
        },
        accent: {
          DEFAULT: "#F5F0E8",
          dark: "#e8e0cc",
        },
        highlight: {
          DEFAULT: "#C8956C",
          light: "#d9aa85",
          dark: "#b07a52",
        },
        brand: {
          text: "#2C1810",
          "text-light": "#5a3e35",
          "text-muted": "#8a6b60",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#2C1810",
            h1: { fontFamily: "var(--font-playfair)" },
            h2: { fontFamily: "var(--font-playfair)" },
            h3: { fontFamily: "var(--font-playfair)" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
