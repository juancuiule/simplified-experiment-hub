/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/custom-views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)"],
        mono: ["var(--font-fira-code)"],
      },
      colors: {
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        black: "rgb(var(--color-black) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
