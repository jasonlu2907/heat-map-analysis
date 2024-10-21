/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'purple-custom': '#5D3FD3',
        'lime-custom': '#D1FF4C',
      },
    },
  },
  plugins: [],
};
