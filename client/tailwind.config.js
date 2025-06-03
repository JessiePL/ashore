/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
          colors: {
             ashore: {
             blue: '#73C2FB',
             green: '#A9F0D1',
             teal: '#117A65',
             bg: '#F5F7FA',
             gray: '#5C6B73',
             indigo: '#8CA6DB',
          },
       },
    },
  },
  plugins: [],
}
