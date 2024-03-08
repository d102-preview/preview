/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        MAIN1: '#5A8AF2',
        MAIN2: '#AEC5FF',
        SUB: '#F8FAFF',
        BLACK: '#404040',
        GRAY: '#FAFAFA',
        UNIMPORTANT_TEXT: '#A7A7A7',
      },
    },
  },
  plugins: [],
};
