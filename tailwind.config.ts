import { IBM_Plex_Sans, Rubik, Work_Sans } from "@next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'work-sans': ['var(--font-workSans)'],
        'ibm-plex-sans': ['var(--font-sans)'],
        'rubik': ['var(--font-rubik)'],
      },
    },
  },
  plugins: [],
};
export default config;
