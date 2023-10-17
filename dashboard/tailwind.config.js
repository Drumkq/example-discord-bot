/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0B',
        border: '#121212',
        'border-active': '#222222',
        'background-active': '#171717',
        text: '#ADADAD'
      },
      content: {
        'link': 'url("../../assets/arrow.png")'
      }
    },
  },
  plugins: [],
}

