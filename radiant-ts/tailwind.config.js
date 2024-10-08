/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Includes all potential component files
    './public/index.html', // Includes your main HTML file if applicable
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Switzer', 'system-ui', 'sans-serif'], // Ensures 'Switzer' is the primary font
      },
      borderRadius: {
        '4xl': '2rem', // Adds a custom large border radius
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Adds the Tailwind Forms plugin
  ],
};
