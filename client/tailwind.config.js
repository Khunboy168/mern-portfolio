/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#06b6d4',
        secondary: '#0891b2',
        dark: '#0a0a0a',
        glass: 'rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}
