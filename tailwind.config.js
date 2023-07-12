/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)"],
        mono: ["var(--font-fira-code)"],
      },
      colors: {
        warning: "#FCC500",
        error: "#FC1400",
        info: "#60A6BC",
        black: "#1d1d1d",
        light: "#fafafa",
        sucess: "#0CC084",
      },
    },
  },
  plugins: [],
};
