/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        'bm-blue': '#14539A',
      },
    },
  },
  plugins: [],
}

