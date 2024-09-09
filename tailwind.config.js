/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      primary: '#1D1E22',  // Add your custom primary color
      secondary: '#eaf1f1', // Add your custom secondary color
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'], // Add custom fonts
    },
    spacing: {
      '128': '32rem', // Add custom spacing values
    },},
  },
  plugins: [],
}

