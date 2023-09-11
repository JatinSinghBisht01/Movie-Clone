/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'img': "url('/src/images/1.jpeg')",
        'grad1':'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
  
        
        
      },
    },
  },
  plugins: [],
}