import type { Config } from "tailwindcss";
import { colorDarkBlue, colorGray, colorPurple } from "./utils/utils";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        colorDarkBlue: colorDarkBlue, // '#071C37'
        colorGray: colorGray, // '#D9D9D9'
        colorPurple: colorPurple, // '#5E00FF'
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
