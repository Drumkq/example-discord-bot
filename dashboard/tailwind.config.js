/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        active: '#E43131',
        'inactive-prim': '#E8E8E8',
        'inactive-sec': '#444444',
      },
      content: {
        'link': 'url("../../assets/arrow.png")'
      }
    },
  },
  plugins: [],
}

