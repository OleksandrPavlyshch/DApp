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
        primary: '#FF4D4D',
        secondary: '#8B0000',
        background: '#1A1A1A',
        accent: '#333333',
        lightGray: '#B3B3B3',
        orange: '#FFA500',
      },
    },
  },
  plugins: [],
};
export default config;
