import type { Config } from "tailwindcss";
import { spacing } from "./theme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: { ...spacing },
      backgroundColor: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        muted: "var(--bg-muted)",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        destructive: "var(--destructive)",
        caption: "var(--caption)",
        black: "var(--black)",
      },
      borderColor: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        destructive: "var(--destructive)",
      },
    },
  },
  // darkMode: "class",
  plugins: [],
} satisfies Config;
