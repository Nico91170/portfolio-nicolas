/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e84393',
          light: '#fd79a8',
          dark: '#d63384',
        },
        dark: {
          DEFAULT: '#2d3436',
          deep: '#1e2324',
          surface: '#2d3436',
        },
        finition: {
          DEFAULT: '#b2bec3',
          light: '#dfe6e9',
          dark: '#636e72',
        },
      },
    },
  },
  plugins: [],
}
