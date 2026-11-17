/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Saree palette carried over from the Dancing Needles 3D site
      colors: {
        maroon: {
          DEFAULT: '#160a10',
          800: '#2a141d',
          700: '#3a1d29',
        },
        zari: {
          DEFAULT: '#e8c87a',
          deep: '#d4af37',
        },
        cream: '#f8efe3',
        kumkum: '#ff3d8b',
        peacock: '#00b39a',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
