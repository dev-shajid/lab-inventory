/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        light: {
          DEFAULT: '#f6f6f6',
          1: '#f6f6f6',
          2: '#e6e6e6',
        },
        dark: {
          DEFAULT: '#151a22',
          1: '#151a22',
          2: '#1c2431',
        },
        "blight": {
          1: '#d8d8d8',
          2: '#c0c0c0',
        },
        "bdark": {
          1: '#4c4c4c',
          2: '#5e5e5e',
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [nextui()],
};