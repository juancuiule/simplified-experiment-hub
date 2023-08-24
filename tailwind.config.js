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
        warning: "var(--theme-warning)",
        error: "var(--theme-error)",
        info: "var(--theme-info)",
        black: "var(--theme-black)",
        light: "var(--theme-light)",
        sucess: "var(--theme-sucess)",

        primary: "rgb(var(--color-primary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
